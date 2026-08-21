/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        burtons: "burtons",
        sans: ["var(--font-geist-sans)", "Arial", "Helvetica", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        stone: {
          ...colors.stone,
          100: "#eef1ff",
          200: "#dce2f4",
          300: "#c3cbdc",
          400: "#9aa7b0",
          500: "#7d8c86",
          600: "#5c6e64",
          700: "#3d5245",
          800: "#24352c",
          900: "#16241c",
          950: "#0d1611",
        },
        neutral: {
          ...colors.neutral,
          800: "#1a2e22",
          900: "#14241a",
          950: "#0d1611",
        },
      },
    },
  },
  plugins: [],
};
