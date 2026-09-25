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
import { getSupabase } from "@/lib/supabase";

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

async function fetchProjectRows(): Promise<Project[]> {
  const supabase = getSupabase();
  if (!supabase) {
    return seedProjects;
  }

  const { data, error } = await supabase
    .from("projects")
    .select(
      "id, title, description, tagline, category, color, image, logo, hide_title, tech, card_tech, roles, why_developed, flow_steps, troubleshooting, tech_decisions, tech_flow, github, live, featured, sort_order"
    )
    .order("sort_order", { ascending: true });

  if (error || !data?.length) {
    if (error) {
      console.error("[getProjects] Supabase query failed:", error.message);
    }
    return seedProjects;
  }

  return (data as ProjectRow[]).map((row) => enrichFromArchiveSeed(mapProjectRow(row)));
}

/** All portfolio rows (archive / View All). Falls back to local seed. */
export async function getProjects(): Promise<Project[]> {
  const rows = await fetchProjectRows();
  if (rows === seedProjects) {
    return seedProjects;
  }

  // Ensure archive-only local entries still appear even if missing from DB
  const ids = new Set(rows.map((project) => project.id));
  const missingArchive = archiveProjects.filter((project) => !ids.has(project.id));
  return [...rows, ...missingArchive];
}

/**
 * Home carousel data source (intentional):
 * Always the bundled `constants/Projects.ts` seed — never Supabase.
 * Keeps first paint fast; archive/detail still use getProjects()/getProjectDetail().
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  return carouselSeed;
}

function findSeedProject(id: number): Project | undefined {
  return seedProjects.find((project) => project.id === id);
}

/** Fill empty media / experiment from local archive seed when DB row is thin. */
function enrichFromArchiveSeed(project: Project): Project {
  const seed = archiveProjects.find((entry) => entry.id === project.id);
  if (!seed) return project;

  return {
    ...project,
    image: project.image || seed.image,
    roles: project.roles?.length ? project.roles : seed.roles,
    whyDeveloped: project.whyDeveloped || seed.whyDeveloped,
    flowSteps: project.flowSteps?.length ? project.flowSteps : seed.flowSteps,
    troubleshooting: project.troubleshooting?.length
      ? project.troubleshooting
      : seed.troubleshooting,
    experiment: project.experiment ?? seed.experiment,
    featured: project.featured === false || seed.featured === false ? false : project.featured,
  };
}

/**
 * Full project detail for archive modal. Prefers Supabase; falls back to local seed.
 * Safe to call from client components (uses NEXT_PUBLIC Supabase keys).
 */
export async function getProjectDetail(id: number): Promise<Project | null> {
  const seed = findSeedProject(id);
  const supabase = getSupabase();

  if (!supabase) {
    return seed ?? null;
  }

  const { data, error } = await supabase
    .from("projects")
    .select(
      "id, title, description, tagline, category, color, image, logo, hide_title, tech, card_tech, roles, why_developed, flow_steps, troubleshooting, tech_decisions, tech_flow, github, live, featured, sort_order"
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("[getProjectDetail] Supabase query failed:", error.message);
    return seed ?? null;
  }

  if (!data) {
    return seed ?? null;
  }

  return enrichFromArchiveSeed(mapProjectRow(data as ProjectRow));
}
