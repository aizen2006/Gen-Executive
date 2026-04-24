import React from 'react';
import { motion } from 'framer-motion';
import CalButton from './CalButton';

interface FinalCTAProps {
  onContactClick?: () => void;
}

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const ShineButton: React.FC<ButtonProps> = ({ children }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
      className="group relative overflow-hidden rounded-full bg-linear-to-r from-cyan-500 to-teal-500 shadow-lg shadow-cyan-500/30"
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
      {children}
    </motion.div>
  );
};

const SecondaryButton: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
      onClick={onClick}
      className="rounded-full border border-gray-300 bg-white/70 px-8 py-3 text-sm font-semibold text-gray-700 backdrop-blur transition-colors hover:bg-white dark:border-white/20 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10"
      type="button"
    >
      {children}
    </motion.button>
  );
};

const FinalCTA: React.FC<FinalCTAProps> = ({ onContactClick }) => {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-gray-100 to-white py-24 sm:py-28 dark:from-slate-950 dark:to-slate-900">
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-400/15 sm:h-[520px] sm:w-[520px]" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <h2 className="max-w-3xl text-4xl font-bold leading-tight text-gray-900 dark:text-white sm:text-5xl">
          Let&apos;s build your AI-augmented executive team.
        </h2>
        <p className="mt-4 max-w-2xl text-base text-gray-600 dark:text-slate-300 sm:text-lg">
          No hard sell, just an honest look at your current ops and where you can save 20+ hours a week.
        </p>

        <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
          <ShineButton>
            <CalButton className="relative z-10 inline-flex w-full items-center justify-center px-8 py-3 text-sm font-semibold text-white sm:w-auto" />
          </ShineButton>

          <SecondaryButton onClick={onContactClick}>Contact Us</SecondaryButton>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;