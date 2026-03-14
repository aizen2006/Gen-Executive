import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

interface OverlayShellProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const OverlayShell: React.FC<OverlayShellProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Basic focus management: move focus into dialog and restore on close
  useEffect(() => {
    if (isOpen) {
      lastFocusedRef.current = document.activeElement as HTMLElement | null;

      const panel = panelRef.current;
      if (panel) {
        const focusable = panel.querySelector<HTMLElement>(
          'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        (focusable ?? panel).focus();
      }
    } else if (lastFocusedRef.current) {
      lastFocusedRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyDownCapture = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return;

    const panel = panelRef.current;
    if (!panel) return;

    const focusable = Array.from(
      panel.querySelectorAll<HTMLElement>(
        'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el: HTMLElement) => !el.hasAttribute('disabled') && el.tabIndex !== -1);

    if (focusable.length === 0) {
      event.preventDefault();
      panel.focus();
      return;
    }

    const firstEl = focusable[0] as HTMLElement;
    const lastEl = focusable[focusable.length - 1] as HTMLElement;
    const current = document.activeElement as HTMLElement | null;

    if (event.shiftKey) {
      if (current === firstEl || current === panel) {
        event.preventDefault();
        lastEl.focus();
      }
    } else {
      if (current === lastEl) {
        event.preventDefault();
        firstEl.focus();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-brand-dark/80 backdrop-blur-xl"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            className="relative z-10 w-full max-w-3xl max-h-[80vh] overflow-y-auto rounded-3xl bg-brand-surface border border-brand-border shadow-[0_0_60px_rgba(34,230,255,0.55)] p-6 sm:p-8 text-brand-light [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            whileHover={{ y: -4 }}
            onKeyDown={handleKeyDownCapture}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-brand-muted hover:text-brand-light hover:bg-brand-dark/60 transition-colors"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>

            {title && (
              <div className="mb-6 pr-10">
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-brand-light">
                  {title}
                </h2>
              </div>
            )}

            <div className={title ? '' : 'mt-2'}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OverlayShell;

