import { motion } from 'framer-motion';
import PromotionalBanner from '@/components/PromotionalBanner';
import { Link } from 'react-router-dom';
import {
  Clock,
  FileText,
  Download,
  Shield,
  GraduationCap,
  Heart,
  Users,
  ClipboardCheck,
  DollarSign,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Quote,
  ArrowRight,
  BookOpen,
  Target,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from '@/components/GlobalFooter';
import GradientDivider from '@/components/GradientDivider';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// Lesson data
const lessons = [
  {
    number: 1,
    title: "HR Isn't Bureaucracy — It's Talent Optimization",
    time: "15 min",
    pages: "10 pages",
    description: "Understand why HR is actually a business function that drives productivity, retention, and culture — not just policies and compliance paperwork.",
    objective: "Understand HR as a business function that drives productivity, retention, and culture — not just policies and compliance paperwork.",
    takeaways: [
      "The truth about what HR really is (and isn't)",
      "4-function HR framework: Acquire, Develop, Retain, Manage",
      "Before/after: How systems boost productivity from ~60% to ~85%",
      "HR maturity spectrum: Where do you fall?",
    ],
    preview: {
      title: "Key Insight",
      quote: "HR is the system that prevents $50K mistakes. Every business has HR — the question is whether yours is intentional or chaotic.",
      stat: "Bad hires cost 50-200% of annual salary",
    },
    color: "biz-teal",
    downloadUrl: "/downloads/hr101/HR-101-Lesson-1-Talent-Optimization.pdf",
  },
  {
    number: 2,
    title: "The True Cost of No HR Program",
    time: "15 min",
    pages: "12 pages",
    description: "Quantify what bad hires, turnover, and culture drift are actually costing your business.",
    objective: "Quantify the financial impact of HR gaps (bad hires, turnover, culture drift) on your specific business and see the ROI of building systems.",
    takeaways: [
      "Bad hire costs: $30K–$85K per mistake (the math explained)",
      "Turnover costs: $28K–$86K per departure (breakdown included)",
      "Culture drift: The hidden 10-20% productivity tax",
      "Includes: HR Cost Calculator worksheet",
    ],
    preview: {
      title: "Real Example",
      quote: "Friedrich runs a 12-person CPA firm. When his top person left for a competitor, the 3-month gap + 4-month ramp + 2 lost clients cost him ~$60,000.",
      stat: "82% higher retention with proper onboarding",
    },
    color: "biz-lime",
    downloadUrl: "/downloads/hr101/HR-101-Lesson-2-True-Cost-No-HR.pdf",
  },
  {
    number: 3,
    title: "HR Maturity: Where Are You Now?",
    time: "10 min",
    pages: "8 pages",
    description: "Self-assess your current HR state across 8 domains and identify your priority gaps.",
    objective: "Self-assess your current HR maturity across 8 domains and identify your priority gaps using the interactive assessment tool.",
    takeaways: [
      "4 maturity levels: Ad-Hoc → Reactive → Systematic → Strategic",
      "8-question diagnostic to pinpoint your current level",
      "Gap visualization: Where you are vs. where you need to be",
      "Priority recommendations based on your 'No' answers",
    ],
    preview: {
      title: "The 4 Maturity Levels",
      levels: [
        { level: 1, name: "Ad-Hoc", desc: "Winging it" },
        { level: 2, name: "Reactive", desc: "Getting organized" },
        { level: 3, name: "Systematic", desc: "Running a system" },
        { level: 4, name: "Strategic", desc: "HR as advantage" },
      ],
    },
    color: "biz-copper",
    downloadUrl: "/downloads/hr101/HR-101-Lesson-3-HR-Maturity.pdf",
    assessmentLink: true,
  },
  {
    number: 4,
    title: "Your HR Roadmap by Business Stage",
    time: "20 min",
    pages: "15 pages",
    description: "Know exactly what to build — and in what order — based on your specific business stage.",
    objective: "Understand what HR systems to build at your specific business stage — Start-Up, Scaling, or Established — and in what order.",
    takeaways: [
      "Start-Up (0–3 years): Foundations + Legal Protection",
      "Scaling (3–10 years): Manager Development + Performance Systems",
      "Established (10+ years): Succession + Optimization",
      "Decision tool: Which stage are you in?",
    ],
    preview: {
      title: "Stage-Based Build Order",
      stages: [
        { stage: "Start-Up (0-3 yrs)", focus: "Hiring → Onboarding → Handbook" },
        { stage: "Scaling (3-10 yrs)", focus: "Manager training → Performance → Engagement" },
        { stage: "Established (10+ yrs)", focus: "Succession → Org design → Optimization" },
      ],
    },
    color: "biz-green",
    downloadUrl: "/downloads/hr101/HR-101-Lesson-4-HR-Roadmap.pdf",
  },
  {
    number: "5a",
    title: "Getting Started — Your First 3 Actions (Part 1)",
    time: "15 min",
    pages: "14 pages",
    description: "Action 1 & 2: Document your hiring process and create your onboarding checklist.",
    objective: "Leave with your first two implementable actions and the templates to start building your HR foundation this week.",
    takeaways: [
      "Action 1: Document your hiring process (template included)",
      "Action 2: Create your 30-60-90 day onboarding checklist",
      "7-step hiring process that takes 30-60 minutes to set up",
      "Ready-to-use templates included",
    ],
    preview: {
      title: "Action 1: Your Hiring Process",
      quote: "A 7-step hiring process that takes 30-60 minutes to set up: Job description → Sourcing → Screening → Structured interview → Scoring → References → Offer.",
    },
    color: "biz-teal-dark",
    downloadUrl: "/downloads/hr101/HR-101-Lesson-5-Part-1-Getting-Started.pdf",
  },
  {
    number: "5b",
    title: "Getting Started — Your First 3 Actions (Part 2)",
    time: "15 min",
    pages: "12 pages",
    description: "Action 3: Draft your employee handbook outline plus your implementation commitment plan.",
    objective: "Complete your HR foundation with your employee handbook outline and implementation commitment plan.",
    takeaways: [
      "Action 3: Draft your employee handbook outline (7 sections)",
      "Implementation paths: 1-week fast track OR 3-week steady build",
      "Action commitment planner with accountability",
      "Clear next steps after HR 101",
    ],
    preview: {
      title: "7 Must-Have Handbook Sections",
      quote: "Welcome/Overview • At-Will Employment • Anti-Discrimination & Harassment • Time Off Policies • Compensation & Benefits • Conduct & Discipline • Acknowledgment Form",
    },
    color: "biz-teal-dark",
    downloadUrl: "/downloads/hr101/HR-101-Lesson-5-Part-2-Getting-Started.pdf",
  },
];

// Value cards data
const valueCards = [
  {
    icon: Users,
    title: "Acquire the Right People",
    description: "Stop hiring based on gut feel. Build a repeatable process that attracts the right candidates every time.",
  },
  {
    icon: GraduationCap,
    title: "Develop Your Team",
    description: "Give new hires the structure they need to succeed faster and stay engaged longer.",
  },
  {
    icon: Heart,
    title: "Retain Good People",
    description: "Understand what keeps people engaged and prevent the costly surprises of unexpected departures.",
  },
  {
    icon: ClipboardCheck,
    title: "Manage with Confidence",
    description: "Know your legal obligations, document what matters, and protect your business from risk.",
  },
];

// Cost stats
const costStats = [
  { value: "$30K–$85K", label: "Cost per bad hire (50-200% of salary)" },
  { value: "$28K–$86K", label: "Cost per departure (recruiting + training + ramp)" },
  { value: "10–20%", label: "Productivity loss from culture drift" },
  { value: "$114K+", label: "Potential savings in year one with systems" },
];

// Achievement metrics
const achievementMetrics = [
  {
    icon: TrendingUp,
    value: "+25%",
    label: "Productivity Gain",
    description: "Better hiring + structured onboarding = aligned, effective teams from day one",
  },
  {
    icon: TrendingDown,
    value: "-50%",
    label: "Turnover Reduction",
    description: "Clear expectations + regular feedback = people stay and grow with you",
  },
  {
    icon: DollarSign,
    value: "$85K–$150K",
    label: "Annual Savings",
    description: "On a 10-person business at $500K payroll — recovered through prevented mistakes",
  },
];

// Hero stats
const heroStats = [
  { icon: Clock, text: "75 Minutes Total" },
  { icon: FileText, text: "5 Lessons" },
  { icon: Download, text: "10+ Templates" },
  { icon: Shield, text: "No HR Experience Required" },
];

// What you'll learn items
const learningItems = [
  { number: 1, title: "HR as Business Multiplier", description: "Understand why HR drives productivity, not bureaucracy" },
  { number: 2, title: "The True Cost of HR Gaps", description: "Quantify what bad hires and turnover cost your business" },
  { number: 3, title: "Your HR Maturity Level", description: "Self-assess where you stand and identify key gaps" },
  { number: 4, title: "Stage-Based HR Roadmap", description: "Know exactly what to build based on your business stage" },
  { number: 5, title: "Your First 3 Actions", description: "Leave with implementable steps you can start this week" },
];

const HR101FoundationModule = () => {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="HR 101 Foundation Module | Free HR Training for Small Business"
        description="Free HR training for small business owners. 5 lessons, 75 minutes to build essential HR systems — hiring, onboarding, compliance, and retention. No HR experience required."
        keywords="free hr tools, free human resources tool, free hr training, HR 101, human resources training, small business HR, HR fundamentals, employee management, hiring process, onboarding checklist, HR maturity assessment, free hr course, free hr resources, hr for beginners, learn hr free, small business human resources, hr basics, hr essentials, free employee management training, startup hr, diy hr, hr without experience, build hr system, hr curriculum, hr education free, hr learning, hr program free, free people management, workforce management free, talent management basics, BizHealth.ai, BizGrowth Academy"
        canonical="https://bizhealth.ai/bizgrowth/hr/hr101-foundation-module"
        ogType="website"
        ogImage="/og-images/og-hr101-foundation-module.jpg"
      />
      <StructuredData
        type="course"
        name="HR 101 Foundation"
        description="Transform HR confusion into HR clarity. A 5-lesson, 75-minute foundational curriculum designed for first-time business owners who need to build basic HR systems — without becoming HR experts."
        provider="BizHealth.ai"
        url="https://bizhealth.ai/bizgrowth/hr/hr101-foundation-module"
      />
      <PromotionalBanner />
      <GlobalNavigation />

      {/* SECTION 1: Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#242553] via-[#2e2f6b] to-[#0e7490]">
          {/* Animated radial gradients */}
          <div className="absolute inset-0 opacity-50">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0891B2]/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#22d3ee]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-center">
            {/* Left Column */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-white"
            >
              {/* Academy Badge */}
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6"
              >
                <GraduationCap className="w-5 h-5 text-[#22d3ee]" />
                <span className="text-sm font-medium">BizGrowth Academy</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeInUp}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6"
              >
                HR 101 <span className="text-[#22d3ee]">Foundation</span>
              </motion.h1>

              {/* Lead paragraph */}
              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-2xl"
              >
                Transform HR confusion into HR clarity. A 5-lesson, 75-minute foundational curriculum designed for first-time business owners who need to build basic HR systems — without becoming HR experts.
              </motion.p>

              {/* Stats row */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap gap-4 md:gap-6 mb-8"
              >
                {heroStats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <stat.icon className="w-5 h-5 text-[#22d3ee]" />
                    <span className="text-sm md:text-base">{stat.text}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <a
                  href="#downloads"
                  onClick={(e) => handleSmoothScroll(e, 'downloads')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#0891B2] to-[#0e7490] text-white font-semibold shadow-lg shadow-[#0891B2]/35 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Download className="w-5 h-5" />
                  Download All Lessons
                </a>
                <a
                  href="#curriculum"
                  onClick={(e) => handleSmoothScroll(e, 'curriculum')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-transparent border-2 border-white/50 text-white font-semibold hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Explore Curriculum
                </a>
              </motion.div>
            </motion.div>

            {/* Right Column - Hero Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0891B2] to-[#0e7490] flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-display text-xl font-bold text-[#242553]">What You'll Learn</h2>
              </div>

              <div className="space-y-4">
                {learningItems.map((item, index) => (
                  <div
                    key={index}
                    className={`flex gap-4 pb-4 ${index < learningItems.length - 1 ? 'border-b border-gray-100' : ''}`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0891B2] to-[#0e7490] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{item.number}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#242553] mb-0.5">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Value Proposition Section */}
      <section className="py-16 lg:py-24 bg-[#f8fafc] border-t border-gradient-to-r from-[#0891B2] to-[#65A30D]">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <motion.p variants={fadeInUp} className="text-sm font-bold uppercase tracking-widest text-[#0891B2] mb-3">
              Why This Matters
            </motion.p>
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl font-bold text-[#242553] mb-4">
              HR Isn't Just Compliance — It's Your Business Multiplier
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-600">
              Most small business owners treat HR as an afterthought. But the right systems can transform your team's productivity, reduce costly mistakes, and give you back hours every week.
            </motion.p>
          </motion.div>

          {/* Value Cards Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {valueCards.map((card, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
              >
                {/* Top accent bar on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0891B2] to-[#65A30D] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#242553] to-[#2e2f6b] flex items-center justify-center mb-4">
                  <card.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display text-lg font-semibold text-[#242553] mb-2">{card.title}</h3>
                <p className="text-gray-600">{card.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Cost Callout Section */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#242553] to-[#1a1b3d]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(8,145,178,0.15),transparent_50%)]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.p variants={fadeInUp} className="text-sm font-bold uppercase tracking-widest text-[#22d3ee] mb-3">
                The Real Numbers
              </motion.p>
              <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                What HR Gaps Are Costing You
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-white/85">
                Every bad hire, every preventable departure, and every day of culture drift has a price tag. Most owners don't realize how expensive 'winging it' really is until they add it up.
              </motion.p>
            </motion.div>

            {/* Right Column - Stats Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-2 gap-4"
            >
              {costStats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-5"
                >
                  <p className="font-display text-2xl md:text-3xl font-extrabold text-[#22d3ee] mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-white/80">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4: What You'll Achieve (Enhancement #1) */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#f8fafc] to-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <motion.p variants={fadeInUp} className="text-sm font-bold uppercase tracking-widest text-[#65A30D] mb-3">
              The Upside
            </motion.p>
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl font-bold text-[#242553] mb-4">
              What Good HR Systems Achieve
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-600">
              Moving from ad-hoc to systematic HR creates measurable business impact. Here's what businesses like yours experience:
            </motion.p>
          </motion.div>

          {/* Achievement Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {achievementMetrics.map((metric, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#65A30D]"
                style={{
                  background: 'linear-gradient(135deg, rgba(101, 163, 13, 0.05) 0%, rgba(101, 163, 13, 0.02) 100%)',
                }}
              >
                <metric.icon className="w-6 h-6 text-[#65A30D] mb-3" />
                <p className="font-display text-3xl font-extrabold text-[#65A30D] mb-1">{metric.value}</p>
                <p className="font-semibold text-[#242553] mb-2">{metric.label}</p>
                <p className="text-sm text-gray-600">{metric.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: Curriculum Journey Section */}
      <section id="curriculum" className="py-16 lg:py-24 bg-white scroll-mt-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.p variants={fadeInUp} className="text-sm font-bold uppercase tracking-widest text-[#0891B2] mb-3">
              Your Learning Journey
            </motion.p>
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl font-bold text-[#242553] mb-4">
              5 Lessons to HR Clarity
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-600">
              Each lesson builds on the last, taking you from 'HR feels overwhelming' to 'I know exactly what to build and how to start.' Download each module as a comprehensive, professionally-designed document.
            </motion.p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Center line (hidden on mobile) */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0891B2] via-[#65A30D] to-[#B45309]" />

            {/* Lessons */}
            <div className="space-y-12 lg:space-y-0">
              {lessons.map((lesson, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeInUp}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-12 ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'} ${index > 0 ? 'lg:mt-16' : ''}`}
                >
                  {/* Timeline node (hidden on mobile) */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-white border-4 border-current items-center justify-center shadow-lg z-10"
                    style={{
                      borderColor: lesson.color === 'biz-teal' ? '#0891B2' :
                        lesson.color === 'biz-lime' ? '#65A30D' :
                          lesson.color === 'biz-copper' ? '#B45309' :
                            lesson.color === 'biz-green' ? '#969423' :
                              '#0e7490',
                    }}
                  >
                    <span className="font-display font-extrabold text-[#242553]">{lesson.number}</span>
                  </div>

                  {/* Content Side */}
                  <div className={`${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16 lg:col-start-2'}`}>
                    {/* Mobile node */}
                    <div className="lg:hidden flex items-center gap-3 mb-4">
                      <div
                        className="w-12 h-12 rounded-full bg-white border-4 flex items-center justify-center shadow-lg"
                        style={{
                          borderColor: lesson.color === 'biz-teal' ? '#0891B2' :
                            lesson.color === 'biz-lime' ? '#65A30D' :
                              lesson.color === 'biz-copper' ? '#B45309' :
                                lesson.color === 'biz-green' ? '#969423' :
                                  '#0e7490',
                        }}
                      >
                        <span className="font-display font-extrabold text-[#242553]">{lesson.number}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {lesson.time}
                      </span>
                    </div>

                    {/* Time tag (desktop) */}
                    <div className={`hidden lg:flex items-center gap-2 mb-3 ${index % 2 === 0 ? 'justify-end' : ''}`}>
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-500">{lesson.time}</span>
                    </div>

                    <h3 className={`font-display text-xl lg:text-2xl font-bold text-[#242553] mb-3 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                      {lesson.title}
                    </h3>

                    <p className={`text-gray-600 mb-4 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                      {lesson.description}
                    </p>

                    {/* Learning Objective Box (Enhancement #2) */}
                    <div className={`bg-[#0891B2]/8 border-l-[3px] border-[#0891B2] rounded-r-lg p-4 mb-4 ${index % 2 === 0 ? 'lg:ml-auto lg:border-l-0 lg:border-r-[3px] lg:rounded-r-none lg:rounded-l-lg' : ''}`}>
                      <p className="font-display text-xs font-bold uppercase tracking-wider text-[#0891B2] mb-1">
                        Learning Objective
                      </p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {lesson.objective}
                      </p>
                    </div>

                    {/* Takeaways (Enhancement #3) */}
                    <ul className={`space-y-2 mb-4 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                      {lesson.takeaways.map((takeaway, i) => (
                        <li key={i} className={`flex items-start gap-2 text-sm text-gray-600 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                          <CheckCircle2 className="w-4 h-4 text-[#65A30D] mt-0.5 flex-shrink-0" />
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Download button */}
                    <div className={`flex gap-3 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                      <a
                        href={lesson.downloadUrl}
                        download
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#65A30D] to-[#84cc16] text-white font-semibold shadow-lg shadow-[#65A30D]/35 hover:-translate-y-0.5 transition-all duration-200 text-sm"
                      >
                        <Download className="w-4 h-4" />
                        Download Lesson {lesson.number}
                      </a>
                      {lesson.assessmentLink && (
                        <Link
                          to="/bizgrowth/hr/human-resources-maturity-assessment"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#242553] text-white font-semibold hover:-translate-y-0.5 transition-all duration-200 text-sm"
                        >
                          <Target className="w-4 h-4" />
                          Take Assessment
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Preview Card Side */}
                  <div className={`mt-6 lg:mt-0 ${index % 2 === 0 ? 'lg:pl-16 lg:col-start-2' : 'lg:pr-16 lg:col-start-1 lg:row-start-1'}`}>
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                      <p className="font-display text-sm font-bold text-[#242553] mb-3">
                        {lesson.preview.title}
                      </p>

                      {'quote' in lesson.preview && lesson.preview.quote && (
                        <p className="text-sm text-gray-600 italic mb-3">
                          "{lesson.preview.quote}"
                        </p>
                      )}

                      {'stat' in lesson.preview && lesson.preview.stat && (
                        <div className="flex items-center gap-2 p-3 bg-[#0891B2]/10 rounded-lg">
                          <DollarSign className="w-5 h-5 text-[#0891B2]" />
                          <span className="text-sm font-semibold text-[#242553]">{lesson.preview.stat}</span>
                        </div>
                      )}

                      {'levels' in lesson.preview && lesson.preview.levels && (
                        <div className="space-y-2">
                          {lesson.preview.levels.map((level) => (
                            <div key={level.level} className="flex items-center gap-3">
                              <div className="w-6 h-6 rounded bg-gradient-to-br from-[#0891B2] to-[#0e7490] flex items-center justify-center">
                                <span className="text-white text-xs font-bold">{level.level}</span>
                              </div>
                              <span className="text-sm">
                                <strong>{level.name}:</strong> {level.desc}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {'stages' in lesson.preview && lesson.preview.stages && (
                        <div className="space-y-2">
                          {lesson.preview.stages.map((stage, i) => (
                            <div key={i} className="text-sm">
                              <span className="font-semibold text-[#242553]">{stage.stage}:</span>{' '}
                              <span className="text-gray-600">{stage.focus}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Interactive Assessment CTA (Enhancement #4) */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#f8fafc] to-gray-100 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(8,145,178,0.1),transparent_50%)]" />

        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 lg:p-12 text-center"
          >
            {/* Icon */}
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#0891B2] to-[#0e7490] flex items-center justify-center mb-6">
              <ClipboardCheck className="w-10 h-10 text-white" />
            </div>

            {/* Interactive Tool Badge (Enhancement #4) */}
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#0891B2] text-white text-xs font-bold uppercase tracking-wider mb-6">
              Interactive Tool
            </span>

            <h2 className="font-display text-2xl lg:text-3xl font-bold text-[#242553] mb-4">
              Take the Interactive HR Maturity Assessment
            </h2>

            <p className="text-lg text-gray-600 mb-6">
              Get personalized insights about your HR maturity level. Our interactive assessment tool provides real-time scoring across 8 HR domains and customized recommendations for your specific situation.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {['8 Diagnostic Questions', 'Real-Time Scoring', 'Personalized Recommendations', '5 Minutes or Less'].map((feature, i) => (
                <span key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#65A30D]" />
                  {feature}
                </span>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              to="/bizgrowth/hr/human-resources-maturity-assessment"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#0891B2] to-[#0e7490] text-white font-semibold text-lg shadow-lg shadow-[#0891B2]/35 hover:-translate-y-0.5 transition-all duration-200"
            >
              <FileText className="w-5 h-5" />
              Start Your HR Assessment
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: Downloads Section */}
      <section id="downloads" className="py-16 lg:py-24 bg-white scroll-mt-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <motion.p variants={fadeInUp} className="text-sm font-bold uppercase tracking-widest text-[#0891B2] mb-3">
              Download Your Resources
            </motion.p>
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl font-bold text-[#242553] mb-4">
              Complete HR 101 Foundation Curriculum
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-600">
              Download all 6 comprehensive lesson modules below. Each lesson includes detailed content, real-world examples, and practical templates you can implement immediately.
            </motion.p>
          </motion.div>

          {/* Download Cards Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {lessons.map((lesson, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group bg-white rounded-xl border-2 border-gray-200 p-6 flex flex-col hover:border-[#0891B2] hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                {/* Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{
                      backgroundColor: lesson.color === 'biz-teal' ? '#0891B2' :
                        lesson.color === 'biz-lime' ? '#65A30D' :
                          lesson.color === 'biz-copper' ? '#B45309' :
                            lesson.color === 'biz-green' ? '#969423' :
                              '#0e7490',
                    }}
                  >
                    Lesson {lesson.number}
                  </span>
                  <span className="text-xs font-medium text-gray-400 uppercase">PDF</span>
                </div>

                {/* Title */}
                <h3 className="font-display text-lg font-bold text-[#242553] mb-2">
                  {lesson.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 flex-grow">
                  {lesson.description}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {lesson.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    {lesson.pages}
                  </span>
                </div>

                {/* Download Button */}
                <a
                  href={lesson.downloadUrl}
                  download
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-[#65A30D] to-[#84cc16] text-white font-semibold shadow-lg shadow-[#65A30D]/35 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Download className="w-4 h-4" />
                  Download Lesson {lesson.number}
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 8: Quote Section */}
      <section className="py-16 lg:py-24 bg-[#f8fafc]">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center"
          >
            <Quote className="w-16 h-16 mx-auto text-[#0891B2]/30 mb-6" />
            <blockquote className="font-display text-2xl lg:text-3xl italic text-[#242553] mb-6 leading-relaxed">
              "You don't need to become an HR expert. You just need to build the right systems — and now you have the roadmap to do exactly that."
            </blockquote>
            <p className="font-semibold text-[#242553]">
              <span className="text-[#0891B2]">BizHealth.ai</span> — Your Business Health Coach
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 9: Final CTA Section (Enhancement #5) */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#242553] to-[#1a1b3d]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(8,145,178,0.2),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(101,163,13,0.1),transparent_50%)]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            <motion.p variants={fadeInUp} className="text-sm font-bold uppercase tracking-widest text-[#22d3ee] mb-3">
              Ready to Transform Your HR?
            </motion.p>
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              You Don't Need to Build This Alone
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-white/85 mb-8">
              In 75 minutes, you'll go from 'HR feels overwhelming' to 'I know exactly what to build and how to start.' Download the curriculum, take the assessment, and begin your journey to HR clarity — with BizHealth.ai as your guide every step of the way.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
              <a
                href="#downloads"
                onClick={(e) => handleSmoothScroll(e, 'downloads')}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#0891B2] to-[#0e7490] text-white font-semibold text-lg shadow-lg shadow-[#0891B2]/35 hover:-translate-y-0.5 transition-all duration-200"
              >
                <Download className="w-5 h-5" />
                Download All Lessons
              </a>
              <Link
                to="/bizgrowth/hr/human-resources-maturity-assessment"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#242553] font-semibold text-lg shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <FileText className="w-5 h-5" />
                Take the HR Assessment
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <GradientDivider />
      <GlobalFooter />
    </div>
  );
};

export default HR101FoundationModule;
