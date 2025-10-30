import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from '@/components/GlobalFooter';
import PromotionalBanner from '@/components/PromotionalBanner';
import { Users, Target, TrendingUp, Shield, Heart, Lightbulb } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Faith & Integrity",
      description: "Rooted in serving with authenticity and transparency"
    },
    {
      icon: Shield,
      title: "Empowerment",
      description: "Leveling the playing field for all businesses"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Leveraging advanced AI for actionable insights"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Quick Self-Assessment",
      description: "Spend just 20–40 minutes answering targeted questions—no consultants required."
    },
    {
      number: "02",
      title: "Comprehensive Insights",
      description: "Get a detailed report analyzing 12 key areas like sales, operations, finance, leadership, strategy, and technology, with benchmarks against peers."
    },
    {
      number: "03",
      title: "Tailored Reports for Every Level",
      description: "Dive deep with the Owner's Report, empower your team with Managers' and Employees' Reports, or get high-level overviews in the Executive Summary—all designed for how you communicate and act at each role."
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - BizHealth.ai | Stop Guessing, Start Growing</title>
        <meta 
          name="description" 
          content="BizHealth.ai levels the playing field for SMB leaders with AI-powered business health diagnostics. Discover our mission to help small businesses unlock growth with comprehensive business intelligence tools." 
        />
        <meta 
          name="keywords" 
          content="SMB growth tools, business health diagnostic, small business analytics, SMB decision-makers, business intelligence for SMBs, operational efficiency tools" 
        />
        <link rel="canonical" href="https://bizhealth.ai/about" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bizhealth.ai/about" />
        <meta property="og:title" content="About BizHealth.ai - Rooted in Transformation" />
        <meta property="og:description" content="Empowering SMB leaders with AI-driven business health insights. Learn how we're leveling the playing field for small and mid-sized businesses." />
        <meta property="og:image" content="https://bizhealth.ai/logo-512.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://bizhealth.ai/about" />
        <meta property="twitter:title" content="About BizHealth.ai - Stop Guessing, Start Growing" />
        <meta property="twitter:description" content="Discover how BizHealth.ai empowers SMB leaders with comprehensive business diagnostics and strategic growth tools." />
        <meta property="twitter:image" content="https://bizhealth.ai/logo-512.jpg" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About BizHealth.ai",
            "description": "BizHealth.ai provides AI-powered business health diagnostics for SMB leaders, offering comprehensive insights and strategic guidance.",
            "url": "https://bizhealth.ai/about",
            "mainEntity": {
              "@type": "Organization",
              "name": "BizHealth.ai",
              "description": "AI-powered business health diagnostic platform for small and mid-sized businesses",
              "foundingDate": "2024",
              "founder": {
                "@type": "Person",
                "name": "BizHealth.ai Founders"
              },
              "slogan": "Stop Guessing, Start Growing"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <PromotionalBanner />
        <GlobalNavigation />

        <main className="pt-20 pb-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-biz-navy to-biz-green text-white py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-4xl mx-auto animate-fade-in">
                <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
                  Rooted in Transformation, not Transactions
                </h1>
                <p className="font-open-sans text-lg md:text-xl text-white/90 leading-relaxed">
                  Empowering SMB leaders with the insights and tools to unlock their business's full potential
                </p>
              </div>
            </div>
          </section>

          {/* Our Story Section */}
          <section className="py-16 md:py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="animate-fade-in">
                  <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-biz-navy mb-6">
                    Our Story Begins with You
                  </h2>
                  <div className="space-y-4 font-open-sans text-base md:text-lg text-biz-grey leading-relaxed">
                    <p>
                      As a small or mid-sized business owner, you're in the trenches every day—pouring your heart into building something meaningful. But the challenges are relentless: cash-flow uncertainties keep you up at night, scalability feels like an elusive dream after those first few years, and leadership blind spots creep in when you're stretched thin on time and resources.
                    </p>
                    <p>
                      You know your business has untapped potential, but stepping back to assess it fully? That's a luxury most smaller businesses can't afford—until now.
                    </p>
                  </div>
                </div>
                <div className="animate-fade-in">
                  <Card className="bg-biz-accent border-biz-teal/20 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-8">
                      <Users className="w-16 h-16 text-biz-teal mb-4" />
                      <h3 className="font-montserrat font-bold text-2xl text-biz-navy mb-4">
                        We Get It—We've Been There
                      </h3>
                      <p className="font-open-sans text-biz-grey leading-relaxed">
                        At BizHealth.ai, our journey started because we've lived your story. Our co-founders, seasoned entrepreneurs and business leaders, saw how larger corporations monopolize the best tools, analyses, and expertise, leaving businesses like yours at a disadvantage. Why should big players have all the advantages while you juggle everything with limited bandwidth?
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-16 md:py-20 bg-gradient-to-br from-biz-navy to-biz-teal">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-4xl mx-auto mb-12 animate-fade-in">
                <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-white mb-6">
                  Our Mission
                </h2>
                <p className="font-open-sans text-lg text-white/90 leading-relaxed">
                  Here's what ignited us: engaging with far too many talented business owners struggling—not because they lacked drive or vision, but because they lacked access to the strategic insights that could change everything. That's why we built BizHealth.ai.
                </p>
                <p className="font-open-sans text-lg text-white/90 leading-relaxed mt-4">
                  Driven by our mantra <strong>"Success is achieved by helping others be successful,"</strong> we're democratizing access to the strategic insights and expert guidance that were once available only to larger companies with deep pockets.
                </p>
                <p className="font-open-sans text-lg text-white font-semibold mt-4">
                  We're not just creating a platform. We're leveling the playing field so that lack of knowledge or know-how no longer determines your success.
                </p>
              </div>

              {/* Core Values */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {values.map((value, index) => {
                  const IconComponent = value.icon;
                  return (
                    <Card 
                      key={index}
                      className="bg-white border-biz-teal/20 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardContent className="p-8 text-center">
                        <IconComponent className="w-12 h-12 text-biz-teal mx-auto mb-4" />
                        <h3 className="font-montserrat font-bold text-xl text-biz-navy mb-3">
                          {value.title}
                        </h3>
                        <p className="font-open-sans text-biz-grey leading-relaxed">
                          {value.description}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="py-8 md:py-12 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-4xl mx-auto mb-12 animate-fade-in">
                <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-biz-navy mb-6">
                  Meet Your Trusted Guides
                </h2>
                <p className="font-open-sans text-lg text-biz-grey leading-relaxed">
                  We're a team of real-world experts who've walked in your shoes: business owners, former C-suite executives (CEOs, COOs, CFOs), consultants, tech developers, financial analysts, sales and marketing pros, operations leaders, HR managers, serial entrepreneurs, and global scaling strategists.
                </p>
                <p className="font-open-sans text-lg text-biz-grey leading-relaxed mt-4">
                  We've owned, operated, and grown businesses at every level, so we understand the unique needs of owners, leaders, managers, and teams. That's why BizHealth.ai isn't a generic AI prompt—it's a proprietary platform leveraging advanced AI to deliver actionable, comprehensive business health diagnostics tailored to your reality.
                </p>
              </div>
            </div>
          </section>

          {/* How We Guide You Section */}
          <section className="py-16 md:py-20 bg-gradient-to-br from-biz-teal/10 to-biz-accent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-4xl mx-auto mb-12 animate-fade-in">
                <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-biz-navy mb-6">
                  Our Plan to Guide You to Success
                </h2>
                <p className="font-open-sans text-lg text-biz-grey leading-relaxed">
                  We make it simple to uncover your business's true health and unlock its full potential:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {steps.map((step, index) => (
                  <Card 
                    key={index}
                    className="bg-white border-biz-teal/20 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-8">
                      <div className="text-5xl font-montserrat font-bold text-biz-teal mb-4">
                        {step.number}
                      </div>
                      <h3 className="font-montserrat font-bold text-xl text-biz-navy mb-4">
                        {step.title}
                      </h3>
                      <p className="font-open-sans text-biz-grey leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 max-w-4xl mx-auto animate-fade-in">
                <p className="font-open-sans text-lg text-biz-grey leading-relaxed mb-6">
                  This isn't about overwhelming data; it's about actionable clarity that transforms uncertainty into confident growth. And we're just getting started—our vision is to evolve BizHealth.ai into a full SMB ecosystem, offering essential tools, leadership resources, growth strategies, and even hands-on mentoring or consulting, all shaped by your feedback and needs.
                </p>
              </div>
            </div>
          </section>

          {/* Potential Section */}
          <section className="py-16 md:py-20 bg-gradient-to-br from-biz-teal/20 via-biz-accent to-biz-green/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="animate-fade-in">
                  <Card className="bg-gradient-to-br from-biz-navy to-biz-teal text-white shadow-xl">
                    <CardContent className="p-8 md:p-12">
                      <Target className="w-16 h-16 mb-6" />
                      <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-6">
                        Avoid the Pitfalls, Embrace Your Potential
                      </h2>
                      <p className="font-open-sans text-lg leading-relaxed">
                        Without the right insights, businesses stall, opportunities slip away, and that "kingdom-sized" potential remains out of reach. But with BizHealth.ai as your guide, you'll avoid those traps—gaining the knowledge to scale sustainably, boost efficiency, and achieve breakthroughs you didn't think possible.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="animate-fade-in">
                  <TrendingUp className="w-32 h-32 text-biz-navy mx-auto mb-6" />
                  <h3 className="font-montserrat font-bold text-2xl text-biz-navy text-center mb-4">
                    Your Growth Partner
                  </h3>
                  <p className="font-open-sans text-lg text-biz-navy leading-relaxed text-center">
                    We're committed to your success because your victory is ours too. Join thousands of SMB leaders who are transforming their businesses with data-driven insights and strategic clarity.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 md:py-20 bg-gradient-to-br from-biz-navy via-biz-teal to-biz-navy text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
                Ready to Write Your Success Story?
              </h2>
              <p className="font-open-sans text-lg md:text-xl mb-8 leading-relaxed">
                Stop guessing and start growing. Take the first step today—complete your BizHealth.ai assessment and discover the path forward. We're here to help you succeed, because your victory is ours too.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button 
                    size="lg" 
                    className="bg-white text-biz-navy hover:bg-white/90 font-open-sans font-semibold px-8 py-6 text-lg transition-all hover:scale-105 shadow-lg"
                  >
                    Start Your Assessment
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-biz-navy font-open-sans font-semibold px-8 py-6 text-lg transition-all hover:scale-105"
                  >
                    Learn How It Works
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <GlobalFooter />
      </div>
    </>
  );
};

export default About;
