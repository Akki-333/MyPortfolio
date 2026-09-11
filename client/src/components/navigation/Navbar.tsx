import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems, profile } from "@/data/profile";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/cn";
import type { SectionId } from "@/types";

const sectionIds = navItems.map((item) => item.id);

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useScrollSpy(sectionIds);

  // Elevate the bar once the page leaves the top, so the hero reads flat.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [drawerOpen]);

  // Optimistically switch the active highlight and scroll smoothly to target.
  const handleNavigate = useCallback(
    (id: SectionId) => {
      setDrawerOpen(false);
      setActiveId(id);
      if (id === "home") {
        // The hero has no offset to clear; jump cleanly to the document top.
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [setActiveId],
  );

  return (
    <header
      className={cn(
        "glass-bar fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300",
        scrolled ? "border-sky-100" : "border-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-nav w-full max-w-content items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <a
          href="#home"
          onClick={() => handleNavigate("home")}
          className="focus-ring flex items-center gap-2 rounded-lg text-base font-bold tracking-tight text-slate-900"
        >
          <span
            className="h-6 w-1.5 rounded-full bg-gradient-to-b from-sky-400 to-sky-600"
            aria-hidden="true"
          />
          {profile.name}
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = item.id === activeId;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => handleNavigate(item.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "focus-ring relative block rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150",
                    isActive
                      ? "text-sky-800"
                      : "text-slate-600 hover:text-slate-900",
                  )}
                >
                  {item.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active-indicator"
                      className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-sky-600"
                      transition={{
                        type: "spring",
                        stiffness: 520,
                        damping: 32,
                        mass: 0.5,
                      }}
                      aria-hidden="true"
                    />
                  ) : null}
                </a>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => setDrawerOpen((open) => !open)}
          aria-expanded={drawerOpen}
          aria-controls="mobile-drawer"
          aria-label={drawerOpen ? "Close navigation menu" : "Open navigation menu"}
          className="focus-ring flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 ring-1 ring-sky-200 transition-colors hover:bg-sky-50 md:hidden"
        >
          {drawerOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {drawerOpen ? (
        <div
          id="mobile-drawer"
          className="border-t border-sky-100 bg-white/95 md:hidden"
          style={{ animation: "drawer-in 200ms var(--ease-out) both" }}
        >
          <ul className="mx-auto flex w-full max-w-content flex-col gap-1 px-4 py-4 sm:px-6">
            {navItems.map((item) => {
              const isActive = item.id === activeId;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => handleNavigate(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "focus-ring flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sky-50 text-sky-800"
                        : "text-slate-700 hover:bg-sky-50",
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        isActive ? "bg-sky-600" : "bg-sky-200",
                      )}
                      aria-hidden="true"
                    />
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
