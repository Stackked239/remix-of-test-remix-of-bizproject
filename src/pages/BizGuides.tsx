import { lazy, Suspense } from "react";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import GradientDivider from "@/components/GradientDivider";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import PromotionalBanner from "@/components/PromotionalBanner";
import BizGuidesHero from "@/components/bizguides/BizGuidesHero";

// Lazy load below-fold components for better LCP
const BizGuidesEmpathy = lazy(() => import("@/components/bizguides/BizGuidesEmpathy"));
const BizGuidesSolutionIntro = lazy(() => import("@/components/bizguides/BizGuidesSolutionIntro"));
const BizGuidesTierComparison = lazy(() => import("@/components/bizguides/BizGuidesTierComparison"));
const BizGuidesUseCases = lazy(() => import("@/components/bizguides/BizGuidesUseCases"));
const BizGuidesTrustSignals = lazy(() => import("@/components/bizguides/BizGuidesTrustSignals"));
const BizGuidesFAQ = lazy(() => import("@/components/bizguides/BizGuidesFAQ"));
const BizGuidesFinalCTA = lazy(() => import("@/components/bizguides/BizGuidesFinalCTA"));

// Simple loading placeholder
const SectionLoader = () => (
  <div className="py-20 flex justify-center">
    <div className="animate-pulse bg-muted rounded-lg h-32 w-full max-w-4xl mx-6" />
  </div>
);

const BizGuides = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="BizGuides - Expert Coaching & Consulting for Small Business Growth | BizHealth.ai"
        description="Get expert online business coaching and AI-powered consulting. Free resources, 1:1 sessions, and custom solutions. Start with free business coaching today."
        keywords="online business coaching, online business consultant, ai business consultant, ai business coach, free business coaching, small business coaching, SMB consulting, business advisor, expert matching, BizHealth, business growth, executive coaching, virtual business coach, remote consulting"
        canonical="https://bizhealth.ai/bizguides"
        ogImage="/og-images/og-bizguides.jpg"
        ogType="website"
      />
      <StructuredData 
        type="service"
        name="BizGuides Online Business Coaching & AI Consulting"
        description="Online business coaching and AI-powered consulting matched to your industry and growth stage. Free business coaching resources, 1:1 virtual sessions, and custom solutions for SMB leaders."
        provider="BizHealth.ai"
        areaServed="Worldwide"
        url="https://bizhealth.ai/bizguides"
      />
      
      <PromotionalBanner />
      <GlobalNavigation />
      
      {/* Section 1: Hero - Loaded immediately for LCP */}
      <BizGuidesHero />
      
      {/* Below-fold sections - Lazy loaded */}
      <Suspense fallback={<SectionLoader />}>
        {/* Section 2: Empathy & Problem Validation */}
        <BizGuidesEmpathy />
        
        {/* Section 3: Solution Intro & Brand Moment */}
        <BizGuidesSolutionIntro />
        
        {/* Section 4: Three-Tier Comparison (Centerpiece) */}
        <BizGuidesTierComparison />
        
        {/* Section 5: Use Cases & Examples */}
        <BizGuidesUseCases />
        
        {/* Section 6: Expert Highlights & Trust Signals */}
        <BizGuidesTrustSignals />
        
        {/* Section 7: FAQ */}
        <BizGuidesFAQ />
        
        {/* Section 8: Final CTA + Cross-Hub Navigation */}
        <BizGuidesFinalCTA />
      </Suspense>

      <GradientDivider variant="teal-navy" />
      <GlobalFooter />
    </div>
  );
};

export default BizGuides;