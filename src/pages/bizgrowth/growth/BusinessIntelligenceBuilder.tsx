import { useState } from 'react';
import { Download, Clock, TrendingUp, Target, Users, BarChart3, Zap, AlertTriangle, DollarSign, PieChart, ChevronDown, ChevronUp, Check, ArrowRight, Star, Lightbulb, Link as LinkIcon, Database, Brain, LineChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import GlobalFooter from '@/components/GlobalFooter';
import GradientDivider from '@/components/GradientDivider';
import GlobalNavigation from '@/components/GlobalNavigation';
import PromotionalBanner from '@/components/PromotionalBanner';

const BusinessIntelligenceBuilder = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/downloads/Business-Intelligence-Builder-Playbook-BizHealth-ai.pdf?v=1';
    link.download = 'Business-Intelligence-Builder-Playbook-BizHealth-ai.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Your playbook download has started!');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const valueCards = [
    { icon: DollarSign, title: 'Uncover Hidden Profit Leaks', description: "Most owners don't know which customers are actually profitable or where money quietly drains away. BI reveals this in hours, not months." },
    { icon: AlertTriangle, title: 'Prevent Business Crises', description: 'Without BI, you see problems 30 days late. With BI, you spot cash flow issues, customer churn, or quality problems today—before they become emergencies.' },
    { icon: Target, title: 'Gain Competitive Advantage', description: "If competitors have BI and you don't, they're making smarter moves faster. They see trends before you even realize something's changing." },
    { icon: Users, title: 'Align Your Team', description: 'When your team sees the same data you do, everyone makes better decisions. No more guessing. No more politics. Just shared clarity and accountability.' },
    { icon: TrendingUp, title: 'Grow Without Hiring', description: 'BI reveals inefficiencies that don\'t require new hires to fix. Often, a 10-15% efficiency gain is hiding in your data right now, waiting to be discovered.' },
    { icon: PieChart, title: 'Become Exit-Ready', description: 'Investors and buyers want data-driven operations. BI makes your business more valuable, more predictable, and more attractive when it\'s time to sell.' },
  ];

  const steps = [
    { number: 1, title: 'See Your Blind Spots', subtitle: 'Define What You Need to Know', description: 'Identify your 5-7 most important metrics—the ones that tell you if your business is healthy or heading toward trouble. Learn the difference between leading and lagging indicators.', time: '45 minutes' },
    { number: 2, title: 'Connect Your Data', subtitle: 'Know Where Your Information Lives', description: "Map your data sources and choose the right tool. You already have most of the data you need—it's just scattered across different systems. We'll help you connect it.", time: '60 minutes' },
    { number: 3, title: 'Build Your First Dashboard', subtitle: 'Start Seeing Your Business', description: 'Create a real-time view with your 3-5 key metrics. Simple tools work—even a well-organized spreadsheet is legitimate BI. The goal is starting, not perfection.', time: '45 minutes' },
    { number: 4, title: 'Make Data-Driven Decisions', subtitle: 'Turn Insights Into Action', description: 'Establish your weekly review rhythm. 30 minutes a week asking the right four questions changes everything. Data without action is just numbers on a screen.', time: '30 min/week' },
    { number: 5, title: 'Build Team Alignment', subtitle: 'Everyone Sees the Same Truth', description: 'Share metrics with your team for better execution. Transparency builds trust and accountability. When people see results of their work, they make better decisions.', time: '45 minutes' },
    { number: 6, title: 'Scale & Optimize', subtitle: 'Make BI Your Competitive Edge', description: "Evolve your BI as your business grows. Deeper insights, predictive analytics, and a data-driven culture that competitors can't easily copy.", time: 'Ongoing' },
  ];

  const testimonials = [
    { text: "We discovered our most profitable customer segment within days of looking at the data. We immediately doubled down on that market. This playbook saved us six months of wrong decisions.", author: "Sarah M.", role: "E-commerce Business Owner" },
    { text: "I finally understand where our cash actually goes. We're making weekly decisions instead of quarterly guesses. My team feels more aligned, and we've improved margins by 8% in 30 days.", author: "David K.", role: "Service Business Owner" },
    { text: "The playbook is practical. No fluff. It's exactly what a small business owner needs to start making data-driven decisions without becoming a data analyst. Highly recommend.", author: "Michelle R.", role: "Product Business Owner" },
  ];

  const faqs = [
    { 
      question: "Do I need technical skills to use this playbook?", 
      answer: "No. The playbook is designed for small business owners with no tech background. Even if you've never looked at a dashboard before, this guides you step-by-step through the process. We assume zero prior knowledge.",
      category: "🎯 Getting Started",
      tip: "If you can use a spreadsheet, you can build business intelligence. We start there."
    },
    { 
      question: "What if I'm using spreadsheets instead of fancy BI software?", 
      answer: "Perfect. A well-organized spreadsheet is legitimate Business Intelligence. The playbook works with spreadsheets, Google Sheets, Excel, or any BI tool. Start where you are—graduate to better tools when you've proven the value.",
      category: "🛠️ Tools & Setup",
      tip: "Permission you might need: A simple dashboard you actually use beats a complex one gathering dust."
    },
    { 
      question: "How much time will this take to implement?", 
      answer: "The playbook takes 45-60 minutes to read. Implementation depends on your setup, but most owners get their first dashboard running within a week. The ongoing commitment is just 30 minutes per week for reviews.",
      category: "⏱️ Time Investment",
      tip: "That weekly 30 minutes is where the magic happens—it's when data turns into decisions."
    },
    { 
      question: "What if my data is messy or scattered?", 
      answer: "The playbook addresses this directly. Step 2 helps you map all your data sources and identify what needs cleaning. Most owners find they need a few hours to organize things, but the playbook guides you through it.",
      category: "📊 Data Quality",
      tip: "Garbage in = garbage out. But don't wait for perfect data—start with 'good enough' and improve over time."
    },
    { 
      question: "Can I use this for any type of business?", 
      answer: "Yes. The playbook includes metrics tailored to different business types: service firms, e-commerce, product businesses, and more. The core principles—identify key metrics, connect data, build visibility, establish rhythm—apply to any small business.",
      category: "🏢 Business Types",
      tip: "We've included specific metric suggestions for each business model inside the playbook."
    },
    { 
      question: "Is there a cost to download the playbook?", 
      answer: "No. The Business Intelligence Builder Playbook is completely free. No signup required. No email capture. No tricks. Download it, use it, and start making better decisions immediately.",
      category: "💰 Pricing",
      tip: "We believe every business owner deserves access to these fundamentals—that's why it's free."
    },
  ];

  const blogLinks = [
    { 
      title: "Leading Blind: The Hidden Cost of Operating Without BI", 
      description: "Discover what you're missing when you operate without clear visibility into your business metrics—and how it compounds over time.",
      href: "/blog/leading-blind-business-intelligence-small-business"
    },
    { 
      title: "The Growth Ceiling: Why Gut Instinct Stops Working", 
      description: "Learn why the intuition that built your business becomes a liability as you scale—and what data-driven decision-making enables.",
      href: "/blog/growth-ceiling-gut-instinct-scaling"
    },
  ];

  return (
    <>
      <SEO
        title="Business Intelligence Builder Playbook | Free 6-Step Guide | BizGrowth Academy"
        description="Download the free Business Intelligence Builder playbook. A practical 6-step guide helping small business owners make data-driven decisions, improve margins, and grow sustainably. No tech background required."
        keywords="business intelligence for small business, SMB BI playbook, data-driven decisions, small business metrics, business dashboard guide, free BI guide, BizHealth, BizGrowth Academy"
        canonical="https://bizhealth.ai/bizgrowth/growth/business-intelligence-builder"
        ogType="website"
        ogImage="/og-images/og-bi-builder-playbook.jpg"
      />

      <StructuredData
        type="course"
        name="Business Intelligence Builder Playbook"
        description="A free 6-step playbook for small business owners to build real business intelligence and make data-driven decisions."
        provider="BizHealth.ai BizGrowth Academy"
        providerUrl="https://bizhealth.ai"
        url="https://bizhealth.ai/bizgrowth/growth/business-intelligence-builder"
        courseMode="Online"
        isAccessibleForFree={true}
        price="0"
        priceCurrency="USD"
      />

      {/* Promotional Banner */}
      <PromotionalBanner />

      {/* Global Navigation */}
      <div className="pt-20">
        <GlobalNavigation />
      </div>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#242553] via-[#1a1a3e] to-[#151628] text-white min-h-[85vh] flex items-center overflow-hidden" aria-labelledby="hero-heading">
          {/* Background effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(ellipse_120%_80%_at_70%_20%,rgba(150,148,35,0.12)_0%,transparent_50%),radial-gradient(ellipse_80%_100%_at_20%_80%,rgba(230,184,0,0.08)_0%,transparent_50%)]" />
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-50" />
          </div>
          
          {/* Floating accents */}
          <motion.div 
            className="absolute w-[400px] h-[400px] bg-[rgba(150,148,35,0.15)] rounded-full blur-[80px] -top-[100px] right-[10%] pointer-events-none"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute w-[300px] h-[300px] bg-[rgba(230,184,0,0.12)] rounded-full blur-[80px] bottom-[10%] right-[5%] pointer-events-none"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-16">
            <motion.div 
              className="max-w-[720px]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/30 text-white px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
                <BarChart3 className="w-4 h-4 text-[#E6B800]" />
                <span>BizGrowth Academy — Free Playbook</span>
              </div>

              <h1 id="hero-heading" className="font-['Montserrat'] font-extrabold text-4xl md:text-5xl lg:text-[3.25rem] leading-tight tracking-tight mb-4">
                Stop Guessing.<br />Start Growing.
              </h1>

              <p className="font-['Montserrat'] font-medium text-xl md:text-2xl text-[#B0AD3A] mb-6 tracking-wide">
                Your 6-Step Guide to Business Intelligence That Actually Works
              </p>

              <p className="text-lg leading-relaxed text-white/85 mb-10 max-w-[580px]">
                No tech background required. No expensive software. Just clear, actionable steps to finally see what's really happening in your business—and make confident decisions based on data, not gut feel.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button 
                  onClick={handleDownload}
                  className="bg-gradient-to-r from-[#E6B800] to-[#C99E00] text-[#242553] hover:from-[#F5D54A] hover:to-[#E6B800] font-['Montserrat'] font-semibold text-base px-8 py-5 h-auto rounded-lg shadow-[0_4px_16px_rgba(230,184,0,0.35)] hover:-translate-y-0.5 transition-all flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Get Your Free Playbook
                </Button>
                <Button 
                  onClick={() => scrollToSection('steps')}
                  variant="outline"
                  className="bg-transparent text-white border-2 border-white/50 hover:bg-white/10 hover:border-white font-['Montserrat'] font-semibold text-base px-8 py-5 h-auto rounded-lg transition-all"
                >
                  See What's Inside
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 md:gap-10 pt-8 border-t border-[rgba(150,148,35,0.3)]">
                {[
                  { value: '45-60 min', label: 'To Complete' },
                  { value: '6 Steps', label: 'Clear & Actionable' },
                  { value: 'Zero Tech', label: 'Skills Required' },
                  { value: '100% Free', label: 'No Signup Needed' },
                ].map((stat, index) => (
                  <div key={index} className="text-left">
                    <span className="font-['Montserrat'] font-bold text-xl md:text-2xl text-[#E6B800] block">{stat.value}</span>
                    <span className="text-sm text-white/65">{stat.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Value Proposition Section */}
        <section className="bg-[#F8F9FB] py-20 md:py-24" aria-labelledby="value-heading">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center max-w-[700px] mx-auto mb-16">
              <div className="w-20 h-1 bg-gradient-to-r from-[#969423] to-[#E6B800] rounded mx-auto mb-6" />
              <h2 id="value-heading" className="font-['Montserrat'] font-bold text-3xl md:text-4xl text-[#242553] mb-5">
                Why Business Intelligence Matters Right Now
              </h2>
              <p className="text-lg text-[#5A5A5A] leading-relaxed">
                Most small business owners operate blind—not because they want to, but because they don't know there's a better way. This playbook changes that.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {valueCards.map((card, index) => (
                <motion.article 
                  key={index}
                  className="group bg-white p-9 rounded-2xl border border-[#E8E8EE] hover:border-[rgba(150,148,35,0.3)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(36,37,83,0.12)] relative overflow-hidden"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="absolute top-0 left-0 w-1 h-0 bg-gradient-to-b from-[#969423] to-[#B0AD3A] group-hover:h-full transition-all duration-300" />
                  <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-[rgba(150,148,35,0.08)] to-[rgba(150,148,35,0.15)] border border-[rgba(150,148,35,0.08)] rounded-[14px] mb-5">
                    <card.icon className="w-7 h-7 text-[#969423]" />
                  </div>
                  <h3 className="font-['Montserrat'] font-bold text-lg text-[#242553] mb-3">{card.title}</h3>
                  <p className="text-[#5A5A5A] text-[0.95rem] leading-[1.75] m-0">{card.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Playbook Overview Section */}
        <section className="bg-white py-20 md:py-24" aria-labelledby="playbook-heading">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center max-w-[700px] mx-auto mb-16">
              <div className="w-20 h-1 bg-gradient-to-r from-[#969423] to-[#E6B800] rounded mx-auto mb-6" />
              <h2 id="playbook-heading" className="font-['Montserrat'] font-bold text-3xl md:text-4xl text-[#242553] mb-5">
                Your Business Intelligence Builder Playbook
              </h2>
              <p className="text-lg text-[#5A5A5A] leading-relaxed">
                Designed for small business owners who want to make smarter decisions—not because they're data scientists, but because they want to grow.
              </p>
            </div>

            <motion.div 
              className="bg-gradient-to-br from-[rgba(36,37,83,0.03)] to-[rgba(150,148,35,0.06)] border border-[rgba(150,148,35,0.3)] rounded-[20px] p-10 md:p-12 relative overflow-hidden"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute -top-1/2 -right-[10%] w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(150,148,35,0.1),transparent_70%)] pointer-events-none" />
              
              <div className="relative z-10">
                <h3 className="flex items-center gap-3 font-['Montserrat'] font-bold text-xl md:text-2xl text-[#242553] mb-4">
                  <Database className="w-7 h-7 text-[#969423]" />
                  What You're Getting
                </h3>
                <p className="text-lg text-[#5A5A5A] max-w-[700px] mb-9">
                  A beginner-friendly, actionable playbook that takes you from "I think my business is doing okay" to "I know exactly what's working and what needs fixing." Each step is designed to be completed in one sitting and applied to your business immediately.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                  {[
                    { value: '45-60 min', label: 'Time to Complete' },
                    { value: '6 Steps', label: 'Clear & Actionable' },
                    { value: '0 Tech', label: 'Skills Required' },
                    { value: '100% Free', label: 'Download & Use' },
                  ].map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl border border-[#E8E8EE] text-center hover:border-[#969423] hover:shadow-[0_4px_20px_rgba(150,148,35,0.2)] transition-all">
                      <span className="font-['Montserrat'] font-bold text-2xl text-[#969423] block mb-1">{stat.value}</span>
                      <span className="text-sm text-[#8E8E9A]">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 6 Steps Section */}
        <section id="steps" className="bg-gradient-to-b from-[#FAFBF5] to-white border-t-[3px] border-[#969423] py-20 md:py-24" aria-labelledby="steps-heading">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center max-w-[700px] mx-auto mb-16">
              <div className="w-20 h-1 bg-gradient-to-r from-[#969423] to-[#E6B800] rounded mx-auto mb-6" />
              <h2 id="steps-heading" className="font-['Montserrat'] font-bold text-3xl md:text-4xl text-[#242553] mb-5">
                Inside the Playbook: Your 6-Step Path
              </h2>
              <p className="text-lg text-[#5A5A5A] leading-relaxed">
                Each step builds on the last, creating a practical system you can implement this week.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {steps.map((step, index) => (
                <motion.article 
                  key={index}
                  className="group bg-white p-9 rounded-2xl border border-[#E8E8EE] hover:border-[rgba(150,148,35,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(36,37,83,0.08)] flex flex-col"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-[52px] h-[52px] flex items-center justify-center bg-gradient-to-br from-[#242553] to-[#3A3B6E] text-white font-['Montserrat'] font-bold text-xl rounded-[14px] mb-5 shadow-[0_4px_12px_rgba(36,37,83,0.2)]">
                    {step.number}
                  </div>
                  <h3 className="font-['Montserrat'] font-bold text-lg text-[#242553] mb-2">{step.title}</h3>
                  <p className="font-['Montserrat'] font-semibold text-sm text-[#969423] mb-3 pb-3 border-b-2 border-[rgba(150,148,35,0.08)]">{step.subtitle}</p>
                  <p className="text-[#5A5A5A] text-[0.95rem] flex-grow mb-5">{step.description}</p>
                  <div className="flex items-center gap-2 pt-4 border-t border-[#E8E8EE] text-sm text-[#7A7719] font-medium">
                    <Clock className="w-4 h-4 text-[#969423]" />
                    <span>{step.time}</span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="bg-white py-20 md:py-24" aria-labelledby="blog-heading">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center max-w-[700px] mx-auto mb-16">
              <div className="w-20 h-1 bg-gradient-to-r from-[#969423] to-[#E6B800] rounded mx-auto mb-6" />
              <h2 id="blog-heading" className="font-['Montserrat'] font-bold text-3xl md:text-4xl text-[#242553] mb-5">
                Deepen Your Understanding
              </h2>
              <p className="text-lg text-[#5A5A5A] leading-relaxed">
                Explore these articles from BizHealth.ai for additional insights on why business intelligence matters for growth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
              {blogLinks.map((blog, index) => (
                <motion.article 
                  key={index}
                  className="group bg-[#F8F9FB] rounded-2xl overflow-hidden border border-transparent hover:border-[rgba(150,148,35,0.3)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(36,37,83,0.12)]"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-gradient-to-br from-[#242553] to-[#3A3B6E] text-white p-9 min-h-[180px] flex flex-col justify-center relative">
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#969423] to-[#E6B800]" />
                    <h3 className="font-['Montserrat'] font-bold text-lg text-white mb-3 leading-snug">{blog.title}</h3>
                    <p className="text-sm text-white/85 leading-relaxed m-0">{blog.description}</p>
                  </div>
                  <div className="p-5 flex items-center justify-between bg-white">
                    <Link to={blog.href} className="font-['Montserrat'] font-semibold text-sm text-[#7A7719] flex items-center gap-2 hover:text-[#969423] transition-colors">
                      Read Article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-[#F8F9FB] py-20 md:py-24 relative" aria-labelledby="testimonials-heading">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#242553] via-[#969423] to-[#E6B800]" />
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center max-w-[700px] mx-auto mb-16">
              <div className="w-20 h-1 bg-gradient-to-r from-[#969423] to-[#E6B800] rounded mx-auto mb-6" />
              <h2 id="testimonials-heading" className="font-['Montserrat'] font-bold text-3xl md:text-4xl text-[#242553] mb-5">
                What Business Owners Are Saying
              </h2>
              <p className="text-lg text-[#5A5A5A] leading-relaxed">
                Real results from small business owners who stopped guessing and started growing with BI.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {testimonials.map((testimonial, index) => (
                <motion.article 
                  key={index}
                  className="bg-white p-9 rounded-2xl border border-[#E8E8EE] hover:border-[rgba(150,148,35,0.3)] hover:shadow-[0_4px_12px_rgba(36,37,83,0.08)] transition-all relative"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="absolute top-5 right-7 font-serif text-6xl text-[#969423] opacity-20 leading-none">"</div>
                  <div className="text-[#E6B800] text-base tracking-wider mb-4" aria-label="5 out of 5 stars">★★★★★</div>
                  <p className="text-[0.95rem] italic text-[#5A5A5A] leading-relaxed mb-5">{testimonial.text}</p>
                  <p className="font-['Montserrat'] font-semibold text-[0.95rem] text-[#242553]">{testimonial.author}</p>
                  <p className="text-sm text-[#7A7719]">{testimonial.role}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="bg-gradient-to-b from-white to-[#FAFBF5] py-20 md:py-24 relative" aria-labelledby="faq-heading">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-[radial-gradient(circle,rgba(150,148,35,0.08),transparent_70%)] pointer-events-none" />
          <div className="max-w-[800px] mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-[rgba(150,148,35,0.15)] border border-[rgba(150,148,35,0.3)] text-[#7A7719] px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
                <span>❓</span>
                <span>Common Questions Answered</span>
              </div>
              <h2 id="faq-heading" className="font-['Montserrat'] font-bold text-3xl md:text-4xl text-[#242553] mb-5">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-[#5A5A5A] leading-relaxed">
                Everything you need to know before downloading the playbook.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div 
                  key={index}
                  className={`bg-white rounded-2xl border-2 transition-all duration-300 shadow-sm ${openFaq === index ? 'border-[#969423] shadow-[0_4px_20px_rgba(150,148,35,0.2),0_0_0_4px_rgba(150,148,35,0.08)]' : 'border-[#E8E8EE] hover:border-[rgba(150,148,35,0.4)] hover:shadow-md'}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 md:px-7 py-6 flex justify-between items-center gap-5 text-left font-['Montserrat'] font-semibold text-[1.05rem] text-[#242553] hover:bg-[#FAFBF5] transition-colors relative"
                    aria-expanded={openFaq === index}
                  >
                    <span className={`absolute left-0 top-0 bottom-0 w-1 bg-[#969423] transition-transform duration-300 ${openFaq === index ? 'scale-y-100' : 'scale-y-0'}`} />
                    <span className="flex-1 leading-snug">{faq.question}</span>
                    <span className={`w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0 border-2 transition-all duration-300 ${openFaq === index ? 'bg-gradient-to-br from-[#969423] to-[#7A7719] border-[#969423] rotate-180' : 'bg-gradient-to-br from-[#F8F9FB] to-[rgba(150,148,35,0.08)] border-[#E8E8EE] hover:border-[#969423]'}`}>
                      {openFaq === index ? (
                        <ChevronUp className={`w-5 h-5 ${openFaq === index ? 'text-white' : 'text-[#969423]'}`} />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#969423]" />
                      )}
                    </span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 bg-gradient-to-b from-[#FAFBF5] to-white ${openFaq === index ? 'max-h-[400px]' : 'max-h-0'}`}>
                    <div className="px-6 md:px-7 pb-7 pt-0 text-[#5A5A5A] leading-relaxed relative">
                      <div className="absolute left-7 top-0 bottom-7 w-[3px] bg-gradient-to-b from-[#969423] to-transparent rounded opacity-30" />
                      <div className="pl-5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[rgba(150,148,35,0.08)] text-[#7A7719] font-['Montserrat'] font-semibold text-[0.7rem] uppercase tracking-wider rounded mb-3">
                          {faq.category}
                        </span>
                        <p className="mb-4">{faq.answer}</p>
                        <div className="flex items-start gap-3 mt-4 p-4 bg-[rgba(230,184,0,0.08)] rounded-xl border-l-[3px] border-[#E6B800]">
                          <Lightbulb className="w-5 h-5 text-[#C99E00] flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-[#242553] font-medium m-0">{faq.tip}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-10 p-6 bg-white rounded-xl border border-dashed border-[rgba(150,148,35,0.3)]">
              <p className="text-[#5A5A5A] text-[0.95rem] m-0">
                Still have questions? <Link to="/contact" className="text-[#969423] font-semibold underline underline-offset-2 decoration-[rgba(150,148,35,0.3)] hover:decoration-[#969423] transition-colors">Contact our team</Link> — we're here to help.
              </p>
            </div>
          </div>
        </section>

        {/* Download CTA Section */}
        <section id="download" className="bg-[#F8F9FB] py-20 md:py-24" aria-labelledby="download-heading">
          <div className="max-w-[1200px] mx-auto px-6">
            <motion.div 
              className="max-w-[640px] mx-auto bg-white p-12 md:p-14 rounded-3xl text-center shadow-[0_24px_48px_rgba(36,37,83,0.16),0_8px_24px_rgba(36,37,83,0.10)] border-2 border-[#242553] relative overflow-hidden"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#242553] via-[#969423] to-[#E6B800]" />
              
              <div className="w-20 h-20 mx-auto mb-7 bg-gradient-to-br from-[#969423] to-[#7A7719] rounded-[20px] flex items-center justify-center shadow-[0_4px_20px_rgba(150,148,35,0.2)]">
                <Download className="w-10 h-10 text-white" />
              </div>
              
              <h2 id="download-heading" className="font-['Montserrat'] font-bold text-2xl md:text-3xl text-[#242553] mb-4">
                Get Your Free Playbook Today
              </h2>
              <p className="text-[#5A5A5A] text-lg mb-8 max-w-[480px] mx-auto">
                Everything you need to stop guessing and start growing. No signup required. No tricks. Just practical, actionable guidance you can implement this week.
              </p>

              <Button 
                onClick={handleDownload}
                className="bg-gradient-to-r from-[#E6B800] to-[#C99E00] text-[#242553] hover:from-[#F5D54A] hover:to-[#E6B800] font-['Montserrat'] font-semibold text-lg px-10 py-5 h-auto rounded-lg shadow-[0_4px_16px_rgba(230,184,0,0.35)] hover:-translate-y-0.5 transition-all flex items-center gap-3 mx-auto mb-5"
              >
                <BarChart3 className="w-5 h-5" />
                Download Playbook (PDF)
              </Button>

              <p className="text-sm text-[#8E8E9A] italic">
                Your data stays yours. No email required. You're in control.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Assessment CTA Section */}
        <section className="bg-gradient-to-br from-[#242553] to-[#1A1B3D] text-white py-20 md:py-24 relative overflow-hidden" aria-labelledby="assessment-heading">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_80%_40%,rgba(150,148,35,0.15)_0%,transparent_50%),radial-gradient(ellipse_60%_80%_at_20%_80%,rgba(230,184,0,0.1)_0%,transparent_50%)]" />
          <div className="relative z-10 max-w-[700px] mx-auto px-6 text-center">
            <h2 id="assessment-heading" className="font-['Montserrat'] font-bold text-2xl md:text-3xl lg:text-4xl text-white mb-5">
              Ready to Go Beyond the Playbook?
            </h2>
            <p className="text-lg text-white/90 leading-relaxed mb-5">
              The playbook gives you the foundation for business intelligence. But which metrics should <em>you</em> focus on? Where are your biggest blind spots compared to similar businesses in your industry?
            </p>

            <ul className="inline-block text-left my-8 space-y-4">
              {[
                'Comprehensive business health analysis across 200+ indicators',
                'Benchmarking against thousands of similar businesses',
                'Personalized roadmap for data-driven growth',
                'Actionable priorities you can implement immediately',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3.5 text-white/90">
                  <span className="w-6 h-6 flex items-center justify-center bg-[#969423] text-white rounded-full font-bold text-xs flex-shrink-0 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-lg text-white/90 mb-8">
              <strong>A BizHealth.ai diagnostic</strong> is like getting a complete physical for your business—so you know exactly where to focus first.
            </p>

            <Link to="/how-it-works">
              <Button className="bg-white text-[#242553] hover:bg-[#969423] hover:text-white border-2 border-white hover:border-[#969423] font-['Montserrat'] font-semibold text-base px-8 py-5 h-auto rounded-lg transition-all">
                Explore BizHealth.ai Assessment
              </Button>
            </Link>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gray-100 py-16 md:py-20 text-center relative" aria-labelledby="final-heading">
          <div className="max-w-[600px] mx-auto px-6">
            <h2 id="final-heading" className="font-['Montserrat'] font-bold text-2xl md:text-3xl text-[#242553] mb-5">
              Your Data. Your Decisions. Your Competitive Edge.
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              The Business Intelligence Builder Playbook is your first step toward clarity. Everything else—from data connection to team alignment—flows from the foundation you'll build here.
            </p>
            <p className="text-[#969423] font-semibold text-lg">
              Download now and start moving from guesswork to growth.
            </p>
          </div>
        </section>
      </main>

      <GradientDivider variant="green-gold" height="h-1" />
      <GlobalFooter />
    </>
  );
};

export default BusinessIntelligenceBuilder;
