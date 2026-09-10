import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const variantClass: Record<Variant, string> = {
  // sky-700 rather than sky-600: white on sky-600 is 4.09:1, under AA.
  primary:
    "bg-sky-700 text-white shadow-sm hover:bg-sky-800 active:bg-sky-800",
  secondary:
    "bg-white/85 text-sky-800 ring-1 ring-inset ring-sky-200 hover:ring-sky-400 hover:bg-white",
  ghost: "text-slate-700 hover:bg-sky-50 hover:text-sky-800",
};

const sizeClass: Record<Size, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold " +
  "transition-colors duration-200 focus-ring select-none whitespace-nowrap " +
  "disabled:pointer-events-none disabled:opacity-60";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

type LinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
    /** Adds target and the rel guard that prevents reverse tabnabbing. */
    external?: boolean;
  };

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, variantClass[variant], sizeClass[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  external = false,
  ...rest
}: LinkProps) {
  return (
    <a
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : null)}
      className={cn(base, variantClass[variant], sizeClass[size], className)}
      {...rest}
    >
      {children}
    </a>
  );
}
