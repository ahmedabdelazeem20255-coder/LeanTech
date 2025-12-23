import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Smartphone, AlertCircle, GripVertical } from 'lucide-react';

const capabilities = [
  {
    icon: Smartphone,
    title: 'Fast Smartphone-Based Time Study',
    description:
      'Capture precise cycle times using your phone camera. No manual stopwatches or paper logs—just point, record, and analyze in real time.',
  },
  {
    icon: AlertCircle,
    title: 'Bottleneck Identification',
    description:
      'Instantly visualize which stations are slowing down your entire line. Our analytics highlight imbalances and suggest targeted improvements.',
  },
  {
    icon: GripVertical,
    title: 'Drag-and-Drop Task Reallocation',
    description:
      'Rebalance your production line visually. Simply drag tasks between stations to simulate different configurations and find the optimal balance.',
  },
];

const Capabilities = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="capabilities" className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4 lg:px-8">
        <div ref={ref} className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 lg:mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass-panel-subtle text-xs font-medium text-primary mb-4">
              Features
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              <span className="text-foreground">Key </span>
              <span className="gradient-text">Capabilities</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful tools designed to streamline your lean manufacturing journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="glass-panel p-8 group hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:shadow-glow transition-shadow duration-300">
                    <capability.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {capability.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {capability.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
