import { archiveProjects } from "@/constants/archiveProjects";

export type ProjectCategory = "Profile" | "AI Project" | "E-Commerce" | "Web App" | "Mobile" | "Portfolio" | "Vibe Coding" | "Research";

export interface ProjectRole {
  part: "Frontend" | "Backend" | "Design" | "AI" | "DevOps";
  detail: string;
}

/** 트러블 슈팅 정량 지표 (Before/After 등) */
export interface TroubleshootingMetrics {
  label: string;
  before: string;
  after: string;
  improvementPercent: number;
}

/** 트러블 슈팅 한 건: 문제 → 원인 → 해결 → 결과 */
export interface TroubleshootingItem {
  title: string;
  problem: string;
  /** 원인 분석 (선택) */
  cause?: string;
  solution: string;
  result?: string;
  /** 정량적 성과 (Before/After 게이지 등) */
  metrics?: TroubleshootingMetrics;
  /** 핵심 코드 스니펫 (선택) */
  codeSnippet?: string;
}

/** 프로젝트 플로우 한 단계 (기획 시각화용) */
export interface ProjectFlowStep {
  emoji: string;
  label: string;
}

/** 기술적 의사결정 (Why this tech?) */
export interface TechDecisionItem {
  title: string;
  detail: string;
}

export type ExperimentVerdict = "PASS" | "FAIL";

export interface ExperimentCondition {
  id: "P" | "F" | "H";
  name: string;
  model: string;
  passed: number;
  total: number;
}

export interface ExperimentLevel {
  id: string;
  label: string;
  taskCount: number;
  rates: { P: number; F: number; H: number };
}

export interface ExperimentTaskResult {
  id: string;
  title: string;
  P: ExperimentVerdict;
  F: ExperimentVerdict;
  H: ExperimentVerdict;
}

export interface ExperimentFailure {
  task: string;
  label: string;
  detail: string;
}

export interface ExperimentPlugin {
  name: string;
  role: string;
  summary: string;
}

export interface ExperimentStudy {
  planning: string[];
  hypothesis: string;
  methodNote: string;
  conditions: ExperimentCondition[];
  levels: ExperimentLevel[];
  tasks: ExperimentTaskResult[];
  failures: ExperimentFailure[];
  stopClaim: string;
  keepClaim: string;
  positioning: string;
  plugins: ExperimentPlugin[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tagline: string;
  category: ProjectCategory;
  color: string;
  /** 이미지 경로. mp4로 끝나면 자동으로 video로 렌더링 */
  image: string;
  /** 카드 좌측 상단에 표시할 커스텀 로고 이미지 경로 (없으면 기본 아이콘 사용) */
  logo?: string;
  /** true이면 카드 내 제목 텍스트를 숨김 */
  hideTitle?: boolean;
  tech: string[];
  /** 카드에 표시할 기술 3개 (없으면 tech 앞 3개 사용) */
  cardTech?: string[];
  /** 담당 파트별 역할 분류 */
  roles?: ProjectRole[];
  /** 개발 이유 (왜 만들었는가) — 문제 해결 중심 서술 */
  whyDeveloped?: string;
  /** 프로젝트 기획 플로우 시각화 (예: [안면인식] → [스타일분석] → [쇼핑연동]) */
  flowSteps?: ProjectFlowStep[];
  /** 트러블 슈팅 목록 — 문제 → 원인 → 해결 → 결과 */
  troubleshooting?: TroubleshootingItem[];
  /** 기술적 의사결정 (왜 이 기술을 선택했는가) */
  techDecisions?: TechDecisionItem[];
  /** 실험형 상세. 있으면 담당 파트/트러블슈팅 대신 실험 본문을 렌더한다. */
  experiment?: ExperimentStudy;
  github: string;
  live: string;
  /** false면 홈 캐러셀에서 숨기고 View All에만 표시 */
  featured?: boolean;
}

/** 확장자로 mp4 여부 판별 (Storage URL + query string 허용) */
export function isVideoAsset(path: string | undefined | null): boolean {
  if (!path) return false;
  const clean = path.split("?")[0].split("#")[0].toLowerCase();
  return clean.endsWith(".mp4") || clean.endsWith(".webm");
}

export const projects: Project[] = [
  {
    id: 0,
    title: "PORTFOLIO",
    description:
      "바이브 코딩(Vibe Coding) 환경에서 복수 AI 도구를 조합하여 웹 서비스를 구축할 때의 생산성과 코드 품질을 검증하기 위한 프로젝트다. 자연어 프롬프트를 통한 기획, 반응형 UI, 3D 인터랙션 구현 전 과정을 단독 수행하며 AI 생성 코드의 품질 관리와 일관성 유지 방안을 검증했다.",
    tagline: "복수 AI 도구 조합을 통한 웹 구현 및 코드 품질 검증",
    category: "Vibe Coding",
    color: "from-gray-800 to-gray-900",
    image: "/portfolio-demo.mp4",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Cursor", "Claude AI", "Gemini"],
    roles: [
      {
        part: "AI",
        detail: "Claude와 Cursor를 활용한 프론트엔드 전 영역 구현 — 3D 캐러셀, layoutId 공유 애니메이션, 비디오 배경 모달, 반응형 clamp() 설계 및 AI 워크플로우 검증",
      },
      {
        part: "AI",
        detail: "Gemini를 통한 프롬프트 교차 검증 — 복합 UI·로직 요구사항을 Gemini로 구조화하여 프롬프트 초안을 도출하고, Cursor/Claude 출력과 대조 검증",
      },
      {
        part: "Frontend",
        detail: "Next.js App Router, React 19, Tailwind CSS 기반으로 3D 캐러셀(sin/cos), 공유 레이아웃 전환 모달 등 인터랙티브 UI 통합",
      },
      {
        part: "Design",
        detail: "디자인 토큰 및 컴포넌트 계층(cards/carousel/modals/hooks) 설계, 일관된 스타일 가이드 정의",
      },
    ],
    troubleshooting: [
      {
        title: "상태 분리와 GPU 가속을 통한 3D 캐러셀 렌더링 성능 최적화",
        problem:
          "Framer Motion 기반 3D 회전 캐러셀에서 스와이프 제스처 시 프레임 드랍과 화면 끊김 현상이 발생했다.",
        cause:
          "스와이프 제스처 시 회전 각도와 활성 인덱스를 React 상태(useState)로 매 프레임 갱신하여, 캐러셀 내부의 모든 카드 컴포넌트에서 연쇄 렌더링이 일어났다. 또한 복잡한 3D Transform 연산이 브라우저 메인 스레드에 집중되어 렌더링 병목이 발생했다.",
        solution:
          "드래그 중에는 React 상태 갱신을 제한하고, 카드 배치는 Framer Motion의 spring 물리 엔진과 3D transform(x, z, rotateY) 계산에 위임하도록 단순화했다. CSS will-change: transform 속성을 지정해 GPU 합성 레이어에서 transform을 처리하도록 유도하고, 인덱스 갱신은 pointer up 시점에 1회만 실행하도록 제한했다.",
        result:
          "불필요한 리렌더링을 차단하여 저사양 환경에서도 60fps 애니메이션을 유지하고 즉각적인 조작 반응성을 확보했다.",
        metrics: {
          label: "렌더링·체감 성능",
          before: "스와이프 시 프레임 드랍 발생",
          after: "60fps 유지 및 조작 반응성 확보",
          improvementPercent: 90,
        },
      },
      {
        title: "시스템 프롬프트와 인터페이스 규칙을 통한 AI 생성 코드 품질 제어",
        problem:
          "AI가 생성한 컴포넌트마다 any 타입 사용, 인라인 스타일 혼용, 네이밍 불일치가 발생하여 코드 일관성이 저하되었다.",
        cause:
          "자연어 프롬프트만으로는 TypeScript strict 모드 준수나 프로젝트 컨벤션 유지가 보장되지 않아, 코드 파편화와 규칙 이탈이 반복되었다.",
        solution:
          "any 사용 금지, Props 인터페이스 명시, clamp 기반 반응형 수치 등 구체적 규칙을 .cursorrules 및 시스템 컨텍스트에 강제 주입했다. AI 출력을 즉시 반영하지 않고 Gemini를 통해 구조를 요약·교차 검증한 후 적용하는 작업 흐름을 정립했다.",
        result:
          "타입 안정성과 스타일 컨벤션을 통일하여 컴포넌트 확장 시 예측 가능한 코드베이스를 유지할 수 있도록 관리 체계를 확립했다.",
      },
      {
        title: "클라이언트 컴포넌트 경계 분리를 통한 초기 번들 최소화 및 SEO 확보",
        problem:
          "페이지 최상단(page.tsx)에 'use client'를 선언하면서 페이지 전체가 클라이언트 사이드 렌더링으로 동작해 초기 로딩 속도 저하와 메타데이터 크롤링 제약이 발생했다.",
        cause:
          "대화형 UI와 정적 레이아웃이 하나의 거대한 컴포넌트로 결합되어, Next.js App Router의 서버 컴포넌트 이점을 활용하지 못했다.",
        solution:
          "'use client' 경계를 상호작용이 필수적인 하위 컴포넌트(Carousel3D, ProjectModal)로 한정하고, 메인 레이아웃·헤더·정적 텍스트·SEO 설정은 서버 컴포넌트로 유지하도록 구조를 분리했다.",
        result:
          "초기 JavaScript 번들 크기를 줄여 인터랙션 가능 시간(TTI)을 단축하고, 정적 메타데이터를 정상 주입하여 검색 엔진 크롤러 접근성을 확보했다.",
      },
    ],
    github: "https://github.com/sung1842",
    live: "",
  },
  {
    id: 1,
    title: "TWINSTAR",
    description:
      "사용자 안면 인식 데이터를 기반으로 유사 셀럽의 최근 패션 트렌드를 AI(Gemini)로 분석하고, 도출된 키워드를 실제 쇼핑(네이버 쇼핑 API)으로 직접 연결하는 패션 큐레이션 커머스 플랫폼이다. 단순 흥미 위주의 엔터테인먼트 테스트를 이커머스 구매 전환 파이프라인으로 확장하는 데 집중했다.",
    tagline: "동물상 분석 기반 셀럽 패션 큐레이션 및 커머스 연동 서비스",
    category: "AI Project",
    color: "from-indigo-800 to-purple-900",
    image: "/twinstar-demo.mp4",
    logo: "/logo-gemini.png",
    tech: ["Flask", "Deepface", "Keras", "React", "Spring Boot", "MySQL", "Spring Security", "Gemini", "Docker"],
    cardTech: ["Docker", "Gemini", "Spring Boot"],
    roles: [
      {
        part: "Design",
        detail: "서비스 전체 기획 — 동물상 매칭, 셀럽 패션 분석, 쇼핑 연결 플로우 설계 및 UI/UX 디자인",
      },
      {
        part: "Frontend",
        detail: "React 기반 웹캠 캡처, 동물상 결과 렌더링, Gemini 패션 분석 결과 화면 및 네이버 쇼핑 연동 UI 개발",
      },
      {
        part: "Backend",
        detail: "Spring Boot REST API·JPA·MySQL 전담, Spring Security 인증 관리, Gemini API 패션 트렌드 분석 및 네이버 쇼핑 자동 검색 연동",
      },
      {
        part: "DevOps",
        detail: "AI 서버(Flask), 백엔드(Spring Boot), 프론트엔드(React) 멀티 컨테이너 연동 및 Docker 기반 빌드·실행 환경 구축",
      },
    ],
    whyDeveloped:
      "사용자 얼굴 기반 동물상 매칭 후, 유사 셀럽 2인의 패션 트렌드를 분석하여 쇼핑까지 연결하는 풀스택 서비스를 구현했다. AI 서빙 서버를 제외한 기획, 디자인, 프론트엔드, 백엔드, 배포 환경 구축을 전담하여 Gemini API와 Spring Boot 기반의 상용 연동 파이프라인을 검증했다.",
    flowSteps: [
      { emoji: "📷", label: "안면 인식 (Deepface)" },
      { emoji: "🧠", label: "스타일 분석 (Gemini API)" },
      { emoji: "🛒", label: "실시간 구매 연동 (Naver API)" },
    ],
    troubleshooting: [
      {
        title: "Mono.zip 비동기 병렬 호출을 통한 외부 AI API 병목 개선",
        problem:
          "연예인 2인의 패션 트렌드를 Gemini API로 순차 분석하는 과정에서 외부 API 응답 지연이 합산되어 사용자 대기 시간이 길어졌다.",
        cause:
          "첫 번째 분석이 완료된 후 다음 분석을 호출하는 동기식(Sequential) 처리 구조로 인해, 외부 네트워크 왕복 시간이 그대로 합산되어 병목이 발생했다.",
        solution:
          "Spring WebFlux의 Mono.zip을 도입하여 독립적인 두 개의 Gemini API 요청을 비동기 병렬로 처리하고, 완료 시점에 결과를 결합하도록 파이프라인을 개선했다.",
        result:
          "외부 API 응답 대기 시간을 1분 15초에서 32초로 약 57% 단축하여 사용자 이탈을 방지하고 백엔드 스레드 점유율을 최적화했다.",
        metrics: {
          label: "API 응답 시간",
          before: "1m 15s",
          after: "32s",
          improvementPercent: 57,
        },
      },
      {
        title: "정규식 전처리를 통한 LLM 응답 포맷 불안정성 제어",
        problem:
          "Gemini API 응답에 마크다운 백틱(```json)이나 부가 설명 문장이 간헐적으로 포함되어 백엔드 JSON 파싱 실패가 발생했다.",
        cause:
          "LLM의 확률적 생성 특성상 프롬프트 제약만으로는 엄격한 JSON 포맷 출력이 완전히 보장되지 않았다.",
        solution:
          "백엔드 수신 계층에 정규 표현식 기반의 cleanJsonOutput 전처리 필터를 구현하여, 응답 문자열에서 순수 JSON 데이터 블록만 안전하게 추출하도록 구성했다.",
        result:
          "포맷 이탈 응답에서도 JSON 파싱 에러를 완전히 차단하여 프론트엔드 데이터 전달의 무결성을 확보했다.",
        codeSnippet:
          "// 핵심 로직: 정규식을 이용한 LLM 환각(Hallucination) 포맷 방어\nPattern pattern = Pattern.compile(\"```(?:json)?(.*?)```\", Pattern.DOTALL);",
      },
      {
        title: "JWT와 Spring Security 기반의 서버 사이드 인증·인가 아키텍처 구축",
        problem:
          "초기 구현 시 프론트엔드 상태 변수로 인증 상태를 제어하여 보안 취약점이 존재하고 권한 검증이 불완전했다.",
        cause:
          "클라이언트 사이드 상태에 의존하여 토큰 검증 및 엔드포인트별 인가 처리가 서버 레벨에서 강제되지 않았다.",
        solution:
          "Spring Security와 JWT 기반 필터 체인을 도입하여, 매 요청 헤더의 토큰 무결성을 서버에서 검증하고 SecurityContext에 인증 객체를 주입하는 표준 인증 구조로 개편했다.",
        result:
          "서버 레벨의 접근 제어를 확립하여 개인정보 조회 및 리소스 수정/삭제 엔드포인트의 보안성을 강화했다.",
        codeSnippet:
          "// 핵심 로직: 클라이언트 의존성 제거 및 서버 사이드 JWT 인증 필터 구현\nString jwt = getJwtFromRequest(request);\n\nif (StringUtils.hasText(jwt) && jwtTokenProvider.validateToken(jwt)) {\n    String userId = jwtTokenProvider.getUserIdFromToken(jwt);\n    Users user = userService.findByUserId(userId).orElseThrow();\n    \n    // Spring Security Context에 인증 객체(Principal) 강제 주입\n    UsernamePasswordAuthenticationToken authentication = \n            new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());\n    SecurityContextHolder.getContext().setAuthentication(authentication);\n}",
      },
    ],
    github: "https://github.com/sung1842/contestFrontend",
    live: "",
  },
  {
    id: 2,
    title: "MINGLE",
    description:
      "KREAM 플랫폼을 크롤링하여 한정판 스니커즈 데이터를 수집·가공하고, 실시간 양방향 통신 및 AI 챗봇을 연동한 리셀 플랫폼 풀스택 프로젝트다. 데이터 수집 파이프라인 구축부터 웹 인터페이스, WebSocket 기반 C2C 채팅, NAVER CLOVA X 챗봇 연동까지 전 과정을 구현했다.",
    tagline: "KREAM 데이터 수집 및 실시간 통신 기반 리셀 플랫폼",
    category: "E-Commerce",
    color: "from-orange-700 to-red-900",
    image: "/mingle-demo.mp4",
    logo: "/logo-kream.webp",
    tech: ["Spring Boot", "JavaScript", "AJAX", "MySQL", "WebSocket", "NAVER API"],
    roles: [
      {
        part: "Design",
        detail: "Figma 기반 협업을 통한 서비스 UI/UX 기획 및 전체 페이지 디자인",
      },
      {
        part: "Frontend",
        detail: "HTML·CSS·JavaScript·AJAX 기반 상품 목록·필터·구매 플로우 구현, WebSocket 실시간 채팅 및 NAVER CLOVA X API 챗봇 연동",
      },
      {
        part: "Backend",
        detail: "KREAM 크롤링 파이프라인 구축, Excel 문서화 및 MySQL 저장 자동화, Spring Boot 기반 상품 동기화 API 개발",
      },
    ],
    whyDeveloped:
      "웹 크롤링 기술을 활용해 실제 동작하는 한정판 거래 플랫폼을 구현하고자 기획했다. 데이터 수집, 관계형 데이터베이스 모델링, 실시간 양방향 채팅, 외부 AI API 연동에 이르는 풀스택 웹 개발 기초 역량을 체득한 프로젝트다.",
    troubleshooting: [
      {
        title: "고비용 AI 챗봇의 C2C 실시간 WebSocket 채팅 피벗",
        problem:
          "초기 기획 당시 Clova X API 기반 챗봇 상담을 계획했으나, 트래픽 증가 시 예상되는 API 호출 비용이 운영 한계를 초과했다.",
        cause:
          "사용자 간 일상적인 문의와 거래 소통까지 고비용 LLM 호출에 의존하는 구조로 설계되었기 때문이다.",
        solution:
          "외부 AI 의존도를 낮추고 이용자 간 직접 소통을 유도하기 위해 WebSocket 기반 C2C 실시간 채팅으로 기능을 전환하고 양방향 통신 계층을 구축했다.",
        result:
          "지연 없는 1:1 거래 소통 환경을 마련함과 동시에 외부 API 비용 부담을 완전히 해소했다.",
      },
    ],
    techDecisions: [
      {
        title: "Java 기반 자체 크롤러 구현을 통한 인프라 단일화",
        detail:
          "웹 크롤링에 널리 활용되는 Python 생태계 대신, 백엔드 단일화를 위해 Java(Jsoup) 기반 크롤러를 직접 개발했다. 별도의 Python 마이크로서비스를 운영하지 않고 Spring Boot 단일 인프라 내에서 데이터 수집과 동기화를 통합 관리하여 시스템 복잡도를 낮췄다.",
      },
    ],
    github: "https://github.com/backcorail/mingle",
    live: "",
  },
];

/** /projects 필터에서 사용할 전체 기술 스택 목록 (캐러셀 + 아카이브) */
export const allTechTags: string[] = Array.from(
  new Set([...projects, ...archiveProjects].flatMap((p) => p.tech))
).sort();

/** View All / 필터 그리드용 전체 목록 (캐러셀 + 아카이브) */
export const portfolioProjects: Project[] = [...projects, ...archiveProjects];

