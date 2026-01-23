import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PartyPopper, CheckCircle2, Heart, Sparkles } from "lucide-react";
import confetti from 'canvas-confetti';
import { useEffect } from "react";

interface Module5SuccessProps {
  isAllComplete: boolean;
}

const SUCCESS_ITEMS = [
  "Identified where customer feedback lives (3+ channels)",
  "Actively collected feedback from real customers (via survey)",
  "Built a system to track feedback over time (tracker spreadsheet)",
  'Found patterns in what customers are telling you (e.g., "pricing confusion is the #1 complaint")',
  "Made ONE visible improvement based on customer input",
  "Told customers you heard them and you're fixing it"
];

const Module5Success = ({ isAllComplete }: Module5SuccessProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isAllComplete && isInView) {
      // Trigger confetti when all days complete and section in view
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isAllComplete, isInView]);

  return (
    <section ref={ref} className="py-16 md:py-24 bg-gradient-to-br from-[hsl(var(--biz-green))]/5 to-[hsl(var(--biz-yellow))]/5">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-card border-2 border-[hsl(var(--biz-green))]/30 rounded-2xl p-8 md:p-12 shadow-lg"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[hsl(var(--biz-green))]/10 mb-4"
            >
              <PartyPopper className="w-8 h-8 text-[hsl(var(--biz-green))]" />
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              🎉 What Success Looks Like After Day 7
            </h2>
          </div>

          {/* Success Checklist */}
          <div className="mb-8">
            <p className="text-lg text-muted-foreground mb-6 text-center">
              By the end of this week, you will have:
            </p>
            <ul className="space-y-4 max-w-2xl mx-auto">
              {SUCCESS_ITEMS.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-6 h-6 text-[hsl(var(--biz-green))] flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-8" />

          {/* The Real Win */}
          <div className="bg-[hsl(var(--biz-green))]/5 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-3 mb-3">
              <Heart className="w-6 h-6 text-[hsl(var(--biz-green))] flex-shrink-0" />
              <h3 className="text-lg font-bold text-foreground">The Real Win</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed ml-9">
              You've just demonstrated that you listen. That's rare. Most businesses never close the loop. The customers who gave you feedback now know they were heard. That builds loyalty. They'll give you feedback again. They'll recommend you to friends.
            </p>
          </div>

          {/* How You'll Feel */}
          <div className="bg-[hsl(var(--biz-yellow))]/5 rounded-xl p-6">
            <div className="flex items-start gap-3 mb-3">
              <Sparkles className="w-6 h-6 text-[hsl(var(--biz-yellow))] flex-shrink-0" />
              <h3 className="text-lg font-bold text-foreground">How You'll Feel</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed ml-9">
              Instead of guessing what customers want, you now <strong className="text-foreground">know</strong>. That's powerful.
            </p>
          </div>

          {/* Celebration Badge */}
          {isAllComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="mt-8 text-center"
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[hsl(var(--biz-green))] to-[hsl(var(--biz-yellow))] text-white font-bold shadow-lg">
                <PartyPopper className="w-5 h-5" />
                All 7 Days Complete!
                <Sparkles className="w-5 h-5" />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Module5Success;
