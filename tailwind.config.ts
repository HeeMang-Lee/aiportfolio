import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // 다크 단일 테마다. 팔레트를 확장이 아니라 교체해서
    // Tailwind 기본색(파랑, 보라 등)을 아예 쓸 수 없게 만든다.
    colors: {
      transparent: "transparent",
      current: "currentColor",
      bg: "var(--bg)",
      elev: "var(--bg-elev)",
      text: "var(--text)",
      dim: "var(--text-dim)",
      line: "var(--line)",
      accent: "var(--accent)",
    },
    // 스페이싱도 교체한다. DESIGN.md 의 스케일 밖 값은 쓸 수 없다.
    spacing: {
      0: "0",
      1: "4px",
      2: "8px",
      4: "16px",
      6: "24px",
      10: "40px",
      16: "64px",
      30: "120px",
      50: "200px",
      full: "100%",
    },
    borderRadius: {
      none: "0",
      DEFAULT: "0",
      full: "9999px", // 커서 팔로워 전용
    },
    extend: {
      fontFamily: {
        display: ["var(--font-display)"],
        "display-ko": ["var(--font-display-ko)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      fontSize: {
        // DESIGN.md 1.2 의 타입 스케일. 이 밖의 크기는 쓰지 않는다.
        "display-xl": ["clamp(72px, 14vw, 200px)", { lineHeight: "0.92", letterSpacing: "-0.02em" }],
        "display-l": ["clamp(40px, 5vw, 72px)", { lineHeight: "1.02", letterSpacing: "-0.015em" }],
        // 한글 전용 단. 한글 글립은 전각이라 같은 px 에서 라틴보다 훨씬 넓게
        // 나간다. display-l 을 그대로 쓰면 한 줄이 열 폭을 넘겨 아무 데서나 접힌다.
        "display-ko": ["clamp(28px, 3.6vw, 52px)", { lineHeight: "1.35", letterSpacing: "-0.02em" }],
        heading: ["clamp(24px, 2.6vw, 32px)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        body: ["17px", { lineHeight: "1.7" }],
        caption: ["13px", { lineHeight: "1.5" }],
      },
      maxWidth: {
        measure: "34em",
      },
      gridTemplateColumns: {
        12: "repeat(12, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
export default config;
