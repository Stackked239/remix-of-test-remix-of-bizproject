import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const quizQuestions = [
  "You don't know why customers stop buying from you",
  "The same complaints come up repeatedly",
  "There's no organized system to track feedback (it comes through email, texts, calls)",
  "Customers say \"I didn't know you changed that\" (they don't hear about improvements)",
  "Your support/team hears complaints you never see",
  "You make product/service decisions without customer input",
  "Negative reviews surprise you (\"Why didn't they tell us?\")",
  "You've lost a customer and only learned the reason afterward"
];

interface Module1AssessmentProps {
  onComplete: (score: number) => void;
}

const Module1Assessment = ({ onComplete }: Module1AssessmentProps) => {
  const [answers, setAnswers] = useState<boolean[]>(Array(8).fill(false));

  const score = answers.filter(Boolean).length;
  const interpretation = score <= 2 ? 'low' : score <= 5 ? 'medium' : 'high';

  useEffect(() => {
    if (score > 0) {
      onComplete(score);
    }
  }, [score, onComplete]);

  const toggleAnswer = (index: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = !newAnswers[index];
    setAnswers(newAnswers);
  };

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground text-center mb-4">
            Quick Self-Assessment: Do You Need a VoC Program?
          </h2>

          <p className="text-center text-muted-foreground mb-8">
            This 8-question checklist takes 3 minutes. Your answers will show you exactly where 
            you stand and what matters most for your business.
          </p>

          {/* Quiz Questions */}
          <div className="space-y-3">
            {quizQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => toggleAnswer(index)}
                className={`w-full flex items-start gap-4 p-4 rounded-lg border-2 text-left transition-all ${
                  answers[index]
                    ? "border-[hsl(var(--biz-green))] bg-[hsl(var(--biz-green))]/5"
                    : "border-border bg-background hover:border-[hsl(var(--biz-green))]/50 hover:bg-muted/30"
                }`}
              >
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded flex items-center justify-center transition-colors ${
                    answers[index]
                      ? "bg-[hsl(var(--biz-green))] text-white"
                      : "border-2 border-muted-foreground/30"
                  }`}
                >
                  {answers[index] && <Check className="h-4 w-4" />}
                </div>
                <span className="text-sm md:text-base text-foreground leading-relaxed">
                  {question}
                </span>
              </button>
            ))}
          </div>

          {/* Dynamic Score Display */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Your Score</span>
              <span className="text-lg font-bold text-foreground" aria-live="polite">
                {score} out of 8
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(score / 8) * 100}%` }}
                transition={{ duration: 0.3 }}
                className={`h-full rounded-full ${
                  interpretation === 'low'
                    ? "bg-[hsl(var(--biz-green))]"
                    : interpretation === 'medium'
                    ? "bg-[hsl(var(--biz-yellow))]"
                    : "bg-red-500"
                }`}
              />
            </div>

            {/* Interpretation */}
            {score > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 p-5 rounded-xl ${
                  interpretation === 'low'
                    ? "bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/20"
                    : interpretation === 'medium'
                    ? "bg-[hsl(var(--biz-yellow))]/15 border border-[hsl(var(--biz-yellow))]/30"
                    : "bg-red-500/10 border border-red-500/20"
                }`}
              >
                {interpretation === 'low' && (
                  <div>
                    <p className="font-semibold text-foreground flex items-center gap-2">
                      <span className="text-2xl">🟢</span> You're ahead of most SMBs
                    </p>
                    <p className="text-muted-foreground mt-2">
                      You have some VoC elements in place. This curriculum will help you formalize 
                      and scale what's working.
                    </p>
                  </div>
                )}
                {interpretation === 'medium' && (
                  <div>
                    <p className="font-semibold text-foreground flex items-center gap-2">
                      <span className="text-2xl">🟡</span> You definitely need a VoC system
                    </p>
                    <p className="text-muted-foreground mt-2">
                      The gaps you're experiencing are costing you customers and revenue. 
                      This is fixable, and the impact can be quick.
                    </p>
                  </div>
                )}
                {interpretation === 'high' && (
                  <div>
                    <p className="font-semibold text-foreground flex items-center gap-2">
                      <span className="text-2xl">🔴</span> Critical need — start this week
                    </p>
                    <p className="text-muted-foreground mt-2">
                      Every unchecked customer feedback moment is a lost opportunity. 
                      This curriculum shows you how to flip the script starting today.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Module1Assessment;
