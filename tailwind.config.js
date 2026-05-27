/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#e8ff47",
        surface: "#0a0a0a",
        muted: "#888888",
        border: "#1f1f1f",
      },
      fontFamily: {
        display: ['"Syne"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};
