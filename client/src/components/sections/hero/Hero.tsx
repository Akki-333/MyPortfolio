import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { ButtonLink } from "@/components/common/Button";
import { profile } from "@/data/profile";
import { useRoleRotator } from "@/hooks/useRoleRotator";
import { TerminalBadge } from "./TerminalBadge";

const socials = [
  { href: profile.github, label: "GitHub profile", Icon: Github },
  { href: profile.linkedin, label: "LinkedIn profile", Icon: Linkedin },
  { href: `mailto:${profile.email}`, label: "Send email", Icon: Mail },
] as const;

export function Hero() {
  const roleIndex = useRoleRotator(profile.roles.length);
  const currentRole = profile.roles[roleIndex] ?? profile.headline;

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative scroll-mt-24 px-4 pb-20 pt-nav sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid w-full max-w-content items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-24">
        <div className="animate-rise-in">
          {/* Header block: on mobile, aligns the portrait to the right of the name and role */}
          <div className="flex items-start justify-between gap-4 lg:block">
            <div className="min-w-0 flex-1">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-sky-800 ring-1 ring-sky-200">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-[pulse-ring_2.4s_var(--ease-out)_infinite]" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {profile.availability}
              </p>

              <h1
                id="hero-heading"
                className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:mt-6 lg:text-6xl"
              >
                {profile.name}
              </h1>

              {/*
                Fixed min-height. The rotating strings differ in length, and
                without a reserved box the paragraph below would jump on every
                swap - a layout shift repeated every few seconds.
              */}
              <div className="mt-2 flex min-h-[2.25rem] items-center sm:min-h-[2.75rem] lg:mt-3">
                <p
                  aria-live="polite"
                  aria-atomic="true"
                  className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-600 sm:text-2xl"
                >
                  <span
                    key={roleIndex}
                    className="inline-block animate-[fade-in_400ms_var(--ease-out)]"
                  >
                    {currentRole}
                  </span>
                </p>
              </div>
            </div>

            {/* Mobile portrait: positioned directly to the right of the name at the starting */}
            <div className="relative flex-shrink-0 self-center lg:hidden">
              <div
                className="absolute -inset-2 rounded-full bg-gradient-to-tr from-sky-200 via-cyan-100 to-sky-300 opacity-70 blur-lg"
                aria-hidden="true"
              />
              <picture>
                <source srcSet="/profile.webp" type="image/webp" />
                <img
                  src="/profile.png"
                  alt={`Portrait of ${profile.name}`}
                  width={112}
                  height={112}
                  decoding="async"
                  className="relative h-24 w-24 rounded-full object-cover ring-4 ring-white shadow-lg sm:h-28 sm:w-28"
                />
              </picture>
            </div>
          </div>

          <p className="mt-6 max-w-prose text-base leading-relaxed text-slate-700 sm:text-lg">
            {profile.hook}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="#projects" size="lg" className="w-full sm:w-auto">
              Explore projects
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>

            <ButtonLink
              href={profile.resumePath}
              download={profile.resumeFileName}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download CV
            </ButtonLink>
          </div>

          <div className="mt-9 flex items-center gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : null)}
                className="focus-ring flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-slate-600 ring-1 ring-sky-200 transition-colors hover:bg-white hover:text-sky-800 hover:ring-sky-400"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-8 lg:items-end">
          {/* Desktop portrait: hidden on mobile, placed here on lg+ */}
          <div className="relative hidden lg:block">
            <div
              className="absolute -inset-3 rounded-full bg-gradient-to-tr from-sky-200 via-cyan-100 to-sky-300 opacity-70 blur-xl"
              aria-hidden="true"
            />
            {/*
              Explicit width and height reserve the box before the bitmap
              decodes, so the hero never reflows. The LCP fetch is started
              earlier still, by the preload hint in index.html.
            */}
            <picture>
              <source srcSet="/profile.webp" type="image/webp" />
              <img
                src="/profile.png"
                alt={`Portrait of ${profile.name}`}
                width={224}
                height={224}
                decoding="async"
                className="relative h-48 w-48 rounded-full object-cover ring-4 ring-white shadow-xl sm:h-56 sm:w-56"
              />
            </picture>
          </div>

          <div className="w-full max-w-sm">
            <TerminalBadge />
          </div>
        </div>
      </div>
    </section>
  );
}
