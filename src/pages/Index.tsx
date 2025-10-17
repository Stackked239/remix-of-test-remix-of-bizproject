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
import ChatWidget from "@/components/ChatWidget";
import OrganizationSchema from "@/components/OrganizationSchema";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>BizHealth.ai | Stop Guessing. Start Growing.</title>
        <meta name="description" content="BizHealth.ai helps business leaders uncover blind spots, boost performance, and build healthier companies with data-driven insights and tools." />
        <link rel="canonical" href="https://www.bizhealth.ai/" />
        <meta name="google-site-verification" content="your-google-verification-code" />
        <meta name="msvalidate.01" content="your-bing-verification-code" />
      </Helmet>
      <OrganizationSchema />
      <GlobalNavigation />
      <StoryBrandHeader />
      <Hero />
      <Benefits />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <GlobalFooter />
      <EmailCapturePopup />
      <ChatWidget />
    </div>
  );
};

export default Index;
