🏗 아키텍처 핵심 가이드 (Rules of Engagement)
1. 계층 간 데이터 이동 (Entity vs DTO)
    원칙: Persistence Layer(DB)와 Presentation Layer(UI)는 철저히 격리한다.

    이유: 보안(비밀번호 노출 방지)과 유연성 확보. Entity의 변경이 프론트엔드에 직접적인 영향을 주지 않도록 한다.

    구조: Entity -> Service -> DTO -> Controller

2. Next.js 렌더링 전략 (Server-First)
    원칙: 모든 컴포넌트는 기본적으로 Server Component로 작성한다.

    이유: 초기 로딩 속도 향상, SEO 최적화, 클라이언트 측 JavaScript 번들 크기 감소.

    예외: 상호작용(Event Listener, State, Effect)이 필요한 경우에만 최소 단위로 "use client"를 사용한다.

3. 현대적 자바 문법 (Java 21 Record)
    원칙: 모든 데이터 전송 객체(DTO)는 record를 사용하여 정의한다.

    이유: Lombok 없이도 getter, equals, hashCode, toString을 자동으로 제공하며, **불변성(Immutability)**을 강제하여 데이터 신뢰성을 높인다.

4. JPA 성능 최적화 (N+1 문제)
    원칙: 연관 관계 조회 시 Lazy Loading을 기본으로 하되, 대량 조회 시에는 Fetch Join 또는 EntityGraph를 필수 적용한다.

    이유: 단일 쿼리로 끝날 작업이 수십 개의 쿼리로 불어나는 성능 참사를 막기 위함이다.