/**
 * Design Configuration
 * 중앙화된 디자인 토큰 관리
 */
export const DESIGN_CONFIG = {
  card: {
    aspectRatio: 1.58,
    width: {
      mobile: "62vw",
      desktop: "22vw",
      max: "420px",
    },
    padding: "1.5rem",
    borderRadius: "1rem",
  },
  carousel: {
    radius: { mobile: 220, desktop: 380 },
    gap: 20,
    baselineY: 0,
    depth: {
      minScale: 0.85,
      minOpacity: 0.6,
      maxBlur: 2,
      brightness: 0.7,
    },
  },
  colors: {
    cardBg: "rgba(10, 10, 10, 0.8)",
    border: "rgba(255,255,255,0.1)",
    accent: "#22d3ee",
    text: { 
      primary: "#ffffff", 
      secondary: "rgba(255,255,255,0.7)", 
      muted: "rgba(255,255,255,0.5)" 
    },
  },
} as const;

export const PROFILE_CARD_STYLE = {
  base: "#050505",
  acidLime: "#CCFF00",
  electricCyan: "#00F0FF",
  border: "rgba(255, 255, 255, 0.1)",
  glowLime: "rgba(204, 255, 0, 0.12)",
  glowCyan: "rgba(0, 240, 255, 0.15)",
} as const;

export const SCROLL_COOLDOWN_MS = 500;
