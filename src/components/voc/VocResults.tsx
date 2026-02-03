import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Zap, Check, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Recommendation, QuizAnswers } from "@/state/vocStateManager";
import { segmentConfig, businessStageLabels, maturityLabels } from "@/data/vocRoutingMatrix";
import { getModuleTitle, VOC_URLS } from "@/config/vocUrls";
import { vocAnalytics } from "@/analytics/vocAnalytics";

interface VocResultsProps {
  answers: QuizAnswers;
  recommendation: Recommendation;
}

const VocResults = ({ answers, recommendation }: VocResultsProps) => {
  const navigate = useNavigate();
  const segment = recommendation.segment as keyof typeof segmentConfig;
  const config = segmentConfig[segment];
  const moduleTitle = getModuleTitle(recommendation.startModule);
  const businessLabel = businessStageLabels[answers.businessStage || 'launch'];
  const maturityLabel = maturityLabels[answers.vocMaturity || 'none'];

  const handleStartModule = () => {
    vocAnalytics.trackModuleCTAClick(recommendation.startModule, 'results');
    navigate(VOC_URLS.modules[recommendation.startModule as keyof typeof VOC_URLS.modules]?.url || VOC_URLS.landing);
  };

  return (
    <motion.section 
      className="py-16 px-4 bg-background"
      id="results"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-[720px] mx-auto">
        {/* Results Header */}
        <div 
          className="rounded-2xl p-6 md:p-8 mb-8 border-2"
          style={{ 
            backgroundColor: config.lightBg,
            borderColor: config.color 
          }}
        >
          <div className="flex justify-center mb-4">
            <span className="text-4xl">{config.icon}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-center text-foreground mb-2">
            Your Personalized VoC Path
          </h2>
          <p className="text-center text-muted-foreground mb-4">
            Based on your answers, you're a:
          </p>
          
          <div className="flex flex-col items-center gap-3">
            <span 
              className="inline-block px-5 py-2 rounded-full text-white font-heading font-semibold text-lg"
              style={{ backgroundColor: config.color }}
            >
              {config.label}
            </span>
            <span className="text-center text-muted-foreground">
              {businessLabel} Business with {maturityLabel} customer feedback maturity
            </span>
          </div>
        </div>

        {/* Recommended Path */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-[hsl(var(--biz-blue))]" />
            <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Your Recommended Path
            </span>
          </div>
          
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="text-muted-foreground font-medium">Start with:</span>
              <span className="text-foreground font-semibold">
                Module {recommendation.startModule} — {moduleTitle}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="text-muted-foreground font-medium">Path length:</span>
              <span className="text-foreground">
                {recommendation.pathModules.length} modules (~{recommendation.totalTime} minutes)
              </span>
            </div>
          </div>
        </div>

        {/* 7-Day Quick Win */}
        <div className="bg-gradient-to-br from-[hsl(var(--biz-yellow))]/10 to-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-yellow))]/30 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[hsl(var(--biz-yellow))] flex items-center justify-center">
              <Zap className="h-5 w-5 text-[hsl(var(--biz-blue))]" />
            </div>
            <h4 className="font-heading font-bold text-foreground">
              YOUR 7-DAY QUICK WIN
            </h4>
          </div>
          
          <p className="text-muted-foreground mb-4">
            By the end of Module {recommendation.startModule}, you'll have:
          </p>
          
          <ul className="space-y-2 mb-4">
            {recommendation.quickWinOutcomes.map((outcome, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-[hsl(var(--biz-green))] flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{outcome}</span>
              </li>
            ))}
          </ul>
          
          <p className="text-sm font-medium text-[hsl(var(--biz-blue))]">
            No waiting. No lengthy setup. Real results.
          </p>
        </div>

        {/* Primary CTA */}
        <div className="text-center">
          <Button
            onClick={handleStartModule}
            size="lg"
            className="bg-[hsl(var(--biz-yellow))] hover:bg-[hsl(var(--biz-yellow))]/90 text-[hsl(var(--biz-blue))] font-heading font-semibold text-lg px-8 py-6 h-auto"
          >
            Start Module {recommendation.startModule}: {moduleTitle}
            <ArrowRight className="h-6 w-6 ml-2" />
          </Button>
          
          <a 
            href="#modules" 
            className="block mt-4 text-muted-foreground hover:text-[hsl(var(--biz-blue))] underline underline-offset-4 transition-colors"
          >
            Not sure? Preview all modules below ↓
          </a>
        </div>
      </div>
    </motion.section>
  );
};

export default VocResults;
