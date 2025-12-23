import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-panel border-b border-glass-border/50' : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => scrollToSection('home')}
          >
            <div className="w-9 h-9 rounded-full border border-white/60 flex items-center justify-center overflow-hidden">
              <img
                src={logo}
                alt="LeanTech logo"
                className="w-full h-full object-contain"
                draggable={false}
              />
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="gradient-text">Lean</span>
              <span className="text-foreground">Tech</span>
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </button>

            {/* Tools dropdown */}
            <div className="relative group">
              <button
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Tools
              </button>

              {/* Dropdown menu */}
              <div className="absolute left-0 mt-2 w-44 rounded-lg bg-background/95 shadow-lg border border-border opacity-0 scale-95 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-150">
                <button
                  onClick={() => scrollToSection('line-balancing')}
                  className="block w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/60"
                >
                  Line Balancing
                </button>
                <button
                  onClick={() => scrollToSection('operators-calculator')}
                  className="block w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/60"
                >
                  Operators Calculator
                </button>
                {/* add more tool items here if needed */}
              </div>
            </div>

            <button
              onClick={() => scrollToSection('About us')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About us
            </button>
          </div>



          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-panel border-t border-glass-border"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              <button
                onClick={() => scrollToSection('home')}
                className="text-left py-2 text-foreground font-medium"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('line-balancing')}
                className="text-left py-2 text-foreground font-medium"
              >
                Line Balancing
              </button>
              <button
                onClick={() => scrollToSection('about-us')}  // was 'capabilities'
                className="text-left py-2 text-foreground font-medium"
              >
                About us
              </button>

              <Button
                variant="hero"
                size="lg"
                onClick={() => scrollToSection('operators-calculator')}
                className="mt-2"
              >
                Try the Simulator
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
