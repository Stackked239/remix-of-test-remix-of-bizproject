import { ArrowRight, Target, Calendar, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const CustomRequestHero = () => {
  const scrollToForm = () => {
    const formSection = document.getElementById("request-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToEngagements = () => {
    const engagementSection = document.getElementById("engagement-types");
    if (engagementSection) {
      engagementSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const benefits = [
    { icon: Target, text: "Investment-level engagement ($3K–$25K+)" },
    { icon: Calendar, text: "90–180+ day strategic partnerships" },
    { icon: Users, text: "Dedicated advisor + advisory support" },
    { icon: TrendingUp, text: "20–30% efficiency gains, strategic clarity" },
  ];

  return (
    <section className="relative bg-gradient-to-b from-[hsl(var(--biz-navy))] via-[hsl(var(--biz-navy))] to-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 border border-white/30 rounded-full" />
        <div className="absolute bottom-10 right-20 w-48 h-48 border border-white/20 rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 border border-white/25 rounded-full" />
      </div>

      <div className="container mx-auto px-5 md:px-8 py-16 md:py-24 lg:py-28">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Text Content - 60% */}
          <div className="lg:col-span-3 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[hsl(var(--biz-teal))]/20 border border-[hsl(var(--biz-teal))]/30 rounded-full px-4 py-2 mb-6">
              <span className="text-[hsl(var(--biz-teal))] text-sm font-semibold font-montserrat">
                TIER 3 ENGAGEMENT
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold text-white leading-tight mb-6">
              Custom Solutions for Organizations{" "}
              <span className="text-[hsl(var(--biz-teal))]">Ready to Scale</span>
            </h1>

            {/* Subheadline */}
            <h3 className="text-xl md:text-2xl font-montserrat font-medium text-white/90 mb-6">
              Dedicated expertise. Customized roadmap. Transformation at your pace.
            </h3>

            {/* Body Copy */}
            <p className="text-base md:text-lg text-white/80 leading-relaxed mb-8 max-w-2xl lg:max-w-none">
              When off-the-shelf guidance isn't enough, custom BizGuides solutions 
              deliver targeted consulting and strategic partnership. Work with dedicated 
              advisors who understand your industry, your challenges, and your ambitions.
            </p>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {benefits.map((benefit, index) => {
                const iconColors = [
                  "text-[hsl(var(--biz-teal))]",
                  "text-[hsl(var(--biz-gold))]",
                  "text-[hsl(var(--biz-green))]",
                  "text-[hsl(var(--biz-lime))]",
                ];
                return (
                  <div 
                    key={index}
                    className="flex items-center gap-3 text-left"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <benefit.icon className={`w-5 h-5 ${iconColors[index]}`} />
                    </div>
                    <span className="text-sm md:text-base text-white/90 font-medium">
                      {benefit.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={scrollToForm}
                className="bg-[hsl(var(--biz-teal))] hover:bg-[hsl(180,100%,30%)] text-white font-montserrat font-semibold px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all"
              >
                Tell Us Your Challenge
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={scrollToEngagements}
                variant="outline"
                className="border-2 border-[hsl(var(--biz-teal))] text-[hsl(var(--biz-teal))] bg-white/90 hover:bg-white font-montserrat font-semibold px-8 py-6 text-base shadow-md"
              >
                See Engagement Options
              </Button>
            </div>
          </div>

          {/* Visual - 40% */}
          <div className="lg:col-span-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Abstract Visual Representation */}
              <div className="relative bg-gradient-to-br from-[hsl(var(--biz-teal))]/20 to-[hsl(var(--biz-navy-light))]/30 rounded-2xl p-8 border border-white/10 backdrop-blur-sm">
                {/* Scaling Visualization */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[hsl(var(--biz-teal))] rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-[85%] h-full bg-[hsl(var(--biz-teal))] rounded-full animate-pulse" />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[hsl(var(--biz-gold))]/80 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-[70%] h-full bg-[hsl(var(--biz-gold))] rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[hsl(var(--biz-green))]/80 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-[92%] h-full bg-[hsl(var(--biz-green))] rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                  <div className="text-center bg-white rounded-lg py-3 px-2 shadow-sm">
                    <div className="text-2xl font-bold text-[hsl(var(--biz-teal))]">20-30%</div>
                    <div className="text-xs text-[hsl(var(--biz-navy))]/70">Efficiency Gains</div>
                  </div>
                  <div className="text-center bg-white rounded-lg py-3 px-2 shadow-sm">
                    <div className="text-2xl font-bold text-[hsl(var(--biz-gold))]">90-180</div>
                    <div className="text-xs text-[hsl(var(--biz-navy))]/70">Day Partnerships</div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[hsl(var(--biz-teal))]/10 rounded-full blur-xl" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[hsl(var(--biz-gold))]/10 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomRequestHero;
