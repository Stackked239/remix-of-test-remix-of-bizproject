import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Brain, TrendingUp, Users, Check } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";
import bannerLogo from "@/assets/bizhealth-logo-banner.jpg";

const Hero = () => {
  const [revenue, setRevenue] = useState([0]);
  const [employees, setEmployees] = useState([0]);
  const [challenges, setChallenges] = useState([0]);
  const [recommendedTier, setRecommendedTier] = useState("Growth");
  const [scrollY, setScrollY] = useState(0);

  // Calculate recommended tier based on quiz inputs
  const calculateTier = () => {
    const revenueValue = revenue[0];
    const employeeValue = employees[0];
    const challengeValue = challenges[0];
    
    // Enterprise triggers
    if (revenueValue > 7000000 || employeeValue > 75 || (challengeValue > 2 && employeeValue > 10)) {
      return "Enterprise";
    }
    
    // Growth triggers
    if (revenueValue > 400000 || employeeValue > 10) {
      return "Growth";
    }
    
    return "Essentials";
  };

  const handleGetReport = () => {
    const element = document.getElementById('pricing');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Update tier when inputs change
  useEffect(() => {
    setRecommendedTier(calculateTier());
  }, [revenue, employees, challenges]);

  // Remove scroll animation - banner stays fixed

  const trustIndicators = [
    { icon: Shield, label: "Bank-Grade Security", value: "SOC 2 Certified" },
    { icon: Brain, label: "AI-Powered Analysis", value: "GPT-4 Insights" },
    { icon: TrendingUp, label: "Proven Results", value: "20x Avg. ROI" },
    { icon: Users, label: "Trusted by SMBs", value: "2,500+ Businesses" }
  ];

  return (
    <>
      {/* Fixed Promotional Banner */}
      <div 
        className="fixed top-0 left-0 w-full h-20 bg-white shadow-md flex items-center justify-center z-50"
      >
        <img 
          src={bannerLogo} 
          alt="BizHealth.ai" 
          className="object-contain"
          style={{ width: '1605px', height: '277px', maxWidth: '90%', maxHeight: '60px' }}
        />
      </div>

      <section className="relative bg-biz-white text-biz-navy overflow-hidden" style={{ paddingTop: '160px' }}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-muted opacity-90"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-biz-green/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-biz-navy/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Indicators Bar */}
        <div className="pt-8 pb-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {trustIndicators.map((indicator, index) => {
              const IconComponent = indicator.icon;
              return (
                <div key={index} className="flex items-center space-x-3 text-center lg:text-left">
                  <div className="bg-biz-white/90 rounded-lg p-2 flex-shrink-0">
                    <IconComponent className="w-5 h-5 text-biz-green" />
                  </div>
                  {/* Mobile/Tablet: Show simplified label */}
                  <div className="block lg:hidden">
                    <p className="text-xs font-montserrat font-semibold text-biz-navy">{indicator.label}</p>
                  </div>
                  {/* Desktop: Show full label and value */}
                  <div className="hidden lg:block">
                    <p className="text-xs font-open-sans text-biz-grey">{indicator.label}</p>
                    <p className="text-sm font-montserrat font-semibold text-biz-navy">{indicator.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center py-16">
          {/* Left Column - Main Content */}
          <div className="space-y-8 relative z-10 px-2 sm:px-0">
            {/* Main Headlines */}
            <div className="space-y-4 animate-fade-in">
              <h1 className="font-montserrat font-bold text-2xl sm:text-3xl lg:text-5xl xl:text-6xl leading-tight text-biz-navy">
                Stop Guessing About Your Business's Future—Get Actionable Insights Today.
              </h1>
              <p className="font-open-sans text-base sm:text-lg lg:text-xl text-biz-grey leading-relaxed">
                As a busy SMB leader facing cash flow hurdles, scaling roadblocks, and hidden risks, you deserve a fast, comprehensive assessment that uncovers opportunities in just 30-40 minutes.
              </p>
              <div className="pt-2">
                <p className="font-open-sans text-sm sm:text-base text-biz-navy/80 font-semibold">
                  Trusted by 2,500+ SMBs
                </p>
              </div>
            </div>

            {/* Statistical Hooks */}
            <div className="bg-biz-navy/5 rounded-xl p-4 sm:p-6 backdrop-blur-sm border border-biz-navy/10">
              <div className="grid grid-cols-2 gap-3 sm:gap-6">
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-montserrat font-bold text-biz-green">70%</p>
                  <p className="text-xs sm:text-sm font-open-sans text-biz-grey">SMB Cash Flow Strains</p>
                  <p className="text-xs font-open-sans text-biz-grey opacity-75 hidden sm:block">SBA 2025 Report</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-montserrat font-bold text-biz-green">60%</p>
                  <p className="text-xs sm:text-sm font-open-sans text-biz-grey">Growth Stalls by Year 3</p>
                  <p className="text-xs font-open-sans text-biz-grey opacity-75 hidden sm:block">Gartner Research</p>
                </div>
              </div>
            </div>

            {/* Value Propositions */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-biz-green rounded-full mt-2 sm:mt-3 flex-shrink-0"></div>
                <p className="font-open-sans text-sm sm:text-base lg:text-lg text-biz-navy">
                  <span className="font-semibold">Uncover Hidden Gaps</span> across 12 critical business areas
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-biz-green rounded-full mt-2 sm:mt-3 flex-shrink-0"></div>
                <p className="font-open-sans text-sm sm:text-base lg:text-lg text-biz-navy">
                  <span className="font-semibold">20x ROI</span> from actionable AI-generated insights
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-biz-green rounded-full mt-2 sm:mt-3 flex-shrink-0"></div>
                <p className="font-open-sans text-sm sm:text-base lg:text-lg text-biz-navy">
                  <span className="font-semibold">Quick results</span> - no waiting for consultants
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-biz-green rounded-full mt-2 sm:mt-3 flex-shrink-0"></div>
                <p className="font-open-sans text-sm sm:text-base lg:text-lg text-biz-navy">
                  <span className="font-semibold">Personal client portal</span> for easy sharing with your team
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-biz-green rounded-full mt-2 sm:mt-3 flex-shrink-0"></div>
                <p className="font-open-sans text-sm sm:text-base lg:text-lg text-biz-navy">
                  <span className="font-semibold">95% savings</span> compared to traditional business consulting
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-4 max-w-full">
              <Button 
                onClick={handleGetReport}
                size="lg"
                className="w-full bg-biz-green hover:bg-biz-green/90 text-biz-white font-montserrat font-semibold text-sm sm:text-base lg:text-lg px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 shadow-feature transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <span className="truncate text-center">Let's Get Started</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ml-2 flex-shrink-0" />
              </Button>
              
              {/* Risk-Free Guarantee */}
              <div className="flex items-center space-x-2 text-[10px] sm:text-xs lg:text-sm font-open-sans text-biz-grey max-w-full">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-biz-green flex-shrink-0" />
                <span className="break-words">Reports generated 24/7 in 30-40 minutes</span>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive KPI Quiz */}
          <div className="bg-biz-navy rounded-2xl p-3 sm:p-6 lg:p-8 backdrop-blur-sm border border-biz-navy/20 max-w-full overflow-hidden">
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center px-2">
                <h3 className="font-montserrat font-bold text-lg sm:text-xl lg:text-2xl mb-2 text-biz-white break-words">
                  Find Your Perfect Plan
                </h3>
                <p className="font-open-sans text-xs sm:text-sm lg:text-base text-biz-white/80 break-words">
                  Answer 3 quick questions to get personalized recommendations
                </p>
              </div>

              {/* Quiz Questions */}
              <div className="space-y-4 sm:space-y-6 px-1">
                {/* Annual Revenue */}
                <div className="space-y-2 sm:space-y-3">
                  <label className="font-open-sans font-semibold text-xs sm:text-sm text-biz-white block break-words">
                    Annual Revenue: ${revenue[0].toLocaleString()}
                  </label>
                  <div className="px-1">
                    <Slider
                      value={revenue}
                      onValueChange={setRevenue}
                      max={50000000}
                      min={0}
                      step={50000}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] sm:text-xs font-open-sans text-biz-white/70 px-1">
                    <span>$0</span>
                    <span>$50M</span>
                  </div>
                </div>

                {/* Employee Count */}
                <div className="space-y-2 sm:space-y-3">
                  <label className="font-open-sans font-semibold text-xs sm:text-sm text-biz-white block break-words">
                    Employees: {employees[0]}
                  </label>
                  <div className="px-1">
                    <Slider
                      value={employees}
                      onValueChange={setEmployees}
                      max={250}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] sm:text-xs font-open-sans text-biz-white/70 px-1">
                    <span>0</span>
                    <span>250</span>
                  </div>
                </div>

                {/* Business Challenges */}
                <div className="space-y-2 sm:space-y-3">
                  <label className="font-open-sans font-semibold text-xs sm:text-sm text-biz-white block break-words">
                    Challenges (0-10): {challenges[0]}
                  </label>
                  <div className="px-1">
                    <Slider
                      value={challenges}
                      onValueChange={setChallenges}
                      max={10}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] sm:text-xs font-open-sans text-biz-white/70 px-1">
                    <span>None</span>
                    <span>Major</span>
                  </div>
                </div>
              </div>

              {/* Recommendation */}
              <div className="bg-biz-white rounded-lg p-3 sm:p-4 border border-biz-grey/60 mx-1">
                <div className="text-center">
                  <p className="font-open-sans text-[10px] sm:text-xs lg:text-sm text-black mb-1">Recommended Plan:</p>
                  <p className="font-montserrat font-bold text-base sm:text-lg lg:text-xl text-biz-lime break-words">
                    {recommendedTier}
                  </p>
                  <p className="font-open-sans text-[10px] sm:text-xs lg:text-sm text-black/90 mt-2 break-words px-1">
                    {recommendedTier === "Essentials" && "Perfect for getting started with core insights"}
                    {recommendedTier === "Growth" && "Ideal for scaling businesses needing comprehensive analysis"}
                    {recommendedTier === "Enterprise" && "Best for complex operations requiring full suite access"}
                  </p>
                </div>
              </div>

              <div className="px-1">
                <Button 
                  onClick={handleGetReport}
                  className="w-full bg-gradient-to-r from-biz-green to-biz-green/90 hover:from-biz-green/90 hover:to-biz-green text-biz-white font-montserrat font-bold text-sm sm:text-base lg:text-lg shadow-elegant hover:shadow-xl transition-all duration-300 transform hover:scale-105 py-4 sm:py-5"
                  size="lg"
                >
                  <span className="truncate">🚀 Get Started with {recommendedTier}</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 flex-shrink-0" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof Stats */}
        <div className="pb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div>
              <p className="text-2xl sm:text-3xl font-montserrat font-bold text-biz-green">20x</p>
              <p className="font-open-sans text-xs sm:text-sm text-biz-grey">Average ROI</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-montserrat font-bold text-biz-green">2,500+</p>
              <p className="font-open-sans text-xs sm:text-sm text-biz-grey">SMBs Served</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-montserrat font-bold text-biz-green">99%</p>
              <p className="font-open-sans text-xs sm:text-sm text-biz-grey">Accuracy Rate</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-montserrat font-bold text-biz-green">~45 min.</p>
              <p className="font-open-sans text-xs sm:text-sm text-biz-grey">Report Generation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Hero;