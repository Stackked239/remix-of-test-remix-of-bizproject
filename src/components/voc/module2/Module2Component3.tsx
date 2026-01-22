import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Trophy, ArrowRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VOC_URLS } from "@/config/vocUrls";

const Module2Component3 = () => {
  const stats = [
    { 
      number: "21%", 
      label: "more likely to respond to your next survey",
      sublabel: "when you closed the loop on their last one",
      positive: true
    },
    { 
      number: "12%", 
      label: "increase in retention",
      sublabel: "when you respond within 48 hours",
      positive: true
    },
    { 
      number: "Only 12%", 
      label: "of customers know about improvements",
      sublabel: "if you don't tell them",
      positive: false
    },
    { 
      number: "91%", 
      label: "who complain never come back",
      sublabel: "if you don't respond",
      positive: false
    },
  ];

  return (
    <section id="component-3" className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center text-white font-bold">
            3
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Closing the Loop (Introduction)
          </h2>
        </motion.div>

        {/* Hook */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-[hsl(var(--biz-gold))]/20 to-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-gold))]/20 rounded-xl p-6 mb-8"
        >
          <div className="flex items-start gap-3">
            <Trophy className="h-8 w-8 text-[hsl(var(--biz-gold))] flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                THIS ONE THING DOUBLES YOUR RETENTION IMPROVEMENT
              </h3>
              <div className="bg-background/50 rounded-lg p-4 mt-4">
                <p className="font-semibold text-foreground mb-3">
                  <span className="text-[hsl(var(--biz-blue))]">Closing the Loop:</span> Telling customers you heard them AND you acted
                </p>
                <ol className="text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[hsl(var(--biz-blue))]">1.</span>
                    Acknowledge you received their feedback
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[hsl(var(--biz-blue))]">2.</span>
                    Take action (or explain why not)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[hsl(var(--biz-blue))]">3.</span>
                    Report back to the customer
                  </li>
                </ol>
              </div>
              <p className="text-muted-foreground mt-4 italic">
                Most businesses collect feedback but never tell customers what happened. 
                That's like asking "How can I help?" then walking away.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Statistics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl text-center ${
                stat.positive 
                  ? 'bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/20' 
                  : 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800'
              }`}
            >
              <p className={`text-2xl md:text-3xl font-bold mb-2 ${
                stat.positive ? 'text-[hsl(var(--biz-green))]' : 'text-red-600 dark:text-red-400'
              }`}>
                {stat.number}
              </p>
              <p className="text-sm font-medium text-foreground mb-1">{stat.label}</p>
              <p className="text-xs text-muted-foreground">{stat.sublabel}</p>
            </div>
          ))}
        </motion.div>

        {/* Before/After Visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          {/* Open Loop (Bad) */}
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">❌</span>
              <h4 className="font-bold text-red-700 dark:text-red-300">OPEN LOOP (Broken)</h4>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <span className="text-muted-foreground">Customer complains</span>
              </div>
              <div className="w-px h-4 bg-red-300 ml-1" />
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <span className="text-muted-foreground">You collect feedback</span>
              </div>
              <div className="w-px h-4 bg-red-300 ml-1" />
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <span className="text-muted-foreground">You forget about it</span>
              </div>
              <div className="w-px h-4 bg-red-300 ml-1" />
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <span className="text-muted-foreground">Customer feels ignored</span>
              </div>
              <div className="w-px h-4 bg-red-300 ml-1" />
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <span className="text-muted-foreground">They leave + 1-star review</span>
              </div>
              <div className="w-px h-4 bg-red-300 ml-1" />
              <div className="flex items-center gap-3">
                <span className="text-2xl">💀</span>
                <span className="font-medium text-red-700 dark:text-red-300">Lost forever</span>
              </div>
            </div>
          </div>

          {/* Closed Loop (Good) */}
          <div className="bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/20 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">✅</span>
              <h4 className="font-bold text-[hsl(var(--biz-green))]">CLOSED LOOP (Works)</h4>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[hsl(var(--biz-green))] rounded-full" />
                <span className="text-muted-foreground">Customer complains</span>
              </div>
              <div className="w-px h-4 bg-[hsl(var(--biz-green))]/50 ml-1" />
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[hsl(var(--biz-green))] rounded-full" />
                <span className="text-muted-foreground">You collect feedback</span>
              </div>
              <div className="w-px h-4 bg-[hsl(var(--biz-green))]/50 ml-1" />
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[hsl(var(--biz-green))] rounded-full" />
                <span className="text-muted-foreground">You acknowledge immediately</span>
              </div>
              <div className="w-px h-4 bg-[hsl(var(--biz-green))]/50 ml-1" />
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[hsl(var(--biz-green))] rounded-full" />
                <span className="text-muted-foreground">You investigate root cause</span>
              </div>
              <div className="w-px h-4 bg-[hsl(var(--biz-green))]/50 ml-1" />
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[hsl(var(--biz-green))] rounded-full" />
                <span className="text-muted-foreground">You tell them what changed</span>
              </div>
              <div className="w-px h-4 bg-[hsl(var(--biz-green))]/50 ml-1" />
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌟</span>
                <span className="font-medium text-[hsl(var(--biz-green))]">Customer becomes advocate</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Module 4 Preview Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-[hsl(var(--biz-gold))]/20 to-[hsl(var(--biz-blue))]/10 border rounded-xl p-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[hsl(var(--biz-blue))] rounded-xl flex items-center justify-center flex-shrink-0">
              <RefreshCw className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground mb-2">
                Coming Up: The 6-Step Closed-Loop Process
              </h3>
              <p className="text-muted-foreground mb-4">
                Module 4 goes DEEP on closing the loop. You'll learn:
              </p>
              <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[hsl(var(--biz-blue))] rounded-full mt-1.5" />
                  The 6-step process for every feedback type
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[hsl(var(--biz-blue))] rounded-full mt-1.5" />
                  Templates for acknowledgment, resolution, and follow-up
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[hsl(var(--biz-blue))] rounded-full mt-1.5" />
                  How to handle difficult or impossible requests
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-[hsl(var(--biz-blue))] rounded-full mt-1.5" />
                  Measuring your loop closure rate
                </li>
              </ul>
              <Button asChild variant="outline" size="sm">
                <Link to={VOC_URLS.modules[4].url} className="flex items-center gap-2">
                  Preview Module 4
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Module2Component3;
