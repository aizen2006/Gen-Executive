import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: "Starter",
      for: "Solo Founders",
      price: "$399",
      period: "/mo",
      features: ["1 AI Agent Workflow", "Basic Chatbot Widget", "1 Landing Page", "5 hrs Admin Support"],
      cta: "Start Lean",
      highlight: false
    },
    {
      name: "Growth",
      for: "Small Teams",
      price: "$999",
      period: "/mo",
      features: ["3 AI Agent Workflows", "Advanced Chatbot (Custom Data)", "3 Landing Pages", "15 hrs Exec Support", "Weekly Strategy Sync"],
      cta: "Scale Up",
      highlight: true
    },
    {
      name: "Custom",
      for: "Scaleups & Agencies",
      price: "Talk to us",
      period: "",
      features: ["Unlimited AI Agents", "Full Operations Audit", "Dedicated Executive Assistant", "Custom Integrations", "SLA Support"],
      cta: "Contact Sales",
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-[#050816]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Simple, scalable plans.</h2>
          <p className="text-gray-400">Start lean, scale as your operations grow.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className={`relative p-8 rounded-2xl border ${plan.highlight ? 'bg-[#0F111A] border-brand-cyan shadow-[0_0_30px_rgba(34,230,255,0.1)]' : 'bg-transparent border-white/10'}`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-cyan text-brand-dark text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-gray-500 mb-6">{plan.for}</p>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-500 ml-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-sm text-gray-300">
                    <Check size={16} className={`mt-0.5 flex-shrink-0 ${plan.highlight ? 'text-brand-cyan' : 'text-gray-500'}`} />
                    {feat}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 rounded-lg font-bold text-sm transition-all ${
                plan.highlight 
                  ? 'bg-brand-cyan text-brand-dark hover:bg-white' 
                  : 'bg-white/5 text-white hover:bg-white/10'
              }`}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;