import { Boxes, GitBranch, ShieldCheck } from "lucide-react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { aboutStats } from "@/data/profile";
import { useReveal } from "@/hooks/useReveal";

const principles = [
  {
    Icon: Boxes,
    title: "Boundaries before features",
    body: "Layers are decided up front and then enforced mechanically. In PaperMint a custom AST linter fails the build when a domain module imports presentation code, because a convention nobody can check is not a boundary.",
  },
  {
    Icon: ShieldCheck,
    title: "Fail loudly, fail early",
    body: "Configuration is validated at startup, not at the first request that happens to need it. A service that refuses to boot on a bad config is far cheaper to debug than one that degrades silently under traffic.",
  },
  {
    Icon: GitBranch,
    title: "Tests that do not depend on the world",
    body: "Suites run without network access, using synthetic fixtures generated in memory. That keeps them deterministic on any machine and makes a red build mean something.",
  },
];

export function About() {
  const proseRef = useReveal<HTMLDivElement>();
  const statsRef = useReveal<HTMLDListElement>(80);

  return (
    <SectionWrapper
      id="about"
      eyebrow="About"
      title="Engineering under constraints"
      description="Computer Science engineer working across full-stack delivery, applied AI retrieval and data extraction. The common thread is systems that stay correct when the inputs stop cooperating."
    >
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div ref={proseRef} className="reveal space-y-5">
          <p className="text-base leading-relaxed text-slate-700">
            Most of my work sits where the clean abstraction meets messy
            reality: a scraper against a site that changes its markup, a
            bibliography split across a page break, a booking table two people
            are trying to claim at the same instant. Those are the cases that
            decide whether a system holds.
          </p>
          <p className="text-base leading-relaxed text-slate-700">
            At{" "}
            <span className="font-semibold text-slate-900">
              BDSR Solutions LLP
            </span>{" "}
            I started on Python acquisition pipelines and moved onto Quantis, a
            Flask and React performance management platform. Redesigning
            connection pooling so multiple companies could share a single API
            session cut runtime and resource use materially, and taught me more
            about production behaviour than any amount of local benchmarking.
          </p>
          <p className="text-base leading-relaxed text-slate-700">
            Outside that role I build retrieval and extraction systems.
            ArchiveMind-AI composes lexical, vector and graph search into one
            pipeline with verifiable citations. PaperMint turns hostile
            document input into validated bibliographic records behind four
            statically enforced layers. Both are built the same way: decide the
            invariants first, then make the tooling defend them.
          </p>

          <dl
            ref={statsRef}
            className="reveal grid grid-cols-2 gap-4 pt-4 sm:grid-cols-4"
          >
            {aboutStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-sky-100 bg-white/70 px-3 py-3"
              >
                <dt className="text-[11px] font-medium uppercase tracking-wide text-slate-600">
                  {stat.label}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-slate-900">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <ul className="space-y-4">
          {principles.map(({ Icon, title, body }, index) => (
            <PrincipleCard
              key={title}
              Icon={Icon}
              title={title}
              body={body}
              delayMs={index * 90}
            />
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
}

interface PrincipleCardProps {
  Icon: typeof Boxes;
  title: string;
  body: string;
  delayMs: number;
}

function PrincipleCard({ Icon, title, body, delayMs }: PrincipleCardProps) {
  const ref = useReveal<HTMLLIElement>(delayMs);

  return (
    <li ref={ref} className="reveal glass-card glass-card-interactive p-5">
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-sky-50 text-sky-700 ring-1 ring-sky-200">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-sm font-bold text-slate-900">{title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
            {body}
          </p>
        </div>
      </div>
    </li>
  );
}
