module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      opacity: {
        15: "0.15",
        35: "0.35",
        65: "0.65",
        95: "0.95",
      },
    },
  },
  plugins: [],
};
