import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';

const caseStudies = [
  {
    id: 1,
    client: "TechFlow",
    industry: "SaaS",
    problem: "Drowning in support tickets",
    solution: "Deployed AI triage bot + Human escalation",
    result: "80% Reduction in response time",
    quote: "It feels like we hired 5 senior support agents overnight.",
    color: "from-blue-500/20 to-cyan-500/20",
    accent: "text-blue-400"
  },
  {
    id: 2,
    client: "Vertex",
    industry: "Marketing Agency",
    problem: "Scaling client reporting was impossible",
    solution: "Automated Data Agents",
    result: "Saved 40+ hours/week per account manager",
    quote: "Our team can finally focus on strategy instead of spreadsheets.",
    color: "from-purple-500/20 to-pink-500/20",
    accent: "text-purple-400"
  },
  {
    id: 3,
    client: "Lumina",
    industry: "E-Commerce",
    problem: "Missed sales opportunities off-hours",
    solution: "24/7 Sales Chatbot",
    result: "+25% uplift in conversion",
    quote: "The bot closes deals while our team sleeps. Incredible ROI.",
    color: "from-amber-500/20 to-orange-500/20",
    accent: "text-amber-400"
  }
];

const Results: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = caseStudies.length - 1;
      if (nextIndex >= caseStudies.length) nextIndex = 0;
      return nextIndex;
    });
  };

  return (
    <section id="results" className="py-24 bg-brand-dark border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-16">Results our clients see in 60 days</h2>
        
        {/* KPI Row */}
        <div className="grid md:grid-cols-3 gap-12 mb-24">
          {[
            { value: "3x", label: "Faster Lead Response" },
            { value: "40%", label: "Reduction in Admin Time" },
            { value: "+25%", label: "Uplift in Conversion" }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, type: "spring" }}
              className="relative"
            >
              <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 mb-2">
                {stat.value}
              </div>
              <div className="text-lg text-brand-cyan">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Case Study Carousel */}
        <div className="relative h-[400px] max-w-4xl mx-auto">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1);
                    }
                  }}
                  className="absolute w-full h-full cursor-grab active:cursor-grabbing"
                >
                    <div className="h-full bg-[#0F111A] border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col justify-center text-left">
                        {/* Background Decoration */}
                        <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${caseStudies[currentIndex].color} blur-[80px] opacity-30 rounded-full pointer-events-none`} />

                        <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8 h-full">
                            {/* Left Side: Info */}
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${caseStudies[currentIndex].accent}`}>
                                        Case Study 0{caseStudies[currentIndex].id}
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-2">{caseStudies[currentIndex].client}</h3>
                                    <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-xs text-gray-400 mb-6 border border-white/5">
                                        {caseStudies[currentIndex].industry}
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <div className="text-xs text-gray-500 uppercase font-semibold">Challenge</div>
                                            <div className="text-gray-300">{caseStudies[currentIndex].problem}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 uppercase font-semibold">Solution</div>
                                            <div className="text-white font-medium">{caseStudies[currentIndex].solution}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 pt-6 border-t border-white/5">
                                     <div className="text-4xl font-bold text-white">{caseStudies[currentIndex].result}</div>
                                </div>
                            </div>

                            {/* Right Side: Quote */}
                            <div className="flex-1 flex items-center justify-center bg-black/20 rounded-xl p-6 relative">
                                <Quote className="absolute top-4 left-4 text-white/10 w-12 h-12" />
                                <p className="text-xl italic text-gray-300 font-light relative z-10 text-center">
                                    "{caseStudies[currentIndex].quote}"
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button 
                className="absolute top-1/2 -left-12 md:-left-20 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors border border-white/10 z-20"
                onClick={() => paginate(-1)}
            >
                <ArrowLeft size={20} />
            </button>
            <button 
                className="absolute top-1/2 -right-12 md:-right-20 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors border border-white/10 z-20"
                onClick={() => paginate(1)}
            >
                <ArrowRight size={20} />
            </button>

            {/* Pagination Dots */}
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2">
                {caseStudies.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            setDirection(idx > currentIndex ? 1 : -1);
                            setCurrentIndex(idx);
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-brand-cyan w-6' : 'bg-gray-600'}`}
                    />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Results;