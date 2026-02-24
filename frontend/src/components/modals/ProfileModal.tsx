"use client";

import { useEffect, useState } from "react";
import { SiGithub } from "react-icons/si";
import { MapPin, Mail, GraduationCap, User, Terminal, Download } from "lucide-react";
import { getTechMeta } from "@/utils/projectHelpers";

const TECH_STACK = [
  "Next.js", "React", "TypeScript", "Spring Boot", "Java", 
  "MySQL", "Docker", "AWS", "Tailwind CSS", "Framer"
];

export function ProfileModal() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      {/* 🚨 Tailwind 의존도 0% - 모든 정렬과 간격을 강제하는 순수 CSS 🚨 */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes bento-marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        @keyframes bento-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes bento-pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.2); } }
        @keyframes bento-ping { 0% { transform: scale(1); opacity: 1; } 75%, 100% { transform: scale(2); opacity: 0; } }

        .bento-container { width: 100%; max-width: 64rem; margin: 0 auto; color: white; font-family: ui-sans-serif, system-ui, sans-serif; }
        .bento-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; width: 100%; }
        @media (min-width: 768px) {
          .bento-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .bento-col-2 { grid-column: span 2 / span 2; }
          .bento-col-1 { grid-column: span 1 / span 1; }
        }

        .bento-card {
          position: relative; overflow: hidden; border-radius: 2rem;
          background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.08); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          display: flex; flex-direction: column; transition: transform 0.3s ease, background 0.3s ease;
        }
        .bento-card:hover { background: rgba(255, 255, 255, 0.05); }

        /* 절대 깨지지 않는 강제 Flex 유틸리티 */
        .b-flex-center { display: flex; align-items: center; justify-content: center; }
        .b-flex-row { display: flex; align-items: center; }
        .b-flex-between { display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
        .b-gap-2 { gap: 0.5rem; } .b-gap-4 { gap: 1rem; } .b-gap-6 { gap: 1.5rem; }
        
        .b-text-gradient { background: linear-gradient(to right, #ffffff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

        .b-tech-chip {
          display: flex; align-items: center; gap: 0.75rem; padding: 0.6rem 1.25rem;
          border-radius: 9999px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1);
          white-space: nowrap; font-size: 0.875rem; font-weight: 700; color: #f1f5f9;
        }
        
        /* 기본(모바일) 환경에서는 폰트와 여백을 확 줄임 */
        .b-action-btn {
          display: flex; align-items: center; gap: 0.5rem; 
          padding: 0.75rem 1.25rem; /* 패딩 축소 */
          border-radius: 9999px; background: #ffffff; color: #000000;
          font-weight: 900; 
          font-size: 0.75rem; /* 폰트 크기 축소 */
          text-transform: uppercase; letter-spacing: 0.05em;
          text-decoration: none; box-shadow: 0 0 20px rgba(255, 255, 255, 0.15); 
          transition: transform 0.2s ease;
        }
        .b-action-btn:hover { transform: scale(1.05); background: #e2e8f0; }

        /* 화면이 768px(PC) 이상일 때만 원래 크기로 뻥튀기 */
        @media (min-width: 768px) {
          .b-action-btn { 
            padding: 1rem 2rem; 
            font-size: 0.875rem; 
            letter-spacing: 0.1em;
            gap: 0.75rem;
          }
        }

        /* 이력서 다운로드 버튼 전용 스타일 */
        .resume-btn {
          display: inline-flex; align-items: center; gap: 0.6rem;
          padding: 0.75rem 1.5rem; border-radius: 9999px;
          background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff; font-size: 0.8rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none;
          transition: all 0.3s ease; box-shadow: 0 0 20px rgba(255,255,255,0.05);
          margin-top: 1.2rem;
        }
        .resume-btn:hover { background: #ffffff; color: #000000; box-shadow: 0 0 30px rgba(255,255,255,0.3); transform: translateY(-2px); }
      `}} />

      <div className="bento-container">
        <div className="bento-grid">
          
          {/* ── 1. 메인 캐치프레이즈 (크게 2칸) ── */}
          <div className="bento-card bento-col-2" style={{ padding: '2.5rem', justifyContent: 'space-between' }}>
            <div style={{ position: 'absolute', top: '-5rem', left: '-5rem', width: '18rem', height: '18rem', background: 'rgba(37, 99, 235, 0.25)', filter: 'blur(80px)', borderRadius: '50%', pointerEvents: 'none' }} />
            
            <div style={{ position: 'relative', zIndex: 10 }}>
              <div className="b-flex-row b-gap-2" style={{ display: 'inline-flex', padding: '0.4rem 1rem', borderRadius: '9999px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#34d399', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', marginBottom: '2rem' }}>
                <span style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', background: '#10b981', animation: 'bento-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
                AVAILABLE FOR WORK
              </div>
              
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 1.2, letterSpacing: '-0.02em', margin: 0 }}>
                AI의 속도에<br />
                <span className="b-text-gradient">엔지니어링의 깊이를 더하는</span><br />
                풀스택 개발자
                <span style={{ display: 'inline-block', width: '0.8rem', height: '2.5rem', marginLeft: '0.5rem', verticalAlign: 'middle', background: '#3b82f6', animation: 'bento-blink 1s step-end infinite' }} />
              </h2>
            </div>

            <div className="b-flex-between" style={{ marginTop: '3rem', position: 'relative', zIndex: 10 }}>
              <div>
                <p style={{ fontSize: '0.875rem', color: '#64748b', fontFamily: 'monospace', letterSpacing: '0.1em', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Hello, I am</p>
                <p style={{ fontSize: '1.875rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Oh Sungwoo</p>
                {/* 🚨 이력서 버튼 (강제 줄바꿈 방지) 🚨 */}
                <div style={{ display: 'block' }}>
                  <a 
                    href="mailto:sungwoo0723@naver.com?subject=[이력서 요청] 오성우 풀스택 개발자 포트폴리오 열람 후 연락드립니다.&body=안녕하세요,%0D%0A%0D%0A포트폴리오를 인상 깊게 보았습니다.%0D%0A상세 이력서 및 포트폴리오 원본을 요청드립니다.%0D%0A%0D%0A- 소속 기업명: %0D%0A- 담당자 성함: %0D%0A- 회신받을 연락처: %0D%0A%0D%0A감사합니다." 
                    className="resume-btn"
                  >
                    <Download size={16} /> REQUEST RESUME
                  </a>
                </div>
              </div>
              <Terminal style={{ width: '4rem', height: '4rem', color: 'rgba(255,255,255,0.08)' }} />
            </div>
          </div>

          {/* ── 2. 사이버펑크 지도 (1칸) ── */}
          <div className="bento-card bento-col-1 b-flex-center" style={{ padding: '2rem', minHeight: '300px' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.3, backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
            <div style={{ position: 'absolute', width: '10rem', height: '10rem', background: 'rgba(79, 70, 229, 0.3)', filter: 'blur(60px)', borderRadius: '50%' }} />
            
            <div className="b-flex-center" style={{ flexDirection: 'column', gap: '1rem', position: 'relative', zIndex: 10 }}>
              <div className="b-flex-center" style={{ padding: '1.25rem', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', position: 'relative' }}>
                <MapPin style={{ width: '2.5rem', height: '2.5rem', color: '#818cf8' }} />
                <span style={{ position: 'absolute', top: 0, right: 0, width: '0.75rem', height: '0.75rem', borderRadius: '50%', background: '#818cf8', animation: 'bento-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
                <span style={{ position: 'absolute', top: 0, right: 0, width: '0.75rem', height: '0.75rem', borderRadius: '50%', background: '#818cf8' }} />
              </div>
              <p style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0.5rem 0 0 0' }}>Seoul, KR</p>
              <p style={{ fontSize: '0.75rem', fontFamily: 'monospace', letterSpacing: '0.1em', color: 'rgba(129, 140, 248, 0.7)', margin: 0 }}>37.5665° N, 126.9780° E</p>
            </div>
          </div>

          {/* ── 3. 신상 & 학력 (1칸) ── */}
          <div className="bento-card bento-col-1" style={{ padding: '2.5rem', justifyContent: 'center', gap: '2rem' }}>
            <div className="b-flex-row b-gap-6">
              <div className="b-flex-center" style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
                <User style={{ width: '1.5rem', height: '1.5rem', color: '#cbd5e1' }} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748b', margin: '0 0 0.25rem 0' }}>Identity</p>
                <p style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>199X / 남(Male)</p>
              </div>
            </div>

            <div style={{ height: '1px', width: '100%', background: 'rgba(255,255,255,0.1)' }} />

            <div className="b-flex-row b-gap-6">
              <div className="b-flex-center" style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
                <GraduationCap style={{ width: '1.5rem', height: '1.5rem', color: '#cbd5e1' }} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748b', margin: '0 0 0.25rem 0' }}>Education</p>
                <p style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.2, margin: 0 }}>Myongji College<br/><span style={{ fontSize: '0.875rem', fontWeight: 400, color: '#94a3b8' }}>Computer Science</span></p>
              </div>
            </div>
          </div>

          {/* ── 4. 기술 스택 마퀴 & 연락처 (크게 2칸) ── */}
          <div className="bento-card bento-col-2" style={{ justifyContent: 'space-between' }}>
            
            <div style={{ padding: '2rem 0', background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '4rem', background: 'linear-gradient(to right, #0a0a0a, transparent)', zIndex: 10 }} />
              <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '4rem', background: 'linear-gradient(to left, #0a0a0a, transparent)', zIndex: 10 }} />
              
              <div style={{ display: 'flex', width: 'max-content', animation: 'bento-marquee 20s linear infinite', gap: '1rem', padding: '0 1rem' }}>
                {[...TECH_STACK, ...TECH_STACK].map((tech, idx) => {
                  const { icon: TechIcon, color } = getTechMeta(tech);
                  return (
                    <div key={`${tech}-${idx}`} className="b-tech-chip">
                      <TechIcon style={{ color, width: '1.25rem', height: '1.25rem' }} />
                      {tech}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="b-flex-between" style={{ padding: '2rem' }}>
              <div>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748b', margin: '0 0 0.5rem 0' }}>Let's Connect</p>
                <a href="mailto:sungwoo0723@naver.com" className="b-flex-row b-gap-2" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '1.125rem', fontWeight: 500, transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}>
                  <Mail style={{ width: '1.25rem', height: '1.25rem', color: '#64748b' }} />
                  sungwoo0723@naver.com
                </a>
              </div>
              
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="b-action-btn">
                <SiGithub style={{ width: '1.25rem', height: '1.25rem' }} />
                GitHub Profile
              </a>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}