import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import GradientDivider from "@/components/GradientDivider";
import PromotionalBanner from "@/components/PromotionalBanner";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import RelatedArticles from "@/components/RelatedArticles";
import { Calendar, Clock, User, Target, AlertTriangle, CheckCircle, TrendingUp, Shield, ArrowRight, BarChart3, DollarSign, Users, Settings, Database, Lightbulb, Rocket, Award } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/business-health-scores-stages-survival-stability-scale-exit.jpg";
import SocialShareButtons from "@/components/SocialShareButtons";

const StageCard = ({ 
  stage, 
  title, 
  goal, 
  constraint, 
  mistake, 
  color, 
  icon: Icon 
}: { 
  stage: string; 
  title: string; 
  goal: string; 
  constraint: string; 
  mistake: string; 
  color: string; 
  icon: React.ElementType;
}) => (
  <div className={`rounded-2xl border-2 ${color} p-6 bg-gradient-to-br from-background to-muted/30`}>
    <div className="flex items-center gap-3 mb-4">
      <div className={`p-3 rounded-xl ${color.replace('border-', 'bg-').replace('/30', '/10')}`}>
        <Icon className={`w-6 h-6 ${color.replace('border-', 'text-').replace('/30', '')}`} />
      </div>
      <div>
        <span className={`text-sm font-bold uppercase tracking-wide ${color.replace('border-', 'text-').replace('/30', '')}`}>
          {stage}
        </span>
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
      </div>
    </div>
    <div className="space-y-3">
      <div className="flex items-start gap-2">
        <Target className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
        <div>
          <span className="text-xs font-semibold text-muted-foreground uppercase">Primary Goal</span>
          <p className="text-sm text-foreground">{goal}</p>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-500 mt-1 flex-shrink-0" />
        <div>
          <span className="text-xs font-semibold text-muted-foreground uppercase">Main Constraint</span>
          <p className="text-sm text-foreground">{constraint}</p>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <Shield className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
        <div>
          <span className="text-xs font-semibold text-muted-foreground uppercase">Danger Zone</span>
          <p className="text-sm text-foreground">{mistake}</p>
        </div>
      </div>
    </div>
  </div>
);

const HealthDomain = ({ 
  title, 
  items, 
  icon: Icon, 
  color 
}: { 
  title: string; 
  items: string[]; 
  icon: React.ElementType; 
  color: string;
}) => (
  <div className={`p-4 rounded-xl border ${color} bg-gradient-to-br from-background to-muted/20`}>
    <div className="flex items-center gap-2 mb-3">
      <Icon className={`w-5 h-5 ${color.replace('border-', 'text-').replace('/30', '')}`} />
      <h4 className="font-bold text-foreground">{title}</h4>
    </div>
    <ul className="space-y-1">
      {items.map((item, i) => (
        <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${color.replace('border-', 'bg-').replace('/30', '')}`} />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const ScoreIndicator = ({ 
  label, 
  status, 
  description 
}: { 
  label: string; 
  status: "green" | "amber" | "improving"; 
  description: string;
}) => {
  const colors = {
    green: "bg-emerald-500",
    amber: "bg-amber-500",
    improving: "bg-gradient-to-r from-amber-500 to-emerald-500"
  };
  
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
      <div className={`w-3 h-3 rounded-full ${colors[status]}`} />
      <div>
        <span className="font-semibold text-foreground">{label}:</span>
        <span className="text-muted-foreground ml-2 text-sm">{description}</span>
      </div>
    </div>
  );
};

const PriorityList = ({ 
  priorities, 
  color 
}: { 
  priorities: string[]; 
  color: string;
}) => (
  <ol className="space-y-3">
    {priorities.map((priority, i) => (
      <li key={i} className="flex items-start gap-3">
        <span className={`flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold text-white ${color}`}>
          {i + 1}
        </span>
        <span className="text-foreground pt-0.5">{priority}</span>
      </li>
    ))}
  </ol>
);

const TrapCard = ({ 
  traps, 
  color 
}: { 
  traps: string[]; 
  color: string;
}) => (
  <div className={`rounded-xl border-l-4 ${color} bg-red-500/5 p-5`}>
    <h4 className="font-bold text-red-600 dark:text-red-400 mb-3 flex items-center gap-2">
      <AlertTriangle className="w-5 h-5" />
      Common Traps to Avoid
    </h4>
    <ul className="space-y-2">
      {traps.map((trap, i) => (
        <li key={i} className="flex items-start gap-2 text-foreground">
          <span className="text-red-500 mt-1">✕</span>
          {trap}
        </li>
      ))}
    </ul>
  </div>
);

const TakeawayBox = ({ 
  text, 
  color 
}: { 
  text: string; 
  color: string;
}) => (
  <div className={`rounded-xl ${color} p-5 mt-6`}>
    <div className="flex items-start gap-3">
      <Lightbulb className="w-6 h-6 text-amber-600 flex-shrink-0" />
      <div>
        <h4 className="font-bold text-foreground mb-2">Stage Takeaway</h4>
        <p className="text-foreground/90">{text}</p>
      </div>
    </div>
  </div>
);

const BusinessHealthScoresByStage = () => {
  const stages = [
    {
      stage: "Stage 1",
      title: "Survival",
      subtitle: "Stop the bleeding. Create oxygen.",
      goal: "Preserve cash, simplify delivery, stabilize demand.",
      constraint: "Cash + founder bandwidth.",
      mistake: "Chasing growth before fixing unit economics and reliability.",
      color: "border-red-500/30",
      icon: AlertTriangle
    },
    {
      stage: "Stage 2",
      title: "Stability",
      subtitle: "Build repeatable execution.",
      goal: "Predictability—financial and operational.",
      constraint: "Process maturity + team capability.",
      mistake: "Scaling sales into an operational system that can't deliver consistently.",
      color: "border-amber-500/30",
      icon: Settings
    },
    {
      stage: "Stage 3",
      title: "Scale",
      subtitle: "Grow without breaking.",
      goal: "Expand throughput and profit with controlled complexity.",
      constraint: "Leadership depth + systems integration + quality control.",
      mistake: "Hiring and adding tools faster than the operating system can absorb.",
      color: "border-emerald-500/30",
      icon: TrendingUp
    },
    {
      stage: "Stage 4",
      title: "Exit",
      subtitle: "De-risk and document.",
      goal: "Maximize valuation by reducing buyer-perceived risk.",
      constraint: "Transferability (business works without the owner).",
      mistake: "Waiting until diligence to fix documentation, concentration risk, and compliance gaps.",
      color: "border-blue-500/30",
      icon: Award
    }
  ];

  const healthDomains = [
    { title: "Financial Health", items: ["Profitability", "Cash flow", "Working capital"], icon: DollarSign, color: "border-emerald-500/30" },
    { title: "Revenue Quality", items: ["Repeat purchase", "Concentration risk", "Churn"], icon: BarChart3, color: "border-blue-500/30" },
    { title: "Customer & Market", items: ["Product-market fit signals", "Satisfaction", "Retention"], icon: Users, color: "border-purple-500/30" },
    { title: "Operations", items: ["Process clarity", "Fulfillment/service reliability", "Capacity"], icon: Settings, color: "border-amber-500/30" },
    { title: "People & Leadership", items: ["Role clarity", "Talent retention", "Management depth"], icon: Users, color: "border-pink-500/30" },
    { title: "Systems & Data", items: ["Tool stack", "Reporting", "Decision cadence"], icon: Database, color: "border-cyan-500/30" },
    { title: "Risk & Resilience", items: ["Compliance", "Cybersecurity", "Continuity"], icon: Shield, color: "border-red-500/30" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Business Health Scores by Stage: Survival, Stability, Scale, Exit"
        description="Learn what healthy business scores look like at each growth stage. Master the metrics for Survival, Stability, Scale, and Exit—unlock stage-appropriate priorities now!"
        keywords="business health score, business growth stages, survival stage business, stability stage metrics, scale stage KPIs, exit readiness, business valuation, SMB health assessment, business stage framework, company maturity model"
        canonical="https://bizhealth.ai/blog/business-health-scores-by-stage"
        ogType="article"
        ogImage="/og-images/og-business-health-scores-stages.jpg"
        articlePublishedTime="2025-12-29T00:00:00Z"
        articleModifiedTime="2025-12-29T00:00:00Z"
        articleAuthor="BizHealth.ai Research Team"
      />
      <StructuredData
        type="blogPosting"
        headline="What Your Business Health Score(s) Should Look Like at Each Stage: Survival, Stability, Scale, and Exit"
        description="Learn what healthy business scores look like at each growth stage. Master the metrics for Survival, Stability, Scale, and Exit—unlock stage-appropriate priorities now!"
        image="https://bizhealth.ai/og-images/og-business-health-scores-stages.jpg"
        datePublished="2025-12-29"
        dateModified="2025-12-29"
        author="BizHealth.ai Research Team"
        url="https://bizhealth.ai/blog/business-health-scores-by-stage"
        keywords={["business health score", "business growth stages", "survival stage business", "stability stage metrics", "exit readiness"]}
      />
      
      <GlobalNavigation />
      
      <article className="pt-32 pb-16">
        {/* Hero Section */}
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-emerald-500/10" />
          <div className="container mx-auto px-4 pt-4 pb-12 relative">
            {/* Back to Blog Link */}
            <div className="mb-6">
              <Link 
                to="/blog" 
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors text-sm font-medium"
              >
                ← Back to Blog
              </Link>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {/* Category badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {["Business Intelligence", "Financials", "Business Strategy"].map((cat) => (
                  <span key={cat} className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                    {cat}
                  </span>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                What Your Business Health Score Should Look Like at Each Stage
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                Survival, Stability, Scale, and Exit—A stage-based framework for measuring what "healthy" really means for your business.
              </p>
              
              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  BizHealth.ai Research Team
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  December 29, 2025
                </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                15 min read
              </span>
            </div>
            
            <SocialShareButtons 
              title="What Your Business Health Score Should Look Like at Each Stage: Survival, Stability, Scale, Exit"
              description="Learn what healthy business scores look like at each growth stage."
              className="mb-8"
            />
              
              {/* Hero image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Business leader presenting the four stages of business health: Survival, Stability, Scale, and Exit progression framework"
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
          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
            
            {/* Opening */}
            <div className="not-prose bg-gradient-to-r from-primary/5 via-amber-500/5 to-emerald-500/5 rounded-2xl p-8 mb-12 border border-primary/10">
              <p className="text-lg text-foreground leading-relaxed mb-4">
                Most business owners ask the <strong>wrong question at the wrong time</strong>.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-background/50 rounded-xl p-4 border border-red-500/20">
                  <span className="text-red-500 font-bold">In Survival:</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    <span className="line-through">"How do I grow?"</span> → <strong className="text-foreground">"How do I stop bleeding cash?"</strong>
                  </p>
                </div>
                <div className="bg-background/50 rounded-xl p-4 border border-amber-500/20">
                  <span className="text-amber-500 font-bold">In Stability:</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    <span className="line-through">"How do I hire more?"</span> → <strong className="text-foreground">"How do I build repeatable execution?"</strong>
                  </p>
                </div>
                <div className="bg-background/50 rounded-xl p-4 border border-emerald-500/20">
                  <span className="text-emerald-500 font-bold">In Scale:</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    <span className="line-through">"How do I go faster?"</span> → <strong className="text-foreground">"How do I grow without breaking?"</strong>
                  </p>
                </div>
                <div className="bg-background/50 rounded-xl p-4 border border-blue-500/20">
                  <span className="text-blue-500 font-bold">In Exit:</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    <span className="line-through">"What multiple can I get?"</span> → <strong className="text-foreground">"What risks will buyers find?"</strong>
                  </p>
                </div>
              </div>
            </div>
            
            <p>
              This is why a single "Business Health Score" is rarely enough. Health is multi-dimensional. A company can be strong in revenue but weak in cash flow timing. Strong in operations but weak in leadership depth. Strong in customer acquisition but weak in retention.
            </p>
            
            <p>
              A stage-based view fixes that. It helps a business owner self-identify where they are, what "healthy" really means at that stage, and what to prioritize next—without trying to run a Scale playbook while still fighting for Survival.
            </p>
            
            {/* What a Business Health Score Should Represent */}
            <h2 className="text-3xl font-bold text-foreground mt-16 mb-6 flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-primary" />
              What a "Business Health Score" Should Represent
            </h2>
            
            <p>
              A useful Business Health Score is not a vanity grade. It is a <strong>decision tool</strong>—a way to translate complexity into priorities.
            </p>
            
            <div className="not-prose grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
              {healthDomains.map((domain) => (
                <HealthDomain key={domain.title} {...domain} />
              ))}
            </div>
            
            <div className="not-prose bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20 my-8">
              <p className="text-foreground">
                Tools like <Link to="/" className="text-primary font-semibold hover:underline">BizHealth.ai</Link> help owners move from "gut feel" to "measured reality"—surfacing gaps and prioritizing actions that most improve stability and growth readiness.
              </p>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-primary" />
                  <span className="text-sm text-foreground font-medium">Overall score:</span>
                  <span className="text-sm text-muted-foreground">How fragile or investable the business is</span>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-gradient-to-r from-emerald-500 to-blue-500" />
                  <span className="text-sm text-foreground font-medium">Domain scores:</span>
                  <span className="text-sm text-muted-foreground">Why—and what to fix next</span>
                </div>
              </div>
            </div>
            
            {/* The Four Stages Overview */}
            <h2 className="text-3xl font-bold text-foreground mt-16 mb-6 flex items-center gap-3">
              <Rocket className="w-8 h-8 text-primary" />
              The Four Stages (and the Mindset Shift Each Requires)
            </h2>
            
            <div className="not-prose grid md:grid-cols-2 gap-6 my-8">
              {stages.map((stage) => (
                <StageCard key={stage.stage} {...stage} />
              ))}
            </div>
            
            {/* Stage 1: Survival */}
            <div className="not-prose my-16">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-red-500/10 border-2 border-red-500/30">
                  <AlertTriangle className="w-10 h-10 text-red-500" />
                </div>
                <div>
                  <span className="text-red-500 font-bold uppercase tracking-wide text-sm">Stage 1</span>
                  <h2 className="text-3xl font-bold text-foreground">Survival: What Your Health Scores Should Look Like</h2>
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground mb-6">
                Survival is not about "winning." It is about <strong className="text-foreground">not losing</strong>. A Survival-stage business can still be a great business—it just hasn't stabilized the fundamentals yet.
              </p>
              
              <div className="bg-gradient-to-br from-red-500/5 to-amber-500/5 rounded-2xl p-6 border border-red-500/20 mb-8">
                <h3 className="font-bold text-foreground mb-4">Healthy Score Profile (What to aim for)</h3>
                <p className="text-muted-foreground mb-4">Focus on getting most domains to "not red." In practice:</p>
                <div className="space-y-2">
                  <ScoreIndicator label="Cash Flow Health" status="improving" description="Amber improving to green" />
                  <ScoreIndicator label="Unit Economics" status="amber" description="Amber with a clear plan" />
                  <ScoreIndicator label="Operations Reliability" status="improving" description="Amber improving" />
                  <ScoreIndicator label="Data Visibility" status="green" description="Green on basics (even if everything else is messy)" />
                </div>
              </div>
              
              <div className="bg-background border rounded-2xl p-6 mb-8">
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-red-500" />
                  The Survival Minimum Viable Dashboard (MV-Dash)
                </h3>
                <p className="text-muted-foreground mb-4">If there is only one thing to implement in Survival, it is this:</p>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-bold text-foreground">1. Cash Right Now (today)</h4>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>• Cash in bank (real balance)</li>
                      <li>• Next 14 days of cash obligations (payroll, rent, key vendor payments)</li>
                      <li>• Expected collections in next 14 days</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-amber-500 pl-4">
                    <h4 className="font-bold text-foreground">2. 13-Week Cash Forecast</h4>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>• It does not need to be perfect</li>
                      <li>• It needs to be updated weekly</li>
                      <li>• It must show whether you hit a cash wall</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-emerald-500 pl-4">
                    <h4 className="font-bold text-foreground">3. Contribution Margin by Offer</h4>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>• For each product/service: price minus direct cost to deliver</li>
                      <li>• If contribution margin is negative, growth makes things worse</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <h3 className="font-bold text-foreground mb-4">Survival Priorities (in order)</h3>
              <PriorityList 
                priorities={[
                  "Stop cash leaks (unprofitable offers, silent waste, late collections).",
                  "Simplify (fewer offers, fewer customer types, fewer promises).",
                  "Stabilize delivery (reduce rework; rework kills cash and morale).",
                  "Install weekly cadence (a 30-minute weekly review of cash + top 3 operational constraints)."
                ]}
                color="bg-red-500"
              />
              
              <TrapCard 
                traps={[
                  "Over-discounting to 'win business'",
                  "Taking on custom work that destroys margins",
                  "Hiring too early (payroll becomes the fixed cost that kills runway)",
                  "Ignoring accounts receivable until it's too late",
                  "Confusing activity with progress (busy ≠ solvent)"
                ]}
                color="border-red-500"
              />
              
              <TakeawayBox 
                text="A healthy Survival-stage business is not one with big revenue—it is one with visibility + improving unit economics + fewer fires per week."
                color="bg-red-500/10 border border-red-500/30"
              />
            </div>
            
            {/* Stage 2: Stability */}
            <div className="not-prose my-16">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30">
                  <Settings className="w-10 h-10 text-amber-500" />
                </div>
                <div>
                  <span className="text-amber-500 font-bold uppercase tracking-wide text-sm">Stage 2</span>
                  <h2 className="text-3xl font-bold text-foreground">Stability: What Your Health Scores Should Look Like</h2>
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground mb-6">
                Stability is where your business stops depending on adrenaline. This stage is about creating an <strong className="text-foreground">operating system that can run repeatedly</strong> without heroic effort—so growth becomes safer.
              </p>
              
              <div className="bg-gradient-to-br from-amber-500/5 to-emerald-500/5 rounded-2xl p-6 border border-amber-500/20 mb-8">
                <h3 className="font-bold text-foreground mb-4">Healthy Score Profile (What to aim for)</h3>
                <p className="text-muted-foreground mb-4">At Stability, "green" should appear in operations consistency and financial rhythm:</p>
                <div className="space-y-2">
                  <ScoreIndicator label="Cash Flow" status="green" description="Green or very close" />
                  <ScoreIndicator label="Profitability" status="green" description="Green trend (even if margins are modest)" />
                  <ScoreIndicator label="Operations" status="green" description="Green on repeatability" />
                  <ScoreIndicator label="People" status="improving" description="Amber-to-green (role clarity and accountability improving)" />
                </div>
              </div>
              
              <div className="bg-background border rounded-2xl p-6 mb-8">
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-amber-500" />
                  The Stability Dashboard Set (what a CFO expects)
                </h3>
                <p className="text-muted-foreground mb-4">A stable SMB typically reviews monthly:</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border rounded-xl p-4">
                    <h4 className="font-bold text-foreground mb-2">1. P&L with Trend Lines</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Revenue, gross margin, operating expenses, operating profit</li>
                      <li>• Month-over-month and year-over-year comparison</li>
                    </ul>
                  </div>
                  <div className="border rounded-xl p-4">
                    <h4 className="font-bold text-foreground mb-2">2. Working Capital Snapshot</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Accounts receivable aging</li>
                      <li>• Accounts payable aging</li>
                      <li>• Cash conversion cycle thinking</li>
                    </ul>
                  </div>
                  <div className="border rounded-xl p-4">
                    <h4 className="font-bold text-foreground mb-2">3. Customer Retention + Quality</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Repeat purchase rate / churn</li>
                      <li>• Support backlog and resolution time</li>
                    </ul>
                  </div>
                  <div className="border rounded-xl p-4">
                    <h4 className="font-bold text-foreground mb-2">4. Capacity and Utilization</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• For services: utilization and delivery capacity</li>
                      <li>• For product: throughput and lead times</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <h3 className="font-bold text-foreground mb-4">Stability Priorities (in order)</h3>
              <PriorityList 
                priorities={[
                  "Standardize delivery: SOPs for the 5 most repeated workflows.",
                  "Make numbers fast: close books quickly and consistently.",
                  "Reduce founder dependency: delegate outcomes, not tasks.",
                  "Strengthen customer loyalty: retention is cheaper than acquisition.",
                  "Build a small cash reserve: stability without reserves is fragile."
                ]}
                color="bg-amber-500"
              />
              
              <TrapCard 
                traps={[
                  "Adding too many offerings again (complexity returns)",
                  "'Process theater' (documents created, not used)",
                  "Hiring without role clarity (headcount increases, output doesn't)",
                  "No regular operating cadence (meetings exist, but decisions don't)"
                ]}
                color="border-amber-500"
              />
              
              <TakeawayBox 
                text="A healthy Stability-stage business has predictable execution and predictable financial rhythm. The owner sleeps more because surprises reduce."
                color="bg-amber-500/10 border border-amber-500/30"
              />
            </div>
            
            {/* Stage 3: Scale */}
            <div className="not-prose my-16">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/30">
                  <TrendingUp className="w-10 h-10 text-emerald-500" />
                </div>
                <div>
                  <span className="text-emerald-500 font-bold uppercase tracking-wide text-sm">Stage 3</span>
                  <h2 className="text-3xl font-bold text-foreground">Scale: What Your Health Scores Should Look Like</h2>
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground mb-6">
                Scale is where many businesses break. Not because they lack ambition—but because they try to scale a model that was <strong className="text-foreground">never engineered for throughput</strong>.
              </p>
              
              <div className="bg-gradient-to-br from-emerald-500/5 to-blue-500/5 rounded-2xl p-6 border border-emerald-500/20 mb-8">
                <h3 className="font-bold text-foreground mb-4">Healthy Score Profile (What to aim for)</h3>
                <p className="text-muted-foreground mb-4">At Scale, strong businesses show:</p>
                <div className="space-y-2">
                  <ScoreIndicator label="Financial Health" status="green" description="Green across profitability + cash conversion" />
                  <ScoreIndicator label="Revenue Quality" status="green" description="Diverse channels; low concentration" />
                  <ScoreIndicator label="Operations" status="green" description="Green with measurable quality controls" />
                  <ScoreIndicator label="People/Leadership" status="green" description="Management depth and retention" />
                  <ScoreIndicator label="Systems/Data" status="green" description="Integrated stack and leading indicators" />
                </div>
              </div>
              
              <div className="bg-background border rounded-2xl p-6 mb-8">
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-500" />
                  The Scale Dashboards (what prevents "growth penalties")
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-emerald-500/5 rounded-xl">
                    <span className="bg-emerald-500 text-white text-sm font-bold px-2 py-1 rounded">1</span>
                    <div>
                      <h4 className="font-bold text-foreground">Unit Economics and Segment Profitability</h4>
                      <p className="text-sm text-muted-foreground">Profitability by customer type, channel, region, product line. Scale requires knowing what to scale and what not to scale.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-emerald-500/5 rounded-xl">
                    <span className="bg-emerald-500 text-white text-sm font-bold px-2 py-1 rounded">2</span>
                    <div>
                      <h4 className="font-bold text-foreground">Leading Indicators</h4>
                      <p className="text-sm text-muted-foreground">Pipeline health, conversion, retention signals, NPS. Scale punishes lagging indicators; you need early warning systems.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-emerald-500/5 rounded-xl">
                    <span className="bg-emerald-500 text-white text-sm font-bold px-2 py-1 rounded">3</span>
                    <div>
                      <h4 className="font-bold text-foreground">Operational Throughput</h4>
                      <p className="text-sm text-muted-foreground">Lead time, on-time delivery, defect/rework rate. Capacity planning (weekly, not quarterly).</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-emerald-500/5 rounded-xl">
                    <span className="bg-emerald-500 text-white text-sm font-bold px-2 py-1 rounded">4</span>
                    <div>
                      <h4 className="font-bold text-foreground">Talent System Health</h4>
                      <p className="text-sm text-muted-foreground">Time-to-hire, ramp time, retention of top performers. Manager-to-IC ratios.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-emerald-500/5 rounded-xl">
                    <span className="bg-emerald-500 text-white text-sm font-bold px-2 py-1 rounded">5</span>
                    <div>
                      <h4 className="font-bold text-foreground">Systems Integration</h4>
                      <p className="text-sm text-muted-foreground">Reduction in manual handoffs. Single source of truth for customer + finance + ops metrics.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="font-bold text-foreground mb-4">Scale Priorities (in order)</h3>
              <PriorityList 
                priorities={[
                  "Protect margin intentionally (pricing discipline, process efficiency, segment focus).",
                  "Add management depth (players are not automatically coaches).",
                  "Integrate systems (fragmented tools silently destroy capacity).",
                  "Institutionalize cadence (weekly metrics, monthly reviews, quarterly planning).",
                  "Build resilience (risk controls, vendor redundancy, cybersecurity basics)."
                ]}
                color="bg-emerald-500"
              />
              
              <TrapCard 
                traps={[
                  "Scaling sales faster than fulfillment capacity",
                  "'Tool sprawl' (too many apps, no integration)",
                  "Promoting top performers into leadership with no training",
                  "Culture drift (values not operationalized)",
                  "Metrics explosion (tracking 40 things weekly and acting on none)"
                ]}
                color="border-emerald-500"
              />
              
              <TakeawayBox 
                text="A healthy Scale-stage company has controlled complexity. Growth feels busy—but not chaotic. Problems are visible early, owned clearly, and solved systematically."
                color="bg-emerald-500/10 border border-emerald-500/30"
              />
            </div>
            
            {/* Stage 4: Exit */}
            <div className="not-prose my-16">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-blue-500/10 border-2 border-blue-500/30">
                  <Award className="w-10 h-10 text-blue-500" />
                </div>
                <div>
                  <span className="text-blue-500 font-bold uppercase tracking-wide text-sm">Stage 4</span>
                  <h2 className="text-3xl font-bold text-foreground">Exit: What Your Health Scores Should Look Like</h2>
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground mb-6">
                Exit-stage health is about <strong className="text-foreground">transferability</strong>. A buyer is not buying your hustle. They are buying a machine that produces cash flow with manageable risk.
              </p>
              
              <div className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl p-6 border border-blue-500/20 mb-8">
                <h3 className="font-bold text-foreground mb-4">Healthy Score Profile (What to aim for)</h3>
                <p className="text-muted-foreground mb-4">At Exit, "healthy" often means:</p>
                <div className="space-y-2">
                  <ScoreIndicator label="Financial Reporting" status="green" description="Green and buyer-ready" />
                  <ScoreIndicator label="Revenue" status="green" description="Low concentration risk" />
                  <ScoreIndicator label="Operations" status="green" description="Documented processes" />
                  <ScoreIndicator label="People/Leadership" status="green" description="Company runs without owner" />
                  <ScoreIndicator label="Risk/Compliance" status="green" description="No hidden landmines" />
                </div>
              </div>
              
              <div className="bg-background border rounded-2xl p-6 mb-8">
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                  The Exit Dashboards (buyer logic)
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-blue-500/30 rounded-xl p-4 bg-blue-500/5">
                    <h4 className="font-bold text-foreground mb-2">1. Quality of Earnings Readiness</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Clean P&L categories</li>
                      <li>• Clear owner add-backs documented</li>
                      <li>• Consistent reporting cadence</li>
                    </ul>
                  </div>
                  <div className="border border-blue-500/30 rounded-xl p-4 bg-blue-500/5">
                    <h4 className="font-bold text-foreground mb-2">2. Revenue Concentration & Retention</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Top customer concentration tracked</li>
                      <li>• Contract terms documented</li>
                      <li>• Renewal performance understood</li>
                    </ul>
                  </div>
                  <div className="border border-blue-500/30 rounded-xl p-4 bg-blue-500/5">
                    <h4 className="font-bold text-foreground mb-2">3. Process and Controls</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• SOP library (complete enough)</li>
                      <li>• Approvals and spending controls</li>
                      <li>• Continuity planning</li>
                    </ul>
                  </div>
                  <div className="border border-blue-500/30 rounded-xl p-4 bg-blue-500/5">
                    <h4 className="font-bold text-foreground mb-2">4. Org Chart Resiliency</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Who runs the business day-to-day?</li>
                      <li>• Incentives and retention plans for key leaders</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <h3 className="font-bold text-foreground mb-4">Exit Priorities (in order)</h3>
              <PriorityList 
                priorities={[
                  "Reduce owner dependency (decision-making, relationships, approvals).",
                  "De-risk revenue (contracts, concentration reduction, retention).",
                  "Clean reporting (close speed, accurate categories, documentation).",
                  "Harden controls (security, compliance, vendor contracts, HR documentation).",
                  "Create a buyer narrative (why this business wins, sustainably)."
                ]}
                color="bg-blue-500"
              />
              
              <TrapCard 
                traps={[
                  "Waiting for a buyer to reveal problems in diligence",
                  "High customer concentration ignored because 'they love us'",
                  "Undocumented processes hidden behind a strong team",
                  "Weak internal controls (creates buyer fear and lowers valuation)",
                  "Owner as the 'hub' for all key relationships"
                ]}
                color="border-blue-500"
              />
              
              <TakeawayBox 
                text="A healthy Exit-stage business looks boring in the best way. Predictable. Documented. Transferable. Low drama. That is what buyers pay for."
                color="bg-blue-500/10 border border-blue-500/30"
              />
            </div>
            
            {/* Self-Identify Your Stage */}
            <div className="not-prose my-16">
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Target className="w-8 h-8 text-primary" />
                A Simple Way to Self-Identify Your Stage
              </h2>
              
              <div className="bg-gradient-to-br from-primary/5 to-muted rounded-2xl p-8 border">
                <p className="text-muted-foreground mb-6">If the stage feels unclear, use these cues:</p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                    <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-red-600">Survival:</span>
                      <p className="text-foreground">Cash anxiety is frequent; delivery feels reactive; owner is the system.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <Settings className="w-6 h-6 text-amber-500 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-amber-600">Stability:</span>
                      <p className="text-foreground">Business runs predictably month-to-month; fewer emergencies; processes exist.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <TrendingUp className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-emerald-600">Scale:</span>
                      <p className="text-foreground">Growth is the objective; complexity is increasing; leaders and systems must mature fast.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <Award className="w-6 h-6 text-blue-500 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-blue-600">Exit:</span>
                      <p className="text-foreground">Decisions prioritize de-risking and transferability; reporting and controls tighten; owner steps back.</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground mt-6 text-sm">
                  A business can sit between stages. That is normal. The goal is not labeling—it is prioritizing the next set of health improvements that match reality.
                </p>
              </div>
            </div>
            
            {/* Practical Rhythm */}
            <h2 className="text-3xl font-bold text-foreground mt-16 mb-6">
              How to Use Business Health Scores Without Overcomplicating It
            </h2>
            
            <div className="not-prose bg-gradient-to-r from-primary/10 to-emerald-500/10 rounded-2xl p-8 border border-primary/20 mb-12">
              <h3 className="font-bold text-foreground mb-4">A practical rhythm that works for most SMBs:</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-background/50 rounded-xl">
                  <div className="text-3xl font-bold text-primary mb-2">Weekly</div>
                  <div className="text-sm text-muted-foreground">30 minutes</div>
                  <p className="text-sm text-foreground mt-2">Cash, top constraints, customer issues, capacity.</p>
                </div>
                <div className="text-center p-4 bg-background/50 rounded-xl">
                  <div className="text-3xl font-bold text-amber-500 mb-2">Monthly</div>
                  <div className="text-sm text-muted-foreground">60–90 minutes</div>
                  <p className="text-sm text-foreground mt-2">P&L trends, working capital, retention, operations performance.</p>
                </div>
                <div className="text-center p-4 bg-background/50 rounded-xl">
                  <div className="text-3xl font-bold text-emerald-500 mb-2">Quarterly</div>
                  <div className="text-sm text-muted-foreground">Half day</div>
                  <p className="text-sm text-foreground mt-2">Stage reassessment, domain scoring, top 3 priorities, roadmap.</p>
                </div>
              </div>
            </div>
            
            <p>
              Tools like <Link to="/" className="text-primary font-semibold hover:underline">BizHealth.ai</Link> can help by giving a structured assessment across domains, benchmarking where relevant, and translating findings into a prioritized roadmap—so the score isn't just informational, it becomes operational.
            </p>
            
            {/* Final Word */}
            <div className="not-prose my-16">
              <div className="bg-gradient-to-br from-primary via-primary/90 to-emerald-600 rounded-2xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Final Word: The "Right" Score Is Stage-Appropriate</h2>
                <p className="mb-6 text-white/90">
                  The most costly mistake is aiming for the wrong version of "healthy."
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-300 flex-shrink-0 mt-0.5" />
                    <span>A Survival-stage business trying to "optimize" advanced dashboards may ignore cash crises.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-300 flex-shrink-0 mt-0.5" />
                    <span>A Stability-stage business chasing new customers without standardizing delivery invites chaos.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-300 flex-shrink-0 mt-0.5" />
                    <span>A Scale-stage business that ignores leadership depth will burn talent and culture.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-300 flex-shrink-0 mt-0.5" />
                    <span>An Exit-stage business that delays documentation and controls will lose leverage in negotiations.</span>
                  </li>
                </ul>
                <p className="font-bold text-lg">
                  Healthy businesses do not just grow. They mature.
                </p>
                <p className="mt-4 text-white/90">
                  The right question is not "Is the business healthy?" It is: <strong>"Is the business healthy for the stage it's in—and what must be true to reach the next stage safely?"</strong>
                </p>
              </div>
            </div>
            
            {/* CTA */}
            <div className="not-prose bg-gradient-to-r from-primary/10 via-background to-emerald-500/10 rounded-2xl p-8 border border-primary/20 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready to Assess Your Business Health by Stage?
              </h3>
              <p className="text-muted-foreground mb-6">
                Get a structured, stage-appropriate assessment that translates into clear priorities.
              </p>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
              >
                Start Your Assessment
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            
          </div>
        </div>
        
        {/* Related Articles */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <RelatedArticles
              articles={[
                {
                  title: "The Fractional CFO Toolkit: 7 Financial Dashboards Every Business Owner Should Have",
                  slug: "/blog/fractional-cfo-toolkit",
                  category: "Financial Management",
                  excerpt: "Build CFO-level visibility with 7 essential financial dashboards for cash flow, P&L, and strategic metrics tracking."
                },
                {
                  title: "The Complete Guide to Business Health Assessment for 2026",
                  slug: "/blog/complete-guide-business-health-assessment-2026",
                  category: "Strategy",
                  excerpt: "Discover how to conduct a comprehensive business health assessment for 2026 to maximize growth."
                },
                {
                  title: "Small Business Financials: Know Your Numbers, Know Your Business",
                  slug: "/blog/small-business-financials-know-your-numbers",
                  category: "Financial Management",
                  excerpt: "Master small business financial management with this comprehensive guide to key metrics."
                }
              ]}
            />
          </div>
        </div>
      </article>
      
      <GradientDivider />
      <GlobalFooter />
      <PromotionalBanner />
    </div>
  );
};

export default BusinessHealthScoresByStage;
