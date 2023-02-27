/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["HelveticaNeue"],
      display: ["HelveticaNeue-CondensedBold"],
    },
    extend: {
      animation: {
        blob: "blob 45s infinite",
        antiblob: "antiblob 20s infinite",
      },
      keyframes: {
        blob: {
          "0%": { transform: "scale(1) translate(0px,0px)" },
          "33%": { transform: "scale(1.1) translate(70px,-100px)" },
          "66%": { transform: "scale(0.9) translate(-60px, 80px)" },
          "100%": { transform: "scale(1) translate(0px,0px)" },
        },
        antiblob: {
          "0%": { transform: "scale(1) translate(0px,0px)" },
          "33%": { transform: "scale(1.1) translate(-20px,-30px)" },
          "66%": { transform: "scale(0.9) translate(60px, 80px)" },
          "100%": { transform: "scale(1) translate(0px,0px)" },
        },
      },
      boxShadow: {
        "overarch-s": "0px 0px 2px 2px",
        "overarch-xl": "0px 0px 12px 12px",
        "overarch-md": "0px 0px 7px 7px",
      },
      colors: {
        blu: "#03a9f4",
        vio: "#f441a5",
        yello: "#ffeb3b",
        black: "#000000",
        white: "#fff",
        gray: {
          100: "#171717",
          200: "#2E2E2E",
          300: "#454545",
          400: "#4E545C",
          500: "#737373",
          600: "#8D9797",
          700: "#8A8A8A",
          900: "#E5E8E8",
        },
      },
    },
  },
  plugins: [],
};
