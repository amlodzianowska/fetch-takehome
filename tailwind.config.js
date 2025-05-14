/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fff5e6",
          100: "#ffe7cc",
          200: "#ffcc99",
          300: "#ffb366",
          400: "#ff9933",
          500: "#ff8800",
          600: "#e67a00",
          700: "#cc6c00",
          800: "#995100",
          900: "#663600",
          950: "#331b00",
        },
        secondary: {
          50: "#f5f7fa",
          100: "#ebeef3",
          200: "#d2dbe6",
          300: "#adbdd1",
          400: "#829ab8",
          500: "#637da1",
          600: "#4f6486",
          700: "#41526d",
          800: "#38465d",
          900: "#32404f",
          950: "#212a35",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        heading: ["Poppins", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        card: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
