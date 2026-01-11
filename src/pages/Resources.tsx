import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import PromotionalBanner from "@/components/PromotionalBanner";
import SEO from "@/components/SEO";
import { BookOpen, Calculator, TrendingUp, FileText, ExternalLink, Users, DollarSign, Target, Sparkles, ArrowRight } from "lucide-react";

const Resources = () => {
  const resourceCategories = [
    {
      title: "Business Calculators",
      icon: Calculator,
      color: "biz-teal",
      description: "Essential financial and business calculators to support your decision-making",
      resources: [
        {
          name: "Break-Even Analysis Calculator",
          description: "Determine the point where your business becomes profitable",
          link: "/biztools/toolbox/breakeven-analysis-calculator",
          external: false
        },
        {
          name: "Cash Flow Projection Tool",
          description: "Forecast your business cash flow for the next 12 months", 
          link: "#",
          external: true
        },
        {
          name: "ROI Calculator",
          description: "Calculate return on investment for new projects and initiatives",
          link: "/biztools/toolbox/free-roi-calculator",
          external: false
        },
        {
          name: "Business Valuation Estimator",
          description: "Get an estimated valuation of your business based on key metrics",
          link: "#",
          external: true
        }
      ]
    },
    {
      title: "Strategic Planning Resources",
      icon: Target,
      color: "biz-copper",
      description: "Tools and templates to help you plan and execute your business strategy",
      resources: [
        {
          name: "SWOT Analysis Template",
          description: "Comprehensive template for analyzing strengths, weaknesses, opportunities, and threats",
          link: "#",
          external: false
        },
        {
          name: "Business Model Canvas",
          description: "Visual template for developing new or documenting existing business models",
          link: "#",
          external: false
        },
        {
          name: "Market Analysis Framework",
          description: "Step-by-step guide to analyzing your target market and competition",
          link: "#",
          external: false
        },
        {
          name: "Goal Setting Worksheet",
          description: "SMART goals framework specifically designed for business objectives",
          link: "#",
          external: false
        }
      ]
    },
    {
      title: "Financial Management",
      icon: DollarSign,
      color: "biz-green",
      description: "Resources to help you better manage your business finances",
      resources: [
        {
          name: "Small Business Accounting Guide",
          description: "Complete guide to managing your books and understanding financial statements",
          link: "#",
          external: false
        },
        {
          name: "Tax Planning Checklist",
          description: "Year-round tax planning strategies for small business owners",
          link: "#",
          external: false
        },
        {
          name: "Funding Options Comparison",
          description: "Compare different funding sources from loans to investors",
          link: "#",
          external: false
        },
        {
          name: "Expense Management System",
          description: "Template and best practices for tracking business expenses",
          link: "#",
          external: false
        }
      ]
    },
    {
      title: "Growth & Scaling",
      icon: TrendingUp,
      color: "biz-lime",
      description: "Insights and tools for scaling your business effectively",
      resources: [
        {
          name: "Market Expansion Guide",
          description: "Strategic framework for entering new markets or geographic regions",
          link: "#",
          external: false
        },
        {
          name: "Operations Scaling Checklist",
          description: "Essential steps for scaling your operations without losing quality",
          link: "#",
          external: false
        },
        {
          name: "Team Building Framework",
          description: "Guide to building and managing teams as you grow",
          link: "#",
          external: false
        },
        {
          name: "Digital Transformation Roadmap",
          description: "Step-by-step approach to digitizing your business processes",
          link: "#",
          external: false
        }
      ]
    }
  ];

  const insightArticles = [
    {
      title: "The Hidden Costs of Rapid Growth: What Every Entrepreneur Needs to Know",
      summary: "Discover the often-overlooked expenses that come with scaling your business and how to prepare for them.",
      readTime: "8 min read",
      category: "Growth Strategy",
      color: "biz-teal"
    },
    {
      title: "Financial Health Indicators Every Small Business Owner Should Track",
      summary: "Learn the key metrics that provide early warning signs about your business's financial well-being.",
      readTime: "12 min read", 
      category: "Financial Management",
      color: "biz-green"
    },
    {
      title: "When to Pivot: Data-Driven Signals That It's Time to Change Course",
      summary: "Understand the quantifiable indicators that suggest your business model needs adjustment.",
      readTime: "10 min read",
      category: "Strategic Planning",
      color: "biz-copper"
    },
    {
      title: "Building Operational Resilience in Uncertain Times",
      summary: "Strategies for creating business systems that can withstand market volatility and unexpected challenges.",
      readTime: "15 min read",
      category: "Operations",
      color: "biz-lime"
    }
  ];

  const externalResources = [
    {
      name: "Small Business Administration (SBA)",
      description: "Comprehensive resources for small business owners including loans, guidance, and tools",
      url: "https://www.sba.gov",
      category: "Government Resources",
      color: "biz-navy"
    },
    {
      name: "SCORE Business Mentors",
      description: "Free business mentoring and education from experienced volunteers",
      url: "https://www.score.org",
      category: "Mentorship",
      color: "biz-teal"
    },
    {
      name: "Industry-Specific Associations",
      description: "Find your industry association for specialized insights and networking",
      url: "https://directoryofassociations.com/",
      category: "Networking",
      color: "biz-copper"
    },
    {
      name: "Bureau of Labor Statistics",
      description: "Economic data and industry insights to inform your business decisions",
      url: "https://www.bls.gov",
      category: "Market Data",
      color: "biz-green"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string; border: string; light: string }> = {
      "biz-green": {
        bg: "bg-biz-green",
        text: "text-biz-green",
        border: "border-biz-green",
        light: "bg-biz-green/10"
      },
      "biz-teal": {
        bg: "bg-biz-teal",
        text: "text-biz-teal",
        border: "border-biz-teal",
        light: "bg-biz-teal/10"
      },
      "biz-copper": {
        bg: "bg-biz-copper",
        text: "text-biz-copper",
        border: "border-biz-copper",
        light: "bg-biz-copper/10"
      },
      "biz-lime": {
        bg: "bg-biz-lime",
        text: "text-biz-lime",
        border: "border-biz-lime",
        light: "bg-biz-lime/10"
      },
      "biz-navy": {
        bg: "bg-biz-navy",
        text: "text-biz-navy",
        border: "border-biz-navy",
        light: "bg-biz-navy/10"
      }
    };
    return colorMap[color] || colorMap["biz-green"];
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Business Resources & Tools | BizHealth.ai"
        description="Access free business calculators, strategic planning templates, financial management guides, and growth resources for SMB owners."
        keywords="business resources, SMB tools, business calculators, strategic planning templates, financial management"
        canonical="https://bizhealth.ai/resources"
        ogImage="https://bizhealth.ai/og-images/og-resources.jpg"
      />
      <PromotionalBanner />
      <GlobalNavigation />
      
      {/* Hero Section - Enhanced with gradient */}
      <section className="pt-40 pb-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(var(--biz-navy)) 0%, hsl(var(--biz-navy) / 0.9) 50%, hsl(var(--biz-teal) / 0.3) 100%)' }}>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-biz-green/20 rounded-full blur-3xl z-[1]" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-biz-teal/15 rounded-full blur-3xl z-[1]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-white/50 mb-6">
              <Sparkles className="w-4 h-4 text-biz-green" />
              <span className="text-sm font-medium text-biz-green">Resources for SMB/SME Leaders</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Business Resources & Tools
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-3xl mx-auto">
              Comprehensive collection of calculators, templates, guides, and insights to support your business growth journey. 
              Everything you need to make informed decisions and drive sustainable success.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <a href="#calculators" className="inline-flex items-center gap-2 px-6 py-3 bg-biz-green text-white font-semibold rounded-xl hover:bg-biz-green/90 transition-all hover:-translate-y-0.5 shadow-lg">
                <Calculator className="w-5 h-5" />
                Explore Calculators
              </a>
              <a href="#insights" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-0.5">
                <BookOpen className="w-5 h-5" />
                Read Insights
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Categories - Alternating backgrounds */}
      <section id="calculators" className="py-20">
        <div className="container mx-auto px-6">
          {resourceCategories.map((category, index) => {
            const colors = getColorClasses(category.color);
            const isEven = index % 2 === 0;
            
            return (
              <div 
                key={index} 
                className={`mb-16 p-8 rounded-2xl ${isEven ? 'bg-background' : 'bg-muted'}`}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className={`p-4 rounded-xl ${colors.light}`}>
                    <category.icon className={`w-8 h-8 ${colors.text}`} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{category.title}</h2>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.resources.map((resource, idx) => (
                    <div 
                      key={idx} 
                      className={`group border-2 rounded-xl p-6 bg-background hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${colors.border} border-opacity-20 hover:border-opacity-100`}
                      style={{ borderColor: `hsl(var(--${category.color}) / 0.2)` }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = `hsl(var(--${category.color}))`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = `hsl(var(--${category.color}) / 0.2)`;
                      }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-foreground text-sm leading-tight">{resource.name}</h3>
                        {resource.external && <ExternalLink className={`w-4 h-4 ${colors.text} flex-shrink-0 opacity-60`} />}
                      </div>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{resource.description}</p>
                      <a 
                        href={resource.link} 
                        className={`inline-flex items-center gap-2 ${colors.text} hover:opacity-80 transition-colors text-sm font-medium group-hover:gap-3`}
                      >
                        Access Tool
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Insights & Articles - With colored accents */}
      <section id="insights" className="py-20" style={{ background: 'linear-gradient(180deg, hsl(var(--biz-navy) / 0.05) 0%, hsl(var(--biz-teal) / 0.08) 100%)' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-biz-teal/10 border border-biz-teal/20 mb-4">
              <BookOpen className="w-4 h-4 text-biz-teal" />
              <span className="text-sm font-medium text-biz-teal">Expert Analysis</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Latest Business Insights
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              In-depth articles and analysis to help you navigate complex business challenges
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {insightArticles.map((article, index) => {
              const colors = getColorClasses(article.color);
              return (
                <div 
                  key={index} 
                  className="group border-2 rounded-xl p-6 bg-background hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  style={{ borderColor: `hsl(var(--${article.color}) / 0.2)` }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `hsl(var(--${article.color}))`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `hsl(var(--${article.color}) / 0.2)`;
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span 
                      className={`text-xs px-3 py-1 rounded-full font-medium ${colors.light} ${colors.text}`}
                    >
                      {article.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground leading-tight group-hover:text-biz-navy transition-colors">{article.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{article.summary}</p>
                  <a 
                    href="#" 
                    className={`inline-flex items-center gap-2 ${colors.text} hover:opacity-80 transition-colors font-medium group-hover:gap-3`}
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* External Resources - Card grid with colors */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-biz-copper/10 border border-biz-copper/20 mb-4">
              <Users className="w-4 h-4 text-biz-copper" />
              <span className="text-sm font-medium text-biz-copper">Trusted Partners</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              External Resources & Partners
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Curated links to valuable external resources and trusted partners in the business community
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {externalResources.map((resource, index) => {
              const colors = getColorClasses(resource.color);
              return (
                <div 
                  key={index} 
                  className="group border-2 rounded-xl p-6 bg-background hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  style={{ borderColor: `hsl(var(--${resource.color}) / 0.2)` }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `hsl(var(--${resource.color}))`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `hsl(var(--${resource.color}) / 0.2)`;
                  }}
                >
                  <div className={`p-3 rounded-lg w-fit mb-4 ${colors.light}`}>
                    <ExternalLink className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <span className={`text-xs font-medium ${colors.text}`}>{resource.category}</span>
                  <h3 className="font-semibold text-foreground text-sm mt-2 mb-2">{resource.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{resource.description}</p>
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener"
                    className={`inline-flex items-center gap-2 ${colors.text} hover:opacity-80 transition-colors text-sm font-medium group-hover:gap-3`}
                  >
                    Visit Resource
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - BizGreen gradient */}
      <section className="py-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(var(--biz-green)) 0%, #7a7a1d 50%, hsl(var(--biz-lime) / 0.8) 100%)' }}>
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-biz-navy">
              Ready for Personalized Insights?
            </h2>
            <p className="text-xl mb-8 text-white">
              While these resources provide valuable general guidance, our proprietary AI-powered assessment delivers diagnostics & actionable insights specific to your business
            </p>
            <a 
              href="/pricing" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-biz-navy text-white font-semibold rounded-xl hover:bg-biz-navy/90 transition-all hover:-translate-y-0.5 shadow-lg"
            >
              Get Your Custom Assessment
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
};

export default Resources;
