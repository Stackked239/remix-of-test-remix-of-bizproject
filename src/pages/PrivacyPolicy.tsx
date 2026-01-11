import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Lock,
  Shield,
  FileText,
  Users,
  Database,
  Cookie,
  Globe,
  Bell,
  ArrowUp,
  Search,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { toast } from "sonner";
import bizHealthLogo from "@/assets/bizhealth-logo-main.jpg";
import PromotionalBanner from "@/components/PromotionalBanner";

const PrivacyPolicy = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle scroll progress and active section
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));

      // Determine active section
      const sections = document.querySelectorAll("[data-section]");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.getAttribute("data-section") || "");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFeedback = (helpful: boolean) => {
    toast.success(
      helpful
        ? "Thank you for your feedback!"
        : "We'll work to improve our policy."
    );
  };

  const sections = [
    {
      id: "info-collect",
      title: "Information We Collect",
      icon: Database,
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            We know data privacy matters to your business. We collect only necessary data for analytics across 12 areas (e.g., Strategy, Financials).
          </p>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Provided by You</h4>
              <p className="text-muted-foreground leading-relaxed">
                Name, email, phone, business details (e.g., revenue, employee count), and questionnaire responses (e.g., KPIs like EBITDA, operational metrics). For payments, billing/shipping info.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Automatically Collected</h4>
              <p className="text-muted-foreground leading-relaxed">
                IP address, device/browser type, usage logs, and cookies for personalization.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Sensitive Data</h4>
              <p className="text-muted-foreground leading-relaxed">
                Limited to business-relevant inputs. For EU users, we minimize collection per GDPR Art. 5. We do not collect data from children under 13 (COPPA-compliant).
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "info-use",
      title: "How We Use Your Information",
      icon: FileText,
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Data powers your diagnostics:
          </p>
          <ul className="space-y-2 ml-6 text-muted-foreground leading-relaxed">
            <li className="list-disc">Generate reports (e.g., Owner's Report with benchmarks vs. SBA/Gartner)</li>
            <li className="list-disc">Personalize insights (e.g., scaling recommendations for cash flow pains)</li>
            <li className="list-disc">Improve platform (e.g., AI training on aggregated, anonymized data)</li>
            <li className="list-disc">Communicate (e.g., report emails, optional newsletters)</li>
          </ul>
        </div>
      ),
    },
    {
      id: "info-share",
      title: "Sharing Your Information",
      icon: Users,
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            We share minimally:
          </p>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Service Providers</h4>
              <p className="text-muted-foreground leading-relaxed">
                Payment processors (e.g., Stripe), cloud hosts (e.g., AWS), AI analytics partners—bound by contracts.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Business Transfers</h4>
              <p className="text-muted-foreground leading-relaxed">
                In mergers (with notice).
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Legal Needs</h4>
              <p className="text-muted-foreground leading-relaxed">
                To authorities or for rights protection. No sales/sharing for ads. For EU transfers (e.g., U.S. servers), we use Standard Contractual Clauses (SCCs) per GDPR Ch. V. Aggregated insights may be public (anonymized).
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "security",
      title: "Data Security",
      icon: Lock,
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            We protect data with:
          </p>
          <ul className="space-y-2 ml-6 text-muted-foreground leading-relaxed">
            <li className="list-disc">Encryption (in-transit/at-rest for questionnaires)</li>
            <li className="list-disc">Access controls (role-based for reports)</li>
            <li className="list-disc">Regular audits (SOC 2-aligned)</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            No system is 100% secure; we notify breaches per law (e.g., GDPR 72-hour rule).
          </p>
        </div>
      ),
    },
    {
      id: "rights",
      title: "Your Rights",
      icon: Shield,
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Exercise rights anytime (response within 30 days):
          </p>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Access/Correct</h4>
              <p className="text-muted-foreground leading-relaxed">View/edit data.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                <span className="text-growth font-bold">Delete/Portability</span>
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                <span className="text-growth font-bold">Erase or export data within 30 days</span> (subject to legal holds).
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Opt-Out</h4>
              <p className="text-muted-foreground leading-relaxed">
                Marketing (unsubscribe), cookies (banner), CCPA "Do Not Sell" (none apply).
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">GDPR-Specific (EU/EEA)</h4>
              <p className="text-muted-foreground leading-relaxed">
                Object/restrict processing; right to be forgotten. Contact DPO at{" "}
                <a
                  href="mailto:dpo@bizhealth.ai"
                  className="text-growth hover:underline transition-colors"
                >
                  dpo@bizhealth.ai
                </a>
                . Lodge complaints with authorities (e.g., ICO for UK).
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">CCPA-Specific (CA Residents)</h4>
              <p className="text-muted-foreground leading-relaxed">
                Know/disclose/delete data; non-discrimination. For all: Email{" "}
                <a
                  href="mailto:support@bizhealth.ai"
                  className="text-growth hover:underline transition-colors"
                >
                  support@bizhealth.ai
                </a>{" "}
                with verification.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "cookies",
      title: "Cookies & Tracking",
      icon: Cookie,
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            We use essential cookies (functionality) and analytics (Google Analytics—opt-out via tools). Consent banners for non-essential (GDPR/CCPA). Manage via browser settings.
          </p>
        </div>
      ),
    },
    {
      id: "international",
      title: "International Transfers",
      icon: Globe,
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            U.S.-based, we process global data (e.g., UK/Australia hubs) with safeguards (e.g., adequacy for Canada). EU data: SCCs/BCRs.
          </p>
        </div>
      ),
    },
    {
      id: "changes",
      title: "Changes to This Policy",
      icon: Bell,
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Updates posted here/email notice. Continued use = acceptance. Check annually.
          </p>
        </div>
      ),
    },
  ];

  const filteredSections = sections.filter(
    (section) =>
      searchTerm === "" ||
      section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.content.props.children.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>BizHealth.ai Privacy Policy | SMB Data Protection 2025</title>
        <meta
          name="description"
          content="Learn how BizHealth.ai protects your business data with GDPR/CCPA compliance. Trusted insights for SMB growth."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:image" content="https://bizhealth.ai/og-images/og-homepage.jpg" />
        <link rel="canonical" href="https://bizhealth.ai/privacy-policy" />
        
        {/* Schema markup for policy pages */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Privacy Policy",
            "description": "BizHealth.ai Privacy Policy - Data protection for SMB business intelligence",
            "url": "https://www.bizhealth.ai/privacy-policy",
            "publisher": {
              "@type": "Organization",
              "name": "BizHealth.ai",
              "url": "https://www.bizhealth.ai"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <PromotionalBanner />
        <GlobalNavigation />

        {/* Progress bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-muted z-50">
          <div
            className="h-full bg-growth transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <main className="container mx-auto px-4 pt-36 pb-12 md:pt-40 lg:pt-44 lg:pb-16 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sticky Table of Contents - Desktop */}
            <aside className="hidden lg:block lg:w-64 flex-shrink-0">
              <div className="sticky top-44 space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <img
                    src={bizHealthLogo}
                    alt="BizHealth.ai Logo"
                    className="w-40 h-auto"
                  />
                </div>

                <Card className="p-4">
                  <h3 className="font-bold text-sm mb-4">Table of Contents</h3>
                  <nav className="space-y-2">
                    {sections.map((section) => {
                      const Icon = section.icon;
                      return (
                        <button
                          key={section.id}
                          onClick={() => {
                            document
                              .getElementById(section.id)
                              ?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className={`w-full text-left text-xs px-3 py-2 rounded-md transition-colors flex items-center gap-2 ${
                            activeSection === section.id
                              ? "bg-growth/10 text-growth font-semibold"
                              : "hover:bg-muted text-muted-foreground"
                          }`}
                        >
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          <span className="line-clamp-2">{section.title}</span>
                        </button>
                      );
                    })}
                  </nav>
                </Card>

                <Button
                  onClick={scrollToTop}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <ArrowUp className="w-4 h-4 mr-2" />
                  Back to Top
                </Button>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              {/* Header */}
              <div className="mb-8 lg:mb-12">
                <div className="flex items-center gap-3 mb-4 lg:hidden">
                  <img
                    src={bizHealthLogo}
                    alt="BizHealth.ai Logo"
                    className="w-32 h-auto"
                  />
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  Privacy Policy
                </h1>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                  <p>Effective: October 8, 2025</p>
                  <p className="hidden sm:inline">•</p>
                  <p>Last Updated: October 8, 2025</p>
                </div>

                <Card className="p-6 bg-muted/50 border-growth/20">
                  <p className="text-muted-foreground leading-relaxed">
                    At BizHealth.ai, your trusted Business Health Analyst, we empower micro-, small-, and mid-sized businesses with AI-driven diagnostics to eliminate guesswork and fuel growth. We take data privacy seriously, processing questionnaire inputs transparently to deliver insights without traditional consulting risks. This policy complies with U.S. laws (e.g., CCPA for California residents), GDPR for EU/EEA users (e.g., UK/Germany expansions), and global standards. By using our platform, you consent to these practices. Questions? Contact{" "}
                    <a
                      href="mailto:support@bizhealth.ai"
                      className="text-growth hover:underline transition-colors font-semibold"
                    >
                      support@bizhealth.ai
                    </a>
                    .
                  </p>
                </Card>
              </div>


              {/* Accordion Sections */}
              <Accordion type="multiple" defaultValue={sections.map(s => s.id)} className="space-y-4">
                {filteredSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <AccordionItem
                      key={section.id}
                      value={section.id}
                      id={section.id}
                      data-section={section.id}
                      className="border rounded-lg overflow-hidden bg-card"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors group">
                        <div className="flex items-center gap-3 text-left">
                          <Icon className="w-5 h-5 text-growth flex-shrink-0 group-hover:scale-110 transition-transform" />
                          <span className="font-bold text-base group-hover:text-growth transition-colors">
                            {section.title}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6">
                        {section.content}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>

              {/* Contact Section */}
              <Card className="mt-8 p-6 bg-gradient-to-br from-primary/5 to-growth/5 border-growth/20">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-growth" />
                  Contact Information
                </h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    For privacy inquiries:{" "}
                    <a
                      href="mailto:support@bizhealth.ai"
                      className="text-growth hover:underline font-semibold"
                    >
                      support@bizhealth.ai
                    </a>
                  </p>
                  <p>
                    Data Protection Officer:{" "}
                    <a
                      href="mailto:dpo@bizhealth.ai"
                      className="text-growth hover:underline font-semibold"
                    >
                      dpo@bizhealth.ai
                    </a>
                  </p>
                  <p className="mt-4 text-sm">
                    Website:{" "}
                    <a
                      href="https://www.bizhealth.ai"
                      className="text-growth hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      www.bizhealth.ai
                    </a>
                  </p>
                </div>
              </Card>

              {/* Feedback Widget */}
              <Card className="mt-6 p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <p className="font-semibold text-foreground">
                    Was this policy helpful?
                  </p>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFeedback(true)}
                      className="gap-2"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      Yes
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFeedback(false)}
                      className="gap-2"
                    >
                      <ThumbsDown className="w-4 h-4" />
                      No
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Mobile Back to Top */}
              <Button
                onClick={scrollToTop}
                variant="outline"
                className="w-full mt-6 lg:hidden"
              >
                <ArrowUp className="w-4 h-4 mr-2" />
                Back to Top
              </Button>
            </div>
          </div>
        </main>

        <GlobalFooter />

        {/* Floating Back to Top Button */}
        {scrollProgress > 20 && (
          <Button
            onClick={scrollToTop}
            size="icon"
            className="fixed bottom-6 right-6 rounded-full shadow-lg z-40 bg-growth hover:bg-growth/90 text-white"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
        )}
      </div>
    </>
  );
};

export default PrivacyPolicy;