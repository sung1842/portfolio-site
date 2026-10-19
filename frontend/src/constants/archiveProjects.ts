import type { Project } from "@/constants/Projects";

/**
 * Archive-only projects (View All /projects).
 * Not included in `projects` — home 3D carousel never reads this list.
 */
export const archiveProjects: Project[] = [
  {
    id: 3,
    title: "OMR PROGRAM",
    description:
      "신사2동주민센터 근무 중 약 2,000장의 종이 설문지를 수기로 계수한 뒤 엑셀에 전사해야 하는 행정 비효율을 해결하기 위해 기획·개발한 웹 기반 OMR 솔루션이다. 스캔 이미지를 업로드하면 기표 영역을 자동 판독하여 통계 산출 및 엑셀 다운로드까지 원스톱으로 처리하는 파이프라인을 구축했다.",
    tagline: "스캔 이미지 자동 판독 기반 종이 설문 통계 솔루션",
    category: "Web App",
    color: "from-teal-800 to-emerald-900",
    /** Real screen-record demo (not AI UI). Bundled for offline/archive fallback. */
    image: "/omr-demo.mp4",
    tech: ["Next.js", "TypeScript", "Python", "OpenCV", "Supabase", "Vercel"],
    cardTech: ["OpenCV", "Python", "Next.js"],
    featured: false,
    roles: [
      {
        part: "Design",
        detail: "빈 설문 학습, 대량 스캔, 예외 검토, 현황 대시보드 플로우 설계 및 기표 원 보정 UI 기획",
      },
      {
        part: "Frontend",
        detail:
          "Next.js 기반 비동기 큐 전송(Vercel 페이로드 제한 대응), 템플릿 좌표 편집기 및 엑셀 다운로드 구현",
      },
      {
        part: "AI",
        detail:
          "Python OpenCV 기반 투영 변환 및 상대좌표 기표란 흑색 픽셀 채움 판정 파이프라인 설계",
      },
      {
        part: "DevOps",
        detail:
          "opencv-python-headless 기반 Vercel Serverless 배포 환경 구축 및 Supabase 데이터 동기화",
      },
    ],
    whyDeveloped:
      "주민센터 행정 실무에서 발생하는 대량 종이 설문 수기 집계 부담을 해소하고, 반복 계수에 따른 인적 오류를 원천 차단하기 위해 개발했다.",
    flowSteps: [
      { emoji: "📄", label: "설문 스캔 업로드" },
      { emoji: "🧭", label: "표 모서리 워프" },
      { emoji: "⚪", label: "원 구멍 채움 판정" },
      { emoji: "📊", label: "현황 · Excel" },
    ],
    troubleshooting: [
      {
        title: "동적 검출 오차 누적 해결을 위한 정적 템플릿 투영 변환 재설계",
        problem:
          "기표 원을 매 스캔마다 동적 검출하고 등간격 증분을 적용했을 때, 스캔본마다 검출 좌표가 하향 이동하여 오판정이 발생했다.",
        cause:
          "인쇄 노이즈와 스캔 왜곡으로 인해 매번 기준점이 흔들렸고, 하단 인적사항 영역이 왜곡에 포함되어 아래쪽 문항으로 갈수록 좌표 편차가 누적되었다.",
        solution:
          "스캔별 동적 검출을 폐기하고, 빈 양식에서 1회 보정한 상대좌표 템플릿을 고정했다. 기표란 네 모서리를 기준으로 투영 변환(Perspective Transform)을 적용하여 정규화한 뒤, 원 내부의 흑색 픽셀 비율로만 마킹을 판정하도록 재설계했다.",
        result:
          "오탐 영역의 채움률이 0.89에서 0.003으로 개선되어 정상 기표만 분류되었으며, 고정 템플릿 기반으로 90% 이상의 자동 인식률을 확보했다.",
        metrics: {
          label: "오탐 칸(일반10) 채움률",
          before: "0.89 (검은 띠를 마킹으로 인식)",
          after: "0.003 (기표란만 채점)",
          improvementPercent: 99,
        },
      },
    ],
    github: "https://github.com/sung1842/omr_program",
    live: "https://omr-program.vercel.app",
  },
  {
    id: 4,
    title: "OPENRELAY",
    description:
      "코딩 지원 도구에서 유료 모델 한도 소진 시 무료 티어로 라우팅하는 방식이 실제 코드 생성 작업에서 어느 정도의 성공률을 유지하는지 30회 런으로 실증한 연구 프로젝트다. Next.js 기반 채팅 인터페이스를 테스트 하네스로 구축하여 로컬 게이트웨이(OmniRoute)의 라우팅 효용을 정량 검증했다.",
    tagline: "무료 LLM 릴레이의 코딩 태스크 완수율 실증 연구",
    category: "Research",
    color: "from-emerald-800 to-cyan-900",
    /** Screen-record intro (bundled like omr-demo for archive offline fallback). */
    image: "/openrelay-introduction.mp4",
    tech: ["Next.js", "React", "TypeScript", "OmniRoute", "Gemini", "Claude AI", "Cursor"],
    cardTech: ["OmniRoute", "Gemini", "Next.js"],
    featured: false,
    github: "https://github.com/sung1842/openrelay-chat",
    live: "",
    experiment: {
      planning: [
        "인스타그램 등에서 개발 도구용 플러그인을 소개하며, 유료 요금제나 토큰 비용을 크게 절감할 수 있다는 주장이 확산되었다. 유료 한도 도달 시 무료 티어로 자동 전환하여 작업 흐름을 유지한다는 설명이었다. 동시에 동일한 모델 라우팅 계층인 OpenRouter가 대규모 인수를 발표하면서, 마케팅성 주장과 실제 시장 가치의 연관성을 검증할 필요성이 제기되었다.",
        "2026년 8월 Stripe는 OpenRouter 인수를 공식 발표했다. OpenRouter는 80개 이상의 프로바이더와 400개 이상의 모델을 단일 API로 통합하고, 요청마다 가격·속도·안정성 기준 최적 경로를 설정하는 멀티모델 게이트웨이다. 일일 10조 토큰 이상을 처리하며 개발자 및 기업 1천만 규모의 생태계를 형성했다.",
        "주요 보도에 따르면 인수 금액은 70억~80억 달러 규모로 추산되었다. 토큰을 AI 시대의 기축 단위로 바라보는 시장에서, 모델 라우팅과 토큰 최적화 중간 계층에 수조 원대 기업 가치가 매겨지고 있음을 시사한다.",
        "이에 따라 검증하고자 한 질문은 단순하다. 광고에서 언급되는 비용 절감과 플랫폼 레벨의 라우팅 기술이 개인 개발자의 실제 코딩 워크플로우에서도 동일하게 성립하는지 여부다. OpenRelay 채팅 인터페이스는 이 가설을 검증하기 위한 테스트 하네스이며, 실질적인 평가 대상은 로컬 게이트웨이 OmniRoute다.",
      ],
      hypothesis:
        "유료 단일 모델 대비, 무료 티어 릴레이(또는 유료→무료 hop)는 국소 코드 수정(L1)에서는 부분적으로 유효할 수 있으나, 패턴 준수(L2) 및 다중 파일 일관성(L3) 작업에서는 성공률이 유의미하게 하락한다.",
      methodNote:
        "과제 10개 × 3개 조건 = 총 30회 런 수행. PASS 판정은 과제별 요구 조건 전수 충족 및 npm run build 성공을 기준으로 했다. PARTIAL은 집계 시 FAIL로 분류했다. P 조건은 유료 에이전트 상한 대리치(사전 패치)이며, H 조건은 의도적 스텁 후 무료 모델 완성 방식이다. 무료 모델은 Gemini 2.5 Flash를 사용했다.",
      conditions: [
        { id: "P", name: "Paid 상한", model: "Claude Opus 4.6 proxy", passed: 10, total: 10 },
        { id: "F", name: "Free 릴레이", model: "Gemini 2.5 Flash", passed: 8, total: 10 },
        { id: "H", name: "Paid→Free 홉", model: "스텁 후 Flash 완성", passed: 10, total: 10 },
      ],
      levels: [
        { id: "L1", label: "로컬 수정", taskCount: 4, rates: { P: 100, F: 75, H: 100 } },
        { id: "L2", label: "패턴 기능", taskCount: 3, rates: { P: 100, F: 100, H: 100 } },
        { id: "L3", label: "다파일 리팩터", taskCount: 3, rates: { P: 100, F: 67, H: 100 } },
      ],
      tasks: [
        { id: "L1-01", title: "uptimeSec 헬스 체크", P: "PASS", F: "FAIL", H: "PASS" },
        { id: "L1-02", title: "Marquee 문구", P: "PASS", F: "PASS", H: "PASS" },
        { id: "L1-03", title: "빈 채팅 서브타이틀", P: "PASS", F: "PASS", H: "PASS" },
        { id: "L1-04", title: "GLM 품질 힌트", P: "PASS", F: "PASS", H: "PASS" },
        { id: "L2-01", title: "chainTop 로그", P: "PASS", F: "PASS", H: "PASS" },
        { id: "L2-02", title: "route-log hops 배지", P: "PASS", F: "PASS", H: "PASS" },
        { id: "L2-03", title: "HowItWorks 샘플 경로", P: "PASS", F: "PASS", H: "PASS" },
        { id: "L3-01", title: "StatusModeBadge 공유", P: "PASS", F: "PASS", H: "PASS" },
        { id: "L3-02", title: "ApiErrorBody 계약", P: "PASS", F: "PASS", H: "PASS" },
        { id: "L3-03", title: "stick-to-bottom 추출", P: "PASS", F: "FAIL", H: "PASS" },
      ],
      failures: [
        {
          task: "L1-01 / F",
          label: "하네스 단절",
          detail: "패치가 적용되지 않고 fetch failed. 모델 코딩 능력과 분리해 읽어야 하는 인프라 실패.",
        },
        {
          task: "L3-03 / F",
          label: "False-green",
          detail: "파일은 생성되었고 정적 검사는 통과했으나 최종 빌드 단계에서 타입 에러로 실패. 단위 검사가 통과하더라도 전체 컴파일이 깨질 수 있음을 확인.",
        },
      ],
      stopClaim: "무료 LLM 릴레이만으로 복잡한 코딩을 유료 모델 없이 모두 해결할 수 있다.",
      keepClaim: "유료 모델이 끊겨도 무료 티어 릴레이로 대화 자체의 연속성은 유지된다.",
      positioning:
        "L1 수준의 긴급 패치용 감퇴 모드(degraded mode)로는 활용 가능하다. 초안 및 탐색용 연속성 확보는 가능하나 코드 품질을 보장하지 않으며, 다중 파일 리팩터링 대체는 실험 데이터가 지지하지 않는다. 코드 일관성 붕괴는 세 조건 모두 0건이었다.",
      plugins: [
        {
          name: "OmniRoute",
          role: "테스트 대상",
          summary:
            "로컬(localhost:20128)에서 동작하는 오픈소스 게이트웨이다. Cursor 및 Claude Code에 OpenAI 호환 엔드포인트로 연결하여 쿼터 소진 시 다음 모델로 자동 전환한다. 이번 30회 런의 무료 경로는 이 게이트웨이 기반 Gemini 2.5 Flash를 사용했다.",
        },
        {
          name: "OpenRouter",
          role: "시장 비교",
          summary:
            "실제 테스트 대상은 아니며, 80개 이상 프로바이더를 단일 엔드포인트로 라우팅하는 상용 서비스다. 2026년 8월 Stripe 피인수 사례를 바탕으로 모델 라우팅 레이어의 시장 가치와 실제 개발 환경 간 효용 격차를 분석하기 위한 기준점으로 활용했다.",
        },
        {
          name: "OpenRelay Chat",
          role: "실험 장치",
          summary:
            "OmniRoute 연결 상태에 따른 페일오버 전환을 시각화하도록 제작한 Next.js 채팅 인터페이스다. 상용 배포 목적이 아닌, 코드 패치를 주입하고 빌드 성공 여부를 판정하기 위한 평가 하네스로 설계했다.",
        },
      ],
    },
  },
];
