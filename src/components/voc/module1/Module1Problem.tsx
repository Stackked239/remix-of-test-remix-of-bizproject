import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const symptomsChecklist = [
  "You don't know why customers stop buying from you",
  "The same complaints come up repeatedly (but you can't fix them systematically)",
  "There's no organized system to track feedback — it comes through email, text, calls, in-person",
  "Customers say \"I didn't know you changed that\" (they didn't hear about your improvements)",
  "Your support team hears complaints you never see",
  "You make product/service decisions without customer input",
  "Negative reviews surprise you (\"Why didn't they tell us first?\")",
  "You've lost a customer and only learned the real reason afterward"
];

const Module1Problem = () => {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setCheckedItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const score = checkedItems.length;

  return (
    <section className="py-16 md:py-20 bg-background border-t">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8">
            The Problem Most SMBs Face (And You Might Be Too)
          </h2>

          {/* Sarah's Story */}
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4 mb-10">
            <p>
              <strong className="text-foreground">Meet Sarah.</strong> She owns a home services company—plumbing, HVAC, electrical. 
              She has 8 employees and $2.1M in annual revenue. She's proud of her business.
            </p>
            <p>
              Last month, she lost 3 customers. Not because her work was bad. But because she didn't know 
              they were unhappy until they left—and she never called to ask why.
            </p>
            <p>
              One paid by credit card only (she didn't know customers hated cash-only pricing). One complained 
              in a Google review about scheduling (she never read reviews). One mentioned billing confusion to 
              her receptionist (the message never reached Sarah).
            </p>
            <p>
              All three frustrations were <strong className="text-foreground">addressable.</strong> None of them required expensive changes.
            </p>
            <p>
              But Sarah was flying blind. No system to collect what customers thought. No way to spot patterns. 
              No mechanism to close the loop and say, "We heard you. We fixed it."
            </p>
            <p className="text-foreground font-semibold italic">
              She was losing customers not because of poor service, but because no one was listening.
            </p>
          </div>

          {/* Flying Blind Symptoms Checklist */}
          <div className="bg-muted/50 rounded-xl p-6 md:p-8">
            <p className="text-foreground font-medium mb-6">
              Does this sound familiar? Check any that apply:
            </p>

            <div className="space-y-3">
              {symptomsChecklist.map((symptom, index) => (
                <button
                  key={index}
                  onClick={() => toggleItem(index)}
                  className={`w-full flex items-start gap-4 p-4 rounded-lg border-2 text-left transition-all ${
                    checkedItems.includes(index)
                      ? "border-[hsl(var(--biz-green))] bg-[hsl(var(--biz-green))]/5"
                      : "border-border bg-background hover:border-[hsl(var(--biz-green))]/50"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded flex items-center justify-center transition-colors ${
                      checkedItems.includes(index)
                        ? "bg-[hsl(var(--biz-green))] text-white"
                        : "border-2 border-muted-foreground/30"
                    }`}
                  >
                    {checkedItems.includes(index) && <Check className="h-4 w-4" />}
                  </div>
                  <span className="text-sm md:text-base text-foreground">{symptom}</span>
                </button>
              ))}
            </div>

            {/* Scoring */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground italic">
                <span className="font-medium text-foreground">Scoring:</span> 0-2 checked = Ahead of most; 3-5 = You need this; 6+ = Critical need
              </p>
              
              {score > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-4 rounded-lg ${
                    score <= 2
                      ? "bg-[hsl(var(--biz-green))]/10"
                      : score <= 5
                      ? "bg-[hsl(var(--biz-yellow))]/20"
                      : "bg-red-500/10"
                  }`}
                >
                  <p className="text-sm font-medium text-foreground">
                    Your score: <span className="text-lg">{score}</span> out of 8
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {score <= 2 && "🟢 You're ahead of most SMBs. This curriculum will help you formalize what's working."}
                    {score > 2 && score <= 5 && "🟡 You definitely need a VoC system. The gaps you're experiencing are costing you customers."}
                    {score > 5 && "🔴 Critical need — start this week. This curriculum shows you how to flip the script."}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Module1Problem;
