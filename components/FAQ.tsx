import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const questions = [
  { q: "How long until I see value?", a: "Most clients see their first agent running within 3-5 days of the audit." },
  { q: "Do you replace my existing team?", a: "No. We augment them. We handle the repetitive admin tasks so your humans can do high-value work." },
  { q: "How secure is my data?", a: "We use enterprise-grade encryption. Your data is never used to train public models." },
  { q: "What tools do you work with?", a: "We integrate with Slack, Gmail, Outlook, HubSpot, Notion, Airtable, and 50+ other major tools." }
];

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-brand-dark">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Questions, answered.</h2>
        
        <div className="space-y-4">
          {questions.map((item, idx) => (
            <div key={idx} className="border border-white/10 rounded-lg bg-[#0F111A] overflow-hidden">
              <button
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-medium text-lg">{item.q}</span>
                {activeIndex === idx ? <Minus className="text-brand-cyan" /> : <Plus className="text-gray-500" />}
              </button>
              
              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-gray-400 leading-relaxed">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;