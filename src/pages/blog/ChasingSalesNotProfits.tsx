import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import GradientDivider from "@/components/GradientDivider";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import BlogHeroSection from "@/components/BlogHeroSection";
import PromotionalBanner from "@/components/PromotionalBanner";
import RelatedArticles from "@/components/RelatedArticles";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  DollarSign,
  Target,
  BarChart3,
  Users,
  Zap,
  Clock,
  XCircle,
  Lightbulb,
  Building2,
  PiggyBank
} from "lucide-react";
import heroImage from "@/assets/images/blog/why-small-businesses-fail-chasing-sales-profits.jpg";

const ChasingSalesNotProfits = () => {
  return (
    <div className="min-h-screen bg-background">
      <PromotionalBanner />
      <SEO 
        title="Why Small Businesses Fail: Chasing Sales Instead of Profits | BizHealth.ai"
        description="Discover why revenue growth doesn't equal profit. Learn to identify unprofitable sales, measure true profitability, and build a sustainable business—read now!"
        keywords="small business profitability, revenue vs profit, profit margin optimization, unprofitable sales, cash flow management, business financial health, SMB profit strategies, sustainable business growth, unit economics, customer profitability analysis, profit-first business, revenue vanity profit sanity, small business failure, gross margin, net profit margin"
        ogType="article"
        ogImage="/og-images/og-chasing-sales-not-profits.jpg"
        articlePublishedTime="2026-01-19T12:00:00Z"
        articleModifiedTime="2026-01-19T12:00:00Z"
        articleAuthor="BizHealth.ai Research Team"
        canonical="https://bizhealth.ai/blog/chasing-sales-not-profits"
      />
      
      <StructuredData 
        type="article"
        headline="Why Small Businesses Fail Chasing Sales, Instead of Pursuing Profits"
        description="Discover why more sales don't equal more profit. Learn to identify the hidden costs of unprofitable growth and build a sustainable, profitable business."
        author="BizHealth.ai Research Team"
        datePublished="2026-01-19"
        dateModified="2026-01-19"
        image="https://bizhealth.ai/assets/images/blog/why-small-businesses-fail-chasing-sales-profits.jpg"
        url="https://bizhealth.ai/blog/chasing-sales-not-profits"
      />
      
      <GlobalNavigation />
      
      <BlogHeroSection
        title="Why Small Businesses Fail Chasing Sales, Instead of Pursuing Profits"
        author="BizHealth.ai Research Team"
        publishDate="January 19, 2026"
        readTime="14 min read"
        heroImage={heroImage}
        heroImageAlt="Stressed business owner examining financial reports showing high revenue but negative cash flow and declining profit margins"
        categories={[
          { label: "Business Strategy", href: "/blog/business-strategy" },
          { label: "Financial Management", href: "/blog/financial-management" },
          { label: "Operations", href: "/blog/operations" },
          { label: "Business Intelligence", href: "/blog/business-intelligence" },
        ]}
        shareDescription="Revenue is vanity. Profit is sanity. Cash is king. Learn why chasing sales could be killing your small business."
      />
      
      {/* Blog Content */}
      <article className="pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
            
            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">The Seductive Lie Every Small Business Owner Believes</h2>
              
              <p className="text-muted-foreground mb-6">
                You land a big deal. Sales spike 40%. Your inbox fills with excitement. "We're growing!" you tell your team. "Things are working!"
              </p>
              
              <p className="text-muted-foreground mb-6">
                But something feels off.
              </p>
              
              <p className="text-muted-foreground mb-6">
                Cash is tight. Your team is exhausted. The new customers are high-maintenance. The margins are thin. You're working 80 hours a week but your paycheck hasn't improved. And buried underneath the impressive revenue growth is a nagging question you're too busy to ask: <strong className="text-foreground">Is this actually making us more profitable?</strong>
              </p>
              
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  The Uncomfortable Truth
                </h3>
                <p className="text-muted-foreground mb-0">
                  <strong className="text-foreground">More sales don't equal more profit.</strong> In fact, for many small businesses, increased sales actually create exponentially more problems. You need more inventory. You need more staff. You need better systems. You need more cash upfront to finance the growth. And all these expenses hit before the revenue actually arrives. So you end up "growing" into a cash flow crisis.
                </p>
              </div>
              
              <p className="text-muted-foreground">
                You're chasing a mirage. And it's costing you more than you realize.
              </p>
            </section>
            
            {/* Revenue Vanity Problem */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">The Revenue Vanity Problem</h2>
              
              <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-8 mb-8 shadow-lg">
                <p className="text-white font-bold text-xl md:text-2xl mb-0 text-center italic">
                  "Revenue is vanity. Profit is sanity. Cash is king."
                </p>
              </div>
              
              <p className="text-muted-foreground mb-6">
                Revenue is the easiest number to see and celebrate. It's visible. It's impressive. You can post it on social media. You can tell investors. "We did $5M in revenue!" sounds incredible. But it tells you almost nothing about whether your business is actually healthy.
              </p>
              
              <p className="text-muted-foreground mb-6">
                <strong className="text-foreground">Revenue is how much money came in. Profit is how much you actually kept after paying all your expenses.</strong> And those two numbers can be shockingly different.
              </p>
              
              <p className="text-muted-foreground mb-8">
                A business can have record revenue and be on the verge of bankruptcy. It happens more often than you'd think. The business owner is busy, optimistic, growing—and simultaneously headed toward disaster.
              </p>
              
              <h3 className="text-2xl font-bold mb-6 text-foreground">Why Small Business Owners Obsess Over Revenue Instead of Profit</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white dark:bg-card border-2 border-primary/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/40">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary p-3 rounded-xl shadow-md">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-foreground">Revenue is Immediate</h4>
                  </div>
                  <p className="text-muted-foreground text-sm mb-0">
                    A new sale feels like a win. A growth spike feels like validation. Your ego enjoys it.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-card border-2 border-primary/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/40">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary p-3 rounded-xl shadow-md">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-foreground">Profit is Harder to Measure</h4>
                  </div>
                  <p className="text-muted-foreground text-sm mb-0">
                    You have to track costs, understand margins, do the math. Many owners don't know which products are profitable.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-card border-2 border-primary/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/40">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary p-3 rounded-xl shadow-md">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-foreground">Everyone Talks Growth</h4>
                  </div>
                  <p className="text-muted-foreground text-sm mb-0">
                    Investors, peers, industry benchmarks—they all emphasize "growth rates." Profitability feels secondary.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-card border-2 border-primary/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/40">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary p-3 rounded-xl shadow-md">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-foreground">"Busy" Feels Successful</h4>
                  </div>
                  <p className="text-muted-foreground text-sm mb-0">
                    Running around managing rapid growth feels productive. But you're not evaluating whether it's profitable.
                  </p>
                </div>
              </div>
              
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6">
                <p className="text-muted-foreground mb-0">
                  <strong className="text-foreground">The dangerous belief:</strong> "If we just grow big enough, everything will work out." But that's rarely how it works. A broken business model doesn't become profitable just because it gets bigger—it becomes a <strong className="text-foreground">bigger broken model</strong>.
                </p>
              </div>
            </section>

            {/* Hidden Cost Section */}
            <section className="mb-12 -mx-6 md:-mx-12 lg:-mx-20">
              <div className="bg-gradient-to-br from-primary via-primary/90 to-primary dark:from-primary dark:via-primary/90 dark:to-primary py-16 px-6 md:px-12 lg:px-20 rounded-2xl shadow-2xl">
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-white/20 p-3 rounded-xl shadow-lg">
                      <XCircle className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-0">The Hidden Cost of Unprofitable Growth</h2>
                  </div>
                  
                  <p className="text-white/90 mb-8 text-lg">
                    Let's make this concrete with two scenarios:
                  </p>
                  
                  {/* Scenario Comparison */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-xl border-l-4 border-destructive">
                      <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                        <XCircle className="w-5 h-5 text-destructive" />
                        Scenario 1: Revenue Growth Trap
                      </h3>
                      <ul className="text-muted-foreground space-y-2 mb-4">
                        <li className="flex items-center gap-2"><span className="w-2 h-2 bg-destructive rounded-full"></span>Revenue: $500K → $750K (+50%)</li>
                        <li className="flex items-center gap-2"><span className="w-2 h-2 bg-destructive rounded-full"></span>New customers need handholding</li>
                        <li className="flex items-center gap-2"><span className="w-2 h-2 bg-destructive rounded-full"></span>Margins are thin from discounts</li>
                        <li className="flex items-center gap-2"><span className="w-2 h-2 bg-destructive rounded-full"></span>Hired 2 new employees</li>
                      </ul>
                      <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
                        <p className="text-destructive font-bold text-lg mb-0">Profit: DOWN 10%</p>
                        <p className="text-muted-foreground text-sm mb-0">More hours, more stress, less money</p>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-xl border-l-4 border-[hsl(var(--biz-green))]">
                      <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-[hsl(var(--biz-green))]" />
                        Scenario 2: Profitable Growth
                      </h3>
                      <ul className="text-muted-foreground space-y-2 mb-4">
                        <li className="flex items-center gap-2"><span className="w-2 h-2 bg-[hsl(var(--biz-green))] rounded-full"></span>Revenue: Flat at $500K</li>
                        <li className="flex items-center gap-2"><span className="w-2 h-2 bg-[hsl(var(--biz-green))] rounded-full"></span>Focus on profitable customers</li>
                        <li className="flex items-center gap-2"><span className="w-2 h-2 bg-[hsl(var(--biz-green))] rounded-full"></span>Optimized onboarding systems</li>
                        <li className="flex items-center gap-2"><span className="w-2 h-2 bg-[hsl(var(--biz-green))] rounded-full"></span>Same team, better processes</li>
                      </ul>
                      <div className="bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/30 rounded-lg p-4">
                        <p className="text-[hsl(var(--biz-green))] font-bold text-lg mb-0">Profit: UP 40%</p>
                        <p className="text-muted-foreground text-sm mb-0">$100K → $140K with less stress</p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-white text-center text-xl font-bold">
                    Which would you rather have?
                  </p>
                </div>
              </div>
            </section>

            {/* Operational Toll */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">The Operational Toll of Unprofitable Growth</h2>
              
              <p className="text-muted-foreground mb-6">
                When you chase unprofitable sales, you create cascading problems:
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4 p-5 bg-white dark:bg-card border-l-4 border-destructive rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="bg-destructive/10 p-2 rounded-lg">
                    <Users className="w-6 h-6 text-destructive shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Team Burnout</h4>
                    <p className="text-muted-foreground text-sm mb-0">
                      Your people spend time on low-margin work that doesn't pay well. They feel the futility. Turnover increases. The best people leave.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-5 bg-white dark:bg-card border-l-4 border-destructive rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="bg-destructive/10 p-2 rounded-lg">
                    <Target className="w-6 h-6 text-destructive shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Quality Declines</h4>
                    <p className="text-muted-foreground text-sm mb-0">
                      You're stretched thin, serving too many customers with too few resources. Quality suffers. Customer satisfaction declines.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-5 bg-white dark:bg-card border-l-4 border-destructive rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="bg-destructive/10 p-2 rounded-lg">
                    <Zap className="w-6 h-6 text-destructive shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Complexity Explodes</h4>
                    <p className="text-muted-foreground text-sm mb-0">
                      Each new customer adds complexity. Systems that worked for $500K don't work for $750K. Complexity breeds chaos, and chaos breeds cost.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-5 bg-white dark:bg-card border-l-4 border-destructive rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="bg-destructive/10 p-2 rounded-lg">
                    <DollarSign className="w-6 h-6 text-destructive shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Cash Flow Crisis</h4>
                    <p className="text-muted-foreground text-sm mb-0">
                      This is the killer. You grow revenue but customers don't pay immediately. You're profitable on paper but can't make payroll.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-5 bg-white dark:bg-card border-l-4 border-destructive rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="bg-destructive/10 p-2 rounded-lg">
                    <Building2 className="w-6 h-6 text-destructive shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Inability to Invest</h4>
                    <p className="text-muted-foreground text-sm mb-0">
                      Because you're cash-constrained and margin-poor, you can't invest in better systems, tools, or training. You're constantly firefighting.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Profitability Reality Check */}
            <section className="mb-12 bg-gradient-to-br from-muted/50 to-muted/30 -mx-6 md:-mx-12 lg:-mx-20 px-6 md:px-12 lg:px-20 py-12 rounded-2xl">
              <h2 className="text-3xl font-bold mb-6 text-foreground">The Profitability Reality Check</h2>
              
              <p className="text-muted-foreground mb-6">
                Your business has three critical financial numbers, and they're not the same:
              </p>
              
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse border border-border rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border border-border px-6 py-4 text-left font-semibold text-foreground">Metric</th>
                      <th className="border border-border px-6 py-4 text-left font-semibold text-foreground">Definition</th>
                      <th className="border border-border px-6 py-4 text-left font-semibold text-foreground">Why It Matters</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border px-6 py-4 font-semibold text-foreground">Revenue</td>
                      <td className="border border-border px-6 py-4 text-muted-foreground">Total money coming in (top line)</td>
                      <td className="border border-border px-6 py-4 text-muted-foreground">Important, but only the beginning</td>
                    </tr>
                    <tr className="bg-muted/50">
                      <td className="border border-border px-6 py-4 font-semibold text-foreground">Profit</td>
                      <td className="border border-border px-6 py-4 text-muted-foreground">Revenue minus all expenses</td>
                      <td className="border border-border px-6 py-4 text-muted-foreground">What you actually keep—business health</td>
                    </tr>
                    <tr>
                      <td className="border border-border px-6 py-4 font-semibold text-foreground">Cash Flow</td>
                      <td className="border border-border px-6 py-4 text-muted-foreground">Timing of money in vs. out</td>
                      <td className="border border-border px-6 py-4 text-muted-foreground">Determines survival</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <h3 className="text-2xl font-bold mb-6 text-foreground">What You Should Actually Be Measuring</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/30 rounded-lg p-6">
                  <h4 className="font-bold text-foreground mb-2">Gross Profit Margin</h4>
                  <p className="text-muted-foreground text-sm mb-0">
                    Revenue minus direct costs (materials, labor to deliver). Tells you if your basic offering is viable.
                  </p>
                </div>
                
                <div className="bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/30 rounded-lg p-6">
                  <h4 className="font-bold text-foreground mb-2">Net Profit Margin</h4>
                  <p className="text-muted-foreground text-sm mb-0">
                    What's left after ALL expenses including overhead. Tells you if your business model works.
                  </p>
                </div>
                
                <div className="bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/30 rounded-lg p-6">
                  <h4 className="font-bold text-foreground mb-2">Customer Profitability</h4>
                  <p className="text-muted-foreground text-sm mb-0">
                    Which customers are actually profitable after accounting for support costs? You might be surprised.
                  </p>
                </div>
                
                <div className="bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/30 rounded-lg p-6">
                  <h4 className="font-bold text-foreground mb-2">Cash Conversion Cycle</h4>
                  <p className="text-muted-foreground text-sm mb-0">
                    How quickly you collect money after delivering. If you deliver in month 1 but collect in month 3, cash flow is critical.
                  </p>
                </div>
              </div>
            </section>

            {/* Big Sale Warning */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Why Your "Big Sale" Might Be Killing Your Business</h2>
              
              <p className="text-muted-foreground mb-6">
                You land the big contract. Your largest customer ever. Lots of revenue. But before you celebrate, ask yourself:
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-[hsl(var(--biz-green))]" />
                    Does this customer have positive unit economics?
                  </h4>
                  <p className="text-muted-foreground text-sm mb-0">
                    Calculate the real cost to serve them. Include direct costs plus overhead. If the profit is thin or negative, you're buying sales, not creating profit.
                  </p>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-6">
                  <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[hsl(var(--biz-green))]" />
                    How much time will this customer consume?
                  </h4>
                  <p className="text-muted-foreground text-sm mb-0">
                    High-maintenance customers with constant requests destroy profit margins. They consume management time and create stress.
                  </p>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-6">
                  <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[hsl(var(--biz-green))]" />
                    What does this customer require from operations?
                  </h4>
                  <p className="text-muted-foreground text-sm mb-0">
                    Some customers fit your existing system. Others require you to completely change how you operate. These disruptions cost money.
                  </p>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-6">
                  <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[hsl(var(--biz-green))]" />
                    Is this a one-time sale or repeatable revenue?
                  </h4>
                  <p className="text-muted-foreground text-sm mb-0">
                    A $100K contract requiring 100 hours of custom work that never repeats is worth $500/hour. A repeat customer at 20 hours is $5K/hour—much better.
                  </p>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-6">
                  <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <Users className="w-5 h-5 text-[hsl(var(--biz-green))]" />
                    What will this do to team morale?
                  </h4>
                  <p className="text-muted-foreground text-sm mb-0">
                    If delivering this contract burns out your team or damages your culture, the hidden cost is massive.
                  </p>
                </div>
              </div>
            </section>

            {/* Case for Cutting */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">The Case for Cutting Unprofitable Sales</h2>
              
              <p className="text-muted-foreground mb-6">
                This is where most small business owners get stuck: The courage to say no.
              </p>
              
              <p className="text-muted-foreground mb-6">
                You have customers who are unprofitable. You have products that eat resources without generating adequate margins. You know they're dragging the business down. But you can't bring yourself to discontinue them because:
              </p>
              
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>"We'll lose revenue"</li>
                <li>"What if we need that volume?"</li>
                <li>"They're established relationships"</li>
                <li>"It feels like failure"</li>
              </ul>
              
              <div className="bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/30 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-[hsl(var(--biz-green))]" />
                  The Reframe
                </h3>
                <p className="text-muted-foreground mb-0">
                  <strong className="text-foreground">Cutting unprofitable sales isn't losing revenue. It's making room for profitable revenue.</strong>
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h4 className="font-bold text-foreground mb-4">When You Cut Unprofitable Work, You Free Up:</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[hsl(var(--biz-green))] mt-1 shrink-0" />
                      <span>Team time and capacity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[hsl(var(--biz-green))] mt-1 shrink-0" />
                      <span>Management attention</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[hsl(var(--biz-green))] mt-1 shrink-0" />
                      <span>Inventory or operational resources</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[hsl(var(--biz-green))] mt-1 shrink-0" />
                      <span>Mental/emotional energy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[hsl(var(--biz-green))] mt-1 shrink-0" />
                      <span>Cash flow</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-6">
                  <h4 className="font-bold text-foreground mb-4">That Capacity Can Be Redeployed To:</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-[hsl(var(--biz-green))] mt-1 shrink-0" />
                      <span>Profitable products/services</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-[hsl(var(--biz-green))] mt-1 shrink-0" />
                      <span>Less demanding customers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-[hsl(var(--biz-green))] mt-1 shrink-0" />
                      <span>Quality improvements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-[hsl(var(--biz-green))] mt-1 shrink-0" />
                      <span>Systems investments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-[hsl(var(--biz-green))] mt-1 shrink-0" />
                      <span>Team development</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How to Pursue Profitable Sales */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">How to Pursue Profitable Sales (Not Just Revenue Growth)</h2>
              
              <p className="text-muted-foreground mb-8">
                The solution isn't to stop growing. It's to <strong className="text-foreground">grow profitably</strong>.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                    <span className="bg-[hsl(var(--biz-green))] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    Get Ruthlessly Clear About Profitability
                  </h3>
                  <p className="text-muted-foreground mb-0">
                    Calculate the real profit on every product, service, and customer. Not estimated profit—real profit based on actual cost data. Know your margins, your delivery costs, and which customers are money-makers vs. money-losers.
                  </p>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                    <span className="bg-[hsl(var(--biz-green))] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    Identify Your Profit Producers
                  </h3>
                  <p className="text-muted-foreground mb-0">
                    Who are your best customers? Which products have the healthiest margins? Which work fits your systems perfectly? These are your profit producers. They should get your best attention, resources, and thinking.
                  </p>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                    <span className="bg-[hsl(var(--biz-green))] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                    Stop Chasing Everything Else
                  </h3>
                  <p className="text-muted-foreground mb-0">
                    Be selective about what you pursue. Ask every new opportunity: "Is this as profitable as our current profit producers?" If it's less profitable and not strategic for long-term positioning, the answer should be no.
                  </p>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                    <span className="bg-[hsl(var(--biz-green))] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                    Improve Unit Economics of Profitable Offerings
                  </h3>
                  <p className="text-muted-foreground mb-0">
                    Instead of adding new products, get better at what works. Deliver faster, reduce waste, serve customers more efficiently. Often the highest ROI is making profitable offerings MORE profitable.
                  </p>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                    <span className="bg-[hsl(var(--biz-green))] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">5</span>
                    Build Cash Reserves
                  </h3>
                  <p className="text-muted-foreground mb-0">
                    Profitability means nothing if you don't have cash to operate. Build reserves equal to 3-6 months of operating expenses for stability and strategic flexibility.
                  </p>
                </div>
              </div>
            </section>

            {/* The Profit Mindset Shift */}
            <section className="mb-12 -mx-6 md:-mx-12 lg:-mx-20">
              <div className="bg-gradient-to-br from-[hsl(var(--biz-green))] via-[hsl(var(--biz-green))]/90 to-[hsl(var(--biz-green))] py-16 px-6 md:px-12 lg:px-20 rounded-2xl shadow-2xl">
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-white/20 p-3 rounded-xl shadow-lg">
                      <PiggyBank className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-0">The Profit Mindset Shift</h2>
                  </div>
                  
                  <p className="text-white/90 mb-8 text-lg">
                    This is ultimately a mindset shift. Many small business owners measure success by revenue and activity level. But what actually matters is <strong className="text-white">profitability and sustainability</strong>.
                  </p>
                  
                  <h3 className="text-xl font-bold text-white mb-6">Real Success Looks Like:</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                      <CheckCircle className="w-6 h-6 text-[hsl(var(--biz-green))] mb-3" />
                      <h4 className="font-bold text-primary mb-2">Reasonable Hours</h4>
                      <p className="text-muted-foreground text-sm mb-0">You work hard, but not 80+ hours a week</p>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                      <CheckCircle className="w-6 h-6 text-[hsl(var(--biz-green))] mb-3" />
                      <h4 className="font-bold text-primary mb-2">Healthy Profit Margins</h4>
                      <p className="text-muted-foreground text-sm mb-0">After all expenses, you're keeping adequate profit</p>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                      <CheckCircle className="w-6 h-6 text-[hsl(var(--biz-green))] mb-3" />
                      <h4 className="font-bold text-primary mb-2">Cash Reserves</h4>
                      <p className="text-muted-foreground text-sm mb-0">You have 3-6 months of operating expenses available</p>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                      <CheckCircle className="w-6 h-6 text-[hsl(var(--biz-green))] mb-3" />
                      <h4 className="font-bold text-primary mb-2">Sustainable Pace</h4>
                      <p className="text-muted-foreground text-sm mb-0">Your team can maintain current performance indefinitely</p>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                      <CheckCircle className="w-6 h-6 text-[hsl(var(--biz-green))] mb-3" />
                      <h4 className="font-bold text-primary mb-2">Profitable Customers</h4>
                      <p className="text-muted-foreground text-sm mb-0">Most of your business is with customers you enjoy serving</p>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                      <CheckCircle className="w-6 h-6 text-[hsl(var(--biz-green))] mb-3" />
                      <h4 className="font-bold text-primary mb-2">Growth That's Chosen</h4>
                      <p className="text-muted-foreground text-sm mb-0">You grow because you want to, not because you need to</p>
                    </div>
                  </div>
                  
                  <p className="text-white text-center text-lg">
                    That's a healthy business. It looks different from maximum-growth businesses, but it's <span className="text-white font-bold underline decoration-2 underline-offset-4">far more valuable</span>.
                  </p>
                </div>
              </div>
            </section>

            {/* Taking the First Step */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Taking the First Step</h2>
              
              <p className="text-muted-foreground mb-6">
                If this resonates, your first step is simple: <strong className="text-foreground">Get clear on actual profitability.</strong>
              </p>
              
              <p className="text-muted-foreground mb-6">
                Stop assuming. Measure. Calculate real profit margins by product and customer. Identify which offerings are actually dragging you down. Get honest about which customers are unprofitable.
              </p>
              
              <p className="text-muted-foreground mb-6">
                This audit usually takes a week if you have good financial records. The insights are worth months of strategic thinking.
              </p>
              
              <p className="text-muted-foreground mb-6">
                Once you see reality, you can make real decisions:
              </p>
              
              <ul className="list-disc list-inside text-muted-foreground mb-8 space-y-2">
                <li>Which offerings should you stop pursuing?</li>
                <li>Which customers should you serve differently?</li>
                <li>Where should you invest to improve margins?</li>
                <li>What pricing changes make sense?</li>
              </ul>
              
              <div className="bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/30 rounded-lg p-6 mb-8">
                <p className="text-muted-foreground mb-0">
                  Many small business owners find that a single profitability audit leads to decisions that <strong className="text-foreground">improve bottom-line profit by 15-25%</strong> without adding a single new customer. The irony: Sometimes the path to more profit is eliminating sales, not pursuing them.
                </p>
              </div>
            </section>

            {/* Business Health Assessment CTA */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">The Business Health Assessment</h2>
              
              <p className="text-muted-foreground mb-6">
                Understanding profitability dynamics across your entire business requires visibility into how revenue, costs, margins, cash flow, and operational efficiency interact across all your products, services, and customer segments. For many small business owners, this visibility is missing—hidden within complexity, legacy systems, and accumulated operational blind spots.
              </p>
              
              <p className="text-muted-foreground mb-6">
                Tools like <Link to="/how-it-works" className="text-[hsl(var(--biz-green))] hover:underline font-semibold">BizHealth.ai</Link> are instrumental in helping business owners identify these gaps systematically. A comprehensive business assessment across 12 critical areas—including financial performance, operational efficiency, customer profitability, pricing strategy, and cash flow management—surfaces exactly where profit is leaking from your business and where opportunities for margin improvement exist.
              </p>
              
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 text-center">
                <p className="text-foreground font-semibold text-lg mb-4">
                  The clarity comes first. The profitable growth follows.
                </p>
                <p className="text-muted-foreground mb-0">
                  Stop measuring your success by how busy you are. Stop confusing revenue with profit. <strong className="text-foreground">The most successful small businesses aren't the ones chasing maximum growth—they're the ones pursuing maximum profitability at sustainable levels.</strong>
                </p>
              </div>
            </section>
            
          </div>
        </div>
      </article>
      
      <GradientDivider />
      
      {/* Related Articles */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <RelatedArticles 
            articles={[
              {
                title: "Small Business Financials: Know Your Numbers, Know Your Business",
                slug: "small-business-financials-know-your-numbers",
                excerpt: "Master small business financial management. Learn to read income statements, balance sheets, cash flow, and key metrics that drive strategic decisions.",
                category: "Financial Management"
              },
              {
                title: "Cash Flow Crisis Management: Why 60% of Small Businesses Are Down",
                slug: "cash-flow-crisis-management",
                excerpt: "Discover how to fix your cash flow management before it's too late. Learn digital transformation strategies and proactive forecasting frameworks.",
                category: "Financial Management"
              },
              {
                title: "The Fractional CFO Toolkit: 7 Financial Dashboards Every SMB Needs",
                slug: "fractional-cfo-toolkit",
                excerpt: "Build the financial visibility system that fractional CFOs use to transform small business performance.",
                category: "Financial Management"
              }
            ]}
          />
        </div>
      </section>
      
      <GradientDivider />
      <GlobalFooter />
    </div>
  );
};

export default ChasingSalesNotProfits;
