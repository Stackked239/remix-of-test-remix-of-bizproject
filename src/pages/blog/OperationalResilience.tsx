import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const OperationalResilience = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            
            <div className="mb-6">
              <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
                Business Strategy
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
              Building Operational Resilience in Uncertain Times
            </h1>
            
            <div className="flex items-center gap-6 mb-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Michael Rodriguez</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>September 12, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>11 min read</span>
              </div>
            </div>
            
            <img 
              src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80" 
              alt="Business resilience and crisis management strategy"
              className="rounded-xl shadow-elegant w-full"
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Strategies for creating business systems that can withstand market volatility and unexpected challenges. In 2025, small and medium-sized businesses face a turbulent landscape—rising interest rates, supply chain disruptions, and AI-driven market shifts. Yet, operational resilience can be a game-changer.
              </p>

              <p className="mb-6 text-muted-foreground leading-relaxed">
                A 2025 McKinsey report notes that resilient SMBs are 50% more likely to survive economic downturns and 20% more likely to outperform competitors. At BizHealth.ai, we've guided countless SMBs to build robust systems that thrive under pressure. This read shares five proven strategies, backed by real-world examples, to fortify your operations using frameworks like the Resilience Wheel from the World Economic Forum and Deloitte's 2025 resilience benchmarks.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">Why Operational Resilience Matters for SMBs</h2>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                Resilience isn't just about survival—it's about turning adversity into opportunity. Resilient SMBs can:
              </p>
              <ul className="mb-6 text-muted-foreground leading-relaxed space-y-2">
                <li>• <strong>Maintain Continuity:</strong> Keep operations running during disruptions</li>
                <li>• <strong>Protect Margins:</strong> Mitigate cost spikes and revenue dips</li>
                <li>• <strong>Build Trust:</strong> Retain customers and partners through reliability</li>
                <li>• <strong>Seize Opportunities:</strong> Pivot faster than competitors in crises</li>
              </ul>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                A 2025 PwC study found that SMBs with high resilience scores saw 25% less revenue volatility during supply chain shocks. The key? Proactive systems that anticipate, absorb, and adapt.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">Strategy 1: Diversify Revenue Streams to Buffer Volatility</h2>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                <strong>Why It Works:</strong> Relying on a single product, service, or market amplifies risk. Diversification spreads exposure, stabilizing cash flow.
              </p>
              
              <div className="bg-gradient-subtle rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-foreground mb-3">Case Study: BrightLeaf Retail (alias), a 40-employee home goods store</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong>Challenge:</strong> In 2024, a 15% tariff hike on imported goods slashed margins by 12%</li>
                  <li>• <strong>Solution:</strong> Used BI tools to identify high-margin product categories and launched an online subscription box service</li>
                  <li>• <strong>Results:</strong> New revenue stream added $100,000 annually, offsetting tariff costs; overall revenue volatility dropped 18%</li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Action Steps:</h3>
              <ul className="mb-6 text-muted-foreground leading-relaxed space-y-2">
                <li>• Audit revenue sources—aim for no single stream exceeding 50% of total</li>
                <li>• Test one new offering (e.g., subscriptions, B2B services) with a 60-day MVP</li>
                <li>• Use BizHealth.ai's forecasting tools to model revenue impacts</li>
              </ul>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">Strategy 2: Build Redundant Supply Chains</h2>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                <strong>Why It Works:</strong> A single supplier failure can halt operations. Redundancy ensures alternatives, per a 2025 Gartner report showing 30% lower downtime for diversified supply chains.
              </p>

              <div className="bg-gradient-subtle rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-foreground mb-3">Case Study: SteelCore Manufacturing (alias), a 60-employee industrial parts producer</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong>Challenge:</strong> A 2024 port strike delayed 40% of raw material deliveries, costing $80,000 in lost production</li>
                  <li>• <strong>Solution:</strong> Sourced two additional regional suppliers and used BI to track lead times and costs</li>
                  <li>• <strong>Results:</strong> Downtime reduced to 5%; saved $60,000 in Q1 2025</li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Action Steps:</h3>
              <ul className="mb-6 text-muted-foreground leading-relaxed space-y-2">
                <li>• Map critical suppliers and identify 2-3 alternatives for each</li>
                <li>• Negotiate flexible contracts with backup suppliers</li>
                <li>• Monitor supplier health using financial and operational metrics</li>
              </ul>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">Strategy 3: Invest in Cross-Training and Flexible Teams</h2>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                <strong>Why It Works:</strong> Skills silos create vulnerabilities. Cross-trained teams can adapt quickly when roles shift or staff are unavailable.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Action Steps:</h3>
              <ul className="mb-6 text-muted-foreground leading-relaxed space-y-2">
                <li>• Identify critical skills and train 2-3 team members in each</li>
                <li>• Create job rotation programs to build versatility</li>
                <li>• Use project management tools to track skills development</li>
              </ul>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">Strategy 4: Build Financial Buffers</h2>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                <strong>Why It Works:</strong> Cash reserves provide breathing room during crises. The pandemic taught us that 3-6 months of operating expenses isn't luxury—it's survival.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Action Steps:</h3>
              <ul className="mb-6 text-muted-foreground leading-relaxed space-y-2">
                <li>• Set aside 15-20% of profits for emergency reserves</li>
                <li>• Establish lines of credit before you need them</li>
                <li>• Monitor cash flow weekly using automated dashboards</li>
              </ul>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">Strategy 5: Leverage Technology for Real-Time Intelligence</h2>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                <strong>Why It Works:</strong> Early warning systems help you respond before problems escalate. AI-powered analytics can spot patterns humans miss.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-foreground">Action Steps:</h3>
              <ul className="mb-6 text-muted-foreground leading-relaxed space-y-2">
                <li>• Implement dashboards that track KPIs in real-time</li>
                <li>• Set up automated alerts for critical thresholds</li>
                <li>• Use predictive analytics to forecast potential issues</li>
              </ul>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">Building Your Resilience Roadmap</h2>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                Operational resilience isn't built overnight—it's a continuous process of strengthening your business's immune system. Start with one strategy that addresses your biggest vulnerability, then gradually expand your resilience framework.
              </p>

              <p className="mb-8 text-muted-foreground leading-relaxed">
                The businesses that thrive in uncertain times aren't the ones that avoid disruption—they're the ones that bounce back stronger. Which resilience strategy will you implement first?
              </p>

              {/* Call to Action */}
              <div className="bg-primary rounded-2xl p-8 text-white text-center mt-12">
                <h3 className="text-2xl font-bold mb-4">Ready to Build Operational Resilience?</h3>
                <p className="text-white/90 mb-6">
                  Assess your current resilience and identify vulnerabilities with BizHealth.ai's comprehensive analysis.
                </p>
                <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Start Your Resilience Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OperationalResilience;