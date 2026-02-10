import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import PromotionalBanner from "@/components/PromotionalBanner";
import BlogHeroSectionEnhanced from "@/components/BlogHeroSectionEnhanced";
import GradientDivider from "@/components/GradientDivider";
import RelatedArticles from "@/components/RelatedArticles";
import { Link } from "react-router-dom";
import { AlertTriangle, DollarSign, Calculator, TrendingDown, Clock, Users, BarChart3, Target, FileText, ArrowRight, CheckCircle, XCircle, Lightbulb, Building2, Wrench, Briefcase, Factory } from "lucide-react";
import heroImage from "@/assets/images/blog/fully-burdened-labor-rate-hero.jpg";

const FullyBurdenedLaborRate = () => {
  const publishDate = "February 10, 2026";
  const canonicalUrl = "https://bizhealth.ai/blog/fully-burdened-labor-rate-true-employee-costs";

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Fully Burdened Labor Rate: True Employee Costs | BizHealth.ai"
        description="Discover why your $35/hour employee really costs $56-$73/hour. Learn the FBLR formula, avoid 5 deadly pricing mistakes, and stop losing millions on every job."
        keywords="fully burdened labor rate, FBLR, true employee cost, labor cost calculation, small business pricing, employee overhead costs, billable hours, payroll taxes, workers comp, labor rate formula, service business pricing 2026"
        canonical={canonicalUrl}
        ogImage={heroImage}
        ogType="article"
        articlePublishedTime="2026-02-10"
        articleAuthor="BizHealth.ai Research Team"
      />
      <StructuredData
        type="article"
        headline="Fully Burdened Labor Rate: Why Small Businesses Lose Millions Not Knowing Their True Employee Costs"
        description="Discover why your $35/hour employee really costs $56-$73/hour. Learn the FBLR formula, avoid 5 deadly pricing mistakes, and stop losing millions."
        image={`https://bizhealth.ai${heroImage}`}
        datePublished="2026-02-10T00:00:00Z"
        author="BizHealth.ai Research Team"
        url={canonicalUrl}
      />

      <PromotionalBanner />
      <GlobalNavigation />

      <BlogHeroSectionEnhanced
        title="Fully Burdened Labor Rate: Why Small Businesses Lose Millions Not Knowing Their True Employee Costs"
        author="BizHealth.ai Research Team"
        publishDate={publishDate}
        readTime="12 min read"
        heroImage={heroImage}
        heroImageAlt="Small business professionals reviewing employee labor cost calculations and FBLR analysis for accurate pricing strategy"
        categories={[
          { label: "Financial Management", href: "/blog/financial-management" },
          { label: "Operations", href: "/blog/operations" },
          { label: "Growth & Scaling", href: "/blog/growth-scaling" },
        ]}
        shareDescription="Your $35/hour employee really costs $56-$73/hour. Learn the FBLR formula and stop losing money on every job."
      />

      {/* Main Content */}
      <article className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto prose prose-lg">

          {/* Opening Hook */}
          <h2 className="text-3xl font-bold mt-2 mb-6 text-foreground">
            The Silent Profit Killer Most Small Business Owners Never See Coming
          </h2>

          <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6 mb-8">
            <p className="text-foreground/90 leading-relaxed text-lg mb-3">
              You're quoting jobs based on your hourly labor rate. Your technician makes <strong>$35/hour</strong>, so you charge $75/hour. Simple math. Healthy margin.
            </p>
            <p className="text-foreground/90 leading-relaxed text-lg font-semibold mb-3">
              Wrong.
            </p>
            <p className="text-foreground/90 leading-relaxed text-lg mb-0">
              That $35/hour is just base pay. Your true labor cost is probably <strong>$55–$65/hour</strong> when you add taxes, benefits, insurance, overhead, and equipment. You think you're making $40/hour profit. <strong>You're actually losing money on every job.</strong>
            </p>
          </div>

          <p className="text-foreground/90 leading-relaxed text-lg">
            This is the <strong>Fully Burdened Labor Rate (FBLR)</strong> blind spot. 80% of service businesses underprice because they don't know their FBLR. They chase volume to make up for thin margins, hire more staff, and dig the hole deeper.
          </p>

          <p className="text-foreground/90 leading-relaxed text-lg">
            This article reveals what FBLR really is, why it matters, and the <strong>5 deadly mistakes</strong> that destroy profitability.
          </p>

          {/* What FBLR Actually Means */}
          <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">
            What Fully Burdened Labor Rate Actually Means
          </h2>

          <p className="text-foreground/90 leading-relaxed">
            <strong>FBLR = Total true hourly cost of employing someone.</strong>
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Not just their paycheck. Every cost associated with that employee.
          </p>

          <div className="bg-blue-500/5 border-l-4 border-l-blue-500 rounded-r-xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-500/15 p-2 rounded-lg">
                <Calculator className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-0">The Formula</h3>
            </div>
            <p className="text-foreground/90 leading-relaxed font-mono text-sm bg-blue-500/10 p-4 rounded-lg mb-0">
              FBLR = (Base Pay + Payroll Taxes + Benefits + Insurance + PTO + Overhead + Equipment) ÷ Billable Hours
            </p>
          </div>

          {/* Example Table */}
          <h3 className="text-2xl font-bold mt-10 mb-4 text-foreground">
            Example: Your $35/hour Technician
          </h3>

          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse rounded-lg overflow-hidden text-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="px-4 py-3 text-center font-semibold">Cost Category</th>
                  <th className="px-4 py-3 text-center font-semibold">Annual Cost</th>
                  <th className="px-4 py-3 text-center font-semibold">Hourly (2080 hrs)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="px-4 py-3 text-center font-medium text-foreground">Base Pay</td>
                  <td className="px-4 py-3 text-center text-foreground/80">$72,800</td>
                  <td className="px-4 py-3 text-center text-foreground/80">$35.00</td>
                </tr>
                <tr className="bg-[hsl(var(--biz-green))]/10">
                  <td className="px-4 py-3 text-center font-medium text-foreground">Payroll Taxes (15%)</td>
                  <td className="px-4 py-3 text-center text-foreground/80">$10,920</td>
                  <td className="px-4 py-3 text-center text-foreground/80">$5.25</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 text-center font-medium text-foreground">Workers Comp (5%)</td>
                  <td className="px-4 py-3 text-center text-foreground/80">$3,640</td>
                  <td className="px-4 py-3 text-center text-foreground/80">$1.75</td>
                </tr>
                <tr className="bg-[hsl(var(--biz-green))]/10">
                  <td className="px-4 py-3 text-center font-medium text-foreground">Health Insurance</td>
                  <td className="px-4 py-3 text-center text-foreground/80">$12,000</td>
                  <td className="px-4 py-3 text-center text-foreground/80">$5.77</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 text-center font-medium text-foreground">PTO (2 weeks)</td>
                  <td className="px-4 py-3 text-center text-foreground/80">$5,600</td>
                  <td className="px-4 py-3 text-center text-foreground/80">$2.69</td>
                </tr>
                <tr className="bg-[hsl(var(--biz-green))]/10">
                  <td className="px-4 py-3 text-center font-medium text-foreground">Training/Tools</td>
                  <td className="px-4 py-3 text-center text-foreground/80">$2,000</td>
                  <td className="px-4 py-3 text-center text-foreground/80">$0.96</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 text-center font-medium text-foreground">Overhead Allocation</td>
                  <td className="px-4 py-3 text-center text-foreground/80">$10,400</td>
                  <td className="px-4 py-3 text-center text-foreground/80">$5.00</td>
                </tr>
                <tr className="bg-primary/10 font-bold">
                  <td className="px-4 py-3 text-center font-bold text-foreground">Total FBLR</td>
                  <td className="px-4 py-3 text-center font-bold text-foreground">$117,360</td>
                  <td className="px-4 py-3 text-center font-bold text-foreground">$56.42</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-foreground/90 leading-relaxed">
            You thought labor cost $35/hour. <strong>Reality: $56.42/hour.</strong>
          </p>
          <p className="text-foreground/90 leading-relaxed">
            To make $20/hour true profit, you need to charge <strong>$76.42/hour minimum</strong>. Most charge $65–$70. They're losing $6–$11/hour on every job.
          </p>

          {/* Why FBLR Is Your Business's Most Important Number */}
          <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">
            Why FBLR Is Your Business's Most Important Number
          </h2>

          {/* 5 Reasons Cards */}
          <div className="space-y-4 mb-8">
            <div className="bg-[hsl(var(--biz-green))]/5 border-l-4 border-l-[hsl(var(--biz-green))] rounded-r-xl p-5">
              <div className="flex items-start gap-3">
                <div className="bg-[hsl(var(--biz-green))]/15 p-2 rounded-lg mt-1">
                  <DollarSign className="w-5 h-5 text-[hsl(var(--biz-green))]" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">#1: Accurate Pricing = Profitability</h4>
                  <p className="text-foreground/80 text-sm leading-relaxed mb-2">
                    Underestimating FBLR = underpricing every job. A $10,000 project at "perceived" $35/hour labor = 286 hours budgeted. Reality: 208 hours at true $56.42 FBLR = <strong>$11,735 labor cost.</strong>
                  </p>
                  <p className="text-foreground/80 text-sm leading-relaxed mb-0">
                    You lose $1,735 before materials. Multiply by 12 projects/month = <strong>$20,820/month lost profit.</strong> Over 10 years: $2.5 million destroyed.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/5 border-l-4 border-l-blue-500 rounded-r-xl p-5">
              <div className="flex items-start gap-3">
                <div className="bg-blue-500/15 p-2 rounded-lg mt-1">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">#2: Capacity Planning</h4>
                  <p className="text-foreground/80 text-sm leading-relaxed mb-0">
                    FBLR reveals your true capacity. You think you have 8 billable hours/day per tech. Reality: 6 hours after PTO, training, admin. Your capacity is <strong>25% lower than you think.</strong> Schedule accordingly or overcommit and lose money.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/5 border-l-4 border-l-amber-500 rounded-r-xl p-5">
              <div className="flex items-start gap-3">
                <div className="bg-amber-500/15 p-2 rounded-lg mt-1">
                  <Users className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">#3: Hiring Decisions</h4>
                  <p className="text-foreground/80 text-sm leading-relaxed mb-0">
                    Hiring based on base pay = disaster. You hire a $30/hour tech to "save money." Their FBLR = $48/hour. Your $25/hour tech FBLR = $42/hour. New hire costs <strong>14% more.</strong> Factor FBLR before every hire.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-500/5 border-l-4 border-l-purple-500 rounded-r-xl p-5">
              <div className="flex items-start gap-3">
                <div className="bg-purple-500/15 p-2 rounded-lg mt-1">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">#4: Profitability By Customer/Project</h4>
                  <p className="text-foreground/80 text-sm leading-relaxed mb-0">
                    FBLR reveals which customers/projects lose money. Discount customer: "20% off" sounds nice. At true FBLR, you're <strong>losing $15/hour.</strong> Fixed-price projects: FBLR shows if scope creep kills margins. Know FBLR = know true profitability.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-teal-500/5 border-l-4 border-l-teal-500 rounded-r-xl p-5">
              <div className="flex items-start gap-3">
                <div className="bg-teal-500/15 p-2 rounded-lg mt-1">
                  <Briefcase className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">#5: Competitive Bidding</h4>
                  <p className="text-foreground/80 text-sm leading-relaxed mb-0">
                    Bid too low = lose money. Bid too high = lose jobs. FBLR gives you the <strong>minimum viable bid.</strong> Bid confidently knowing you're profitable.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* The 5 Deadly FBLR Mistakes */}
          <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">
            The 5 Deadly FBLR Mistakes Small Business Owners Make
          </h2>

          {/* Mistake #1 */}
          <div className="bg-destructive/5 border-l-4 border-l-destructive rounded-r-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-destructive/15 p-2 rounded-lg">
                <span className="text-destructive font-bold text-lg">#1</span>
              </div>
              <div>
                <span className="text-destructive text-xs font-bold uppercase tracking-wider">Mistake #1</span>
                <h3 className="text-xl font-bold text-foreground mb-0">Using Base Pay as Labor Cost (80% Make This Error)</h3>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-foreground/80 leading-relaxed mb-1"><strong>The Problem:</strong> "My tech makes $35/hour, so labor costs $35/hour."</p>
              <p className="text-foreground/80 leading-relaxed mb-1"><strong>Reality:</strong> FBLR = $56/hour. You're pricing <strong>37% too low.</strong></p>
              <p className="text-foreground/80 leading-relaxed mb-0"><strong>Result:</strong> Every job loses money. You work harder for less profit.</p>
            </div>
          </div>

          {/* Mistake #2 */}
          <div className="bg-amber-500/5 border-l-4 border-l-amber-500 rounded-r-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-500/15 p-2 rounded-lg">
                <span className="text-amber-600 font-bold text-lg">#2</span>
              </div>
              <div>
                <span className="text-amber-600 text-xs font-bold uppercase tracking-wider">Mistake #2</span>
                <h3 className="text-xl font-bold text-foreground mb-0">Ignoring Non-Payroll Costs</h3>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-foreground/80 leading-relaxed mb-1"><strong>The Problem:</strong> "Benefits? Overhead? That's not labor."</p>
              <p className="text-foreground/80 leading-relaxed mb-1"><strong>Reality:</strong> Workers comp, insurance, equipment = <strong>30–50% of base pay.</strong></p>
              <p className="text-foreground/80 leading-relaxed mb-1"><strong>Example:</strong> $35 tech. Workers comp alone = $5.25/hour. Uninsured risk or underpricing?</p>
              <p className="text-foreground/80 leading-relaxed mb-0"><strong>Fix:</strong> Build full FBLR spreadsheet. Review annually.</p>
            </div>
          </div>

          {/* Mistake #3 */}
          <div className="bg-blue-500/5 border-l-4 border-l-blue-500 rounded-r-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-500/15 p-2 rounded-lg">
                <span className="text-blue-600 font-bold text-lg">#3</span>
              </div>
              <div>
                <span className="text-blue-600 text-xs font-bold uppercase tracking-wider">Mistake #3</span>
                <h3 className="text-xl font-bold text-foreground mb-0">Assuming 100% Billable Hours</h3>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-foreground/80 leading-relaxed mb-1"><strong>The Problem:</strong> "Tech works 40 hours/week = 40 billable hours."</p>
              <p className="text-foreground/80 leading-relaxed mb-1"><strong>Reality:</strong> Billable = <strong>75% max</strong> (PTO, training, admin, travel, no-shows).</p>
              <p className="text-foreground/80 leading-relaxed mb-1">$35/hour base × 75% = $26.25 true billable rate. FBLR = $42/hour.</p>
              <p className="text-foreground/80 leading-relaxed mb-0"><strong>Fix:</strong> Track actual billable utilization. Budget realistically.</p>
            </div>
          </div>

          {/* Mistake #4 */}
          <div className="bg-purple-500/5 border-l-4 border-l-purple-500 rounded-r-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-500/15 p-2 rounded-lg">
                <span className="text-purple-600 font-bold text-lg">#4</span>
              </div>
              <div>
                <span className="text-purple-600 text-xs font-bold uppercase tracking-wider">Mistake #4</span>
                <h3 className="text-xl font-bold text-foreground mb-0">Static FBLR (Never Updating)</h3>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-foreground/80 leading-relaxed mb-1"><strong>The Problem:</strong> Calculated FBLR 3 years ago. Never updated.</p>
              <p className="text-foreground/80 leading-relaxed mb-1"><strong>Reality:</strong> Insurance up 20%. Benefits up 15%. Wages up 10%.</p>
              <p className="text-foreground/80 leading-relaxed mb-1">Old FBLR $50/hour. <strong>New reality $65/hour.</strong></p>
              <p className="text-foreground/80 leading-relaxed mb-0"><strong>Fix:</strong> Recalculate FBLR every payroll cycle or quarterly.</p>
            </div>
          </div>

          {/* Mistake #5 */}
          <div className="bg-teal-500/5 border-l-4 border-l-teal-500 rounded-r-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-teal-500/15 p-2 rounded-lg">
                <span className="text-teal-600 font-bold text-lg">#5</span>
              </div>
              <div>
                <span className="text-teal-600 text-xs font-bold uppercase tracking-wider">Mistake #5</span>
                <h3 className="text-xl font-bold text-foreground mb-0">No FBLR By Role/Skill Level</h3>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-foreground/80 leading-relaxed mb-1"><strong>The Problem:</strong> "All techs same rate."</p>
              <p className="text-foreground/80 leading-relaxed mb-1"><strong>Reality:</strong> Senior tech FBLR = $65/hour. Junior = $45/hour.</p>
              <p className="text-foreground/80 leading-relaxed mb-1">Pricing senior work at junior rates = <strong>profit killer.</strong></p>
              <p className="text-foreground/80 leading-relaxed mb-0"><strong>Fix:</strong> FBLR by role: Junior, Mid, Senior, Specialist.</p>
            </div>
          </div>

          {/* How to Calculate Your FBLR */}
          <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">
            How to Calculate Your FBLR (Step-by-Step)
          </h2>

          {/* Step 1 */}
          <div className="bg-blue-500/5 border-l-4 border-l-blue-500 rounded-r-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-500/15 p-2 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <span className="text-blue-600 text-xs font-bold uppercase tracking-wider">Step 1</span>
                <h3 className="text-xl font-bold text-foreground mb-0">Gather Annual Costs Per Employee</h3>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              <div className="bg-card border border-border rounded-lg p-3">
                <p className="text-xs font-semibold text-foreground mb-2">Direct Costs</p>
                <ul className="text-foreground/70 text-xs space-y-1 mb-0 list-none pl-0">
                  <li>Base Pay: $72,800</li>
                  <li>Payroll Taxes (15%): $10,920</li>
                  <li>Workers Comp (5%): $3,640</li>
                </ul>
              </div>
              <div className="bg-card border border-border rounded-lg p-3">
                <p className="text-xs font-semibold text-foreground mb-2">Benefits</p>
                <ul className="text-foreground/70 text-xs space-y-1 mb-0 list-none pl-0">
                  <li>Health Insurance: $12,000</li>
                  <li>PTO (80 hrs @ $35): $2,800</li>
                  <li>Training: $2,000</li>
                </ul>
              </div>
              <div className="bg-card border border-border rounded-lg p-3">
                <p className="text-xs font-semibold text-foreground mb-2">Indirect</p>
                <ul className="text-foreground/70 text-xs space-y-1 mb-0 list-none pl-0">
                  <li>Equipment/Tools: $4,000</li>
                  <li>Vehicle Allocation: $3,200</li>
                  <li>Overhead (10%): $7,280</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-amber-500/5 border-l-4 border-l-amber-500 rounded-r-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-500/15 p-2 rounded-lg">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <span className="text-amber-600 text-xs font-bold uppercase tracking-wider">Step 2</span>
                <h3 className="text-xl font-bold text-foreground mb-0">Calculate Billable Hours</h3>
              </div>
            </div>
            <div className="text-sm text-foreground/80 space-y-1">
              <p className="mb-1">2,080 total hours</p>
              <p className="mb-1">− PTO: 80 hours</p>
              <p className="mb-1">− Training: 80 hours</p>
              <p className="mb-1">− Admin/Non-billable: 320 hours</p>
              <p className="font-bold text-foreground mb-0">= Billable Hours: 1,600 hours</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[hsl(var(--biz-green))]/5 border-l-4 border-l-[hsl(var(--biz-green))] rounded-r-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[hsl(var(--biz-green))]/15 p-2 rounded-lg">
                <Calculator className="w-6 h-6 text-[hsl(var(--biz-green))]" />
              </div>
              <div>
                <span className="text-[hsl(var(--biz-green))] text-xs font-bold uppercase tracking-wider">Step 3</span>
                <h3 className="text-xl font-bold text-foreground mb-0">FBLR Formula</h3>
              </div>
            </div>
            <div className="text-sm text-foreground/80 space-y-1">
              <p className="mb-1">Total Cost: $117,840</p>
              <p className="mb-1">÷ Billable Hours: 1,600</p>
              <p className="font-bold text-foreground text-lg mb-0">FBLR = $73.65/hour</p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-purple-500/5 border-l-4 border-l-purple-500 rounded-r-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-500/15 p-2 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <span className="text-purple-600 text-xs font-bold uppercase tracking-wider">Step 4</span>
                <h3 className="text-xl font-bold text-foreground mb-0">Pricing Rule</h3>
              </div>
            </div>
            <div className="text-sm text-foreground/80">
              <p className="mb-1">FBLR × Desired Margin (2.5x–3x) = Minimum Bill Rate</p>
              <p className="font-bold text-foreground mb-1">$73.65 × 2.5 = $184/hour minimum</p>
              <p className="text-destructive font-semibold mb-0">Most charge $125–$150. Losing $34–$59/hour.</p>
            </div>
          </div>

          {/* FBLR By Business Type */}
          <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">
            FBLR By Business Type (Benchmarks)
          </h2>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {/* Service Businesses */}
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-blue-500/15 p-2 rounded-lg">
                  <Wrench className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="font-bold text-foreground text-sm">Service Businesses</h4>
              </div>
              <p className="text-xs text-foreground/60 mb-3">HVAC, Plumbing, Electrical</p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-foreground/70">Apprentice</span><span className="font-semibold text-foreground">$42/hr</span></div>
                <div className="flex justify-between"><span className="text-foreground/70">Journeyman</span><span className="font-semibold text-foreground">$58/hr</span></div>
                <div className="flex justify-between"><span className="text-foreground/70">Foreman</span><span className="font-semibold text-foreground">$73/hr</span></div>
              </div>
              <p className="text-xs text-[hsl(var(--biz-green))] font-semibold mt-3 mb-0">Bill Rate: 2.5x FBLR minimum</p>
            </div>

            {/* Consulting */}
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-purple-500/15 p-2 rounded-lg">
                  <Briefcase className="w-5 h-5 text-purple-600" />
                </div>
                <h4 className="font-bold text-foreground text-sm">Consulting/Professional</h4>
              </div>
              <p className="text-xs text-foreground/60 mb-3">Professional Services</p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-foreground/70">Junior</span><span className="font-semibold text-foreground">$65/hr</span></div>
                <div className="flex justify-between"><span className="text-foreground/70">Senior</span><span className="font-semibold text-foreground">$95/hr</span></div>
                <div className="flex justify-between"><span className="text-foreground/70">Principal</span><span className="font-semibold text-foreground">$135/hr</span></div>
              </div>
              <p className="text-xs text-[hsl(var(--biz-green))] font-semibold mt-3 mb-0">Bill Rate: 3x FBLR</p>
            </div>

            {/* Manufacturing */}
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-amber-500/15 p-2 rounded-lg">
                  <Factory className="w-5 h-5 text-amber-600" />
                </div>
                <h4 className="font-bold text-foreground text-sm">Manufacturing/Production</h4>
              </div>
              <p className="text-xs text-foreground/60 mb-3">Add equipment depreciation, facility allocation</p>
              <p className="text-foreground/80 text-sm leading-relaxed mb-0">
                FBLR typically <strong>1.8–2.2x</strong> base pay.
              </p>
            </div>
          </div>

          {/* Action Plan */}
          <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">
            Actionable FBLR Implementation Plan
          </h2>

          <div className="space-y-4 mb-8">
            <div className="bg-blue-500/5 border-l-4 border-l-blue-500 rounded-r-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-500/15 p-2 rounded-lg">
                  <Calculator className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <span className="text-blue-600 text-xs font-bold uppercase tracking-wider">Week 1 · This Week</span>
                  <h4 className="font-bold text-foreground mb-0">Calculate Current FBLR</h4>
                </div>
              </div>
              <ol className="text-foreground/80 text-sm space-y-1 mb-0 pl-4">
                <li>Export payroll last 12 months</li>
                <li>List all employee costs (taxes, benefits, insurance)</li>
                <li>Allocate overhead (rent, utilities ÷ employees)</li>
                <li>Calculate by role</li>
                <li>Shock: Your true labor cost</li>
              </ol>
            </div>

            <div className="bg-amber-500/5 border-l-4 border-l-amber-500 rounded-r-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-amber-500/15 p-2 rounded-lg">
                  <DollarSign className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <span className="text-amber-600 text-xs font-bold uppercase tracking-wider">Week 2 · Next Week</span>
                  <h4 className="font-bold text-foreground mb-0">Adjust Pricing</h4>
                </div>
              </div>
              <ul className="text-foreground/80 text-sm space-y-1 mb-0 pl-4 list-disc">
                <li>Service rates: FBLR × 2.5 minimum</li>
                <li>Fixed bids: Hours × FBLR + 25% margin</li>
                <li>Discounts: Never below 2x FBLR</li>
                <li>Communicate: "Adjusted rates reflect true value"</li>
              </ul>
            </div>

            <div className="bg-[hsl(var(--biz-green))]/5 border-l-4 border-l-[hsl(var(--biz-green))] rounded-r-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[hsl(var(--biz-green))]/15 p-2 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-[hsl(var(--biz-green))]" />
                </div>
                <div>
                  <span className="text-[hsl(var(--biz-green))] text-xs font-bold uppercase tracking-wider">Week 3 · Two Weeks Out</span>
                  <h4 className="font-bold text-foreground mb-0">Capacity & Scheduling</h4>
                </div>
              </div>
              <ul className="text-foreground/80 text-sm space-y-1 mb-0 pl-4 list-disc">
                <li>Billable hours reality (75% max)</li>
                <li>Schedule based on true capacity</li>
                <li>Hire based on FBLR affordability</li>
              </ul>
            </div>

            <div className="bg-purple-500/5 border-l-4 border-l-purple-500 rounded-r-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-purple-500/15 p-2 rounded-lg">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <span className="text-purple-600 text-xs font-bold uppercase tracking-wider">Month 2 · Ongoing</span>
                  <h4 className="font-bold text-foreground mb-0">Monitor & Optimize</h4>
                </div>
              </div>
              <ul className="text-foreground/80 text-sm space-y-1 mb-0 pl-4 list-disc">
                <li>Track actual vs. FBLR costs weekly</li>
                <li>Customer profitability (revenue ÷ FBLR hours)</li>
                <li>Quarterly FBLR recalculation</li>
              </ul>
            </div>
          </div>

          {/* The FBLR Transformation */}
          <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">
            The FBLR Transformation
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5">
              <h4 className="font-bold text-destructive mb-3 flex items-center gap-2">
                <XCircle className="w-5 h-5" /> Before FBLR
              </h4>
              <ul className="text-foreground/80 text-sm space-y-2 mb-0 list-none pl-0">
                <li>❌ Pricing by gut feel</li>
                <li>❌ Thin margins</li>
                <li>❌ Volume chase</li>
                <li>❌ Constant stress</li>
              </ul>
            </div>
            <div className="bg-[hsl(var(--biz-green))]/5 border border-[hsl(var(--biz-green))]/20 rounded-xl p-5">
              <h4 className="font-bold text-[hsl(var(--biz-green))] mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> After FBLR
              </h4>
              <ul className="text-foreground/80 text-sm space-y-2 mb-0 list-none pl-0">
                <li>✅ Pricing confidence (FBLR × margin)</li>
                <li>✅ True profitability visibility</li>
                <li>✅ Capacity realism</li>
                <li>✅ Hiring discipline</li>
                <li>✅ Customer profitability analysis</li>
              </ul>
            </div>
          </div>

          {/* Real-world Example */}
          <div className="bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/30 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-[hsl(var(--biz-green))]" />
              <h4 className="font-bold text-foreground mb-0">Real-World Impact</h4>
            </div>
            <p className="text-foreground/80 text-sm leading-relaxed mb-2">
              A <strong>$1M service business</strong> discovers FBLR $58 vs. perceived $35.
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-foreground/60 text-xs mb-0">Current pricing</p>
                <p className="font-bold text-foreground mb-0">$75/hr (17% margin)</p>
              </div>
              <div>
                <p className="text-foreground/60 text-xs mb-0">New pricing</p>
                <p className="font-bold text-[hsl(var(--biz-green))] mb-0">$165/hr (65% margin on FBLR)</p>
              </div>
            </div>
            <p className="text-foreground font-bold text-lg mt-3 mb-0">
              Annual impact: <span className="text-[hsl(var(--biz-green))]">$230K additional profit</span>
            </p>
          </div>

          <p className="text-foreground/90 leading-relaxed text-lg font-semibold">
            FBLR isn't accounting. It's your <strong>profitability operating system.</strong>
          </p>

          {/* Disclaimer */}
          <div className="bg-muted/50 border border-border rounded-xl p-4 mt-8 mb-8">
            <p className="text-foreground/60 text-xs leading-relaxed mb-0 italic">
              <strong>Disclaimer:</strong> The examples and calculations in this article are illustrative and based on typical small business scenarios. Actual Fully Burdened Labor Rates vary by industry, location, and business specifics. All financial decisions, pricing strategies, and cost analyses should be reviewed and validated by qualified financial professionals or accountants familiar with your business.
            </p>
          </div>

          {/* CTA Section */}
          <div className="bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/30 rounded-2xl p-8 text-center mt-12">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center overflow-hidden shadow-lg">
                <img src="/favicon-96x96.png" alt="BizHealth.ai" className="w-9 h-9 object-contain" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Don't Let Hidden Labor Costs Drain Your Profits
            </h3>
            <p className="text-foreground/80 mb-6 max-w-xl mx-auto">
              BizHealth.ai's Business Health Assessment identifies FBLR gaps, benchmarks against your industry, and builds the pricing discipline that transforms thin margins into sustainable profitability.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center gap-2 bg-[hsl(var(--biz-green))] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity no-underline"
              >
                Get Your Business Health Assessment <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/blog/stress-test-pricing-framework-margins-cash-flow"
                className="inline-flex items-center justify-center gap-2 bg-[hsl(var(--biz-teal))] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg no-underline group"
              >
                <FileText className="w-4 h-4 group-hover:rotate-3 transition-transform" />
                Read: Stress-Test Your Pricing
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </article>

      <RelatedArticles
        articles={[
          {
            title: "Stress-Test Your Pricing Framework: Are Your Margins Real?",
            slug: "/blog/stress-test-pricing-framework-margins-cash-flow",
            category: "Financial Management",
            excerpt: "Discover whether your pricing can survive market shifts. Learn the framework to stress-test margins and protect cash flow."
          },
          {
            title: "Profit Last Is Killing Your Business: Make Profit First Your Non-Negotiable Reality",
            slug: "/blog/profit-first-non-negotiable",
            category: "Financial Management",
            excerpt: "Stop treating profit as leftovers. Learn the Profit First system—5 bank accounts, behavioral finance, and allocation strategies."
          },
          {
            title: "Small Business Financials: Know Your Numbers or Lose Your Business",
            slug: "/blog/small-business-financials-know-your-numbers",
            category: "Financial Management",
            excerpt: "Master the financial metrics every small business owner needs to track for sustainable growth and profitability."
          }
        ]}
      />
      <GradientDivider variant="green-gold" />
      <GlobalFooter />
    </div>
  );
};

export default FullyBurdenedLaborRate;
