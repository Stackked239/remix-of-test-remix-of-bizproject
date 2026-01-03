import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import PromotionalBanner from "@/components/PromotionalBanner";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import RelatedArticles from "@/components/RelatedArticles";
import { Calendar, Clock, User, Users, Target, AlertTriangle, CheckCircle, Heart, MessageSquare, Eye, Lightbulb, TrendingUp, DollarSign, FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/employee-retention-day-to-day-leadership-culture.jpg";

const RetentionPillar = ({ 
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
          Foundation {number}
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

const TurnoverCostItem = ({ 
  label, 
  description 
}: { 
  label: string; 
  description: string;
}) => (
  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
    <DollarSign className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
    <div>
      <span className="font-semibold text-foreground">{label}:</span>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
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

const EmployeeRetentionLeadership = () => {
  const retentionPillars = [
    {
      number: "1",
      title: "Clarity",
      description: "Every person understands their role, expectations, and growth path.",
      items: [
        "What they are responsible for",
        "What success looks like in their role",
        "How their work connects to the company mission",
        "What they need to do to grow or advance",
        "Where they stand (are they performing well or not?)"
      ],
      icon: Target,
      color: "border-blue-500/30"
    },
    {
      number: "2",
      title: "Connection",
      description: "People feel they belong. They feel seen and valued.",
      items: [
        "Genuine interest in their growth and wellbeing",
        "Listening deeply when they bring ideas or concerns",
        "Acknowledging contributions specifically and frequently",
        "Transparency about decisions that affect them",
        "Visibility and availability of leadership"
      ],
      icon: Heart,
      color: "border-pink-500/30"
    },
    {
      number: "3",
      title: "Capability",
      description: "People have the skills and resources to do their job well.",
      items: [
        "Training and development opportunities",
        "Role fit—people in roles where they can succeed",
        "Reasonable and sustainable workload",
        "Growth opportunities and new challenges",
        "Autonomy to make decisions within their domain"
      ],
      icon: TrendingUp,
      color: "border-emerald-500/30"
    }
  ];

  const turnoverCosts = [
    { label: "Lost productivity during transition", description: "Weeks to months where the person is ramping up" },
    { label: "Institutional knowledge loss", description: "Things that person knew that were not written down" },
    { label: "Team disruption", description: "Other people have to cover the work while you recruit" },
    { label: "Customer impact", description: "If it is a customer-facing role, relationships take time to rebuild" },
    { label: "Training investment lost", description: "All the training investment made in the departing person is lost" },
    { label: "Recruitment costs", description: "Time, agency fees, interview time" },
    { label: "Morale impact", description: "Other people see a valued colleague leave and wonder if they should stay" }
  ];

  const timelinePhases = [
    {
      weeks: "Week 1–2",
      title: "Assess Current State",
      items: [
        "Do exit interviews with your last 5 departures",
        "Survey current team: On a scale of 1–10, how likely are you to still be here in a year?",
        "Identify highest-risk people (top performers who might be recruited)"
      ],
      color: "border-red-500"
    },
    {
      weeks: "Week 3–4",
      title: "Communicate Commitment",
      items: [
        "Have a team meeting acknowledging retention and culture matter",
        "Be honest about what you have learned",
        "Outline changes you are making and invite input"
      ],
      color: "border-amber-500"
    },
    {
      weeks: "Week 5–8",
      title: "Install Weekly One-on-Ones",
      items: [
        "Schedule 30-minute weekly one-on-ones with each direct report",
        "Use the framework: How are you doing? What's going well? What's challenging?",
        "Track what you learn (aspirations, concerns, ideas)"
      ],
      color: "border-yellow-500"
    },
    {
      weeks: "Week 9–10",
      title: "Increase Clarity",
      items: [
        "Have explicit conversation about what success looks like in each role",
        "Clarify path to growth or advancement",
        "Document expectations and review quarterly"
      ],
      color: "border-emerald-500"
    },
    {
      weeks: "Week 11–12",
      title: "Increase Feedback",
      items: [
        "Give at least three pieces of specific, positive feedback to each person",
        "Address performance concerns directly and conversationally",
        "Make feedback a normal part of how you communicate"
      ],
      color: "border-blue-500"
    }
  ];

  const whyPeopleLeave = [
    "They do not know what success looks like in their role",
    "They receive feedback only when something goes wrong",
    "They do not see a path for growth or advancement",
    "They watch others who perform worse get better treatment",
    "They feel their ideas are not heard",
    "They do not know how their work connects to the company's mission",
    "They sense leadership does not trust them"
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Employee Retention & Company Culture: The Power of Day-to-Day Leadership"
        description="Learn why employee retention is a leadership problem, not an HR problem. Master the 3 foundations of retention culture—clarity, connection, capability—and build teams that stay."
        keywords="employee retention strategies, company culture leadership, day-to-day leadership, employee engagement SMB, turnover reduction, retention culture, weekly one-on-ones, leadership micro-interactions, team retention, HR leadership strategies, employee loyalty, workforce development, talent management small business"
        canonical="https://bizhealth.ai/blog/employee-retention-company-culture-leadership"
        ogType="article"
        ogImage={`https://bizhealth.ai${heroImage}`}
        articlePublishedTime="2025-12-30T00:00:00Z"
        articleModifiedTime="2025-12-30T00:00:00Z"
        articleAuthor="BizHealth.ai Research Team"
      />
      <StructuredData
        type="blogPosting"
        headline="Employee Retention, Company Culture, and the Underrated Power of Day-to-Day Leadership"
        description="Learn why employee retention is a leadership problem, not an HR problem. Master the 3 foundations of retention culture—clarity, connection, capability—and build teams that stay."
        image={`https://bizhealth.ai${heroImage}`}
        datePublished="2025-12-30"
        dateModified="2025-12-30"
        author="BizHealth.ai Research Team"
        url="https://bizhealth.ai/blog/employee-retention-company-culture-leadership"
        keywords={["employee retention", "company culture", "day-to-day leadership", "team retention", "leadership culture"]}
      />
      
      <GlobalNavigation />
      
      <article className="pt-32 pb-16">
        {/* Hero Section */}
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-pink-500/10" />
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
                {["Human Resources", "Operations", "Business Leadership"].map((cat) => (
                  <span key={cat} className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                    {cat}
                  </span>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Employee Retention, Company Culture, and the Underrated Power of Day-to-Day Leadership
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                The conversation happens in the parking lot, not in the conference room. Culture is not built in town halls—it's built in the micro-interactions of leadership.
              </p>
              
              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  BizHealth.ai Research Team
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  December 30, 2025
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  10 min read
                </span>
              </div>
              
              {/* Hero image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Business leader engaging in day-to-day leadership conversation with employee in manufacturing facility demonstrating employee retention through company culture"
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
            
            {/* Opening Quote */}
            <div className="not-prose bg-gradient-to-r from-primary/5 via-pink-500/5 to-emerald-500/5 rounded-2xl p-8 mb-12 border border-primary/10">
              <blockquote className="text-lg italic text-foreground border-l-4 border-primary pl-4 mb-4">
                "I'm looking for something new."
              </blockquote>
              <p className="text-muted-foreground">
                An employee pulls a colleague aside after a meeting. The colleague asks why. The answer is rarely "I want more money" or "The benefits are bad." It is usually something like: 
                <strong className="text-foreground"> "I do not feel heard here,"</strong> or 
                <strong className="text-foreground"> "I never know where I stand,"</strong> or 
                <strong className="text-foreground"> "The owner only shows up when something is wrong,"</strong> or 
                <strong className="text-foreground"> "I do not see a future for myself."</strong>
              </p>
              <p className="text-lg font-semibold text-primary mt-4">
                These are not HR problems. They are leadership problems.
              </p>
            </div>

            <p>
              Most business owners understand intellectually that company culture matters. They have heard the statistics: disengaged employees cost billions. Retention is cheaper than replacement. Culture drives performance. But in the day-to-day, culture takes a back seat to urgency. A deadline looms. A customer problem surfaces. A crisis needs managing. Culture work feels like something to do when things slow down.
            </p>
            
            <p className="text-xl font-semibold text-foreground">
              They never slow down.
            </p>

            <p>
              This is why so many SMBs have high turnover despite their founders genuinely caring about their people. The owner cares deeply—but the daily experience of working in the organization does not reflect that care. There is a gap between intention and reality.
            </p>

            <p>
              This article is about closing that gap. It is about understanding that culture is not built in town halls or annual retreats. It is built in the micro-interactions of leadership: the daily conversations, the feedback given and not given, the decisions made transparently or opaquely, the priorities communicated consistently or shifted without explanation.
            </p>

            {/* The Retention Crisis Is a Leadership Crisis */}
            <h2 className="text-3xl font-bold text-foreground mt-16 mb-6 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-red-500" />
              The Retention Crisis Is a Leadership Crisis
            </h2>

            <p>
              Let us start with an uncomfortable truth: <strong>if your best people are leaving, the reason is probably not that you pay too little or your benefits are weak. The reason is probably that they do not feel valued, heard, or developed by you.</strong>
            </p>

            <p>
              This is not intuitive for most leaders. When someone leaves, the exit interview might mention "seeking new opportunities" or "wanted a change of pace." In the exit survey, they might cite "compensation" or "lack of flexibility." These are the acceptable reasons—the ones that do not put blame on leadership.
            </p>

            <p>
              But research on why people actually leave tells a different story. <strong>People leave managers, not companies.</strong> They leave when:
            </p>

            <div className="not-prose bg-red-500/5 rounded-xl border border-red-500/20 p-6 my-8">
              <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Why People Actually Leave
              </h4>
              <ul className="space-y-2">
                {whyPeopleLeave.map((reason, i) => (
                  <li key={i} className="flex items-start gap-2 text-foreground">
                    <span className="text-red-500 mt-1">✕</span>
                    {reason}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-muted-foreground text-sm">
                These are all symptoms of weak day-to-day leadership, not weak compensation or benefits.
              </p>
            </div>

            <p>
              The tragedy is that many founders could fix this by shifting their behavior—not by spending more money. But most do not recognize the problem until the damage is done.
            </p>

            {/* The Myth Section */}
            <h2 className="text-3xl font-bold text-foreground mt-16 mb-6 flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-amber-500" />
              The Myth: Culture Is Built in Programs and Policies
            </h2>

            <p>
              Many SMB leaders approach culture like they approach marketing. They create programs: quarterly town halls, annual reviews, employee recognition programs, team building events, wellness initiatives. They write values on the wall. They create a "culture committee."
            </p>

            <p>
              Then they are confused when turnover remains high.
            </p>

            <p>
              The problem is that <strong>culture is not built through programs. It is built through consistency and behavior.</strong>
            </p>

            <div className="not-prose bg-gradient-to-r from-amber-500/10 to-emerald-500/10 rounded-xl p-6 my-8 border border-amber-500/20">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-bold text-foreground flex items-center gap-2">
                    <span className="text-red-500">✕</span> Less Powerful
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Once-per-quarter town hall sharing vision</li>
                    <li>Annual review where feedback is given</li>
                    <li>"Employee of the Month" recognition program</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-foreground flex items-center gap-2">
                    <span className="text-emerald-500">✓</span> More Powerful
                  </h4>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li>Five daily conversations connecting work to vision</li>
                    <li>Weekly one-on-ones with immediate, conversational feedback</li>
                    <li>Consistent, specific praise throughout the month</li>
                  </ul>
                </div>
              </div>
              <p className="mt-6 text-foreground font-semibold text-center">
                Programs signal intention. Behavior creates reality.
              </p>
            </div>

            <p>
              The company with no formal culture initiative but a leader who shows up daily, listens deeply, provides clear feedback, and invests in people's growth will have dramatically better retention than the company with elaborate culture programs but a distant or inconsistent leader.
            </p>

            {/* Three Elements of Retention */}
            <h2 className="text-3xl font-bold text-foreground mt-16 mb-6 flex items-center gap-3">
              <Users className="w-8 h-8 text-primary" />
              The Three Foundations of Retention: Clarity, Connection, and Capability
            </h2>

            <p>
              Culture that retains people is built on three foundations. If any of these is weak, retention suffers.
            </p>

            <div className="not-prose grid md:grid-cols-1 gap-6 my-8">
              {retentionPillars.map((pillar) => (
                <RetentionPillar key={pillar.number} {...pillar} />
              ))}
            </div>

            {/* How to build clarity */}
            <h3 className="text-2xl font-bold text-foreground mt-12 mb-4">
              How to Build Clarity
            </h3>

            <ul>
              <li>Have a 30-minute conversation with each person in your company where you explain: <em>"This is what I need from you in this role. This is what success looks like. Here is how I will measure it."</em></li>
              <li>Update this quarterly.</li>
              <li>Do not wait for annual reviews. If someone is doing something well, tell them that week.</li>
              <li>If they are struggling, tell them that week. Make feedback immediate and conversational, not formal and delayed.</li>
              <li>Have explicit conversations about growth. <em>"What do you want to learn? What role do you want to be ready for? How can I help you develop?"</em></li>
            </ul>

            <div className="not-prose bg-blue-500/5 rounded-xl border border-blue-500/20 p-6 my-8">
              <p className="text-foreground">
                <strong>The silent failure:</strong> Most small business owners do this in their head but never say it out loud. The employee leaves thinking they were never good enough, when in reality the owner thought they were great and just never said so.
              </p>
            </div>

            {/* Connection details */}
            <h3 className="text-2xl font-bold text-foreground mt-12 mb-4">
              Building Connection
            </h3>

            <p>
              Connection is built through genuine interest in people's growth and wellbeing—not just their output. Do you know their goals, challenges, and concerns outside of work? Do you ask?
            </p>

            <p>
              Connection is easy to neglect when the business is busy. You stay in your office managing the crisis. You skip the team lunch. You do not have time for one-on-ones. But this is exactly when connection matters most. People need to feel that their leader still sees and cares about them, even during chaos.
            </p>

            {/* Capability details */}
            <h3 className="text-2xl font-bold text-foreground mt-12 mb-4">
              Building Capability
            </h3>

            <p>
              Many SMBs are weak here because of resource constraints. "We cannot afford training." "We do not have budget for new systems." "Everyone has to do what they are good at because we do not have enough people."
            </p>

            <p>
              But capability does not always require money. It requires intentionality. You can teach someone to be a better manager through conversation and modeling. You can create learning through stretch assignments. You can improve systems through process improvement, not just new tools. You can build autonomy by being clear about what decisions people can make and trusting them to make them.
            </p>

            <div className="not-prose bg-emerald-500/5 rounded-xl border border-emerald-500/20 p-6 my-8">
              <p className="text-foreground">
                The message people receive from a resource-constrained leader who still invests in their development is: <strong>"I see you. You matter. I am betting on your growth even though it is not easy."</strong> This builds loyalty.
              </p>
            </div>

            {/* Micro-Interactions */}
            <h2 className="text-3xl font-bold text-foreground mt-16 mb-6 flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-purple-500" />
              Day-to-Day Leadership: The Micro-Interactions That Shape Culture
            </h2>

            <p>
              Here is the insight that most leaders miss: <strong>culture is built in the moments no one is watching.</strong>
            </p>

            <p>
              The conversation in the hallway. The way you respond when someone brings you a problem. The decision you make about a schedule conflict. The person you choose to ask for input. The reaction you have when someone makes a mistake. The way you talk about a colleague who is not in the room.
            </p>

            <p>
              These micro-interactions accumulate. They create the actual culture—the unspoken norms of how things work, how people are valued, what is rewarded.
            </p>

            <div className="not-prose bg-purple-500/5 rounded-xl border border-purple-500/20 p-6 my-8">
              <h4 className="font-bold text-foreground mb-4">When Actions Contradict Words</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✕</span>
                  <span className="text-muted-foreground">A leader who says "we value innovation" but shoots down ideas immediately creates a culture where people stop sharing ideas.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✕</span>
                  <span className="text-muted-foreground">A leader who says "we are a learning organization" but punishes mistakes creates a culture of fear.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✕</span>
                  <span className="text-muted-foreground">A leader who says "I care about work-life balance" but sends emails at 11 PM creates a culture of overwork.</span>
                </li>
              </ul>
              <p className="mt-4 font-semibold text-foreground">
                The stated values matter less than the daily lived experience.
              </p>
            </div>

            {/* Weekly One-on-One */}
            <h2 className="text-3xl font-bold text-foreground mt-16 mb-6 flex items-center gap-3">
              <Eye className="w-8 h-8 text-cyan-500" />
              The Weekly One-on-One: Non-Negotiable
            </h2>

            <p>
              <strong>If you implement one change, make this one: have a 30-minute weekly one-on-one with each of your direct reports.</strong>
            </p>

            <p>
              Not a status update meeting. Not a project review. A one-on-one where you ask:
            </p>

            <div className="not-prose bg-cyan-500/5 rounded-xl border border-cyan-500/20 p-6 my-8">
              <h4 className="font-bold text-foreground mb-4">Weekly One-on-One Framework</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-foreground">
                  <CheckCircle className="w-4 h-4 text-cyan-500" />
                  How are you feeling about your work this week?
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <CheckCircle className="w-4 h-4 text-cyan-500" />
                  What is going well? What is frustrating?
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <CheckCircle className="w-4 h-4 text-cyan-500" />
                  Do you have what you need to succeed?
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <CheckCircle className="w-4 h-4 text-cyan-500" />
                  What are you working toward?
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <CheckCircle className="w-4 h-4 text-cyan-500" />
                  How can I help?
                </li>
              </ul>
              <p className="mt-4 text-muted-foreground text-sm">
                And then you listen. You do not solve every problem. You do not interrupt to tell your version. You listen and you help them think through challenges.
              </p>
            </div>

            <p>
              This single habit changes everything. People feel heard. They see the leader is invested in their development. Problems surface before they cascade. Development happens naturally through conversation.
            </p>

            <p>
              Most leaders skip this because "there is not time" or "I will touch base informally." But informal is not enough. Weekly one-on-ones signal that people matter. When you cancel them for meetings, people notice. When you prioritize them consistently, people notice that too.
            </p>

            {/* Feedback as Leadership */}
            <h2 className="text-3xl font-bold text-foreground mt-16 mb-6 flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-amber-500" />
              Feedback as Leadership, Not Evaluation
            </h2>

            <p>
              Most leaders reserve feedback for formal reviews. "I will mention this in their annual review." The problem is that by then, it is too late. The behavior has become entrenched. The person has already formed conclusions about how they are perceived.
            </p>

            <p>
              <strong>Real leadership feedback is immediate and conversational.</strong>
            </p>

            <div className="not-prose bg-gradient-to-r from-emerald-500/10 to-amber-500/10 rounded-xl p-6 my-8 border border-emerald-500/20">
              <div className="space-y-4">
                <div className="p-4 bg-background/50 rounded-lg">
                  <span className="text-emerald-500 font-bold text-sm">When someone does something well:</span>
                  <p className="text-foreground italic mt-1">"I noticed you stayed late to help that customer. That is the kind of care that defines us. Thank you."</p>
                </div>
                <div className="p-4 bg-background/50 rounded-lg">
                  <span className="text-amber-500 font-bold text-sm">When someone struggles:</span>
                  <p className="text-foreground italic mt-1">"I noticed the project deadline slipped. What happened? What support do you need? How can we prevent this next time?"</p>
                </div>
                <div className="p-4 bg-background/50 rounded-lg">
                  <span className="text-blue-500 font-bold text-sm">When someone acts out of alignment:</span>
                  <p className="text-foreground italic mt-1">"I see that you made a decision without consulting the team. Our value is collaborative decision-making. What was going on?"</p>
                </div>
              </div>
              <p className="mt-4 text-foreground text-sm">
                Feedback should be frequent, specific, and focused on behavior and growth—not personality or judgment. Leaders who give frequent feedback develop faster, more engaged teams.
              </p>
            </div>

            {/* Visibility and Accessibility */}
            <h2 className="text-3xl font-bold text-foreground mt-16 mb-6 flex items-center gap-3">
              <Eye className="w-8 h-8 text-blue-500" />
              Visibility and Accessibility
            </h2>

            <p>
              An owner who is locked in their office, reachable only by appointment, is invisible to their team. Invisibility breeds distance. Distance allows misunderstandings and disconnection to grow.
            </p>

            <p>
              Visibility does not mean micromanagement. It means being present enough that people see you, know you, and feel able to approach you.
            </p>

            <div className="not-prose bg-blue-500/5 rounded-xl border border-blue-500/20 p-6 my-8">
              <h4 className="font-bold text-foreground mb-4">Visibility Looks Like:</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-foreground">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  A daily "walk around" where you ask people how they are doing
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  Eating lunch with different team members
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  Sitting in on team meetings occasionally
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  Having an open-door policy for real concerns
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  Sharing updates on what you are working on and thinking about
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  Asking people for their ideas and input
                </li>
              </ul>
            </div>

            {/* The Retention Math */}
            <h2 className="text-3xl font-bold text-foreground mt-16 mb-6 flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-emerald-500" />
              The Retention Math: What It Actually Costs to Lose Someone
            </h2>

            <p>
              Many SMB leaders underestimate the cost of turnover because they only count the obvious costs: recruiting, hiring, and onboarding a replacement.
            </p>

            <p>
              But the real costs are far larger:
            </p>

            <div className="not-prose space-y-3 my-8">
              {turnoverCosts.map((cost, i) => (
                <TurnoverCostItem key={i} {...cost} />
              ))}
            </div>

            <div className="not-prose bg-gradient-to-r from-red-500/10 to-amber-500/10 rounded-xl p-6 my-8 border border-red-500/20">
              <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-red-500" />
                True Turnover Costs
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-background/50 rounded-lg">
                  <p className="text-2xl font-bold text-red-500">1.5–2x</p>
                  <p className="text-sm text-muted-foreground">annual salary for mid-level employee</p>
                </div>
                <div className="text-center p-4 bg-background/50 rounded-lg">
                  <p className="text-2xl font-bold text-red-500">2–3x</p>
                  <p className="text-sm text-muted-foreground">salary for specialized/senior role</p>
                </div>
                <div className="text-center p-4 bg-background/50 rounded-lg">
                  <p className="text-2xl font-bold text-red-500">$100K–$300K</p>
                  <p className="text-sm text-muted-foreground">total impact per departure</p>
                </div>
              </div>
              <p className="mt-4 text-foreground text-sm">
                A leader who prevents one key departure per year through better leadership creates <strong>$150,000+ in annual value</strong>.
              </p>
            </div>

            {/* 90-Day Plan */}
            <h2 className="text-3xl font-bold text-foreground mt-16 mb-6 flex items-center gap-3">
              <FileText className="w-8 h-8 text-primary" />
              Building a Retention Culture: A Practical 90-Day Plan
            </h2>

            <p>
              If retention is a problem in your business, here is a concrete plan to address it.
            </p>

            <div className="not-prose space-y-4 my-8">
              {timelinePhases.map((phase, i) => (
                <TimelinePhase key={i} {...phase} />
              ))}
            </div>

            <div className="not-prose bg-primary/5 rounded-xl border border-primary/20 p-6 my-8">
              <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Ongoing (Beyond 90 Days)
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-foreground">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Maintain weekly one-on-ones (non-negotiable)
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Continue immediate, conversational feedback
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Quarterly role clarity reviews
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Stay visible and accessible daily
                </li>
              </ul>
            </div>

            {/* The Role of Data */}
            <h2 className="text-3xl font-bold text-foreground mt-16 mb-6 flex items-center gap-3">
              <Target className="w-8 h-8 text-cyan-500" />
              The Role of Data and Assessment
            </h2>

            <p>
              While leadership is ultimately about relationships and behavior, data can help identify where to focus. Engagement surveys can reveal which teams are most at risk. Retention analytics can show which roles have the highest turnover. Exit interview patterns can reveal systemic issues. Metrics like "time in role" and "time since promotion" can show whether people are developing.
            </p>

            <div className="not-prose bg-gradient-to-r from-primary/10 to-cyan-500/10 rounded-xl p-6 my-8 border border-primary/20">
              <p className="text-foreground mb-4">
                Tools like <Link to="/" className="text-primary font-semibold hover:underline">BizHealth.ai</Link> can be instrumental in surfacing these patterns—helping owners see the data on engagement, retention, and culture gaps rather than relying on intuition alone.
              </p>
              <p className="text-muted-foreground text-sm">
                Rather than wondering "Are we retaining people?", you get clarity on retention by cohort, by team, by tenure, and against peer benchmarks. This data then informs where to focus leadership attention.
              </p>
              <p className="mt-4 font-semibold text-foreground">
                The data does not solve the problem. But it helps you see it clearly. And once you see it, leadership change becomes the response.
              </p>
            </div>

            {/* The Final Truth */}
            <h2 className="text-3xl font-bold text-foreground mt-16 mb-6 flex items-center gap-3">
              <Heart className="w-8 h-8 text-pink-500" />
              The Final Truth: Culture Is Leadership
            </h2>

            <p>
              If you remember nothing else from this article, remember this: <strong>company culture is not built through programs. It is built through consistent leadership behavior.</strong>
            </p>

            <p>
              The policies you create, the benefits you offer, the values you state on the wall—these all matter. But they matter far less than how you show up every day.
            </p>

            <div className="not-prose bg-gradient-to-r from-pink-500/10 to-primary/10 rounded-xl p-6 my-8 border border-pink-500/20">
              <h4 className="font-bold text-foreground mb-4">The Questions That Define Culture:</h4>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  "Do you listen to people?",
                  "Do you give them clear direction?",
                  "Do you invest in their growth?",
                  "Do you admit your mistakes?",
                  "Do you celebrate their wins?",
                  "Do you make decisions transparently?",
                  "Do you show that you care?"
                ].map((q, i) => (
                  <div key={i} className="flex items-center gap-2 text-foreground">
                    <CheckCircle className="w-4 h-4 text-pink-500" />
                    {q}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-muted-foreground text-sm">
                These are the micro-behaviors that build culture. And these are entirely within your control.
              </p>
            </div>

            <p>
              The businesses that retain people are not always the ones with the best compensation or the fanciest office. They are the ones with leaders who are intentional about clarity, connection, and capability. Leaders who show up. Leaders who listen. Leaders who invest.
            </p>

            <p className="text-xl font-semibold text-foreground">
              You cannot outsource culture. You cannot build it with a program. You can only build it through day-to-day leadership.
            </p>

            <p className="text-xl font-semibold text-primary">
              And the good news? That is something you can start today.
            </p>

            {/* CTA Section */}
            <div className="not-prose bg-gradient-to-r from-primary/10 via-pink-500/10 to-emerald-500/10 rounded-2xl p-8 my-12 border border-primary/20">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Assess Your Leadership Culture Health
              </h3>
              <p className="text-muted-foreground mb-6">
                Ready to understand where your organization stands on clarity, connection, and capability? BizHealth.ai provides comprehensive assessments that reveal retention risks before they become departures.
              </p>
              <Link 
                to="/pricing" 
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Start Your Assessment
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>

        {/* Related Articles */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <RelatedArticles 
              articles={[
                { title: "From Chaos to Clarity: A Lightweight Operating Rhythm for Scaling Your Business Teams", slug: "/blog/chaos-to-clarity-operating-rhythm-scaling-teams", category: "Operations", excerpt: "Install a lightweight operating rhythm to scale your business from 10 to 70+ employees." },
                { title: "The $50K Business Blind Spot: Why 96% of Operational Issues Are Invisible to Leadership", slug: "/blog/business-blind-spots-operational-issues-invisible-leadership", category: "Operations", excerpt: "Research reveals leaders see only 4% of operational issues. Discover the 6 costly blind spots." },
                { title: "How to Prioritize When There's No One to Delegate to: The Operator's Survival Guide", slug: "/blog/how-to-prioritize-operator-survival-guide", category: "Leadership", excerpt: "Master solo entrepreneur prioritization with the Strategic-Essential-Noise framework." }
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

export default EmployeeRetentionLeadership;
