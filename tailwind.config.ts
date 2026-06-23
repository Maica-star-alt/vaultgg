import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0c10",
        "bg-card": "#111318",
        "bg-elevated": "#1a1d25",
        border: "#252830",
        ink: "#e8eaf0",
        "ink-muted": "#6b7280",
        accent: "#f59e0b",
        "accent-dark": "#d97706",
        positive: "#10b981",
        negative: "#ef4444",
        mlbb: "#e63946",
        pubg: "#f4a261",
        roblox: "#ef233c",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Inter", "ui-sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace"],
      },
      boxShadow: {
        glow: "0 0 20px rgb(245 158 11 / 0.15)",
        card: "0 4px 24px rgb(0 0 0 / 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
