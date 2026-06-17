import { heroui } from "@heroui/theme";

const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "1194px",
        md: "1194px",
        lg: "1194px",
        xl: "1194px",
        "2xl": "1194px",
      },
    },
    extend: {
      fontFamily: {
        yekan: ["var(--font-yekan)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          light: "var(--primaryLight)",
          dark: "var(--primaryDark)",
        },
        white: {
          DEFAULT: "var(--white)",
          gray: "var(--whiteGray)",
        },
        gray: {
          lighter: "var(--grayLighter)",
          DEFAULT: "var(--gray)",
          darker: "var(--grayDarker)",
        },
        secondary: "#D6D6D6",
        light: "#F1F1F2",
        dark: "#0E0E0E",
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "var(--primary)", // Your custom primary color
              foreground: "#FFFFFF", // Text color on primary backgrounds
            },
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "var(--primary)", // Your custom primary color
              foreground: "#FFFFFF", // Text color on primary backgrounds
            },
          },
        },
      },
    }),
  ],
};

module.exports = config;
