import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        tamma: {
          navy: "#0A192F",
          dark: "#060D17",
          card: "#0E2439",
          border: "#1E3A5F",
          orange: "#FF7A00",
          orangeHover: "#E66D00",
          amber: "#F59E0B",
          slate: "#94A3B8",
          light: "#F8FAFC",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        heading: ["var(--font-heading)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
