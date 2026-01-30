import { motion } from "framer-motion";

const AnalysisDepthSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30" id="analysis-depth">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left: Visual Representation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-card rounded-2xl shadow-lg border border-border p-6 md:p-8">
              <h3 className="text-xl font-bold text-[hsl(var(--biz-navy))] mb-6 font-heading">
                Financial Health Assessment Example
              </h3>
              
              {/* Level 1: High-Level */}
              <div className="mb-6 pb-6 border-b border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Level 1: High-Level Health</span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                    Needs Attention
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-[hsl(var(--biz-navy))]">67</div>
                  <div className="text-sm text-muted-foreground">Overall Financial Score</div>
                </div>
              </div>
              
              {/* Level 2: Component Breakdown */}
              <div className="mb-6 pb-6 border-b border-border">
                <span className="text-sm font-medium text-muted-foreground block mb-3">
                  Level 2: Component Breakdown
                </span>
                <div className="space-y-3">
                  {[
                    { label: "Cash Flow Management", score: 72, color: "bg-[hsl(var(--biz-green))]" },
                    { label: "Profitability", score: 68, color: "bg-[hsl(var(--biz-citrine))]" },
                    { label: "Financial Forecasting", score: 45, color: "bg-amber-500", highlight: true },
                    { label: "Working Capital", score: 81, color: "bg-[hsl(var(--biz-green))]" },
                  ].map((item, i) => (
                    <div key={i} className={`${item.highlight ? 'bg-amber-50 -mx-2 px-2 py-1 rounded' : ''}`}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className={item.highlight ? 'font-semibold text-amber-700' : 'text-muted-foreground'}>
                          {item.label}
                        </span>
                        <span className={item.highlight ? 'font-semibold text-amber-700' : 'font-medium'}>
                          {item.score}/100
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${item.color} rounded-full transition-all`} 
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Level 3: Specific Metrics */}
              <div className="mb-6 pb-6 border-b border-border">
                <span className="text-sm font-medium text-muted-foreground block mb-3">
                  Level 3: Specific Metrics
                </span>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    { label: "Cash Runway", value: "4.2 mo", benchmark: "6+ mo", status: "warning" },
                    { label: "Gross Margin", value: "42%", benchmark: "45%", status: "warning" },
                    { label: "Current Ratio", value: "1.8", benchmark: ">1.5", status: "success" },
                    { label: "Debt-to-Equity", value: "0.4", benchmark: "<0.5", status: "success" },
                  ].map((metric, i) => (
                    <div key={i} className="bg-muted/50 rounded-lg p-3">
                      <div className="text-muted-foreground text-xs mb-1">{metric.label}</div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[hsl(var(--biz-navy))]">{metric.value}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                          metric.status === 'success' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          vs. {metric.benchmark}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Level 4 & 5: Root Cause + Recommendations */}
              <div>
                <span className="text-sm font-medium text-muted-foreground block mb-3">
                  Level 4 & 5: Root Cause & Recommendations
                </span>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm">
                  <p className="text-foreground mb-3">
                    <strong>Root Cause:</strong> Financial forecasting score is 45/100 because 
                    no documented 12-month cash flow forecast exists...
                  </p>
                  <p className="text-foreground">
                    <strong>Action:</strong> Implement monthly cash flow forecast using BizTools 
                    template. Expected time: 8-10 hours initial setup.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--biz-navy))] mb-6 font-heading">
              Five Levels of Analysis Depth
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              Gemini's deep research capability excels at synthesizing detailed information. 
              BizHealth.ai's multi-layered analysis provides rich, interconnected insights 
              that demonstrate how different business dimensions affect each other.
            </p>
            
            <div className="space-y-6">
              {[
                { level: 1, title: "High-Level Health", description: "Overall score (1-100) and quick status: Healthy, Needs Attention, or Critical" },
                { level: 2, title: "Component Breakdown", description: "Scores for each sub-dimension within the category" },
                { level: 3, title: "Specific Metrics", description: "Actual numbers compared against industry benchmarks" },
                { level: 4, title: "Root Cause Analysis", description: "Explains WHY scores are what they are with specific factors" },
                { level: 5, title: "Actionable Recommendations", description: "Prioritized next steps with effort estimates and expected outcomes" },
              ].map((item) => (
                <div key={item.level} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#4285F4] text-white flex items-center justify-center font-bold shrink-0">
                    {item.level}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[hsl(var(--biz-navy))] mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AnalysisDepthSection;
