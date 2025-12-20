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
  XCircle
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

  return (
    <>
      <SEO
        title="Landscaping & Lawn-Mowing Business Playbook | BizHealth.ai"
        description="Interactive business diagnostic for landscaping and lawn-mowing service owners. Discover why margins feel thin despite busy schedules and get clarity on pricing, cash flow, and growth."
        keywords="landscaping business, lawn mowing business, landscaping profit margins, landscaping pricing, seasonal cash flow, landscaping business health"
        canonical="https://bizhealth.ai/playbooks/landscaping"
        ogType="website"
      />
      <StructuredData
        type="service"
        name="Landscaping & Lawn-Mowing Business Playbook"
        description="Interactive business diagnostic for landscaping and lawn-mowing service owners."
        provider="BizHealth.ai"
        areaServed="United States"
        url="https://bizhealth.ai/playbooks/landscaping"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-biz-light-grey to-white">
        <PromotionalBanner />
        <GlobalNavigation />
        
        {/* Progress Indicator - positioned below banner (h-20) and nav */}
        <div className="fixed top-36 left-0 right-0 z-40 bg-white/90 backdrop-blur-sm border-b border-border/50">
          <div className="max-w-4xl mx-auto px-4 py-2">
            <div className="flex items-center gap-3">
              <span className="text-xs text-biz-grey font-open-sans">Progress</span>
              <Progress value={progressPercentage} className="flex-1 h-2" />
              <span className="text-xs text-biz-grey font-open-sans">{Math.round(progressPercentage)}%</span>
            </div>
          </div>
        </div>

        <main className="pt-48 pb-16">
          {/* Hero Section */}
          <section 
            className="py-16 md:py-24 px-4"
            onMouseEnter={() => setCurrentSection(0)}
          >
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-biz-green/10 mb-6">
                <Leaf className="w-8 h-8 text-biz-green" />
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-biz-navy mb-6 leading-tight">
                Busy Crews. Full Schedules.<br />
                <span className="text-biz-green">Thin Margins.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-biz-grey font-open-sans max-w-3xl mx-auto mb-10 leading-relaxed">
                Most landscaping businesses don't struggle because of demand — they struggle because underpricing, poor planning, and limited visibility quietly drain profit.
              </p>
              
              <Button 
                variant="growth" 
                size="lg" 
                className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
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
            className="py-16 px-4 bg-white"
            onMouseEnter={() => setCurrentSection(1)}
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-biz-navy/10 flex items-center justify-center">
                  <span className="text-biz-navy font-montserrat font-bold">1</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-biz-navy">
                  The Landscaping Reality
                </h2>
              </div>
              
              <div className="prose prose-lg max-w-none mb-10">
                <p className="text-biz-grey font-open-sans leading-relaxed">
                  Most landscaping and lawn-mowing businesses work incredibly hard — yet many owners still feel constant financial pressure.
                </p>
                <p className="text-biz-grey font-open-sans leading-relaxed">
                  Industry benchmarks consistently show that a large percentage of landscaping businesses underprice their services by <strong className="text-biz-navy">15–30%</strong>, often without realizing it. Add seasonal revenue swings, labor challenges, and rising equipment costs, and even "busy" companies can struggle to stay profitable.
                </p>
                <p className="text-biz-grey font-open-sans leading-relaxed italic">
                  If you've ever wondered why cash feels tight despite full routes and long days, you're not alone.
                </p>
              </div>

              {/* Interactive: Multi-Select */}
              <Card className="border-biz-green/20 bg-gradient-to-br from-biz-green/5 to-transparent">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-lg font-montserrat font-semibold text-biz-navy mb-4">
                    Which of these show up in your business today?
                  </h3>
                  <p className="text-sm text-biz-grey mb-6">Select all that apply</p>
                  
                  <div className="space-y-3">
                    {challenges.map((challenge) => (
                      <label
                        key={challenge}
                        className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedChallenges.includes(challenge)
                            ? 'border-biz-green bg-biz-green/10'
                            : 'border-border hover:border-biz-green/50 bg-white'
                        }`}
                      >
                        <Checkbox
                          checked={selectedChallenges.includes(challenge)}
                          onCheckedChange={() => handleChallengeToggle(challenge)}
                          className="data-[state=checked]:bg-biz-green data-[state=checked]:border-biz-green"
                        />
                        <span className="text-biz-navy font-open-sans">{challenge}</span>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 2: Why This Problem Persists */}
          <section 
            className="py-16 px-4 bg-biz-light-grey/50"
            onMouseEnter={() => setCurrentSection(2)}
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-biz-navy/10 flex items-center justify-center">
                  <span className="text-biz-navy font-montserrat font-bold">2</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-biz-navy">
                  Why This Problem Persists
                </h2>
              </div>
              
              <p className="text-biz-grey font-open-sans leading-relaxed mb-6">
                These challenges rarely come from one big mistake. They come from systemic gaps that build over time:
              </p>
              
              <ul className="space-y-3 mb-6">
                {[
                  "Pricing based on competitors instead of true costs",
                  "Limited job-level cost tracking",
                  "No clear margin targets",
                  "Seasonal planning done too late",
                  "Decisions made on instinct instead of data"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-biz-grey font-open-sans">{item}</span>
                  </li>
                ))}
              </ul>
              
              <p className="text-biz-navy font-open-sans font-medium italic mb-10">
                Most owners are running the business inside the work, not above it.
              </p>

              {/* Interactive: Single Choice */}
              <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-transparent">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-lg font-montserrat font-semibold text-biz-navy mb-4">
                    What feels like the biggest contributor right now?
                  </h3>
                  <p className="text-sm text-biz-grey mb-6">Select one</p>
                  
                  <RadioGroup value={biggestContributor} onValueChange={setBiggestContributor}>
                    <div className="space-y-3">
                      {contributors.map((contributor) => (
                        <label
                          key={contributor}
                          className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            biggestContributor === contributor
                              ? 'border-amber-500 bg-amber-50'
                              : 'border-border hover:border-amber-300 bg-white'
                          }`}
                        >
                          <RadioGroupItem 
                            value={contributor} 
                            className="border-amber-500 text-amber-500"
                          />
                          <span className="text-biz-navy font-open-sans">{contributor}</span>
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
            className="py-16 px-4 bg-white"
            onMouseEnter={() => setCurrentSection(3)}
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-biz-navy/10 flex items-center justify-center">
                  <span className="text-biz-navy font-montserrat font-bold">3</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-biz-navy">
                  What Strong Landscaping Businesses Do Differently
                </h2>
              </div>
              
              <p className="text-lg text-biz-grey font-open-sans leading-relaxed mb-6">
                High-performing landscaping companies aren't luckier — they're <strong className="text-biz-green">clearer</strong>.
              </p>
              
              <p className="text-biz-grey font-open-sans mb-6">They consistently:</p>
              
              <ul className="space-y-3 mb-10">
                {[
                  "Price services based on real labor, equipment, and overhead costs",
                  "Track margins by service type",
                  "Plan seasonality months in advance",
                  "Understand where time and money are actually going",
                  "Review a small set of key metrics regularly",
                  "Build systems before adding more crews or routes"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-biz-green mt-0.5 flex-shrink-0" />
                    <span className="text-biz-grey font-open-sans">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Interactive: Two-Column Checklist */}
              <Card className="border-biz-green/20 bg-gradient-to-br from-biz-green/5 to-transparent">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-lg font-montserrat font-semibold text-biz-navy mb-4">
                    Where do you feel confident — and where do you need clarity?
                  </h3>
                  <p className="text-sm text-biz-grey mb-6">Click each item to categorize it</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Doing Well Column */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <CheckCircle2 className="w-5 h-5 text-biz-green" />
                        <h4 className="font-montserrat font-semibold text-biz-green">Doing Well</h4>
                      </div>
                      <div className="space-y-2 min-h-[200px] p-4 rounded-lg border-2 border-dashed border-biz-green/30 bg-biz-green/5">
                        {confidenceAreas.doingWell.map((item) => (
                          <div
                            key={item}
                            onClick={() => handleConfidenceToggle(item, 'doingWell')}
                            className="p-3 rounded-lg bg-biz-green/20 text-biz-navy text-sm cursor-pointer hover:bg-biz-green/30 transition-colors"
                          >
                            {item}
                          </div>
                        ))}
                        {confidenceAreas.doingWell.length === 0 && (
                          <p className="text-biz-grey/60 text-sm text-center py-8">Click items below to add here</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Needs Attention Column */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <XCircle className="w-5 h-5 text-amber-500" />
                        <h4 className="font-montserrat font-semibold text-amber-600">Needs Attention</h4>
                      </div>
                      <div className="space-y-2 min-h-[200px] p-4 rounded-lg border-2 border-dashed border-amber-300 bg-amber-50">
                        {confidenceAreas.needsAttention.map((item) => (
                          <div
                            key={item}
                            onClick={() => handleConfidenceToggle(item, 'needsAttention')}
                            className="p-3 rounded-lg bg-amber-100 text-biz-navy text-sm cursor-pointer hover:bg-amber-200 transition-colors"
                          >
                            {item}
                          </div>
                        ))}
                        {confidenceAreas.needsAttention.length === 0 && (
                          <p className="text-amber-400 text-sm text-center py-8">Click items below to add here</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Items to categorize */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-sm text-biz-grey mb-4">Click to categorize:</p>
                    <div className="flex flex-wrap gap-2">
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
                            className="px-4 py-2 rounded-full border border-border bg-white text-sm text-biz-navy hover:border-biz-green hover:bg-biz-green/5 transition-colors"
                          >
                            {item}
                          </button>
                        ))
                      }
                    </div>
                    <p className="text-xs text-biz-grey/60 mt-3">Tip: Left-click for "Needs Attention", right-click for "Doing Well"</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 4: The Cost of Inaction */}
          <section 
            className="py-16 px-4 bg-biz-navy text-white"
            onMouseEnter={() => setCurrentSection(4)}
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-white font-montserrat font-bold">4</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-montserrat font-bold">
                  The Cost of Inaction
                </h2>
              </div>
              
              <p className="text-white/80 font-open-sans leading-relaxed mb-8">
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
                  <li key={index} className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white/90 font-open-sans">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Interactive: Slider */}
              <Card className="bg-white/10 border-white/20">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-lg font-montserrat font-semibold text-white mb-4">
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
                  
                  <div className="flex justify-between text-sm text-white/60 mt-2">
                    <span>Low</span>
                    <span>Moderate</span>
                    <span>Significant</span>
                    <span>Critical</span>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <span className="inline-block px-6 py-2 rounded-full bg-white/20 text-white font-montserrat font-semibold">
                      {getSliderLabel(costSlider[0])}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 5: The Diagnostic Gap */}
          <section 
            className="py-16 px-4 bg-white"
            onMouseEnter={() => setCurrentSection(5)}
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-biz-navy/10 flex items-center justify-center">
                  <span className="text-biz-navy font-montserrat font-bold">5</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-biz-navy">
                  The Diagnostic Gap
                </h2>
              </div>
              
              <p className="text-lg text-biz-grey font-open-sans leading-relaxed mb-6">
                Most landscaping owners try to fix problems <strong className="text-biz-navy">before</strong> fully understanding them.
              </p>
              
              <p className="text-biz-grey font-open-sans mb-6">Without a clear diagnostic:</p>
              
              <ul className="space-y-3 mb-8">
                {[
                  "Pricing changes are guesses",
                  "Hiring decisions feel risky",
                  "Expansion adds pressure instead of profit"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-biz-grey font-open-sans">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="p-6 rounded-xl bg-gradient-to-r from-biz-green/10 to-biz-light-blue/10 border border-biz-green/20">
                <p className="text-biz-navy font-open-sans text-lg leading-relaxed">
                  <strong className="text-biz-green">BizHealth.ai</strong> exists to provide clarity first — so decisions are intentional, not reactive.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Next Step */}
          <section 
            className="py-20 px-4 bg-gradient-to-b from-biz-light-grey to-white"
            onMouseEnter={() => setCurrentSection(5)}
          >
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-biz-green/10 mb-6">
                <TrendingUp className="w-8 h-8 text-biz-green" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-biz-navy mb-6">
                Clarity Comes Before Growth
              </h2>
              
              <p className="text-lg text-biz-grey font-open-sans max-w-2xl mx-auto mb-10">
                Receive tailored insights and practical next steps designed specifically for landscaping and lawn-mowing businesses.
              </p>
              
              <Button 
                variant="growth" 
                size="lg" 
                className="text-lg px-10 py-6 shadow-xl hover:shadow-2xl transition-all"
                asChild
              >
                <Link to="/pricing">
                  Run Your Business Health Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </section>
        </main>

        <GlobalFooter />
      </div>
    </>
  );
};

export default LandscapingPlaybook;
