import {
  SiTypescript,
  SiJavascript,
  SiKotlin,
  SiNextdotjs,
  SiReact,
  SiVuedotjs,
  SiReactquery,
  SiTailwindcss,
  SiSpring,
  SiFlask,
  SiMysql,
  SiDocker,
  SiAmazonwebservices,
  SiGooglegemini,
  SiGradle,
  SiJirasoftware,
} from "react-icons/si";
import type { IconType } from "react-icons";

export interface TechItem {
  name: string;
  icon: IconType;
  color: string;
}

export const TECH_STACK: Record<string, TechItem[]> = {
  Languages: [
    { name: "TypeScript", icon: SiTypescript,  color: "#3178C6" },
    { name: "JavaScript", icon: SiJavascript,  color: "#F7DF1E" },
    { name: "Java",       icon: SiSpring,       color: "#ED8B00" },
    { name: "Kotlin",     icon: SiKotlin,       color: "#7F52FF" },
  ],
  Frontend: [
    { name: "Next.js",      icon: SiNextdotjs,   color: "#000000" },
    { name: "React",        icon: SiReact,        color: "#61DAFB" },
    { name: "Vue.js",       icon: SiVuedotjs,     color: "#4FC08D" },
    { name: "React Query",  icon: SiReactquery,   color: "#FF4154" },
    { name: "Tailwind CSS", icon: SiTailwindcss,  color: "#06B6D4" },
  ],
  Backend: [
    { name: "Spring Boot", icon: SiSpring,  color: "#6DB33F" },
    { name: "Flask",       icon: SiFlask,   color: "#888888" },
    { name: "MySQL",       icon: SiMysql,   color: "#4479A1" },
    { name: "Gradle",      icon: SiGradle,  color: "#02303A" },
  ],
  "DevOps / Tools": [
    { name: "Docker", icon: SiDocker,           color: "#2496ED" },
    { name: "AWS",    icon: SiAmazonwebservices, color: "#FF9900" },
    { name: "Jira",   icon: SiJirasoftware,      color: "#0052CC" },
  ],
  AI: [
    { name: "Gemini", icon: SiGooglegemini, color: "#4285F4" },
  ],
};

export type TechCategory = keyof typeof TECH_STACK;
