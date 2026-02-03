import { motion } from "framer-motion";
import { Trophy, Sparkles, Clock, GraduationCap } from "lucide-react";

interface Module7HeroProps {
  isComplete: boolean;
}

const Module7Hero = ({ isComplete }: Module7HeroProps) => {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-[hsl(var(--biz-navy))] via-[hsl(var(--biz-navy))]/95 to-[hsl(var(--biz-green))]/20">
      <div className="max-w-5xl mx-auto px-4">
        {/* Unlock Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--biz-lime))]/20 border border-[hsl(var(--biz-lime))]/40 text-[hsl(var(--biz-lime))] mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="font-bold">🎉 Module 7 Unlocked!</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-background mb-4">
            Advanced VoC: From Data to{" "}
            <span className="text-[hsl(var(--biz-lime))]">Customer-Centric Culture</span>
          </h1>
          <p className="text-lg md:text-xl text-background/80 max-w-3xl mx-auto">
            You've built the foundation. Now master the techniques that separate good VoC programs from great ones.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 mb-10"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-background/10 backdrop-blur-sm rounded-lg">
            <Clock className="w-5 h-5 text-[hsl(var(--biz-lime))]" />
            <span className="text-background/90">28-35 minutes</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-background/10 backdrop-blur-sm rounded-lg">
            <Trophy className="w-5 h-5 text-[hsl(var(--biz-gold))]" />
            <span className="text-background/90">5 Advanced Sections</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-background/10 backdrop-blur-sm rounded-lg">
            <GraduationCap className="w-5 h-5 text-[hsl(var(--biz-lime))]" />
            <span className="text-background/90">Certificate Upon Completion</span>
          </div>
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 text-background/60 text-sm">
            <span>Module 7 of 7</span>
            <span className="text-[hsl(var(--biz-lime))]">• Final Module</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Module7Hero;
