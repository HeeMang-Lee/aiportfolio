import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        ink: "var(--ink)",
        body: "var(--ink-body)",
        meta: "var(--ink-meta)",
        rule: "var(--rule)",
        "rule-strong": "var(--rule-strong)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
      },
      fontFamily: {
        sans: [
          "'IBM Plex Sans KR'",
          "'Apple SD Gothic Neo'",
          "'Malgun Gothic'",
          "sans-serif",
        ],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      // Shape lock: this project has exactly one corner radius.
      // Every scale key resolves to 2px so a stray `rounded-2xl` cannot
      // reintroduce the card language the redesign removed.
      borderRadius: {
        none: "0",
        DEFAULT: "2px",
        sm: "2px",
        md: "2px",
        lg: "2px",
        xl: "2px",
        "2xl": "2px",
        "3xl": "2px",
        full: "2px",
      },
      maxWidth: {
        page: "1080px",
        measure: "68ch",
      },
      letterSpacing: {
        // 0.08em is for short mono labels only (roughly 12 characters or less).
        // Longer mono runs, and anything with Hangul in it, use `meta`: wide
        // tracking pulls Korean words apart and slows reading.
        label: "0.08em",
        meta: "0.02em",
        display: "-0.035em",
      },
    },
  },
  plugins: [],
};
export default config;
