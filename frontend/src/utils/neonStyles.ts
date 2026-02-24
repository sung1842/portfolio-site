import { projects } from "@/constants/Projects";

type Project = (typeof projects)[number];

/**
 * Neon Color Scheme 타입 정의
 */
interface NeonScheme {
  color1: string;
  color2: string;
  borderColor: string;
}

/**
 * 프로젝트별 Neon 색상 스키마
 */
const NEON_SCHEMES: Record<number, NeonScheme> = {
  0: {
    color1: "rgba(35, 169, 242, 0.55)",  // Cursor Blue
    color2: "rgba(212, 149, 106, 0.50)", // Claude Warm
    borderColor: "rgba(35, 169, 242, 0.25)",
  },
  1: {
    color1: "rgba(66, 133, 244, 0.65)",  // Gemini Blue
    color2: "rgba(138, 43, 226, 0.55)",  // Deep Purple
    borderColor: "rgba(66, 133, 244, 0.3)",
  },
  2: {
    color1: "rgba(255, 51, 102, 0.6)", // Electric Orange
    color2: "rgba(255, 255, 0, 0.6)", // Neon Yellow
    borderColor: "rgba(255, 51, 102, 0.25)",
  },
  3: {
    color1: "rgba(0, 255, 255, 0.6)", // Cyan
    color2: "rgba(138, 43, 226, 0.6)", // Purple
    borderColor: "rgba(0, 255, 255, 0.25)",
  },
  4: {
    color1: "rgba(255, 0, 128, 0.6)", // Magenta
    color2: "rgba(0, 255, 255, 0.6)", // Cyan
    borderColor: "rgba(255, 0, 128, 0.25)",
  },
};

/**
 * 프로젝트 ID 기반으로 동적 Neon 스타일 생성
 */
export function getProjectNeonStyle(project: Project): React.CSSProperties {
  const scheme = NEON_SCHEMES[project.id] || NEON_SCHEMES[((project.id - 1) % 4) + 1];

  return {
    backgroundColor: "#050505",
    backgroundImage: [
      `radial-gradient(circle at 0% 0%, ${scheme.color1} 0%, transparent 40%)`,
      `radial-gradient(circle at 100% 100%, ${scheme.color2} 0%, transparent 40%)`,
    ].join(", "),
    border: `1px solid ${scheme.borderColor}`,
    boxShadow: `0 0 30px ${scheme.borderColor}`,
  };
}
