import React, { useRef } from 'react';
import { Box } from '@mui/material';
import HeroSection from '../components/Home/heroSection';
import StatsSection from '../components/Home/statsSection';
import FeaturesSection from '../components/Home/featuresSection';
import HowItWorksSection from '../components/Home/howItWorksSection';
import TestimonialsSection from '../components/Home/testimonialsSection';
import CTASection from '../components/Home/ctaSection';
import FAQSection from '../components/Home/faqSection';
import FooterCTASection from '../components/Home/footerCTASection';

function Home() {
  const featuresRef = useRef(null);
  const scrollToFeatures = () => featuresRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <Box sx={{ overflow: 'hidden', position: 'relative' }}>
      <HeroSection scrollToFeatures={scrollToFeatures} />
      <StatsSection featuresRef={featuresRef} />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      <FAQSection />
      <FooterCTASection />
    </Box>
  );
}

export default Home;