import { useState, useEffect } from "react";
import { DESIGN_CONFIG } from "@/config/design";

/**
 * 뷰포트 크기에 따라 동적 Carousel Radius 반환
 */
export function useCarouselRadius(): number {
  const [radius, setRadius] = useState<number>(DESIGN_CONFIG.carousel.radius.desktop);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () =>
      setRadius(mq.matches ? DESIGN_CONFIG.carousel.radius.mobile : DESIGN_CONFIG.carousel.radius.desktop);
    
    update();
    mq.addEventListener("change", update);
    
    return () => mq.removeEventListener("change", update);
  }, []);

  return radius;
}
