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
        title="Our Logo - BizHealth.ai Company Logo & Brand Story"
        description="This is our company logo. Discover the meaning behind the BizHealth.ai logo - more than just design, it represents comprehensive business health assessment and your journey to growth and success."
        keywords="our logo, company logo, BizHealth.ai logo, BizHealth logo, brand story, business health symbol, company values, brand meaning, logo design"
        canonical="https://bizhealth.ai/logo"
      />
      <StructuredData 
        type="organization"
      />
      <PromotionalBanner />
      <GlobalNavigation />

      <main className="pt-20 pb-16">
        {/* Hero Section with Logo */}
        <section className="bg-gradient-to-br from-biz-navy via-biz-teal to-biz-navy py-20 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Logo Display */}
              <div className="bg-white rounded-xl shadow-2xl p-8 md:p-10 animate-fade-in">
                <img 
                  src={bizhealthLogoFull} 
                  alt="BizHealth.ai logo featuring a growth chart with upward trending arrow in BizGreen on BizNavy background, representing comprehensive business health assessment and data-driven growth" 
                  className="w-full h-auto"
                  loading="eager"
                />
              </div>

              {/* Hero Text */}
              <div className="text-white space-y-6 animate-fade-in">
                <h1 className="font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl leading-tight">
                  This is our company logo. We&apos;re proud of it—not because it&apos;s perfect, but because it represents something we genuinely believe in.
                </h1>
                <p className="font-open-sans text-lg md:text-xl text-white/90 leading-relaxed">
                  While we love the design, the typography, and that little grid icon that symbolizes the structured insights we bring to business health, we&apos;re far more proud when this logo shows up in your success story.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Message Grid */}
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* What It Means Card */}
              <Card className="bg-gradient-to-br from-biz-teal/10 to-biz-accent border-biz-teal/20 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-biz-navy mb-4">
                    What It Means (To Us)
                  </h2>
                  <p className="font-open-sans text-base md:text-lg text-foreground/80 leading-relaxed">
                    The grid in our logo represents the 12 key areas we assess—Strategy, Financials, Operations, HR, and eight others that make or break a business. It&apos;s structured, comprehensive, and data-driven. The colors—BizNavy for trust, BizGreen for growth—are intentional.
                  </p>
                </CardContent>
              </Card>

              {/* What It Should Mean Card */}
              <Card className="bg-gradient-to-br from-biz-navy to-biz-teal text-white border-none shadow-xl">
                <CardContent className="p-8">
                  <h2 className="font-montserrat font-bold text-2xl md:text-3xl mb-4">
                    What It Should Mean (To You)
                  </h2>
                  <p className="font-open-sans text-base md:text-lg text-white/90 leading-relaxed">
                    If we&apos;ve done our job right, this logo eventually becomes a symbol of your growth journey. It&apos;s there when you uncover a blind spot that saves you thousands. It&apos;s there when you confirm a hunch and finally move forward with confidence.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-biz-accent via-biz-teal/5 to-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="bg-white border-biz-grey/20 shadow-xl">
              <CardContent className="p-10 md:p-12">
                <div className="space-y-6 font-open-sans text-lg text-foreground/80 leading-relaxed text-center">
                  <p>
                    We designed BizHealth.ai to be your Business Health Coach—to stop the guessing and start the growing. But honestly? You&apos;re the one doing the heavy lifting. You&apos;re running the business, making the calls, taking the risks. Our logo is just along for the ride.
                  </p>
                  <p>
                    We built this platform with five decades of combined experience—not to impress you with credentials, but because we&apos;ve been the overwhelmed founder, the cash-strapped executive, the leader who didn&apos;t know what they didn&apos;t know. We created the tool we wish we&apos;d had.
                  </p>
                  <div className="pt-6 border-t border-biz-grey/20 mt-8">
                    <p className="font-semibold text-xl text-biz-navy mb-2">
                      A logo is just a logo. Pixels on a screen. A mark on a report.
                    </p>
                    <p>
                      What matters is whether it&apos;s attached to something that actually helps you. When your business gets healthier, scales smarter, or simply breathes a little easier—that&apos;s when this logo means something.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Closing Statement */}
        <section className="py-16 bg-gradient-to-br from-biz-navy via-biz-teal to-biz-green">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-4 animate-fade-in">
            <p className="font-open-sans text-xl md:text-2xl font-semibold leading-relaxed">
              That&apos;s the brand we&apos;re building.
            </p>
            <p className="font-open-sans text-lg md:text-xl text-white/90 leading-relaxed">
              Not the one in the design guide, but the one you experience when it matters.
            </p>
            <p className="font-open-sans text-lg md:text-xl text-white/90 leading-relaxed pt-6">
              No CTA here. Just gratitude for letting us be part of your journey.
            </p>
          </div>
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
};

export default OurLogo;
