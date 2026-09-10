import { useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/types";

/** `all` is the synthesised bucket the pill bar shows first. */
export type FilterValue = ProjectCategory | "all";

interface FilterBucket {
  readonly value: FilterValue;
  readonly label: string;
  readonly count: number;
}

/**
 * Client-side project filtering.
 *
 * Counts are derived from the data rather than hardcoded, so a pill can never
 * advertise a category that has no projects behind it.
 */
export function useProjectFilter(
  projects: readonly Project[],
  categories: readonly ProjectCategory[],
) {
  const [active, setActive] = useState<FilterValue>("all");

  const buckets = useMemo<readonly FilterBucket[]>(() => {
    const counted = categories
      .map((category) => ({
        value: category as FilterValue,
        label: category,
        count: projects.filter((p) => p.category === category).length,
      }))
      .filter((bucket) => bucket.count > 0);

    return [
      { value: "all" as const, label: "All", count: projects.length },
      ...counted,
    ];
  }, [projects, categories]);

  const visible = useMemo(
    () =>
      active === "all"
        ? projects
        : projects.filter((project) => project.category === active),
    [projects, active],
  );

  return { active, setActive, buckets, visible };
}
