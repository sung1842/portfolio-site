import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { useCarouselRadius } from "@/hooks/useCarouselRadius";
import { useCardTransform } from "@/hooks/useCardTransform";
import { getWrappedIndex } from "@/utils/projectHelpers";
import { DESIGN_CONFIG } from "@/config/design";
import { projects } from "@/constants/Projects";

const PIXELS_PER_CARD  = 380;
/** 이 픽셀 미만이면 탭(클릭)으로 처리 */
const SWIPE_THRESHOLD  = 10;
/** 이 시간 이내 + 거의 안 움직이면 탭(클릭)으로 처리 */
const TAP_MAX_MS       = 280;

interface Carousel3DProps {
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  onItemSelect: (projectId: number) => void;
  selectedId: number | null;
}

export function Carousel3D({
  activeIndex,
  onActiveIndexChange,
  onItemSelect,
  selectedId,
}: Carousel3DProps) {
  const carouselRadius = useCarouselRadius();

  /* 드래그 시 손가락 따라가기만 사용 (홀드/확대 모드 제거) */
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const virtualOffset = -dragOffset / PIXELS_PER_CARD;
  const { getCardStyle } = useCardTransform(activeIndex, virtualOffset);

  const isPointerDownRef = useRef(false);
  const startXRef        = useRef(0);
  const pointerDownMsRef = useRef(0);
  const pressedIndexRef  = useRef(-1);
  const dragOffsetRef    = useRef(0);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    const cardEl = (e.target as HTMLElement).closest("[data-project-index]");
    pressedIndexRef.current = cardEl
      ? parseInt(cardEl.getAttribute("data-project-index") ?? "-1", 10)
      : -1;

    isPointerDownRef.current = true;
    startXRef.current        = e.clientX;
    pointerDownMsRef.current = Date.now();
    dragOffsetRef.current    = 0;
    setDragOffset(0);
    setIsDragging(false);

    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    const dx = e.clientX - startXRef.current;
    dragOffsetRef.current = dx;
    setDragOffset(dx);
    if (Math.abs(dx) > SWIPE_THRESHOLD) setIsDragging(true);
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    isPointerDownRef.current = false;
    const elapsed = Date.now() - pointerDownMsRef.current;
    const movedPx = Math.abs(e.clientX - startXRef.current);

    if (elapsed < TAP_MAX_MS && movedPx < SWIPE_THRESHOLD) {
      const idx = pressedIndexRef.current;
      if (idx >= 0) {
        if (idx === activeIndex) {
          onItemSelect(projects[idx].id);
        } else {
          onActiveIndexChange(idx);
        }
      }
    } else {
      const dx = dragOffsetRef.current;
      const absPx = Math.abs(dx);

      // 너무 짧은 스와이프는 스냅백 (이동 없음)
      if (absPx < 40) {
        setIsDragging(false);
        setDragOffset(0);
        dragOffsetRef.current = 0;
        return;
      }

      // 스와이프 거리 기반으로 1~n장(최대 3, 그리고 전체 카드 수 - 1 이하)까지 이동
      const maxStep = Math.min(3, Math.max(1, projects.length - 1));
      let steps = 1;
      if (absPx > 180 && maxStep >= 2) steps = 2;
      if (absPx > 360 && maxStep >= 3) steps = 3;

      // 방향: 오른쪽 드래그(dx > 0) → 이전 카드(-), 왼쪽 드래그(dx < 0) → 다음 카드(+)
      const direction = dx > 0 ? -1 : 1;
      const advance = direction * steps;

      onActiveIndexChange(
        getWrappedIndex(activeIndex + advance, projects.length)
      );
    }

    setIsDragging(false);
    setDragOffset(0);
    dragOffsetRef.current = 0;
  }, [activeIndex, onActiveIndexChange, onItemSelect]);

  const handlePointerCancel = useCallback(() => {
    isPointerDownRef.current = false;
    setIsDragging(false);
    setDragOffset(0);
    dragOffsetRef.current = 0;
  }, []);

  return (
    <div
      className={clsx(
        "relative flex flex-1 w-full items-center justify-center select-none isolate",
        "perspective-[1200px] [transform-style:preserve-3d]",
        isDragging ? "cursor-grabbing" : "cursor-pointer"
      )}
      style={{ touchAction: "none" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      role="region"
      aria-label="Project carousel"
      aria-live="polite"
    >
      {projects.map((project, index) => {
        const isActive = index === activeIndex;
        const style    = getCardStyle(index, carouselRadius);
        const blur     = style.blur ?? 0;

        return (
          <motion.div
            key={project.id}
            layout
            layoutId={`card-container-${project.id}`}
            /* data 속성으로 탭 대상 카드 추적 */
            data-project-index={index}
            className={clsx(
              "absolute flex flex-col items-center justify-center will-change-transform",
              "w-[72vw] md:w-[28vw]",
              isDragging ? "cursor-grabbing" : "cursor-pointer"
            )}
            animate={{
              x:       style.x,
              z:       style.z,
              rotateY: style.rotateY,
              scale:   style.scale,
              opacity: style.opacity,
              y:       DESIGN_CONFIG.carousel.baselineY,
              filter:
                style.brightness < 1
                  ? `brightness(${style.brightness}) blur(${blur}px)`
                  : "blur(0px)",
            }}
            style={{
              aspectRatio: DESIGN_CONFIG.card.aspectRatio,
              maxWidth:    DESIGN_CONFIG.card.width.max,
              zIndex:      selectedId === project.id ? 3000 : style.zIndex,
            }}
            transition={
              isDragging
                ? { type: "tween", duration: 0 }
                : {
                    layout:  { duration: 0 },
                    default: { type: "spring", stiffness: 140, damping: 26, mass: 0.95 },
                  }
            }
            aria-label={`${project.title} project card${isActive ? ", currently selected" : ""}`}
            tabIndex={isActive ? 0 : -1}
          >
            <ProjectCard project={project} />
          </motion.div>
        );
      })}
    </div>
  );
}
