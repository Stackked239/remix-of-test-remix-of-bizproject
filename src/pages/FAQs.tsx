import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import PromotionalBanner from "@/components/PromotionalBanner";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  Search, 
  HelpCircle, 
  Lock, 
  Clock, 
  DollarSign, 
  Globe, 
  Shield, 
  Users, 
  FileText, 
  Settings, 
  BarChart3, 
  ThumbsUp, 
  ThumbsDown, 
  ArrowUp,
  CheckCircle2,
  Bot,
  ArrowDownRight,
  Mail
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import bizHealthLogo from "@/assets/bizhealth-logo-main.jpg";

const FAQs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [feedback, setFeedback] = useState<{ [key: string]: boolean | null }>({});
  const [showBackToTop, setShowBackToTop] = useState(false);

  // FAQ data with icons
  const faqs = [
    {
      id: "what-is",
      question: "What is BizHealth.ai?",
      answer: "BizHealth.ai is a Business Health & Performance Insight Platform that uses a proprietary AI-driven assessment model to assess your business across operational, financial, and leadership dimensions. In 30-40 minutes, you get a tailored report with actionable insights to drive growth, offering 20-25x ROI compared to $10K+ consulting.",
      icon: HelpCircle,
      category: "About"
    },
    {
      id: "business-intelligence",
      question: "Is BizHealth.ai a Business Intelligence (BI) Platform?",
      answer: "No, BizHealth.ai is a Business Health & Performance Insight Platform. We collect, interpret, and analyze qualitative & quantitative business indicators through our proprietary AI-driven assessment model—turning complex operational, financial, and leadership dynamics into an actionable 'business health report.' Unlike BI, we focus on diagnostics, not ongoing data visualization.",
      icon: BarChart3,
      category: "About"
    },
    {
      id: "who-for",
      question: "Who is BizHealth.ai for?",
      answer: "We serve micro-, small-, and mid-sized businesses (1-250 employees, $100K-$50M revenue) including founders, CEOs, COOs, CFOs, and managers. Ideal for those facing cash flow challenges or scaling barriers post-year 3, seeking affordable, data-driven clarity.",
      icon: Users,
      category: "Getting Started"
    },
    {
      id: "how-works",
      question: "How does the assessment work?",
      answer: "Complete a 30-40 minute online questionnaire covering 12 business health areas (e.g., Strategy, Finances). Our AI analyzes your inputs against benchmarks (e.g., IBISWorld) to generate a custom report, delivered via your portal, with prioritized recommendations.",
      icon: Settings,
      category: "Getting Started"
    },
    {
      id: "report-types",
      question: "What type of reports are available?",
      answer: "There are five report types: Comprehensive (full analysis), Owner's (personalized), Executive (C-suite focus), Manager's (team actions), and Employees (motivational overview). Access your reports via links in your client portal.",
      icon: FileText,
      category: "Reports"
    },
    {
      id: "pricing",
      question: "How much does BizHealth.ai cost?",
      answer: "Pricing ranges from $99 to $699 for a one-time diagnostic, delivering 20-25x ROI by replacing costly consulting. Visit bizhealth.ai/pricing for details.",
      icon: DollarSign,
      category: "Pricing"
    },
    {
      id: "data-security",
      question: "Is my data secure?",
      answer: "Yes, we use encryption (in-transit/at-rest), access controls, and SOC 2-aligned audits to protect your data. We collect only business inputs (e.g., revenue, KPIs), comply with GDPR/CCPA, and offer rights to access/delete. See our Privacy Policy at bizhealth.ai/privacy.",
      icon: Lock,
      category: "Security"
    },
    {
      id: "report-time",
      question: "How long does it take to get my report?",
      answer: "Reports are ready within 90 minutes post-assessment, with an email notification alerting you. Log into your portal to retrieve and download your reports and access resources.",
      icon: Clock,
      category: "Reports"
    },
    {
      id: "global-availability",
      question: "Can I use BizHealth.ai globally?",
      answer: "Yes, we serve the U.S., UK, Australia, India, and more, with localized pricing and translations (e.g., UK en-GB via hreflang). Currently available in all U.S. markets; International markets roll out Q1 2026.",
      icon: Globe,
      category: "Availability"
    },
    {
      id: "post-assessment",
      question: "What if I need help after my assessment?",
      answer: "Your BizHealth.ai report provides actionable insights to guide you. For implementation support, explore our network of partnered consulting firms (launching Q1 2026). Stay tuned for our hubs—offering business tools, a knowledge library, and leadership resources—debuting Spring 2026. Access portal resources in the interim.",
      icon: Shield,
      category: "Support"
    },
    {
      id: "technical-skills",
      question: "Do I need technical skills to use BizHealth.ai?",
      answer: "No, our intuitive, mobile-first design requires no tech expertise. Answer questions, and our platform handles the rest—designed for time-scarce leaders.",
      icon: CheckCircle2,
      category: "Getting Started"
    },
    {
      id: "share-report",
      question: "Can I share my report with my team?",
      answer: "Yes, reports are shareable (e.g., Manager's & Employees versions). Ensure internal use only per our confidentiality notice; avoid public distribution without consent.",
      icon: Users,
      category: "Reports"
    },
    {
      id: "business-changes",
      question: "What if my business needs change?",
      answer: "Reassess anytime with a new BizHealth.ai diagnostic to stay aligned with your evolving goals. Many users track their company's progress quarterly (QoQ) and year-over-year (YoY) to measure growth and refine strategies effectively.",
      icon: BarChart3,
      category: "Updates"
    },
    {
      id: "contact",
      question: "How do I contact support?",
      answer: "Email us at <a href='mailto:support@bizhealth.ai' style='color: hsl(var(--biz-green)); text-decoration: underline; font-weight: 600;'>support@bizhealth.ai</a> or call our support line. We're here to simplify your journey and ensure you get the most out of your BizHealth.ai experience.",
      icon: HelpCircle,
      category: "Support"
    }
  ];

  // Categories for table of contents
  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  // Filter FAQs based on search
  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setShowBackToTop(window.scrollY > 400);

      // Update active section
      const sections = document.querySelectorAll("[data-category]");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveSection(section.getAttribute("data-category") || "");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFeedback = (faqId: string, helpful: boolean) => {
    setFeedback({ ...feedback, [faqId]: helpful });
    // In production, send to analytics (e.g., Mixpanel)
    console.log(`FAQ ${faqId} marked as ${helpful ? 'helpful' : 'not helpful'}`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openCodyChat = () => {
    // Try to find and click the Cody widget button
    const codyButton = document.querySelector('.cody-iframe') as HTMLElement;
    if (codyButton) {
      codyButton.click();
    } else {
      // If Cody button not found, try to find any Cody-related element
      const codyElements = document.querySelectorAll('[class*="cody"]');
      if (codyElements.length > 0) {
        (codyElements[0] as HTMLElement).click();
      }
    }
  };

  const scrollToCategory = (category: string) => {
    const element = document.querySelector(`[data-category="${category}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <Helmet>
        <title>BizHealth.ai FAQs | SMB Health Answers 2025</title>
        <meta 
          name="description" 
          content="Get quick answers to your SMB health questions with BizHealth.ai's FAQs. Trusted insights for growth." 
        />
        <meta name="keywords" content="BizHealth FAQs, SMB business health, business assessment questions, business performance platform" />
        <link rel="canonical" href="https://bizhealth.ai/faqs" />
        
        {/* Open Graph */}
        <meta property="og:title" content="BizHealth.ai FAQs | SMB Health Answers 2025" />
        <meta property="og:description" content="Get quick answers to your SMB health questions with BizHealth.ai's FAQs. Trusted insights for growth." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bizhealth.ai/faqs" />
        
        {/* Schema.org markup for FAQs */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
        
        {/* Add scroll padding for anchor links */}
        <style>{`
          html {
            scroll-padding-top: 180px;
          }
        `}</style>
      </Helmet>

      <PromotionalBanner />
      <GlobalNavigation />

      {/* Progress Bar */}
      <Progress 
        value={scrollProgress} 
        className="fixed top-0 left-0 right-0 z-50 h-1 rounded-none"
        style={{ 
          backgroundColor: 'hsl(var(--biz-grey) / 0.2)',
        }}
      />

      <main className="min-h-screen bg-biz-blue-faint pt-24 pb-12 lg:pt-28 lg:pb-16" style={{ scrollMarginTop: '180px' }}>
        {/* Header Section - Full Width BizNavy Background */}
        <div className="bg-biz-navy py-12 md:py-16 mb-12">
          <div className="container mx-auto px-4 max-w-7xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-biz-white" style={{
              fontFamily: 'Montserrat, sans-serif'
            }}>
              Frequently Asked Questions
            </h1>
            <p className="text-lg md:text-xl mb-2 text-biz-white/95" style={{ 
              fontFamily: 'Open Sans, sans-serif',
              lineHeight: '1.5'
            }}>
              We're here to simplify your journey
            </p>
            <p className="text-sm text-biz-white/85" style={{ 
              fontFamily: 'Open Sans, sans-serif'
            }}>
              Last Updated: October 9, 2025
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl">

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-8 p-6 rounded-lg" style={{
            backgroundColor: 'hsl(var(--biz-green) / 0.25)'
          }}>
            <Card className="shadow-lg border-2" style={{
              borderColor: 'hsl(var(--biz-blue))',
              backgroundColor: 'hsl(var(--biz-white))'
            }}>
            <CardContent className="p-6">
              <div className="relative">
                <Search 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" 
                  style={{ color: 'hsl(var(--biz-green))' }}
                />
                <Input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 text-base border-2"
                  style={{
                    borderColor: 'hsl(var(--biz-blue))',
                    fontFamily: 'Open Sans, sans-serif'
                  }}
                  aria-label="Search FAQs"
                />
              </div>
              {searchTerm && (
                <p className="mt-3 text-sm" style={{ 
                  color: 'hsl(var(--biz-grey))',
                  fontFamily: 'Open Sans, sans-serif'
                }}>
                  Found {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''}
                </p>
              )}
            </CardContent>
          </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sticky Table of Contents - Desktop */}
            <aside className="hidden lg:block lg:col-span-1">
              <Card className="sticky top-44 shadow-md" style={{
                backgroundColor: 'hsl(var(--biz-white))',
                borderColor: 'hsl(var(--biz-navy) / 0.1)'
              }}>
                <CardContent className="p-6">
                  <h2 className="text-lg font-bold mb-4" style={{
                    fontFamily: 'Montserrat, sans-serif',
                    color: 'hsl(var(--biz-navy))'
                  }}>
                    Quick Navigation
                  </h2>
                  <nav aria-label="FAQ categories">
                    <ul className="space-y-2">
                      {categories.map((category) => (
                        <li key={category}>
                          <button
                            onClick={() => scrollToCategory(category)}
                            className="w-full text-left px-3 py-2 rounded-md transition-all text-sm"
                            style={{
                              fontFamily: 'Open Sans, sans-serif',
                              backgroundColor: activeSection === category 
                                ? 'hsl(var(--biz-green))' 
                                : 'transparent',
                              color: activeSection === category 
                                ? 'hsl(var(--biz-white))' 
                                : 'hsl(var(--biz-grey))',
                            }}
                            onMouseEnter={(e) => {
                              if (activeSection !== category) {
                                e.currentTarget.style.backgroundColor = 'hsl(var(--biz-green) / 0.1)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (activeSection !== category) {
                                e.currentTarget.style.backgroundColor = 'transparent';
                              }
                            }}
                          >
                            {category}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </CardContent>
              </Card>
            </aside>

            {/* FAQ Content */}
            <div className="lg:col-span-3">
              {categories.map((category) => {
                const categoryFaqs = filteredFaqs.filter(faq => faq.category === category);
                
                if (categoryFaqs.length === 0) return null;

                return (
                  <div key={category} data-category={category} className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{
                      fontFamily: 'Montserrat, sans-serif',
                      color: 'hsl(var(--biz-navy))'
                    }}>
                      <HelpCircle className="w-6 h-6" style={{ color: 'hsl(var(--biz-green))' }} />
                      {category}
                    </h2>

                    <Accordion type="multiple" className="space-y-4">
                      {categoryFaqs.map((faq) => {
                        const IconComponent = faq.icon;
                        return (
                          <AccordionItem 
                            key={faq.id} 
                            value={faq.id}
                            className="border-2 rounded-lg overflow-hidden"
                            style={{
                              borderColor: 'hsl(var(--biz-navy) / 0.1)',
                              backgroundColor: 'hsl(var(--biz-white))'
                            }}
                          >
                            <AccordionTrigger 
                              className="px-6 py-4 text-left hover:no-underline transition-colors group"
                              style={{
                                fontFamily: 'Montserrat, sans-serif',
                                fontSize: '14pt'
                              }}
                              onMouseEnter={(e) => {
                                const trigger = e.currentTarget;
                                trigger.style.backgroundColor = 'hsl(var(--biz-green) / 0.05)';
                                const text = trigger.querySelector('.question-text') as HTMLElement;
                                if (text) text.style.color = 'hsl(var(--biz-green))';
                              }}
                              onMouseLeave={(e) => {
                                const trigger = e.currentTarget;
                                trigger.style.backgroundColor = 'transparent';
                                const text = trigger.querySelector('.question-text') as HTMLElement;
                                if (text) text.style.color = 'hsl(var(--biz-navy))';
                              }}
                            >
                              <div className="flex items-start gap-3 flex-1">
                                <IconComponent 
                                  className="w-5 h-5 mt-1 flex-shrink-0" 
                                  style={{ color: 'hsl(var(--biz-green))' }}
                                  aria-hidden="true"
                                />
                                <span 
                                  className="question-text transition-colors"
                                  style={{ color: 'hsl(var(--biz-navy))' }}
                                >
                                  {faq.question}
                                </span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent 
                              className="px-6 pb-6 pt-2"
                              style={{
                                fontFamily: 'Open Sans, sans-serif',
                                fontSize: '12pt',
                                lineHeight: '1.5',
                                color: 'hsl(var(--biz-grey))'
                              }}
                            >
                              <div 
                                className="mb-4" 
                                dangerouslySetInnerHTML={{ __html: faq.answer }}
                              />
                              
                              {/* Feedback Widget */}
                              <div className="mt-4 pt-4 border-t" style={{
                                borderColor: 'hsl(var(--biz-navy) / 0.1)'
                              }}>
                                <p className="text-sm font-medium mb-2" style={{
                                  color: 'hsl(var(--biz-navy))',
                                  fontFamily: 'Montserrat, sans-serif'
                                }}>
                                  Was this helpful?
                                </p>
                                <div className="flex gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleFeedback(faq.id, true)}
                                    disabled={feedback[faq.id] !== undefined}
                                    className="gap-2"
                                    style={{
                                      borderColor: feedback[faq.id] === true 
                                        ? 'hsl(var(--biz-green))' 
                                        : 'hsl(var(--biz-navy) / 0.2)',
                                      backgroundColor: feedback[faq.id] === true 
                                        ? 'hsl(var(--biz-green))' 
                                        : 'transparent',
                                      color: feedback[faq.id] === true 
                                        ? 'hsl(var(--biz-white))' 
                                        : 'hsl(var(--biz-grey))'
                                    }}
                                  >
                                    <ThumbsUp className="w-4 h-4" />
                                    Yes
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleFeedback(faq.id, false)}
                                    disabled={feedback[faq.id] !== undefined}
                                    className="gap-2"
                                    style={{
                                      borderColor: feedback[faq.id] === false 
                                        ? 'hsl(var(--biz-green))' 
                                        : 'hsl(var(--biz-navy) / 0.2)',
                                      backgroundColor: feedback[faq.id] === false 
                                        ? 'hsl(var(--biz-green))' 
                                        : 'transparent',
                                      color: feedback[faq.id] === false 
                                        ? 'hsl(var(--biz-white))' 
                                        : 'hsl(var(--biz-grey))'
                                    }}
                                  >
                                    <ThumbsDown className="w-4 h-4" />
                                    No
                                  </Button>
                                </div>
                                {feedback[faq.id] !== undefined && (
                                  <p className="text-xs mt-2" style={{
                                    color: 'hsl(var(--biz-green))',
                                    fontFamily: 'Open Sans, sans-serif'
                                  }}>
                                    Thank you for your feedback!
                                  </p>
                                )}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  </div>
                );
              })}

              {filteredFaqs.length === 0 && (
                <Card className="p-12 text-center" style={{
                  backgroundColor: 'hsl(var(--biz-white))'
                }}>
                  <HelpCircle className="w-16 h-16 mx-auto mb-4" style={{
                    color: 'hsl(var(--biz-grey))'
                  }} />
                  <h3 className="text-xl font-bold mb-2" style={{
                    fontFamily: 'Montserrat, sans-serif',
                    color: 'hsl(var(--biz-navy))'
                  }}>
                    No results found
                  </h3>
                  <p style={{
                    fontFamily: 'Open Sans, sans-serif',
                    color: 'hsl(var(--biz-grey))'
                  }}>
                    Try adjusting your search terms or browse all FAQs above
                  </p>
                </Card>
              )}
            </div>
          </div>

          {/* Contact Support CTA */}
          <Card className="mt-12 shadow-lg border-2" style={{
            borderColor: 'hsl(var(--biz-green))',
            backgroundColor: 'hsl(var(--biz-navy))'
          }}>
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{
                fontFamily: 'Montserrat, sans-serif',
                color: 'hsl(var(--biz-white))'
              }}>
                Still have questions?
              </h2>
              <p className="text-lg mb-6" style={{
                fontFamily: 'Open Sans, sans-serif',
                color: 'hsl(var(--biz-white) / 0.9)',
                lineHeight: '1.5'
              }}>
                We're here to help! Contact our support team for personalized assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:support@bizhealth.ai">
                  <Button 
                    className="gap-2 text-base px-6 py-6"
                    style={{
                      backgroundColor: 'hsl(var(--biz-green))',
                      color: 'hsl(var(--biz-white))',
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: '600'
                    }}
                  >
                    <Mail className="w-5 h-5" />
                    Email Support
                  </Button>
                </a>
                <Button 
                  variant="outline"
                  className="gap-2 text-base px-6 py-6 transition-all duration-300"
                  style={{
                    borderColor: 'hsl(var(--biz-white))',
                    color: 'hsl(var(--biz-white))',
                    backgroundColor: 'hsl(var(--biz-green) / 0.5)',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '600'
                  }}
                  onClick={() => window.location.href = '/contact'}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'hsl(var(--biz-green) / 0.7)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'hsl(var(--biz-green) / 0.5)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  Visit Contact Page
                </Button>
                <Button 
                  className="gap-2 text-base px-6 py-6 relative"
                  style={{
                    backgroundColor: 'hsl(var(--biz-white))',
                    color: 'hsl(var(--biz-navy))',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '600'
                  }}
                  onClick={openCodyChat}
                >
                  <span 
                    className="flex items-center justify-center rounded-full w-6 h-6"
                    style={{
                      backgroundColor: 'hsl(var(--biz-lime))'
                    }}
                  >
                    <HelpCircle 
                      className="w-4 h-4" 
                      style={{ color: 'hsl(var(--biz-navy))' }}
                    />
                  </span>
                  Chat w/ 'Sherpa' bot
                  <ArrowDownRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 rounded-full w-12 h-12 shadow-lg z-40"
          style={{
            backgroundColor: 'hsl(var(--biz-green))',
            color: 'hsl(var(--biz-white))'
          }}
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}

      {/* Footer with tagline */}
      <footer className="py-6 text-center" style={{
        backgroundColor: 'hsl(var(--biz-navy))',
        borderTop: '2px solid hsl(var(--biz-green))'
      }}>
        <p className="text-lg font-bold mb-2" style={{
          fontFamily: 'Montserrat, sans-serif',
          color: 'hsl(var(--biz-green))'
        }}>
          Stop Guessing, Start Growing
        </p>
        <p className="text-sm" style={{
          fontFamily: 'Open Sans, sans-serif',
          color: 'hsl(var(--biz-white) / 0.8)'
        }}>
          <a href="https://www.bizhealth.ai" className="hover:underline">www.bizhealth.ai</a> | © 2025 BizHealth.ai. All rights reserved.
        </p>
      </footer>

      <GlobalFooter />
    </>
  );
};

export default FAQs;
