import { ButtonLink } from "@/components/common/Button";

export function NotFound() {
  return (
    <div className="page-canvas flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm font-semibold text-sky-700">404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-base text-slate-600">
        That route does not exist. The portfolio lives on a single page.
      </p>
      <ButtonLink href="/" size="lg" className="mt-8">
        Back to the portfolio
      </ButtonLink>
    </div>
  );
}
