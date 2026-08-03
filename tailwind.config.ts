import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FDF6E9",
        yellow: {
          DEFAULT: "#FFC93C",
          dark: "#F5B700",
        },
        orange: {
          DEFAULT: "#FF6B35",
          dark: "#E85A2A",
        },
        ink: "#111111",
        panel: "#161616",
        mint: "#B8F2D0",
        sky: "#A9D8FF",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        brutal: "4px 4px 0px 0px #111111",
        "brutal-sm": "2px 2px 0px 0px #111111",
        "brutal-lg": "8px 8px 0px 0px #111111",
        "brutal-yellow": "4px 4px 0px 0px #FFC93C",
        "brutal-white": "4px 4px 0px 0px #FDF6E9",
      },
      borderRadius: {
        brutal: "16px",
        "brutal-sm": "12px",
      },
      borderWidth: {
        3: "3px",
      },
    },
  },
  plugins: [],
};
export default config;
