import React from 'react';
import { motion } from 'framer-motion';

const FinalCTA: React.FC = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark to-brand-surface" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,230,255,0.1)_0%,transparent_70%)]" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-brand-light">Let's build your AI-augmented <br/> executive team.</h2>
        <p className="text-xl text-brand-muted mb-10">No hard sell, just an honest look at your current ops and where you can save 20+ hours a week.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-brand-cyan text-brand-dark font-bold text-lg rounded-full shadow-[0_0_30px_rgba(34,230,255,0.4)] hover:shadow-[0_0_50px_rgba(34,230,255,0.6)] transition-shadow"
          >
            Book a Free Strategy Call
          </motion.button>
          
          <button className="px-8 py-4 bg-transparent border border-brand-border text-brand-light font-medium text-lg rounded-full hover:bg-brand-surface/10 transition-colors">
            Send me a sample workflow
          </button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;