import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import GradientDivider from "@/components/GradientDivider";
import PromotionalBanner from "@/components/PromotionalBanner";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import RelatedArticles from "@/components/RelatedArticles";
import { Calendar, Clock, User, Target, CheckCircle, TrendingUp, Sparkles, AlertTriangle, BarChart3, ArrowRight, Quote, Lightbulb, RefreshCw, Briefcase, Award, DollarSign, TrendingDown, Scale, Zap, Shield, Activity, PieChart, LineChart } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/feast-famine-cycle-small-business-rollercoaster.jpg";
import authorImage from "@/assets/bizhealth-author-icon.jpg";

const InsightCard = ({ 
  title, 
  description,
  icon: Icon 
}: { 
  title: string; 
  description: string;
  icon: React.ElementType;
}) => (
  <div className="p-5 rounded-xl border-2 border-transparent hover:border-[hsl(59,62%,36%)]/30 bg-gradient-to-br from-card via-[hsl(59,62%,36%)]/5 to-card hover:shadow-lg transition-all duration-300 group">
    <div className="flex items-start gap-3">
      <div 
        className="p-2 rounded-lg flex-shrink-0 transition-all duration-300 group-hover:scale-110"
        style={{ background: 'linear-gradient(135deg, hsl(59, 62%, 36%) 0%, hsl(55, 50%, 50%) 100%)' }}
      >
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <h4 className="font-bold mb-2" style={{ color: 'hsl(var(--biz-navy))' }}>{title}</h4>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

const WarningCard = ({ 
  number, 
  title, 
  description 
}: { 
  number: string; 
  title: string; 
  description: React.ReactNode;
}) => (
  <div className="p-6 rounded-xl border-2 border-amber-500/30 bg-gradient-to-br from-amber-50 to-background shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-start gap-4">
      <div 
        className="p-3 rounded-xl flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, hsl(45, 93%, 47%) 0%, hsl(38, 92%, 50%) 100%)' }}
      >
        <AlertTriangle className="w-6 h-6 text-white" />
      </div>
      <div>
        <span className="text-sm font-bold uppercase tracking-wide" style={{ color: 'hsl(38, 92%, 40%)' }}>
          Warning Sign #{number}
        </span>
        <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
        <div className="text-muted-foreground leading-relaxed">{description}</div>
      </div>
    </div>
  </div>
);

const StrategyCard = ({ 
  number, 
  title, 
  children,
  icon: Icon 
}: { 
  number: string; 
  title: string; 
  children: React.ReactNode;
  icon: React.ElementType;
}) => (
  <div className="rounded-2xl border-l-4 p-6 bg-gradient-to-br from-background via-[hsl(59,62%,36%)]/5 to-background shadow-md hover:shadow-lg transition-shadow duration-300" style={{ borderColor: 'hsl(59, 62%, 36%)' }}>
    <div className="flex items-center gap-3 mb-4">
      <div 
        className="p-3 rounded-xl shadow-md"
        style={{ background: 'linear-gradient(135deg, hsl(var(--biz-navy)) 0%, hsl(59, 62%, 36%) 100%)' }}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <span className="text-sm font-bold uppercase tracking-wide" style={{ color: 'hsl(59, 62%, 36%)' }}>
          Strategy {number}
        </span>
        <h3 className="text-xl font-bold" style={{ color: 'hsl(var(--biz-navy))' }}>{title}</h3>
      </div>
    </div>
    <div className="text-muted-foreground leading-relaxed">{children}</div>
  </div>
);

const ActionCard = ({ 
  context, 
  action 
}: { 
  context: string; 
  action: string;
}) => (
  <div className="p-5 rounded-xl border border-[hsl(59,62%,36%)]/20 bg-gradient-to-br from-card to-[hsl(59,62%,36%)]/5 hover:border-[hsl(59,62%,36%)]/40 transition-colors duration-300">
    <div className="flex items-start gap-3">
      <div 
        className="p-2 rounded-lg flex-shrink-0"
        style={{ background: 'hsl(59, 62%, 36%)' }}
      >
        <CheckCircle className="w-5 h-5 text-white" />
      </div>
      <div>
        <h4 className="font-bold mb-1" style={{ color: 'hsl(var(--biz-navy))' }}>{context}</h4>
        <p className="text-muted-foreground text-sm">{action}</p>
      </div>
    </div>
  </div>
);

const FeastOrFamineCycle = () => {
  const relatedArticles = [
    {
      title: "The Growth Trap: Why More Sales Won't Save a Broken Business Model",
      slug: "growth-trap-broken-business-model",
      category: "Business Strategy",
      excerpt: "Discover why chasing revenue growth destroys SMBs without fixing fundamentals first."
    },
    {
      title: "SMB Cash Flow Hacks 2025: 7 Strategies to Keep Cash Moving",
      slug: "smb-cash-flow-hacks-2025",
      category: "Financials",
      excerpt: "Learn actionable cash flow strategies to maintain liquidity in any market condition."
    },
    {
      title: "The Fractional CFO Toolkit: 7 Financial Dashboards Every Business Owner Should Have",
      slug: "fractional-cfo-toolkit",
      category: "Financials",
      excerpt: "Build CFO-level visibility with cash flow, P&L, and strategic metrics tracking."
    }
  ];

  return (
    <>
      <SEO 
        title="Break the Feast-or-Famine Cycle: Revenue Stability Guide for Small Business | BizHealth.ai"
        description="Learn how to break the destructive feast-or-famine revenue cycle destroying small businesses. Discover 7 proven strategies for stable, predictable growth—escape the rollercoaster now!"
        keywords="feast or famine cycle, small business revenue stability, cash flow management small business, breaking revenue cycles, predictable business income, business cash flow strategies, revenue volatility solutions, sustainable business growth, business financial planning, small business revenue management, cyclical revenue problems, business stability strategies, small business cash reserves, revenue forecasting, sales pipeline management"
        ogImage="/og-images/og-feast-famine-cycle.jpg"
        canonical="https://bizhealth.ai/blog/feast-or-famine-cycle-small-business"
        ogType="article"
        articlePublishedTime="2026-01-04"
        articleModifiedTime="2026-01-04"
        articleAuthor="BizHealth.ai Research Team"
      />
      <StructuredData 
        type="blogPosting"
        headline="Overcoming the Peaks and Valleys: Breaking the Feast-or-Famine Cycle That Destroys Small Businesses"
        description="Learn how to break the destructive feast-or-famine revenue cycle. Discover 7 proven strategies for stable, predictable growth and escape the revenue rollercoaster."
        image="https://bizhealth.ai/og-images/og-feast-famine-cycle.jpg"
        datePublished="2026-01-04"
        dateModified="2026-01-04"
        author="BizHealth.ai Research Team"
        url="https://bizhealth.ai/blog/feast-or-famine-cycle-small-business"
        keywords={["feast or famine cycle", "revenue stability", "cash flow management", "small business growth", "financial planning", "predictable revenue"]}
      />
      <PromotionalBanner />
      <GlobalNavigation />
      
      <main className="min-h-screen bg-background pt-32 md:pt-36">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 animate-fade-in">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-foreground">Feast-or-Famine Cycle</span>
          </nav>

          {/* Categories */}
          <div className="flex flex-wrap gap-3 mb-6 animate-fade-in">
            <Link 
              to="/blog?category=Financials" 
              className="px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--biz-navy)) 0%, hsl(var(--biz-navy) / 0.85) 100%)',
                color: 'white'
              }}
            >
              Financials
            </Link>
            <Link 
              to="/blog?category=Business+Strategy" 
              className="px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--biz-green)) 0%, hsl(var(--biz-green) / 0.85) 100%)',
                color: 'white'
              }}
            >
              Business Strategy
            </Link>
            <Link 
              to="/blog?category=Operations" 
              className="px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.85) 100%)',
                color: 'white'
              }}
            >
              Operations
            </Link>
          </div>

          {/* Title */}
          <h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight animate-fade-in"
            style={{ 
              color: 'hsl(var(--biz-navy))',
              textShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}
          >
            Overcoming the Peaks and Valleys: Breaking the Feast-or-Famine Cycle That Destroys Small Businesses
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-10 animate-fade-in">
            <div className="flex items-center gap-2">
              <img 
                src={authorImage} 
                alt="BizHealth.ai Research Team - small business financial experts" 
                className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
                loading="lazy"
              />
              <span>By <strong className="text-foreground">BizHealth.ai Research Team</strong></span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'hsl(var(--biz-green))' }} />
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>January 4, 2026</span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'hsl(var(--biz-green))' }} />
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>14 min read</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative group mb-12">
            <div 
              className="absolute -inset-2 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"
              style={{ background: 'linear-gradient(135deg, hsl(var(--biz-navy)), hsl(var(--biz-green)))' }}
            />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="Business professionals on rollercoaster representing the feast-or-famine revenue cycle that destroys small business stability and cash flow predictability"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                loading="eager"
                width={1200}
                height={675}
              />
            </div>
            <div 
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
              style={{ 
                background: 'linear-gradient(135deg, hsl(var(--biz-navy)), hsl(var(--biz-green)))',
                color: 'white'
              }}
            >
              <TrendingUp className="w-5 h-5 text-yellow-300" />
              <span className="font-semibold text-sm">Break the Cycle</span>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {/* Opening */}
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              If you have ever felt like your business runs on a cycle of "great months" followed by "panic months," you are not alone. The feast-or-famine pattern is one of the most common—and most destructive—challenges facing small business owners today.
            </p>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              One quarter, you are flush with cash. Orders are rolling in. You feel like you have finally cracked the code. Then, seemingly without warning, the pipeline dries up. Suddenly, you are scrambling to cover payroll, wondering where all those customers went, and questioning every strategic decision you have made.
            </p>
            
            <p className="text-muted-foreground leading-relaxed mb-8">
              This rollercoaster is not just stressful—<strong className="text-foreground">it is slowly killing your business.</strong> The feast-or-famine cycle erodes your cash reserves, exhausts your team, makes long-term planning impossible, and prevents you from building the sustainable, scalable enterprise you set out to create.
            </p>
            
            <div 
              className="p-6 rounded-xl border-2 mb-10 shadow-md"
              style={{ 
                background: 'linear-gradient(135deg, hsl(59, 62%, 36%, 0.1) 0%, hsl(var(--background)) 100%)',
                borderColor: 'hsl(59, 62%, 36%, 0.4)'
              }}
            >
              <p className="text-foreground font-medium text-center text-lg">
                The good news? <span style={{ color: 'hsl(59, 62%, 36%)', fontWeight: 'bold' }}>This pattern can be broken.</span> With the right strategies, you can create predictable, sustainable revenue that lets you plan with confidence.
              </p>
            </div>

            {/* Section: Understanding the Cycle */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-start gap-3" style={{ color: 'hsl(var(--biz-navy))' }}>
                <div 
                  className="p-2 rounded-lg flex-shrink-0 mt-1"
                  style={{ background: 'linear-gradient(135deg, hsl(var(--biz-navy)) 0%, hsl(59, 62%, 36%) 100%)' }}
                >
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <span>Understanding the Feast-or-Famine Cycle</span>
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                The feast-or-famine cycle typically follows a predictable—and destructive—pattern:
              </p>

              <div className="grid gap-4 mb-8">
                <InsightCard 
                  icon={TrendingUp}
                  title="Phase 1: The Feast"
                  description="Business is booming. Orders flood in, cash flow is strong, and you feel unstoppable. You focus all energy on fulfilling current demand, often neglecting marketing and sales development."
                />
                <InsightCard 
                  icon={Briefcase}
                  title="Phase 2: The Pivot"
                  description="You are so busy delivering that you stop prospecting. The sales pipeline quietly empties while you are distracted by operational demands."
                />
                <InsightCard 
                  icon={TrendingDown}
                  title="Phase 3: The Famine"
                  description="Current projects end. Suddenly, there is no new work coming in. Cash reserves deplete. Panic sets in. You scramble to find any revenue you can."
                />
                <InsightCard 
                  icon={RefreshCw}
                  title="Phase 4: The Desperate Push"
                  description="You pour resources into sales and marketing. Eventually, new business arrives—and the cycle begins again."
                />
              </div>

              <div 
                className="p-5 rounded-xl border-l-4 bg-gradient-to-r from-[hsl(59,62%,36%)]/10 to-background mb-6"
                style={{ borderColor: 'hsl(59, 62%, 36%)' }}
              >
                <p className="text-foreground font-medium">
                  Each cycle leaves your business a little weaker. Cash reserves shrink. Team morale erodes. <span style={{ color: 'hsl(59, 62%, 36%)', fontWeight: 'bold' }}>And the strategic decisions you need to make for long-term growth get pushed aside for short-term survival.</span>
                </p>
              </div>
            </section>

            {/* Section: The Real Costs */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-start gap-3" style={{ color: 'hsl(var(--biz-navy))' }}>
                <div 
                  className="p-2 rounded-lg flex-shrink-0 mt-1"
                  style={{ background: 'linear-gradient(135deg, hsl(38, 92%, 50%) 0%, hsl(45, 93%, 47%) 100%)' }}
                >
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <span>The Real Costs of Revenue Volatility</span>
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Beyond the obvious stress, the feast-or-famine cycle creates cascading damage that compounds over time:
              </p>

              <div className="space-y-4 mb-8">
                <WarningCard 
                  number="1"
                  title="Cash Reserve Depletion"
                  description={<>Every famine period forces you to dip into reserves—or worse, take on debt—to survive. Over time, this leaves you with no buffer for true emergencies or growth opportunities.</>}
                />
                <WarningCard 
                  number="2"
                  title="Talent Instability"
                  description={<>Your best employees leave during famine periods (or right before them, sensing trouble). During feast periods, you cannot hire fast enough to meet demand. This constant churn destroys institutional knowledge and team cohesion.</>}
                />
                <WarningCard 
                  number="3"
                  title="Quality Erosion"
                  description={<>During feast periods, you are stretched thin trying to fulfill demand. Quality suffers. Customer satisfaction drops. Referrals decrease—contributing to the next famine.</>}
                />
                <WarningCard 
                  number="4"
                  title="Strategic Paralysis"
                  description={<>You cannot invest in long-term initiatives because you never know if you will have the cash to see them through. Your competition—with more stable revenue—can make strategic bets you cannot.</>}
                />
                <WarningCard 
                  number="5"
                  title="Owner Burnout"
                  description={<>The emotional rollercoaster is exhausting. Constant stress degrades your decision-making, your health, and your relationships. Many business owners burn out completely.</>}
                />
              </div>
            </section>

            {/* Section: Root Causes */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-start gap-3" style={{ color: 'hsl(var(--biz-navy))' }}>
                <div 
                  className="p-2 rounded-lg flex-shrink-0 mt-1"
                  style={{ background: 'linear-gradient(135deg, hsl(var(--biz-navy)) 0%, hsl(59, 62%, 36%) 100%)' }}
                >
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <span>Root Causes: Why Businesses Get Stuck in the Cycle</span>
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Understanding why you are stuck is the first step to breaking free. Most businesses fall into the feast-or-famine trap for one or more of these reasons:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <InsightCard 
                  icon={Target}
                  title="Over-Reliance on a Few Clients"
                  description="When 50% or more of revenue comes from 2-3 clients, losing just one creates an immediate crisis."
                />
                <InsightCard 
                  icon={BarChart3}
                  title="Reactive Marketing"
                  description="Only marketing when desperate means your pipeline is always empty when you need it most."
                />
                <InsightCard 
                  icon={Scale}
                  title="No Recurring Revenue Model"
                  description="Purely transactional businesses must constantly find new customers, with no predictable baseline."
                />
                <InsightCard 
                  icon={PieChart}
                  title="Seasonal Industry Dynamics"
                  description="Some industries have natural cycles, but most businesses fail to plan and prepare for them."
                />
                <InsightCard 
                  icon={LineChart}
                  title="Poor Financial Visibility"
                  description="Without real-time insight into cash flow and pipeline, warning signs go unnoticed until it is too late."
                />
                <InsightCard 
                  icon={Zap}
                  title="Capacity Constraints"
                  description="You cannot take on new work during feast periods, so you stop marketing—setting up the next famine."
                />
              </div>

              <div 
                className="p-6 rounded-xl bg-amber-50 border-2 border-amber-400/40 mb-6"
                style={{ background: 'linear-gradient(135deg, hsl(45, 100%, 95%) 0%, hsl(var(--background)) 100%)' }}
              >
                <p className="font-bold text-lg mb-3" style={{ color: 'hsl(38, 92%, 35%)' }}>The uncomfortable truth:</p>
                <p className="text-muted-foreground">
                  The feast-or-famine cycle is usually not caused by external market forces. <strong className="text-foreground">It is the result of internal decisions—decisions that can be changed.</strong>
                </p>
              </div>
            </section>

            {/* Section: 7 Strategies */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-start gap-3" style={{ color: 'hsl(var(--biz-navy))' }}>
                <div 
                  className="p-2 rounded-lg flex-shrink-0 mt-1"
                  style={{ background: 'linear-gradient(135deg, hsl(59, 62%, 36%) 0%, hsl(55, 50%, 50%) 100%)' }}
                >
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span>7 Strategies to Break the Feast-or-Famine Cycle</span>
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-8">
                Breaking free from the cycle requires intentional changes to how you operate, market, and manage finances. Here are seven proven strategies:
              </p>

              <div className="space-y-6 mb-8">
                <StrategyCard 
                  number="1"
                  title="Build a Consistent Marketing Engine"
                  icon={Target}
                >
                  <p className="mb-4">Stop treating marketing as something you do when desperate. Create a sustainable, consistent marketing rhythm that runs regardless of how busy you are.</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Dedicate fixed hours weekly to prospecting—even during feast periods</li>
                    <li>Automate where possible (email sequences, social scheduling, content calendars)</li>
                    <li>Track leading indicators (website traffic, leads generated) not just lagging ones (closed deals)</li>
                    <li>Consider hiring dedicated sales/marketing help before you think you need it</li>
                  </ul>
                </StrategyCard>

                <StrategyCard 
                  number="2"
                  title="Diversify Your Client Base"
                  icon={PieChart}
                >
                  <p className="mb-4">Reduce dependency on any single client or client type. The goal: no single client should represent more than 15-20% of revenue.</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Actively pursue new verticals or market segments</li>
                    <li>Develop tiered offerings that appeal to different customer sizes</li>
                    <li>Build referral systems that continuously bring in new leads</li>
                    <li>Create strategic partnerships for cross-referrals</li>
                  </ul>
                </StrategyCard>

                <StrategyCard 
                  number="3"
                  title="Create Recurring Revenue Streams"
                  icon={RefreshCw}
                >
                  <p className="mb-4">Transform one-time transactions into ongoing relationships. Recurring revenue provides baseline predictability that smooths out cycles.</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Develop retainer or subscription offerings for existing services</li>
                    <li>Add maintenance, support, or consulting packages</li>
                    <li>Create membership programs with ongoing value</li>
                    <li>Bundle products/services into ongoing engagement models</li>
                  </ul>
                </StrategyCard>

                <StrategyCard 
                  number="4"
                  title="Build a Cash Reserve (and Protect It)"
                  icon={DollarSign}
                >
                  <p className="mb-4">Create a financial buffer that lets you weather downturns without panic. Target: 3-6 months of operating expenses in reserve.</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Set aside a fixed percentage (10-20%) of every payment received</li>
                    <li>Keep reserves in a separate account—out of sight, out of mind</li>
                    <li>Define clear rules for when reserves can be accessed</li>
                    <li>Replenish reserves as your first priority after any drawdown</li>
                  </ul>
                </StrategyCard>

                <StrategyCard 
                  number="5"
                  title="Implement Rolling Financial Forecasts"
                  icon={LineChart}
                >
                  <p className="mb-4">You cannot manage what you cannot see. Create visibility into your financial future so you can spot problems before they become crises.</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Build a 13-week cash flow forecast and update it weekly</li>
                    <li>Track your sales pipeline with probability-weighted revenue projections</li>
                    <li>Monitor leading indicators (proposals sent, meetings booked) not just closed deals</li>
                    <li>Create scenario plans for best-case, expected-case, and worst-case outcomes</li>
                  </ul>
                </StrategyCard>

                <StrategyCard 
                  number="6"
                  title="Develop Flexible Capacity"
                  icon={Zap}
                >
                  <p className="mb-4">Build the ability to scale up and down without breaking. This means you can take on feast-period work without stopping marketing.</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Build relationships with contractors who can scale with you</li>
                    <li>Cross-train employees so you can flex capacity across functions</li>
                    <li>Document processes so new team members can onboard quickly</li>
                    <li>Consider hybrid employment models (part-time, project-based, etc.)</li>
                  </ul>
                </StrategyCard>

                <StrategyCard 
                  number="7"
                  title="Plan for Seasonality"
                  icon={BarChart3}
                >
                  <p className="mb-4">If your industry has natural cycles, stop pretending they will not happen. Plan for them explicitly.</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Analyze historical patterns to identify predictable slow periods</li>
                    <li>Build extra reserves before known slow seasons</li>
                    <li>Use slow periods strategically (training, systems improvement, planning)</li>
                    <li>Develop counter-cyclical offerings that generate revenue during typical downturns</li>
                  </ul>
                </StrategyCard>
              </div>
            </section>

            {/* Section: Implementation Roadmap */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-start gap-3" style={{ color: 'hsl(var(--biz-navy))' }}>
                <div 
                  className="p-2 rounded-lg flex-shrink-0 mt-1"
                  style={{ background: 'linear-gradient(135deg, hsl(var(--biz-navy)) 0%, hsl(59, 62%, 36%) 100%)' }}
                >
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
                <span>Your 90-Day Implementation Roadmap</span>
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Breaking the feast-or-famine cycle does not happen overnight. Here is a practical roadmap:
              </p>

              <div className="space-y-4 mb-8">
                <div className="p-6 rounded-xl border-2 border-[hsl(var(--biz-navy))]/20 bg-gradient-to-r from-[hsl(var(--biz-navy))]/5 to-background">
                  <h3 className="text-xl font-bold mb-3" style={{ color: 'hsl(var(--biz-navy))' }}>Days 1-30: Foundation</h3>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>Audit your current revenue concentration (client dependency analysis)</li>
                    <li>Build your first 13-week cash flow forecast</li>
                    <li>Open a separate business savings account for reserves</li>
                    <li>Document your current marketing and sales activities</li>
                  </ul>
                </div>

                <div className="p-6 rounded-xl border-2 border-[hsl(59,62%,36%)]/30 bg-gradient-to-r from-[hsl(59,62%,36%)]/5 to-background">
                  <h3 className="text-xl font-bold mb-3" style={{ color: 'hsl(59, 62%, 36%)' }}>Days 31-60: Systems</h3>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>Create a consistent weekly marketing rhythm (allocate fixed hours)</li>
                    <li>Identify one recurring revenue opportunity and begin developing it</li>
                    <li>Start setting aside 10% of all revenue into reserves</li>
                    <li>Build relationships with 2-3 potential contractors for flexible capacity</li>
                  </ul>
                </div>

                <div className="p-6 rounded-xl border-2 border-[hsl(var(--biz-green))]/30 bg-gradient-to-r from-[hsl(var(--biz-green))]/5 to-background">
                  <h3 className="text-xl font-bold mb-3" style={{ color: 'hsl(var(--biz-green))' }}>Days 61-90: Optimization</h3>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>Launch your first recurring revenue offering</li>
                    <li>Implement pipeline tracking with probability-weighted forecasting</li>
                    <li>Identify one new market segment to pursue for diversification</li>
                    <li>Create your first scenario-based financial plan</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section: Key Metrics */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-start gap-3" style={{ color: 'hsl(var(--biz-navy))' }}>
                <div 
                  className="p-2 rounded-lg flex-shrink-0 mt-1"
                  style={{ background: 'linear-gradient(135deg, hsl(59, 62%, 36%) 0%, hsl(55, 50%, 50%) 100%)' }}
                >
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <span>Key Metrics to Track Your Progress</span>
              </h2>

              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse rounded-xl overflow-hidden shadow-md">
                  <thead>
                    <tr style={{ background: 'linear-gradient(135deg, hsl(var(--biz-navy)) 0%, hsl(59, 62%, 36%) 100%)' }}>
                      <th className="text-left p-4 font-bold text-white">Metric</th>
                      <th className="text-left p-4 font-bold text-white">Target</th>
                      <th className="text-left p-4 font-bold text-white">Why It Matters</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-background border-b border-border">
                      <td className="p-4 font-semibold">Client Concentration</td>
                      <td className="p-4">No client &gt; 20% of revenue</td>
                      <td className="p-4 text-muted-foreground">Reduces single-point-of-failure risk</td>
                    </tr>
                    <tr className="bg-muted/30 border-b border-border">
                      <td className="p-4 font-semibold">Recurring Revenue %</td>
                      <td className="p-4">30%+ of total revenue</td>
                      <td className="p-4 text-muted-foreground">Provides predictable baseline income</td>
                    </tr>
                    <tr className="bg-background border-b border-border">
                      <td className="p-4 font-semibold">Cash Runway</td>
                      <td className="p-4">3-6 months of expenses</td>
                      <td className="p-4 text-muted-foreground">Buffer against downturns</td>
                    </tr>
                    <tr className="bg-muted/30 border-b border-border">
                      <td className="p-4 font-semibold">Pipeline Coverage</td>
                      <td className="p-4">3x quarterly revenue goal</td>
                      <td className="p-4 text-muted-foreground">Ensures future revenue visibility</td>
                    </tr>
                    <tr className="bg-background">
                      <td className="p-4 font-semibold">Revenue Variance</td>
                      <td className="p-4">&lt; 20% month-to-month</td>
                      <td className="p-4 text-muted-foreground">Indicates cycle smoothing progress</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section: The Bottom Line */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-start gap-3" style={{ color: 'hsl(var(--biz-navy))' }}>
                <div 
                  className="p-2 rounded-lg flex-shrink-0 mt-1"
                  style={{ background: 'linear-gradient(135deg, hsl(var(--biz-navy)) 0%, hsl(59, 62%, 36%) 100%)' }}
                >
                  <Award className="w-6 h-6 text-white" />
                </div>
                <span>The Bottom Line: From Rollercoaster to Railroad</span>
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                The feast-or-famine cycle feels inevitable when you are stuck in it. But it is not. Thousands of small businesses have broken free by implementing these strategies—and you can too.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-6">
                The goal is not to eliminate all revenue variation—some fluctuation is normal and healthy. The goal is to transform your business from a wild rollercoaster into a steady railroad: predictable enough to plan around, stable enough to build on.
              </p>

              <div 
                className="p-6 rounded-xl border-2 mb-8 shadow-lg"
                style={{ 
                  background: 'linear-gradient(135deg, hsl(var(--biz-navy) / 0.05) 0%, hsl(59, 62%, 36%, 0.1) 50%, hsl(var(--biz-green) / 0.05) 100%)',
                  borderColor: 'hsl(59, 62%, 36%, 0.4)'
                }}
              >
                <p className="text-xl font-medium text-foreground text-center">
                  Start today. Pick one strategy from this guide and commit to implementing it this week. <span style={{ color: 'hsl(59, 62%, 36%)', fontWeight: 'bold' }}>Small, consistent changes compound into transformational results.</span>
                </p>
              </div>

              {/* Call to Action */}
              <div 
                className="p-8 rounded-2xl text-center"
                style={{ 
                  background: 'linear-gradient(135deg, hsl(var(--biz-navy)) 0%, hsl(59, 62%, 36%) 100%)'
                }}
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  Ready to Break the Cycle?
                </h3>
                <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                  BizHealth.ai helps small business owners diagnose revenue volatility issues and build sustainable growth strategies. Take our free assessment to identify your biggest opportunities for stabilization.
                </p>
                <Link 
                  to="/pricing" 
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[hsl(var(--biz-navy))] font-bold hover:bg-white/90 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Start Your Business Health Assessment
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </section>
          </div>

          {/* Related Articles */}
          <GradientDivider variant="green-gold" />
          <RelatedArticles articles={relatedArticles} />
        </article>
      </main>
      
      <GlobalFooter />
      <GlobalFooter />
    </>
  );
};

export default FeastOrFamineCycle;
