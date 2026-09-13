import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./services/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#172554",
        },
        midnight: "#050816",
        panel: "#0b1224",
      },
      backgroundImage: {
        "signal-gradient": "linear-gradient(135deg,#2563eb 0%,#4f46e5 55%,#06b6d4 100%)",
        "grid-dark": "linear-gradient(rgba(96,165,250,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(96,165,250,.08) 1px,transparent 1px)",
      },
      boxShadow: {
        glow: "0 20px 60px rgba(37,99,235,.28)",
        panel: "0 30px 80px rgba(0,0,0,.35)",
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "Arial", "sans-serif"],
        heading: ["Manrope", "Inter", "Segoe UI", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
