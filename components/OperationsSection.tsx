import React from 'react';
import { Calendar, Mail } from 'lucide-react';
import MagneticCard from './MagneticCard';

interface OperationsSectionProps {
  onPreviewClick?: (variant: number) => void;
}

const createPreviewImage = ({
  title,
  badge,
  accentStart,
  accentEnd,
}: {
  title: string;
  badge: string;
  accentStart: string;
  accentEnd: string;
}) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#050816" />
          <stop offset="100%" stop-color="#111827" />
        </linearGradient>
        <linearGradient id="hero" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${accentStart}" />
          <stop offset="100%" stop-color="${accentEnd}" />
        </linearGradient>
      </defs>
      <rect width="800" height="560" rx="32" fill="url(#bg)" />
      <rect x="30" y="30" width="740" height="500" rx="28" fill="#0b1220" stroke="rgba(255,255,255,0.10)" />
      <rect x="56" y="56" width="688" height="176" rx="24" fill="url(#hero)" />
      <text x="92" y="118" fill="#071019" font-size="24" font-family="Arial, sans-serif" font-weight="700" letter-spacing="2">GROWTH ENGINE</text>
      <text x="92" y="160" fill="#071019" font-size="44" font-family="Arial, sans-serif" font-weight="700">${title}</text>
      <rect x="526" y="88" width="170" height="42" rx="21" fill="rgba(255,255,255,0.28)" />
      <text x="611" y="114" text-anchor="middle" fill="#071019" font-size="18" font-family="Arial, sans-serif" font-weight="700">${badge}</text>
      <rect x="70" y="274" width="250" height="148" rx="18" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" />
      <rect x="344" y="274" width="176" height="148" rx="18" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" />
      <rect x="544" y="274" width="186" height="148" rx="18" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" />
      <rect x="92" y="302" width="150" height="14" rx="7" fill="rgba(255,255,255,0.16)" />
      <rect x="92" y="330" width="182" height="10" rx="5" fill="rgba(255,255,255,0.10)" />
      <rect x="92" y="350" width="166" height="10" rx="5" fill="rgba(255,255,255,0.10)" />
      <rect x="366" y="302" width="110" height="14" rx="7" fill="rgba(255,255,255,0.16)" />
      <rect x="366" y="332" width="132" height="58" rx="14" fill="rgba(255,255,255,0.08)" />
      <rect x="566" y="302" width="108" height="14" rx="7" fill="rgba(255,255,255,0.16)" />
      <circle cx="601" cy="368" r="32" fill="rgba(255,255,255,0.08)" />
      <path d="M586 370l12 12 20-28" stroke="${accentStart}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      <rect x="70" y="446" width="660" height="46" rx="22" fill="rgba(255,255,255,0.06)" />
      <rect x="90" y="462" width="164" height="12" rx="6" fill="rgba(255,255,255,0.16)" />
      <rect x="620" y="456" width="88" height="24" rx="12" fill="${accentStart}" />
    </svg>
  `)}`;

const growthEngineCards = [
  {
    id: 1,
    title: 'Founder Funnel',
    description: 'Narrative-led landing page with clean instrumentation and direct CRM routing.',
    tag: 'Lead Capture',
    badge: '+28% opt-in rate',
    accentClassName: 'from-brand-cyan/40 via-brand-violet/20 to-brand-cyan/20',
    imageSrc: createPreviewImage({
      title: 'Founder Funnel',
      badge: '+28% opt-in',
      accentStart: '#22E6FF',
      accentEnd: '#A855F7',
    }),
  },
  {
    id: 2,
    title: 'Product Launch',
    description: 'Offer-first page structure designed for demo requests and fast qualification.',
    tag: 'Conversion',
    badge: '+34% demo requests',
    accentClassName: 'from-pink-500/40 via-orange-400/25 to-pink-500/20',
    imageSrc: createPreviewImage({
      title: 'Product Launch',
      badge: '+34% demos',
      accentStart: '#EC4899',
      accentEnd: '#FB923C',
    }),
  },
  {
    id: 3,
    title: 'Waitlist Drop',
    description: 'Launch sequence page with tight CTA framing and analytics-ready event mapping.',
    tag: 'Launch',
    badge: '4.2x list growth',
    accentClassName: 'from-emerald-400/35 via-brand-cyan/20 to-emerald-400/20',
    imageSrc: createPreviewImage({
      title: 'Waitlist Drop',
      badge: '4.2x list',
      accentStart: '#34D399',
      accentEnd: '#22E6FF',
    }),
  },
];

const OperationsSection: React.FC<OperationsSectionProps> = ({ onPreviewClick }) => {
  return (
    <div className="bg-brand-dark">
      {/* Landing Pages Section */}
      <section className="py-20 border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
             <div className="max-w-2xl">
                <div className="text-pink-500 font-bold uppercase text-xs tracking-wider mb-2">Growth Engines</div>
                <h3 className="text-3xl font-bold mb-2 text-brand-light">Designed to Convert, Wired for Data.</h3>
                <p className="text-brand-muted">Launch landing pages that plug directly into your AI agents & CRM.</p>
             </div>
             <div className="mt-4 md:mt-0 text-right">
                <div className="text-2xl font-bold text-brand-light">+28%</div>
                <div className="text-xs text-brand-muted">Avg uplift in lead capture</div>
             </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {growthEngineCards.map((card) => (
              <MagneticCard
                key={card.id}
                title={card.title}
                description={card.description}
                imageSrc={card.imageSrc}
                imageAlt={`${card.title} landing page preview`}
                tag={card.tag}
                badge={card.badge}
                accentClassName={card.accentClassName}
                onClick={() => onPreviewClick?.(card.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Admin Support Section */}
      <section className="py-24 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Illustration */}
            <div className="relative">
                <div className="absolute -left-10 -top-10 w-40 h-40 bg-brand-cyan/20 rounded-full blur-3xl" />
                <div className="bg-linear-to-br from-brand-surface to-brand-dark/80 border border-brand-border rounded-2xl p-8 relative z-10 shadow-xl">
                    <h4 className="text-sm font-bold text-brand-muted mb-6 uppercase tracking-wider">A Founder's Day Timeline</h4>
                    <div className="space-y-6 relative border-l border-brand-border ml-3 pl-8">
                        {/* Timeline Item 1 */}
                        <div className="relative">
                            <span className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-brand-slate border-2 border-brand-muted flex items-center justify-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-muted" />
                            </span>
                            <div className="text-xs text-brand-muted mb-1">08:00 AM</div>
                            <div className="bg-brand-dark/5 dark:bg-white/5 p-3 rounded-lg border border-brand-border">
                                <div className="text-sm font-medium text-brand-light mb-1">Inbox Triage (Done by Agent)</div>
                                <div className="text-xs text-brand-muted">45 emails archived, 3 urgent flagged.</div>
                            </div>
                        </div>

                        {/* Timeline Item 2 */}
                         <div className="relative">
                            <span className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-brand-cyan/20 border-2 border-brand-cyan flex items-center justify-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                            </span>
                            <div className="text-xs text-brand-muted mb-1">10:00 AM</div>
                         <div className="bg-linear-to-br from-brand-cyan/10 to-brand-cyan/5 p-3 rounded-lg border border-brand-cyan/20">
                                <div className="text-sm font-medium text-brand-cyan mb-1">Strategy Meeting Prep (Done by Human Exec)</div>
                                <div className="text-xs text-brand-cyan/70">Briefing doc & competitor analysis ready.</div>
                            </div>
                        </div>
                        
                         {/* Timeline Item 3 */}
                         <div className="relative">
                            <span className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-brand-slate border-2 border-brand-muted flex items-center justify-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-muted" />
                            </span>
                            <div className="text-xs text-brand-muted mb-1">02:00 PM</div>
                            <div className="bg-brand-dark/5 dark:bg-white/5 p-3 rounded-lg border border-brand-border">
                                <div className="text-sm font-medium text-brand-light mb-1">Travel Itinerary (Done by Agent)</div>
                                <div className="text-xs text-brand-muted">Flights & Hotel booked for Summit.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Copy */}
            <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-brand-light">Admin & Executive Support that <span className="text-brand-cyan">understands priority</span>.</h3>
                <p className="text-brand-muted text-lg mb-8">
                    Stop firefighting. We handle the noise so you can focus on the signal. A hybrid approach of AI speed and human judgment.
                </p>

                <div className="grid sm:grid-cols-2 gap-6">
                    <div className="bg-brand-surface p-4 rounded-xl border border-brand-border">
                        <Mail className="text-brand-violet mb-3" size={24} />
                        <h5 className="font-bold mb-1 text-brand-light">Inbox Zero</h5>
                        <p className="text-sm text-brand-muted">Aggressive filtering and drafting based on your tone.</p>
                    </div>
                    <div className="bg-brand-surface p-4 rounded-xl border border-brand-border">
                         <Calendar className="text-brand-cyan mb-3" size={24} />
                        <h5 className="font-bold mb-1 text-brand-light">Calendar Tetris</h5>
                        <p className="text-sm text-brand-muted">Smart scheduling that protects your deep work time.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default OperationsSection;
