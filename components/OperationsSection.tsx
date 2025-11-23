import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Calendar, Mail, TrendingUp } from 'lucide-react';

const OperationsSection: React.FC = () => {
  return (
    <div className="bg-brand-dark">
      {/* Landing Pages Section */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
             <div className="max-w-2xl">
                <div className="text-pink-500 font-bold uppercase text-xs tracking-wider mb-2">Growth Engines</div>
                <h3 className="text-3xl font-bold mb-2">Designed to Convert, Wired for Data.</h3>
                <p className="text-gray-400">Launch landing pages that plug directly into your AI agents & CRM.</p>
             </div>
             <div className="mt-4 md:mt-0 text-right">
                <div className="text-2xl font-bold text-white">+28%</div>
                <div className="text-xs text-gray-500">Avg uplift in lead capture</div>
             </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             {/* Interactive Cards simulating landing page previews */}
             {[1, 2, 3].map((item) => (
                <motion.div 
                    key={item}
                    whileHover={{ y: -10 }}
                    className="group relative h-64 bg-[#1e293b] rounded-xl overflow-hidden border border-white/10 cursor-pointer"
                >
                    {/* Mock Browser Header */}
                    <div className="h-6 bg-black/20 flex items-center px-3 space-x-1">
                        <div className="w-2 h-2 rounded-full bg-red-500/50" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                        <div className="w-2 h-2 rounded-full bg-green-500/50" />
                    </div>
                    {/* Mock Page Content that scrolls on hover */}
                    <div className="absolute top-6 left-0 right-0 bottom-0 bg-gray-800 transition-all duration-[2s] ease-linear group-hover:bg-gray-700">
                         {/* Abstract UI Blocks */}
                         <div className="w-full h-32 bg-gradient-to-br from-gray-700 to-gray-600 mb-2" />
                         <div className="mx-4 h-4 w-3/4 bg-white/10 rounded mb-2" />
                         <div className="mx-4 h-4 w-1/2 bg-white/10 rounded mb-8" />
                         <div className="grid grid-cols-2 gap-2 px-4">
                             <div className="h-20 bg-white/5 rounded" />
                             <div className="h-20 bg-white/5 rounded" />
                         </div>
                    </div>
                    
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="bg-black/80 text-white text-xs px-2 py-1 rounded backdrop-blur">View Preview</span>
                    </div>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Admin Support Section */}
      <section className="py-24 bg-[#0A0D18]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Illustration */}
            <div className="relative">
                <div className="absolute -left-10 -top-10 w-40 h-40 bg-brand-cyan/20 rounded-full blur-3xl" />
                <div className="bg-[#131620] border border-white/5 rounded-2xl p-8 relative z-10">
                    <h4 className="text-sm font-bold text-gray-500 mb-6 uppercase tracking-wider">A Founder's Day Timeline</h4>
                    <div className="space-y-6 relative border-l border-white/10 ml-3 pl-8">
                        {/* Timeline Item 1 */}
                        <div className="relative">
                            <span className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-gray-800 border-2 border-gray-600 flex items-center justify-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                            </span>
                            <div className="text-xs text-gray-500 mb-1">08:00 AM</div>
                            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                                <div className="text-sm font-medium text-white mb-1">Inbox Triage (Done by Agent)</div>
                                <div className="text-xs text-gray-400">45 emails archived, 3 urgent flagged.</div>
                            </div>
                        </div>

                        {/* Timeline Item 2 */}
                         <div className="relative">
                            <span className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-brand-cyan/20 border-2 border-brand-cyan flex items-center justify-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                            </span>
                            <div className="text-xs text-gray-500 mb-1">10:00 AM</div>
                             <div className="bg-brand-cyan/10 p-3 rounded-lg border border-brand-cyan/20">
                                <div className="text-sm font-medium text-brand-cyan mb-1">Strategy Meeting Prep (Done by Human Exec)</div>
                                <div className="text-xs text-brand-cyan/70">Briefing doc & competitor analysis ready.</div>
                            </div>
                        </div>
                        
                         {/* Timeline Item 3 */}
                         <div className="relative">
                            <span className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-gray-800 border-2 border-gray-600 flex items-center justify-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                            </span>
                            <div className="text-xs text-gray-500 mb-1">02:00 PM</div>
                            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                                <div className="text-sm font-medium text-white mb-1">Travel Itinerary (Done by Agent)</div>
                                <div className="text-xs text-gray-400">Flights & Hotel booked for Summit.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Copy */}
            <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6">Admin & Executive Support that <span className="text-brand-cyan">understands priority</span>.</h3>
                <p className="text-gray-400 text-lg mb-8">
                    Stop firefighting. We handle the noise so you can focus on the signal. A hybrid approach of AI speed and human judgment.
                </p>

                <div className="grid sm:grid-cols-2 gap-6">
                    <div className="bg-white/5 p-4 rounded-xl">
                        <Mail className="text-brand-violet mb-3" size={24} />
                        <h5 className="font-bold mb-1">Inbox Zero</h5>
                        <p className="text-sm text-gray-400">Aggressive filtering and drafting based on your tone.</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl">
                         <Calendar className="text-brand-cyan mb-3" size={24} />
                        <h5 className="font-bold mb-1">Calendar Tetris</h5>
                        <p className="text-sm text-gray-400">Smart scheduling that protects your deep work time.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default OperationsSection;