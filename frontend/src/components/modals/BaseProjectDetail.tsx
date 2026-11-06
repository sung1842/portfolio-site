"use client";

import { useMemo, type ReactNode } from "react";
import Image from "next/image";
import { SiGithub } from "react-icons/si";
import { ExternalLink } from "lucide-react";
import { getProjectIcon, getTechMeta } from "@/utils/projectHelpers";
import { isVideoAsset, type Project } from "@/constants/Projects";
import { TroubleshootingList } from "@/components/modals/TroubleshootingList";
import { TechDecisionsList } from "@/components/modals/TechDecisionsList";
import { WorkMethodTimeline } from "@/components/modals/WorkMethodTimeline";

const R = {
  desc: "clamp(0.82rem, 1.2vw, 0.96rem)",
  badge: "clamp(0.65rem, 0.9vw, 0.8rem)",
  btnText: "clamp(0.72rem, 1vw, 0.88rem)",
} as const;

const DROP = "drop-shadow(0 1px 3px rgba(0,0,0,0.22))";

const HEADER = {
  wrap: {
    height: "20vh",
    boxSizing: "border-box" as const,
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "flex-end",
    paddingTop: "clamp(3.2vh, 4.5vh, 5.5vh)",
    paddingLeft: "clamp(1.6vw, 4vw, 40px)",
    paddingRight: "clamp(1.6vw, 4vw, 40px)",
    paddingBottom: "clamp(0.8vh, 1.2vh, 1.6vh)",
  },
  meta: { marginBottom: "clamp(0.4vh, 0.7vh, 1vh)", gap: "clamp(0.8vh, 1.2vh, 1.6vh)" },
  icon: { width: "clamp(2.2vh, 3vh, 3.6vh)", height: "clamp(2.2vh, 3vh, 3.6vh)", filter: DROP },
  category: { fontSize: "clamp(1vh, 1.35vh, 1.7vh)" },
  title: {
    margin: 0,
    lineHeight: 1.1,
    fontSize: "clamp(2.2vh, 3.6vh, 4.4vh)",
    textShadow: "0 1px 2px rgba(0,0,0,0.3)",
  },
  tagline: {
    margin: "clamp(0.3vh, 0.5vh, 0.7vh) 0 0",
    fontSize: "clamp(1.2vh, 1.7vh, 2.1vh)",
    lineHeight: 1.4,
    fontWeight: 600,
  },
};

const SECTION_TITLE = {
  margin: 0,
  marginBottom: "clamp(12px,1.4vw,18px)",
  fontSize: "clamp(1.05rem,1.55vw,1.35rem)",
  fontWeight: 800,
  letterSpacing: "-0.01em",
  lineHeight: 1.25,
  color: "rgb(248,250,252)",
  borderLeft: "4px solid rgb(34,211,238)",
  paddingLeft: "clamp(10px,1.2vw,14px)",
};

interface BaseProjectDetailProps {
  project: Project;
  /** Project-specific diagram. The frame stays; this slot is the flavor. */
  mindmap?: ReactNode;
}

/**
 * Default project detail frame, taken from the JD-FIT page.
 * Legacy ids keep their own modals. New projects start here, then add a mindmap or a custom body.
 */
export function BaseProjectDetail({ project, mindmap }: BaseProjectDetailProps) {
  const ProjectIcon = useMemo(() => getProjectIcon(project), [project]);
  const isVideo = isVideoAsset(project.image);

  return (
    <div className="base-detail relative flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden" style={{ borderRadius: 18 }}>
      <style>{`
        @media (max-width: 767px) {
          .base-detail-layout {
            flex-direction: column !important;
            overflow-y: auto !important;
          }
          .base-detail-layout > div {
            overflow-y: visible !important;
            flex: none !important;
          }
        }
        .base-detail .trouble-grid {
          grid-template-columns: 1fr !important;
        }
      `}</style>

      <div className="z-0" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {isVideo ? (
          <video
            src={project.image}
            autoPlay
            loop
            muted
            playsInline
            aria-label={`${project.title} 데모 영상`}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: 0.28 }}
          />
        ) : project.image ? (
          <Image
            src={project.image}
            alt=""
            fill
            sizes="94vw"
            className="object-cover"
            style={{ opacity: 0.28 }}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
          />
        ) : null}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(18,18,18,0.97) 0%, rgba(18,18,18,0.9) 35%, rgba(18,18,18,0.6) 65%, rgba(18,18,18,0.25) 100%)" }}
          aria-hidden="true"
        />
      </div>

      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          style={{
            position: "absolute",
            left: 16,
            top: 16,
            zIndex: 30,
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            height: 32,
            padding: "0 14px",
            borderRadius: 9999,
            backgroundColor: "#1b1f23",
            color: "#fff",
            textDecoration: "none",
            fontSize: R.btnText,
            fontWeight: 600,
            boxShadow: "0 0 0 2px rgba(255,255,255,0.12), 0 2px 8px rgba(0,0,0,0.4)",
            transition: "background-color 0.15s",
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.backgroundColor = "#2f363d";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.backgroundColor = "#1b1f23";
          }}
        >
          <SiGithub style={{ width: 16, height: 16, flexShrink: 0 }} aria-hidden="true" />
          <span>GitHub</span>
        </a>
      )}

      <div className="relative z-20 shrink-0" style={HEADER.wrap}>
        <div className="flex items-center" style={HEADER.meta}>
          <div className="shrink-0 overflow-hidden rounded-lg" style={HEADER.icon}>
            {project.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={project.logo} alt="" className="h-full w-full object-contain" aria-hidden="true" />
            ) : (
              <ProjectIcon style={{ width: "100%", height: "100%", color: "#fff", display: "block" }} aria-hidden="true" />
            )}
          </div>
          <span className="font-semibold uppercase tracking-widest text-slate-400" style={HEADER.category}>
            {project.category}
          </span>
        </div>
        <h2 className="font-black leading-tight tracking-tight text-white" style={HEADER.title}>
          {project.title}
        </h2>
        <p className="text-slate-300" style={HEADER.tagline}>
          {project.tagline}
        </p>
      </div>

      <div
        className="base-detail-layout relative z-20 flex min-h-0 flex-1 flex-row"
        style={{
          paddingLeft: "clamp(20px, 4vw, 40px)",
          paddingRight: "clamp(20px, 4vw, 40px)",
          paddingBottom: "clamp(20px, 3vw, 28px)",
          gap: "clamp(16px, 2vw, 24px)",
          minHeight: 0,
        }}
      >
        <div className="min-h-0 min-w-0 flex-[1_1_0%] overflow-x-hidden overflow-y-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {project.roles && project.roles.length > 0 && <WorkMethodTimeline items={project.roles} />}
          {mindmap && (
            <>
              <p style={SECTION_TITLE}>기술 흐름</p>
              {mindmap}
            </>
          )}
          {project.tech.length > 0 && (
            <div className="flex flex-wrap" style={{ gap: "clamp(5px,0.7vw,9px)", marginTop: "clamp(14px,1.6vw,20px)" }}>
              {project.tech.map((tech) => {
                const { icon: TechIcon, color } = getTechMeta(tech);
                return (
                  <span
                    key={tech}
                    className="flex items-center font-mono font-semibold"
                    style={{
                      gap: "clamp(4px,0.5vw,7px)",
                      padding: "clamp(3px,0.4vw,5px) clamp(10px,1.2vw,14px)",
                      borderRadius: 9999,
                      fontSize: R.badge,
                      backgroundColor: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "#fff",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                    }}
                  >
                    <TechIcon style={{ color, width: "clamp(10px,1.1vw,14px)", height: "clamp(10px,1.1vw,14px)", flexShrink: 0, filter: DROP }} aria-hidden="true" />
                    {tech}
                  </span>
                );
              })}
            </div>
          )}
        </div>

        <div className="min-h-0 min-w-0 flex-[1_1_0%] overflow-x-hidden overflow-y-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <p style={SECTION_TITLE}>프로젝트 기획</p>
          <div
            style={{
              padding: "clamp(12px,1.4vw,18px) clamp(14px,1.6vw,20px)",
              borderRadius: 14,
              backgroundColor: "rgba(8,8,10,0.55)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <p style={{ fontSize: R.desc, color: "rgb(226,232,240)", lineHeight: 1.72, margin: 0 }}>{project.description}</p>
          </div>

          {project.troubleshooting && project.troubleshooting.length > 0 && (
            <div style={{ marginTop: "clamp(20px,2.5vw,28px)" }}>
              <p style={SECTION_TITLE}>트러블 슈팅</p>
              <TroubleshootingList items={project.troubleshooting} />
            </div>
          )}

          {project.techDecisions && project.techDecisions.length > 0 && <TechDecisionsList items={project.techDecisions} />}

          {project.live && (
            <div style={{ marginTop: "clamp(12px,1.4vw,20px)" }}>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center transition hover:opacity-80"
                style={{
                  gap: "clamp(5px,0.6vw,8px)",
                  padding: "clamp(6px,0.7vw,9px) clamp(16px,2vw,24px)",
                  borderRadius: 9999,
                  fontSize: R.btnText,
                  fontWeight: 700,
                  backgroundColor: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <ExternalLink style={{ width: "clamp(12px,1.2vw,16px)", height: "clamp(12px,1.2vw,16px)" }} aria-hidden="true" />
                Live Demo
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
