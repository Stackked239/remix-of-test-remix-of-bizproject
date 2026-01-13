import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from '@/components/GlobalFooter';
import GradientDivider from '@/components/GradientDivider';
import PromotionalBanner from '@/components/PromotionalBanner';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { toast } from 'sonner';
import {
  Compass,
  ClipboardCheck,
  FileText,
  MessageSquare,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  CheckCircle,
  XCircle,
  Lightbulb,
  Shield,
  Rocket,
  Building2,
  ChevronDown,
  Lock,
  ExternalLink,
  GraduationCap,
  Target,
  Users,
  Calendar,
  Zap,
} from 'lucide-react';

// Animation variants
const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// Stat Counter Component
const StatCounter = ({ value, label }: { value: string; label: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (isInView) {
      const numericValue = parseInt(value.replace(/\D/g, ''));
      const suffix = value.replace(/[0-9]/g, '');
      let current = 0;
      const increment = numericValue / 30;
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current) + suffix);
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">{displayValue}</div>
      <div className="text-white/80 text-sm">{label}</div>
    </div>
  );
};

// Pillar Card Component
// Pillar Card Component - Enhanced UX
const PillarCard = ({
  number,
  title,
  description,
  hint,
  icon: Icon,
  delay,
}: {
  number: string;
  title: string;
  description: string;
  hint: string;
  icon: React.ElementType;
  delay: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.div
      variants={fadeUpVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay }}
      onClick={() => setIsExpanded(!isExpanded)}
      className="group relative bg-gradient-to-br from-white to-[#f7fafc] border border-gray-200 rounded-xl p-6 cursor-pointer hover:border-l-4 hover:border-l-[#319795] hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#319795]/0 to-[#319795]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative flex items-start gap-5">
        {/* Number badge with glow effect */}
        <div className="flex-shrink-0 relative">
          <div className="absolute inset-0 bg-[#242553] rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity" />
          <div className="relative w-14 h-14 bg-gradient-to-br from-[#242553] to-[#1a1b3d] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
            {number}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-[#319795]/10 rounded-lg group-hover:bg-[#319795]/20 transition-colors">
              <Icon className="w-5 h-5 text-[#319795]" />
            </div>
            <h3 className="text-xl font-semibold text-[#2d3748] group-hover:text-[#242553] transition-colors">{title}</h3>
          </div>
          
          <p className="text-[#4a5568] mb-4 leading-relaxed">{description}</p>
          
          {/* Expandable hint section */}
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-gray-100">
              <p className="text-sm text-[#319795] font-medium flex items-start gap-2">
                <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" />
                {hint}
              </p>
            </div>
          </motion.div>
          
          {/* Click indicator */}
          <div className="flex items-center gap-2 mt-3 text-sm text-[#319795] font-medium opacity-70 group-hover:opacity-100 transition-opacity">
            <span>{isExpanded ? 'Click to collapse' : 'Click to learn more'}</span>
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Tool Card Component - Enhanced UX
const ToolCard = ({
  title,
  description,
  tag,
  icon: Icon,
}: {
  title: string;
  description: string;
  tag: string;
  icon: React.ElementType;
}) => (
  <motion.div
    variants={fadeUpVariant}
    whileHover={{ y: -8, scale: 1.02 }}
    transition={{ duration: 0.3 }}
    className="group relative bg-white border border-gray-200 rounded-xl p-6 hover:shadow-2xl hover:border-[#319795] transition-all duration-300 overflow-hidden"
  >
    {/* Decorative corner accent */}
    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#319795]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    
    <div className="relative">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-semibold bg-gradient-to-r from-[#319795]/10 to-[#319795]/5 text-[#319795] px-3 py-1.5 rounded-full border border-[#319795]/20">
          {tag}
        </span>
      </div>
      
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2.5 bg-[#242553]/5 rounded-lg group-hover:bg-[#242553]/10 group-hover:scale-110 transition-all duration-300">
          <Icon className="w-5 h-5 text-[#242553]" />
        </div>
        <h3 className="font-semibold text-[#2d3748] group-hover:text-[#242553] transition-colors">{title}</h3>
      </div>
      
      <p className="text-[#4a5568] text-sm leading-relaxed mb-4">{description}</p>
      
      {/* Hover reveal CTA */}
      <div className="flex items-center gap-2 text-sm font-medium text-[#319795] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
        <span>Included in module</span>
        <CheckCircle className="w-4 h-4" />
      </div>
    </div>
  </motion.div>
);

// Stage Card Component
const StageCard = ({
  badge,
  title,
  description,
  tools,
  icon: Icon,
  highlighted,
}: {
  badge: string;
  title: string;
  description: string;
  tools: string;
  icon: React.ElementType;
  highlighted?: boolean;
}) => (
  <motion.div
    variants={fadeUpVariant}
    className={`rounded-lg p-6 ${
      highlighted
        ? 'bg-[#319795] text-white border-2 border-[#319795]'
        : 'bg-white border border-gray-200 hover:border-[#319795]'
    } transition-all duration-300 hover:shadow-lg`}
  >
    <span
      className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${
        highlighted ? 'bg-white/20 text-white' : 'bg-[#f7fafc] text-[#319795]'
      }`}
    >
      {badge}
    </span>
    <div className="flex items-center gap-3 mb-4">
      <Icon className={`w-6 h-6 ${highlighted ? 'text-white' : 'text-[#242553]'}`} />
      <h3 className={`text-xl font-semibold ${highlighted ? 'text-white' : 'text-[#2d3748]'}`}>
        {title}
      </h3>
    </div>
    <p className={`mb-4 ${highlighted ? 'text-white/90' : 'text-[#4a5568]'}`}>{description}</p>
    <p className={`text-sm ${highlighted ? 'text-white/80' : 'text-[#4a5568]'}`}>
      <strong>Featured Tools:</strong> {tools}
    </p>
  </motion.div>
);

const BusinessGrowthStrategies = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    businessStage: '',
    challenge: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showMobileCTA, setShowMobileCTA] = useState(false);
  const [mobileCTADismissed, setMobileCTADismissed] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Mobile sticky CTA logic
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current && !mobileCTADismissed) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setShowMobileCTA(heroBottom < 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileCTADismissed]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.businessStage) {
      toast.error('Please fill in all required fields');
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("You're on the list! Check your inbox for confirmation.");
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Schema data for SEO
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Business Growth Strategies Module',
    description:
      'A 5-pillar framework for strategic business growth, including tools, templates, and practical methodology for SMB owners.',
    provider: {
      '@type': 'Organization',
      name: 'BizHealth.ai',
      url: 'https://bizhealth.ai',
    },
    educationalLevel: 'Beginner to Intermediate',
    audience: {
      '@type': 'Audience',
      audienceType: 'Small and Medium Business Owners',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is this another quick growth hack course?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "No—this is the opposite. It's designed to help you avoid destructive growth. If you're looking for magic formulas or \"10X in 10 days\" promises, this isn't for you. If you want sustainable, profitable growth backed by strategy and systems, you're in the right place.",
        },
      },
      {
        '@type': 'Question',
        name: 'How much time does this take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can move through it at your pace. Most owners complete the core framework in 4-6 weeks (30-60 minutes per week). Each tool takes 20-30 minutes.',
        },
      },
      {
        '@type': 'Question',
        name: "What if I discover I shouldn't grow right now?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "That's a win. Knowing you're \"not yet\" ready is better than failing at growth. The module shows you exactly what to improve before you revisit scaling.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <SEO
        title="Business Growth Strategies for Small Business | BizGrowth Academy | BizHealth.ai"
        description="Learn the 5-pillar framework for strategic business growth. Practical tools, honest methodology, no hype. Built for SMB owners ($250K-$50M). Free growth readiness assessment available."
        keywords="small business growth strategies, business growth framework, how to scale a small business, SMB growth planning, growth readiness assessment, business scaling, strategic growth"
        canonical="https://bizhealth.ai/bizgrowth/business-growth-strategies"
        ogType="website"
        ogImage="/og-images/og-business-growth-strategies.jpg"
      />
      {/* Course Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PromotionalBanner />
      <GlobalNavigation />

      {/* SECTION 1: HERO */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-[#242553] via-[#2d2d6a] to-[#3d3d7a] overflow-hidden pt-20"
      >
        {/* Abstract pattern background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 border border-white/20 rounded-full" />
          <div className="absolute top-40 right-20 w-96 h-96 border border-white/10 rounded-full" />
          <div className="absolute bottom-20 left-1/3 w-48 h-48 border border-white/15 rounded-full" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
          >
            <TrendingUp className="w-4 h-4 text-[#C8E600]" />
            <span className="text-white text-sm font-medium">
              BizGrowth Academy — Coming Q1 2026
            </span>
          </motion.div>

          {/* H1 Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-montserrat"
          >
            Growth Without Preparation Isn't Opportunity—<span className="text-[#969423]">It's Risk</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            60% of small businesses stall after year three. Not because growth is bad—but because
            they're unprepared for it. The BizGrowth Business Growth module gives you the framework,
            tools, and clarity to grow consciously, profitably, and sustainably.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button
              onClick={() => scrollToSection('signup-form')}
              className="bg-[#c05621] hover:bg-[#a04a1c] text-white px-8 py-6 text-lg font-semibold rounded-md shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              Join Early Access
            </Button>
            <button
              onClick={() => scrollToSection('five-pillars')}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-lg border-2 border-white rounded-md px-6 py-3 hover:bg-white/10"
            >
              See What's Inside <ArrowDown className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Social Proof Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-white/70 text-sm"
          >
            Trusted by 2,500+ business owners across 30+ industries | Built on 50+ years of
            real-world expertise
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-white/50 animate-bounce" />
        </motion.div>
      </section>

      {/* SECTION 2: THE GROWTH PARADOX */}
      <section className="py-20 bg-[#f7fafc]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Left Column - 60% */}
            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <span className="text-xs font-semibold tracking-wider text-[#969423] uppercase mb-4 block">
                THE UNCOMFORTABLE TRUTH
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2d3748] mb-6 font-montserrat">
                Why Smart Businesses Fail at Growth
              </h2>
              <div className="prose prose-lg text-[#4a5568]">
                <p className="mb-4">
                  You've likely experienced this: your business is running well at current size.
                  You're profitable, your team knows their jobs, customers are happy. So you decide
                  to grow.
                </p>
                <p className="mb-6 font-semibold text-[#2d3748]">Then something breaks.</p>
                <p className="mb-8">
                  Maybe it's your cash flow. Maybe your team starts burning out. Maybe your quality
                  drops. The irony is harsh: growth was supposed to fix problems, but it exposed
                  every weakness you didn't know you had.
                </p>
              </div>

              {/* Bullet Points */}
              <div className="space-y-4">
                {[
                  'Rapid growth is a leading cause of small business failure—when it overwhelms operational or financial capacity',
                  'The same growth you believe will "fix" your business often amplifies its hidden weaknesses',
                  '70% of small businesses face cash flow constraints; growth makes that worse before it gets better',
                  'Most growth plans fail not because the ideas are bad, but because execution breaks down',
                ].map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-[#c53030] flex-shrink-0 mt-0.5" />
                    <p className="text-[#4a5568]">{point}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - 40% */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2 flex flex-col items-center space-y-4"
            >
              {/* Breakdown Chain Cards - Centered on all screens */}
              <motion.div
                variants={fadeUpVariant}
                className="w-full max-w-sm bg-white rounded-lg p-5 shadow-md border-l-4 border-[#38a169]"
              >
                <div className="flex items-center justify-center gap-3">
                  <TrendingUp className="w-6 h-6 text-[#38a169]" />
                  <span className="font-semibold text-[#2d3748]">Revenue Grows Fast</span>
                </div>
              </motion.div>
              <div className="flex justify-center">
                <ArrowDown className="w-5 h-5 text-[#4a5568]" />
              </div>
              <motion.div
                variants={fadeUpVariant}
                className="w-full max-w-sm bg-white rounded-lg p-5 shadow-md border-l-4 border-[#c05621]"
              >
                <div className="flex items-center justify-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-[#c05621]" />
                  <span className="font-semibold text-[#2d3748]">Costs Jump Faster</span>
                </div>
              </motion.div>
              <div className="flex justify-center">
                <ArrowDown className="w-5 h-5 text-[#4a5568]" />
              </div>
              <motion.div
                variants={fadeUpVariant}
                className="w-full max-w-sm bg-white rounded-lg p-5 shadow-md border-l-4 border-[#c53030]"
              >
                <div className="flex items-center justify-center gap-3">
                  <Zap className="w-6 h-6 text-[#c53030]" />
                  <div className="text-center">
                    <span className="font-semibold text-[#2d3748] block">Something Breaks</span>
                    <span className="text-sm text-[#4a5568]">(Cash / Team / Quality)</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Full-Width Callout */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 bg-[#242553] rounded-xl p-8 text-white flex items-start gap-6"
          >
            <Lightbulb className="w-10 h-10 text-[#969423] flex-shrink-0" />
            <div>
              <p className="text-xl font-semibold mb-2">
                The Good News: Growth is not the enemy. Unprepared growth is the enemy.
              </p>
              <p className="text-white/80">
                When you systematically prepare—across strategy, finance, operations, people, and
                execution—you can grow profitably and sustainably.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: THE FIVE PILLARS FRAMEWORK */}
      <section id="five-pillars" className="pt-12 pb-24 bg-gradient-to-b from-white via-[#f7fafc] to-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#319795]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#969423]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#969423] uppercase mb-4 bg-[#969423]/10 px-4 py-2 rounded-full">
              <Zap className="w-3.5 h-3.5" />
              THE FRAMEWORK
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#2d3748] mb-6 font-montserrat">
              Five Pillars of Strategic <span className="text-[#319795]">Business Growth</span>
            </h2>
            <p className="text-[#4a5568] text-lg max-w-2xl mx-auto mb-8">
              A complete methodology that takes you from "Should we grow?" to "We're growing—and
              it's working."
            </p>
            
            {/* Visual pillar indicator */}
            <div className="flex justify-center items-center gap-2 md:gap-3">
              {[1, 2, 3, 4, 5].map((num, index) => (
                <div key={num} className="flex items-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#242553] to-[#319795] rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base shadow-lg relative z-10">
                    {num}
                  </div>
                  {index < 4 && (
                    <div className="hidden md:block w-6 lg:w-10 h-1 bg-gradient-to-r from-[#319795] to-[#242553] rounded-full mx-1" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-5">
            <PillarCard
              number="01"
              title="Growth Reality Check & Decision Framework"
              description="Before you chase growth, get honest. Does your business need growth right now? What problems will it actually solve—and what new problems will it create? This pillar forces the tough questions upfront."
              hint="Use our decision matrix to reach a clear GO, NOT YET, or NO-GO decision—and feel confident in it."
              icon={Compass}
              delay={0}
            />
            <PillarCard
              number="02"
              title="Growth Readiness Assessment"
              description="Evaluate your readiness across four dimensions: Financial health, Operational maturity, People & leadership capability, and Market position. Honest assessment now prevents crisis later."
              hint="Identify exactly which capabilities are ready and which need strengthening before you scale."
              icon={ClipboardCheck}
              delay={0.1}
            />
            <PillarCard
              number="03"
              title="Strategic Growth Planning"
              description="Build a real plan—not a napkin sketch. Define HOW you'll grow, WHERE you'll focus, WHEN you'll execute, and what assumptions you're betting on. Then test those assumptions before you're all-in."
              hint="Financial models, assumption validation, resource staging, and risk management—simplified for SMBs."
              icon={FileText}
              delay={0.2}
            />
            <PillarCard
              number="04"
              title="Communication & Change Management"
              description='Growth changes everything - for your team, customers, and suppliers. This pillar ensures everyone understands the "why," feels heard, and knows exactly what is expected of them.'
              hint="From kickoff workshops to weekly rituals - tools to align your team and manage the human side of change."
              icon={MessageSquare}
              delay={0.3}
            />
            <PillarCard
              number="05"
              title="Execution, Measurement & Continuous Adjustment"
              description="Plans don't execute themselves. This pillar establishes a lightweight operating rhythm (weekly, monthly, quarterly) to track progress, catch problems early, and adjust course without losing momentum."
              hint="Growth dashboard, key metrics, feedback loops, and troubleshooting playbook included."
              icon={BarChart3}
              delay={0.4}
            />
          </div>

          {/* Connecting Tagline - Enhanced */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-3 bg-[#242553] text-white px-6 py-3 rounded-full shadow-lg">
              <TrendingUp className="w-5 h-5 text-[#C8E600]" />
              <p className="text-sm md:text-base font-medium">
                Each pillar builds on the last. Together, they transform growth from risky to strategic.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: WHAT YOU'LL GET (Tools & Resources) */}
      <section id="tools" className="py-24 bg-gradient-to-br from-[#242553] via-[#2d2d6a] to-[#1a1b3d] relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#C8E600] uppercase mb-4 bg-[#C8E600]/10 px-4 py-2 rounded-full border border-[#C8E600]/20">
              <Target className="w-3.5 h-3.5" />
              INSIDE THE MODULE
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-montserrat">
              Practical Tools, <span className="text-[#969423]">Not Theory</span>
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Every concept comes with a worksheet, template, or tool you can use immediately in
              your business.
            </p>
            
            {/* Tool count badge */}
            <div className="mt-8 inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3">
              <div className="flex items-center gap-1">
                <CheckCircle className="w-5 h-5 text-[#2DD4BF]" />
                <span className="text-white font-semibold">15+ Tools</span>
              </div>
              <div className="w-px h-5 bg-white/20" />
              <div className="flex items-center gap-1">
                <FileText className="w-5 h-5 text-[#C8E600]" />
                <span className="text-white font-semibold">Templates Included</span>
              </div>
              <div className="w-px h-5 bg-white/20" />
              <div className="flex items-center gap-1">
                <Zap className="w-5 h-5 text-[#969423]" />
                <span className="text-white font-semibold">Instant Access</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <ToolCard
              title="Growth Consequences Worksheet"
              description="Map exactly what will break, bend, or benefit when you grow—before you commit."
              tag="Decision Tool"
              icon={Target}
            />
            <ToolCard
              title="Growth Readiness Scorecard"
              description="Rate your business across 4 dimensions to get a clear ready/not-ready verdict."
              tag="Assessment"
              icon={ClipboardCheck}
            />
            <ToolCard
              title="13-Week Cash Flow Projection"
              description="Model your cash reality under best-case, worst-case, and expected scenarios."
              tag="Financial Planning"
              icon={BarChart3}
            />
            <ToolCard
              title="Assumption Validation Plan"
              description="List every assumption behind your growth plan and design tests before you bet big."
              tag="Risk Management"
              icon={FileText}
            />
            <ToolCard
              title="Risk Register Template"
              description="Identify, rate, and plan responses for the risks that could derail your growth."
              tag="Risk Management"
              icon={Shield}
            />
            <ToolCard
              title="Growth Dashboard Template"
              description="Track the leading and lagging indicators that tell you if growth is actually working."
              tag="Measurement"
              icon={TrendingUp}
            />
          </motion.div>

          {/* More Tools Teaser - Enhanced */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
              <p className="text-white/80 mb-6 text-lg">
                <strong className="text-white">Plus:</strong> Team Alignment Workshop Guide • Stakeholder Communication Plan
                • Weekly/Monthly/Quarterly Operating Rhythm Agendas • Growth Troubleshooting Playbook
                • And more...
              </p>
              <Button
                onClick={() => scrollToSection('signup-form')}
                size="lg"
                className="bg-[#C8E600] hover:bg-[#a8c200] text-[#242553] font-semibold px-8 shadow-lg hover:shadow-xl transition-all"
              >
                Get Early Access to All Tools
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: PAIN POINTS & OBJECTIONS */}
      <section className="py-20 bg-gradient-to-b from-[#f7fafc] to-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-0 w-64 h-64 bg-[#c05621]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-64 h-64 bg-[#319795]/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#c05621] uppercase mb-4 bg-[#c05621]/10 px-4 py-2 rounded-full">
              <AlertTriangle className="w-3.5 h-3.5" />
              REAL TALK
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d3748] mb-4 font-montserrat">
              What's Really Keeping You Up at Night?
            </h2>
            <p className="text-[#4a5568] text-lg max-w-2xl mx-auto">
              We hear these concerns from business owners every day. Here's how this module addresses each one.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="q1" className="bg-white rounded-xl border border-gray-200 px-6 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <AccordionTrigger className="text-left text-[#2d3748] font-semibold hover:no-underline py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#319795]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <ClipboardCheck className="w-4 h-4 text-[#319795]" />
                    </div>
                    <span>"I don't know if I'm ready to grow."</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-[#4a5568] pb-5 pl-11">
                  <p className="mb-2">That uncertainty is smart—and it's exactly why you need this.</p>
                  <p className="mb-4">
                    Pillar 2 walks you through a Growth Readiness Assessment that diagnoses your
                    capacity across finance, operations, people, and market. You'll know your gaps
                    and exactly what to strengthen before you scale.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-[#319795] font-medium">
                    <CheckCircle className="w-4 h-4" />
                    <span>Uses: Growth Readiness Scorecard</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2" className="bg-white rounded-xl border border-gray-200 px-6 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <AccordionTrigger className="text-left text-[#2d3748] font-semibold hover:no-underline py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#c05621]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-[#c05621]" />
                    </div>
                    <span>"My team is already stretched. How can we add more?"</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-[#4a5568] pb-5 pl-11">
                  <p className="mb-2">
                    Real talk: if your team is at capacity now, growth will break them.
                  </p>
                  <p className="mb-4">
                    Pillar 4 (Communication & Change Management) helps you communicate the "why,"
                    get buy-in, and stage resources appropriately. Pillar 5 includes a
                    troubleshooting guide for when the team is overwhelmed—because sometimes you
                    need to slow growth to save your culture.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-[#319795] font-medium">
                    <CheckCircle className="w-4 h-4" />
                    <span>Uses: Team Alignment Workshop Guide</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3" className="bg-white rounded-xl border border-gray-200 px-6 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <AccordionTrigger className="text-left text-[#2d3748] font-semibold hover:no-underline py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#38a169]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-4 h-4 text-[#38a169]" />
                    </div>
                    <span>"I'm worried about running out of cash."</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-[#4a5568] pb-5 pl-11">
                  <p className="mb-2">You should be. Growth burns cash before it generates cash.</p>
                  <p className="mb-4">
                    Pillar 3 includes a 13-week cash flow projection template with best/worst/expected
                    scenarios. You'll know exactly when cash might get tight, and you'll have
                    contingency plans before crisis hits.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-[#319795] font-medium">
                    <CheckCircle className="w-4 h-4" />
                    <span>Uses: 13-Week Cash Flow Projection</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q4" className="bg-white rounded-xl border border-gray-200 px-6 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <AccordionTrigger className="text-left text-[#2d3748] font-semibold hover:no-underline py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#969423]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-[#969423]" />
                    </div>
                    <span>"I've tried planning before. It felt useless."</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-[#4a5568] pb-5 pl-11">
                  <p className="mb-2">
                    Most growth plans fail because they live on a spreadsheet nobody looks at again.
                  </p>
                  <p className="mb-4">
                    This module is different: it's integrated, tool-based, and tied to a lightweight
                    operating rhythm (Pillar 5). Weekly check-ins keep the plan alive and adaptable
                    to reality.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-[#319795] font-medium">
                    <CheckCircle className="w-4 h-4" />
                    <span>Uses: Growth Dashboard Template</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q5" className="bg-white rounded-xl border border-gray-200 px-6 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <AccordionTrigger className="text-left text-[#2d3748] font-semibold hover:no-underline py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#242553]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4 text-[#242553]" />
                    </div>
                    <span>"This sounds complicated. I don't have time."</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-[#4a5568] pb-5 pl-11">
                  <p className="mb-2">
                    It's designed for busy owners. Each tool takes 20-30 minutes. Each lesson is
                    5-10 minutes.
                  </p>
                  <p className="mb-4">
                    The benefit? You avoid months of chaos and costly mistakes. That's real ROI on
                    your time.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-[#319795] font-medium">
                    <CheckCircle className="w-4 h-4" />
                    <span>Time Investment: 30-60 mins/week</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: "NOT YET" IS A WIN */}
      <section className="py-16 bg-[#242553]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-[#C8E600]/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-8 h-8 text-[#C8E600]" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 font-montserrat">
              Here's Something Other Growth Programs Won't Tell You:
            </h3>
            <p className="text-white/90 text-lg mb-4 max-w-2xl">
              Sometimes the smartest growth decision is "not yet."
            </p>
            <p className="text-white/80 mb-6 max-w-2xl">
              If this module helps you realize you're not ready to grow right now—that's a win, not
              a failure. You'll know exactly what needs to change before growth makes sense. And
              you'll avoid a costly mistake that could set you back years.
            </p>
            <p className="text-white font-semibold text-lg mb-2">
              We'd rather you grow right than grow fast.
            </p>
            <p className="text-white/60 text-sm">— The BizHealth.ai Team</p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: EXPECTED OUTCOMES (Before/After) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-xs font-semibold tracking-wider text-[#969423] uppercase mb-4 block">
              THE TRANSFORMATION
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d3748] font-montserrat">
              What Changes When You Complete This Module
            </h2>
          </motion.div>

          {/* Before/After Comparison */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 mb-12"
          >
            {/* Before Column */}
            <div className="bg-[#fef2f2] rounded-xl p-6">
              <h3 className="text-lg font-semibold text-[#c53030] mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5" /> BEFORE (Unprepared Growth)
              </h3>
              <div className="space-y-3">
                {[
                  'Vague plan, gut-feel decisions',
                  'Team confused about priorities',
                  'Cash flow is a mystery',
                  'Quality slipping, customers frustrated',
                  'Owner stressed, reactive firefighting',
                  'Growth stalls or fails; team demoralized',
                ].map((item, i) => (
                  <p key={i} className="flex items-start gap-2 text-[#4a5568]">
                    <XCircle className="w-4 h-4 text-[#c53030] flex-shrink-0 mt-0.5" />
                    {item}
                  </p>
                ))}
              </div>
            </div>

            {/* After Column */}
            <div className="bg-[#f0fdf4] rounded-xl p-6">
              <h3 className="text-lg font-semibold text-[#38a169] mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> AFTER (Strategic Growth)
              </h3>
              <div className="space-y-3">
                {[
                  'Written, tested growth plan with clear milestones',
                  'Team aligned on the "why" and their role',
                  '13-week cash forecast with contingencies planned',
                  'Quality protected, customer satisfaction maintained',
                  'Owner confident, making strategic decisions',
                  'Growth happens profitably; culture survives',
                ].map((item, i) => (
                  <p key={i} className="flex items-start gap-2 text-[#4a5568]">
                    <CheckCircle className="w-4 h-4 text-[#38a169] flex-shrink-0 mt-0.5" />
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Outcomes List */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-[#f7fafc] rounded-xl p-8"
          >
            <h3 className="text-xl font-semibold text-[#2d3748] mb-6">
              After completing the five pillars, you'll have:
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Clarity',
                  desc: 'A confident decision on whether, when, and how to grow (no more second-guessing)',
                },
                {
                  title: 'Readiness',
                  desc: "Honest assessment of what's strong and what needs improvement before you scale",
                },
                {
                  title: 'Strategy',
                  desc: 'A written, assumptions-validated growth plan (not a napkin sketch)',
                },
                {
                  title: 'Alignment',
                  desc: 'Your team understands the plan and is equipped to execute',
                },
                {
                  title: 'Rhythm',
                  desc: 'A lightweight weekly/monthly/quarterly cadence to track progress and adjust',
                },
                {
                  title: 'Resilience',
                  desc: "Built-in flexibility to pivot if key assumptions don't hold",
                },
              ].map((outcome, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#38a169] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#2d3748]">{outcome.title}</span>
                    <span className="text-[#4a5568]"> — {outcome.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-[#4a5568] mt-6 italic">
              This isn't a guarantee of effortless growth. But it drastically reduces the odds of
              growth becoming your business's biggest problem.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 8: SEGMENT PATHWAYS */}
      <section className="py-20 bg-[#f7fafc]">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-xs font-semibold tracking-wider text-[#969423] uppercase mb-4 block">
              TAILORED TO YOU
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d3748] mb-4 font-montserrat">
              BizGrowth for Your Stage
            </h2>
            <p className="text-[#4a5568] text-lg max-w-2xl mx-auto">
              Whether you're just starting out or managing a complex organization, we meet you where
              you are.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            <StageCard
              badge="0-3 Years • $100K-$500K"
              title="Launch Stage"
              description="You're figuring out what works. Before you scale, get honest: should you pursue growth at all right now? This path focuses on Pillars 1 & 2—deciding and assessing."
              tools="Growth Consequences Worksheet, Why Grow Decision Matrix"
              icon={Rocket}
            />
            <StageCard
              badge="1-5 Years • $500K-$5M • 5-25 people"
              title="Growth Stage"
              description="You've proven the model. Now it's time to scale strategically. This path walks you through all five pillars with full tools, templates, and operating rhythms."
              tools="All five pillar tools, Team Alignment Workshop Guide"
              icon={TrendingUp}
              highlighted
            />
            <StageCard
              badge="5+ Years • $5M-$25M+ • Complex org"
              title="Scaling Stage"
              description="You're managing complexity. Growth at this scale requires org design, leadership transition, and advanced change management. This path adds depth while maintaining simplicity."
              tools="Advanced change management, Executive alignment frameworks"
              icon={Building2}
            />
          </motion.div>

          {/* HR Module Card */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12"
          >
            <Link
              to="/bizgrowth/human-resources-programs"
              className="block bg-gradient-to-br from-[#242553] via-[#2d2d6a] to-[#3d3d7a] rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 bg-[#C8E600]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-8 h-8 text-[#C8E600]" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <span className="inline-flex items-center gap-2 bg-[#C8E600]/10 text-[#C8E600] px-3 py-1 rounded-full text-xs font-semibold mb-3">
                    <TrendingUp className="w-3 h-3" /> NEW HR MODULE
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2 font-montserrat group-hover:text-[#C8E600] transition-colors">
                    Human Resources Programs
                  </h3>
                  <p className="text-white/80 mb-4">
                    Master the 10 pillars of HR for growing businesses. From hiring right to building culture that retains top talent.
                  </p>
                  <span className="inline-flex items-center gap-2 text-[#C8E600] font-semibold group-hover:gap-3 transition-all">
                    Explore HR Module <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.p
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center text-[#4a5568] mt-8"
          >
            Your stage doesn't lock you in—you can explore all paths. But we've customized the entry
            point, examples, and tools to match where you are.
          </motion.p>
        </div>
      </section>

      {/* SECTION 9: SOCIAL PROOF & CREDIBILITY */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-xs font-semibold tracking-wider text-[#319795] uppercase mb-4 block">
              WHY BIZHEALTH.AI
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d3748] mb-8 font-montserrat">
              Built by People Who've Actually Grown Businesses
            </h2>

            {/* Credibility Statements */}
            <div className="grid md:grid-cols-2 gap-6 text-left mb-12">
              {[
                'Built on 50+ years of combined real-world business expertise—from founders to Fortune 500 executives',
                'Evidence-based framework grounded in proven methodologies (McKinsey, HBR, SBA research)',
                'Plain-language design—every concept tested for clarity with real SMB owners',
                'Created by business owners for business owners—no ivory tower theory',
              ].map((statement, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#38a169] flex-shrink-0 mt-0.5" />
                  <p className="text-[#4a5568]">{statement}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Statistics Bar */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-[#242553] rounded-xl p-8"
          >
            <div className="grid grid-cols-3 gap-8">
              <StatCounter value="2,500+" label="Business owners in our community" />
              <StatCounter value="30+" label="Industries represented" />
              <StatCounter value="50+" label="Years combined expertise" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 10: PRIMARY CTA — EARLY ACCESS SIGN-UP */}
      <section
        id="signup-form"
        className="py-20 bg-gradient-to-br from-[#242553] via-[#2d2d6a] to-[#3d3d7a]"
      >
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl"
          >
            {!isSubmitted ? (
              <>
                <div className="text-center mb-8">
                  <span className="inline-flex items-center gap-2 bg-[#FFD700]/10 text-[#c05621] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    🚀 LAUNCHING Q1 2026
                  </span>
                  <h2 className="text-3xl font-bold text-[#2d3748] mb-4 font-montserrat">
                    Get Early Access
                  </h2>
                  <p className="text-[#4a5568] mb-4">
                    The Business Growth module is currently in development. Join the early access
                    list to:
                  </p>
                  <div className="text-left inline-block">
                    {[
                      'Be first to access the module when it launches',
                      'Get a free Growth Readiness Assessment preview',
                      'Receive exclusive tools and insights before public release',
                      'Shape the final module with your feedback',
                    ].map((benefit, i) => (
                      <p key={i} className="flex items-center gap-2 text-[#4a5568] mb-2">
                        <CheckCircle className="w-4 h-4 text-[#38a169]" />
                        {benefit}
                      </p>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="firstName" className="text-[#2d3748]">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="Your first name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-[#2d3748]">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessStage" className="text-[#2d3748]">
                      Business Stage *
                    </Label>
                    <Select
                      value={formData.businessStage}
                      onValueChange={(value) => setFormData({ ...formData, businessStage: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select your business stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="launch">Launch (0-3 yrs, under $1M)</SelectItem>
                        <SelectItem value="growth">Growth ($1M-$5M)</SelectItem>
                        <SelectItem value="scaling">Scaling ($5M+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="challenge" className="text-[#2d3748]">
                      Biggest Challenge (Optional)
                    </Label>
                    <Textarea
                      id="challenge"
                      placeholder="What's the #1 thing holding back your growth?"
                      value={formData.challenge}
                      onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#c05621] hover:bg-[#a04a1c] text-white py-6 text-lg font-semibold"
                  >
                    {isSubmitting ? 'Submitting...' : 'Join Early Access'}
                  </Button>
                </form>

                <p className="text-center text-sm text-[#4a5568] mt-4 flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />
                  We respect your inbox. Expect 1-2 emails per month, max. Unsubscribe anytime.
                </p>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#38a169]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-[#38a169]" />
                </div>
                <h3 className="text-2xl font-bold text-[#2d3748] mb-4">You're on the list!</h3>
                <p className="text-[#4a5568] mb-6">
                  Check your inbox for a confirmation email. We'll notify you the moment early
                  access opens.
                </p>
                <p className="text-[#4a5568] mb-4">
                  In the meantime, follow us on LinkedIn for weekly growth insights.
                </p>
                <a
                  href="https://linkedin.com/company/bizhealth-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#0077b5] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#006396] transition-colors"
                >
                  Follow on LinkedIn <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* SECTION 11: FAQ - Enhanced */}
      <section id="faq" className="py-24 bg-gradient-to-b from-[#f7fafc] to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#319795]/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-[#969423]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#319795] uppercase mb-4 bg-[#319795]/10 px-4 py-2 rounded-full">
              <MessageSquare className="w-3.5 h-3.5" />
              FAQ
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#2d3748] font-montserrat mb-4">
              Questions? <span className="text-[#969423]">We've Got Answers.</span>
            </h2>
            <p className="text-[#4a5568] text-lg max-w-xl mx-auto">
              Everything you need to know about the Business Growth module
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Accordion type="single" collapsible className="space-y-4">
              <motion.div variants={fadeUpVariant}>
                <AccordionItem value="faq1" className="bg-white rounded-xl border-2 border-gray-100 px-6 shadow-sm hover:shadow-md hover:border-[#319795]/30 transition-all duration-300">
                  <AccordionTrigger className="text-left text-[#2d3748] font-semibold hover:no-underline py-5 [&[data-state=open]>svg]:text-[#319795]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#319795]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Zap className="w-4 h-4 text-[#319795]" />
                      </div>
                      Is this another "quick growth hack" course?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-[#4a5568] pb-5 pl-11">
                    No—this is the opposite. It's designed to help you avoid destructive growth. If
                    you're looking for magic formulas or "10X in 10 days" promises, this isn't for
                    you. If you want sustainable, profitable growth backed by strategy and systems,
                    you're in the right place.
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
              
              <motion.div variants={fadeUpVariant}>
                <AccordionItem value="faq2" className="bg-white rounded-xl border-2 border-gray-100 px-6 shadow-sm hover:shadow-md hover:border-[#319795]/30 transition-all duration-300">
                  <AccordionTrigger className="text-left text-[#2d3748] font-semibold hover:no-underline py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#969423]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-4 h-4 text-[#969423]" />
                      </div>
                      How much time does this take?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-[#4a5568] pb-5 pl-11">
                    You can move through it at your pace. Most owners complete the core framework in
                    4-6 weeks (30-60 minutes per week). Each tool takes 20-30 minutes. It's designed
                    to fit a busy owner's schedule.
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
              
              <motion.div variants={fadeUpVariant}>
                <AccordionItem value="faq3" className="bg-white rounded-xl border-2 border-gray-100 px-6 shadow-sm hover:shadow-md hover:border-[#319795]/30 transition-all duration-300">
                  <AccordionTrigger className="text-left text-[#2d3748] font-semibold hover:no-underline py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#38a169]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-[#38a169]" />
                      </div>
                      What if I discover I shouldn't grow right now?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-[#4a5568] pb-5 pl-11">
                    That's a win. Knowing you're "not yet" ready is better than failing at growth.
                    The module shows you exactly what to improve before you revisit scaling—and
                    you'll avoid a costly mistake.
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
              
              <motion.div variants={fadeUpVariant}>
                <AccordionItem value="faq4" className="bg-white rounded-xl border-2 border-gray-100 px-6 shadow-sm hover:shadow-md hover:border-[#319795]/30 transition-all duration-300">
                  <AccordionTrigger className="text-left text-[#2d3748] font-semibold hover:no-underline py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#242553]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-4 h-4 text-[#242553]" />
                      </div>
                      Is this tailored to my industry?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-[#4a5568] pb-5 pl-11">
                    The framework is universal, but examples span multiple industries (services,
                    e-commerce, manufacturing, trades, healthcare, and more). You'll see stories from
                    businesses like yours.
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
              
              <motion.div variants={fadeUpVariant}>
                <AccordionItem value="faq5" className="bg-white rounded-xl border-2 border-gray-100 px-6 shadow-sm hover:shadow-md hover:border-[#319795]/30 transition-all duration-300">
                  <AccordionTrigger className="text-left text-[#2d3748] font-semibold hover:no-underline py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#319795]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Users className="w-4 h-4 text-[#319795]" />
                      </div>
                      I'm a solo business owner. Is this relevant for me?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-[#4a5568] pb-5 pl-11">
                    Yes. We've designed pathways for different stages, including Launch
                    (solo/early-stage). The principles of prepared growth apply whether you're hiring
                    your first employee or your fiftieth.
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
              
              <motion.div variants={fadeUpVariant}>
                <AccordionItem value="faq6" className="bg-white rounded-xl border-2 border-gray-100 px-6 shadow-sm hover:shadow-md hover:border-[#319795]/30 transition-all duration-300">
                  <AccordionTrigger className="text-left text-[#2d3748] font-semibold hover:no-underline py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#c05621]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Rocket className="w-4 h-4 text-[#c05621]" />
                      </div>
                      What happens after I finish the module?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-[#4a5568] pb-5 pl-11">
                    You'll have ongoing access to all tools, templates, and resources. We're
                    exploring community features, office hours, and follow-up modules for 2026. Join
                    early access to be notified.
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
              
              <motion.div variants={fadeUpVariant}>
                <AccordionItem value="faq7" className="bg-white rounded-xl border-2 border-gray-100 px-6 shadow-sm hover:shadow-md hover:border-[#319795]/30 transition-all duration-300">
                  <AccordionTrigger className="text-left text-[#2d3748] font-semibold hover:no-underline py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#969423]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-4 h-4 text-[#969423]" />
                      </div>
                      When does it launch?
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-[#4a5568] pb-5 pl-11">
                    Q1 2026. Early access members get first notification and priority access.
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            </Accordion>
          </motion.div>
          
          {/* CTA after FAQ */}
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-[#4a5568] mb-4">Still have questions?</p>
            <Button
              onClick={() => scrollToSection('signup-form')}
              variant="outline"
              className="border-2 border-[#319795] text-[#319795] hover:bg-[#319795] hover:text-white font-semibold px-8"
            >
              Get in Touch
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      <GradientDivider variant="green-gold" />
      <GlobalFooter />

      {/* Mobile Sticky CTA */}
      {showMobileCTA && !mobileCTADismissed && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50 md:hidden"
        >
          <div className="flex items-center gap-2">
            <Button
              onClick={() => scrollToSection('signup-form')}
              className="flex-1 bg-[#c05621] hover:bg-[#a04a1c] text-white py-3 font-semibold"
            >
              Join Early Access
            </Button>
            <button
              onClick={() => setMobileCTADismissed(true)}
              className="p-2 text-gray-400 hover:text-gray-600"
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BusinessGrowthStrategies;
