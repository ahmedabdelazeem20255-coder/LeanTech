import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import connectedFactoryImage from '@/assets/connected-factory.jpg';

const ConnectedFactory = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-[100px] -z-10" />
      
      <div className="container mx-auto px-4 lg:px-8">
        <div ref={ref} className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full glass-panel-subtle text-xs font-medium text-primary mb-4">
                Industry 4.0
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                <span className="text-foreground">The </span>
                <span className="gradient-text">Connected Factory</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Digital transformation turns data, machines, and people into one connected factory brain. 
                Real-time visibility across every workstation enables predictive insights, 
                synchronized workflows, and the agility to respond instantly to production changes. 
                Your entire operation becomes a unified intelligence network.
              </p>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="glass-panel p-2 lg:p-3 glow-box">
                <img
                  src={connectedFactoryImage}
                  alt="Connected factory network visualization"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border border-primary/30 rounded-xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg -z-10" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectedFactory;
