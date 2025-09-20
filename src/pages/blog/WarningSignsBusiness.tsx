import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import warningSignsImage from "@/assets/business-warning-signs-management.jpg";

const WarningSignsBusiness = () => {
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
                Risk Management
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
              5 Warning Signs Your Business Needs Immediate Attention
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
                <span>8 min read</span>
              </div>
            </div>
            
            <img 
              src={warningSignsImage} 
              alt="Business warning signs and risk management visualization with danger indicators and declining performance metrics"
              className="w-full h-auto rounded-lg shadow-md max-h-96 object-cover"
              loading="lazy"
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
                Are you losing sleep over stagnant growth or cash flow hiccups? You're not alone—70% of small and mid-sized businesses face critical challenges that, if ignored, can derail success. Spotting these warning signs early can mean the difference between a thriving business and one fighting to survive.
              </p>

              <p className="mb-6 text-muted-foreground leading-relaxed">
                Running a business is tough, and subtle issues can snowball into major problems if left unchecked. According to Harvard Business Review, businesses that proactively address operational and financial weaknesses are 25% more likely to achieve sustainable growth. Frameworks like the Balanced Scorecard emphasize monitoring key performance indicators (KPIs) across finance, operations, and customer satisfaction to catch trouble early. Ignoring these signals risks declining profitability, employee turnover, or even business failure. Here's what to watch for and how to act.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">1. Declining Cash Flow</h2>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                <strong>What it looks like:</strong> Your cash reserves are shrinking, or you're struggling to cover payroll or vendor payments.
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                <strong>Why it matters:</strong> Cash flow issues are the top reason 82% of SMBs fail (U.S. Bank).
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                <strong>What to do:</strong> Use tools like BizHealth.ai's financial diagnostics to track metrics like burn rate and working capital. Implement cash flow forecasting to anticipate shortfalls and negotiate better payment terms with suppliers. For example, a retail client used our reports to identify overstock issues, freeing up 20% more cash within a quarter.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">2. Falling Customer Retention</h2>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                <strong>What it looks like:</strong> Repeat customers are dropping off, or your Net Promoter Score (NPS) is declining.
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                <strong>Why it matters:</strong> Acquiring new customers costs 5x more than retaining existing ones (Forbes).
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                <strong>What to do:</strong> Analyze customer feedback and track marketing KPIs like Customer Lifetime Value (CLV) with BizHealth.ai's AI-powered reports. A restaurant chain identified service gaps through customer sentiment analysis, leading to a 22% boost in repeat visits after targeted training programs.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">3. Operational Bottlenecks</h2>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                <strong>What it looks like:</strong> Delays in delivery, inventory pileups, or frequent project overruns.
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                <strong>Why it matters:</strong> Inefficient operations can cut profitability by up to 30% (McKinsey 7S Model).
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                <strong>What to do:</strong> Apply Lean principles to streamline processes. Use BizHealth.ai's operations assessment to pinpoint inefficiencies, like a logistics firm that reduced delivery times by 12% after identifying scheduling gaps.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">4. Employee Disengagement</h2>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                <strong>What it looks like:</strong> High turnover, low morale, or declining productivity.
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                <strong>Why it matters:</strong> Disengaged employees cost businesses $450–550 billion annually in the U.S. (Gallup).
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                <strong>What to do:</strong> Conduct pulse surveys and use HR diagnostics to assess engagement. Our platform helped a tech startup identify leadership gaps, leading to a 25% improvement in employee satisfaction after targeted training.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">5. Lack of Strategic Clarity</h2>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                <strong>What it looks like:</strong> Misaligned goals, stalled growth, or confusion about priorities.
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                <strong>Why it matters:</strong> Companies without clear strategies are 40% less likely to scale successfully (Gartner).
              </p>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                <strong>What to do:</strong> Use frameworks like OKRs to align teams. BizHealth.ai's strategy reports can benchmark your goals against industry standards, as seen in a consulting firm that clarified its growth plan and increased revenue by 18%.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">Take Action Today</h2>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                Which of these warning signs feels most familiar in your business? Whether it's a cash crunch or a strategy misstep, addressing these issues head-on can unlock new growth. With the right data, you're not just reacting—you're building a stronger future.
              </p>

              <p className="mb-8 text-muted-foreground leading-relaxed">
                Don't let these warning signs hold your business back. Utilize the BizHealth.ai business health assessment to uncover hidden gaps and get tailored insights in minutes. Your growth starts here—let's make it happen.
              </p>

              {/* Call to Action */}
              <div className="bg-primary rounded-2xl p-8 text-white text-center mt-12">
                <h3 className="text-2xl font-bold mb-4">Ready to Address These Warning Signs?</h3>
                <p className="text-white/90 mb-6">
                  Get started with BizHealth.ai's comprehensive business assessment and turn warning signs into opportunities.
                </p>
                <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Start Your Assessment
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

export default WarningSignsBusiness;