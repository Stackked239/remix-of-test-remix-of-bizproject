import Navigation from "@/components/Navigation";
import GlobalFooter from "@/components/GlobalFooter";
import { BookOpen, Calculator, TrendingUp, FileText, ExternalLink, Users, DollarSign, Target } from "lucide-react";

const Resources = () => {
  const resourceCategories = [
    {
      title: "Business Calculators",
      icon: Calculator,
      description: "Essential financial and business calculators to support your decision-making",
      resources: [
        {
          name: "Break-Even Analysis Calculator",
          description: "Determine the point where your business becomes profitable",
          link: "#",
          external: true
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
          link: "#",
          external: true
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
      category: "Growth Strategy"
    },
    {
      title: "Financial Health Indicators Every Small Business Owner Should Track",
      summary: "Learn the key metrics that provide early warning signs about your business's financial well-being.",
      readTime: "12 min read", 
      category: "Financial Management"
    },
    {
      title: "When to Pivot: Data-Driven Signals That It's Time to Change Course",
      summary: "Understand the quantifiable indicators that suggest your business model needs adjustment.",
      readTime: "10 min read",
      category: "Strategic Planning"
    },
    {
      title: "Building Operational Resilience in Uncertain Times",
      summary: "Strategies for creating business systems that can withstand market volatility and unexpected challenges.",
      readTime: "15 min read",
      category: "Operations"
    }
  ];

  const externalResources = [
    {
      name: "Small Business Administration (SBA)",
      description: "Comprehensive resources for small business owners including loans, guidance, and tools",
      url: "https://www.sba.gov",
      category: "Government Resources"
    },
    {
      name: "SCORE Business Mentors",
      description: "Free business mentoring and education from experienced volunteers",
      url: "https://www.score.org",
      category: "Mentorship"
    },
    {
      name: "Industry-Specific Associations",
      description: "Find your industry association for specialized insights and networking",
      url: "#",
      category: "Networking"
    },
    {
      name: "Bureau of Labor Statistics",
      description: "Economic data and industry insights to inform your business decisions",
      url: "https://www.bls.gov",
      category: "Market Data"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">
              Business Resources & Tools
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Comprehensive collection of calculators, templates, guides, and insights to support your business growth journey. 
              Everything you need to make informed decisions and drive sustainable success.
            </p>
            <div className="mt-8">
              <img 
                src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80" 
                alt="Business innovation and ideas represented by glowing light bulb"
                className="rounded-xl shadow-feature mx-auto max-w-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {resourceCategories.map((category, index) => (
            <div key={index} className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-primary/10">
                  <category.icon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{category.title}</h2>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.resources.map((resource, idx) => (
                  <div key={idx} className="border border-border rounded-lg p-6 bg-background hover:shadow-card transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-foreground text-sm leading-tight">{resource.name}</h3>
                      {resource.external && <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
                    </div>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{resource.description}</p>
                    <a 
                      href={resource.link} 
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                    >
                      Access Tool
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Insights & Articles */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Latest Business Insights
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              In-depth articles and analysis to help you navigate complex business challenges
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {insightArticles.map((article, index) => (
              <div key={index} className="border border-border rounded-lg p-6 bg-background hover:shadow-card transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{article.category}</span>
                  <span className="text-xs text-muted-foreground">{article.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground leading-tight">{article.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{article.summary}</p>
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Read Article
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              External Resources & Partners
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Curated links to valuable external resources and trusted partners in the business community
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {externalResources.map((resource, index) => (
              <div key={index} className="border border-border rounded-lg p-6 bg-background hover:shadow-card transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-foreground text-sm">{resource.name}</h3>
                  <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                </div>
                <p className="text-xs text-primary mb-2">{resource.category}</p>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{resource.description}</p>
                <a 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                >
                  Visit Resource
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready for Personalized Insights?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              While these resources provide valuable general guidance, our AI-powered assessment delivers insights specific to your business
            </p>
            <a 
              href="/pricing" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get Your Custom Assessment
            </a>
          </div>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
};

export default Resources;