import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  DollarSign, 
  BarChart3, 
  Target, 
  Users, 
  CheckCircle, 
  Clock, 
  FileText,
  Compass,
  Wrench,
  RefreshCw,
  TrendingUp,
  BookOpen,
  Video,
  Download
} from "lucide-react";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import PromotionalBanner from "@/components/PromotionalBanner";

const BizGrowthLaunch = () => {
  const [activeTab, setActiveTab] = useState("all");

  const launchPath = [
    {
      step: 1,
      title: "Baseline Your Business Health",
      outcome: "Understand your BizHealth report and choose 3–5 immediate priorities.",
      course: "Baseline Your Business Health in 90 Minutes",
      meta: "~90 minutes total, self-paced",
      tags: ["Strategy", "Foundations"],
      hasTemplates: true,
      icon: Compass,
      downloadUrl: "/downloads/baseline-your-business-health-course.docx"
    },
    {
      step: 2,
      title: "Fix the Cash Squeeze",
      outcome: "Build simple models for cash flow, profit, and runway.",
      course: "Founder Finance Fundamentals: Cash Flow, Profit, and Runway",
      meta: "3 short modules, each under 45 minutes",
      tags: ["Financials", "Foundations"],
      hasTemplates: true,
      icon: DollarSign
    },
    {
      step: 3,
      title: "From Gut Feel to Data",
      outcome: "Set up a basic KPI scorecard (8–12 metrics).",
      course: "From Gut Feel to Data: Simple KPIs for Early-Stage SMBs",
      meta: "4 modules, ~2 hours total",
      tags: ["Strategy", "Operations"],
      hasTemplates: true,
      icon: BarChart3
    },
    {
      step: 4,
      title: "Design Your First Go-to-Market",
      outcome: "Clarify offers, channels, and pricing for sustainable demand.",
      course: "Design Your First Go-To-Market: Channels, Offers, and Pricing",
      meta: "5 modules, ~3 hours total",
      tags: ["Sales", "Marketing"],
      hasTemplates: true,
      icon: Target
    },
    {
      step: 5,
      title: "Hire Your First 5 Roles",
      outcome: "Define roles, culture basics, and compliance foundations.",
      course: "Hiring Your First 5 Roles, Culture, and Compliance Basics",
      meta: "3 modules, ~2 hours total",
      tags: ["HR", "Operations"],
      hasTemplates: true,
      icon: Users
    }
  ];

  const resources = [
    // Courses
    {
      title: "Baseline Your Business Health in 90 Minutes",
      type: "Course",
      tags: ["Strategy", "Foundations"],
      benefit: "Turn your diagnostic into a 90-day action plan",
      category: "course"
    },
    {
      title: "Founder Finance Fundamentals",
      type: "Course",
      tags: ["Financials", "Foundations"],
      benefit: "Master cash flow before it masters you",
      category: "course"
    },
    {
      title: "From Gut Feel to Data",
      type: "Course",
      tags: ["Strategy", "Operations"],
      benefit: "Build your first KPI dashboard in a week",
      category: "course"
    },
    {
      title: "Design Your First Go-To-Market",
      type: "Course",
      tags: ["Sales", "Marketing"],
      benefit: "Stop random acts of marketing forever",
      category: "course"
    },
    {
      title: "Hiring Your First 5 Roles",
      type: "Course",
      tags: ["HR", "Operations"],
      benefit: "Avoid the costly hiring mistakes most founders make",
      category: "course"
    },
    // Workshops
    {
      title: "Live Report Review: Turn Your BizHealth Score into a 90-Day Action Plan",
      type: "Live Workshop",
      tags: ["Strategy", "Coaching"],
      benefit: "Get personalized guidance on your priorities",
      category: "workshop"
    },
    // Templates
    {
      title: "Weekly Operating Rhythm Template",
      type: "Template",
      tags: ["Operations", "Foundations"],
      benefit: "Create consistency in just 30 minutes/week",
      category: "template"
    },
    {
      title: "Cash Flow Tracker",
      type: "Playbook",
      tags: ["Financials", "Foundations"],
      benefit: "See your runway at a glance, updated weekly",
      category: "template"
    },
    {
      title: "Simple Sales Pipeline",
      type: "Template",
      tags: ["Sales", "Marketing"],
      benefit: "Track every deal from lead to close",
      category: "template"
    },
    {
      title: "One-Page Strategy Canvas",
      type: "Template",
      tags: ["Strategy", "Foundations"],
      benefit: "Align your team on what matters most",
      category: "template"
    },
    {
      title: "90-Day Roadmap Planner",
      type: "Playbook",
      tags: ["Strategy", "Operations"],
      benefit: "Break big goals into weekly milestones",
      category: "template"
    },
    {
      title: "Basic Contract Checklist",
      type: "Template",
      tags: ["HR", "Legal"],
      benefit: "Protect your business from common oversights",
      category: "template"
    }
  ];

  const filteredResources = activeTab === "all" 
    ? resources 
    : resources.filter(r => r.category === activeTab);

  const courseListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "BizGrowth Academy Launch Path Courses",
    "description": "Structured learning path for early-stage business owners to build foundations in 90 days",
    "itemListElement": launchPath.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Course",
        "name": item.course,
        "description": item.outcome,
        "provider": {
          "@type": "Organization",
          "name": "BizHealth.ai",
          "sameAs": "https://bizhealth.ai"
        }
      }
    }))
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="BizGrowth Academy Launch | Early-Stage Business Health & Growth"
        description="Build stable foundations for your 0-3 year business. The Launch path helps overwhelmed founders fix cash flow, establish KPIs, and create a 90-day action plan."
        keywords="SMB business health, business health assessment, early-stage business growth, launch-stage business foundations, cash flow training founders, SMB growth academy, KPI training small business"
        canonical="https://bizhealth.ai/bizgrowth/launch"
        ogType="website"
        ogImage="https://bizhealth.ai/og-bizgrowth-launch.jpg"
      />
      
      {/* Course List Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseListSchema) }} />
      
      <StructuredData
        type="service"
        name="BizGrowth Academy Launch Path"
        description="Prescribed learning path for early-stage SMB owners to stabilize cash flow, establish KPIs, and build operational foundations in 90 days."
        provider="BizHealth.ai"
        areaServed="United States"
        url="https://bizhealth.ai/bizgrowth/launch"
      />
      
      <PromotionalBanner />
      
      {/* Add spacing for fixed banner */}
      <div className="h-20" />
      
      <GlobalNavigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-biz-navy via-biz-navy to-biz-navy-deep text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-biz-citrine/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-biz-green/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-4">
              <Badge className="bg-biz-citrine/20 text-biz-citrine border-biz-citrine/30 font-open-sans text-xs">
                Prescribed next step from your BizHealth report
              </Badge>
            </div>
            
            <h1 className="font-montserrat font-bold text-4xl lg:text-5xl xl:text-6xl mb-6 text-white leading-tight">
              Stabilize Cash, Systems & Clarity in 90 Days
            </h1>
            
            <p className="font-open-sans text-lg lg:text-xl text-white/85 mb-4">
              Built for founder-led businesses with $100K–$1M revenue in years 1–3 who feel reactive instead of strategic.
            </p>
            
            <p className="font-open-sans text-base text-white/70 mb-8">
              The Launch path transforms your BizHealth insights into a structured 90-day execution plan — so you stop firefighting and start building foundations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-biz-citrine text-biz-navy hover:bg-biz-citrine/90 font-montserrat font-semibold text-lg px-8 py-6"
              >
                Start my Launch path
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-biz-navy font-open-sans text-lg"
              >
                View Launch course list
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Snapshot Section */}
      <section className="py-16 lg:py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-montserrat font-bold text-2xl lg:text-3xl text-foreground mb-4">
                You're likely here if...
              </h2>
              <p className="font-open-sans text-muted-foreground text-lg">
                These challenges feel familiar to most early-stage founders we work with:
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border/50 shadow-card hover:shadow-hub-citrine hover:border-biz-citrine/50 hover:-translate-y-1 transition-all duration-300 cursor-default group">
                <DollarSign className="w-5 h-5 text-biz-citrine flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <p className="font-open-sans text-foreground">
                  <strong className="text-biz-navy">Cash feels tight most months</strong> and you don't have a clear view of runway
                </p>
              </div>
              <div className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border/50 shadow-card hover:shadow-hub-citrine hover:border-biz-citrine/50 hover:-translate-y-1 transition-all duration-300 cursor-default group">
                <BarChart3 className="w-5 h-5 text-biz-citrine flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <p className="font-open-sans text-foreground">
                  <strong className="text-biz-navy">Most decisions are based on instincts</strong> because there's no simple KPI dashboard
                </p>
              </div>
              <div className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border/50 shadow-card hover:shadow-hub-citrine hover:border-biz-citrine/50 hover:-translate-y-1 transition-all duration-300 cursor-default group">
                <Target className="w-5 h-5 text-biz-citrine flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <p className="font-open-sans text-foreground">
                  <strong className="text-biz-navy">Sales and marketing are one-off efforts</strong>, not a repeatable process
                </p>
              </div>
              <div className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border/50 shadow-card hover:shadow-hub-citrine hover:border-biz-citrine/50 hover:-translate-y-1 transition-all duration-300 cursor-default group">
                <Clock className="w-5 h-5 text-biz-citrine flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <p className="font-open-sans text-foreground">
                  <strong className="text-biz-navy">You're doing everything</strong> and there's no basic operating rhythm
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Launch Gives You */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl lg:text-4xl text-foreground mb-4">
              What the Launch Path Gives You
            </h2>
            <p className="font-open-sans text-lg text-muted-foreground max-w-2xl mx-auto">
              A bundled solution that turns your BizHealth diagnostic into real business progress — not another random course collection.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border/50 shadow-card hover:shadow-hub-citrine transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="bg-biz-citrine/10 rounded-lg p-3 w-fit mb-3">
                  <Compass className="w-6 h-6 text-biz-citrine" />
                </div>
                <CardTitle className="font-montserrat text-lg">Prescribed Learning Path</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-open-sans">
                  Transform your BizHealth report into a clear 90-day action plan — no guessing what to learn next.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-border/50 shadow-card hover:shadow-hub-citrine transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="bg-biz-citrine/10 rounded-lg p-3 w-fit mb-3">
                  <BookOpen className="w-6 h-6 text-biz-citrine" />
                </div>
                <CardTitle className="font-montserrat text-lg">Practical Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-open-sans">
                  Short, focused modules on cash, KPIs, go-to-market, and first hires — each under 45 minutes.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-border/50 shadow-card hover:shadow-hub-citrine transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="bg-biz-citrine/10 rounded-lg p-3 w-fit mb-3">
                  <FileText className="w-6 h-6 text-biz-citrine" />
                </div>
                <CardTitle className="font-montserrat text-lg">Ready-to-Use Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-open-sans">
                  Downloadable playbooks for cash tracking, weekly rhythm, pipeline, and 90-day roadmaps.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="border-border/50 shadow-card hover:shadow-hub-citrine transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="bg-biz-citrine/10 rounded-lg p-3 w-fit mb-3">
                  <Users className="w-6 h-6 text-biz-citrine" />
                </div>
                <CardTitle className="font-montserrat text-lg">Optional Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-open-sans">
                  BizGuides coaching and BizTools AI templates to "do it with you" or "do it faster."
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recommended Launch Path Stepper */}
      <section className="py-16 lg:py-24 bg-biz-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-3xl lg:text-4xl mb-4">
              Your Recommended Launch Path
            </h2>
            <p className="font-open-sans text-lg text-white/80 max-w-2xl mx-auto">
              A structured 5-step sequence with clear outcomes and time estimates. Complete at your own pace.
            </p>
          </div>
          
          {/* Desktop Stepper */}
          <div className="hidden lg:block mb-12">
            <div className="flex justify-between items-start relative">
              {/* Connection Line */}
              <div className="absolute top-8 left-[10%] right-[10%] h-0.5 bg-biz-citrine/30"></div>
              
              {launchPath.map((item, index) => (
                <div key={index} className="flex flex-col items-center w-1/5 relative z-10">
                  <div className="bg-biz-citrine text-biz-navy rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-lg">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <div className="text-center">
                    <div className="font-montserrat font-bold text-sm mb-1">Step {item.step}</div>
                    <h3 className="font-montserrat font-semibold text-base mb-2">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile/Tablet Cards */}
          <div className="space-y-6">
            {launchPath.map((item, index) => (
              <Card key={index} className="bg-white/15 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-biz-citrine text-biz-navy rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge className="bg-biz-citrine/20 text-biz-citrine border-biz-citrine/30 text-xs">
                          Step {item.step}
                        </Badge>
                        {item.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-white/70 border-white/20 text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {item.hasTemplates && (
                          <Badge className="bg-biz-green/20 text-biz-green-light border-biz-green/30 text-xs">
                            <FileText className="w-3 h-3 mr-1" />
                            Includes templates
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-montserrat font-bold text-xl text-white mb-2">{item.title}</h3>
                      <p className="font-open-sans text-white/80 mb-2">{item.outcome}</p>
                      <p className="font-open-sans text-sm text-white/60 mb-1">
                        <strong>Course:</strong> {item.course}
                      </p>
                      <p className="font-open-sans text-xs text-biz-citrine mb-4">{item.meta}</p>
                      {item.downloadUrl ? (
                        <Button 
                          className="bg-biz-citrine text-biz-navy hover:bg-biz-citrine/90 font-montserrat font-semibold text-sm"
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = item.downloadUrl;
                            link.download = '';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Start this step
                        </Button>
                      ) : (
                        <Button className="bg-biz-citrine text-biz-navy hover:bg-biz-citrine/90 font-montserrat font-semibold text-sm">
                          Start this step
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              className="border-biz-citrine text-biz-citrine hover:bg-biz-citrine hover:text-biz-navy font-montserrat font-semibold"
            >
              See full Launch curriculum
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Resource Grid Section */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl lg:text-4xl text-foreground mb-4">
              Launch Resources
            </h2>
            <p className="font-open-sans text-lg text-muted-foreground max-w-2xl mx-auto">
              Courses, workshops, and templates to build your business foundations.
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-muted">
                <TabsTrigger value="all" className="font-montserrat">All</TabsTrigger>
                <TabsTrigger value="course" className="font-montserrat">Courses</TabsTrigger>
                <TabsTrigger value="workshop" className="font-montserrat">Workshops</TabsTrigger>
                <TabsTrigger value="template" className="font-montserrat">Templates</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value={activeTab} className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource, index) => (
                  <Card key={index} className="border-border/50 shadow-card hover:shadow-hub-citrine transition-all duration-300 group">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 mb-2">
                        {resource.type === "Course" && <BookOpen className="w-4 h-4 text-biz-citrine" />}
                        {resource.type === "Live Workshop" && <Video className="w-4 h-4 text-biz-teal" />}
                        {(resource.type === "Template" || resource.type === "Playbook") && <Download className="w-4 h-4 text-biz-copper" />}
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            resource.type === "Course" ? "border-biz-citrine/50 text-biz-citrine" :
                            resource.type === "Live Workshop" ? "border-biz-teal/50 text-biz-teal" :
                            "border-biz-copper/50 text-biz-copper"
                          }`}
                        >
                          {resource.type}
                        </Badge>
                      </div>
                      <CardTitle className="font-montserrat text-lg leading-tight group-hover:text-biz-navy transition-colors">
                        {resource.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {resource.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="text-xs font-open-sans">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <CardDescription className="font-open-sans text-sm mb-4">
                        {resource.benefit}
                      </CardDescription>
                      <Button variant="ghost" size="sm" className="text-biz-citrine hover:text-biz-navy hover:bg-biz-citrine/10 font-montserrat p-0">
                        {resource.type.includes("Template") || resource.type === "Playbook" ? "Get template" : "View details"}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Cross-Links Section */}
      <section className="py-16 lg:py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-montserrat font-bold text-2xl lg:text-3xl text-foreground text-center mb-12">
            Need More Support?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-border/50 shadow-card hover:shadow-hub-teal transition-all duration-300 text-center">
              <CardContent className="pt-8 pb-6">
                <div className="bg-biz-teal/10 rounded-full p-4 w-fit mx-auto mb-4">
                  <Compass className="w-8 h-8 text-biz-teal" />
                </div>
                <h3 className="font-montserrat font-bold text-lg mb-2">BizGuides Coaching</h3>
                <p className="font-open-sans text-muted-foreground text-sm mb-4">
                  Want a coach to walk through your Launch roadmap with you?
                </p>
                <Link to="/bizguides">
                  <Button variant="outline" className="border-biz-teal text-biz-teal hover:bg-biz-teal hover:text-white font-montserrat text-sm">
                    Explore BizGuides coaching
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="border-border/50 shadow-card hover:shadow-hub-copper transition-all duration-300 text-center">
              <CardContent className="pt-8 pb-6">
                <div className="bg-biz-copper/10 rounded-full p-4 w-fit mx-auto mb-4">
                  <Wrench className="w-8 h-8 text-biz-copper" />
                </div>
                <h3 className="font-montserrat font-bold text-lg mb-2">BizTools Templates</h3>
                <p className="font-open-sans text-muted-foreground text-sm mb-4">
                  Use AI-powered templates to implement Launch faster.
                </p>
                <Link to="/biztools">
                  <Button variant="outline" className="border-biz-copper text-biz-copper hover:bg-biz-copper hover:text-white font-montserrat text-sm">
                    Browse BizTools templates
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="border-border/50 shadow-card hover:shadow-hub-lime transition-all duration-300 text-center">
              <CardContent className="pt-8 pb-6">
                <div className="bg-biz-lime/10 rounded-full p-4 w-fit mx-auto mb-4">
                  <RefreshCw className="w-8 h-8 text-biz-lime" />
                </div>
                <h3 className="font-montserrat font-bold text-lg mb-2">Re-run Your Assessment</h3>
                <p className="font-open-sans text-muted-foreground text-sm mb-4">
                  Re-assess after 90 days to see progress and unlock your next phase.
                </p>
                <Link to="/how-it-works">
                  <Button variant="outline" className="border-biz-lime text-biz-lime hover:bg-biz-lime hover:text-white font-montserrat text-sm">
                    Re-run my BizHealth assessment
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Proof & Future Path */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Proof Snippet */}
            <div>
              <Card className="border-biz-citrine/20 bg-biz-citrine/5 shadow-hub-citrine">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-8 h-8 text-biz-citrine" />
                    <span className="font-montserrat font-bold text-2xl text-biz-citrine">90%</span>
                  </div>
                  <p className="font-open-sans text-foreground text-lg">
                    of Launch path completers report <strong>clarity on their 3 biggest priorities</strong> within the first week.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-biz-green/20 bg-biz-green/5 shadow-feature mt-4">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="w-8 h-8 text-biz-green" />
                    <span className="font-montserrat font-bold text-2xl text-biz-green">4 weeks</span>
                  </div>
                  <p className="font-open-sans text-foreground text-lg">
                    Average time to set up a <strong>working cash flow model</strong> using our templates.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Future Path */}
            <div>
              <h2 className="font-montserrat font-bold text-2xl lg:text-3xl text-foreground mb-4">
                What Happens After Launch?
              </h2>
              <p className="font-open-sans text-muted-foreground text-lg mb-6">
                As your foundations stabilize, the next recommended step is the <strong className="text-biz-navy">Growth</strong> segment — where you'll build repeatable marketing, sales systems, and operational scale.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Badge className="bg-biz-citrine/20 text-biz-citrine border-biz-citrine/30">Current</Badge>
                  <span className="font-montserrat font-semibold text-foreground">Launch</span>
                  <span className="font-open-sans text-muted-foreground text-sm">— Foundations (You are here)</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border border-dashed border-border">
                  <Badge variant="outline" className="text-muted-foreground">Next</Badge>
                  <span className="font-montserrat font-semibold text-muted-foreground">Growth</span>
                  <span className="font-open-sans text-muted-foreground text-sm">— In development, launching Q2 2026</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-dashed border-border/50">
                  <Badge variant="outline" className="text-muted-foreground/70">Future</Badge>
                  <span className="font-montserrat font-semibold text-muted-foreground/70">Scaling → Enterprise/Exit</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/bizgrowth">
                  <Button variant="outline" className="border-biz-navy text-biz-navy hover:bg-biz-navy hover:text-white font-montserrat">
                    View BizGrowth overview
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
                <Button variant="ghost" className="text-biz-citrine hover:text-biz-navy hover:bg-biz-citrine/10 font-montserrat">
                  Notify me when Growth launches
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-20 bg-biz-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <TrendingUp className="w-12 h-12 text-biz-citrine mx-auto mb-6" />
          <h2 className="font-montserrat font-bold text-3xl lg:text-4xl mb-4">
            Ready to Build Your Foundation?
          </h2>
          <p className="font-open-sans text-xl text-white/85 mb-8 max-w-2xl mx-auto">
            Stop reacting. Start building. The Launch path gives you the structure to stabilize cash, clarity, and systems in 90 days.
          </p>
          <Button 
            size="lg"
            className="bg-biz-citrine text-biz-navy hover:bg-biz-citrine/90 font-montserrat font-semibold text-lg px-10 py-6"
          >
            Start my Launch path
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
};

export default BizGrowthLaunch;
