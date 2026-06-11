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
          400: "rgb(248,195,72)",
          500: "rgb(230,160,60)",
          600: "rgb(218,155,52)",
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
        glow: "0 24px 80px rgba(248,195,72, 0.24)",
        card: "0 24px 70px rgba(0, 0, 0, 0.22)",
        soft: "0 18px 42px rgba(8, 14, 18, 0.14)",
      },
      backgroundImage: {
        "radial-warm":
          "radial-gradient(circle at 20% 20%, rgba(248,195,72, 0.18), transparent 28%), radial-gradient(circle at 82% 18%, rgba(239, 63, 46, 0.18), transparent 30%), linear-gradient(135deg, #020607 0%, #07181d 54%, #130f09 100%)",
        "premium-card":
          "linear-gradient(145deg, rgba(255,255,255,0.10), rgba(255,255,255,0.035))",
  "flame-gradient": "linear-gradient(135deg, rgb(248,195,72) 0%, rgb(230,160,60) 45%, rgb(218,155,52) 100%)",
  "fresh-gradient": "linear-gradient(135deg, #35c46f 0%, rgb(248,195,72) 55%, rgb(218,155,52) 100%)",
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
