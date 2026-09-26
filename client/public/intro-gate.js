/**
 * Startup intro gate.
 *
 * Loaded from <head> as a classic, render-blocking script so it runs before
 * the first paint. It decides whether the intro plays and, if so, marks
 * <html data-intro>, which the inline style in index.html turns into the
 * intro's stage colour on that very first frame. Without it the page would
 * paint white for the few hundred milliseconds the app bundle takes to load,
 * then cut to the dark intro.
 *
 * A file rather than an inline script because the CSP in vercel.json is
 * `script-src 'self'`, which blocks inline scripts in production.
 *
 * Plays once per browser session, on the home page only, and never for
 * visitors who ask for reduced motion. Add `?intro` to the URL to replay it.
 */
(function () {
  try {
    if (window.location.pathname !== "/") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var forced = new URLSearchParams(window.location.search).has("intro");
    if (!forced && window.sessionStorage.getItem("intro-played")) return;

    window.sessionStorage.setItem("intro-played", "1");
    document.documentElement.setAttribute("data-intro", "");
  } catch (error) {
    // Storage unavailable (blocked cookies, sandboxed frame): skip the intro
    // rather than replay it on every page load.
  }
})();
