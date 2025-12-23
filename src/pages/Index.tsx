import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ConnectedFactory from '@/components/ConnectedFactory';
import LineBalancing from '@/components/LineBalancing';
import OperatorsCalculator from '@/components/OperatorsCalculator';
import Capabilities from '@/components/Capabilities';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <ConnectedFactory />
        <LineBalancing />
        <OperatorsCalculator />
        <Capabilities />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
