import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X, Check, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Module4ComparisonProps {
  onView: () => void;
}

const Module4Comparison = ({ onView }: Module4ComparisonProps) => {
  const [showGood, setShowGood] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-rotate on mobile
  useEffect(() => {
    if (isMobile && !isPaused) {
      const timer = setInterval(() => {
        setShowGood((prev) => !prev);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isMobile, isPaused]);

  const badLoop = [
    { day: "Day 1", event: "Customer complains about checkout" },
    { day: "Day 1", event: "Company receives feedback" },
    { day: "Day 7", event: "Nothing happens" },
    { day: "Day 14", event: "Still nothing" },
    { day: "Day 21", event: "Customer complains again" },
    { day: "Day 30", event: "Company finally reads. Customer already left." },
  ];

  const goodLoop = [
    { day: "Day 1", event: "Customer complains about checkout" },
    { day: "Day 1", event: 'Company responds: "Thank you. We\'re reviewing this."' },
    { day: "Day 3", event: "Company investigates. Finds 8 others with same issue" },
    { day: "Day 5", event: "Team redesigns checkout, adds progress bar" },
    { day: "Day 6", event: 'Company emails: "We took action. Here\'s what changed"' },
    { day: "Day 7", event: "Customer tries again. Better experience!" },
  ];

  const badResult = "Lost revenue, 1-star review, competitor wins";
  const goodResult = "Customer becomes promoter, refers 2 others, writes positive review";

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 px-4 bg-background"
      data-section="comparison"
      data-section-number="2"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
            See What This Looks Like in Practice
          </h2>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <Button
              variant="outline"
              onClick={() => {
                setShowGood(!showGood);
                setIsPaused(true);
              }}
              className="gap-2"
            >
              <ArrowLeftRight className="h-4 w-4" />
              {showGood ? "Show Bad Loop" : "Show Good Loop"}
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Auto-rotates every 5 seconds
            </p>
          </div>
        </motion.div>

        {/* Desktop: Side by Side */}
        <div className="hidden md:grid md:grid-cols-2 gap-6">
          {/* Bad Loop */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-900/50 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <X className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
              <h3 className="font-heading font-bold text-foreground">
                  THE BAD
                </h3>
                <p className="text-sm text-muted-foreground">
                  What Most Companies Do
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {badLoop.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-16 text-xs font-semibold text-red-600 dark:text-red-400 pt-0.5">
                    {item.day}
                  </div>
                  <div className="flex-1 text-sm text-foreground/80">
                    {item.event}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-red-200 dark:border-red-900/50">
              <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                Result: {badResult}
              </p>
            </div>
          </motion.div>

          {/* Good Loop */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-green-50 dark:bg-green-950/20 border-2 border-green-200 dark:border-green-900/50 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
              <h3 className="font-heading font-bold text-foreground">
                  THE GOOD
                </h3>
                <p className="text-sm text-muted-foreground">The VoC Way</p>
              </div>
            </div>

            <div className="space-y-4">
              {goodLoop.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-16 text-xs font-semibold text-green-600 dark:text-green-400 pt-0.5">
                    {item.day}
                  </div>
                  <div className="flex-1 text-sm text-foreground/80">
                    {item.event}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-green-200 dark:border-green-900/50">
              <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                Result: {goodResult}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Mobile: Toggle View */}
        <div className="md:hidden">
          <motion.div
            key={showGood ? "good" : "bad"}
            initial={{ opacity: 0, x: showGood ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: showGood ? -20 : 20 }}
            transition={{ duration: 0.3 }}
            className={`rounded-xl p-6 border-2 ${
              showGood
                ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900/50"
                : "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  showGood
                    ? "bg-green-100 dark:bg-green-900/30"
                    : "bg-red-100 dark:bg-red-900/30"
                }`}
              >
                {showGood ? (
                  <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                ) : (
                  <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                )}
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground">
                  {showGood ? "THE GOOD" : "THE BAD"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {showGood ? "The VoC Way" : "What Most Companies Do"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {(showGood ? goodLoop : badLoop).map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div
                    className={`w-16 text-xs font-semibold pt-0.5 ${
                      showGood
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {item.day}
                  </div>
                  <div className="flex-1 text-sm text-foreground/80">
                    {item.event}
                  </div>
                </div>
              ))}
            </div>

            <div
              className={`mt-6 pt-4 border-t ${
                showGood
                  ? "border-green-200 dark:border-green-900/50"
                  : "border-red-200 dark:border-red-900/50"
              }`}
            >
              <p
                className={`text-sm font-semibold ${
                  showGood
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                Result: {showGood ? goodResult : badResult}
              </p>
            </div>
          </motion.div>

          {/* Mobile Indicator Dots */}
          <div className="flex justify-center gap-2 mt-4">
            <div
              className={`w-2 h-2 rounded-full transition-colors ${
                !showGood ? "bg-red-500" : "bg-muted"
              }`}
            />
            <div
              className={`w-2 h-2 rounded-full transition-colors ${
                showGood ? "bg-green-500" : "bg-muted"
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Module4Comparison;
