import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useDialog } from "@/hooks/useDialog";
import { cn } from "@/lib/cn";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Rendered as the accessible name of the dialog. */
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Centred dialog rendered into a portal.
 *
 * Portalled to `document.body` so the dialog is never clipped by an ancestor
 * with `overflow: hidden` or trapped under a transformed parent's stacking
 * context, both of which are easy to introduce further up a card grid.
 */
export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  className,
}: ModalProps) {
  const dialogRef = useDialog(isOpen, onClose);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="presentation"
    >
      <div
        className="glass-scrim absolute inset-0 animate-[fade-in_200ms_var(--ease-out)]"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={cn(
          "relative flex max-h-[92vh] w-full flex-col overflow-hidden bg-white",
          "rounded-t-2xl shadow-2xl ring-1 ring-sky-100 sm:max-w-3xl sm:rounded-2xl",
          "animate-[modal-in_260ms_var(--ease-out)]",
          className,
        )}
      >
        <header className="flex items-start gap-4 border-b border-sky-100 bg-gradient-to-r from-sky-50 to-white px-5 py-4 sm:px-7 sm:py-5">
          <div className="min-w-0 flex-1">
            <h2
              id="modal-title"
              className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl"
            >
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-0.5 truncate text-sm text-slate-600">
                {subtitle}
              </p>
            ) : null}
          </div>

          {/* 40px target: meets the 24px minimum of WCAG 2.2 target size. */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="focus-ring flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white text-slate-600 ring-1 ring-sky-200 transition-colors hover:bg-sky-50 hover:text-sky-800"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
