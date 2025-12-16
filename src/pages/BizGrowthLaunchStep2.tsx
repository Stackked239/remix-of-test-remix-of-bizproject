import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SEO from '@/components/SEO';
import GlobalNavigation from '@/components/GlobalNavigation';
import PromotionalBanner from '@/components/PromotionalBanner';
import { Button } from '@/components/ui/button';
import { 
  ArrowDown, 
  TrendingUp, 
  Calculator, 
  LineChart, 
  Grid3X3, 
  FileText, 
  Landmark, 
  MessageSquare,
  GraduationCap,
  Wrench,
  Sprout,
  Check,
  Download,
  ChevronRight,
  Linkedin,
  Youtube,
  Instagram,
  Twitter
} from 'lucide-react';

const BizGrowthLaunchStep2 = () => {
  const scrollToContent = () => {
    document.getElementById('course-overview')?.scrollIntoView({ behavior: 'smooth' });
  };

  const courseModules = [
    {
      number: 1,
      title: "Where Your Cash Actually Goes",
      duration: "30 min",
      description: "Stop guessing about cash. Track what comes in and what goes out every week. Know exactly when you'll run out—and when you won't.",
      outcome: "You'll build: A weekly cash tracker you can update in 15 minutes every Friday",
      icon: TrendingUp,
      downloadUrl: "/downloads/Step2-Module1-Know-Your-Money-BizHealth.pdf"
    },
    {
      number: 2,
      title: "Know Your Real Profit",
      duration: "35 min",
      description: "Most owners underprice because they don't know their real profit per sale. One simple calculation changes everything.",
      outcome: "You'll build: A profit calculator that finds pricing gaps in minutes",
      icon: Calculator,
      downloadUrl: "/downloads/Step2-Module2-Make-Money-That-Sticks-BizHealth.pdf"
    },
    {
      number: 3,
      title: "Plan Your Runway",
      duration: "40 min",
      description: "If cash keeps dropping, how long until you're out? Build a simple planner to see what-if scenarios before they happen.",
      outcome: "You'll build: 90-day runway scenarios to stress-test your cash",
      icon: LineChart,
      downloadUrl: "/downloads/Step2-Module3-Plan-Your-Runway-BizHealth.pdf"
    }
  ];

  const downloadableAssets = [
    {
      title: "13-Week Cash Flow Tracker",
      label: "THE SURVIVAL TOOL",
      format: "Excel / Google Sheets",
      description: "Track cash weekly. Know when you'll run out. Stop the guessing.",
      icon: Grid3X3,
      downloadUrl: "/downloads/13-Week-Cash-Flow-Tracker-BizHealth.xlsx"
    },
    {
      title: "Profit Per Sale Calculator",
      label: "THE PRICING FIXER",
      format: "Word Document",
      description: "Figure out your real profit per sale. Fix your prices. Make more money.",
      icon: Calculator,
      downloadUrl: "/downloads/Profit_Per_Sale_Calculator_-_BizHealthai.docx"
    },
    {
      title: "3-Account Setup Guide",
      label: "THE BANK SYSTEM",
      format: "PDF Guide",
      description: "Organize your money across 3 accounts so you always know what's available.",
      icon: Landmark,
      downloadUrl: "/downloads/3-Account-Setup-Guide-BizHealth.pdf"
    },
    {
      title: "Runway Scenario Planner",
      label: "THE FUTURE TELLER",
      format: "Excel / Google Sheets",
      description: "Model what-if scenarios. See when you need to raise cash or cut costs.",
      icon: LineChart,
      downloadUrl: "/downloads/Runway_Scenario_Planner_-_BizHealth.xlsx"
    },
    {
      title: "Emergency Brake Script Kit",
      label: "THE CRISIS SCRIPTS",
      format: "PDF Kit",
      description: "Word-for-word scripts for negotiating with vendors and clients when cash is tight.",
      icon: MessageSquare,
      downloadUrl: "/downloads/Emergency_Brake_Script_Kit_-_BizHealthai.pdf"
    }
  ];

  const valueProps = [
    {
      icon: GraduationCap,
      title: "No MBA Required",
      copy: "We explain money stuff like you're a smart friend, not a student. No jargon. No 50-slide lectures."
    },
    {
      icon: Wrench,
      title: "Real Tools, Not Just Theory",
      copy: "You don't get homework. You get spreadsheets, calculators, and templates you can use TODAY."
    },
    {
      icon: Sprout,
      title: "Built for Your Stage",
      copy: "This is for founders in year 0-3, under $1M revenue. Every example is your world, not a Fortune 500 case study."
    }
  ];

  const courseDetails = [
    "3 short modules (30-40 min each)",
    "Total time: Under 2 hours",
    "100% self-paced — no live sessions",
    "5 downloadable tools included",
    "Built for founders with zero finance background",
    "Works on any device"
  ];

  const outcomes = [
    "A weekly cash flow tracking system",
    "Your real profit per sale (finally)",
    "90-day runway scenarios for any situation",
    "A bank account structure that works",
    "Scripts for tough money conversations"
  ];

  const pathwaySteps = [
    { step: 1, title: "Baseline Your Business Health", status: "completed" },
    { step: 2, title: "Fix the Cash Squeeze", status: "current" },
    { step: 3, title: "Sales & Marketing Foundations", status: "coming" },
    { step: 4, title: "Operations & Systems", status: "coming" }
  ];

  return (
    <>
      <PromotionalBanner />
      <GlobalNavigation />
      <SEO
        title="Fix the Cash Squeeze | BizGrowth Academy - Financial Foundations for Founders"
        description="Learn cash flow, profit, and runway planning in under 2 hours. Built for first-time business owners. Includes 5 free downloadable tools. No MBA required."
        keywords="Launch, Cash Management, Step 2, BizGrowth, cash flow management, small business finance, profit calculator, runway planning, financial foundations, business owner course, SMB cash flow"
        canonical="https://bizhealth.ai/bizgrowth/launch/step-2-fix-cash-squeeze"
      />
      
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Fix the Cash Squeeze",
            "description": "Build simple cash flow, profit, and runway models that actually work. No MBA required. No spreadsheet nightmares.",
            "provider": {
              "@type": "Organization",
              "name": "BizGrowth Academy",
              "sameAs": "https://bizhealth.ai"
            },
            "duration": "PT2H",
            "educationalLevel": "Beginner",
            "audience": {
              "@type": "Audience",
              "audienceType": "Business owners, entrepreneurs, founders"
            },
            "hasCourseInstance": {
              "@type": "CourseInstance",
              "courseMode": "online",
              "courseWorkload": "PT2H"
            }
          })}
        </script>
      </Helmet>

      {/* Skip Link for Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-biz-citrine focus:text-biz-navy focus:rounded-md focus:outline-none"
      >
        Skip to main content
      </a>

      <main id="main-content">
        {/* SECTION 1: HERO */}
        {/* Hidden keywords for internal search */}
        <span className="sr-only" aria-hidden="true">Launch Cash Management Step 2 BizGrowth</span>
        <section 
          className="relative min-h-[70vh] flex items-center justify-center px-4 pt-28 md:pt-32 pb-10 md:pb-16"
          style={{ background: 'linear-gradient(180deg, #F8F8F5 0%, #F0F4E8 100%)' }}
          aria-labelledby="hero-heading"
        >
          <div className="max-w-[800px] mx-auto text-center">
            {/* Eyebrow */}
            <p className="text-xs md:text-sm font-semibold tracking-[0.2em] text-biz-grey mb-4 font-montserrat uppercase">
              BizGrowth Academy · Launch · Step 2
            </p>

            {/* Course Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-biz-grey/15 rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-medium text-biz-navy font-open-sans">3 Modules · Under 2 Hours Total</span>
            </div>

            {/* TrendingUp Icon Above Title */}
            <div className="flex justify-center mb-4">
              <TrendingUp className="w-16 h-16 text-biz-green" aria-hidden="true" />
            </div>

            {/* H1 */}
            <h1 
              id="hero-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-biz-navy font-montserrat mb-6 leading-tight"
            >
              Fix the Cash Squeeze
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-biz-grey font-open-sans mb-4 max-w-[650px] mx-auto leading-relaxed">
              Build simple cash flow, profit, and runway models that actually work. No MBA required. No spreadsheet nightmares.
            </p>

            {/* Trust Signal */}
            <p className="text-sm text-biz-grey/80 font-open-sans mb-8">
              Designed for founders without finance backgrounds
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button 
                className="w-full sm:w-auto min-h-[48px] px-8 py-3 bg-biz-citrine text-biz-navy font-semibold font-montserrat text-lg hover:bg-biz-citrine/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Start the Course
              </Button>
              <button 
                onClick={scrollToContent}
                className="flex items-center gap-2 text-biz-navy font-medium font-open-sans hover:text-biz-green transition-colors duration-200 min-h-[48px]"
              >
                <ArrowDown className="w-4 h-4 animate-bounce" />
                See What's Included
              </button>
            </div>

          </div>
        </section>

        {/* SECTION 2: COURSE OVERVIEW */}
        <section 
          id="course-overview" 
          className="py-16 md:py-24 px-4 bg-white"
          aria-labelledby="course-overview-heading"
        >
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 
                id="course-overview-heading"
                className="text-3xl md:text-4xl font-bold text-biz-navy font-montserrat mb-4"
              >
                What You'll Learn
              </h2>
              <p className="text-lg text-biz-grey font-open-sans max-w-[600px] mx-auto">
                Three short modules. Each under 45 minutes. Walk away with real tools.
              </p>
            </div>

            {/* Module Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courseModules.map((module) => {
                const IconComponent = module.icon;
                return (
                  <article 
                    key={module.number}
                    className="bg-white border border-biz-grey/15 rounded-lg p-6 transition-all duration-200 hover:translate-y-[-4px] hover:shadow-xl group"
                    style={{ borderTop: '4px solid #E6B800' }}
                  >
                    {/* Module Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold tracking-wider text-biz-citrine font-montserrat uppercase">
                        Module {module.number}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-biz-green text-white">
                        {module.duration}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="mb-4">
                      <IconComponent className="w-12 h-12 text-biz-navy" aria-hidden="true" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-biz-navy font-montserrat mb-3">
                      {module.title}
                    </h3>

                    {/* Description */}
                    <p className="text-biz-grey font-open-sans mb-4 leading-relaxed">
                      {module.description}
                    </p>

                    {/* Outcome */}
                    <p className="text-sm font-semibold text-biz-navy font-open-sans mb-4">
                      {module.outcome}
                    </p>

                    {/* Download Button */}
                    <a
                      href={module.downloadUrl}
                      download
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-biz-navy border-2 border-biz-navy rounded-lg hover:bg-biz-navy hover:text-white transition-all duration-200 group-hover:border-biz-citrine"
                    >
                      <Download className="w-4 h-4" />
                      Start Module {module.number}
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 3: DOWNLOADABLE ASSET LIBRARY */}
        <section 
          className="py-16 md:py-24 px-4"
          style={{ backgroundColor: '#F5F5F5' }}
          aria-labelledby="toolkit-heading"
        >
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 
                id="toolkit-heading"
                className="text-3xl md:text-4xl font-bold text-biz-navy font-montserrat mb-4"
              >
                Your Downloadable Toolkit
              </h2>
              <p className="text-lg text-biz-grey font-open-sans max-w-[600px] mx-auto">
                These tools are pre-built. You just fill in your numbers.
              </p>
            </div>

            {/* Asset Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {downloadableAssets.map((asset, index) => {
                const IconComponent = asset.icon;
                return (
                  <article 
                    key={index}
                    className="bg-white rounded-lg p-6 border border-biz-grey/15 transition-all duration-200 hover:border-biz-citrine group"
                  >
                    {/* Label Badge */}
                    <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase bg-biz-citrine text-biz-navy rounded mb-4 font-montserrat">
                      {asset.label}
                    </span>

                    {/* Icon */}
                    <div className="mb-4">
                      <IconComponent className="w-10 h-10 text-biz-navy" aria-hidden="true" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-biz-navy font-montserrat mb-2">
                      {asset.title}
                    </h3>

                    {/* Format Badge */}
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-biz-grey/10 text-biz-grey rounded mb-3">
                      {asset.format}
                    </span>

                    {/* Description */}
                    <p className="text-biz-grey font-open-sans mb-4 text-sm leading-relaxed">
                      {asset.description}
                    </p>

                    {/* Download Button */}
                    <a 
                      href={asset.downloadUrl}
                      download
                      className="flex items-center gap-2 px-4 py-2 border-2 border-biz-navy text-biz-navy font-medium rounded hover:bg-biz-navy hover:text-white transition-all duration-200 min-h-[44px] group-hover:border-biz-citrine"
                    >
                      <Download className="w-4 h-4 group-hover:animate-bounce" />
                      Download
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 4: VALUE PROPOSITIONS */}
        <section 
          className="py-16 md:py-24 px-4 bg-white"
          aria-labelledby="why-heading"
        >
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 
                id="why-heading"
                className="text-3xl md:text-4xl font-bold text-biz-navy font-montserrat mb-4"
              >
                Why This Course Works
              </h2>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {valueProps.map((prop, index) => {
                const IconComponent = prop.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-biz-navy/5 mb-4">
                      <IconComponent className="w-8 h-8 text-biz-navy" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-biz-navy font-montserrat mb-3">
                      {prop.title}
                    </h3>
                    <p className="text-biz-grey font-open-sans leading-relaxed">
                      {prop.copy}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Testimonial Card */}
            <div 
              className="max-w-3xl mx-auto p-6 md:p-8 rounded-lg"
              style={{ backgroundColor: '#FFF8E0', borderLeft: '4px solid #E6B800' }}
            >
              <blockquote className="text-lg md:text-xl text-biz-navy font-open-sans italic mb-4 leading-relaxed">
                "I finally know if I'm charging enough to stay in business. This should be required for every new business owner."
              </blockquote>
              <cite className="text-biz-grey font-open-sans not-italic">
                — Maria S., Cleaning Service Owner (Year 2)
              </cite>
            </div>
          </div>
        </section>

        {/* SECTION 5: COURSE SPECS */}
        <section 
          className="py-16 md:py-24 px-4"
          style={{ backgroundColor: '#F8F8F5' }}
          aria-labelledby="specs-heading"
        >
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Left Column */}
                <div>
                  <h3 className="text-xl font-bold text-biz-navy font-montserrat mb-6">
                    Course Details
                  </h3>
                  <ul className="space-y-4">
                    {courseDetails.map((detail, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-biz-green flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-biz-grey font-open-sans leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Column */}
                <div>
                  <h3 className="text-xl font-bold text-biz-navy font-montserrat mb-6">
                    What You'll Walk Away With
                  </h3>
                  <ul className="space-y-4">
                    {outcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <ChevronRight className="w-5 h-5 text-biz-citrine flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-biz-grey font-open-sans leading-relaxed">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: BREADCRUMB / PROGRESS INDICATOR */}
        <section 
          className="py-12 md:py-16 px-4 bg-white"
          aria-labelledby="pathway-heading"
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-xl md:text-2xl font-bold text-biz-navy font-montserrat">
                Step 2 of 4 in BizGrowth Launch Track
              </h3>
            </div>

            {/* Progress Stepper */}
            <div className="relative">
              {/* Desktop: Horizontal */}
              <div className="hidden md:flex items-center justify-between">
                {pathwaySteps.map((step, index) => (
                  <React.Fragment key={step.step}>
                    <div className="flex flex-col items-center relative">
                      {step.status === 'current' && (
                        <span className="absolute -top-8 text-xs font-bold text-biz-lime uppercase tracking-wider animate-pulse">
                          You Are Here
                        </span>
                      )}
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
                          step.status === 'completed' 
                            ? 'bg-biz-grey/20 text-biz-grey' 
                            : step.status === 'current'
                            ? 'bg-biz-citrine text-biz-navy animate-pulse'
                            : 'bg-biz-grey/10 text-biz-grey/50'
                        }`}
                      >
                        {step.status === 'completed' ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <span className="font-bold font-montserrat">{step.step}</span>
                        )}
                      </div>
                      <span 
                        className={`text-sm font-medium text-center max-w-[140px] font-open-sans ${
                          step.status === 'completed' 
                            ? 'text-biz-grey' 
                            : step.status === 'current'
                            ? 'text-biz-navy font-bold'
                            : 'text-biz-grey/50'
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                    {index < pathwaySteps.length - 1 && (
                      <div 
                        className={`flex-1 h-0.5 mx-4 ${
                          step.status === 'completed' 
                            ? 'bg-biz-grey/30' 
                            : 'border-t-2 border-dashed border-biz-grey/20'
                        }`}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Mobile: 2x2 Grid */}
              <div className="md:hidden grid grid-cols-2 gap-4">
                {pathwaySteps.map((step) => (
                  <div 
                    key={step.step}
                    className={`p-4 rounded-lg text-center ${
                      step.status === 'current' 
                        ? 'bg-biz-citrine/10 border-2 border-biz-citrine' 
                        : 'bg-biz-grey/5'
                    }`}
                  >
                    <div 
                      className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                        step.status === 'completed' 
                          ? 'bg-biz-grey/20 text-biz-grey' 
                          : step.status === 'current'
                          ? 'bg-biz-citrine text-biz-navy'
                          : 'bg-biz-grey/10 text-biz-grey/50'
                      }`}
                    >
                      {step.status === 'completed' ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <span className="text-sm font-bold">{step.step}</span>
                      )}
                    </div>
                    <span 
                      className={`text-xs font-medium font-open-sans ${
                        step.status === 'current' ? 'text-biz-navy font-bold' : 'text-biz-grey/70'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: FINAL CTA */}
        <section 
          className="py-16 md:py-24 px-4 bg-biz-navy"
          aria-labelledby="final-cta-heading"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 
              id="final-cta-heading"
              className="text-3xl md:text-4xl font-bold text-white font-montserrat mb-4"
            >
              Ready to Stop Guessing About Money?
            </h2>
            <p className="text-lg text-white/80 font-open-sans mb-8 max-w-[600px] mx-auto">
              Start Module 1 today. In 30 minutes, you'll know exactly where your cash is going.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <a
                href="/downloads/Step2-Module1-Know-Your-Money-BizHealth.pdf"
                download
                className="w-full sm:w-auto min-h-[56px] px-10 py-4 bg-biz-citrine text-biz-navy font-bold font-montserrat text-lg hover:bg-biz-citrine/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 rounded-md inline-flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Start Module 1 Now
              </a>
              <Button 
                variant="outline"
                className="w-full sm:w-auto min-h-[56px] px-8 py-4 border-2 border-white text-white font-medium font-open-sans bg-transparent hover:bg-white hover:text-biz-navy transition-all duration-200"
              >
                Explore the Toolkit First
              </Button>
            </div>

            <p className="text-sm text-white/60 font-open-sans">
              Self-paced. No live sessions. Stop/Restart anytime.
            </p>
          </div>
        </section>
      </main>

      {/* SECTION 8: FOOTER */}
      <footer 
        className="bg-biz-navy pt-16 pb-8"
        aria-label="Site footer"
        role="contentinfo"
      >
        <div className="max-w-6xl mx-auto px-4">
          {/* Footer Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pb-12">
            {/* Left Column: Course Navigation */}
            <div className="text-center md:text-left">
              <h4 className="text-xs font-bold tracking-[0.15em] text-biz-citrine uppercase mb-6 font-montserrat">
                Course Links
              </h4>
              <ul className="space-y-3">
                {['BizGrowth Academy Home', 'All Launch Courses', 'My Learning Dashboard', 'Contact Support'].map((link) => (
                  <li key={link}>
                    <Link 
                      to="/bizgrowth"
                      className="text-sm text-white/90 font-open-sans hover:text-biz-citrine hover:underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-biz-citrine focus:ring-offset-2 focus:ring-offset-biz-navy"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Center Column: Toolkit Quick Links */}
            <div className="text-center md:text-left border-t border-white/15 md:border-t-0 pt-8 md:pt-0">
              <h4 className="text-xs font-bold tracking-[0.15em] text-biz-citrine uppercase mb-6 font-montserrat">
                Step 2 Toolkit
              </h4>
              <ul className="space-y-3">
                {downloadableAssets.map((asset) => (
                  <li key={asset.title}>
                    <a 
                      href="#"
                      className="inline-flex items-center gap-2 text-sm text-white/90 font-open-sans hover:text-biz-citrine hover:underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-biz-citrine focus:ring-offset-2 focus:ring-offset-biz-navy"
                    >
                      <Download className="w-3 h-3" aria-hidden="true" />
                      {asset.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: About */}
            <div className="text-center md:text-left border-t border-white/15 md:border-t-0 pt-8 md:pt-0">
              <h4 className="text-xs font-bold tracking-[0.15em] text-biz-citrine uppercase mb-6 font-montserrat">
                About
              </h4>
              <p className="text-sm text-white/85 font-open-sans leading-relaxed mb-6 max-w-[280px] mx-auto md:mx-0">
                BizGrowth Academy helps founders in Launch (0–3 years) build financial confidence and make smarter business decisions. No MBA required.
              </p>

              {/* Social Icons */}
              <div className="flex items-center justify-center md:justify-start gap-4">
                {[
                  { icon: Linkedin, label: 'LinkedIn' },
                  { icon: Youtube, label: 'YouTube' },
                  { icon: Instagram, label: 'Instagram' },
                  { icon: Twitter, label: 'X (Twitter)' }
                ].map((social) => {
                  const SocialIcon = social.icon;
                  return (
                    <a 
                      key={social.label}
                      href="#"
                      className="text-white hover:text-biz-citrine transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-biz-citrine focus:ring-offset-2 focus:ring-offset-biz-navy"
                      aria-label={social.label}
                    >
                      <SocialIcon className="w-6 h-6" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div 
            className="border-t border-white/15 pt-6"
            style={{ backgroundColor: 'transparent' }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
              {/* Left: Logo */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/70 font-open-sans">
                  Powered by BizHealth.ai
                </span>
              </div>

              {/* Center: Tagline */}
              <p className="text-sm text-white/50 font-open-sans italic">
                Stop Guessing, Start Growing.
              </p>

              {/* Right: Copyright & Links */}
              <div className="flex items-center gap-2 text-sm text-white/70 font-open-sans">
                <span>© 2025 BizHealth.ai</span>
                <span>|</span>
                <Link 
                  to="/privacy"
                  className="hover:text-biz-citrine transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
                <span>·</span>
                <Link 
                  to="/terms"
                  className="hover:text-biz-citrine transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default BizGrowthLaunchStep2;
