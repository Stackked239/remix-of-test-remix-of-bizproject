import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Clock, Shield, Lightbulb, Compass, ArrowRight, CheckCircle, ChevronRight, BookOpen,
  DollarSign, Rocket, Users, BarChart3, TrendingUp, Settings, HelpCircle, Briefcase, User, Copy
} from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import PromotionalBanner from "@/components/PromotionalBanner";
import { Button } from "@/components/ui/button";
import { CodyWidget } from "@/components/CodyWidget";

const BizGuideSherpa = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const challenges = [
    {
      icon: DollarSign,
      title: "Cash Flow & Finances",
      description: "Navigate cash crunches, improve collections, and build financial resilience",
      sample: "My revenue is growing but I'm always tight on cash. How do I fix my cash flow problem?"
    },
    {
      icon: Rocket,
      title: "Scaling Operations",
      description: "Grow without chaos—systems, processes, and infrastructure that scale",
      sample: "We're growing fast but everything feels like it's held together with duct tape. Where do I start?"
    },
    {
      icon: Users,
      title: "Building Your Team",
      description: "Hire right, develop talent, and create a culture that retains top performers",
      sample: "I need to hire my first manager but I've never done this before. What should I look for?"
    },
    {
      icon: BarChart3,
      title: "Pricing & Profitability",
      description: "Price with confidence, improve margins, and stop leaving money on the table",
      sample: "I think I'm undercharging but I'm afraid to raise prices. How do I approach this?"
    },
    {
      icon: TrendingUp,
      title: "Growth Strategy",
      description: "Identify opportunities, prioritize investments, and chart your path forward",
      sample: "I have limited resources. Should I focus on getting new customers or selling more to existing ones?"
    },
    {
      icon: Settings,
      title: "Operations & Efficiency",
      description: "Streamline workflows, eliminate bottlenecks, and do more with less",
      sample: "I'm working 70-hour weeks and still can't keep up. What am I doing wrong?"
    }
  ];

  const quickWins = [
    {
      number: "01",
      title: "The 13-Week Cash Flow Forecast",
      insight: "Most businesses fail from cash problems, not profit problems. A rolling 13-week cash forecast gives you visibility before crises hit—enough time to act, short enough to be accurate.",
      action: "This week: Map out your expected cash in and cash out for the next 13 weeks. Update it every Monday."
    },
    {
      number: "02",
      title: "The 80/20 Customer Audit",
      insight: "Roughly 20% of your customers likely generate 80% of your profit. Many businesses spend equal energy on all customers, diluting focus on the relationships that matter most.",
      action: "Run a simple profit-by-customer analysis. Identify your top 20% and ask: How do I get more customers like these?"
    },
    {
      number: "03",
      title: "The \"Stop Doing\" List",
      insight: "Growth isn't just about adding—it's about subtracting. Every hour spent on low-value activities is an hour not spent on what actually moves the needle.",
      action: "Track your time for one week. Identify your lowest-value recurring tasks and eliminate, delegate, or automate one this month."
    }
  ];

  const metrics = [
    { label: "Financial Health", value: 73, color: "bg-[#008000]" },
    { label: "Operational Efficiency", value: 61, color: "bg-[#FFED29]" },
    { label: "Team & Culture", value: 88, color: "bg-[#008000]" },
    { label: "Strategic Alignment", value: 52, color: "bg-[#991923]" }
  ];

  return (
    <>
      <CodyWidget />
      <SEO
        title="Free AI Business Advisor | BizGuide Sherpa | BizHealth.ai"
        description="Get instant business advice from an AI-powered consultant. Navigate cash flow, scale operations, build teams, and grow strategically. Free for BizHealth.ai users."
        keywords="business growth, business consulting, SMB growth strategy, scaling business, business advisor, small business help, business mentor, cash flow, business questions, how to grow business"
        canonical="https://bizhealth.ai/bizguides/bizguide-sherpa"
        ogType="website"
        ogImage="/og-images/og-bizguide-sherpa.jpg"
      />
      
      <StructuredData
        type="service"
        name="BizGuide Sherpa"
        description="AI-powered business advisor providing 24/7 guidance for business owners. Navigate cash flow challenges, scale operations, build teams, and grow strategically."
        provider="BizHealth.ai"
        areaServed="United States"
        url="https://bizhealth.ai/bizguides/bizguide-sherpa"
      />

      <div className="min-h-screen bg-[#faf9f7]" data-search-terms="business growth, business questions, growth, questions, sherpa, scaling, growing, how to">
        <PromotionalBanner />
        <GlobalNavigation />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#212653] via-[#181b3d] to-[#1a1d42] overflow-hidden pt-44 pb-24">
          {/* Radial green glow accents */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#969423]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#969423]/5 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
              {/* Badges Container */}
              <div className="flex flex-col items-center gap-3 mb-8">
                {/* Hub Label */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-white/70 text-xs font-semibold uppercase tracking-[1.5px] animate-fade-in-up">
                  <Compass className="w-3 h-3" />
                  BIZGUIDES HUB
                </div>

                {/* Limited Time Badge */}
                <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#d5ff00] text-[#212653] text-sm font-bold tracking-wider animate-fade-in-up shadow-[0_4px_14px_rgba(255,255,255,0.4)] hover:scale-105 hover:shadow-[0_6px_20px_rgba(255,255,255,0.5)] transition-all duration-300 cursor-pointer" style={{ animationDelay: '100ms' }}>
                  <Clock className="w-4 h-4 text-[#212653]" />
                  Limited Time: FREE Access
                </div>
              </div>

              {/* Headline */}
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up" style={{ fontFamily: 'Libre Baskerville, serif', animationDelay: '100ms' }}>
                Your On-Demand{" "}
                <span className="text-[#b8b344]">Business Advisor</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-white/80 mb-6 leading-relaxed max-w-[680px] mx-auto animate-fade-in-up" style={{ fontFamily: 'Source Sans Pro, sans-serif', animationDelay: '200ms' }}>
                Decades of business experience, available whenever you need it. Navigate cash flow challenges, 
                scale your operations, build your team, and grow strategically.
              </p>

              {/* Privacy Note */}
              <p className="text-sm text-white/50 italic animate-fade-in-up" style={{ fontFamily: 'Source Sans Pro, sans-serif', animationDelay: '300ms' }}>
                <span className="text-[#b8b344] not-italic font-bold">Private & Confidential</span> — Your questions are never shared. 
                Ask what you can't ask anyone else.
              </p>
            </div>
          </div>
        </section>

        {/* Embedded Chatbot Section */}
        <section className="relative -mt-12 pb-16 bg-[#faf9f7]">
          <div className="container mx-auto px-4">
            <div className="max-w-[1000px] mx-auto">
              {/* Bot Container */}
              <div className="bg-white rounded-[20px] shadow-[0_12px_40px_rgba(33,38,83,0.15)] overflow-hidden">
                {/* Bot Header */}
                <div className="bg-biz-white border-b-[3px] border-biz-green px-7 py-5">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Left: Avatar and Info */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-[10px] bg-gradient-to-br from-biz-green to-biz-green-light flex items-center justify-center flex-shrink-0">
                        <Compass className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-biz-navy font-bold text-lg" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>BizGuide Sherpa</h2>
                        <div className="flex items-center gap-2 text-biz-navy/70 text-sm">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400"></span>
                          </span>
                          Online & Ready to Help
                        </div>
                      </div>
                    </div>

                    {/* Right: Privacy Badge */}
                    <div className="flex items-center gap-2 text-biz-navy/60 text-sm">
                      <Shield className="w-4 h-4" />
                      <span>Private Conversation</span>
                    </div>
                  </div>
                </div>

                {/* Bot Embed Area */}
                <div className="bg-[#f5f3ef] p-4 md:p-6">
                  <iframe 
                    src="https://embed.cody.bot/9dc62ce5-fea2-460f-b8a4-599ce5a4a530" 
                    style={{ border: '0px' }} 
                    name="codyai" 
                    scrolling="no" 
                    frameBorder={1} 
                    marginHeight={0} 
                    marginWidth={0} 
                    height="650px" 
                    width="100%" 
                    allowFullScreen
                    title="BizGuide Sherpa AI Business Advisor"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Business Challenges Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-[1100px] mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 text-[#969423] text-sm font-semibold uppercase tracking-wider mb-4">
                  <HelpCircle className="w-4 h-4" />
                  COMMON BUSINESS CHALLENGES
                </div>
                <h2 className="font-bold text-4xl md:text-5xl text-[#212653] mb-4" style={{ fontFamily: 'Libre Baskerville, serif' }}>
                  What's Keeping You Up at Night?
                </h2>
                <p className="text-lg text-[#7C7C7C] max-w-[700px] mx-auto" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                  Click any challenge below for a sample question, then bring your own version to the advisor above. 
                  No question is too basic or too complex.
                </p>
              </div>

              {/* Challenge Cards Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {challenges.map((challenge, index) => {
                  const Icon = challenge.icon;
                  const isExpanded = expandedCard === index;
                  
                  return (
                    <article 
                      key={index}
                      className="group relative bg-white border-2 border-gray-200 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer overflow-hidden"
                      onClick={() => setExpandedCard(isExpanded ? null : index)}
                    >
                      {/* Bottom border accent */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#969423] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                      
                      {/* Icon */}
                      <div className={`w-[52px] h-[52px] rounded-lg bg-[rgba(150,148,35,0.12)] flex items-center justify-center mb-4 transition-all duration-300 ${isExpanded ? 'bg-[#969423]' : 'group-hover:bg-[#969423]'}`}>
                        <Icon className={`w-6 h-6 text-[#969423] transition-colors duration-300 ${isExpanded ? 'text-white' : 'group-hover:text-white'}`} />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-[#212653] mb-3" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                        {challenge.title}
                      </h3>

                      {/* Description */}
                      <p className="text-[#7C7C7C] mb-4 text-[0.95rem]" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                        {challenge.description}
                      </p>

                      {/* CTA */}
                      <button className="flex items-center gap-2 text-[#969423] font-semibold text-sm transition-all duration-300">
                        {isExpanded ? 'Try this question above' : 'See sample question'}
                        <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                      </button>

                      {/* Sample Question */}
                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t-2 border-gray-100 animate-fade-in" onClick={(e) => e.stopPropagation()}>
                          <div className="bg-[#faf9f7] border-l-[3px] border-[#969423] p-4 rounded-r-lg">
                            <p className="text-[#212653] italic text-sm leading-relaxed mb-3" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                              "{challenge.sample}"
                            </p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigator.clipboard.writeText(challenge.sample);
                                toast.success("Question copied to clipboard!");
                              }}
                              className="flex items-center gap-2 text-[#969423] hover:text-[#212653] font-semibold text-xs transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white"
                            >
                              <Copy className="w-3.5 h-3.5" />
                              Copy Question
                            </button>
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Business Quick Wins Section */}
        <section className="py-20 bg-gradient-to-br from-[#f5f3ef] to-[#f0ebe4]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 text-[#969423] text-sm font-semibold uppercase tracking-wider mb-4">
                  <Lightbulb className="w-4 h-4" />
                  BUSINESS QUICK WINS
                </div>
                <h2 className="font-bold text-4xl md:text-5xl text-[#212653] mb-4" style={{ fontFamily: 'Libre Baskerville, serif' }}>
                  Actionable Insights You Can Use Today
                </h2>
                <p className="text-lg text-[#7C7C7C] max-w-3xl mx-auto" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                  Small changes that create big impact. Pick one and implement it this week.
                </p>
              </div>

              {/* Quick Win Cards */}
              <div className="grid md:grid-cols-3 gap-8">
                {quickWins.map((win, index) => (
                  <article 
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Large Number */}
                    <div className="absolute top-4 right-4 text-[4.5rem] font-bold text-[#969423]/20" style={{ fontFamily: 'Libre Baskerville, serif' }}>
                      {win.number}
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-[#212653] mb-4" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                        {win.title}
                      </h3>
                      <p className="text-[#7C7C7C] mb-6 leading-relaxed text-[0.95rem]" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                        {win.insight}
                      </p>

                      {/* Action Box */}
                      <div className="bg-[rgba(150,148,35,0.12)] rounded-lg p-4">
                        <div className="flex gap-3">
                          <CheckCircle className="w-5 h-5 text-[#969423] flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-[#212653] font-medium" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                            {win.action}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Business Health Assessment CTA */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-[900px] mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left: Content */}
                <div>
                  <h2 className="font-bold text-4xl md:text-5xl text-[#212653] mb-6" style={{ fontFamily: 'Libre Baskerville, serif' }}>
                    Know Where You Stand Before You Plan Where to Go
                  </h2>
                  <p className="text-lg text-[#7C7C7C] mb-8 leading-relaxed" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                    Great advice starts with understanding your current reality. Our Business Health Assessment gives you a clear picture of your financial health, operational efficiency, team strength, and strategic alignment—so you know exactly where to focus.
                  </p>

                  {/* Feature Checklist */}
                  <ul className="space-y-4 mb-8">
                    {[
                      "Comprehensive analysis across 4 critical business pillars",
                      "Benchmarks against businesses like yours",
                      "Prioritized action plan with specific next steps"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-[#969423] flex-shrink-0 mt-0.5" />
                        <span className="text-[#212653] font-medium" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link to="/how-it-works">
                    <Button className="group bg-gradient-to-r from-[#212653] to-[#181b3d] text-white hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 font-bold" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                      Take the Business Health Assessment
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </div>

                {/* Right: Visual Card */}
                <div className="bg-gradient-to-br from-[#faf9f7] to-white rounded-[20px] p-9 shadow-[0_4px_20px_rgba(33,38,83,0.1)] border border-[rgba(33,38,83,0.08)]">
                  {/* Card Header */}
                  <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200">
                    <div className="w-[52px] h-[52px] rounded-lg bg-gradient-to-br from-[#969423] to-[#b8b344] flex items-center justify-center p-2">
                      <img src="/favicon-96x96.png" alt="BizHealth.ai" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#212653]" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>Business Health Score</h3>
                      <p className="text-sm text-[#7C7C7C]" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>Sample Assessment Preview</p>
                    </div>
                  </div>

                  {/* Metric Bars */}
                  <div className="space-y-4">
                    {metrics.map((metric, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[#7C7C7C] text-[0.9rem]" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>{metric.label}</span>
                          <span className="text-[#212653] font-bold text-[0.9rem]" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>{metric.value}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${metric.color} rounded-full transition-all duration-1000 ease-out`}
                            style={{ width: `${metric.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="bg-biz-green py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-[600px] mx-auto text-center">
              <h2 className="font-bold text-3xl md:text-4xl text-white mb-6" style={{ fontFamily: 'Libre Baskerville, serif' }}>
                Ready to Tackle Your Biggest Challenge?
              </h2>
              <p className="text-white/90 text-lg mb-8 leading-relaxed" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                Your business questions deserve real answers. Start a conversation with BizGuide Sherpa above, 
                or explore more resources in the BizGuides Hub.
              </p>
              
              <Link to="/bizguides">
                <Button className="group bg-biz-navy text-white hover:bg-biz-navy-deep hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 font-bold px-8 py-6 text-base" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                  <BookOpen className="w-5 h-5 mr-2" />
                  Explore BizGuides Hub
                </Button>
              </Link>

              <p className="text-white/70 text-sm mt-6" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                Free access for registered BizHealth.ai users • Premium features coming soon
              </p>
            </div>
          </div>
        </section>

        <GlobalFooter />
      </div>
    </>
  );
};

export default BizGuideSherpa;
