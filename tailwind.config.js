/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: "#18D26E",
        blue: "#10263E",
        newColor: "#0A73EB",
        gray: "#8f9092",
        red: "#FF0000",
        inputColor: "rgba(79, 134, 236, 0.10);",
        "green-dark": "#18D26E33",
        "mpesa-input": "rgba(243, 255, 254, 0.21);",
        "green-slightly-dark": "rgba(24, 210, 110, 0.1)",
        failRed: "rgba(255, 0, 0, 0.60);",
        "smooth-green": "rgba(24, 210, 110, 0.10);",
        gray1: "#FFFFFF",
        "blue-dark": "#165CA81A",
        "gray-light": "rgba(22, 92, 168, 0.10)",
      },
      screens: {
        xsm: "320px",
      },
      fontFamily: {
        sans: ["Nunito", "sans-serif"],
      },
    },
    fontFamily: {
      sans: ["Nunito", "sans-serif"],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    // ...
  ],
};
