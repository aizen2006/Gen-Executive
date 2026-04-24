import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Play, Quote } from 'lucide-react';

type Testimonial =
  | {
      type: 'text';
      name: string;
      role: string;
      company: string;
      content: string;
      outcome: string;
      accent: string;
    }
  | {
      type: 'video';
      name: string;
      role: string;
      company: string;
      videoUrl: string;
      thumbnail: string;
      outcome: string;
      accent: string;
    };

const testimonials: Testimonial[] = [
  {
    type: 'text',
    name: 'John Doe',
    role: 'Founder',
    company: 'TechFlow',
    content: 'This product completely changed how we operate. Lead response became instant, and my calendar stopped owning me.',
    outcome: 'Saved 18+ hours a week',
    accent: 'from-cyan-500/20 to-sky-500/20',
  },
  {
    type: 'video',
    name: 'Sarah Lee',
    role: 'Creative Director',
    company: 'Vertex Studio',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    outcome: 'Client response time down 72%',
    accent: 'from-brand-violet/25 to-brand-cyan/20',
  },
  {
    type: 'text',
    name: 'Amit Sharma',
    role: 'Operator',
    company: 'Lumina Commerce',
    content: 'The handoff between AI agents and human support feels disciplined. It does not break when the work gets messy.',
    outcome: 'Support backlog cleared in 2 weeks',
    accent: 'from-amber-500/20 to-orange-500/20',
  },
  {
    type: 'text',
    name: 'Priya Singh',
    role: 'Marketing Head',
    company: 'NovaLabs',
    content: 'We stopped stitching tools together manually. The system now qualifies leads, books calls, and keeps follow-up moving.',
    outcome: '+24% conversion uplift',
    accent: 'from-fuchsia-500/20 to-violet-500/20',
  },
];

const getWrappedIndex = (index: number) => {
  const length = testimonials.length;
  return (index + length) % length;
};

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const prev = () => setActiveIndex((current) => getWrappedIndex(current - 1));
  const next = () => setActiveIndex((current) => getWrappedIndex(current + 1));

  useEffect(() => {
    if (isVideoPlaying) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => getWrappedIndex(current + 1));
    }, 5500);

    return () => window.clearInterval(interval);
  }, [isVideoPlaying]);

  const visibleIndices = [
    getWrappedIndex(activeIndex - 1),
    getWrappedIndex(activeIndex),
    getWrappedIndex(activeIndex + 1),
  ];

  return (
    <section id="testimonials" className="py-24 bg-brand-dark border-t border-brand-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-border bg-brand-surface text-xs uppercase tracking-[0.2em] text-brand-cyan mb-6">
            Client Proof
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-light mb-5">
            What teams say once the system is live
          </h2>
          <p className="text-base md:text-lg text-brand-muted">
            Social proof belongs here, after the use cases and before the hard metrics. These are operator-level reactions to the workflow once it starts carrying real load.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-16 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-cyan/10 blur-3xl pointer-events-none" />
          <div className="absolute right-1/4 top-8 h-52 w-52 rounded-full bg-brand-violet/10 blur-3xl pointer-events-none" />

          <div className="relative h-[420px] sm:h-[460px] md:h-[420px]">
            {visibleIndices.map((itemIndex, positionIndex) => {
              const item = testimonials[itemIndex];
              const position = positionIndex === 0 ? 'left' : positionIndex === 2 ? 'right' : 'center';

              return (
                <TestimonialCard
                  key={`${item.name}-${position}`}
                  item={item}
                  isCenter={position === 'center'}
                  position={position}
                  onNext={next}
                  onPrev={prev}
                  setIsVideoPlaying={setIsVideoPlaying}
                />
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              type="button"
              onClick={prev}
              aria-label="Show previous testimonial"
              className="w-12 h-12 rounded-full border border-brand-border bg-brand-surface text-brand-light hover:border-brand-cyan hover:text-brand-cyan transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mx-auto" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((item, index) => (
                <button
                  key={`${item.name}-dot`}
                  type="button"
                  aria-label={`Go to testimonial ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'w-8 bg-brand-cyan' : 'w-2 bg-brand-muted/50 hover:bg-brand-muted'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Show next testimonial"
              className="w-12 h-12 rounded-full border border-brand-border bg-brand-surface text-brand-light hover:border-brand-cyan hover:text-brand-cyan transition-colors"
            >
              <ArrowRight className="w-5 h-5 mx-auto" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

type CardPosition = 'left' | 'center' | 'right';

interface TestimonialCardProps {
  item: Testimonial;
  isCenter: boolean;
  position: CardPosition;
  onNext: () => void;
  onPrev: () => void;
  setIsVideoPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  item,
  isCenter,
  position,
  onNext,
  onPrev,
  setIsVideoPlaying,
}) => {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (!isCenter && play) {
      setPlay(false);
    }
  }, [isCenter, play]);

  useEffect(() => {
    setIsVideoPlaying(isCenter && play);

    return () => {
      setIsVideoPlaying(false);
    };
  }, [isCenter, play, setIsVideoPlaying]);

  const positionMap: Record<CardPosition, string> = {
    left: 'md:-translate-x-[34%]',
    center: 'md:translate-x-0',
    right: 'md:translate-x-[34%]',
  };

  return (
    <motion.article
      drag={isCenter ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        if (info.offset.x < -60) {
          onNext();
        }
        if (info.offset.x > 60) {
          onPrev();
        }
      }}
      initial={false}
      animate={{
        scale: isCenter ? 1 : 0.9,
        opacity: isCenter ? 1 : 0.42,
        filter: isCenter ? 'blur(0px)' : 'blur(1.5px)',
      }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 26,
      }}
      className={`absolute inset-x-0 top-0 mx-auto w-full max-w-88 sm:max-w-100 md:max-w-124 ${
        isCenter ? 'z-20' : 'z-10 hidden md:block'
      } ${positionMap[position]}`}
    >
      <div className="relative min-h-[320px] md:min-h-[360px] rounded-[28px] border border-brand-border bg-brand-surface/95 p-5 md:p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl overflow-hidden">
        <div className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-br ${item.accent} opacity-70 pointer-events-none`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)] pointer-events-none" />

        <div className="relative z-10 flex h-full flex-col justify-between">
          {item.type === 'video' ? (
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] uppercase tracking-[0.2em] text-brand-cyan">Video testimonial</span>
                <span className="text-xs text-brand-muted">{item.outcome}</span>
              </div>

              {!play ? (
                <button
                  type="button"
                  onClick={() => setPlay(true)}
                  className="relative group w-full h-[210px] rounded-2xl overflow-hidden border border-brand-border bg-brand-dark/40 text-left"
                >
                  <img
                    src={item.thumbnail}
                    alt={`${item.name} testimonial thumbnail`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center gap-3 rounded-full border border-white/15 bg-black/55 px-5 py-3 text-white backdrop-blur-md">
                      <Play className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">Play testimonial</span>
                    </div>
                  </div>
                </button>
              ) : (
                <video
                  src={item.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-[210px] rounded-2xl object-cover border border-brand-border bg-black"
                />
              )}

              <div className="mt-5 pt-5 border-t border-brand-border">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-brand-light">{item.name}</h3>
                    <p className="text-sm text-brand-muted">{item.role}, {item.company}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs uppercase tracking-[0.18em] text-brand-muted mb-1">Impact</div>
                    <div className="text-sm font-medium text-brand-light">{item.outcome}</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-brand-cyan">Operator feedback</span>
                  <span className="text-xs text-brand-muted">{item.outcome}</span>
                </div>

                <Quote className="w-10 h-10 text-brand-muted/25 mb-5" />
                <p className="text-base md:text-lg leading-8 text-brand-light">
                  "{item.content}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-brand-border">
                <h3 className="text-lg font-semibold text-brand-light">{item.name}</h3>
                <p className="text-sm text-brand-muted">{item.role}, {item.company}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default Testimonials;
