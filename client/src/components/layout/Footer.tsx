import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";

const year = new Date().getFullYear();

const socials = [
  { href: profile.github, label: "GitHub profile", Icon: Github },
  { href: profile.linkedin, label: "LinkedIn profile", Icon: Linkedin },
  { href: `mailto:${profile.email}`, label: "Send email", Icon: Mail },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-sky-100 bg-white/70">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-6 px-4 py-10 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <div className="text-center sm:text-left">
          <p className="text-sm font-semibold text-slate-900">
            {profile.name}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            {`\u00A9 ${year} \u00B7 ${profile.headline}`}
          </p>
        </div>

        <nav aria-label="Social links" className="flex items-center gap-2">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : null)}
              className="focus-ring flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-600 ring-1 ring-sky-200 transition-colors hover:bg-sky-50 hover:text-sky-800"
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
