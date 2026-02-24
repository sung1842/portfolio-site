import { useCallback } from "react";
import { DESIGN_CONFIG } from "@/config/design";
import { projects } from "@/constants/Projects";

/**
 * 카드 Transform 속성 타입
 */
export interface CardTransform {
  x: number;
  z: number;
  rotateY: number;
  scale: number;
  opacity: number;
  zIndex: number;
  blur: number;
  brightness: number;
}

/**
 * 3D Carousel 카드 스타일 계산 Hook
 * @param virtualOffset 드래그 중 손가락 따라가기용 보정 (0이면 미사용)
 */
export function useCardTransform(activeIndex: number, virtualOffset = 0) {
  const depth = DESIGN_CONFIG.carousel.depth;

  const getCardStyle = useCallback(
    (index: number, radius: number): CardTransform => {
      const total = projects.length;
      if (total === 0)
        return { x: 0, z: 0, rotateY: 0, scale: 1, opacity: 1, zIndex: 1, blur: 0, brightness: 1 };

      // 상대적 오프셋 (가상 오프셋 포함 — 드래그 시 부드럽게 따라감)
      const rawOffset = index - activeIndex - virtualOffset;
      const half = total / 2;
      let relativeOffset = rawOffset;
      if (relativeOffset > half) relativeOffset -= total;
      else if (relativeOffset < -half) relativeOffset += total;

      // 삼각함수 기반 3D 위치 계산
      const anglePerCardRad = (2 * Math.PI) / total;
      const angleRad = relativeOffset * anglePerCardRad;
      const angleDeg = (angleRad * 180) / Math.PI;

      const circleX = radius * Math.sin(angleRad);
      const circleZ = radius * Math.cos(angleRad);
      const z = circleZ - radius;
      const x = circleX;

      // 깊이 기반 시각 효과 계산
      const depthNorm = Math.min(Math.abs(z) / radius, 1);
      const baseScale = 1 - (1 - depth.minScale) * depthNorm;
      const baseOpacity = 1 - (1 - depth.minOpacity) * depthNorm;
      const blur = depth.maxBlur * depthNorm;
      const brightnessVal = 1 - (1 - depth.brightness) * depthNorm;
      const isActive = relativeOffset === 0;

      return {
        x,
        z,
        rotateY: -angleDeg,
        scale: isActive ? 1 : baseScale,
        opacity: isActive ? 1 : baseOpacity,
        blur: isActive ? 0 : blur,
        brightness: isActive ? 1 : brightnessVal,
        zIndex: 1000 + Math.round(z),
      };
    },
    [activeIndex, depth]
  );

  return { getCardStyle };
}
