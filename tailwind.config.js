/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Colors are named by ROLE so every component stays consistent.
        bg: "#F3F5F9",
        surface: "#FFFFFF",
        "surface-2": "#F6F8FB",
        border: "#E1E6EE",
        ink: "#111827",
        muted: "#64748B",
        accent: "#0F766E",
        "accent-hover": "#0B5F59",
        "accent-soft": "#E3F3F1",
        gold: "#B7791F",
        "gold-soft": "#FBF1DC",
        status: {
          new: "#3B5BDB",
          active: "#C27803",
          submitted: "#7048B6",
          completed: "#15803D",
          failed: "#C2352B",
        },
      },
      fontFamily: {
        // One family for everything (clean and modern), plus a monospace
        // for numbers so salary / leave / dates line up like a ledger.
        display: ["'Plus Jakarta Sans Variable'", "system-ui", "sans-serif"],
        body: ["'Plus Jakarta Sans Variable'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono Variable'", "ui-monospace", "monospace"],
      },
      keyframes: {
        "slide-in": {
          from: { opacity: 0, transform: "translateY(12px) scale(0.98)" },
          to: { opacity: 1, transform: "translateY(0) scale(1)" },
        },
        "fade-up": {
          from: { opacity: 0, transform: "translateY(8px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        "word-in": {
          from: { opacity: 0, transform: "translateY(0.4em)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "slide-in": "slide-in 0.28s ease-out",
        "fade-up": "fade-up 0.35s ease-out",
        "word-in": "word-in 0.4s ease-out",
      },
    },
  },
  plugins: [],
};
