import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import PromotionalBanner from "@/components/PromotionalBanner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Leaf, 
  TrendingUp, 
  AlertTriangle, 
  Target,
  Clock,
  ArrowRight,
  CheckCircle2,
  XCircle,
  DollarSign,
  Users,
  BarChart3
} from "lucide-react";

const LandscapingPlaybook = () => {
  // Interactive state
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);
  const [biggestContributor, setBiggestContributor] = useState<string>("");
  const [confidenceAreas, setConfidenceAreas] = useState<{ doingWell: string[]; needsAttention: string[] }>({
    doingWell: [],
    needsAttention: []
  });
  const [costSlider, setCostSlider] = useState<number[]>([50]);
  const [currentSection, setCurrentSection] = useState(0);

  const challenges = [
    "Jobs feel busy but profit feels thin",
    "Pricing hasn't been reviewed in years",
    "Seasonal cash-flow stress",
    "Labor costs keep rising",
    "Growth feels reactive instead of planned"
  ];

  const contributors = [
    "Pricing",
    "Labor efficiency",
    "Cash-flow planning",
    "Seasonal forecasting",
    "All of the above"
  ];

  const confidenceItems = [
    "Pricing based on real costs",
    "Tracking margins by service",
    "Seasonal planning in advance",
    "Understanding time & money flow",
    "Reviewing key metrics regularly",
    "Building systems before scaling"
  ];

  const handleChallengeToggle = (challenge: string) => {
    setSelectedChallenges(prev => 
      prev.includes(challenge) 
        ? prev.filter(c => c !== challenge)
        : [...prev, challenge]
    );
  };

  const handleConfidenceToggle = (item: string, column: 'doingWell' | 'needsAttention') => {
    setConfidenceAreas(prev => {
      const otherColumn = column === 'doingWell' ? 'needsAttention' : 'doingWell';
      return {
        ...prev,
        [column]: prev[column].includes(item) 
          ? prev[column].filter(i => i !== item)
          : [...prev[column], item],
        [otherColumn]: prev[otherColumn].filter(i => i !== item)
      };
    });
  };

  const getSliderLabel = (value: number) => {
    if (value < 25) return "Low";
    if (value < 50) return "Moderate";
    if (value < 75) return "Significant";
    return "Critical";
  };

  const totalSections = 6;
  const progressPercentage = ((currentSection + 1) / totalSections) * 100;

  // FAQ data for structured data
  const faqData = [
    {
      question: "Why do landscaping businesses struggle with profit margins?",
      answer: "Most landscaping businesses underprice their services by 15-30% due to pricing based on competitors rather than actual costs. Combined with seasonal revenue swings, rising labor costs, and limited job-level tracking, even busy companies can struggle to stay profitable."
    },
    {
      question: "What separates successful landscaping businesses from struggling ones?",
      answer: "High-performing landscaping companies price services based on real labor, equipment, and overhead costs; track margins by service type; plan seasonality months in advance; and review key metrics regularly before scaling."
    },
    {
      question: "How can I improve my landscaping business profitability?",
      answer: "Start by understanding your true costs per service, implement margin tracking, plan for seasonal cash flow fluctuations, and establish systems before adding more crews or routes. A business health assessment can identify your specific blind spots."
    }
  ];

  return (
    <>
      <SEO
        title="Landscaping Business Playbook: Fix Thin Margins & Build Profitable Growth | BizHealth.ai"
        description="Free interactive diagnostic for landscaping & lawn-mowing business owners. Discover why margins feel thin despite busy schedules. Get clarity on pricing, cash flow, and sustainable growth strategies."
        keywords="landscaping business profitability, lawn care business margins, landscaping pricing strategy, seasonal cash flow management, landscaping business growth, lawn mowing business tips, landscaping profit optimization, small business diagnostics"
        canonical="https://bizhealth.ai/playbooks/landscaping"
        ogType="article"
        ogImage="https://bizhealth.ai/og-images/og-landscaping-playbook.jpg"
        articlePublishedTime="2024-12-01T00:00:00Z"
        articleModifiedTime="2024-12-20T00:00:00Z"
        articleAuthor="BizHealth.ai"
      />
      <StructuredData
        type="faq"
        questions={faqData}
      />
      <StructuredData
        type="service"
        name="Landscaping & Lawn-Mowing Business Health Assessment"
        description="Interactive business diagnostic tool for landscaping and lawn-mowing service owners. Identify profit drains, optimize pricing, and build sustainable growth strategies."
        provider="BizHealth.ai"
        areaServed="United States"
        url="https://bizhealth.ai/playbooks/landscaping"
      />
      
      <div className="min-h-screen bg-biz-cream">
        <PromotionalBanner />
        <GlobalNavigation />
        
        {/* Progress Indicator - positioned below banner and nav */}
        <div className="fixed top-36 left-0 right-0 z-40 bg-biz-navy shadow-lg">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="flex items-center gap-4">
              <span className="text-xs text-biz-green font-montserrat font-semibold uppercase tracking-wider">Progress</span>
              <div className="flex-1 bg-biz-navy-deep rounded-full h-2.5 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-biz-green to-biz-green-light transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span className="text-sm text-white font-montserrat font-bold">{Math.round(progressPercentage)}%</span>
            </div>
          </div>
        </div>

        <main className="pt-48 pb-16">
          {/* Hero Section */}
          <section 
            className="py-20 md:py-28 px-4 bg-gradient-to-br from-biz-navy via-biz-navy-deep to-biz-navy-light relative overflow-hidden"
            onMouseEnter={() => setCurrentSection(0)}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-biz-green/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-biz-green/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-biz-green/20 border border-biz-green/30 mb-8 shadow-lg">
                <Leaf className="w-10 h-10 text-biz-green" />
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-white mb-8 leading-tight">
                Busy Crews. Full Schedules.<br />
                <span className="text-biz-green drop-shadow-lg">Thin Margins.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 font-open-sans max-w-3xl mx-auto mb-12 leading-relaxed">
                Most landscaping businesses don't struggle because of demand — they struggle because <span className="text-biz-green font-semibold">underpricing, poor planning, and limited visibility</span> quietly drain profit.
              </p>
              
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto mb-12">
                <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <DollarSign className="w-6 h-6 text-biz-green mx-auto mb-2" />
                  <div className="text-2xl md:text-3xl font-montserrat font-bold text-white">15-30%</div>
                  <div className="text-xs md:text-sm text-white/60 font-open-sans">Underpriced</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <Users className="w-6 h-6 text-biz-green mx-auto mb-2" />
                  <div className="text-2xl md:text-3xl font-montserrat font-bold text-white">67%</div>
                  <div className="text-xs md:text-sm text-white/60 font-open-sans">Labor Issues</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <BarChart3 className="w-6 h-6 text-biz-green mx-auto mb-2" />
                  <div className="text-2xl md:text-3xl font-montserrat font-bold text-white">4/5</div>
                  <div className="text-xs md:text-sm text-white/60 font-open-sans">Cash Stress</div>
                </div>
              </div>
              
              <Button 
                variant="growth" 
                size="lg" 
                className="text-lg px-10 py-7 shadow-xl hover:shadow-2xl transition-all bg-biz-green hover:bg-biz-green-light text-biz-navy font-montserrat font-bold"
                asChild
              >
                <Link to="/pricing">
                  Assess Your Business Health
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </section>

          {/* Section 1: The Landscaping Reality */}
          <section 
            className="py-20 px-4 bg-white"
            onMouseEnter={() => setCurrentSection(1)}
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-biz-navy flex items-center justify-center shadow-md">
                  <span className="text-white font-montserrat font-bold text-lg">1</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-biz-navy">
                  The Landscaping Reality
                </h2>
              </div>
              
              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-biz-grey font-open-sans leading-relaxed text-lg">
                  Most landscaping and lawn-mowing businesses work incredibly hard — yet many owners still feel constant financial pressure.
                </p>
                <p className="text-biz-grey font-open-sans leading-relaxed">
                  Industry benchmarks consistently show that a large percentage of landscaping businesses underprice their services by <span className="font-bold text-biz-navy bg-biz-green/10 px-2 py-0.5 rounded">15–30%</span>, often without realizing it. Add seasonal revenue swings, labor challenges, and rising equipment costs, and even "busy" companies can struggle to stay profitable.
                </p>
                <p className="text-biz-navy font-open-sans leading-relaxed italic border-l-4 border-biz-green pl-4 bg-biz-cream py-3 rounded-r-lg">
                  If you've ever wondered why cash feels tight despite full routes and long days, you're not alone.
                </p>
              </div>

              {/* Interactive: Multi-Select */}
              <Card className="border-2 border-biz-green/30 bg-gradient-to-br from-biz-green/5 via-white to-biz-cream shadow-feature">
                <CardContent className="p-8 md:p-10">
                  <h3 className="text-xl font-montserrat font-bold text-biz-navy mb-2">
                    Which of these show up in your business today?
                  </h3>
                  <p className="text-sm text-biz-grey mb-8 font-open-sans">Select all that apply</p>
                  
                  <div className="space-y-4">
                    {challenges.map((challenge) => (
                      <label
                        key={challenge}
                        className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          selectedChallenges.includes(challenge)
                            ? 'border-biz-green bg-biz-green/15 shadow-md transform scale-[1.01]'
                            : 'border-border hover:border-biz-green/50 bg-white hover:shadow-sm'
                        }`}
                      >
                        <Checkbox
                          checked={selectedChallenges.includes(challenge)}
                          onCheckedChange={() => handleChallengeToggle(challenge)}
                          className="w-6 h-6 data-[state=checked]:bg-biz-green data-[state=checked]:border-biz-green"
                        />
                        <span className="text-biz-navy font-open-sans text-lg">{challenge}</span>
                      </label>
                    ))}
                  </div>
                  
                  {selectedChallenges.length > 0 && (
                    <div className="mt-6 p-4 rounded-lg bg-biz-navy/5 border border-biz-navy/10">
                      <p className="text-sm text-biz-navy font-open-sans">
                        <span className="font-semibold text-biz-green">{selectedChallenges.length}</span> challenge{selectedChallenges.length > 1 ? 's' : ''} identified — you're not alone in facing these.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 2: Why This Problem Persists */}
          <section 
            className="py-20 px-4 bg-biz-cream"
            onMouseEnter={() => setCurrentSection(2)}
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-biz-copper flex items-center justify-center shadow-md">
                  <span className="text-white font-montserrat font-bold text-lg">2</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-biz-navy">
                  Why This Problem Persists
                </h2>
              </div>
              
              <p className="text-lg text-biz-grey font-open-sans leading-relaxed mb-8">
                These challenges rarely come from one big mistake. They come from <span className="font-semibold text-biz-navy">systemic gaps</span> that build over time:
              </p>
              
              <ul className="space-y-4 mb-10">
                {[
                  "Pricing based on competitors instead of true costs",
                  "Limited job-level cost tracking",
                  "No clear margin targets",
                  "Seasonal planning done too late",
                  "Decisions made on instinct instead of data"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-border shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                    </div>
                    <span className="text-biz-navy font-open-sans text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="p-6 rounded-xl bg-biz-navy/5 border-l-4 border-biz-navy">
                <p className="text-biz-navy font-open-sans font-medium text-lg italic">
                  Most owners are running the business <span className="text-biz-copper font-bold">inside</span> the work, not <span className="text-biz-green font-bold">above</span> it.
                </p>
              </div>

              {/* Interactive: Single Choice */}
              <Card className="mt-12 border-2 border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50/30 shadow-hub-copper">
                <CardContent className="p-8 md:p-10">
                  <h3 className="text-xl font-montserrat font-bold text-biz-navy mb-2">
                    What feels like the biggest contributor right now?
                  </h3>
                  <p className="text-sm text-biz-grey mb-8 font-open-sans">Select one</p>
                  
                  <RadioGroup value={biggestContributor} onValueChange={setBiggestContributor}>
                    <div className="space-y-4">
                      {contributors.map((contributor) => (
                        <label
                          key={contributor}
                          className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                            biggestContributor === contributor
                              ? 'border-biz-copper bg-biz-copper/10 shadow-md transform scale-[1.01]'
                              : 'border-border hover:border-biz-copper/50 bg-white hover:shadow-sm'
                          }`}
                        >
                          <RadioGroupItem 
                            value={contributor} 
                            className="w-6 h-6 border-2 border-biz-copper text-biz-copper"
                          />
                          <span className="text-biz-navy font-open-sans text-lg">{contributor}</span>
                        </label>
                      ))}
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 3: What Strong Landscaping Businesses Do Differently */}
          <section 
            className="py-20 px-4 bg-white"
            onMouseEnter={() => setCurrentSection(3)}
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-biz-green flex items-center justify-center shadow-md">
                  <span className="text-biz-navy font-montserrat font-bold text-lg">3</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-biz-navy">
                  What Strong Landscaping Businesses Do Differently
                </h2>
              </div>
              
              <p className="text-xl text-biz-grey font-open-sans leading-relaxed mb-8">
                High-performing landscaping companies aren't luckier — they're <span className="font-bold text-biz-green">clearer</span>.
              </p>
              
              <p className="text-lg text-biz-grey font-open-sans mb-8">They consistently:</p>
              
              <ul className="space-y-4 mb-12">
                {[
                  "Price services based on real labor, equipment, and overhead costs",
                  "Track margins by service type",
                  "Plan seasonality months in advance",
                  "Understand where time and money are actually going",
                  "Review a small set of key metrics regularly",
                  "Build systems before adding more crews or routes"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4 p-4 rounded-xl bg-biz-green/5 border border-biz-green/20">
                    <div className="w-8 h-8 rounded-lg bg-biz-green/20 flex items-center justify-center flex-shrink-0">
                      <Target className="w-5 h-5 text-biz-green" />
                    </div>
                    <span className="text-biz-navy font-open-sans text-lg">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Interactive: Two-Column Checklist */}
              <Card className="border-2 border-biz-green/30 bg-gradient-to-br from-biz-green/5 via-white to-biz-cream shadow-feature">
                <CardContent className="p-8 md:p-10">
                  <h3 className="text-xl font-montserrat font-bold text-biz-navy mb-2">
                    Where do you feel confident — and where do you need clarity?
                  </h3>
                  <p className="text-sm text-biz-grey mb-8 font-open-sans">Click each item to categorize it</p>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Doing Well Column */}
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-biz-green flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="font-montserrat font-bold text-biz-green text-lg">Doing Well</h4>
                      </div>
                      <div className="space-y-2 min-h-[200px] p-4 rounded-xl border-2 border-dashed border-biz-green/40 bg-biz-green/5">
                        {confidenceAreas.doingWell.map((item) => (
                          <div
                            key={item}
                            onClick={() => handleConfidenceToggle(item, 'doingWell')}
                            className="p-3 rounded-lg bg-biz-green/20 text-biz-navy text-sm cursor-pointer hover:bg-biz-green/30 transition-colors font-open-sans border border-biz-green/20"
                          >
                            {item}
                          </div>
                        ))}
                        {confidenceAreas.doingWell.length === 0 && (
                          <p className="text-biz-grey/60 text-sm text-center py-8 font-open-sans">Click items below to add here</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Needs Attention Column */}
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-biz-copper flex items-center justify-center">
                          <XCircle className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="font-montserrat font-bold text-biz-copper text-lg">Needs Attention</h4>
                      </div>
                      <div className="space-y-2 min-h-[200px] p-4 rounded-xl border-2 border-dashed border-biz-copper/40 bg-orange-50">
                        {confidenceAreas.needsAttention.map((item) => (
                          <div
                            key={item}
                            onClick={() => handleConfidenceToggle(item, 'needsAttention')}
                            className="p-3 rounded-lg bg-biz-copper/15 text-biz-navy text-sm cursor-pointer hover:bg-biz-copper/25 transition-colors font-open-sans border border-biz-copper/20"
                          >
                            {item}
                          </div>
                        ))}
                        {confidenceAreas.needsAttention.length === 0 && (
                          <p className="text-biz-copper/60 text-sm text-center py-8 font-open-sans">Click items below to add here</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Items to categorize */}
                  <div className="mt-8 pt-8 border-t-2 border-border">
                    <p className="text-sm text-biz-grey mb-4 font-open-sans font-medium">Click to categorize:</p>
                    <div className="flex flex-wrap gap-3">
                      {confidenceItems
                        .filter(item => !confidenceAreas.doingWell.includes(item) && !confidenceAreas.needsAttention.includes(item))
                        .map((item) => (
                          <button
                            key={item}
                            onClick={() => handleConfidenceToggle(item, 'needsAttention')}
                            onContextMenu={(e) => {
                              e.preventDefault();
                              handleConfidenceToggle(item, 'doingWell');
                            }}
                            className="px-5 py-2.5 rounded-full border-2 border-biz-navy/20 bg-white text-sm text-biz-navy hover:border-biz-green hover:bg-biz-green/5 transition-all font-open-sans shadow-sm hover:shadow-md"
                          >
                            {item}
                          </button>
                        ))
                      }
                    </div>
                    <p className="text-xs text-biz-grey/60 mt-4 font-open-sans">Tip: Left-click for "Needs Attention", right-click for "Doing Well"</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 4: The Cost of Inaction */}
          <section 
            className="py-20 px-4 bg-gradient-to-br from-biz-navy via-biz-navy-deep to-biz-navy-light relative overflow-hidden"
            onMouseEnter={() => setCurrentSection(4)}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-biz-copper/10 rounded-full blur-3xl" />
            
            <div className="max-w-4xl mx-auto relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center shadow-md">
                  <span className="text-biz-navy font-montserrat font-bold text-lg">4</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-white">
                  The Cost of Inaction
                </h2>
              </div>
              
              <p className="text-lg text-white/80 font-open-sans leading-relaxed mb-10">
                When visibility is missing, the cost compounds quietly:
              </p>
              
              <ul className="space-y-4 mb-12">
                {[
                  "Margins erode season after season",
                  "Owners work longer hours for the same results",
                  "Cash shortages appear at the worst times",
                  "Growth creates stress instead of freedom",
                  "Burnout becomes normalized"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-amber-400" />
                    </div>
                    <span className="text-white font-open-sans text-lg">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Interactive: Slider */}
              <Card className="bg-white/10 border-2 border-white/20 backdrop-blur-sm">
                <CardContent className="p-8 md:p-10">
                  <h3 className="text-xl font-montserrat font-bold text-white mb-6">
                    How costly does this feel to your business today?
                  </h3>
                  
                  <div className="pt-6 pb-4">
                    <Slider
                      value={costSlider}
                      onValueChange={setCostSlider}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="flex justify-between text-sm text-white/60 mt-3 font-open-sans">
                    <span>Low</span>
                    <span>Moderate</span>
                    <span>Significant</span>
                    <span>Critical</span>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <span className={`inline-block px-8 py-3 rounded-full font-montserrat font-bold text-lg ${
                      costSlider[0] >= 75 
                        ? 'bg-red-500/30 text-red-200 border border-red-400/50' 
                        : costSlider[0] >= 50 
                          ? 'bg-amber-500/30 text-amber-200 border border-amber-400/50' 
                          : 'bg-biz-green/30 text-biz-green border border-biz-green/50'
                    }`}>
                      {getSliderLabel(costSlider[0])}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 5: The Diagnostic Gap */}
          <section 
            className="py-20 px-4 bg-white"
            onMouseEnter={() => setCurrentSection(5)}
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-biz-teal flex items-center justify-center shadow-md">
                  <span className="text-white font-montserrat font-bold text-lg">5</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-biz-navy">
                  The Diagnostic Gap
                </h2>
              </div>
              
              <p className="text-xl text-biz-grey font-open-sans leading-relaxed mb-8">
                Most landscaping owners try to fix problems <span className="font-bold text-biz-navy">before</span> fully understanding them.
              </p>
              
              <p className="text-lg text-biz-grey font-open-sans mb-8">Without a clear diagnostic:</p>
              
              <ul className="space-y-4 mb-10">
                {[
                  "Pricing changes are guesses",
                  "Hiring decisions feel risky",
                  "Expansion adds pressure instead of profit"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4 p-4 rounded-xl bg-amber-50 border border-amber-200">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                    </div>
                    <span className="text-biz-navy font-open-sans text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="p-8 rounded-2xl bg-gradient-to-r from-biz-green/10 via-biz-teal/10 to-biz-green/10 border-2 border-biz-green/30 shadow-feature">
                <p className="text-biz-navy font-open-sans text-xl leading-relaxed text-center">
                  <span className="font-bold text-biz-green">BizHealth.ai</span> exists to provide clarity first — so decisions are <span className="font-bold">intentional</span>, not reactive.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Next Step */}
          <section 
            className="py-24 px-4 bg-gradient-to-br from-biz-cream via-white to-biz-green/5"
            onMouseEnter={() => setCurrentSection(5)}
          >
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-biz-green/20 border border-biz-green/30 mb-8 shadow-lg">
                <TrendingUp className="w-10 h-10 text-biz-green" />
              </div>
              
              <h2 className="text-3xl md:text-5xl font-montserrat font-bold text-biz-navy mb-8">
                Clarity Comes Before Growth
              </h2>
              
              <p className="text-xl text-biz-grey font-open-sans max-w-2xl mx-auto mb-12 leading-relaxed">
                Receive tailored insights and practical next steps designed specifically for landscaping and lawn-mowing businesses.
              </p>
              
              <Button 
                variant="growth" 
                size="lg" 
                className="text-xl px-12 py-8 shadow-xl hover:shadow-2xl transition-all bg-biz-green hover:bg-biz-green-light text-biz-navy font-montserrat font-bold"
                asChild
              >
                <Link to="/pricing">
                  Run Your Business Health Assessment
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Link>
              </Button>
              
              <p className="mt-6 text-sm text-biz-grey font-open-sans">
                Takes 10-15 minutes • Personalized report included
              </p>
            </div>
          </section>
        </main>

        <GlobalFooter />
      </div>
    </>
  );
};

export default LandscapingPlaybook;
