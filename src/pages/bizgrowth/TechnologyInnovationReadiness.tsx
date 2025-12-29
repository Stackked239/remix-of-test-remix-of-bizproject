import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import PromotionalBanner from '@/components/PromotionalBanner';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from '@/components/GlobalFooter';
import InnovationAssessmentTool from '@/components/innovation/InnovationAssessmentTool';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  TrendingUp, 
  AlertCircle, 
  DollarSign, 
  ChevronDown,
  ArrowRight,
  Target,
  Users,
  Eye,
  Clock,
  CheckCircle,
  Download,
  Lightbulb,
  BarChart3,
  FileText,
  BookOpen
} from 'lucide-react';
import { toast } from 'sonner';
import bizHealthLogo from '@/assets/bizhealth-logo-main.jpg';
import bizHealthAuthorIcon from '@/assets/bizhealth-author-icon.jpg';

const TechnologyInnovationReadiness = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companySize: '',
    score: ''
  });

  const scrollToAssessment = () => {
    document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToArticle = () => {
    document.getElementById('article')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.companySize) {
      toast.error('Please fill in all required fields');
      return;
    }
    // Trigger download
    const link = document.createElement('a');
    link.href = '/downloads/90-Day-Innovation-Gap-Closure-Plan-BizHealthai.docx';
    link.download = '90-Day-Innovation-Gap-Closure-Plan-BizHealthai.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Thank you! Your 90-Day Plan is downloading now.');
    setFormData({ name: '', email: '', companySize: '', score: '' });
  };

  const faqData = [
    {
      question: 'What is innovation readiness?',
      answer: 'Innovation readiness refers to an organization\'s capability to effectively pursue and implement new ideas, technologies, and processes. It encompasses technology infrastructure, strategic clarity, organizational capacity, and market sensing abilities.'
    },
    {
      question: 'How is the Innovation Readiness Score calculated?',
      answer: 'The score is calculated across 20 questions covering four pillars: Technology Infrastructure (25 points), Strategic Clarity (25 points), Organizational Capacity (25 points), and Customer & Market Sensing (25 points), for a total of 100 points.'
    },
    {
      question: 'What does my Innovation Readiness Score mean?',
      answer: 'Scores of 80+ indicate high innovation readiness. Scores of 60-79 mean you\'re competitive but vulnerable. Scores of 40-59 indicate you\'re falling behind, while scores below 40 represent a critical gap requiring immediate action.'
    },
    {
      question: 'How long does the assessment take?',
      answer: 'The Innovation Readiness Assessment takes 5-7 minutes to complete. Your progress is automatically saved, so you can return and finish later if needed.'
    }
  ];

  const timelineData = [
    { phase: 'Week 1-2', title: 'Diagnose and Prioritize', description: 'Complete assessment with leadership team, identify top gaps, document pain points' },
    { phase: 'Week 3-4', title: 'Quick Wins in Technology', description: 'Audit tech stack, identify integration gaps, implement first integration' },
    { phase: 'Week 5-6', title: 'Clarify Strategy', description: 'Run strategy session, document innovation strategy, communicate to team' },
    { phase: 'Week 7-8', title: 'Build Organizational Capacity', description: 'Allocate budget, define innovation roles, establish monthly reviews' },
    { phase: 'Week 9-10', title: 'Market Sensing', description: 'Conduct customer interviews, analyze competitive landscape, identify market gaps' },
    { phase: 'Week 11-12', title: 'Commit to Sustained Innovation', description: 'Launch first innovation project, conduct retrospective, plan next quarter' }
  ];

  return (
    <>
      <SEO 
        title="Innovation Readiness Assessment | Close the Gap in 90 Days | BizGrowth Academy"
        description="Discover why innovative businesses grow 25% faster. Take our free Innovation Readiness Assessment to identify gaps in technology, strategy, capacity, and market sensing. Get your personalized 90-day improvement plan."
        keywords="innovation assessment, SMB innovation, business innovation, innovation gap, technology readiness, strategic planning, innovation management"
        canonical="https://bizhealth.ai/bizgrowth/technology-innovation-readiness"
        ogType="article"
        articlePublishedTime="2025-12-01"
        articleModifiedTime="2025-12-28"
        articleAuthor="BizHealth.ai Strategic Insights"
      />
      
      <StructuredData 
        type="article"
        headline="The Innovation Gap That's Destroying Competitive Advantage"
        description="Comprehensive guide to understanding and closing the innovation gap in SMB businesses with interactive assessment tool"
        image="https://bizhealth.ai/og-innovation-readiness.jpg"
        author="BizHealth.ai Strategic Insights"
        datePublished="2025-12-01"
        dateModified="2025-12-28"
        url="https://bizhealth.ai/bizgrowth/technology-innovation-readiness"
      />
      <StructuredData 
        type="faq"
        questions={faqData}
      />

      <PromotionalBanner />
      <GlobalNavigation />

      <main className="pt-20 pb-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-biz-navy via-biz-navy-deep to-biz-navy overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-biz-navy/90 to-transparent" />
          
          <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block bg-biz-citrine/20 text-biz-citrine px-4 py-2 rounded-full text-sm font-semibold mb-6">
                BizGrowth Academy
              </span>
              
              <h1 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                The Innovation Gap That's Destroying Competitive Advantage
              </h1>
              
              <p className="font-montserrat text-xl md:text-2xl text-white/80 mb-4">
                (And How to Close It in 90 Days)
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button 
                  onClick={scrollToAssessment}
                  className="bg-biz-citrine hover:bg-biz-citrine/90 text-biz-navy font-semibold text-lg px-8 py-6"
                >
                  Take the Innovation Readiness Assessment
                  <ChevronDown className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  variant="outline"
                  onClick={scrollToArticle}
                  className="border-white/50 text-white bg-white/10 hover:bg-white/20 text-lg px-8 py-6"
                >
                  Read the Full Analysis
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats Banner */}
        <section className="bg-gray-100 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="bg-white border-t-4 border-t-biz-citrine shadow-lg">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-12 h-12 text-biz-citrine mx-auto mb-4" />
                  <p className="font-montserrat text-4xl font-bold text-biz-navy mb-2">25%</p>
                  <p className="font-open-sans font-semibold text-biz-grey mb-1">Higher Growth</p>
                  <p className="font-open-sans text-sm text-biz-grey">Businesses prioritizing innovation vs peers</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-t-4 border-t-biz-citrine shadow-lg">
                <CardContent className="p-6 text-center">
                  <AlertCircle className="w-12 h-12 text-biz-citrine mx-auto mb-4" />
                  <p className="font-montserrat text-4xl font-bold text-biz-navy mb-2">Only 13%</p>
                  <p className="font-open-sans font-semibold text-biz-grey mb-1">Using Structured Innovation</p>
                  <p className="font-open-sans text-sm text-biz-grey">Of small companies use structured innovation management</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white border-t-4 border-t-biz-citrine shadow-lg">
                <CardContent className="p-6 text-center">
                  <DollarSign className="w-12 h-12 text-biz-citrine mx-auto mb-4" />
                  <p className="font-montserrat text-4xl font-bold text-biz-navy mb-2">$25K-$60K</p>
                  <p className="font-open-sans font-semibold text-biz-grey mb-1">Wasted Annually</p>
                  <p className="font-open-sans text-sm text-biz-grey">On fragmented, disconnected technology systems</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Interactive Assessment Tool */}
        <section id="assessment" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-biz-navy mb-4">
                Discover Your Innovation Readiness Score
              </h2>
              <p className="font-open-sans text-lg text-biz-grey">
                Complete this 20-question assessment in 5-7 minutes to identify your biggest opportunities
              </p>
            </div>
            
            <InnovationAssessmentTool />
          </div>
        </section>

        {/* Full Article Content */}
        <section id="article" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Article Header */}
              <div className="mb-12">
                <nav className="flex items-center gap-2 text-sm text-biz-grey mb-6">
                  <Link to="/bizgrowth" className="hover:text-biz-citrine transition-colors">BizGrowth Academy</Link>
                  <span>/</span>
                  <span className="text-biz-navy">Innovation Readiness</span>
                </nav>
                
                <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-biz-navy mb-4">
                  The Innovation Gap That's Destroying Competitive Advantage
                </h2>
                
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={bizHealthAuthorIcon} 
                    alt="BizHealth.ai" 
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-open-sans font-semibold text-biz-navy">BizHealth.ai Strategic Insights</p>
                    <p className="font-open-sans text-sm text-biz-grey">December 2025 • 12 min read</p>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <article className="prose prose-lg max-w-none">
                <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
                  <p className="font-open-sans text-lg text-biz-grey leading-relaxed">
                    There is a quiet crisis happening in small and mid-size businesses right now. It is not dramatic. There is no single moment when you realize it has happened. But steadily, relentlessly, a gap is opening between businesses that are building genuine innovation capability and those that are not.
                  </p>
                  <p className="font-open-sans text-lg text-biz-grey leading-relaxed mt-4">
                    And the consequences are significant.
                  </p>
                </div>

                {/* Section 1 */}
                <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
                  <h3 className="font-montserrat text-2xl font-bold text-biz-navy mb-6 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-biz-citrine flex items-center justify-center text-biz-navy text-lg font-bold">1</span>
                    The Performance Gap Is Widening
                  </h3>
                  
                  <p className="font-open-sans text-biz-grey leading-relaxed mb-6">
                    Innovation is not a luxury in today's business environment—it is the primary driver of sustainable growth. Research consistently shows that businesses prioritizing innovation outperform their peers by roughly 25% in revenue growth. Over time, this compounds into vastly different outcomes.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-l-red-500">
                      <h4 className="font-montserrat font-semibold text-biz-navy mb-2">The Structural Disadvantage</h4>
                      <p className="font-open-sans text-sm text-biz-grey">
                        Large companies have innovation departments, dedicated R&D budgets, and strategic planning teams. Small businesses have the owner's spare time and whatever budget is left after operations.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-l-orange-500">
                      <h4 className="font-montserrat font-semibold text-biz-navy mb-2">The Time Trap</h4>
                      <p className="font-open-sans text-sm text-biz-grey">
                        40% of SMBs cite "too busy with operations" as the primary barrier to innovation. But being too busy to innovate today means being too uncompetitive to survive tomorrow.
                      </p>
                    </div>
                  </div>

                  <div className="bg-biz-citrine/10 rounded-lg p-6 border-l-4 border-l-biz-citrine">
                    <div className="flex items-start gap-4">
                      <AlertCircle className="w-6 h-6 text-biz-citrine flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-open-sans text-biz-navy font-semibold mb-1">The Fragmented Technology Trap</p>
                        <p className="font-open-sans text-sm text-biz-grey">
                          SMBs are spending $25,000–60,000 per year on disconnected technology that creates more problems than it solves. 20-30% of team energy gets consumed by workarounds and manual data movement.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2 */}
                <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
                  <h3 className="font-montserrat text-2xl font-bold text-biz-navy mb-6 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-biz-citrine flex items-center justify-center text-biz-navy text-lg font-bold">2</span>
                    Why Small Businesses Fall Into the Innovation Gap
                  </h3>
                  
                  <p className="font-open-sans text-biz-grey leading-relaxed mb-6">
                    The innovation gap is not random—it follows predictable patterns. Understanding these patterns is the first step toward escaping them.
                  </p>

                  <div className="space-y-6">
                    <div className="border-l-4 border-l-biz-grey/30 pl-6">
                      <h4 className="font-montserrat font-semibold text-biz-navy mb-2">Constraint #1: The Operational Firefighting Cycle</h4>
                      <p className="font-open-sans text-biz-grey text-sm">
                        Your day starts with a plan to work on strategy. Then a customer issue needs attention. Then a supplier problem. By the time you look up, it's 6pm and you've made no progress on the important but non-urgent work.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-l-biz-grey/30 pl-6">
                      <h4 className="font-montserrat font-semibold text-biz-navy mb-2">Constraint #2: Strategic Ambiguity</h4>
                      <p className="font-open-sans text-biz-grey text-sm">
                        Even when SMB leaders find time, many lack a clear innovation strategy. Without strategic clarity, innovation efforts become scattered across too many initiatives with too little focus.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-l-biz-grey/30 pl-6">
                      <h4 className="font-montserrat font-semibold text-biz-navy mb-2">Constraint #3: Resource Scarcity</h4>
                      <p className="font-open-sans text-biz-grey text-sm">
                        Innovation requires resources—time, money, talent. Only 29% of small companies increase their innovation budgets, while larger competitors invest heavily in R&D and new capabilities.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-l-biz-grey/30 pl-6">
                      <h4 className="font-montserrat font-semibold text-biz-navy mb-2">Constraint #4: Lack of Structured Process</h4>
                      <p className="font-open-sans text-biz-grey text-sm">
                        Large companies have innovation processes—idea management, stage gates, project management. Small businesses often rely on informal approaches that leave innovation to chance.
                      </p>
                    </div>
                  </div>

                  <blockquote className="mt-8 border-l-4 border-l-biz-citrine bg-gray-50 p-6 italic text-biz-grey">
                    "When you are small, you are responsible for everything. You cannot delegate because you do not have people. Innovation becomes something you'll 'get to eventually'—which means never."
                  </blockquote>
                </div>

                {/* Section 3 */}
                <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
                  <h3 className="font-montserrat text-2xl font-bold text-biz-navy mb-6 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-biz-citrine flex items-center justify-center text-biz-navy text-lg font-bold">3</span>
                    The Real Cost of the Innovation Gap
                  </h3>
                  
                  <p className="font-open-sans text-biz-grey leading-relaxed mb-6">
                    The gap between innovative leaders and the rest is not small—it is exponential. And it compounds over time.
                  </p>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { title: 'Time to Market', desc: 'Innovative companies launch in weeks. Competitors take months.', icon: Clock },
                      { title: 'Customer Retention', desc: 'Continuous innovation drives significantly lower churn.', icon: Users },
                      { title: 'Talent Retention', desc: 'Top performers want to work on interesting problems.', icon: Target },
                      { title: 'Competitive Position', desc: 'The gap compounds annually—after 3 years it\'s exponential.', icon: TrendingUp },
                      { title: 'Margin Pressure', desc: 'Non-innovative businesses get stuck with commoditized offerings.', icon: DollarSign },
                      { title: 'Market Relevance', desc: 'Customer expectations evolve—you must evolve with them.', icon: Eye },
                    ].map((item) => (
                      <div key={item.title} className="bg-gray-50 rounded-lg p-4">
                        <item.icon className="w-6 h-6 text-biz-citrine mb-2" />
                        <h5 className="font-montserrat font-semibold text-biz-navy text-sm mb-1">{item.title}</h5>
                        <p className="font-open-sans text-xs text-biz-grey">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 4: Four Pillars */}
                <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
                  <h3 className="font-montserrat text-2xl font-bold text-biz-navy mb-6 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-biz-citrine flex items-center justify-center text-biz-navy text-lg font-bold">4</span>
                    The Four Pillars of Innovation Competency
                  </h3>
                  
                  <p className="font-open-sans text-biz-grey leading-relaxed mb-8">
                    Closing the innovation gap requires building capability across four dimensions. Weakness in any one pillar limits your overall innovation capacity.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border-l-4 border-l-green-500">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <TrendingUp className="w-8 h-8 text-green-500" />
                          <h4 className="font-montserrat font-bold text-biz-navy">Technology Infrastructure</h4>
                        </div>
                        <p className="font-open-sans text-sm text-biz-grey mb-4">
                          Innovation cannot happen on outdated, fragmented technology stacks. Your systems must enable, not constrain.
                        </p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2 text-biz-grey">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Systems integrate seamlessly
                          </li>
                          <li className="flex items-center gap-2 text-biz-grey">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Systems scale without rebuilding
                          </li>
                          <li className="flex items-center gap-2 text-biz-grey">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Modern tools enable faster work
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-blue-500">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Target className="w-8 h-8 text-blue-500" />
                          <h4 className="font-montserrat font-bold text-biz-navy">Strategic Clarity</h4>
                        </div>
                        <p className="font-open-sans text-sm text-biz-grey mb-4">
                          Innovation without direction is just chaos. You need clear alignment on what you're building and why.
                        </p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2 text-biz-grey">
                            <CheckCircle className="w-4 h-4 text-blue-500" />
                            Clear market and customer focus
                          </li>
                          <li className="flex items-center gap-2 text-biz-grey">
                            <CheckCircle className="w-4 h-4 text-blue-500" />
                            Defined innovation process
                          </li>
                          <li className="flex items-center gap-2 text-biz-grey">
                            <CheckCircle className="w-4 h-4 text-blue-500" />
                            Success metrics defined
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-purple-500">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Users className="w-8 h-8 text-purple-500" />
                          <h4 className="font-montserrat font-bold text-biz-navy">Organizational Capacity</h4>
                        </div>
                        <p className="font-open-sans text-sm text-biz-grey mb-4">
                          Innovation requires time, talent, and budget. You can't ask people to innovate in their spare time.
                        </p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2 text-biz-grey">
                            <CheckCircle className="w-4 h-4 text-purple-500" />
                            Dedicated time for innovation
                          </li>
                          <li className="flex items-center gap-2 text-biz-grey">
                            <CheckCircle className="w-4 h-4 text-purple-500" />
                            Culture rewards experimentation
                          </li>
                          <li className="flex items-center gap-2 text-biz-grey">
                            <CheckCircle className="w-4 h-4 text-purple-500" />
                            Explicit innovation budget
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-orange-500">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Eye className="w-8 h-8 text-orange-500" />
                          <h4 className="font-montserrat font-bold text-biz-navy">Customer & Market Sensing</h4>
                        </div>
                        <p className="font-open-sans text-sm text-biz-grey mb-4">
                          The best innovations solve real problems. You need deep customer understanding and market awareness.
                        </p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2 text-biz-grey">
                            <CheckCircle className="w-4 h-4 text-orange-500" />
                            Customer intimacy and understanding
                          </li>
                          <li className="flex items-center gap-2 text-biz-grey">
                            <CheckCircle className="w-4 h-4 text-orange-500" />
                            Market trend monitoring
                          </li>
                          <li className="flex items-center gap-2 text-biz-grey">
                            <CheckCircle className="w-4 h-4 text-orange-500" />
                            Competitive intelligence
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Section 5: 90-Day Plan */}
                <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
                  <h3 className="font-montserrat text-2xl font-bold text-biz-navy mb-6 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-biz-citrine flex items-center justify-center text-biz-navy text-lg font-bold">5</span>
                    The 90-Day Innovation Gap Closure Plan
                  </h3>
                  
                  <p className="font-open-sans text-biz-grey leading-relaxed mb-8">
                    If your score is below 80, here is how to close the gap in 90 days. This is the same framework we use with our consulting clients.
                  </p>

                  <div className="space-y-4">
                    {timelineData.map((item, index) => (
                      <div key={item.phase} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-full bg-biz-citrine flex items-center justify-center text-biz-navy font-bold text-sm flex-shrink-0">
                            {item.phase.split(' ')[1]}
                          </div>
                          {index < timelineData.length - 1 && (
                            <div className="w-0.5 h-full bg-biz-citrine/30 mt-2" />
                          )}
                        </div>
                        <div className="pb-6">
                          <p className="font-open-sans text-sm text-biz-citrine font-semibold">{item.phase}</p>
                          <h4 className="font-montserrat font-bold text-biz-navy mb-1">{item.title}</h4>
                          <p className="font-open-sans text-sm text-biz-grey">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conclusion */}
                <div className="bg-biz-navy rounded-xl p-8 text-white text-center">
                  <h3 className="font-montserrat text-2xl font-bold mb-4">
                    Closing the Gap: It Starts Now
                  </h3>
                  <p className="font-open-sans text-white/80 mb-6 max-w-2xl mx-auto">
                    The innovation gap does not close by accident. It requires deliberate action, committed resources, and sustained effort. The good news: you have everything you need to start today.
                  </p>
                  <Button 
                    onClick={scrollToAssessment}
                    className="bg-biz-citrine hover:bg-biz-citrine/90 text-biz-navy font-semibold text-lg px-8 py-6"
                  >
                    Take the Innovation Readiness Assessment
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 90-Day Plan Download Section */}
        <section className="py-16 md:py-24 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="w-16 h-16 rounded-xl bg-biz-citrine flex items-center justify-center mb-6">
                    <FileText className="w-8 h-8 text-biz-navy" />
                  </div>
                  <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-biz-navy mb-4">
                    Ready to Close Your Innovation Gap?
                  </h2>
                  <p className="font-open-sans text-lg text-biz-grey mb-6">
                    Download the complete 90-Day Implementation Plan
                  </p>
                  <ul className="space-y-3">
                    {[
                      'Week-by-week action checklist',
                      'Role-specific assignments',
                      'Success metrics and tracking tools',
                      'Quick-win templates and frameworks',
                      'Pillar-specific implementation guides'
                    ].map((benefit) => (
                      <li key={benefit} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-biz-citrine flex-shrink-0" />
                        <span className="font-open-sans text-biz-grey">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Card className="shadow-xl">
                  <CardContent className="p-8">
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-biz-navy mb-2">
                          Full Name *
                        </label>
                        <Input
                          type="text"
                          placeholder="John Smith"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-biz-navy mb-2">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          placeholder="john@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-biz-navy mb-2">
                          Company Size *
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                          value={formData.companySize}
                          onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                          required
                        >
                          <option value="">Select...</option>
                          <option value="1-5">1-5 employees</option>
                          <option value="6-25">6-25 employees</option>
                          <option value="26-100">26-100 employees</option>
                          <option value="100+">100+ employees</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-biz-navy mb-2">
                          Your Innovation Readiness Score (Optional)
                        </label>
                        <Input
                          type="number"
                          placeholder="Enter your score"
                          min="0"
                          max="100"
                          value={formData.score}
                          onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                        />
                      </div>
                      
                      <Button 
                        type="submit"
                        className="w-full bg-biz-citrine hover:bg-biz-citrine/90 text-biz-navy font-semibold text-lg py-6"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Get the 90-Day Plan
                      </Button>
                      
                      <p className="text-xs text-biz-grey text-center">
                        We respect your privacy. Unsubscribe anytime. <Link to="/privacy" className="underline hover:text-biz-navy">Privacy Policy</Link>
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-biz-navy mb-4">
                  Continue Your Innovation Journey
                </h2>
                <p className="font-open-sans text-lg text-biz-grey">
                  Explore additional tools and resources
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-shadow duration-300 group">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 rounded-xl bg-biz-navy/10 flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform">
                      <BarChart3 className="w-8 h-8 text-biz-citrine" />
                    </div>
                    <h3 className="font-montserrat font-bold text-lg text-biz-navy mb-2">
                      BizHealth Comprehensive Assessment
                    </h3>
                    <p className="font-open-sans text-sm text-biz-grey mb-4">
                      Get a complete diagnosis across 12 business dimensions including strategy, finance, operations, and leadership.
                    </p>
                    <Link 
                      to="/pricing" 
                      className="inline-flex items-center text-biz-navy font-semibold hover:text-biz-citrine transition-colors"
                    >
                      Take Full Assessment
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow duration-300 group">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 rounded-xl bg-biz-navy/10 flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform">
                      <Lightbulb className="w-8 h-8 text-biz-citrine" />
                    </div>
                    <h3 className="font-montserrat font-bold text-lg text-biz-navy mb-2">
                      Technology Stack Audit Tool
                    </h3>
                    <p className="font-open-sans text-sm text-biz-grey mb-4">
                      Identify integration gaps and system inefficiencies costing you time and money every single day.
                    </p>
                    <Link 
                      to="/biztools" 
                      className="inline-flex items-center text-biz-navy font-semibold hover:text-biz-citrine transition-colors"
                    >
                      Audit Your Stack
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow duration-300 group">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 rounded-xl bg-biz-navy/10 flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform">
                      <BookOpen className="w-8 h-8 text-biz-citrine" />
                    </div>
                    <h3 className="font-montserrat font-bold text-lg text-biz-navy mb-2">
                      Innovation Strategy Template
                    </h3>
                    <p className="font-open-sans text-sm text-biz-grey mb-4">
                      Build your written innovation strategy in 60 minutes with our proven framework and guided prompts.
                    </p>
                    <Link 
                      to="/biztools/toolbox" 
                      className="inline-flex items-center text-biz-navy font-semibold hover:text-biz-citrine transition-colors"
                    >
                      Get Template
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <GlobalFooter />
    </>
  );
};

export default TechnologyInnovationReadiness;
