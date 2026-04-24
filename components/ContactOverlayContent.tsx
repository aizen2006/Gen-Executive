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
  const baseFieldClass =
    'w-full rounded-lg border border-gray-200 bg-white/70 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 backdrop-blur transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-400';

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
      <div className="space-y-7">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.3 }}
          className="space-y-4"
        >
          <h3 className="max-w-xl text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            Let&apos;s map out your next <span className="text-cyan-600">AI-powered growth engine.</span>
          </h3>
          <p className="max-w-lg text-sm text-gray-600 md:text-base">
            Share a bit about your team, your current bottlenecks, and where you want AI and
            human ops to take work off your plate. We’ll respond with a tailored game plan—no
            generic pitch decks.
          </p>
        </motion.div>

        <div className="mt-6 space-y-3">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cyan-100 text-cyan-600">
              <Mail size={16} />
            </span>
            <p className="pt-1 text-sm text-gray-700">
              <span className="font-semibold text-gray-900">Reply within one business day.</span>
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600">
              <PhoneCall size={16} />
            </span>
            <p className="pt-1 text-sm text-gray-700">Optional follow-up call if it&apos;s a fit.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
              <MessageSquare size={16} />
            </span>
            <p className="pt-1 text-sm text-gray-700">
              <span className="font-semibold text-gray-900">No spam</span> - just clear next steps.
            </p>
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <motion.form
        onSubmit={handleSubmit}
        whileHover={{ y: -2 }}
        className="space-y-4 rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-2xl backdrop-blur-xl transition md:p-7"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.3 }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wide text-gray-500" htmlFor="contact-name">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              placeholder="Alex Founder"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={`${baseFieldClass} ${
                errors.name
                  ? 'border-red-400 focus:ring-red-400'
                  : ''
              }`}
            />
            {errors.name && (
              <p id="name-error" className="text-xs text-red-500" role="alert">
                {errors.name}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wide text-gray-500" htmlFor="contact-email">
              Work email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder="you@company.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={`${baseFieldClass} ${
                errors.email
                  ? 'border-red-400 focus:ring-red-400'
                  : ''
              }`}
            />
            {errors.email && (
              <p id="email-error" className="text-xs text-red-500" role="alert">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wide text-gray-500" htmlFor="contact-company">
            Company / Team size
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            placeholder="E.g. Seed-stage SaaS, 8-person team"
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? 'company-error' : undefined}
            className={`${baseFieldClass} ${
              errors.company
                ? 'border-red-400 focus:ring-red-400'
                : ''
            }`}
          />
          {errors.company && (
            <p id="company-error" className="text-xs text-red-500" role="alert">
              {errors.company}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wide text-gray-500" htmlFor="contact-message">
            What do you want to build or streamline?
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            placeholder="e.g. Automating lead gen, dashboards, AI agents..."
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={`${baseFieldClass} resize-none ${
              errors.message
                ? 'border-red-400 focus:ring-red-400'
                : ''
            }`}
          />
          {errors.message && (
            <p id="message-error" className="text-xs text-red-500" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        {errors._form && (
          <p className="text-sm text-red-500" role="alert">
            {errors._form}
          </p>
        )}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative mt-1 inline-flex w-full items-center justify-center overflow-hidden rounded-xl bg-linear-to-r from-cyan-500 to-teal-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:shadow-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            <span className="relative z-10">{isSubmitting ? 'Sending...' : 'Send message ->'}</span>
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
