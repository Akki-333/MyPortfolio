import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useReveal } from "@/hooks/useReveal";
import type { SectionId } from "@/types";

interface SectionWrapperProps {
  id: SectionId;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  /** Applies the faint tinted band used to separate adjacent sections. */
  tinted?: boolean;
  className?: string;
}

/**
 * Standard section shell: consistent vertical rhythm, heading block and
 * scroll-margin so anchored navigation lands below the fixed navbar.
 */
export function SectionWrapper({
  id,
  eyebrow,
  title,
  description,
  children,
  tinted = false,
  className,
}: SectionWrapperProps) {
  const headingRef = useReveal<HTMLDivElement>();

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        "scroll-mt-24 py-20 sm:py-24",
        tinted && "bg-sky-50/50",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="reveal mb-12 max-w-prose sm:mb-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
            {eyebrow}
          </p>
          <h2
            id={`${id}-heading`}
            className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              {description}
            </p>
          ) : null}
        </div>

        {children}
      </div>
    </section>
  );
}
