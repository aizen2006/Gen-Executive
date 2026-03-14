import React from 'react';
import { motion } from 'framer-motion';
import { MonitorSmartphone, MousePointer2, BarChart3 } from 'lucide-react';

interface LandingPreviewOverlayContentProps {
  variant?: number;
  onClose?: () => void;
}

const variantsCopy = [
  {
    label: 'Founder Funnel',
    badge: '+28% opt-in rate',
    accent: 'from-brand-cyan to-brand-violet',
  },
  {
    label: 'Product Launch',
    badge: '+34% demo requests',
    accent: 'from-pink-500 to-orange-400',
  },
  {
    label: 'Waitlist Drop',
    badge: '4.2x launch list',
    accent: 'from-emerald-400 to-brand-cyan',
  },
];

const LandingPreviewOverlayContent: React.FC<LandingPreviewOverlayContentProps> = ({
  variant = 1,
  onClose,
}) => {
  const selected = variantsCopy[(variant - 1 + variantsCopy.length) % variantsCopy.length];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-cyan">
            Landing page preview
          </p>
          <h3 className="text-2xl md:text-3xl font-semibold text-brand-light">
            {selected.label} layout in action.
          </h3>
          <p className="text-sm md:text-base text-brand-muted max-w-xl">
            This is a live-inspired mock of how your Growth Engine pages feel: hero built to
            convert, offer framed clearly, and instrumentation baked in so every scroll ties back
            to your CRM and AI agents.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start rounded-full border border-brand-border/70 bg-brand-dark/60 px-3 py-1 text-[11px] text-brand-muted">
          <MonitorSmartphone size={14} className="text-brand-cyan" />
          Responsive across desktop, tablet & mobile.
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[minmax(0,2fr),minmax(0,1fr)] md:items-stretch">
        {/* Page mock */}
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-brand-border/80 bg-brand-dark/70 p-5 shadow-[0_0_45px_rgba(34,230,255,0.35)]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
        >
          <div className="mb-4 flex items-center justify-between text-xs text-brand-muted">
            <div className="flex items-center gap-1.5">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-red-500/60" />
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
            </div>
            <span className="truncate text-[10px] md:text-xs">
              growth.genexecutive.studio/{selected.label.toLowerCase().replace(/\s+/g, '-') }
            </span>
          </div>

          <div className="space-y-4">
            <div
              className={`relative overflow-hidden rounded-xl bg-linear-to-br ${selected.accent} px-5 py-4`}
            >
              <div className="space-y-1 text-brand-dark">
                <p className="text-[11px] font-semibold uppercase tracking-wide opacity-80">
                  Hero section
                </p>
                <p className="text-lg font-semibold leading-snug">
                  Growth pages wired directly into your AI stack.
                </p>
                <p className="text-xs opacity-85">
                  Every click, scroll and submission syncs to your CRM and triggers the right
                  agent—no brittle zaps.
                </p>
              </div>
              <span className="absolute right-4 top-4 rounded-full bg-white/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-brand-dark">
                {selected.badge}
              </span>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border border-brand-border/80 bg-brand-surface/70 p-3">
                <p className="mb-1 text-xs font-semibold text-brand-muted uppercase tracking-wide">
                  Section
                </p>
                <p className="text-sm font-medium text-brand-light">Offer snapshot</p>
                <p className="mt-1 text-xs text-brand-muted">
                  Crisp bullets clarifying who it’s for, what it does, and why now.
                </p>
              </div>
              <div className="rounded-lg border border-brand-border/80 bg-brand-surface/70 p-3">
                <p className="mb-1 text-xs font-semibold text-brand-muted uppercase tracking-wide">
                  Section
                </p>
                <p className="text-sm font-medium text-brand-light">Social proof</p>
                <p className="mt-1 text-xs text-brand-muted">
                  Logos, quotes, and numbers matched to your ICP’s objections.
                </p>
              </div>
              <div className="rounded-lg border border-brand-border/80 bg-brand-surface/70 p-3">
                <p className="mb-1 text-xs font-semibold text-brand-muted uppercase tracking-wide">
                  Section
                </p>
                <p className="text-sm font-medium text-brand-light">Primary CTA</p>
                <p className="mt-1 text-xs text-brand-muted">
                  Single focused action that connects to your AI scheduling or intake.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Metrics / interactions */}
        <motion.div
          className="flex flex-col justify-between rounded-2xl border border-brand-border/80 bg-brand-dark/70 p-4 md:p-5"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.28 }}
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-brand-light">
              <BarChart3 size={16} className="text-brand-cyan" />
              Live performance snapshot
            </div>
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="rounded-lg border border-brand-border/70 bg-brand-surface/70 px-2 py-3">
                <div className="text-[10px] uppercase tracking-wide text-brand-muted">CTR</div>
                <div className="text-lg font-semibold text-brand-light">4.8%</div>
              </div>
              <div className="rounded-lg border border-brand-border/70 bg-brand-surface/70 px-2 py-3">
                <div className="text-[10px] uppercase tracking-wide text-brand-muted">
                  Opt-in rate
                </div>
                <div className="text-lg font-semibold text-brand-light">31%</div>
              </div>
              <div className="rounded-lg border border-brand-border/70 bg-brand-surface/70 px-2 py-3">
                <div className="text-[10px] uppercase tracking-wide text-brand-muted">A/B wins</div>
                <div className="text-lg font-semibold text-brand-light">7</div>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-xs text-brand-muted">
            <div className="flex items-center gap-2">
              <MousePointer2 size={14} className="text-brand-cyan" />
              <span>
                Click on different cards in the Growth Engines section to preview alternate
                layouts.
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 inline-flex items-center justify-center rounded-full border border-brand-border px-4 py-1.5 text-xs font-medium text-brand-light hover:bg-brand-surface/40"
            >
              Back to page
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPreviewOverlayContent;

