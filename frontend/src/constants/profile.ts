/**
 * Profile Data
 * 개인 정보 상수
 */
export const PROFILE_DATA = {
  name: "Oh Sungwoo",
  nameKorean: "오성우",
  location: "서울특별시",
  email: "sungwoo0723@naver.com",
  github: "https://github.com/yourusername",
  
  // SEO & Meta
  title: "Oh Sungwoo - Full Stack Developer",
  description: "AI의 속도에 엔지니어링의 깊이를 더하는 풀스택 개발자 오성우의 포트폴리오입니다.",
  keywords: ["풀스택 개발자", "Full Stack Developer", "Next.js", "React", "Spring Boot", "Seoul"],
  
  // CTA
  cta: {
    primary: {
      text: "프로젝트 상담하기",
      link: "mailto:sungwoo0723@naver.com",
    },
    secondary: {
      text: "이력서 다운로드",
      link: "/resume.pdf",
    },
  },
} as const;
