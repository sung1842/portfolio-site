import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { portfolioProjects } from "@/constants/Projects";
import { ProjectsArchive } from "@/components/projects/ProjectsArchive";

export const metadata = {
  title: "Project Archive | Oh Sungwoo",
  description: "전체 프로젝트 포트폴리오 아카이브입니다.",
};

/** List uses local seed (instant). Detail modals receive full fields from the same seed. */
export default function ProjectsPage() {
  const actualProjects = portfolioProjects.filter((project) => project.id !== 0);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .ambient-light-1 { position: fixed; top: -10%; left: -10%; width: 50vw; height: 50vw; background: rgba(59, 130, 246, 0.15); filter: blur(120px); border-radius: 50%; pointer-events: none; z-index: 0; }
        .ambient-light-2 { position: fixed; bottom: -10%; right: -10%; width: 50vw; height: 50vw; background: rgba(139, 92, 246, 0.15); filter: blur(120px); border-radius: 50%; pointer-events: none; z-index: 0; }

        .glass-back-btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.75rem 1.5rem; border-radius: 9999px;
          background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1);
          color: #a1a1aa; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.15em; text-decoration: none;
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          transition: all 0.3s ease;
        }
        .glass-back-btn:hover { color: #ffffff; background: rgba(255, 255, 255, 0.1); border-color: rgba(255, 255, 255, 0.25); transform: translateX(-4px); }

        .page-container {
          max-width: 72rem;
          margin: 0 auto;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }

        .archive-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2.5rem;
          padding-bottom: 6rem;
          position: relative; z-index: 10;
        }

        .project-card {
          position: relative;
          display: flex; flex-direction: column;
          border-radius: 24px;
          background: rgba(20, 20, 20, 0.4);
          backdrop-filter: blur(32px); -webkit-backdrop-filter: blur(32px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.8);
          overflow: hidden;
          transition: border-color 0.4s;
        }
        .project-card:hover {
          border-color: rgba(255, 255, 255, 0.2);
          border-top-color: rgba(255, 255, 255, 0.4);
        }

        .card-content {
          padding: 2.5rem;
          display: flex; flex-direction: column; flex: 1;
        }

        .tech-pill {
          display: inline-flex; align-items: center; gap: 0.3rem;
          padding: 0.3rem 0.6rem;
          border-radius: 9999px; font-size: 0.65rem; font-weight: 700;
          background: rgba(255, 255, 255, 0.03); color: #cbd5e1;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .tech-list {
          display: flex; flex-wrap: wrap; gap: 0.75rem;
          margin-bottom: 0.5rem;
        }
        .action-group {
          display: flex; align-items: stretch; gap: 0.75rem;
          margin-top: auto;
          padding-top: 2rem;
        }

        .action-btn {
          flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem;
          box-sizing: border-box;
          min-height: 42px;
          padding: 0.6rem 1rem; border-radius: 10px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em;
          line-height: 1; white-space: nowrap;
          transition: all 0.2s ease; text-decoration: none; color: white;
          background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .action-btn:hover { background: rgba(255, 255, 255, 0.1); border-color: rgba(255, 255, 255, 0.3); }
        .action-btn.live { background: rgba(255, 255, 255, 0.9); color: #000; border-color: rgba(255, 255, 255, 0.9); }
        .action-btn.live:hover { background: #ffffff; box-shadow: 0 0 20px rgba(255,255,255,0.4); }
      `}} />

      <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white selection:bg-blue-500/30">
        <div className="ambient-light-1" />
        <div className="ambient-light-2" />

        <header className="relative z-50 w-full" style={{ paddingTop: "3.5rem", paddingBottom: "1rem" }}>
          <div className="page-container flex items-center">
            <Link href="/" className="glass-back-btn">
              <ArrowLeft size={16} /> BACK TO HOME
            </Link>
          </div>
        </header>

        <main className="page-container" style={{ paddingTop: "2.5rem" }}>
          <div className="relative z-10 mb-16">
            <h1 className="mb-4 text-5xl leading-none font-black tracking-tighter uppercase md:text-7xl">
              Project<br/>
              <span className="bg-gradient-to-r from-white to-slate-600 bg-clip-text text-transparent">Archive.</span>
            </h1>
            <p className="text-base font-medium tracking-wide text-slate-400 md:text-lg">
              문제를 해결하고 가치를 만들어낸 풀스택 개발 기록입니다.
            </p>
          </div>

          <ProjectsArchive projects={actualProjects} />
        </main>
      </div>
    </>
  );
}
