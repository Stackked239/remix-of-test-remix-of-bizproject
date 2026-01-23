import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Clock, BarChart3, Target, FileCheck, Calculator } from "lucide-react";

interface Module3HeroProps {
  onView: () => void;
}

const Module3Hero = ({ onView }: Module3HeroProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onView();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [onView]);

  const learningObjectives = [
    { icon: BarChart3, text: "Understand 4 key customer satisfaction metrics" },
    { icon: Target, text: "Know which metric to use for different situations" },
    { icon: Calculator, text: "Calculate and interpret scores correctly" },
    { icon: FileCheck, text: "Get templates to start measuring this week" },
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-4xl mx-auto px-4">
        {/* Module Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--biz-blue))]/10 text-[hsl(var(--biz-blue))] text-sm font-semibold">
            Module 3 of 7
          </span>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            20-25 minutes
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight"
        >
          Measuring What Matters
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed"
        >
          The 4 metrics that reveal what customers really think — and which one to start with for YOUR business
        </motion.p>

        {/* Learning Objectives Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-foreground mb-5">
            After this module, you'll be able to:
          </h3>
          <ul className="space-y-4">
            {learningObjectives.map((objective, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[hsl(var(--biz-green))]/10 flex items-center justify-center">
                  <objective.icon className="h-4 w-4 text-[hsl(var(--biz-green))]" />
                </div>
                <span className="text-foreground pt-1">{objective.text}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex justify-center mt-12"
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-sm">Scroll to begin</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2"
            >
              <div className="w-1.5 h-3 bg-muted-foreground/50 rounded-full" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Module3Hero;
