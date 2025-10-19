import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import EmailCapturePopup from "@/components/EmailCapturePopup";
import StoryBrandHeader from "@/components/StoryBrandHeader";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="BizHealth.ai - AI-Powered Business Health Assessment"
        description="Transform your SMB with BizHealth.ai's comprehensive business health assessment. Get actionable insights, expert recommendations, and data-driven strategies in minutes."
        keywords="business health assessment, SMB analytics, business intelligence, AI business analysis, operational efficiency, financial metrics, business strategy"
        canonical="https://bizhealth.ai/"
      />
      <StructuredData type="organization" />
      <GlobalNavigation />
      <StoryBrandHeader />
      <Hero />
      <Benefits />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <GlobalFooter />
      <EmailCapturePopup />
    </div>
  );
};

export default Index;
