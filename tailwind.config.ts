import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        neon: {
          red: "#ff1744",
          "red-soft": "#ff5470",
          blue: "#00e5ff",
          "blue-soft": "#6bf0ff",
        },
        ink: {
          900: "#05030a",
          800: "#0a0714",
          700: "#110a1f",
        },
      },
      boxShadow: {
        "glow-red":
          "0 0 14px rgba(255,23,68,0.55), 0 0 40px rgba(255,23,68,0.35)",
        "glow-blue":
          "0 0 14px rgba(0,229,255,0.55), 0 0 40px rgba(0,229,255,0.35)",
      },
      keyframes: {
        flicker: {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": {
            opacity: "1",
            filter:
              "drop-shadow(0 0 8px rgba(255,23,68,0.8)) drop-shadow(0 0 20px rgba(0,229,255,0.6))",
          },
          "20%, 22%, 24%, 55%": {
            opacity: "0.55",
            filter: "drop-shadow(0 0 2px rgba(255,23,68,0.3))",
          },
        },
        flickerRed: {
          "0%, 17%, 19%, 22%, 24%, 53%, 57%, 72%, 74%, 100%": {
            opacity: "1",
            filter:
              "drop-shadow(0 0 6px rgba(255,23,68,0.95)) drop-shadow(0 0 22px rgba(255,23,68,0.55))",
          },
          "18%, 20%, 23%, 55%, 73%": {
            opacity: "0.35",
            filter: "drop-shadow(0 0 1px rgba(255,23,68,0.25))",
          },
          "40%": {
            opacity: "0.7",
            filter: "drop-shadow(0 0 4px rgba(255,23,68,0.5))",
          },
        },
        flickerBlue: {
          "0%, 14%, 16%, 27%, 29%, 48%, 50%, 66%, 68%, 100%": {
            opacity: "1",
            filter:
              "drop-shadow(0 0 6px rgba(0,229,255,0.95)) drop-shadow(0 0 22px rgba(0,229,255,0.55))",
          },
          "15%, 28%, 49%, 67%": {
            opacity: "0.35",
            filter: "drop-shadow(0 0 1px rgba(0,229,255,0.25))",
          },
          "35%": {
            opacity: "0.7",
            filter: "drop-shadow(0 0 4px rgba(0,229,255,0.5))",
          },
        },
        pulseGlow: {
          "0%, 100%": {
            boxShadow:
              "0 0 10px rgba(255,23,68,0.6), 0 0 30px rgba(0,229,255,0.35)",
          },
          "50%": {
            boxShadow:
              "0 0 20px rgba(255,23,68,0.9), 0 0 60px rgba(0,229,255,0.6)",
          },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        flicker: "flicker 4s infinite",
        "flicker-red": "flickerRed 4.3s infinite",
        "flicker-blue": "flickerBlue 5.1s infinite",
        pulseGlow: "pulseGlow 2.8s ease-in-out infinite",
        floatY: "floatY 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
