import { useEffect, useState } from "react";

/**
 * Cycles hero role strings on a fixed interval.
 *
 * Pauses when the tab is hidden, because a timer that keeps firing in a
 * background tab burns battery for an animation nobody is looking at, and
 * stops entirely when the visitor has asked for reduced motion.
 */
export function useRoleRotator(count: number, intervalMs = 2800): number {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (count <= 1) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    let timer: number | undefined;

    const start = () => {
      timer = window.setInterval(() => {
        setIndex((prev) => (prev + 1) % count);
      }, intervalMs);
    };

    const stop = () => {
      if (timer !== undefined) {
        window.clearInterval(timer);
        timer = undefined;
      }
    };

    const handleVisibility = () => {
      if (document.hidden) stop();
      else if (timer === undefined) start();
    };

    start();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [count, intervalMs]);

  return index;
}
