import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
      colors: {
        navy: "#0A2240",
        "navy-light": "#143050",
        copper: "#B8860B",
        cream: "#F8F5F0",
      },
    },
  },
  plugins: [],
} satisfies Config;
