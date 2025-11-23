import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, ArrowRight, Mail, Check, Send, MessageSquare, Loader2, Trash2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'init-1',
    text: "Hi there! I noticed you're looking at our Enterprise plan. Would you like a breakdown of the features?",
    sender: 'bot',
    timestamp: Date.now()
  }
];

const DeepDive: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'visitor' | 'internal'>('visitor');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Load chat history from local storage
  useEffect(() => {
    const savedChat = localStorage.getItem('genexec_chat_history');
    if (savedChat) {
      try {
        setMessages(JSON.parse(savedChat));
      } catch (e) {
        setMessages(INITIAL_MESSAGES);
      }
    } else {
      setMessages(INITIAL_MESSAGES);
    }
  }, []);

  // Save chat history on update
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('genexec_chat_history', JSON.stringify(messages));
      // Auto scroll to bottom
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }
  }, [messages]);

  const handleClearChat = () => {
    setMessages(INITIAL_MESSAGES);
    localStorage.removeItem('genexec_chat_history');
  };

  const generateBotResponse = (userText: string) => {
    const text = userText.toLowerCase();
    
    if (text.includes("price") || text.includes("cost") || text.includes("plan")) {
      return "Our plans start at $999/mo for solo founders. The Enterprise plan you're looking at includes unlimited agents and dedicated support. Would you like to book a demo?";
    } else if (text.includes("api") || text.includes("limit") || text.includes("tech")) {
      return "Our Enterprise plan includes unlimited API calls with a dedicated 100ms latency SLA. I can book a technical demo for you to test it?";
    } else if (text.includes("yes") || text.includes("book") || text.includes("demo")) {
      return "Great! I've marked your interest. A human executive will reach out within 15 minutes to confirm a time slot.";
    } else if (text.includes("hello") || text.includes("hi")) {
      return "Hello! How can I help optimize your executive workflow today?";
    } else {
      return "That sounds like a great use case for our AI Agents. I can schedule a workflow audit to see exactly how we can automate that for you.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate network delay / typing
    setTimeout(() => {
      const botResponseText = generateBotResponse(newUserMsg.text);
      const newBotMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: 'bot',
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, newBotMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Logic for the animated workflow
  const workflowVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: { delay: i * 0.3 }
    })
  };

  return (
    <section className="py-24 bg-[#080B1A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-32">
        
        {/* PART 1: AI AGENTS */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded bg-brand-cyan/20 flex items-center justify-center text-brand-cyan"><Database size={18}/></span>
              AI Agents that behave like team members.
            </h3>
            <p className="text-gray-400 text-lg mb-8">
              Forget basic zaps. Our agents read emails, update CRMs, draft documents, and make decisions based on your Standard Operating Procedures (SOPs).
            </p>

            <div className="space-y-4">
              {[
                { title: "Investor Update", flow: "Draft → Review → Send" },
                { title: "Lead Qualification", flow: "Enrich → Score → Book Meeting" },
                { title: "Daily Briefing", flow: "Summarize KPIs → Email Founder" }
              ].map((chip, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 5 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between cursor-default"
                >
                  <span className="font-medium text-white">{chip.title}</span>
                  <span className="text-xs font-mono text-gray-500">{chip.flow}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative h-[500px] bg-[#0F111A] rounded-2xl border border-white/5 p-8 flex flex-col items-center justify-center">
             {/* Simple Vertical Workflow Visualization */}
             <div className="relative z-10 flex flex-col items-center gap-8">
                {/* Input Node */}
                <motion.div custom={0} variants={workflowVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="w-64 p-4 bg-[#1e293b] rounded-lg border border-white/10 text-center relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-[10px] px-2 py-0.5 rounded text-white">Trigger</div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
                        <Mail size={16} /> New Lead Email
                    </div>
                </motion.div>

                <ArrowRight className="rotate-90 text-gray-600" />

                {/* Processing Node (The Agent) */}
                <motion.div custom={1} variants={workflowVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="w-64 p-6 bg-brand-cyan/10 rounded-xl border border-brand-cyan/30 text-center relative shadow-[0_0_30px_rgba(34,230,255,0.1)]">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-cyan text-brand-dark text-[10px] font-bold px-2 py-0.5 rounded">GenExecutive Agent</div>
                    <div className="flex flex-col items-center gap-2 text-sm text-brand-cyan">
                       <div className="w-10 h-10 rounded-full bg-brand-cyan flex items-center justify-center text-brand-dark mb-1">
                          <Database size={20} />
                       </div>
                       Thinking & Executing SOP...
                    </div>
                </motion.div>

                <ArrowRight className="rotate-90 text-gray-600" />

                {/* Output Node */}
                <motion.div custom={2} variants={workflowVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="w-64 p-4 bg-[#1e293b] rounded-lg border border-white/10 text-center relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-[10px] px-2 py-0.5 rounded text-white">Action</div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
                        <Check size={16} /> Added to CRM & Drafted Reply
                    </div>
                </motion.div>
             </div>
             
             {/* Background decorative grid */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] rounded-2xl" />
          </div>
        </div>

        {/* PART 2: AI CHATBOTS */}
        <div className="grid lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
          <div className="order-2 lg:order-1 relative bg-[#0F111A] rounded-2xl border border-white/5 p-6 h-[600px] flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                <div className="flex gap-4">
                    <button 
                        onClick={() => setActiveTab('visitor')}
                        className={`text-sm font-medium transition-colors relative ${activeTab === 'visitor' ? 'text-brand-cyan' : 'text-gray-500'}`}
                    >
                        Live Demo
                        {activeTab === 'visitor' && <motion.div layoutId="underline" className="absolute -bottom-5 left-0 right-0 h-0.5 bg-brand-cyan" />}
                    </button>
                </div>
                <button onClick={handleClearChat} className="text-xs text-gray-600 hover:text-red-400 flex items-center gap-1 transition-colors">
                  <Trash2 size={12} /> Clear Chat
                </button>
            </div>

            {/* Chat Area */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-4 p-2 custom-scrollbar scroll-smooth">
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div 
                      key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}
                    >
                      {msg.sender === 'bot' && (
                        <div className="w-8 h-8 rounded-full bg-brand-cyan flex-shrink-0 flex items-center justify-center text-brand-dark font-bold text-xs">
                           <Database size={14} />
                        </div>
                      )}
                      
                      <div className={`p-3 max-w-[80%] text-sm ${
                        msg.sender === 'user' 
                          ? 'bg-brand-cyan text-brand-dark rounded-tl-xl rounded-bl-xl rounded-br-xl font-medium' 
                          : 'bg-white/10 text-gray-200 rounded-tr-xl rounded-br-xl rounded-bl-xl'
                      }`}>
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                     <div className="w-8 h-8 rounded-full bg-brand-cyan flex-shrink-0 flex items-center justify-center text-brand-dark">
                        <Database size={14} />
                     </div>
                     <div className="bg-white/5 p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl text-gray-400 flex items-center gap-2">
                        <Loader2 size={14} className="animate-spin" />
                        <span className="text-xs">Typing...</span>
                     </div>
                  </motion.div>
                )}
            </div>
             
             {/* Input Area */}
            <div className="mt-4 pt-4 border-t border-white/5 flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about pricing, APIs, or features..."
                  className="flex-1 bg-white/5 h-12 rounded-lg px-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-all"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="w-12 h-12 bg-brand-cyan rounded-lg flex items-center justify-center text-brand-dark hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Send size={18} />
                </button>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded bg-brand-violet/20 flex items-center justify-center text-brand-violet"><MessageSquare size={18}/></span>
              Chatbots that actually sound like your brand.
            </h3>
            <p className="text-gray-400 text-lg mb-8">
              We train models on your internal wiki, past emails, and website content. They handle FAQs, bookings, and triage so you don't have to.
            </p>

             <ul className="space-y-4">
              {[
                "Zero-hallucination guardrails implemented.",
                "Seamless handoff to human executive assistants.",
                "Multi-channel: Web, Slack, WhatsApp, SMS."
              ].map((item, i) => (
                 <li key={i} className="flex items-start gap-3 text-gray-300">
                    <div className="mt-1 w-4 h-4 rounded-full border border-brand-violet flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-brand-violet" />
                    </div>
                    {item}
                 </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};

export default DeepDive;