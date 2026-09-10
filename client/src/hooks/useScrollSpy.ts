import { useEffect, useState } from "react";
import type { SectionId } from "@/types";

/**
 * Tracks which section currently occupies the reading band near the top of
 * the viewport.
 *
 * One observer watches every section. The `rootMargin` collapses the viewport
 * to a thin band just under the navbar, so exactly one full-height section
 * qualifies at a time and no scroll handler is needed. This observer is
 * intentionally long-lived: unlike a reveal observer it has to keep reporting
 * for the life of the page, so it is disconnected only on unmount.
 */
export function useScrollSpy(
  sectionIds: readonly SectionId[],
  navHeightPx = 64,
): SectionId {
  const [activeId, setActiveId] = useState<SectionId>(
    sectionIds[0] ?? "home",
  );

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
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

  return activeId;
}
