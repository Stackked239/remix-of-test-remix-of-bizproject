import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import PromotionalBanner from "@/components/PromotionalBanner";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { Card, CardContent } from "@/components/ui/card";
import bizhealthLogoFull from "@/assets/bizhealth-logo-full.jpg";

const OurLogo = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Our Logo - BizHealth.ai Brand Story"
        description="Discover the meaning behind the BizHealth.ai logo. More than just design, it represents comprehensive business health assessment and your journey to growth and success."
        keywords="BizHealth.ai logo, brand story, business health symbol, company values, brand meaning"
        canonical="https://bizhealth.ai/logo"
      />
      <StructuredData 
        type="organization"
      />
      <PromotionalBanner />
      <GlobalNavigation />

      <main className="pt-20 pb-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-biz-navy via-biz-teal to-biz-navy py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-fade-in">
              <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight">
                Our Logo
              </h1>
              
              {/* Logo Display */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-8 max-w-3xl mx-auto">
                <img 
                  src={bizhealthLogoFull} 
                  alt="BizHealth.ai logo featuring a growth chart with upward trending arrow in BizGreen on BizNavy background, representing comprehensive business health assessment and data-driven growth" 
                  className="w-full h-auto"
                  loading="eager"
                />
              </div>

              <p className="font-open-sans text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                This is our logo. We're proud of it—not because it's perfect, but because it represents something we genuinely believe in.
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6 font-open-sans text-lg text-foreground/80 leading-relaxed animate-fade-in">
              <p>
                Here's the thing: while we love the design, the typography, and that little grid icon that symbolizes the structured insights we bring to business health, we're far more proud when this logo shows up in your success story. When you see it on your report dashboard after making a tough decision. When it sits in your bookmarks bar because you've come back for a second assessment. When it becomes shorthand among your team for "let's get clarity on this".
              </p>
              
              <p>
                We designed BizHealth.ai to be your Business Health Coach—to stop the guessing and start the growing. But honestly? You're the one doing the heavy lifting. You're running the business, making the calls, taking the risks. Our logo is just along for the ride.
              </p>
            </div>
          </div>
        </section>

        {/* What It Means Section */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-biz-teal/10 to-biz-accent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="bg-background border-biz-teal/20 shadow-lg">
              <CardContent className="p-8 md:p-12">
                <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-biz-navy mb-6">
                  What It Means (To Us)
                </h2>
                <p className="font-open-sans text-lg text-foreground/80 leading-relaxed">
                  The grid in our logo represents the 12 key areas we assess—Strategy, Financials, Operations, HR, and eight others that make or break a business. It's structured, comprehensive, and data-driven. The colors—BizNavy for trust, BizGreen for growth—are intentional. We wanted something that felt professional but approachable, like sitting down with someone who's been in your shoes and actually gets it.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What It Should Mean Section */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="bg-gradient-to-br from-biz-navy to-biz-teal text-white border-none shadow-xl">
              <CardContent className="p-8 md:p-12">
                <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-6">
                  What It Should Mean (To You)
                </h2>
                <p className="font-open-sans text-lg text-white/90 leading-relaxed">
                  If we've done our job right, this logo eventually becomes a symbol of your growth journey. It's there when you uncover a blind spot that saves you thousands. It's there when you confirm a hunch and finally move forward with confidence. It's there when you baseline your business health and realize you're stronger than you thought.
                </p>
                <p className="font-open-sans text-lg text-white/90 leading-relaxed mt-4">
                  We built this platform with five decades of combined experience—not to impress you with credentials, but because we've been the overwhelmed founder, the cash-strapped executive, the leader who didn't know what they didn't know. We created the tool we wish we'd had.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* The Humble Part Section */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-biz-accent via-biz-teal/10 to-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <Card className="bg-background border-biz-grey/20 shadow-lg">
              <CardContent className="p-8 md:p-12">
                <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-biz-navy mb-6">
                  The Humble Part
                </h2>
                <p className="font-open-sans text-lg text-foreground/80 leading-relaxed">
                  We know a logo is just a logo. Pixels on a screen. A mark on a report. What matters is whether it's attached to something that actually helps you.
                </p>
                <p className="font-open-sans text-lg text-foreground/80 leading-relaxed mt-4">
                  So while we're honored to have built something that serves micro-, small-, and mid-sized businesses like yours, we're even more humbled when it works. When your business gets healthier, scales smarter, or simply breathes a little easier—that's when this logo means something.
                </p>
              </CardContent>
            </Card>

            <div className="text-center bg-white rounded-xl shadow-lg p-8 md:p-12">
              <p className="font-open-sans text-xl md:text-2xl text-biz-navy font-semibold leading-relaxed mb-4">
                That's the brand we're building.
              </p>
              <p className="font-open-sans text-lg text-foreground/80 leading-relaxed">
                Not the one in the design guide, but the one you experience when it matters.
              </p>
            </div>
          </div>
        </section>

        {/* Gratitude Section */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-biz-navy via-biz-teal to-biz-green">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white space-y-6 animate-fade-in">
              <p className="font-open-sans text-xl md:text-2xl leading-relaxed">
                No CTA here.
              </p>
              <p className="font-open-sans text-2xl md:text-3xl font-semibold leading-relaxed">
                Just gratitude for letting us be part of your journey.
              </p>
            </div>
          </div>
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
};

export default OurLogo;
