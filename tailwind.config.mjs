/**
 * Tailwind is used for layout and spacing; colour comes from the stock sky,
 * cyan and slate ramps so the palette in `styles/tokens.css` and the utility
 * classes stay in lockstep. No plugins - the two that were here (typography,
 * animate) served components that no longer exist.
 *
 * Authored as ESM with a JSDoc type rather than TypeScript: Tailwind loads a
 * `.ts` config through a transpiling shim that makes Node emit an ES-module
 * warning on every build. This keeps editor type-checking and a silent build.
 *
 * @type {import("tailwindcss").Config}
 */
export default {
  content: ["./client/index.html", "./client/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        DEFAULT: "var(--radius-sm)",
        lg: "var(--radius)",
        xl: "var(--radius-lg)",
      },
      maxWidth: {
        content: "80rem",
        prose: "42rem",
      },
      spacing: {
        nav: "var(--nav-height)",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
      },
      boxShadow: {
        glass: "var(--glass-shadow)",
        "glass-hover": "var(--glass-shadow-hover)",
      },
      keyframes: {
        "rise-in": {
          from: { opacity: "0", transform: "translate3d(0, 14px, 0)" },
          to: { opacity: "1", transform: "translate3d(0, 0, 0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "rise-in": "rise-in 620ms var(--ease-out) both",
        "fade-in": "fade-in 400ms var(--ease-out) both",
      },
    },
  },
  plugins: [],
};
