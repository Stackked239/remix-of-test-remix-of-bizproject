import { motion } from "framer-motion";
import { Lock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { vocState } from "@/state/vocStateManager";
import { VOC_URLS, getModuleTitle, getModuleUrl } from "@/config/vocUrls";

interface Module7LockedHeroProps {
  completedCount: number;
  totalRequired: number;
}

const Module7LockedHero = ({ completedCount, totalRequired }: Module7LockedHeroProps) => {
  const progressPercent = (completedCount / totalRequired) * 100;
  
  // Find next incomplete module
  const state = vocState.getState();
  const nextIncomplete = [1, 2, 3, 4, 5, 6].find(
    m => !state.progression.modulesCompleted.includes(m)
  ) || 1;

  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-[hsl(var(--biz-navy))] via-[hsl(var(--biz-navy))]/95 to-[hsl(var(--biz-navy))]/90">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto rounded-full bg-background/10 flex items-center justify-center mb-6">
            <Lock className="w-12 h-12 text-background/60" />
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-background mb-4">
            Module 7: Advanced Techniques
          </h1>
          
          <p className="text-lg md:text-xl text-background/70 max-w-2xl mx-auto mb-8">
            Complete Modules 1-6 to unlock advanced VoC techniques, interactive tools, and your VoC Practitioner Certificate
          </p>
        </motion.div>

        {/* Progress Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-background/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 max-w-xl mx-auto mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-background font-medium">Your Progress</span>
            <span className="text-background/80 text-sm">
              {completedCount} of {totalRequired} modules complete
            </span>
          </div>
          
          <Progress value={progressPercent} className="h-3 mb-4" />
          
          <p className="text-background/60 text-sm">
            {totalRequired - completedCount} more module{totalRequired - completedCount !== 1 ? 's' : ''} to unlock
          </p>
        </motion.div>

        {/* Module Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto mb-8"
        >
          {[1, 2, 3, 4, 5, 6].map((moduleNum) => {
            const isCompleted = state.progression.modulesCompleted.includes(moduleNum);
            return (
              <Link
                key={moduleNum}
                to={getModuleUrl(moduleNum)}
                className={`p-3 rounded-lg text-left transition-all ${
                  isCompleted 
                    ? 'bg-[hsl(var(--biz-green))]/20 border border-[hsl(var(--biz-green))]/40' 
                    : 'bg-background/5 border border-background/20 hover:bg-background/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                    isCompleted 
                      ? 'bg-[hsl(var(--biz-green))] text-background' 
                      : 'bg-background/20 text-background/60'
                  }`}>
                    {isCompleted ? '✓' : moduleNum}
                  </div>
                  <span className={`text-sm ${isCompleted ? 'text-background' : 'text-background/60'}`}>
                    Module {moduleNum}
                  </span>
                </div>
              </Link>
            );
          })}
        </motion.div>

        {/* CTA to continue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            asChild
            size="lg"
            className="bg-[hsl(var(--biz-green))] hover:bg-[hsl(var(--biz-green))]/90 text-white gap-2"
          >
            <Link to={getModuleUrl(nextIncomplete)}>
              Continue to {getModuleTitle(nextIncomplete)}
              <ChevronRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Module7LockedHero;
