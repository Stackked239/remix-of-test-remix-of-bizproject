import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const PricingStoryBrandHeader = () => {
  const handleScrollToPlans = () => {
    const plansSection = document.getElementById('pricing-tiers');
    if (plansSection) {
      const navbarHeight = 80; // Account for fixed navigation bar height
      const elementPosition = plansSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "BizHealth.ai Pricing - Transparent, Flexible Business Diagnostics",
          "description": "Affordable business diagnostics and tiered solutions that help you identify gaps, confirm strengths, and fuel sustainable success—so you stay in control of every dollar, every decision.",
          "url": "https://bizhealth.ai/pricing",
          "mainEntity": {
            "@type": "Service",
            "serviceType": "Business Diagnostics",
            "provider": {
              "@type": "Organization",
              "name": "BizHealth.ai",
              "url": "https://bizhealth.ai"
            },
            "areaServed": "Worldwide",
            "audience": {
              "@type": "Audience",
              "audienceType": "Small and Medium Business Owners"
            }
          },
          "keywords": "business diagnostics, small business pricing, tiered solutions, transparent pricing, affordable AI business health, SMB solutions"
        })}
      </script>

      <section 
        className="relative bg-biz-navy text-biz-white py-20 md:py-28 overflow-hidden"
        role="banner"
        aria-label="Pricing page header"
      >
        {/* Background accent elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-biz-green rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-biz-green rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Headline - H1 for SEO */}
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
              Pricing That Works As Hard As You Do—
              <span className="text-biz-green"> Transparent, Flexible, Results-driven</span>
            </h1>

            {/* Sub-headline - H2 for SEO */}
            <h2 className="font-open-sans text-lg md:text-xl lg:text-2xl text-biz-grey leading-relaxed mb-10 max-w-3xl mx-auto">
              Affordable, <strong className="text-biz-white">business diagnostics</strong> and <strong className="text-biz-white">tiered solutions</strong> that help you identify gaps, confirm strengths, and fuel sustainable success—so you stay in control of every dollar, every decision.
            </h2>

            {/* CTA Button */}
            <Button
              onClick={handleScrollToPlans}
              size="lg"
              className="font-open-sans font-semibold text-lg px-10 py-7 h-auto bg-biz-green hover:bg-growth-hover text-biz-navy transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:ring-4 focus:ring-biz-green/50 focus:outline-none"
              aria-label="Scroll to pricing options"
            >
              See Your Options Below
              <ChevronDown className="w-5 h-5 ml-2 animate-bounce" aria-hidden="true" />
            </Button>

            {/* Visual trust indicators with proper spacing */}
            <div className="mt-16 pt-12 border-t border-biz-grey/30">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-montserrat font-bold text-biz-green mb-2">
                    95%
                  </div>
                  <p className="font-open-sans text-sm md:text-base text-biz-grey">
                    Savings vs. Traditional Consulting
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-montserrat font-bold text-biz-green mb-2">
                    30-40min
                  </div>
                  <p className="font-open-sans text-sm md:text-base text-biz-grey">
                    Fast Report Delivery
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-montserrat font-bold text-biz-green mb-2">
                    No Lock-in
                  </div>
                  <p className="font-open-sans text-sm md:text-base text-biz-grey">
                    One-Time Payment, No Subscriptions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade for seamless transition */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-background"></div>
      </section>
    </>
  );
};

export default PricingStoryBrandHeader;
