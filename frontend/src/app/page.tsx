import Link from "next/link";
import { PROFILE_DATA } from "@/constants/profile";
import { projects } from "@/constants/Projects";
import { HomeClientWrapper } from "@/components/home/HomeClientWrapper";
import { ProfileModal } from "@/components/modals/ProfileModal";

export default function HomePage() {
  return (
    <div className="w-full bg-[#050505] text-white selection:bg-blue-500/30">
      <section
        className="relative flex h-[100dvh] w-full flex-col items-center justify-between overflow-hidden py-4 md:py-6"
        aria-label="Hero section"
      >
        {/* Top Meta Information */}
        <div className="flex flex-col items-center text-center gap-1 shrink-0 z-10 mt-[clamp(10px,2.5dvh,24px)]">
          <div className="font-mono uppercase tracking-[0.3em] text-white/50 text-[clamp(9px,1.5vw,14px)] leading-none">
            SEOUL, SOUTH KOREA
          </div>
          <div className="font-mono uppercase tracking-[0.3em] text-[clamp(6px,1vw,10px)] leading-none text-gray-500">
            {PROFILE_DATA.email}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 w-full min-h-0 z-20">
          {/* Top Giant Name Title */}
          <div className="flex flex-col items-center shrink-0 z-10 -mb-[clamp(8px,3dvh,28px)]">
            <div
              className="font-jost uppercase text-white font-black"
              style={{
                fontSize: "clamp(1.6rem, 3.8vw, 5.5rem)",
                lineHeight: "0.85",
                letterSpacing: "-0.02em",
                fontWeight: 900,
              }}
            >
              {PROFILE_DATA.name.toUpperCase()}
            </div>
            <div
              className="mt-1 tracking-widest text-white/50"
              style={{ fontSize: "clamp(8px, 1vw, 13px)" }}
            >
              PORTFOLIO WEB SITE
            </div>
          </div>

          {/* 3D Carousel — client island */}
          <HomeClientWrapper projects={projects} />

          {/* Bottom Giant Subtitle */}
          <div className="flex flex-col items-center shrink-0 z-10 -mt-[clamp(8px,3dvh,28px)]">
            <div
              className="font-jost uppercase font-black text-center text-gray-600"
              style={{
                fontSize: "clamp(1.3rem, 3.2vw, 4.5rem)",
                lineHeight: "0.85",
                letterSpacing: "-0.02em",
                fontWeight: 900,
              }}
            >
              DEVELOPER, <br /> FRONTEND & BACKEND
            </div>
          </div>
        </div>

        {/* Bottom Meta Information */}
        <div className="flex flex-col items-center gap-1.5 text-center w-full px-4 shrink-0 z-10 mb-[clamp(10px,2.5dvh,24px)]">
          <div className="font-mono uppercase tracking-[0.3em] text-white/50 text-[clamp(8px,1.5vw,12px)]">
            TECH STACK INCLUDES
          </div>
          <div className="max-w-4xl font-bold uppercase tracking-wider text-white/40 text-[clamp(6px,1vw,9px)] leading-relaxed">
            NEXT.JS, JAVA, SPRING BOOT, VUE.JS, DOCKER, AWS, REACT, TYPESCRIPT
          </div>
        </div>
      </section>

      {/* About / Profile Section */}
      <section
        className="flex flex-col items-center gap-12 px-4 py-24 relative"
        aria-label="About section"
      >
        {/* 상단 경계선 대신 은은한 그라디언트로 공간 분리 */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <h2
          className="font-black uppercase text-white/10 text-center tracking-tighter"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 1 }}
        >
          ABOUT ME
        </h2>
        
        <div className="w-full max-w-5xl">
          <ProfileModal />
        </div>

        {/* 🚨 버튼 통일성 및 여백(mt-8) 강제 적용 🚨 */}
        <div className="mt-8 mb-12">
          <style dangerouslySetInnerHTML={{__html: `
            .view-all-btn {
              display: inline-flex; align-items: center; gap: 0.75rem;
              padding: 1rem 2.5rem; border-radius: 9999px;
              background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1);
              color: #ffffff; font-size: 0.875rem; font-weight: 800; letter-spacing: 0.15em;
              backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
              transition: all 0.3s ease; text-decoration: none;
              box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
            }
            .view-all-btn:hover {
              background: rgba(255, 255, 255, 0.1);
              transform: translateY(-4px);
              border-color: rgba(255, 255, 255, 0.3);
            }
          `}} />
          
          <Link href="/projects" className="view-all-btn">
            VIEW ALL PROJECTS <span style={{ fontSize: '1.2rem' }}>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
