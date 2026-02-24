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
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to bottom right, #050505, #111111)', // 방사형 대신 안전한 직선형 사용
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* 상단 사이버펑크 포인트 라인 */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '12px', background: 'linear-gradient(to right, #2563eb, #8b5cf6, #10b981)' }} />

        {/* 메인 콘텐츠 박스 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '24px',
            padding: '60px 80px',
            background: 'rgba(255, 255, 255, 0.05)',
          }}
        >
          {/* 상태 뱃지 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 24px',
              borderRadius: '99px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '2px solid rgba(16, 185, 129, 0.4)',
              color: '#34d399',
              fontSize: '24px',
              fontWeight: 'bold',
              letterSpacing: '0.1em',
              marginBottom: '40px',
            }}
          >
            AVAILABLE FOR WORK
          </div>

          <h1
            style={{
              fontSize: '100px',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1,
              margin: '0 0 20px 0',
              letterSpacing: '-0.03em',
            }}
          >
            OH SUNGWOO
          </h1>
          
          <p
            style={{
              fontSize: '36px',
              fontWeight: 700,
              color: '#94a3b8',
              letterSpacing: '0.2em',
              margin: '0 0 40px 0',
            }}
          >
            FULL STACK DEVELOPER
          </p>

          <p
            style={{
              fontSize: '28px',
              color: '#cbd5e1',
              margin: 0,
            }}
          >
            AI의 속도에 엔지니어링의 깊이를 더하다
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}