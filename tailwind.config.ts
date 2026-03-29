import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "toss-blue": "#0064FF",
        "toss-blue-light": "#3384FF",
        "dark-bg": "#0a0a0a",
        "dark-card": "#141414",
        "dark-border": "#1e1e1e",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Pretendard", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
