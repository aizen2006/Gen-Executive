import React from 'react';
import SEO from './components/SEO';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import SolutionsOverview from './components/SolutionsOverview';
import DeepDive from './components/DeepDive';
import OperationsSection from './components/OperationsSection';
import HowItWorks from './components/HowItWorks';
import UseCases from './components/UseCases';
import Results from './components/Results';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-dark text-brand-light selection:bg-brand-cyan selection:text-brand-dark overflow-x-hidden">
      <SEO />
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <SolutionsOverview />
        <DeepDive />
        <OperationsSection />
        <HowItWorks />
        <UseCases />
        <Results />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default App;