export type ProjectCategory = "Profile" | "AI Project" | "E-Commerce" | "Web App" | "Mobile" | "Portfolio" | "Vibe Coding";

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
  github: string;
  live: string;
}

/** 확장자로 mp4 여부 판별 */
export function isVideoAsset(path: string): boolean {
  return path.toLowerCase().endsWith(".mp4");
}

export const projects: Project[] = [
  {
    id: 0,
    title: "PORTFOLIO",
    description:
      "바이브 코딩(Vibe Coding)이 트렌드인 시대에, AI를 어떻게 활용하면 웹·앱을 효율적으로 만들 수 있는지 직접 검증하기 위해 시작한 실험 프로젝트입니다. 자연어 프롬프트만으로 기획부터 UI·반응형·애니메이션까지 구현 가능한지, 그리고 여러 AI 도구를 조합했을 때 코드 품질과 일관성을 어떻게 유지할 수 있는지를 포트폴리오 사이트 하나를 통해 end-to-end로 테스트했습니다.",
    tagline: "바이브 코딩 시대, AI로 웹을 만드는 방식을 한 번에 검증한 실험",
    category: "Vibe Coding",
    color: "from-gray-800 to-gray-900",
    image: "/portfolio-demo.mp4",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Cursor", "Claude AI", "Gemini"],
    roles: [
      {
        part: "AI",
        detail: "Claude와 Cursor를 이용한 개발 — 자연어 지시로 3D 캐러셀, Framer Motion 레이아웃 전환, 비디오 배경 모달, 반응형 clamp() 전략 등 프론트엔드 전 영역 구현. AI가 생성한 코드를 그대로 적용하며 실제 워크플로우 검증",
      },
      {
        part: "AI",
        detail: "Gemini를 통한 프롬프트 도출 및 교차 검증 — 복잡한 UI·로직 요구사항을 Gemini에 입력해 프롬프트 초안을 뽑아내고, Cursor/Claude 결과와 비교·교차 검증하여 품질을 유지하면서 개발 속도를 높이는 방식을 실험",
      },
      {
        part: "Frontend",
        detail: "Next.js App Router, React 19, Tailwind 기반 구조에서 3D 캐러셀(sin/cos), layoutId 공유 전환, 비디오 배경 모달 등 자연어로 지시한 스펙을 AI 출력으로 구현·통합",
      },
      {
        part: "Design",
        detail: "디자인 토큰·컴포넌트 계층(cards/carousel/modals/hooks) 설계, 카드·캐러셀·모달 일관된 스타일 가이드 정리 후 AI가 따르도록 요구사항으로 전달",
      },
    ],
    troubleshooting: [
      {
        title: "3D 캐러셀 인터랙션 및 렌더링 성능 최적화",
        problem:
          "Framer Motion을 활용해 3D 회전 캐러셀을 구현했으나, 모바일 환경이나 저사양 디바이스에서 스와이프(Drag) 제스처 시 프레임 드랍(Frame Drop)과 뚝뚝 끊기는 버벅거림(Stuttering) 현상이 발생함.",
        cause:
          "사용자의 스와이프 제스처에 따라 회전 각도나 현재 인덱스를 React의 상태(useState)로 실시간 업데이트할 때마다, 캐러셀 내부의 모든 카드 컴포넌트가 불필요하게 연쇄 리렌더링(Re-rendering)을 일으킴. 또한, 복잡한 3D Transform 연산이 CPU에 집중되어 브라우저 렌더링 파이프라인에 병목이 발생함.",
        solution:
          "React 렌더 트리가 매 프레임마다 전체 캐러셀을 다시 그리지 않도록, 드래그 중에는 상태 업데이트를 최소화하고 카드 회전은 Framer Motion의 spring 애니메이션과 3D transform(x, z, rotateY) 계산에만 위임하는 구조로 단순화했다. CSS will-change: transform과 3D transform(translateZ 등)을 사용해 GPU가 transform 파이프라인을 최대한 처리하도록 하고, 스와이프는 pointer up 시점에 한 번만 activeIndex를 갱신하도록 제한해 불필요한 리렌더링을 제거했다.",
        result:
          "불필요한 리렌더링 횟수를 90% 이상 억제하여 모바일에서도 부드러운 60fps 애니메이션을 확보함. 웹 브라우저 한계를 넘어 네이티브 앱(Native App) 수준의 쫀득하고 즉각적인 조작감을 달성함.",
        metrics: {
          label: "렌더링·체감 성능",
          before: "스와이프 시 프레임 드랍·버벅거림",
          after: "60fps 유지, 네이티브 앱급 조작감",
          improvementPercent: 90,
        },
      },
      {
        title: "AI 생성 코드의 타입·스타일 일관성 유지",
        problem:
          "AI가 생성한 컴포넌트마다 any 사용, 인라인 스타일 방식, 네이밍이 제각각이라 유지보수와 확장이 어려움.",
        cause:
          "프롬프트만으로는 'TypeScript strict', 'Tailwind 우선', '인터페이스 명시' 같은 규칙이 매번 지켜지지 않아, 생성 결과가 프로젝트 컨벤션과 어긋남. AI의 태생적 한계인 코드 파편화와 규칙 이탈을 시스템적으로 제어할 필요가 있음.",
        solution:
          "요구사항을 문서화해 'any 금지, Props 인터페이스 필수', '반응형은 clamp 사용', '스타일은 Tailwind + 필요한 만큼만 인라인' 등 규칙을 명시하고, .cursorrules 등 시스템 규칙을 강제 주입하여 프롬프트 엔지니어링으로 일관성을 확보. 생성된 코드를 바로 받아쓰지 않고 Gemini로 교차 검증·요약한 뒤 Cursor에서 반영하고, 필요한 부분만 수동으로 정리.",
        result:
          "타입과 스타일이 통일되어 이후 프로젝트 추가·수정 시 예측 가능한 구조를 유지할 수 있으며, 'AI가 코드를 짜줬다'를 넘어 'AI 출력을 제어하는 시스템적 규칙 설계'라는 시니어급 스토리로 정리됨.",
      },
      {
        title: "클라이언트 컴포넌트(use client) 경계 최적화 및 SEO 확보",
        problem:
          "3D 캐러셀과 모달 애니메이션(Framer Motion)을 적용하기 위해 페이지 최상단(page.tsx)에 \"use client\"를 선언했더니, 페이지 전체가 클라이언트 사이드 렌더링(CSR)으로 동작하며 초기 로딩 속도가 저하되고 SEO 메타데이터 주입에 문제가 발생함.",
        cause:
          "Next.js App Router 환경에서 대화형(Interactive) UI와 정적(Static) 레이아웃을 하나의 거대한 컴포넌트로 뭉뚱그려 작성하여, 서버 컴포넌트(Server Component)가 주는 Zero-Bundle-Size 이점을 완전히 상실함.",
        solution:
          "컴포넌트 트리 분리(Component Composition): \"use client\" 선언의 경계를 최하단 잎사귀 노드(Leaf Node)로 강제로 끌어내림. 메인 레이아웃·헤더·정적 텍스트·SEO <head> 설정은 서버 컴포넌트로 유지하여 렌더링 속도를 확보하고, 무거운 상태(State)와 제스처 이벤트가 필요한 Carousel3D와 ProjectModal만 독립적인 클라이언트 컴포넌트로 분리한 뒤, 서버 컴포넌트에서 초기 데이터를 Props로 내려주는 구조로 아키텍처를 전면 리팩토링함.",
        result:
          "사용자 인터랙션(스와이프, 모달)의 부드러움은 100% 유지하면서, 브라우저로 전송되는 초기 JavaScript 번들 사이즈를 획기적으로 줄여 TTI(Time to Interactive)를 향상함. 동시에 검색 엔진 봇(Googlebot 등)이 포트폴리오의 정적 HTML과 메타데이터를 완벽하게 크롤링할 수 있도록 SEO 최적화를 달성함.",
      },
    ],
    github: "https://github.com/sung1842",
    live: "",
  },
  {
    id: 1,
    title: "TWINSTAR",
    description: "나에게 어울리는 스타일을 찾는 과정의 허들을 낮추기 위해 기획된 AI 패션 큐레이션 커머스입니다. 단순한 흥미 위주의 '동물상 테스트'를 넘어, 닮은 연예인의 최근 패션 트렌드를 LLM(Gemini)으로 분석하고, 추출된 키워드를 실제 구매(네이버 쇼핑 API)까지 딜레이 없이(Seamless) 연결하는 비즈니스 파이프라인을 구축하는 데 집중했습니다.",
    tagline: "내 동물상 닮은 셀럽 패션을 AI가 분석하고 쇼핑까지 연결",
    category: "AI Project",
    color: "from-indigo-800 to-purple-900",
    image: "/twinstar-demo.mp4",
    logo: "/logo-gemini.png",
    tech: ["Flask", "Deepface", "Keras", "React", "Spring Boot", "MySQL", "Spring Security", "Gemini", "Docker"],
    cardTech: ["Docker", "Gemini", "Spring Boot"],
    roles: [
      {
        part: "Design",
        detail: "서비스 전체 기획 — 동물상 매칭 → 셀럽 패션 분석 → 쇼핑 연결 플로우 설계, UI/UX 디자인 총괄",
      },
      {
        part: "Frontend",
        detail: "React 기반 웹캠 캡처, 동물상 결과 렌더링, Gemini 패션 분석 결과 페이지 및 네이버 쇼핑 연동 UI 개발",
      },
      {
        part: "Backend",
        detail: "Spring Boot REST API·JPA·MySQL 전담, Spring Security 로그인 전역 관리, Gemini API로 연예인 패션(카테고리·색상·스타일) 트렌드 분석, 키워드 추출 후 네이버 쇼핑 자동 검색 연동",
      },
      {
        part: "DevOps",
        detail: "AI 서버(Flask)·백엔드(Spring Boot)·프론트(React) 3개 서버 연동, Docker 이미지 빌드 및 컨테이너 실행 환경 구축",
      },
    ],
    whyDeveloped:
      "사용자 얼굴 기반 동물상 매칭 후, 닮은 연예인 2명의 패션 트렌드를 분석해 실제 쇼핑까지 연결하는 서비스를 기획·구현했습니다. AI 서버(동물상)를 제외한 기획·디자인·프론트·백엔드·DevOps를 1인 담당하며, Gemini API와 Spring Boot 기반 풀스택 경험을 쌓기 위한 프로젝트입니다.",
    flowSteps: [
      { emoji: "📷", label: "안면 인식 (Deepface)" },
      { emoji: "🧠", label: "스타일 분석 (Gemini API)" },
      { emoji: "🛒", label: "실시간 구매 연동 (Naver API)" },
    ],
    troubleshooting: [
      {
        title: "외부 API 병목 현상 개선 (Mono.zip 도입)",
        problem:
          "두 명의 연예인 패션 트렌드를 Gemini API로 분석하는 과정에서, 응답 시간이 너무 오래 걸려 사용자 경험(UX)이 심각하게 저하됨.",
        cause:
          "한 명의 분석이 끝날 때까지 기다렸다가 다음 연예인을 분석하는 '동기식(Sequential)' 호출 방식으로 인해, 외부 API의 지연 시간이 그대로 합산되어 병목(Bottleneck)이 발생함.",
        solution:
          "Spring WebFlux의 Mono.zip을 도입하여 두 개의 독립적인 Gemini API 요청을 비동기(Asynchronous)로 병렬 처리한 후, 결과를 하나의 응답으로 조합(map)하는 로직으로 리팩토링함.",
        result:
          "동기식 호출 대비 패션 분석 대기 시간을 약 50% 단축하여 사용자 이탈률을 방지하고 백엔드 스레드 점유 시간을 최적화함.",
        metrics: {
          label: "API 응답 시간",
          before: "1m 15s",
          after: "32s",
          improvementPercent: 57,
        },
      },
      {
        title: "LLM(Gemini) 응답 포맷 불안정성 제어",
        problem:
          "Gemini API가 종종 순수 JSON 포맷이 아닌 마크다운(```json)이 섞인 텍스트나 불필요한 설명을 덧붙여 반환하여, 백엔드에서 데이터 파싱 에러(JSON Parse Error)가 간헐적으로 발생함.",
        solution:
          "AI 모델의 Hallucination(환각) 및 포맷 이탈을 100% 통제할 수 없다고 판단, 백엔드 응답단에 정규 표현식(Regex)을 활용한 cleanJsonOutput 전처리 메서드를 구현함.",
        result:
          "마크다운 백틱 및 잉여 텍스트를 안전하게 제거하고 순수 JSON 스트링만 추출해 내어, 프론트엔드로 전달되는 데이터의 무결성과 서비스 안정성을 확보함.",
        codeSnippet:
          "// 핵심 로직: 정규식을 이용한 LLM 환각(Hallucination) 포맷 방어\nPattern pattern = Pattern.compile(\"```(?:json)?(.*?)```\", Pattern.DOTALL);",
      },
      {
        title: "보안 취약점 개선 및 세션 관리 고도화 (JWT + Spring Security)",
        problem:
          "초기 개발 시 프론트엔드(HTML/JS)의 단순 변수(Boolean)로 로그인 상태 및 UI 권한을 제어하여, 로직 오류와 심각한 클라이언트 측 보안 취약점이 존재했음.",
        solution:
          "클라이언트 의존적인 상태 관리를 폐기하고, Spring Security와 JWT(Json Web Token)를 함께 도입하여 서버 사이드 기반의 견고한 인증/인가(Authentication & Authorization) 아키텍처로 전면 개편함. 요청 헤더의 JWT를 검증한 뒤 SecurityContext에 인증 객체를 주입하는 필터를 구현함.",
        result:
          "JWT + Spring Security 기반 인증/인가로 보안이 강화되고, 마이페이지·수정/삭제 권한 등이 안정적으로 동작함.",
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
      "첫 번째 개발 프로젝트. KREAM을 크롤링해 상품 데이터를 수집·Excel 문서화·DB 저장하는 파이프라인을 구축하고, HTML·CSS·JavaScript·AJAX로 한정판 리셀 플랫폼 프론트를 직접 제작. WebSocket으로 실시간 채팅 기능을 구현하고, NAVER CLOVA X API로 AI 챗봇을 연동. Figma로 팀 디자인 협업.",
    tagline: "KREAM 크롤링 기반 리셀 플랫폼 — 첫 번째 풀스택 프로젝트",
    category: "E-Commerce",
    color: "from-orange-700 to-red-900",
    image: "/mingle-demo.mp4",
    logo: "/logo-kream.webp",
    tech: ["Spring Boot", "JavaScript", "AJAX", "MySQL", "WebSocket", "NAVER API"],
    roles: [
      {
        part: "Design",
        detail: "Figma로 팀 디자인 협업, 서비스 전체 UI/UX 기획 및 페이지 디자인 총괄",
      },
      {
        part: "Frontend",
        detail: "HTML·CSS·JavaScript·AJAX로 상품 목록·필터·구매 흐름 구현, WebSocket 기반 실시간 채팅 기능 개발, NAVER CLOVA X API 연동으로 AI 챗봇 구현",
      },
      {
        part: "Backend",
        detail: "KREAM 사이트 크롤링 → Excel 문서화 → MySQL DB 저장 파이프라인 구축, Spring Boot 기반 상품 동기화 API 개발",
      },
    ],
    whyDeveloped:
      "팀과 함께 크롤링을 학습했고, 이 기능을 살려서 실제 리셀 플랫폼을 만들고 싶었습니다. 첫 프로젝트라 수준은 제한적이지만, 크롤링·실시간 채팅·API 연동까지 경험을 쌓은 의미 있는 도전이었습니다.",
    troubleshooting: [
      {
        title: "C2C 실시간 채팅 구현 (비용 최적화)",
        problem:
          "초기 기획 시 Clova X API를 연동한 챗봇 시스템을 구성했으나, 예상되는 API 호출 비용이 감당하기 힘든 수준으로 산출됨.",
        solution:
          "고비용의 외부 AI 의존도를 낮추고 사용자 간의 직접적인 거래 소통을 유도하기 위해, 당근마켓 방식의 '이용자 간(C2C) 실시간 채팅' 기능으로 기획을 피벗(Pivot)함. HTTP Request-Response 모델의 한계를 극복하기 위해 WebSocket 프로토콜을 도입함.",
        result:
          "양방향 실시간 통신을 통해 지연 없는 채팅 환경을 구축하였으며, API 사용료 등 서비스 유지/운영 비용을 대폭 절감함.",
      },
    ],
    techDecisions: [
      {
        title: "Java 기반 크롤링 선택 이유",
        detail:
          "파이썬(Python)이 웹 크롤링에 널리 쓰이지만, '백엔드 생태계의 단일화'를 위해 Java(Jsoup/Selenium 등) 기반의 크롤러를 직접 개발함. 이를 통해 별도의 파이썬 마이크로서비스를 띄우지 않고도 Spring Boot 환경 내에서 크롤링 로직을 통합 관리하여 인프라 복잡도를 낮춤.",
      },
    ],
    github: "https://github.com/backcorail/mingle",
    live: "",
  },
];

/** /projects 필터에서 사용할 전체 기술 스택 목록 (자동 추출) */
export const allTechTags: string[] = Array.from(
  new Set(projects.flatMap((p) => p.tech))
).sort();

/** 실제 프로젝트 목록 (전체) */
export const portfolioProjects = projects;
