import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import PromotionalBanner from "@/components/PromotionalBanner";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import RelatedArticles from "@/components/RelatedArticles";
import { Calendar, Clock, User, Target, AlertTriangle, CheckCircle, TrendingUp, DollarSign, Users, Zap, BarChart3, Mail, Phone, Globe, Megaphone, ArrowRight, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/overcoming-marketing-challenges-small-business-strategic-growth.jpg";
import authorImage from "@/assets/bizhealth-author-icon.jpg";

const MistakeCard = ({ 
  number, 
  title, 
  problem, 
  fix, 
  icon: Icon 
}: { 
  number: string; 
  title: string; 
  problem: string[];
  fix: string[];
  icon: React.ElementType;
}) => (
  <div className="rounded-2xl border-2 border-primary/20 p-6 bg-gradient-to-br from-background to-muted/30">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-3 rounded-xl bg-red-500/10">
        <Icon className="w-6 h-6 text-red-500" />
      </div>
      <div>
        <span className="text-sm font-bold uppercase tracking-wide text-red-500">
          Mistake #{number}
        </span>
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
      </div>
    </div>
    <div className="mb-4">
      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-500" />
        The Problem
      </h4>
      <ul className="space-y-1 text-muted-foreground text-sm">
        {problem.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
    <div>
      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
        <CheckCircle className="w-4 h-4 text-emerald-500" />
        How to Fix It
      </h4>
      <ul className="space-y-1 text-muted-foreground text-sm">
        {fix.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const StackItem = ({ 
  number, 
  title, 
  description, 
  items, 
  icon: Icon 
}: { 
  number: string; 
  title: string; 
  description: string;
  items: string[];
  icon: React.ElementType;
}) => (
  <div className="p-5 rounded-xl border border-border bg-card">
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 rounded-lg bg-primary/10">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <span className="text-xs font-bold px-2 py-1 rounded bg-primary/10 text-primary">{number}</span>
      <h4 className="font-bold text-foreground">{title}</h4>
    </div>
    <p className="text-muted-foreground text-sm mb-3">{description}</p>
    <ul className="space-y-1">
      {items.map((item, i) => (
        <li key={i} className="text-sm text-foreground flex items-start gap-2">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const TimelinePhase = ({ 
  weeks, 
  title, 
  items, 
  color 
}: { 
  weeks: string; 
  title: string; 
  items: string[];
  color: string;
}) => (
  <div className={`border-l-4 ${color} pl-4 py-2`}>
    <div className="flex items-center gap-2 mb-2">
      <span className={`text-xs font-bold px-2 py-1 rounded ${color.replace('border-', 'bg-').replace('-500', '-500/20')} ${color.replace('border-', 'text-')}`}>
        {weeks}
      </span>
      <h4 className="font-bold text-foreground">{title}</h4>
    </div>
    <ul className="space-y-1">
      {items.map((item, i) => (
        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
          <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${color.replace('border-', 'bg-')}`} />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const RhythmCard = ({ 
  frequency, 
  time, 
  tasks, 
  color 
}: { 
  frequency: string; 
  time: string; 
  tasks: string[];
  color: string;
}) => (
  <div className={`p-5 rounded-xl border-2 ${color} bg-card`}>
    <div className="flex items-center justify-between mb-3">
      <h4 className={`font-bold text-lg ${color.replace('border-', 'text-').replace('/30', '')}`}>{frequency}</h4>
      <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">{time}</span>
    </div>
    <ul className="space-y-2">
      {tasks.map((task, i) => (
        <li key={i} className="text-sm text-foreground flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
          {task}
        </li>
      ))}
    </ul>
  </div>
);

const OvercomingMarketingChallenges = () => {
  const mistakes = [
    {
      number: "1",
      title: "No Clear Target Customer",
      problem: [
        "Trying to serve everyone results in reaching no one",
        "Generic messaging that doesn't resonate",
        "Marketing spend scattered across ineffective channels",
        "No rhythm in sales process"
      ],
      fix: [
        "Identify your single best customer—the one you enjoy working with, who pays on time, who refers others",
        "Describe them in detail: demographics, industry, company size, specific problems",
        "Make all marketing decisions for that customer",
        "Specificity attracts more of the right customers"
      ],
      icon: Target
    },
    {
      number: "2",
      title: "Confusing Busy with Strategic",
      problem: [
        "Reacting to whatever lands on your desk first",
        "Copying competitors without understanding why",
        "Trying every trending platform (TikTok, Facebook, SEO) without focus",
        "No answer to: What is the highest leverage way to acquire customers?"
      ],
      fix: [
        "Look at your last 10-20 customers and identify where they came from",
        "Focus on the 3 channels that account for 80% of your customers",
        "Ignore everything else for now—double down on what works",
        "Get excellent at few things instead of trying everything"
      ],
      icon: Zap
    },
    {
      number: "3",
      title: "No Feedback Loop",
      problem: [
        "Running campaigns with no way to measure if they work",
        "Checking results months later with no tracking in place",
        "Like driving with no instruments until you crash",
        "Expensive and demoralizing guesswork"
      ],
      fix: [
        "Define one metric per channel: leads, conversations, deals, or revenue",
        "Track monthly in a simple spreadsheet",
        "Compare month-to-month and quarter-to-quarter",
        "This single habit transforms marketing from guesswork into science"
      ],
      icon: BarChart3
    }
  ];

  const marketingStack = [
    {
      number: "1",
      title: "A Clear Offer",
      description: "Somewhere potential customers can learn what you do and how to contact you.",
      items: [
        "What do you do?",
        "Who is it for?",
        "Why should they choose you?",
        "How do they get in touch?"
      ],
      icon: Globe
    },
    {
      number: "2",
      title: "A Lead Capture System",
      description: "A way to capture interest so you can follow up within 24 hours.",
      items: [
        "Contact form on website",
        "Phone number or email",
        "Scheduling system for calls",
        "Simple CRM to track conversations"
      ],
      icon: Users
    },
    {
      number: "3",
      title: "A Simple Outbound Approach",
      description: "If customers don't find you, you need to find them.",
      items: [
        "Email outreach with personalized messages",
        "Phone calls (old-fashioned but effective)",
        "Networking and referrals",
        "Content marketing on topics customers care about"
      ],
      icon: Megaphone
    },
    {
      number: "4",
      title: "A Follow-Up System",
      description: "Most sales happen after multiple touchpoints, not the first conversation.",
      items: [
        "Simple email sequence",
        "Regular phone call intervals",
        "Sharing relevant content",
        "Consistency matters more than sophistication"
      ],
      icon: Mail
    }
  ];

  const timelinePhases = [
    {
      weeks: "Week 1-2",
      title: "Clarify Customer & Positioning",
      items: [
        "Identify your best customer (who you enjoy working with, pays, refers)",
        "Describe them in detail",
        "Define positioning: what specific problem do you solve?"
      ],
      color: "border-blue-500"
    },
    {
      weeks: "Week 3-4",
      title: "Audit Current Channels",
      items: [
        "Where did your last 10-20 customers come from?",
        "Which channels generated the most value?",
        "Which are you currently ignoring?"
      ],
      color: "border-purple-500"
    },
    {
      weeks: "Week 5-6",
      title: "Build Your Basic Stack",
      items: [
        "Website or one-pager with clear offer",
        "Lead capture system (form, email, scheduling)",
        "Simple CRM or spreadsheet for tracking"
      ],
      color: "border-cyan-500"
    },
    {
      weeks: "Week 7-10",
      title: "Launch Primary Channel",
      items: [
        "Choose highest-leverage channel where best customers are",
        "Commit to consistent weekly activity",
        "Measure leads, conversations, closed deals"
      ],
      color: "border-emerald-500"
    },
    {
      weeks: "Week 11-12",
      title: "Add Secondary Channel",
      items: [
        "Choose a complementary second channel",
        "Start consistent activity",
        "Measure results"
      ],
      color: "border-amber-500"
    },
    {
      weeks: "Week 13-16",
      title: "Optimize & Refine",
      items: [
        "Review what's working and what's not",
        "Double down on what works, stop what doesn't",
        "Refine messaging based on customer feedback"
      ],
      color: "border-rose-500"
    }
  ];

  const rhythmData = [
    {
      frequency: "Weekly",
      time: "30 minutes",
      tasks: [
        "Identify 5-10 potential customers to reach",
        "Send personalized outreach (email or message)",
        "Follow up with leads from previous weeks"
      ],
      color: "border-blue-500/30"
    },
    {
      frequency: "Monthly",
      time: "2-3 hours",
      tasks: [
        "Review leads and customers acquired",
        "Analyze which channels worked",
        "Review pipeline and adjust focus"
      ],
      color: "border-purple-500/30"
    },
    {
      frequency: "Quarterly",
      time: "Half day",
      tasks: [
        "Is acquisition cost improving or degrading?",
        "Are customers staying (retention) or leaving?",
        "What should we double down on or stop?"
      ],
      color: "border-emerald-500/30"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Overcoming Marketing Challenges as a Small Business | BizHealth.ai"
        description="Learn how to overcome small business marketing challenges with strategic focus. Discover the 3 marketing mistakes SMBs make and a proven 90-day plan for growth."
        keywords="small business marketing challenges, SMB marketing strategy, marketing for small businesses, customer acquisition, marketing mistakes, lead generation, marketing rhythm, positioning strategy, content marketing SMB, 90-day marketing plan"
        canonical="https://bizhealth.ai/blog/overcoming-marketing-challenges-small-business"
        ogType="article"
        ogImage={heroImage}
      />
      
      <StructuredData 
        type="blogPosting"
        headline="Overcoming Marketing Challenges as a Small Business: From Scattered Tactics to Strategic Growth"
        description="Learn how to overcome small business marketing challenges with strategic focus. Discover the 3 marketing mistakes SMBs make and a proven 90-day plan for growth."
        image="https://bizhealth.ai/assets/overcoming-marketing-challenges-small-business-strategic-growth.jpg"
        datePublished="2025-12-30"
        dateModified="2025-12-30"
        author="BizHealth.ai Research Team"
        url="https://bizhealth.ai/blog/overcoming-marketing-challenges-small-business"
        keywords={["small business marketing challenges", "SMB marketing strategy", "marketing for small businesses", "customer acquisition", "90-day marketing plan"]}
      />

      <PromotionalBanner />
      <GlobalNavigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-primary/5 to-background pt-16 md:pt-20 pb-6 md:pb-8">
          <div className="container mx-auto px-4 max-w-5xl">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-muted-foreground">
                <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                <li>/</li>
                <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                <li>/</li>
                <li className="text-foreground">Small Business Marketing Strategy</li>
              </ol>
            </nav>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Link to="/blog?category=Operations" className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-medium hover:bg-blue-500/20 transition-colors">Operations</Link>
              <Link to="/blog?category=Business%20Leadership" className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 text-xs font-medium hover:bg-purple-500/20 transition-colors">Business Leadership</Link>
              <Link to="/blog?category=Business%20Strategy" className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-medium hover:bg-emerald-500/20 transition-colors">Business Strategy</Link>
              <Link to="/blog?category=Sales%20%26%20Marketing" className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs font-medium hover:bg-amber-500/20 transition-colors">Sales & Marketing</Link>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Overcoming Marketing Challenges as a Small Business: From Scattered Tactics to Strategic Growth
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>BizHealth.ai Research Team</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime="2025-12-30">December 30, 2025</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>10 min read</span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={heroImage}
                alt="Small business owner analyzing marketing strategy options for strategic growth and customer acquisition"
                className="w-full h-auto object-cover"
                loading="eager"
              />
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-8 md:py-10">
          <div className="container mx-auto px-4 max-w-4xl">
            
            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                Your business needs more leads. Should you run an ad campaign? What about social media? Should you hire a marketing person?
              </p>
              
              <p className="text-foreground leading-relaxed mb-6">
                You have three options, none of them good. <strong>Option one:</strong> say yes to everything and watch your operating capital evaporate with no clear results. <strong>Option two:</strong> say no and just hope new sales miraculously appear. <strong>Option three:</strong> admit you do not have a marketing strategy and hope no one notices.
              </p>

              <p className="text-foreground leading-relaxed mb-6">
                This is the reality for most small business owners. Marketing feels urgent but also impossible. You know it matters. You know your competitors are doing "something" with marketing. But you do not have the budget, the expertise, or the time to figure out what that something should be.
              </p>

              <p className="text-foreground leading-relaxed mb-6">
                So you do what is easier: you try whatever is trending. You experiment with TikTok because your nephew said it works. You run Google ads because the rep called. You hire a freelancer who promises they can "handle marketing." You try social media for three months, get no results, and give up.
              </p>

              <div className="p-6 rounded-xl bg-primary/5 border border-primary/20 my-8">
                <p className="text-foreground font-medium mb-0">
                  The good news: <strong>marketing challenges for small businesses are not mysteries.</strong> They follow predictable patterns. And they are solvable—without massive budgets or hiring a fancy agency.
                </p>
              </div>
            </div>

            {/* Three Marketing Mistakes */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                The Three Marketing Mistakes Small Businesses Make
              </h2>
              <p className="text-muted-foreground mb-8">
                Most small & mid-size business marketing struggles trace back to three fundamental mistakes. Fix these, and everything else becomes easier.
              </p>

              <div className="grid gap-6">
                {mistakes.map((mistake, index) => (
                  <MistakeCard key={index} {...mistake} />
                ))}
              </div>
            </section>

            {/* Marketing Stack */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                The Marketing Stack Small Businesses Actually Need
              </h2>
              <p className="text-muted-foreground mb-8">
                Many small business owners think they need sophisticated marketing technology: email automation, CRM, landing pages, analytics platforms, social schedulers. In reality, most small businesses need far less.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {marketingStack.map((item, index) => (
                  <StackItem key={index} {...item} />
                ))}
              </div>
            </section>

            {/* Marketing Rhythm */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                The Marketing Rhythm That Works for Small Businesses
              </h2>
              <p className="text-muted-foreground mb-8">
                Most small business owners approach marketing like a hobby—they do it when they remember, or when cash is tight. Marketing works better when it is a rhythm, a regular cadence that becomes part of how the business operates.
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                {rhythmData.map((rhythm, index) => (
                  <RhythmCard key={index} {...rhythm} />
                ))}
              </div>
            </section>

            {/* Positioning */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                The Role of Positioning: Why "Better" Does Not Work
              </h2>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-foreground leading-relaxed mb-6">
                  One fundamental problem many small businesses face: they position themselves as "better" or "cheaper" than competitors. "We provide better customer service." "We are more affordable." "We use better technology."
                </p>

                <p className="text-foreground leading-relaxed mb-6">
                  The problem is that every competitor makes the same claims. <strong>Better and cheaper are not differentiators. They are commoditizers.</strong>
                </p>

                <p className="text-foreground leading-relaxed mb-6">
                  Real positioning answers a different question: <em>For whom is our solution most relevant, and why?</em>
                </p>

                <div className="bg-muted/50 rounded-xl p-6 my-8">
                  <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                    Clear Positioning Examples
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">"We help manufacturing companies transition from manual to automated scheduling." <span className="text-muted-foreground">(Specific customer + problem + solution)</span></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">"We work with growing restaurants who are drowning in operational complexity." <span className="text-muted-foreground">(Specific customer + pain)</span></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">"We are the project management tool built for distributed teams." <span className="text-muted-foreground">(Specific customer + context)</span></span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-xl bg-blue-500/5 border border-blue-500/20">
                  <h4 className="font-bold text-foreground mb-2">Positioning Formula</h4>
                  <p className="text-foreground mb-0">
                    "We help <strong>[specific customer type]</strong> solve <strong>[specific problem]</strong> in a way that <strong>[specific differentiation]</strong>."
                  </p>
                </div>
              </div>
            </section>

            {/* Content Marketing */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                The Content Opportunity Most Small Businesses Miss
              </h2>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-foreground leading-relaxed mb-6">
                  Small businesses often feel they do not have time for content marketing. They see it as a luxury for larger companies with marketing budgets. But content is often the highest-leverage marketing activity for small businesses because:
                </p>

                <div className="grid md:grid-cols-2 gap-4 my-8">
                  <div className="p-4 rounded-lg border border-border bg-card">
                    <DollarSign className="w-6 h-6 text-emerald-500 mb-2" />
                    <h4 className="font-bold text-foreground mb-1">Relatively Cheap</h4>
                    <p className="text-sm text-muted-foreground mb-0">Your time is the primary cost</p>
                  </div>
                  <div className="p-4 rounded-lg border border-border bg-card">
                    <TrendingUp className="w-6 h-6 text-blue-500 mb-2" />
                    <h4 className="font-bold text-foreground mb-1">Compounds Over Time</h4>
                    <p className="text-sm text-muted-foreground mb-0">A blog post from 3 years ago still generates leads</p>
                  </div>
                  <div className="p-4 rounded-lg border border-border bg-card">
                    <Users className="w-6 h-6 text-purple-500 mb-2" />
                    <h4 className="font-bold text-foreground mb-1">Builds Authority</h4>
                    <p className="text-sm text-muted-foreground mb-0">Customers see you as knowledgeable, not desperate</p>
                  </div>
                  <div className="p-4 rounded-lg border border-border bg-card">
                    <Target className="w-6 h-6 text-amber-500 mb-2" />
                    <h4 className="font-bold text-foreground mb-1">Matches Buyer Behavior</h4>
                    <p className="text-sm text-muted-foreground mb-0">Customers search for answers, not ads</p>
                  </div>
                </div>

                <p className="text-foreground leading-relaxed">
                  You do not need to be prolific. One blog post per month, or one short video, or one weekly email sharing insight—these are enough. The key is <strong>consistency and relevance</strong>. Share what you know about your customer's problem. Do not try to be entertaining or viral. Just be useful.
                </p>
              </div>
            </section>

            {/* 90-Day Plan */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Marketing in Practice: A 90-Day Plan
              </h2>
              <p className="text-muted-foreground mb-8">
                If you are starting from scratch or your current marketing is not working, here is a concrete 90-day plan:
              </p>

              <div className="space-y-4">
                {timelinePhases.map((phase, index) => (
                  <TimelinePhase key={index} {...phase} />
                ))}
              </div>
            </section>

            {/* Tools & Partners */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                The Role of Tools and Partners
              </h2>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-foreground leading-relaxed mb-6">
                  As your marketing efforts scale, you may need tools to make them sustainable. Email software to send campaigns. A CRM to track leads. A scheduling system for meetings.
                </p>

                <div className="p-6 rounded-xl bg-primary/5 border border-primary/20 my-8">
                  <p className="text-foreground mb-4">
                    Tools like <Link to="/" className="text-primary font-semibold hover:underline">BizHealth.ai</Link> can also be instrumental—helping you understand whether your marketing efforts are translating into sustainable business growth, identifying gaps in your acquisition funnel, and benchmarking your customer acquisition cost and lifetime value against peer companies.
                  </p>
                  <p className="text-foreground mb-0">
                    Rather than guessing whether your marketing is working, you get <strong>data-driven insights</strong> into which channels are actually driving profitable customer growth.
                  </p>
                </div>

                <p className="text-foreground leading-relaxed">
                  But start simple. Many small businesses buy software tools before they have a process that warrants the tool. <strong>Start with the process—the rhythm, the discipline, the measurement. Then add tools when they become necessary.</strong>
                </p>
              </div>
            </section>

            {/* Final Truth */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                The Final Truth: Marketing Is Not Optional
              </h2>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-foreground leading-relaxed mb-6">
                  Small business owners often treat marketing as something you do when things slow down. But in reality, marketing is the engine that keeps the business growing.
                </p>

                <div className="p-6 rounded-xl bg-emerald-500/5 border border-emerald-500/20 my-8">
                  <h4 className="font-bold text-foreground mb-4">The good news: you do not need a massive budget, an agency, or fancy tools. You need:</h4>
                  <ol className="space-y-3 list-none pl-0">
                    <li className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white text-sm font-bold flex-shrink-0">1</span>
                      <span className="text-foreground"><strong>Clarity</strong> about who you serve and why they choose you</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white text-sm font-bold flex-shrink-0">2</span>
                      <span className="text-foreground"><strong>Focus</strong> on the few channels where your best customers actually are</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white text-sm font-bold flex-shrink-0">3</span>
                      <span className="text-foreground"><strong>Consistency</strong> in showing up and following up</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white text-sm font-bold flex-shrink-0">4</span>
                      <span className="text-foreground"><strong>Measurement</strong> so you know what is working</span>
                    </li>
                  </ol>
                </div>

                <p className="text-foreground leading-relaxed mb-6">
                  These are entirely within your control.
                </p>

                <p className="text-xl font-semibold text-foreground">
                  Start this week. Identify your best customer. Define your positioning. Commit to weekly outreach in your primary channel. Measure the results.
                </p>

                <p className="text-foreground leading-relaxed mt-6">
                  <strong>Marketing is not magic. It is discipline. And discipline is something every small business owner can practice.</strong>
                </p>
              </div>
            </section>

            {/* CTA Section */}
            <section className="my-12 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready to Transform Your Marketing Strategy?
              </h3>
              <p className="text-muted-foreground mb-6">
                Get a comprehensive assessment of your business health, including marketing effectiveness, customer acquisition costs, and growth opportunities.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/pricing" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Get Your Business Health Report
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  to="/how-it-works" 
                  className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
                >
                  Learn How It Works
                </Link>
              </div>
            </section>

            {/* Author Bio */}
            <div className="mt-12 p-6 rounded-xl bg-muted/30 border border-border">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={authorImage} 
                    alt="BizHealth.ai Research Team" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">BizHealth.ai Research Team</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Business Health & Growth Experts
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Our research team combines expertise in small business operations, marketing strategy, financial analysis, and organizational development. We analyze thousands of SMB data points to provide actionable insights for sustainable growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <RelatedArticles 
          articles={[
            { title: "Small Business Financials: Know Your Numbers", slug: "/blog/small-business-financials-know-your-numbers", category: "Financials", excerpt: "Master financial management with this comprehensive guide." },
            { title: "The Growth Trap: Why More Sales Won't Save a Broken Business Model", slug: "/blog/growth-trap-broken-business-model", category: "Strategy", excerpt: "Discover why chasing revenue growth destroys SMBs." },
            { title: "How to Prioritize When There's No One to Delegate To", slug: "/blog/how-to-prioritize-operator-survival-guide", category: "Operations", excerpt: "Master solo entrepreneur prioritization." }
          ]}
        />
      </main>

      <GlobalFooter />
    </div>
  );
};

export default OvercomingMarketingChallenges;
