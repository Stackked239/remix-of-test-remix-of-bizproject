import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Users, Trophy } from "lucide-react";

const Module6Optimization = () => {
  return (
    <section id="optimization-phase" className="py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Phase Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--biz-navy))]/10 text-[hsl(var(--biz-navy))] text-sm font-bold mb-4">
            PHASE 3
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Days 61-90: Optimization
          </h2>
          <p className="text-lg text-muted-foreground">
            Make it stick — without you pushing every day
          </p>
        </div>

        {/* Weeks 9-10 */}
        <div className="bg-card border rounded-xl p-6 md:p-8 mb-6">
          <h3 className="text-xl font-bold text-foreground mb-6">
            Weeks 9-10: Build Team Ownership
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Key Actions */}
            <div>
              <h4 className="font-medium text-foreground mb-4">Key Actions:</h4>
              <ul className="space-y-4">
                {[
                  { title: "Train your team on VoC process and tools", desc: "30-minute session: why it matters, how to use the tracker, their role" },
                  { title: "Assign clear category ownership", desc: "Who owns product issues? Support issues? Billing complaints?" },
                  { title: "Establish reporting rhythm", desc: "Weekly team sync (30 min), monthly leadership review (1 hour)" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-[hsl(var(--biz-navy))] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground">{item.title}</strong>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ownership Model */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-[hsl(var(--biz-navy))]" />
                Sample Ownership Model
              </h4>
              <div className="space-y-2">
                {[
                  { category: "Product Feedback", role: "Product Manager / Owner" },
                  { category: "Support Issues", role: "Support Lead / Manager" },
                  { category: "Billing/Pricing", role: "Finance / Operations" },
                  { category: "Sales Experience", role: "Sales Manager" },
                  { category: "VoC Program Overall", role: "One Person (You or CX Lead)", highlight: true }
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-center gap-3 p-2 rounded-lg ${item.highlight ? 'bg-[hsl(var(--biz-navy))]/10' : ''}`}
                  >
                    <span className="text-sm text-foreground flex-1">{item.category}</span>
                    <span className="text-muted-foreground">→</span>
                    <span className={`text-sm ${item.highlight ? 'font-medium text-[hsl(var(--biz-navy))]' : 'text-foreground'}`}>
                      {item.role}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                <strong>Critical:</strong> One person owns the VoC program overall. Without clear ownership, nothing happens.
              </p>
            </div>
          </div>
        </div>

        {/* Weeks 11-12 */}
        <div className="bg-card border rounded-xl p-6 md:p-8 mb-6">
          <h3 className="text-xl font-bold text-foreground mb-6">
            Weeks 11-12: Measure Impact & Document Wins
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Key Actions */}
            <div>
              <h4 className="font-medium text-foreground mb-4">Key Actions:</h4>
              <ul className="space-y-4">
                {[
                  { title: "Compare metrics to baseline", desc: "NPS/CSAT improved? Response rates up? Loop closure faster?" },
                  { title: "Document your wins", desc: "\"We fixed X based on feedback and saw Y result\"" },
                  { title: "Plan next quarter improvements", desc: "What's working? What needs adjustment? What's next?" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-[hsl(var(--biz-navy))] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground">{item.title}</strong>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Impact Measurement */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-3">What to Measure</h4>
              <div className="space-y-3">
                {[
                  "NPS Score",
                  "Loop Closure Rate",
                  "Survey Response Rate",
                  "Time to First Response"
                ].map((metric, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <span className="text-foreground flex-1">{metric}</span>
                    <span className="text-muted-foreground">Baseline: ___</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="text-foreground">Day 90: ___</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Phase 3 Final Milestone */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-6 md:p-8 bg-gradient-to-br from-[hsl(var(--biz-navy))]/10 to-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-navy))]/20 rounded-xl text-center"
        >
          <Trophy className="w-12 h-12 text-[hsl(var(--biz-yellow))] mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-4">
            🎉 Day 90: VoC System Complete
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              "Team trained and accountable",
              "Clear ownership by category",
              "Metrics improving from baseline",
              "System runs without daily pushing"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 justify-center text-foreground">
                <CheckCircle2 className="w-4 h-4 text-[hsl(var(--biz-green))]" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-lg text-foreground">
            Congratulations. You now have a Voice of Customer system that's built to last.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Module6Optimization;
