import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import PromotionalBanner from "@/components/PromotionalBanner";
import BlogHeroSectionEnhanced from "@/components/BlogHeroSectionEnhanced";
import GradientDivider from "@/components/GradientDivider";
import RelatedArticles from "@/components/RelatedArticles";
import { Link } from "react-router-dom";
import { AlertTriangle, Target, CheckCircle, TrendingDown, DollarSign, Users, Lightbulb, ArrowRight, Building, ChevronRight, XCircle, BarChart3, RefreshCw, Phone, Mail, FileText, Clock } from "lucide-react";
import heroImage from "@/assets/images/unpredictable-sales-wing-it-approach-hero.jpg";

const UnpredictableSalesWingIt = () => {
  const publishDate = "February 5, 2025";
  const canonicalUrl = "https://bizhealth.ai/blog/unpredictable-sales-wing-it-approach";

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Unpredictable Sales: Why Winging It Kills Growth | BizHealth.ai"
        description="Your 'wing it' sales approach is costing you millions. Learn the 5 sales funnel stages, top 5 mistakes, and how to build repeatable systems for predictable revenue."
        keywords="sales funnel, sales process, small business sales, predictable revenue, sales pipeline, lead qualification, follow-up process, sales mistakes, sales systems, SMB growth, sales strategy 2025, repeatable sales process"
        canonical={canonicalUrl}
        ogImage="/og-images/og-unpredictable-sales-wing-it.jpg"
        ogType="article"
        articlePublishedTime="2025-02-05"
        articleAuthor="BizHealth.ai Research Team"
      />
      <StructuredData
        type="article"
        headline="Unpredictable Sales: Why Your 'Wing It' Sales Approach Is Killing Your Growth"
        description="Broken sales processes are the hidden growth killer for small and mid-size businesses. Learn how to build a repeatable sales funnel that transforms reactive firefighting into predictable, scalable growth."
        image={`https://bizhealth.ai${heroImage}`}
        datePublished="2025-02-05T00:00:00Z"
        author="BizHealth.ai Research Team"
        url={canonicalUrl}
        keywords={["sales funnel", "sales process", "small business sales", "predictable revenue", "sales pipeline", "lead qualification", "follow-up process", "sales systems"]}
      />

      <PromotionalBanner />
      <GlobalNavigation />

      <BlogHeroSectionEnhanced
        title="Unpredictable Sales: Why Your 'Wing It' Sales Approach Is Killing Your Growth"
        author="BizHealth.ai Research Team"
        publishDate={publishDate}
        readTime="12 min read"
        heroImage={heroImage}
        heroImageAlt="Business team reviewing sales performance dashboard with declining metrics - unpredictable sales approach challenges for SMBs"
        categories={[
          { label: "Business Strategy", href: "/blog/business-strategy" },
          { label: "Operations", href: "/blog/operations" },
          { label: "Growth & Scaling", href: "/blog/growth-scaling" },
        ]}
        shareDescription="Your 'wing it' sales approach is costing you millions. Learn the 5-stage sales funnel and top 5 mistakes killing your growth."
      />

      {/* Main Content */}
      <article className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto prose prose-lg">

          {/* The Sales Myth */}
          <h2 className="text-3xl font-bold mt-2 mb-6 text-foreground">
            The Sales Myth Every Small Business Owner Believes
          </h2>

          <blockquote className="border-l-4 border-[hsl(var(--biz-green))] bg-muted/50 p-6 rounded-r-xl my-6 not-italic">
            <p className="text-foreground/90 font-medium m-0">
              "My customers know they need me. I just need to show up, quote the job, and close the deal. Sales isn't complicated."
            </p>
          </blockquote>

          <p className="text-foreground/90 leading-relaxed">
            This is the comfortable lie that keeps small and mid-size businesses stuck at the same revenue year after year.
          </p>

          <p className="text-foreground/90 leading-relaxed">
            You think your product or service sells itself. You think good work leads to referrals. You think the only thing standing between you and more revenue is "more leads."
          </p>

          <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6 my-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
              <div>
                <p className="text-foreground font-medium m-0">
                  Here's the uncomfortable truth: <strong>Your sales process is broken.</strong> And it's not your fault.
                </p>
                <p className="text-foreground/80 mt-3 mb-0">
                  You've never been taught what a sales process actually is. You've never built a sales funnel. You've never had dedicated sales training or systems. You've been winging it since day one—and it's costing you millions in lost revenue.
                </p>
              </div>
            </div>
          </div>

          {/* What Is a Sales Funnel */}
          <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[hsl(var(--biz-green))]/10">
              <Target className="w-6 h-6 text-[hsl(var(--biz-green))]" />
            </div>
            What Is a Sales Funnel (And Why You Don't Have One)
          </h2>

          <p className="text-foreground/90 leading-relaxed">
            A sales funnel is a <strong>repeatable, documented process</strong> that takes a stranger who doesn't know you exist and turns them into a loyal, repeat customer.
          </p>

          <p className="text-foreground/90 leading-relaxed">
            It's not a metaphor. It's a literal sequence of steps, each with specific actions, outcomes, and metrics.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-4 text-foreground">The 5 Stages of a Sales Funnel</h3>

          <div className="space-y-4 my-6">
            <div className="bg-muted/50 border border-border rounded-xl p-5">
              <h4 className="text-lg font-bold text-foreground flex items-center gap-2 mb-2">
                <span className="bg-[hsl(var(--biz-green))] text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold">1</span>
                Awareness
              </h4>
              <p className="text-foreground/80 m-0">Someone becomes aware you exist (ad, referral, website, etc.)</p>
            </div>
            <div className="bg-muted/50 border border-border rounded-xl p-5">
              <h4 className="text-lg font-bold text-foreground flex items-center gap-2 mb-2">
                <span className="bg-[hsl(var(--biz-green))] text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold">2</span>
                Interest
              </h4>
              <p className="text-foreground/80 m-0">They engage with you (download, call, email, visit)</p>
            </div>
            <div className="bg-muted/50 border border-border rounded-xl p-5">
              <h4 className="text-lg font-bold text-foreground flex items-center gap-2 mb-2">
                <span className="bg-[hsl(var(--biz-green))] text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold">3</span>
                Consideration
              </h4>
              <p className="text-foreground/80 m-0">They evaluate your solution (proposal, demo, quote, consultation)</p>
            </div>
            <div className="bg-muted/50 border border-border rounded-xl p-5">
              <h4 className="text-lg font-bold text-foreground flex items-center gap-2 mb-2">
                <span className="bg-[hsl(var(--biz-green))] text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold">4</span>
                Decision
              </h4>
              <p className="text-foreground/80 m-0">They choose to buy (contract signed, payment made)</p>
            </div>
            <div className="bg-muted/50 border border-border rounded-xl p-5">
              <h4 className="text-lg font-bold text-foreground flex items-center gap-2 mb-2">
                <span className="bg-[hsl(var(--biz-green))] text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold">5</span>
                Retention
              </h4>
              <p className="text-foreground/80 m-0">They become repeat customers and refer others</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold mt-8 mb-4 text-foreground">What Most Small Businesses Have Instead</h3>

          <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6 my-6">
            <ul className="list-disc pl-6 space-y-2 text-foreground/80 m-0">
              <li>A website that generates sporadic leads</li>
              <li>A phone that rings occasionally</li>
              <li>A quote process that happens when someone asks</li>
              <li>A "close the deal" conversation that may or may not work</li>
              <li>Fingers crossed for referrals</li>
            </ul>
            <p className="text-destructive font-semibold mt-4 mb-0">This isn't a sales funnel. It's sales roulette.</p>
          </div>

          {/* Why Sales Systems Are Non-Negotiable */}
          <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[hsl(var(--biz-navy))]/10">
              <BarChart3 className="w-6 h-6 text-[hsl(var(--biz-navy))]" />
            </div>
            Why Sales Systems Are Non-Negotiable for Growth
          </h2>

          <div className="bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/30 rounded-xl p-6 my-6">
            <p className="text-foreground font-medium m-0">
              <strong>Fact:</strong> Every business that scales beyond $1-2 million has formalized sales processes. Without systems, your growth is limited by your personal capacity. With sales systems, your growth is limited only by market demand.
            </p>
          </div>

          <h3 className="text-2xl font-bold mt-8 mb-4 text-foreground">What Happens Without a Sales Funnel</h3>

          <div className="space-y-6 my-6">
            <div className="bg-muted/50 border border-border rounded-xl p-5">
              <h4 className="text-lg font-bold text-foreground flex items-center gap-2 mb-2">
                <TrendingDown className="w-5 h-5 text-destructive" />
                Revenue Is Unpredictable
              </h4>
              <p className="text-foreground/80 m-0">
                Some months you have too many leads and can't handle them all. Other months you have too few and scramble. Your cash flow is a rollercoaster. You can't hire confidently. You can't invest in growth.
              </p>
            </div>

            <div className="bg-muted/50 border border-border rounded-xl p-5">
              <h4 className="text-lg font-bold text-foreground flex items-center gap-2 mb-2">
                <XCircle className="w-5 h-5 text-destructive" />
                Opportunities Disappear
              </h4>
              <p className="text-foreground/80 m-0">
                Leads fall through the cracks. You forget to follow up. Prospects go silent. You lose deals to competitors who actually follow up. <strong>80% of sales require 5 follow-up calls after the meeting. 44% of salespeople give up after one follow-up.</strong> Guess who's winning those deals? Not you.
              </p>
            </div>

            <div className="bg-muted/50 border border-border rounded-xl p-5">
              <h4 className="text-lg font-bold text-foreground flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                You Can't Scale
              </h4>
              <p className="text-foreground/80 m-0">
                Your revenue is tied to your personal time. You can't delegate leads. You can't hire salespeople. You can't create repeatable processes. You're stuck as a solopreneur doing $250K-$500K/year instead of a business owner scaling to $5M.
              </p>
            </div>

            <div className="bg-muted/50 border border-border rounded-xl p-5">
              <h4 className="text-lg font-bold text-foreground flex items-center gap-2 mb-2">
                <RefreshCw className="w-5 h-5 text-destructive" />
                You're Reactive, Not Strategic
              </h4>
              <p className="text-foreground/80 m-0">
                You're chasing leads instead of attracting the right customers. You're quoting jobs instead of qualifying opportunities. You're closing deals instead of building relationships. You're firefighting instead of strategizing.
              </p>
            </div>
          </div>

          <p className="text-foreground/90 leading-relaxed font-semibold">
            The businesses that scale have sales funnels. The businesses that stay small don't.
          </p>

          {/* Top 5 Sales Mistakes */}
          <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/10">
              <XCircle className="w-6 h-6 text-destructive" />
            </div>
            The Top 5 Sales Mistakes Small Businesses Make
          </h2>

          {/* Mistake 1 */}
          <h3 className="text-2xl font-bold mt-8 mb-4 text-foreground">Mistake #1: Treating All Leads the Same</h3>

          <p className="text-foreground/90 leading-relaxed">
            <strong>The Problem:</strong> You treat every inquiry the same, regardless of fit. You spend time quoting jobs for customers who can't afford you. You chase leads that don't need what you offer. You waste time on prospects who will never buy.
          </p>

          <p className="text-foreground/90 leading-relaxed">
            <strong>Result:</strong> Low conversion rates, wasted time, frustration.
          </p>

          <div className="bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/30 rounded-xl p-6 my-6">
            <p className="text-foreground font-medium mb-3"><strong>The Fix:</strong> Build a qualification process. Ask questions that reveal:</p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80 m-0">
              <li>Do they have a problem you solve?</li>
              <li>Do they have a budget?</li>
              <li>Do they have authority to decide?</li>
              <li>Do they have a timeline?</li>
            </ul>
            <p className="text-foreground/80 mt-3 mb-0 font-semibold">Qualify ruthlessly. Your time is your most valuable asset.</p>
          </div>

          {/* Mistake 2 */}
          <h3 className="text-2xl font-bold mt-8 mb-4 text-foreground">Mistake #2: No Follow-Up Process</h3>

          <p className="text-foreground/90 leading-relaxed">
            <strong>The Problem:</strong> You send a quote and wait. If they don't respond, you move on. Prospects need multiple touchpoints. They need nurturing. They need reminders. They need to see value. <strong>You lose 80% of deals because you don't follow up.</strong>
          </p>

          <div className="bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/30 rounded-xl p-6 my-6">
            <p className="text-foreground font-medium mb-3"><strong>The Fix:</strong> Create a documented follow-up sequence:</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-foreground/80">
                <Clock className="w-4 h-4 text-[hsl(var(--biz-green))] flex-shrink-0" />
                <span><strong>Day 3:</strong> Email recapping value and next steps</span>
              </div>
              <div className="flex items-center gap-3 text-foreground/80">
                <Phone className="w-4 h-4 text-[hsl(var(--biz-green))] flex-shrink-0" />
                <span><strong>Day 7:</strong> Phone call asking for questions/concerns</span>
              </div>
              <div className="flex items-center gap-3 text-foreground/80">
                <FileText className="w-4 h-4 text-[hsl(var(--biz-green))] flex-shrink-0" />
                <span><strong>Day 14:</strong> Case study or testimonial relevant to their situation</span>
              </div>
              <div className="flex items-center gap-3 text-foreground/80">
                <Mail className="w-4 h-4 text-[hsl(var(--biz-green))] flex-shrink-0" />
                <span><strong>Day 30:</strong> Final value-add (guide, checklist, etc.) + close</span>
              </div>
            </div>
            <p className="text-foreground/80 mt-3 mb-0 font-semibold">Follow up until they say "no" or buy.</p>
          </div>

          {/* Mistake 3 */}
          <h3 className="text-2xl font-bold mt-8 mb-4 text-foreground">Mistake #3: Selling Features Instead of Solving Problems</h3>

          <p className="text-foreground/90 leading-relaxed">
            <strong>The Problem:</strong> You talk about what you do instead of what problem you solve.
          </p>

          <p className="text-foreground/90 leading-relaxed">
            <em>Example:</em> "We install HVAC systems" instead of "We fix your uncomfortable home so you can enjoy it regardless of weather."
          </p>

          <div className="bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/30 rounded-xl p-6 my-6">
            <p className="text-foreground font-medium mb-3"><strong>The Fix:</strong> Lead with their problem:</p>
            <ol className="list-decimal pl-6 space-y-2 text-foreground/80 m-0">
              <li>"Are you frustrated that your home is too hot/cold and your current system can't keep up?"</li>
              <li>"That discomfort costs you $200/month in energy and affects your family's quality of life."</li>
              <li>"We solve that with [your solution] so you have perfect temperature control."</li>
            </ol>
            <p className="text-foreground/80 mt-3 mb-0 font-semibold">Sell the transformation, not the product.</p>
          </div>

          {/* Mistake 4 */}
          <h3 className="text-2xl font-bold mt-8 mb-4 text-foreground">Mistake #4: No Sales Pipeline Visibility</h3>

          <p className="text-foreground/90 leading-relaxed">
            <strong>The Problem:</strong> You don't know where your deals are in the buying process. You're surprised by lost deals. You can't forecast revenue. You can't prioritize your time.
          </p>

          <div className="bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/30 rounded-xl p-6 my-6">
            <p className="text-foreground font-medium mb-3"><strong>The Fix:</strong> Create a simple sales pipeline:</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse my-3">
                <thead>
                  <tr className="bg-[hsl(var(--biz-navy))]/10">
                    <th className="border border-border p-3 text-left text-foreground font-semibold">Leads</th>
                    <th className="border border-border p-3 text-left text-foreground font-semibold">Qualified</th>
                    <th className="border border-border p-3 text-left text-foreground font-semibold">Proposal</th>
                    <th className="border border-border p-3 text-left text-foreground font-semibold">Negotiation</th>
                    <th className="border border-border p-3 text-left text-foreground font-semibold">Closed Won/Lost</th>
                  </tr>
                </thead>
              </table>
            </div>
            <p className="text-foreground/80 mt-3 mb-0">Track every deal in every stage. Review weekly. Know your conversion rates at each stage. <strong>Forecast revenue based on pipeline, not hope.</strong></p>
          </div>

          {/* Mistake 5 */}
          <h3 className="text-2xl font-bold mt-8 mb-4 text-foreground">Mistake #5: No Referral or Repeat Business System</h3>

          <p className="text-foreground/90 leading-relaxed">
            <strong>The Problem:</strong> You hope for referrals. You assume repeat business happens naturally. Reality: Referrals and repeat business are the highest ROI revenue source. But they don't happen automatically.
          </p>

          <div className="bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/30 rounded-xl p-6 my-6">
            <p className="text-foreground font-medium mb-3"><strong>The Fix:</strong> Create systematic processes:</p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80 m-0">
              <li><strong>Referral system:</strong> "Who else in your network would benefit from [result we achieved]?"</li>
              <li><strong>Repeat business system:</strong> "Here's what we recommend for [next phase/next year/next season]."</li>
              <li><strong>Customer success check-ins:</strong> Quarterly calls to ensure satisfaction and uncover additional needs</li>
            </ul>
            <p className="text-foreground/80 mt-3 mb-0 font-semibold">Your best customers are your salesforce. Activate them systematically.</p>
          </div>

          {/* What a Working Sales Funnel Looks Like */}
          <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[hsl(var(--biz-green))]/10">
              <CheckCircle className="w-6 h-6 text-[hsl(var(--biz-green))]" />
            </div>
            What a Working Sales Funnel Looks Like
          </h2>

          <div className="space-y-6 my-6">
            <div className="bg-muted/50 border border-border rounded-xl p-5">
              <h4 className="text-lg font-bold text-foreground mb-3">Stage 1: Lead Generation (Awareness)</h4>
              <ul className="list-disc pl-6 space-y-1 text-foreground/80 m-0">
                <li>Website with clear value proposition</li>
                <li>Google Ads targeting your ideal customer</li>
                <li>Referrals from existing customers</li>
                <li>Content marketing (guides, checklists)</li>
                <li>Networking/partnerships</li>
              </ul>
            </div>

            <div className="bg-muted/50 border border-border rounded-xl p-5">
              <h4 className="text-lg font-bold text-foreground mb-3">Stage 2: Lead Qualification (Interest)</h4>
              <ul className="list-disc pl-6 space-y-1 text-foreground/80 m-0">
                <li>Phone call or form asking qualifying questions</li>
                <li>Score leads based on fit (budget, authority, need, timeline)</li>
                <li>Nurture unqualified leads for future</li>
              </ul>
            </div>

            <div className="bg-muted/50 border border-border rounded-xl p-5">
              <h4 className="text-lg font-bold text-foreground mb-3">Stage 3: Needs Assessment (Consideration)</h4>
              <ul className="list-disc pl-6 space-y-1 text-foreground/80 m-0">
                <li>Discovery call to understand their specific problem</li>
                <li>Present tailored solution</li>
                <li>Handle objections</li>
                <li>Build value</li>
              </ul>
            </div>

            <div className="bg-muted/50 border border-border rounded-xl p-5">
              <h4 className="text-lg font-bold text-foreground mb-3">Stage 4: Proposal & Close (Decision)</h4>
              <ul className="list-disc pl-6 space-y-1 text-foreground/80 m-0">
                <li>Formal proposal with clear pricing, terms, value</li>
                <li>Follow-up sequence</li>
                <li>Address final objections</li>
                <li>Ask for the business</li>
              </ul>
            </div>

            <div className="bg-muted/50 border border-border rounded-xl p-5">
              <h4 className="text-lg font-bold text-foreground mb-3">Stage 5: Delivery & Retention</h4>
              <ul className="list-disc pl-6 space-y-1 text-foreground/80 m-0">
                <li>Onboard successfully</li>
                <li>Deliver exceptional results</li>
                <li>Ask for testimonials/referrals</li>
                <li>Plan for repeat business</li>
              </ul>
            </div>
          </div>

          <p className="text-foreground/90 leading-relaxed">
            Each stage has defined actions, expected outcomes, success metrics, and follow-up processes. <strong>This is repeatable. Scalable. Predictable.</strong>
          </p>

          {/* The Real Cost of Winging It */}
          <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/10">
              <DollarSign className="w-6 h-6 text-destructive" />
            </div>
            The Real Cost of "Winging It"
          </h2>

          <div className="space-y-4 my-6">
            <div className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-destructive flex-shrink-0 mt-1" />
              <p className="text-foreground/90 m-0"><strong>Lost Revenue:</strong> Every unqualified lead you chase costs time. Every missed follow-up costs a deal. Every month without pipeline visibility costs forecasting accuracy.</p>
            </div>
            <div className="flex items-start gap-3">
              <TrendingDown className="w-5 h-5 text-destructive flex-shrink-0 mt-1" />
              <p className="text-foreground/90 m-0"><strong>Opportunity Cost:</strong> Time spent chasing bad leads is time not spent on good ones. Time spent firefighting is time not spent on strategy.</p>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-1" />
              <p className="text-foreground/90 m-0"><strong>Scalability Ceiling:</strong> You can't hire salespeople without a process. You can't delegate leads without systems. You can't grow revenue without repeatable sales.</p>
            </div>
            <div className="flex items-start gap-3">
              <RefreshCw className="w-5 h-5 text-destructive flex-shrink-0 mt-1" />
              <p className="text-foreground/90 m-0"><strong>Cash Flow Chaos:</strong> Unpredictable revenue means unpredictable cash flow. You can't plan. You can't invest. You're always reacting.</p>
            </div>
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-destructive flex-shrink-0 mt-1" />
              <p className="text-foreground/90 m-0"><strong>Personal Burnout:</strong> Constant firefighting is exhausting. You're always "on." No systems means no boundaries.</p>
            </div>
          </div>

          <p className="text-foreground/90 leading-relaxed">
            The alternative? A business where sales happens systematically. Where revenue is predictable. Where you can delegate. Where you can focus on strategy instead of survival.
          </p>

          {/* The Transformation */}
          <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[hsl(var(--biz-green))]/10">
              <Lightbulb className="w-6 h-6 text-[hsl(var(--biz-green))]" />
            </div>
            The Transformation
          </h2>

          <div className="grid md:grid-cols-2 gap-6 my-6">
            <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-foreground mb-3">Before</h4>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80 m-0">
                <li>Reactive, unpredictable revenue</li>
                <li>Constant firefighting</li>
                <li>Personal time tied to sales</li>
                <li>Growth capped by your capacity</li>
              </ul>
            </div>
            <div className="bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-foreground mb-3">After</h4>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80 m-0">
                <li>Predictable pipeline</li>
                <li>Repeatable process</li>
                <li>Delegatable system</li>
                <li>Strategic focus & scalable growth</li>
              </ul>
            </div>
          </div>

          <p className="text-foreground/90 leading-relaxed font-semibold text-lg">
            The businesses that scale have sales funnels. The businesses that stay small don't.
          </p>

          <p className="text-foreground/90 leading-relaxed">
            You have a choice: continue winging it and stay stuck, or build systems and scale. The choice is yours. But the consequences are real.
          </p>

          {/* Summary Box */}
          <div className="bg-muted border border-border rounded-xl p-6 my-8">
            <h3 className="text-xl font-bold text-foreground mb-3">Key Takeaways</h3>
            <p className="text-foreground/80 m-0">
              Broken sales processes are the hidden growth killer for small and mid-size businesses. Without formalized sales funnels, qualification, follow-up systems, pipeline visibility, and retention processes, revenue remains unpredictable, opportunities disappear, and growth stalls. The top 5 mistakes—no qualification, no follow-up, selling features not problems, no pipeline tracking, and no referral systems—cost businesses millions in lost revenue. A structured <Link to="/blog/feast-or-famine-cycle-small-business" className="text-primary hover:text-primary/80 underline">sales funnel transforms reactive firefighting</Link> into predictable, scalable growth.
            </p>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-[hsl(var(--biz-navy))] to-[hsl(var(--biz-navy))]/90 rounded-2xl p-8 my-10 text-white">
            <div className="flex items-start gap-4">
              <Building className="w-10 h-10 text-[hsl(var(--biz-green))] flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-3">Identify Where Your Sales Process Is Broken</h3>
                <p className="text-white/80 mb-4">
                  Comprehensive business health assessments—tools like <Link to="/" className="text-[hsl(var(--biz-green))] hover:underline">BizHealth.ai</Link>—can help you identify exactly where your sales process is broken, which fixes will have the highest revenue impact, and how to build the systematic sales discipline that separates growing businesses from stalled ones.
                </p>
                <Link 
                  to="/pricing" 
                  className="inline-flex items-center gap-2 bg-[hsl(var(--biz-green))] hover:bg-[hsl(var(--biz-green))]/90 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Get Your Business Health Assessment
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Author byline */}
          <div className="border-t border-border pt-6 mt-10">
            <p className="text-sm text-muted-foreground">
              <strong>About the Author:</strong> The BizHealth.ai Research Team combines decades of experience in business operations, sales strategy, and growth consulting for small and mid-size businesses. Their insights are grounded in real-world data from hundreds of business health assessments.
            </p>
          </div>

        </div>
      </article>

      {/* Related Articles */}
      <RelatedArticles 
        articles={[
          {
            title: "The Feast-or-Famine Cycle: Why Your Small Business Revenue Is a Rollercoaster",
            slug: "/blog/feast-or-famine-cycle-small-business",
            excerpt: "Learn why revenue swings are killing your growth and how to break the feast-or-famine cycle.",
            category: "Business Strategy"
          },
          {
            title: "The Growth Trap: Is Your Business Model Broken?",
            slug: "/blog/growth-trap-broken-business-model",
            excerpt: "More revenue doesn't always mean more profit. Discover if your growth is actually a trap.",
            category: "Growth & Scaling"
          },
          {
            title: "Cash Flow Crisis Management: A Practical Guide",
            slug: "/blog/cash-flow-crisis-management",
            excerpt: "When cash flow becomes unpredictable, here's your survival playbook.",
            category: "Financial Management"
          }
        ]}
      />

      <GradientDivider />
      <GlobalFooter />
    </div>
  );
};

export default UnpredictableSalesWingIt;
