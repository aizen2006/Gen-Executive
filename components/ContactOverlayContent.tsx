import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, PhoneCall, MessageSquare } from 'lucide-react';
import contact from '../lib/contactClient';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(120, 'Name is too long'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
  company: z.string().max(200, 'Company is too long').optional().or(z.literal('')),
  message: z.string().min(1, 'Message is required').max(2000, 'Message is too long'),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactOverlayContentProps {
  onClose?: () => void;
}

type FormErrors = Partial<Record<keyof ContactFormData, string>> & { _form?: string };

const ContactOverlayContent: React.FC<ContactOverlayContentProps> = ({ onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const raw: ContactFormData = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem('email') as HTMLInputElement).value.trim(),
      company: (form.elements.namedItem('company') as HTMLInputElement).value.trim(),
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim(),
    };

    const result = contactSchema.safeParse(raw);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof ContactFormData;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      await contact({
        name: result.data.name,
        email: result.data.email,
        company: result.data.company ?? '',
        message: result.data.message,
      });
      setTimeout(() => {
        setIsSubmitting(false);
        if (onClose) onClose();
      }, 600);
    } catch {
      setErrors({ _form: 'Something went wrong. Please try again.' });
      setIsSubmitting(false);
    }
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
            <label className="text-xs font-medium uppercase tracking-wide text-brand-muted" htmlFor="contact-name">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              placeholder="Alex Founder"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={`w-full rounded-lg border bg-brand-surface/60 px-3 py-2 text-sm text-brand-light placeholder:text-brand-muted/60 focus:outline-none focus:ring-1 ${
                errors.name
                  ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500'
                  : 'border-brand-border focus:border-brand-cyan focus:ring-brand-cyan'
              }`}
            />
            {errors.name && (
              <p id="name-error" className="text-xs text-red-400" role="alert">
                {errors.name}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wide text-brand-muted" htmlFor="contact-email">
              Work email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder="you@company.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={`w-full rounded-lg border bg-brand-surface/60 px-3 py-2 text-sm text-brand-light placeholder:text-brand-muted/60 focus:outline-none focus:ring-1 ${
                errors.email
                  ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500'
                  : 'border-brand-border focus:border-brand-cyan focus:ring-brand-cyan'
              }`}
            />
            {errors.email && (
              <p id="email-error" className="text-xs text-red-400" role="alert">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium uppercase tracking-wide text-brand-muted" htmlFor="contact-company">
            Company / Team size
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            placeholder="E.g. Seed-stage SaaS, 8-person team"
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? 'company-error' : undefined}
            className={`w-full rounded-lg border bg-brand-surface/60 px-3 py-2 text-sm text-brand-light placeholder:text-brand-muted/60 focus:outline-none focus:ring-1 ${
              errors.company
                ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500'
                : 'border-brand-border focus:border-brand-cyan focus:ring-brand-cyan'
            }`}
          />
          {errors.company && (
            <p id="company-error" className="text-xs text-red-400" role="alert">
              {errors.company}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium uppercase tracking-wide text-brand-muted" htmlFor="contact-message">
            What do you want to build or streamline?
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            placeholder="Share your top 2–3 workflows you'd like AI agents, landing pages, or exec support to handle."
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={`w-full rounded-lg border bg-brand-surface/60 px-3 py-2 text-sm text-brand-light placeholder:text-brand-muted/60 focus:outline-none focus:ring-1 resize-none ${
              errors.message
                ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500'
                : 'border-brand-border focus:border-brand-cyan focus:ring-brand-cyan'
            }`}
          />
          {errors.message && (
            <p id="message-error" className="text-xs text-red-400" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        {errors._form && (
          <p className="text-sm text-red-400" role="alert">
            {errors._form}
          </p>
        )}
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
