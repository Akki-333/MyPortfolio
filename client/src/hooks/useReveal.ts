import { useEffect, useRef } from "react";

/**
 * Reveals an element once when it first enters the viewport.
 *
 * The observer unobserves the element and disconnects the moment it fires.
 * Leaving reveal observers attached is the usual cause of scroll jank on
 * long pages: every one of them wakes the main thread on each intersection
 * change for the rest of the session, for an animation that can only ever
 * run once.
 */
export function useReveal<T extends HTMLElement>(delayMs = 0) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      node.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;

        if (delayMs > 0) {
          node.style.animationDelay = `${delayMs}ms`;
        }
        node.classList.add("is-visible");

        // Fire once, then stop costing anything.
        observer.unobserve(entry.target);
        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delayMs]);

  return ref;
}
