import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Zap, BarChart3, Settings2, TrendingUp } from 'lucide-react';
import heroImage from '@/assets/hero-factory.jpg';

const features = [
  {
    icon: Zap,
    title: 'Fast Simulation',
    description: 'Run complex line simulations in seconds',
  },
  {
    icon: BarChart3,
    title: 'Data-Driven Insights',
    description: 'Make decisions backed by real analytics',
  },
  {
    icon: Settings2,
    title: 'Optimize Operations',
    description: 'Fine-tune every aspect of your production',
  },
  {
    icon: TrendingUp,
    title: 'Continuous Improvement',
    description: 'Track progress and iterate efficiently',
  },
];

const HeroSection = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-[100px] -z-10" />
      
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Content */}
          <div className="text-center mb-12 lg:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full glass-panel-subtle text-xs font-medium text-primary mb-6">
                Digital Lean Manufacturing Platform
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6"
            >
              <span className="gradient-text">Digital Lean</span>
              <br />
              <span className="text-foreground">Manufacturing Tools</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
            >
              Transform your manufacturing operations with powerful simulation and analysis tools designed for continuous improvement.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <Button 
                variant="hero" 
                size="xl"
                onClick={() => scrollToSection('line-balancing')}
              >
                Start Exploring
              </Button>
              <Button 
                variant="hero-secondary" 
                size="xl"
                onClick={() => scrollToSection('capabilities')}
              >
                View Capabilities
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-sm text-muted-foreground max-w-xl mx-auto"
            >
              Lean methodology combined with digital tools empowers teams to eliminate waste, 
              reduce cycle times, and unlock new levels of operational efficiency.
            </motion.p>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mb-16 lg:mb-24"
          >
            <div className="glass-panel p-2 lg:p-3 glow-box">
              <img
                src={heroImage}
                alt="Smart manufacturing dashboard with real-time analytics"
                className="w-full h-auto rounded-lg"
              />
            </div>
            {/* Floating gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none rounded-xl" />
          </motion.div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="glass-panel p-6 group hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
