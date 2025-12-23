import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Play } from 'lucide-react';
import videoThumbnail from '@/assets/video-thumbnail.jpg';

const LineBalancing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="line-balancing" className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[120px] -z-10" />
      
      <div className="container mx-auto px-4 lg:px-8">
        <div ref={ref} className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass-panel-subtle text-xs font-medium text-primary mb-4">
              Simulation Tool
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold">
              <span className="gradient-text">Line Balancing</span>
              <span className="text-foreground"> Simulation</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Video Thumbnail */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative group cursor-pointer order-2 lg:order-1"
            >
              <div className="glass-panel p-2 lg:p-3 glow-box overflow-hidden">
                <div className="relative">
                  <img
                    src={videoThumbnail}
                    alt="Line balancing simulation demo video"
                    className="w-full h-auto rounded-lg transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-glow transition-all duration-300 group-hover:scale-110 group-hover:bg-primary">
                      <Play className="w-8 h-8 lg:w-10 lg:h-10 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none rounded-lg" />
                </div>
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="order-1 lg:order-2"
            >
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">
                Optimize Your Production Line
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Our line balancing tool helps you visualize workload distribution across stations, 
                  instantly detect bottlenecks, and simulate changes before implementing them on the floor.
                </p>
                <p>
                  By optimizing cycle times and operator assignments, you can increase throughput 
                  by up to 30% while reducing idle time and improving worker satisfaction.
                </p>
                <p>
                  The intuitive drag-and-drop interface makes it easy to experiment with different 
                  configurations and find the perfect balance for your unique production requirements.
                </p>
              </div>

              {/* Key metrics */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { value: '30%', label: 'Efficiency Gain' },
                  { value: '50%', label: 'Less Bottlenecks' },
                  { value: '2x', label: 'Faster Planning' },
                ].map((metric, index) => (
                  <div key={metric.label} className="glass-panel-subtle p-4 text-center">
                    <div className="text-2xl lg:text-3xl font-bold gradient-text">{metric.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{metric.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LineBalancing;
