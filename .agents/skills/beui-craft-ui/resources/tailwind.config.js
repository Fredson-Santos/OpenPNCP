/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx,js,jsx,html}",
    "./components/**/*.{ts,tsx,js,jsx,html}",
    "./app/**/*.{ts,tsx,js,jsx,html}",
    "./src/**/*.{ts,tsx,js,jsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#151515",
        canvas: "#151515",
        card: {
          DEFAULT: "#1c1c1c",
          foreground: "#ededed",
        },
        surface: {
          DEFAULT: "#1c1c1c",
          elevated: "#242424",
          hover: "#222222",
        },
        muted: {
          DEFAULT: "#262626",
          foreground: "#8e8e93",
        },
        border: {
          DEFAULT: "#262626",
          subtle: "rgba(255, 255, 255, 0.08)",
          active: "#0084ff",
        },
        foreground: {
          DEFAULT: "#ededed",
          muted: "#8e8e93",
        },
        accent: {
          blue: {
            DEFAULT: "#0084ff",
            hover: "#0073e6",
            fg: "#ffffff",
          },
          lime: {
            DEFAULT: "#d5ff66",
            fg: "#172000",
          },
        },
        chart: {
          blue: "#2563eb",
          sky: "#38bdf8",
          teal: "#0d9488",
          amber: "#fbbf24",
          green: "#10b981",
        },
      },
      borderRadius: {
        xs: "6px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      letterSpacing: {
        tighter: "-0.03em",
        tight: "-0.02em",
        kicker: "0.16em",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
