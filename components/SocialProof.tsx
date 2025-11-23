import React from 'react';
import { motion } from 'framer-motion';

const SocialProof: React.FC = () => {
  // Placeholder logos for demo purposes (using text/shapes for clean code)
  const logos = [
    "TechFlow", "Vertex", "Lumina", "ScaleUp", "NovaLabs", "EchoSystems"
  ];

  return (
    <section className="py-10 border-y border-brand-cyan/10 bg-black/20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm text-gray-500 mb-8 font-medium">Trusted by lean teams, solo founders, and fast-moving agencies.</p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
          {logos.map((logo, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.1, opacity: 1, color: '#fff' }}
              className="text-xl md:text-2xl font-bold font-sans tracking-tight text-gray-600 cursor-default select-none transition-colors duration-300"
            >
              {logo}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;