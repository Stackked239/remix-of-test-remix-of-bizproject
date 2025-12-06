import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import PromotionalBanner from '@/components/PromotionalBanner';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from '@/components/GlobalFooter';
import { Button } from '@/components/ui/button';
import sherpaMountainBg from '@/assets/sherpa-mountain-background.jpg';
import { 
  Compass, 
  Users, 
  Mountain, 
  TrendingUp, 
  Network, 
  BookOpen, 
  Zap,
  Target,
  Clock,
  Eye,
  DollarSign,
  BarChart3,
  Shield,
  ChevronDown,
  ArrowRight,
  CheckCircle,
  Settings,
  Megaphone,
  Cpu,
  Scale,
  Heart,
  Package,
  Lightbulb
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Sherpas = () => {
  const [expandedFaq, setExpandedFaq] = useState<string | undefined>();

  const complexityReasons = [
    {
      icon: Network,
      stat: "12+",
      label: "Critical Business Areas",
      description: "Running an SMB means juggling strategy, finances, operations, HR, sales, marketing, technology, and more—simultaneously. No human can be an expert in everything."
    },
    {
      icon: BookOpen,
      stat: "1000s",
      label: "Hours of Research",
      description: "Business advice is everywhere, but most of it is generic, conflicting, or irrelevant to your specific situation. Finding what actually applies to you takes valuable time you don't have."
    },
    {
      icon: Users,
      stat: "78%",
      label: "Feel Alone",
      description: "Most SMB owners report feeling isolated in their decision-making. You can't always ask your team, your board is limited, and traditional consultants cost $10K+."
    }
  ];

  const valueProps = [
    {
      number: 1,
      icon: Zap,
      title: "Speed & Efficiency",
      description: "Get answers and action plans in minutes instead of spending weeks researching, second-guessing, or waiting for consultant availability. Make faster decisions with confidence."
    },
    {
      number: 2,
      icon: Target,
      title: "Contextual Intelligence",
      description: "Unlike generic advice, your business sherpa understands your specific context—your size, stage, industry, and challenges—delivering tailored guidance that actually fits your reality."
    },
    {
      number: 3,
      icon: Clock,
      title: "Always Available",
      description: "No scheduling, no waiting, no off-hours. When a critical question hits at 11 PM or a crisis emerges on Saturday, your business sherpa is there with immediate, thoughtful guidance."
    },
    {
      number: 4,
      icon: Eye,
      title: "Objective Perspective",
      description: "Get unbiased, judgment-free guidance without political dynamics, ego, or hidden agendas. Your sherpa tells you what you need to hear, not what you want to hear."
    },
    {
      number: 5,
      icon: TrendingUp,
      title: "Compound Learning",
      description: "Every interaction builds on previous conversations and your business data. Your sherpa learns your business over time, becoming more valuable with every question you ask."
    },
    {
      number: 6,
      icon: DollarSign,
      title: "Cost Efficiency",
      description: "Access expert-level business and leadership guidance at a fraction of traditional consulting costs. Get 20-25x ROI compared to hiring consultants for every challenge."
    }
  ];

  const solutionCards = [
    {
      icon: BarChart3,
      title: "See a clear baseline",
      description: "Get business and leadership health across 12 core areas."
    },
    {
      icon: Eye,
      title: "Reveal blind spots",
      description: "Confirm suspected weaknesses with unbiased insight."
    },
    {
      icon: Target,
      title: "Get specific next steps",
      description: "Prioritized actions without guesswork or consultant roulette."
    }
  ];

  const bizGuideBenefits = [
    {
      number: 1,
      title: "Turn 12-area diagnostics into playbooks",
      description: "Convert Strategy, Financials, HR, Operations insights into focused, practical action plans."
    },
    {
      number: 2,
      title: "Ask complex 'how-to' questions",
      description: "Scaling readiness, cash-flow fixes, process optimization—get structured, actionable responses."
    },
    {
      number: 3,
      title: "Move from baseline to continuous improvement",
      description: "Re-assessments and iterative guidance over time (perfect for future subscription)."
    }
  ];

  const bizLeaderBenefits = [
    {
      number: 1,
      title: "Get tailored leadership coaching prompts",
      description: "Development plans aligned with your current business stage and team structure."
    },
    {
      number: 2,
      title: "Support your leadership team",
      description: "Shared language, expectations, and practical 'what now?' answers for people, culture, and execution."
    },
    {
      number: 3,
      title: "Build a repeatable system",
      description: "Leadership development that scales with headcount—ideal for upcoming paid monthly plan."
    }
  ];

  const trustSignals = [
    {
      icon: TrendingUp,
      stat: "20x",
      label: "Assessment ROI"
    },
    {
      icon: Users,
      stat: "1000+",
      label: "Leaders Served"
    },
    {
      icon: Shield,
      stat: "Bank-Level",
      label: "Data Security"
    }
  ];

  const faqs = [
    {
      question: "How long is free access available?",
      answer: "Both sherpas are currently free for all registered BizHealth.ai users. We'll announce subscription pricing well in advance with early adopter discounts."
    },
    {
      question: "Do I need a Business Health Assessment first?",
      answer: "While the sherpas work best when informed by your assessment data, you can start using them immediately to ask general business and leadership questions."
    },
    {
      question: "Can my leadership team use BizLeaDeR Sherpa?",
      answer: "Yes! All registered users in your organization can access both sherpas. This is perfect for building shared leadership language across your team."
    },
    {
      question: "How is this different from ChatGPT?",
      answer: "Both sherpas are trained specifically on SMB challenges and best practices. They understand your BizHealth.ai assessment context and provide actionable, prioritized guidance—not generic advice."
    },
    {
      question: "What happens when it becomes a subscription?",
      answer: "Current free users will receive advance notice and preferential pricing. The subscription will add enhanced features like personalized learning paths and team dashboards."
    }
  ];

  return (
    <>
      <SEO
        title="Business & Leadership Sherpas - Free AI Guides"
        description="Stop guessing. Get AI-powered business strategy and leadership guidance in minutes. BizGuide Sherpa and BizLeaDeR Sherpa—free for registered BizHealth.ai users."
        keywords="business advisor AI, leadership development AI, SMB coaching, business strategy guide, leadership sherpa, business intelligence tool, SMB leadership"
        canonical="https://bizhealth.ai/sherpas"
        ogType="website"
      />
      
      <StructuredData
        type="service"
        name="BizHealth.ai Sherpas"
        description="AI-powered business strategy and leadership guidance for SMB owners."
        provider="BizHealth.ai"
        areaServed="United States"
        url="https://bizhealth.ai/sherpas"
      />

      <PromotionalBanner />
      <GlobalNavigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#212653] via-[#181b3d] to-[#212653] py-20 px-6 md:py-24 overflow-hidden">
        {/* Subtle green glow accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#969423]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#969423]/10 rounded-full blur-3xl"></div>
        
        <div className="container max-w-4xl mx-auto relative z-10">
          {/* Pre-headline Badge */}
          <div className="flex justify-center mb-6 animate-fade-in">
            <div className="inline-flex items-center bg-white/10 border border-white/15 px-4 py-2 rounded-full">
              <span className="text-xs font-bold uppercase tracking-wider text-[#b8b344]">
                FREE FOR REGISTERED USERS
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="font-montserrat font-bold text-white text-center mb-6 animate-fade-in" 
              style={{ fontSize: 'clamp(2.5rem, 6vw, 3.75rem)' }}>
            Your Business & Leadership Sherpas
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-white/85 text-center leading-relaxed max-w-2xl mx-auto mb-10 animate-fade-in">
            <span className="font-bold">Stop guessing. <span className="text-[#969423]">Start Growing</span></span> with two AI-powered sherpas that turn complex 
            business & leadership challenges into clear next steps.
          </p>

          {/* Dual Tool Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8 animate-fade-in">
            {/* BizGuide Sherpa Card */}
            <Link 
              to="/bizguides/bizguide-sherpa"
              className="bg-white/80 border border-[#b8b344]/50 rounded-xl p-6 backdrop-blur-sm hover:bg-white hover:border-[#b8b344]/70 transition-all duration-300 shadow-lg hover:-translate-y-1 hover:shadow-xl cursor-pointer"
            >
              <Compass className="w-8 h-8 text-[#b8b344] mb-4" />
              <h3 className="font-montserrat font-semibold text-[#242553] text-xl mb-2">
                BizGuide Sherpa
              </h3>
              <p className="text-[#242553]/85 leading-relaxed">
                Your strategic and operational 'how-to' guide for the entire business.
              </p>
            </Link>

            {/* BizLeaDeR Sherpa Card */}
            <Link 
              to="/bizleader/leadership-development-bot"
              className="bg-white/80 border border-[#b8b344]/50 rounded-xl p-6 backdrop-blur-sm hover:bg-white hover:border-[#b8b344]/70 transition-all duration-300 shadow-lg hover:-translate-y-1 hover:shadow-xl cursor-pointer"
            >
              <Users className="w-8 h-8 text-[#b8b344] mb-4" />
              <h3 className="font-montserrat font-semibold text-[#242553] text-xl mb-2">
                BizLeaDeR Sherpa
              </h3>
              <p className="text-[#242553]/85 leading-relaxed">
                Your leadership-development co-pilot to grow stronger, more scalable leaders.
              </p>
            </Link>
          </div>

          {/* Availability Note */}
          <p className="text-sm text-white/60 text-center mb-10">
            Available now for free to registered BizHealth.ai users; future plans will bundle 
            them into a subscription for continuous, compounding value.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Button 
              asChild
              size="lg"
              className="bg-[#969423] hover:bg-[#b8b344] text-white font-bold px-9 py-6 text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <Link to="/register">
                Activate My Free Sherpas
              </Link>
            </Button>
            
            <Button 
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-[#b8b344] bg-transparent text-[#b8b344] hover:bg-[#b8b344] hover:text-[#212653] font-semibold px-8 py-6 transition-all duration-300"
            >
              <a href="#how-it-works">
                See How It Works
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* What is a Business Sherpa Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${sherpaMountainBg})`,
            opacity: 0.7
          }}
        />
        {/* White overlay for readability */}
        <div className="absolute inset-0 bg-white/30" />
        <div className="container max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-wider text-[#969423] mb-4">
              UNDERSTANDING THE CONCEPT
            </p>
            <h2 className="font-montserrat font-bold text-[#212653] mb-6"
                style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}>
              What is a Business Sherpa?
            </h2>
            <p className="text-lg text-[#242553] leading-relaxed max-w-3xl mx-auto">
              Just as mountain sherpas guide climbers through treacherous terrain to reach the summit, 
              a business sherpa guides business leaders through the complex landscape of growing a company—
              helping you navigate challenges, avoid pitfalls, and reach your business goals with 
              confidence and clarity.
            </p>
          </div>

          {/* Metaphor Comparison */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Mountain Sherpa */}
            <div className="bg-white border border-[#212653]/8 rounded-xl p-8">
              <div className="w-12 h-12 bg-[#212653]/10 rounded-full flex items-center justify-center mb-6">
                <Mountain className="w-6 h-6 text-[#212653]" />
              </div>
              <h3 className="font-montserrat font-semibold text-[#212653] text-xl mb-4">
                Mountain Sherpa
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#969423] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-[#7C7C7C]">Knows the terrain intimately</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#969423] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-[#7C7C7C]">Anticipates dangers ahead</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#969423] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-[#7C7C7C]">Carries heavy loads</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#969423] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-[#7C7C7C]">Provides expertise and direction</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#969423] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-[#7C7C7C]">Ensures safe passage to summit</span>
                </li>
              </ul>
            </div>

            {/* Business Sherpa */}
            <div className="bg-white border border-[#212653]/8 rounded-xl p-8">
              <div className="w-12 h-12 bg-[#969423]/10 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-[#969423]" />
              </div>
              <h3 className="font-montserrat font-semibold text-[#212653] text-xl mb-4">
                Business Sherpa
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#969423] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-[#7C7C7C]">Understands business challenges</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#969423] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-[#7C7C7C]">Identifies risks and opportunities</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#969423] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-[#7C7C7C]">Lightens your decision burden</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#969423] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-[#7C7C7C]">Offers strategic guidance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#969423] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-[#7C7C7C]">Accelerates your path to growth</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Why Business Sherpas Matter */}
          <div className="mb-16">
            <h3 className="font-montserrat font-semibold text-[#212653] text-3xl text-center mb-12">
              Why <span className="font-bold">Your Business</span> Needs a Sherpa
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {complexityReasons.map((reason, index) => {
                const Icon = reason.icon;
                return (
                  <div 
                    key={index}
                    className="bg-[#faf9f7] rounded-xl p-7 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-[#969423]/20"
                  >
                    <div className="w-12 h-12 bg-[#969423]/10 rounded-full flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#969423]" />
                    </div>
                    <div className="text-3xl font-bold text-[#212653] mb-1">{reason.stat}</div>
                    <div className="text-sm font-semibold text-[#969423] mb-3">{reason.label}</div>
                    <p className="text-[#7C7C7C] leading-relaxed">{reason.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Value a Business Sherpa Adds */}
          <div className="mb-12">
            <h3 className="font-montserrat font-semibold text-[#212653] text-3xl text-center mb-12">
              What Value Does a Business Sherpa Deliver?
            </h3>
            
            <div className="grid md:grid-cols-2 gap-5">
              {valueProps.map((prop) => {
                const Icon = prop.icon;
                return (
                  <div 
                    key={prop.number}
                    className="bg-white border border-[#212653]/8 rounded-xl p-6 flex gap-5 hover:border-[#969423] hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-[#969423]/10 rounded-full flex items-center justify-center">
                        <span className="font-bold text-[#969423]">{prop.number}</span>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-montserrat font-semibold text-[#212653] text-lg">
                          {prop.title}
                        </h4>
                        <Icon className="w-5 h-5 text-[#969423] flex-shrink-0 ml-2" />
                      </div>
                      <p className="text-[#7C7C7C] leading-relaxed">{prop.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Summary */}
          <div className="bg-gradient-to-r from-[#212653] to-[#181b3d] rounded-xl p-8 md:p-10 border-l-4 border-[#969423] max-w-3xl mx-auto">
            <p className="text-white text-lg leading-relaxed text-center">
              With BizHealth.ai's Business Sherpas, you get the benefits of having a seasoned business 
              advisor and leadership coach on call 24/7—without the $10,000+ monthly retainer. It's like 
              having a senior consultant in your pocket, trained specifically on the challenges small & mid-size businesses 
              face every day.
            </p>
          </div>

          <p className="text-center text-[#242553] italic mt-10">
            Now let's dive into why we built these specific tools...
          </p>
        </div>
      </section>

      {/* Why These Tools Exist - StoryBrand */}
      <section className="bg-white py-20 px-6">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-wider text-[#969423] mb-4">
              THE PROBLEM & SOLUTION
            </p>
            <h2 className="font-montserrat font-bold text-[#212653] mb-6"
                style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}>
              Why These Tools Exist
            </h2>
          </div>

          {/* Problem Statement */}
          <div className="bg-[#212653]/3 border-l-4 border-[#212653]/30 rounded-r-lg p-7 md:p-8 max-w-3xl mx-auto mb-10">
            <p className="text-lg text-[#212653] leading-relaxed">
              You are a capable founder or executive facing cash squeezes, scaling uncertainty, 
              talent gaps, and constant fires—with no time or budget for $10K+ consulting experiments. 
              You need a trusted guide that understands SMB realities, speaks in plain language, 
              and shows you exactly what to do next.
            </p>
          </div>

          {/* Solution Introduction */}
          <p className="text-lg text-[#212653] text-center mb-8">
            BizHealth.ai steps in as your Business Health Coach, pairing data-driven diagnostics 
            and leadership resources with these two sherpas so you can:
          </p>

          {/* Three Value Props */}
          <div className="grid md:grid-cols-3 gap-6">
            {solutionCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div 
                  key={index}
                  className="bg-[#faf9f7] border border-transparent rounded-xl p-7 text-center hover:border-[#969423]/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-[#969423]/10 rounded-full flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-7 h-7 text-[#969423]" />
                  </div>
                  <h3 className="font-montserrat font-semibold text-[#212653] text-lg mb-3">
                    {card.title}
                  </h3>
                  <p className="text-[#7C7C7C]">{card.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BizGuide Sherpa Section */}
      <section id="how-it-works" className="bg-gradient-to-b from-[#faf9f7] to-[#f5f3ef] py-20 px-6">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div>
              <div className="w-15 h-15 bg-[#969423]/10 rounded-full flex items-center justify-center mb-6">
                <Compass className="w-8 h-8 text-[#969423]" />
              </div>
              
              <h2 className="font-montserrat font-bold text-[#212653] mb-4"
                  style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)' }}>
                BizGuide Sherpa: Business "How-To" Navigator
              </h2>
              
              <p className="text-lg text-[#7C7C7C] leading-relaxed mb-8">
                BizGuide Sherpa takes your BizHealth.ai assessment insights and converts them into 
                targeted guidance when you ask, "How do we fix this?" or "What should we do next?". 
                It is designed for business owners and executives who value speed, clarity, and ROI.
              </p>

              <div className="space-y-5 mb-8">
                {bizGuideBenefits.map((benefit) => (
                  <div key={benefit.number} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-[#969423]/10 rounded-full flex items-center justify-center">
                        <span className="font-bold text-[#969423] text-sm">{benefit.number}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#212653] mb-1">{benefit.title}</h4>
                      <p className="text-[#7C7C7C]">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white border-l-3 border-[#969423] rounded-r-lg p-6 mb-6">
                <p className="text-[#212653] italic">
                  "Ask <span className="font-bold">BizGuide Sherpa</span> anything about your business health—get a clear, 
                  prioritized game plan in seconds."
                </p>
              </div>

              <Link 
                to="/bizguides/bizguide-sherpa"
                className="inline-flex items-center gap-2 text-[#969423] font-semibold hover:gap-3 transition-all duration-300"
              >
                Try BizGuide Sherpa
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Right - Visual */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-[#212653]/8">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { name: 'Strategy', icon: Target, color: 'text-[#4A90E2]', bg: 'bg-[#4A90E2]/10' },
                  { name: 'Finance', icon: DollarSign, color: 'text-[#969423]', bg: 'bg-[#969423]/10' },
                  { name: 'HR', icon: Users, color: 'text-[#8CBF2F]', bg: 'bg-[#8CBF2F]/10' },
                  { name: 'Operations', icon: Settings, color: 'text-[#D2691E]', bg: 'bg-[#D2691E]/10' },
                  { name: 'Sales', icon: TrendingUp, color: 'text-[#E6B800]', bg: 'bg-[#E6B800]/10' },
                  { name: 'Marketing', icon: Megaphone, color: 'text-[#4A90E2]', bg: 'bg-[#4A90E2]/10' },
                  { name: 'Technology', icon: Cpu, color: 'text-[#2d3268]', bg: 'bg-[#2d3268]/10' },
                  { name: 'Risk', icon: Shield, color: 'text-[#b8b344]', bg: 'bg-[#b8b344]/10' },
                  { name: 'Legal', icon: Scale, color: 'text-[#D2691E]', bg: 'bg-[#D2691E]/10' },
                  { name: 'Customer', icon: Heart, color: 'text-[#4A90E2]', bg: 'bg-[#4A90E2]/10' },
                  { name: 'Product', icon: Package, color: 'text-[#E6B800]', bg: 'bg-[#E6B800]/10' },
                  { name: 'Innovation', icon: Lightbulb, color: 'text-[#8CBF2F]', bg: 'bg-[#8CBF2F]/10' }
                ].map((area) => {
                  const Icon = area.icon;
                  return (
                    <div key={area.name} className="bg-[#faf9f7] rounded-lg p-3 text-center">
                      <div className={`w-8 h-8 ${area.bg} rounded-full flex items-center justify-center mx-auto mb-2`}>
                        <Icon className={`w-4 h-4 ${area.color}`} />
                      </div>
                      <p className="text-xs text-[#7C7C7C] font-medium">{area.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BizLeaDeR Sherpa Section */}
      <section className="bg-white py-20 px-6">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Visual */}
            <div className="bg-[#faf9f7] rounded-xl p-8 border border-[#212653]/8 order-2 md:order-1">
              <div className="space-y-4">
                {['Emerging Leader', 'Confident Manager', 'Scalable Executive'].map((stage, index) => (
                  <div key={stage} className="flex items-center gap-4 bg-white rounded-lg p-4 shadow-sm">
                    <div className="w-10 h-10 bg-[#969423] rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#212653]">{stage}</p>
                      <div className="flex gap-1 mt-1">
                        {[...Array(3)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`h-1.5 w-8 rounded-full ${i <= index ? 'bg-[#969423]' : 'bg-gray-200'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Content */}
            <div className="order-1 md:order-2">
              <div className="w-15 h-15 bg-[#969423]/10 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-[#969423]" />
              </div>
              
              <h2 className="font-montserrat font-bold text-[#212653] mb-4"
                  style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)' }}>
                BizLeaDeR Sherpa: Leadership Growth Engine
              </h2>
              
              <p className="text-lg text-[#7C7C7C] leading-relaxed mb-8">
                BizLeaDeR Sherpa (Leadership Development Bot) focuses on developing owners, executives, 
                and managers into confident, scalable leaders who can carry growth forward. It builds on 
                BizHealth's leadership and people insights to close capability gaps that stall scale after years 3–5.
              </p>

              <div className="space-y-5 mb-8">
                {bizLeaderBenefits.map((benefit) => (
                  <div key={benefit.number} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-[#969423]/10 rounded-full flex items-center justify-center">
                        <span className="font-bold text-[#969423] text-sm">{benefit.number}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#212653] mb-1">{benefit.title}</h4>
                      <p className="text-[#7C7C7C]">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#faf9f7] border-l-3 border-[#969423] rounded-r-lg p-6 mb-6">
                <p className="text-[#212653] italic">
                  "Ask <span className="font-bold">BizLeaDeR Sherpa</span> how to lead through tough calls—get scripts, frameworks, 
                  and next steps without needing a leadership coach."
                </p>
              </div>

              <Link 
                to="/bizleader/leadership-development-bot"
                className="inline-flex items-center gap-2 text-[#969423] font-semibold hover:gap-3 transition-all duration-300"
              >
                Try BizLeaDeR Sherpa
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="bg-gradient-to-br from-[#212653] via-[#181b3d] to-[#212653] py-20 px-6">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-wider text-[#b8b344] mb-4">
              DESIGNED FOR SMALL & MID-SIZE BUSINESS LEADERS
            </p>
            <h2 className="font-montserrat font-bold text-white mb-6"
                style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}>
              Two Tools, One Complete System
            </h2>
          </div>

          <div className="overflow-x-auto">
            <div className="bg-white border border-[#242553]/20 rounded-xl overflow-hidden min-w-[600px] shadow-xl">
              {/* Table Header */}
              <div className="grid grid-cols-3 bg-[#242553]/40 border-b-2 border-[#969423]">
                <div className="p-4"></div>
                <div className="p-4 text-center">
                  <p className="font-bold text-[#242553] text-lg">BizGuide Sherpa</p>
                </div>
                <div className="p-4 text-center">
                  <p className="font-bold text-[#242553] text-lg">BizLeaDeR Sherpa</p>
                </div>
              </div>

              {/* Table Rows */}
              {[
                {
                  dimension: 'Primary focus',
                  bizGuide: 'Business health and execution "how-to" across 12 core areas.',
                  bizLeader: 'Leadership capabilities, mindset, and team effectiveness.'
                },
                {
                  dimension: 'Main user',
                  bizGuide: 'Owners, CEOs, COOs, functional leaders driving results.',
                  bizLeader: 'Owners, executives, managers, emerging leaders.'
                },
                {
                  dimension: 'Core questions answered',
                  bizGuide: '"Where are our gaps?" "How do we fix this?" "Are we ready to scale?"',
                  bizLeader: '"How do I lead through this?" "How do we grow our leaders?"'
                },
                {
                  dimension: 'Input signals',
                  bizGuide: 'BizHealth.ai diagnostics, benchmarks (e.g., 70% SMB cash-flow strain, 60% stall after year 3).',
                  bizLeader: 'Leadership and people insights from BizHealth reports, culture and HR indicators.'
                },
                {
                  dimension: 'Output style',
                  bizGuide: 'Step-by-step recommendations, roadmaps, and resource suggestions.',
                  bizLeader: 'Coaching guidance, development tracks, conversation frameworks, and behavioral next steps.'
                },
                {
                  dimension: 'Best use cadence',
                  bizGuide: 'Weekly or monthly for strategy, ops, and growth decisions; continuous in future subscription.',
                  bizLeader: 'Weekly 1:1s, leadership meetings, and personal growth sprints; ongoing in future subscription.'
                }
              ].map((row, index) => (
                <div key={index} className={`grid grid-cols-3 border-t border-[#242553]/10 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                  <div className="p-4 text-[#242553] font-semibold">{row.dimension}</div>
                  <div className="p-4 text-[#242553] text-sm leading-relaxed">{row.bizGuide}</div>
                  <div className="p-4 text-[#242553] text-sm leading-relaxed">{row.bizLeader}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Activate Now Section */}
      <section className="bg-white py-20 px-6">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-wider text-[#969423] mb-4">
              LIMITED TIME OPPORTUNITY
            </p>
            <h2 className="font-montserrat font-bold text-[#212653] mb-5"
                style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}>
              Lock In Free Access to Your Business & Leadership Sherpas
            </h2>
            <p className="text-lg text-[#7C7C7C] leading-relaxed">
              Available today at no cost for registered users—coming soon as part of premium 
              monthly plans for SMBs serious about sustainable growth.
            </p>
          </div>

          {/* Value Proposition Box */}
          <div className="bg-[#969423]/5 border-2 border-[#969423] rounded-xl p-8 mb-10">
            <p className="text-lg text-[#212653] leading-relaxed">
              As an introductory offer, registered <span className="font-bold">BizHealth.ai clients</span> can access <span className="underline">both</span> online <span className="font-bold">BizSherpas</span> for <span className="font-bold">FREE</span>, layered 
              on top of our already high-ROI diagnostics that deliver 20x value on modest assessment fees. 
              As BizHealth.ai scales, ongoing access to <span className="font-bold">BizGuide Sherpa</span> and <span className="font-bold">BizLeaDeR Sherpa</span> will become part of an optional monthly subscription plan, turning one-time insights into 
              a living, evolving system of business and leadership support.
            </p>
          </div>

          {/* Trust Signals */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {trustSignals.map((signal, index) => {
              const Icon = signal.icon;
              return (
                <div key={index} className="bg-[#faf9f7] rounded-lg p-6 text-center">
                  <Icon className="w-9 h-9 text-[#969423] mx-auto mb-3" />
                  <p className="font-montserrat font-bold text-[#212653] text-4xl mb-2">{signal.stat}</p>
                  <p className="text-sm text-[#7C7C7C]">{signal.label}</p>
                </div>
              );
            })}
          </div>

          {/* Primary CTA */}
          <div className="text-center">
            <Button 
              asChild
              size="lg"
              className="bg-[#969423] hover:bg-[#b8b344] text-white font-bold px-10 py-7 text-lg rounded-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 mb-4"
            >
              <Link to="/register">
                Register & Activate My Sherpas
              </Link>
            </Button>
            <p className="text-sm text-[#4A90E2]">
              No credit card required • Takes 2 minutes • Start using immediately
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gradient-to-b from-[#f5f3ef] to-[#faf9f7] py-16 px-6">
        <div className="container max-w-3xl mx-auto">
          <h2 className="font-montserrat font-semibold text-[#212653] text-3xl text-center mb-10">
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible value={expandedFaq} onValueChange={setExpandedFaq}>
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white rounded-lg mb-3 px-5 border border-[#212653]/8 shadow-sm"
              >
                <AccordionTrigger className="font-semibold text-[#212653] hover:text-[#969423] text-left py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#7C7C7C] leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <GlobalFooter />
    </>
  );
};

export default Sherpas;