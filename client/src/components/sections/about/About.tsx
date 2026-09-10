import { Compass, MessagesSquare, Wrench } from "lucide-react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { aboutStats } from "@/data/profile";
import { useReveal } from "@/hooks/useReveal";

/**
 * How I work, rather than what I know. The technical evidence lives in the
 * projects and experience sections; these three are the things a teammate
 * would notice in the first fortnight.
 */
const strengths = [
  {
    Icon: Compass,
    title: "Steady when things break",
    body: "Production problems are usually ambiguous before they are urgent. I reproduce first, narrow the surface, then fix the cause instead of the symptom. Panic makes debugging slower, so I try not to.",
  },
  {
    Icon: MessagesSquare,
    title: "Clear over clever",
    body: "In a review, a handover or a status update, I aim for the version someone can disagree with. Naming the tradeoff and what I am unsure about gets to a good decision faster than sounding certain.",
  },
  {
    Icon: Wrench,
    title: "Learns by taking things apart",
    body: "Most of what I know came from reading how something works underneath and rebuilding it. Unfamiliar stacks and inherited codebases are the part of the job I look forward to.",
  },
];

export function About() {
  const proseRef = useReveal<HTMLDivElement>();
  const statsRef = useReveal<HTMLDListElement>(80);

  return (
    <SectionWrapper
      id="about"
      eyebrow="About"
      title="Building software that holds up"
      description="Computer Science engineer working across full-stack web development, resilient data acquisition and applied retrieval systems. The through-line is software that stays correct when inputs, networks and third-party interfaces stop cooperating."
    >
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div ref={proseRef} className="reveal space-y-5">
          <p className="text-base leading-relaxed text-slate-700">
            Most of my work sits at the boundary where a clean abstraction meets
            a system that will not cooperate. A crawler against a page that
            rewrites its own DOM, hides listings behind a dialog and throws up a
            consent banner mid-run. A performance dashboard where metrics, live
            state and authorisation rules all have to agree before a number is
            safe to show. A parsing pipeline defending its schema against text
            that arrives broken.
          </p>
          <p className="text-base leading-relaxed text-slate-700">
            At{" "}
            <span className="font-semibold text-slate-900">
              BDSR Solutions LLP
            </span>{" "}
            I started on remote Linux data-acquisition work and moved into
            platform engineering. That has meant Flask services and React
            dashboards for performance management, FastAPI and vector search on
            a knowledge platform, a layered settlement API, and the asynchronous
            crawler infrastructure feeding all of it. Alongside the features:
            regression suites, security review and the production debugging that
            comes with a live product.
          </p>
          <p className="text-base leading-relaxed text-slate-700">
            Outside work I build retrieval and document systems.
            ArchiveMind-AI combines lexical, vector and graph search into one
            pipeline where every answer carries the source that supports it.
            PaperMint turns messy document input into validated bibliographic
            records behind four statically enforced layers.
          </p>
          <p className="text-base leading-relaxed text-slate-700">
            The approach stays the same across all of it. Decide the data
            invariants before writing the feature, put error boundaries where
            things actually fail, and let tests and runtime monitors prove the
            system works rather than asserting it.
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
          {strengths.map(({ Icon, title, body }, index) => (
            <StrengthCard
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

interface StrengthCardProps {
  Icon: typeof Compass;
  title: string;
  body: string;
  delayMs: number;
}

function StrengthCard({ Icon, title, body, delayMs }: StrengthCardProps) {
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
