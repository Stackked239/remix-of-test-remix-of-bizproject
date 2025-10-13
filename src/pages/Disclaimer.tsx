import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from '@/components/GlobalFooter';
import PromotionalBanner from '@/components/PromotionalBanner';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShieldAlert, AlertTriangle, Scale, FileCheck } from 'lucide-react';

const Disclaimer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Disclaimer, Warranty & Guarantee Information | BizHealth.ai</title>
        <meta 
          name="description" 
          content="BizHealth.ai disclaimer, warranty information, and guarantee policy. Understand the nature of our business health assessment tool, limitations of liability, and terms of use for informed decision-making." 
        />
        <meta 
          name="keywords" 
          content="BizHealth disclaimer, warranty, warranties, warranty claim, guarantee, money back guarantee, business assessment disclaimer, no professional advice, limitation of liability, terms of use" 
        />
        <link rel="canonical" href="https://bizhealth.ai/disclaimer" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:title" content="Disclaimer & Warranty Information | BizHealth.ai" />
        <meta property="og:description" content="Important legal information about BizHealth.ai warranties, guarantees, and disclaimers for our business health assessment tool." />
        <meta property="og:url" content="https://bizhealth.ai/disclaimer" />
        <meta property="og:type" content="website" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Disclaimer & Warranty Information",
            "description": "Legal disclaimer, warranty, and guarantee information for BizHealth.ai business health assessment tool",
            "url": "https://bizhealth.ai/disclaimer",
            "publisher": {
              "@type": "Organization",
              "name": "BizHealth.ai",
              "url": "https://bizhealth.ai"
            },
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
                  "name": "Disclaimer",
                  "item": "https://bizhealth.ai/disclaimer"
                }
              ]
            }
          })}
        </script>
      </Helmet>

      <GlobalNavigation />
      <PromotionalBanner />
      
      <main className="min-h-screen bg-gradient-to-b from-biz-white via-biz-white/95 to-biz-navy/5 pt-44 pb-16">
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Header */}
          <header className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <ShieldAlert className="w-16 h-16 text-biz-teal" />
            </div>
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl text-biz-navy mb-4">
              Disclaimer & Warranty Information
            </h1>
            <p className="font-open-sans text-lg text-biz-grey max-w-2xl mx-auto">
              Important legal information regarding warranties, guarantees, and the use of BizHealth.ai
            </p>
            <p className="font-open-sans text-sm text-biz-grey mt-2">
              Last Updated: September 2025
            </p>
          </header>

          <Card className="shadow-elegant mb-8">
            <CardContent className="p-8 md:p-12">
              {/* Important Notice */}
              <div className="bg-biz-teal/10 border-l-4 border-biz-teal rounded-lg p-6 mb-8">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-biz-teal flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="font-montserrat font-bold text-lg text-biz-navy mb-2">
                      Important Notice
                    </h2>
                    <p className="font-open-sans text-biz-grey leading-relaxed">
                      By accessing, using, or completing the BizHealth.ai questionnaire, assessment, or any related services 
                      (collectively, the "Tool"), you acknowledge and agree to the following terms. If you do not agree, 
                      do not use the Tool. Your continued use constitutes acceptance, and this Disclaimer forms a legally 
                      binding agreement enforceable via clickwrap consent.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 1 */}
              <section className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <FileCheck className="w-6 h-6 text-biz-green" />
                  <h2 className="font-montserrat font-bold text-2xl text-biz-navy">
                    1. Nature of the Tool and No Professional Advice
                  </h2>
                </div>
                <Separator className="mb-4" />
                <p className="font-open-sans text-biz-grey leading-relaxed mb-4">
                  BizHealth.ai is an online resource designed to provide general data, insights, and suggestions based 
                  on your inputs for informational purposes only. All outputs, including reports, scores, analyses, and 
                  suggestions, do not constitute financial, accounting, legal, or other professional advice.
                </p>
                <p className="font-open-sans text-biz-grey leading-relaxed">
                  They are not a substitute for advice from qualified professionals such as accountants, attorneys, or 
                  consultants. You should consult with a qualified professional before making any business decisions.
                </p>
              </section>

              {/* Section 2 - Warranties */}
              <section className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldAlert className="w-6 h-6 text-biz-green" />
                  <h2 className="font-montserrat font-bold text-2xl text-biz-navy">
                    2. No Guarantees or Warranties
                  </h2>
                </div>
                <Separator className="mb-4" />
                <p className="font-open-sans text-biz-grey leading-relaxed mb-4">
                  The Tool is provided <strong>"as is"</strong> and <strong>"as available"</strong> without any warranties 
                  of any kind, express or implied, including but not limited to:
                </p>
                <ul className="list-disc list-inside font-open-sans text-biz-grey leading-relaxed space-y-2 ml-4 mb-4">
                  <li>Warranties of accuracy</li>
                  <li>Warranties of completeness</li>
                  <li>Warranties of merchantability</li>
                  <li>Warranties of fitness for a particular purpose</li>
                  <li>Warranties of non-infringement</li>
                </ul>
                <p className="font-open-sans text-biz-grey leading-relaxed">
                  BizHealth.ai does not guarantee any specific results, outcomes, improvements, or the accuracy of 
                  information provided. All content is general and not tailored to your specific circumstances.
                </p>
              </section>

              {/* Section 3 */}
              <section className="mb-8">
                <h2 className="font-montserrat font-bold text-2xl text-biz-navy mb-4">
                  3. Accuracy Disclaimer
                </h2>
                <Separator className="mb-4" />
                <p className="font-open-sans text-biz-grey leading-relaxed">
                  BizHealth.ai assumes no responsibility for any errors or omissions in the content of the Tool or its 
                  outputs. The information is provided for informational purposes only, and we disclaim all liability 
                  for its accuracy or use.
                </p>
              </section>

              {/* Section 4 */}
              <section className="mb-8">
                <h2 className="font-montserrat font-bold text-2xl text-biz-navy mb-4">
                  4. User Responsibility
                </h2>
                <Separator className="mb-4" />
                <p className="font-open-sans text-biz-grey leading-relaxed">
                  You are solely responsible for evaluating, verifying, and approving any decisions, actions, or strategies 
                  based on the Tool's outputs. BizHealth.ai assumes no responsibility for any business, management, ownership, 
                  or other decisions made or actions taken as a result of using the Tool.
                </p>
              </section>

              {/* Section 5 */}
              <section className="mb-8">
                <h2 className="font-montserrat font-bold text-2xl text-biz-navy mb-4">
                  5. Data Ownership and Use
                </h2>
                <Separator className="mb-4" />
                <p className="font-open-sans text-biz-grey leading-relaxed mb-4">
                  You retain ownership of your data. By using the Tool, you grant BizHealth.ai a non-exclusive license 
                  to use your data to provide and improve the service, including creating aggregated, anonymized statistics.
                </p>
                <p className="font-open-sans text-biz-grey leading-relaxed">
                  All data provided must be accurate and lawfully obtained.
                </p>
              </section>

              {/* Section 6 - Limitation of Liability */}
              <section className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Scale className="w-6 h-6 text-biz-green" />
                  <h2 className="font-montserrat font-bold text-2xl text-biz-navy">
                    6. Limitation of Liability
                  </h2>
                </div>
                <Separator className="mb-4" />
                <div className="bg-biz-grey/10 border border-biz-grey/30 rounded-lg p-6">
                  <p className="font-open-sans text-biz-grey leading-relaxed mb-4">
                    In no event shall BizHealth.ai, its parent company, subsidiaries, affiliates, officers, directors, 
                    employees, or agents be liable for any direct, indirect, incidental, special, consequential, or punitive 
                    damages arising from or related to the use of the Tool, even if advised of the possibility of such damages.
                  </p>
                  <p className="font-open-sans text-biz-grey leading-relaxed font-semibold">
                    Liability is limited to the amount paid for use of the Tool, not exceeding $699 USD. This limitation 
                    applies to the fullest extent permitted by law across all 50 U.S. states and applicable international 
                    jurisdictions.
                  </p>
                </div>
              </section>

              {/* Section 7 */}
              <section className="mb-8">
                <h2 className="font-montserrat font-bold text-2xl text-biz-navy mb-4">
                  7. Data and Privacy
                </h2>
                <Separator className="mb-4" />
                <p className="font-open-sans text-biz-grey leading-relaxed mb-4">
                  Your inputs are used solely for generating outputs and are handled in accordance with our{' '}
                  <Link to="/privacy" className="text-biz-teal hover:text-biz-green underline">
                    Privacy Policy
                  </Link>.
                </p>
                <p className="font-open-sans text-biz-grey leading-relaxed">
                  You represent that all data provided is accurate and lawfully obtained.
                </p>
              </section>

              {/* Section 8 */}
              <section className="mb-8">
                <h2 className="font-montserrat font-bold text-2xl text-biz-navy mb-4">
                  8. Governing Law
                </h2>
                <Separator className="mb-4" />
                <p className="font-open-sans text-biz-grey leading-relaxed">
                  This disclaimer shall be governed by the laws of the State of Florida, without regard to conflict of 
                  laws principles. Any disputes shall be resolved in the courts of Florida.
                </p>
              </section>

              {/* Acceptance */}
              <section className="mt-10">
                <div className="bg-biz-green/10 border-l-4 border-biz-green rounded-lg p-6">
                  <h3 className="font-montserrat font-bold text-lg text-biz-navy mb-3">
                    Acceptance of Terms
                  </h3>
                  <p className="font-open-sans text-biz-grey leading-relaxed">
                    By clicking "I Agree" or proceeding, you confirm you are authorized to agree on behalf of your 
                    business and accept these terms.
                  </p>
                </div>
              </section>

              {/* Contact */}
              <section className="mt-10 pt-8 border-t border-biz-grey/20">
                <h3 className="font-montserrat font-bold text-xl text-biz-navy mb-4">
                  Questions About Our Disclaimer or Warranty Policy?
                </h3>
                <p className="font-open-sans text-biz-grey leading-relaxed mb-4">
                  If you have any questions regarding this disclaimer, warranty information, or guarantee policy, please contact us:
                </p>
                <div className="space-y-2 font-open-sans text-biz-grey">
                  <p>
                    <strong>Email:</strong>{' '}
                    <a href="mailto:support@bizhealth.ai" className="text-biz-teal hover:text-biz-green underline">
                      support@bizhealth.ai
                    </a>
                  </p>
                  <p>
                    <strong>Phone:</strong> 1-855-476-8322
                  </p>
                </div>
              </section>
            </CardContent>
          </Card>

          {/* Related Links */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-montserrat font-bold text-lg text-biz-navy mb-3">
                  Related Information
                </h3>
                <ul className="space-y-2 font-open-sans">
                  <li>
                    <Link to="/terms" className="text-biz-teal hover:text-biz-green underline">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy" className="text-biz-teal hover:text-biz-green underline">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-montserrat font-bold text-lg text-biz-navy mb-3">
                  Need Help?
                </h3>
                <p className="font-open-sans text-biz-grey mb-3">
                  Have questions about our services?
                </p>
                <Link to="/contact">
                  <button className="bg-biz-teal hover:bg-biz-green text-white font-open-sans px-6 py-2 rounded-lg transition-colors">
                    Contact Us
                  </button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </article>
      </main>

      <GlobalFooter />
    </>
  );
};

export default Disclaimer;
