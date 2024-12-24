import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        "hero-pattern": "url('/Images/Group 1.svg')",
        "chart-pattern": "url('/Images/Group 2.svg')",
        "sidebar": "url('/Images/Group 5.svg')",
      },
      backgroundSize: {
        "130": "130%",
        '300': '300%',
        '500': '500%',
      }
    },
  },
  plugins: [],
} satisfies Config;
