import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from "@/components/GlobalFooter";
import PromotionalBanner from "@/components/PromotionalBanner";
import RelatedArticles from "@/components/RelatedArticles";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { Calendar, Clock, User, ArrowLeft, Info, AlertTriangle, DollarSign, Users, Settings, Target, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import warningSignsImage from "@/assets/business-warning-signs-management.jpg";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const WarningCard = ({ 
  number, 
  title, 
  looks, 
  matters, 
  action, 
  icon: Icon, 
  color 
}: { 
  number: number;
  title: string; 
  looks: string; 
  matters: string; 
  action: string;
  icon: React.ElementType;
  color: string;
}) => (
  <div className={`rounded-2xl border-2 ${color} p-6 bg-gradient-to-br from-background to-muted/30`}>
    <div className="flex items-center gap-3 mb-4">
      <div className={`p-3 rounded-xl ${color.replace('border-', 'bg-').replace('/30', '/10')}`}>
        <Icon className={`w-6 h-6 ${color.replace('border-', 'text-').replace('/30', '')}`} />
      </div>
      <div>
        <span className={`text-sm font-bold uppercase tracking-wide ${color.replace('border-', 'text-').replace('/30', '')}`}>
          Warning Sign #{number}
        </span>
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
      </div>
    </div>
    <div className="space-y-3">
      <div className="flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-500 mt-1 flex-shrink-0" />
        <div>
          <span className="text-xs font-semibold text-muted-foreground uppercase">What It Looks Like</span>
          <p className="text-sm text-foreground">{looks}</p>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <Target className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
        <div>
          <span className="text-xs font-semibold text-muted-foreground uppercase">Why It Matters</span>
          <p className="text-sm text-foreground">{matters}</p>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <Lightbulb className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
        <div>
          <span className="text-xs font-semibold text-muted-foreground uppercase">What To Do</span>
          <p className="text-sm text-foreground">{action}</p>
        </div>
      </div>
    </div>
  </div>
);

const WarningSignsBusiness = () => {
  const warningCards = [
    {
      number: 1,
      title: "Declining Cash Flow",
      looks: "Your cash reserves are shrinking, or you're struggling to cover payroll or vendor payments.",
      matters: "Cash flow issues are the top reason 82% of SMBs fail (U.S. Bank).",
      action: "Use tools like BizHealth.ai's financial diagnostics to track metrics like burn rate and working capital. Implement cash flow forecasting to anticipate shortfalls.",
      icon: DollarSign,
      color: "border-red-500/30"
    },
    {
      number: 2,
      title: "Falling Customer Retention",
      looks: "Repeat customers are dropping off, or your Net Promoter Score (NPS) is declining.",
      matters: "Acquiring new customers costs 5x more than retaining existing ones (Forbes).",
      action: "Analyze customer feedback and track marketing KPIs like Customer Lifetime Value (CLV) with AI-powered reports.",
      icon: Users,
      color: "border-amber-500/30"
    },
    {
      number: 3,
      title: "Operational Bottlenecks",
      looks: "Delays in delivery, inventory pileups, or frequent project overruns.",
      matters: "Inefficient operations can cut profitability by up to 30% (McKinsey 7S Model).",
      action: "Apply Lean principles to streamline processes. Use operations assessments to pinpoint inefficiencies.",
      icon: Settings,
      color: "border-orange-500/30"
    },
    {
      number: 4,
      title: "Employee Disengagement",
      looks: "High turnover, low morale, or declining productivity.",
      matters: "Disengaged employees cost businesses $450–550 billion annually in the U.S. (Gallup).",
      action: "Conduct pulse surveys and use HR diagnostics to assess engagement and identify leadership gaps.",
      icon: Users,
      color: "border-purple-500/30"
    },
    {
      number: 5,
      title: "Lack of Strategic Clarity",
      looks: "Misaligned goals, stalled growth, or confusion about priorities.",
      matters: "Companies without clear strategies are 40% less likely to scale successfully (Gartner).",
      action: "Use frameworks like OKRs to align teams. Benchmark your goals against industry standards.",
      icon: Target,
      color: "border-blue-500/30"
    }
  ];

  const faqQuestions = [
    {
      question: "What are the most common warning signs that a business needs attention?",
      answer: "The five most critical warning signs are: declining cash flow, falling customer retention, operational bottlenecks, employee disengagement, and lack of strategic clarity. Each of these can significantly impact business sustainability if left unaddressed."
    },
    {
      question: "How do cash flow issues affect small businesses?",
      answer: "Cash flow issues are the leading cause of business failure, with 82% of SMBs failing due to cash flow problems according to U.S. Bank research. Declining cash reserves can prevent you from covering payroll, vendor payments, and essential operations."
    },
    {
      question: "Why is customer retention more important than customer acquisition?",
      answer: "Acquiring new customers costs 5x more than retaining existing ones. Falling customer retention rates indicate underlying issues with product quality, service, or value proposition that need immediate attention."
    },
    {
      question: "How can I identify operational bottlenecks in my business?",
      answer: "Operational bottlenecks typically manifest as delays in delivery, inventory pileups, frequent project overruns, or missed deadlines. Using process mapping and operations assessments can help identify these inefficiencies before they cut into profitability."
    },
    {
      question: "What is the cost of employee disengagement to businesses?",
      answer: "According to Gallup research, disengaged employees cost U.S. businesses $450-550 billion annually through reduced productivity, higher turnover, and lower quality work. Regular pulse surveys and HR diagnostics can help identify and address engagement issues."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="5 Warning Signs Your Business Needs Immediate Attention | SMB Risk Guide"
        description="Discover the critical warning signs 70% of SMBs face. Learn to spot cash flow issues, customer retention problems, and operational bottlenecks before they derail your business success."
        keywords="business warning signs, SMB challenges, cash flow management, customer retention, operational efficiency, risk management, business health, employee engagement, strategic planning, business failure prevention, small business problems"
        canonical="https://bizhealth.ai/blog/warning-signs-business"
        ogType="article"
        ogImage="https://bizhealth.ai/og-images/og-warning-signs-business.jpg"
        articlePublishedTime="2025-09-12T00:00:00Z"
        articleModifiedTime="2025-12-30T00:00:00Z"
        articleAuthor="BizHealth.ai Research Team"
      />
      <StructuredData 
        type="blogPosting"
        headline="5 Warning Signs Your Business Needs Immediate Attention"
        description="Are you losing sleep over stagnant growth or cash flow hiccups? You're not alone—70% of small and mid-sized businesses face critical challenges that, if ignored, can derail success."
        image="https://bizhealth.ai/og-images/og-warning-signs-business.jpg"
        datePublished="2025-09-12"
        dateModified="2025-12-30"
        author="BizHealth.ai Research Team"
        url="https://bizhealth.ai/blog/warning-signs-business"
        keywords={["business warning signs", "SMB challenges", "cash flow management", "customer retention", "operational efficiency"]}
      />
      <StructuredData 
        type="faq"
        questions={faqQuestions}
      />
      <GlobalNavigation />
      
      <article className="pt-32 pb-16">
        {/* Hero Section */}
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-background to-amber-500/10" />
          <div className="container mx-auto px-4 pt-4 pb-12 relative">
            {/* Back to Blog Link */}
            <div className="mb-6">
              <Link 
                to="/blog" 
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {/* Category badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {["Risk Management", "Business Strategy", "Financial Management"].map((cat) => (
                  <span key={cat} className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                    {cat}
                  </span>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                5 Warning Signs Your Business Needs Immediate Attention
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                Are you losing sleep over stagnant growth or cash flow hiccups? Learn to spot critical challenges before they derail your success.
              </p>
              
              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="flex items-center gap-2 cursor-help">
                        <User className="w-4 h-4" />
                        BizHealth.ai Research Team
                        <Info className="w-3.5 h-3.5 text-primary" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p className="text-sm">
                        The BizHealth.ai Research Team comprises accomplished business owners, former C-suite executives, CFOs, operations leaders, and growth strategists with over five decades of hands-on expertise.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  September 12, 2025
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  8 min read
                </span>
              </div>
              
              {/* Hero image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={warningSignsImage} 
                  alt="Business warning signs dashboard showing declining metrics, cash flow alerts, and risk indicators for small business management"
                  className="w-full h-auto object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            
            {/* Opening */}
            <div className="bg-gradient-to-r from-red-500/5 via-amber-500/5 to-emerald-500/5 rounded-2xl p-8 mb-12 border border-primary/10">
              <p className="text-lg text-foreground leading-relaxed mb-4">
                <strong>70% of small and mid-sized businesses</strong> face critical challenges that, if ignored, can derail success. Spotting these warning signs early can mean the difference between a thriving business and one fighting to survive.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                According to Harvard Business Review, businesses that proactively address operational and financial weaknesses are <strong className="text-foreground">25% more likely to achieve sustainable growth</strong>. Here's what to watch for and how to act.
              </p>
            </div>

            {/* Warning Signs Grid */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-red-500" />
                The 5 Critical Warning Signs
              </h2>
              
              <div className="grid gap-6">
                {warningCards.map((card) => (
                  <WarningCard key={card.number} {...card} />
                ))}
              </div>
            </section>

            {/* Deep Dive Sections */}
            <section className="prose prose-lg prose-slate dark:prose-invert max-w-none">
              <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">Understanding Each Warning Sign</h2>
              
              <h3 className="text-2xl font-bold mt-10 mb-4 text-foreground flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-red-500" />
                1. Declining Cash Flow
              </h3>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                Cash flow issues are the silent killer of otherwise healthy businesses. When your cash reserves are shrinking or you're struggling to cover payroll and vendor payments, it's time for immediate action.
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                <strong className="text-foreground">The data is clear:</strong> Cash flow issues are the top reason 82% of SMBs fail (U.S. Bank). Use tools like BizHealth.ai's financial diagnostics to track metrics like burn rate and working capital. Implement cash flow forecasting to anticipate shortfalls and negotiate better payment terms with suppliers.
              </p>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 mb-6">
                <p className="text-foreground text-sm">
                  <strong>Success Story:</strong> A retail client used our reports to identify overstock issues, freeing up 20% more cash within a quarter.
                </p>
              </div>

              <h3 className="text-2xl font-bold mt-10 mb-4 text-foreground flex items-center gap-2">
                <Users className="w-6 h-6 text-amber-500" />
                2. Falling Customer Retention
              </h3>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                When repeat customers are dropping off or your Net Promoter Score (NPS) is declining, you're facing a retention crisis. This is critical because acquiring new customers costs 5x more than retaining existing ones (Forbes).
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                Analyze customer feedback and track marketing KPIs like Customer Lifetime Value (CLV). AI-powered reports can help identify service gaps and sentiment trends.
              </p>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 mb-6">
                <p className="text-foreground text-sm">
                  <strong>Success Story:</strong> A restaurant chain identified service gaps through customer sentiment analysis, leading to a 22% boost in repeat visits after targeted training programs.
                </p>
              </div>

              <h3 className="text-2xl font-bold mt-10 mb-4 text-foreground flex items-center gap-2">
                <Settings className="w-6 h-6 text-orange-500" />
                3. Operational Bottlenecks
              </h3>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                Delays in delivery, inventory pileups, and frequent project overruns signal serious operational issues. Inefficient operations can cut profitability by up to 30% according to the McKinsey 7S Model.
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                Apply Lean principles to streamline processes. Use operations assessments to pinpoint inefficiencies in scheduling, resource allocation, and workflow management.
              </p>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 mb-6">
                <p className="text-foreground text-sm">
                  <strong>Success Story:</strong> A logistics firm reduced delivery times by 12% after identifying scheduling gaps through systematic operations analysis.
                </p>
              </div>

              <h3 className="text-2xl font-bold mt-10 mb-4 text-foreground flex items-center gap-2">
                <Users className="w-6 h-6 text-purple-500" />
                4. Employee Disengagement
              </h3>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                High turnover, low morale, and declining productivity are symptoms of deeper organizational issues. Disengaged employees cost businesses $450–550 billion annually in the U.S. (Gallup).
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                Conduct pulse surveys and use HR diagnostics to assess engagement levels. Focus on identifying leadership gaps, communication breakdowns, and career development opportunities.
              </p>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 mb-6">
                <p className="text-foreground text-sm">
                  <strong>Success Story:</strong> A tech startup identified leadership gaps through engagement analysis, leading to a 25% improvement in employee satisfaction after targeted training.
                </p>
              </div>

              <h3 className="text-2xl font-bold mt-10 mb-4 text-foreground flex items-center gap-2">
                <Target className="w-6 h-6 text-blue-500" />
                5. Lack of Strategic Clarity
              </h3>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                Misaligned goals, stalled growth, and confusion about priorities indicate a fundamental strategic issue. Companies without clear strategies are 40% less likely to scale successfully (Gartner).
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                Use frameworks like OKRs (Objectives and Key Results) to align teams. Benchmark your goals against industry standards and create clear roadmaps for execution.
              </p>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 mb-6">
                <p className="text-foreground text-sm">
                  <strong>Success Story:</strong> A consulting firm clarified its growth plan through strategic benchmarking and increased revenue by 18%.
                </p>
              </div>
            </section>

            {/* Take Action Section */}
            <section className="mt-16">
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-primary" />
                  Take Action Today
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Which of these warning signs feels most familiar in your business? Whether it's a cash crunch or a strategy misstep, addressing these issues head-on can unlock new growth. With the right data, you're not just reacting—you're building a stronger future.
                </p>
                <p className="text-foreground font-medium">
                  Don't let these warning signs hold your business back. Utilize a comprehensive business health assessment to uncover hidden gaps and get tailored insights in minutes.
                </p>
              </div>
            </section>

            {/* Call to Action */}
            <div className="bg-primary rounded-2xl p-8 text-center mt-12">
              <h3 className="text-2xl font-bold mb-4 text-primary-foreground">Ready to Address These Warning Signs?</h3>
              <p className="text-primary-foreground/90 mb-6">
                Get started with BizHealth.ai's comprehensive business assessment and turn warning signs into opportunities for growth.
              </p>
              <Link 
                to="/how-it-works"
                className="bg-background text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-background/90 transition-colors inline-block"
              >
                Start Your BizHealth Assessment
              </Link>
            </div>

            {/* FAQ Section */}
            <section className="mt-16">
              <h2 className="text-3xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqQuestions.map((faq, index) => (
                  <div key={index} className="border border-border rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </article>

      <RelatedArticles articles={[
        {
          title: "Financial Health Metrics Every Business Owner Should Track",
          slug: "financial-health-metrics",
          category: "Financial Management",
          excerpt: "Learn the essential financial KPIs that help monitor business performance and drive growth."
        },
        {
          title: "Operational Resilience Strategies",
          slug: "operational-resilience",
          category: "Business Strategy",
          excerpt: "Build business systems that withstand market volatility with proven resilience strategies."
        },
        {
          title: "Leadership Stress Management",
          slug: "leadership-stress-success",
          category: "Business Leadership",
          excerpt: "Conquer executive stress with proven leadership resilience strategies and reduce burnout."
        }
      ]} />

      <GlobalFooter />
      <PromotionalBanner />
    </div>
  );
};

export default WarningSignsBusiness;