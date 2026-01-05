import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, Download, Clock, Calendar, Shield, Star, Users, 
  AlertTriangle, DollarSign, Search, BarChart3, TrendingUp, Bell,
  Smile, HelpCircle, FileText, Calculator, BookOpen, X, Lock, Mail,
  ArrowRight, Check, ChevronDown, Target, Radar, Heart, Flag, ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from '@/components/GlobalFooter';
import PromotionalBanner from '@/components/PromotionalBanner';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import { toast } from 'sonner';

// Brand colors from spec
const colors = {
  bizBlue: '#242553',
  bizBlueDark: '#1a1d3d',
  bizGrey: '#7C7C7C',
  bizYellow: '#E6B800',
  bizYellowHover: '#F5C800',
  bizTeal: '#008080',
  bizGreen: '#969423',
  successGreen: '#22C55E',
  errorRed: '#EF4444',
  lightSection: '#F8F9FC',
  altSection: '#F5F7FA',
  warmHighlight: '#FFFBEB',
};

// FAQ data for structured data
const faqData = [
  {
    question: "What exactly is the feast-or-famine cycle?",
    answer: "The feast-or-famine cycle (also called peaks and valleys) is when your business swings between great months with strong revenue and tough months with cash flow struggles. This volatility makes it impossible to plan, hire confidently, or invest in growth. It's incredibly common—and fixable."
  },
  {
    question: "How long does it take to implement this framework?",
    answer: "Most business owners complete the 7-step framework in 6-8 weeks, working at their own pace. Each step takes 2-5 hours to implement. Many see measurable improvements within 30 days—often sooner for the diagnostic and visibility steps."
  },
  {
    question: "Is this playbook really free? What's the catch?",
    answer: "Yes, it's 100% free. We built this resource because we believe every business owner deserves access to frameworks that were previously only available through expensive consultants. We'll send 1-2 growth tips per month via email, but you can unsubscribe anytime with one click."
  },
  {
    question: "What makes this different from other business advice?",
    answer: "Three things: (1) It's written in plain English—no MBA jargon. (2) Every step includes worksheets and templates you can use immediately. (3) It comes from 50+ years of combined experience from people who've actually built and scaled businesses, not just consulted on them."
  },
  {
    question: "Will this work for my specific industry?",
    answer: "The framework applies across industries—professional services, retail, manufacturing, tech, healthcare, and more. The diagnostic worksheet helps you identify which steps matter most for YOUR specific situation. The principles are universal; the application is customized."
  }
];

const BreakingPeaksValleysCycle = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStickyVisible, setStickyVisible] = useState(false);
  const [isStickyDismissed, setStickyDismissed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    businessStage: ''
  });
  const [formErrors, setFormErrors] = useState<{firstName?: string; email?: string}>({});
  const heroRef = useRef<HTMLDivElement>(null);

  // Handle scroll for sticky bar
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current && !isStickyDismissed) {
        const heroBottom = heroRef.current.offsetTop + heroRef.current.offsetHeight;
        setStickyVisible(window.scrollY > heroBottom);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isStickyDismissed]);

  // Hide sticky when modal is open
  useEffect(() => {
    if (isModalOpen) {
      setStickyVisible(false);
    }
  }, [isModalOpen]);

  const validateForm = () => {
    const errors: {firstName?: string; email?: string} = {};
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Trigger download
    const link = document.createElement('a');
    link.href = '/downloads/Breaking-Peaks-Valleys-Cycle-Playbook-BizHealth.pdf?v=1';
    link.download = 'Breaking-Peaks-Valleys-Cycle-Playbook-BizHealth.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(`Thanks, ${formData.firstName}! Your playbook is downloading now.`);
    setIsSubmitting(false);
    setIsModalOpen(false);
    setStickyDismissed(true);
    setFormData({ firstName: '', email: '', businessStage: '' });
  };

  const openModal = () => setIsModalOpen(true);

  return (
    <>
      <SEO
        title="Break the Feast-or-Famine Cycle | Free 7-Step Playbook | BizGrowth Academy"
        description="Download the free 7-step playbook to break the revenue rollercoaster destroying your small business. Proven framework for stable, predictable cash flow. Join 2,500+ business owners."
        keywords="feast or famine cycle, revenue stability, small business growth, cash flow management, peaks and valleys business, revenue rollercoaster, business growth strategies, business health assessment"
        canonical="https://bizhealth.ai/bizgrowth/financials/breaking-peaks-valleys-cycle"
        ogImage="https://bizhealth.ai/images/peaks-valleys-playbook-og.jpg"
      />
      
      <StructuredData
        type="course"
        name="Breaking the Peaks & Valleys Cycle: 7-Step Playbook"
        description="A free 7-step playbook for building stable, predictable revenue in your small business."
        provider="BizGrowth Academy by BizHealth.ai"
        providerUrl="https://bizhealth.ai/bizgrowth"
        url="https://bizhealth.ai/bizgrowth/financials/breaking-peaks-valleys-cycle"
        courseMode="online"
        isAccessibleForFree={true}
        educationalLevel="Professional"
        learningResourceType="Playbook"
      />
      
      <StructuredData
        type="faq"
        questions={faqData}
      />

      {/* Skip Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#E6B800] focus:text-[#242553] focus:rounded-md focus:outline-none"
      >
        Skip to main content
      </a>

      <PromotionalBanner />
      <GlobalNavigation />
      
      <main id="main-content">
        {/* SECTION 1: HERO */}
        <section 
          ref={heroRef}
          className="relative overflow-hidden pt-36 md:pt-40 lg:pt-44 pb-10 md:pb-14 lg:pb-16"
          style={{ background: `linear-gradient(135deg, ${colors.bizBlue} 0%, ${colors.bizBlueDark} 100%)` }}
          aria-labelledby="hero-heading"
        >
          {/* Decorative Elements */}
          <div 
            className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-8 animate-pulse"
            style={{ 
              background: `radial-gradient(circle, ${colors.bizYellow}15 0%, transparent 70%)`,
              animationDuration: '8s'
            }}
          />
          <div 
            className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-6"
            style={{ 
              background: `radial-gradient(circle, ${colors.bizTeal}10 0%, transparent 70%)`,
              animation: 'pulse 10s ease-in-out infinite reverse'
            }}
          />

          <div className="container mx-auto px-4 max-w-[900px] relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Badge */}
              <div 
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 mb-6 text-xs font-bold uppercase tracking-wider"
                style={{ 
                  backgroundColor: colors.bizBlue,
                  borderColor: colors.bizYellow,
                  color: colors.bizYellow
                }}
              >
                <TrendingUp className="w-4 h-4" style={{ color: '#8CBF2F' }} aria-hidden="true" />
                <span>BizGrowth Academy</span>
              </div>

              {/* Headline */}
              <h1 
                id="hero-heading"
                className="text-3xl md:text-4xl lg:text-5xl xl:text-[56px] font-extrabold leading-tight mb-6 font-['Montserrat']"
                style={{ color: '#FFFFFF' }}
              >
                Stop the <span style={{ color: '#FFFFFF' }}>Revenue Rollercoaster</span>{' '}
                <span style={{ color: '#969423' }}>That's Destroying Your Business</span>
              </h1>

              {/* Subtitle */}
              <p 
                className="text-white/90 text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-8 font-['Open_Sans']"
                style={{ lineHeight: 1.7 }}
              >
                Get the free 7-step framework that 1,000+ business owners use to break the feast-or-famine cycle and build stable, predictable cash flow.
              </p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
              >
                <Button
                  onClick={openModal}
                  className="text-lg px-8 py-6 font-semibold transition-all"
                  style={{
                    backgroundColor: colors.bizYellow,
                    color: colors.bizBlue,
                    boxShadow: `0 0 30px ${colors.bizYellow}50`
                  }}
                  data-cta-type="primary"
                  data-hub="BizGrowth"
                >
                  <Download className="w-5 h-5 mr-2" aria-hidden="true" />
                  Get My Free Playbook
                </Button>
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('framework')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-5 font-semibold transition-all duration-300 hover:bg-white hover:text-[#242553] hover:border-white"
                  style={{
                    backgroundColor: 'transparent',
                    borderColor: colors.bizYellow,
                    color: colors.bizYellow
                  }}
                >
                  See the 7 Steps
                </Button>
              </motion.div>

              {/* Meta Information */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-white/75"
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" style={{ color: colors.bizYellow }} aria-hidden="true" />
                  <span>5-min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" style={{ color: colors.bizYellow }} aria-hidden="true" />
                  <span>6-8 week implementation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" style={{ color: colors.bizYellow }} aria-hidden="true" />
                  <span>No credit card required</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: SOCIAL PROOF BAR */}
        <section 
          className="py-8 border-b"
          style={{ backgroundColor: colors.altSection }}
          aria-labelledby="social-proof-heading"
        >
          <h2 id="social-proof-heading" className="sr-only">Social Proof</h2>
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
              {/* Stats */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-[15px]">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5" style={{ color: colors.bizYellow }} aria-hidden="true" />
                  <span style={{ color: colors.bizGrey }}>
                    <strong style={{ color: colors.bizBlue }}>4.9/5</strong> rating from business owners
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="w-5 h-5" style={{ color: colors.bizYellow }} aria-hidden="true" />
                  <span style={{ color: colors.bizGrey }}>
                    <strong style={{ color: colors.bizBlue }}>1,000+</strong> downloads
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" style={{ color: colors.bizYellow }} aria-hidden="true" />
                  <span style={{ color: colors.bizGrey }}>
                    <strong style={{ color: colors.bizBlue }}>30 days</strong> to first results
                  </span>
                </div>
              </div>

              {/* Testimonial */}
              <div 
                className="bg-white p-4 rounded-lg shadow-sm flex items-start gap-3 max-w-md"
                style={{ borderLeft: `4px solid ${colors.bizYellow}` }}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0"
                  style={{ backgroundColor: colors.bizBlue }}
                  aria-hidden="true"
                >
                  MR
                </div>
                <div>
                  <p className="text-sm italic" style={{ color: colors.bizGrey }}>
                    "Went from losing sleep over payroll to 3 months of predictable cash flow. This framework works."
                  </p>
                  <p className="text-xs mt-1 font-medium" style={{ color: colors.bizBlue }}>
                    — Maria R., Commercial Cleaning ($1.2M)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: WHO THIS IS FOR */}
        <section className="py-16 md:py-20 bg-white" aria-labelledby="who-for-heading">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 id="who-for-heading" className="sr-only">Who This Playbook Is For</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* This is for you */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.warmHighlight} 0%, #FFF9E6 100%)`,
                  border: `1px solid ${colors.bizYellow}30`
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${colors.successGreen}20` }}
                  >
                    <Check className="w-5 h-5" style={{ color: colors.successGreen }} aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold font-['Montserrat']" style={{ color: colors.bizBlue }}>
                    This is for you if...
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Your revenue swings 20%+ between good and bad months",
                    "You lose sleep over payroll or cash flow",
                    "A few big customers drive most of your revenue",
                    "You can't see what's coming next month or quarter",
                    "You're willing to invest 2-5 hours per week for 6-8 weeks"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[15px]" style={{ color: colors.bizGrey }}>
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.successGreen }} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* This is NOT for you */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl"
                style={{ 
                  backgroundColor: colors.altSection,
                  border: `1px solid ${colors.bizGrey}30`
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${colors.errorRed}20` }}
                  >
                    <X className="w-5 h-5" style={{ color: colors.errorRed }} aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold font-['Montserrat']" style={{ color: colors.bizBlue }}>
                    This is NOT for you if...
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Your revenue is already predictable and stable",
                    "You're just starting out with zero customers",
                    "You're looking for a get-rich-quick scheme",
                    "You want someone else to do the work for you"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[15px]" style={{ color: colors.bizGrey }}>
                      <div 
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: `${colors.errorRed}30` }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.errorRed }} />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 4: PAIN POINTS */}
        <section 
          className="py-16 md:py-20"
          style={{ backgroundColor: colors.altSection }}
          aria-labelledby="pain-points-heading"
        >
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 
                id="pain-points-heading"
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 font-['Montserrat']"
                style={{ color: colors.bizBlue }}
              >
                Does This Sound Familiar?
              </h2>
              <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: colors.bizGrey }}>
                The feast-or-famine cycle creates a pattern that's exhausting—and expensive.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {[
                { icon: DollarSign, title: "Cash Flow Anxiety", desc: "Great months make you feel flush—then tight months make you stress about payroll. 70% of business owners report cash flow challenges." },
                { icon: Users, title: "The Hiring-Firing Cycle", desc: "You hire during peaks, then freeze or cut during valleys. Your best people leave. Morale suffers. Knowledge walks out the door." },
                { icon: AlertTriangle, title: "Customer Concentration Risk", desc: "If your top customer leaves, your whole business is at risk. One departure shouldn't threaten your livelihood." },
                { icon: Clock, title: "Flying Blind", desc: "You can't see what's coming next month, let alone next quarter. Every decision feels like a gamble." },
                { icon: Flag, title: "Survival Mode Strategy", desc: "You can't invest in growth when you're managing crisis. New markets, new services, better operations—all on hold." },
                { icon: Heart, title: "Business Stops Being Fun", desc: "You started this to build something meaningful. Now it feels like a stress machine that owns you instead." }
              ].map((pain, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg"
                  style={{ borderLeft: `4px solid ${colors.bizYellow}` }}
                >
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${colors.bizYellow}15` }}
                  >
                    <pain.icon className="w-6 h-6" style={{ color: colors.bizYellow }} aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 font-['Montserrat']" style={{ color: colors.bizBlue }}>
                    {pain.title}
                  </h3>
                  <p className="text-sm" style={{ color: colors.bizGrey, lineHeight: 1.7 }}>
                    {pain.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Diagnostic CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl text-center max-w-2xl mx-auto"
              style={{ backgroundColor: colors.warmHighlight }}
            >
              <p className="text-[15px] mb-4" style={{ color: colors.bizBlue }}>
                Not sure which pain point is hurting you most? The playbook includes a self-assessment to diagnose your specific cycle drivers.
              </p>
              <Button
                onClick={openModal}
                style={{ backgroundColor: colors.bizBlue }}
                className="text-white hover:opacity-90"
              >
                Get the Diagnostic Tool
              </Button>
            </motion.div>
          </div>
        </section>

        {/* SECTION 5: 7-STEP FRAMEWORK */}
        <section 
          id="framework"
          className="py-16 md:py-20 bg-white scroll-mt-20"
          aria-labelledby="framework-heading"
        >
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 
                id="framework-heading"
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 font-['Montserrat']"
                style={{ color: colors.bizBlue }}
              >
                The 7-Step Framework to Break the Cycle
              </h2>
              <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: colors.bizGrey }}>
                A proven system used by thousands of business owners. No consultants required.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[
                { num: 1, icon: Search, title: "Diagnose Your Cycle", desc: "Run a self-assessment to identify exactly what's causing YOUR peaks and valleys—customer concentration, pipeline blindness, fixed costs, or churn.", isStart: true },
                { num: 2, icon: Users, title: "Diversify Customers", desc: "Stop depending on a few big customers. Build a system to spread revenue across 50+ customers so one loss doesn't threaten survival." },
                { num: 3, icon: Radar, title: "Build Pipeline Visibility", desc: "Create a simple system to see 3 months ahead. Know what's coming before it arrives so you can plan instead of react.", link: { text: "Pipeline Tracker Tool", url: "/biztools/toolbox" } },
                { num: 4, icon: BarChart3, title: "Flex Your Costs", desc: "Convert fixed costs to variable. Lower your monthly must-pays so your business can survive valleys without panic.", link: { text: "13-Week Cash Flow Tracker", url: "/biztools/toolbox/cash-flow-tracker" } },
                { num: 5, icon: Star, title: "Improve Retention & Pricing", desc: "Keep customers longer and charge what you're worth. Small improvements here compound dramatically over time.", link: { text: "Profit Per Sale Calculator", url: "/biztools/toolbox/free-pricing-net-profit-calculator" } },
                { num: 6, icon: Calendar, title: "Install Planning Discipline", desc: "Build a quarterly planning rhythm that anticipates problems instead of reacting to them. Proactive beats reactive every time." },
                { num: 7, icon: TrendingUp, title: "Plan for Real Growth", desc: "With stability as your foundation, invest in growth from a position of strength—not desperation. Now the fun begins." }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(36, 37, 83, 0.12)' }}
                  className={`relative p-6 rounded-xl transition-all duration-300 ${
                    step.isStart ? 'bg-gradient-to-br from-[#FFFBEB] to-[#FFF9E6]' : ''
                  }`}
                  style={{ 
                    backgroundColor: step.isStart ? undefined : colors.altSection,
                    border: step.isStart ? `2px solid ${colors.bizYellow}` : 'none'
                  }}
                >
                  {/* Background number */}
                  <span 
                    className="absolute top-4 right-4 text-[100px] font-bold leading-none pointer-events-none"
                    style={{ color: colors.bizBlue, opacity: 0.03 }}
                    aria-hidden="true"
                  >
                    {step.num}
                  </span>

                  {/* START HERE badge */}
                  {step.isStart && (
                    <span 
                      className="absolute top-4 right-4 px-2 py-1 text-xs font-semibold rounded-full"
                      style={{ backgroundColor: colors.bizYellow, color: colors.bizBlue }}
                    >
                      START HERE
                    </span>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ backgroundColor: colors.bizYellow, color: colors.bizBlue }}
                    >
                      {step.num}
                    </div>
                    <step.icon className="w-5 h-5" style={{ color: colors.bizTeal }} aria-hidden="true" />
                  </div>

                  <h3 className="text-lg font-semibold mb-2 font-['Montserrat']" style={{ color: colors.bizBlue }}>
                    {step.title}
                  </h3>
                  <p className="text-sm mb-3" style={{ color: colors.bizGrey, lineHeight: 1.7 }}>
                    {step.desc}
                  </p>
                  
                  {step.link && (
                    <a 
                      href={step.link.url}
                      className="text-sm font-medium hover:underline flex items-center gap-1"
                      style={{ color: colors.bizTeal }}
                    >
                      Related: {step.link.text}
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: VALUE OUTCOMES */}
        <section 
          className="py-16 md:py-20"
          style={{ backgroundColor: colors.altSection }}
          aria-labelledby="outcomes-heading"
        >
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <h2 
                id="outcomes-heading"
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 font-['Montserrat']"
                style={{ color: colors.bizBlue }}
              >
                What You'll Gain
              </h2>
              <p className="text-base md:text-lg" style={{ color: colors.bizGrey }}>
                Breaking the cycle gives you back your business—and your life.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: BarChart3, title: "Revenue Stability", desc: "Flatten volatility from 30%+ down to under 15%. Predict cash flow with confidence." },
                { icon: Users, title: "Team Stability", desc: "Stop the hire-fire cycle. Build an experienced, loyal team that stays." },
                { icon: Bell, title: "Peace of Mind", desc: "Sleep at night knowing what's coming. Stress drops dramatically." },
                { icon: TrendingUp, title: "Growth Capacity", desc: "Finally invest in strategy instead of survival. Build the future you imagined." },
                { icon: DollarSign, title: "Higher Valuation", desc: "Stable businesses are worth more. Better for selling, borrowing, or just enjoying." },
                { icon: Smile, title: "Joy Returns", desc: "Actually enjoy running your business again. Remember why you started." }
              ].map((outcome, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: colors.bizBlue }}
                  >
                    <outcome.icon className="w-6 h-6" style={{ color: colors.bizYellow }} aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold mb-2 font-['Montserrat']" style={{ color: colors.bizBlue }}>
                    {outcome.title}
                  </h3>
                  <p className="text-sm" style={{ color: colors.bizGrey }}>
                    {outcome.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: PRIMARY DOWNLOAD CTA */}
        <section 
          className="relative py-16 md:py-24 overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${colors.bizBlue} 0%, ${colors.bizBlueDark} 100%)` }}
          aria-labelledby="download-cta-heading"
        >
          {/* Decorative gradient */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
            style={{ background: `radial-gradient(circle, ${colors.bizYellow} 0%, transparent 70%)` }}
            aria-hidden="true"
          />

          <div className="container mx-auto px-4 max-w-[800px] relative z-10">
            <div className="text-center mb-10">
              <h2 
                id="download-cta-heading"
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white font-['Montserrat']"
              >
                Get Your Free Playbook Now
              </h2>
              <p className="text-white/90 text-base md:text-lg">
                The complete 7-step framework with worksheets, templates, and real examples.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              {[
                "7-step diagnostic framework",
                "Actionable worksheets",
                "Pipeline tracking templates",
                "Real business examples",
                "90-day action plans",
                "Cost reduction strategies"
              ].map((feature, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg"
                  style={{ 
                    backgroundColor: `${colors.bizYellow}15`,
                    borderLeft: `3px solid ${colors.bizYellow}`
                  }}
                >
                  <Check className="w-4 h-4 flex-shrink-0" style={{ color: colors.bizYellow }} aria-hidden="true" />
                  <span className="text-white text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-8 rounded-2xl"
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: `1px solid ${colors.bizYellow}50`,
                boxShadow: `0 0 40px ${colors.bizYellow}20`
              }}
            >
              <Button
                onClick={openModal}
                size="lg"
                className="text-lg px-10 py-7 font-semibold mb-4"
                style={{
                  backgroundColor: colors.bizYellow,
                  color: colors.bizBlue,
                  boxShadow: `0 0 30px ${colors.bizYellow}50`
                }}
              >
                <Download className="w-5 h-5 mr-2" aria-hidden="true" />
                Get My Free Playbook
              </Button>
              <p className="text-white/70 text-sm max-w-md mx-auto">
                Instant download. We'll send occasional growth tips—unsubscribe anytime.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 8: FAQ */}
        <section className="py-16 md:py-20 bg-white" aria-labelledby="faq-heading">
          <div className="container mx-auto px-4 max-w-[800px]">
            <h2 
              id="faq-heading"
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-10 text-center font-['Montserrat']"
              style={{ color: colors.bizBlue }}
            >
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {faqData.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="border-b pb-6"
                  style={{ borderColor: `${colors.bizGrey}20` }}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <HelpCircle className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: colors.bizGreen }} aria-hidden="true" />
                    <h3 className="text-lg font-semibold font-['Montserrat']" style={{ color: colors.bizBlue }}>
                      {faq.question}
                    </h3>
                  </div>
                  <p className="text-[15px] pl-8" style={{ color: colors.bizGrey, lineHeight: 1.7 }}>
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9: ASSESSMENT CTA */}
        <section 
          className="py-12 md:py-16"
          style={{ backgroundColor: colors.altSection }}
          aria-labelledby="assessment-cta-heading"
        >
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md flex flex-col md:flex-row items-center gap-6">
              <div 
                className="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${colors.bizBlue} 0%, ${colors.bizBlueDark} 100%)` }}
              >
                <img src="/favicon.ico" alt="BizHealth.ai" className="w-10 h-10" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 
                  id="assessment-cta-heading"
                  className="text-xl md:text-2xl font-bold mb-2 font-['Montserrat']"
                  style={{ color: colors.bizBlue }}
                >
                  Want a Complete Picture of Your Business Health?
                </h2>
                <p className="text-[15px] mb-4" style={{ color: colors.bizGrey }}>
                  The playbook's self-assessment is a great start. If you want comprehensive insights across all 12 dimensions of business health—Strategy, Financials, Sales, Marketing, Operations, HR, Leadership, Risk, Technology, Customer Experience, Growth Readiness, and Sustainability—the BizHealth Assessment provides a personalized diagnostic with actionable recommendations.
                </p>
                <div className="flex justify-center md:justify-start">
                  <Button asChild style={{ backgroundColor: colors.bizBlue }} className="text-white">
                    <a href="/how-it-works">
                      Take the full Business Health Assessment
                      <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 10: RELATED RESOURCES */}
        <section 
          className="py-16 md:py-20 bg-white border-t"
          style={{ borderColor: `${colors.bizGrey}20` }}
          aria-labelledby="related-resources-heading"
        >
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-10">
              <h2 
                id="related-resources-heading"
                className="text-2xl md:text-3xl font-bold mb-2 font-['Montserrat']"
                style={{ color: colors.bizBlue }}
              >
                Related Resources from BizGrowth Academy
              </h2>
              <p style={{ color: colors.bizGrey }}>
                Continue building your business toolkit with these free resources.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Calculator, title: "13-Week Cash Flow Tracker", desc: "See exactly where your cash is going and predict shortfalls before they happen.", link: "/biztools/toolbox/cash-flow-tracker" },
                { icon: DollarSign, title: "Profit Per Sale Calculator", desc: "Discover your real profit margin on every sale and identify pricing opportunities.", link: "/biztools/toolbox/free-pricing-net-profit-calculator" },
                { icon: BookOpen, title: "Fix the Cash Squeeze Playbook", desc: "A companion guide focused specifically on cash flow improvement strategies.", link: "/bizgrowth/launch/step-2-fix-cash-squeeze" }
              ].map((resource, i) => (
                <motion.a
                  key={i}
                  href={resource.link}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(36, 37, 83, 0.12)' }}
                  className="flex items-start gap-4 p-6 rounded-xl transition-all duration-300"
                  style={{ backgroundColor: colors.altSection }}
                >
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${colors.bizGreen}15` }}
                  >
                    <resource.icon className="w-6 h-6" style={{ color: colors.bizGreen }} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold mb-1 font-['Montserrat']" style={{ color: colors.bizBlue }}>
                      {resource.title}
                    </h3>
                    <p className="text-sm" style={{ color: colors.bizGrey }}>
                      {resource.desc}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* SECTION 11: STICKY CTA BAR */}
      <AnimatePresence>
        {isStickyVisible && !isStickyDismissed && !isModalOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-0 left-0 right-0 z-40 py-4 px-4"
            style={{ 
              backgroundColor: colors.bizBlue,
              boxShadow: '0 -4px 20px rgba(0,0,0,0.2)'
            }}
            role="complementary"
            aria-label="Download playbook call to action"
          >
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-white text-sm sm:text-base text-center sm:text-left">
                <strong>Ready to break the cycle?</strong> Get the free 7-step playbook.
              </p>
              <div className="flex items-center gap-4">
                <Button
                  onClick={openModal}
                  size="sm"
                  style={{ backgroundColor: colors.bizYellow, color: colors.bizBlue }}
                  className="font-semibold"
                >
                  <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                  Download Free Playbook
                </Button>
                <button
                  onClick={() => setStickyDismissed(true)}
                  className="text-white/70 hover:text-white p-1"
                  aria-label="Dismiss sticky bar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EMAIL CAPTURE MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: `${colors.bizBlue}d9`, backdropFilter: 'blur(4px)' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-md relative shadow-2xl"
            >
              {/* Close button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" style={{ color: colors.bizGrey }} />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <h3 
                  id="modal-title"
                  className="text-2xl font-bold mb-2 font-['Montserrat']"
                  style={{ color: colors.bizBlue }}
                >
                  Get Your Free Playbook
                </h3>
                <p className="text-[15px]" style={{ color: colors.bizGrey }}>
                  Enter your details and we'll send the complete 7-step framework straight to your inbox.
                </p>
              </div>

              {/* Social Proof Banner */}
              <div 
                className="flex items-center gap-2 justify-center p-3 rounded-lg mb-6"
                style={{ backgroundColor: `${colors.successGreen}15` }}
              >
                <Check className="w-5 h-5" style={{ color: colors.successGreen }} aria-hidden="true" />
                <span className="text-sm" style={{ color: colors.bizBlue }}>
                  Join <strong>1,000+</strong> business owners who've downloaded this playbook
                </span>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-medium" style={{ color: colors.bizBlue }}>
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    onBlur={() => {
                      if (!formData.firstName.trim()) {
                        setFormErrors(prev => ({ ...prev, firstName: 'First name is required' }));
                      } else {
                        setFormErrors(prev => ({ ...prev, firstName: undefined }));
                      }
                    }}
                    placeholder="Your first name"
                    className={`mt-1 ${formErrors.firstName ? 'border-red-500' : formData.firstName ? 'border-green-500' : ''}`}
                    required
                  />
                  {formErrors.firstName && (
                    <p className="text-red-500 text-xs mt-1" role="alert" aria-live="polite">{formErrors.firstName}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium" style={{ color: colors.bizBlue }}>
                    Work Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    onBlur={() => {
                      if (!formData.email.trim()) {
                        setFormErrors(prev => ({ ...prev, email: 'Email is required' }));
                      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                        setFormErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
                      } else {
                        setFormErrors(prev => ({ ...prev, email: undefined }));
                      }
                    }}
                    placeholder="you@company.com"
                    className={`mt-1 ${formErrors.email ? 'border-red-500' : formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? 'border-green-500' : ''}`}
                    required
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-xs mt-1" role="alert" aria-live="polite">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="businessStage" className="text-sm font-medium" style={{ color: colors.bizBlue }}>
                    Business Stage (optional)
                  </Label>
                  <Select
                    value={formData.businessStage}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, businessStage: value }))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select your stage..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="starting">Just starting out (0-2 years)</SelectItem>
                      <SelectItem value="growing">Growing (2-5 years)</SelectItem>
                      <SelectItem value="established">Established (5-10 years)</SelectItem>
                      <SelectItem value="mature">Mature (10+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 text-base font-semibold"
                  style={{ backgroundColor: colors.bizYellow, color: colors.bizBlue }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <>
                      <Download className="w-5 h-5 mr-2" aria-hidden="true" />
                      Send Me the Playbook
                    </>
                  )}
                </Button>
              </form>

              {/* Trust Elements */}
              <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs" style={{ color: colors.bizGrey }}>
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                  256-bit encryption
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                  1-2 emails/month
                </span>
                <a href="/privacy" className="underline hover:no-underline" style={{ color: colors.bizTeal }}>
                  Privacy Policy
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <GlobalFooter />
    </>
  );
};

export default BreakingPeaksValleysCycle;
