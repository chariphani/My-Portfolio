/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: { roboto: ["Roboto", "sans-serif"] },
      colors: {
        ink: "#0B1B32",    // page background
        navy: "#0D1E4C",   // navbar, footer, cards
        slate: "#26415E",  // borders, inputs
        sky: "#83A6CE",    // primary accent
        mauve: "#C48CB3",  // secondary accent
        mist: "#E5C9D7",   // text on dark
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-16px)" } },
        spin3d: { to: { transform: "rotate(360deg)" } },
        shimmer: { "0%": { backgroundPosition: "0% 50%" }, "100%": { backgroundPosition: "200% 50%" } },
        blink: { "50%": { opacity: 0 } },
        pop: { "0%": { opacity: 0, transform: "scale(.6) rotateX(60deg)" }, "100%": { opacity: 1, transform: "scale(1) rotateX(0)" } },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        spin3d: "spin3d 8s linear infinite",
        shimmer: "shimmer 4s linear infinite",
        blink: "blink 1s step-end infinite",
        pop: "pop .8s cubic-bezier(.2,.9,.3,1.2) both",
      },
    },
  },
  plugins: [],
};
