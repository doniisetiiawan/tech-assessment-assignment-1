'use client';
import { useEffect, useRef } from 'react';

interface DialogProps {
  labelledBy: string;
  describedBy?: string;
  children: React.ReactNode;
}

/**
 * Shared modal organism: overlay + role="dialog" + focus trap.
 * Presentational only — no feature or store imports.
 */
export default function Dialog({ labelledBy, describedBy, children }: DialogProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const target = ref.current?.querySelector<HTMLElement>('[data-dialog-autofocus]') ?? ref.current;
    target?.focus();

    function trap(e: KeyboardEvent) {
      if (e.key === 'Tab') {
        const focusables = ref.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;
        e.preventDefault();
        const current = document.activeElement;
        const lastIndex = focusables.length - 1;
        const next = current === focusables[lastIndex] ? focusables[0] : focusables[Math.min(lastIndex, Array.from(focusables).indexOf(current as HTMLElement) + 1)];
        next.focus();
      }
    }
    document.addEventListener('keydown', trap);
    return () => {
      document.removeEventListener('keydown', trap);
      previous?.focus();
    };
  }, []);

  return (
    <div className="modal-overlay">
      <div
        ref={ref}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>
  );
}
