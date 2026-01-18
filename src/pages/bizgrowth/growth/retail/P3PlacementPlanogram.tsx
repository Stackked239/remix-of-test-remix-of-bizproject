import { Helmet } from "react-helmet-async";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import PromotionalBanner from "@/components/PromotionalBanner";
import { 
  Store, 
  Target, 
  TrendingDown, 
  RefreshCw,
  MapPin,
  BarChart3,
  Map,
  ShoppingCart,
  Calendar,
  Users,
  ClipboardList,
  LineChart,
  CheckSquare,
  Crosshair,
  Link2,
  Smartphone,
  ChevronDown,
  ChevronRight,
  Download,
  ExternalLink,
  Check,
  X,
  ArrowRight,
  BookOpen,
  Eye,
  PenTool,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState, useEffect } from "react";
import heroImage from "@/assets/images/p3-placement-planogram-hero.jpg";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// Counter animation component
const AnimatedCounter = ({ end, suffix = "", prefix = "" }: { end: number | string; suffix?: string; prefix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (isInView && typeof end === 'number') {
      const duration = 2000;
      const steps = 60;
      const increment = end / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <span ref={ref}>
      {prefix}{typeof end === 'number' ? count : end}{suffix}
    </span>
  );
};

// Section component with scroll animation
const AnimatedSection = ({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.section>
  );
};

const P3PlacementPlanogram = () => {
  const scrollToContent = () => {
    document.getElementById('problem-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Structured data for Course schema
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "P3: Placement & Planogram",
    "description": "Learn where products live and why location matters. Strategic placement boosts retail sales 15–30% without advertising. 6 modules, 3 exercises, 30-day pilot framework.",
    "provider": {
      "@type": "Organization",
      "name": "BizHealth.ai",
      "sameAs": "https://bizhealth.ai"
    },
    "educationalLevel": "Beginner to Intermediate",
    "isAccessibleForFree": false,
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "duration": "PT5H"
    }
  };

  return (
    <>
      <Helmet>
        <title>P3: Placement & Planogram | BizGrowth Academy | BizHealth.ai</title>
        <meta 
          name="description" 
          content="Learn where products live and why location matters. Strategic placement boosts retail sales 15–30% without advertising. 6 modules, 3 exercises, 30-day pilot framework." 
        />
        <link rel="canonical" href="https://bizhealth.ai/bizgrowth/growth/retail/p3-placement-planogram" />
        <meta property="og:title" content="P3: Placement & Planogram | BizGrowth Academy | BizHealth.ai" />
        <meta property="og:description" content="Turn your store layout into a sales machine. Learn strategic product placement to boost sales 15–30% without spending on advertising." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bizhealth.ai/bizgrowth/growth/retail/p3-placement-planogram" />
        <meta property="og:image" content="https://bizhealth.ai/og-images/og-p3-placement-planogram.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Retail professional holding tablet with planogram software in upscale boutique store with strategic product displays" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="P3: Placement & Planogram | BizGrowth Academy" />
        <meta name="twitter:description" content="Strategic retail placement framework to boost sales 15–30%." />
        <meta name="twitter:image" content="https://bizhealth.ai/og-images/og-p3-placement-planogram.jpg" />
        <script type="application/ld+json">
          {JSON.stringify(courseSchema)}
        </script>
      </Helmet>

      <PromotionalBanner />
      <GlobalNavigation />

      <main className="min-h-screen">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden bg-gradient-to-br from-[hsl(var(--biz-navy))] via-[hsl(237,42%,20%)] to-[hsl(200,35%,18%)]">
          {/* Subtle geometric pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 40px,
                rgba(255,255,255,0.03) 40px,
                rgba(255,255,255,0.03) 41px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 40px,
                rgba(255,255,255,0.03) 40px,
                rgba(255,255,255,0.03) 41px
              )`
            }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                {/* Left: Text Content */}
                <div className="text-center lg:text-left">
                  {/* Badge */}
                  <Badge 
                    variant="outline" 
                    className="mb-6 border-[hsl(var(--biz-gold))]/40 bg-[hsl(var(--biz-gold))]/10 text-[hsl(var(--biz-gold))] px-4 py-2 text-sm font-medium"
                  >
                    <Store className="w-4 h-4 mr-2" />
                    The 6 P's for Specialty Retailers · Module 3 of 6
                  </Badge>

                  {/* H1 Headline */}
                  <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    P3: Placement & Planogram
                  </h1>

                  {/* Subheadline */}
                  <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed font-body">
                    Turn your store layout into a sales machine. Learn where products live, why location matters, and how strategic placement boosts sales 15–30%—without spending on advertising.
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Button 
                      size="lg"
                      className="bg-[hsl(var(--biz-gold))] hover:bg-[hsl(48,100%,40%)] text-[hsl(var(--biz-navy))] font-semibold text-lg px-8 py-6 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                      asChild
                    >
                      <a href="/downloads/P3-Placement-Planogram-Curriculum-BizHealth-ai.pdf" download>
                        <Download className="w-5 h-5 mr-2" />
                        Download This Module
                      </a>
                    </Button>
                    <Button 
                      variant="ghost"
                      size="lg"
                      onClick={scrollToContent}
                      className="text-white/90 hover:text-white hover:bg-white/10 text-lg"
                    >
                      See What's Included
                      <ChevronDown className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </div>

                {/* Right: Hero Image */}
                <div className="relative">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                    <img 
                      src={heroImage}
                      alt="Retail professional holding tablet displaying planogram software in a modern boutique store with strategic product displays for women's apparel, accessories, and home decor"
                      className="w-full h-auto object-cover"
                      loading="eager"
                    />
                    {/* Overlay accent */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--biz-navy))]/30 to-transparent" />
                  </div>
                  {/* Decorative glow */}
                  <div className="absolute -inset-4 bg-[hsl(var(--biz-gold))]/10 rounded-3xl blur-2xl -z-10" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* PROBLEM SECTION */}
        <AnimatedSection className="py-16 md:py-24 bg-gradient-to-b from-[#F5F5F2] to-white" id="problem-section">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12">
                <Badge variant="outline" className="mb-4 border-red-400/40 bg-red-50 text-red-600 uppercase tracking-wider text-xs font-semibold">
                  The Challenge
                </Badge>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-[hsl(var(--biz-navy))] mb-6">
                  Your Layout Might Be Costing You Sales
                </h2>
                <p className="text-lg text-[hsl(var(--biz-grey))] max-w-3xl mx-auto leading-relaxed">
                  Most specialty retailers arrange products based on gut feel, available space, or "the way it's always been done." But research shows that strategic placement alone can increase sales by <span className="text-[hsl(var(--biz-green))] font-semibold">15–30%</span>—and <span className="text-[hsl(var(--biz-gold))] font-semibold">52% of all retail purchases happen at eye level</span>.
                </p>
              </div>

              {/* Problem Cards */}
              <motion.div 
                className="grid md:grid-cols-3 gap-6 mb-12"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  {
                    icon: Target,
                    title: "Random Placement",
                    description: "Products end up wherever they fit, not where they sell best. High-margin items get buried while slow movers take prime spots.",
                    accentColor: "red"
                  },
                  {
                    icon: TrendingDown,
                    title: "No Measurement",
                    description: "You can't tell which zones, displays, or shelves actually drive revenue. Every layout change is a guess.",
                    accentColor: "orange"
                  },
                  {
                    icon: RefreshCw,
                    title: "Chaotic Resets",
                    description: "Seasonal changes and new arrivals create confusion. Staff don't know the logic behind placement decisions.",
                    accentColor: "amber"
                  }
                ].map((card, idx) => (
                  <motion.div 
                    key={idx}
                    variants={fadeInUp}
                    className={`bg-white rounded-xl p-6 shadow-lg border-l-4 ${
                      card.accentColor === 'red' ? 'border-l-red-400' : 
                      card.accentColor === 'orange' ? 'border-l-orange-400' : 'border-l-amber-400'
                    } hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
                  >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                      card.accentColor === 'red' ? 'bg-red-100' : 
                      card.accentColor === 'orange' ? 'bg-orange-100' : 'bg-amber-100'
                    }`}>
                      <card.icon className={`w-6 h-6 ${
                        card.accentColor === 'red' ? 'text-red-500' : 
                        card.accentColor === 'orange' ? 'text-orange-500' : 'text-amber-500'
                      }`} />
                    </div>
                    <h3 className="font-heading font-semibold text-xl text-[hsl(var(--biz-navy))] mb-3">
                      {card.title}
                    </h3>
                    <p className="text-[hsl(var(--biz-grey))] leading-relaxed">
                      {card.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Transition Text */}
              <div className="text-center bg-[hsl(var(--biz-navy))]/5 rounded-xl p-6 border border-[hsl(var(--biz-navy))]/10">
                <p className="text-lg text-[hsl(var(--biz-navy))] font-medium max-w-3xl mx-auto">
                  This module gives you the framework to fix all three—starting with a simple <span className="text-[hsl(var(--biz-gold))] font-bold">30-day pilot</span> you can run in one section of your store.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* VALUE PROPOSITION SECTION */}
        <AnimatedSection className="py-10 md:py-16 bg-gradient-to-b from-white to-[hsl(var(--biz-green))]/5">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12">
                <Badge variant="outline" className="mb-4 border-[hsl(var(--biz-green))]/40 bg-[hsl(var(--biz-green))]/10 text-[hsl(var(--biz-green))] uppercase tracking-wider text-xs font-semibold">
                  ✓ Your Outcomes
                </Badge>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-[hsl(var(--biz-navy))] mb-4">
                  What You'll Walk Away With
                </h2>
              </div>

              {/* Outcome Cards */}
              <motion.div 
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  {
                    icon: MapPin,
                    title: "Strategic Zone Mastery",
                    description: "Know exactly where to place bestsellers, high-margin items, and impulse products based on proven traffic patterns."
                  },
                  {
                    icon: BarChart3,
                    title: "Measurable Results",
                    description: "Track sales per square foot, zone performance, and product metrics with simple tools—no fancy software required."
                  },
                  {
                    icon: Map,
                    title: "Your First Planogram",
                    description: "Create a visual product map your whole team can follow. DIY approach—pen and paper or basic slides work fine."
                  },
                  {
                    icon: ShoppingCart,
                    title: "Bigger Basket Sizes",
                    description: "Use 7 cross-merchandising tactics to increase average transaction value by 10–20%."
                  },
                  {
                    icon: Calendar,
                    title: "Seasonal Rotation System",
                    description: "Build a refresh calendar that keeps your store feeling new and captures holiday/seasonal opportunities."
                  },
                  {
                    icon: Users,
                    title: "Team Alignment",
                    description: "Everyone knows what goes where and why. Faster training, consistent execution, fewer questions."
                  }
                ].map((card, idx) => (
                  <motion.div 
                    key={idx}
                    variants={fadeInUp}
                    className="bg-white rounded-xl p-6 border-2 border-[hsl(var(--biz-green))]/20 hover:border-[hsl(var(--biz-green))]/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(var(--biz-green))]/20 to-[hsl(var(--biz-green))]/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <card.icon className="w-6 h-6 text-[hsl(var(--biz-green))]" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-[hsl(var(--biz-navy))] mb-2">
                      {card.title}
                    </h3>
                    <p className="text-[hsl(var(--biz-grey))] text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* METRICS STRIP */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-[hsl(var(--biz-navy))] via-[hsl(237,42%,25%)] to-[hsl(var(--biz-navy))] relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-[hsl(var(--biz-gold))] rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-[hsl(var(--biz-green))] rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                {[
                  { number: "15–30%", label: "Sales Increase", subtext: "from strategic placement alone", highlight: true },
                  { number: "10–20%", label: "Higher Basket Size", subtext: "via cross-merchandising tactics" },
                  { number: "52%", label: "Eye-Level Purchases", subtext: "of all retail sales happen here" },
                  { number: "5–7", label: "Hours to Complete", subtext: "at your own pace" }
                ].map((metric, idx) => (
                  <motion.div 
                    key={idx}
                    variants={fadeInUp}
                    className={`text-center p-6 rounded-xl ${metric.highlight ? 'bg-white/10 border border-[hsl(var(--biz-gold))]/30' : ''}`}
                  >
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[hsl(var(--biz-gold))] mb-2 drop-shadow-lg whitespace-nowrap">
                      {metric.number}
                    </div>
                    <div className="text-white font-semibold mb-1 text-lg">{metric.label}</div>
                    <div className="text-white/70 text-sm">{metric.subtext}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* CURRICULUM SECTION */}
        <AnimatedSection className="py-16 md:py-24 bg-gradient-to-b from-[#FAFAF8] to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12">
                <Badge variant="outline" className="mb-4 border-[hsl(var(--biz-navy))]/30 bg-[hsl(var(--biz-navy))]/5 text-[hsl(var(--biz-navy))] uppercase tracking-wider text-xs font-semibold">
                  📚 Complete Curriculum
                </Badge>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-[hsl(var(--biz-navy))] mb-4">
                  What You'll Learn
                </h2>
              </div>

              {/* Intro Callout */}
              <div className="bg-gradient-to-r from-[hsl(var(--biz-gold))]/10 to-[hsl(var(--biz-gold))]/5 rounded-xl p-6 border-l-4 border-[hsl(var(--biz-gold))] shadow-md mb-8">
                <p className="text-[hsl(var(--biz-grey))] leading-relaxed">
                  <strong className="text-[hsl(var(--biz-navy))]">6 comprehensive sections + 3 hands-on exercises</strong> designed to be completed in 5–7 hours total. Move at your own pace—each lesson is 20–45 minutes. No business degree required.
                </p>
              </div>

              {/* Module Accordion */}
              <Accordion type="single" collapsible className="space-y-4">
                {[
                  {
                    num: 1,
                    title: "Why Placement Matters",
                    duration: "25 minutes",
                    description: "The business case for strategic placement. Discover why eye-level products account for 52% of retail sales, and how placement can lift total revenue 15–30% without paid advertising.",
                    tags: ["Foundational", "Data-Driven"]
                  },
                  {
                    num: 2,
                    title: "Store Zones & Traffic Patterns",
                    duration: "30 minutes",
                    description: "Understand the four essential zones: Decompression, Strike Zone, Destination, and Checkout. Learn why 90% of customers turn right when entering—and how to use that insight.",
                    tags: ["Framework", "Exercise Included"]
                  },
                  {
                    num: 3,
                    title: "Eye Level Is Buy Level",
                    duration: "20 minutes",
                    description: "The vertical hierarchy of shelves. Where to place bestsellers, high-margin items, secondary products, and bulk goods for maximum sales impact.",
                    tags: ["Best Practice", "Quick Reference"]
                  },
                  {
                    num: 4,
                    title: "DIY Planograms (30-Day Pilot)",
                    duration: "45 minutes",
                    description: "Create your first planogram in 6 steps. No software required. Learn to map products, identify strategic pairings, and run a 30-day test in one section of your store.",
                    tags: ["Hands-On", "High-Impact"],
                    highlight: true
                  },
                  {
                    num: 5,
                    title: "Cross-Merchandising: 7 Proven Tactics",
                    duration: "35 minutes",
                    description: "Increase basket size and profit. Learn seven cross-merchandising strategies: complementary items, add-ons, contrasting products, substitutes, impulse items, bestseller anchors, and lifestyle displays.",
                    tags: ["Revenue Driver", "Actionable Tactics"]
                  },
                  {
                    num: 6,
                    title: "Measurement, Mistakes & Seasonal Reset",
                    duration: "40 minutes",
                    description: "Track what matters: sales per square foot, sales by zone, product performance. Avoid 6 common placement mistakes. Build a seasonal rotation calendar to keep your store fresh.",
                    tags: ["Metrics", "Continuous Improvement"]
                  }
                ].map((module) => (
                  <AccordionItem 
                    key={module.num} 
                    value={`module-${module.num}`}
                    className={`bg-white rounded-xl border-2 overflow-hidden transition-all duration-300 ${
                      module.highlight 
                        ? 'border-[hsl(var(--biz-gold))]/50 shadow-md' 
                        : 'border-[hsl(var(--biz-navy))]/10 data-[state=open]:border-[hsl(var(--biz-gold))]/40'
                    }`}
                  >
                    <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-[hsl(var(--biz-gold))]/5 [&[data-state=open]]:border-b [&[data-state=open]]:border-[hsl(var(--biz-navy))]/8">
                      <div className="flex items-center gap-4 text-left w-full">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-sm ${
                          module.highlight 
                            ? 'bg-gradient-to-br from-[hsl(var(--biz-gold))] to-[hsl(48,100%,40%)] text-[hsl(var(--biz-navy))]' 
                            : 'bg-[hsl(var(--biz-navy))] text-white'
                        }`}>
                          {module.num}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-heading font-semibold text-lg text-[hsl(var(--biz-navy))]">
                              {module.title}
                            </h3>
                            {module.highlight && (
                              <Badge className="bg-[hsl(var(--biz-gold))] text-[hsl(var(--biz-navy))] text-xs shadow-sm">
                                ⭐ Most Popular
                              </Badge>
                            )}
                          </div>
                          <span className="text-sm text-[hsl(var(--biz-grey))]">{module.duration}</span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5">
                      <div className="pl-16">
                        <p className="text-[hsl(var(--biz-grey))] mb-4 leading-relaxed">
                          {module.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {module.tags.map((tag, idx) => (
                            <Badge 
                              key={idx}
                              variant="outline" 
                              className="border-[hsl(var(--biz-green))]/40 bg-[hsl(var(--biz-green))]/5 text-[hsl(var(--biz-green))] text-xs font-medium"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </AnimatedSection>

        {/* LEARNING PATH SECTION */}
        <AnimatedSection className="py-16 md:py-24 bg-gradient-to-b from-white to-[hsl(var(--biz-gold))]/5">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12">
                <Badge variant="outline" className="mb-4 border-[hsl(var(--biz-gold))]/40 bg-[hsl(var(--biz-gold))]/10 text-[hsl(var(--biz-gold))] uppercase tracking-wider text-xs font-semibold">
                  🎯 Your Journey
                </Badge>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-[hsl(var(--biz-navy))] mb-4">
                  How To Move Through This Module
                </h2>
              </div>

              {/* 4-Step Path */}
              <div className="relative">
                {/* Connection Line (desktop) */}
                <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-1 bg-gradient-to-r from-[hsl(var(--biz-gold))] via-[hsl(var(--biz-green))] to-[hsl(var(--biz-navy))] rounded-full shadow-sm" />
                
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-4 gap-8"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    {
                      num: 1,
                      icon: BookOpen,
                      title: "Learn the Framework",
                      description: "Understand why placement matters and the science behind it (Sections 1–3).",
                      status: "Start here",
                      color: "gold"
                    },
                    {
                      num: 2,
                      icon: Eye,
                      title: "Audit Your Store",
                      description: "Walk your space, map zones, observe traffic patterns (Exercises 1–2).",
                      color: "green"
                    },
                    {
                      num: 3,
                      icon: PenTool,
                      title: "Build Your Planogram",
                      description: "Create a simple visual map for one section using the 30-day pilot framework.",
                      color: "blue"
                    },
                    {
                      num: 4,
                      icon: Activity,
                      title: "Measure & Adjust",
                      description: "Track results, refine based on data, scale to other sections.",
                      color: "navy"
                    }
                  ].map((step, idx) => (
                    <motion.div 
                      key={idx}
                      variants={fadeInUp}
                      className="text-center relative bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-[hsl(var(--biz-navy))]/5"
                    >
                      <div className={`relative z-10 mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-lg ${
                        step.color === 'gold' ? 'bg-gradient-to-br from-[hsl(var(--biz-gold))] to-[hsl(48,100%,40%)] text-[hsl(var(--biz-navy))]' :
                        step.color === 'green' ? 'bg-gradient-to-br from-[hsl(var(--biz-green))] to-[hsl(142,45%,35%)] text-white' :
                        step.color === 'blue' ? 'bg-gradient-to-br from-[hsl(200,70%,50%)] to-[hsl(200,70%,40%)] text-white' :
                        'bg-gradient-to-br from-[hsl(var(--biz-navy))] to-[hsl(237,42%,25%)] text-white'
                      }`}>
                        <step.icon className="w-7 h-7" />
                      </div>
                      {step.status && (
                        <Badge className="absolute top-3 right-3 bg-[hsl(var(--biz-gold))] text-[hsl(var(--biz-navy))] text-xs shadow-sm">
                          {step.status}
                        </Badge>
                      )}
                      <h3 className="font-heading font-semibold text-lg text-[hsl(var(--biz-navy))] mb-2">
                        {step.title}
                      </h3>
                      <p className="text-[hsl(var(--biz-grey))] text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* WHAT'S INCLUDED SECTION */}
        <AnimatedSection className="py-16 md:py-24 bg-gradient-to-b from-[#F5F5F2] to-[hsl(var(--biz-navy))]/5">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12">
                <Badge variant="outline" className="mb-4 border-[hsl(var(--biz-gold))]/40 bg-[hsl(var(--biz-gold))]/10 text-[hsl(var(--biz-gold))] uppercase tracking-wider text-xs font-semibold">
                  📦 Everything You Need
                </Badge>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-[hsl(var(--biz-navy))] mb-4">
                  What's Included
                </h2>
              </div>

              {/* Feature Grid */}
              <motion.div 
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  {
                    icon: ClipboardList,
                    title: "3 Hands-On Exercises",
                    description: "Map your zones, track traffic patterns, build your first DIY planogram.",
                    highlight: true
                  },
                  {
                    icon: LineChart,
                    title: "Measurement Toolkit",
                    description: "Simple tracking sheets for sales per square foot, zone performance, and product metrics."
                  },
                  {
                    icon: CheckSquare,
                    title: "Action Checklists",
                    description: "Weekly, monthly, and 90-day implementation checklists you can use immediately."
                  },
                  {
                    icon: Crosshair,
                    title: "Real Retailer Examples",
                    description: "Learn from specialty retailers, boutiques, and gift shops using these tactics now."
                  },
                  {
                    icon: Link2,
                    title: "Links to the Other P's",
                    description: "See how Placement connects to Products, Pricing, Profit, Patrons, and Personnel."
                  },
                  {
                    icon: Smartphone,
                    title: "Mobile-Friendly Design",
                    description: "Access lessons, exercises, and tracking tools on your phone while working in your store."
                  }
                ].map((feature, idx) => (
                  <motion.div 
                    key={idx}
                    variants={fadeInUp}
                    className={`bg-white rounded-xl p-6 border-2 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group ${
                      feature.highlight 
                        ? 'border-[hsl(var(--biz-gold))]/40 shadow-md' 
                        : 'border-[hsl(var(--biz-navy))]/8'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${
                      feature.highlight 
                        ? 'bg-gradient-to-br from-[hsl(var(--biz-gold))] to-[hsl(48,100%,40%)]' 
                        : 'bg-gradient-to-br from-[hsl(var(--biz-green))]/20 to-[hsl(var(--biz-green))]/5'
                    }`}>
                      <feature.icon className={`w-7 h-7 ${feature.highlight ? 'text-[hsl(var(--biz-navy))]' : 'text-[hsl(var(--biz-green))]'}`} />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-[hsl(var(--biz-navy))] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-[hsl(var(--biz-grey))] text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* WHO THIS IS FOR SECTION */}
        <AnimatedSection className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12">
                <Badge variant="outline" className="mb-4 border-[hsl(var(--biz-navy))]/20 text-[hsl(var(--biz-navy))] uppercase tracking-wider text-xs font-semibold">
                  Is This For You?
                </Badge>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-[hsl(var(--biz-navy))] mb-4">
                  This Module Is Perfect For You If...
                </h2>
              </div>

              {/* Two Columns */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* For You Column */}
                <div className="bg-[hsl(var(--biz-green))]/5 rounded-xl p-6 border border-[hsl(var(--biz-green))]/20">
                  <h3 className="font-heading font-semibold text-lg text-[hsl(var(--biz-green))] mb-4 flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    This Is For You
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "You own or manage a physical retail store",
                      "You want to increase sales without more advertising",
                      "Your current layout is based on \"gut feel\" rather than strategy",
                      "You're in Growth or Scaling stage (though Launch works too)",
                      "You have 5–7 hours to invest over the next few weeks",
                      "You're willing to run a 30-day test in one section"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-[hsl(var(--biz-grey))]">
                        <Check className="w-5 h-5 text-[hsl(var(--biz-green))] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Not For You Column */}
                <div className="bg-red-50/50 rounded-xl p-6 border border-red-200/60">
                  <h3 className="font-heading font-semibold text-lg text-red-500 mb-4 flex items-center gap-2">
                    <X className="w-5 h-5" />
                    Not For You If...
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "You're e-commerce only with no physical location",
                      "You're looking for instant results without implementation",
                      "You want someone to do it for you (this is DIY education)"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-red-600/80">
                        <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* FAQ SECTION */}
        <AnimatedSection className="py-16 md:py-24 bg-[#F5F5F2]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12">
                <Badge variant="outline" className="mb-4 border-[hsl(var(--biz-navy))]/20 text-[hsl(var(--biz-navy))] uppercase tracking-wider text-xs font-semibold">
                  Common Questions
                </Badge>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-[hsl(var(--biz-navy))] mb-4">
                  FAQ
                </h2>
              </div>

              {/* FAQ Accordion */}
              <Accordion type="single" collapsible className="space-y-4">
                {[
                  {
                    q: "Who is this module for?",
                    a: "Specialty retailers, boutique owners, gift shops, and anyone with a physical store location. It's designed for Growth and Scaling stages, though Launch-stage owners will find immediate value. No retail experience required."
                  },
                  {
                    q: "How much time does this take?",
                    a: "5–7 hours total if you complete all six sections plus all three exercises. You can spread this over a few weeks. Each lesson is 20–45 minutes, so you can do one per day or batch them as suits your schedule."
                  },
                  {
                    q: "Do I need fancy software to create a planogram?",
                    a: "No. You can create an effective planogram with a pen and paper, a simple sketch, or a basic PowerPoint slide. This module teaches you the DIY approach that works without expensive tools."
                  },
                  {
                    q: "When will I see results?",
                    a: "The 30-day pilot framework is designed so you can see results within one month. Some retailers report sales increases in the reorganized section within 2–3 weeks of implementing a planogram."
                  },
                  {
                    q: "Can I use this for an online store?",
                    a: "This module is designed for physical stores. However, the principles of product adjacency and strategic \"placement\" do apply to website design and e-commerce product pages."
                  },
                  {
                    q: "What's the connection to the other P's?",
                    a: "Placement (P3) directly influences Products, Pricing, Profit, Patrons, and Personnel. This module shows you how smart placement amplifies your margins, improves customer experience, and makes your team's job easier."
                  },
                  {
                    q: "What if I get stuck or have questions?",
                    a: "BizGrowth Academy includes community support and office hours where you can get help with implementation. You're not doing this alone."
                  }
                ].map((faq, idx) => (
                  <AccordionItem 
                    key={idx}
                    value={`faq-${idx}`}
                    className="bg-white rounded-xl border border-[hsl(var(--biz-navy))]/8 overflow-hidden"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-[hsl(var(--biz-gold))]/5 text-left">
                      <span className="font-heading font-semibold text-[hsl(var(--biz-navy))]">
                        {faq.q}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <p className="text-[hsl(var(--biz-grey))] leading-relaxed">
                        {faq.a}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </AnimatedSection>

        {/* SERIES CONTEXT SECTION */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-[hsl(var(--biz-navy))] to-[hsl(237,42%,20%)] relative overflow-hidden">
          {/* Subtle pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)`
            }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12">
                <Badge variant="outline" className="mb-4 border-white/20 text-white/80 uppercase tracking-wider text-xs font-semibold">
                  Part of a Complete System
                </Badge>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                  The 6 P's for Specialty & Boutique Retailers
                </h2>
                <p className="text-white/70 max-w-2xl mx-auto">
                  P3: Placement & Planogram is one module in a comprehensive system. Each "P" builds on the others to create a complete retail strategy.
                </p>
              </div>

              {/* 6 P's Cards */}
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-6 md:overflow-visible">
                {[
                  { p: "P1", title: "Products", subtitle: "What you sell and why" },
                  { p: "P2", title: "Pricing", subtitle: "Margins, markups, and value" },
                  { p: "P3", title: "Placement", subtitle: "Store layout strategy", current: true },
                  { p: "P4", title: "Profit", subtitle: "Where money actually goes" },
                  { p: "P5", title: "Patrons", subtitle: "Your customers' journey" },
                  { p: "P6", title: "Personnel", subtitle: "Team and operations" }
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className={`flex-shrink-0 w-40 md:w-auto snap-center bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border ${
                      item.current 
                        ? 'border-[hsl(var(--biz-gold))] bg-[hsl(var(--biz-gold))]/20' 
                        : 'border-white/10'
                    }`}
                  >
                    <div className={`text-sm font-bold mb-1 ${item.current ? 'text-[hsl(var(--biz-gold))]' : 'text-white/60'}`}>
                      {item.p}
                    </div>
                    <div className={`font-semibold mb-1 ${item.current ? 'text-white' : 'text-white/90'}`}>
                      {item.title}
                    </div>
                    <div className="text-xs text-white/60">
                      {item.subtitle}
                    </div>
                    {item.current && (
                      <Badge className="mt-2 bg-[hsl(var(--biz-gold))] text-[hsl(var(--biz-navy))] text-xs">
                        You are here
                      </Badge>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="text-center mt-8">
                <Button 
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                  asChild
                >
                  <a href="/bizgrowth">
                    See All 6 P's Modules
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <AnimatedSection className="py-16 md:py-24 bg-gradient-to-t from-[#F5F5F2] to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-[hsl(var(--biz-navy))] mb-4">
                Ready to Make Your Store Layout Work Harder?
              </h2>
              <p className="text-xl text-[hsl(var(--biz-grey))] mb-10 leading-relaxed">
                Learn where products live and why location matters. Start with the framework, run a 30-day pilot, and watch your sales lift.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button 
                  size="lg"
                  className="bg-[hsl(var(--biz-gold))] hover:bg-[hsl(48,100%,40%)] text-[hsl(var(--biz-navy))] font-semibold text-lg px-8 py-6 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                  asChild
                >
                  <a href="/downloads/P3-Placement-Planogram-Curriculum-BizHealth-ai.pdf" download>
                    <Download className="w-5 h-5 mr-2" />
                    Start P3: Placement & Planogram
                  </a>
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-[hsl(var(--biz-navy))] text-[hsl(var(--biz-navy))] hover:bg-[hsl(var(--biz-navy))] hover:text-white text-lg px-8 py-6"
                  asChild
                >
                  <a href="/bizgrowth">
                    See Your Complete Learning Path
                  </a>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-4 text-sm text-[hsl(var(--biz-grey))]">
                {[
                  "5–7 hours total",
                  "Actionable exercises",
                  "30-day pilot framework",
                  "Mobile-friendly"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[hsl(var(--biz-green))]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </main>

      {/* Gradient Divider */}
      <div className="w-full h-1 bg-gradient-to-r from-[hsl(var(--biz-green))] via-[hsl(var(--biz-gold))] to-[hsl(var(--biz-green))]" role="presentation" aria-hidden="true" />

      <GlobalFooter />
    </>
  );
};

export default P3PlacementPlanogram;
