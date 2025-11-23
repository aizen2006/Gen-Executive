import React from 'react';
import { Zap, Twitter, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-surface border-t border-brand-border py-12 text-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded bg-brand-cyan text-brand-dark flex items-center justify-center">
                  <Zap size={14} fill="currentColor" />
                </div>
                <span className="font-bold text-lg text-brand-light">GenExecutive</span>
            </div>
            <p className="text-brand-muted leading-relaxed">
              We build the operational backbone for the next generation of fast-moving companies.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-brand-light mb-4">Solutions</h4>
            <ul className="space-y-2 text-brand-muted">
              <li><a href="#" className="hover:text-brand-cyan transition-colors">AI Agents</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors">Chatbots</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors">Landing Pages</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors">Exec Support</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-brand-light mb-4">Company</h4>
            <ul className="space-y-2 text-brand-muted">
              <li><a href="#" className="hover:text-brand-cyan transition-colors">About</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors">Privacy</a></li>
            </ul>
          </div>

           <div>
            <h4 className="font-bold text-brand-light mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-brand-dark/5 dark:bg-white/5 flex items-center justify-center text-brand-muted hover:bg-brand-cyan hover:text-brand-dark transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-dark/5 dark:bg-white/5 flex items-center justify-center text-brand-muted hover:bg-brand-cyan hover:text-brand-dark transition-all">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-dark/5 dark:bg-white/5 flex items-center justify-center text-brand-muted hover:bg-brand-cyan hover:text-brand-dark transition-all">
                <Github size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-brand-border flex flex-col md:flex-row justify-between items-center text-brand-muted">
          <div>&copy; {new Date().getFullYear()} GenExecutive. All rights reserved.</div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <span>Built with AI agents + humans</span>
            <span className="animate-pulse text-brand-cyan">✺</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;