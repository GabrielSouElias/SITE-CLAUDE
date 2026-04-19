/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        wine: {
          black: "#1A0F10",
          shadow: "#2A1416",
          brown: "#8C3D20",
          red: "#A62C21",
          gold: "#BF8C60",
          beige: "#D9BBA9",
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        luxe: "0.24em",
      },
      keyframes: {
        "soft-float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "bloom-in": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "soft-float": "soft-float 6s ease-in-out infinite",
        "bloom-in": "bloom-in 900ms ease-out both",
      },
    },
  },
  plugins: [],
};
