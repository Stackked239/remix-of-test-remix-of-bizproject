import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import GradientDivider from "@/components/GradientDivider";
import PromotionalBanner from "@/components/PromotionalBanner";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import RelatedArticles from "@/components/RelatedArticles";
import { Calendar, Clock, User, AlertTriangle, CheckCircle, Users, Target, FileText, Briefcase, TrendingUp, Shield, MessageSquare, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hr-program-small-business-asset-multiplier.jpg";
import authorIcon from "@/assets/bizhealth-author-icon.jpg";

const HRComponent = ({ 
  number, 
  title, 
  description, 
  items, 
  icon: Icon, 
  color 
}: { 
  number: string; 
  title: string; 
  description: string;
  items: string[];
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
          Component {number}
        </span>
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
      </div>
    </div>
    <p className="text-muted-foreground mb-4">{description}</p>
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-foreground">
          <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
          <span className="text-sm">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const CostItem = ({ 
  label, 
  amount, 
  description 
}: { 
  label: string; 
  amount: string;
  description: string;
}) => (
  <div className="flex items-start gap-4 p-5 rounded-xl bg-red-500/5 border border-red-500/20 hover:border-red-500/40 transition-colors">
    <div className="p-2 rounded-lg bg-red-500/10 flex-shrink-0">
      <AlertTriangle className="w-5 h-5 text-red-500" />
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2 flex-wrap mb-1">
        <span className="font-bold text-foreground text-base">{label}:</span>
        <span className="text-lg font-bold text-red-500">{amount}</span>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

const HRProgramAssetMultiplier = () => {
  const hrComponents = [
    {
      number: "1",
      title: "Clear Job Descriptions",
      description: "Every person should have a written job description that covers:",
      items: [
        "Main responsibilities",
        "Success criteria (how will we know you are doing well?)",
        "Who you report to",
        "Decision-making authority",
        "Development path (what is possible for growth in this role?)"
      ],
      icon: FileText,
      color: "border-blue-500/30"
    },
    {
      number: "2",
      title: "Hiring Process",
      description: "Create a repeatable hiring process:",
      items: [
        "Define what you are looking for (skills, values, fit)",
        "Source candidates and screen resumes",
        "Interview with structured questions for fair assessment",
        "Check references (actually call them)",
        "Make decision based on assessment, not gut feel",
        "Onboard properly"
      ],
      icon: Users,
      color: "border-purple-500/30"
    },
    {
      number: "3",
      title: "Onboarding",
      description: "Real onboarding includes structured first weeks:",
      items: [
        "First-day logistics (desk, computer, access, systems)",
        "Company tour and introduction to team",
        "Role clarity (here is your job description, here is what success looks like)",
        "Initial training (here is how we do things)",
        "30-60-90 day check-ins (how are you doing? What do you need?)"
      ],
      icon: BookOpen,
      color: "border-emerald-500/30"
    },
    {
      number: "4",
      title: "Regular One-on-Ones",
      description: "Meet with each direct report at least weekly or bi-weekly for 30 minutes:",
      items: [
        "Discuss their work and progress",
        "Provide feedback (both positive and corrective)",
        "Talk about career development",
        "Listen to concerns",
        "Build relationship"
      ],
      icon: MessageSquare,
      color: "border-amber-500/30"
    },
    {
      number: "5",
      title: "Feedback & Performance Management",
      description: "Do not wait for annual reviews to give feedback:",
      items: [
        "Weekly in one-on-ones: 'Here is what you did well. Here is where I saw a gap.'",
        "Monthly: Review performance against role expectations",
        "Quarterly: Deeper conversation about development and growth",
        "Annually: Formal performance review with compensation decisions"
      ],
      icon: Target,
      color: "border-pink-500/30"
    },
    {
      number: "6",
      title: "Development & Career Pathing",
      description: "Help people see a future in your company:",
      items: [
        "What skills do they need to develop?",
        "What training is available?",
        "What role could they grow into?",
        "How will you support that growth?"
      ],
      icon: TrendingUp,
      color: "border-cyan-500/30"
    },
    {
      number: "7",
      title: "Compensation & Recognition",
      description: "Pay people fairly for the market and their performance:",
      items: [
        "Recognize good work publicly",
        "Give bonuses or raises when people deliver",
        "Celebrate wins",
        "Make people feel valued"
      ],
      icon: Briefcase,
      color: "border-indigo-500/30"
    },
    {
      number: "8",
      title: "Accountability & Consequences",
      description: "If someone is not meeting expectations, address it directly and fairly:",
      items: [
        "'Here is the expectation.'",
        "'Here is where you are falling short.'",
        "'Here is what needs to change.'",
        "'Here is the timeline.'",
        "Give them a chance to improve. If they do not, make the hard decision."
      ],
      icon: Shield,
      color: "border-orange-500/30"
    }
  ];

  const realCosts = [
    { 
      label: "Bad Hire Cost", 
      amount: "$30,000-50,000",
      description: "Lost productivity, rework, and team disruption over six months in a 10-person company" 
    },
    { 
      label: "Annual Productivity Loss", 
      amount: "2-4%",
      description: "If you hire two bad people a year—tens of thousands of dollars in a small business" 
    },
    { 
      label: "Turnover Cost", 
      amount: "50-200% of salary",
      description: "Recruiting, training, lost productivity, and disruption per departure" 
    },
    { 
      label: "Poor Culture Cost", 
      amount: "$30,000-60,000/year",
      description: "10-20% productivity loss across a 10-person team from disengagement" 
    }
  ];

  const whyOwnersAvoid = [
    "It feels uncomfortable—dealing with performance issues and difficult conversations feels hard",
    "It feels time-consuming—regular one-on-ones and feedback take time",
    "It feels bureaucratic—they see corporate HR with policies and forms",
    "It feels not urgent—HR issues get deprioritized until something blows up",
    "It feels expensive—worry that systems mean hiring an HR person"
  ];

  const whatYouGet = [
    "Higher productivity and quality",
    "Lower turnover and recruiting costs",
    "Better customer relationships (because your team cares)",
    "Better decisions (because people feel safe speaking up)",
    "Better innovation (because people are engaged)",
    "Lower stress on you (because you are not constantly fighting fires)"
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="HR Program as Asset & Multiplier for Small Business | BizHealth.ai"
        description="Discover why an HR program is not a cost but an asset and multiplier for your small business. Learn the 9 components of effective SMB HR and stop losing $30K-50K per bad hire."
        keywords="HR program small business, small business HR strategy, employee retention SMB, hiring process small business, HR as asset multiplier, HR for SMB, human resources small business, talent management, employee development, performance management, onboarding process, job descriptions, one-on-ones, employee turnover cost, retention strategies, culture building, HR systems"
        canonical="https://bizhealth.ai/blog/hr-program-asset-multiplier-small-business"
        ogType="article"
        ogImage="/og-images/og-hr-asset-multiplier.jpg"
        articlePublishedTime="2026-01-06T00:00:00Z"
        articleModifiedTime="2026-01-06T00:00:00Z"
        articleAuthor="BizHealth.ai Research Team"
      />
      <StructuredData
        type="blogPosting"
        headline="Embracing an HR Program as an Asset & Multiplier to Your Small Business"
        description="Discover why an HR program is not a cost but an asset and multiplier for your small business. Learn the 9 components of effective SMB HR and stop losing $30K-50K per bad hire."
        image="https://bizhealth.ai/og-images/og-hr-program-asset-multiplier.jpg"
        datePublished="2026-01-06"
        dateModified="2026-01-06"
        author="BizHealth.ai Research Team"
        url="https://bizhealth.ai/blog/hr-program-asset-multiplier-small-business"
        keywords={["HR program small business", "employee retention", "hiring process", "SMB human resources", "talent management"]}
      />
      
      <GlobalNavigation />
      
      <article className="pt-32 pb-16">
        {/* Hero Section */}
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-amber-500/10" />
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
                {["Operations", "Business Leadership", "Business Strategy"].map((cat) => (
                  <span key={cat} className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                    {cat}
                  </span>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Embracing an HR Program as an Asset & Multiplier to Your Small Business
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                Most small business owners avoid HR. They see it as bureaucratic, expensive, and unnecessary. But this thinking costs them—in people leaving, reduced morale, legal exposure, and poor hiring decisions.
              </p>
              
              {/* Author & Meta info */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <img 
                    src={authorIcon} 
                    alt="BizHealth.ai Research Team author" 
                    className="w-8 h-8 rounded-full object-cover"
                    loading="lazy"
                  />
                  <span>BizHealth.ai Research Team</span>
                </div>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  January 6, 2026
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  11 min read
                </span>
              </div>
              
              {/* Hero image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Small business owner experiencing employee turnover stress as worker leaves with toolbox - HR program prevents costly talent loss"
                  className="w-full h-auto object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </header>
        
        {/* Article Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
            
            {/* Opening Story */}
            <div className="not-prose bg-gradient-to-r from-red-500/5 via-amber-500/5 to-emerald-500/5 rounded-2xl p-8 mb-12 border border-primary/10">
              <p className="text-lg text-foreground mb-4">
                You avoid the conversation because you know it is going to be difficult. One of your best people is disengaged. You can feel it. Their work quality is declining. They seem frustrated. But addressing it means having an uncomfortable conversation, and you are not sure what to say or how to handle it.
              </p>
              <p className="text-lg font-semibold text-foreground mb-4">
                So you do nothing.
              </p>
              <p className="text-muted-foreground">
                Two weeks later, they give notice. They found another job. Now you are scrambling to replace them. Recruiting takes time. Training takes time. For three months, productivity drops and quality suffers. Then the new person takes another month to get up to speed.
              </p>
              <p className="text-xl font-bold text-red-500 mt-4">
                You have just lost six months of productivity from one person leaving—and you could have prevented it with one difficult conversation.
              </p>
            </div>

            {/* Cost of No HR Program - Enhanced Section */}
            <div className="not-prose bg-background rounded-2xl p-8 border-2 border-red-500/20 my-12 shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <AlertTriangle className="w-7 h-7 text-red-500" />
                This is the reality of not having an HR program.
              </h2>
              
              <p className="text-lg text-muted-foreground mb-6">
                Most small business owners avoid HR. They see it as bureaucratic, expensive, and unnecessary. They think: <span className="italic text-foreground">"We are small. We do not need HR stuff. Let's just focus on the business."</span>
              </p>
              
              <div className="bg-red-500/5 rounded-xl p-6 border border-red-500/20 mb-6">
                <p className="font-semibold text-foreground mb-4">But this thinking costs them:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">People leaving unexpectedly</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Reduced morale across the team</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Legal exposure and liability</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Poor hiring decisions that haunt them for years</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Culture that slowly erodes</span>
                  </li>
                </ul>
              </div>
              
              <p className="text-lg font-semibold text-primary mb-4">
                And the tragedy is that the business owners who need HR the most—the ones who find managing people difficult—are usually the ones who avoid it the most.
              </p>
              
              <div className="bg-emerald-500/10 rounded-xl p-6 border border-emerald-500/30">
                <p className="text-foreground">
                  This article is about why that is backward thinking. <strong className="text-primary">An HR program is not a cost. It is an asset and a multiplier.</strong> When done right, it transforms how your business operates, how your team performs, and how much money you actually make.
                </p>
              </div>
            </div>

            {/* The Real Cost Section */}
            <h2 className="text-3xl font-bold text-foreground mt-16 mb-6 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-red-500" />
              The Real Cost of No HR Program
            </h2>

            <div className="not-prose grid gap-4 my-8">
              {realCosts.map((cost, index) => (
                <CostItem key={index} {...cost} />
              ))}
            </div>

            {/* The Four Problems - Enhanced Grid */}
            <div className="not-prose grid md:grid-cols-2 gap-6 my-12">
              {/* The Hiring Problem */}
              <div className="rounded-2xl border-2 border-purple-500/30 p-6 bg-gradient-to-br from-background to-purple-500/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-purple-500/10">
                    <Users className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">The Hiring Problem</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Without an HR process, hiring becomes reactive. Someone leaves. You panic. You hire the first person who seems okay.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2 text-sm text-foreground">
                    <AlertTriangle className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>No careful reference checks</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground">
                    <AlertTriangle className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>No cultural fit assessment</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground">
                    <AlertTriangle className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>No clear understanding of role needs</span>
                  </li>
                </ul>
                <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/20">
                  <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                    Result: Wrong hire 30-40% of the time → 6 months lost productivity
                  </p>
                </div>
              </div>

              {/* The Retention Problem */}
              <div className="rounded-2xl border-2 border-amber-500/30 p-6 bg-gradient-to-br from-background to-amber-500/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-amber-500/10">
                    <TrendingUp className="w-6 h-6 text-amber-500" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">The Retention Problem</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Without an HR program, you have no retention strategy. People leave when frustrated or disengaged. What you don't hear:
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2 text-sm text-foreground italic">
                    <MessageSquare className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>"I did not feel heard."</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground italic">
                    <MessageSquare className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>"My manager never gave me feedback."</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground italic">
                    <MessageSquare className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>"I felt like I was just a number."</span>
                  </li>
                </ul>
                <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/20">
                  <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                    Result: Constant recruiting, training, rebuilding → Never gaining momentum
                  </p>
                </div>
              </div>

              {/* The Culture Problem */}
              <div className="rounded-2xl border-2 border-blue-500/30 p-6 bg-gradient-to-br from-background to-blue-500/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-blue-500/10">
                    <Target className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">The Culture Problem</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Without an HR program, culture happens by accident, not design. And culture by accident is usually not good.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2 text-sm text-foreground">
                    <AlertTriangle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Weak performers get lazier (no accountability)</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground">
                    <AlertTriangle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Strong performers get frustrated (no recognition)</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground">
                    <AlertTriangle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>People don't feel safe speaking up</span>
                  </li>
                </ul>
                <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/20">
                  <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                    Result: Culture drifts → Mistakes increase → Quality declines
                  </p>
                </div>
              </div>

              {/* The Legal Problem */}
              <div className="rounded-2xl border-2 border-red-500/30 p-6 bg-gradient-to-br from-background to-red-500/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-red-500/10">
                    <Shield className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">The Legal Problem</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Without an HR program, you have no documentation. When you need to let someone go or face an unfair treatment claim:
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2 text-sm text-foreground">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>No clear expectations documented</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>No performance records</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>No proper onboarding/offboarding trail</span>
                  </li>
                </ul>
                <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/20">
                  <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                    Result: Defending a lawsuit = $10K+ in fees. Losing = $100K+
                  </p>
                </div>
              </div>
            </div>

            {/* What a Small Business HR Program Actually Is - Enhanced */}
            <div className="not-prose bg-gradient-to-br from-primary/5 via-background to-emerald-500/5 rounded-2xl p-8 border-2 border-primary/20 my-12">
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Briefcase className="w-8 h-8 text-primary" />
                What a Small Business HR Program Actually Is
              </h2>

              <p className="text-lg text-muted-foreground mb-6">
                When people think "HR," they often think of a large corporate HR department with lots of bureaucracy and policies. <strong className="text-foreground">That is not what a small business needs.</strong>
              </p>

              <p className="text-foreground mb-6">
                A small business HR program is simpler. It is a set of systems and practices that help you:
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-background border border-primary/20">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="font-medium text-foreground">Hire the right people</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-background border border-primary/20">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="font-medium text-foreground">Set clear expectations</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-background border border-primary/20">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="font-medium text-foreground">Give regular feedback</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-background border border-primary/20">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="font-medium text-foreground">Develop people</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-background border border-primary/20">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="font-medium text-foreground">Recognize & reward performance</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-background border border-primary/20">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="font-medium text-foreground">Manage culture intentionally</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-background border border-primary/20">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="font-medium text-foreground">Handle problems fairly</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-background border border-primary/20">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="font-medium text-foreground">Protect yourself legally</span>
                </div>
              </div>

              <div className="bg-primary/10 rounded-xl p-4 border border-primary/30">
                <p className="text-lg font-semibold text-foreground text-center">
                  This does not require hiring an HR person. It does not require lots of policies. <span className="text-primary">It requires intentionality.</span>
                </p>
              </div>
            </div>

            {/* The Components Grid */}
            <h2 className="text-3xl font-bold text-foreground mt-16 mb-8 flex items-center gap-3">
              <Target className="w-8 h-8 text-emerald-500" />
              The 9 Components of a Small Business HR Program
            </h2>

            <div className="not-prose grid md:grid-cols-2 gap-6 my-8">
              {hrComponents.map((component, index) => (
                <HRComponent key={index} {...component} />
              ))}
            </div>

            {/* Component 9: Documentation */}
            <div className="not-prose rounded-2xl border-2 border-slate-500/30 p-6 bg-gradient-to-br from-background to-muted/30 my-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-slate-500/10">
                  <FileText className="w-6 h-6 text-slate-500" />
                </div>
                <div>
                  <span className="text-sm font-bold uppercase tracking-wide text-slate-500">
                    Component 9
                  </span>
                  <h3 className="text-xl font-bold text-foreground">Documentation</h3>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">Keep records of:</p>
              <ul className="space-y-2">
                {["Job descriptions", "Performance reviews", "Feedback conversations", "Development plans", "Any performance issues and how they were addressed"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-foreground">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-primary font-medium mt-4">
                Documentation protects you legally and shows you are taking people seriously.
              </p>
            </div>

            {/* Why Business Owners Avoid HR */}
            <h2 className="text-3xl font-bold text-foreground mt-16 mb-6 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-amber-500" />
              Why Small Business Owners Avoid HR
            </h2>

            <p>
              If HR programs are so valuable, why do so many small business owners avoid them?
            </p>

            <div className="not-prose bg-amber-500/5 rounded-xl border border-amber-500/20 p-6 my-8">
              <h4 className="font-bold text-foreground mb-4">The answer usually comes down to these reasons:</h4>
              <ul className="space-y-3">
                {whyOwnersAvoid.map((reason, i) => (
                  <li key={i} className="flex items-start gap-2 text-foreground">
                    <span className="text-amber-500 mt-1">•</span>
                    {reason}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-lg font-bold text-primary">
                But here is the thing: The cost of NOT doing HR is far higher than the cost of doing it.
              </p>
            </div>

            {/* The Shift */}
            <h2 className="text-3xl font-bold text-foreground mt-16 mb-6 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-emerald-500" />
              The Shift: From "I Have to Do HR" to "HR Multiplies My Business"
            </h2>

            <p>
              The shift happens when you realize that investing in HR is not a cost. <strong>It is a multiplier.</strong>
            </p>

            <p>When you have:</p>
            <ul>
              <li>People who feel valued and connected to the mission</li>
              <li>People who are clear on what success looks like</li>
              <li>People who are growing and developing</li>
              <li>A culture where good work is recognized and poor work is addressed</li>
              <li>A team that stays longer and works with more engagement</li>
            </ul>

            <div className="not-prose bg-emerald-500/5 rounded-xl border border-emerald-500/20 p-6 my-8">
              <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                You Get:
              </h4>
              <ul className="space-y-2">
                {whatYouGet.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-foreground">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-lg font-semibold text-foreground">
                A 10-person company with strong HR practices is more productive and profitable than a 12-person company with poor HR practices. You get more output from fewer people.
              </p>
              <p className="text-primary font-bold mt-2">
                This is what we mean by HR as a multiplier. It makes your business work better.
              </p>
            </div>

            {/* For the Leader Who Finds Managing People Difficult */}
            <h2 className="text-3xl font-bold text-foreground mt-16 mb-6 flex items-center gap-3">
              <Users className="w-8 h-8 text-purple-500" />
              For the Leader Who Finds Managing People Difficult
            </h2>

            <p>
              If you are someone who finds managing people difficult—if it is one of the least favorite parts of being a business owner—then HR programs are even more important, not less.
            </p>

            <p>
              <strong>Here is why: Good HR systems reduce the ambiguity and emotion around managing people. They create structure.</strong>
            </p>

            <div className="not-prose space-y-4 my-8">
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="text-sm text-muted-foreground mb-2">Instead of:</p>
                <p className="text-foreground italic">"I have to give someone feedback and I do not know what to say or how to handle it"</p>
                <p className="text-sm text-muted-foreground mt-3 mb-2">You have:</p>
                <p className="text-foreground font-medium">"I have a one-on-one every week, feedback is part of the regular conversation, and there is a process for handling performance issues."</p>
              </div>
              
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="text-sm text-muted-foreground mb-2">Instead of:</p>
                <p className="text-foreground italic">"Someone seems disengaged and I do not know what to do"</p>
                <p className="text-sm text-muted-foreground mt-3 mb-2">You have:</p>
                <p className="text-foreground font-medium">"I notice performance is declining, I ask in our one-on-one what is going on, and we problem-solve together."</p>
              </div>
              
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="text-sm text-muted-foreground mb-2">Instead of:</p>
                <p className="text-foreground italic">"I need to let someone go but I am worried about how to handle it fairly"</p>
                <p className="text-sm text-muted-foreground mt-3 mb-2">You have:</p>
                <p className="text-foreground font-medium">"I have documentation of performance issues and conversations, and I have a clear process for making this decision."</p>
              </div>
            </div>

            <p>
              Systems do not eliminate the discomfort of managing people. But they reduce it. They give you a framework. And a framework makes the hard stuff easier.
            </p>

            {/* The Role of Visibility and Assessment - Enhanced */}
            <div className="not-prose bg-gradient-to-br from-blue-500/5 via-background to-cyan-500/5 rounded-2xl p-8 border-2 border-blue-500/20 my-12">
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Target className="w-8 h-8 text-blue-500" />
                The Role of Visibility and Assessment
              </h2>

              <p className="text-lg text-muted-foreground mb-6">
                As you build your HR program, you need to know if it is working. Track these key metrics:
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-background border border-blue-500/20">
                  <h4 className="font-bold text-foreground mb-2">Turnover Rate</h4>
                  <p className="text-sm text-muted-foreground">Are people staying longer?</p>
                </div>
                <div className="p-4 rounded-xl bg-background border border-blue-500/20">
                  <h4 className="font-bold text-foreground mb-2">Time to Productivity</h4>
                  <p className="text-sm text-muted-foreground">Are new hires getting productive faster?</p>
                </div>
                <div className="p-4 rounded-xl bg-background border border-blue-500/20">
                  <h4 className="font-bold text-foreground mb-2">Employee Engagement</h4>
                  <p className="text-sm text-muted-foreground">Do people feel engaged? (You can ask them)</p>
                </div>
                <div className="p-4 rounded-xl bg-background border border-blue-500/20">
                  <h4 className="font-bold text-foreground mb-2">Performance</h4>
                  <p className="text-sm text-muted-foreground">Are people delivering better results?</p>
                </div>
                <div className="p-4 rounded-xl bg-background border border-blue-500/20">
                  <h4 className="font-bold text-foreground mb-2">Quality</h4>
                  <p className="text-sm text-muted-foreground">Are mistakes declining?</p>
                </div>
                <div className="p-4 rounded-xl bg-background border border-blue-500/20">
                  <h4 className="font-bold text-foreground mb-2">Customer Satisfaction</h4>
                  <p className="text-sm text-muted-foreground">Is service quality improving?</p>
                </div>
              </div>

              <div className="bg-primary/10 rounded-xl p-6 border border-primary/30">
                <p className="text-foreground">
                  Tools like <Link to="/how-it-works" className="text-primary hover:underline font-semibold">BizHealth.ai</Link> can help you assess whether your HR and people management practices are working. By evaluating engagement, retention, leadership depth, and team alignment, these assessments show you clearly whether your HR investments are paying off. <strong>Rather than guessing, you get data.</strong>
                </p>
              </div>
            </div>

            {/* The Bottom Line */}
            <h2 className="text-3xl font-bold text-foreground mt-16 mb-6">The Bottom Line</h2>

            <div className="not-prose bg-gradient-to-r from-primary/10 to-emerald-500/10 rounded-2xl p-8 border border-primary/20 my-8">
              <p className="text-lg text-foreground mb-4">
                <strong>An HR program is not a luxury. It is not bureaucracy. It is not something to add when you have time.</strong>
              </p>
              <p className="text-xl font-bold text-foreground mb-4">
                It is a foundation for a healthy, productive, profitable business.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-foreground">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  If you find managing people difficult, an HR program is what makes it manageable.
                </li>
                <li className="flex items-start gap-2 text-foreground">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  If you want to keep your best people, an HR program is how you do it.
                </li>
                <li className="flex items-start gap-2 text-foreground">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  If you want to grow without chaos, an HR program is your answer.
                </li>
              </ul>
              <p className="text-lg font-semibold text-primary">
                Start this week. Create a job description. Schedule a one-on-one. Ask your team what they need from you.
              </p>
              <p className="text-xl font-bold text-foreground mt-4">
                Your people are your most valuable asset. Treat them like it.
              </p>
            </div>

            {/* CTA */}
            <div className="not-prose mt-12">
              <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Ready to Assess Your Business Health?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Discover how your HR practices, team alignment, and operational systems compare to industry benchmarks. Get actionable insights to build a stronger business.
                </p>
                <Link 
                  to="/how-it-works"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Learn How It Works
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
        
        {/* Related Articles - Reduced spacing */}
        <div className="container mx-auto px-4 pb-8">
          <div className="max-w-6xl mx-auto">
            <RelatedArticles 
              articles={[
                { title: "Employee Retention, Company Culture, and the Underrated Power of Day-to-Day Leadership", slug: "/blog/employee-retention-company-culture-leadership", category: "Human Resources", excerpt: "Learn why employee retention is a leadership problem, not an HR problem." },
                { title: "From Chaos to Clarity: A Lightweight Operating Rhythm for Scaling Your Business Teams", slug: "/blog/chaos-to-clarity-operating-rhythm-scaling-teams", category: "Operations", excerpt: "Install a lightweight operating rhythm to scale your business teams." },
                { title: "The Myths, Mistakes, and Importance of Sharing Vision as a Business Owner", slug: "/blog/vision-sharing-business-owner", category: "Business Leadership", excerpt: "Discover why 'they should already know' is the vision myth destroying team alignment." }
              ]}
            />
          </div>
        </div>
      </article>
      
      <PromotionalBanner />
      <GlobalFooter />
    </div>
  );
};

export default HRProgramAssetMultiplier;
