import { Code2 } from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiSpring,
  SiVuedotjs,
  SiMysql,
  SiJavascript,
  SiFlask,
  SiPython,
  SiTypescript,
  SiDocker,
  SiAmazonwebservices,
  SiKeras,
  SiGooglegemini,
  SiFramer,
  SiTailwindcss,
  SiCodeium,
  SiClaude,
  SiSocketdotio,
  SiNaver,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { projects } from "@/constants/Projects";

type Project = (typeof projects)[number];

interface TechMeta {
  icon: IconType;
  /** 브랜드 공식 색상 */
  color: string;
}

/** tech 이름 → 아이콘 + 브랜드 색상 매핑 */
const TECH_META_MAP: Record<string, TechMeta> = {
  "Spring Boot": { icon: SiSpring,            color: "#6DB33F" },
  "Spring":      { icon: SiSpring,            color: "#6DB33F" },
  "MySQL":       { icon: SiMysql,             color: "#4479A1" },
  "AJAX":        { icon: SiJavascript,        color: "#F7DF1E" },
  "Next.js":     { icon: SiNextdotjs,         color: "#FFFFFF" },
  "React":       { icon: SiReact,             color: "#61DAFB" },
  "Vue.js":      { icon: SiVuedotjs,          color: "#4FC08D" },
  "Gemini":      { icon: SiGooglegemini,      color: "#4285F4" },
  "Flask":       { icon: SiFlask,             color: "#FFFFFF" },
  "Python":      { icon: SiPython,            color: "#3776AB" },
  "Deepface":    { icon: SiPython,            color: "#3776AB" },
  "Keras":       { icon: SiKeras,             color: "#D00000" },
  "TypeScript":    { icon: SiTypescript,        color: "#3178C6" },
  "Tailwind CSS":  { icon: SiTailwindcss,       color: "#06B6D4" },
  "Framer Motion": { icon: SiFramer,             color: "#BB4EFF" },
  "Cursor":        { icon: SiCodeium,    color: "#23A9F2" },
  "Claude AI":     { icon: SiClaude,    color: "#D4956A" },
  "Docker":           { icon: SiDocker,            color: "#2496ED" },
  "AWS":              { icon: SiAmazonwebservices, color: "#FF9900" },
  "JavaScript":       { icon: SiJavascript,        color: "#F7DF1E" },
  "Spring Security":  { icon: SiSpring,            color: "#6DB33F" },
  "WebSocket":        { icon: SiSocketdotio,       color: "#010101" },
  "NAVER API":        { icon: SiNaver,             color: "#03C75A" },
};

const FALLBACK_META: TechMeta = { icon: Code2, color: "#FFFFFF" };

/**
 * tech 이름으로 { icon, color } 반환
 */
export function getTechMeta(techName: string): TechMeta {
  return TECH_META_MAP[techName] ?? FALLBACK_META;
}

/**
 * tech 이름으로 아이콘 컴포넌트만 반환 (하위 호환)
 */
export function getTechIcon(techName: string): IconType {
  return getTechMeta(techName).icon;
}

/**
 * 프로젝트 대표 아이콘 반환
 */
export function getProjectIcon(project: Project): IconType {
  const text = (project.title + project.category).toLowerCase();

  if (text.includes("portfolio"))                                return SiClaude;
  if (text.includes("twinstar"))                                 return SiGooglegemini;
  if (text.includes("react") || text.includes("native"))        return SiReact;
  if (text.includes("next"))                                     return SiNextdotjs;
  if (text.includes("spring") || text.includes("java"))         return SiSpring;
  if (text.includes("vue"))                                      return SiVuedotjs;
  if (text.includes("shop") || text.includes("commerce") || text.includes("mingle")) return SiMysql;
  if (text.includes("ai") || text.includes("gemini"))           return SiGooglegemini;
  if (text.includes("data") || text.includes("sql"))            return SiMysql;

  return Code2;
}

/**
 * 배열 인덱스를 순환 처리
 */
export function getWrappedIndex(index: number, length: number): number {
  if (length === 0) return 0;
  return (index + length) % length;
}
