import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, CheckCircle2, Circle, PartyPopper } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import confetti from "canvas-confetti";

interface Module4QuickWinProps {
  onView: () => void;
  closuresCompleted: boolean[];
  onToggleClosure: (index: number) => void;
  allComplete: boolean;
}

const Module4QuickWin = ({
  onView,
  closuresCompleted,
  onToggleClosure,
  allComplete,
}: Module4QuickWinProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasShownConfetti, setHasShownConfetti] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onView();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [onView]);

  // Confetti effect when all complete
  useEffect(() => {
    if (allComplete && !hasShownConfetti) {
      setHasShownConfetti(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#E6B800", "#242553", "#969423"],
      });
    }
  }, [allComplete, hasShownConfetti]);

  const steps = [
    {
      title: "Step 1: Identify 3 Old Pieces of Feedback",
      description:
        "Look in: Google reviews, support tickets, emails, social mentions. Pick the oldest feedback you haven't responded to.",
      tip: "Start with 1-star reviews or complaints",
    },
    {
      title: "Step 2: Craft Your Response",
      description:
        "Use one of the templates above. Personalize with customer name + specific issue. Be authentic (don't over-apologize).",
    },
    {
      title: "Step 3: Send This Week",
      description:
        'Email or direct message (depending on channel). If very old: "I know this was from months ago..." If resolved: "Here\'s what we\'ve done since"',
    },
  ];

  const completedCount = closuresCompleted.filter(Boolean).length;

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 px-4 bg-background"
      data-section="quick-win"
      data-section-number="6"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-[hsl(var(--biz-yellow))]/10 to-[hsl(var(--biz-yellow))]/5 rounded-2xl border-2 border-[hsl(var(--biz-yellow))]/30 p-6 md:p-8"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[hsl(var(--biz-yellow))] flex items-center justify-center">
              <Zap className="h-6 w-6 text-[hsl(var(--biz-blue))]" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground">
                QUICK WIN: Close the Loop THIS WEEK
              </h2>
            </div>
          </div>

          {/* Intro Text */}
          <p className="text-foreground/80 mb-6">
            You don't need to wait for new feedback. Look back at feedback you
            received but never followed up on.{" "}
            <strong>
              Closing those loops now shows customers you care — even months
              later.
            </strong>
          </p>

          <p className="font-semibold text-foreground mb-4">
            Here's your mission:
          </p>

          {/* Steps */}
          <div className="space-y-4 mb-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-background rounded-lg p-4 border"
              >
                <h4 className="font-heading font-semibold text-foreground mb-2">
                  {step.title}
                </h4>
                <p className="text-sm text-foreground/80">{step.description}</p>
                {step.tip && (
                  <p className="text-sm text-[hsl(var(--biz-yellow))] mt-2 flex items-center gap-1">
                    💡 Tip: {step.tip}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Progress Tracker */}
          <div className="bg-background rounded-xl p-5 border">
            <h4 className="font-heading font-semibold text-foreground mb-4">
              Track Your Progress:
            </h4>

            <div className="space-y-3">
              {[1, 2, 3].map((num, index) => (
                <div
                  key={num}
                  className="flex items-center gap-3 cursor-pointer group"
                  onClick={() => onToggleClosure(index)}
                >
                  <Checkbox
                    checked={closuresCompleted[index]}
                    onCheckedChange={() => onToggleClosure(index)}
                    className="h-6 w-6 data-[state=checked]:bg-[hsl(var(--biz-green))] data-[state=checked]:border-[hsl(var(--biz-green))]"
                  />
                  <span
                    className={`text-foreground transition-all ${
                      closuresCompleted[index]
                        ? "line-through text-muted-foreground"
                        : "group-hover:text-[hsl(var(--biz-green))]"
                    }`}
                  >
                    Loop {num} closed
                  </span>
                  {closuresCompleted[index] && (
                    <CheckCircle2 className="h-4 w-4 text-[hsl(var(--biz-green))]" />
                  )}
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-semibold text-foreground">
                  {completedCount}/3 completed
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedCount / 3) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-[hsl(var(--biz-green))] to-[hsl(var(--biz-yellow))] rounded-full"
                />
              </div>
            </div>

            {/* Celebration */}
            <AnimatePresence>
              {allComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-4 bg-[hsl(var(--biz-green))]/10 rounded-lg text-center"
                >
                  <div className="flex items-center justify-center gap-2 text-[hsl(var(--biz-green))] font-semibold">
                    <PartyPopper className="h-5 w-5" />
                    Congratulations! You've closed all 3 loops!
                    <PartyPopper className="h-5 w-5" />
                  </div>
                  <p className="text-sm text-foreground/70 mt-1">
                    You're already ahead of 90% of businesses.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Motivational Quote */}
          <div className="mt-6 text-center">
            <p className="text-sm italic text-muted-foreground">
              "Customers expect to hear back on NEW feedback. But responding to
              OLD feedback? That's how you stand out. That's how you build
              loyalty."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Module4QuickWin;
