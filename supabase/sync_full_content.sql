-- Sync full detail text from frontend seed into public.projects (image/logo untouched).
-- Generated with unified plain literary tone (~했다/~이다).
begin;

update public.projects set
  description = $txt$바이브 코딩(Vibe Coding) 환경에서 복수 AI 도구를 조합하여 웹 서비스를 구축할 때의 생산성과 코드 품질을 검증하기 위한 프로젝트다. 자연어 프롬프트를 통한 기획, 반응형 UI, 3D 인터랙션 구현 전 과정을 단독 수행하며 AI 생성 코드의 품질 관리와 일관성 유지 방안을 검증했다.$txt$,
  tagline = $txt$복수 AI 도구 조합을 통한 웹 구현 및 코드 품질 검증$txt$,
  tech = array[$txt$Next.js$txt$, $txt$React$txt$, $txt$TypeScript$txt$, $txt$Tailwind CSS$txt$, $txt$Framer Motion$txt$, $txt$Cursor$txt$, $txt$Claude AI$txt$, $txt$Gemini$txt$]::text[],
  card_tech = null,
  roles = $json$[{"part":"AI","detail":"Claude와 Cursor를 활용한 프론트엔드 전 영역 구현 — 3D 캐러셀, layoutId 공유 애니메이션, 비디오 배경 모달, 반응형 clamp() 설계 및 AI 워크플로우 검증"},{"part":"AI","detail":"Gemini를 통한 프롬프트 교차 검증 — 복합 UI·로직 요구사항을 Gemini로 구조화하여 프롬프트 초안을 도출하고, Cursor/Claude 출력과 대조 검증"},{"part":"Frontend","detail":"Next.js App Router, React 19, Tailwind CSS 기반으로 3D 캐러셀(sin/cos), 공유 레이아웃 전환 모달 등 인터랙티브 UI 통합"},{"part":"Design","detail":"디자인 토큰 및 컴포넌트 계층(cards/carousel/modals/hooks) 설계, 일관된 스타일 가이드 정의"}]$json$::jsonb,
  why_developed = null,
  flow_steps = null,
  troubleshooting = $json$[{"title":"상태 분리와 GPU 가속을 통한 3D 캐러셀 렌더링 성능 최적화","problem":"Framer Motion 기반 3D 회전 캐러셀에서 스와이프 제스처 시 프레임 드랍과 화면 끊김 현상이 발생했다.","cause":"스와이프 제스처 시 회전 각도와 활성 인덱스를 React 상태(useState)로 매 프레임 갱신하여, 캐러셀 내부의 모든 카드 컴포넌트에서 연쇄 렌더링이 일어났다. 또한 복잡한 3D Transform 연산이 브라우저 메인 스레드에 집중되어 렌더링 병목이 발생했다.","solution":"드래그 중에는 React 상태 갱신을 제한하고, 카드 배치는 Framer Motion의 spring 물리 엔진과 3D transform(x, z, rotateY) 계산에 위임하도록 단순화했다. CSS will-change: transform 속성을 지정해 GPU 합성 레이어에서 transform을 처리하도록 유도하고, 인덱스 갱신은 pointer up 시점에 1회만 실행하도록 제한했다.","result":"불필요한 리렌더링을 차단하여 저사양 환경에서도 60fps 애니메이션을 유지하고 즉각적인 조작 반응성을 확보했다.","metrics":{"label":"렌더링·체감 성능","before":"스와이프 시 프레임 드랍 발생","after":"60fps 유지 및 조작 반응성 확보","improvementPercent":90}},{"title":"시스템 프롬프트와 인터페이스 규칙을 통한 AI 생성 코드 품질 제어","problem":"AI가 생성한 컴포넌트마다 any 타입 사용, 인라인 스타일 혼용, 네이밍 불일치가 발생하여 코드 일관성이 저하되었다.","cause":"자연어 프롬프트만으로는 TypeScript strict 모드 준수나 프로젝트 컨벤션 유지가 보장되지 않아, 코드 파편화와 규칙 이탈이 반복되었다.","solution":"any 사용 금지, Props 인터페이스 명시, clamp 기반 반응형 수치 등 구체적 규칙을 .cursorrules 및 시스템 컨텍스트에 강제 주입했다. AI 출력을 즉시 반영하지 않고 Gemini를 통해 구조를 요약·교차 검증한 후 적용하는 작업 흐름을 정립했다.","result":"타입 안정성과 스타일 컨벤션을 통일하여 컴포넌트 확장 시 예측 가능한 코드베이스를 유지할 수 있도록 관리 체계를 확립했다."},{"title":"클라이언트 컴포넌트 경계 분리를 통한 초기 번들 최소화 및 SEO 확보","problem":"페이지 최상단(page.tsx)에 'use client'를 선언하면서 페이지 전체가 클라이언트 사이드 렌더링으로 동작해 초기 로딩 속도 저하와 메타데이터 크롤링 제약이 발생했다.","cause":"대화형 UI와 정적 레이아웃이 하나의 거대한 컴포넌트로 결합되어, Next.js App Router의 서버 컴포넌트 이점을 활용하지 못했다.","solution":"'use client' 경계를 상호작용이 필수적인 하위 컴포넌트(Carousel3D, ProjectModal)로 한정하고, 메인 레이아웃·헤더·정적 텍스트·SEO 설정은 서버 컴포넌트로 유지하도록 구조를 분리했다.","result":"초기 JavaScript 번들 크기를 줄여 인터랙션 가능 시간(TTI)을 단축하고, 정적 메타데이터를 정상 주입하여 검색 엔진 크롤러 접근성을 확보했다."}]$json$::jsonb,
  tech_decisions = null,
  updated_at = now()
where id = 0;

update public.projects set
  description = $txt$사용자 안면 인식 데이터를 기반으로 유사 셀럽의 최근 패션 트렌드를 AI(Gemini)로 분석하고, 도출된 키워드를 실제 쇼핑(네이버 쇼핑 API)으로 직접 연결하는 패션 큐레이션 커머스 플랫폼이다. 단순 흥미 위주의 엔터테인먼트 테스트를 이커머스 구매 전환 파이프라인으로 확장하는 데 집중했다.$txt$,
  tagline = $txt$동물상 분석 기반 셀럽 패션 큐레이션 및 커머스 연동 서비스$txt$,
  tech = array[$txt$Flask$txt$, $txt$Deepface$txt$, $txt$Keras$txt$, $txt$React$txt$, $txt$Spring Boot$txt$, $txt$MySQL$txt$, $txt$Spring Security$txt$, $txt$Gemini$txt$, $txt$Docker$txt$]::text[],
  card_tech = array[$txt$Docker$txt$, $txt$Gemini$txt$, $txt$Spring Boot$txt$]::text[],
  roles = $json$[{"part":"Design","detail":"서비스 전체 기획 — 동물상 매칭, 셀럽 패션 분석, 쇼핑 연결 플로우 설계 및 UI/UX 디자인"},{"part":"Frontend","detail":"React 기반 웹캠 캡처, 동물상 결과 렌더링, Gemini 패션 분석 결과 화면 및 네이버 쇼핑 연동 UI 개발"},{"part":"Backend","detail":"Spring Boot REST API·JPA·MySQL 전담, Spring Security 인증 관리, Gemini API 패션 트렌드 분석 및 네이버 쇼핑 자동 검색 연동"},{"part":"DevOps","detail":"AI 서버(Flask), 백엔드(Spring Boot), 프론트엔드(React) 멀티 컨테이너 연동 및 Docker 기반 빌드·실행 환경 구축"}]$json$::jsonb,
  why_developed = $txt$사용자 얼굴 기반 동물상 매칭 후, 유사 셀럽 2인의 패션 트렌드를 분석하여 쇼핑까지 연결하는 풀스택 서비스를 구현했다. AI 서빙 서버를 제외한 기획, 디자인, 프론트엔드, 백엔드, 배포 환경 구축을 전담하여 Gemini API와 Spring Boot 기반의 상용 연동 파이프라인을 검증했다.$txt$,
  flow_steps = $json$[{"emoji":"📷","label":"안면 인식 (Deepface)"},{"emoji":"🧠","label":"스타일 분석 (Gemini API)"},{"emoji":"🛒","label":"실시간 구매 연동 (Naver API)"}]$json$::jsonb,
  troubleshooting = $json$[{"title":"Mono.zip 비동기 병렬 호출을 통한 외부 AI API 병목 개선","problem":"연예인 2인의 패션 트렌드를 Gemini API로 순차 분석하는 과정에서 외부 API 응답 지연이 합산되어 사용자 대기 시간이 길어졌다.","cause":"첫 번째 분석이 완료된 후 다음 분석을 호출하는 동기식(Sequential) 처리 구조로 인해, 외부 네트워크 왕복 시간이 그대로 합산되어 병목이 발생했다.","solution":"Spring WebFlux의 Mono.zip을 도입하여 독립적인 두 개의 Gemini API 요청을 비동기 병렬로 처리하고, 완료 시점에 결과를 결합하도록 파이프라인을 개선했다.","result":"외부 API 응답 대기 시간을 1분 15초에서 32초로 약 57% 단축하여 사용자 이탈을 방지하고 백엔드 스레드 점유율을 최적화했다.","metrics":{"label":"API 응답 시간","before":"1m 15s","after":"32s","improvementPercent":57}},{"title":"정규식 전처리를 통한 LLM 응답 포맷 불안정성 제어","problem":"Gemini API 응답에 마크다운 백틱(```json)이나 부가 설명 문장이 간헐적으로 포함되어 백엔드 JSON 파싱 실패가 발생했다.","cause":"LLM의 확률적 생성 특성상 프롬프트 제약만으로는 엄격한 JSON 포맷 출력이 완전히 보장되지 않았다.","solution":"백엔드 수신 계층에 정규 표현식 기반의 cleanJsonOutput 전처리 필터를 구현하여, 응답 문자열에서 순수 JSON 데이터 블록만 안전하게 추출하도록 구성했다.","result":"포맷 이탈 응답에서도 JSON 파싱 에러를 완전히 차단하여 프론트엔드 데이터 전달의 무결성을 확보했다.","codeSnippet":"// 핵심 로직: 정규식을 이용한 LLM 환각(Hallucination) 포맷 방어\nPattern pattern = Pattern.compile(\"```(?:json)?(.*?)```\", Pattern.DOTALL);"},{"title":"JWT와 Spring Security 기반의 서버 사이드 인증·인가 아키텍처 구축","problem":"초기 구현 시 프론트엔드 상태 변수로 인증 상태를 제어하여 보안 취약점이 존재하고 권한 검증이 불완전했다.","cause":"클라이언트 사이드 상태에 의존하여 토큰 검증 및 엔드포인트별 인가 처리가 서버 레벨에서 강제되지 않았다.","solution":"Spring Security와 JWT 기반 필터 체인을 도입하여, 매 요청 헤더의 토큰 무결성을 서버에서 검증하고 SecurityContext에 인증 객체를 주입하는 표준 인증 구조로 개편했다.","result":"서버 레벨의 접근 제어를 확립하여 개인정보 조회 및 리소스 수정/삭제 엔드포인트의 보안성을 강화했다.","codeSnippet":"// 핵심 로직: 클라이언트 의존성 제거 및 서버 사이드 JWT 인증 필터 구현\nString jwt = getJwtFromRequest(request);\n\nif (StringUtils.hasText(jwt) && jwtTokenProvider.validateToken(jwt)) {\n    String userId = jwtTokenProvider.getUserIdFromToken(jwt);\n    Users user = userService.findByUserId(userId).orElseThrow();\n    \n    // Spring Security Context에 인증 객체(Principal) 강제 주입\n    UsernamePasswordAuthenticationToken authentication = \n            new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());\n    SecurityContextHolder.getContext().setAuthentication(authentication);\n}"}]$json$::jsonb,
  tech_decisions = null,
  updated_at = now()
where id = 1;

update public.projects set
  description = $txt$KREAM 플랫폼을 크롤링하여 한정판 스니커즈 데이터를 수집·가공하고, 실시간 양방향 통신 및 AI 챗봇을 연동한 리셀 플랫폼 풀스택 프로젝트다. 데이터 수집 파이프라인 구축부터 웹 인터페이스, WebSocket 기반 C2C 채팅, NAVER CLOVA X 챗봇 연동까지 전 과정을 구현했다.$txt$,
  tagline = $txt$KREAM 데이터 수집 및 실시간 통신 기반 리셀 플랫폼$txt$,
  tech = array[$txt$Spring Boot$txt$, $txt$JavaScript$txt$, $txt$AJAX$txt$, $txt$MySQL$txt$, $txt$WebSocket$txt$, $txt$NAVER API$txt$]::text[],
  card_tech = null,
  roles = $json$[{"part":"Design","detail":"Figma 기반 협업을 통한 서비스 UI/UX 기획 및 전체 페이지 디자인"},{"part":"Frontend","detail":"HTML·CSS·JavaScript·AJAX 기반 상품 목록·필터·구매 플로우 구현, WebSocket 실시간 채팅 및 NAVER CLOVA X API 챗봇 연동"},{"part":"Backend","detail":"KREAM 크롤링 파이프라인 구축, Excel 문서화 및 MySQL 저장 자동화, Spring Boot 기반 상품 동기화 API 개발"}]$json$::jsonb,
  why_developed = $txt$웹 크롤링 기술을 활용해 실제 동작하는 한정판 거래 플랫폼을 구현하고자 기획했다. 데이터 수집, 관계형 데이터베이스 모델링, 실시간 양방향 채팅, 외부 AI API 연동에 이르는 풀스택 웹 개발 기초 역량을 체득한 프로젝트다.$txt$,
  flow_steps = null,
  troubleshooting = $json$[{"title":"고비용 AI 챗봇의 C2C 실시간 WebSocket 채팅 피벗","problem":"초기 기획 당시 Clova X API 기반 챗봇 상담을 계획했으나, 트래픽 증가 시 예상되는 API 호출 비용이 운영 한계를 초과했다.","cause":"사용자 간 일상적인 문의와 거래 소통까지 고비용 LLM 호출에 의존하는 구조로 설계되었기 때문이다.","solution":"외부 AI 의존도를 낮추고 이용자 간 직접 소통을 유도하기 위해 WebSocket 기반 C2C 실시간 채팅으로 기능을 전환하고 양방향 통신 계층을 구축했다.","result":"지연 없는 1:1 거래 소통 환경을 마련함과 동시에 외부 API 비용 부담을 완전히 해소했다."}]$json$::jsonb,
  tech_decisions = $json$[{"title":"Java 기반 자체 크롤러 구현을 통한 인프라 단일화","detail":"웹 크롤링에 널리 활용되는 Python 생태계 대신, 백엔드 단일화를 위해 Java(Jsoup) 기반 크롤러를 직접 개발했다. 별도의 Python 마이크로서비스를 운영하지 않고 Spring Boot 단일 인프라 내에서 데이터 수집과 동기화를 통합 관리하여 시스템 복잡도를 낮췄다."}]$json$::jsonb,
  updated_at = now()
where id = 2;

update public.projects set
  description = $txt$신사2동주민센터 근무 중 약 2,000장의 종이 설문지를 수기로 계수한 뒤 엑셀에 전사해야 하는 행정 비효율을 해결하기 위해 기획·개발한 웹 기반 OMR 솔루션이다. 스캔 이미지를 업로드하면 기표 영역을 자동 판독하여 통계 산출 및 엑셀 다운로드까지 원스톱으로 처리하는 파이프라인을 구축했다.$txt$,
  tagline = $txt$스캔 이미지 자동 판독 기반 종이 설문 통계 솔루션$txt$,
  tech = array[$txt$Next.js$txt$, $txt$TypeScript$txt$, $txt$Python$txt$, $txt$OpenCV$txt$, $txt$Supabase$txt$, $txt$Vercel$txt$]::text[],
  card_tech = array[$txt$OpenCV$txt$, $txt$Python$txt$, $txt$Next.js$txt$]::text[],
  roles = $json$[{"part":"Design","detail":"빈 설문 학습, 대량 스캔, 예외 검토, 현황 대시보드 플로우 설계 및 기표 원 보정 UI 기획"},{"part":"Frontend","detail":"Next.js 기반 비동기 큐 전송(Vercel 페이로드 제한 대응), 템플릿 좌표 편집기 및 엑셀 다운로드 구현"},{"part":"AI","detail":"Python OpenCV 기반 투영 변환 및 상대좌표 기표란 흑색 픽셀 채움 판정 파이프라인 설계"},{"part":"DevOps","detail":"opencv-python-headless 기반 Vercel Serverless 배포 환경 구축 및 Supabase 데이터 동기화"}]$json$::jsonb,
  why_developed = $txt$주민센터 행정 실무에서 발생하는 대량 종이 설문 수기 집계 부담을 해소하고, 반복 계수에 따른 인적 오류를 원천 차단하기 위해 개발했다.$txt$,
  flow_steps = $json$[{"emoji":"📄","label":"설문 스캔 업로드"},{"emoji":"🧭","label":"표 모서리 워프"},{"emoji":"⚪","label":"원 구멍 채움 판정"},{"emoji":"📊","label":"현황 · Excel"}]$json$::jsonb,
  troubleshooting = $json$[{"title":"동적 검출 오차 누적 해결을 위한 정적 템플릿 투영 변환 재설계","problem":"기표 원을 매 스캔마다 동적 검출하고 등간격 증분을 적용했을 때, 스캔본마다 검출 좌표가 하향 이동하여 오판정이 발생했다.","cause":"인쇄 노이즈와 스캔 왜곡으로 인해 매번 기준점이 흔들렸고, 하단 인적사항 영역이 왜곡에 포함되어 아래쪽 문항으로 갈수록 좌표 편차가 누적되었다.","solution":"스캔별 동적 검출을 폐기하고, 빈 양식에서 1회 보정한 상대좌표 템플릿을 고정했다. 기표란 네 모서리를 기준으로 투영 변환(Perspective Transform)을 적용하여 정규화한 뒤, 원 내부의 흑색 픽셀 비율로만 마킹을 판정하도록 재설계했다.","result":"오탐 영역의 채움률이 0.89에서 0.003으로 개선되어 정상 기표만 분류되었으며, 고정 템플릿 기반으로 90% 이상의 자동 인식률을 확보했다.","metrics":{"label":"오탐 칸(일반10) 채움률","before":"0.89 (검은 띠를 마킹으로 인식)","after":"0.003 (기표란만 채점)","improvementPercent":99}}]$json$::jsonb,
  tech_decisions = null,
  updated_at = now()
where id = 3;

update public.projects set
  description = $txt$코딩 지원 도구에서 유료 모델 한도 소진 시 무료 티어로 라우팅하는 방식이 실제 코드 생성 작업에서 어느 정도의 성공률을 유지하는지 30회 런으로 실증한 연구 프로젝트다. Next.js 기반 채팅 인터페이스를 테스트 하네스로 구축하여 로컬 게이트웨이(OmniRoute)의 라우팅 효용을 정량 검증했다.$txt$,
  tagline = $txt$무료 LLM 릴레이의 코딩 태스크 완수율 실증 연구$txt$,
  tech = array[$txt$Next.js$txt$, $txt$React$txt$, $txt$TypeScript$txt$, $txt$OmniRoute$txt$, $txt$Gemini$txt$, $txt$Claude AI$txt$, $txt$Cursor$txt$]::text[],
  card_tech = array[$txt$OmniRoute$txt$, $txt$Gemini$txt$, $txt$Next.js$txt$]::text[],
  roles = null,
  why_developed = null,
  flow_steps = null,
  troubleshooting = null,
  tech_decisions = null,
  tech_flow = $json${"planning":["인스타그램 등에서 개발 도구용 플러그인을 소개하며, 유료 요금제나 토큰 비용을 크게 절감할 수 있다는 주장이 확산되었다. 유료 한도 도달 시 무료 티어로 자동 전환하여 작업 흐름을 유지한다는 설명이었다. 동시에 동일한 모델 라우팅 계층인 OpenRouter가 대규모 인수를 발표하면서, 마케팅성 주장과 실제 시장 가치의 연관성을 검증할 필요성이 제기되었다.","2026년 8월 Stripe는 OpenRouter 인수를 공식 발표했다. OpenRouter는 80개 이상의 프로바이더와 400개 이상의 모델을 단일 API로 통합하고, 요청마다 가격·속도·안정성 기준 최적 경로를 설정하는 멀티모델 게이트웨이다. 일일 10조 토큰 이상을 처리하며 개발자 및 기업 1천만 규모의 생태계를 형성했다.","주요 보도에 따르면 인수 금액은 70억~80억 달러 규모로 추산되었다. 토큰을 AI 시대의 기축 단위로 바라보는 시장에서, 모델 라우팅과 토큰 최적화 중간 계층에 수조 원대 기업 가치가 매겨지고 있음을 시사한다.","이에 따라 검증하고자 한 질문은 단순하다. 광고에서 언급되는 비용 절감과 플랫폼 레벨의 라우팅 기술이 개인 개발자의 실제 코딩 워크플로우에서도 동일하게 성립하는지 여부다. OpenRelay 채팅 인터페이스는 이 가설을 검증하기 위한 테스트 하네스이며, 실질적인 평가 대상은 로컬 게이트웨이 OmniRoute다."],"hypothesis":"유료 단일 모델 대비, 무료 티어 릴레이(또는 유료→무료 hop)는 국소 코드 수정(L1)에서는 부분적으로 유효할 수 있으나, 패턴 준수(L2) 및 다중 파일 일관성(L3) 작업에서는 성공률이 유의미하게 하락한다.","methodNote":"과제 10개 × 3개 조건 = 총 30회 런 수행. PASS 판정은 과제별 요구 조건 전수 충족 및 npm run build 성공을 기준으로 했다. PARTIAL은 집계 시 FAIL로 분류했다. P 조건은 유료 에이전트 상한 대리치(사전 패치)이며, H 조건은 의도적 스텁 후 무료 모델 완성 방식이다. 무료 모델은 Gemini 2.5 Flash를 사용했다.","conditions":[{"id":"P","name":"Paid 상한","model":"Claude Opus 4.6 proxy","passed":10,"total":10},{"id":"F","name":"Free 릴레이","model":"Gemini 2.5 Flash","passed":8,"total":10},{"id":"H","name":"Paid→Free 홉","model":"스텁 후 Flash 완성","passed":10,"total":10}],"levels":[{"id":"L1","label":"로컬 수정","taskCount":4,"rates":{"P":100,"F":75,"H":100}},{"id":"L2","label":"패턴 기능","taskCount":3,"rates":{"P":100,"F":100,"H":100}},{"id":"L3","label":"다파일 리팩터","taskCount":3,"rates":{"P":100,"F":67,"H":100}}],"tasks":[{"id":"L1-01","title":"uptimeSec 헬스 체크","P":"PASS","F":"FAIL","H":"PASS"},{"id":"L1-02","title":"Marquee 문구","P":"PASS","F":"PASS","H":"PASS"},{"id":"L1-03","title":"빈 채팅 서브타이틀","P":"PASS","F":"PASS","H":"PASS"},{"id":"L1-04","title":"GLM 품질 힌트","P":"PASS","F":"PASS","H":"PASS"},{"id":"L2-01","title":"chainTop 로그","P":"PASS","F":"PASS","H":"PASS"},{"id":"L2-02","title":"route-log hops 배지","P":"PASS","F":"PASS","H":"PASS"},{"id":"L2-03","title":"HowItWorks 샘플 경로","P":"PASS","F":"PASS","H":"PASS"},{"id":"L3-01","title":"StatusModeBadge 공유","P":"PASS","F":"PASS","H":"PASS"},{"id":"L3-02","title":"ApiErrorBody 계약","P":"PASS","F":"PASS","H":"PASS"},{"id":"L3-03","title":"stick-to-bottom 추출","P":"PASS","F":"FAIL","H":"PASS"}],"failures":[{"task":"L1-01 / F","label":"하네스 단절","detail":"패치가 적용되지 않고 fetch failed. 모델 코딩 능력과 분리해 읽어야 하는 인프라 실패."},{"task":"L3-03 / F","label":"False-green","detail":"파일은 생성되었고 정적 검사는 통과했으나 최종 빌드 단계에서 타입 에러로 실패. 단위 검사가 통과하더라도 전체 컴파일이 깨질 수 있음을 확인."}],"stopClaim":"무료 LLM 릴레이만으로 복잡한 코딩을 유료 모델 없이 모두 해결할 수 있다.","keepClaim":"유료 모델이 끊겨도 무료 티어 릴레이로 대화 자체의 연속성은 유지된다.","positioning":"L1 수준의 긴급 패치용 감퇴 모드(degraded mode)로는 활용 가능하다. 초안 및 탐색용 연속성 확보는 가능하나 코드 품질을 보장하지 않으며, 다중 파일 리팩터링 대체는 실험 데이터가 지지하지 않는다. 코드 일관성 붕괴는 세 조건 모두 0건이었다.","plugins":[{"name":"OmniRoute","role":"테스트 대상","summary":"로컬(localhost:20128)에서 동작하는 오픈소스 게이트웨이다. Cursor 및 Claude Code에 OpenAI 호환 엔드포인트로 연결하여 쿼터 소진 시 다음 모델로 자동 전환한다. 이번 30회 런의 무료 경로는 이 게이트웨이 기반 Gemini 2.5 Flash를 사용했다."},{"name":"OpenRouter","role":"시장 비교","summary":"실제 테스트 대상은 아니며, 80개 이상 프로바이더를 단일 엔드포인트로 라우팅하는 상용 서비스다. 2026년 8월 Stripe 피인수 사례를 바탕으로 모델 라우팅 레이어의 시장 가치와 실제 개발 환경 간 효용 격차를 분석하기 위한 기준점으로 활용했다."},{"name":"OpenRelay Chat","role":"실험 장치","summary":"OmniRoute 연결 상태에 따른 페일오버 전환을 시각화하도록 제작한 Next.js 채팅 인터페이스다. 상용 배포 목적이 아닌, 코드 패치를 주입하고 빌드 성공 여부를 판정하기 위한 평가 하네스로 설계했다."}]}$json$::jsonb,
  updated_at = now()
where id = 4;

commit;
