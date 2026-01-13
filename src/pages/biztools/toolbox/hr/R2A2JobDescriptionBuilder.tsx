import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Download, ChevronDown, ChevronRight, Check, X, 
  Clock, Globe, CheckCircle, FileText, Target, 
  Users, TrendingUp, ArrowRight, Quote, Zap,
  BookOpen, BarChart3, Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { trackDownload, trackCTAClick, trackScrollDepth, trackSectionView, trackTimeOnPage, trackFAQInteraction } from "@/utils/analytics";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import GradientDivider from "@/components/GradientDivider";
import PromotionalBanner from "@/components/PromotionalBanner";
import r2a2HeroImage from "@/assets/images/r2a2-playbook-hero.jpg";

const R2A2JobDescriptionBuilder = () => {
  const pdfPath = "/downloads/R2A2-Job-Description-Builder-Playbook-BizHealth-ai.pdf";
  const pdfDownloadName = "R2A2-Job-Description-Builder-Playbook-BizHealth-ai.pdf";
  const pagePath = "/biztools/toolbox/hr/r2a2-job-description-builder";
  
  // Track time on page
  const startTimeRef = useRef(Date.now());
  const scrollMilestonesRef = useRef<Set<number>>(new Set());
  
  useEffect(() => {
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
      trackTimeOnPage(timeSpent, pagePath);
    };
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      const milestones = [25, 50, 75, 100];
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !scrollMilestonesRef.current.has(milestone)) {
          scrollMilestonesRef.current.add(milestone);
          trackScrollDepth(milestone, pagePath);
        }
      });
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDownloadClick = (buttonLocation: string) => {
    trackDownload({
      fileName: 'R2A2-Job-Description-Builder-Playbook',
      fileType: 'pdf',
      source: pagePath,
      category: 'lead_magnet',
      value: 0,
    });
    trackCTAClick(`Download PDF - ${buttonLocation}`, pdfPath, 'conversion');
  };

  const handleCTAClick = (ctaName: string, destination: string) => {
    trackCTAClick(ctaName, destination, 'engagement');
  };

  const handleFAQChange = (value: string) => {
    if (value) {
      const faqIndex = parseInt(value.replace('faq-', ''));
      const faq = faqs[faqIndex];
      if (faq) {
        trackFAQInteraction(faq.question, 'expand');
      }
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - navOffset, behavior: 'smooth' });
      trackSectionView(id, pagePath);
    }
  };

  // Problems without R2A2
  const problemsWithout = [
    "New hires stumble 60-90 days figuring out what they own",
    "Decisions get stuck or delayed indefinitely",
    "People feel responsible for outcomes they can't control",
    "You become the bottleneck for every decision",
    "Performance conversations are emotional and vague",
    "High-performers leave due to frustration",
    "Bad hire costs 50-200% of annual salary"
  ];

  // Solutions with R2A2
  const solutionsWith = [
    "Everyone knows their role's purpose from day one",
    "Authority matches accountability—decisions happen fast",
    "Clear boundaries prevent burnout and resentment",
    "You delegate with confidence, not micromanagement",
    "Conversations grounded in clarity and metrics",
    "People feel trusted, not trapped",
    "Better hiring quality with crystal-clear expectations"
  ];

  // R2A2 Framework quadrants
  const r2a2Quadrants = [
    {
      letter: "R",
      title: "Role",
      question: "Why does this job exist?",
      description: "Connect the role to business outcomes. One sentence that clarifies purpose.",
      color: "bg-biz-navy",
      borderColor: "border-biz-navy"
    },
    {
      letter: "R",
      title: "Responsibilities",
      question: "What do they actually do?",
      description: "5-10 core responsibilities. What the person does day-to-day (actions).",
      color: "bg-teal-600",
      borderColor: "border-teal-600"
    },
    {
      letter: "A",
      title: "Accountability",
      question: "What outcomes do they own?",
      description: "What success looks like. Measurable outcomes they're responsible for.",
      color: "bg-biz-green",
      borderColor: "border-biz-green"
    },
    {
      letter: "A",
      title: "Authority",
      question: "What decisions can they make?",
      description: "What they can decide without asking. Clear boundaries for autonomous action.",
      color: "bg-biz-copper",
      borderColor: "border-biz-copper"
    }
  ];

  // Stats
  const stats = [
    { number: "60-90", label: "Minutes per Role", description: "Average time to build a complete R2A2" },
    { number: "50-200%", label: "Cost of Bad Hire", description: "Annual salary impact of role confusion" },
    { number: "30+", label: "Pages of Content", description: "Templates, examples, and worksheets" },
    { number: "100%", label: "Free Download", description: "No email required, no strings attached" }
  ];

  // What's inside the playbook
  const playbookContents = [
    { title: "Why R2A2 Matters", description: "The hidden cost of vague job descriptions" },
    { title: "The Four Quadrants Explained", description: "Deep dive into Role, Responsibilities, Accountability, Authority" },
    { title: "Building Your First R2A2", description: "Step-by-step walkthrough with examples" },
    { title: "Industry-Agnostic Templates", description: "Operations, Sales, Customer Success, and more" },
    { title: "Complete Real-World Examples", description: "See R2A2s in action across different roles" },
    { title: "Practical Worksheets", description: "Fill-in-the-blank templates ready to use" },
    { title: "Implementation Checklists", description: "Ensure nothing falls through the cracks" },
    { title: "Troubleshooting Guide", description: "Common issues and how to fix them" }
  ];

  // How to use steps
  const howToSteps = [
    { step: 1, title: "Download the Playbook", description: "Start with the free PDF. No email required, no strings attached." },
    { step: 2, title: "Pick One Role", description: "Choose your highest-impact role first—the one causing bottlenecks or confusion." },
    { step: 3, title: "Run a Discovery Interview", description: "30 minutes with the person in the role. Use the playbook's question guide." },
    { step: 4, title: "Draft the R2A2", description: "Use the templates to fill in Role, Responsibilities, Accountability, Authority." },
    { step: 5, title: "Get Feedback & Finalize", description: "Share the final R2A2 with your team. Add to onboarding. Reference in 1:1s." },
    { step: 6, title: "Review Annually", description: "R2A2s aren't set-it-and-forget-it. Review quarterly or when roles shift." }
  ];

  // FAQs
  const faqs = [
    {
      question: "How long does it take to build an R2A2?",
      answer: "A solid R2A2 for one role takes 60-90 minutes total. That includes a 30-minute discovery interview with the person in the role, 20 minutes drafting, and 20 minutes for feedback and refinement. Much faster than traditional job description writing—and infinitely more useful."
    },
    {
      question: "Do I need to create R2A2s for every role?",
      answer: "No. Start with your highest-impact roles—the ones causing bottlenecks, confusion, or turnover. Once you see the value, you can roll it out across the org. Many businesses start with 3-5 critical roles and build from there."
    },
    {
      question: "What if our business is industry-specific?",
      answer: "The R2A2 framework is industry-agnostic. The playbook includes templates for operations, sales, customer success, and more—plus guidance on how to adapt them for your specific industry and business model. Whether you're in manufacturing, professional services, SaaS, or retail, the principles apply."
    },
    {
      question: "Can I use this for hiring?",
      answer: "Absolutely. In fact, that's one of the biggest benefits. An R2A2 becomes the foundation for your job posting—candidates know exactly what they're signing up for. You can also use the R2A2 to build interview questions and set clear expectations before someone accepts the offer."
    },
    {
      question: "What about roles that are evolving or brand new?",
      answer: "R2A2s are living documents. The playbook includes guidance on reviewing and updating them. When a role evolves—new responsibilities, shifting priorities, or organizational changes—update the R2A2. Many businesses review them quarterly or at least annually."
    },
    {
      question: "How does this connect to the BizHealth Assessment?",
      answer: "Great question. If your BizHealth Assessment shows weakness in HR/Operations or People, R2A2 is often the first practical tool to implement. It addresses role clarity, one of the foundational blocks of organizational health. They work together—the assessment identifies the gap, R2A2 helps you close it."
    }
  ];

  // Related resources
  const relatedResources = [
    {
      type: "Blog Article",
      icon: BookOpen,
      title: "R2A2 Job Descriptions: Role Clarity for Small Business Teams",
      description: "Deep dive into why role clarity matters and how R2A2 transforms team performance.",
      link: "/blog/r2a2-job-descriptions-role-clarity-small-business-teams",
      linkText: "Read Article"
    },
    {
      type: "BizTools",
      icon: Briefcase,
      title: "Free Business Tools & Templates",
      description: "Explore our library of practical tools for strategy, finance, operations, and team management.",
      link: "/biztools/toolbox",
      linkText: "Browse BizTools"
    },
    {
      type: "BizGrowth",
      icon: TrendingUp,
      title: "Human Resources Programs",
      description: "Build leadership and HR capabilities with practical, action-oriented learning paths.",
      link: "/bizgrowth/human-resources-programs",
      linkText: "Explore HR Programs"
    }
  ];

  return (
    <>
      <SEO
        title="R2A2 Job Description Builder Playbook | Free Download"
        description="Download the free R2A2 Job Description Playbook. Create crystal-clear roles with defined responsibilities, accountability, and authority. Stop guessing, start clarifying."
        keywords="R2A2, job description template, role clarity, employee accountability, delegation framework, small business HR, team management, hiring playbook, SMB tools"
        canonical="https://bizhealth.ai/biztools/toolbox/hr/r2a2-job-description-builder"
        ogType="website"
        ogImage="/og-images/og-r2a2-job-description-builder.jpg"
      />
      
      <StructuredData
        type="faq"
        questions={faqs.map(faq => ({ question: faq.question, answer: faq.answer }))}
      />

      <PromotionalBanner />
      <GlobalNavigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-biz-navy via-biz-navy to-biz-navy/95 pt-32 pb-16 lg:pb-24 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-biz-green/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-biz-gold/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-biz-gold/30 text-biz-gold text-sm font-medium mb-6">
                <FileText className="w-4 h-4" />
                Free BizTool Playbook
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Stop Guessing.<br />
                <span className="text-biz-gold">Start Clarifying.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/85 mb-6 max-w-xl">
                The R2A2 Job Description framework that eliminates role confusion, speeds hiring, and builds teams that own outcomes—not just follow orders.
              </p>
              
              {/* Meta info */}
              <div className="flex flex-wrap gap-6 mb-8 text-white/80 text-sm">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  60-90 min per role
                </span>
                <span className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Industry-agnostic
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Immediately actionable
                </span>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-biz-gold hover:bg-biz-gold/90 text-biz-navy font-semibold shadow-lg hover:shadow-xl transition-all"
                  onClick={() => handleDownloadClick('hero')}
                >
                  <a href={pdfPath} download={pdfDownloadName}>
                    <Download className="w-5 h-5 mr-2" />
                    Download Free Playbook
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/40 text-white hover:bg-white/10"
                  onClick={() => scrollToSection('framework')}
                >
                  Learn the Framework
                </Button>
              </div>
            </motion.div>
            
            {/* Playbook Preview Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:justify-self-end"
            >
              <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-2xl max-w-md mx-auto lg:mx-0 hover:transform hover:-translate-y-1 transition-transform duration-300">
                {/* Card Header */}
                <div className="flex items-start gap-4 mb-6 pb-6 border-b-2 border-gray-200">
                  <div className="w-14 h-14 bg-gradient-to-br from-biz-green to-biz-green/80 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-semibold text-biz-navy">R2A2 Job Description Playbook</h3>
                    <p className="text-sm text-muted-foreground">30+ pages • PDF • Instant Download</p>
                  </div>
                </div>
                
                {/* R2A2 Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-biz-navy text-white p-3 rounded-lg text-center font-semibold text-sm flex items-center justify-center gap-2">
                    <Target className="w-4 h-4" /> Role
                  </div>
                  <div className="bg-teal-600 text-white p-3 rounded-lg text-center font-semibold text-sm flex items-center justify-center gap-2">
                    <FileText className="w-4 h-4" /> Responsibilities
                  </div>
                  <div className="bg-biz-green text-white p-3 rounded-lg text-center font-semibold text-sm flex items-center justify-center gap-2">
                    <BarChart3 className="w-4 h-4" /> Accountability
                  </div>
                  <div className="bg-biz-copper text-white p-3 rounded-lg text-center font-semibold text-sm flex items-center justify-center gap-2">
                    <Zap className="w-4 h-4" /> Authority
                  </div>
                </div>
                
                <p className="text-center text-sm text-muted-foreground">
                  The four-quadrant framework for crystal-clear roles
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Strip */}
      <section className="bg-white py-8 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Trusted by small and mid-sized business owners in
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-12">
            {["Professional Services", "E-Commerce", "Manufacturing", "Technology & SaaS", "Healthcare"].map((industry) => (
              <span key={industry} className="text-biz-navy font-display font-semibold text-sm opacity-60">
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Problem vs Solution Section */}
      <section className="py-16 lg:py-24 bg-muted/30 relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-biz-green to-green-500" />
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-biz-navy mb-4">
              The Cost of Vague Roles (And How R2A2 Fixes It)
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Role confusion is expensive. Here's what changes when you get crystal clear.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Without R2A2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border-t-4 border-red-500"
            >
              <h3 className="flex items-center gap-3 text-xl font-display font-semibold text-red-600 mb-6">
                <X className="w-6 h-6" />
                Without Role Clarity
              </h3>
              <ul className="space-y-4">
                {problemsWithout.map((problem, index) => (
                  <li key={index} className="flex items-start gap-3 text-foreground">
                    <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>{problem}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            {/* With R2A2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border-t-4 border-green-500"
            >
              <h3 className="flex items-center gap-3 text-xl font-display font-semibold text-green-600 mb-6">
                <CheckCircle className="w-6 h-6" />
                With R2A2 Framework
              </h3>
              <ul className="space-y-4">
                {solutionsWith.map((solution, index) => (
                  <li key={index} className="flex items-start gap-3 text-foreground">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{solution}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Framework Section */}
      <section id="framework" className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-biz-navy mb-4">
              The <span className="text-biz-green">R2A2</span> Framework
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Four quadrants that make every role crystal clear—from purpose to permission.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {r2a2Quadrants.map((quadrant, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white border-2 ${quadrant.borderColor} rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
              >
                <div className={`text-5xl font-display font-bold mb-2 ${quadrant.color.replace('bg-', 'text-')}`}>
                  {quadrant.letter}
                </div>
                <h4 className="text-lg font-display font-semibold text-biz-navy mb-2">
                  {quadrant.title}
                </h4>
                <p className="text-sm font-semibold text-foreground mb-2">
                  {quadrant.question}
                </p>
                <p className="text-sm text-muted-foreground">
                  {quadrant.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-biz-navy to-biz-navy/95 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-biz-green/20 rounded-full blur-3xl" />
          <div className="absolute top-0 right-0 w-48 h-48 bg-biz-gold/15 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Why R2A2 Works
            </h2>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-6 text-center"
              >
                <div className="text-3xl lg:text-4xl font-display font-bold text-biz-gold mb-2">
                  {stat.number}
                </div>
                <div className="text-white font-semibold mb-1">{stat.label}</div>
                <div className="text-white/70 text-sm">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Inside Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-biz-navy mb-4">
              What's Inside the Playbook
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              30+ pages of practical templates, real examples, and step-by-step guidance.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
            <div className="grid sm:grid-cols-2 gap-4">
              {playbookContents.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Check className="w-5 h-5 text-biz-green flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-biz-navy">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-biz-navy mb-4">
              How to Use This Playbook
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Six simple steps to transform your job descriptions into powerful R2A2s.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {howToSteps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:border-biz-navy hover:shadow-sm transition-all"
              >
                <div className="w-12 h-12 bg-biz-navy text-white rounded-full flex items-center justify-center text-xl font-display font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="text-lg font-display font-semibold text-biz-navy mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-muted/50 to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Quote className="w-8 h-8 text-biz-green" />
            </div>
            <blockquote className="text-2xl md:text-3xl font-display font-normal italic text-biz-navy leading-relaxed mb-6">
              "High Accountability + Low Authority = Burnout. When accountability and authority are aligned, people feel trusted. When they're misaligned, people feel trapped."
            </blockquote>
            <p className="text-muted-foreground">
              — Core principle of the R2A2 Framework
            </p>
          </div>
        </div>
      </section>

      {/* CTA Download Section */}
      <section id="download" className="py-16 lg:py-24 bg-biz-navy relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-biz-gold/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Ready to Create Role Clarity?
            </h2>
            <p className="text-lg text-white/85 mb-8">
              Download the R2A2 Job Description Playbook and build crystal-clear job descriptions in 60-90 minutes.
            </p>
            
            <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl">
              <h3 className="text-2xl font-display font-bold text-biz-navy mb-4">
                R2A2 Job Description Playbook
              </h3>
              
              <div className="flex flex-wrap justify-center gap-6 mb-6">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 text-biz-green" />
                  30+ Page PDF
                </span>
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 text-biz-green" />
                  Instant Download
                </span>
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 text-biz-green" />
                  100% Free
                </span>
              </div>
              
              <Button
                asChild
                size="lg"
                className="bg-biz-gold hover:bg-biz-gold/90 text-biz-navy font-semibold shadow-lg hover:shadow-xl transition-all text-lg px-8"
                onClick={() => handleDownloadClick('cta-section')}
              >
                <a href={pdfPath} download={pdfDownloadName}>
                  <Download className="w-5 h-5 mr-2" />
                  Download Free Playbook
                </a>
              </Button>
              
              <p className="mt-4 text-sm text-muted-foreground">
                No email required. No strings attached. Just download and start clarifying.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-biz-navy mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible onValueChange={handleFAQChange}>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="border-b border-gray-200">
                  <AccordionTrigger className="text-left font-display font-semibold text-biz-navy hover:text-biz-navy/80 py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Assessment Promo Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-biz-green/90 to-biz-green/80 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-biz-gold/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                Role Clarity Is Just One Piece of the Puzzle
              </h2>
              <p className="text-lg text-white/90 mb-6">
                R2A2 clarifies roles. But organizational health goes deeper. The BizHealth Assessment diagnoses your business across <strong className="text-white">12 critical areas</strong>—strategy, finance, operations, people, and more.
              </p>
              
              <div className="bg-white/10 border-l-4 border-biz-gold p-4 rounded-r-lg mb-6">
                <p className="text-white">
                  <strong className="text-biz-gold">20-25x ROI:</strong> Get a personalized diagnostic report that typically costs 10x more from traditional consultants.
                </p>
              </div>
              
              <p className="text-white/90 mb-6">
                See where your business is strong. Discover hidden gaps. Get a clear action plan. No sales pitch—just honest insight.
              </p>
              
              <Button
                asChild
                className="bg-biz-gold hover:bg-biz-gold/90 text-biz-navy font-semibold"
                onClick={() => handleCTAClick('Take Assessment', '/pricing')}
              >
                <Link to="/pricing">
                  Take the Assessment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
                <h3 className="text-2xl font-display font-bold text-biz-navy mb-3">
                  BizHealth Assessment
                </h3>
                <p className="text-muted-foreground mb-6">
                  Diagnose your business health. Discover gaps. Get a personalized roadmap to grow stronger.
                </p>
                
                <Button
                  asChild
                  className="bg-biz-navy hover:bg-biz-navy/90 text-white font-semibold mb-6"
                  onClick={() => handleCTAClick('Start Assessment', '/pricing')}
                >
                  <Link to="/pricing">
                    Start Your Assessment
                  </Link>
                </Button>
                
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-display font-bold text-biz-navy">12</div>
                    <div className="text-xs text-muted-foreground">Critical Areas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-display font-bold text-biz-navy">90</div>
                    <div className="text-xs text-muted-foreground">Minutes or Less</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-display font-bold text-biz-navy">20-25x</div>
                    <div className="text-xs text-muted-foreground">Typical ROI</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Resources Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-biz-navy mb-4">
              Related Resources
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Continue building your business capabilities with these free resources.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {relatedResources.map((resource, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="bg-biz-navy p-4 flex items-center gap-3">
                  <resource.icon className="w-5 h-5 text-biz-gold" />
                  <span className="text-white text-sm font-semibold uppercase tracking-wider">
                    {resource.type}
                  </span>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-display font-semibold text-biz-navy mb-2">
                    {resource.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {resource.description}
                  </p>
                  <Link
                    to={resource.link}
                    className="inline-flex items-center gap-2 text-biz-navy font-semibold text-sm hover:gap-3 transition-all"
                    onClick={() => handleCTAClick(resource.linkText, resource.link)}
                  >
                    {resource.linkText}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Footer */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-biz-navy to-biz-navy/95">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
            Ready to Clarify Your Roles and Build a Stronger Team?
          </h3>
          <p className="text-white/85 max-w-2xl mx-auto mb-6">
            The R2A2 Job Description Playbook is ready to download. No opt-in. No email required. Just clear, actionable guidance you can start using today.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-biz-gold hover:bg-biz-gold/90 text-biz-navy font-semibold shadow-lg"
            onClick={() => handleDownloadClick('footer-cta')}
          >
            <a href={pdfPath} download={pdfDownloadName}>
              <Download className="w-5 h-5 mr-2" />
              Download Free Playbook
            </a>
          </Button>
          <p className="mt-6 text-white/70 text-sm font-display">
            BizHealth.ai — Stop Guessing, Start Growing
          </p>
        </div>
      </section>

      <GradientDivider />
      <GlobalFooter />
    </>
  );
};

export default R2A2JobDescriptionBuilder;
