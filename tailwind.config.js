/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        color1: "#201a24",
        // color1: "#2d4243",
        color2: "#879f92",
        // color2: "#94a5ac",
        color3: "#cbc399",
        // color3: "#c5c7c4",
        color4: "#c78441",
        // color4: "#7d908c",
        color5: "#9c4022",
        color6: "#f7f7fc",
        color7: "#A0A899",
      },
    },
  },
  plugins: [],
};
