"use client";

import Image from "next/image";
import { SiGithub, SiOpencv } from "react-icons/si";
import {
  Cloud, ExternalLink, FilePlus2, ListChecks, Monitor, Palette, ScanLine, Server, type LucideIcon,
} from "lucide-react";
import { getTechMeta } from "@/utils/projectHelpers";
import { Project, isVideoAsset } from "@/constants/Projects";
import { HEADER } from "@/components/modals/ArchiveProjectModal";
import { TechDecisionsList } from "@/components/modals/TechDecisionsList";

interface OmrProjectModalProps {
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

const DROP   = "drop-shadow(0 1px 3px rgba(0,0,0,0.22))";

interface StoryPoint {
  title: string;
  text: string;
}

/** OMR narrative lives here (not in DB) so the case-study copy stays OMR-only. */
const OMR_STORY = {
  planning: [
    {
      label: "배경",
      text: "동주민센터의 설문 집계 업무는 약 2,000장의 종이 설문지를 문항별로 수기 계수한 뒤 엑셀에 전사하는 방식으로 이루어졌다. 이 과정은 판단이 개입하지 않는 단순 반복 작업임에도 처리 시간이 길었고, 계수·전사 단계마다 인적 오류가 누적되는 구조적 한계를 지녔다.",
    },
    {
      label: "제안",
      text: "‘스캔만으로 집계가 완결된다’는 목표를 설정하고, 스캔 이미지에서 기표를 자동 판독하여 엑셀 통계까지 산출하는 웹 기반 OMR 솔루션을 기획·제안했다. 수작업 집계를 이미지 판독 문제로 재정의한 것이 출발점이다.",
    },
    {
      label: "역할",
      text: "요구사항 정의, 판독 파이프라인 설계, 화면 구현, 배포에 이르는 전 과정을 단독으로 수행했다. 반복적 구현은 Cursor 기반 AI 코딩으로, UI 구성은 21st.dev 컴포넌트로 가속하여 개발 주기를 단축했다.",
    },
    {
      label: "성과",
      text: "수기 계수 중심의 업무 흐름을 ‘스캔 업로드 → 자동 판독 → 엑셀 산출’의 파이프라인으로 대체했으며, 자동 인식률 90% 이상을 달성했다.",
    },
  ],
  trouble: {
    title: "AI가 제안한 동적 검출 로직을 폐기하고 정적 템플릿 구조로 재설계",
    symptom:
      "AI가 제시한 초기 로직은 스캔마다 기표 원의 위치를 새로 검출하고, 이를 ‘첫 원의 좌표 + 등간격 y 증분’ 계산과 결합하는 구조였다. 설문지는 x좌표가 고정되고 y좌표만 증가하는 단순 배열임에도, 테스트마다 판독 위치가 한 칸씩 하향 이동하여 실제 기표가 아닌 칸(특히 하단 ‘일반10’)이 선택으로 오판정되었다.",
    insight:
      "프롬프트를 수정해 코드를 반복 재생성하는 대신, 생성을 중단하고 현상을 직접 분석했다. 그 결과 오류의 근원은 계산식이 아니라, 스캔이라는 물리적 변수를 설계 단계에서 고려하지 않은 구조 자체에 있음을 확인했다.",
    causes: [
      {
        title: "동적 검출의 취약성",
        text: "스캔마다 원을 재검출하는 방식은 인쇄 테두리·가로줄·낙서 등의 노이즈에 기준점이 포착되어 불안정해진다. 여기에 등간격 계산이 결합되면서 오차가 칸 단위로 누적되었다.",
      },
      {
        title: "스캐너의 물리적 왜곡",
        text: "복합기 스캔본은 장마다 기울기·잘림·해상도가 미세하게 달라, 단일 기준 이미지에서 측정한 절대 좌표가 유효성을 잃는다.",
      },
      {
        title: "기준 영역의 오설정",
        text: "표 영역에 하단 ‘인적사항’의 검은 띠가 포함되면서 전체 종횡비가 세로 방향으로 왜곡되었고, 하단으로 갈수록 편차가 커져 ‘일반10’ 칸이 검은 띠와 중첩되었다.",
      },
    ] satisfies StoryPoint[],
    actions: [
      {
        title: "템플릿 좌표 고정",
        text: "빈 양식에서 원 좌표를 1회 추출하고 템플릿 에디터에서 수동 교정한 뒤, 해당 상대좌표를 고정했다. 이후 스캔본에 대해서는 원을 재검출하지 않는다.",
      },
      {
        title: "기준 영역 정규화",
        text: "노이즈 요인인 인적사항 띠를 제외하고, 순수 기표란의 네 모서리를 기준으로 모든 스캔본을 동일한 크기로 투영 변환하여 정렬했다.",
      },
      {
        title: "판별 기준 정교화",
        text: "인쇄된 원 테두리가 아닌, 원 내부의 흑색 픽셀 비율만을 근거로 마킹 여부를 판정하도록 기준을 재정의했다.",
      },
    ] satisfies StoryPoint[],
    result:
      "테스트 간 판독 위치가 이동하던 현상이 해소되었다. 오탐 칸(일반10)의 채움률이 0.89에서 0.003으로 감소하여 실제 기표만 선택으로 분류되었으며, 전체 자동 인식률은 90% 이상을 유지한다.",
    metric: {
      label: "오탐 칸(일반10) 채움률",
      before: "0.89",
      after: "0.003",
      percent: 99,
    },
  },
  operations: [
    {
      title: "잔여 10%는 예외 검토로 처리",
      text: "인식 실패의 대부분은 양식 인쇄 불량 또는 스캔 과정의 용지 뒤틀림에서 기인한다. 판정 신뢰도가 낮은 장은 예외 목록으로 분리하여, 원본 대조를 통해 수동 확인할 수 있도록 했다.",
    },
    {
      title: "코드 수정 없는 양식 확장",
      text: "양식 마법사에서 빈 설문지를 업로드하고 모서리·문항 영역·원 위치를 지정하면 신규 템플릿으로 저장된다. 이에 따라 타 부서의 설문 양식도 동일한 절차로 등록할 수 있다.",
    },
  ] satisfies StoryPoint[],
};

const T = OMR_STORY.trouble;

/* Studiova-style palette: dark surface + champagne gold accent */
const GOLD = "#d6b67e";
const GOLD_SOFT = "rgba(214,182,126,0.12)";
const GOLD_LINE = "rgba(214,182,126,0.35)";
const LINE = "rgba(255,255,255,0.08)";
const MUTED = "rgb(148,163,184)";
const SURFACE = "rgba(14,14,14,0.72)";

const BODY: React.CSSProperties = { margin: 0, fontSize: R.desc, color: "rgb(203,213,225)", lineHeight: 1.72 };
const SMALL: React.CSSProperties = { margin: 0, fontSize: "clamp(0.76rem,1vw,0.88rem)", color: MUTED, lineHeight: 1.65 };
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

const pad = (n: number) => String(n).padStart(2, "0");

function NumBadge({ n }: { n: number }) {
  return (
    <span style={{
      flexShrink: 0, fontFamily: MONO, fontSize: "clamp(0.66rem,0.85vw,0.76rem)", fontWeight: 700,
      padding: "2px 7px", borderRadius: 5, color: GOLD, backgroundColor: GOLD_SOFT, border: `1px solid ${GOLD_LINE}`,
    }}>
      {pad(n)}
    </span>
  );
}

/** Eyebrow header: ( 01 ) ──── [ label ] */
function SectionTitle({ index, children }: { index: number; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "clamp(10px,1.2vw,14px)" }}>
      <span style={{
        width: 24, height: 24, borderRadius: "50%", display: "grid", placeItems: "center", flexShrink: 0,
        fontFamily: MONO, fontSize: 11, fontWeight: 700, color: "#141414", backgroundColor: GOLD,
      }}>
        {pad(index)}
      </span>
      <span style={{ width: 28, height: 1, backgroundColor: GOLD_LINE }} aria-hidden="true" />
      <span style={{
        fontSize: "clamp(0.74rem,0.95vw,0.86rem)", fontWeight: 700, color: "rgb(226,232,240)", letterSpacing: "0.02em",
        padding: "3px 10px", borderRadius: 9999, border: `1px solid ${LINE}`, backgroundColor: "rgba(255,255,255,0.04)",
      }}>
        {children}
      </span>
    </div>
  );
}

function StepLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      display: "flex", alignItems: "center", gap: 7, margin: "clamp(16px,1.8vw,20px) 0 8px",
      fontSize: "clamp(0.72rem,0.9vw,0.82rem)", fontWeight: 700, color: GOLD,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: GOLD }} aria-hidden="true" />
      {children}
    </p>
  );
}

interface FeedItem {
  title: string;
  text: string;
  icon?: LucideIcon;
}

/** Activity-feed list: bordered icon tile + title + muted text, hairline dividers between rows. */
function FeedList({ items }: { items: FeedItem[] }) {
  return (
    <div style={{ borderRadius: 12, border: `1px solid ${LINE}`, backgroundColor: SURFACE }}>
      {items.map((item, i) => (
        <div key={item.title} style={{
          display: "flex", gap: "clamp(10px,1.2vw,14px)", alignItems: "flex-start",
          padding: "clamp(11px,1.3vw,14px) clamp(12px,1.4vw,16px)",
          borderTop: i === 0 ? "none" : `1px solid ${LINE}`,
        }}>
          <span style={{
            width: 28, height: 28, flexShrink: 0, borderRadius: 7, display: "grid", placeItems: "center",
            border: "1px solid rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.04)",
            color: "rgb(203,213,225)", fontFamily: MONO, fontSize: 11, fontWeight: 700,
          }}>
            {item.icon ? <item.icon style={{ width: 14, height: 14 }} aria-hidden="true" /> : pad(i + 1)}
          </span>
          <div style={{ minWidth: 0 }}>
            <p style={{ margin: "3px 0 3px", fontSize: "clamp(0.8rem,1.05vw,0.92rem)", fontWeight: 600, color: "#fff" }}>{item.title}</p>
            <p style={SMALL}>{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const PART_ICON: Record<string, LucideIcon> = {
  Design: Palette, Frontend: Monitor, Backend: Server, AI: ScanLine, DevOps: Cloud,
};
const OPERATION_ICONS: LucideIcon[] = [ListChecks, FilePlus2];

/** OMR PROGRAM (id 3) detail — forked from ArchiveProjectModal for OMR-specific layout. */
export function OmrProjectModal({ project }: OmrProjectModalProps) {
  const isVideo = isVideoAsset(project.image);

  return (
    <div className="relative flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden" style={{ borderRadius: 18 }}>
      {/* [추가할 부분] 모바일 강제 1열 배치 CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        /* 모바일 (767px 이하) 환경 */
        @media (max-width: 767px) {
          .archive-modal-layout { 
            flex-direction: column !important; 
            overflow-y: auto !important; /* 모바일은 전체 스크롤 하나로 합침 */
          }
          .archive-modal-layout > div { 
            overflow-y: visible !important; /* 좌우 개별 스크롤 해제 */
            flex: none !important; 
          }
          .archive-trouble-grid { 
            grid-template-columns: 1fr !important; /* 트러블슈팅 세로 1열 */
          }
        }
        /* PC (768px 이상) 환경 */
        @media (min-width: 768px) {
          .archive-trouble-grid { 
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important; /* 트러블슈팅 가로 3열 */
          }
        }
      `}} />
      {/* ── 배경: 영상은 은은하게만, 오버레이로 본문 가독성 확보 ── */}
      <div className="z-0" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {isVideo ? (
          <video src={project.image} autoPlay loop muted playsInline
            aria-label={`${project.title} 데모 영상`}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              opacity: 0.28,
            }}
          />
        ) : project.image ? (
          <Image src={project.image} alt="" fill sizes="94vw"
            className="object-cover" style={{ opacity: 0.28 }} loading="lazy"
            placeholder="blur" blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
          />
        ) : null}
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
      <div className="relative z-20 shrink-0" style={HEADER.wrap}>
        <div className="flex items-center" style={HEADER.meta}>
          <div className="shrink-0 overflow-hidden rounded-lg" style={HEADER.icon}>
            {project.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={project.logo} alt="" className="h-full w-full object-contain" aria-hidden="true" />
            ) : (
              <SiOpencv style={{ width: "100%", height: "100%", color: "#fff", display: "block" }} aria-hidden="true" />
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

      {/* ── 2열: 왼쪽(담당 파트·기술흐름·기술목록) / 오른쪽(나머지), 항상 좌우 나란히, 각각 독립 스크롤 ── */}
      <div
        className="archive-modal-layout relative z-20 flex flex-1 min-h-0 flex-row"
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
              <SectionTitle index={1}>담당 파트</SectionTitle>
              <FeedList items={project.roles.map(({ part, detail }) => ({ title: part, text: detail, icon: PART_ICON[part] ?? Monitor }))} />
            </div>
          )}

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
          <SectionTitle index={2}>프로젝트 기획</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(8px,1vw,10px)", marginBottom: "clamp(12px,1.4vw,16px)" }}>
            {OMR_STORY.planning.map((item, i) => (
              <div key={item.label} style={{
                padding: "clamp(12px,1.4vw,16px) clamp(14px,1.6vw,18px)", borderRadius: 12,
                border: `1px solid ${i === 0 ? GOLD_LINE : LINE}`,
                background: i === 0 ? `linear-gradient(180deg, ${GOLD_SOFT}, ${SURFACE}), ${SURFACE}` : SURFACE,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <NumBadge n={i + 1} />
                  <span style={{ fontSize: "clamp(0.86rem,1.1vw,0.98rem)", fontWeight: 700, color: "#fff" }}>{item.label}</span>
                </div>
                <p style={SMALL}>{item.text}</p>
              </div>
            ))}
          </div>
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

          <div style={{ marginTop: "clamp(20px,2.5vw,28px)" }}>
            <SectionTitle index={3}>트러블 슈팅</SectionTitle>
            <div style={{
              padding: "clamp(16px,1.8vw,22px) clamp(18px,2vw,24px)", borderRadius: 14,
              border: `1px solid ${GOLD_LINE}`,
              background: `linear-gradient(180deg, ${GOLD_SOFT} 0%, transparent 38%), ${SURFACE}`,
              boxShadow: "0 10px 40px rgba(0,0,0,0.45)",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <NumBadge n={1} />
                <p style={{ margin: 0, fontSize: "clamp(0.92rem,1.2vw,1.06rem)", fontWeight: 800, color: "#fff", lineHeight: 1.45 }}>
                  {T.title}
                </p>
              </div>
              <p style={{ margin: "8px 0 0", fontFamily: MONO, fontSize: "clamp(0.7rem,0.9vw,0.8rem)", color: GOLD }}>
                dynamic detection ➔ static template lock-in
              </p>
              <div style={{ height: 1, backgroundColor: LINE, margin: "clamp(12px,1.4vw,16px) 0 0" }} />

              <StepLabel>문제 상황</StepLabel>
              <p style={SMALL}>{T.symptom}</p>

              <div style={{ margin: "clamp(14px,1.6vw,18px) 0 0", padding: "clamp(11px,1.3vw,14px) clamp(13px,1.5vw,16px)", borderRadius: 10, border: `1px solid ${GOLD_LINE}`, backgroundColor: GOLD_SOFT }}>
                <p style={{ ...BODY, color: "#f3e3c3", fontWeight: 600 }}>{T.insight}</p>
              </div>

              <StepLabel>원인 분석</StepLabel>
              <FeedList items={T.causes} />

              <StepLabel>해결 전략</StepLabel>
              <FeedList items={T.actions} />

              <StepLabel>결과</StepLabel>
              <p style={SMALL}>{T.result}</p>

              <div style={{ marginTop: "clamp(12px,1.4vw,16px)", display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 10, padding: "clamp(12px,1.4vw,16px)", borderRadius: 10, border: `1px solid ${LINE}`, backgroundColor: "rgba(0,0,0,0.25)" }}>
                <div>
                  <p style={{ margin: 0, fontFamily: MONO, fontSize: 11, color: MUTED }}>BEFORE</p>
                  <p style={{ margin: 0, fontFamily: MONO, fontSize: "clamp(1.1rem,1.6vw,1.4rem)", fontWeight: 700, color: "rgb(203,213,225)" }}>{T.metric.before}</p>
                </div>
                <span style={{ color: GOLD }} aria-hidden="true">➔</span>
                <div>
                  <p style={{ margin: 0, fontFamily: MONO, fontSize: 11, color: MUTED }}>AFTER</p>
                  <p style={{ margin: 0, fontFamily: MONO, fontSize: "clamp(1.1rem,1.6vw,1.4rem)", fontWeight: 700, color: GOLD }}>{T.metric.after}</p>
                </div>
                <p style={{ gridColumn: "1 / -1", margin: 0, fontSize: "clamp(0.72rem,0.9vw,0.82rem)", color: MUTED }}>
                  {T.metric.label} · <span style={{ color: GOLD, fontWeight: 700 }}>{T.metric.percent}% 감소</span> · 전체 자동 인식률 90% 이상
                </p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "clamp(20px,2.5vw,28px)" }}>
            <SectionTitle index={4}>현장 운영을 위한 설계</SectionTitle>
            <FeedList items={OMR_STORY.operations.map((item, i) => ({ ...item, icon: OPERATION_ICONS[i] }))} />
          </div>

          {project.techDecisions && project.techDecisions.length > 0 && (
            <TechDecisionsList items={project.techDecisions} />
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
