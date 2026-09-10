import { Download, Github, Linkedin, Mail, Phone } from "lucide-react";
import { ButtonLink } from "@/components/common/Button";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { contactChannels, profile } from "@/data/profile";
import { useReveal } from "@/hooks/useReveal";
import type { ContactChannelIcon } from "@/types";

const channelIcon: Record<ContactChannelIcon, typeof Mail> = {
  mail: Mail,
  phone: Phone,
  linkedin: Linkedin,
  github: Github,
};

export function Contact() {
  const ctaRef = useReveal<HTMLDivElement>(120);

  return (
    <SectionWrapper
      id="contact"
      eyebrow="Contact"
      title="Open to the next problem"
      description="Available for full-stack, backend and applied AI roles. The fastest route is email; everything else reaches me too."
      tinted
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:gap-14">
        <ul className="grid gap-3 sm:grid-cols-2">
          {contactChannels.map((channel, index) => (
            <ChannelCard
              key={channel.label}
              channel={channel}
              delayMs={index * 70}
            />
          ))}
        </ul>

        <div
          ref={ctaRef}
          className="reveal glass-card flex flex-col justify-center gap-5 p-6 sm:p-8"
        >
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Prefer the short version?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              The CV covers the same ground in two pages: production role,
              flagship systems, and the stack behind each one.
            </p>
          </div>

          <ButtonLink
            href={profile.resumePath}
            download={profile.resumeFileName}
            size="lg"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download CV
          </ButtonLink>

          <p className="text-xs text-slate-600">
            {`Based in ${profile.location} \u00B7 ${profile.availability}`}
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}

function ChannelCard({
  channel,
  delayMs,
}: {
  channel: (typeof contactChannels)[number];
  delayMs: number;
}) {
  const ref = useReveal<HTMLLIElement>(delayMs);
  const Icon = channelIcon[channel.icon];

  return (
    <li ref={ref} className="reveal">
      <a
        href={channel.href}
        {...(channel.external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : null)}
        className="glass-card glass-card-interactive focus-ring flex h-full items-center gap-4 p-5"
      >
        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-sky-50 text-sky-700 ring-1 ring-sky-200">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>

        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-600">
            {channel.label}
          </p>
          <p className="truncate text-sm font-semibold text-slate-900">
            {channel.value}
          </p>
        </div>
      </a>
    </li>
  );
}
