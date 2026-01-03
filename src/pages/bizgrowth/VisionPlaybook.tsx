import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Download, Check, Clock, TrendingUp, Target, MessageSquare, Users, RefreshCw, Scale, Building2, Search, BookOpen, ClipboardList, Megaphone, Settings, BarChart3, ChevronRight, AlertTriangle, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import GlobalFooter from '@/components/GlobalFooter';

const VisionPlaybook = () => {
  const [headerShadow, setHeaderShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderShadow(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/downloads/Build-Share-Your-Vision-Playbook-BizHealth.pdf';
    link.download = 'Build-Share-Your-Vision-Playbook-BizHealth.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Your playbook download has started!');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const buildCards = [
    { icon: Target, title: 'Crystal-Clear Vision', description: "A clear understanding of what you're building and why—grounded in your customer, your purpose, and your definition of success. Not corporate fluff." },
    { icon: MessageSquare, title: 'Shareable Language', description: 'A simple way to communicate your vision to your team that actually sticks—no jargon, just clear, memorable direction anyone can understand.' },
    { icon: Users, title: 'Aligned Team', description: "A team that understands where you're going and why it matters—and can make decisions without constantly asking you for permission." },
    { icon: RefreshCw, title: 'Reinforcement Habits', description: 'Operational habits that keep your vision alive over time—not something you announce once and forget about a week later.' },
    { icon: Scale, title: 'Framework for Hard Conversations', description: 'A framework for difficult accountability conversations grounded in shared purpose—depersonalized and clear, not awkward and personal.' },
    { icon: Building2, title: 'Self-Reinforcing Culture', description: 'A culture that emerges from daily choices aligned with vision—not something you have to constantly police and correct.' },
  ];

  const impactItems = [
    { title: 'Creates Autonomy', description: 'People understand the destination. They don\'t need to ask permission for every decision. They can think: "Does this move us toward our vision or away from it?"' },
    { title: 'Accelerates Decisions', description: 'Without vision, every decision goes to the top. With vision, decisions accelerate because people at all levels can decide without constant check-ins.' },
    { title: 'Builds Culture Automatically', description: 'Culture emerges from daily choices. When aligned around vision, people naturally reinforce the right behaviors. Culture becomes self-reinforcing.' },
    { title: 'Improves Retention & Talent', description: 'People want to work toward something meaningful. When you share your vision clearly, you attract people who believe in it—not just people looking for a paycheck.' },
  ];

  const steps = [
    { icon: Search, step: 1, title: 'Excavate Your Vision' },
    { icon: MessageSquare, step: 2, title: 'Translate Into Language' },
    { icon: BookOpen, step: 3, title: 'Build Context' },
    { icon: ClipboardList, step: 4, title: 'Prepare to Share' },
    { icon: Megaphone, step: 5, title: 'Share Your Vision' },
    { icon: Settings, step: 6, title: 'Reinforce & Embed' },
    { icon: BarChart3, step: 7, title: 'Measure & Evolve' },
  ];

  const ctaFeatures = ['7 Complete Steps', 'Practical Exercises', 'Real Examples', 'Plain Language'];

  return (
    <>
      <SEO
        title="Build & Share Your Vision | Free 7-Step Playbook | BizHealth.ai BizGrowth Academy"
        description="Transform how your business operates with our free 7-step vision playbook. Create clarity, align your team, and make faster decisions. Download the complete framework—no email required."
        keywords="business vision, vision statement, team alignment, small business leadership, business playbook, free business resources, BizHealth, BizGrowth Academy, SMB tools, business strategy"
        canonical="https://bizhealth.ai/bizgrowth-academy/vision-playbook"
        ogType="website"
        ogImage="https://bizhealth.ai/og-image.jpg"
      />

      <StructuredData
        type="course"
        name="Build & Share Your Vision Playbook"
        description="A free 7-step playbook for small business leaders to create, communicate, and embed a clear vision."
        provider="BizHealth.ai BizGrowth Academy"
        providerUrl="https://bizhealth.ai"
        url="https://bizhealth.ai/bizgrowth-academy/vision-playbook"
        courseMode="Online"
        isAccessibleForFree={true}
        price="0"
        priceCurrency="USD"
      />

      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      </Helmet>

      {/* Sticky Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E8E8E5] py-4 transition-shadow duration-300 ${headerShadow ? 'shadow-lg shadow-[#242553]/10' : ''}`}
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-['Montserrat'] font-extrabold text-xl text-[#242553]">
                Biz<span className="text-[#969423]">Health</span>.ai
              </span>
            </Link>
            <nav className="hidden md:flex gap-8 items-center">
              <button onClick={() => scrollToSection('myth')} className="text-sm font-semibold text-[#242553] hover:text-[#969423] transition-colors">
                The Problem
              </button>
              <button onClick={() => scrollToSection('build')} className="text-sm font-semibold text-[#242553] hover:text-[#969423] transition-colors">
                What You Get
              </button>
              <button onClick={() => scrollToSection('steps')} className="text-sm font-semibold text-[#242553] hover:text-[#969423] transition-colors">
                7 Steps
              </button>
              <Button 
                onClick={handleDownload}
                className="bg-[#E6B800] text-[#242553] hover:bg-[#D4A900] font-semibold px-5 py-2 rounded-md transition-all hover:-translate-y-0.5"
              >
                Download Free
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#242553] via-[#1a1a3e] to-[#2a2a5a] text-white pt-24 pb-16 md:pt-28 md:pb-20 overflow-hidden">
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 20% 80%, rgba(150, 148, 35, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(230, 184, 0, 0.1) 0%, transparent 40%)'
            }}
          />
          <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#E6B800]/15 border border-[#E6B800] text-[#E6B800] px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-8">
              <span>📚</span>
              <span>BizGrowth Academy</span>
            </div>

            {/* Headline */}
            <h1 className="font-['Montserrat'] font-bold text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight mb-6">
              Build <span className="text-[#969423]">& Share</span> Your Vision
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl opacity-90 leading-relaxed mb-10 font-['Open_Sans']">
              Transform how your business operates. Create a clear vision, translate it into language your team understands, and share it in a way that brings everyone together—without the corporate jargon.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleDownload}
                className="bg-[#E6B800] text-[#242553] hover:bg-[#F5C800] font-['Montserrat'] font-semibold text-base px-8 py-4 h-auto rounded-lg shadow-lg shadow-[#E6B800]/30 hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Free Playbook
              </Button>
              <Button 
                onClick={() => scrollToSection('steps')}
                variant="outline"
                className="bg-transparent text-white border-2 border-white/30 hover:bg-white hover:text-[#242553] hover:border-white font-['Montserrat'] font-semibold text-base px-8 py-4 h-auto rounded-lg transition-all"
              >
                See the 7 Steps
              </Button>
            </div>

            {/* Meta Info */}
            <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-10 mt-12 pt-8 border-t border-white/15">
              <div className="flex items-center justify-center gap-2 text-sm opacity-85">
                <Clock className="w-5 h-5" />
                <span>8-12 hours total</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm opacity-85">
                <TrendingUp className="w-5 h-5" />
                <span>Strategy & Leadership</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm opacity-85">
                <Target className="w-5 h-5" />
                <span>Owners, Founders, Team Leaders</span>
              </div>
            </div>
          </div>
        </section>

        {/* The Myth Section */}
        <section id="myth" className="bg-[#FAFAF7] py-20">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="max-w-[900px] mx-auto bg-white rounded-2xl p-8 md:p-12 border-l-[6px] border-[#E6B800] shadow-xl shadow-[#242553]/8">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-8 h-8 text-[#E6B800]" />
                <h2 className="font-['Montserrat'] font-bold text-xl md:text-2xl text-[#242553]">
                  The Vision Myth That's Hurting Your Business
                </h2>
              </div>
              <div className="font-['Open_Sans'] text-lg leading-relaxed space-y-4">
                <p className="text-[#242553]">
                  Most business owners operate under a dangerous assumption:
                </p>
                <blockquote className="italic text-[#5A5A5A] pl-5 border-l-[3px] border-[#969423] my-6">
                  "I know where we are going. Therefore, my team should know where we are going."
                </blockquote>
                <p className="text-[#242553]">
                  Here's what's actually happening: You've been thinking about your business direction for <span className="bg-[#E6B800]/15 px-2 py-0.5 rounded font-semibold">months or years</span>. You've clarified your thinking through countless internal deliberations. You feel the direction deeply—it's intuitive to you.
                </p>
                <p className="text-[#242553]">
                  <strong>But your team doesn't share that experience.</strong> They see what you do today. They see the customers you serve today. They see the daily work in front of them. What they don't see is the internal vision you've been marinating in for months.
                </p>
                <div className="bg-gradient-to-br from-[#242553] to-[#2a2a5a] text-white p-5 md:p-6 rounded-lg mt-6">
                  <p className="m-0">
                    <strong className="text-[#E6B800]">The reality:</strong> They will never know until you tell them clearly—and repeatedly. A vision that only lives in your head is not a vision. It's a private thought.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What You'll Build Section */}
        <section id="build" className="bg-white pt-12 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center max-w-[720px] mx-auto mb-16">
              <h2 className="font-['Montserrat'] font-bold text-3xl md:text-4xl text-[#242553] mb-4">
                What You'll Build
              </h2>
              <p className="font-['Open_Sans'] text-lg text-[#5A5A5A]">
                By completing this 7-step playbook, you'll create something that fundamentally changes how your business operates.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {buildCards.map((card, index) => (
                <div 
                  key={index}
                  className="group relative bg-[#FAFAF7] rounded-xl p-8 border border-[#E8E8E5] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#242553]/10 hover:border-[#969423] overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#969423] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  <card.icon className="w-10 h-10 text-[#969423] mb-4" />
                  <h3 className="font-['Montserrat'] font-bold text-lg text-[#242553] mb-3">
                    {card.title}
                  </h3>
                  <p className="font-['Open_Sans'] text-[#5A5A5A] leading-relaxed m-0">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Vision Matters Section */}
        <section className="bg-[#FAFAF7] pt-12 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center max-w-[720px] mx-auto mb-16">
              <h2 className="font-['Montserrat'] font-bold text-3xl md:text-4xl text-[#242553] mb-4">
                What a Clear, Shared Vision Actually Does
              </h2>
              <p className="font-['Open_Sans'] text-lg text-[#5A5A5A]">
                This isn't theory. These are the real changes you'll see in your business when everyone understands the destination.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Impact List */}
              <div>
                <ul className="space-y-0">
                  {impactItems.map((item, index) => (
                    <li key={index} className="flex gap-4 py-5 border-b border-[#E8E8E5] last:border-b-0">
                      <div className="flex-shrink-0 w-7 h-7 bg-[#969423] text-white rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-['Montserrat'] font-bold text-lg text-[#242553] mb-1">
                          {item.title}
                        </h4>
                        <p className="font-['Open_Sans'] text-[#5A5A5A] text-sm leading-relaxed m-0">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual Stats Card */}
              <div className="bg-gradient-to-br from-[#242553] to-[#1a1a3e] rounded-2xl p-10 text-white text-center">
                <h3 className="font-['Montserrat'] font-semibold text-2xl mb-8">
                  When Vision Becomes Operational
                </h3>
                <div className="space-y-6">
                  {[
                    { number: 'Fewer', label: '"Can I get your approval?" interruptions' },
                    { number: 'Faster', label: 'Decision-making at all levels' },
                    { number: 'Easier', label: 'Accountability conversations' },
                  ].map((stat, index) => (
                    <div key={index} className="bg-white/8 rounded-xl p-5">
                      <span className="font-['Montserrat'] font-extrabold text-4xl text-[#E6B800] block">
                        {stat.number}
                      </span>
                      <span className="text-sm opacity-85">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7 Steps Section */}
        <section id="steps" className="bg-white pt-12 pb-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center max-w-[720px] mx-auto mb-16">
              <h2 className="font-['Montserrat'] font-bold text-3xl md:text-4xl text-[#242553] mb-4">
                Your 7-Step Journey
              </h2>
              <p className="font-['Open_Sans'] text-lg text-[#5A5A5A]">
                A proven framework for building and sharing your vision. Each step builds on the last. No fluff, just action.
              </p>
            </div>

            <div className="max-w-[1000px] mx-auto">
              {/* Steps Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 md:gap-3 mb-12">
                {steps.map((step) => (
                  <div 
                    key={step.step}
                    className="group text-center p-4 md:p-6 bg-[#FAFAF7] rounded-xl border border-[#E8E8E5] transition-all duration-300 hover:border-[#969423] hover:-translate-y-1"
                  >
                    <step.icon className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-[#969423]" />
                    <span className="font-['Montserrat'] font-bold text-[10px] md:text-xs text-[#969423] uppercase tracking-wide block mb-1">
                      Step {step.step}
                    </span>
                    <h4 className="font-['Montserrat'] font-semibold text-xs md:text-sm text-[#242553] leading-tight">
                      {step.title}
                    </h4>
                  </div>
                ))}
              </div>

              {/* Step Preview */}
              <div className="bg-[#FAFAF7] rounded-2xl p-6 md:p-10 border border-[#E8E8E5]">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[#969423] text-white rounded-full flex items-center justify-center font-['Montserrat'] font-bold text-2xl flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-['Montserrat'] font-bold text-xl md:text-2xl text-[#242553] mb-1">
                      Excavate Your Vision
                    </h3>
                    <p className="text-[#5A5A5A] m-0">
                      Discover what you're actually building (it's already inside you)
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="font-['Open_Sans'] text-[#242553] leading-relaxed space-y-4">
                    <p className="m-0">
                      You already have a vision. You might not realize it, but it's there. It's embedded in the customers you choose to serve, the decisions you make, and the culture you're building.
                    </p>
                    <p className="m-0">
                      This first step is about digging it out and making it explicit—so you can share it with your team and use it as a filter for every decision.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 border-l-4 border-[#E6B800]">
                    <h4 className="font-['Montserrat'] font-bold text-xs text-[#969423] uppercase tracking-wide mb-4">
                      The 4 Excavation Questions
                    </h4>
                    <ul className="space-y-3">
                      {[
                        'Who are your best customers?',
                        'What problem do you solve for them?',
                        'Why do you care about solving this?',
                        'What does success look like?',
                      ].map((question, index) => (
                        <li key={index} className="flex items-start gap-2 text-[#242553] font-medium">
                          <ChevronRight className="w-5 h-5 text-[#969423] flex-shrink-0 mt-0.5" />
                          <span>{question}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Info Bubble */}
              <div className="bg-gradient-to-br from-[#969423]/8 to-[#E6B800]/8 border border-[#969423]/20 rounded-xl p-6 md:p-7 mt-10 max-w-[900px] mx-auto">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-[#969423]" />
                  <h4 className="font-['Montserrat'] font-bold text-xs text-[#969423] uppercase tracking-wide">
                    Key Insight from the Playbook
                  </h4>
                </div>
                <p className="font-['Open_Sans'] text-[#242553] leading-relaxed m-0">
                  <strong>Customer Fit</strong> means your product or service solves a specific problem for a specific type of customer better than anyone else. Not all customers are equal—some are much more valuable (and much more satisfied) than others. Your best customers represent your "fit." Build for them, not for everyone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="download" className="relative bg-gradient-to-br from-[#242553] via-[#1a1a3e] to-[#2a2a5a] text-white py-16 overflow-hidden">
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 30% 70%, rgba(230, 184, 0, 0.12) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(150, 148, 35, 0.1) 0%, transparent 40%)'
            }}
          />
          <div className="relative z-10 max-w-[700px] mx-auto px-6 text-center">
            <h2 className="font-['Montserrat'] font-bold text-3xl md:text-4xl mb-5">
              Ready to Build <span className="text-[#969423]">& Share</span> Your Vision?
            </h2>
            <p className="font-['Open_Sans'] text-lg opacity-90 leading-relaxed mb-10">
              Get the complete 7-step playbook with exercises, templates, real examples, and info bubbles that explain business concepts in plain language. This is the exact framework we use with SMB leaders at BizHealth.ai.
            </p>
            
            <Button 
              onClick={handleDownload}
              className="bg-[#E6B800] text-[#242553] hover:bg-[#F5C800] font-['Montserrat'] font-bold text-lg px-12 py-5 h-auto rounded-lg shadow-lg shadow-[#E6B800]/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#E6B800]/40 transition-all inline-flex items-center gap-3"
            >
              Download Free Playbook
              <ChevronRight className="w-5 h-5" />
            </Button>

            <p className="text-sm opacity-70 mt-5">
              No email required. No sign-up. Just direct access to the playbook.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-10 mt-12 pt-8 border-t border-white/15">
              {ctaFeatures.map((feature, index) => (
                <div key={index} className="flex items-center justify-center gap-2 text-sm opacity-85">
                  <Check className="w-5 h-5 text-[#E6B800]" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <GlobalFooter />
    </>
  );
};

export default VisionPlaybook;
