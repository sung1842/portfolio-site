"use client";

import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { type ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { BarChart } from "@/components/charts/bar-chart";
import { Bar } from "@/components/charts/bar";
import { BarXAxis } from "@/components/charts/bar-x-axis";
import { Grid } from "@/components/charts/grid";
import { getTechMeta } from "@/utils/projectHelpers";
import type { ExperimentCondition, ExperimentStudy, Project } from "@/constants/Projects";
import { DESIGN_CONFIG } from "@/config/design";

/**
 * OPENRELAY archive detail — scroll-scrubbed experiment report.
 *
 * One chapter fills the pane. If that chapter is taller than the pane, scroll inside it
 * until the top or bottom edge; only then does another scroll move to the previous or next chapter.
 * Surfaces follow the Listen App glass values (24px radius, 8–10% borders, 24px blur, deep soft shadow).
 *
 * Styling is scoped CSS (xr-*): this project runs the Tailwind v4 compiler with v3 directives,
 * so theme-based utilities (spacing/colors/breakpoints) are not emitted.
 */

const ACCENT = DESIGN_CONFIG.colors.accent; // #22d3ee — reserved for F (the condition under test)
const KEYS = ["P", "F", "H"] as const;
const BAR_FILL: Record<ExperimentCondition["id"], string> = {
  P: "rgba(255,255,255,0.30)",
  F: ACCENT,
  H: "rgba(255,255,255,0.72)",
};

const VERDICT = "무료 릴레이, 응급 패치까지는 된다.";
const RECOMMENDATION = "L1–L2 응급 패치와 초안은 무료 릴레이로, L3 다파일 리팩터는 유료 에이전트로.";
const QUESTIONS = [
  { k: "Q1", q: "무료 릴레이가 유료 모델을 대체할 퀄리티인가", how: "P(유료 상한) vs F(무료만) 성공률" },
  { k: "Q2", q: "무료 티어만으로 코딩 작업을 끝까지 끌고 갈 수 있는가", how: "F 단독으로 10과제 end-to-end" },
  { k: "Q3", q: "작업 중 모델이 바뀌어도 일관성이 유지되는가", how: "H(유료→무료 hop) + consistency break" },
] as const;

const CSS = `
.xr-root { position:relative; flex:1 1 0; min-height:0; display:flex; flex-direction:column; color:#fff; -webkit-font-smoothing:antialiased;
  background:linear-gradient(to bottom, rgba(6,6,8,0.42), rgba(6,6,8,0.7) 40%, rgba(6,6,8,0.78)); }
.xr { position:relative; flex:1 1 0; min-height:0; overflow-y:auto; overflow-x:hidden;
  scrollbar-width:none; -ms-overflow-style:none; }
.xr::-webkit-scrollbar { display:none; }
.xr * { box-sizing:border-box; }
.xr p, .xr h2, .xr h3, .xr ul { margin:0; }
.xr ul { padding:0; list-style:none; }
.xr-blob { position:absolute; left:50%; top:-120px; width:560px; height:560px; transform:translateX(-50%);
  border-radius:9999px; background:${ACCENT}; opacity:0.06; filter:blur(90px); pointer-events:none; }
.xr-stage { position:relative; overflow:hidden; }
.xr-view { position:relative; height:100%; display:flex; align-items:flex-start; justify-content:center;
  padding:clamp(10px,2.2vh,40px) clamp(14px,3.2vw,48px); overflow-x:hidden; overflow-y:auto;
  overscroll-behavior:contain; scrollbar-width:none; -ms-overflow-style:none; }
.xr-view::-webkit-scrollbar { display:none; }
.xr-inner { width:100%; max-width:min(960px,100%); min-width:0; }
.xr-stack { display:flex; flex-direction:column; gap:clamp(10px,2vh,26px); min-width:0; }
.xr-micro { font-size:clamp(9px,1.4vh,11px); letter-spacing:0.3em; text-transform:uppercase; font-weight:600; color:rgba(255,255,255,0.5); }
.xr-micro b { color:${ACCENT}; font-weight:700; }
.xr-h1 { font-size:clamp(1.15rem,min(4.2vw,5.2vh),3.3rem); font-weight:700; letter-spacing:-0.03em; line-height:1.12; perspective:600px; }
.xr-h1 span { display:inline-block; will-change:transform; }
.xr-h2 { font-size:clamp(1.05rem,min(2.4vw,3.2vh),1.9rem); font-weight:600; letter-spacing:-0.02em; line-height:1.3; }
.xr-lead { font-size:clamp(0.8rem,min(1.25vw,1.7vh),1.08rem); line-height:1.65; color:rgba(255,255,255,0.68); max-width:62ch; }
.xr-body { font-size:clamp(0.78rem,min(1.1vw,1.5vh),0.96rem); line-height:1.65; color:rgba(255,255,255,0.68); }
.xr-dim { color:rgba(255,255,255,0.45); }
.xr-mono { font-family:ui-monospace,SFMono-Regular,Menlo,monospace; font-variant-numeric:tabular-nums; }
.xr-glass { position:relative; border-radius:clamp(14px,2.4vh,24px); border:1px solid rgba(255,255,255,0.09);
  background:linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.012) 55%), rgba(8,8,10,0.55);
  backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px);
  box-shadow:0 25px 80px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06); }
.xr-glass.hero { border-color:rgba(34,211,238,0.35); box-shadow:0 25px 80px rgba(0,0,0,0.35), 0 0 40px rgba(34,211,238,0.14), inset 0 1px 0 rgba(255,255,255,0.08); }
.xr-glass.bad { border-color:rgba(248,113,113,0.3); }
.xr-pill { display:inline-flex; align-items:center; gap:8px; height:clamp(26px,3.6vh,32px); padding:0 14px; border-radius:9999px;
  border:1px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.05); backdrop-filter:blur(12px); }
.xr-row { display:grid; gap:clamp(8px,1.6vh,14px); min-width:0; }
.xr-kpi { padding:clamp(12px,2vh,22px) clamp(14px,2.2vw,22px) clamp(12px,1.8vh,20px); }
.xr-kpi-n { margin-top:clamp(6px,1.4vh,14px); font-size:clamp(1.55rem,min(4vw,5vh),3.2rem); font-weight:700; letter-spacing:-0.04em; line-height:1; }
.xr-kpi-n small { font-size:0.45em; font-weight:600; letter-spacing:0; color:rgba(255,255,255,0.5); margin-left:2px; }
.xr-dots { display:flex; gap:5px; margin-top:clamp(8px,1.6vh,16px); }
.xr-dots i { width:clamp(10px,1.6vw,14px); height:6px; border-radius:3px; background:rgba(255,255,255,0.12); display:block; }
.xr-dots i.on { background:rgba(255,255,255,0.85); }
.xr-dots i.on.f { background:${ACCENT}; box-shadow:0 0 10px rgba(34,211,238,0.6); }
.xr-dots i.x { background:rgba(248,113,113,0.85); box-shadow:0 0 10px rgba(248,113,113,0.5); }
.xr-q { display:flex; gap:clamp(10px,2vw,18px); align-items:flex-start; padding:clamp(10px,1.8vh,20px) clamp(12px,2vw,22px); }
.xr-q-k { flex-shrink:0; width:clamp(28px,4vh,40px); height:clamp(28px,4vh,40px); border-radius:9999px; display:flex; align-items:center; justify-content:center;
  border:1px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.08); font-size:clamp(0.65rem,1.4vh,0.78rem); font-weight:700; }
.xr-q-t { font-size:clamp(0.84rem,min(1.3vw,1.9vh),1.12rem); font-weight:600; letter-spacing:-0.01em; line-height:1.35; }
.xr-q-s { margin-top:4px; font-size:clamp(0.68rem,1.3vh,0.78rem); color:rgba(255,255,255,0.5); }
.xr-design { display:grid; grid-template-columns:minmax(176px,1.15fr) repeat(3,minmax(0,1fr)); gap:clamp(6px,1.2vh,10px); min-width:0; }
.xr-design .hd { display:flex; flex-direction:column; justify-content:center; padding:clamp(8px,1.6vh,14px) clamp(10px,1.6vw,18px); min-height:clamp(48px,8vh,64px); }
.xr-design .cell { display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; padding:clamp(8px,1.6vh,14px) 6px; min-height:clamp(48px,8vh,64px); border-radius:clamp(12px,2vh,18px); }
.xr-design .cell.f { border-color:rgba(34,211,238,0.22); }
.xr-design .lv { font-family:var(--font-noto-sans-kr),"Noto Sans KR","Apple SD Gothic Neo","Malgun Gothic",sans-serif; font-size:clamp(0.82rem,1.6vh,0.98rem); font-weight:700; letter-spacing:-0.02em; white-space:nowrap; }
.xr-design .sub { font-size:clamp(0.62rem,1.2vh,0.72rem); color:rgba(255,255,255,0.5); margin-top:3px; line-height:1.35; }
.xr-chart-wrap { display:grid; grid-template-columns:1fr; gap:clamp(8px,1.4vh,14px); min-width:0; }
.xr-chart { padding:clamp(12px,2vh,22px) clamp(12px,1.8vw,18px) clamp(6px,1vh,10px); font-size:11px; min-width:0;
  --chart-grid:rgba(255,255,255,0.09); --chart-label:rgba(255,255,255,0.55); --chart-foreground:rgba(255,255,255,0.55);
  --chart-foreground-muted:rgba(255,255,255,0.45); --chart-background:transparent; --chart-crosshair:rgba(255,255,255,0.3); }
.xr-legend { display:flex; flex-wrap:wrap; gap:clamp(8px,1.4vw,14px); padding:0 6px 6px; }
.xr-legend span { display:inline-flex; align-items:center; gap:7px; font-size:clamp(0.68rem,1.3vh,0.76rem); color:rgba(255,255,255,0.65); }
.xr-legend i { width:10px; height:10px; border-radius:9999px; display:inline-block; }
.xr-read { padding:clamp(12px,2vh,20px) clamp(14px,2vw,22px); display:flex; flex-direction:column; gap:clamp(8px,1.4vh,12px); min-width:0; }
.xr-read-row { display:grid; grid-template-columns:1fr repeat(3,52px); align-items:baseline; gap:8px; padding:10px 0; border-top:1px solid rgba(255,255,255,0.07); }
.xr-read-row:first-of-type { border-top:0; padding-top:0; }
.xr-read-row .lv { font-weight:600; font-size:0.9rem; }
.xr-read-row .lv small { display:block; font-size:0.7rem; color:rgba(255,255,255,0.45); font-weight:500; margin-top:2px; }
.xr-read-row .v { text-align:right; font-size:0.95rem; font-weight:600; color:rgba(255,255,255,0.75); }
.xr-read-row .v.f { color:${ACCENT}; }
.xr-read-row .v.low { color:#fca5a5; }
.xr-matrix { display:grid; grid-template-columns:84px 1fr repeat(3,minmax(44px,64px)); gap:6px 10px; align-items:center; }
.xr-matrix .th { font-size:11px; letter-spacing:0.2em; text-transform:uppercase; color:rgba(255,255,255,0.45); text-align:center; padding-bottom:6px; }
.xr-matrix .th.l { text-align:left; }
.xr-matrix .th.f { color:${ACCENT}; }
.xr-matrix .id { font-size:0.8rem; font-weight:600; color:rgba(255,255,255,0.8); }
.xr-matrix .tt { font-size:0.82rem; color:rgba(255,255,255,0.62); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.xr-matrix .grp { grid-column:1 / -1; margin-top:8px; font-size:11px; letter-spacing:0.22em; text-transform:uppercase; color:rgba(255,255,255,0.4); }
.xr-cell { height:30px; border-radius:10px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.05);
  display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; }
.xr-cell.pass { background:rgba(255,255,255,0.14); border-color:rgba(255,255,255,0.14); color:rgba(255,255,255,0.9); }
.xr-cell.pass.f { background:rgba(34,211,238,0.16); border-color:rgba(34,211,238,0.35); color:${ACCENT}; box-shadow:0 0 14px rgba(34,211,238,0.18); }
.xr-cell.fail { background:rgba(239,68,68,0.16); border-color:rgba(248,113,113,0.45); color:#fecaca; box-shadow:0 0 16px rgba(248,113,113,0.3); }
.xr-fails { display:grid; gap:12px; margin-top:16px; }
.xr-fail { padding:16px 20px; }
.xr-fail-k { font-size:0.74rem; font-weight:700; color:#fca5a5; letter-spacing:0.04em; }
.xr-fail p.xr-body { margin-top:6px; }
.xr-claim { padding:clamp(14px,2.2vh,22px) clamp(16px,2.4vw,24px); }
.xr-claim .xr-micro { margin-bottom:clamp(6px,1vh,10px); }
.xr-claim.stop .xr-micro { color:#fca5a5; }
.xr-claim.keep .xr-micro { color:#6ee7b7; }
.xr-claim p.t { font-size:clamp(0.9rem,min(1.4vw,2vh),1.15rem); font-weight:600; line-height:1.5; }
.xr-app { padding:clamp(20px,3vh,56px) clamp(14px,3.2vw,48px) clamp(28px,4vh,64px); display:flex; flex-direction:column; gap:clamp(8px,1.4vh,14px); max-width:min(960px,100%); margin:0 auto; width:100%; min-width:0;
  overflow-x:hidden; overflow-y:auto; overscroll-behavior:contain; scrollbar-width:none; -ms-overflow-style:none; }
.xr-app::-webkit-scrollbar { display:none; }
.xr-plug { display:flex; align-items:center; gap:clamp(10px,2vw,16px); padding:clamp(10px,1.6vh,16px) clamp(12px,2vw,20px); }
.xr-plug-i { flex-shrink:0; width:clamp(32px,4vh,40px); height:clamp(32px,4vh,40px); border-radius:9999px; border:1px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.08);
  display:flex; align-items:center; justify-content:center; font-size:0.85rem; font-weight:700; }
.xr-plug-n { font-size:clamp(0.84rem,1.6vh,0.95rem); font-weight:600; }
.xr-plug-r { font-size:11px; letter-spacing:0.2em; text-transform:uppercase; color:rgba(255,255,255,0.45); white-space:nowrap; }
.xr-plug p.xr-body { margin-top:4px; font-size:clamp(0.76rem,1.4vh,0.84rem); }
.xr-tech { display:flex; flex-wrap:wrap; gap:8px; margin-top:6px; }
.xr-tech .xr-pill { font-size:0.76rem; font-weight:600; height:30px; }
.xr-hint { position:absolute; left:50%; bottom:clamp(8px,1.5vh,18px); transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:8px; pointer-events:none; }
.xr-hint i { display:block; width:1px; height:28px; background:linear-gradient(to bottom, rgba(255,255,255,0.5), transparent); }
@media (min-width:640px) {
  .xr-row.k3 { grid-template-columns:repeat(3,1fr); }
  .xr-row.k2 { grid-template-columns:repeat(2,1fr); }
  .xr-chart-wrap { grid-template-columns:1.35fr 0.85fr; align-items:stretch; }
}
@media (max-width:639px) {
  .xr-design { grid-template-columns:minmax(132px,1.05fr) repeat(3,minmax(0,1fr)); gap:6px; }
  .xr-design .hd, .xr-design .cell { padding:8px 6px; min-height:48px; border-radius:12px; }
  .xr-design .lv { white-space:normal; }
  .xr-matrix { grid-template-columns:56px repeat(3,minmax(0,1fr)); gap:4px 5px; }
  .xr-matrix .tt, .xr-matrix .tt-h { display:none; }
  .xr-cell { height:24px; border-radius:8px; }
  .xr-q { gap:10px; }
  .xr-plug { flex-wrap:wrap; }
  .xr-plug-r { white-space:normal; }
}
@media (max-height:700px) {
  .xr-lead { display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:3; overflow:hidden; }
  .xr-dots { display:none; }
  .xr-chart { padding:14px 12px 6px; }
  .xr-read { padding:12px 14px; gap:8px; }
  .xr-fails { margin-top:8px; gap:8px; }
  .xr-fail { padding:10px 14px; }
}
@media (max-height:560px) {
  .xr-lead { -webkit-line-clamp:2; }
  .xr-q-s { display:none; }
  .xr-kpi-n { font-size:clamp(1.35rem,4.5vh,2rem); }
}
`;

/* ───────────── scroll plumbing ───────────── */

interface StageProps {
  container: React.RefObject<HTMLDivElement | null>;
  reduced: boolean;
  /** First stage: play 0→INTRO_HOLD on mount so the modal opens onto a settled view; scroll continues from there. */
  intro?: boolean;
  children: (p: MotionValue<number>) => ReactNode;
}

const INTRO_HOLD = 0.62;

/** One chapter per pane. Inner overflow scrolls first; the next wheel at the edge changes chapter. */
function useChapterScroll(ref: React.RefObject<HTMLDivElement | null>, enabled: boolean) {
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || !enabled) return;

    let index = 0;
    let lockedUntil = 0;

    const chapters = () =>
      [...root.querySelectorAll<HTMLElement>(":scope > .xr-stage, :scope > .xr-app")];

    const innerOf = (chapter: HTMLElement) =>
      chapter.classList.contains("xr-app") ? chapter : chapter.querySelector<HTMLElement>(".xr-view");

    const fit = () => {
      const height = root.clientHeight;
      if (height < 1) return;
      const list = chapters();
      list.forEach((chapter) => {
        chapter.style.height = `${height}px`;
      });
      const current = list[index];
      if (current) root.scrollTop = current.offsetTop;
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(root);

    const go = (dir: 1 | -1) => {
      const list = chapters();
      const next = index + dir;
      if (next < 0 || next >= list.length) return;
      const dest = list[next];
      const inner = innerOf(dest);
      if (inner) {
        inner.scrollTop = dir > 0 ? 0 : inner.scrollHeight;
      }
      index = next;
      lockedUntil = performance.now() + 420;
      root.scrollTop = dest.offsetTop;
    };

    const apply = (delta: number) => {
      if (Math.abs(delta) < 0.5 || performance.now() < lockedUntil) return;
      const chapter = chapters()[index];
      const inner = chapter ? innerOf(chapter) : null;
      if (!inner) return;
      const before = inner.scrollTop;
      const max = inner.scrollHeight - inner.clientHeight;
      if (max > 1) {
        inner.scrollTop = Math.min(max, Math.max(0, before + delta));
        if (Math.abs(inner.scrollTop - before) > 0.5) return;
      }
      go(delta > 0 ? 1 : -1);
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      let delta = event.deltaY;
      if (event.deltaMode === 1) delta *= 16;
      else if (event.deltaMode === 2) delta *= root.clientHeight;
      apply(delta);
    };

    let lastY = 0;
    const onTouchStart = (event: TouchEvent) => {
      lastY = event.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (event: TouchEvent) => {
      const y = event.touches[0]?.clientY ?? lastY;
      const delta = lastY - y;
      lastY = y;
      if (delta === 0) return;
      event.preventDefault();
      apply(delta);
    };

    root.addEventListener("wheel", onWheel, { passive: false });
    root.addEventListener("touchstart", onTouchStart, { passive: true });
    root.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      observer.disconnect();
      root.removeEventListener("wheel", onWheel);
      root.removeEventListener("touchstart", onTouchStart);
      root.removeEventListener("touchmove", onTouchMove);
    };
  }, [ref, enabled]);
}

/** Content-height stage. `p` runs 0→1 as the section enters, then stays settled while the rest scrolls past. */
function Stage({ container, reduced, intro = false, children }: StageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, container, offset: ["start end", "start start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 150, damping: 32, mass: 0.5 });
  const mount = useMotionValue(intro ? 0 : INTRO_HOLD);
  useEffect(() => {
    if (!intro || reduced) return;
    const controls = animate(mount, INTRO_HOLD, { duration: 1.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [intro, reduced, mount]);
  const scrolledFromHold = useTransform(smooth, [0, 1], [INTRO_HOLD, 1]);
  const introP = useTransform<number, number>([mount, scrolledFromHold], ([m, s]) => Math.max(m, s));
  const fixed = useMotionValue(1);
  const p = reduced ? fixed : intro ? introP : smooth;
  return (
    <section ref={ref} className="xr-stage">
      <div className="xr-view">
        <div className="xr-inner">{children(p)}</div>
      </div>
    </section>
  );
}

/** Fade/lift wrapper: enters over [a,b] and stays visible so a tall section can be read to the end. */
function Reveal({
  p,
  range = [0.05, 0.4],
  y = 40,
  exit = false,
  className,
  children,
  style,
}: {
  p: MotionValue<number>;
  range?: [number, number];
  y?: number;
  exit?: boolean;
  className?: string;
  children: ReactNode;
  style?: React.CSSProperties;
}) {
  const opacity = useTransform(p, exit ? [range[0], range[1], 0.82, 1] : [range[0], range[1]], exit ? [0, 1, 1, 0] : [0, 1]);
  const ty = useTransform(p, exit ? [range[0], range[1], 0.82, 1] : [range[0], range[1]], exit ? [y, 0, 0, -y] : [y, 0]);
  return (
    <motion.div className={className} style={{ ...style, opacity, y: ty }}>
      {children}
    </motion.div>
  );
}

/** Skiper31 CharacterV1: each glyph starts offset by its distance from center and converges. */
function ConvergeText({ p, text, range = [0, 0.45], className }: { p: MotionValue<number>; text: string; range?: [number, number]; className?: string }) {
  const chars = text.split("");
  const center = Math.floor(chars.length / 2);
  return (
    <h2 className={className} aria-label={text}>
      {chars.map((ch, i) => (
        <Glyph key={`${ch}-${i}`} p={p} ch={ch} d={i - center} range={range} />
      ))}
    </h2>
  );
}

function Glyph({ p, ch, d, range }: { p: MotionValue<number>; ch: string; d: number; range: [number, number] }) {
  const x = useTransform(p, range, [d * 34, 0]);
  const rotateX = useTransform(p, range, [d * 30, 0]);
  const opacity = useTransform(p, [range[0], range[0] + (range[1] - range[0]) * 0.6], [0, 1]);
  return (
    <motion.span style={{ x, rotateX, opacity, width: ch === " " ? "0.32em" : undefined }} aria-hidden="true">
      {ch === " " ? "\u00A0" : ch}
    </motion.span>
  );
}

/** Skiper31 CharacterV3: items fly in from spread positions with rotation, by distance from center. */
function Fly({ p, index, count, range = [0.05, 0.5], spread = 140, lift = 60, className, children, style }: { p: MotionValue<number>; index: number; count: number; range?: [number, number]; spread?: number; lift?: number; className?: string; children?: ReactNode; style?: React.CSSProperties }) {
  const d = index - (count - 1) / 2;
  const x = useTransform(p, range, [d * spread, 0]);
  const y = useTransform(p, range, [Math.abs(d) * lift + 40, 0]);
  const rotate = useTransform(p, range, [d * 6, 0]);
  const scale = useTransform(p, range, [0.86, 1]);
  const opacity = useTransform(p, [range[0], range[0] + (range[1] - range[0]) * 0.5], [0, 1]);
  return (
    <motion.div className={className} style={{ ...style, x, y, rotate, scale, opacity }}>
      {children}
    </motion.div>
  );
}

function Count({ p, to, range }: { p: MotionValue<number>; to: number; range: [number, number] }) {
  const n = useTransform(p, range, [0, to]);
  const text = useTransform(n, (v) => String(Math.round(v)));
  return <motion.span>{text}</motion.span>;
}

/* ───────────── stage bodies ───────────── */

function KpiCard({ p, c, index }: { p: MotionValue<number>; c: ExperimentCondition; index: number }) {
  const rate = Math.round((c.passed / c.total) * 100);
  const isF = c.id === "F";
  const start = 0.26 + index * 0.04;
  const [lit, setLit] = useState(0);
  const dots = useTransform(p, [start + 0.04, start + 0.26], [0, c.total]);
  useMotionValueEvent(dots, "change", (v) => setLit(Math.round(v)));
  return (
    <Fly p={p} index={index} count={3} range={[start, start + 0.22]} className={`xr-glass xr-kpi${isF ? " hero" : ""}`}>
      <p className="xr-micro">
        {isF ? <b>{c.id}</b> : c.id} · {c.name}
      </p>
      <p className="xr-kpi-n xr-mono" style={isF ? { color: ACCENT, textShadow: "0 0 24px rgba(34,211,238,0.45)" } : undefined}>
        <Count p={p} to={rate} range={[start + 0.04, start + 0.26]} />
        <small>%</small>
      </p>
      <p className="xr-body xr-dim" style={{ marginTop: 6, fontSize: "0.8rem" }}>
        {c.model} · {c.passed}/{c.total} PASS
      </p>
      <div className="xr-dots" aria-hidden="true">
        {Array.from({ length: c.total }, (_, i) => {
          const on = i < lit;
          const fail = on && i >= c.passed;
          return <i key={i} className={fail ? "x" : on ? `on${isF ? " f" : ""}` : ""} />;
        })}
      </div>
    </Fly>
  );
}

function SummaryStage({ p, study }: { p: MotionValue<number>; study: ExperimentStudy }) {
  return (
    <div className="xr-stack">
      <Reveal p={p} range={[0, 0.12]} y={12}>
        <p className="xr-micro">
          <b>01</b> · Executive Summary · {study.tasks.length} 과제 × {study.conditions.length} 조건
        </p>
      </Reveal>
      <ConvergeText p={p} text={VERDICT} range={[0, 0.3]} className="xr-h1" />
      <Reveal p={p} range={[0.22, 0.4]} y={20}>
        <p className="xr-lead">{study.positioning}</p>
      </Reveal>
      <div className="xr-row k3">
        {study.conditions.map((c, i) => (
          <KpiCard key={c.id} p={p} c={c} index={i} />
        ))}
      </div>
    </div>
  );
}

function IntroStage({ p, study }: { p: MotionValue<number>; study: ExperimentStudy }) {
  const background = study.planning[0];
  return (
    <div className="xr-stack">
      <Reveal p={p} range={[0.02, 0.18]} y={12}>
        <p className="xr-micro"><b>02</b> · 서론 · 배경과 질문</p>
      </Reveal>
      <ConvergeText p={p} text="무엇을 확인하려 했나" range={[0.02, 0.35]} className="xr-h1" />
      <Reveal p={p} range={[0.2, 0.4]} y={20}>
        <p className="xr-lead">{background}</p>
      </Reveal>
      <ul className="xr-row">
        {QUESTIONS.map((q, i) => (
          <li key={q.k}>
            <Fly p={p} index={i} count={3} range={[0.3 + i * 0.05, 0.6 + i * 0.05]} className="xr-glass xr-q">
              <span className="xr-q-k xr-mono">{q.k}</span>
              <div style={{ minWidth: 0 }}>
                <p className="xr-q-t">{q.q}</p>
                <p className="xr-q-s xr-mono">{q.how}</p>
              </div>
            </Fly>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DesignStage({ p, study }: { p: MotionValue<number>; study: ExperimentStudy }) {
  const cells: ReactNode[] = [];
  let idx = 0;
  const total = study.conditions.length * (study.levels.length + 1) + study.levels.length + 1;
  const fly = { spread: 26, lift: 10, range: [0.15, 0.5] as [number, number] };
  // header row
  cells.push(<div key="corner" />);
  idx++;
  study.levels.forEach((l) => {
    cells.push(
      <Fly key={`h-${l.id}`} p={p} index={idx++} count={total} {...fly} className="xr-glass hd" style={{ alignItems: "center", textAlign: "center" }}>
        <span className="lv">{l.id}</span>
        <span className="sub">{l.label} · {l.taskCount}과제</span>
      </Fly>,
    );
  });
  study.conditions.forEach((c) => {
    const isF = c.id === "F";
    cells.push(
      <Fly key={`r-${c.id}`} p={p} index={idx++} count={total} {...fly} className={`xr-glass hd${isF ? " hero" : ""}`}>
        <span className="lv" style={isF ? { color: ACCENT } : undefined}>{c.id} · {c.name}</span>
        <span className="sub">{c.model}</span>
      </Fly>,
    );
    study.levels.forEach((l) => {
      cells.push(
        <Fly key={`c-${c.id}-${l.id}`} p={p} index={idx++} count={total} {...fly} className={`xr-glass cell${isF ? " f" : ""}`}>
          <span className="xr-mono" style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)" }}>{l.taskCount} 런</span>
        </Fly>,
      );
    });
  });
  return (
    <div className="xr-stack">
      <Reveal p={p} range={[0.02, 0.18]} y={12}>
        <p className="xr-micro"><b>03</b> · 본론 · 실험 설계</p>
      </Reveal>
      <ConvergeText p={p} text="3 조건 × 3 난이도, 30 런" range={[0.02, 0.35]} className="xr-h1" />
      <Reveal p={p} range={[0.18, 0.36]} y={16}>
        <p className="xr-lead">{study.hypothesis}</p>
      </Reveal>
      <div className="xr-design">{cells}</div>
      <Reveal p={p} range={[0.5, 0.66]} y={12}>
        <p className="xr-body xr-dim" style={{ fontSize: "0.8rem" }}>{study.methodNote}</p>
      </Reveal>
    </div>
  );
}

function ResultStage({ p, study }: { p: MotionValue<number>; study: ExperimentStudy }) {
  const [mounted, setMounted] = useState(false);
  useMotionValueEvent(p, "change", (v) => {
    if (v > 0.14 && !mounted) setMounted(true);
  });
  const data = study.levels.map((l) => ({ level: l.id, P: l.rates.P, F: l.rates.F, H: l.rates.H }));
  const min = Math.min(...study.levels.flatMap((l) => KEYS.map((k) => l.rates[k])));
  return (
    <div className="xr-stack">
      <Reveal p={p} range={[0.02, 0.18]} y={12}>
        <p className="xr-micro"><b>04</b> · 본론 · 결과</p>
      </Reveal>
      <ConvergeText p={p} text="L1에서 깨지고, L2에선 버텼다" range={[0.02, 0.35]} className="xr-h1" />
      <div className="xr-chart-wrap">
        <Reveal p={p} range={[0.12, 0.3]} y={30} className="xr-glass xr-chart">
          <div className="xr-legend">
            {study.conditions.map((c) => (
              <span key={c.id}><i style={{ background: BAR_FILL[c.id] }} />{c.id} · {c.name}</span>
            ))}
          </div>
          {mounted ? (
            <BarChart data={data} xDataKey="level" aspectRatio="16 / 9" barGap={0.42} margin={{ top: 16, right: 12, bottom: 28, left: 12 }} animationDuration={1300}>
              <Grid horizontal numTicksRows={4} fadeHorizontal strokeDasharray="0" />
              <Bar dataKey="P" fill={BAR_FILL.P} lineCap="round" groupGap={6} />
              <Bar dataKey="F" fill={BAR_FILL.F} lineCap="round" groupGap={6} />
              <Bar dataKey="H" fill={BAR_FILL.H} lineCap="round" groupGap={6} />
              <BarXAxis />
            </BarChart>
          ) : (
            <div style={{ aspectRatio: "16 / 9" }} />
          )}
        </Reveal>
        <Reveal p={p} range={[0.24, 0.42]} y={30} className="xr-glass xr-read">
          <p className="xr-micro">난이도별 성공률 (%)</p>
          <div>
            <div className="xr-read-row" aria-hidden="true">
              <span />
              {KEYS.map((k) => (
                <span key={k} className={`v xr-mono${k === "F" ? " f" : ""}`} style={{ fontSize: "0.72rem", color: k === "F" ? ACCENT : "rgba(255,255,255,0.45)" }}>{k}</span>
              ))}
            </div>
            {study.levels.map((l) => (
              <div key={l.id} className="xr-read-row">
                <span className="lv">{l.id}<small>{l.label}</small></span>
                {KEYS.map((k) => {
                  const v = l.rates[k];
                  return (
                    <span key={k} className={`v xr-mono${k === "F" ? " f" : ""}${v === min && v < 100 ? " low" : ""}`}>{v}</span>
                  );
                })}
              </div>
            ))}
          </div>
          <p className="xr-body xr-dim" style={{ fontSize: "0.8rem", marginTop: "auto" }}>
            가설은 L2·L3에서 F가 떨어진다였다. L3는 맞았고(67), L2는 100으로 반증됐다. L1 75는 하네스 단절 1건이 만든 값이다.
          </p>
        </Reveal>
      </div>
    </div>
  );
}

function MatrixStage({ p, study }: { p: MotionValue<number>; study: ExperimentStudy }) {
  const totalCells = study.tasks.length * KEYS.length;
  const [lit, setLit] = useState(0);
  const litMv = useTransform(p, [0.18, 0.6], [0, totalCells]);
  useMotionValueEvent(litMv, "change", (v) => setLit(Math.round(v)));
  let groupSeen = "";
  return (
    <div className="xr-stack">
      <Reveal p={p} range={[0.02, 0.18]} y={12}>
        <p className="xr-micro"><b>05</b> · 본론 · 과제 매트릭스</p>
      </Reveal>
      <ConvergeText p={p} text={`${totalCells}칸 중 빨간 칸은 둘`} range={[0.02, 0.35]} className="xr-h1" />
      <Reveal p={p} range={[0.14, 0.3]} y={30} className="xr-glass" style={{ padding: "clamp(12px, 2vh, 20px) clamp(14px, 2.2vw, 22px)" }}>
        <div className="xr-matrix">
          <span className="th l">과제</span>
          <span className="th l tt-h">내용</span>
          {KEYS.map((k) => <span key={k} className={`th${k === "F" ? " f" : ""}`}>{k}</span>)}
          {study.tasks.map((t, ti) => {
            const grp = t.id.split("-")[0];
            const showGroup = grp !== groupSeen;
            groupSeen = grp;
            const level = study.levels.find((l) => l.id === grp);
            return [
              showGroup ? (
                <span key={`g-${grp}`} className="grp">{grp} · {level?.label ?? ""}</span>
              ) : null,
              <span key={`id-${t.id}`} className="id xr-mono">{t.id}</span>,
              <span key={`tt-${t.id}`} className="tt">{t.title}</span>,
              ...KEYS.map((k, ki) => {
                const n = ti * KEYS.length + ki;
                const on = n < lit;
                const pass = t[k] === "PASS";
                const cls = !on ? "xr-cell" : pass ? `xr-cell pass${k === "F" ? " f" : ""}` : "xr-cell fail";
                return (
                  <span key={`c-${t.id}-${k}`} className={cls} aria-label={`${t.id} ${k} ${t[k]}`}>
                    {on ? (pass ? "✓" : "✕") : ""}
                  </span>
                );
              }),
            ];
          })}
        </div>
      </Reveal>
      <div className="xr-fails xr-row k2">
        {study.failures.map((f, i) => (
          <Fly key={f.task} p={p} index={i} count={2} range={[0.58 + i * 0.05, 0.76 + i * 0.05]} className="xr-glass bad xr-fail">
            <p className="xr-fail-k xr-mono">{f.task} · {f.label}</p>
            <p className="xr-body">{f.detail}</p>
          </Fly>
        ))}
      </div>
    </div>
  );
}

function ConclusionStage({ p, study }: { p: MotionValue<number>; study: ExperimentStudy }) {
  return (
    <div className="xr-stack">
      <Reveal p={p} range={[0.02, 0.18]} y={12}>
        <p className="xr-micro"><b>06</b> · 결론 · 판단과 제언</p>
      </Reveal>
      <div className="xr-row k2">
        <Fly p={p} index={0} count={2} range={[0.05, 0.4]} className="xr-glass bad xr-claim stop">
          <p className="xr-micro">기각된 가설</p>
          <p className="t">{study.stopClaim}</p>
        </Fly>
        <Fly p={p} index={1} count={2} range={[0.05, 0.4]} className="xr-glass xr-claim keep">
          <p className="xr-micro">지지된 가설</p>
          <p className="t">{study.keepClaim}</p>
        </Fly>
      </div>
      <div>
        <Reveal p={p} range={[0.4, 0.52]} y={10}>
          <p className="xr-micro"><b>제언</b></p>
        </Reveal>
        <div style={{ marginTop: 8 }}>
          <ConvergeText p={p} text={RECOMMENDATION} range={[0.42, 0.72]} className="xr-h2" />
        </div>
      </div>
    </div>
  );
}

/* ───────────── root ───────────── */

export function ExperimentStudyBody({ project }: { project: Project }) {
  const study = project.experiment;
  const scrollRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const [hint, setHint] = useState(true);
  useChapterScroll(scrollRef, study != null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setHint(el.scrollTop < 24);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  if (!study) return null;

  const stages: Array<(p: MotionValue<number>) => ReactNode> = [
    (p) => <SummaryStage p={p} study={study} />,
    (p) => <IntroStage p={p} study={study} />,
    (p) => <DesignStage p={p} study={study} />,
    (p) => <ResultStage p={p} study={study} />,
    (p) => <MatrixStage p={p} study={study} />,
    (p) => <ConclusionStage p={p} study={study} />,
  ];

  return (
    <div className="xr-root">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div ref={scrollRef} className="xr">
      <div className="xr-blob" aria-hidden="true" />

      {stages.map((render, i) => (
        <Stage key={i} container={scrollRef} reduced={reduced} intro={i === 0}>
          {render}
        </Stage>
      ))}

      {/* 부록 — normal flow, Listen App playlist rows */}
      <div className="xr-app">
        <p className="xr-micro"><b>07</b> · 부록 · 도구와 스택</p>
        {study.plugins.map((plugin) => (
          <div key={plugin.name} className="xr-glass xr-plug">
            <span className="xr-plug-i">{plugin.name.charAt(0)}</span>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                <p className="xr-plug-n">{plugin.name}</p>
                <span className="xr-plug-r">{plugin.role}</span>
              </div>
              <p className="xr-body">{plugin.summary}</p>
            </div>
          </div>
        ))}
        {project.tech.length > 0 && (
          <div className="xr-tech">
            {project.tech.map((tech) => {
              const { icon: TechIcon, color } = getTechMeta(tech);
              return (
                <span key={tech} className="xr-pill">
                  <TechIcon style={{ color, width: 14, height: 14 }} aria-hidden="true" />
                  {tech}
                </span>
              );
            })}
          </div>
        )}
      </div>
      </div>

      <motion.div className="xr-hint" animate={{ opacity: hint ? 1 : 0 }} transition={{ duration: 0.3 }} aria-hidden="true">
        <span className="xr-micro" style={{ fontSize: 10 }}>Scroll</span>
        <i />
      </motion.div>
    </div>
  );
}
