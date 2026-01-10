import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, ChevronDown, ChevronRight, Check, X, AlertTriangle, TrendingUp, Users, Clock, Target, FileText, Printer, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { trackDownload, trackCTAClick, trackScrollDepth, trackSectionView, trackTimeOnPage, trackFAQInteraction } from "@/utils/analytics";
import GlobalNavigation from "@/components/GlobalNavigation";
import PromotionalBanner from "@/components/PromotionalBanner";
import bizHealthStackedLogo from "@/assets/images/bizhealth-stacked-logo.jpg";

const FreeStrategicEstimatingSystem = () => {
  const pdfPath = "/downloads/Strategic-Estimating-System-Checklist-BizHealth.pdf";
  const pdfDownloadName = "BizHealth-7-Step-Strategic-Estimating-System.pdf";
  const pagePath = "/biztools/toolbox/free-strategic-estimating-system";
  
  // Track time on page
  const startTimeRef = useRef(Date.now());
  const scrollMilestonesRef = useRef<Set<number>>(new Set());
  
  useEffect(() => {
    // Track time on page when user leaves
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
      trackTimeOnPage(timeSpent, pagePath);
    };
    
    // Track scroll depth
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      // Track at 25%, 50%, 75%, 100% milestones
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
      fileName: 'BizHealth-7-Step-Strategic-Estimating-System',
      fileType: 'pdf',
      source: pagePath,
      category: 'lead_magnet',
      value: 0, // Free download
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
      const navOffset = 100; // Account for fixed nav bar + banner
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - navOffset, behavior: 'smooth' });
      trackSectionView(id, pagePath);
    }
  };

  const problems = [
    { title: "Labor Costs Underestimated", description: "You estimate 40 hours but actual work takes 50. Communication time, rework, and unforeseen complexity destroy margins." },
    { title: "Hidden Costs Ignored", description: "Materials and labor are estimated but permits, equipment rental, insurance allocation, and overhead are forgotten." },
    { title: "Scope Creep Unchecked", description: "Customer 'small changes' pile up. You absorb the cost, destroying profitability on what seemed like a good deal." },
    { title: "No Contingency Built In", description: "You estimate assuming everything goes smoothly. One unexpected site condition and your entire profit is gone." },
    { title: "Gut Feel Over Data", description: "Estimates based on intuition, not historical data. Under time pressure, optimism bias takes over." },
    { title: "Sales & Delivery Misaligned", description: "Sales commits to timelines and budgets that delivery can't meet. The problem surfaces after the contract is signed." },
  ];

  const steps = [
    { number: 1, title: "Understand Your Costs", description: "List every cost category: direct labor, materials, equipment, permits, subcontractors, insurance, overhead. Calculate your true, fully-loaded cost." },
    { number: 2, title: "Define Your Scope", description: "Create standard scope documents listing what IS and IS NOT included. Clear scope prevents ambiguity and kills scope creep." },
    { number: 3, title: "Build Historical Data", description: "Track actual hours and costs on every project. After 20–30 projects, patterns emerge showing where you underestimate." },
    { number: 4, title: "Standardize Your Process", description: "Replace gut feel with a systematic approach. Use historical data, involve doers, document assumptions, include contingency." },
    { number: 5, title: "Manage Scope Changes", description: "Create a formal change order process. Every scope change gets documented, quantified, and approved before proceeding." },
    { number: 6, title: "Implement Real-Time Tracking", description: "Track actual hours and costs against estimates as work happens. Weekly reviews catch problems early." },
    { number: 7, title: "Measure and Learn", description: "Compare actual to estimate on every project. Build learnings into your next estimate. Continuous improvement compounds." },
  ];

  const results = [
    { icon: TrendingUp, stat: "↑ 3–5%", label: "Margin Improvement", description: "More accurate estimates, eliminated scope creep" },
    { icon: Target, stat: "↑ 40%", label: "Bidding Confidence", description: "You know you can deliver profitably" },
    { icon: AlertTriangle, stat: "↓ 50%", label: "Project Overruns", description: "Better forecasting = fewer surprises" },
    { icon: Users, stat: "↑ 60%", label: "Customer Trust", description: "Deliver on budget, on time, consistently" },
  ];

  const faqs = [
    {
      question: "Is this system designed for my type of business?",
      answer: "Yes. This system works for any service-based business: plumbing, electrical, HVAC, landscaping, construction, consulting, web design, accounting, cleaning services, and more. The principles are universal; the specifics adapt to your industry."
    },
    {
      question: "How long does it take to implement?",
      answer: "You can start implementing immediately with Step 1 (understanding your costs) this week. Full system implementation typically takes 4–8 weeks depending on complexity. You don't need to wait — improvements begin as soon as you start."
    },
    {
      question: "Do I need special software?",
      answer: "No. This system works with spreadsheets (Excel, Google Sheets) or dedicated software. We recommend starting with a spreadsheet while you're learning. The discipline of the system matters more than the tool you use."
    },
    {
      question: "What if I'm already profitable? Why do I need this?",
      answer: "Even profitable businesses leave money on the table. A 3–5% margin improvement is typical from strategic estimating — that could be $30K–$100K+ depending on your revenue. As you grow, estimating discipline becomes critical to scaling profitably."
    },
    {
      question: "How is the Assessment different from the checklist?",
      answer: "The free checklist is a DIY framework you implement yourself. The BizHealth.ai Assessment is a data-driven diagnostic that analyzes your actual business across 12 dimensions to identify exactly where problems exist and what's costing you the most. It's like the difference between a fitness guide and a personalized health assessment."
    },
    {
      question: "What if my team resists this change?",
      answer: "Start with Step 1 and involve the people who do the actual work — they often have better estimating insight than anyone. Show them how accurate estimates protect margins, which means more sustainable business and better opportunity for them. Once they see estimates hitting accurately, resistance typically disappears."
    },
  ];

  const assessmentHighlights = [
    { stat: "12 Dimensions", label: "Strategy to Operations" },
    { stat: "90 Minutes", label: "Average completion" },
    { stat: "One-Time Fee", label: "No recurring costs" },
    { stat: "Actionable", label: "Clear next steps" },
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title="FREE 7-Step Strategic Estimating System | Stop Losing $36K+ to Bad Estimates"
        description="Download the FREE 7-Step Strategic Estimating System checklist. A 5% estimating error destroys half your profit margin. Build accurate estimates that protect your service business profits."
        keywords="estimating system, service business profitability, accurate estimates, project costing, profit margins, contractor estimating, bid management, scope creep, small business tools"
        canonical="https://bizhealth.ai/biztools/toolbox/free-strategic-estimating-system"
        ogType="website"
        ogImage="https://bizhealth.ai/images/og/strategic-estimating-system.jpg"
      />
      
      <StructuredData type="organization" />
      
      <StructuredData
        type="faq"
        questions={faqs.map(faq => ({ question: faq.question, answer: faq.answer }))}
      />

      {/* Sticky Banner */}
      <PromotionalBanner />
      
      {/* Global Navigation */}
      <GlobalNavigation />

      {/* Green Accent Bar */}
      <div className="h-[5px] bg-biz-green w-full mt-20" />

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-biz-navy via-biz-navy to-[#1a1a3d] overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            {/* Left Column - 60% */}
            <div className="lg:col-span-3 space-y-6">
              {/* Logo Block */}
              <div className="inline-block bg-white rounded-lg px-4 py-2 shadow-lg">
                <span className="font-heading text-xl font-bold text-biz-navy">Biz<span className="text-biz-green">Health</span>.ai</span>
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 border-2 border-biz-green rounded-full px-4 py-2 text-white">
                <span className="text-biz-green font-semibold">FREE Download</span>
              </div>

              {/* Headline */}
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                Stop Losing <span className="text-biz-green">$36,000+</span> Annually to Bad Estimates
              </h1>

              {/* Subheadline */}
              <p className="text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl">
                A single 5% estimating error can destroy half your profit margin. Download the <strong className="text-white">7-Step Strategic Estimating System</strong> — the complete checklist service businesses use to build accurate bids that protect profits.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-biz-green to-[#b8b83a] hover:from-[#7a7a1c] hover:to-biz-green text-white font-semibold text-lg px-8 py-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                >
                  <a 
                    href={pdfPath} 
                    download={pdfDownloadName}
                    onClick={() => handleDownloadClick('hero')}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Free Checklist
                  </a>
                </Button>
                <Button
                  size="lg"
                  onClick={() => scrollToSection('learn-more')}
                  className="bg-white text-biz-navy hover:bg-white/90 font-semibold text-lg px-8 py-6 rounded-lg transition-all duration-300 border-2 border-white"
                >
                  See What's Included
                </Button>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20 mt-8">
                <div className="text-center sm:text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-biz-green">5%</div>
                  <div className="text-sm text-white/70">Error destroys 45% margin</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-biz-green">10 Pages</div>
                  <div className="text-sm text-white/70">Actionable checklists</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-biz-green">7 Steps</div>
                  <div className="text-sm text-white/70">Proven system</div>
                </div>
              </div>
            </div>

            {/* Right Column - 40% - PDF Mockup */}
            <div className="lg:col-span-2 relative">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative perspective-1000"
              >
                {/* Browser-style window */}
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden transform hover:rotate-0 transition-transform duration-500" style={{ transform: 'rotateY(-5deg) rotateX(5deg)' }}>
                  {/* Browser header */}
                  <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="flex-1 text-center text-sm text-gray-500 font-mono truncate">
                      Strategic-Estimating-Checklist.pdf
                    </div>
                  </div>
                  
                  {/* PDF Preview */}
                  <div className="bg-white p-8 aspect-[3/4] flex flex-col items-center justify-center text-center">
                    <img 
                      src={bizHealthStackedLogo} 
                      alt="BizHealth.ai Logo" 
                      className="h-20 w-auto object-contain mb-4"
                    />
                    <h3 className="text-biz-navy font-heading font-bold text-2xl mb-2">7-STEP</h3>
                    <h3 className="text-biz-green font-heading font-bold text-xl mb-4">STRATEGIC ESTIMATING SYSTEM</h3>
                    <p className="text-biz-navy/70 text-sm">The Complete Checklist for Service Businesses</p>
                    <div className="mt-6 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-biz-green" />
                      <div className="w-2 h-2 rounded-full bg-biz-navy/30" />
                      <div className="w-2 h-2 rounded-full bg-biz-navy/30" />
                      <div className="w-2 h-2 rounded-full bg-biz-navy/30" />
                      <div className="w-2 h-2 rounded-full bg-biz-navy/30" />
                      <span className="text-biz-navy/60 text-xs ml-2">10 pages</span>
                    </div>
                  </div>
                </div>

                {/* Floating Badge - Print Ready */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg px-4 py-3 hidden lg:block border-2 border-biz-green"
                >
                  <div className="flex items-center gap-2 text-biz-navy">
                    <Printer className="w-4 h-4 text-biz-green" />
                    <div>
                      <div className="font-semibold text-sm">✓ Print-Ready</div>
                      <div className="text-xs text-gray-500">Check items as you go</div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Badge - Data Driven */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg px-4 py-3 hidden lg:block border-2 border-biz-navy"
                >
                  <div className="flex items-center gap-2 text-biz-navy">
                    <BarChart3 className="w-4 h-4 text-biz-green" />
                    <div>
                      <div className="font-semibold text-sm">📊 Data-Driven</div>
                      <div className="text-xs text-gray-500">Track real results</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMS SECTION */}
      <section id="learn-more" className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-biz-green font-semibold text-sm tracking-widest uppercase mb-4 block">THE HIDDEN CRISIS</span>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-biz-navy mb-4">Why Service Businesses Hemorrhage Profit</h2>
            <p className="text-biz-grey text-lg max-w-2xl mx-auto">Without a strategic estimating system, profit disappears silently. Here's how:</p>
          </div>

          {/* Stat Callout Box */}
          <div className="bg-red-50 border-l-4 border-red-600 rounded-r-lg p-6 mb-12 max-w-3xl mx-auto">
            <p className="text-lg lg:text-xl text-biz-navy">
              <strong className="text-red-600">5%</strong> estimating error on a $10,000 project = <strong className="text-red-600">entire profit margin eliminated</strong>
            </p>
            <p className="text-biz-grey mt-2">
              Scale that to 72 projects/year at $720K revenue: <strong>$36,000–$108,000 in annual profit loss</strong>
            </p>
          </div>

          {/* Problem Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-lg p-6 shadow-card border-l-4 border-orange-500 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-heading font-semibold text-biz-navy mb-2">{problem.title}</h3>
                    <p className="text-biz-grey text-sm">{problem.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION - 7 STEPS */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-biz-green font-semibold text-sm tracking-widest uppercase mb-4 block">THE SOLUTION</span>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-biz-navy mb-4">The 7-Step Strategic Estimating System</h2>
            <p className="text-biz-grey text-lg max-w-2xl mx-auto">A proven framework to build accuracy, protect margins, and deliver profitably every time.</p>
          </div>

          {/* Steps Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-lg p-6 shadow-card border-t-4 border-biz-green transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-10 h-10 rounded-full bg-biz-green text-white flex items-center justify-center font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="font-heading font-semibold text-biz-navy mb-2">{step.title}</h3>
                <p className="text-biz-grey text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS SECTION */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-biz-green font-semibold text-sm tracking-widest uppercase mb-4 block">THE IMPACT</span>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-biz-navy mb-4">What Happens When You Get Estimating Right</h2>
            <p className="text-biz-grey text-lg max-w-2xl mx-auto">Service businesses that implement strategic estimating see measurable improvements:</p>
          </div>

          {/* Results Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-biz-navy to-[#1a1a3d] rounded-xl p-6 text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold text-biz-green mb-2">{result.stat}</div>
                <div className="text-white font-semibold mb-2">{result.label}</div>
                <div className="text-white/70 text-sm">{result.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DOWNLOAD CTA SECTION */}
      <section id="download" className="py-16 lg:py-24 bg-gradient-to-br from-biz-navy to-[#1a1a3d] relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-biz-green/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-biz-green/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-4">Get Your Free Checklist Now</h2>
            <p className="text-white/80 text-lg mb-8">10 pages of actionable checklists. No email required. Just click and download.</p>

            {/* Download Box */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <div className="text-5xl mb-4">📄</div>
              <h3 className="font-heading text-xl font-bold text-biz-navy mb-2">7-Step Strategic Estimating System</h3>
              <p className="text-biz-grey mb-6">The Complete Checklist for Service Businesses</p>
              
              {/* Feature badges */}
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {["10-Page PDF", "Print-Ready Checklists", "Pro Tips Included", "100% Free"].map((feature, index) => (
                  <span key={index} className="inline-flex items-center gap-1.5 bg-biz-green/10 text-biz-green rounded-full px-3 py-1 text-sm font-medium">
                    <Check className="w-4 h-4" />
                    {feature}
                  </span>
                ))}
              </div>

              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-biz-green to-[#b8b83a] hover:from-[#7a7a1c] hover:to-biz-green text-white font-semibold text-lg px-8 py-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
              >
                <a 
                  href={pdfPath} 
                  download={pdfDownloadName}
                  onClick={() => handleDownloadClick('download-section')}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Free PDF Now
                </a>
              </Button>

              <p className="text-sm text-biz-grey mt-4">Instant download • No signup required • PDF format</p>
            </div>
          </div>
        </div>
      </section>

      {/* BIZHEALTH ASSESSMENT UPSELL */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div>
              <span className="text-biz-green font-semibold text-sm tracking-widest uppercase mb-4 block">GO DEEPER</span>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-biz-navy mb-6">Ready to Diagnose Your Entire Business Health?</h2>
              <p className="text-biz-grey mb-4">
                The Strategic Estimating System is just one piece of the puzzle. Your service business has dozens of areas that impact profitability — from operations and cash flow to sales, marketing, and team performance.
              </p>
              <p className="text-biz-grey mb-6">
                BizHealth.ai offers a comprehensive Business Health Assessment that analyzes your entire operation across <strong className="text-biz-navy">12 key dimensions</strong>. Get data-driven insights, identify hidden profit drains, and create an actionable improvement roadmap.
              </p>

              {/* Feature list */}
              <ul className="space-y-3 mb-8">
                {[
                  "Comprehensive 12-dimension analysis",
                  "Personalized improvement roadmap",
                  "Benchmark against similar businesses",
                  "Low-cost, one-time fee — no subscription",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-biz-green flex-shrink-0" />
                    <span className="text-biz-navy">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-biz-navy text-biz-navy hover:bg-biz-navy hover:text-white font-semibold rounded-lg transition-all duration-300"
              >
                <Link to="/how-it-works">
                  Learn About Business Health Assessment
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Right Column - Assessment Card */}
            <div className="bg-muted rounded-2xl p-8 border border-border">
              {/* Badge */}
              <span className="inline-block bg-biz-navy text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                Your Business Health Analyst
              </span>
              
              <h3 className="font-heading text-2xl font-bold text-biz-navy mb-2">BizHealth.ai Assessment</h3>
              <p className="text-biz-grey mb-8">Get the complete picture of your business health with our comprehensive diagnostic.</p>

              {/* Highlights grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {assessmentHighlights.map((item, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 text-center">
                    <div className="font-heading font-bold text-biz-navy">{item.stat}</div>
                    <div className="text-sm text-biz-grey">{item.label}</div>
                  </div>
                ))}
              </div>

              <Button
                asChild
                size="lg"
                className="w-full bg-gradient-to-r from-biz-green to-[#b8b83a] hover:from-[#7a7a1c] hover:to-biz-green text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <Link to="/register">
                  Start Growing Your Business Today @ BizHealth.ai
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-biz-green font-semibold text-sm tracking-widest uppercase mb-4 block">QUESTIONS?</span>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-biz-navy mb-4">Frequently Asked Questions</h2>
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4" onValueChange={handleFAQChange}>
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-white rounded-lg border border-border shadow-sm"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline text-left font-heading font-semibold text-biz-navy">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-biz-grey">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-biz-navy to-[#1a1a3d]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-4">Your Estimating Crisis Doesn't Have to Continue</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Download the free checklist today. Implement one step this week. Start recovering the profit you're leaving on the table.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-biz-green to-[#b8b83a] hover:from-[#7a7a1c] hover:to-biz-green text-white font-semibold text-lg px-8 py-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            >
              <a 
                href={pdfPath} 
                download={pdfDownloadName}
                onClick={() => handleDownloadClick('final-cta')}
              >
                <Download className="w-5 h-5 mr-2" />
                Download Free PDF
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-biz-navy font-semibold text-lg px-8 py-6 rounded-lg transition-all duration-300"
            >
              <Link to="/how-it-works">
                Learn About Our Assessment
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* MINIMAL FOOTER */}
      <footer className="bg-[#1a1a3d] py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/70 text-sm mb-2">
            © 2026 BizHealth.ai | <a href="https://bizhealth.ai" className="text-biz-green hover:underline">bizhealth.ai</a> | <Link to="/biztools" className="text-biz-green hover:underline">BizTools Resources</Link>
          </p>
          <p className="text-biz-green text-sm italic">
            "Stop Guessing, Start Growing." — Your Business Health Analyst
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FreeStrategicEstimatingSystem;
