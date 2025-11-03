import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import GlobalFooter from "@/components/GlobalFooter";
import PricingStoryBrandHeader from "@/components/PricingStoryBrandHeader";
import SEO from "@/components/SEO";
import { CheckCircle, Star, ArrowRight, DollarSign, Rocket, Check, X, Lock, ChevronDown, ChevronUp, TrendingDown, TrendingUp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Pricing = () => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tiers = [
    {
      name: "Essentials",
      price: "$99",
      originalPrice: "$199",
      savings: "$100",
      description: "Perfect for startups and small businesses getting their first comprehensive health check",
      features: [
        "45-question focused assessment",
        "Basic business health score",
        "Core recommendations report",
        "Industry benchmark comparison",
        "PDF download",
        "Email support"
      ],
      popular: false,
      bestForStartups: true,
      cta: "Start Essentials Assessment"
    },
    {
      name: "Growth", 
      price: "$299",
      originalPrice: "$499",
      savings: "$200",
      description: "Ideal for growing businesses ready for detailed analysis and strategic planning",
      features: [
        "75+ question assessment",
        "Advanced health scoring with sub-categories",
        "Detailed strategic recommendations",
        "Competitive analysis insights",
        "Financial health deep-dive",
        "90-day progress tracking",
        "Priority email support",
        "Implementation timeline"
      ],
      popular: true,
      cta: "Start Growth Assessment"
    },
    {
      name: "Enterprise",
      price: "$499",
      originalPrice: "$799",
      savings: "$300",
      description: "Complete solution for established businesses planning major transitions or exits",
      features: [
        "Comprehensive business assessment",
        "Complete business valuation insights",
        "Exit strategy recommendations",
        "Risk assessment & mitigation plans",
        "Market positioning analysis",
        "Leadership transition planning",
        "Quarterly review sessions",
        "Direct consultant access",
        "Custom action plan development"
      ],
      popular: false,
      bestValue: true,
      cta: "Start Enterprise Assessment"
    }
  ];

  // Feature comparison data
  const featureCategories = [
    {
      name: "Business Fundamentals",
      tooltip: "Core 6-dimension analysis covering essential operations",
      features: [
        { name: "Sales", tooltip: "Revenue generation and pipeline analysis" },
        { name: "Marketing", tooltip: "Brand positioning and customer acquisition" },
        { name: "HR", tooltip: "Human resources and talent management" },
        { name: "Operations", tooltip: "Efficiency and process optimization" },
        { name: "Finance", tooltip: "Financial health and cash flow management" },
        { name: "Customer Experience", tooltip: "Retention and satisfaction metrics" }
      ],
      essentials: true,
      growth: true,
      enterprise: true
    },
    {
      name: "Growth & Scale Elements",
      tooltip: "Advanced 6-dimension strategic planning for expansion",
      features: [
        { name: "Strategy", tooltip: "Long-term planning and competitive positioning" },
        { name: "Leadership", tooltip: "Team effectiveness and organizational structure" },
        { name: "IT & Technology", tooltip: "Digital transformation and tech stack optimization" },
        { name: "Risk Management", tooltip: "Compliance, security, and contingency planning" }
      ],
      essentials: false,
      growth: true,
      enterprise: true
    },
    {
      name: "Business Analysis",
      tooltip: "Depth and scope of analyses and analytical insights provided",
      features: [
        { name: "Basic", tooltip: "Core metrics and fundamental insights", essentials: true, growth: false, enterprise: false },
        { name: "Comprehensive", tooltip: "12-Dimension AI insights with advanced analytics", essentials: false, growth: true, enterprise: true }
      ],
      isAnalysis: true
    },
    {
      name: "Report Types",
      tooltip: "Deliverable formats tailored to stakeholder needs",
      sublist: true,
      features: [
        { name: "Comprehensive Report", tooltip: "Full business health overview with all metrics", essentials: true, growth: true, enterprise: true },
        { name: "Owner's Report", tooltip: "Executive summary for decision-makers", essentials: true, growth: true, enterprise: true },
        { name: "Stakeholders Report", tooltip: "Investor-ready performance documentation", essentials: false, growth: false, enterprise: false, locked: true },
        { 
          name: "Managers' Reports (5)", 
          tooltip: "Department-specific insights for Sales, Marketing, Operations, Finance, Customer Success",
          essentials: false, 
          growth: false, 
          enterprise: true,
          locked: true
        },
        { name: "Employees' Report", tooltip: "Team-level insights and engagement metrics", essentials: false, growth: false, enterprise: true, locked: true }
      ]
    },
    {
      name: "Personalized Success Manager",
      tooltip: "Your personal ally for troubleshooting, inquiries, and account management",
      sublist: true,
      features: [
        { name: "Dedicated Client Success Partner (CSP)", tooltip: "Your personal ally for troubleshooting, inquiries, and account management", essentials: false, growth: false, enterprise: true }
      ]
    }
  ];

  const faqs = [
    {
      question: "What happens after I complete the assessment?",
      answer: "You'll receive your business health assessment reports within 90 minutes; you will be notified via email; Assessments and reports are generated 24/7, so there's no extended waiting."
    },
    {
      question: "Can I upgrade my assessment after purchase?",
      answer: (
        <>
          Yes, you can upgrade to a higher tier within 30 days of your initial purchase. Simply contact our support team{" "}
          <a 
            href="mailto:support@bizhealth.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            [support@bizhealth.ai]
          </a>{" "}
          and we'll apply your previous payment as credit.
        </>
      )
    },
    {
      question: "Is my business data secure?",
      answer: "Your data is safeguarded with industry-standard encryption and robust security protocols, ensuring your business insights remain private and secure. We comply with all applicable data protection regulations, providing you peace of mind."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Transparent Pricing - Business Diagnostics That Scale | BizHealth.ai"
        description="Affordable business diagnostics and tiered solutions that help you identify gaps, confirm strengths, and fuel sustainable success. Transparent pricing for small business analysis and strategic planning."
        keywords="business diagnostics, small business pricing, tiered solutions, transparent pricing, affordable AI business health, SMB solutions, business health assessment pricing"
        canonical="https://bizhealth.ai/pricing"
      />
      <Navigation />
      
      {/* StoryBrand Hero Header */}
      <PricingStoryBrandHeader />
      
      {/* Feature Comparison Section */}
      <section id="feature-comparison" className="pt-20 pb-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-foreground mb-4">
                Compare Features Across Tiers
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Choose the perfect tier for your business needs. See exactly what's included in each Tier Level 
                and find the right balance of features and value.
              </p>
            </div>

            {/* Feature Comparison Matrix */}
            <div className="bg-background rounded-2xl shadow-elegant border-2 border-border overflow-hidden">
              {/* Desktop View - Table */}
              <div className="hidden md:block overflow-x-auto">
                <TooltipProvider>
                  <table className="w-full" style={{ fontFamily: 'system-ui, -apple-system, Roboto, sans-serif' }}>
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-4 font-bold text-foreground" style={{ fontSize: '20px', lineHeight: '1.5', fontWeight: '700' }}>Features</th>
                        <th className="text-center p-4 font-bold text-primary" style={{ fontSize: '20px', lineHeight: '1.5', fontWeight: '700' }}>
                          Essentials
                        </th>
                        <th className="text-center p-4 font-bold text-primary" style={{ fontSize: '20px', lineHeight: '1.5', fontWeight: '700' }}>
                          Growth
                        </th>
                        <th className="text-center p-4 font-bold text-primary" style={{ fontSize: '20px', lineHeight: '1.5', fontWeight: '700' }}>
                          Enterprise
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {featureCategories.map((category, catIndex) => (
                        <React.Fragment key={catIndex}>
                          <tr className="border-t-2 border-border bg-growth/10">
                            <td colSpan={4} className="p-4">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="font-semibold text-foreground flex items-center gap-2 cursor-help" style={{ fontSize: '18px', lineHeight: '1.5' }}>
                                    {category.name}
                                    <span className="text-sm text-muted-foreground">ⓘ</span>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{category.tooltip}</p>
                                </TooltipContent>
                              </Tooltip>
                            </td>
                          </tr>
                          {category.isAnalysis ? (
                            category.features.map((feature, idx) => (
                              <tr key={idx} className="border-t border-border hover:bg-muted/20 transition-colors">
                                <td className="p-4 pl-8">
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <span className="text-foreground cursor-help flex items-center gap-2" style={{ fontSize: '15px', lineHeight: '1.5' }}>
                                        {feature.name}
                                        <span className="text-sm">ⓘ</span>
                                      </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{feature.tooltip}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </td>
                                <td className="p-4 text-center">
                                  {feature.essentials ? (
                                    <Check className="w-6 h-6 mx-auto" style={{ color: '#28A745' }} />
                                  ) : (
                                    <X className="w-6 h-6 mx-auto" style={{ color: '#DC3545' }} />
                                  )}
                                </td>
                                <td className="p-4 text-center">
                                  {feature.growth ? (
                                    <Check className="w-6 h-6 mx-auto" style={{ color: '#28A745' }} />
                                  ) : (
                                    <X className="w-6 h-6 mx-auto" style={{ color: '#DC3545' }} />
                                  )}
                                </td>
                                <td className="p-4 text-center">
                                  {feature.enterprise ? (
                                    <Check className="w-6 h-6 mx-auto" style={{ color: '#28A745' }} />
                                  ) : (
                                    <X className="w-6 h-6 mx-auto" style={{ color: '#DC3545' }} />
                                  )}
                                </td>
                              </tr>
                            ))
                          ) : category.sublist ? (
                            category.features.map((feature, idx) => (
                              <tr key={idx} className="border-t border-border hover:bg-muted/20 transition-colors">
                                <td className="p-4 pl-8">
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <span className="text-foreground cursor-help flex items-center gap-2" style={{ fontSize: '15px', lineHeight: '1.5' }}>
                                        {feature.name}
                                        <span className="text-sm">ⓘ</span>
                                      </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{feature.tooltip}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </td>
                                <td className="p-4 text-center">
                                  {feature.name === "Stakeholders Report" ? (
                                    <X className="w-6 h-6 mx-auto" style={{ color: '#DC3545' }} />
                                  ) : feature.locked && !feature.essentials ? (
                                    <Lock className="w-6 h-6 mx-auto" style={{ color: '#6B7280' }} />
                                  ) : feature.essentials ? (
                                    <Check className="w-6 h-6 mx-auto" style={{ color: '#28A745' }} />
                                  ) : (
                                    <X className="w-6 h-6 mx-auto" style={{ color: '#DC3545' }} />
                                  )}
                                </td>
                                <td className="p-4 text-center">
                                  {feature.locked && !feature.growth ? (
                                    <Lock className="w-6 h-6 mx-auto" style={{ color: '#6B7280' }} />
                                  ) : feature.growth ? (
                                    <Check className="w-6 h-6 mx-auto" style={{ color: '#28A745' }} />
                                  ) : (
                                    <X className="w-6 h-6 mx-auto" style={{ color: '#DC3545' }} />
                                  )}
                                </td>
                                <td className="p-4 text-center">
                                  {feature.locked && !feature.enterprise ? (
                                    <Lock className="w-6 h-6 mx-auto" style={{ color: '#6B7280' }} />
                                  ) : feature.enterprise ? (
                                    <Check className="w-6 h-6 mx-auto" style={{ color: '#28A745' }} />
                                  ) : (
                                    <X className="w-6 h-6 mx-auto" style={{ color: '#DC3545' }} />
                                  )}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr className="border-t border-border hover:bg-muted/20 transition-colors">
                              <td className="p-4 pl-8 text-foreground" style={{ fontSize: '15px', lineHeight: '1.5' }}>
                                {category.features.map(f => f.name).join(', ')}
                              </td>
                              <td className="p-4 text-center">
                                {category.essentials ? (
                                  <Check className="w-6 h-6 mx-auto" style={{ color: '#28A745' }} />
                                ) : (
                                  <X className="w-6 h-6 mx-auto" style={{ color: '#DC3545' }} />
                                )}
                              </td>
                              <td className="p-4 text-center">
                                {category.growth ? (
                                  <Check className="w-6 h-6 mx-auto" style={{ color: '#28A745' }} />
                                ) : (
                                  <X className="w-6 h-6 mx-auto" style={{ color: '#DC3545' }} />
                                )}
                              </td>
                              <td className="p-4 text-center">
                                {category.enterprise ? (
                                  <Check className="w-6 h-6 mx-auto" style={{ color: '#28A745' }} />
                                ) : (
                                  <X className="w-6 h-6 mx-auto" style={{ color: '#DC3545' }} />
                                )}
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </TooltipProvider>
              </div>

              {/* Mobile View - Accordion */}
              <div className="md:hidden">
                <TooltipProvider>
                  {featureCategories.map((category, catIndex) => (
                    <div key={catIndex} className="border-b-2 border-border">
                      <button
                        onClick={() => setExpandedRow(expandedRow === catIndex ? null : catIndex)}
                        className="w-full p-4 flex items-center justify-between bg-growth/10 hover:bg-growth/20 transition-colors"
                      >
                        <span className="font-bold text-foreground text-left" style={{ fontSize: '18px', lineHeight: '1.5', fontWeight: '700' }}>
                          {category.name}
                        </span>
                        {expandedRow === catIndex ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </button>
                      
                      {expandedRow === catIndex && (
                        <div className="p-4 space-y-3 bg-background">
                          <p className="text-sm text-muted-foreground mb-3">{category.tooltip}</p>
                          
                          {category.isAnalysis || category.sublist ? (
                            category.features.map((feature, idx) => (
                              <div key={idx} className="space-y-2">
                                <div className="font-medium text-foreground flex items-center gap-2" style={{ fontSize: '15px', lineHeight: '1.5' }}>
                                  {feature.name}
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <span className="text-sm text-muted-foreground cursor-help">ⓘ</span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{feature.tooltip}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-center">
                                  <div>
                                    <div className="text-sm font-bold text-primary mb-1">Essentials</div>
                                    {feature.name === "Stakeholders Report" ? (
                                      <X className="w-5 h-5 mx-auto" style={{ color: '#DC3545' }} />
                                    ) : feature.locked && !feature.essentials ? (
                                      <Lock className="w-5 h-5 mx-auto" style={{ color: '#6B7280' }} />
                                    ) : feature.essentials ? (
                                      <Check className="w-5 h-5 mx-auto" style={{ color: '#28A745' }} />
                                    ) : (
                                      <X className="w-5 h-5 mx-auto" style={{ color: '#DC3545' }} />
                                    )}
                                  </div>
                                  <div>
                                    <div className="text-sm font-bold text-primary mb-1">Growth</div>
                                    {feature.locked && !feature.growth ? (
                                      <Lock className="w-5 h-5 mx-auto" style={{ color: '#6B7280' }} />
                                    ) : feature.growth ? (
                                      <Check className="w-5 h-5 mx-auto" style={{ color: '#28A745' }} />
                                    ) : (
                                      <X className="w-5 h-5 mx-auto" style={{ color: '#DC3545' }} />
                                    )}
                                  </div>
                                  <div>
                                    <div className="text-sm font-bold text-primary mb-1">Enterprise</div>
                                    {feature.locked && !feature.enterprise ? (
                                      <Lock className="w-5 h-5 mx-auto" style={{ color: '#6B7280' }} />
                                    ) : feature.enterprise ? (
                                      <Check className="w-5 h-5 mx-auto" style={{ color: '#28A745' }} />
                                    ) : (
                                      <X className="w-5 h-5 mx-auto" style={{ color: '#DC3545' }} />
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <>
                              <div className="text-sm text-foreground mb-3">
                                Includes: {category.features.map(f => f.name).join(', ')}
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-center">
                                <div>
                                  <div className="text-sm font-bold text-primary mb-1">Essentials</div>
                                  {category.essentials ? (
                                    <Check className="w-5 h-5 mx-auto" style={{ color: '#28A745' }} />
                                  ) : (
                                    <X className="w-5 h-5 mx-auto" style={{ color: '#DC3545' }} />
                                  )}
                                </div>
                                <div>
                                  <div className="text-sm font-bold text-primary mb-1">Growth</div>
                                  {category.growth ? (
                                    <Check className="w-5 h-5 mx-auto" style={{ color: '#28A745' }} />
                                  ) : (
                                    <X className="w-5 h-5 mx-auto" style={{ color: '#DC3545' }} />
                                  )}
                                </div>
                                <div>
                                  <div className="text-sm font-bold text-primary mb-1">Enterprise</div>
                                  {category.enterprise ? (
                                    <Check className="w-5 h-5 mx-auto" style={{ color: '#28A745' }} />
                                  ) : (
                                    <X className="w-5 h-5 mx-auto" style={{ color: '#DC3545' }} />
                                  )}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </TooltipProvider>
              </div>

              {/* Legend */}
              <div className="bg-gradient-to-r from-muted/40 via-muted/30 to-muted/40 px-6 py-5 border-t-2 border-border">
                <div className="flex flex-wrap items-center justify-center gap-6 text-base">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5" style={{ color: '#28A745' }} />
                    <span className="text-foreground font-medium">Included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <X className="w-5 h-5" style={{ color: '#DC3545' }} />
                    <span className="text-foreground font-medium">Not included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-5 h-5" style={{ color: '#6B7280' }} />
                    <span className="text-foreground font-medium">Optional upgrade</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section id="pricing-tiers" className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {tiers.map((tier, index) => (
              <div key={index} className={`relative rounded-2xl border-2 p-8 flex flex-col ${tier.popular || tier.bestValue || tier.bestForStartups ? 'border-primary bg-muted scale-105' : 'border-border bg-background'} shadow-card hover:shadow-elegant transition-all duration-300`}>
                {tier.bestForStartups && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-growth text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2 whitespace-nowrap">
                      <Rocket className="w-4 h-4" />
                      Best for Startups
                    </div>
                  </div>
                )}
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2 whitespace-nowrap">
                      <Star className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}
                {tier.bestValue && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div style={{ backgroundColor: '#8CBF2F' }} className="text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2 whitespace-nowrap">
                      <DollarSign className="w-4 h-4" />
                      Best Value
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-foreground">{tier.name}</h3>
                  <div className="mb-2">
                    <div className="inline-block px-3 py-1 rounded-full shadow-lg" style={{ backgroundColor: '#FFC107', border: '2px solid #FFA000' }}>
                      <span className="font-bold text-xs" style={{ color: '#000000' }}>⏰ Limited Time Offer</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-lg text-muted-foreground line-through">{tier.originalPrice}</span>
                    <span className="text-4xl font-bold text-primary">{tier.price}</span>
                  </div>
                  <div className="text-sm font-semibold text-growth mb-4">Save {tier.savings}!</div>
                  <p className="text-muted-foreground leading-relaxed">{tier.description}</p>
                </div>
                
                <ul className="space-y-4 mb-8 flex-grow">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-growth mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {tier.name === 'Essentials' ? (
                  <Link
                    to="/register"
                    className="w-full py-4 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-between mt-auto relative"
                    style={{
                      backgroundColor: 'hsl(59, 62%, 36%)',
                      color: 'white',
                      transform: 'scale(1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <span className="flex-1 text-center">{tier.cta}</span>
                    <ArrowRight className="w-4 h-4 absolute right-6" />
                  </Link>
                ) : tier.name === 'Enterprise' ? (
                  <Link
                    to="/register"
                    className="w-full py-4 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-between mt-auto relative"
                    style={{
                      backgroundColor: 'hsl(81, 61%, 47%)',
                      color: 'white',
                      transform: 'scale(1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <span className="flex-1 text-center">{tier.cta}</span>
                    <ArrowRight className="w-4 h-4 absolute right-6" />
                  </Link>
                ) : (
                  <Link
                    to="/register"
                    className="w-full py-4 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-between mt-auto relative"
                    style={{
                      backgroundColor: 'hsl(239, 35%, 23%)',
                      color: 'white',
                      transform: 'scale(1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <span className="flex-1 text-center">{tier.cta}</span>
                    <ArrowRight className="w-4 h-4 absolute right-6" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Why BizHealth.ai Delivers Exceptional Value
              </h2>
              <p className="text-lg text-muted-foreground">
                Compare traditional consulting to our AI-powered solution
              </p>
            </div>
            <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 mt-12 items-center">
              {/* Traditional Consulting Side */}
              <div className="bg-background border-2 border-destructive/30 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                    <TrendingDown className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Traditional Consulting</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">$5,000 - $25,000+ investment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">4-6 weeks for initial assessment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">General recommendations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Costly follow-up support</span>
                  </li>
                </ul>
              </div>

              {/* VS Divider */}
              <div className="hidden md:flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  VS
                </div>
              </div>

              {/* BizHealth.ai Side */}
              <div className="bg-background border-2 border-primary rounded-2xl p-8 shadow-lg">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">BizHealth.ai</h3>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#8CBF2F' }} />
                      <span className="text-foreground font-medium">$99 - $499 one-time fee (Limited Time!)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#8CBF2F' }} />
                      <span className="text-foreground font-medium">Results in minutes, not weeks</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#8CBF2F' }} />
                      <span className="text-foreground font-medium">Actionable insights specific to your business</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#8CBF2F' }} />
                      <span className="text-foreground font-medium">Ongoing support and updates</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-border rounded-lg p-6 bg-background">
                  <h3 className="text-lg font-semibold mb-3 text-foreground">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
            
            {/* More FAQs CTA */}
            <div className="text-center mt-10">
              <a 
                href="/faqs" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                Still have questions? Check our FAQs
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-growth">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Discover Your Path to Improvement
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of business leaders who rely on BizHealth.ai for clear, actionable insights tailored to your growth goals.
            </p>
            <a 
              href="/how-it-works" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
};

export default Pricing;