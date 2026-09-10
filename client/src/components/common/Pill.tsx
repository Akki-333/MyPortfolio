import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { techDomainClass } from "@/lib/format";
import type { TechDomain } from "@/types";

interface PillProps {
  children: ReactNode;
  /** Selects a domain-tinted palette. Omit for the neutral sky treatment. */
  domain?: TechDomain;
  className?: string;
}

/** Small labelled chip used for tech tags and category markers. */
export function Pill({ children, domain, className }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        "ring-1 ring-inset",
        domain
          ? techDomainClass[domain]
          : "bg-sky-50 text-sky-800 ring-sky-200",
        className,
      )}
    >
      {children}
    </span>
  );
}
