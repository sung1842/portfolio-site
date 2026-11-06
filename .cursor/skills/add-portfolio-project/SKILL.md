---
name: add-portfolio-project
description: Add a new project card and modal to Oh Sungwoo's portfolio site. Use when the user wants to add a new project, update project info, change tech stack icons, modify card design, or work on ProjectCard/ProjectModal/projects. Covers the full workflow: Supabase row → card → modal mindmap.
---

# Add Portfolio Project

## Data sources (split on purpose)

| Surface | Source | Why |
|---------|--------|-----|
| Home 3D carousel | Local seed `constants/Projects.ts` via `getFeaturedProjects()` | Fast first paint — do **not** fetch Supabase on home |
| View All `/projects` + archive detail | Supabase `projects` (+ `archiveProjects` fallback/enrich) | Cards beyond the home trio live in DB / archive seed |
| Media | Prefer `project-media` public URLs; local `/public` only for critical offline demos (e.g. `omr-demo.mp4`) | |

Home carousel projects stay **bundled in the app**. New featured home cards = edit `Projects.ts` seed. New archive-only cards = Supabase row with `featured: false` **and** mirror into `archiveProjects.ts` for enrich/fallback.

## File Map

```
src/lib/supabase.ts              ← anon 클라이언트
src/lib/projects.ts              ← getProjects / getFeaturedProjects
src/lib/media.ts                 ← project-media public URL
src/constants/Projects.ts        ← 타입 + 오프라인 seed fallback
src/utils/projectHelpers.ts      ← 아이콘 매핑 (getTechMeta, getProjectIcon)
src/utils/neonStyles.ts          ← 카드 네온 색상 (id 기반)
src/components/cards/            ← 3D 캐러셀 카드 UI
src/components/modals/           ← 프로젝트 상세 모달
supabase/migrations/             ← projects 스키마 + Storage 버킷
```

## Step 1 — 영상 업로드

소개 영상은 `higgsfield-portfolio-video` 스킬로 만든 뒤, `project-media` 버킷(public)에 mp4/webp를 올리고 public URL을 `image` / `logo`에 저장한다. `/public`에 넣지 않는다.

## Step 1b — `projects` 행 추가

홈 캐러셀에 안 보이게 하려면 `featured: false`. View All(`/projects`)에는 그대로 나온다.

## Step 2 — 아이콘 추가 (새 기술일 때만)

```ts
// src/utils/projectHelpers.ts
import { SiNewIcon } from "react-icons/si";

// TECH_META_MAP에 추가
"NewTech": { icon: SiNewIcon, color: "#HEX색상" },

// getProjectIcon에 추가 (프로젝트 대표 아이콘이 필요할 때)
if (text.includes("projectname")) return SiNewIcon;
```

**현재 등록된 tech 키:**
`Spring Boot`, `MySQL`, `AJAX`, `Next.js`, `React`, `Vue.js`, `Gemini`, `Flask`, `Python`, `Deepface`, `Keras`, `TypeScript`, `Docker`, `AWS`

## Step 3 — 네온 색상 등록

```ts
// src/utils/neonStyles.ts — NEON_SCHEMES에 새 id 추가
3: {
  color1: "rgba(R, G, B, 0.6)",   // 좌상단 네온색
  color2: "rgba(R, G, B, 0.55)",  // 우하단 네온색
  borderColor: "rgba(R, G, B, 0.3)",
},
```

**기존 색상 참고:**
- id:1 TWINSTAR — Gemini Blue `#4285F4` + Deep Purple
- id:2 MINGLE — Electric Orange + Neon Yellow

## Step 4 — 카드 동작 확인

`ProjectCard.tsx`는 데이터만 받아 자동 렌더링. 별도 수정 불필요.

카드 레이아웃 (고정):
```
[카테고리 뱃지]          [로고/아이콘 40px]
         제목 (line-clamp-2)
         tagline (line-clamp-1)
[Spring] [React] [Gemini]          tap →
```

반응형 크기: `clamp()` 기반 — `R` 상수 객체(`ProjectCard.tsx` 상단) 수정으로 전체 조정.

## Step 5 — 상세 모달

기본 틀은 JD-FIT 상세다. 구현은 `BaseProjectDetail`. id 0–4(PORTFOLIO, TWINSTAR, MINGLE, OMR, OPENRELAY)는 레거시 모달을 유지하고, 이 틀로 갈아끼우지 않는다.

새 프로젝트는 `BaseProjectDetail`에 데이터만 넣는다. 특색은 `mindmap` 슬롯이나 별도 본문으로만 추가한다.

```
[GitHub]                          [닫기]
아이콘  CATEGORY
TITLE
tagline

왼쪽                              오른쪽
작업 방식 (짧은 선 + 호버)         프로젝트 기획 (문단 카드)
기술 흐름 (마인드맵, 있을 때만)     트러블 슈팅
기술 칩                           기술적 의사결정 (같은 선 목록)
```

이모지 흐름 칩은 기본 틀에 없다. `rolesHeading`은 `"작업 방식"`.

## 체크리스트

새 프로젝트 추가 시:
- [ ] Supabase `projects` 행 추가 (id 중복 없이, 필요 시 `featured: false`)
- [ ] `project-media`에 영상/로고 업로드 후 URL 저장
- [ ] `projectHelpers.ts` — 새 tech가 있으면 `TECH_META_MAP`에 추가
- [ ] `projectHelpers.ts` — `getProjectIcon` 분기 추가 (필요 시)
- [ ] `neonStyles.ts` — 새 id의 색상 스키마 추가
- [ ] `/public` 폴더에 영상/이미지/로고 파일 배치
- [ ] `npx tsc --noEmit` 로 타입 오류 확인

## 디자인 시스템

**카드 배경:** `#050505` + 네온 radial-gradient  
**모달 배경:** `#d4d4d4` (회색)  
**모달 내부:** 영상 `opacity:0.55` + 흰색 하단 그라디언트  
**텍스트 그림자:** `0 1px 3px rgba(0,0,0,0.18)`  
**뱃지 그림자:** `boxShadow: "0 2px 8px rgba(0,0,0,0.12)"`  
**GitHub 버튼:** `#1b1f23` 배경, `height:32px`, `top:16 left:16`  
**닫기 버튼:** `#000` 배경, 흰색 X, `height:32px`, `top:16 right:16`  

## 텍스트 작성 표준 (말투 및 어조 규정)

프로젝트 추가 및 수정 시 텍스트는 아래 규정을 엄격히 준수한다:
1. **서술형 항목 (`description`, `whyDeveloped`, 트러블슈팅 세부 항목, `techDecisions`):**
   - **어미:** 반드시 평서 문어체(`~했다 / ~이다`)로 작성한다. `~습니다`, `~함`, `~하였다` 혼용 금지.
   - **주어:** 1인칭 주어("저는", "제가", "나", "팀과 함께" 등)는 생략한다.
   - **톤앤매너:** 학술 보고서/엔지니어링 문서 톤 유지. 감정적이거나 과장된 수식어("쫀득한", "시니어급", "완벽하게", "획기적으로" 등) 배제.
2. **한 줄 요약 및 라벨 (`tagline`, `flowSteps` 라벨):**
   - 마침표 없는 명사구로 종결한다 (예: "동물상 분석 기반 셀럽 패션 큐레이션 및 커머스 연동 서비스").
3. **담당 파트 (`roles` detail):**
   - 마침표 없는 개조식 명사구로 종결한다 (예: "Spring Boot 기반 REST API 및 보안 파이프라인 설계").
4. **트러블슈팅 (`troubleshooting`):**
   - `title`: "조치 방법 -> 개선 결과" 형태의 명사구.
   - `problem`, `cause`, `solution`, `result`: 4개 필드 모두 예외 없이 `~했다 / ~이다`로 통일.

## 주의사항

- `Projects.ts`의 `allTechTags`와 `portfolioProjects`는 자동 계산 — 수정 불필요
- Profile 카드는 `id:0` 고정, `ProfileCard.tsx` 별도 컴포넌트 사용
- 모달에서 `category === "Profile"`이면 `ProfileModal`, 나머지는 `ProjectModal`
- 카드 너비: 모바일 `55vw`, 데스크톱 `20vw`, max `400px`
- `globals.css`에 `::-webkit-scrollbar { display: none }` 전역 적용됨

## 상세 참고

- 아이콘/색상 전체 목록 → [icons-reference.md](icons-reference.md)
- 소개 영상 생성 → [higgsfield-portfolio-video](../higgsfield-portfolio-video/SKILL.md)
