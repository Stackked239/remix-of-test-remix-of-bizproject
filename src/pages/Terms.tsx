import { Helmet } from 'react-helmet-async';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from '@/components/GlobalFooter';
import PromotionalBanner from '@/components/PromotionalBanner';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { ArrowUp, FileText, Scale, Shield, Lock, AlertCircle, FileCheck, Gavel } from 'lucide-react';

const Terms = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 150) {
          current = section.getAttribute('id') || '';
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const sections = [
    { id: 'description', title: 'Service Description', icon: FileText },
    { id: 'advice', title: 'No Professional Advice', icon: AlertCircle },
    { id: 'ip', title: 'Intellectual Property', icon: Shield },
    { id: 'warranties', title: 'Warranties Disclaimer', icon: FileCheck },
    { id: 'liability', title: 'Limitation of Liability', icon: Scale },
    { id: 'indemnification', title: 'Indemnification', icon: Gavel },
    { id: 'privacy', title: 'Data Privacy', icon: Lock },
    { id: 'termination', title: 'Termination', icon: AlertCircle },
    { id: 'governing', title: 'Governing Law', icon: Scale },
    { id: 'misc', title: 'Miscellaneous', icon: FileText },
  ];

  return (
    <>
      <Helmet>
        <title>Terms of Service Agreement | BizHealth.ai Business Analytics Platform</title>
        <meta 
          name="description" 
          content="Comprehensive Terms of Service for BizHealth.ai's AI-powered business health diagnostic platform. Review user agreements, warranties, liability terms, and data privacy policies. Updated September 2025." 
        />
        <meta 
          name="keywords" 
          content="terms of service, user agreement, terms and conditions, BizHealth.ai legal terms, business analytics agreement, AI diagnostics terms, SaaS terms of service, business diagnostic platform agreement" 
        />
        <link rel="canonical" href="https://bizhealth.ai/terms" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Terms of Service Agreement | BizHealth.ai" />
        <meta property="og:description" content="Review BizHealth.ai's comprehensive Terms of Service governing our AI-powered business health diagnostic platform." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bizhealth.ai/terms" />
        <meta property="og:image" content="https://bizhealth.ai/og-images/og-homepage.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Terms of Service | BizHealth.ai" />
        <meta name="twitter:description" content="BizHealth.ai Terms of Service - AI-powered business health diagnostics platform user agreement." />
      </Helmet>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Terms of Service",
            "description": "BizHealth.ai Terms of Service Agreement",
            "url": "https://bizhealth.ai/terms",
            "publisher": {
              "@type": "Organization",
              "name": "BizHealth.ai",
              "url": "https://bizhealth.ai"
            },
            "datePublished": "2025-09-02",
            "dateModified": "2025-09-02",
            "inLanguage": "en-US",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://bizhealth.ai"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Terms of Service",
                  "item": "https://bizhealth.ai/terms"
                }
              ]
            }
          })
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-background to-biz-white/30">
        <PromotionalBanner />
        <GlobalNavigation />
        
        <main className="container mx-auto px-4 pt-44 pb-16 max-w-7xl">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center space-x-2 text-sm font-open-sans">
              <li>
                <a href="/" className="text-biz-grey hover:text-biz-teal transition-colors">
                  Home
                </a>
              </li>
              <li className="text-biz-grey">/</li>
              <li className="text-biz-navy font-semibold" aria-current="page">
                Terms of Service
              </li>
            </ol>
          </nav>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-biz-navy mb-4">
              Terms of Service Agreement
            </h1>
            <p className="text-lg md:text-xl font-open-sans text-biz-grey mb-2">
              AI-Powered Business Health Diagnostic Platform
            </p>
            <p className="text-sm font-open-sans text-biz-grey">
              <time dateTime="2025-09-02">Last Updated: September 2, 2025</time>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Table of Contents - Sticky Sidebar */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <Card className="shadow-elegant border-border/50">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-montserrat font-bold text-biz-navy mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Quick Navigation
                    </h2>
                    <nav aria-label="Table of contents">
                      <ul className="space-y-2">
                        {sections.map((section) => {
                          const Icon = section.icon;
                          return (
                            <li key={section.id}>
                              <button
                                onClick={() => scrollToSection(section.id)}
                                className={`w-full text-left text-sm font-open-sans px-3 py-2 rounded-md transition-all flex items-center gap-2 ${
                                  activeSection === section.id
                                    ? 'bg-biz-teal/10 text-biz-teal font-semibold'
                                    : 'text-biz-grey hover:bg-biz-grey/5 hover:text-biz-navy'
                                }`}
                              >
                                <Icon className="w-4 h-4 flex-shrink-0" />
                                <span className="truncate">{section.title}</span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </nav>
                  </CardContent>
                </Card>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3">

              <Card className="shadow-elegant border-border/50">
                <CardContent className="p-8 md:p-12">
                  <article className="prose prose-lg max-w-none font-open-sans">
                    {/* Introduction */}
                    <div className="bg-gradient-to-r from-biz-teal/5 to-biz-green/5 border-l-4 border-biz-teal rounded-r-lg p-6 mb-8">
                      <p className="text-biz-navy font-semibold mb-3 text-lg">
                        Agreement Overview
                      </p>
                      <p className="text-biz-grey leading-relaxed mb-0">
                        These Terms of Service ("ToS") govern your access to and use of BizHealth.ai (the "Service"), 
                        an online AI-powered business health diagnostic tool provided by BizHealth.ai, a company registered 
                        in the State of Florida ("we," "us," or "our"). By accessing or using the Service, including 
                        completing the questionnaire or receiving any analysis or reports, you agree to be bound by these ToS. 
                        If you do not agree, do not use the Service. Your agreement is confirmed via clickwrap acceptance 
                        before proceeding.
                      </p>
                    </div>

                    <Separator className="my-8" />

                    {/* Section 1 */}
                    <section id="description" className="mb-8 scroll-mt-24">
                      <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-biz-navy mb-4 flex items-center gap-3">
                        <FileText className="w-7 h-7 text-biz-teal" />
                        1. Service Description and Use
                      </h2>
                  <ul className="list-disc pl-6 space-y-3 text-biz-grey leading-relaxed">
                    <li>
                      The Service provides general informational insights, analyses, and suggestions based on 
                      your inputs for business health diagnostics.
                    </li>
                    <li>
                      You are granted a limited, non-exclusive, non-transferable license to use the Service for 
                      your internal business purposes only, subject to these ToS.
                    </li>
                    <li>
                      You must provide accurate, lawfully obtained data and are solely responsible for its content and use.
                    </li>
                  </ul>
                </section>

                    <Separator className="my-8" />

                    {/* Section 2 */}
                    <section id="advice" className="mb-8 scroll-mt-24">
                      <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-biz-navy mb-4 flex items-center gap-3">
                        <AlertCircle className="w-7 h-7 text-biz-teal" />
                        2. No Professional Advice
                      </h2>
                  <ul className="list-disc pl-6 space-y-3 text-biz-grey leading-relaxed">
                    <li>
                      The Service is for informational purposes only and does not constitute financial, legal, 
                      accounting, or other professional advice. Outputs, including reports and suggestions, are 
                      not recommendations or endorsements.
                    </li>
                    <li>
                      Consult qualified professionals (e.g., accountants, attorneys) before making any decisions 
                      based on the Service. We disclaim any liability for actions taken or not taken based on the Service.
                    </li>
                  </ul>
                </section>

                    <Separator className="my-8" />

                    {/* Section 3 */}
                    <section id="ip" className="mb-8 scroll-mt-24">
                      <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-biz-navy mb-4 flex items-center gap-3">
                        <Shield className="w-7 h-7 text-biz-teal" />
                        3. Intellectual Property Ownership
                      </h2>
                  <ul className="list-disc pl-6 space-y-3 text-biz-grey leading-relaxed">
                    <li>
                      We own all rights, title, and interest in the Service, including software, code, algorithms, 
                      logos, trademarks, and other proprietary materials.
                    </li>
                    <li>
                      You may not reverse-engineer, copy, modify, distribute, resell, or create derivative works 
                      from the Service.
                    </li>
                    <li>
                      You grant us a non-exclusive license to use your data to provide and improve the Service, 
                      including for aggregated, anonymized statistics.
                    </li>
                  </ul>
                </section>

                    <Separator className="my-8" />

                    {/* Section 4 */}
                    <section id="warranties" className="mb-8 scroll-mt-24">
                      <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-biz-navy mb-4 flex items-center gap-3">
                        <FileCheck className="w-7 h-7 text-biz-teal" />
                        4. Warranties Disclaimer
                      </h2>
                  <ul className="list-disc pl-6 space-y-3 text-biz-grey leading-relaxed">
                    <li>
                      The Service is provided "as is" and "as available" without warranties of any kind, express 
                      or implied, including accuracy, completeness, merchantability, fitness for a particular purpose, 
                      or non-infringement.
                    </li>
                    <li>
                      We do not guarantee error-free operation, specific results, or uninterrupted access.
                    </li>
                  </ul>
                </section>

                    <Separator className="my-8" />

                    {/* Section 5 */}
                    <section id="liability" className="mb-8 scroll-mt-24">
                      <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-biz-navy mb-4 flex items-center gap-3">
                        <Scale className="w-7 h-7 text-biz-teal" />
                        5. Limitation of Liability
                      </h2>
                  <ul className="list-disc pl-6 space-y-3 text-biz-grey leading-relaxed">
                    <li>
                      In no event shall we, our parent company, subsidiaries, affiliates, officers, directors, 
                      employees, or agents be liable for any direct, indirect, incidental, special, consequential, 
                      or punitive damages arising from or related to the Service, even if advised of the possibility thereof.
                    </li>
                    <li>
                      Our total liability is limited to the amount you paid for the Service, not exceeding $299 USD.
                    </li>
                    <li>
                      This limitation applies to the fullest extent permitted by law.
                    </li>
                  </ul>
                </section>

                    <Separator className="my-8" />

                    {/* Section 6 */}
                    <section id="indemnification" className="mb-8 scroll-mt-24">
                      <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-biz-navy mb-4 flex items-center gap-3">
                        <Gavel className="w-7 h-7 text-biz-teal" />
                        6. Indemnification
                      </h2>
                  <p className="text-biz-grey leading-relaxed">
                    You agree to indemnify, defend, and hold us harmless from any claims, losses, damages, or 
                    expenses arising from your use of the Service, violation of these ToS, or infringement of 
                    third-party rights.
                  </p>
                </section>

                    <Separator className="my-8" />

                    {/* Section 7 */}
                    <section id="privacy" className="mb-8 scroll-mt-24">
                      <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-biz-navy mb-4 flex items-center gap-3">
                        <Lock className="w-7 h-7 text-biz-teal" />
                        7. Data Privacy and Security
                      </h2>
                  <ul className="list-disc pl-6 space-y-3 text-biz-grey leading-relaxed">
                    <li>
                      Your data is handled in accordance with our Privacy Policy, incorporated herein.
                    </li>
                    <li>
                      You represent that all data provided is accurate, lawfully obtained, and does not infringe 
                      third-party rights.
                    </li>
                    <li>
                      We comply with applicable data privacy laws, but you are responsible for your data's compliance.
                    </li>
                  </ul>
                </section>

                    <Separator className="my-8" />

                    {/* Section 8 */}
                    <section id="termination" className="mb-8 scroll-mt-24">
                      <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-biz-navy mb-4 flex items-center gap-3">
                        <AlertCircle className="w-7 h-7 text-biz-teal" />
                        8. Termination
                      </h2>
                  <ul className="list-disc pl-6 space-y-3 text-biz-grey leading-relaxed">
                    <li>
                      We may terminate or suspend your access to the Service at any time for violation of these 
                      ToS or other reasons.
                    </li>
                    <li>
                      Upon termination, your license ends, and you must cease use.
                    </li>
                  </ul>
                </section>

                    <Separator className="my-8" />

                    {/* Section 9 */}
                    <section id="governing" className="mb-8 scroll-mt-24">
                      <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-biz-navy mb-4 flex items-center gap-3">
                        <Scale className="w-7 h-7 text-biz-teal" />
                        9. Governing Law and Dispute Resolution
                      </h2>
                  <ul className="list-disc pl-6 space-y-3 text-biz-grey leading-relaxed">
                    <li>
                      These ToS are governed by the laws of the State of Florida, without regard to conflict of 
                      laws principles.
                    </li>
                    <li>
                      Any disputes shall be resolved exclusively in the state or federal courts located in Florida.
                    </li>
                  </ul>
                </section>

                    <Separator className="my-8" />

                    {/* Section 10 */}
                    <section id="misc" className="mb-8 scroll-mt-24">
                      <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-biz-navy mb-4 flex items-center gap-3">
                        <FileText className="w-7 h-7 text-biz-teal" />
                        10. Miscellaneous
                      </h2>
                  <ul className="list-disc pl-6 space-y-3 text-biz-grey leading-relaxed">
                    <li>
                      These ToS constitute the entire agreement and supersede prior understandings.
                    </li>
                    <li>
                      We may update these ToS; continued use constitutes acceptance of changes.
                    </li>
                    <li>
                      If any provision is invalid, the remainder remains enforceable.
                    </li>
                    <li>
                      No waiver of any term is binding unless in writing.
                    </li>
                  </ul>
                </section>

                    <Separator className="my-8" />

                    {/* Acceptance Statement */}
                    <div className="bg-gradient-to-r from-biz-green/10 to-biz-teal/10 border-2 border-biz-green/30 rounded-lg p-6 mt-8">
                      <p className="text-biz-navy font-semibold leading-relaxed mb-0">
                        <strong>Your Acceptance:</strong> By clicking "I Agree" or proceeding to use the Service, you confirm 
                        you are authorized to bind your business and accept these Terms of Service in their entirety.
                      </p>
                    </div>

                    {/* Contact CTA */}
                    <div className="bg-biz-navy/5 rounded-lg p-6 mt-8 text-center">
                      <p className="text-biz-grey font-open-sans mb-4">
                        Have questions about these terms or need clarification?
                      </p>
                      <Button 
                        asChild
                        className="bg-biz-teal hover:bg-biz-teal/90 text-white font-open-sans"
                      >
                        <a href="/contact">Contact Our Client Services Team</a>
                      </Button>
                    </div>
                  </article>
                </CardContent>
              </Card>

              {/* Quick Links Card */}
              <Card className="shadow-elegant border-border/50 mt-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-montserrat font-bold text-biz-navy mb-4">
                    Related Legal Documents
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Button 
                      asChild
                      variant="outline"
                      className="justify-start font-open-sans"
                    >
                      <a href="/privacy">
                        <Shield className="w-4 h-4 mr-2" />
                        Privacy Policy
                      </a>
                    </Button>
                    <Button 
                      asChild
                      variant="outline"
                      className="justify-start font-open-sans"
                    >
                      <a href="/disclaimer">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Disclaimer
                      </a>
                    </Button>
                    <Button 
                      asChild
                      variant="outline"
                      className="justify-start font-open-sans"
                    >
                      <a href="/contact">
                        <FileText className="w-4 h-4 mr-2" />
                        Contact Us
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        {/* Back to Top Button */}
        {showBackToTop && (
          <Button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-biz-teal hover:bg-biz-teal/90 text-white rounded-full p-3 shadow-elegant z-50 transition-all hover:scale-110"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
        )}

        <GlobalFooter />
      </div>
    </>
  );
};

export default Terms;
