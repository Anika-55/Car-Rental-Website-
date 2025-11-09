module.exports = {
  theme: {
    extend: {
      keyframes: {
        fadeIn: { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        fadeInDown: { "0%": { opacity: 0, transform: "translateY(-50px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
      },
      animation: {
        fadeIn: "fadeIn 1s ease-out forwards",
        fadeInDown: "fadeInDown 1s ease-out forwards",
      },
    },
  },
  plugins: [],
};
