import { archiveProjects } from "@/constants/archiveProjects";

export type ProjectCategory = "Profile" | "AI Project" | "E-Commerce" | "Web App" | "Mobile" | "Portfolio" | "Vibe Coding" | "Research";

export interface ProjectRole {
  part: string;
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
  /** 담당 파트 / 작업 방식 목록 */
  roles?: ProjectRole[];
  /** 왼쪽 열 목록 제목. 없으면 '담당 파트' */
  rolesHeading?: string;
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
    id: 5,
    title: "JD-FIT",
    description:
      "채용 공고는 구인 플랫폼에 반복 적재되는 공개 데이터이고, 공고 요건과 후보의 공개 증거를 맞추는 일은 이미 채용 제품의 과제다. 공고 원문은 자동 수집 금지를 명시하지 않은 구인 사이트에서 Crawl4AI로 직접 수집했다. 유사 기능은 링크드인 등 기존 제품에 있으나 내부 매칭 구조는 공개되어 있지 않아 추정하지 않았고, 호출 비용과 동일 입력의 결과 안정성을 기준으로 설계했다. 이력서 관리와 후보 데스크는 이 매칭을 계정 흐름에서 검증하기 위한 최소 틀이다.",
    tagline: "정규화·해시·코드 깔때기 기반 헤드헌팅 JD 핏 분석",
    category: "AI Project",
    color: "from-blue-800 to-rose-900",
    image: "",
    tech: ["TypeScript", "Next.js", "Gemini", "Claude", "Redis", "Supabase", "Docker", "Python"],
    cardTech: ["TypeScript", "Gemini", "Redis"],
    rolesHeading: "작업 방식",
    roles: [
      {
        part: "정규화",
        detail:
          "Crawl4AI로 수집한 공고 본문의 정규화와 source_hash 변경 감지, 본문 불변 시 정규화 LLM과 매칭 큐 적재 생략",
      },
      {
        part: "코드 깔때기",
        detail:
          "A SQL 필수조건, B 기술 겹침·벡터 검색, C 결정적 순위식으로 후보를 상위 N명까지 축소",
      },
      {
        part: "판단과 승인",
        detail:
          "상위 N명에 한정한 Gemini 좁은 분석과 Claude 1회 종합, 접촉은 pending_review 사람 승인",
      },
      {
        part: "검증 틀",
        detail:
          "이력서 관리와 후보 데스크 등 매칭 루프를 계정 흐름에서 돌리기 위한 최소 화면",
      },
    ],
    whyDeveloped:
      "채용 공고는 구인 플랫폼에 반복 적재되는 공개 데이터이고, 공고 요건과 후보의 공개 증거를 맞추는 일은 이미 채용 제품의 과제다. 공고 원문은 자동 수집 금지를 명시하지 않은 구인 사이트에서 Crawl4AI로 직접 수집했다. 유사 기능은 링크드인 등 기존 제품에 있으나 내부 매칭 구조는 공개되어 있지 않아 추정하지 않았고, 호출 비용과 동일 입력의 결과 안정성을 기준으로 설계했다.",
    troubleshooting: [
      {
        title: "source_hash 게이트와 코드 깔때기를 통한 LLM 호출 상한 분리",
        problem:
          "후보 전원과 본문이 바뀌지 않은 수정까지 LLM과 큐에 넣으면 호출 수가 풀 크기에 비례했고, 상시 매칭의 적재 순서도 섞였다.",
        cause:
          "매칭마다 원문을 다시 모델에 넣었고, 내용이 같은 수정도 새 작업으로 큐에 들어가 워커 입력이 불필요하게 늘었다.",
        solution:
          "등록 시 1회 정규화·임베딩했다. source_hash가 같으면 정규화 LLM을 건너뛰고 큐에 넣지 않았다. 매칭은 A SQL 필수조건, B 기술 겹침과 벡터 검색, C 결정적 순위식으로 줄였다. A~C는 같은 입력이면 같은 결과다. 상위 N명만 Gemini 좁은 분석과 Claude 1회 종합에 넣었고, 즉시 매칭과 상시 수색은 큐 우선순위로 나눴다. D단계는 스키마로 출력을 좁힌 판단이며 비트 단위로 동일하지는 않다.",
        result:
          "호출 수가 후보 풀 크기가 아니라 상한 N에 묶였다. 1만 명 가정에서 순진한 방식 5만 회 대비 상위 30명 기준 약 150회 상한이다. 해당 수치는 설계 상한이며 1만 명 실측은 아니다.",
      },
    ],
    techDecisions: [
      {
        title: "A~C는 코드로 고정하고 LLM은 정규화와 최종 판단에만 사용",
        detail:
          "비교와 정렬은 SQL, 기술 사전, 벡터 검색, 결정적 순위식의 담당이다. 동일 입력의 동일 결과는 이 구간의 성질이다. Gemini는 좁은 분석과 JSON Schema 강제에, Claude는 후보 1명당 1회 종합에만 썼다. 최종 판단은 확률적 생성이므로 깔때기와 같은 결정성을 주장하지 않았다.",
      },
      {
        title: "공개 증거만 매칭하고 접촉은 사람 승인에 고정",
        detail:
          "AI는 사실·수치·산출물을 질문으로 캐내고, 매칭 입력은 사용자가 고른 공개 기록으로 한정했다. 비공개 기록은 점수에 넣지 않았다. 후보 접촉은 pending_review 상태값으로 사람 승인 후에만 실행하고, 워커는 승인 대기 중 종료했다.",
      },
    ],
    github: "https://github.com/sung1842/jd-fit-analyzer",
    live: "",
  },
];

/** /projects 필터에서 사용할 전체 기술 스택 목록 (캐러셀 + 아카이브) */
export const allTechTags: string[] = Array.from(
  new Set([...projects, ...archiveProjects].flatMap((p) => p.tech))
).sort();

/** View All / 필터 그리드용 전체 목록 (캐러셀 + 아카이브) */
export const portfolioProjects: Project[] = [...projects, ...archiveProjects];

