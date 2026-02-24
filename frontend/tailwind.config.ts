import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'electric-cyan': '#00f0ff',
      },
      fontFamily: {
        jost: ['var(--font-jost)', 'sans-serif'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // 3D UI를 위한 커스텀 애니메이션 추가
      keyframes: {
        "scroll-indicator": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        "scroll-indicator": "scroll-indicator 2s cubic-bezier(0.77, 0, 0.175, 1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;