import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Target } from "lucide-react";

const OBJECTIVES = [
  "Master root cause analysis using the 5 Whys method",
  "Segment customers strategically for targeted action",
  "Build feedback loops into team culture & operations",
  "Set up dashboards for real-time VoC visibility",
  "Benchmark your VoC maturity against industry peers"
];

const Module7Objectives = () => {
  const [checked, setChecked] = useState<number[]>([]);

  const toggleObjective = (index: number) => {
    setChecked(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  return (
    <section className="py-12 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border rounded-2xl p-6 md:p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[hsl(var(--biz-green))]/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-[hsl(var(--biz-green))]" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Learning Objectives</h2>
          </div>

          <p className="text-muted-foreground mb-6">
            By the end of this module, you'll be able to:
          </p>

          <div className="space-y-4">
            {OBJECTIVES.map((objective, index) => (
              <motion.button
                key={index}
                onClick={() => toggleObjective(index)}
                className={`w-full flex items-start gap-4 p-4 rounded-xl text-left transition-all ${
                  checked.includes(index)
                    ? 'bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/30'
                    : 'bg-muted/50 border border-transparent hover:bg-muted'
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {checked.includes(index) ? (
                  <CheckCircle2 className="w-6 h-6 text-[hsl(var(--biz-green))] flex-shrink-0 mt-0.5" />
                ) : (
                  <Circle className="w-6 h-6 text-muted-foreground flex-shrink-0 mt-0.5" />
                )}
                <span className={`text-lg ${checked.includes(index) ? 'text-foreground font-medium' : 'text-foreground'}`}>
                  {objective}
                </span>
              </motion.button>
            ))}
          </div>

          {checked.length === OBJECTIVES.length && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-center text-[hsl(var(--biz-green))] font-medium"
            >
              ✅ All objectives checked! You're ready to dive in.
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Module7Objectives;
