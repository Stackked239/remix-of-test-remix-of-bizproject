// Deployment trigger: Force SSG rebuild for sitemap update
import { lazy, Suspense } from "react";
import GlobalNavigation from "@/components/GlobalNavigation";
import StoryBrandHeader from "@/components/StoryBrandHeader";
import Hero from "@/components/Hero";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import GlobalFooter from "@/components/GlobalFooter";
import GradientDivider from "@/components/GradientDivider";

// Lazy load below-the-fold components to reduce initial JS bundle
const Benefits = lazy(() => import("@/components/Benefits"));
const HowItWorks = lazy(() => import("@/components/HowItWorks"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const Pricing = lazy(() => import("@/components/Pricing"));

const Index = () => {
return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="BizHealth.ai - Business Health Analysis for Strategic Growth"
        description="Transform your SMB with BizHealth.ai's comprehensive business health assessment. Get actionable insights, expert recommendations, and data-driven strategies in minutes."
        keywords="BizHealth, business health assessment, strategic business diagnostics, executive business analysis, small business advisor, business growth strategy"
        canonical="https://bizhealth.ai/"
        ogImage="/og-images/og-homepage.jpg"
      />
      <StructuredData type="organization" />
      <GlobalNavigation />
      <StoryBrandHeader />
      <Hero />
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <Benefits />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <HowItWorks />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <Pricing />
      </Suspense>
      <GradientDivider variant="green-gold" />
      <GlobalFooter />
    </div>
  );
};

export default Index;
