"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { motion } from "framer-motion";
import { ProjectDetailDialog } from "@/components/modals/ProjectDetailDialog";
import { isVideoAsset, type Project } from "@/constants/Projects";
import { prefetchProjectDetail } from "@/lib/projects";
import { getTechMeta } from "@/utils/projectHelpers";

interface ProjectsArchiveProps {
  projects: Project[];
}

export function ProjectsArchive({ projects }: ProjectsArchiveProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedProject = selectedId !== null
    ? projects.find((project) => project.id === selectedId)
    : undefined;

  const closeModal = useCallback(() => setSelectedId(null), []);

  const openProject = useCallback((id: number) => {
    setSelectedId(id);
  }, []);

  return (
    <>
      <div className="archive-grid">
        {projects.map((project) => {
          const isVideo = isVideoAsset(project.image);

          return (
            <motion.article
              key={project.id}
              layoutId={`archive-card-${project.id}`}
              className="project-card group cursor-pointer"
              style={{ borderRadius: 24 }}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={() => openProject(project.id)}
              onPointerEnter={() => prefetchProjectDetail(project.id)}
              onFocus={() => prefetchProjectDetail(project.id)}
              onKeyDown={(event) => {
                if (event.target !== event.currentTarget) return;
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openProject(project.id);
                }
              }}
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              aria-label={`${project.title} 상세 보기`}
            >
              <div className="relative h-64 w-full overflow-hidden bg-black">
                {isVideo ? (
                  <video
                    src={project.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover opacity-60 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
                  />
                ) : project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover opacity-60 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100"
                  />
                ) : null}
                <div className="absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-[#0a0a0a]/90 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-[rgba(20,20,20,0.8)] to-transparent" />

                <div className="absolute top-5 left-5 z-20 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] font-black tracking-widest text-white uppercase backdrop-blur-md">
                  {project.category}
                </div>
              </div>

              <div className="card-content relative z-20">
                <h3 className="mb-3 text-2xl font-black tracking-tight text-white">{project.title}</h3>
                <p className="mb-6 line-clamp-2 text-sm leading-relaxed font-medium text-slate-400">
                  {project.tagline}
                </p>

                <div className="tech-list">
                  {project.tech.slice(0, 4).map((tech) => {
                    const { icon: TechIcon, color } = getTechMeta(tech);
                    return (
                      <div key={tech} className="tech-pill">
                        <TechIcon style={{ color }} className="h-3 w-3" /> {tech}
                      </div>
                    );
                  })}
                  {project.tech.length > 4 && (
                    <div className="tech-pill text-slate-500">+{project.tech.length - 4}</div>
                  )}
                </div>

                <div className="action-group">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-btn"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <SiGithub className="h-3.5 w-3.5" /> CODE
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-btn live"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> LIVE DEMO
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      <ProjectDetailDialog project={selectedProject} onClose={closeModal} />
    </>
  );
}
