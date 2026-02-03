import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, BarChart3, Lightbulb, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "Get a comprehensive score across all 8 business dimensions",
  "Identify hidden weaknesses before they become crises",
  "Receive AI-powered recommendations tailored to your business",
  "Benchmark against industry standards"
];

const VocAssessmentUpsell = () => {
  return (
    <section className="py-20 px-4 bg-muted/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl bg-card border border-border"
        >
          {/* Decorative gradient overlay */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              background: `linear-gradient(135deg, hsl(var(--biz-blue)) 0%, hsl(var(--biz-green)) 50%, hsl(var(--biz-gold)) 100%)`
            }}
          />
          
          <div className="relative z-10 p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left content */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="h-5 w-5 text-[hsl(var(--biz-green))]" />
                  <span className="text-[hsl(var(--biz-green))] text-sm font-medium uppercase tracking-wider">
                    Go Deeper
                  </span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                  VoC is Just One Piece of the Puzzle
                </h2>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Customer feedback matters — but so do your finances, operations, team, technology, 
                  and strategy. Our Business Health Assessment gives you the full picture in 15 minutes.
                </p>
                
                <ul className="space-y-3 mb-8">
                  {benefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="h-5 w-5 text-[hsl(var(--biz-green))] shrink-0 mt-0.5" />
                      <span className="text-foreground">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <Button 
                  asChild
                  size="lg"
                  className="bg-[hsl(var(--biz-green))] hover:bg-[hsl(var(--biz-green))]/90 text-white font-semibold"
                >
                  <Link to="/onboarding">
                    Start Your Business Assessment
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
              
              {/* Right content - visual element */}
              <div className="hidden lg:block">
                <div className="relative">
                  {/* Mock assessment visual */}
                  <div className="bg-background border border-border rounded-xl p-6 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-[hsl(var(--biz-green))]/10 flex items-center justify-center">
                        <Target className="h-5 w-5 text-[hsl(var(--biz-green))]" />
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-foreground">Health Score</p>
                        <p className="text-sm text-muted-foreground">8 Dimensions</p>
                      </div>
                    </div>
                    
                    {/* Score bars */}
                    <div className="space-y-4">
                      {[
                        { name: "Customer", score: 75 },
                        { name: "Operations", score: 60 },
                        { name: "Financials", score: 85 },
                        { name: "Strategy", score: 70 }
                      ].map((item, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">{item.name}</span>
                            <span className="font-medium text-foreground">{item.score}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${item.score}%` }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                              className="h-full rounded-full"
                              style={{
                                background: `linear-gradient(90deg, hsl(var(--biz-green)), hsl(var(--biz-blue)))`
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Insight preview */}
                    <div className="mt-6 p-4 bg-[hsl(var(--biz-gold))]/5 rounded-lg border border-[hsl(var(--biz-gold))]/20">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="h-5 w-5 text-[hsl(var(--biz-gold))] shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground">
                          <span className="font-semibold text-foreground">Key Insight:</span> Your operations score suggests process optimization could improve margins by 15-20%.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VocAssessmentUpsell;
