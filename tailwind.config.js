/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#a855f7", // Main purple
          600: "#7C3AED", // Darker purple
          700: "#4F46E5", // Deep purple
        },
        background: {
          light: "#F9FAFB", // App BG
          white: "#FFFFFF", // Cards
        },
        text: {
          dark: "#1F2937", // Primary text
          medium: "#6B7280", // Secondary text
          accent: "#4F46E5", // Interactive text
        },
        status: {
          positive: "#10B981",
          warning: "#F59E0B",
          negative: "#EF4444",
        },
        iconBgs: {
          blue: { bg: "#EFF6FF", icon: "#4F46E5" },
          purple: { bg: "#F3E8FF", icon: "#7C3AED" },
          green: { bg: "#ECFDF5", icon: "#10B981" },
        },
        borders: {
          light: "#E5E7EB",
        },
      },
    },
  },
  plugins: [],
};
