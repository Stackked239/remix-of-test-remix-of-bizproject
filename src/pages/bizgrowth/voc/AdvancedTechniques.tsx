import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import GradientDivider from "@/components/GradientDivider";
import PromotionalBanner from "@/components/PromotionalBanner";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { VOC_URLS } from "@/config/vocUrls";
import { vocState } from "@/state/vocStateManager";
import confetti from "canvas-confetti";

// Module 7 Components
import Module7LockedHero from "@/components/voc/module7/Module7LockedHero";
import Module7Hero from "@/components/voc/module7/Module7Hero";
import Module7Objectives from "@/components/voc/module7/Module7Objectives";
import Module7RootCause from "@/components/voc/module7/Module7RootCause";
import Module7Segmentation from "@/components/voc/module7/Module7Segmentation";
import Module7Culture from "@/components/voc/module7/Module7Culture";
import Module7Dashboard from "@/components/voc/module7/Module7Dashboard";
import Module7Maturity from "@/components/voc/module7/Module7Maturity";
import Module7CoachingCTA from "@/components/voc/module7/Module7CoachingCTA";
import Module7CompletionRewards from "@/components/voc/module7/Module7CompletionRewards";
import Module7AssessmentCTA from "@/components/voc/module7/Module7AssessmentCTA";
import Module7Summary from "@/components/voc/module7/Module7Summary";
import Module7Navigation from "@/components/voc/module7/Module7Navigation";

const AdvancedTechniques = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [completedModulesCount, setCompletedModulesCount] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    // Check if Module 7 is unlocked
    const unlocked = vocState.isModule7Unlocked();
    setIsUnlocked(unlocked);

    if (unlocked) {
      vocState.startModule(7);
      
      // Check if already completed
      const savedComplete = localStorage.getItem('voc_module7_complete');
      if (savedComplete === 'true') {
        setIsComplete(true);
        setProgressPercentage(100);
      } else {
        setProgressPercentage(50);
      }
    }

    // Get progress count
    const state = vocState.getState();
    const completed = state.progression.modulesCompleted.filter(m => m <= 6).length;
    setCompletedModulesCount(completed);
  }, []);

  const handleMarkComplete = () => {
    setIsComplete(true);
    setProgressPercentage(100);
    localStorage.setItem('voc_module7_complete', 'true');
    vocState.completeModule(7);
    
    // Celebration confetti
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#969423', '#E6B800', '#242553', '#27AE60']
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Advanced VoC Techniques: Root Cause Analysis, Segmentation & Culture | BizGrowth Academy"
        description="Master advanced Voice of Customer techniques: 5 Whys root cause analysis, customer segmentation strategy, building customer-centric culture, dashboard setup, and maturity benchmarking."
        ogImage="/og-images/og-voc-advanced.jpg"
        ogType="article"
        articlePublishedTime="2026-01-23"
        articleAuthor="BizHealth.ai Research Team"
      />
      <StructuredData 
        type="course"
        name="Voice of Customer: Advanced Techniques"
        description="Master advanced VoC techniques including root cause analysis, customer segmentation, culture building, dashboards, and maturity benchmarking."
        url="https://bizhealth.ai/bizgrowth/voc/advanced"
        provider="BizGrowth Academy by BizHealth.ai"
        providerUrl="https://bizhealth.ai/bizgrowth"
        educationalLevel="Advanced"
        isAccessibleForFree={true}
        courseMode="Self-Paced"
      />

      <PromotionalBanner />
      <GlobalNavigation />

      <main className="pt-40">
        {/* Breadcrumb - static */}
        <div className="max-w-7xl mx-auto px-4 mb-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link to="/bizgrowth" className="hover:text-foreground transition-colors">BizGrowth Academy</Link>
            <span>/</span>
            <Link to={VOC_URLS.landing} className="hover:text-foreground transition-colors">Voice of Customer</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Module 7</span>
          </nav>
        </div>

        {/* Sticky Progress Bar */}
        <div className="sticky top-[144px] z-30 bg-background/95 backdrop-blur-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-foreground">Module 7 of 7</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-[hsl(var(--biz-green))] to-[hsl(var(--biz-lime))] rounded-full"
                />
              </div>
              <span className="text-sm text-muted-foreground">{isComplete ? "Complete 🎉" : `${progressPercentage}%`}</span>
            </div>
          </div>
        </div>

        {!isUnlocked ? (
          <Module7LockedHero 
            completedCount={completedModulesCount}
            totalRequired={6}
          />
        ) : (
          <>
            <Module7Hero isComplete={isComplete} />
            <Module7Objectives />
            
            {/* Section 1: Root Cause Analysis */}
            <Module7RootCause />
            
            {/* Section 2: Customer Segmentation */}
            <Module7Segmentation />
            
            {/* Section 3: Building Customer-Centric Culture */}
            <Module7Culture />
            
            {/* Section 4: Dashboard Setup */}
            <Module7Dashboard />
            
            {/* Section 5: Maturity Benchmarking */}
            <Module7Maturity />
            
            {/* Coaching CTA */}
            <Module7CoachingCTA />
            
            {/* Completion Rewards */}
            <Module7CompletionRewards 
              isComplete={isComplete}
              onMarkComplete={handleMarkComplete}
            />
            
            {/* Assessment CTA */}
            <Module7AssessmentCTA />
            
            {/* Curriculum Summary */}
            <Module7Summary />
            
            {/* Navigation */}
            <Module7Navigation />
          </>
        )}
      </main>

      <GradientDivider variant="green-gold" />
      <GlobalFooter />
    </div>
  );
};

export default AdvancedTechniques;
