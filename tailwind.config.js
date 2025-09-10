import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        primary: {
          DEFAULT: "#AE8649",
          dark: "#55462F",
        },
        secondary: "#D6D6D6",
        light: "#F1F1F2",
        dark: "#0E0E0E",
        solid: {
          50: "#f6f6f9",
          100: "#ecedf2",
          200: "#d4d6e3",
          300: "#afb3ca",
          400: "#838aad",
          500: "#646c93",
          600: "#4f547a",
          700: "#414563",
          800: "#383b54",
          900: "#323448",
          950: "#21222f",
        },
        woodSmoke: {
          50: "#f7f7f8",
          100: "#eeeef0",
          200: "#d9d9de",
          300: "#b7b7c2",
          400: "#9091a0",
          500: "#727485",
          600: "#5c5d6d",
          700: "#4b4c59",
          800: "#41424b",
          900: "#393941",
          950: "#141417",
        },
        charade: {
          50: "#f6f7f9",
          100: "#eceef2",
          200: "#d5d9e2",
          300: "#afb8ca",
          400: "#8492ac",
          500: "#657492",
          600: "#505d79",
          700: "#424c62",
          800: "#394153",
          900: "#333947",
          950: "#282c38",
        },
        shark: {
          50: "#f7f8f8",
          100: "#ededf1",
          200: "#d7d9e0",
          300: "#b4b7c5",
          400: "#8c92a4",
          500: "#6d748a",
          600: "#585e71",
          700: "#484c5c",
          800: "#3e414e",
          900: "#373a43",
          950: "#1e1f25",
        },
        componentBase: {
          "1": "#1F222A",
          "2": "#17191F",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};

module.exports = config;
