import { useState } from "react";
import { motion } from "framer-motion";
import { Compass, Lightbulb, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const STAGES = [
  { stage: 1, name: "Reactive", desc: "Ad-hoc feedback, no formal process", percent: "35%" },
  { stage: 2, name: "Managed", desc: "1-2 formal channels, basic tracking", percent: "40%" },
  { stage: 3, name: "Responsive", desc: "Multiple channels, pattern analysis", percent: "20%" },
  { stage: 4, name: "Proactive", desc: "Culture of listening, cross-functional", percent: "4%" },
  { stage: 5, name: "Strategic", desc: "VoC as competitive advantage", percent: "1%" }
];

const QUESTIONS = [
  { id: 1, text: "How is feedback collected?", options: ["Random only", "1-2 channels", "Multiple coordinated", "All touchpoints", "Strategic advantage"] },
  { id: 2, text: "How often do you analyze patterns?", options: ["Never", "Monthly", "Weekly", "Daily", "Real-time"] },
  { id: 3, text: "Is someone dedicated to VoC?", options: ["No", "Part-time", "Full-time", "Team", "Department"] }
];

const Module7Maturity = () => {
  const { toast } = useToast();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const score = Object.values(answers).reduce((sum, val) => sum + val + 1, 0);
  const stage = score <= 3 ? 1 : score <= 6 ? 2 : score <= 9 ? 3 : score <= 12 ? 4 : 5;

  return (
    <section id="maturity" className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-[hsl(var(--biz-copper))]/15 text-[hsl(var(--biz-copper))] text-sm font-medium mb-4">
            Section 05
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Benchmarking Your Maturity
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            How good is your VoC program, really? Use this framework to assess and compare.
          </p>
        </div>

        {/* Maturity Stages */}
        <div className="grid grid-cols-5 gap-2 mb-8">
          {STAGES.map((s) => (
            <div key={s.stage} className={`p-3 rounded-lg text-center ${stage === s.stage ? 'bg-[hsl(var(--biz-green))]/20 border-2 border-[hsl(var(--biz-green))]' : 'bg-muted/50'}`}>
              <p className="text-lg font-bold text-foreground">{s.stage}</p>
              <p className="text-xs font-medium text-foreground">{s.name}</p>
              <p className="text-xs text-muted-foreground">{s.percent} of SMBs</p>
            </div>
          ))}
        </div>

        {/* Quick Assessment */}
        <div className="bg-card border-2 border-[hsl(var(--biz-copper))]/30 rounded-xl p-6 md:p-8 mb-8">
          <h3 className="text-xl font-bold text-foreground mb-6">Quick Maturity Assessment</h3>
          <div className="space-y-6">
            {QUESTIONS.map((q) => (
              <div key={q.id}>
                <p className="font-medium text-foreground mb-3">{q.text}</p>
                <div className="grid grid-cols-5 gap-2">
                  {q.options.map((opt, idx) => (
                    <Button key={idx} variant={answers[q.id] === idx ? "default" : "outline"} size="sm"
                      onClick={() => setAnswers(prev => ({ ...prev, [q.id]: idx }))}
                      className={answers[q.id] === idx ? "bg-[hsl(var(--biz-copper))] text-white" : ""}>
                      {opt}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {Object.keys(answers).length === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 p-6 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-foreground mb-2">Stage {stage}: {STAGES[stage - 1].name}</p>
              <p className="text-muted-foreground mb-4">{STAGES[stage - 1].desc}</p>
              <Progress value={(stage / 5) * 100} className="h-2" />
            </motion.div>
          )}
        </div>

        <div className="bg-[hsl(var(--biz-gold))]/20 border border-[hsl(var(--biz-gold))]/40 rounded-xl p-5 mb-8">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-[hsl(var(--biz-gold))] flex-shrink-0 mt-0.5" />
            <p className="text-foreground">
              <strong>Key Takeaway:</strong> Your maturity stage isn't a judgment—it's a compass. Use it to know where to focus next.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Module7Maturity;
