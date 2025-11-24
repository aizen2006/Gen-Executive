import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import CalButton from './CalButton';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Solutions', href: '#solutions' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Use Cases', href: '#use-cases' },
  ];

  return (
    <>
      {/* Announcement Strip */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full bg-gradient-to-r from-brand-violet/20 to-brand-cyan/20 backdrop-blur-sm border-b border-brand-border py-2 text-center text-xs sm:text-sm font-medium z-50 relative"
      >
        <span className="opacity-90 text-brand-light">🚀 3x faster ops for founders & execs — without hiring more staff.</span>
        <a href="#results" className="ml-2 text-brand-cyan hover:underline inline-flex items-center">
          See how <ArrowRight className="w-3 h-3 ml-1" />
        </a>
      </motion.div>

      {/* Main Navbar */}
      <motion.nav
        className={`fixed z-40 transition-all duration-300 ${
          isScrolled 
            ? 'top-4 left-0 right-0 mx-auto w-[95%] max-w-7xl rounded-full bg-brand-dark/80 backdrop-blur-xl border border-brand-border py-3 shadow-lg shadow-brand-cyan/5' 
            : 'top-[36px] left-0 right-0 w-full bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a 
            href="#" 
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-cyan to-brand-violet flex items-center justify-center text-brand-dark">
              <Zap size={18} fill="currentColor" />
            </div>
            <span className="text-xl font-bold tracking-tight text-brand-light">GenExecutive</span>
          </motion.a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative text-sm font-medium text-brand-muted hover:text-brand-light transition-colors group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-cyan transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA Buttons & Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-brand-muted hover:text-brand-light hover:bg-brand-surface transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button className="text-sm font-medium text-brand-muted hover:text-brand-light transition-colors">
              Watch Demo
            </button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <CalButton className="bg-brand-light text-brand-dark px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-white transition-colors shadow-[0_0_20px_rgba(34,230,255,0.3)]" />
            </motion.div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden">
             <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-brand-muted hover:text-brand-light hover:bg-brand-surface transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              className="text-brand-light"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-brand-dark/95 backdrop-blur-xl pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xl font-medium text-brand-light"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="h-px bg-brand-border w-full my-2" />
              <button className="w-full py-3 text-center text-brand-muted border border-brand-border rounded-lg">
                Watch Demo
              </button>
              <CalButton className="w-full py-3 text-center bg-brand-cyan text-brand-dark font-bold rounded-lg" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;