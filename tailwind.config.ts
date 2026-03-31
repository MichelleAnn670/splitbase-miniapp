import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        secondary: "#14B8A6",
        background: "#F8FAFC",
        surface: "#FFFFFF",
        text: {
          primary: "#0F172A",
          secondary: "#64748B",
        },
        accent: "#7C3AED",
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
      },
      boxShadow: {
        panel: "0 20px 45px -28px rgba(15, 23, 42, 0.28)",
      },
      backgroundImage: {
        "panel-grid":
          "radial-gradient(circle at top left, rgba(37,99,235,0.12), transparent 32%), radial-gradient(circle at bottom right, rgba(20,184,166,0.12), transparent 26%)",
      },
    },
  },
  plugins: [],
};

export default config;
