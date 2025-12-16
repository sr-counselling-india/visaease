import type { Config } from "tailwindcss";
import { THEME } from "./src/constants/theme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: THEME.colors.primary,
        accent: THEME.colors.accent,
        background: THEME.colors.background,
        textDark: THEME.colors.textDark,
        textLight: THEME.colors.textLight,
        border: THEME.colors.border,
      },
    },
  },
  plugins: [],
};
export default config;
