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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
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
