import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Oh Sungwoo - Full Stack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', backgroundColor: '#050505',
          position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif',
        }}
      >
        <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(37,99,235,0.4) 0%, rgba(5,5,5,0) 70%)' }} />
        <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(5,5,5,0) 70%)' }} />

        <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            border: '2px solid rgba(255, 255, 255, 0.1)', borderRadius: '40px', padding: '80px',
            background: 'rgba(255, 255, 255, 0.03)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        }}>
          <div style={{
              display: 'flex', alignItems: 'center', padding: '10px 24px', borderRadius: '999px',
              background: 'rgba(16, 185, 129, 0.15)', border: '2px solid rgba(16, 185, 129, 0.3)',
              color: '#34d399', fontSize: '24px', fontWeight: 'bold', letterSpacing: '0.1em', marginBottom: '40px',
          }}>
            AVAILABLE FOR WORK
          </div>
          <h1 style={{ fontSize: '100px', fontWeight: 900, color: '#ffffff', lineHeight: 1, margin: '0 0 20px 0', letterSpacing: '-0.03em' }}>
            OH SUNGWOO
          </h1>
          <p style={{ fontSize: '40px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.2em', margin: '0 0 40px 0' }}>
            FULL STACK DEVELOPER
          </p>
          <p style={{ fontSize: '28px', color: '#cbd5e1', margin: 0 }}>
            AI의 속도에 엔지니어링의 깊이를 더하다
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}