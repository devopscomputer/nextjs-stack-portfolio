// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"], // Ajuste se estiver usando outra estrutura
    theme: {
        extend: {
            fontFamily: {
              sans: ['Inter', 'Segoe UI', 'Roboto', 'sans-serif'],
            },
        colors: {
          verde: {
            50: "#e9fef8",
            100: "#ccfbee",
            200: "#99f6dc",
            300: "#66f0cb",
            400: "#33eab9",
            500: "#00e5a7", // baseado em oklch(0.925 0.084 155.995)
            600: "#00b184",
            700: "#007d61",
            800: "#00493d",
            900: "#00251f",
            950: "#00120f"
          }
        }
      }
    },
    plugins: []
  };
  