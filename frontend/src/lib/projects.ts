import {
  projects as carouselSeed,
  portfolioProjects as seedProjects,
  type ExperimentStudy,
  type Project,
  type ProjectCategory,
  type ProjectFlowStep,
  type ProjectRole,
  type TechDecisionItem,
  type TroubleshootingItem,
} from "@/constants/Projects";
import { archiveProjects } from "@/constants/archiveProjects";
import { preloadProjectMedia } from "@/lib/media";
import { getSupabase } from "@/lib/supabase";

const DETAIL_SELECT =
  "id, title, description, tagline, category, color, image, logo, hide_title, tech, card_tech, roles, why_developed, flow_steps, troubleshooting, tech_decisions, tech_flow, github, live, featured, sort_order";

/** In-memory detail cache — second open / hover-prefetch skips network. */
const detailCache = new Map<number, Project>();
const inflightDetail = new Map<number, Promise<Project | null>>();

interface ProjectRow {
  id: number;
  title: string;
  description: string;
  tagline: string;
  category: string;
  color: string;
  image: string;
  logo: string | null;
  hide_title: boolean;
  tech: string[] | null;
  card_tech: string[] | null;
  roles: ProjectRole[] | null;
  why_developed: string | null;
  flow_steps: ProjectFlowStep[] | null;
  troubleshooting: TroubleshootingItem[] | null;
  tech_decisions: TechDecisionItem[] | null;
  tech_flow: ExperimentStudy | unknown[] | null;
  github: string;
  live: string;
  featured: boolean | null;
}

function isExperimentStudy(value: unknown): value is ExperimentStudy {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  return "planning" in value && "conditions" in value && "plugins" in value;
}

function mapProjectRow(row: ProjectRow): Project {
  const experiment = isExperimentStudy(row.tech_flow) ? row.tech_flow : undefined;

  return {
    id: Number(row.id),
    title: row.title,
    description: row.description,
    tagline: row.tagline,
    category: row.category as ProjectCategory,
    color: row.color,
    image: row.image ?? "",
    logo: row.logo ?? undefined,
    hideTitle: row.hide_title,
    tech: row.tech ?? [],
    cardTech: row.card_tech ?? undefined,
    roles: row.roles ?? undefined,
    whyDeveloped: row.why_developed ?? undefined,
    flowSteps: row.flow_steps ?? undefined,
    troubleshooting: row.troubleshooting ?? undefined,
    techDecisions: row.tech_decisions ?? undefined,
    github: row.github ?? "",
    live: row.live ?? "",
    featured: row.featured ?? true,
    ...(experiment ? { experiment } : {}),
  };
}

function findSeedProject(id: number): Project | undefined {
  return seedProjects.find((project) => project.id === id);
}

/** Fill empty fields / local media when DB row is thin. */
function enrichFromSeed(project: Project): Project {
  const seed = findSeedProject(project.id);
  if (!seed) return project;

  return {
    ...project,
    image: project.image || seed.image,
    logo: project.logo || seed.logo,
    roles: project.roles?.length ? project.roles : seed.roles,
    whyDeveloped: project.whyDeveloped || seed.whyDeveloped,
    flowSteps: project.flowSteps?.length ? project.flowSteps : seed.flowSteps,
    troubleshooting: project.troubleshooting?.length
      ? project.troubleshooting
      : seed.troubleshooting,
    techDecisions: project.techDecisions?.length
      ? project.techDecisions
      : seed.techDecisions,
    experiment: project.experiment ?? seed.experiment,
    featured: project.featured === false || seed.featured === false ? false : project.featured,
  };
}

async function fetchProjectRows(): Promise<Project[]> {
  const supabase = getSupabase();
  if (!supabase) {
    return seedProjects;
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .select(DETAIL_SELECT)
      .order("sort_order", { ascending: true });

    if (error || !data?.length) {
      if (error) {
        console.error("[getProjects] Supabase query failed:", error.message);
      }
      return seedProjects;
    }

    return (data as ProjectRow[]).map((row) => enrichFromSeed(mapProjectRow(row)));
  } catch (error: unknown) {
    console.error("[getProjects] Supabase fetch failed:", error);
    return seedProjects;
  }
}

/** All portfolio rows (archive / View All). Falls back to local seed. */
export async function getProjects(): Promise<Project[]> {
  const rows = await fetchProjectRows();
  if (rows === seedProjects) {
    return seedProjects;
  }

  const ids = new Set(rows.map((project) => project.id));
  const missingArchive = archiveProjects.filter((project) => !ids.has(project.id));
  return [...rows, ...missingArchive];
}

/** Home carousel: bundled seed only (fast first paint). */
export async function getFeaturedProjects(): Promise<Project[]> {
  return carouselSeed;
}

export function getCachedProjectDetail(id: number): Project | undefined {
  return detailCache.get(id);
}

/**
 * Full project detail from Supabase by id (not the whole table).
 * Memory cache + inflight dedupe make repeat opens / hover-prefetch cheap.
 */
export async function getProjectDetail(id: number): Promise<Project | null> {
  const cached = detailCache.get(id);
  if (cached) return cached;

  const pending = inflightDetail.get(id);
  if (pending) return pending;

  const task = (async (): Promise<Project | null> => {
    const seed = findSeedProject(id);
    const supabase = getSupabase();

    if (!supabase) {
      if (seed && typeof window !== "undefined") {
        await preloadProjectMedia(seed.image);
      }
      if (seed) detailCache.set(id, seed);
      return seed ?? null;
    }

    try {
      const { data, error } = await supabase
        .from("projects")
        .select(DETAIL_SELECT)
        .eq("id", id)
        .maybeSingle();

      if (error) {
        console.error("[getProjectDetail] Supabase query failed:", error.message);
        if (seed && typeof window !== "undefined") {
          await preloadProjectMedia(seed.image);
        }
        if (seed) detailCache.set(id, seed);
        return seed ?? null;
      }

      if (!data) {
        if (seed && typeof window !== "undefined") {
          await preloadProjectMedia(seed.image);
        }
        if (seed) detailCache.set(id, seed);
        return seed ?? null;
      }

      const mapped = enrichFromSeed(mapProjectRow(data as ProjectRow));
      if (typeof window !== "undefined") {
        await preloadProjectMedia(mapped.image);
      }
      detailCache.set(id, mapped);
      return mapped;
    } catch (error: unknown) {
      console.error("[getProjectDetail] Supabase fetch failed:", error);
      return seed ?? null;
    } finally {
      inflightDetail.delete(id);
    }
  })();

  inflightDetail.set(id, task);
  return task;
}

/** Warm cache on card hover so click often skips the network wait. */
export function prefetchProjectDetail(id: number): void {
  if (detailCache.has(id) || inflightDetail.has(id)) return;
  void getProjectDetail(id);
}
