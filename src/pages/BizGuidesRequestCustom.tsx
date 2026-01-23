import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import GradientDivider from "@/components/GradientDivider";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import PromotionalBanner from "@/components/PromotionalBanner";
import CustomRequestHero from "@/components/bizguides/custom-request/CustomRequestHero";
import CustomRequestEngagementTypes from "@/components/bizguides/custom-request/CustomRequestEngagementTypes";
import CustomRequestProcess from "@/components/bizguides/custom-request/CustomRequestProcess";
import CustomRequestInvestment from "@/components/bizguides/custom-request/CustomRequestInvestment";
import CustomRequestCaseStudies from "@/components/bizguides/custom-request/CustomRequestCaseStudies";
import CustomRequestForm from "@/components/bizguides/custom-request/CustomRequestForm";
import CustomRequestTrustSignals from "@/components/bizguides/custom-request/CustomRequestTrustSignals";
import CustomRequestFAQ from "@/components/bizguides/custom-request/CustomRequestFAQ";

const BizGuidesRequestCustom = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Custom BizGuides Solutions for Scaling Businesses | BizHealth.ai"
        description="Custom BizGuides consulting for organizations ready to scale. Expert advisors, proven frameworks, 90-180 day engagements. Request your custom solution today."
        keywords="custom business consulting, SMB consulting, strategic planning, business transformation, executive coaching, exit preparation, business scaling"
        canonical="https://bizhealth.ai/bizguides/request-custom"
        ogImage="/og-images/og-bizguides-custom.jpg"
        ogType="website"
      />
      <StructuredData 
        type="service"
        name="Custom BizGuides Solutions"
        description="Custom consulting and strategic partnership for organizations ready to scale. Dedicated advisors, personalized roadmaps, and measurable outcomes."
        provider="BizHealth.ai"
        areaServed="Worldwide"
        url="https://bizhealth.ai/bizguides/request-custom"
      />
      
      <PromotionalBanner />
      <GlobalNavigation />
      
      {/* Section 1: Hero + Value Positioning */}
      <CustomRequestHero />
      
      {/* Section 2: Request Form (Centerpiece) */}
      <CustomRequestForm />
      
      {/* Section 3: Trust Signals & Reassurance */}
      <CustomRequestTrustSignals />
      
      {/* Section 4: Engagement Types */}
      <CustomRequestEngagementTypes />
      
      {/* Section 5: What's Included (6-Step Process) */}
      <CustomRequestProcess />
      
      {/* Section 6: Investment & Outcomes */}
      <CustomRequestInvestment />
      
      {/* Section 7: Success Stories */}
      <CustomRequestCaseStudies />
      
      {/* Section 8: FAQ */}
      <CustomRequestFAQ />

      <GradientDivider variant="teal-navy" />
      <GlobalFooter />
    </div>
  );
};

export default BizGuidesRequestCustom;
