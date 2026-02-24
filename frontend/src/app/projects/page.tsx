import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { projects, isVideoAsset } from "@/constants/Projects";
import { getTechMeta } from "@/utils/projectHelpers";

export const metadata = {
  title: "Project Archive | Oh Sungwoo",
  description: "전체 프로젝트 포트폴리오 아카이브입니다.",
};

export default function ProjectsPage() {
  const actualProjects = projects.filter((p) => p.id !== 0);

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

        /* 🚨 Tailwind 우회: 페이지 전체 좌우 여백(Padding) 강제 할당 🚨 */
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
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.4s;
        }
        .project-card:hover {
          transform: translateY(-8px);
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

        /* 🚨 Tailwind 우회: 카드 내부 기술 스택과 버튼 간격 강제 할당 🚨 */
        .tech-list {
          display: flex; flex-wrap: wrap; gap: 0.75rem;
          margin-bottom: 0.5rem;
        }
        .action-group {
          display: flex; gap: 0.75rem;
          margin-top: auto; /* 버튼들을 항상 카드 맨 밑으로 밀어냄 */
          padding-top: 2rem; /* 기술 스택과 버튼 사이의 여백 강제 확보 */
        }

        .action-btn {
          flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem;
          padding: 0.6rem 1rem; border-radius: 10px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em;
          transition: all 0.2s ease; text-decoration: none; color: white;
          background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .action-btn:hover { background: rgba(255, 255, 255, 0.1); border-color: rgba(255, 255, 255, 0.3); }
        .action-btn.live { background: rgba(255, 255, 255, 0.9); color: #000; border: none; }
        .action-btn.live:hover { background: #ffffff; box-shadow: 0 0 20px rgba(255,255,255,0.4); transform: scale(1.02); }
      `}} />

      <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 relative overflow-hidden">
        
        <div className="ambient-light-1" />
        <div className="ambient-light-2" />

        {/* 1. page-container 클래스로 좌우 여백 확보 */}
        <header className="relative z-50 w-full" style={{ paddingTop: '3.5rem', paddingBottom: '1rem' }}>
          <div className="page-container flex items-center">
            <Link href="/" className="glass-back-btn">
              <ArrowLeft size={16} /> BACK TO HOME
            </Link>
          </div>
        </header>

        {/* 2. page-container 클래스로 메인 콘텐츠 좌우 여백 확보 */}
        <main className="page-container" style={{ paddingTop: '2.5rem' }}>
          <div className="mb-16 relative z-10">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 leading-none">
              Project<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-600">Archive.</span>
            </h1>
            <p className="text-slate-400 text-base md:text-lg font-medium tracking-wide">
              문제를 해결하고 가치를 만들어낸 풀스택 개발 기록입니다.
            </p>
          </div>

          <div className="archive-grid">
            {actualProjects.map((project) => {
              const isVideo = isVideoAsset(project.image);
              
              return (
                <div key={project.id} className="project-card group">
                  <div className="relative w-full h-64 bg-black overflow-hidden">
                    {isVideo ? (
                      <video src={project.image} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                    ) : (
                      <Image src={project.image} alt={project.title} fill className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                    )}
                    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0a0a0a]/90 to-transparent z-10" />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[rgba(20,20,20,0.8)] to-transparent z-10" />
                    
                    <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-black tracking-widest text-white uppercase z-20">
                      {project.category}
                    </div>
                  </div>

                  <div className="card-content relative z-20">
                    <h3 className="text-2xl font-black text-white mb-3 tracking-tight">{project.title}</h3>
                    <p className="text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed font-medium">{project.tagline}</p>

                    {/* 3. tech-list 전용 클래스로 강제 간격 띄움 */}
                    <div className="tech-list">
                      {project.tech.slice(0, 4).map((t) => {
                        const { icon: TechIcon, color } = getTechMeta(t);
                        return (
                          <div key={t} className="tech-pill">
                            <TechIcon style={{ color }} className="w-3 h-3" /> {t}
                          </div>
                        );
                      })}
                       {project.tech.length > 4 && <div className="tech-pill text-slate-500">+{project.tech.length - 4}</div>}
                    </div>

                    {/* 4. action-group 전용 클래스로 버튼 위쪽 여백(pt-8) 강제 확보 */}
                    <div className="action-group">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="action-btn">
                          <SiGithub className="w-3.5 h-3.5" /> CODE
                        </a>
                      )}
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="action-btn live">
                          <ExternalLink className="w-3.5 h-3.5" /> LIVE DEMO
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
}