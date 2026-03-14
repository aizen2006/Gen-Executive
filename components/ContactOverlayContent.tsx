import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, PhoneCall, MessageSquare } from 'lucide-react';
import contact from '../api/contact';

interface ContactOverlayContentProps {
  onClose?: () => void;
}

const ContactOverlayContent: React.FC<ContactOverlayContentProps> = ({ onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    await contact({
      name: event.target.name.value,
      email: event.target.email.value,
      company: event.target.company.value,
      message: event.target.message.value,
    });
    setTimeout(() => {
      setIsSubmitting(false);
      if (onClose) {
        onClose();
      }
    }, 600);
  };

  return (
    <div className="grid gap-8 md:grid-cols-[1.1fr,1.3fr] md:items-start">
      {/* Left: Copy */}
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.3 }}
          className="space-y-3"
        >
          <h3 className="text-2xl md:text-3xl font-semibold leading-tight text-brand-light">
            Let’s map out your next growth engine.
          </h3>
          <p className="text-sm md:text-base text-brand-muted">
            Share a bit about your team, your current bottlenecks, and where you want AI and
            human ops to take work off your plate. We’ll respond with a tailored game plan—no
            generic pitch decks.
          </p>
        </motion.div>

        <div className="grid gap-3 text-sm text-brand-muted">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-cyan/10 text-brand-cyan">
              <Mail size={16} />
            </span>
            <span>Get a reply within one business day.</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-violet/10 text-brand-violet">
              <PhoneCall size={16} />
            </span>
            <span>Optional follow-up call if it’s a fit.</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
              <MessageSquare size={16} />
            </span>
            <span>No spam, ever—just clear next steps.</span>
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl bg-brand-dark/60 border border-brand-border/80 p-5 md:p-6 shadow-[0_0_40px_rgba(34,230,255,0.15)]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.3 }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wide text-brand-muted">
              Name
            </label>
            <input
              type="text"
              required
              placeholder="Alex Founder"
              className="w-full rounded-lg border border-brand-border bg-brand-surface/60 px-3 py-2 text-sm text-brand-light placeholder:text-brand-muted/60 focus:border-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wide text-brand-muted">
              Work email
            </label>
            <input
              type="email"
              required
              placeholder="you@company.com"
              className="w-full rounded-lg border border-brand-border bg-brand-surface/60 px-3 py-2 text-sm text-brand-light placeholder:text-brand-muted/60 focus:border-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium uppercase tracking-wide text-brand-muted">
            Company / Team size
          </label>
          <input
            type="text"
            placeholder="E.g. Seed-stage SaaS, 8-person team"
            className="w-full rounded-lg border border-brand-border bg-brand-surface/60 px-3 py-2 text-sm text-brand-light placeholder:text-brand-muted/60 focus:border-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium uppercase tracking-wide text-brand-muted">
            What do you want to build or streamline?
          </label>
          <textarea
            required
            rows={4}
            placeholder="Share your top 2–3 workflows you’d like AI agents, landing pages, or exec support to handle."
            className="w-full rounded-lg border border-brand-border bg-brand-surface/60 px-3 py-2 text-sm text-brand-light placeholder:text-brand-muted/60 focus:border-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan resize-none"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-1">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-full bg-brand-cyan px-6 py-2.5 text-sm font-semibold text-brand-dark shadow-[0_0_30px_rgba(34,230,255,0.5)] transition hover:shadow-[0_0_45px_rgba(34,230,255,0.8)] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending…' : 'Send message'}
          </button>
          <p className="text-[11px] text-brand-muted">
            By submitting, you agree to hear from us about GenExecutive services. No noise, just
            signal.
          </p>
        </div>
      </motion.form>
    </div>
  );
};

export default ContactOverlayContent;

