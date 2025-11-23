import React from 'react';
import { motion } from 'framer-motion';
import { Search, PenTool, Rocket, Headphones } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: "Discovery & Audit",
    desc: "We analyze your current bottlenecks and map out automation opportunities.",
    time: "Day 1-3"
  },
  {
    icon: PenTool,
    title: "Design & Build",
    desc: "We configure your AI agents, chatbots, and dashboards.",
    time: "Day 4-10"
  },
  {
    icon: Rocket,
    title: "Launch & Train",
    desc: "We deploy the stack and fine-tune models on live data.",
    time: "Day 11-14"
  },
  {
    icon: Headphones,
    title: "Support & Evolve",
    desc: "Ongoing optimization and human executive support handling exceptions.",
    time: "Ongoing"
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-brand-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-brand-light">How It Works</h2>
          <p className="text-brand-muted">From chaos to autopilot in two weeks.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-cyan/20 via-brand-violet/20 to-brand-cyan/20 -z-10" />

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative group"
            >
              {/* Step Number/Icon */}
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-brand-dark dark:bg-brand-dark bg-brand-surface border border-brand-cyan/30 flex items-center justify-center mb-6 group-hover:border-brand-cyan group-hover:shadow-[0_0_20px_rgba(34,230,255,0.2)] transition-all duration-300">
                  <step.icon size={32} className="text-brand-muted group-hover:text-brand-cyan transition-colors" />
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-brand-light">{step.title}</h3>
                <p className="text-sm text-brand-muted leading-relaxed mb-4">{step.desc}</p>
                
                <span className="text-xs font-mono py-1 px-3 rounded-full bg-brand-surface text-brand-violet border border-brand-border">
                  {step.time}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;