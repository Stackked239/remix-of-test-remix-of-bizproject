import { Check, Building2, Briefcase, ShoppingCart, Quote } from "lucide-react";

interface CaseStudy {
  icon: React.ElementType;
  company: string;
  revenue: string;
  challenge: string;
  solution: string;
  results: string[];
  testimonial: string;
  attribution: string;
}

const caseStudies: CaseStudy[] = [
  {
    icon: Building2,
    company: "Specialty Manufacturing",
    revenue: "$8M ARR",
    challenge: "Operational inefficiencies, cash flow constraints",
    solution: "90 days | $12,000",
    results: [
      "18% efficiency improvement (Q1)",
      "22% reduction in operating costs",
      "Team satisfaction +35%",
      "6-month scaling roadmap delivered",
    ],
    testimonial: "They didn't just identify problems. They showed us exactly how to fix them, with our team leading the way. That made the difference.",
    attribution: "CEO, Specialty Manufacturing Company",
  },
  {
    icon: Briefcase,
    company: "Consulting Firm",
    revenue: "$5M ARR",
    challenge: "Preparing for acquisition, proving scalability",
    solution: "120 days | $16,000",
    results: [
      "Company valued 40% higher post-engagement",
      "Successful acquisition (founder stayed as advisor)",
      "Team doubled in year 1 with strong foundation",
      "Buyer cited 'business systems readiness' as key differentiator",
    ],
    testimonial: "Without that engagement, we couldn't have achieved the acquisition we wanted. It transformed our company from founder-dependent to scalable.",
    attribution: "Founder, Professional Services Firm",
  },
  {
    icon: ShoppingCart,
    company: "D2C E-Commerce",
    revenue: "$2.5M ARR",
    challenge: "Growing too fast; systems breaking down",
    solution: "150 days | $22,000",
    results: [
      "Cash flow visibility improved (eliminated shortfalls)",
      "Fulfillment errors reduced 70%",
      "Team turnover reduced to 8% annually (from 45%)",
      "Closed Series A ($3.5M) with strong operational diligence",
    ],
    testimonial: "They came in and got our house in order. Best investment we made before fundraising.",
    attribution: "CEO, D2C Startup",
  },
];

const CustomRequestCaseStudies = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-5 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-montserrat font-bold text-[hsl(var(--biz-navy))] mb-4">
            Proven Results: Custom Solutions at Your Scale
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            See how organizations like yours have achieved measurable outcomes 
            with custom BizGuides engagements.
          </p>
        </div>

        {/* Case Study Cards */}
        <div className="space-y-8">
          {caseStudies.map((caseStudy, index) => {
            const colorSchemes = [
              {
                iconBg: "bg-[hsl(var(--biz-teal))]/10",
                iconColor: "text-[hsl(var(--biz-teal))]",
                borderLeft: "border-l-[hsl(var(--biz-teal))]",
                solutionColor: "text-[hsl(var(--biz-teal))]",
                checkColor: "text-[hsl(var(--biz-teal))]",
                quoteColor: "text-[hsl(var(--biz-teal))]/30",
              },
              {
                iconBg: "bg-[hsl(var(--biz-blue))]/10",
                iconColor: "text-[hsl(var(--biz-blue))]",
                borderLeft: "border-l-[hsl(var(--biz-blue))]",
                solutionColor: "text-[hsl(var(--biz-blue))]",
                checkColor: "text-[hsl(var(--biz-blue))]",
                quoteColor: "text-[hsl(var(--biz-blue))]/30",
              },
              {
                iconBg: "bg-[hsl(var(--biz-green))]/10",
                iconColor: "text-[hsl(var(--biz-green))]",
                borderLeft: "border-l-[hsl(var(--biz-green))]",
                solutionColor: "text-[hsl(var(--biz-green))]",
                checkColor: "text-[hsl(var(--biz-green))]",
                quoteColor: "text-[hsl(var(--biz-green))]/30",
              },
            ];
            const colors = colorSchemes[index % colorSchemes.length];
            
            return (
              <div
                key={index}
                className={`bg-card rounded-xl p-6 md:p-8 border border-[hsl(var(--biz-teal))]/10 border-l-4 ${colors.borderLeft} shadow-md hover:shadow-lg transition-all duration-300`}
              >
                <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                  {/* Company Profile */}
                  <div className="lg:col-span-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 ${colors.iconBg} rounded-xl flex items-center justify-center`}>
                        <caseStudy.icon className={`w-6 h-6 ${colors.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="font-montserrat font-semibold text-[hsl(var(--biz-navy))]">
                          {caseStudy.company}
                        </h3>
                        <span className="text-sm text-muted-foreground">{caseStudy.revenue}</span>
                      </div>
                    </div>

                    <div className="bg-muted rounded-lg p-4 space-y-3">
                      <div>
                        <span className="text-xs font-semibold text-[hsl(var(--biz-navy))] uppercase tracking-wide">
                          Challenge
                        </span>
                        <p className="text-sm text-muted-foreground mt-1">{caseStudy.challenge}</p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-[hsl(var(--biz-navy))] uppercase tracking-wide">
                          Solution
                        </span>
                        <p className={`text-sm ${colors.solutionColor} font-medium mt-1`}>{caseStudy.solution}</p>
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="lg:col-span-1">
                    <h4 className="text-xs font-semibold text-[hsl(var(--biz-navy))] uppercase tracking-wide mb-4">
                      Results
                    </h4>
                    <ul className="space-y-3">
                      {caseStudy.results.map((result, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-[hsl(var(--biz-navy))]">
                          <Check className={`w-4 h-4 ${colors.checkColor} flex-shrink-0 mt-0.5`} />
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Testimonial */}
                  <div className="lg:col-span-1">
                    <div className={`bg-muted rounded-lg p-5 border-l-[3px] ${colors.borderLeft} h-full flex flex-col justify-center`}>
                      <Quote className={`w-8 h-8 ${colors.quoteColor} mb-3`} />
                      <p className="text-sm text-[hsl(var(--biz-navy))] leading-relaxed italic mb-4">
                        "{caseStudy.testimonial}"
                      </p>
                      <p className="text-xs font-semibold text-muted-foreground">
                        — {caseStudy.attribution}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CustomRequestCaseStudies;
