import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import GradientDivider from "@/components/GradientDivider";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import PromotionalBanner from "@/components/PromotionalBanner";
import BizGuidesHero from "@/components/bizguides/BizGuidesHero";
import BizGuidesEmpathy from "@/components/bizguides/BizGuidesEmpathy";
import BizGuidesSolutionIntro from "@/components/bizguides/BizGuidesSolutionIntro";
import BizGuidesTierComparison from "@/components/bizguides/BizGuidesTierComparison";
import BizGuidesUseCases from "@/components/bizguides/BizGuidesUseCases";
import BizGuidesTrustSignals from "@/components/bizguides/BizGuidesTrustSignals";
import BizGuidesFAQ from "@/components/bizguides/BizGuidesFAQ";
import BizGuidesFinalCTA from "@/components/bizguides/BizGuidesFinalCTA";

const BizGuides = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="BizGuides: Online Business Coaching & AI Business Consulting | BizHealth.ai"
        description="Get expert online business coaching and AI-powered consulting. Free resources, 1:1 sessions, and custom solutions. Start with free business coaching today."
        keywords="online business coaching, online business consultant, ai business consultant, ai business coach, free business coaching, small business coaching, SMB consulting, business advisor, expert matching, BizHealth, business growth, executive coaching, virtual business coach, remote consulting"
        canonical="https://bizhealth.ai/bizguides"
        ogImage="/og-images/og-bizguides.jpg"
        ogType="website"
      />
      <StructuredData 
        type="service"
        name="BizGuides Expert Coaching & Consulting"
        description="Expert coaching and consulting matched to your industry and growth stage. Free articles, 1:1 sessions, and custom solutions for SMB leaders."
        provider="BizHealth.ai"
        areaServed="Worldwide"
        url="https://bizhealth.ai/bizguides"
      />
      
      <PromotionalBanner />
      <GlobalNavigation />
      
      {/* Section 1: Hero */}
      <BizGuidesHero />
      
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

      <GradientDivider variant="teal-navy" />
      <GlobalFooter />
    </div>
  );
};

export default BizGuides;
