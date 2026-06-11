/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Poppins", "Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          950: "#020607",
          900: "#061014",
          850: "#07181d",
          800: "#0b2027",
          700: "#15313a",
        },
        flame: {
          50: "#fff8e6",
          100: "#ffefbf",
          300: "#ffd166",
          400: "#ffb703",
          500: "#fb8c00",
          600: "#e85d04",
        },
        masala: {
          400: "#ff5a3c",
          500: "#ef3f2e",
          600: "#c72c22",
        },
        mint: {
          300: "#7bd88f",
          400: "#35c46f",
          500: "#16a34a",
        },
        cream: "#fff7e6",
      },
      boxShadow: {
        glow: "0 24px 80px rgba(251, 140, 0, 0.24)",
        card: "0 24px 70px rgba(0, 0, 0, 0.22)",
        soft: "0 18px 42px rgba(8, 14, 18, 0.14)",
      },
      backgroundImage: {
        "radial-warm":
          "radial-gradient(circle at 20% 20%, rgba(255, 183, 3, 0.18), transparent 28%), radial-gradient(circle at 82% 18%, rgba(239, 63, 46, 0.18), transparent 30%), linear-gradient(135deg, #020607 0%, #07181d 54%, #130f09 100%)",
        "premium-card":
          "linear-gradient(145deg, rgba(255,255,255,0.10), rgba(255,255,255,0.035))",
        "flame-gradient": "linear-gradient(135deg, #ffb703 0%, #fb8c00 45%, #ef3f2e 100%)",
        "fresh-gradient": "linear-gradient(135deg, #35c46f 0%, #ffb703 55%, #ef3f2e 100%)",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.5s infinite",
      },
    },
  },
  plugins: [],
};
