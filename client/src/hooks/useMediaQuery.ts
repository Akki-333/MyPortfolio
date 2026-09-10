import { useEffect, useState } from "react";

/**
 * Subscribes to a media query.
 *
 * Initialised from a lazy `useState` initialiser so the first paint already
 * has the correct value, rather than rendering the wrong breakpoint and
 * correcting it in an effect.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const list = window.matchMedia(query);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);

    setMatches(list.matches);
    list.addEventListener("change", onChange);
    return () => list.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** Convenience wrapper used to disable non-essential motion. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
