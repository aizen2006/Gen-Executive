import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface MagneticCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  tag?: string;
  badge?: string;
  eyebrow?: string;
  accentClassName?: string;
  ctaLabel?: string;
  onClick?: () => void;
}

const springConfig = { stiffness: 170, damping: 18, mass: 0.7 };

const MagneticCard: React.FC<MagneticCardProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  tag,
  badge,
  eyebrow = 'Growth Engine',
  accentClassName = 'from-brand-cyan/40 via-brand-violet/25 to-pink-500/35',
  ctaLabel = 'View Preview',
  onClick,
}) => {
  const ref = useRef<HTMLButtonElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const glowX = useTransform(smoothX, [-0.5, 0.5], ['35%', '65%']);
  const glowY = useTransform(smoothY, [-0.5, 0.5], ['35%', '65%']);

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();

    if (!rect) {
      return;
    }

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -8, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      className="group relative h-72 overflow-hidden rounded-[1.5rem] border border-brand-border/80 bg-brand-surface/70 text-left shadow-[0_22px_60px_rgba(5,8,22,0.18)] backdrop-blur-sm transition-colors hover:border-brand-light/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/70"
    >
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none absolute rounded-full bg-linear-to-br ${accentClassName} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
        style={{
          left: glowX,
          top: glowY,
          width: '46%',
          height: '46%',
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      <div className="absolute inset-0 rounded-[1.5rem] bg-linear-to-b from-white/10 via-transparent to-black/10 opacity-70" />

      <div className="relative flex h-full flex-col">
        <div className="relative h-40 overflow-hidden border-b border-brand-border/70 bg-brand-dark/75">
          <div className="absolute inset-x-0 top-0 z-10 flex h-8 items-center justify-between border-b border-brand-border/60 bg-black/20 px-3 text-[10px] text-brand-muted backdrop-blur-sm">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-rose-400/70" />
              <span className="h-2 w-2 rounded-full bg-amber-300/70" />
              <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
            </div>
            <span className="rounded-full border border-white/10 bg-black/15 px-2 py-0.5 uppercase tracking-[0.18em]">
              Preview
            </span>
          </div>

          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
          />

          <div className="absolute inset-0 bg-linear-to-t from-brand-dark via-brand-dark/10 to-transparent" />

          {badge && (
            <div className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-brand-dark/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-light backdrop-blur">
              {badge}
            </div>
          )}
        </div>

        <div className="relative flex flex-1 flex-col justify-between px-5 py-4">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-muted">
                  {eyebrow}
                </p>
                <h4 className="mt-2 text-xl font-semibold text-brand-light">{title}</h4>
              </div>
              {tag && (
                <span className="shrink-0 rounded-full border border-brand-border/80 bg-brand-dark/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-muted">
                  {tag}
                </span>
              )}
            </div>

            <p className="max-w-[28ch] text-sm leading-relaxed text-brand-muted">{description}</p>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm font-medium text-brand-light">
            <span className="transition-transform duration-300 group-hover:translate-x-1">{ctaLabel}</span>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-border/80 bg-brand-dark/45 transition-colors duration-300 group-hover:border-brand-cyan/40 group-hover:bg-brand-cyan/10">
              <ArrowUpRight size={16} className="text-brand-cyan" />
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
};

export default MagneticCard;
