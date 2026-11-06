"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import { PROFILE_DATA } from "@/constants/profile";
import { isVideoAsset, projects, type Project } from "@/constants/Projects";
import "./chiang.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

type SectionId = "about" | "experience" | "projects";

const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

const RESUME_MAILTO =
  "mailto:sungwoo0723@naver.com?subject=[이력서 요청] 오성우 풀스택 개발자 포트폴리오 열람 후 연락드립니다.&body=안녕하세요,%0D%0A%0D%0A포트폴리오를 인상 깊게 보았습니다.%0D%0A상세 이력서 및 포트폴리오 원본을 요청드립니다.%0D%0A%0D%0A- 소속 기업명: %0D%0A- 담당자 성함: %0D%0A- 회신받을 연락처: %0D%0A%0D%0A감사합니다.";

const GITHUB_URL = "https://github.com/sung1842";

interface ExperienceItem {
  period: string;
  periodLabel: string;
  title: string;
  org: string;
  href?: string;
  description: string;
  tech: string[];
}

const EXPERIENCE: ExperienceItem[] = [
  {
    period: "Present",
    periodLabel: "Present",
    title: "Independent Full Stack Developer",
    org: "Personal Work",
    href: GITHUB_URL,
    description: "JD 핏 분석, 셀럽 패션 큐레이션, 포트폴리오 사이트 설계",
    tech: ["Next.js", "Spring Boot", "TypeScript", "Java", "Supabase", "Docker"],
  },
  {
    period: "Education",
    periodLabel: "Education",
    title: "Computer Science",
    org: "Myongji College",
    description: "컴퓨터공학 전공",
    tech: [],
  },
];

const PROJECT_BLURBS: Record<number, string> = {
  5: "실공고 JD 정규화와 상위 N명 LLM 분석",
  1: "안면 인식 기반 셀럽 패션 분석과 쇼핑 연동",
  0: "복수 AI 도구 조합의 코드 품질 검증",
};

const FEATURED_ORDER = [5, 1, 0];

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="chiang-arrow"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="24" height="24" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24" aria-hidden="true">
      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
      <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
    </svg>
  );
}

function SkillPills({ tech }: { tech: string[] }) {
  if (tech.length === 0) return null;

  return (
    <ul className="chiang-pills" aria-label="Technologies used">
      {tech.map((item) => (
        <li key={item}>
          <div className="chiang-pill">{item}</div>
        </li>
      ))}
    </ul>
  );
}

function SectionHeading({ children }: { children: string }) {
  return (
    <div className="chiang-mobile-label">
      <h2>{children}</h2>
    </div>
  );
}

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      className="chiang-inline"
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
    >
      {children}
    </a>
  );
}

function ProjectMedia({ project }: { project: Project }) {
  if (!project.image) return null;

  if (isVideoAsset(project.image)) {
    return (
      <video
        className="chiang-media"
        src={project.image}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-hidden="true"
      />
    );
  }

  return <img className="chiang-media" src={project.image} alt="" width={200} height={112} loading="lazy" />;
}

function TitleLink({
  href,
  label,
  title,
  org,
}: {
  href: string;
  label: string;
  title: string;
  org?: string;
}) {
  const words = title.split(" ");
  const last = words.pop() ?? title;
  const rest = words.join(" ");

  return (
    <a
      className="chiang-title-link"
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
    >
      <span className="chiang-title-hit" />
      <span>
        {org ? (
          <>
            {title} ·{" "}
            <span style={{ display: "inline-block" }}>
              {org}
              <ArrowIcon />
            </span>
          </>
        ) : (
          <>
            {rest ? `${rest} ` : ""}
            <span style={{ display: "inline-block" }}>
              {last}
              <ArrowIcon />
            </span>
          </>
        )}
      </span>
    </a>
  );
}

export function ChiangResume() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<SectionId>("about");
  const [spot, setSpot] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const elements = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (elements.length === 0) return;

    const onScroll = () => {
      const marker = window.innerHeight * 0.28;
      let current: SectionId = "about";
      for (const el of elements) {
        const id = el.id;
        if (id !== "about" && id !== "experience" && id !== "projects") continue;
        if (el.getBoundingClientRect().top <= marker) current = id;
      }
      setActiveId(current);
    };

    onScroll();
    const raf = window.requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onScroll);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onScroll);
    };
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const onMove = (event: MouseEvent) => {
      const root = rootRef.current;
      if (!root) return;
      const rect = root.getBoundingClientRect();
      setSpot({ x: event.clientX - rect.left, y: event.clientY - rect.top });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const featuredProjects = FEATURED_ORDER.map((id) => projects.find((project) => project.id === id)).filter(
    (project): project is Project => project !== undefined
  );

  const handleNavClick = useCallback((id: SectionId) => {
    setActiveId(id);
  }, []);

  return (
    <div
      ref={rootRef}
      className={`chiang ${inter.className}`}
      style={{
        fontFamily: `${inter.style.fontFamily}, var(--font-noto-sans-kr), ui-sans-serif, system-ui, sans-serif`,
      }}
    >
      <div
        className="chiang-spotlight"
        style={{
          background: `radial-gradient(600px at ${spot.x}px ${spot.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
        }}
        aria-hidden="true"
      />

      <div className="chiang-shell">
        <div className="chiang-row">
          <header className="chiang-header">
            <div>
              <h1 className="chiang-h1">
                <a href="#about">{PROFILE_DATA.name}</a>
              </h1>
              <h2 className="chiang-h2">Full Stack Developer</h2>
              <p className="chiang-tagline">AI의 속도에 엔지니어링의 깊이를 더한다.</p>

              <nav className="chiang-nav" aria-label="In-page jump links">
                <ul>
                  {NAV_ITEMS.map((item) => (
                    <li key={item.id}>
                      <a
                        className={activeId === item.id ? "chiang-nav-link is-active" : "chiang-nav-link"}
                        href={`#${item.id}`}
                        onClick={() => handleNavClick(item.id)}
                      >
                        <span className="chiang-indicator" />
                        <span className="chiang-nav-text">{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <ul className="chiang-social" aria-label="Social media">
              <li>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub (opens in a new tab)"
                  title="GitHub"
                >
                  <span className="sr-only">GitHub</span>
                  <GitHubIcon />
                </a>
              </li>
              <li>
                <a href={`mailto:${PROFILE_DATA.email}`} aria-label="Email" title="Email">
                  <span className="sr-only">Email</span>
                  <MailIcon />
                </a>
              </li>
            </ul>
          </header>

          <main id="content" className="chiang-main">
            <section id="about" className="chiang-section" aria-label="About me">
              <SectionHeading>About</SectionHeading>
              <div className="chiang-copy">
                <p>
                  실무 경력 없이 웹 개발 직무를 찾는 구직자입니다. AI가 구현을 빨리 끝내는 시장에서도 웹 개발자는 필요하다고
                  봅니다. 필요한 이유는 코드를 더 빨리 치는 사람이어서가 아니라, 시스템 구조를 정하고 그 결과에 책임질 주체가
                  있어야 하기 때문입니다.
                </p>
                <p>
                  프론트엔드, 백엔드, 인프라를 칸으로만 나누면 그 책임을 지기 어렵다고 생각합니다. 그래서{" "}
                  <InlineLink href="https://github.com/sung1842/jd-fit-analyzer">JD-FIT</InlineLink>,{" "}
                  <InlineLink href="https://github.com/sung1842/contestFrontend">TWINSTAR</InlineLink>,{" "}
                  <InlineLink href={GITHUB_URL}>이 포트폴리오</InlineLink>에서 화면, API, 데이터, 배포가 한 제품 안에서
                  어떻게 맞물리는지를 직접 설계하고 있습니다. 새 도구는 빨리 시험하되, 채택은 인증·비용·타입·제품 범위를
                  코드와 문서로 고정할 수 있을 때로 제한합니다.
                </p>
              </div>
            </section>

            <section id="experience" className="chiang-section" aria-label="Work experience">
              <SectionHeading>Experience</SectionHeading>
              <ol className="chiang-list">
                {EXPERIENCE.map((item) => (
                  <li key={`${item.title}-${item.org}`} className="chiang-item">
                    <div className="chiang-card">
                      <div className="chiang-glow" />
                      <header className="chiang-period" aria-label={item.periodLabel}>
                        {item.period}
                      </header>
                      <div className="chiang-body">
                        <h3 className="chiang-title">
                          {item.href ? (
                            <TitleLink
                              href={item.href}
                              label={`${item.title} at ${item.org} (opens in a new tab)`}
                              title={item.title}
                              org={item.org}
                            />
                          ) : (
                            <span className="chiang-title-link">
                              {item.title} · {item.org}
                            </span>
                          )}
                        </h3>
                        <p className="chiang-desc">{item.description}</p>
                        <SkillPills tech={item.tech} />
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="chiang-cta">
                <a className="chiang-cta-link" href={RESUME_MAILTO} aria-label="Request full résumé">
                  <span>
                    View Full <span style={{ display: "inline-block" }}>Résumé<ArrowIcon /></span>
                  </span>
                </a>
              </div>
            </section>

            <section id="projects" className="chiang-section" aria-label="Selected projects">
              <SectionHeading>Projects</SectionHeading>
              <ul className="chiang-list">
                {featuredProjects.map((project) => {
                  const href = project.live || project.github;
                  const blurb = PROJECT_BLURBS[project.id] ?? project.tagline;
                  const tech = project.cardTech ?? project.tech.slice(0, 4);
                  const hasMedia = Boolean(project.image);

                  return (
                    <li key={project.id} className="chiang-item">
                      <div className="chiang-card">
                        <div className="chiang-glow" />
                        <div className={hasMedia ? "chiang-body is-project" : "chiang-body is-full"}>
                          <h3>
                            <TitleLink
                              href={href}
                              label={`${project.title} (opens in a new tab)`}
                              title={project.title}
                            />
                          </h3>
                          <p className="chiang-desc">{blurb}</p>
                          <SkillPills tech={tech} />
                        </div>
                        {hasMedia ? <ProjectMedia project={project} /> : null}
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="chiang-cta">
                <Link className="chiang-cta-link" href="/projects">
                  <span>
                    <span className="chiang-archive-text">View Full Project Archive</span>
                    <ArrowIcon />
                  </span>
                </Link>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
