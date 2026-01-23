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
    <section ref={sectionRef} className="py-8 md:py-12 bg-gradient-to-br from-[hsl(var(--biz-navy))] via-[hsl(var(--biz-navy))]/95 to-[hsl(var(--biz-blue))]">
      <div className="max-w-4xl mx-auto px-4">
        {/* Module Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--biz-gold))] text-[hsl(var(--biz-navy))] text-sm font-bold shadow-lg">
            Module 3 of 7
          </span>
          <span className="flex items-center gap-1.5 text-sm text-white/80">
            <Clock className="h-4 w-4 text-[hsl(var(--biz-gold))]" />
            20-25 minutes
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-md"
        >
          Measuring What{" "}
          <span className="text-[hsl(var(--biz-gold))] drop-shadow-sm">Matters</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed font-medium"
        >
          The 4 metrics that reveal what customers really think — and which one to start with for YOUR business
        </motion.p>

        {/* Learning Objectives Card - Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/15 backdrop-blur-md rounded-xl p-6 md:p-8 border border-white/30 shadow-xl"
        >
          <h3 className="text-lg font-semibold text-white mb-5">
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
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[hsl(var(--biz-gold))]/20 flex items-center justify-center border border-[hsl(var(--biz-gold))]/30">
                  <objective.icon className="h-4 w-4 text-[hsl(var(--biz-gold))]" />
                </div>
                <span className="text-white pt-1">{objective.text}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex justify-center mt-8"
        >
          <div className="flex flex-col items-center gap-2 text-white/70">
            <span className="text-sm">Scroll to begin</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
            >
              <div className="w-1.5 h-3 bg-white/50 rounded-full" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Module3Hero;
