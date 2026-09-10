import { cn } from "@/lib/cn";
import type { FilterValue } from "@/hooks/useProjectFilter";

interface FilterBucket {
  readonly value: FilterValue;
  readonly label: string;
  readonly count: number;
}

interface FilterBarProps {
  buckets: readonly FilterBucket[];
  active: FilterValue;
  onChange: (value: FilterValue) => void;
}

/**
 * Category pills above the grid.
 *
 * Rendered as a radio group rather than a tab list: these filter a collection
 * that stays on screen, they do not swap panels, and a screen reader should
 * hear "3 of 4 selected" rather than a tab announcement.
 */
export function FilterBar({ buckets, active, onChange }: FilterBarProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Filter projects by category"
      className="sticky top-nav z-20 -mx-4 mb-10 flex gap-2 overflow-x-auto bg-white/80 px-4 py-3 backdrop-blur-sm sm:mx-0 sm:rounded-full sm:px-3 sm:ring-1 sm:ring-sky-100"
    >
      {buckets.map((bucket) => {
        const selected = bucket.value === active;
        return (
          <button
            key={bucket.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(bucket.value)}
            className={cn(
              "focus-ring flex flex-none items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200",
              selected
                ? "bg-sky-700 text-white"
                : "bg-white text-slate-700 ring-1 ring-inset ring-sky-200 hover:bg-sky-50 hover:text-sky-800",
            )}
          >
            {bucket.label}
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[11px] font-bold tabular-nums",
                selected ? "bg-white/20 text-white" : "bg-sky-50 text-sky-800",
              )}
            >
              {bucket.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
