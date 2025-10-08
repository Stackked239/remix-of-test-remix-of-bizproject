import { Helmet } from 'react-helmet-async';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from '@/components/GlobalFooter';
import { Card, CardContent } from '@/components/ui/card';
import bizhealthLogo from '@/assets/bizhealth-logo-main.jpg';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - BizHealth.ai | Data Protection & Security</title>
        <meta 
          name="description" 
          content="BizHealth.ai Privacy Policy. Learn how we protect your business data with GDPR, CCPA compliance, encryption, and transparent data practices for SMB business health diagnostics." 
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://bizhealth.ai/privacy" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <GlobalNavigation />
        
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Header */}
          <header className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <img 
                src={bizhealthLogo} 
                alt="BizHealth.ai Logo" 
                className="h-16 md:h-20 w-auto"
              />
            </div>
            <h1 className="font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl text-biz-navy mb-4">
              BizHealth.ai Privacy Policy
            </h1>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-biz-grey font-open-sans text-sm md:text-base">
              <p><strong>Effective:</strong> October 8, 2025</p>
              <span className="hidden sm:inline">|</span>
              <p><strong>Last Updated:</strong> October 8, 2025</p>
            </div>
          </header>

          {/* Introduction */}
          <Card className="mb-8 bg-biz-white border-biz-grey/30">
            <CardContent className="p-6 md:p-8">
              <p className="font-open-sans text-base md:text-lg text-biz-grey leading-relaxed">
                At BizHealth.ai, your trusted Business Health Advisor, we empower micro-, small-, and mid-sized businesses with AI-driven diagnostics to eliminate guesswork and fuel growth. We take data privacy seriously, processing questionnaire inputs transparently to deliver insights without traditional consulting risks. This policy complies with U.S. laws (e.g., CCPA for California residents), GDPR for EU/EEA users (e.g., UK/Germany expansions), and global standards. By using our platform, you consent to these practices. Questions? Contact <a href="mailto:support@bizhealth.ai" className="text-biz-teal hover:underline">support@bizhealth.ai</a>.
              </p>
            </CardContent>
          </Card>

          {/* Section 1 */}
          <section className="mb-8">
            <Card className="bg-biz-white border-biz-grey/30">
              <CardContent className="p-6 md:p-8">
                <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-biz-navy mb-6">
                  1. Information We Collect
                </h2>
                <p className="font-open-sans text-base text-biz-grey leading-relaxed mb-4">
                  We collect only necessary data for analytics across 12 areas (e.g., Strategy, Financials).
                </p>
                <ul className="space-y-4 font-open-sans text-base text-biz-grey leading-relaxed list-none pl-0">
                  <li>
                    <strong className="text-biz-navy">Provided by You:</strong> Name, email, phone, business details (e.g., revenue, employee count), and questionnaire responses (e.g., KPIs like EBITDA, operational metrics). For payments ($99-$299 tiers), billing/shipping info.
                  </li>
                  <li>
                    <strong className="text-biz-navy">Automatically Collected:</strong> IP address, device/browser type, usage logs (e.g., session duration for 30-40 min assessments), and cookies for personalization.
                  </li>
                  <li>
                    <strong className="text-biz-navy">Sensitive Data:</strong> Limited to business-relevant inputs (e.g., no health/medical data; anonymized where possible). For EU users, we minimize collection per GDPR Art. 5. We do not collect data from children under 13 (COPPA-compliant).
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Section 2 */}
          <section className="mb-8">
            <Card className="bg-biz-white border-biz-grey/30">
              <CardContent className="p-6 md:p-8">
                <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-biz-navy mb-6">
                  2. How We Use Your Information
                </h2>
                <p className="font-open-sans text-base text-biz-grey leading-relaxed mb-4">
                  Data powers your diagnostics:
                </p>
                <ul className="space-y-3 font-open-sans text-base text-biz-grey leading-relaxed list-disc pl-6">
                  <li>Generate reports (e.g., Owner's Report with benchmarks vs. SBA/Gartner).</li>
                  <li>Personalize insights (e.g., scaling recommendations for cash flow pains).</li>
                  <li>Improve platform (e.g., AI training on aggregated, anonymized data).</li>
                  <li>Communicate (e.g., report emails, optional newsletters).</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Section 3 */}
          <section className="mb-8">
            <Card className="bg-biz-white border-biz-grey/30">
              <CardContent className="p-6 md:p-8">
                <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-biz-navy mb-6">
                  3. Sharing Your Information
                </h2>
                <p className="font-open-sans text-base text-biz-grey leading-relaxed mb-4">
                  We share minimally:
                </p>
                <ul className="space-y-4 font-open-sans text-base text-biz-grey leading-relaxed list-none pl-0">
                  <li>
                    <strong className="text-biz-navy">Service Providers:</strong> Payment processors (e.g., Stripe), cloud hosts (e.g., AWS), AI analytics partners—bound by contracts.
                  </li>
                  <li>
                    <strong className="text-biz-navy">Business Transfers:</strong> In mergers (with notice).
                  </li>
                  <li>
                    <strong className="text-biz-navy">Legal Needs:</strong> To authorities or for rights protection. No sales/sharing for ads. For EU transfers (e.g., U.S. servers), we use Standard Contractual Clauses (SCCs) per GDPR Ch. V. Aggregated insights may be public (anonymized).
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Section 4 */}
          <section className="mb-8">
            <Card className="bg-biz-white border-biz-grey/30">
              <CardContent className="p-6 md:p-8">
                <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-biz-navy mb-6">
                  4. Data Security
                </h2>
                <p className="font-open-sans text-base text-biz-grey leading-relaxed mb-4">
                  We protect data with:
                </p>
                <ul className="space-y-3 font-open-sans text-base text-biz-grey leading-relaxed list-disc pl-6">
                  <li>Encryption (in-transit/at-rest for questionnaires).</li>
                  <li>Access controls (role-based for reports).</li>
                  <li>Regular audits (SOC 2-aligned).</li>
                </ul>
                <p className="font-open-sans text-base text-biz-grey leading-relaxed mt-4">
                  No system is 100% secure; we notify breaches per law (e.g., GDPR 72-hour rule).
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Section 5 */}
          <section className="mb-8">
            <Card className="bg-biz-white border-biz-grey/30">
              <CardContent className="p-6 md:p-8">
                <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-biz-navy mb-6">
                  5. Your Rights
                </h2>
                <p className="font-open-sans text-base text-biz-grey leading-relaxed mb-4">
                  Exercise rights anytime (response within 30 days):
                </p>
                <ul className="space-y-4 font-open-sans text-base text-biz-grey leading-relaxed list-none pl-0">
                  <li>
                    <strong className="text-biz-navy">Access/Correct:</strong> View/edit data.
                  </li>
                  <li>
                    <strong className="text-biz-navy">Delete/Portability:</strong> Erase or export (subject to legal holds).
                  </li>
                  <li>
                    <strong className="text-biz-navy">Opt-Out:</strong> Marketing (unsubscribe), cookies (banner), CCPA "Do Not Sell" (none apply).
                  </li>
                  <li>
                    <strong className="text-biz-navy">GDPR-Specific (EU/EEA):</strong> Object/restrict processing; right to be forgotten. Contact DPO at <a href="mailto:dpo@bizhealth.ai" className="text-biz-teal hover:underline">dpo@bizhealth.ai</a>. Lodge complaints with authorities (e.g., ICO for UK).
                  </li>
                  <li>
                    <strong className="text-biz-navy">CCPA-Specific (CA Residents):</strong> Know/disclose/delete data; non-discrimination.
                  </li>
                </ul>
                <p className="font-open-sans text-base text-biz-grey leading-relaxed mt-4">
                  For all requests: Email <a href="mailto:support@bizhealth.ai" className="text-biz-teal hover:underline">support@bizhealth.ai</a> with verification.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Section 6 */}
          <section className="mb-8">
            <Card className="bg-biz-white border-biz-grey/30">
              <CardContent className="p-6 md:p-8">
                <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-biz-navy mb-6">
                  6. Cookies & Tracking
                </h2>
                <p className="font-open-sans text-base text-biz-grey leading-relaxed">
                  We use essential cookies (functionality) and analytics (Google Analytics—opt-out via tools). Consent banners for non-essential (GDPR/CCPA). Manage via browser settings.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Section 7 */}
          <section className="mb-8">
            <Card className="bg-biz-white border-biz-grey/30">
              <CardContent className="p-6 md:p-8">
                <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-biz-navy mb-6">
                  7. International Transfers
                </h2>
                <p className="font-open-sans text-base text-biz-grey leading-relaxed">
                  U.S.-based, we process global data (e.g., UK/Australia hubs) with safeguards (e.g., adequacy for Canada). EU data: SCCs/BCRs.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Section 8 */}
          <section className="mb-8">
            <Card className="bg-biz-white border-biz-grey/30">
              <CardContent className="p-6 md:p-8">
                <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-biz-navy mb-6">
                  8. Changes to This Policy
                </h2>
                <p className="font-open-sans text-base text-biz-grey leading-relaxed">
                  Updates posted here/email notice. Continued use = acceptance. Check annually.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Footer Note */}
          <Card className="bg-biz-navy/5 border-biz-teal/30">
            <CardContent className="p-6 text-center">
              <p className="font-montserrat font-semibold text-biz-navy text-lg mb-2">
                BizHealth.ai | Stop Guessing, Start Growing
              </p>
              <p className="font-open-sans text-sm text-biz-grey">
                <a href="https://www.bizhealth.ai" className="text-biz-teal hover:underline">www.bizhealth.ai</a>
              </p>
              <p className="font-open-sans text-xs text-biz-grey mt-2">
                © 2025 BizHealth.ai. Confidential for internal use.
              </p>
            </CardContent>
          </Card>
        </main>

        <GlobalFooter />
      </div>
    </>
  );
};

export default PrivacyPolicy;