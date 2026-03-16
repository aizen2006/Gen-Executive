import React, { useState } from 'react';
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
import { Analytics } from "@vercel/analytics/react"
import OverlayShell from './components/OverlayShell';
import ContactOverlayContent from './components/ContactOverlayContent';
import LandingPreviewOverlayContent from './components/LandingPreviewOverlayContent';
import ChatWidget from './components/ChatWidget';

const App: React.FC = () => {
  const [overlayMode, setOverlayMode] = useState<'none' | 'contact' | 'preview'>('none');
  const [previewVariant, setPreviewVariant] = useState<number>(1);

  const isOverlayOpen = overlayMode !== 'none';

  const handleCloseOverlay = () => {
    setOverlayMode('none');
  };

  return (
    <div className="min-h-screen bg-brand-dark text-brand-light selection:bg-brand-cyan selection:text-brand-dark overflow-x-hidden">
      <SEO />
      <Analytics />
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <SolutionsOverview />
        <DeepDive />
        <OperationsSection
          onPreviewClick={(idx) => {
            setPreviewVariant(idx);
            setOverlayMode('preview');
          }}
        />
        <HowItWorks />
        <UseCases />
        <Results />
        <Pricing />
        <FAQ />
        <FinalCTA
          onContactClick={() => {
            setOverlayMode('contact');
          }}
        />
      </main>
      <Footer />

      <ChatWidget />

      <OverlayShell
        isOpen={isOverlayOpen}
        onClose={handleCloseOverlay}
        title={
          overlayMode === 'contact'
            ? 'Contact GenExecutive'
            : overlayMode === 'preview'
            ? 'Growth Engine landing page preview'
            : undefined
        }
      >
        {overlayMode === 'contact' && <ContactOverlayContent onClose={handleCloseOverlay} />}
        {overlayMode === 'preview' && (
          <LandingPreviewOverlayContent
            variant={previewVariant}
            onClose={handleCloseOverlay}
          />
        )}
      </OverlayShell>
    </div>
  );
};

export default App;