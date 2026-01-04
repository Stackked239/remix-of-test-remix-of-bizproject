import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from "@/components/GlobalFooter";
import PromotionalBanner from "@/components/PromotionalBanner";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import RelatedArticles from "@/components/RelatedArticles";
import SocialShareButtons from "@/components/SocialShareButtons";
import { 
  Calendar, Clock, User, ArrowLeft, Info, CheckCircle, 
  DollarSign, TrendingUp, Users, LineChart, Gauge, Building2, Target,
  AlertTriangle, Lightbulb, ArrowRight, Wallet, PieChart, BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";
import fractionalCFOImage from "@/assets/fractional-cfo-toolkit-dashboards-2025.jpg";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Dashboard card component for visual consistency
const DashboardCard = ({ 
  number, 
  title, 
  icon: Icon, 
  color, 
  frequency,
  children 
}: { 
  number: number; 
  title: string; 
  icon: React.ElementType;
  color: string;
  frequency: string;
  children: React.ReactNode;
}) => {
  const colorClasses: Record<string, { bg: string; border: string; icon: string; badge: string }> = {
    emerald: { bg: "from-emerald-500/10 to-emerald-600/5", border: "border-emerald-500/30", icon: "text-emerald-600", badge: "bg-emerald-500/20 text-emerald-700" },
    blue: { bg: "from-blue-500/10 to-blue-600/5", border: "border-blue-500/30", icon: "text-blue-600", badge: "bg-blue-500/20 text-blue-700" },
    purple: { bg: "from-purple-500/10 to-purple-600/5", border: "border-purple-500/30", icon: "text-purple-600", badge: "bg-purple-500/20 text-purple-700" },
    amber: { bg: "from-amber-500/10 to-amber-600/5", border: "border-amber-500/30", icon: "text-amber-600", badge: "bg-amber-500/20 text-amber-700" },
    rose: { bg: "from-rose-500/10 to-rose-600/5", border: "border-rose-500/30", icon: "text-rose-600", badge: "bg-rose-500/20 text-rose-700" },
    cyan: { bg: "from-cyan-500/10 to-cyan-600/5", border: "border-cyan-500/30", icon: "text-cyan-600", badge: "bg-cyan-500/20 text-cyan-700" },
    indigo: { bg: "from-indigo-500/10 to-indigo-600/5", border: "border-indigo-500/30", icon: "text-indigo-600", badge: "bg-indigo-500/20 text-indigo-700" },
  };

  const styles = colorClasses[color] || colorClasses.emerald;

  return (
    <div className={`relative rounded-2xl border ${styles.border} bg-gradient-to-br ${styles.bg} p-8 mb-10 overflow-hidden`}>
      {/* Decorative number */}
      <div className="absolute top-4 right-6 text-8xl font-bold text-foreground/5 select-none">
        {number}
      </div>
      
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className={`p-3 rounded-xl bg-background shadow-sm ${styles.icon}`}>
          <Icon className="w-7 h-7" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${styles.badge}`}>
              Dashboard {number}
            </span>
            <span className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
              {frequency}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
        </div>
      </div>
      
      {children}
    </div>
  );
};

// Action item component
const ActionItem = ({ title, children, variant = "tip" }: { title: string; children: React.ReactNode; variant?: "tip" | "action" | "warning" }) => {
  const variants = {
    tip: { bg: "bg-emerald-500/10 border-emerald-500/30", icon: Lightbulb, iconColor: "text-emerald-600" },
    action: { bg: "bg-blue-500/10 border-blue-500/30", icon: CheckCircle, iconColor: "text-blue-600" },
    warning: { bg: "bg-amber-500/10 border-amber-500/30", icon: AlertTriangle, iconColor: "text-amber-600" },
  };
  
  const style = variants[variant];
  const Icon = style.icon;
  
  return (
    <div className={`${style.bg} border rounded-xl p-5 mb-6`}>
      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
        <Icon className={`w-5 h-5 ${style.iconColor}`} />
        {title}
      </h4>
      <p className="text-muted-foreground text-sm leading-relaxed">{children}</p>
    </div>
  );
};

// Section header component
const SectionHeader = ({ icon: Icon, title, color }: { icon: React.ElementType; title: string; color: string }) => {
  const colorClasses: Record<string, string> = {
    emerald: "text-emerald-600",
    blue: "text-blue-600",
    purple: "text-purple-600",
    amber: "text-amber-600",
  };
  
  return (
    <h3 className="text-xl font-semibold mt-6 mb-4 text-foreground flex items-center gap-2">
      <Icon className={`w-5 h-5 ${colorClasses[color] || "text-primary"}`} />
      {title}
    </h3>
  );
};

const FractionalCFOToolkit = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Fractional CFO Toolkit: 7 Financial Dashboards for SMB Owners | BizHealth.ai"
        description="Discover the 7 essential financial dashboards every business owner needs. Build CFO-level visibility with cash flow, P&L, and strategic metrics—read now!"
        keywords="fractional CFO toolkit, financial dashboards small business, CFO dashboards, cash flow dashboard, P&L dashboard, SMB financial visibility, business KPIs, financial metrics tracking, cash position dashboard, customer profitability dashboard, operational efficiency metrics, debt capital dashboard, strategic metrics SMB"
        canonical="https://bizhealth.ai/blog/fractional-cfo-toolkit"
        ogType="article"
        ogImage="https://bizhealth.ai/og-images/og-fractional-cfo-toolkit.jpg"
        articlePublishedTime="2025-12-29"
        articleModifiedTime="2025-12-29"
        articleAuthor="BizHealth.ai Research Team"
      />
      <StructuredData 
        type="blogPosting"
        headline="The Fractional CFO Toolkit: 7 Financial Dashboards Every Business Owner Should Have Before They Sleep at Night"
        description="Learn how to build seven essential financial dashboards that provide CFO-level visibility into your business. Comprehensive guide to cash flow, profitability, and strategic financial metrics."
        image="https://bizhealth.ai/og-images/og-fractional-cfo-toolkit.jpg"
        datePublished="2025-12-29"
        author="BizHealth.ai Research Team"
        url="https://bizhealth.ai/blog/fractional-cfo-toolkit"
        keywords={["fractional CFO toolkit", "financial dashboards", "cash flow dashboard", "P&L dashboard", "SMB financial visibility"]}
      />
      <GlobalNavigation />
      
      {/* Hero Section with gradient */}
      <section className="pt-40 pb-16 bg-gradient-to-b from-muted via-muted to-background relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>
            
            <div className="mb-6 flex flex-wrap gap-2">
              <span className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-sm px-4 py-1.5 rounded-full font-medium">
                Financials
              </span>
              <span className="bg-blue-500/15 text-blue-700 dark:text-blue-400 text-sm px-4 py-1.5 rounded-full font-medium">
                Business Leadership
              </span>
              <span className="bg-purple-500/15 text-purple-700 dark:text-purple-400 text-sm px-4 py-1.5 rounded-full font-medium">
                Business Strategy
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
              The Fractional CFO Toolkit: <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">7 Financial Dashboards</span> Every Business Owner Should Have
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 mb-8 text-muted-foreground">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2 cursor-help hover:text-foreground transition-colors">
                      <User className="w-4 h-4" />
                      <span>BizHealth.ai Research Team</span>
                      <Info className="w-3.5 h-3.5 text-primary" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-sm">
                      The BizHealth.ai Research Team comprises accomplished business owners, former C-suite executives, CFOs, operations leaders, and growth strategists, pooling over five decades of hands-on expertise in SMB scaling, financial oversight, operational efficiency, and market expansion.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>December 29, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>12 min read</span>
              </div>
            </div>

            {/* Social Share Buttons */}
            <SocialShareButtons 
              title="The Fractional CFO Toolkit: 7 Financial Dashboards Every Business Owner Should Have"
              description="Discover the 7 essential financial dashboards every business owner needs."
              variant="inline"
              className="mb-8"
            />
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10">
              <img 
                src={fractionalCFOImage} 
                alt="Business owner viewing financial dashboard with declining cash flow velocity and operational stress metrics - fractional CFO toolkit visualization for small business financial visibility"
                className="w-full h-auto max-h-[500px] object-cover"
                width="1200"
                height="630"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Key Takeaways Box */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-6 md:p-8">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Key Takeaways
              </h3>
              <ul className="grid md:grid-cols-2 gap-3">
                {[
                  "Build CFO-level visibility without hiring a full-time CFO",
                  "7 essential dashboards: cash, P&L, customers, forecast, efficiency, debt, strategy",
                  "Review cadence: weekly cash, monthly P&L, quarterly deep-dive",
                  "Start with 2 dashboards, add others over 90 days"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed border-l-4 border-primary pl-6">
                Every night, a <strong>fractional CFO</strong> or finance consultant logs off from their laptop and hands control back to the business owner. They have spent the day reviewing financial statements, analyzing metrics, and providing strategic guidance. But once they are gone, the owner is left with a spreadsheet and a prayer.
              </p>

              <p className="mb-6 text-muted-foreground leading-relaxed">
                The truth is, most business owners do not have the <strong>financial visibility</strong> of a CFO. They know roughly how much revenue came in last month. They know roughly how much they spent. But they do not know the operational details that a CFO would catch immediately—the subtle shifts in customer profitability, the creeping increases in overhead, the changes in <Link to="/blog/cash-flow-crisis-management" className="text-primary hover:underline font-medium">cash conversion cycles</Link>, the early warning signs of problems that are still months away from becoming crises.
              </p>

              <p className="mb-6 text-muted-foreground leading-relaxed">
                This is not a judgment. It is a reality of running a business without a dedicated finance function. When you are juggling operations, sales, product, and people, <Link to="/blog/financial-health-metrics" className="text-primary hover:underline font-medium">financial analysis</Link> becomes a quarterly or annual event—something your accountant produces after month-end. By then, you are reacting to information that is weeks old.
              </p>

              <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-xl p-6 my-8">
                <p className="text-foreground font-medium mb-0">
                  💡 The solution is not to hire a full-time CFO. That is too expensive for most SMBs. The solution is to build a simple but comprehensive set of <strong>financial dashboards</strong> that you review on a regular cadence.
                </p>
              </div>

              {/* Dashboard Navigation */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-10">
                {[
                  { num: 1, label: "Cash Position", icon: Wallet, color: "emerald" },
                  { num: 2, label: "P&L Snapshot", icon: PieChart, color: "blue" },
                  { num: 3, label: "Customer Profit", icon: Users, color: "purple" },
                  { num: 4, label: "Cash Forecast", icon: LineChart, color: "amber" },
                  { num: 5, label: "Efficiency", icon: Gauge, color: "rose" },
                  { num: 6, label: "Debt & Capital", icon: Building2, color: "cyan" },
                  { num: 7, label: "Strategic", icon: Target, color: "indigo" },
                ].map((item) => {
                  const colorMap: Record<string, string> = {
                    emerald: "bg-emerald-500/10 border-emerald-500/30 text-emerald-700",
                    blue: "bg-blue-500/10 border-blue-500/30 text-blue-700",
                    purple: "bg-purple-500/10 border-purple-500/30 text-purple-700",
                    amber: "bg-amber-500/10 border-amber-500/30 text-amber-700",
                    rose: "bg-rose-500/10 border-rose-500/30 text-rose-700",
                    cyan: "bg-cyan-500/10 border-cyan-500/30 text-cyan-700",
                    indigo: "bg-indigo-500/10 border-indigo-500/30 text-indigo-700",
                  };
                  return (
                    <div key={item.num} className={`${colorMap[item.color]} border rounded-lg p-3 text-center`}>
                      <div className="text-2xl font-bold">{item.num}</div>
                      <div className="text-xs font-medium opacity-80">{item.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Dashboard 1 */}
              <DashboardCard 
                number={1} 
                title="The Weekly Cash Position Dashboard" 
                icon={Wallet}
                color="emerald"
                frequency="Review Weekly"
              >
                <p className="mb-6 text-muted-foreground leading-relaxed">
                  This is the most critical dashboard. <strong>Cash is the oxygen of your business.</strong> You can be profitable on paper and still run out of cash.
                </p>

                <SectionHeader icon={BarChart3} title="What to Track" color="emerald" />
                <ul className="grid md:grid-cols-2 gap-2 mb-6">
                  {[
                    "Current cash balance (today's number)",
                    "Cash position 4 weeks ago (trend)",
                    "Minimum cash to operate",
                    "Days of cash runway",
                    "Accounts receivable",
                    "Accounts payable"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm bg-background/50 rounded-lg p-3">
                      <DollarSign className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <SectionHeader icon={AlertTriangle} title="Why It Matters" color="amber" />
                <p className="mb-6 text-muted-foreground leading-relaxed">
                  This is your early warning system. If <strong>cash runway</strong> drops below 90 days, you need to take action. If accounts receivable are growing faster than revenue, you have a collection problem.
                </p>

                <ActionItem title="Quick Tip" variant="tip">
                  Set a minimum cash threshold that feels safe for your business (60 days of expenses, for example). When you drop below it, stop discretionary spending and focus on cash collection.
                </ActionItem>
              </DashboardCard>

              {/* Dashboard 2 */}
              <DashboardCard 
                number={2} 
                title="The Monthly P&L Snapshot" 
                icon={PieChart}
                color="blue"
                frequency="Review Monthly"
              >
                <p className="mb-6 text-muted-foreground leading-relaxed">
                  The P&L tells you whether the business is making money. But a <strong>fractional CFO</strong> does not just look at the headline—they analyze the composition.
                </p>

                <SectionHeader icon={BarChart3} title="What to Track" color="blue" />
                <ul className="grid md:grid-cols-2 gap-2 mb-6">
                  {[
                    "Total revenue",
                    "Revenue by product/segment",
                    "Gross profit & margin %",
                    "COGS as % of revenue",
                    "Operating expenses by category",
                    "Operating income & margin %"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm bg-background/50 rounded-lg p-3">
                      <TrendingUp className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <ActionItem title="Red Flags to Watch" variant="warning">
                  <ul className="list-disc pl-4 mt-2 space-y-1">
                    <li>Gross margin declining (pricing pressure or rising COGS)</li>
                    <li>Payroll growing faster than revenue</li>
                    <li>Operating expenses growing without revenue growth</li>
                  </ul>
                </ActionItem>
              </DashboardCard>

              {/* Dashboard 3 */}
              <DashboardCard 
                number={3} 
                title="The Customer Profitability Dashboard" 
                icon={Users}
                color="purple"
                frequency="Review Quarterly"
              >
                <p className="mb-6 text-muted-foreground leading-relaxed">
                  Not all customers are equally valuable. Some are highly profitable. Some are money-losers. Until you see this, you do not know where to focus.
                </p>

                <SectionHeader icon={BarChart3} title="What to Track" color="purple" />
                <ul className="grid md:grid-cols-2 gap-2 mb-6">
                  {[
                    "Active customers by segment",
                    "Revenue per customer",
                    "Gross profit per customer",
                    "Customer acquisition cost (CAC)",
                    "Customer lifetime value (LTV)",
                    "Churn rate by segment"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm bg-background/50 rounded-lg p-3">
                      <Users className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <ActionItem title="Action Item" variant="action">
                  For each customer segment where churn is high or profitability is low, create a specific plan. Maybe improve onboarding. Maybe exit the segment. Maybe raise prices.
                </ActionItem>
              </DashboardCard>

              {/* Dashboard 4 */}
              <DashboardCard 
                number={4} 
                title="The Cash Flow Forecast Dashboard" 
                icon={LineChart}
                color="amber"
                frequency="Update Weekly"
              >
                <p className="mb-6 text-muted-foreground leading-relaxed">
                  This is where you look forward, not backward. A good <strong>cash flow forecast</strong> is your strategy tool.
                </p>

                <SectionHeader icon={BarChart3} title="What to Track" color="amber" />
                <ul className="grid md:grid-cols-2 gap-2 mb-6">
                  {[
                    "13-week rolling forecast",
                    "Projected cash inflows",
                    "Projected cash outflows",
                    "Ending cash balance/week",
                    "Identified cash gaps",
                    "Sensitivity analysis"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm bg-background/50 rounded-lg p-3">
                      <LineChart className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <ActionItem title="Action Item" variant="action">
                  Identify potential cash gaps 6+ weeks away. For each gap, decide now how you will solve it (faster collections, extended payment terms, credit line) rather than being surprised.
                </ActionItem>
              </DashboardCard>

              {/* Dashboard 5 */}
              <DashboardCard 
                number={5} 
                title="The Operational Efficiency Dashboard" 
                icon={Gauge}
                color="rose"
                frequency="Review Quarterly"
              >
                <p className="mb-6 text-muted-foreground leading-relaxed">
                  This dashboard shows whether your business model is getting more or less efficient as you scale.
                </p>

                <SectionHeader icon={BarChart3} title="What to Track" color="amber" />
                <ul className="grid md:grid-cols-2 gap-2 mb-6">
                  {[
                    "Payroll as % of revenue",
                    "Operating expenses as % of revenue",
                    "Revenue per employee",
                    "Support cost per customer",
                    "Time-to-close / time-to-deliver",
                    "Error/rework rate"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm bg-background/50 rounded-lg p-3">
                      <Gauge className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <ActionItem title="Why It Matters" variant="tip">
                  This tells you whether growth is <strong>profitable growth</strong>. A business can grow revenue 50% and become less profitable if operating costs are growing faster.
                </ActionItem>
              </DashboardCard>

              {/* Dashboard 6 */}
              <DashboardCard 
                number={6} 
                title="The Debt and Capital Dashboard" 
                icon={Building2}
                color="cyan"
                frequency="Review Quarterly"
              >
                <p className="mb-6 text-muted-foreground leading-relaxed">
                  If you have loans, investors, or complex capital structure, this dashboard is essential.
                </p>

                <SectionHeader icon={BarChart3} title="What to Track" color="blue" />
                <ul className="grid md:grid-cols-2 gap-2 mb-6">
                  {[
                    "Total outstanding debt",
                    "Interest expense (annual)",
                    "Debt covenants status",
                    "Funding runway",
                    "Key lender metrics",
                    "Maturity schedule"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm bg-background/50 rounded-lg p-3">
                      <Building2 className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <ActionItem title="Action Item" variant="action">
                  If debt is becoming a burden (high interest, tight covenants), create a plan to refinance, pay down, or restructure. Do not let debt become an anchor.
                </ActionItem>
              </DashboardCard>

              {/* Dashboard 7 */}
              <DashboardCard 
                number={7} 
                title="The Strategic Metrics Dashboard" 
                icon={Target}
                color="indigo"
                frequency="Review Quarterly"
              >
                <p className="mb-6 text-muted-foreground leading-relaxed">
                  These are not financial metrics in the traditional sense, but they are <strong>leading indicators</strong> of financial performance.
                </p>

                <SectionHeader icon={BarChart3} title="What to Track" color="purple" />
                <ul className="grid md:grid-cols-2 gap-2 mb-6">
                  {[
                    "Pipeline value",
                    "Conversion rate",
                    "Customer retention rate",
                    "Product adoption %",
                    "Net Promoter Score (NPS)",
                    "Team turnover rate"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm bg-background/50 rounded-lg p-3">
                      <Target className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <ActionItem title="Why It Matters" variant="tip">
                  These predict future financial performance 2–3 months out. Declining NPS warns of churn. Declining pipeline warns of revenue drop. Act immediately on negative trends.
                </ActionItem>
              </DashboardCard>

              {/* Implementation Guide */}
              <div className="bg-gradient-to-br from-primary/5 via-background to-primary/10 border border-primary/20 rounded-2xl p-8 my-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                  90-Day Implementation Roadmap
                </h2>
                <p className="mb-6 text-muted-foreground leading-relaxed">
                  You do not need to build all seven dashboards at once. Start with the two most critical, then add others systematically.
                </p>

                <div className="overflow-x-auto">
                  <Table className="mb-0">
                    <TableHeader>
                      <TableRow className="border-primary/20">
                        <TableHead className="font-semibold text-foreground">Week</TableHead>
                        <TableHead className="font-semibold text-foreground">Dashboard</TableHead>
                        <TableHead className="font-semibold text-foreground">Key Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { week: "1", dashboard: "Cash Position", color: "emerald", actions: "Gather bank balance, calculate daily burn rate, set up tracking" },
                        { week: "2", dashboard: "P&L Snapshot", color: "blue", actions: "Pull last 3 months P&L, add percentage-of-revenue calculations" },
                        { week: "3-4", dashboard: "Customer Profitability", color: "purple", actions: "Analyze revenue by segment, calculate gross profit per customer" },
                        { week: "5-6", dashboard: "Cash Flow Forecast", color: "amber", actions: "Build 13-week forecast, identify cash gaps" },
                        { week: "7-8", dashboard: "Operational Efficiency", color: "rose", actions: "Calculate payroll %, operating expense %, revenue per employee" },
                        { week: "9-10", dashboard: "Debt/Capital Tracking", color: "cyan", actions: "Document covenants, set up compliance tracking" },
                        { week: "11+", dashboard: "Strategic Metrics", color: "indigo", actions: "Identify 3-5 leading indicators, set up tracking" },
                      ].map((row, i) => (
                        <TableRow key={i} className="border-primary/10">
                          <TableCell className="font-bold text-foreground">{row.week}</TableCell>
                          <TableCell>
                            <span className={`inline-flex px-2 py-1 rounded-md text-xs font-medium bg-${row.color}-500/10 text-${row.color}-700`}>
                              {row.dashboard}
                            </span>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">{row.actions}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Financial Cadence */}
              <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">Making It Repeatable: The Financial Cadence</h2>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {[
                  { freq: "Weekly", time: "15 min", tasks: "Cash position, pipeline review", color: "emerald" },
                  { freq: "Monthly", time: "60 min", tasks: "P&L, customer profitability, efficiency", color: "blue" },
                  { freq: "Quarterly", time: "90 min", tasks: "Full dashboard review, strategy adjustment", color: "purple" },
                ].map((item) => (
                  <div key={item.freq} className={`bg-${item.color}-500/10 border border-${item.color}-500/20 rounded-xl p-5 text-center`}>
                    <div className={`text-2xl font-bold text-${item.color}-700 mb-1`}>{item.freq}</div>
                    <div className="text-xs text-muted-foreground mb-2">{item.time}</div>
                    <div className="text-sm text-foreground">{item.tasks}</div>
                  </div>
                ))}
              </div>

              {/* Cost of Not Having */}
              <div className="bg-gradient-to-r from-rose-500/10 to-amber-500/10 border border-rose-500/20 rounded-2xl p-8 my-10">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-rose-600" />
                  The Cost of Not Having These Dashboards
                </h2>
                <ul className="space-y-3">
                  {[
                    { cost: "Opportunity cost", desc: "Miss emerging problems until they are crises" },
                    { cost: "Strategic drift", desc: "Keep acquiring the wrong customer segments" },
                    { cost: "Cash crises", desc: "Run out of cash because you didn't see it coming" },
                    { cost: "Overhiring", desc: "Hire without understanding if revenue supports headcount" },
                    { cost: "Pricing mistakes", desc: "Can't price correctly without knowing customer profitability" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <span className="text-rose-600 font-semibold shrink-0">{item.cost}:</span>
                      <span>{item.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Conclusion */}
              <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">The Bottom Line: Financial Visibility Changes Everything</h2>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                A business owner with <strong>financial visibility</strong> is a different operator than one without it. They move faster. They take less risk. They make better <Link to="/blog/business-leadership" className="text-primary hover:underline font-medium">strategic choices</Link>. They know when to hold back and when to accelerate.
              </p>

              <p className="mb-6 text-muted-foreground leading-relaxed">
                You do not need to be a CFO to have <strong>CFO-level visibility</strong>. You just need these seven dashboards and the discipline to review them on a regular cadence.
              </p>

              <p className="mb-8 text-xl text-foreground font-medium bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Start this week. Within 90 days, you will have the financial visibility of a fractional CFO—and you will sleep better at night.
              </p>

              {/* CTA Section */}
              <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-2xl p-8 mt-12">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzMiAyIDIgNC0yIDQtMiA0LTItMi0yLTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-primary-foreground mb-4">Ready to Build Your Financial Dashboard Toolkit?</h3>
                  <p className="text-primary-foreground/90 mb-6">
                    Stop operating in the dark. BizHealth.ai provides pre-built financial dashboards designed by CFOs for business owners who want clarity without complexity.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link 
                      to="/pricing" 
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-background px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-background/90 hover:scale-105"
                    >
                      Get Started Today
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link 
                      to="/biztools/financials/health-check" 
                      className="inline-flex items-center justify-center rounded-lg border-2 border-primary-foreground/30 bg-transparent px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-foreground/10"
                    >
                      Try Free Financial Health Check
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <RelatedArticles 
        articles={[
          {
            title: "Financial Health Metrics Every Business Owner Should Track",
            slug: "financial-health-metrics",
            category: "Financial Management",
            excerpt: "Master 8 critical financial health metrics for SMBs: profit margins, cash flow, KPIs, and growth tracking."
          },
          {
            title: "SMB Cash Flow Hacks: 10 Strategies to Boost Liquidity in 2025",
            slug: "smb-cash-flow-hacks-2025",
            category: "Financial Management",
            excerpt: "Discover 10 proven cash flow strategies to boost liquidity and financial resilience for your small business."
          },
          {
            title: "Small Business Financials: Know Your Numbers, Know Your Business",
            slug: "small-business-financials-know-your-numbers",
            category: "Financial Management",
            excerpt: "Master small business financial management with this comprehensive guide to income statements, balance sheets, and key metrics."
          }
        ]}
      />

      <PromotionalBanner />
      <GlobalFooter />
    </div>
  );
};

export default FractionalCFOToolkit;
