import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PlayCircle, ArrowRight, Brain, MessageSquare, CheckCircle, FileText } from 'lucide-react';

const Hero: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Gradients & Particles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-brand-violet/20 rounded-full blur-[100px] animate-blob" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[100px] animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Copy */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ opacity }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-cyan text-xs font-medium uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
            New-age AI + Human Ops Studio
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Executive-level support, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-violet">
              powered by AI agents.
            </span>
          </h1>

          <p className="text-lg text-gray-400 max-w-xl">
            GenExecutive builds custom AI agents, chatbots, and landing pages while handling your admin needs — so you stay in 'strategy mode'.
          </p>

          <ul className="space-y-3">
            {[
              { icon: Brain, text: "AI agents that execute SOPs 24/7" },
              { icon: MessageSquare, text: "Chatbots trained on your brand voice" },
              { icon: FileText, text: "High-converting landing pages" },
              { icon: CheckCircle, text: "Admin support without extra headcount" }
            ].map((item, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                className="flex items-center gap-3 text-gray-300"
              >
                <div className="p-1 rounded bg-brand-cyan/10 text-brand-cyan">
                  <item.icon size={16} />
                </div>
                {item.text}
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-brand-cyan to-brand-cyan/80 text-brand-dark font-bold rounded-lg shadow-lg shadow-brand-cyan/20 flex items-center justify-center gap-2"
            >
              Get Free Workflow Audit <ArrowRight size={18} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-lg flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <PlayCircle size={18} className="text-brand-violet" /> View Sample Dashboards
            </motion.button>
          </div>
        </motion.div>

        {/* Right Column: Visual Command Center (Parallax) */}
        <motion.div 
          initial={{ opacity: 0, y: 50, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ perspective: 1000, y }} // Parallax applied here
          className="relative lg:h-[600px] flex items-center justify-center"
        >
          {/* Main Dashboard Card */}
          <motion.div 
            whileHover={{ rotateY: -5, rotateX: 5 }}
            className="w-full max-w-lg bg-[#0F111A]/90 border border-white/10 rounded-2xl shadow-2xl p-6 backdrop-blur-md relative z-10"
          >
            {/* Mock Header */}
            <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="text-xs text-gray-500">GenExecutive Command Center</div>
            </div>

            {/* Grid Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <div className="text-xs text-gray-400 mb-1">Emails Drafted</div>
                <div className="text-2xl font-bold text-white">1,240</div>
                <div className="text-xs text-green-400 mt-1">+12% this week</div>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <div className="text-xs text-gray-400 mb-1">Meetings Booked</div>
                <div className="text-2xl font-bold text-white">48</div>
                <div className="text-xs text-brand-cyan mt-1">Auto-scheduled</div>
              </div>
            </div>

            {/* Mock Task List */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-gray-500 uppercase">Active Agents</div>
              {[
                { name: "Inbox Zero Agent", status: "Processing", color: "bg-brand-violet" },
                { name: "Lead Qualifier Bot", status: "Active", color: "bg-brand-cyan" },
                { name: "Content Publisher", status: "Idle", color: "bg-yellow-500" }
              ].map((agent, i) => (
                <div key={i} className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${agent.color} animate-pulse`} />
                    <span className="text-sm font-medium">{agent.name}</span>
                  </div>
                  <span className="text-xs text-gray-400">{agent.status}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 bg-[#1A1D2D] p-4 rounded-xl border border-white/10 shadow-xl max-w-[200px] z-20 hidden md:block"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan">
                <MessageSquare size={14} />
              </div>
              <span className="text-xs font-bold">Lead Bot</span>
            </div>
            <p className="text-[10px] text-gray-300">"I've qualified the lead from Linear. Booking a demo for Tuesday at 2 PM."</p>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-5 -left-5 bg-[#1A1D2D] p-4 rounded-xl border border-white/10 shadow-xl z-20 hidden md:block"
          >
             <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                <CheckCircle size={14} />
              </div>
              <div>
                <span className="text-xs font-bold block">Travel Booked</span>
                <span className="text-[10px] text-gray-400">NYC → SFO, Seat 4A</span>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;