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
        className="flex flex-col items-center gap-6 px-4 py-16"
        aria-label="About section"
      >
        <h2
          className="font-black uppercase text-white/20 text-center"
          style={{ fontSize: "clamp(2rem, 5vw, 5rem)", letterSpacing: "-0.03em" }}
        >
          ABOUT ME
        </h2>
        <div className="w-full max-w-5xl">
          <ProfileModal />
        </div>
        <Link
          href="/projects"
          className="group flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-3 text-sm text-white/60 transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:text-white"
        >
          프로젝트 전체 보기
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </section>
    </div>
  );
}
