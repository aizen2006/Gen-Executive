import React from 'react';
import { motion } from 'framer-motion';
import { Bot, MessageCircle, Layout, Calendar, Briefcase, Layers } from 'lucide-react';

const solutions = [
  {
    icon: Bot,
    title: "AI Agents",
    desc: "Autonomous workers that handle repetitive workflows.",
    accent: "border-brand-cyan",
    color: "text-brand-cyan",
    tag: "Popular"
  },
  {
    icon: MessageCircle,
    title: "AI Chatbots",
    desc: "24/7 support & lead capture trained on your data.",
    accent: "border-brand-violet",
    color: "text-brand-violet",
    tag: "Essential"
  },
  {
    icon: Layout,
    title: "Landing Pages",
    desc: "High-performance pages integrated with your CRM.",
    accent: "border-pink-500",
    color: "text-pink-500",
    tag: "Conversion"
  },
  {
    icon: Calendar,
    title: "Admin Support",
    desc: "Inbox triage, scheduling, and travel management.",
    accent: "border-emerald-500",
    color: "text-emerald-500",
    tag: null
  },
  {
    icon: Briefcase,
    title: "Executive Support",
    desc: "Strategic research, meeting prep, and operational help.",
    accent: "border-orange-500",
    color: "text-orange-500",
    tag: null
  },
  {
    icon: Layers,
    title: "Custom Stack",
    desc: "A bespoke mix of AI and human operations.",
    accent: "border-white",
    color: "text-white",
    tag: "Enterprise"
  }
];

const SolutionsOverview: React.FC = () => {
  return (
    <section id="solutions" className="py-24 relative bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-brand-cyan text-sm font-semibold tracking-wider uppercase mb-2 block">What We Do</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">One partner for all your <br/> executive operations.</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">We combine advanced AI automation with human expertise to create a seamless operational backbone for your business.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative bg-[#0F111A] p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors overflow-hidden"
            >
              <div className={`absolute top-0 left-0 w-full h-1 ${item.accent} opacity-50 group-hover:opacity-100 transition-opacity`} />
              
              <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-lg bg-white/5 ${item.color}`}>
                  <item.icon size={24} />
                </div>
                {item.tag && (
                  <span className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/10">
                    {item.tag}
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">{item.desc}</p>
              
              <a href="#use-cases" className="inline-flex items-center text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                See use cases <span className="ml-1">→</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsOverview;