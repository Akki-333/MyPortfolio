import { Building2, MapPin } from "lucide-react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Pill } from "@/components/common/Pill";
import { experience } from "@/data/experience";
import { useReveal } from "@/hooks/useReveal";
import type { ExperienceRole } from "@/types";

export function Experience() {
  return (
    <SectionWrapper
      id="experience"
      eyebrow="Experience"
      title="Engineering across the stack"
      description="From scraping complex web targets to delivering full-stack products—building systems that stay correct when inputs stop cooperating."
      tinted
    >
      <ol className="space-y-6">
        {experience.map((role, index) => (
          <RoleCard key={role.company} role={role} delayMs={index * 90} />
        ))}
      </ol>
    </SectionWrapper>
  );
}

function RoleCard({ role, delayMs }: { role: ExperienceRole; delayMs: number }) {
  const ref = useReveal<HTMLLIElement>(delayMs);

  return (
    <li ref={ref} className="reveal glass-card p-6 sm:p-8">
      <div className="flex flex-col gap-4 border-b border-sky-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-sky-50 text-sky-700 ring-1 ring-sky-200">
            <Building2 className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-xl font-bold tracking-tight text-slate-900">
              {role.title}
            </h3>
            <p className="mt-0.5 text-sm font-semibold text-sky-800">
              {role.company}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-600">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {role.location}
            </p>
          </div>
        </div>

        <div className="flex flex-none items-center gap-2 sm:flex-col sm:items-end">
          <span className="rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-800 ring-1 ring-sky-200">
            {role.period}
          </span>
          {role.current ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
              <span
                className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                aria-hidden="true"
              />
              Current
            </span>
          ) : null}
        </div>
      </div>

      <p className="mt-5 max-w-prose text-sm leading-relaxed text-slate-700">
        {role.summary}
      </p>

      <ul className="mt-6 grid gap-5 sm:grid-cols-2">
        {role.highlights.map((highlight) => (
          <li key={highlight.headline} className="flex gap-3">
            <span
              className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-sky-500"
              aria-hidden="true"
            />
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                {highlight.headline}
              </h4>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                {highlight.detail}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <ul className="mt-7 flex flex-wrap gap-1.5 border-t border-sky-100 pt-5">
        {role.stack.map((tech) => (
          <li key={tech}>
            <Pill>{tech}</Pill>
          </li>
        ))}
      </ul>
    </li>
  );
}
