import { useCallback, useEffect, useRef, useState } from "react";
import type { SectionId } from "@/types";

/**
 * Tracks which section currently occupies the reading band near the top of
 * the viewport.
 *
 * Supports optimistic active section switching on click so the navbar indicator
 * moves instantly without waiting for smooth-scroll to complete or stuttering
 * through intermediate sections.
 */
export function useScrollSpy(
  sectionIds: readonly SectionId[],
  navHeightPx = 64,
): readonly [SectionId, (id: SectionId) => void] {
  const [activeId, setActiveId] = useState<SectionId>(
    sectionIds[0] ?? "home",
  );
  const isLockedRef = useRef(false);
  const lockTimerRef = useRef<number | null>(null);

  const setManualActiveId = useCallback((id: SectionId) => {
    setActiveId(id);
    isLockedRef.current = true;

    if (lockTimerRef.current !== null) {
      window.clearTimeout(lockTimerRef.current);
    }

    // Lock scroll-spy updates while smooth scrolling is in flight so
    // intermediate sections do not jitter or drag the active indicator.
    lockTimerRef.current = window.setTimeout(() => {
      isLockedRef.current = false;
      lockTimerRef.current = null;
    }, 700);
  }, []);

  useEffect(() => {
    const unlock = () => {
      if (lockTimerRef.current !== null) {
        window.clearTimeout(lockTimerRef.current);
        lockTimerRef.current = null;
      }
      isLockedRef.current = false;
    };

    window.addEventListener("scrollend", unlock, { passive: true });
    window.addEventListener("wheel", unlock, { passive: true });
    window.addEventListener("touchstart", unlock, { passive: true });

    return () => {
      window.removeEventListener("scrollend", unlock);
      window.removeEventListener("wheel", unlock);
      window.removeEventListener("touchstart", unlock);
      if (lockTimerRef.current !== null) {
        window.clearTimeout(lockTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isLockedRef.current) return;

        // Prefer the entry closest to the top of the band; on fast scrolls
        // more than one can report in the same callback.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );

        const next = visible[0]?.target.id;
        if (next) setActiveId(next as SectionId);
      },
      {
        rootMargin: `-${navHeightPx + 8}px 0px -68% 0px`,
        threshold: 0,
      },
    );

    elements.forEach((el) => observer.observe(el));

    // The last section can be too short to enter the band when the page is
    // scrolled to its end, so pin it explicitly at the bottom.
    const handleScrollEnd = () => {
      if (isLockedRef.current) return;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) {
        const last = sectionIds[sectionIds.length - 1];
        if (last) setActiveId(last);
      }
    };

    window.addEventListener("scroll", handleScrollEnd, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollEnd);
    };
  }, [sectionIds, navHeightPx]);

  return [activeId, setManualActiveId] as const;
}
