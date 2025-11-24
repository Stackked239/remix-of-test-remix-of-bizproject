import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Clock, MessageSquare, Shield, Lightbulb, Users, Compass, Target, Brain,
  Zap, CheckCircle, MessageCircle, ArrowRight, BookOpen, ChevronRight, TrendingUp
} from "lucide-react";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import PromotionalBanner from "@/components/PromotionalBanner";
import { Button } from "@/components/ui/button";

const BizLeaderBot = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const scenarios = [
    {
      icon: MessageCircle,
      title: "Difficult Conversations",
      description: "Navigate tough talks with underperforming employees, deliver feedback that drives change",
      sample: "How do I address an employee who consistently misses deadlines without damaging our relationship?"
    },
    {
      icon: Users,
      title: "Team Motivation",
      description: "Re-energize disengaged teams, boost morale during challenging periods",
      sample: "My team seems burned out after a tough quarter. What can I do to rebuild their energy and engagement?"
    },
    {
      icon: Compass,
      title: "Strategic Decisions",
      description: "Make high-stakes choices with confidence, balance risk and opportunity",
      sample: "I'm torn between two major directions for my business. How do I evaluate which path is right?"
    },
    {
      icon: Target,
      title: "Delegation & Trust",
      description: "Let go of control effectively, empower your team to own outcomes",
      sample: "I know I need to delegate more, but I struggle to trust that things will get done right. How do I start?"
    },
    {
      icon: Shield,
      title: "Conflict Resolution",
      description: "Mediate team disputes, turn friction into productive collaboration",
      sample: "Two of my key employees are constantly clashing. How do I resolve their conflict before it affects the whole team?"
    },
    {
      icon: Brain,
      title: "Personal Growth",
      description: "Develop your own leadership capacity, overcome blind spots",
      sample: "I feel like I've plateaued as a leader. What should I focus on to keep growing?"
    }
  ];

  const insights = [
    {
      number: "01",
      title: "The 5:1 Feedback Ratio",
      insight: "Research shows high-performing teams receive 5 positive interactions for every critical one. Before your next critique, bank positive recognition.",
      action: "This week: Give specific praise to each team member before addressing any concerns."
    },
    {
      number: "02",
      title: "Decision Fatigue is Real",
      insight: "Leaders make an average of 35,000 decisions daily. Quality degrades as the day progresses. Reserve strategic choices for peak mental hours.",
      action: "Schedule your most important decisions before noon when possible."
    },
    {
      number: "03",
      title: "Silence is a Leadership Tool",
      insight: "The pause after asking a question is where insight emerges. Most leaders wait only 1-2 seconds. Extending to 7 seconds dramatically improves response quality.",
      action: "In your next meeting, consciously count to 5 before filling silence."
    }
  ];

  const metrics = [
    { label: "Financial Health", value: 73, color: "bg-[#FFED29]" },
    { label: "Operational Efficiency", value: 61, color: "bg-biz-copper" },
    { label: "Team & Culture", value: 88, color: "bg-[#008000]" },
    { label: "Strategic Alignment", value: 52, color: "bg-[#991923]" }
  ];

  return (
    <>
      <SEO
        title="Free AI Leadership Mentor | BizLeaDeR Leadership Development Bot | BizHealth.ai"
        description="Get instant leadership advice from an AI-powered business mentor. Navigate difficult conversations, boost team motivation, and make strategic decisions with confidence. Free for BizHealth.ai users."
        keywords="leadership development, business leadership mentor, AI leadership coach, SMB leadership, leadership skills, team management, leadership advice, small business leadership"
        canonical="https://bizhealth.ai/bizleader/leadership-development-bot"
        ogType="website"
      />
      
      <StructuredData
        type="service"
        name="BizLeaDeR Leadership Development Bot"
        description="AI-powered leadership mentor providing 24/7 guidance for business leaders. Navigate difficult conversations, boost team motivation, and make strategic decisions with confidence."
        provider="BizHealth.ai"
        areaServed="United States"
        url="https://bizhealth.ai/bizleader/leadership-development-bot"
      />

      <div className="min-h-screen bg-white">
        <PromotionalBanner />
        <GlobalNavigation />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-biz-navy via-biz-navy-deep to-biz-navy-deep overflow-hidden pt-44 pb-24">
          {/* Radial green glow accents */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-biz-green/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-biz-green/5 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Limited Time Badge */}
              <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-biz-green to-biz-green-light text-white text-sm font-semibold uppercase tracking-wider mb-8 animate-fade-in-up">
                <Clock className="w-4 h-4" />
                Limited Time: Free Access
              </div>

              {/* Headline */}
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                Your Personal{" "}
                <span className="text-biz-green-light">BizLeadership Mentor</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-white/80 mb-6 leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                Decades of leadership experience, available 24/7. Navigate difficult conversations, 
                motivate your team, and make strategic decisions with confidence.
              </p>

              {/* Privacy Note */}
              <p className="text-sm text-white/50 italic animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <span className="text-biz-green-light not-italic font-semibold">Private & Confidential</span> — Your questions are never shared or made public. 
                Ask the hard questions.
              </p>
            </div>
          </div>
        </section>

        {/* Embedded Chatbot Section */}
        <section className="relative -mt-12 pb-16 bg-biz-gray">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Bot Container */}
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Bot Header */}
                <div className="bg-gradient-to-r from-biz-navy to-biz-navy-deep border-b-4 border-biz-green px-6 py-4">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Left: Avatar and Info */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-biz-green to-biz-green-light flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-white font-bold text-lg">BizLeaDeR Leadership Mentor</h2>
                        <div className="flex items-center gap-2 text-white/70 text-sm">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-biz-green opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-biz-green"></span>
                          </span>
                          Online & Ready to Help
                        </div>
                      </div>
                    </div>

                    {/* Right: Privacy Badge */}
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <Shield className="w-4 h-4" />
                      <span>Private Conversation</span>
                    </div>
                  </div>
                </div>

                {/* Bot Embed Area */}
                <div className="bg-biz-warm p-4 md:p-6">
                  <iframe 
                    src="https://embed.cody.bot/9dc6343e-cc5f-4ea4-803b-1862d1c4b04a" 
                    style={{ border: 0 }} 
                    name="codyai" 
                    scrolling="no" 
                    frameBorder="1" 
                    marginHeight={0} 
                    marginWidth={0} 
                    height="600px" 
                    width="100%" 
                    allowFullScreen
                    title="BizLeaDeR Leadership Development AI Mentor"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Conversation Starters Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 text-biz-green text-sm font-semibold uppercase tracking-wider mb-4">
                  <Lightbulb className="w-4 h-4" />
                  Conversation Starters
                </div>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-biz-navy mb-4">
                  What Leadership Challenge Can We Help With?
                </h2>
                <p className="text-lg text-biz-grey max-w-3xl mx-auto">
                  Click any scenario below for sample questions, then ask your own version to the mentor above. 
                  Every business leader faces these moments.
                </p>
              </div>

              {/* Scenario Cards Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {scenarios.map((scenario, index) => {
                  const Icon = scenario.icon;
                  const isExpanded = expandedCard === index;
                  
                  return (
                    <article 
                      key={index}
                      className="group bg-white border-2 border-gray-200 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-l-4 hover:border-l-biz-green cursor-pointer"
                      onClick={() => setExpandedCard(isExpanded ? null : index)}
                    >
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-lg bg-biz-green/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-biz-green">
                        <Icon className="w-7 h-7 text-biz-green transition-colors duration-300 group-hover:text-white" />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-biz-navy mb-3">
                        {scenario.title}
                      </h3>

                      {/* Description */}
                      <p className="text-biz-grey mb-4">
                        {scenario.description}
                      </p>

                      {/* CTA */}
                      <button className="flex items-center gap-2 text-biz-green font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                        {isExpanded ? 'Hide' : 'See'} sample question
                        <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                      </button>

                      {/* Sample Question */}
                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t-2 border-gray-100 animate-fade-in">
                          <div className="bg-biz-cream border-l-4 border-biz-green p-4 rounded-r-lg">
                            <p className="text-biz-navy italic text-sm leading-relaxed">
                              "{scenario.sample}"
                            </p>
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

        {/* Leadership Quick Wins Section */}
        <section className="py-20 bg-gradient-to-br from-biz-cream to-biz-warm">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 text-biz-green text-sm font-semibold uppercase tracking-wider mb-4">
                  <Zap className="w-4 h-4" />
                  Leadership Quick Wins
                </div>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-biz-navy mb-4">
                  Actionable Insights You Can Use Today
                </h2>
                <p className="text-lg text-biz-grey max-w-3xl mx-auto">
                  Small shifts that create big impact. Try one this week and see the difference.
                </p>
              </div>

              {/* Insight Cards */}
              <div className="grid md:grid-cols-3 gap-8">
                {insights.map((insight, index) => (
                  <article 
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Large Number */}
                    <div className="absolute top-4 right-4 font-serif text-7xl font-bold text-biz-green/20">
                      {insight.number}
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-biz-navy mb-4">
                        {insight.title}
                      </h3>
                      <p className="text-biz-grey mb-6 leading-relaxed">
                        {insight.insight}
                      </p>

                      {/* Action Box */}
                      <div className="bg-biz-green/20 rounded-lg p-4">
                        <div className="flex gap-3">
                          <CheckCircle className="w-5 h-5 text-biz-green flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-biz-navy font-medium">
                            {insight.action}
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
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left: Content */}
                <div>
                  <h2 className="font-serif text-4xl md:text-5xl font-bold text-biz-navy mb-6">
                    Leadership is Just One Piece of Business Health
                  </h2>
                  <p className="text-lg text-biz-grey mb-8 leading-relaxed">
                    Great leaders understand their whole business. Our Business Health Assessment reveals blind spots 
                    across finance, operations, team, and strategy—so you can lead with complete clarity.
                  </p>

                  {/* Feature Checklist */}
                  <ul className="space-y-4 mb-8">
                    {[
                      "Comprehensive analysis across 4 critical pillars",
                      "Benchmarks against businesses like yours",
                      "Prioritized action plan with specific next steps"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-biz-green flex-shrink-0 mt-0.5" />
                        <span className="text-biz-navy font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link to="/how-it-works">
                    <Button className="group bg-gradient-to-r from-biz-navy to-biz-navy-deep text-white hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300">
                      Explore Business Health Assessment
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                </div>

                {/* Right: Visual Card */}
                <div className="bg-gradient-to-br from-biz-cream to-biz-warm rounded-2xl p-8 shadow-xl">
                  {/* Card Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-biz-green/20 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-biz-green" />
                    </div>
                    <div>
                      <div className="text-sm text-biz-grey uppercase tracking-wider">Business Health Score</div>
                      <div className="font-bold text-biz-navy">Sample Assessment Preview</div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="space-y-6">
                    {metrics.map((metric, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-biz-navy">{metric.label}</span>
                          <span className="text-lg font-bold text-biz-navy">{metric.value}/100</span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
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
        <section className="py-20 bg-gradient-to-br from-biz-navy via-biz-navy-deep to-biz-navy-deep">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Level Up Your Leadership?
              </h2>
              <p className="text-xl text-white/70 mb-8 leading-relaxed">
                The best leaders never stop learning. Start a conversation with your leadership mentor above, 
                or explore more BizLeaDeR resources.
              </p>
              
              <Link to="/bizleader">
                <Button className="group bg-biz-green hover:bg-biz-green-light text-white text-lg px-8 py-6 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Explore BizLeaDeR Hub
                </Button>
              </Link>

              <p className="text-white/50 text-sm mt-6">
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

export default BizLeaderBot;