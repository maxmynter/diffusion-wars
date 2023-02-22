/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "overarch-s": "0px 0px 2px 2px",
        "overarch-xl": "0px 0px 12px 12px",
        "overarch-md": "0px 0px 7px 7px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      colors: {
        blu: "#03a9f4",
        vio: "#f441a5",
        yello: "#ffeb3b",
        gre: "#03a9f4",
      },
    },
  },
  plugins: [],
};
