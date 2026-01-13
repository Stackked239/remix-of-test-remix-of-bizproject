import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from '@/components/GlobalFooter';
import GradientDivider from '@/components/GradientDivider';
import PromotionalBanner from '@/components/PromotionalBanner';
import SEO from '@/components/SEO';
import hrHeroImage from '@/assets/images/hr-human-resources-programs-hero.jpg';

import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  UserX,
  DoorOpen,
  ShieldAlert,
  Users,
  RefreshCw,
  Target,
  UserPlus,
  Rocket,
  DollarSign,
  TrendingUp,
  GraduationCap,
  Heart,
  Shield,
  Settings,
  Network,
  Lightbulb,
  Map,
  PlayCircle,
  FileText,
  Compass,
  Lock,
  CheckCircle,
  GitBranch,
  Link as LinkIcon,
  Quote,
  ArrowRight,
  ChevronRight,
  Calculator,
  Clock,
  Building2,
  Star,
  Zap,
  Award,
  BarChart3,
  Mail,
  Globe,
} from 'lucide-react';

// Animation variants
const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const scaleInVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

// Stat Counter Component with animation
const StatCounter = ({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let current = 0;
      const increment = value / 30;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
};

// Pillar data
const pillars = [
  { number: 1, icon: Target, title: 'HR Strategy & Workforce Planning', description: 'Align talent decisions to revenue goals', tool: 'Workforce Planning Template', stage: 'scaling' },
  { number: 2, icon: UserPlus, title: 'Talent Acquisition & Recruiting', description: 'Hire right people; reduce costly mis-hires', tool: 'Interview Scorecard Builder', stage: 'startup' },
  { number: 3, icon: Rocket, title: 'Onboarding & New Hire Integration', description: 'Get new hires productive 2-3 weeks faster', tool: '30-60-90 Day Plan', stage: 'startup' },
  { number: 4, icon: DollarSign, title: 'Compensation & Total Rewards', description: 'Pay strategically; retain top talent', tool: 'Salary Band Builder', stage: 'established' },
  { number: 5, icon: TrendingUp, title: 'Performance Management', description: 'Clear goals; regular feedback; accountability', tool: 'OKR Tracker Template', stage: 'scaling' },
  { number: 6, icon: GraduationCap, title: 'Learning & Development', description: 'Develop managers; build bench strength', tool: 'Manager Training Curriculum', stage: 'scaling' },
  { number: 7, icon: Heart, title: 'Employee Engagement & Retention', description: 'Measure culture; reduce preventable exits', tool: 'Engagement Survey Template', stage: 'established' },
  { number: 8, icon: Shield, title: 'HR Compliance & Risk', description: 'Stay legal; protect your company', tool: 'Employee Handbook Template', stage: 'startup' },
  { number: 9, icon: Settings, title: 'HR Technology & Systems', description: 'Right tools; data-driven decisions', tool: 'HR Tech Evaluation Scorecard', stage: 'established' },
  { number: 10, icon: Network, title: 'Leadership & Org Development', description: 'Structure that scales; succession planning', tool: 'Succession Planning Template', stage: 'established' },
];

// Pain point data
const painPoints = [
  {
    icon: UserX,
    title: "You've Made Expensive Mistakes",
    description: "That 'perfect' hire who turned out to be a disaster? It cost you $30K–$100K in lost productivity, recruiting, and team disruption. And it's not just the money—it's the 6 months of chaos.",
    stat: "50-200% of salary lost per bad hire"
  },
  {
    icon: DoorOpen,
    title: "Good People Keep Leaving",
    description: "Your best performer just quit for a competitor. No warning. No succession plan. Now you're scrambling to replace them while the team picks up the slack.",
    stat: "Turnover costs 50-200% of annual salary"
  },
  {
    icon: ShieldAlert,
    title: "You're One Mistake From Legal Trouble",
    description: "Employment law changes constantly. You're not sure if your handbook is compliant, if you're classifying contractors correctly, or what documentation you're missing.",
    stat: "Average employment lawsuit: $75,000+"
  },
  {
    icon: Users,
    title: "Your Managers Aren't Managing",
    description: "Your first-line managers were great individual contributors. But nobody taught them how to lead, give feedback, or develop their teams. Culture is slipping.",
    stat: "70% of engagement variance tied to managers"
  },
  {
    icon: RefreshCw,
    title: "You're Constantly Fighting Fires",
    description: "Every week brings a new people crisis. Hiring when desperate. Performance issues ignored until they explode. No time to build systems.",
    stat: "15-20 hours/month lost to reactive HR"
  },
];

// FAQ data
const faqs = [
  {
    question: "I'm a solopreneur / 1-2 person company. Is this for me?",
    answer: "Absolutely. The Start-Up Journey is designed for exactly this stage (0-3 years, 1-10 employees). At 1-2 employees, a bad hire is proportionally MORE expensive. Our first priority is helping you build a simple hiring process and onboarding plan—the two highest-impact activities at your stage."
  },
  {
    question: "I'm already experienced in HR. Is this too basic?",
    answer: "Not necessarily. If you're scaling past 50 employees or preparing for exit/acquisition, the Established or Enterprise journeys are designed for advanced needs: succession planning, strategic compensation, organizational design, due diligence readiness. Take our HR Assessment to see your recommended path."
  },
  {
    question: "HR is just compliance. We don't need training on 'culture' stuff.",
    answer: "HR is compliance AND strategy. Compliance keeps you from lawsuits. HR strategy makes you money. A 10-person company that goes from 40% annual turnover to 10% saves $50K+ per year. That's why we start with recruiting, onboarding, and engagement—they directly impact your bottom line."
  },
  {
    question: "I don't have time for courses. I'm busy running my business.",
    answer: "HR 101 is 75 minutes total—do it in one sitting or across 3 days. Individual pillar lessons are 15-20 minutes. Consume one lesson during lunch, spend 30 min applying it to your business. You're not going back to school; you're picking up tools for the week."
  },
  {
    question: "When will Pillars 4, 5, 6, etc. be available?",
    answer: "Here's our roadmap: Phase 2 (Pillars 4-6) — Q1 2026, Phase 3 (Pillars 7-9 + advanced) — Q2 2026, Phase 4 (Pillar 10 + industry-specific + global) — Q3 2026. You'll be notified when each phase launches."
  },
  {
    question: "I already have consultants / HR software. Can I use this alongside?",
    answer: "Absolutely. This is complementary. If you have an HR consultant, this codifies their advice into templates you can use going forward. If you use HR software (ADP, Gusto, BambooHR), we show you how to maximize it. Many coaches use our templates with clients."
  },
  {
    question: "I took the HR Assessment. How do I get my results?",
    answer: "Your report is emailed within 30 minutes. It includes HR maturity diagnosis, recommended learning path, and direct links to relevant modules. Check your email (or spam). If you don't receive it, contact support@bizhealth.ai."
  },
  {
    question: "Can I get a refund if I'm not satisfied?",
    answer: "If you're on Builder tier ($49/month), cancel anytime. If you're on annual ($399/year), you have a 30-day satisfaction guarantee. Take a lesson, try a template—if it's not for you, full refund."
  },
  {
    question: "Is this for U.S. businesses only? What about UK/Canada/Australia?",
    answer: "All core content applies globally. Hiring, onboarding, performance management are universal. Compliance and employment law ARE country-specific. Phase 4 (Q3 2026) includes country-specific compliance guides for UK, Canada, Australia, Germany, and India."
  },
  {
    question: "Who's behind BizHealth.ai? How do I know this is trustworthy?",
    answer: "BizHealth.ai is built by 50+ years of collective business experience—founders, operators, consultants, financial analysts, HR practitioners. Backed by research from McKinsey, Gartner, SBA, and industry leaders. Content tested with 250 diverse SMB personas."
  },
];

const HumanResourcesPrograms = () => {
  const [employeeCount, setEmployeeCount] = useState(10);
  const [averageSalary, setAverageSalary] = useState(60000);
  const [expandedPillar, setExpandedPillar] = useState<number | null>(null);

  // Calculator results
  const badHireCost = Math.round(averageSalary * 0.75);
  const departureCost = Math.round(averageSalary * 0.75);
  const productivityLoss = Math.round(employeeCount * averageSalary * 0.12);
  const totalPotentialLoss = badHireCost + departureCost + productivityLoss;

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'startup': return 'bg-[#2DD4BF] text-white';
      case 'scaling': return 'bg-[#2DD4BF]/70 text-white';
      case 'established': return 'bg-[#2DD4BF]/40 text-[#242553]';
      default: return 'bg-[#2DD4BF] text-white';
    }
  };

  const getStageLabel = (stage: string) => {
    switch (stage) {
      case 'startup': return 'Start-Up';
      case 'scaling': return 'Scaling';
      case 'established': return 'Established';
      default: return stage;
    }
  };

  return (
    <>
      <SEO
        title="HR Program for Small Business | Build People Systems That Scale"
        description="The complete HR training program for SMB owners. Learn to hire smarter, retain top talent, and build scalable people systems—without becoming an HR expert. Start with free HR 101."
        keywords="SMB HR program, small business HR training, HR for entrepreneurs, employee retention small business, hiring process template, HR compliance small business, performance management SMB"
        canonical="https://bizhealth.ai/bizgrowth/human-resources-programs"
        ogType="website"
      />
      
      <div className="min-h-screen bg-background">
        <PromotionalBanner />
        <GlobalNavigation />

        {/* SECTION 1: HERO */}
        <section className="relative pt-40 pb-20 overflow-hidden bg-[#242553]">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#242553] via-[#242553] to-[#1a1b3d]" />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Pre-headline Badge */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUpVariant}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-[#2DD4BF]/30 rounded-full px-4 py-2 mb-8"
              >
                <TrendingUp className="w-4 h-4 text-[#2DD4BF]" />
                <span className="text-white text-sm font-medium">
                  BizGrowth Academy
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial="hidden"
                animate="visible"
                variants={fadeUpVariant}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              >
                Stop Winging It on HR.{' '}
                <span className="text-[#2DD4BF]">Start Building Systems That Scale.</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial="hidden"
                animate="visible"
                variants={fadeUpVariant}
                className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto"
              >
                The complete HR program for SMB owners who want to hire smarter, retain top talent, 
                and build teams that drive growth—without becoming HR experts. Evidence-based frameworks. 
                Stage-matched content. Immediate ROI.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUpVariant}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-6"
              >
                <Button 
                  size="lg"
                  className="bg-[#2DD4BF] hover:bg-[#14B8A6] text-white font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Start HR 101 Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#2DD4BF] text-[#2DD4BF] hover:bg-[#2DD4BF] hover:text-white font-semibold px-8 py-6 text-lg transition-all"
                >
                  Take HR Assessment
                  <Compass className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>

              {/* CTA Subtext */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUpVariant}
                className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-white/60 mb-12"
              >
                <span className="flex items-center gap-2 justify-center">
                  <Clock className="w-4 h-4" />
                  5 lessons • 75 minutes • No credit card
                </span>
                <span className="flex items-center gap-2 justify-center">
                  <Target className="w-4 h-4" />
                  Get your personalized learning path
                </span>
              </motion.div>

              {/* Trust Bar */}
              <motion.p
                initial="hidden"
                animate="visible"
                variants={fadeUpVariant}
                className="text-white/50 text-sm mb-16"
              >
                Trusted by 2,500+ SMB owners • Evidence-based frameworks • Built for businesses like yours
              </motion.p>
            </div>

            {/* Floating Stats Cards */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              <motion.div 
                variants={scaleInVariant}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center hover:bg-white/15 transition-all"
              >
                <div className="text-3xl md:text-4xl font-bold text-[#2DD4BF] mb-2">
                  $55K–$150K
                </div>
                <p className="text-white/70 text-sm">
                  Annual cost of bad hires + turnover for a 10-person company
                </p>
              </motion.div>

              <motion.div 
                variants={scaleInVariant}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center hover:bg-white/15 transition-all"
              >
                <div className="text-3xl md:text-4xl font-bold text-[#2DD4BF] mb-2">
                  <StatCounter value={60} suffix="%" />
                </div>
                <p className="text-white/70 text-sm">
                  of SMBs stall after year 3 due to people problems
                </p>
              </motion.div>

              <motion.div 
                variants={scaleInVariant}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center hover:bg-white/15 transition-all"
              >
                <div className="text-3xl md:text-4xl font-bold text-[#2DD4BF] mb-2">
                  <StatCounter value={82} suffix="%" />
                </div>
                <p className="text-white/70 text-sm">
                  higher retention with structured onboarding (SHRM)
                </p>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUpVariant}
              className="mt-12 max-w-5xl mx-auto"
            >
              <img
                src={hrHeroImage}
                alt="HR team collaboration with organizational charts and HR technology systems"
                className="w-full rounded-2xl shadow-2xl border border-white/10"
              />
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: THE PROBLEM */}
        <section className="py-20 bg-[#F9FAFB]">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#242553] mb-4">
                Sound Familiar?
              </h2>
              <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
                You didn't start your business to become an HR expert. But suddenly, people problems are everywhere.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Pain Point Cards */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="space-y-4"
              >
                {painPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    variants={fadeUpVariant}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-100"
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center">
                        <point.icon className="w-6 h-6 text-red-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#242553] mb-2">{point.title}</h3>
                        <p className="text-sm text-[#6B7280] mb-3">{point.description}</p>
                        <span className="inline-flex items-center text-xs font-medium bg-red-50 text-red-600 px-3 py-1 rounded-full">
                          {point.stat}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Interactive Calculator */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpVariant}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 sticky top-32"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[#2DD4BF]/10 flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-[#2DD4BF]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#242553]">What's YOUR Cost of No HR Program?</h3>
                </div>

                <div className="space-y-6 mb-8">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-[#6B7280]">How many employees?</label>
                      <span className="text-sm font-bold text-[#242553]">{employeeCount}</span>
                    </div>
                    <Slider
                      value={[employeeCount]}
                      onValueChange={(value) => setEmployeeCount(value[0])}
                      max={100}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-[#6B7280]">Average salary?</label>
                      <span className="text-sm font-bold text-[#242553]">${averageSalary.toLocaleString()}</span>
                    </div>
                    <Slider
                      value={[averageSalary]}
                      onValueChange={(value) => setAverageSalary(value[0])}
                      max={200000}
                      min={30000}
                      step={5000}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-3 mb-6 p-4 bg-[#F9FAFB] rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B7280]">Cost of one bad hire:</span>
                    <span className="font-bold text-[#242553]">${badHireCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B7280]">Cost of one departure:</span>
                    <span className="font-bold text-[#242553]">${departureCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B7280]">Annual productivity loss:</span>
                    <span className="font-bold text-[#242553]">${productivityLoss.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between">
                    <span className="font-semibold text-[#242553]">Total potential annual loss:</span>
                    <span className="font-bold text-red-600 text-lg">${totalPotentialLoss.toLocaleString()}</span>
                  </div>
                </div>

                <Button className="w-full bg-[#2DD4BF] hover:bg-[#14B8A6] text-white">
                  See how to prevent this
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
            </div>

            {/* Stage Cards */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-6 mt-16"
            >
              <motion.div variants={fadeUpVariant} className="bg-white rounded-xl p-6 shadow-md border-t-4 border-[#2DD4BF]">
                <div className="flex items-center gap-2 mb-3">
                  <Rocket className="w-5 h-5 text-[#2DD4BF]" />
                  <span className="font-bold text-[#242553]">Start-Up</span>
                  <span className="text-xs text-[#6B7280]">(0-3 years, 1-10 employees)</span>
                </div>
                <p className="text-sm font-medium text-[#242553] mb-2">Focus: Hire right people. Stay legal.</p>
                <p className="text-xs text-[#6B7280] mb-2">Priority: Hiring process, onboarding, compliance basics</p>
                <p className="text-xs text-[#2DD4BF] font-medium">Timeline: 8-12 weeks</p>
              </motion.div>

              <motion.div variants={fadeUpVariant} className="bg-white rounded-xl p-6 shadow-md border-t-4 border-[#2DD4BF]/70">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-[#2DD4BF]" />
                  <span className="font-bold text-[#242553]">Scaling</span>
                  <span className="text-xs text-[#6B7280]">(3-10 years, 10-50 employees)</span>
                </div>
                <p className="text-sm font-medium text-[#242553] mb-2">Focus: Develop managers. Keep culture. Build systems.</p>
                <p className="text-xs text-[#6B7280] mb-2">Priority: Manager training, performance, engagement</p>
                <p className="text-xs text-[#2DD4BF] font-medium">Timeline: 12-16 weeks</p>
              </motion.div>

              <motion.div variants={fadeUpVariant} className="bg-white rounded-xl p-6 shadow-md border-t-4 border-[#2DD4BF]/40">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="w-5 h-5 text-[#2DD4BF]" />
                  <span className="font-bold text-[#242553]">Established</span>
                  <span className="text-xs text-[#6B7280]">(10+ years, 50+ employees)</span>
                </div>
                <p className="text-sm font-medium text-[#242553] mb-2">Focus: Optimize complexity. Prepare for next phase.</p>
                <p className="text-xs text-[#6B7280] mb-2">Priority: Succession, compensation, org design</p>
                <p className="text-xs text-[#2DD4BF] font-medium">Timeline: Ongoing optimization</p>
              </motion.div>
            </motion.div>

            <p className="text-center text-[#6B7280] mt-8 text-sm">
              What stage are you in? That determines what we build. <Link to="#pathways" className="text-[#2DD4BF] hover:underline font-medium">See your options →</Link>
            </p>
          </div>
        </section>

        {/* SECTION 3: SOLUTION INTRODUCTION */}
        <section className="py-20 bg-[#242553]/5">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-flex items-center gap-2 bg-[#2DD4BF]/10 border border-[#2DD4BF]/30 text-[#2DD4BF] text-sm font-medium px-4 py-2 rounded-full mb-6">
                Introducing
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#242553] mb-4">
                The BizGrowth Academy Human Resources Program
              </h2>
              <p className="text-xl text-[#6B7280] mb-8">
                Your complete roadmap from HR chaos to HR confidence
              </p>
              <div className="text-left space-y-4 text-[#6B7280] bg-white rounded-xl p-8 shadow-md">
                <p>
                  We built this program because we've seen too many great businesses stall, stumble, or fail because of preventable people problems. Not because the owners didn't care—but because nobody showed them what "good HR" actually looks like at their stage.
                </p>
                <p>
                  The Human Resources Program isn't generic HR theory from a textbook. It's a practical, stage-matched system designed specifically for SMB owners with limited time, budget, and zero desire to become HR professionals. You'll get the exact tools, templates, and training you need to build people systems that scale—in weeks, not years.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 4: 10-PILLAR FRAMEWORK */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#242553] mb-4">
                The 10-Pillar HR Framework
              </h2>
              <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
                A comprehensive system covering every aspect of people management. You don't build them all at once—we show you what to prioritize when.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12"
            >
              {pillars.map((pillar) => (
                <motion.div
                  key={pillar.number}
                  variants={scaleInVariant}
                  className={`relative bg-white rounded-xl p-5 border-2 cursor-pointer transition-all hover:shadow-lg ${
                    expandedPillar === pillar.number 
                      ? 'border-[#2DD4BF] shadow-lg' 
                      : 'border-gray-100 hover:border-[#2DD4BF]/50'
                  }`}
                  onClick={() => setExpandedPillar(expandedPillar === pillar.number ? null : pillar.number)}
                >
                  <div className={`absolute top-3 right-3 text-xs font-medium px-2 py-1 rounded-full ${getStageColor(pillar.stage)}`}>
                    {getStageLabel(pillar.stage)}
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-[#2DD4BF]/10 flex items-center justify-center mb-3">
                    <pillar.icon className="w-5 h-5 text-[#2DD4BF]" />
                  </div>
                  <div className="text-xs text-[#6B7280] mb-1">Pillar {pillar.number}</div>
                  <h3 className="font-semibold text-[#242553] text-sm mb-2 pr-12">{pillar.title}</h3>
                  <p className="text-xs text-[#6B7280]">{pillar.description}</p>
                  
                  <AnimatePresence>
                    {expandedPillar === pillar.number && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-gray-100"
                      >
                        <div className="flex items-center gap-2 text-xs">
                          <FileText className="w-4 h-4 text-[#2DD4BF]" />
                          <span className="font-medium text-[#242553]">Key Tool:</span>
                          <span className="text-[#6B7280]">{pillar.tool}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>

            {/* Reassurance Copy */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
              className="bg-[#F9FAFB] rounded-xl p-8 max-w-3xl mx-auto"
            >
              <p className="text-[#242553] font-medium mb-4">You don't need to master all 10. Here's what matters:</p>
              <ul className="space-y-2 text-sm text-[#6B7280]">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#2DD4BF] mt-0.5">•</span>
                  <span><strong className="text-[#242553]">Start-Up:</strong> Focus on Pillars 2, 3, 8 (Hiring, Onboarding, Compliance)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#2DD4BF] mt-0.5">•</span>
                  <span><strong className="text-[#242553]">Scaling:</strong> Add Pillars 1, 5, 6 (Strategy, Performance, L&D)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#2DD4BF] mt-0.5">•</span>
                  <span><strong className="text-[#242553]">Established:</strong> Layer in Pillars 4, 7, 9, 10 (Compensation, Engagement, Tech, Leadership)</span>
                </li>
              </ul>
              <p className="text-sm text-[#6B7280] mt-4">
                We'll guide you. Take our assessment or browse stage-based journeys below.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 5: WHAT'S AVAILABLE NOW (Phase 1) */}
        <section className="py-20 bg-[#F9FAFB]">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
              className="text-center mb-12"
            >
              <span className="inline-flex items-center gap-2 bg-[#2DD4BF] text-white text-sm font-medium px-4 py-2 rounded-full mb-6">
                <Zap className="w-4 h-4" />
                Available Now
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#242553] mb-4">
                What You Get Today (Phase 1)
              </h2>
              <p className="text-lg text-[#6B7280]">
                Everything below is available now. Full access starts at $0–$49/month.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            >
              {/* Card 1: HR 101 */}
              <motion.div variants={fadeUpVariant} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#2DD4BF]/10 flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-[#2DD4BF]" />
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">FREE</span>
                </div>
                <h3 className="text-lg font-bold text-[#242553] mb-1">HR 101 Foundation</h3>
                <p className="text-sm text-[#6B7280] mb-4">5 lessons • 75 minutes</p>
                <ul className="text-xs text-[#6B7280] space-y-2 mb-6">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#2DD4BF] flex-shrink-0 mt-0.5" /> HR Isn't Bureaucracy—It's Talent Optimization</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#2DD4BF] flex-shrink-0 mt-0.5" /> The True Cost of No HR Program</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#2DD4BF] flex-shrink-0 mt-0.5" /> HR Maturity: Where Are You Now?</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#2DD4BF] flex-shrink-0 mt-0.5" /> Your HR Roadmap by Business Stage</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-[#2DD4BF] flex-shrink-0 mt-0.5" /> Getting Started—Your First 3 Actions</li>
                </ul>
                <Button className="w-full bg-[#2DD4BF] hover:bg-[#14B8A6] text-white">
                  Start HR 101
                </Button>
                <p className="text-xs text-[#6B7280] text-center mt-3">Perfect entry point if HR feels overwhelming</p>
              </motion.div>

              {/* Card 2: Stage Journeys */}
              <motion.div variants={fadeUpVariant} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#2DD4BF]/10 flex items-center justify-center">
                    <Map className="w-6 h-6 text-[#2DD4BF]" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#242553] mb-1">Your Personalized Learning Path</h3>
                <p className="text-sm text-[#6B7280] mb-4">Choose your stage • Get your roadmap</p>
                <ul className="text-xs text-[#6B7280] space-y-2 mb-6">
                  <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-[#2DD4BF] flex-shrink-0 mt-0.5" /> Start-Up Journey (12 weeks)</li>
                  <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-[#2DD4BF] flex-shrink-0 mt-0.5" /> Scaling Journey (16 weeks)</li>
                  <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-[#2DD4BF] flex-shrink-0 mt-0.5" /> Established Journey (16 weeks)</li>
                  <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-[#2DD4BF] flex-shrink-0 mt-0.5" /> Enterprise Journey (14 weeks)</li>
                </ul>
                <Button variant="outline" className="w-full border-[#2DD4BF] text-[#2DD4BF] hover:bg-[#2DD4BF] hover:text-white">
                  Pick Your Journey
                </Button>
                <p className="text-xs text-[#6B7280] text-center mt-3">Not one-size-fits-all. Customized for your stage.</p>
              </motion.div>

              {/* Card 3: Video Lessons */}
              <motion.div variants={fadeUpVariant} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#2DD4BF]/10 flex items-center justify-center">
                    <PlayCircle className="w-6 h-6 text-[#2DD4BF]" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#242553] mb-1">19 Video Lessons</h3>
                <p className="text-sm text-[#6B7280] mb-4">Pillars 1, 2, 3, 8 | 15-20 min each</p>
                <ul className="text-xs text-[#6B7280] space-y-2 mb-6">
                  <li className="flex items-start gap-2"><PlayCircle className="w-4 h-4 text-[#2DD4BF] flex-shrink-0 mt-0.5" /> 6 lessons: HR Strategy & Planning</li>
                  <li className="flex items-start gap-2"><PlayCircle className="w-4 h-4 text-[#2DD4BF] flex-shrink-0 mt-0.5" /> 6 lessons: Talent Acquisition</li>
                  <li className="flex items-start gap-2"><PlayCircle className="w-4 h-4 text-[#2DD4BF] flex-shrink-0 mt-0.5" /> 4 lessons: Onboarding Integration</li>
                  <li className="flex items-start gap-2"><PlayCircle className="w-4 h-4 text-[#2DD4BF] flex-shrink-0 mt-0.5" /> 4 lessons: Compliance Essentials</li>
                </ul>
                <Button variant="outline" className="w-full border-[#2DD4BF] text-[#2DD4BF] hover:bg-[#2DD4BF] hover:text-white">
                  Browse Lessons
                </Button>
                <p className="text-xs text-[#6B7280] text-center mt-3">Practical exercises in every lesson</p>
              </motion.div>

              {/* Card 4: Templates */}
              <motion.div variants={fadeUpVariant} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#2DD4BF]/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#2DD4BF]" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#242553] mb-1">10 Core Templates</h3>
                <p className="text-sm text-[#6B7280] mb-4">Download • Customize • Use</p>
                <ul className="text-xs text-[#6B7280] space-y-1.5 mb-6">
                  <li className="flex items-start gap-2"><CheckCircle className="w-3 h-3 text-[#2DD4BF] flex-shrink-0 mt-0.5" /> HR Maturity Assessment</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-3 h-3 text-[#2DD4BF] flex-shrink-0 mt-0.5" /> Job Description Template</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-3 h-3 text-[#2DD4BF] flex-shrink-0 mt-0.5" /> Hiring Scorecard</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-3 h-3 text-[#2DD4BF] flex-shrink-0 mt-0.5" /> 30-60-90 Onboarding Plan</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-3 h-3 text-[#2DD4BF] flex-shrink-0 mt-0.5" /> Employee Handbook Outline</li>
                  <li className="flex items-start gap-2 text-[#2DD4BF] font-medium">+ 5 more templates</li>
                </ul>
                <Button variant="outline" className="w-full border-[#2DD4BF] text-[#2DD4BF] hover:bg-[#2DD4BF] hover:text-white">
                  View All Templates
                </Button>
                <p className="text-xs text-[#6B7280] text-center mt-3">Save time. Use proven frameworks.</p>
              </motion.div>

              {/* Card 5: Assessment */}
              <motion.div variants={fadeUpVariant} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-100 md:col-span-2 lg:col-span-2">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-[#2DD4BF]/10 flex items-center justify-center">
                        <Target className="w-6 h-6 text-[#2DD4BF]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#242553]">Take the HR Assessment</h3>
                        <p className="text-sm text-[#6B7280]">Get routed to YOUR best starting point</p>
                      </div>
                    </div>
                    <ul className="text-sm text-[#6B7280] space-y-2 mb-6">
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#2DD4BF]" /> 30-minute diagnostic</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#2DD4BF]" /> HR maturity diagnosis</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#2DD4BF]" /> Auto-recommended learning path</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#2DD4BF]" /> Personalized email with resources</li>
                    </ul>
                  </div>
                  <div className="flex flex-col justify-center">
                    <Button className="bg-[#2DD4BF] hover:bg-[#14B8A6] text-white px-8">
                      Start Assessment
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                    <p className="text-xs text-[#6B7280] text-center mt-3">Not sure where to start? We'll tell you.</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Reassurance */}
            <p className="text-center text-[#6B7280] text-sm max-w-3xl mx-auto">
              <strong className="text-[#242553]">All of Phase 1 is available now.</strong> Phases 2, 3, and 4 launch throughout 2026—see the roadmap below. 
              Already a BizGrowth member? All content is included. New? Access HR 101 and templates free, or upgrade to Builder tier ($49/mo) for full access.
            </p>
          </div>
        </section>

        {/* SECTION 6: WHAT'S COMING (Roadmap) */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#242553] mb-4">
                What's Coming: Your Complete HR Playbook (2026)
              </h2>
              <p className="text-lg text-[#6B7280]">
                We're not stopping at Phase 1. Here's what we're building.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-8"
            >
              {/* Phase 2 */}
              <motion.div variants={fadeUpVariant} className="relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#242553] text-white text-xs font-bold px-4 py-1 rounded-full">
                  Q1 2026
                </div>
                <div className="bg-[#F9FAFB] rounded-xl p-6 pt-8 border border-gray-200">
                  <h3 className="text-lg font-bold text-[#242553] mb-4">Phase 2 — Core Competencies</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-medium text-[#242553] flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-[#2DD4BF]" /> Compensation & Total Rewards
                      </p>
                      <p className="text-xs text-[#6B7280] ml-6">Market benchmarking, salary bands, total comp statements</p>
                    </div>
                    <div>
                      <p className="font-medium text-[#242553] flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-[#2DD4BF]" /> Performance Management
                      </p>
                      <p className="text-xs text-[#6B7280] ml-6">OKR framework, quarterly reviews, conversation scripts</p>
                    </div>
                    <div>
                      <p className="font-medium text-[#242553] flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-[#2DD4BF]" /> Learning & Development
                      </p>
                      <p className="text-xs text-[#6B7280] ml-6">First-time manager training, skills gap analysis</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Phase 3 */}
              <motion.div variants={fadeUpVariant} className="relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#242553] text-white text-xs font-bold px-4 py-1 rounded-full">
                  Q2 2026
                </div>
                <div className="bg-[#F9FAFB] rounded-xl p-6 pt-8 border border-gray-200">
                  <h3 className="text-lg font-bold text-[#242553] mb-4">Phase 3 — Advanced & Specialized</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-medium text-[#242553] flex items-center gap-2">
                        <Heart className="w-4 h-4 text-[#2DD4BF]" /> Employee Engagement & Retention
                      </p>
                      <p className="text-xs text-[#6B7280] ml-6">Engagement surveys, culture framework, recognition</p>
                    </div>
                    <div>
                      <p className="font-medium text-[#242553] flex items-center gap-2">
                        <Shield className="w-4 h-4 text-[#2DD4BF]" /> Compliance & Risk (Advanced)
                      </p>
                      <p className="text-xs text-[#6B7280] ml-6">Multi-jurisdiction, HR audits, due diligence</p>
                    </div>
                    <div>
                      <p className="font-medium text-[#242553] flex items-center gap-2">
                        <Settings className="w-4 h-4 text-[#2DD4BF]" /> HR Technology & Systems
                      </p>
                      <p className="text-xs text-[#6B7280] ml-6">HRIS evaluation, tech stack by stage</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Phase 4 */}
              <motion.div variants={fadeUpVariant} className="relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#242553] text-white text-xs font-bold px-4 py-1 rounded-full">
                  Q3 2026
                </div>
                <div className="bg-[#F9FAFB] rounded-xl p-6 pt-8 border border-gray-200">
                  <h3 className="text-lg font-bold text-[#242553] mb-4">Phase 4 — Specialization & Depth</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-medium text-[#242553] flex items-center gap-2">
                        <Network className="w-4 h-4 text-[#2DD4BF]" /> Leadership & Org Development
                      </p>
                      <p className="text-xs text-[#6B7280] ml-6">Succession, org design, change management</p>
                    </div>
                    <div>
                      <p className="font-medium text-[#242553] flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#2DD4BF]" /> Industry-Specific Tracks
                      </p>
                      <p className="text-xs text-[#6B7280] ml-6">Professional Services, Retail, Tech, Manufacturing</p>
                    </div>
                    <div>
                      <p className="font-medium text-[#242553] flex items-center gap-2">
                        <Globe className="w-4 h-4 text-[#2DD4BF]" /> Global Market Variants
                      </p>
                      <p className="text-xs text-[#6B7280] ml-6">UK, Canada, Australia, Germany, India guides</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <div className="text-center mt-12">
              <Button variant="outline" className="border-[#242553] text-[#242553] hover:bg-[#242553] hover:text-white">
                <Mail className="mr-2 w-4 h-4" />
                Get notified when Phase 2 launches
              </Button>
            </div>
          </div>
        </section>

        {/* SECTION 7: ENTRY PATHWAYS */}
        <section id="pathways" className="py-20 bg-[#F9FAFB]">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#242553] mb-4">
                Ready to Build Better HR? Here's Where to Start
              </h2>
              <p className="text-lg text-[#6B7280]">
                Choose the path that fits you. No wrong choice.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {/* Pathway 1: HR 101 */}
              <motion.div variants={fadeUpVariant} className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200 hover:border-green-400 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">FREE</span>
                </div>
                <h3 className="text-lg font-bold text-[#242553] mb-2">New to HR? Start Here</h3>
                <p className="text-sm text-[#6B7280] mb-4">Best for founders with zero HR experience</p>
                <ul className="text-xs text-[#6B7280] space-y-2 mb-6">
                  <li>• 5 lessons (75 minutes total)</li>
                  <li>• HR mindset shift</li>
                  <li>• Personal HR maturity assessment</li>
                  <li>• Stage-based roadmap</li>
                  <li>• First 3 actions guide</li>
                </ul>
                <div className="text-xs text-[#6B7280] mb-4">
                  <span className="font-medium">Cost:</span> FREE | <span className="font-medium">Time:</span> 75 min
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Start HR 101 Now
                </Button>
              </motion.div>

              {/* Pathway 2: Assessment */}
              <motion.div variants={fadeUpVariant} className="bg-white rounded-xl p-6 shadow-lg border-2 border-[#2DD4BF]/30 hover:border-[#2DD4BF] transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#2DD4BF]/10 flex items-center justify-center">
                    <Compass className="w-6 h-6 text-[#2DD4BF]" />
                  </div>
                  <span className="bg-[#2DD4BF]/10 text-[#2DD4BF] text-xs font-bold px-3 py-1 rounded-full">$99-$299</span>
                </div>
                <h3 className="text-lg font-bold text-[#242553] mb-2">Not Sure Where to Start?</h3>
                <p className="text-sm text-[#6B7280] mb-4">Best for data-driven leaders who want personalization</p>
                <ul className="text-xs text-[#6B7280] space-y-2 mb-6">
                  <li>• 30-minute diagnostic</li>
                  <li>• HR maturity diagnosis</li>
                  <li>• Business health context</li>
                  <li>• Detailed findings report</li>
                  <li>• Auto-recommended path</li>
                </ul>
                <div className="text-xs text-[#6B7280] mb-4">
                  <span className="font-medium">Cost:</span> $99-$299 | <span className="font-medium">Time:</span> 30 min
                </div>
                <Button className="w-full bg-[#2DD4BF] hover:bg-[#14B8A6] text-white">
                  Take HR Assessment
                </Button>
              </motion.div>

              {/* Pathway 3: Stage Journey */}
              <motion.div variants={fadeUpVariant} className="bg-white rounded-xl p-6 shadow-lg border-2 border-[#242553]/20 hover:border-[#242553]/50 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#242553]/10 flex items-center justify-center">
                    <Map className="w-6 h-6 text-[#242553]" />
                  </div>
                  <span className="bg-[#242553]/10 text-[#242553] text-xs font-bold px-3 py-1 rounded-full">FREE Preview</span>
                </div>
                <h3 className="text-lg font-bold text-[#242553] mb-2">Pick Your Stage, Get Your Plan</h3>
                <p className="text-sm text-[#6B7280] mb-4">Best for self-directed learners who know their stage</p>
                <ul className="text-xs text-[#6B7280] space-y-2 mb-6">
                  <li>• Start-Up Journey (12 weeks)</li>
                  <li>• Scaling Journey (16 weeks)</li>
                  <li>• Established Journey (16 weeks)</li>
                  <li>• Enterprise Journey (14 weeks)</li>
                </ul>
                <div className="text-xs text-[#6B7280] mb-4">
                  <span className="font-medium">Cost:</span> FREE preview / $49/mo full
                </div>
                <Button variant="outline" className="w-full border-[#242553] text-[#242553] hover:bg-[#242553] hover:text-white">
                  Browse Journeys
                </Button>
              </motion.div>

              {/* Pathway 4: Builder Tier */}
              <motion.div variants={fadeUpVariant} className="bg-gradient-to-br from-[#242553] to-[#1a1b3d] rounded-xl p-6 shadow-lg border-2 border-[#2DD4BF] relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#2DD4BF] text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                  BEST VALUE
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-[#2DD4BF]" />
                  </div>
                  <span className="bg-[#2DD4BF] text-white text-xs font-bold px-3 py-1 rounded-full">$49/month</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Full Access + Support</h3>
                <p className="text-sm text-white/70 mb-4">Best for those ready to commit</p>
                <ul className="text-xs text-white/80 space-y-2 mb-6">
                  <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-[#2DD4BF]" /> All Phase 1 content (19 lessons)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-[#2DD4BF]" /> 10 Core Templates</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-[#2DD4BF]" /> Progress tracking</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-[#2DD4BF]" /> Priority support</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-[#2DD4BF]" /> Early access to Phase 2-4</li>
                </ul>
                <div className="text-xs text-white/60 mb-4">
                  Or $399/year (save 33%) • Cancel anytime
                </div>
                <Button className="w-full bg-[#2DD4BF] hover:bg-[#14B8A6] text-white">
                  Upgrade to Builder
                </Button>
              </motion.div>
            </motion.div>

            <p className="text-center text-[#6B7280] text-sm mt-8 max-w-2xl mx-auto">
              <strong className="text-[#242553]">Most users start with HR 101 to build confidence, then choose their journey.</strong> If you're assessment-driven, 
              take the HR diagnostic first. If you know your stage, jump to your journey. There's no "right" path—pick what fits you.
            </p>
          </div>
        </section>

        {/* SECTION 8: WHY BIZHEALTH */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#242553] mb-4">
                Why Choose BizHealth for HR?
              </h2>
              <p className="text-lg text-[#6B7280]">
                You could Google templates. Or you could get a complete, stage-specific framework. Here's why we're different.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            >
              <motion.div variants={fadeUpVariant} className="bg-[#F9FAFB] rounded-xl p-6">
                <div className="w-12 h-12 rounded-xl bg-[#2DD4BF]/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-[#2DD4BF]" />
                </div>
                <h3 className="font-bold text-[#242553] mb-2">Built by Real Business People</h3>
                <p className="text-sm text-[#6B7280] mb-3">
                  50+ years of collective experience as founders, operators, consultants. Built with input from 250 diverse SMB personas. Not theory—battle-tested.
                </p>
                <p className="text-xs text-[#2DD4BF] font-medium">Based on input from 30+ industries</p>
              </motion.div>

              <motion.div variants={fadeUpVariant} className="bg-[#F9FAFB] rounded-xl p-6">
                <div className="w-12 h-12 rounded-xl bg-[#2DD4BF]/10 flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-[#2DD4BF]" />
                </div>
                <h3 className="font-bold text-[#242553] mb-2">Evidence-Based, Not Opinion-Based</h3>
                <p className="text-sm text-[#6B7280] mb-3">
                  Every framework is validated. Content anchored in research from McKinsey, Gartner, SBA, SHRM. When we cite stats, they're research-backed.
                </p>
                <p className="text-xs text-[#2DD4BF] font-medium">Frameworks: Balanced Scorecard, OKRs, McKinsey 7S</p>
              </motion.div>

              <motion.div variants={fadeUpVariant} className="bg-[#F9FAFB] rounded-xl p-6">
                <div className="w-12 h-12 rounded-xl bg-[#2DD4BF]/10 flex items-center justify-center mb-4">
                  <GitBranch className="w-6 h-6 text-[#2DD4BF]" />
                </div>
                <h3 className="font-bold text-[#242553] mb-2">Stage-Specific, Not One-Size-Fits-All</h3>
                <p className="text-sm text-[#6B7280] mb-3">
                  A Start-Up of 2 people shouldn't learn what an Enterprise of 150 needs. Our journeys are customized by stage.
                </p>
                <p className="text-xs text-[#2DD4BF] font-medium">4 different journeys + assessment routing</p>
              </motion.div>

              <motion.div variants={fadeUpVariant} className="bg-[#F9FAFB] rounded-xl p-6">
                <div className="w-12 h-12 rounded-xl bg-[#2DD4BF]/10 flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6 text-[#2DD4BF]" />
                </div>
                <h3 className="font-bold text-[#242553] mb-2">Immediately Actionable</h3>
                <p className="text-sm text-[#6B7280] mb-3">
                  Every lesson includes templates, exercises, and real examples. You'll have a hiring scorecard or onboarding plan by Week 1.
                </p>
                <p className="text-xs text-[#2DD4BF] font-medium">10 templates available now</p>
              </motion.div>

              <motion.div variants={fadeUpVariant} className="bg-[#F9FAFB] rounded-xl p-6 md:col-span-2 lg:col-span-2">
                <div className="w-12 h-12 rounded-xl bg-[#2DD4BF]/10 flex items-center justify-center mb-4">
                  <LinkIcon className="w-6 h-6 text-[#2DD4BF]" />
                </div>
                <h3 className="font-bold text-[#242553] mb-2">Part of Your Broader Business Health</h3>
                <p className="text-sm text-[#6B7280] mb-3">
                  HR doesn't exist in isolation. Low HR score → Academy recommends modules. Need deeper help → BizGuides coaches. 
                  Need templates → BizTools. Need leadership training → BizLeaDeR. One ecosystem.
                </p>
                <p className="text-xs text-[#2DD4BF] font-medium">Integrated with BizHealth assessment | Connected to full ecosystem</p>
              </motion.div>
            </motion.div>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full max-w-4xl mx-auto text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-3 px-4 text-left text-[#6B7280] font-normal"></th>
                    <th className="py-3 px-4 text-center text-[#6B7280]">Google Templates</th>
                    <th className="py-3 px-4 text-center text-[#6B7280]">HR Consultant</th>
                    <th className="py-3 px-4 text-center bg-[#2DD4BF]/10 text-[#242553] font-bold rounded-t-lg">BizHealth HR</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-[#242553]">Cost</td>
                    <td className="py-3 px-4 text-center text-[#6B7280]">Free</td>
                    <td className="py-3 px-4 text-center text-[#6B7280]">$7,500-$15,000</td>
                    <td className="py-3 px-4 text-center bg-[#2DD4BF]/5 font-medium text-[#242553]">$0-$199/month</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-[#242553]">Time to Value</td>
                    <td className="py-3 px-4 text-center text-[#6B7280]">Hours (no guidance)</td>
                    <td className="py-3 px-4 text-center text-[#6B7280]">3-6 months</td>
                    <td className="py-3 px-4 text-center bg-[#2DD4BF]/5 font-medium text-[#242553]">Weeks</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-[#242553]">Stage-Matched</td>
                    <td className="py-3 px-4 text-center text-[#6B7280]">None</td>
                    <td className="py-3 px-4 text-center text-[#6B7280]">Custom (expensive)</td>
                    <td className="py-3 px-4 text-center bg-[#2DD4BF]/5 font-medium text-[#242553]">4 journeys</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-[#242553]">Templates</td>
                    <td className="py-3 px-4 text-center text-[#6B7280]">Generic</td>
                    <td className="py-3 px-4 text-center text-[#6B7280]">Custom (one-time)</td>
                    <td className="py-3 px-4 text-center bg-[#2DD4BF]/5 font-medium text-[#242553]">40+ (forever)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-[#242553]">ROI</td>
                    <td className="py-3 px-4 text-center text-[#6B7280]">Uncertain</td>
                    <td className="py-3 px-4 text-center text-[#6B7280]">1-2x</td>
                    <td className="py-3 px-4 text-center bg-[#2DD4BF]/5 font-bold text-[#2DD4BF] rounded-b-lg">20-25x</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 9: SUCCESS STORIES */}
        <section className="py-20 bg-[#242553]">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Real Results from Real SMB Founders
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-8"
            >
              {/* Story 1 */}
              <motion.div variants={fadeUpVariant} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#2DD4BF]/20 flex items-center justify-center">
                    <span className="text-lg font-bold text-[#2DD4BF]">G</span>
                  </div>
                  <div>
                    <p className="font-bold text-white">Gloria</p>
                    <p className="text-sm text-white/60">Food & Beverage | 1→3 employees</p>
                  </div>
                </div>
                <Quote className="w-8 h-8 text-[#2DD4BF]/30 mb-2" />
                <p className="text-white/80 text-sm mb-4">
                  "I hired a manager and it didn't work out. Lost 6 months. In a 1-person company, that's catastrophic. 
                  HR 101 shifted my thinking. Now I have a process that works."
                </p>
                <ul className="text-xs text-[#2DD4BF] space-y-1">
                  <li>✓ Built hiring scorecard (used 2x)</li>
                  <li>✓ 3 weeks time-to-hire (vs. ad-hoc)</li>
                  <li>✓ Better quality hires</li>
                </ul>
              </motion.div>

              {/* Story 2 */}
              <motion.div variants={fadeUpVariant} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#2DD4BF]/20 flex items-center justify-center">
                    <span className="text-lg font-bold text-[#2DD4BF]">F</span>
                  </div>
                  <div>
                    <p className="font-bold text-white">Friedrich</p>
                    <p className="text-sm text-white/60">CPA Firm | Retention issues</p>
                  </div>
                </div>
                <Quote className="w-8 h-8 text-[#2DD4BF]/30 mb-2" />
                <p className="text-white/80 text-sm mb-4">
                  "Lost my top person to a competitor. Took 3 months to replace. Realized I'd been ignoring engagement. 
                  HR was the last thing on my list—it was WHY I was losing people."
                </p>
                <ul className="text-xs text-[#2DD4BF] space-y-1">
                  <li>✓ No departures in 12 months</li>
                  <li>✓ Implemented engagement survey</li>
                  <li>✓ Started manager training</li>
                </ul>
              </motion.div>

              {/* Aggregate Stats */}
              <motion.div variants={fadeUpVariant} className="bg-[#2DD4BF]/10 backdrop-blur-md rounded-xl p-6 border border-[#2DD4BF]/30">
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 className="w-6 h-6 text-[#2DD4BF]" />
                  <p className="font-bold text-white">Early Adopter Results</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/70">Avg retention improvement</span>
                      <span className="font-bold text-[#2DD4BF]">18%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#2DD4BF] rounded-full" style={{ width: '18%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/70">Completion rate</span>
                      <span className="font-bold text-[#2DD4BF]">92%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#2DD4BF] rounded-full" style={{ width: '92%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/70">"Immediately applicable"</span>
                      <span className="font-bold text-[#2DD4BF]">87%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#2DD4BF] rounded-full" style={{ width: '87%' }} />
                    </div>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex items-center gap-2">
                    <Star className="w-5 h-5 text-[#2DD4BF]" />
                    <span className="text-white font-bold">4.8/5</span>
                    <span className="text-white/60 text-sm">NPS from learners</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <div className="text-center mt-12">
              <Button className="bg-[#2DD4BF] hover:bg-[#14B8A6] text-white px-8">
                Ready to be a success story?
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* SECTION 10: FAQ */}
        <section className="py-20 bg-[#F9FAFB]">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#242553] mb-4">
                Questions? We've Got Answers
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="bg-white rounded-xl border border-gray-100 px-6 shadow-sm"
                  >
                    <AccordionTrigger className="text-left text-[#242553] font-medium hover:text-[#2DD4BF] py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#6B7280] pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <p className="text-center text-[#6B7280] text-sm mt-8">
              Didn't see your question? <Link to="/contact" className="text-[#2DD4BF] hover:underline font-medium">Contact support</Link> or chat with a BizGuide coach
            </p>
          </div>
        </section>

        {/* SECTION 11: CTA HUB */}
        <section className="py-20 bg-[#242553]/5">
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#242553] mb-4">
                Ready to Build Better HR?
              </h2>
              <p className="text-lg text-[#6B7280]">
                Choose your starting point. We'll guide you from there.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12"
            >
              <motion.div variants={fadeUpVariant}>
                <Button className="w-full h-auto py-4 flex-col bg-[#2DD4BF] hover:bg-[#14B8A6] text-white">
                  <span className="font-bold">Start HR 101 Now</span>
                  <span className="text-xs opacity-80">FREE • 75 min • No credit card</span>
                </Button>
              </motion.div>
              <motion.div variants={fadeUpVariant}>
                <Button variant="outline" className="w-full h-auto py-4 flex-col border-2 border-[#2DD4BF] text-[#2DD4BF] hover:bg-[#2DD4BF] hover:text-white">
                  <span className="font-bold">Take HR Assessment</span>
                  <span className="text-xs">Get personalized path</span>
                </Button>
              </motion.div>
              <motion.div variants={fadeUpVariant}>
                <Button variant="outline" className="w-full h-auto py-4 flex-col border-2 border-[#2DD4BF] text-[#2DD4BF] hover:bg-[#2DD4BF] hover:text-white">
                  <span className="font-bold">Browse Stage Journeys</span>
                  <span className="text-xs">See learning paths</span>
                </Button>
              </motion.div>
              <motion.div variants={fadeUpVariant}>
                <Button className="w-full h-auto py-4 flex-col bg-[#242553] hover:bg-[#1a1b3d] text-white">
                  <span className="font-bold">Upgrade to Builder</span>
                  <span className="text-xs opacity-80">$49/mo • Full access</span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust Signals */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
              className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-8"
            >
              <div className="space-y-2 text-sm text-[#6B7280]">
                <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#2DD4BF]" /> Trusted by 2,500+ SMB founders</p>
                <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#2DD4BF]" /> 50+ years of business experience</p>
                <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#2DD4BF]" /> Used in 30+ industries</p>
              </div>
              <div className="space-y-2 text-sm text-[#6B7280]">
                <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#2DD4BF]" /> Evidence-based frameworks</p>
                <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#2DD4BF]" /> 92% completion rate</p>
                <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#2DD4BF]" /> 4.8/5 NPS from learners</p>
              </div>
              <div className="space-y-2 text-sm text-[#6B7280]">
                <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#2DD4BF]" /> No long-term contract</p>
                <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#2DD4BF]" /> Cancel anytime</p>
                <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#2DD4BF]" /> 30-day satisfaction guarantee</p>
              </div>
            </motion.div>

            {/* Secondary Links */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-[#6B7280]">
              <Link to="/login" className="hover:text-[#2DD4BF]">Already a member? Sign in</Link>
              <span>•</span>
              <Link to="#faq" className="hover:text-[#2DD4BF]">Questions? See FAQ</Link>
              <span>•</span>
              <Link to="/bizguides" className="hover:text-[#2DD4BF]">Group licensing? Talk to BizGuides</Link>
            </div>

            <p className="text-center text-[#6B7280] text-sm mt-8 max-w-2xl mx-auto">
              You don't have to figure this out alone. Whether you're just starting or preparing to scale, we've got the framework and resources to build sustainable HR. 
              Choose your starting point above—most users start with HR 101 and upgrade later.
            </p>
          </div>
        </section>

        <GradientDivider variant="green-gold" />
        <GlobalFooter />
      </div>
    </>
  );
};

export default HumanResourcesPrograms;
