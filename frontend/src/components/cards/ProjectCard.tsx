import { useMemo } from "react";
import { CardShell } from "./CardShell";
import { getProjectIcon, getTechMeta } from "@/utils/projectHelpers";
import { getProjectNeonStyle } from "@/utils/neonStyles";
import { Project, isVideoAsset } from "@/constants/Projects";

interface ProjectCardProps {
  project: Project;
}

const TEXT_SHADOW = "0 1px 8px rgba(0,0,0,0.9), 0 2px 16px rgba(0,0,0,0.7)";
const ICON_FILTER = "drop-shadow(0 1px 6px rgba(0,0,0,0.95)) drop-shadow(0 0 3px rgba(0,0,0,0.8))";

/**
 * 카드 내부 요소 반응형 크기 상수
 * 카드 너비: 모바일 72vw ~ 데스크톱 28vw (max 540px)
 * clamp(최솟값, 선호값, 최댓값) — vw 기반으로 카드 크기에 비례
 */
const R = {
  /** 우측 로고/아이콘 — 아이콘은 유지 */
  logoSize:    "clamp(24px, 3.2vw, 40px)",
  /** 카테고리 뱃지 텍스트 */
  badgeText:   "clamp(8px,  1.15vw, 12px)",
  /** 제목 */
  title:       "clamp(13px, 2.3vw,  21px)",
  /** tagline */
  tagline:     "clamp(10px, 1.5vw,  14px)",
  /** 기술 스택 아이콘 — 유지 */
  techIcon:    "clamp(9px,  1.1vw,  13px)",
  /** 기술 스택 텍스트 */
  techText:    "clamp(8px,  1vw,    12px)",
  /** tap 힌트 */
  tapText:     "clamp(9px,  1vw,    13px)",
  /** 뱃지 사이 간격 */
  techGap:     "clamp(5px,  0.8vw,  11px)",
  /** 아이콘-텍스트 간격 */
  iconTextGap: "clamp(3px,  0.5vw,  6px)",
} as const;

export function ProjectCard({ project }: ProjectCardProps) {
  const ProjectIcon = useMemo(() => getProjectIcon(project), [project]);
  const neonStyle = useMemo(() => getProjectNeonStyle(project), [project]);
  const isVideo = isVideoAsset(project.image);

  return (
    <CardShell style={neonStyle}>
      {/* 비디오 / 이미지 배경 레이어 */}
      {isVideo ? (
        <video
          className="absolute inset-0 z-0 h-full w-full object-cover opacity-30"
          src={project.image}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        />
      ) : project.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="absolute inset-0 z-0 h-full w-full object-cover opacity-20"
          src={project.image}
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
      ) : null}

      {/* 그라디언트 오버레이 */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.25) 50%, rgba(5,5,5,0.75) 100%)",
        }}
        aria-hidden="true"
      />

      {/* 카드 내용 */}
      <div className="relative z-10 flex h-[calc(100%-32px)] w-[calc(100%-32px)] flex-col justify-between">

        {/* Header */}
        <div className="flex w-full min-w-0 shrink-0 items-start justify-between" style={{ gap: 6 }}>
          {/* ① 좌측: 카테고리 뱃지 */}
          <div className="shrink-0 rounded-full bg-black/50 backdrop-blur-md" style={{ padding: "2px 8px" }}>
            <span
              className="font-mono font-bold uppercase tracking-widest text-white/80"
              style={{ fontSize: R.badgeText, textShadow: TEXT_SHADOW }}
            >
              {project.category}
            </span>
          </div>

          {/* ② 우측: 커스텀 로고 또는 기본 아이콘 */}
          <div
            className="shrink-0 overflow-hidden"
            style={{
              filter: ICON_FILTER,
              width: R.logoSize,
              height: R.logoSize,
              minWidth: 24,
              minHeight: 24,
            }}
          >
            {project.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.logo}
                alt={`${project.title} logo`}
                style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
              />
            ) : (
              <ProjectIcon
                style={{
                  width: "100%",
                  height: "100%",
                  // PORTFOLIO 카드(id:0)는 Claude AI 브랜드 색상 적용
                  color: project.id === 0 ? "#D4956A" : "rgba(255,255,255,0.7)",
                }}
                aria-hidden="true"
              />
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-center" style={{ padding: "6px 0" }}>
          {!project.hideTitle && (
            <h2
              className="line-clamp-2 font-sans font-bold leading-tight tracking-tight text-white"
              style={{ fontSize: R.title, textShadow: TEXT_SHADOW }}
            >
              {project.title}
            </h2>
          )}
          <p
            className="line-clamp-1 text-white/70"
            style={{ fontSize: R.tagline, textShadow: TEXT_SHADOW, marginTop: project.hideTitle ? 0 : "4px" }}
          >
            {project.tagline}
          </p>
        </div>

        {/* Footer: tech 아이콘 + tap 힌트 */}
        <div className="flex w-full min-w-0 shrink-0 items-end justify-between" style={{ gap: 6 }}>
          {/* ③ 기술 스택 아이콘 */}
          <div className="flex min-w-0 flex-1 items-center flex-wrap" style={{ gap: R.techGap }}>
            {(project.cardTech ?? project.tech).slice(0, 3).map((t) => {
              const { icon: TechIcon, color } = getTechMeta(t);
              return (
                <div
                  key={t}
                  className="flex items-center rounded bg-black/40"
                  style={{
                    filter: ICON_FILTER,
                    gap: R.iconTextGap,
                    padding: "2px 5px",
                  }}
                  title={t}
                >
                  <TechIcon
                    className="shrink-0"
                    style={{ color, width: R.techIcon, height: R.techIcon }}
                    aria-hidden="true"
                  />
                  <span
                    className="font-mono font-bold uppercase tracking-wide text-white/90"
                    style={{ fontSize: R.techText, textShadow: TEXT_SHADOW }}
                  >
                    {t}
                  </span>
                </div>
              );
            })}
          </div>

          {/* tap 힌트 */}
          <span
            className="shrink-0 font-mono text-white/60"
            style={{ fontSize: R.tapText, textShadow: TEXT_SHADOW }}
          >
            tap →
          </span>
        </div>
      </div>
    </CardShell>
  );
}
