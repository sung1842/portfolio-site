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
      "사회복무요원으로 신사2동주민센터에서 근무하던 중, 주임님이 설문지 약 2,000장을 수기로 집계해야 하는 상황에 놓였습니다. 항목마다 동그라미를 세고 엑셀에 옮기는 반복 작업이라 오기도 크고 시간도 오래 걸렸습니다. 스캔본을 올리면 기표란을 자동 인식·집계하고 현황과 엑셀까지 한 화면에서 볼 수 있는 OMR 웹 서비스를 만들어, 수기 정리를 스캔 한 장 단위 처리로 바꿨습니다.",
    tagline: "2,000장 수기 집계를 스캔 한 장씩 자동 인식하는 주민센터 OMR",
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
        detail: "빈 설문 학습 → 대량 스캔 → 예외 확인 → 현황/엑셀 흐름 설계, 양식 마법사와 기표 원 교정 UI 기획",
      },
      {
        part: "Frontend",
        detail:
          "Next.js에서 이미지를 1장씩 비동기 큐로 전송(Vercel 페이로드 제한 대응), 템플릿 좌표 편집, 예외 검토, 문항별 대시보드·엑셀 다운로드",
      },
      {
        part: "AI",
        detail:
          "Python OpenCV로 표 모서리 워프 후 고정 원 좌표의 구멍 채움만 판정. 스캔마다 원을 다시 찾지 않는 템플릿 채점 엔진",
      },
      {
        part: "DevOps",
        detail:
          "Vercel Hobby 제약(50MB·10초·4.5MB)에 맞춰 opencv-python-headless + numpy만 쓰는 Serverless API, Supabase에 템플릿·집계 저장",
      },
    ],
    whyDeveloped:
      "군복무 중인 신사2동주민센터에서 주임님이 설문지 약 2,000장을 직접 세어야 했습니다. 실무 시간을 줄이기 위해 종이 OMR을 웹 서비스로 만들었습니다.",
    flowSteps: [
      { emoji: "📄", label: "설문 스캔 업로드" },
      { emoji: "🧭", label: "표 모서리 워프" },
      { emoji: "⚪", label: "원 구멍 채움 판정" },
      { emoji: "📊", label: "현황 · Excel" },
    ],
    troubleshooting: [
      {
        title: "등간격 좌표를 넣어도 테스트마다 원이 밀리는 문제",
        problem:
          "AI로 기표 원 위치를 자동 검출하고, 세로 간격이 일정해서 첫 원·간격만 재면 15칸 좌표를 계산할 수 있다고 판단했다. 그 수치를 템플릿에 넣었는데도 스캔을 올릴 때마다 원이 한 칸씩 아래로 밀려, 실제 기표가 아닌 칸(특히 일반10)이 선택으로 잡혔다.",
        cause:
          "원인은 계산 오차가 아니라 채점 파이프라인에 있었다. ① 매 스캔마다 Hough/격자로 원을 다시 찾으면 인쇄 링·가로줄·낙서에 원이 붙잡혀 좌표가 흔들린다. ② 등간격 수치는 한 장 기준 이미지에서만 맞고, 복합기 스캔은 기울기·크롭·해상도가 달라 절대 좌표가 깨진다. ③ 표 선을 기준점으로 워프할 때 아래 「인적사항」 검은 띠까지 사각형에 포함되면 15칸이 세로로 찌그러져, 아래로 갈수록 원이 밀리다가 일반10이 검은 띠와 겹친다. 이 양식에는 수능형 검정 네모 마커가 없어 모서리 추정이 특히 흔들렸다.",
        solution:
          "스캔마다 원을 재검출하지 않는다. 빈 양식에서 한 번 원을 찾고 템플릿 에디터로 교정한 뒤, 그 상대좌표를 고정한다. 채점은 표 네 모서리로 2224×2868에 워프한 다음 그 픽셀만 본다. 워프 영역은 기표 15칸으로 제한하고 인적사항 띠는 제외한다. 선택 여부는 인쇄 링이 아니라 원 안쪽 구멍(r=12)의 흑색 비율만 사용한다.",
        result:
          "같은 샘플에서 오탐이던 일반10 채움률이 0.89에서 0.003으로 떨어졌고, 실제 기표(윤동주, 일반5·7·9, 시설2)만 선택으로 분류된다. 이후 스캔은 고정 템플릿 좌표로만 채점해 테스트마다 원이 밀리지 않는다.",
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
      "인스타그램에서 유료 요금제·토큰을 크게 아낄 수 있다고 소개되는 코딩 플러그인이, 실제로 코딩 작업에서 얼마나 남는지를 숫자로 확인한 실험입니다. 채팅 앱은 가설을 돌리기 위한 장치입니다.",
    tagline: "대화는 이어져도 코딩이 되는 건 아니다 — 무료 릴레이의 효용을 30런으로 판별",
    category: "Research",
    color: "from-emerald-800 to-cyan-900",
    /** Intro video not ready — keep empty so cards/modals skip media. */
    image: "",
    tech: ["Next.js", "React", "TypeScript", "OmniRoute", "Gemini", "Claude AI", "Cursor"],
    cardTech: ["OmniRoute", "Gemini", "Next.js"],
    featured: false,
    github: "https://github.com/sung1842/openrelay-chat",
    live: "",
    experiment: {
      planning: [
        "인스타그램에서 Cursor·Claude용 플러그인을 소개하며, 유료 요금제나 토큰 비용을 크게 아낄 수 있다는 영상이 반복됐다. 유료 한도가 끊겨도 무료 티어로 자동 넘겨 대화를 이어 준다는 식의 주장이었다. 동시에 그와 같은 ‘모델 라우팅·토큰 절감’ 레이어인 OpenRouter가 거액에 인수된다는 뉴스가 이어져, 홍보 문장과 시장 가치가 같은 이야기인지가 궁금해졌다.",
        "2026년 8월 19일 Stripe는 OpenRouter 인수를 공식 발표했다. OpenRouter는 2023년 설립된 멀티모델 게이트웨이로, 80곳 이상 프로바이더의 400개 이상 모델을 한 API로 붙이고 요청마다 가격·속도·안정성으로 라우팅한다. 자체 발표 기준 하루 10조 토큰 이상, 개발자·기업 약 1천만 규모다. 수년 동안 ‘LLM판 Stripe’로 불렸고, 올해 5월 시리즈 B 1억 1,300만 달러(기업가치 약 13억 달러)를 받은 지 몇 달 만의 매각이다.",
        "양사는 금액을 공개하지 않았다. 뉴욕타임스는 75억 달러(창업자 몫 15억), Axios와 Bloomberg는 70억~80억 달러 이상을 보도했다. Stripe CEO 패트릭 컬리슨은 토큰을 AI 시대의 통화로 보고, 이미 Token Billing을 내놓은 뒤 비용 대비 성능을 실시간으로 고르는 라우팅이 필요하다고 설명했다. 시장은 모델을 고르고 토큰을 아끼는 중간층에 수조 원대 가치를 매기고 있다.",
        "그래서 확인한 질문은 단순하다. 인스타 홍보가 말하는 절감과, OpenRouter가 스케일에서 다루는 라우팅이 개인 개발자의 코딩 작업에서도 그대로 성립하는가. OpenRelay 채팅은 그 가설을 돌리기 위한 장치이고, 실제 테스트 대상은 로컬 게이트웨이 OmniRoute다.",
      ],
      hypothesis:
        "유료 단일 모델 대비, 무료 티어 릴레이(또는 유료→무료 hop)는 로컬 수정(L1)에서는 부분적으로 가능해도, 패턴 준수(L2)·다파일 일관성(L3)에서는 성공률이 떨어진다.",
      methodNote:
        "과제 10개 × 조건 3 = 30런. PASS는 과제별 필수 항목 전부와 npm run build 성공. PARTIAL은 성공률에서 FAIL로 집계. P는 유료/IDE 에이전트 상한 대리치(사전 패치)라 맹목 A/B가 아니고, H는 실제 429가 아니라 의도적 스텁 후 무료 완성이다. 무료 모델은 Gemini 2.5 Flash로, 가장 약한 무료 티어보다 강할 수 있다. 표본 n=10이라 유의성 대신 격차(pp)로 읽는다.",
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
          detail: "파일은 들어갔고 의미 검사도 통과했으나 최종 빌드가 타입 에러로 실패. 검사가 초록이어도 컴파일이 깨질 수 있다.",
        },
      ],
      stopClaim: "무료 LLM 릴레이만으로 복잡한 코딩을 유료 모델 없이 모두 해결할 수 있다.",
      keepClaim: "유료 모델이 끊겨도 무료 티어 릴레이로 대화 자체의 연속성은 유지된다.",
      positioning:
        "L1 긴급 패치용 degraded mode로는 쓸 수 있다. 초안·탐색용 연속 레이어는 가능하지만 코드 품질을 담보하지 않고, 다파일 리팩터링 대체는 데이터가 지지하지 않는다. 일관성 붕괴는 세 조건 모두 0건이었다.",
      plugins: [
        {
          name: "OmniRoute",
          role: "테스트 대상",
          summary:
            "로컬(localhost:20128)에서 도는 MIT 게이트웨이. Cursor·Claude Code에 OpenAI 호환 엔드포인트로 붙이면, 쿼터 소진 시 다음 모델로 자동 넘긴다. 이번 30런의 무료 경로는 이 게이트웨이 위의 Gemini 2.5 Flash다.",
        },
        {
          name: "OpenRouter",
          role: "시장 비교",
          summary:
            "테스트에 쓴 도구는 아니다. 80곳 이상·400개 이상 모델을 한 API로 라우팅하는 상용 게이트웨이다. 2026년 8월 Stripe 인수가 발표됐고, 보도 기준 약 70억~80억 달러다. 인스타 홍보와 같은 ‘토큰을 아껴 모델을 고른다’는 레이어가 시장에서 얼마짜리인지를 보는 자료로 썼다.",
        },
        {
          name: "OpenRelay Chat",
          role: "실험 장치",
          summary:
            "OmniRoute가 없으면 데모 페일오버로 전환이 보이게 만든 Next.js 채팅 UI. 서비스 출시가 아니라, 코딩 패치를 넣고 빌드·체크로 성공 여부를 가리는 하네스다.",
        },
      ],
    },
  },
];
