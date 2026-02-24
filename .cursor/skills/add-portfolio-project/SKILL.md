---
name: add-portfolio-project
description: Add a new project card and modal to Oh Sungwoo's portfolio site. Use when the user wants to add a new project, update project info, change tech stack icons, modify card design, or work on ProjectCard/ProjectModal/Projects.ts. Covers the full workflow: data → card → modal.
---

# Add Portfolio Project

## File Map

```
src/constants/Projects.ts        ← 프로젝트 데이터 (단일 진실 공급원)
src/utils/projectHelpers.ts      ← 아이콘 매핑 (getTechMeta, getProjectIcon)
src/utils/neonStyles.ts          ← 카드 네온 색상 (id 기반)
src/components/cards/
  ProjectCard.tsx                ← 3D 캐러셀 카드 UI
  ProfileCard.tsx                ← 프로필 카드 (id:0 전용)
  CardShell.tsx                  ← 카드 공통 래퍼
  BaseCard.tsx                   ← header/content/footer 레이아웃
src/components/modals/
  ProjectModal.tsx               ← 프로젝트 상세 모달 (영상 풀스크린)
  ProfileModal.tsx               ← 프로필 상세 모달
```

## Step 1 — Projects.ts에 데이터 추가

```ts
// src/constants/Projects.ts
{
  id: 3,                          // 기존 최대 id + 1
  title: "PROJECT NAME",
  description: "상세 설명 (한국어, 2-4문장)",
  tagline: "한 줄 요약",
  category: "AI Project",         // "AI Project" | "E-Commerce" | "Web App" | "Mobile"
  color: "from-indigo-800 to-purple-900",  // Tailwind gradient (카드 fallback)
  image: "/demo.mp4",             // mp4 → 자동으로 video 태그 렌더링
                                  // jpg/png → img 태그
  logo: "/logo.webp",             // 선택: 카드 우측 상단 + 모달 카테고리 아이콘
  tech: ["Flask", "React", "Gemini"],  // projectHelpers.ts의 TECH_META_MAP 키와 일치
  github: "https://github.com/...",
  live: "",
}
```

**규칙:**
- `image`가 `.mp4`면 `isVideoAsset()` 함수가 자동 감지 → video 태그 사용
- `logo`가 있으면 카드 우측 상단 + 모달 카테고리 아이콘에 사용
- `tech` 배열 키는 반드시 `TECH_META_MAP`에 있는 키와 정확히 일치해야 함

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

## Step 5 — 모달 동작 확인

`ProjectModal.tsx`는 데이터만 받아 자동 렌더링. 별도 수정 불필요.

모달 레이아웃:
```
[GitHub 버튼 ─ 좌상단]      [닫기 버튼 ─ 우상단]
           (영상/이미지 풀스크린 배경 opacity:0.55)
           (하단 흰색 그라디언트 오버레이)

[로고] CATEGORY
TITLE
──── 스크롤 가능 영역 (maxHeight: 28vh) ────
tagline
description
[Spring] [React] [Gemini]
[Live Demo 버튼]
```

## 체크리스트

새 프로젝트 추가 시:
- [ ] `Projects.ts` — 새 객체 추가 (id 중복 없이)
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

## 주의사항

- `Projects.ts`의 `allTechTags`와 `portfolioProjects`는 자동 계산 — 수정 불필요
- Profile 카드는 `id:0` 고정, `ProfileCard.tsx` 별도 컴포넌트 사용
- 모달에서 `category === "Profile"`이면 `ProfileModal`, 나머지는 `ProjectModal`
- 카드 너비: 모바일 `55vw`, 데스크톱 `20vw`, max `400px`
- `globals.css`에 `::-webkit-scrollbar { display: none }` 전역 적용됨

## 상세 참고

- 아이콘/색상 전체 목록 → [icons-reference.md](icons-reference.md)
