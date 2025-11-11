import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, TrendingUp, Users, Check, Info } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bannerLogo from "@/assets/bizhealth-logo-banner.jpg";

const Hero = () => {
  const [revenue, setRevenue] = useState([0]);
  const [employees, setEmployees] = useState([0]);
  const [challenges, setChallenges] = useState([0]);
  const [recommendedTier, setRecommendedTier] = useState("Growth");
  const [scrollY, setScrollY] = useState(0);

  // Challenge scale descriptors
  const challengeData: { [key: number]: { descriptor: string; description: string } } = {
    0: {
      descriptor: "None",
      description: "Your business is thriving without any hurdles—everything's aligned, efficient, and poised for seamless growth."
    },
    1: {
      descriptor: "Minimal",
      description: "Your business is running smoothly with few, if any, hurdles—perhaps just routine operational tweaks."
    },
    2: {
      descriptor: "Minor",
      description: "Occasional issues arise, like minor cash flow dips or team adjustments, but they're manageable without major disruption."
    },
    3: {
      descriptor: "Moderate",
      description: "You're facing noticeable challenges, such as inconsistent revenue or scaling pains, requiring focused attention to resolve."
    },
    4: {
      descriptor: "Significant",
      description: "Multiple or persistent obstacles, like market competition or operational inefficiencies, are impacting growth and stability."
    },
    5: {
      descriptor: "Major",
      description: "Critical challenges dominate, such as severe financial strain or strategic roadblocks, demanding immediate and comprehensive action."
    }
  };

  // Convert linear slider value to logarithmic employee count
  const getEmployeeCount = (sliderValue: number) => {
    if (sliderValue === 0) return 0;
    // Logarithmic scale: 0-100 slider maps to 0-150 employees
    // Using exponent 1.5 for pronounced curve (50 slider ≈ 53 employees)
    const maxEmployees = 150;
    const normalized = sliderValue / 100;
    return Math.round(Math.pow(normalized, 1.5) * maxEmployees);
  };

  // Convert linear slider value to logarithmic revenue amount
  const getRevenueAmount = (sliderValue: number) => {
    if (sliderValue === 0) return 0;
    // Logarithmic scale: 0-100 slider maps to $0-$7M
    // Using exponent 2.2 for gentler curve at low end (easier to reach $10k-$50k)
    const maxRevenue = 7000000;
    const normalized = sliderValue / 100;
    const rawAmount = Math.pow(normalized, 2.2) * maxRevenue;
    
    // Apply smart rounding based on value
    if (rawAmount < 500000) {
      // Round to nearest $10k below $500k
      return Math.round(rawAmount / 10000) * 10000;
    } else {
      // Round to nearest $50k above $500k
      return Math.round(rawAmount / 50000) * 50000;
    }
  };

  const employeeCount = getEmployeeCount(employees[0]);
  const revenueAmount = getRevenueAmount(revenue[0]);

  // Calculate recommended tier based on quiz inputs
  const calculateTier = () => {
    const revenueValue = revenueAmount;
    const employeeValue = employeeCount;
    const challengeValue = challenges[0];
    
    // Enterprise triggers
    if (revenueValue > 3000000) {
      return "Enterprise";
    }
    if (revenueValue > 2000000 && employeeValue > 5) {
      return "Enterprise";
    }
    if (challengeValue > 3 && employeeValue > 5 && revenueValue > 250000) {
      return "Enterprise";
    }
    if (employeeValue > 75 || (challengeValue >= 4 && employeeValue > 10)) {
      return "Enterprise";
    }
    
    // Growth triggers
    if (challengeValue > 2 && employeeValue >= 5 && revenueValue >= 200000) {
      return "Growth";
    }
    if (revenueValue > 400000 || employeeValue > 10) {
      return "Growth";
    }
    
    return "Essentials";
  };

  const navigate = useNavigate();

  const handleGetReport = () => {
    navigate('/how-it-works');
  };

  // Update tier when inputs change
  useEffect(() => {
    setRecommendedTier(calculateTier());
  }, [revenue, employees, challenges]);

  // Remove scroll animation - banner stays fixed

  const trustIndicators = [
    { icon: Shield, label: "Bank-Grade Security", value: "SOC 2 Certified" },
    { icon: Clock, label: "Reports Generated", value: "24 hrs/day" },
    { icon: TrendingUp, label: "Proven Results", value: "27x Avg. ROI" },
    { icon: Users, label: "Trusted Worldwide", value: "2,500+ Businesses" }
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

      <section className="relative bg-biz-white text-biz-navy overflow-hidden" style={{ paddingTop: '40px' }}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-muted opacity-90"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-biz-green/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-biz-navy/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-16">
          {/* Left Column - Main Content */}
          <div className="space-y-8 relative z-10 px-2 sm:px-0">
            {/* Main Headlines */}
            <div className="space-y-4">
              <h1 className="font-montserrat font-bold text-2xl sm:text-3xl lg:text-6xl leading-tight">
                Stop Guessing, 
                <span className="text-biz-green block">Start Growing</span>
              </h1>
              <p className="font-open-sans text-base sm:text-lg lg:text-2xl text-biz-grey leading-relaxed">
                our Trusted Business Health Analyst – Proprietary AI-Powered Diagnostics for Small & Mid-size Businesses
              </p>
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
                  <span className="font-semibold">20x ROI</span> from actionable diagnostics & insights
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-biz-green rounded-full mt-2 sm:mt-3 flex-shrink-0"></div>
                <p className="font-open-sans text-sm sm:text-base lg:text-lg text-biz-navy">
                  <span className="font-semibold">Quick Results</span> - No waiting weeks for consultants
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-biz-green rounded-full mt-2 sm:mt-3 flex-shrink-0"></div>
                <p className="font-open-sans text-sm sm:text-base lg:text-lg text-biz-navy">
                  <span className="font-semibold">Personal Client Portal</span> - Easy access & sharing with your team
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-biz-green rounded-full mt-2 sm:mt-3 flex-shrink-0"></div>
                <p className="font-open-sans text-sm sm:text-base lg:text-lg text-biz-navy">
                  <span className="font-semibold">90% Savings</span> - Compared to traditional business consulting
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-4 max-w-full">
              <Button 
                onClick={handleGetReport}
                size="lg"
                className="w-full bg-biz-green hover:bg-biz-green/90 text-biz-white font-montserrat font-semibold text-xs sm:text-sm lg:text-base px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 lg:py-4 shadow-feature"
              >
                <span className="truncate text-center">See How It Works</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 ml-1.5 sm:ml-2 flex-shrink-0" />
              </Button>
              
              {/* Risk-Free Guarantee */}
              <div className="flex items-center justify-center space-x-2 text-[10px] sm:text-xs lg:text-sm font-open-sans text-biz-grey max-w-full">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-biz-navy flex-shrink-0" />
                <span className="break-words">No Subscriptions • Transparent Pricing • Free Tools Included</span>
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
                    Annual Revenue: {revenue[0] === 100 ? '$7M+' : `$${revenueAmount.toLocaleString()}`}
                  </label>
                  <div className="px-1">
                    <Slider
                      value={revenue}
                      onValueChange={setRevenue}
                      max={100}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] sm:text-xs font-open-sans text-biz-white/70 px-1">
                    <span>$0</span>
                    <span>$7M+</span>
                  </div>
                </div>

                {/* Employee Count */}
                <div className="space-y-2 sm:space-y-3">
                  <label className="font-open-sans font-semibold text-xs sm:text-sm text-biz-white block break-words">
                    Employees: {employees[0] === 100 ? '150+' : employeeCount}
                  </label>
                  <div className="px-1">
                    <Slider
                      value={employees}
                      onValueChange={setEmployees}
                      max={100}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] sm:text-xs font-open-sans text-biz-white/70 px-1">
                    <span>0</span>
                    <span>150+</span>
                  </div>
                </div>

                {/* Business Challenges */}
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2">
                    <label className="font-open-sans font-semibold text-xs sm:text-sm text-biz-white break-words">
                      Challenges: {challengeData[challenges[0]].descriptor}
                    </label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-4 h-4 text-biz-white/70 hover:text-biz-white cursor-help flex-shrink-0" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs bg-biz-navy border-biz-white/20 text-biz-white">
                          <p className="text-xs">{challengeData[challenges[0]].description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="px-1">
                    <Slider
                      value={challenges}
                      onValueChange={setChallenges}
                      max={5}
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

        {/* Trust Indicators Bar - Repositioned to Bottom */}
        <div className="pb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {trustIndicators.map((indicator, index) => {
              const IconComponent = indicator.icon;
              return (
                <div key={index} className="flex items-center space-x-3 text-center lg:text-left">
                  <div className="bg-biz-navy rounded-lg p-2 flex-shrink-0">
                    <IconComponent className="w-5 h-5 text-white" />
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
      </div>
    </section>
    </>
  );
};

export default Hero;