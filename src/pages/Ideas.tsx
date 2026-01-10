import { useRef } from "react";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalHeader from "@/components/GlobalHeader";
import GlobalFooter from "@/components/GlobalFooter";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import IdeasHero from "@/components/ideas/IdeasHero";
import WhyInputMatters from "@/components/ideas/WhyInputMatters";
import HowItWorks from "@/components/ideas/HowItWorks";
import WhatWereLookingFor from "@/components/ideas/WhatWereLookingFor";
import IdeaForm from "@/components/ideas/IdeaForm";
import Testimonials from "@/components/ideas/Testimonials";
import IdeasFAQ from "@/components/ideas/IdeasFAQ";
import FooterCTA from "@/components/ideas/FooterCTA";

const Ideas = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Submit Your Business Ideas | BizHealth.ai",
    "description": "Share your ideas for new business tools, resources, and content.",
    "url": "https://www.bizhealth.ai/ideas",
    "mainEntity": {
      "@type": "ContactPage",
      "name": "Voice of Customer Ideas Funnel",
      "description": "Submit ideas for new business tools, content, and resources"
    },
    "publisher": {
      "@type": "Organization",
      "name": "BizHealth.ai",
      "url": "https://www.bizhealth.ai",
      "logo": "https://www.bizhealth.ai/images/bizhealth-logo.png"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Submit Your Business Ideas | Help Us Help You Grow | BizHealth.ai"
        description="Share your ideas for new business tools, resources, and content. BizHealth.ai listens to SMB leaders like you to build what matters most. Submit your idea today."
        keywords="SMB business tools, business health assessment, small business resources, business growth ideas, SMB feedback, voice of customer, idea submission"
        canonicalUrl="https://www.bizhealth.ai/ideas"
        ogTitle="Submit Your Business Ideas | BizHealth.ai"
        ogDescription="Your ideas fuel the tools, insights, and resources that help your business thrive."
        ogImage="https://www.bizhealth.ai/images/og-ideas-funnel.jpg"
        twitterCard="summary_large_image"
      />
      <StructuredData data={structuredData} />
      
      <GlobalHeader />
      <GlobalNavigation />
      
      <main>
        <IdeasHero onScrollToForm={scrollToForm} />
        <WhyInputMatters />
        <HowItWorks />
        <WhatWereLookingFor />
        <div ref={formRef}>
          <IdeaForm />
        </div>
        <Testimonials />
        <IdeasFAQ />
        <FooterCTA />
      </main>
      
      <GlobalFooter />
    </div>
  );
};

export default Ideas;
