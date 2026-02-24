# 🚀 Oh Sungwoo - Full Stack Developer Portfolio

<div align="center">
  <img src="/public/og-image.png" alt="Portfolio Preview" width="800" />
</div>

<br />

## 📖 Overview (프로젝트 소개)
본 프로젝트는 저의 웹 개발 역량과 프로젝트 경험을 시각적으로 보여주기 위해 제작된 **인터랙티브 3D 포트폴리오 웹사이트**입니다. 단순한 텍스트 나열을 넘어, 사용자에게 몰입감 있는 경험(3D Carousel, Swipe Gestures)을 제공하는 데 중점을 두었습니다.

- **URL:** [https://yourdomain.com](배포 후 변경 예정)
- **개발 기간:** 2026.02.20 ~ 진행 중

## 🛠️ Tech Stack (기술 스택)
- **Framework:** Next.js 15 (App Router), React 19
- **Styling & Animation:** Tailwind CSS v4, Framer Motion
- **Language:** TypeScript
- **Deployment:** Vercel

## ✨ Key Features (주요 기능)
- **Interactive 3D Carousel:** Framer Motion의 물리 엔진(Spring)과 가속도(Velocity) 계산을 결합하여, 모바일과 데스크톱 환경 모두에서 부드러운 스와이프/드래그 제스처를 지원합니다.
- **Dynamic Project Modals:** 정적인 이미지가 아닌, 실제 프로젝트 구동 영상을 `.webm` 포맷으로 최적화하여 모달창 내에서 자동 재생되도록 구현했습니다.
- **Responsive Design:** `dvh` 단위와 `clamp()` 함수를 적극 활용하여, 다양한 모바일/데스크톱 디바이스 화면에서 레이아웃 붕괴 없이 완벽하게 핏(Fit) 되도록 설계했습니다.

## 🚀 Trouble Shooting (문제 해결 과정)
> 개발 과정에서 겪었던 주요 기술적 고민과 해결 방법입니다.

### 1. 3D 캐러셀 제스처 최적화 (Swipe Velocity)
- **문제:** 초기 드래그 구현 시, 이동 거리(Offset)만 계산하여 카드가 뻣뻣하게 한 장씩만 넘어가는 UX 저하 발생.
- **해결:** Framer Motion의 `panInfo` 객체에서 **속도(Velocity)** 데이터를 추출하여 이동 거리에 가중치로 더하는 물리 엔진 알고리즘을 구현. 손가락을 튕기는 속도에 따라 한 번에 2~3장의 카드가 부드럽게 넘어가도록 조작감 대폭 개선.

### 2. 100vh 레이아웃 모바일 브라우저 붕괴 현상 방어
- **문제:** 모바일 사파리/크롬 등에서 브라우저 기본 UI(주소창 등)로 인해 `100vh` 적용 시 화면 하단이 짤리는 현상 발생.
- **해결:** `vh` 대신 동적 뷰포트 단위인 `dvh(Dynamic Viewport Height)`를 도입하고, 거대 타이포그래피에 `clamp()` 함수와 음수 마진(Negative Margin)을 조합하여, 어떠한 화면 높이에서도 요소들이 겹치거나 잘리지 않는 반응형 클러스터 레이아웃 구축.

## 📂 Directory Structure (폴더 구조)
```text
src/
├── app/
│   ├── projects/          # 프로젝트 상세 라우트 (App Router)
│   ├── globals.css        # 전역 스타일 및 Tailwind 지시어
│   ├── layout.tsx         # 최상단 레이아웃 및 폰트 설정
│   ├── metadata.ts        # SEO 및 메타데이터 중앙 관리
│   ├── opengraph-image.tsx# OG(OpenGraph) 이미지 동적 생성
│   └── page.tsx           # 메인 뷰 (Hero Section & 3D Carousel)
├── components/
│   ├── cards/             # 3D 캐러셀 내부 카드 UI (Project, Profile)
│   ├── carousel/          # 3D 회전 제스처 및 물리 엔진 로직
│   ├── modals/            # 전역 모달 컴포넌트 (ProjectModal, ProfileModal)
│   ├── projects/          # 프로젝트 상세 관련 분리된 컴포넌트
│   └── ui/                # 공통 UI 컴포넌트 (버튼, 배지, 아이콘 등)
├── config/
│   └── design.ts          # 디자인 시스템 토큰 (색상, 크기, 비율 상수화)
├── constants/
│   ├── profile.ts         # 개인 프로필 기본 데이터
│   ├── Projects.ts        # 프로젝트 데이터 (Single Source of Truth)
│   └── techStack.ts       # 기술 스택 목록 및 카테고리
├── hooks/
│   ├── useCardTransform.ts # 3D 카드 애니메이션 변환 커스텀 훅
│   └── useCarouselRadius.ts# 반응형 캐러셀 반지름 동적 계산 훅
├── lib/
│   └── api.ts             # API 통신 및 외부 서비스 연동 유틸
├── types/
│   └── project.ts         # 전역 TypeScript 인터페이스 및 타입 정의
└── utils/
    ├── neonStyles.ts      # 프로젝트 ID 기반 네온 색상 계산 로직
    └── projectHelpers.ts  # 아이콘 매핑 및 헬퍼 함수

## Getting Started

npm install (패키지 설치)
npm run dev (개발 서버 실행)