import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Download, 
  ChevronRight, 
  Check, 
  Mail, 
  Building2, 
  User, 
  ArrowRight,
  MessageSquare,
  BarChart3,
  Target,
  Users,
  ClipboardCheck,
  TrendingUp,
  AlertTriangle,
  Shield,
  Sparkles,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import PromotionalBanner from "@/components/PromotionalBanner";
import { trackDownload, trackCTAClick, trackScrollDepth, trackTimeOnPage } from "@/utils/analytics";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import bizHealthStackedLogo from "@/assets/images/bizhealth-stacked-logo.jpg";

const VoiceOfCustomerChecklist = () => {
  const pdfPath = "/downloads/Customer-Feedback-Collection-Checklist-BizHealth.pdf";
  const pdfDownloadName = "BizHealth-Customer-Feedback-Collection-Checklist.pdf";
  const pagePath = "/bizgrowth/voice-of-customer-checklist";
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    gdprConsent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Track time on page
  const startTimeRef = useRef(Date.now());
  const scrollMilestonesRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
      trackTimeOnPage(timeSpent, pagePath);
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      const milestones = [25, 50, 75, 100];
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !scrollMilestonesRef.current.has(milestone)) {
          scrollMilestonesRef.current.add(milestone);
          trackScrollDepth(milestone, pagePath);
        }
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate input
      const schema = z.object({
        name: z.string().trim().min(1, "Name is required").max(100),
        email: z.string().trim().email("Invalid email").max(255),
        businessName: z.string().trim().max(200).optional(),
        gdprConsent: z.literal(true, { errorMap: () => ({ message: "You must consent to receive the checklist" }) })
      });

      const validatedData = schema.parse(formData);

      // Submit to edge function
      const payload = {
        type: 'checklist_download',
        email: validatedData.email,
        name: validatedData.name,
        businessName: validatedData.businessName || '',
        checklist: 'voice-of-customer',
        source: pagePath
      };

      const { error } = await supabase.functions.invoke('send-notification', {
        body: payload,
      });

      if (error) throw error;

      // Track conversion
      trackDownload({
        fileName: 'Customer-Feedback-Collection-Checklist',
        fileType: 'pdf',
        source: pagePath,
        category: 'lead_magnet',
        value: 0,
      });

      trackCTAClick('Download Checklist - Form Submit', pdfPath, 'conversion');

      setIsSubmitted(true);

      toast({
        title: "Success! Check your email.",
        description: "Your checklist is on its way. Download also available below.",
      });

    } catch (error: any) {
      console.error('Form submission error:', error);
      toast({
        title: "Something went wrong",
        description: error?.message || "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: ClipboardCheck,
      title: "37 Actionable Checkpoints",
      description: "Step-by-step framework covering preparation, survey design, collection channels, analysis, and continuous improvement."
    },
    {
      icon: Target,
      title: "Proven Question Templates",
      description: "Ready-to-use questions including NPS, satisfaction scales, and open-ended prompts that get real, usable answers."
    },
    {
      icon: BarChart3,
      title: "Data Analysis Framework",
      description: "Learn how to segment responses, identify patterns, and translate feedback into strategic business decisions."
    },
    {
      icon: TrendingUp,
      title: "Action Planning Guide",
      description: "Close the feedback loop with structured response processes that build customer trust and loyalty."
    }
  ];

  const stats = [
    { value: "80%", label: "of businesses think they deliver superior experience", color: "text-biz-green" },
    { value: "24%", label: "of customers actually agree", color: "text-destructive" },
    { value: "56%", label: "perception gap costing you customers", color: "text-biz-gold" }
  ];

  const trustIndicators = [
    "Designed by business operations experts",
    "Based on proven VoC methodologies",
    "Used by 500+ small businesses",
    "Instant download—no waiting"
  ];

  const checklistSections = [
    { number: 1, title: "Preparation & Goals", items: 5 },
    { number: 2, title: "Survey & Question Design", items: 6 },
    { number: 3, title: "Collection Channels", items: 7 },
    { number: 4, title: "Sample & Outreach", items: 6 },
    { number: 5, title: "Analyze & Interpret", items: 6 },
    { number: 6, title: "Take Action", items: 4 },
    { number: 7, title: "Continuous Improvement", items: 3 }
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO
        title="FREE Voice of Customer Checklist | Customer Feedback Collection Guide"
        description="Download the free Voice of Customer Checklist—37 actionable steps to collect customer feedback. 80% of businesses think they deliver great experience, only 24% of customers agree. Bridge the perception gap with proven VoC methodology."
        keywords="free voice of customer checklist, voice of customer, VoC checklist, customer feedback checklist, customer feedback collection, free customer feedback template, customer experience checklist, NPS survey template, customer satisfaction survey, VoC program, voice of customer program, customer insight collection, feedback loop, customer research checklist, free VoC template, VoC framework, customer listening, customer perception gap, customer experience gap, close feedback loop, small business feedback, SMB customer feedback, VoC methodology, collect customer feedback, how to get customer feedback, customer voice, understanding customers, free business checklist, free download checklist, bizhealth checklist, bizgrowth checklist"
        canonical="https://bizhealth.ai/bizgrowth/voice-of-customer-checklist"
        ogType="website"
        ogImage="/og-images/og-voice-of-customer-checklist.jpg"
      />

      <StructuredData type="organization" />

      <StructuredData
        type="creativeWork"
        name="Customer Feedback Collection Checklist"
        description="A comprehensive 37-point checklist for systematically collecting, analyzing, and acting on customer feedback to improve business performance."
        url="https://bizhealth.ai/bizgrowth/voice-of-customer-checklist"
        datePublished="2026-01-21"
      />

      {/* Sticky Banner */}
      <PromotionalBanner />

      {/* Global Navigation */}
      <GlobalNavigation />

      {/* Green Accent Bar */}
      <div className="h-[5px] bg-biz-green w-full mt-20" />

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-biz-navy via-biz-navy to-[#1a1a3d] overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 border-2 border-biz-lime rounded-full px-4 py-2 text-white">
                <Sparkles className="w-4 h-4 text-biz-lime" />
                <span className="text-biz-lime font-semibold">FREE Voice of Customer Checklist</span>
              </div>

              {/* Headline */}
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                <span className="text-biz-green">80%</span> of Businesses Think They Deliver Great Experience.
                <span className="block mt-2">Only <span className="text-destructive">24%</span> of Customers Agree.</span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg lg:text-xl text-white/90 leading-relaxed max-w-xl">
                Close the <strong className="text-biz-gold">56% perception gap</strong> with our systematic Customer Feedback Collection Checklist—the same framework top-performing businesses use to truly understand their customers.
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-white/20">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`text-2xl lg:text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs lg:text-sm text-white/70 leading-tight mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Trust Indicators */}
              <div className="space-y-2">
                {trustIndicators.map((indicator, index) => (
                  <div key={index} className="flex items-center gap-2 text-white/80 text-sm">
                    <Check className="w-4 h-4 text-biz-green flex-shrink-0" />
                    <span>{indicator}</span>
                  </div>
                ))}
              </div>

              {/* Link to Blog */}
              <Link 
                to="/blog/voice-of-customer-truth"
                className="inline-flex items-center gap-2 text-biz-green hover:text-biz-green/80 transition-colors mt-4"
                onClick={() => trackCTAClick('Read Blog Post', '/blog/voice-of-customer-truth', 'engagement')}
              >
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-medium">Read the full article: "The Voice of Customer Truth"</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right Column - Email Capture Form */}
            <div className="lg:pl-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  {/* Form Header */}
                  <div className="bg-gradient-to-r from-biz-green to-[#b8b83a] px-6 py-5 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <Download className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="font-heading font-bold text-lg">Get Your Free Checklist</h2>
                        <p className="text-white/90 text-sm">Delivered instantly to your inbox</p>
                      </div>
                    </div>
                  </div>

                  {/* Form Body */}
                  <div className="p-6">
                    {!isSubmitted ? (
                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        {/* Name Field */}
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-biz-navy font-medium">
                            Your Name <span className="text-destructive">*</span>
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="name"
                              type="text"
                              placeholder="John Smith"
                              value={formData.name}
                              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                              required
                              className="pl-10 border-border focus:border-biz-green focus:ring-biz-green"
                            />
                          </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-biz-navy font-medium">
                            Email Address <span className="text-destructive">*</span>
                          </Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="john@company.com"
                              value={formData.email}
                              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                              required
                              className="pl-10 border-border focus:border-biz-green focus:ring-biz-green"
                            />
                          </div>
                        </div>

                        {/* Business Name Field */}
                        <div className="space-y-2">
                          <Label htmlFor="businessName" className="text-biz-navy font-medium">
                            Business Name <span className="text-muted-foreground text-sm">(optional)</span>
                          </Label>
                          <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="businessName"
                              type="text"
                              placeholder="Acme Inc."
                              value={formData.businessName}
                              onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                              className="pl-10 border-border focus:border-biz-green focus:ring-biz-green"
                            />
                          </div>
                        </div>

                        {/* GDPR Consent */}
                        <div className="flex items-start gap-3 pt-2">
                          <Checkbox
                            id="gdprConsent"
                            checked={formData.gdprConsent}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, gdprConsent: checked === true }))}
                            className="mt-0.5 border-biz-navy data-[state=checked]:bg-biz-green data-[state=checked]:border-biz-green"
                          />
                          <Label htmlFor="gdprConsent" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                            I agree to receive the checklist and occasional insights from BizHealth.ai. You can unsubscribe anytime. <Link to="/privacy" className="text-biz-green hover:underline">Privacy Policy</Link>
                          </Label>
                        </div>

                        {/* Submit Button */}
                        <Button
                          type="submit"
                          disabled={isSubmitting || !formData.gdprConsent}
                          className="w-full bg-gradient-to-r from-biz-green to-[#b8b83a] hover:from-[#7a7a1c] hover:to-biz-green text-white font-semibold text-lg py-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            "Sending..."
                          ) : (
                            <>
                              <Download className="w-5 h-5 mr-2" />
                              Get Your Free Checklist
                            </>
                          )}
                        </Button>

                        <p className="text-xs text-center text-muted-foreground">
                          <Shield className="w-3 h-3 inline-block mr-1" />
                          Your data is secure. We never share your information.
                        </p>
                      </form>
                    ) : (
                      /* Success State */
                      <div className="text-center py-6 space-y-4">
                        <div className="w-16 h-16 rounded-full bg-biz-green/10 flex items-center justify-center mx-auto">
                          <Check className="w-8 h-8 text-biz-green" />
                        </div>
                        <h3 className="font-heading font-bold text-xl text-biz-navy">Check Your Inbox!</h3>
                        <p className="text-muted-foreground">
                          Your checklist is on its way. You can also download it directly below.
                        </p>
                        <Button
                          asChild
                          className="w-full bg-biz-green hover:bg-biz-green/90 text-white font-semibold"
                        >
                          <a href={pdfPath} download={pdfDownloadName}>
                            <Download className="w-4 h-4 mr-2" />
                            Download Now
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL GET SECTION */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-biz-green font-semibold text-sm tracking-widest uppercase mb-4 block">
              WHAT'S INSIDE
            </span>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-biz-navy mb-4">
              Everything You Need to Collect <span className="text-biz-green">Actionable</span> Feedback
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              This isn't just another checklist. It's a complete system for understanding what your customers really think—and what to do about it.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-biz-green/10 to-biz-navy/5 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-biz-green" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-biz-navy mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Checklist Preview */}
          <div className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-biz-navy to-biz-navy/90 px-6 py-4">
              <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-biz-green" />
                7 Sections, 37 Actionable Checkpoints
              </h3>
            </div>
            <div className="p-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {checklistSections.map((section) => (
                  <div key={section.number} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-biz-green/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-biz-green font-bold text-sm">{section.number}</span>
                    </div>
                    <div>
                      <div className="font-medium text-biz-navy text-sm">{section.title}</div>
                      <div className="text-xs text-muted-foreground">{section.items} items</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF / TRUST SECTION */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Quote Box */}
            <div className="bg-gradient-to-br from-biz-navy to-biz-navy/95 rounded-2xl p-8 lg:p-12 text-center relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-4 left-4 text-6xl text-biz-green/20 font-serif">"</div>
              <div className="absolute bottom-4 right-4 text-6xl text-biz-green/20 font-serif rotate-180">"</div>

              <MessageSquare className="w-12 h-12 text-biz-green mx-auto mb-6" />

              <blockquote className="text-xl lg:text-2xl text-white leading-relaxed mb-6 relative z-10">
                "Your customers hold the truth about your business—what's working, what's breaking, and what opportunities you're missing. Yet most business owners never systematically collect customer feedback."
              </blockquote>

              <div className="text-biz-green font-semibold">
                — The Result: Blind spots become expensive problems.
              </div>
            </div>

            {/* Trust Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-biz-navy">5+</div>
                <div className="text-muted-foreground text-sm mt-1">Pages of Actionable Content</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-biz-green">7</div>
                <div className="text-muted-foreground text-sm mt-1">Step-by-Step Sections</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-biz-gold">37</div>
                <div className="text-muted-foreground text-sm mt-1">Actionable Checkpoints</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECONDARY CTA - Business Health Assessment */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-biz-navy via-biz-navy to-[#1a1a3d]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-biz-gold font-semibold text-sm tracking-widest uppercase mb-4 block">
              READY FOR DEEPER INSIGHTS?
            </span>

            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-6">
              Customer Feedback Is Just One Piece of the Puzzle
            </h2>

            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              The <strong className="text-white">BizHealth Assessment</strong> analyzes your entire business across 12 critical dimensions—including customer experience, operations, finances, and leadership—to uncover exactly where you're leaving money on the table.
            </p>

            {/* Assessment Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { stat: "12", label: "Business Dimensions" },
                { stat: "90 Min", label: "Average Completion" },
                { stat: "One-Time", label: "Investment" },
                { stat: "Actionable", label: "Priority Roadmap" }
              ].map((item, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-biz-green">{item.stat}</div>
                  <div className="text-sm text-white/70">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-biz-gold to-[#c9a000] hover:from-[#b8a600] hover:to-biz-gold text-biz-navy font-semibold text-lg px-8 py-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                onClick={() => trackCTAClick('View Pricing', '/pricing', 'conversion')}
              >
                <Link to="/pricing">
                  View Pricing
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-biz-navy font-semibold text-lg px-8 py-6 rounded-lg transition-all duration-300"
                onClick={() => trackCTAClick('Start Assessment', '/onboarding', 'conversion')}
              >
                <Link to="/onboarding">
                  Start Your Assessment
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-biz-navy mb-4">
              Stop Guessing What Your Customers Think
            </h2>
            <p className="text-muted-foreground mb-8">
              Download the Customer Feedback Collection Checklist and start building a systematic approach to understanding your customers today.
            </p>

            {isSubmitted ? (
              <Button
                asChild
                size="lg"
                className="bg-biz-green hover:bg-biz-green/90 text-white font-semibold"
              >
                <a href={pdfPath} download={pdfDownloadName}>
                  <Download className="w-5 h-5 mr-2" />
                  Download Your Checklist
                </a>
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-biz-green hover:bg-biz-green/90 text-white font-semibold"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Get Your Free Checklist
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Gradient Divider */}
      <div className="h-1 bg-gradient-to-r from-biz-green via-biz-gold to-biz-green" />

      <GlobalFooter />
    </div>
  );
};

export default VoiceOfCustomerChecklist;
