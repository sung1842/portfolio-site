"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  SiGithub, SiNextdotjs, SiReact, SiTypescript, SiFramer, SiTailwindcss, SiClaude, SiCodeium,
  SiFlask, SiDocker, SiMysql, SiGooglegemini, SiSpring, SiKeras, SiJavascript,
  SiSocketdotio, SiNaver, SiFigma,
} from "react-icons/si";
import { ExternalLink } from "lucide-react";
import { getProjectIcon, getTechMeta } from "@/utils/projectHelpers";
import { Project, ProjectRole, isVideoAsset } from "@/constants/Projects";

interface ProjectModalProps {
  project: Project;
}

const R = {
  title:       "clamp(1.6rem, 3.8vw, 3rem)",
  tagline:     "clamp(0.85rem, 1.3vw, 1.05rem)",
  desc:        "clamp(0.82rem, 1.2vw, 0.96rem)",
  badge:       "clamp(0.65rem, 0.9vw, 0.8rem)",
  categoryTx:  "clamp(0.6rem,  0.9vw, 0.75rem)",
  logo:        "clamp(24px,    2.8vw, 40px)",
  btnText:     "clamp(0.72rem, 1vw,   0.88rem)",
  partBadge:   "clamp(0.62rem, 0.85vw, 0.76rem)",
  partDetail:  "clamp(0.82rem, 1.15vw, 0.95rem)",
} as const;

const SHADOW = "0 1px 2px rgba(0,0,0,0.12)";
const DROP   = "drop-shadow(0 1px 3px rgba(0,0,0,0.22))";

const PART_STYLE: Record<ProjectRole["part"], { accent: string; badgeBg: string; badgeText: string }> = {
  Frontend: { accent: "#93c5fd", badgeBg: "rgba(255,255,255,0.1)", badgeText: "#fff" },
  Backend:  { accent: "#86efac", badgeBg: "rgba(255,255,255,0.1)", badgeText: "#fff" },
  Design:   { accent: "#f9a8d4", badgeBg: "rgba(255,255,255,0.1)", badgeText: "#fff" },
  AI:       { accent: "#c4b5fd", badgeBg: "rgba(255,255,255,0.1)", badgeText: "#fff" },
  DevOps:   { accent: "#fcd34d", badgeBg: "rgba(255,255,255,0.1)", badgeText: "#fff" },
};

/* ─────────────────────────────────────────
   공통 마인드맵 스타일 헬퍼
───────────────────────────────────────── */
const MM_FS     = "clamp(0.75rem, 1.05vw, 0.92rem)";
const MM_SUB_FS = "clamp(0.62rem, 0.82vw, 0.74rem)";
const MM_ICON   = "clamp(20px, 2.4vw, 30px)";

function mmChip(bg: string, border: string): React.CSSProperties {
  return {
    display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
    gap: 5, padding: "9px 14px", borderRadius: 10,
    backgroundColor: bg, border: `1.5px solid ${border}`,
    fontSize: MM_FS, fontWeight: 600,
    minWidth: "clamp(82px,9vw,112px)",
  };
}
function mmLabel(color: string): React.CSSProperties {
  return {
    fontSize: MM_SUB_FS, fontWeight: 700,
    letterSpacing: "0.12em", textTransform: "uppercase" as const,
    color, marginBottom: 5, textAlign: "center" as const,
  };
}
const MM_COL: React.CSSProperties = { display: "flex", flexDirection: "column", alignItems: "center", gap: 8 };
const MM_WRAP: React.CSSProperties = {
  backgroundColor: "#1e1e1e", border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 14, padding: "clamp(14px,2vw,24px) clamp(16px,2.2vw,28px)",
  boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
};
function MmArrow({ label }: { label?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, color: "rgb(148,163,184)", flexShrink: 0 }}>
      <span style={{ fontSize: "clamp(16px,2vw,22px)" }}>↓</span>
      {label && <span style={{ fontSize: "clamp(0.55rem,0.68vw,0.63rem)", color: "rgb(148,163,184)", whiteSpace: "nowrap" }}>{label}</span>}
    </div>
  );
}
function MmHArrow({ label }: { label?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, color: "rgb(148,163,184)", flexShrink: 0 }}>
      <span style={{ fontSize: "clamp(16px,2vw,22px)" }}>→</span>
      {label && <span style={{ fontSize: "clamp(0.55rem,0.68vw,0.63rem)", color: "rgb(148,163,184)" }}>{label}</span>}
    </div>
  );
}

/** 구조분해 없이 쓸 수 있는 단일 네임스페이스 객체 (this 사용 안 함) */
const MM = {
  fs: MM_FS, subFs: MM_SUB_FS, iconSz: MM_ICON,
  chip: mmChip, sectionLabel: mmLabel,
  col: MM_COL, wrapper: MM_WRAP,
  arrow: (label?: string) => <MmArrow label={label} />,
  hArrow: (label?: string) => <MmHArrow label={label} />,
};

/* ─────────────────────────────────────────
   마인드맵 — PORTFOLIO (Vibe Coding 워크플로우)
───────────────────────────────────────── */
function PortfolioMindmap() {
  const { fs: _fs, subFs, iconSz, chip, sectionLabel, col, wrapper, arrow, hArrow } = MM;
  return (
    <div style={wrapper}>
      {/* 개발자 → AI Tools */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(8px,1vw,14px)", flexWrap: "wrap", marginBottom: "clamp(8px,1vw,12px)" }}>
        <div style={{ ...chip("rgba(99,102,241,0.08)", "rgba(99,102,241,0.3)"), color: "#6366f1" }}>
          <span style={{ fontSize: "clamp(18px,2.2vw,26px)" }}>👤</span>
          <span>Developer</span>
          <span style={{ fontSize: subFs, color: "rgb(148,163,184)", fontWeight: 400 }}>자연어 프롬프트</span>
        </div>
        {hArrow("지시")}
        <div style={{ ...MM.col, gap: 5 }}>
          <span style={sectionLabel("rgb(148,163,184)")}>AI Tools</span>
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ ...chip("rgba(35,169,242,0.10)", "rgba(35,169,242,0.35)"), color: "#23a9f2" }}>
              <SiCodeium style={{ width: iconSz, height: iconSz, color: "#23a9f2" }} />
              <span>Cursor</span>
            </div>
            <div style={{ ...chip("rgba(212,149,106,0.10)", "rgba(212,149,106,0.35)"), color: "#d4956a" }}>
              <SiClaude style={{ width: iconSz, height: iconSz, color: "#d4956a" }} />
              <span>Claude</span>
            </div>
            <div style={{ ...chip("rgba(66,133,244,0.10)", "rgba(66,133,244,0.35)"), color: "#4285f4" }}>
              <SiGooglegemini style={{ width: iconSz, height: iconSz, color: "#4285f4" }} />
              <span>Gemini</span>
              <span style={{ fontSize: subFs, color: "rgb(148,163,184)", fontWeight: 400 }}>교차검증</span>
            </div>
          </div>
        </div>
      </div>

      {arrow("코드 생성")}

      {/* Frontend Stack */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(8px,1vw,14px)", flexWrap: "wrap", margin: "clamp(8px,1vw,12px) 0" }}>
        <div style={{ ...MM.col, gap: 5 }}>
          <span style={sectionLabel("rgb(148,163,184)")}>Frontend Stack</span>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { icon: SiNextdotjs,   color: "#fff",    label: "Next.js" },
              { icon: SiReact,       color: "#61dafb", label: "React" },
              { icon: SiTypescript,  color: "#3178c6", label: "TypeScript" },
              { icon: SiFramer,      color: "#bb4eff", label: "Framer" },
              { icon: SiTailwindcss, color: "#06b6d4", label: "Tailwind" },
            ].map((t) => (
              <div key={t.label} style={{ ...chip("rgba(255,255,255,0.08)", "rgba(255,255,255,0.15)"), minWidth: "auto", padding: "6px 10px", flexDirection: "row", gap: 6 }}>
                <t.icon style={{ width: "clamp(14px,1.6vw,20px)", height: "clamp(14px,1.6vw,20px)", color: t.color, flexShrink: 0 }} />
                <span style={{ color: "rgb(203,213,225)" }}>{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {arrow("배포")}

      <div style={{ display: "flex", justifyContent: "center", marginTop: "clamp(6px,0.8vw,10px)" }}>
        <div style={{ ...chip("rgba(16,185,129,0.15)", "rgba(16,185,129,0.4)"), flexDirection: "row", gap: 8, padding: "8px 22px", minWidth: "auto", color: "#34d399" }}>
          <span style={{ fontSize: "clamp(16px,2vw,22px)" }}>🚀</span>
          <span style={{ fontWeight: 700 }}>Portfolio Site</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   마인드맵 — TWINSTAR (풀스택 AI 패션 추천 서비스)
───────────────────────────────────────── */
function TwinstarMindmap() {
  const { subFs, iconSz, chip, sectionLabel, wrapper, arrow, hArrow } = MM;
  return (
    <div style={wrapper}>
      {/* 사용자 */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "clamp(8px,1vw,12px)" }}>
        <div style={{ ...chip("rgba(99,102,241,0.08)", "rgba(99,102,241,0.3)"), color: "#6366f1", minWidth: "auto", padding: "8px 20px", flexDirection: "row", gap: 8 }}>
          <span style={{ fontSize: "clamp(18px,2.2vw,26px)" }}>👤</span>
          <div>
            <div>사용자</div>
            <div style={{ fontSize: subFs, color: "rgb(148,163,184)", fontWeight: 400 }}>얼굴 사진 업로드</div>
          </div>
        </div>
      </div>

      {arrow()}

      {/* Frontend + Spring Security */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(8px,1vw,14px)", flexWrap: "wrap", margin: "clamp(8px,1vw,12px) 0" }}>
        <div style={{ ...MM.col, gap: 5 }}>
          <span style={sectionLabel("#61dafb")}>Frontend</span>
          <div style={{ ...chip("rgba(97,218,251,0.08)", "rgba(97,218,251,0.35)"), color: "#0ea5e9" }}>
            <SiReact style={{ width: iconSz, height: iconSz, color: "#61dafb" }} />
            <span>React</span>
            <span style={{ fontSize: subFs, color: "rgb(148,163,184)", fontWeight: 400 }}>UI · 웹캠 캡처</span>
          </div>
        </div>
        {hArrow("로그인 관리")}
        <div style={{ ...MM.col, gap: 5 }}>
          <span style={sectionLabel("#6DB33F")}>Auth</span>
          <div style={{ ...chip("rgba(109,179,63,0.08)", "rgba(109,179,63,0.35)"), color: "#6DB33F" }}>
            <SiSpring style={{ width: iconSz, height: iconSz, color: "#6DB33F" }} />
            <span>Spring Security</span>
            <span style={{ fontSize: subFs, color: "rgb(148,163,184)", fontWeight: 400 }}>전역 인증</span>
          </div>
        </div>
      </div>

      {arrow("API 요청")}

      {/* Spring Boot + MySQL */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(8px,1vw,14px)", flexWrap: "wrap", margin: "clamp(8px,1vw,12px) 0" }}>
        <div style={{ ...MM.col, gap: 5 }}>
          <span style={sectionLabel("#6DB33F")}>Backend</span>
          <div style={{ ...chip("rgba(109,179,63,0.08)", "rgba(109,179,63,0.35)"), color: "#6DB33F" }}>
            <SiSpring style={{ width: iconSz, height: iconSz, color: "#6DB33F" }} />
            <span>Spring Boot</span>
            <span style={{ fontSize: subFs, color: "rgb(148,163,184)", fontWeight: 400 }}>REST API · JPA</span>
          </div>
        </div>
        {hArrow("저장 / 조회")}
        <div style={{ ...MM.col, gap: 5 }}>
          <span style={sectionLabel("#4479A1")}>Database</span>
          <div style={{ ...chip("rgba(68,121,161,0.08)", "rgba(68,121,161,0.35)"), color: "#4479A1" }}>
            <SiMysql style={{ width: iconSz, height: iconSz, color: "#4479A1" }} />
            <span>MySQL</span>
            <span style={{ fontSize: subFs, color: "rgb(148,163,184)", fontWeight: 400 }}>데이터 저장</span>
          </div>
        </div>
      </div>

      {arrow("분석 요청")}

      {/* AI Server + Gemini API */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(8px,1vw,14px)", flexWrap: "wrap", margin: "clamp(8px,1vw,12px) 0" }}>
        <div style={{ ...MM.col, gap: 5 }}>
          <span style={sectionLabel("rgb(148,163,184)")}>AI Server (팀원)</span>
          <div style={{ ...chip("rgba(255,255,255,0.08)", "rgba(255,255,255,0.15)"), color: "rgb(203,213,225)" }}>
            <SiFlask style={{ width: iconSz, height: iconSz, color: "rgb(203,213,225)" }} />
            <span>Flask</span>
            <span style={{ fontSize: subFs, color: "rgb(148,163,184)", fontWeight: 400 }}>Deepface · Keras</span>
          </div>
        </div>
        {hArrow("동물상 결과")}
        <div style={{ ...MM.col, gap: 5 }}>
          <span style={sectionLabel("#4285f4")}>Gemini API (직접 구현)</span>
          <div style={{ ...chip("rgba(66,133,244,0.08)", "rgba(66,133,244,0.35)"), color: "#4285f4" }}>
            <SiGooglegemini style={{ width: iconSz, height: iconSz, color: "#4285f4" }} />
            <span>Gemini</span>
            <span style={{ fontSize: subFs, color: "rgb(148,163,184)", fontWeight: 400 }}>연예인 패션 분석</span>
          </div>
        </div>
      </div>

      {arrow("키워드 추출")}

      {/* Naver Shopping */}
      <div style={{ display: "flex", justifyContent: "center", margin: "clamp(8px,1vw,12px) 0" }}>
        <div style={{ ...chip("rgba(3,199,90,0.08)", "rgba(3,199,90,0.35)"), color: "#03C75A", minWidth: "auto", padding: "8px 22px", flexDirection: "row", gap: 8 }}>
          <SiNaver style={{ width: iconSz, height: iconSz, color: "#03C75A" }} />
          <div style={{ textAlign: "left" }}>
            <div>Naver 쇼핑 검색</div>
            <div style={{ fontSize: subFs, color: "rgb(148,163,184)", fontWeight: 400 }}>키워드 자동 검색 → 제품 매칭</div>
          </div>
        </div>
      </div>

      {arrow("배포 환경")}

      {/* Docker */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "clamp(6px,0.8vw,10px)" }}>
        <div style={{ ...chip("rgba(36,150,237,0.08)", "rgba(36,150,237,0.35)"), color: "#2496ED", minWidth: "auto", padding: "8px 22px", flexDirection: "row", gap: 8 }}>
          <SiDocker style={{ width: iconSz, height: iconSz, color: "#2496ED" }} />
          <div style={{ textAlign: "left" }}>
            <div>Docker</div>
            <div style={{ fontSize: subFs, color: "rgb(148,163,184)", fontWeight: 400 }}>AI서버 · 백엔드 · 프론트 3개 컨테이너</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   마인드맵 — MINGLE (KREAM 크롤링 리셀 플랫폼)
───────────────────────────────────────── */
function MingleMindmap() {
  const { subFs, iconSz, chip, sectionLabel, wrapper, arrow, hArrow } = MM;
  return (
    <div style={wrapper}>
      {/* Figma 디자인 */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "clamp(8px,1vw,12px)" }}>
        <div style={{ ...chip("rgba(255,116,0,0.07)", "rgba(255,116,0,0.3)"), color: "#F24E1E", minWidth: "auto", padding: "8px 20px", flexDirection: "row", gap: 8 }}>
          <SiFigma style={{ width: iconSz, height: iconSz, color: "#F24E1E" }} />
          <div style={{ textAlign: "left" }}>
            <div>Figma</div>
            <div style={{ fontSize: subFs, color: "rgb(148,163,184)", fontWeight: 400 }}>팀 디자인 협업 · UI/UX 기획</div>
          </div>
        </div>
      </div>

      {arrow("디자인 시스템")}

      {/* Frontend */}
      <div style={{ display: "flex", justifyContent: "center", margin: "clamp(8px,1vw,12px) 0" }}>
        <div style={{ ...MM.col, gap: 5, width: "100%" }}>
          <span style={sectionLabel("#F7DF1E")}>Frontend</span>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { icon: SiJavascript, color: "#F7DF1E", label: "JavaScript", sub: "인터랙션" },
              { icon: SiSocketdotio, color: "#010101", label: "WebSocket", sub: "실시간 채팅" },
              { icon: SiNaver, color: "#03C75A", label: "CLOVA X", sub: "AI 챗봇" },
            ].map((t) => (
              <div key={t.label} style={{ ...chip("rgba(255,255,255,0.08)", "rgba(255,255,255,0.15)") }}>
                <t.icon style={{ width: iconSz, height: iconSz, color: t.color }} />
                <span style={{ color: "rgb(203,213,225)" }}>{t.label}</span>
                <span style={{ fontSize: subFs, color: "rgb(148,163,184)", fontWeight: 400 }}>{t.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {arrow("API 통신")}

      {/* Spring Boot + MySQL */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(8px,1vw,14px)", flexWrap: "wrap", margin: "clamp(8px,1vw,12px) 0" }}>
        <div style={{ ...MM.col, gap: 5 }}>
          <span style={sectionLabel("#6DB33F")}>Backend</span>
          <div style={{ ...chip("rgba(109,179,63,0.08)", "rgba(109,179,63,0.35)"), color: "#6DB33F" }}>
            <SiSpring style={{ width: iconSz, height: iconSz, color: "#6DB33F" }} />
            <span>Spring Boot</span>
            <span style={{ fontSize: subFs, color: "rgb(148,163,184)", fontWeight: 400 }}>REST API</span>
          </div>
        </div>
        {hArrow("저장 / 조회")}
        <div style={{ ...MM.col, gap: 5 }}>
          <span style={sectionLabel("#4479A1")}>Database</span>
          <div style={{ ...chip("rgba(68,121,161,0.08)", "rgba(68,121,161,0.35)"), color: "#4479A1" }}>
            <SiMysql style={{ width: iconSz, height: iconSz, color: "#4479A1" }} />
            <span>MySQL</span>
            <span style={{ fontSize: subFs, color: "rgb(148,163,184)", fontWeight: 400 }}>상품 데이터</span>
          </div>
        </div>
      </div>

      {arrow("데이터 공급")}

      {/* KREAM Crawler */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "clamp(6px,0.8vw,10px)" }}>
        <div style={{ ...chip("rgba(255,51,102,0.08)", "rgba(255,51,102,0.35)"), color: "#ff3366", minWidth: "auto", padding: "8px 22px", flexDirection: "row", gap: 8 }}>
          <span style={{ fontSize: "clamp(18px,2.2vw,26px)" }}>🕷</span>
          <div style={{ textAlign: "left" }}>
            <div>KREAM 크롤러</div>
            <div style={{ fontSize: subFs, color: "rgb(148,163,184)", fontWeight: 400 }}>크롤링 → Excel 문서화 → DB 저장</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 프로젝트 ID에 따라 적절한 마인드맵 반환 */
function ProjectMindmap({ projectId }: { projectId: number }) {
  if (projectId === 0) return <PortfolioMindmap />;
  if (projectId === 1) return <TwinstarMindmap />;
  if (projectId === 2) return <MingleMindmap />;
  return null;
}

/* ─────────────────────────────────────────
   메인 모달 컴포넌트
───────────────────────────────────────── */
export function ProjectModal({ project }: ProjectModalProps) {
  const ProjectIcon = useMemo(() => getProjectIcon(project), [project]);
  const isVideo = isVideoAsset(project.image);
  const isPortfolio = project.id === 0;

  return (
    <div className="relative flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden" style={{ borderRadius: 18 }}>
      {/* [추가할 부분] 모바일 강제 1열 배치 CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        /* 모바일 (767px 이하) 환경 */
        @media (max-width: 767px) {
          .modal-responsive-layout { 
            flex-direction: column !important; 
            overflow-y: auto !important; /* 모바일은 전체 스크롤 하나로 합침 */
          }
          .modal-responsive-layout > div { 
            overflow-y: visible !important; /* 좌우 개별 스크롤 해제 */
            flex: none !important; 
          }
          .trouble-grid { 
            grid-template-columns: 1fr !important; /* 트러블슈팅 세로 1열 */
          }
        }
        /* PC (768px 이상) 환경 */
        @media (min-width: 768px) {
          .trouble-grid { 
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important; /* 트러블슈팅 가로 3열 */
          }
        }
      `}} />
      {/* ── 배경: 영상은 은은하게만, 오버레이로 본문 가독성 확보 ── */}
      <div className="absolute inset-0 z-0">
        {isVideo ? (
          <video src={project.image} autoPlay loop muted playsInline
            className="h-full w-full object-cover" style={{ opacity: 0.28 }}
            aria-label={`${project.title} 데모 영상`}
          />
        ) : (
          <Image src={project.image} alt="" fill sizes="94vw"
            className="object-cover" style={{ opacity: 0.28 }} loading="lazy"
            placeholder="blur" blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
          />
        )}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(18,18,18,0.97) 0%, rgba(18,18,18,0.9) 35%, rgba(18,18,18,0.6) 65%, rgba(18,18,18,0.25) 100%)" }}
          aria-hidden="true"
        />
      </div>

      {/* ── GitHub: 닫기 버튼과 대칭(위·왼쪽 16px), 원래 스타일 ── */}
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
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#2f363d"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#1b1f23"; }}
        >
          <SiGithub style={{ width: 16, height: 16, flexShrink: 0 }} aria-hidden="true" />
          <span>GitHub</span>
        </a>
      )}

      {/* ── 고정 헤더: 제목·부제목 (GitHub 바로 아래) ── */}
      <div
        className="relative z-20 shrink-0"
        style={{
          paddingTop: "clamp(52px, 8vw, 64px)",
          paddingLeft: "clamp(20px, 4vw, 40px)",
          paddingRight: "clamp(20px, 4vw, 40px)",
          paddingBottom: "clamp(12px, 1.5vw, 16px)",
        }}
      >
        <div className="flex items-center" style={{ marginBottom: 6, gap: "clamp(10px,1.2vw,14px)" }}>
          <div className="shrink-0 overflow-hidden rounded-lg" style={{ width: 32, height: 32, filter: DROP }}>
            {project.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={project.logo} alt="" className="h-full w-full object-contain" style={{ width: 32, height: 32 }} aria-hidden="true" />
            ) : (
              <ProjectIcon style={{ width: 32, height: 32, color: isPortfolio ? "#D4956A" : "#fff", display: "block" }} aria-hidden="true" />
            )}
          </div>
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            {project.category}
          </span>
        </div>
        <h2
          className="font-black leading-tight tracking-tight text-white"
          style={{ fontSize: R.title, textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
        >
          {project.title}
        </h2>
        <p
          className="mt-1.5 text-slate-300"
          style={{ fontSize: R.tagline, lineHeight: 1.45, fontWeight: 600 }}
        >
          {project.tagline}
        </p>
      </div>

      {/* ── 2열: 왼쪽(담당 파트·기술흐름·기술목록) / 오른쪽(나머지), 항상 좌우 나란히, 각각 독립 스크롤 ── */}
      <div
        className="modal-responsive-layout relative z-20 flex flex-1 min-h-0 flex-row"
        style={{
          paddingLeft: "clamp(20px, 4vw, 40px)",
          paddingRight: "clamp(20px, 4vw, 40px)",
          paddingBottom: "clamp(20px, 3vw, 28px)",
          gap: "clamp(16px, 2vw, 24px)",
          minHeight: 0,
        }}
      >
        {/* 왼쪽 열: 담당 파트, 기술 흐름, 사용 기술 목록 — 고정 비율 + 스크롤 */}
        <div
          className="flex-[1_1_0%] min-w-0 min-h-0 overflow-y-auto overflow-x-hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", minHeight: 0 }}
        >
          {project.roles && project.roles.length > 0 && (
            <div style={{ marginBottom: "clamp(14px,1.6vw,20px)" }}>
              <p style={{
                fontSize: "clamp(0.78rem,1.1vw,0.95rem)",
                fontWeight: 800,
                color: "rgb(255,255,255)",
                marginBottom: "clamp(8px,1vw,12px)",
                letterSpacing: "0.04em",
                borderLeft: "3px solid rgba(255,255,255,0.4)",
                paddingLeft: "clamp(8px,1vw,12px)",
              }}>
                담당 파트
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(6px,0.8vw,9px)" }}>
                {project.roles.map(({ part, detail }, idx) => {
                  const s = PART_STYLE[part];
                  return (
                    <div key={`${part}-${idx}`} style={{
                      display: "flex", alignItems: "flex-start",
                      gap: "clamp(10px,1.2vw,14px)",
                      padding: "clamp(9px,1.1vw,13px) clamp(13px,1.5vw,17px)",
                      borderRadius: 10,
                      backgroundColor: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderLeft: `4px solid ${s.accent}`,
                      boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                    }}>
                      <span style={{
                        flexShrink: 0, marginTop: 2,
                        fontSize: R.partBadge, fontWeight: 700, letterSpacing: "0.04em",
                        padding: "3px 10px", borderRadius: 6,
                        backgroundColor: s.badgeBg, color: s.badgeText,
                        whiteSpace: "nowrap", textTransform: "uppercase",
                        border: "1px solid rgba(255,255,255,0.2)",
                      }}>{part}</span>
                      <span style={{ fontSize: R.partDetail, color: "rgb(203,213,225)", lineHeight: 1.65 }}>{detail}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <p style={{
            fontSize: "clamp(0.78rem,1.1vw,0.95rem)",
            fontWeight: 800,
            color: "rgb(255,255,255)",
            marginBottom: "clamp(8px,1vw,12px)",
            letterSpacing: "0.04em",
            borderLeft: "3px solid rgba(255,255,255,0.4)",
            paddingLeft: "clamp(8px,1vw,12px)",
          }}>
            기술 흐름
          </p>
          <ProjectMindmap projectId={project.id} />

          {project.tech.length > 0 && (
            <div className="flex flex-wrap" style={{ gap: "clamp(5px,0.7vw,9px)", marginTop: "clamp(14px,1.6vw,20px)" }}>
              {project.tech.map((t) => {
                const { icon: TechIcon, color } = getTechMeta(t);
                return (
                  <span key={t} className="flex items-center font-mono font-semibold"
                    style={{
                      gap: "clamp(4px,0.5vw,7px)", padding: "clamp(3px,0.4vw,5px) clamp(10px,1.2vw,14px)",
                      borderRadius: 9999, fontSize: R.badge,
                      backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
                      color: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                    }}>
                    <TechIcon style={{ color, width: "clamp(10px,1.1vw,14px)", height: "clamp(10px,1.1vw,14px)", flexShrink: 0, filter: DROP }} aria-hidden="true" />
                    {t}
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* 오른쪽 열: 개요, 개발 이유, 트러블 슈팅, 기술적 의사결정, 버튼, Live — 고정 비율 + 스크롤 */}
        <div
          className="flex-[1_1_0%] min-w-0 min-h-0 overflow-y-auto overflow-x-hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", minHeight: 0 }}
        >
          {/* 프로젝트 기획 — 설명 + 플로우 시각화 */}
          <p style={{
            fontSize: "clamp(0.78rem,1.1vw,0.95rem)",
            fontWeight: 800,
            color: "rgb(255,255,255)",
            marginBottom: "clamp(8px,1vw,12px)",
            letterSpacing: "0.04em",
            borderLeft: "3px solid rgba(255,255,255,0.4)",
            paddingLeft: "clamp(8px,1vw,12px)",
          }}>
            프로젝트 기획
          </p>
          <p style={{ fontSize: R.desc, color: "rgb(203,213,225)", lineHeight: 1.72, marginBottom: (project.flowSteps && project.flowSteps.length > 0) || (project.id === 2 && project.techDecisions?.length) ? "clamp(10px,1.2vw,14px)" : "clamp(10px,1.4vw,16px)" }}>
            {project.description}
          </p>
          {project.id === 2 && project.techDecisions && project.techDecisions.length > 0 && (
            <p style={{ fontSize: R.desc, color: "rgb(203,213,225)", lineHeight: 1.72, marginBottom: project.flowSteps && project.flowSteps.length > 0 ? "clamp(14px,1.8vw,22px)" : "clamp(10px,1.4vw,16px)" }}>
              {project.techDecisions[0].detail}
            </p>
          )}
          {project.flowSteps && project.flowSteps.length > 0 && (
            <div
              className="flex flex-wrap items-center gap-x-2 gap-y-2"
              style={{
                padding: "clamp(14px,1.6vw,20px) clamp(16px,2vw,24px)",
                borderRadius: 14,
                backgroundColor: "rgba(255,255,255,0.05)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {project.flowSteps.map((step, i) => (
                <span key={i} className="flex items-center gap-x-1.5">
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "6px 12px",
                      borderRadius: 10,
                      backgroundColor: "rgba(255,255,255,0.08)",
                      fontSize: "clamp(0.78rem,1vw,0.9rem)",
                      fontWeight: 600,
                      color: "rgb(255,255,255)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <span style={{ fontSize: "1.1em" }}>{step.emoji}</span>
                    <span>{step.label}</span>
                  </span>
                  {i < project.flowSteps!.length - 1 && (
                    <span style={{ color: "rgb(148,163,184)", fontWeight: 700, fontSize: "clamp(0.7rem,0.9vw,0.82rem)" }} aria-hidden="true">➔</span>
                  )}
                </span>
              ))}
            </div>
          )}

          {/* 트러블 슈팅 — 카드 간격·심플+그림자, 메트릭 시 Before/After 표시 */}
          {project.troubleshooting && project.troubleshooting.length > 0 && (
            <div style={{ marginTop: "clamp(20px,2.5vw,28px)" }}>
              <p style={{
                fontSize: "clamp(0.78rem,1.1vw,0.95rem)",
                fontWeight: 800,
                color: "rgb(255,255,255)",
                marginBottom: "clamp(8px,1vw,12px)",
                letterSpacing: "0.04em",
                borderLeft: "3px solid rgba(255,255,255,0.4)",
                paddingLeft: "clamp(8px,1vw,12px)",
              }}>
                트러블 슈팅
              </p>
              <div
                className="trouble-grid grid"
                style={{ gap: "clamp(14px,1.8vw,22px)" }}
              >
                {project.troubleshooting.map((item, idx) => (
                  <div
                    key={`ts-${idx}`}
                    style={{
                      padding: "clamp(16px,1.8vw,22px) clamp(18px,2vw,24px)",
                      borderRadius: 14,
                      backgroundColor: "rgba(255,255,255,0.05)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      minWidth: 0,
                    }}
                  >
                    <p style={{ fontSize: "clamp(0.82rem,1.05vw,0.94rem)", fontWeight: 800, color: "rgb(255,255,255)", marginBottom: "clamp(10px,1.2vw,14px)" }}>
                      {item.title}
                    </p>
                    <p style={{ fontSize: "clamp(0.72rem,0.95vw,0.82rem)", color: "rgb(203,213,225)", lineHeight: 1.6, marginBottom: "clamp(4px,0.6vw,6px)" }}>
                      <strong style={{ color: "rgb(226,232,240)" }}>문제:</strong> {item.problem}
                    </p>
                    {item.cause && (
                      <p style={{ fontSize: "clamp(0.72rem,0.95vw,0.82rem)", color: "rgb(203,213,225)", lineHeight: 1.6, marginBottom: "clamp(4px,0.6vw,6px)" }}>
                        <strong style={{ color: "rgb(226,232,240)" }}>원인:</strong> {item.cause}
                      </p>
                    )}
                    <p style={{ fontSize: "clamp(0.72rem,0.95vw,0.82rem)", color: "rgb(203,213,225)", lineHeight: 1.6, marginBottom: item.result || item.metrics ? "clamp(4px,0.6vw,6px)" : 0 }}>
                      <strong style={{ color: "rgb(226,232,240)" }}>해결:</strong> {item.solution}
                    </p>
                    {item.result && (
                      <p style={{ fontSize: "clamp(0.72rem,0.95vw,0.82rem)", color: "rgb(203,213,225)", lineHeight: 1.6, marginBottom: item.metrics ? "clamp(4px,0.6vw,6px)" : 0 }}>
                        <strong style={{ color: "rgb(226,232,240)" }}>결과:</strong> {item.result}
                      </p>
                    )}
                    {item.metrics && (
                      <div
                        style={{
                          marginTop: "clamp(12px,1.4vw,16px)",
                          marginBottom: 0,
                          padding: "clamp(12px,1.4vw,16px) clamp(14px,1.6vw,18px)",
                          borderRadius: 10,
                          backgroundColor: "rgba(0,0,0,0.2)",
                          boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                      >
                        <p style={{ fontSize: "clamp(0.68rem,0.88vw,0.78rem)", fontWeight: 700, color: "rgb(148,163,184)", marginBottom: 8 }}>
                          {item.metrics.label}
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                          <span style={{ fontSize: "clamp(0.72rem,0.9vw,0.82rem)", color: "rgb(203,213,225)", padding: "4px 8px", borderRadius: 6, backgroundColor: "rgba(255,255,255,0.08)" }}>
                            Before {item.metrics.before}
                          </span>
                          <span style={{ color: "rgb(148,163,184)", fontWeight: 700 }}>➔</span>
                          <span style={{ fontSize: "clamp(0.72rem,0.9vw,0.82rem)", fontWeight: 700, padding: "4px 8px", borderRadius: 6, backgroundColor: "rgba(34,197,94,0.2)", color: "#4ade80" }}>
                            After {item.metrics.after}
                          </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ fontSize: "clamp(0.78rem,1vw,0.88rem)", fontWeight: 800, color: "#4ade80" }}>
                            ⬇ {item.metrics.improvementPercent}% 개선
                          </span>
                        </div>
                        <div style={{ marginTop: 8, height: 8, borderRadius: 4, backgroundColor: "rgba(255,255,255,0.1)", overflow: "hidden", display: "flex" }}>
                          <div
                            style={{
                              width: `${100 - item.metrics.improvementPercent}%`,
                              height: "100%",
                              backgroundColor: "#22c55e",
                            }}
                          />
                          <div
                            style={{
                              width: `${item.metrics.improvementPercent}%`,
                              height: "100%",
                              backgroundColor: "rgba(255,255,255,0.08)",
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.id !== 2 && project.techDecisions && project.techDecisions.length > 0 && (
            <div
              style={{
                marginTop: "clamp(16px,2vw,24px)",
                padding: "clamp(16px,2vw,22px) clamp(18px,2.2vw,26px)",
                borderRadius: 16,
                backgroundColor: "rgba(255,255,255,0.05)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <p style={{
                fontSize: "clamp(0.78rem,1.1vw,0.95rem)",
                fontWeight: 800,
                color: "rgb(255,255,255)",
                marginBottom: "clamp(8px,1vw,12px)",
                letterSpacing: "0.04em",
                borderLeft: "3px solid rgba(255,255,255,0.4)",
                paddingLeft: "clamp(8px,1vw,12px)",
              }}>
                기술적 의사결정
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(12px,1.4vw,16px)" }}>
                {project.techDecisions.map((item, idx) => (
                  <div
                    key={`td-${idx}`}
                    style={{
                      padding: "clamp(12px,1.4vw,16px) clamp(14px,1.6vw,18px)",
                      borderRadius: 12,
                      backgroundColor: "rgba(0,0,0,0.2)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderLeft: "4px solid #64748b",
                    }}
                  >
                    <p style={{ fontSize: "clamp(0.82rem,1.05vw,0.94rem)", fontWeight: 800, color: "rgb(255,255,255)", marginBottom: "clamp(6px,0.8vw,10px)" }}>
                      {item.title}
                    </p>
                    <p style={{ fontSize: R.desc, color: "rgb(203,213,225)", lineHeight: 1.72 }}>
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.live && (
            <div style={{ marginTop: "clamp(12px,1.4vw,20px)" }}>
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center transition hover:opacity-80"
                style={{
                  gap: "clamp(5px,0.6vw,8px)", padding: "clamp(6px,0.7vw,9px) clamp(16px,2vw,24px)",
                  borderRadius: 9999, fontSize: R.btnText, fontWeight: 700,
                  backgroundColor: "rgba(255,255,255,0.15)", color: "#fff", textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}>
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
