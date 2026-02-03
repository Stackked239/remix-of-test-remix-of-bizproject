import { useState, useEffect } from 'react';
import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';
import { 
  AlertTriangle, 
  FileText, 
  Lock, 
  ShieldCheck, 
  ChevronDown, 
  ArrowRight,
  Mail,
  Shield,
  Globe,
  Building2,
  Lock as LockIcon
} from 'lucide-react';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from '@/components/GlobalFooter';
import GradientDivider from '@/components/GradientDivider';
import PromotionalBanner from '@/components/PromotionalBanner';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// FAQ data
const faqItems = [
  {
    question: "What happens to my business data?",
    answer: "Your business data is encrypted in transit and at rest, securely stored on SOC 2-compliant infrastructure, and used exclusively to generate your personalized assessment. We never sell your data or share it with third parties without explicit consent. When you're done with BizHealth.ai, your data goes with you—or we delete it entirely."
  },
  {
    question: "Can I delete my account and all data?",
    answer: "Absolutely. Request account deletion anytime and we'll purge all personal and business data within 30 days. Certain records may be retained briefly for legal compliance, but your business intelligence and assessment data will be completely removed."
  },
  {
    question: "Is my financial information secure?",
    answer: "Yes. All financial data uses AES-256 encryption, TLS 1.3 for transmission, and is stored on infrastructure that meets SOC 2 Type II standards. We undergo regular third-party security audits to verify our protections."
  },
  {
    question: "Do you comply with GDPR, CCPA, and other data laws?",
    answer: "Yes. BizHealth.ai complies with GDPR (EU), CCPA (California), and other applicable data protection regulations. We respect your data rights regardless of your location and provide clear mechanisms to exercise those rights."
  },
  {
    question: "How is BizHealth.ai different from hiring a consultant?",
    answer: "Unlike traditional consultants who charge $10,000+ with variable results, BizHealth.ai delivers consistent, data-driven insights at a fraction of the cost. Our AI-powered analysis is unbiased, available on-demand, and backed by frameworks used by top consulting firms—without the guesswork of consultant quality."
  },
  {
    question: "What if I'm not satisfied with my assessment?",
    answer: "We stand behind our value. If your assessment doesn't provide actionable insights, contact us within 14 days and we'll make it right. Our goal is your business growth, not just a transaction."
  },
  {
    question: "Who has access to my assessment results?",
    answer: "Only you. Your results are private to your account. Our team cannot access your specific business data without your explicit permission (e.g., if you request support). We use aggregated, anonymized data only for improving our algorithms."
  }
];

// Legal document cards data
const legalCards = [
  {
    title: "Disclaimer",
    description: "Understand the scope of our services, the nature of AI-generated insights, and the boundaries of our recommendations.",
    icon: AlertTriangle,
    iconColor: "#DC2626",
    bracketColor: "#242553",
    readTime: "3-4 min read",
    updated: "Dec 2025",
    link: "/disclaimer",
    cta: "View Disclaimer"
  },
  {
    title: "Terms of Service",
    description: "The complete agreement governing your use of BizHealth.ai—your rights, our responsibilities, and how we work together.",
    icon: FileText,
    iconColor: "#2563EB",
    bracketColor: "#242553",
    readTime: "5-7 min read",
    updated: "Dec 2025",
    link: "/terms",
    cta: "View Terms"
  },
  {
    title: "Privacy Policy",
    description: "How we collect, protect, and use your information. Your business data stays your business—here's exactly how we ensure that.",
    icon: Lock,
    iconColor: "#7C3AED",
    bracketColor: "#242553",
    readTime: "5-7 min read",
    updated: "Dec 2025",
    link: "/privacy",
    cta: "View Privacy Policy"
  },
  {
    title: "Security & Compliance",
    description: "Enterprise-grade security for your business data. Learn about our encryption, certifications, and ongoing security practices.",
    icon: ShieldCheck,
    iconColor: "#008080",
    bracketColor: "#242553",
    readTime: "4-5 min read",
    updated: "Dec 2025",
    link: "/security",
    cta: "View Security Info"
  }
];

// Trust badges data
const trustBadges = [
  { icon: Shield, label: "SOC 2 Compliant" },
  { icon: Globe, label: "GDPR Ready" },
  { icon: Building2, label: "CCPA Compliant" },
  { icon: LockIcon, label: "256-bit SSL" }
];

const Legal = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Schema.org structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://bizhealth.ai/legal",
        "name": "Legal",
        "description": "BizHealth.ai legal hub with privacy policy, terms of service, security information, and disclaimers",
        "url": "https://bizhealth.ai/legal",
        "isPartOf": {
          "@type": "WebSite",
          "name": "BizHealth.ai",
          "url": "https://bizhealth.ai"
        }
      },
      {
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
            "name": "Legal",
            "item": "https://bizhealth.ai/legal"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqItems.slice(0, 4).map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      }
    ]
  };

  return (
    <>
      <SEO
        title="Legal - BizHealth.ai | Privacy, Terms & Security"
        description="BizHealth.ai's legal hub: straightforward privacy policy, terms of service, security practices, and disclaimers. No legalese—just clear protection for your business."
        canonical="https://bizhealth.ai/legal"
        ogImage="/og-images/og-homepage.jpg"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      <PromotionalBanner />
      <GlobalNavigation />

      <main className="min-h-screen pt-24">
        {/* Hero Header Section */}
        <section 
          className="relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, hsl(233, 43%, 23%) 0%, hsl(230, 48%, 17%) 100%)'
          }}
        >
          {/* Subtle grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
          
          <div className="relative max-w-[1000px] mx-auto px-6 pt-16 pb-12 md:pt-20 md:pb-14 text-center">
            {/* Pre-title Badge */}
            <div className="inline-flex items-center mb-6">
              <span 
                className="text-[11px] font-semibold uppercase tracking-[2px] px-4 py-1.5 rounded-full text-white"
                style={{
                  background: '#969423',
                  border: '1px solid rgba(150, 148, 35, 0.3)'
                }}
              >
                Transparency & Trust
              </span>
            </div>

            {/* Animated Shield Icon - matches Security page */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <ShieldCheck className="w-20 h-20 text-biz-green animate-pulse" strokeWidth={1.5} />
                <div className="absolute inset-0 bg-biz-green/20 blur-xl rounded-full animate-pulse" />
              </div>
            </div>
            
            {/* H1 Title */}
            <h1 
              className="text-4xl md:text-[2.75rem] font-bold text-white mb-5"
              style={{ 
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: '-0.5px'
              }}
            >
              Legal
            </h1>
            
            {/* Subtitle */}
            <p 
              className="text-base md:text-lg max-w-[560px] mx-auto leading-relaxed"
              style={{ 
                color: 'rgba(255,255,255,0.92)',
                fontFamily: "'Open Sans', sans-serif"
              }}
            >
              No surprises. No complex legalese. Just straightforward protection for your business and ours.
            </p>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-[1000px] mx-auto px-6 py-4">
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center gap-2">
                  <badge.icon className="w-5 h-5 text-[#008080]" strokeWidth={1.5} />
                  <span className="text-[13px] font-medium text-biz-grey">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Breadcrumb Navigation */}
        <section className="bg-[#F8F9FB]">
          <div className="max-w-[1000px] mx-auto px-6 py-3.5">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm">
                <li>
                  <Link to="/" className="text-[#008080] hover:underline">
                    Home
                  </Link>
                </li>
                <li className="text-biz-grey/50">→</li>
                <li className="text-biz-navy font-medium">Legal</li>
              </ol>
            </nav>
          </div>
        </section>

        {/* Main Content */}
        <section className="bg-[#F8F9FB] pb-16">
          <div className="max-w-[1000px] mx-auto px-6">
            
            {/* Introduction Card */}
            <div 
              className="bg-white rounded-2xl p-7 md:p-10 shadow-sm mb-12 border-l-[5px]"
              style={{ borderLeftColor: '#969423' }}
            >
              <h2 
                className="text-2xl font-bold text-biz-navy mb-5"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Our Commitment to Clarity
              </h2>
              <div className="space-y-4 text-biz-grey leading-relaxed" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                <p>
                  At BizHealth.ai, we believe you shouldn't need a law degree to understand how your data is protected. Our legal framework is built on the same principle that drives everything we do: eliminate guesswork and give you clear, actionable information.
                </p>
                <p>
                  Below you'll find our key legal documents. Each one is written to be straightforward and accessible—because protecting your business shouldn't be complicated.
                </p>
              </div>
            </div>

            {/* Legal Documents Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
              {legalCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <Link
                    key={index}
                    to={card.link}
                    className="group bg-white rounded-2xl p-8 shadow-sm border-t-[5px] flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                    style={{ borderTopColor: card.bracketColor }}
                  >
                    {/* Icon */}
                    <div className="mb-5">
                      <Icon 
                        className="w-10 h-10" 
                        strokeWidth={1.5}
                        style={{ color: card.iconColor }}
                      />
                    </div>
                    
                    {/* Title */}
                    <h3 
                      className="text-xl font-semibold text-biz-navy mb-3"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {card.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-biz-grey text-[15px] leading-relaxed mb-4 flex-grow">
                      {card.description}
                    </p>
                    
                    {/* Meta Info */}
                    <div className="flex items-center gap-3 text-[13px] text-gray-400 mb-5">
                      <span>📖 {card.readTime}</span>
                      <span className="text-gray-300">|</span>
                      <span>Updated {card.updated}</span>
                    </div>
                    
                    {/* CTA Button */}
                    <div 
                      className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#969423] text-white rounded-xl font-semibold text-[15px] w-fit transition-all duration-300 group-hover:bg-[#7a7a1c] group-hover:translate-x-1 group-hover:shadow-lg"
                      style={{ 
                        fontFamily: "'Montserrat', sans-serif",
                        boxShadow: '0 4px 14px rgba(150, 148, 35, 0.25)'
                      }}
                    >
                      {card.cta}
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* FAQ Accordion Section */}
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm mb-12">
              <h2 
                className="text-2xl font-bold text-biz-navy mb-8"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Common Questions
              </h2>
              
              <div className="divide-y divide-gray-200">
                {faqItems.map((item, index) => (
                  <div key={index} className="group">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="flex justify-between items-center w-full py-5 text-left transition-colors hover:text-[#008080]"
                      aria-expanded={openFaq === index}
                    >
                      <span 
                        className="font-semibold text-biz-navy group-hover:text-[#008080] pr-4"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {item.question}
                      </span>
                      <ChevronDown 
                        className={cn(
                          "w-6 h-6 text-[#008080] flex-shrink-0 transition-transform duration-300",
                          openFaq === index && "rotate-180"
                        )}
                      />
                    </button>
                    
                    <div 
                      className={cn(
                        "overflow-hidden transition-all duration-300",
                        openFaq === index ? "max-h-96 pb-6" : "max-h-0"
                      )}
                    >
                      <p className="text-biz-grey text-[15px] leading-relaxed pr-10">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer CTA Banner */}
            <div 
              className="relative rounded-2xl p-10 md:p-14 text-center overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, hsl(233, 43%, 23%) 0%, hsl(230, 48%, 17%) 100%)'
              }}
            >
              {/* Subtle diagonal pattern */}
              <div 
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`
                }}
              />
              
              <div className="relative">
                <h2 
                  className="text-2xl md:text-[1.75rem] font-bold text-white mb-3"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Ready to See Where Your Business Stands?
                </h2>
                <p 
                  className="text-base max-w-[480px] mx-auto mb-7"
                  style={{ color: 'rgba(255,255,255,0.88)' }}
                >
                  Get your comprehensive business health assessment and start making decisions with confidence.
                </p>
                <Link 
                  to="/pricing"
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#73B955] text-white rounded-xl font-semibold text-base transition-all duration-300 hover:bg-[#5da043] hover:-translate-y-0.5"
                  style={{ 
                    fontFamily: "'Montserrat', sans-serif",
                    boxShadow: '0 4px 16px rgba(115, 185, 85, 0.4)'
                  }}
                >
                  Start Your Assessment
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-white rounded-2xl p-10 md:p-12 shadow-sm mt-12 text-center">
              <h2 
                className="text-xl font-semibold text-biz-navy mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Questions? We're Here to Help
              </h2>
              <p className="text-biz-grey mb-5">
                For legal, privacy, or compliance inquiries, reach out to our team directly.
              </p>
              <a 
                href="mailto:legal@bizhealth.ai"
                className="inline-flex items-center gap-2 text-[#008080] font-semibold hover:underline underline-offset-2"
              >
                <Mail className="w-5 h-5" />
                legal@bizhealth.ai
              </a>
            </div>

          </div>
        </section>
      </main>

      <GradientDivider variant="green-gold" />
      <GlobalFooter />
    </>
  );
};

export default Legal;
