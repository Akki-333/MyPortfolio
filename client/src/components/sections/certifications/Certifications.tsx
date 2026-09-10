import { Award, ExternalLink, GraduationCap } from "lucide-react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { certifications, education } from "@/data/certifications";
import { useReveal } from "@/hooks/useReveal";

export function Certifications() {
  const certRef = useReveal<HTMLDivElement>();
  const eduRef = useReveal<HTMLDivElement>(90);

  return (
    <SectionWrapper
      id="certifications"
      eyebrow="Credentials"
      title="Accreditation and academics"
      description="Formal grounding behind the applied work. Credentials without a public verification page are listed without a link rather than pointed at an issuer homepage."
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div ref={certRef} className="reveal">
          <h3 className="mb-5 flex items-center gap-2.5 text-sm font-bold uppercase tracking-wide text-slate-900">
            <Award className="h-4 w-4 text-sky-700" aria-hidden="true" />
            Certifications
          </h3>

          <ul className="space-y-3">
            {certifications.map((cert) => (
              <li
                key={cert.title}
                className="glass-card glass-card-interactive flex items-start gap-4 p-5"
              >
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-sky-50 text-sky-700 ring-1 ring-sky-200">
                  <Award className="h-4 w-4" aria-hidden="true" />
                </span>

                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-slate-900">
                    {cert.title}
                  </h4>
                  <p className="mt-0.5 text-sm text-slate-600">
                    {cert.issuer}
                  </p>

                  {cert.grade ? (
                    <span className="mt-2 inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800 ring-1 ring-emerald-200">
                      {cert.grade}
                    </span>
                  ) : null}
                </div>

                {cert.verifyUrl ? (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring flex h-9 w-9 flex-none items-center justify-center rounded-lg text-slate-600 ring-1 ring-sky-200 transition-colors hover:bg-sky-50 hover:text-sky-800"
                    aria-label={`Verify ${cert.title}`}
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </div>

        <div ref={eduRef} className="reveal">
          <h3 className="mb-5 flex items-center gap-2.5 text-sm font-bold uppercase tracking-wide text-slate-900">
            <GraduationCap className="h-4 w-4 text-sky-700" aria-hidden="true" />
            Education
          </h3>

          {/* Rail sits behind the markers; markers carry a white ring to mask it. */}
          <ol className="relative space-y-5 pl-7">
            <span
              className="absolute bottom-2 left-[5px] top-2 w-px bg-gradient-to-b from-sky-300 via-sky-200 to-transparent"
              aria-hidden="true"
            />

            {education.map((record) => (
              <li key={record.qualification} className="relative">
                <span
                  className="absolute -left-7 top-1.5 h-2.5 w-2.5 rounded-full bg-sky-600 ring-4 ring-white"
                  aria-hidden="true"
                />

                <div className="glass-card p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-900">
                      {record.qualification}
                    </h4>
                    <span className="text-xs font-medium text-slate-600">
                      {record.period}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-slate-600">
                    {record.institution}
                  </p>

                  <span className="mt-3 inline-flex rounded-full bg-sky-50 px-2.5 py-0.5 text-[11px] font-semibold text-sky-800 ring-1 ring-sky-200">
                    {record.result}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </SectionWrapper>
  );
}
