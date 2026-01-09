import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import BlogHeroSection from "@/components/BlogHeroSection";
import PromotionalBanner from "@/components/PromotionalBanner";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, XCircle, AlertTriangle, TrendingUp, Users, DollarSign, Settings, Target, Zap, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroImage from "@/assets/images/growth-trap-or-growth-engine-business-readiness-assessment.jpg";

// Foundation Audit Data with unique colors for each pillar
const foundationPillars = [
  {
    id: "financial",
    title: "Financial Foundation",
    subtitle: "Can you answer these questions with confidence?",
    icon: DollarSign,
    colors: {
      bg: "bg-emerald-500",
      bgLight: "bg-emerald-500/10",
      bgHover: "bg-emerald-500/20",
      border: "border-emerald-500/40",
      borderLight: "border-emerald-500/20",
      text: "text-emerald-500",
      hsl: "142 71% 45%"
    },
    questions: [
      "Are your revenue streams stable and consistently profitable?",
      "Do you understand your actual costs—not estimates, but real numbers based on actual operations?",
      "Can you forecast cash flow 12-24 months ahead, accounting for seasonal fluctuations?",
      "Do you have positive cash flow, or are you relying on constant new revenue to cover existing expenses?",
      "Could your business sustain a 10% drop in revenue without crisis?"
    ],
    warning: "If you answer \"no\" to any of these, growth will expose and amplify your financial weaknesses. Fix them first."
  },
  {
    id: "operational",
    title: "Operational Foundation",
    subtitle: "Growth requires repeatable systems:",
    icon: Settings,
    colors: {
      bg: "bg-blue-500",
      bgLight: "bg-blue-500/10",
      bgHover: "bg-blue-500/20",
      border: "border-blue-500/40",
      borderLight: "border-blue-500/20",
      text: "text-blue-500",
      hsl: "217 91% 60%"
    },
    questions: [
      "Can you document how you do what you do? Not perfectly, but clearly enough that someone could learn it?",
      "Are your core processes scalable, or do they depend entirely on you?",
      "Can your current technology and tools handle double the workload without breaking?",
      "Where are the bottlenecks in your operations—the places where scaling causes breakdown?",
      "Do you have systems for quality control that don't depend on you personally checking everything?"
    ],
    warning: "Without scalable operations, growth creates chaos. Every new customer or project becomes a custom operation."
  },
  {
    id: "team",
    title: "Team Foundation",
    subtitle: "Growth requires people clarity:",
    icon: Users,
    colors: {
      bg: "bg-violet-500",
      bgLight: "bg-violet-500/10",
      bgHover: "bg-violet-500/20",
      border: "border-violet-500/40",
      borderLight: "border-violet-500/20",
      text: "text-violet-500",
      hsl: "258 90% 66%"
    },
    questions: [
      "Does every team member understand their role, their authority, and how their work connects to bigger goals?",
      "Do your people share your core values, or do you have people who are just collecting a paycheck?",
      "Could you lose any single person (even you) without the business collapsing?",
      "Do you have leaders who can manage people, not just individual contributors?",
      "Are your people engaged, or are they already at capacity and exhausted?"
    ],
    warning: "If your team is already stretched, adding growth will break them. If roles are unclear, growth creates confusion and turf battles."
  },
  {
    id: "customer",
    title: "Customer & Market Foundation",
    subtitle: "Growth requires a solid customer base:",
    icon: Target,
    colors: {
      bg: "bg-amber-500",
      bgLight: "bg-amber-500/10",
      bgHover: "bg-amber-500/20",
      border: "border-amber-500/40",
      borderLight: "border-amber-500/20",
      text: "text-amber-500",
      hsl: "38 92% 50%"
    },
    questions: [
      "Are your best customers loyal, and do you know why?",
      "Are most of your new customers coming from referrals or word-of-mouth, or are you constantly chasing cold leads?",
      "Do you deeply understand what problems you solve for customers and why they choose you?",
      "Are your customers happy enough to absorb service changes during growth, or are they already at the edge?"
    ],
    warning: "Customers are your foundation. If you grow and can't serve them well, they leave."
  },
  {
    id: "leadership",
    title: "Leadership & Strategic Foundation",
    subtitle: "Growth requires alignment:",
    icon: Zap,
    colors: {
      bg: "bg-cyan-500",
      bgLight: "bg-cyan-500/10",
      bgHover: "bg-cyan-500/20",
      border: "border-cyan-500/40",
      borderLight: "border-cyan-500/20",
      text: "text-cyan-500",
      hsl: "188 94% 43%"
    },
    questions: [
      "Do you and your leadership team agree on what success looks like?",
      "Is there a written plan for where you're going, or is growth just a vague direction?",
      "Does leadership agree on which growth opportunities matter and which are distractions?",
      "Can you make decisions quickly when needed, or does every decision get debated?"
    ],
    warning: "If leadership isn't aligned, growth creates conflict. If there's no clear strategy, growth goes in multiple directions at once."
  }
];

const FoundationAuditSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const togglePillar = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6 text-foreground">The Foundation Audit: What Must Be Solid Before Growth Happens</h2>
      
      <p className="text-muted-foreground mb-8">
        Before you pursue any growth, you need to diagnose your business's actual readiness. This isn't about pie-in-the-sky ambition. It's about <strong>honest assessment</strong> of whether your foundation can support expansion.
      </p>

      {/* Visual Progress Indicator */}
      <div className="flex items-center justify-center gap-3 mb-8">
        {foundationPillars.map((pillar, index) => {
          const IconComponent = pillar.icon;
          const isActive = activeIndex === index;
          return (
            <button
              key={pillar.id}
              onClick={() => setActiveIndex(index)}
              className={`
                group relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300
                ${isActive 
                  ? `${pillar.colors.bg} text-white scale-110 shadow-lg ring-4 ring-offset-2 ring-offset-background`
                  : `bg-muted hover:${pillar.colors.bgLight} text-muted-foreground hover:${pillar.colors.text}`
                }
              `}
              style={isActive ? { boxShadow: `0 8px 25px -5px hsl(${pillar.colors.hsl} / 0.4)` } : {}}
              aria-label={pillar.title}
            >
              <IconComponent className={`w-5 h-5 transition-colors ${!isActive && `group-hover:${pillar.colors.text}`}`} />
              {/* Tooltip */}
              <span className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs ${pillar.colors.bg} text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}>
                {pillar.title.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Accordion Cards */}
      <div className="space-y-3">
        {foundationPillars.map((pillar, index) => {
          const IconComponent = pillar.icon;
          const isActive = activeIndex === index;

          return (
            <motion.div
              key={pillar.id}
              initial={false}
              className={`
                rounded-xl overflow-hidden transition-all duration-300
                ${isActive 
                  ? `bg-muted/50 border-2 ${pillar.colors.border} shadow-lg`
                  : 'bg-muted/30 border border-border hover:border-muted-foreground/30'
                }
              `}
              style={isActive ? { boxShadow: `0 10px 40px -10px hsl(${pillar.colors.hsl} / 0.25)` } : {}}
            >
              {/* Header */}
              <button
                onClick={() => togglePillar(index)}
                className="w-full flex items-center justify-between p-5 text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className={`
                    p-3 rounded-lg transition-all duration-300
                    ${isActive 
                      ? pillar.colors.bgHover
                      : `bg-muted group-hover:${pillar.colors.bgLight}`
                    }
                  `}>
                    <IconComponent className={`
                      w-6 h-6 transition-colors duration-300
                      ${isActive 
                        ? pillar.colors.text
                        : `text-muted-foreground group-hover:${pillar.colors.text}`
                      }
                    `} />
                  </div>
                  <div>
                    <h3 className={`
                      text-xl font-bold transition-colors duration-300
                      ${isActive ? pillar.colors.text : 'text-foreground/80 group-hover:text-foreground'}
                    `}>
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{pillar.subtitle}</p>
                  </div>
                </div>
                <div className={`
                  p-2 rounded-full transition-all duration-300
                  ${isActive ? `${pillar.colors.bgLight} rotate-180` : 'bg-transparent group-hover:bg-muted'}
                `}>
                  <ChevronDown className={`
                    w-5 h-5 transition-all duration-300
                    ${isActive ? pillar.colors.text : 'text-muted-foreground'}
                  `} />
                </div>
              </button>

              {/* Content */}
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5">
                      <div className={`pt-2 border-t ${pillar.colors.borderLight}`}>
                        <ul className="space-y-3 mt-4">
                          {pillar.questions.map((question, qIndex) => (
                            <motion.li
                              key={qIndex}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: qIndex * 0.05 }}
                              className="flex items-start gap-3"
                            >
                              <CheckCircle className={`w-5 h-5 shrink-0 mt-0.5 ${pillar.colors.text}`} />
                              <span className="text-muted-foreground">{question}</span>
                            </motion.li>
                          ))}
                        </ul>
                        
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className={`mt-6 p-4 rounded-lg ${pillar.colors.bgLight} border ${pillar.colors.borderLight}`}
                        >
                          <div className="flex items-start gap-3">
                            <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${pillar.colors.text}`} />
                            <p className="text-foreground font-medium text-sm">
                              {pillar.warning}
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* CTA at bottom */}
      <div className="mt-8 text-center">
        <p className="text-muted-foreground mb-4">
          <strong>Can you confidently answer "yes" to most of these questions?</strong> If not, focus on strengthening your foundation before pursuing aggressive growth.
        </p>
      </div>
    </section>
  );
};

const GrowthTrapOrGrowthEngine = () => {
  return (
    <div className="min-h-screen bg-background">
      <PromotionalBanner />
      <SEO 
        title="Growth Trap or Growth Engine? Assessing Business Growth Readiness"
        description="78% of SMBs want to grow, but 60% stall after year three. Learn the Foundation Audit framework to assess if your business is ready for sustainable growth—or heading into a trap."
        keywords="business growth readiness, growth trap, sustainable growth, SMB scaling, business foundation audit, growth assessment, premature growth, business expansion, growth strategy, scaling small business, growth readiness checklist, business growth plan 2026, cash flow for growth, operational scalability, team capacity, leadership alignment, growth sustainability, fast vs sustainable growth"
        ogType="article"
        ogImage="https://bizhealth.ai/assets/images/growth-trap-or-growth-engine-business-readiness-assessment.jpg"
        articlePublishedTime="2026-01-09T12:00:00Z"
        articleModifiedTime="2026-01-09T12:00:00Z"
        articleAuthor="BizHealth.ai Research Team"
        canonical="https://bizhealth.ai/blog/growth-trap-or-growth-engine"
      />
      
      <StructuredData 
        type="article"
        headline="Growth Trap or Growth Engine? Assessing Whether Your Business is Actually Ready to Grow"
        description="78% of SMBs want to grow, but 60% stall after year three. Learn the Foundation Audit framework to assess if your business is ready for sustainable growth—or heading into a trap."
        author="BizHealth.ai Research Team"
        datePublished="2026-01-09"
        dateModified="2026-01-09"
        image="https://bizhealth.ai/assets/images/growth-trap-or-growth-engine-business-readiness-assessment.jpg"
        url="https://bizhealth.ai/blog/growth-trap-or-growth-engine"
      />
      
      <GlobalNavigation />
      
      <BlogHeroSection
        title="Growth Trap or Growth Engine? Assessing Whether Your Business is Actually Ready to Grow"
        author="BizHealth.ai Research Team"
        publishDate="January 8, 2026"
        readTime="10 min read"
        heroImage={heroImage}
        heroImageAlt="Business leader with analytics tablet at crossroads in manufacturing facility assessing growth readiness and strategic direction"
        categories={[
          { label: "Business Strategy", href: "/blog/business-strategy" },
          { label: "Business Leadership", href: "/blog/business-leadership" },
          { label: "Operations", href: "/blog/operations" },
        ]}
        shareDescription="78% of SMBs want to grow, but 60% stall after year three. Is your business a growth trap or a growth engine? Take the Foundation Audit."
      />
      
      {/* Blog Content */}
      <article className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
            
            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">The Growth Paradox: Why 78% of Small Businesses Want to Grow But Only Half Succeed</h2>
              
              <p className="text-muted-foreground mb-6">
                Every small business owner dreams of growth. Revenue increases, expanding teams, entering new markets, scaling operations—the vision is compelling. And the statistics support the appetite: <strong>78% of small business owners plan to grow this year</strong>, and 69% feel positive about their financial outlook.
              </p>
              
              <p className="text-muted-foreground mb-6">
                Yet here's the uncomfortable truth that rarely gets discussed: <strong className="text-primary">60% of small businesses stall after year three</strong>, usually because they grew too fast. Growth that looked like success on a spreadsheet becomes a slow-motion disaster in operations. Cash flow tightens. Quality declines. Teams burn out. Culture erodes. Customers start noticing the difference. And suddenly, the business owner realizes they've created a bigger, more complicated mess rather than a stronger, more profitable enterprise.
              </p>
              
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-8">
                <p className="text-foreground font-medium mb-2">
                  The problem isn't growth itself—it's premature growth.
                </p>
                <p className="text-foreground">
                  Growth that looks impressive in the short term but isn't supported by the operational, financial, and team foundations required to maintain it is actually a <strong>trap</strong>. And tragically, many business owners caught in this trap didn't realize they were walking into it until they were already three steps inside.
                </p>
              </div>
              
              <p className="text-muted-foreground">
                The question isn't "Should we grow?" <strong>The real question is: "Is our business actually ready to grow sustainably?"</strong>
              </p>
            </section>
            
            {/* Hidden Costs Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">The Hidden Costs of Growing Too Fast: Why 74% of Scaling Failures Happen</h2>
              
              <p className="text-muted-foreground mb-8">
                Growing too quickly sounds like a luxury problem. But it's actually a <strong>critical threat to business survival</strong>. When a business expands faster than its systems can support, the cracks appear everywhere:
              </p>
              
              {/* Cash Flow Collapse */}
              <div className="bg-card border border-border rounded-lg p-6 mb-6">
                <div className="flex items-start gap-4">
                  <div className="bg-destructive/10 p-3 rounded-lg shrink-0">
                    <DollarSign className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">Cash Flow Collapses Despite Revenue Growth</h3>
                    <p className="text-muted-foreground">
                      You land a big contract. Sales spike 40%. Sounds great, right? But now you need inventory, more staff, better equipment. These expenses come upfront, long before you actually collect the revenue. If your cash flow isn't healthy enough to absorb this gap, you find yourself doing something insane: <strong>borrowing money to finance growth that should be profitable</strong>. You're technically a successful, growing business—on paper. In reality, you're one bad month away from not making payroll.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Quality Decline */}
              <div className="bg-card border border-border rounded-lg p-6 mb-6">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-500/10 p-3 rounded-lg shrink-0">
                    <AlertTriangle className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">Quality Declines Silently</h3>
                    <p className="text-muted-foreground">
                      When you're hiring fast, you don't have time to find the best candidates. You hire whoever is available. These employees aren't trained deeply, don't understand your culture, and often need supervision that depletes your existing good people. Your product or service quality starts slipping—not dramatically, just enough that loyal customers notice. They start looking elsewhere.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Culture Dilution */}
              <div className="bg-card border border-border rounded-lg p-6 mb-6">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-500/10 p-3 rounded-lg shrink-0">
                    <Users className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">Culture Gets Diluted</h3>
                    <p className="text-muted-foreground">
                      Your original team understood the mission. They worked hard because they believed in it. But when you double your headcount in six months and only half the new people share those values, your culture becomes incoherent. Turnover increases. Long-time employees become frustrated working alongside people who don't carry their weight. Suddenly, the company feels less like a tight team and more like a collection of departments.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Systems Break */}
              <div className="bg-card border border-border rounded-lg p-6 mb-6">
                <div className="flex items-start gap-4">
                  <div className="bg-destructive/10 p-3 rounded-lg shrink-0">
                    <Settings className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">Systems Break Under Pressure</h3>
                    <p className="text-muted-foreground">
                      Your spreadsheet-based process worked fine when you had 8 employees and 20 clients. But at 25 employees and 150 clients, it becomes a bottleneck. Data gets duplicated. Processes take forever. Nobody knows who owns what. You create <strong>technical debt</strong>—systems patched together as temporary solutions—that eventually costs more to fix than it would have to build properly in the first place.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Leadership Stretched */}
              <div className="bg-card border border-border rounded-lg p-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="bg-destructive/10 p-3 rounded-lg shrink-0">
                    <Target className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">Leadership Gets Stretched Too Thin</h3>
                    <p className="text-muted-foreground">
                      You went from a business where you knew every customer, every employee, every challenge personally. Now you're managing through other people, which requires delegation skills, trust, and systems you may not have developed yet. You're making more decisions, all of them critical, and you're making them with <strong>incomplete information</strong> because you're no longer in the room for everything.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Foundation Audit Section */}
            <FoundationAuditSection />
            
            {/* Growth Readiness Self-Assessment */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">The Growth Readiness Self-Assessment: Be Honest</h2>
              
              <p className="text-muted-foreground mb-8">
                Here's a framework to honestly assess your readiness:
              </p>
              
              {/* Green Light */}
              <div className="bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/30 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-[hsl(var(--biz-green))]" />
                  🟢 Green Light (Ready to Grow)
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(var(--biz-green))] shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Profitability is consistent; cash flow is healthy</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(var(--biz-green))] shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Core processes are documented and scalable</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(var(--biz-green))] shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Customers are satisfied and growing organically</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(var(--biz-green))] shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Team has capacity and clarity</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(var(--biz-green))] shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Leadership is aligned on direction</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(var(--biz-green))] shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">You have financial reserves or access to growth capital</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(var(--biz-green))] shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">You have specific, measurable growth goals</span>
                  </li>
                </ul>
              </div>
              
              {/* Yellow Light */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-amber-500" />
                  🟡 Yellow Light (Needs Attention Before Growing)
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Profitability is inconsistent or margins are thin</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Processes depend heavily on one or two people</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Customer satisfaction is good but not exceptional</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Team has some capacity but is already busy</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Leadership agrees on direction but execution is unclear</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">You have limited financial reserves</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Growth goals are more hope than plan</span>
                  </li>
                </ul>
              </div>
              
              {/* Red Light */}
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <XCircle className="w-6 h-6 text-destructive" />
                  🔴 Red Light (Fix These First, Don't Grow Yet)
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Profitability is declining or you're losing money</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Processes are undocumented and chaotic</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Customer satisfaction is declining</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Team is already overwhelmed</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Leadership is divided on priorities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">You have no financial reserves and limited access to capital</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">You don't know why customers choose you</span>
                  </li>
                </ul>
              </div>
              
              <p className="text-muted-foreground">
                If you're at <strong>yellow light</strong>, you can grow—but do it carefully, measure it constantly, and be willing to pause if cracks appear. If you're at <strong>red light</strong>, growing now is almost guaranteed to fail. Spend 6-12 months fixing the foundation first.
              </p>
            </section>
            
            {/* Fast vs Sustainable Growth */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">The Growth Sustainability Question: Fast Growth vs. Sustainable Growth</h2>
              
              <p className="text-muted-foreground mb-8">
                Not all growth is created equal.
              </p>
              
              {/* Fast Growth */}
              <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <XCircle className="w-6 h-6 text-destructive" />
                  Fast Growth (The Trap)
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Driven by chasing trends, aggressive discounts, or external pressure to grow</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Requires constant capital injection to keep the machine running</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Sacrifices quality and culture for revenue</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Leaves technical debt in its wake</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Creates burnout and turnover</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Appears successful until it suddenly collapses</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <span className="text-muted-foreground"><strong>70-90% failure rate</strong></span>
                  </li>
                </ul>
              </div>
              
              {/* Sustainable Growth */}
              <div className="bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/30 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 text-foreground flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-[hsl(var(--biz-green))]" />
                  Sustainable Growth (The Winner)
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(var(--biz-green))] shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Driven by deeper customer understanding, strong positioning, and consistent value delivery</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(var(--biz-green))] shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Can be repeated without burning cash or burning out people</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(var(--biz-green))] shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Maintains and strengthens quality and culture</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(var(--biz-green))] shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Builds scalable systems over time</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(var(--biz-green))] shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Creates engaged, committed teams</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(var(--biz-green))] shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Is profitable and repeatable</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[hsl(var(--biz-green))] shrink-0 mt-0.5" />
                    <span className="text-muted-foreground"><strong>More modest numbers but actually sustainable</strong></span>
                  </li>
                </ul>
              </div>
              
              <p className="text-muted-foreground">
                Ask yourself honestly: <strong>"Can this growth be repeated sustainably without burning out our people or our cash flow?"</strong> If the answer is no, you're chasing fast growth, not building sustainable growth. The winners in small business over the next decade won't be the ones that grew fastest. They'll be the ones that grew smartly, at a pace their foundations could support.
              </p>
            </section>
            
            {/* Strategic Growth Plan */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Building Your Sustainable Growth Plan: The Strategic Framework</h2>
              
              <p className="text-muted-foreground mb-8">
                Once your foundation is solid, growth becomes a strategic question: <strong>"Which growth opportunity creates the most value with the least disruption to our current business?"</strong>
              </p>
              
              {/* Growth Options */}
              <div className="space-y-6 mb-8">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-3 text-foreground">Growth Option 1: Deepen with Existing Customers</h3>
                  <p className="text-muted-foreground">
                    Before you chase new customers, extract more value from the ones you have. Can existing customers buy more? More frequently? Are there complementary products or services you could offer? This growth requires <strong>no new customer acquisition costs</strong>, leverages existing relationships, and typically has the highest profit margins.
                  </p>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-3 text-foreground">Growth Option 2: New Customers in Your Current Market</h3>
                  <p className="text-muted-foreground">
                    Once existing customers are optimized, acquire new customers in your existing market. You understand this market. Your product/service is proven. You just need to find more people like your best customers. This growth is <strong>lower risk</strong> than entering new markets.
                  </p>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-3 text-foreground">Growth Option 3: Enter Adjacent Markets</h3>
                  <p className="text-muted-foreground">
                    New customer segments or geographies that are similar to what you know. This requires more market learning but leverages existing capabilities. E.g., a service business that adds a new service line or enters a new geography.
                  </p>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-3 text-foreground">Growth Option 4: Expand Your Offering</h3>
                  <p className="text-muted-foreground">
                    New products or services. This requires more development investment and carries more risk, because you're operating in less proven territory. Usually makes sense only when you've maxed out growth in your core business.
                  </p>
                </div>
              </div>
              
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-8">
                <p className="text-foreground font-medium">
                  <strong>Most growth failures come from trying Growth Option 4 before exhausting Options 1-3.</strong> Be systematic about it.
                </p>
              </div>
            </section>
            
            {/* BizHealth.ai CTA */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">The Role of Business Clarity Tools: Knowing What You're Working With</h2>
              
              <p className="text-muted-foreground mb-6">
                Growth decisions require clarity. Many business owners are growing blind—they don't actually know their profitability by customer segment, they don't know which processes are scalable, they don't know whether their team has capacity, they don't have a shared understanding of strategic direction.
              </p>
              
              <p className="text-muted-foreground mb-6">
                Tools like <Link to="/pricing" className="text-primary hover:underline font-medium">BizHealth.ai</Link> are instrumental in helping business owners move from intuition-based decisions to data-based ones. A comprehensive business health assessment across operations, finances, strategy, and team provides the clarity to answer critical questions:
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Where is your business actually strong?</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Where are the hidden vulnerabilities?</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">What would break first under growth pressure?</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">What needs to be fixed before attempting to scale?</span>
                </li>
              </ul>
              
              <p className="text-muted-foreground">
                This diagnostic work prevents you from pursuing growth that will fail. It identifies the foundation gaps that need attention. It clarifies the actual sustainable growth rate your business can support given your current financial structure, operational maturity, and team capacity.
              </p>
            </section>
            
            {/* Conclusion */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-foreground">The Bottom Line: Ready, Set, Grow (Sustainably)</h2>
              
              <p className="text-muted-foreground mb-6">
                Growth isn't a moral imperative. Some business owners want to grow because it genuinely excites them. Others feel pressured by competitors or investors or their own ambitions. The question isn't whether you should grow. <strong>It's whether your business is ready to grow.</strong>
              </p>
              
              <p className="text-muted-foreground mb-6">
                A business that's financially solid, operationally scalable, team-aligned, customer-loyal, and strategically clear can grow profitably. A business that skips the foundation work and pursues growth anyway becomes a cautionary tale.
              </p>
              
              <div className="bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/30 rounded-lg p-6 mb-8">
                <p className="text-foreground font-medium text-lg">
                  The 78% of small business owners who want to grow this year? Many of them will succeed. But the ones who win will be the ones who took time to honestly assess their readiness, fix what was broken, and then grew at a pace their foundation could support.
                </p>
                <p className="text-foreground font-bold mt-4">
                  That's not modest or uninspired. It's the only growth strategy that actually lasts.
                </p>
              </div>
            </section>
            
            {/* CTA Section */}
            <section className="bg-card border border-border rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Ready to Assess Your Business's Growth Readiness?</h3>
              <p className="text-muted-foreground mb-6">
                Get a comprehensive business health assessment that reveals your foundation's strengths and gaps before you pursue growth.
              </p>
              <Link 
                to="/pricing" 
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Get Your Business Health Assessment
                <ArrowRight className="w-5 h-5" />
              </Link>
            </section>
            
          </div>
        </div>
      </article>
      
      <GlobalFooter />
    </div>
  );
};

export default GrowthTrapOrGrowthEngine;
