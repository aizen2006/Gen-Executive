import React from 'react';
import { motion } from 'framer-motion';

const UseCases: React.FC = () => {
  const personas = [
    {
      role: "Solo Founder",
      from: "Drowning in admin, support tickets, and scheduling.",
      to: "Focusing 100% on product & sales while AI handles ops.",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      role: "Agencies",
      from: "Hiring expensive VAs for every new client account.",
      to: "Deploying white-labeled AI agents for instant client support.",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      role: "Fractional Execs",
      from: "Manually compiling reports and chasing updates.",
      to: "AI agents automating data gathering and reporting.",
      gradient: "from-amber-500/20 to-orange-500/20"
    }
  ];

  return (
    <section id="use-cases" className="py-20 bg-[#080B1A]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Built for modern operators.</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {personas.map((p, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-[#0F111A] border border-white/5 rounded-2xl p-8 relative overflow-hidden group"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${p.gradient} blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity`} />
              
              <h3 className="text-xl font-bold mb-6 relative z-10">{p.role}</h3>
              
              <div className="space-y-4 relative z-10">
                <div>
                  <div className="text-xs text-red-400 font-semibold uppercase mb-1">From</div>
                  <p className="text-sm text-gray-400">{p.from}</p>
                </div>
                <div className="h-px bg-white/10 w-full" />
                <div>
                  <div className="text-xs text-green-400 font-semibold uppercase mb-1">To</div>
                  <p className="text-sm text-gray-200">{p.to}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;