import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import SEO from "@/components/SEO";

const BizGuides = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="BizGuides - Personalized Business Coaching & Guidance"
        description="Get personalized business coaching powered by AI insights. Transform your business health assessment into actionable strategies with dedicated coaching support and expert guidance."
        keywords="business coaching, personalized guidance, SMB consulting, business health coach, strategic coaching, growth acceleration"
        canonical="https://bizhealth.ai/bizguides"
        ogImage="/og-images/og-bizguides.jpg"
      />
      <GlobalNavigation />
      
      {/* Placeholder for revamped BizGuides page */}
      <section className="py-40 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold mb-6 text-foreground font-montserrat">
            BizGuides
          </h1>
          <p className="text-xl text-muted-foreground font-open-sans">
            Revamped landing page coming soon...
          </p>
        </div>
      </section>
      
      <GlobalFooter />
    </div>
  );
};

export default BizGuides;
