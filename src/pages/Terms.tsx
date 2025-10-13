import { Helmet } from 'react-helmet-async';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from '@/components/GlobalFooter';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useEffect } from 'react';

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Terms of Service | BizHealth.ai - AI-Powered Business Health Diagnostics</title>
        <meta 
          name="description" 
          content="Read BizHealth.ai's Terms of Service governing your use of our AI-powered business health diagnostic platform. Effective September 2, 2025." 
        />
        <meta 
          name="keywords" 
          content="terms of service, user agreement, terms and conditions, BizHealth.ai legal, business analytics terms, AI diagnostics terms" 
        />
        <link rel="canonical" href="https://bizhealth.ai/terms" />
        <meta property="og:title" content="Terms of Service | BizHealth.ai" />
        <meta property="og:description" content="BizHealth.ai Terms of Service - Governing your use of our AI-powered business health diagnostic platform." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bizhealth.ai/terms" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background to-biz-white/30">
        <GlobalNavigation />
        
        <main className="container mx-auto px-4 pt-32 pb-16 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-biz-navy mb-4">
              Terms of Service
            </h1>
            <p className="text-lg font-open-sans text-biz-grey">
              Effective Date: September 2, 2025
            </p>
          </div>

          <Card className="shadow-elegant border-border/50">
            <CardContent className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none font-open-sans">
                <p className="text-biz-grey leading-relaxed mb-6">
                  These Terms of Service ("ToS") govern your access to and use of BizHealth.ai (the "Service"), 
                  an online AI-powered business health diagnostic tool provided by BizHealth.ai, a company registered 
                  in the State of Florida ("we," "us," or "our"). By accessing or using the Service, including 
                  completing the questionnaire or receiving any analysis or reports, you agree to be bound by these ToS. 
                  If you do not agree, do not use the Service. Your agreement is confirmed via clickwrap acceptance 
                  before proceeding.
                </p>

                <Separator className="my-8" />

                <section className="mb-8">
                  <h2 className="text-2xl font-montserrat font-bold text-biz-navy mb-4">
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

                <section className="mb-8">
                  <h2 className="text-2xl font-montserrat font-bold text-biz-navy mb-4">
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

                <section className="mb-8">
                  <h2 className="text-2xl font-montserrat font-bold text-biz-navy mb-4">
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

                <section className="mb-8">
                  <h2 className="text-2xl font-montserrat font-bold text-biz-navy mb-4">
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

                <section className="mb-8">
                  <h2 className="text-2xl font-montserrat font-bold text-biz-navy mb-4">
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

                <section className="mb-8">
                  <h2 className="text-2xl font-montserrat font-bold text-biz-navy mb-4">
                    6. Indemnification
                  </h2>
                  <p className="text-biz-grey leading-relaxed">
                    You agree to indemnify, defend, and hold us harmless from any claims, losses, damages, or 
                    expenses arising from your use of the Service, violation of these ToS, or infringement of 
                    third-party rights.
                  </p>
                </section>

                <Separator className="my-8" />

                <section className="mb-8">
                  <h2 className="text-2xl font-montserrat font-bold text-biz-navy mb-4">
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

                <section className="mb-8">
                  <h2 className="text-2xl font-montserrat font-bold text-biz-navy mb-4">
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

                <section className="mb-8">
                  <h2 className="text-2xl font-montserrat font-bold text-biz-navy mb-4">
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

                <section className="mb-8">
                  <h2 className="text-2xl font-montserrat font-bold text-biz-navy mb-4">
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

                <div className="bg-biz-green/10 border border-biz-green/30 rounded-lg p-6 mt-8">
                  <p className="text-biz-navy font-semibold leading-relaxed">
                    By clicking "I Agree" or proceeding, you confirm you are authorized to bind your business 
                    and accept these Terms of Service.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-biz-grey font-open-sans">
              Questions about our Terms of Service? <a href="/contact" className="text-biz-green hover:text-biz-navy transition-colors font-semibold">Contact us</a>
            </p>
          </div>
        </main>

        <GlobalFooter />
      </div>
    </>
  );
};

export default Terms;
