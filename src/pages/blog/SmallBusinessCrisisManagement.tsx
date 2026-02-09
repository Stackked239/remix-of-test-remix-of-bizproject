import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import PromotionalBanner from "@/components/PromotionalBanner";
import BlogHeroSectionEnhanced from "@/components/BlogHeroSectionEnhanced";
import GradientDivider from "@/components/GradientDivider";
import RelatedArticles from "@/components/RelatedArticles";
import { Link } from "react-router-dom";
import { AlertTriangle, Target, CheckCircle, Shield, Clock, Users, DollarSign, ArrowRight, MessageSquare, Brain, Lightbulb, BarChart3, Heart, XCircle, Zap, Eye, Pause } from "lucide-react";
import heroImage from "@/assets/images/small-business-crisis-management-hero.jpg";

const SmallBusinessCrisisManagement = () => {
  const publishDate = "February 9, 2026";
  const canonicalUrl = "https://bizhealth.ai/blog/small-business-crisis-management";

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Small Business Crisis Management: 7 Steps to Stay Calm | BizHealth.ai"
        description="Master the 7-step crisis response framework that turns panic into power. Learn proven strategies for small business survival when disaster strikes—act fast, stay calm."
        keywords="small business crisis management, crisis response framework, business disaster recovery, crisis leadership, business survival strategies, cash flow crisis, operational crisis, personnel crisis, crisis communication, business continuity planning 2026"
        canonical={canonicalUrl}
        ogImage="/og-images/og-small-business-crisis-management.jpg"
        ogType="article"
        articlePublishedTime="2026-02-09"
        articleAuthor="BizHealth.ai Research Team"
      />
      <StructuredData
        type="article"
        headline="Small Business Crisis Management: 7 Proven Steps to Stay Calm When Disaster Strikes"
        description="Master the 7-step crisis response framework that turns panic into power. Learn proven strategies for small business survival when disaster strikes."
        image={`https://bizhealth.ai${heroImage}`}
        datePublished="2026-02-09T00:00:00Z"
        author="BizHealth.ai Research Team"
        url={canonicalUrl}
      />

      <PromotionalBanner />
      <GlobalNavigation />

      <BlogHeroSectionEnhanced
        title="Small Business Crisis Management: 7 Proven Steps to Stay Calm When Disaster Strikes"
        author="BizHealth.ai Research Team"
        publishDate={publishDate}
        readTime="10 min read"
        heroImage={heroImage}
        heroImageAlt="Small business owner confidently leading team through crisis action plan in workshop environment - crisis management leadership"
        categories={[
          { label: "Business Leadership", href: "/blog/business-leadership" },
          { label: "Operations", href: "/blog/operations" },
          { label: "Risk Management", href: "/blog/risk-management" },
          { label: "Growth & Scaling", href: "/blog/growth-scaling" },
        ]}
        shareDescription="Master the 7-step crisis response framework that turns panic into power for small business owners."
      />

      {/* Main Content */}
      <article className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto prose prose-lg">

          {/* The Crisis Every Business Owner Fears */}
          <h2 className="text-3xl font-bold mt-2 mb-6 text-foreground">
            The Crisis Every Business Owner Fears — And How to Conquer It
          </h2>

          <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6 mb-8">
            <p className="text-foreground/90 leading-relaxed text-lg mb-3">
              Your biggest customer just canceled their contract. Your key employee quit without notice. Your storefront flooded overnight. Revenue dropped 60% in one month. A competitor undercuts you by 40%.
            </p>
            <p className="text-foreground/90 leading-relaxed text-lg font-semibold italic mb-0">
              Your heart races. Your stomach drops. Panic sets in.
            </p>
          </div>

          <p className="text-foreground/90 leading-relaxed text-lg font-semibold">
            This is the moment that separates businesses that survive from businesses that perish.
          </p>

          <p className="text-foreground/90 leading-relaxed">
            <strong>Panic doesn't solve crises. It creates them.</strong>
          </p>

          <p className="text-foreground/90 leading-relaxed">
            The businesses that thrive through crises don't have fewer problems. They <strong>respond better</strong>.
          </p>

          <p className="text-foreground/90 leading-relaxed font-semibold text-lg">
            This article gives you the 7-step crisis response framework that turns panic into power.
          </p>

          {/* Crisis Truth #1 */}
          <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">
            Crisis Truth #1: Your Reaction Determines Survival
          </h2>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
            <p className="text-foreground/90 leading-relaxed font-semibold mb-0">
              <strong>Fact:</strong> Most small business crises are survivable. The business-killing factor is <em>owner reaction</em>.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Panic Response */}
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-destructive" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-0">Panic Response</h3>
              </div>
              <ul className="space-y-2 text-foreground/90 list-disc pl-5 mb-0">
                <li>Reactive decisions</li>
                <li>Blame and chaos</li>
                <li>Customer alienation</li>
                <li>Team disengagement</li>
                <li>Business collapse</li>
              </ul>
            </div>

            {/* Calm Response */}
            <div className="bg-[hsl(var(--biz-green))]/5 border border-[hsl(var(--biz-green))]/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[hsl(var(--biz-green))]/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-[hsl(var(--biz-green))]" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-0">Calm Response</h3>
              </div>
              <ul className="space-y-2 text-foreground/90 list-disc pl-5 mb-0">
                <li>Strategic assessment</li>
                <li>Team alignment</li>
                <li>Customer communication</li>
                <li>Focused action</li>
                <li>Business preservation</li>
              </ul>
            </div>
          </div>

          <p className="text-foreground/90 leading-relaxed font-semibold text-lg">
            Your first job in crisis: <em>control your reaction</em>.
          </p>

          {/* The 7-Step Crisis Response Framework */}
          <h2 className="text-3xl font-bold mt-12 mb-8 text-foreground">
            The 7-Step Crisis Response Framework
          </h2>

          {/* Step 1 */}
          <div className="bg-biz-blue-faint/50 border-l-4 border-l-primary border border-primary/20 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/15 rounded-xl flex items-center justify-center shadow-sm">
                <Pause className="w-6 h-6 text-primary" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Step 1</span>
                <h3 className="text-xl font-bold text-foreground mb-0">Breathe. Get Calm.</h3>
                <span className="text-sm text-muted-foreground">[3 Minutes]</span>
              </div>
            </div>
            <p className="text-foreground/90 leading-relaxed mb-4">
              You can't think clearly when your amygdala is hijacking your brain.
            </p>
            <p className="text-foreground/90 leading-relaxed font-semibold mb-3">Do this immediately:</p>
            <ol className="space-y-2 text-foreground/90 list-decimal pl-6 mb-4">
              <li>Close your office door (or step outside)</li>
              <li><strong>Box breathing:</strong> 4 seconds in, 4 hold, 4 out, 4 hold. Repeat 5x</li>
              <li>Write the worst-case scenario on paper (forces objectivity)</li>
              <li>Ask yourself: <em>"Will this matter in 12 months?"</em></li>
            </ol>
            <div className="bg-[hsl(var(--biz-green))]/5 border border-[hsl(var(--biz-green))]/20 rounded-lg p-4">
              <p className="text-foreground/90 mb-0 font-semibold">
                <strong>Result:</strong> Frontal cortex back online. Rational thinking restored.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-amber-500/5 border-l-4 border-l-amber-500 border border-amber-500/20 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-amber-500/15 rounded-xl flex items-center justify-center shadow-sm">
                <Eye className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">Step 2</span>
                <h3 className="text-xl font-bold text-foreground mb-0">Assess the Damage Objectively</h3>
                <span className="text-sm text-muted-foreground">[15 Minutes]</span>
              </div>
            </div>
            <p className="text-foreground/90 leading-relaxed mb-4">
              <strong>Gather facts. No speculation.</strong>
            </p>
            <p className="text-foreground/90 leading-relaxed font-semibold mb-3">Create your Crisis Assessment Sheet:</p>
            <ol className="space-y-2 text-foreground/90 list-decimal pl-6 mb-4">
              <li>What exactly happened? (facts only)</li>
              <li>What do we know for sure?</li>
              <li>What do we NOT know?</li>
              <li>Who is impacted? (employees, customers, vendors)</li>
              <li>What are the immediate financial impacts?</li>
              <li>What are the likely short-term consequences?</li>
            </ol>
            <p className="text-foreground/90 leading-relaxed mb-0">
              Interview key people calmly. Get their input. <strong>No blame.</strong>
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[hsl(var(--biz-green))]/5 border-l-4 border-l-biz-green border border-[hsl(var(--biz-green))]/20 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[hsl(var(--biz-green))]/15 rounded-xl flex items-center justify-center shadow-sm">
                <Shield className="w-6 h-6 text-[hsl(var(--biz-green))]" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[hsl(var(--biz-green))]">Step 3</span>
                <h3 className="text-xl font-bold text-foreground mb-0">Secure the Business</h3>
                <span className="text-sm text-muted-foreground">[1 Hour]</span>
              </div>
            </div>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Protect cash flow, operations, and reputation <strong>FIRST</strong>.
            </p>
            <p className="text-foreground/90 leading-relaxed font-semibold mb-3">Immediate actions:</p>
            <ul className="space-y-2 text-foreground/90 list-disc pl-6 mb-4">
              <li><strong>Cash:</strong> Review 90-day runway. Cut non-essential spend immediately</li>
              <li><strong>Customers:</strong> Communicate transparently</li>
              <li><strong>Employees:</strong> Brief team calmly, no panic</li>
              <li><strong>Vendors:</strong> Prioritize payments strategically</li>
              <li><strong>Operations:</strong> Ensure core delivery continues</li>
            </ul>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <p className="text-foreground/90 mb-0 font-semibold">Your goal: Stabilize before solving.</p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-purple-500/5 border-l-4 border-l-purple-500 border border-purple-500/20 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-500/15 rounded-xl flex items-center justify-center shadow-sm">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">Step 4</span>
                <h3 className="text-xl font-bold text-foreground mb-0">Assemble Your Crisis Council</h3>
                <span className="text-sm text-muted-foreground">[30 Minutes]</span>
              </div>
            </div>
            <p className="text-foreground/90 leading-relaxed mb-4">
              You need <strong>trusted advisors</strong>, not yes-men.
            </p>
            <p className="text-foreground/90 leading-relaxed font-semibold mb-3">Your 3-5 person council:</p>
            <ul className="space-y-2 text-foreground/90 list-disc pl-6 mb-4">
              <li><strong>Internal:</strong> Your most level-headed key employee</li>
              <li><strong>External:</strong> Accountant/bookkeeper (cash reality check)</li>
              <li><strong>External:</strong> Trusted peer/business owner (objective perspective)</li>
              <li><strong>Optional:</strong> Industry expert or mentor</li>
            </ul>
            <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
              <p className="text-foreground/90 mb-0 font-semibold">
                Rule: Diverse viewpoints. No drama queens. Solutions only.
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-biz-gold/5 border-l-4 border-l-biz-gold border border-biz-gold/20 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-biz-gold/15 rounded-xl flex items-center justify-center shadow-sm">
                <Lightbulb className="w-6 h-6 text-biz-gold" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-biz-gold">Step 5</span>
                <h3 className="text-xl font-bold text-foreground mb-0">Generate Solutions Rapidly</h3>
                <span className="text-sm text-muted-foreground">[1 Hour]</span>
              </div>
            </div>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Brainstorm every possible solution. <strong>No judgment.</strong>
            </p>
            <p className="text-foreground/90 leading-relaxed font-semibold mb-3">Solution categories:</p>
            <ol className="space-y-2 text-foreground/90 list-decimal pl-6 mb-4">
              <li><strong>Revenue generation</strong> (new sales, pricing, services)</li>
              <li><strong>Cost reduction</strong> (immediate cuts, negotiations)</li>
              <li><strong>Customer retention</strong> (communication, service)</li>
              <li><strong>Operational efficiency</strong> (processes, staffing)</li>
              <li><strong>Financing</strong> (lines of credit, investors, loans)</li>
            </ol>
            <p className="text-foreground/90 leading-relaxed mb-4">
              For each solution: <strong>Feasibility (1-10), Impact (1-10), Timeline (days/weeks)</strong>
            </p>
            <div className="bg-[hsl(var(--biz-green))]/5 border border-[hsl(var(--biz-green))]/20 rounded-lg p-4">
              <p className="text-foreground/90 mb-0 font-semibold">Pick top 3 highest Impact/Feasibility.</p>
            </div>
          </div>

          {/* Step 6 */}
          <div className="bg-biz-teal/5 border-l-4 border-l-biz-teal border border-biz-teal/20 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-biz-teal/15 rounded-xl flex items-center justify-center shadow-sm">
                <MessageSquare className="w-6 h-6 text-biz-teal" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-biz-teal">Step 6</span>
                <h3 className="text-xl font-bold text-foreground mb-0">Communicate Ruthlessly</h3>
                <span className="text-sm text-muted-foreground">[2 Hours]</span>
              </div>
            </div>
            <p className="text-foreground/90 leading-relaxed mb-4">
              <strong>Poor communication kills more businesses than the crisis itself.</strong>
            </p>
            <p className="text-foreground/90 leading-relaxed font-semibold mb-3">Customer communication template:</p>
            <ol className="space-y-2 text-foreground/90 list-decimal pl-6 mb-4">
              <li>Acknowledge the issue honestly</li>
              <li>State what you're doing about it</li>
              <li>Reaffirm your commitment</li>
              <li>Give realistic next steps/timeline</li>
            </ol>
            <div className="bg-muted/50 border border-border rounded-lg p-4 mb-4 italic">
              <p className="text-foreground/80 mb-0">
                <strong>Example:</strong> "Our production partner experienced a delay. We're working around the clock with alternatives. Your order ships by Friday. We value your business and apologize for the inconvenience."
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <p className="font-semibold text-foreground text-sm mb-1">Internal team:</p>
                <p className="text-foreground/80 text-sm mb-0">Daily 15-minute huddles. Clear roles. No surprises.</p>
              </div>
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <p className="font-semibold text-foreground text-sm mb-1">External stakeholders:</p>
                <p className="text-foreground/80 text-sm mb-0">Brief, factual updates. Underpromise, overdeliver.</p>
              </div>
            </div>
          </div>

          {/* Step 7 */}
          <div className="bg-biz-teal/5 border-l-4 border-l-biz-teal border border-biz-teal/20 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-biz-teal/15 rounded-xl flex items-center justify-center shadow-sm">
                <Zap className="w-6 h-6 text-biz-teal" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-biz-teal">Step 7</span>
                <h3 className="text-xl font-bold text-foreground mb-0">Execute, Measure, Adjust</h3>
                <span className="text-sm text-muted-foreground">[Ongoing]</span>
              </div>
            </div>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Implement your top 3 solutions <strong>immediately</strong>.
            </p>
            <p className="text-foreground/90 leading-relaxed font-semibold mb-3">Daily execution rhythm:</p>
            <ul className="space-y-2 text-foreground/90 list-disc pl-6 mb-6">
              <li><strong>Morning 15-min huddle:</strong> Progress? Blockers?</li>
              <li><strong>Midday:</strong> Cash check-in</li>
              <li><strong>Evening:</strong> Tomorrow's priorities</li>
            </ul>
            <p className="text-foreground/90 leading-relaxed font-semibold mb-3">Weekly crisis council:</p>
            <p className="text-foreground/90 leading-relaxed mb-6">What's working? What's not? Pivot.</p>
            <p className="text-foreground/90 leading-relaxed font-semibold mb-3">Criteria to exit crisis mode:</p>
            <ul className="space-y-2 text-foreground/90 list-disc pl-6 mb-0">
              <li>Cash runway &gt;90 days</li>
              <li>Revenue stabilizing/growing</li>
              <li>Team morale restored</li>
              <li>Customer confidence returning</li>
            </ul>
          </div>

          {/* The 3 Crisis Killers */}
          <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">
            The 3 Crisis Killers — Avoid At All Costs
          </h2>

          <div className="space-y-6 mb-8">
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-0">
                  <span className="text-destructive">Killer #1:</span> Emotional Contagion
                </h3>
              </div>
              <div className="space-y-2 text-foreground/90">
                <p><strong>Symptoms:</strong> Yelling at employees, public panic, blaming others</p>
                <p><strong>Result:</strong> Team disengages. Customers flee. Problems compound</p>
                <p className="mb-0"><strong>Antidote:</strong> Private emotion processing. Public calm leadership</p>
              </div>
            </div>

            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-0">
                  <span className="text-destructive">Killer #2:</span> Information Vacuum
                </h3>
              </div>
              <div className="space-y-2 text-foreground/90">
                <p><strong>Symptoms:</strong> No communication to stakeholders</p>
                <p><strong>Result:</strong> Rumors spread. Trust erodes. Opportunities lost</p>
                <p className="mb-0"><strong>Antidote:</strong> Proactive, transparent communication</p>
              </div>
            </div>

            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-0">
                  <span className="text-destructive">Killer #3:</span> Analysis Paralysis
                </h3>
              </div>
              <div className="space-y-2 text-foreground/90">
                <p><strong>Symptoms:</strong> Endless planning, no action</p>
                <p><strong>Result:</strong> Cash runs out while you strategize</p>
                <p className="mb-0"><strong>Antidote:</strong> 80% solution, execute immediately. Perfect is the enemy of progress</p>
              </div>
            </div>
          </div>

          {/* Crisis Types and Tailored Responses */}
          <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">
            Crisis Types and Tailored Responses
          </h2>

          <div className="overflow-x-auto mb-8 rounded-xl border border-border">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-center p-4 font-bold border border-primary/30">Crisis Type</th>
                  <th className="text-center p-4 font-bold border border-primary/30">Priority 1</th>
                  <th className="text-center p-4 font-bold border border-primary/30">Priority 2</th>
                  <th className="text-center p-4 font-bold border border-primary/30">Priority 3</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-background">
                  <td className="p-4 text-center font-semibold text-foreground border border-border">Financial Crisis</td>
                  <td className="p-4 text-center text-foreground/80 border border-border">Cash preservation</td>
                  <td className="p-4 text-center text-foreground/80 border border-border">Emergency revenue generation</td>
                  <td className="p-4 text-center text-foreground/80 border border-border">Cost structure rebuild</td>
                </tr>
                <tr className="bg-[hsl(var(--biz-green))]/10">
                  <td className="p-4 text-center font-semibold text-foreground border border-border">Operational Crisis</td>
                  <td className="p-4 text-center text-foreground/80 border border-border">Alternative sourcing/operations</td>
                  <td className="p-4 text-center text-foreground/80 border border-border">Customer communication</td>
                  <td className="p-4 text-center text-foreground/80 border border-border">Long-term redundancy</td>
                </tr>
                <tr className="bg-background">
                  <td className="p-4 text-center font-semibold text-foreground border border-border">Personnel Crisis</td>
                  <td className="p-4 text-center text-foreground/80 border border-border">Stabilize team morale</td>
                  <td className="p-4 text-center text-foreground/80 border border-border">Immediate coverage</td>
                  <td className="p-4 text-center text-foreground/80 border border-border">Hiring/systems to prevent recurrence</td>
                </tr>
                <tr className="bg-[hsl(var(--biz-green))]/10">
                  <td className="p-4 text-center font-semibold text-foreground border border-border">Reputation Crisis</td>
                  <td className="p-4 text-center text-foreground/80 border border-border">Customer resolution</td>
                  <td className="p-4 text-center text-foreground/80 border border-border">Proactive communication</td>
                  <td className="p-4 text-center text-foreground/80 border border-border">Process improvement</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* The Post-Crisis Rebuild */}
          <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">
            The Post-Crisis Rebuild: Don't Skip This
          </h2>

          <p className="text-foreground/90 leading-relaxed">
            Crises expose weaknesses. Use them to build <Link to="/blog/operational-resilience" className="text-primary hover:text-primary/80 underline font-medium">resilience</Link>.
          </p>

          <div className="bg-[hsl(var(--biz-green))]/5 border border-[hsl(var(--biz-green))]/20 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-foreground mb-4">30-Day Rebuild Plan:</h3>
            <ol className="space-y-3 text-foreground/90 list-decimal pl-6 mb-0">
              <li><strong>Debrief:</strong> What went well? What didn't? Document lessons</li>
              <li><strong>Process gaps:</strong> Fix the root cause with new systems</li>
              <li><strong>Financial buffer:</strong> Build <Link to="/blog/cash-flow-crisis-management" className="text-primary hover:text-primary/80 underline font-medium">6-month cash reserves</Link></li>
              <li><strong>Team investment:</strong> Recognition, training, <Link to="/blog/coaching-for-growth-leadership" className="text-primary hover:text-primary/80 underline font-medium">culture</Link></li>
              <li><strong>Customer relationships:</strong> Over-service to rebuild trust</li>
            </ol>
          </div>

          <p className="text-foreground/90 leading-relaxed font-semibold text-lg">
            Result: Stronger than before.
          </p>

          {/* The Business Owner's Crisis Mindset */}
          <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">
            The Business Owner's Crisis Mindset
          </h2>

          <div className="space-y-4 mb-8">
            {[
              { text: "Every business faces crises. Your response determines survival.", color: "primary", icon: "🎯" },
              { text: "Panic compounds problems. Calmness contains them.", color: "biz-teal", icon: "🧘" },
              { text: "Crises expose weaknesses. Wise owners fix them permanently.", color: "biz-gold", icon: "💡" },
              { text: "Transparent communication builds trust. Silence destroys it.", color: "purple-500", icon: "📢" },
              { text: "80% action beats 100% planning.", color: "rose-500", icon: "⚡" },
            ].map((truth, idx) => (
              <div key={idx} className={`flex items-start gap-4 rounded-xl p-5 border-l-4 ${
                idx === 0 ? 'bg-biz-blue-faint/50 border-l-primary' :
                idx === 1 ? 'bg-biz-teal/5 border-l-biz-teal' :
                idx === 2 ? 'bg-biz-gold/5 border-l-biz-gold' :
                idx === 3 ? 'bg-purple-500/5 border-l-purple-500' :
                'bg-rose-500/5 border-l-rose-500'
              } border border-border/50`}>
                <span className="text-2xl shrink-0">{truth.icon}</span>
                <div>
                  <span className={`text-xs font-bold uppercase tracking-widest ${
                    idx === 0 ? 'text-primary' :
                    idx === 1 ? 'text-biz-teal' :
                    idx === 2 ? 'text-biz-gold' :
                    idx === 3 ? 'text-purple-600 dark:text-purple-400' :
                    'text-rose-600 dark:text-rose-400'
                  }`}>Truth #{idx + 1}</span>
                  <p className="text-foreground/90 mb-0 mt-1 font-medium">{truth.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
            <p className="text-foreground/90 leading-relaxed text-lg mb-3">
              The businesses that survive crises aren't lucky. They're <strong>prepared, calm, and systematic</strong>.
            </p>
            <p className="text-foreground/90 leading-relaxed text-lg mb-3">
              When disaster strikes, your first decision determines your fate.
            </p>
            <p className="text-foreground/90 leading-relaxed text-xl font-bold mb-0">
              Will you panic? Or will you lead?
            </p>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-primary/10 via-background to-[hsl(var(--biz-green))]/10 border border-primary/20 rounded-2xl p-8 md:p-10 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[hsl(var(--biz-green))]">Business Health Assessment</span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Is Your Business Prepared for Crisis?</h3>
            
            <p className="text-foreground/80 leading-relaxed mb-6 text-lg max-w-2xl">
              A comprehensive <Link to="/blog/how-to-check-your-business-health" className="text-primary hover:text-primary/80 underline font-medium">business health assessment</Link> identifies hidden vulnerabilities before they become full-blown crises. Discover your financial gaps, operational weaknesses, and build a resilience roadmap.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div className="flex items-start gap-3 bg-white backdrop-blur-sm rounded-lg p-4 border border-border/50">
                <Shield className="w-5 h-5 text-[hsl(var(--biz-green))] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground text-sm">Identify Vulnerabilities</p>
                  <p className="text-muted-foreground text-xs">Find weaknesses before crisis hits</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white backdrop-blur-sm rounded-lg p-4 border border-border/50">
                <BarChart3 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground text-sm">Benchmark Resilience</p>
                  <p className="text-muted-foreground text-xs">Compare against industry standards</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white backdrop-blur-sm rounded-lg p-4 border border-border/50">
                <Heart className="w-5 h-5 text-[hsl(var(--biz-green))] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground text-sm">Build Your Roadmap</p>
                  <p className="text-muted-foreground text-xs">Actionable steps to crisis-proof your business</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary-hover px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-elegant"
              >
                Get Your Business Health Assessment <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

          </div>

        </div>
      </article>

      <RelatedArticles 
        articles={[
          { title: "Sharks in the Water: When Your Business Is Under Attack", slug: "/blog/sharks-in-the-water-business-crisis", category: "Risk Management", excerpt: "40-60% of small businesses never reopen after a crisis. Learn the survival framework." },
          { title: "Cash Flow Crisis Management", slug: "/blog/cash-flow-crisis-management", category: "Financial Management", excerpt: "Turn cash flow chaos into predictable, manageable business operations." },
          { title: "Build A High-Performing Team", slug: "/blog/build-high-performing-team", category: "Business Leadership", excerpt: "Learn why team dynamics matter more than individual talent for crisis resilience." },
          { title: "Coaching for Growth, Not Policing for Mistakes", slug: "/blog/coaching-for-growth-leadership", category: "Business Leadership", excerpt: "Coaching cultures outperform and retain talent—critical during crisis recovery." },
        ]}
      />
      <GradientDivider />
      <GlobalFooter />
    </div>
  );
};

export default SmallBusinessCrisisManagement;
