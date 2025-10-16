import Navigation from "@/components/Navigation";
import GlobalFooter from "@/components/GlobalFooter";
import { CheckCircle, BarChart3, FileText, Download, Clock, Shield } from "lucide-react";
import questionnaireImage from "@/assets/business-assessment-questionnaire.jpg";
import aiAnalysisImage from "@/assets/ai-analysis-benchmarking-dashboard.jpg";
import reportSampleImage from "@/assets/business-health-report-sample.png";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: CheckCircle,
      title: "Choose Your Assessment Tier",
      description: "Select from our three business health assessment levels - Essentials, Growth, or Enterprise - each tailored to your business size and needs.",
      details: ["Quick tier selection based on business size and needs", "Secure payment processing", "Instant access upon confirmation"]
    },
    {
      number: "02", 
      icon: FileText,
      title: "Complete Your Business Assessment",
      description: "Answer our strategically designed questionnaire covering key business dimensions, from financial health to growth strategy.",
      details: ["45-80 questions depending on tier", "Save and resume functionality", "Industry-specific question sets"]
    },
    {
      number: "03",
      icon: BarChart3,
      title: "AI Analysis & Benchmarking",
      description: "Our advanced proprietary AI algorithms analyze your responses against industry benchmarks and best practices to identify opportunities and risks.",
      details: ["Real-time data processing", "Industry comparison analysis", "Risk assessment algorithms"]
    },
    {
      number: "04",
      icon: Download,
      title: "Receive Your Actionable Reports",
      description: "Get your comprehensive business health reports with tailored analyses, priority action items, and strategic roadmaps.",
      details: ["Downloadable PDF format", "Email delivery included", "90-day report updates available"]
    }
  ];

  const features = [
    {
      icon: Clock,
      title: "Time Efficient",
      description: "Complete questionnaire in 20-40 minutes depending on your chosen tier"
    },
    {
      icon: Shield,
      title: "Secure & Confidential", 
      description: "Enterprise-grade security with full data encryption and privacy protection"
    },
    {
      icon: BarChart3,
      title: "Data-Driven Insights",
      description: "Proprietary AI-powered analyses backed by industry benchmarks and best practices"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* StoryBrand Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-background via-muted to-background overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight animate-fade-in">
              Stop Guessing About Your Business's Future—Get Actionable Insights Today.
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed animate-fade-in" style={{ animationDelay: '0.1s' }}>
              As a busy SMB leader facing cash flow hurdles, scaling roadblocks, and hidden risks, you deserve a fast, comprehensive assessment that uncovers opportunities in just 30-40 minutes.
            </p>
            
            {/* Credibility Builder */}
            <div className="flex items-center justify-center gap-2 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CheckCircle className="w-5 h-5 text-growth" />
              <p className="text-sm md:text-base text-muted-foreground font-medium">
                Trusted by 2,500+ SMBs
              </p>
            </div>
            
            {/* CTA Button */}
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <a 
                href="/onboarding"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-elegant hover:shadow-[0_0_40px_hsl(var(--primary)/0.4)]"
              >
                Let's Get Started
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="pt-20 pb-16 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary">
              How BizHealth.ai Works
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Our proven 4-step process transforms your business insights into actionable growth strategies. 
              From assessment to implementation, we guide you through every step of strengthening your business foundation.
            </p>
            <div className="mt-12">
              <img 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80" 
                alt="AI circuit board representing advanced business analytics technology"
                className="rounded-xl shadow-elegant mx-auto max-w-3xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center gap-12 mb-20 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-biz-green text-white font-bold text-xl flex items-center justify-center shadow-elegant">
                      {step.number}
                    </div>
                    <div className="p-3 rounded-xl bg-primary/10">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">{step.title}</h3>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle className="w-5 h-5 text-growth" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 flex justify-center">
                  {index === 0 ? (
                    // Tier matrix snapshot for first step
                    <div className="w-full max-w-[403px] rounded-2xl bg-background border-2 border-border shadow-elegant overflow-hidden">
                      <div className="bg-primary/5 px-4 py-3 border-b border-border">
                        <h3 className="text-sm font-bold text-foreground">Assessment Tiers</h3>
                      </div>
                      <div className="p-4 space-y-3">
                        {/* Essentials */}
                        <div className="border border-border rounded-lg p-3 hover:border-primary/50 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-foreground">Essentials</span>
                            <span className="text-primary font-bold">$199</span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">45-question focused assessment</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CheckCircle className="w-3 h-3 text-growth" />
                            <span>5 Core dimensions</span>
                          </div>
                        </div>
                        
                        {/* Growth */}
                        <div className="border-2 border-primary rounded-lg p-3 bg-primary/5 relative">
                          <div className="absolute -top-2 right-3 bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                            Popular
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-foreground">Growth</span>
                            <span className="text-primary font-bold">$499</span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">75+ question comprehensive assessment</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CheckCircle className="w-3 h-3 text-growth" />
                            <span>12 Advanced dimensions</span>
                          </div>
                        </div>
                        
                        {/* Enterprise */}
                        <div className="border border-border rounded-lg p-3 hover:border-primary/50 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-foreground">Enterprise</span>
                            <span className="text-primary font-bold">$799</span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">Complete business valuation</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CheckCircle className="w-3 h-3 text-growth" />
                            <span>Full analysis + consultant access</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : index === 1 ? (
                    // Questionnaire screenshot for second step
                    <div className="w-full max-w-[288px]">
                      <img 
                        src={questionnaireImage} 
                        alt="BizHealth.ai business assessment questionnaire interface showing rating scale questions"
                        className="rounded-2xl shadow-elegant w-full"
                      />
                    </div>
                  ) : index === 2 ? (
                    // AI Analysis dashboard for third step
                    <div className="w-full max-w-[450px]">
                      <img 
                        src={aiAnalysisImage} 
                        alt="BizHealth.ai AI analytics dashboard showing business metrics, financial health, and performance benchmarking"
                        className="rounded-2xl shadow-elegant w-full"
                      />
                    </div>
                  ) : (
                    // Report sample for fourth step
                    <div className="w-full max-w-[357px]">
                      <img 
                        src={reportSampleImage} 
                        alt="BizHealth.ai comprehensive business health assessment report showing key performance indicators and SWOT analysis"
                        className="rounded-2xl shadow-elegant w-full"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Why Choose Our Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built on decades of business consulting expertise and powered by a proprietary AI technology platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex p-4 rounded-xl bg-background shadow-card mb-6 border border-border/50">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Ready to Unlock Your Business Potential?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of business owners who've transformed their operations with data-driven insights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/pricing" 
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-all duration-300 transform hover:scale-105"
              >
                View Pricing Options
              </a>
              <a 
                href="mailto:support@bizhealth.ai" 
                className="inline-flex items-center justify-center px-8 py-4 border border-border bg-background text-foreground font-semibold rounded-lg hover:bg-muted transition-colors"
              >
                Have Questions?
              </a>
            </div>
          </div>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
};

export default HowItWorks;