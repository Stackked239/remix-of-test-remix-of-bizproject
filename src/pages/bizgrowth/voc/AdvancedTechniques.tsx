import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import GradientDivider from "@/components/GradientDivider";
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
      }
    }

    // Get progress count
    const state = vocState.getState();
    const completed = state.progression.modulesCompleted.filter(m => m <= 6).length;
    setCompletedModulesCount(completed);
  }, []);

  const handleMarkComplete = () => {
    setIsComplete(true);
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Voice of Customer: Advanced Techniques",
    description: "Master advanced VoC techniques including root cause analysis, customer segmentation, culture building, dashboards, and maturity benchmarking.",
    provider: {
      "@type": "Organization",
      name: "BizGrowth Academy by BizHealth.ai",
      url: "https://bizhealth.ai/bizgrowth"
    },
    courseCode: "VOC-007",
    educationalLevel: "Advanced",
    isAccessibleForFree: true,
    timeRequired: "PT35M",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      courseWorkload: "PT35M"
    }
  };

  return (
    <>
      <SEO
        title="Advanced VoC Techniques: Root Cause Analysis, Segmentation & Culture | BizGrowth Academy"
        description="Master advanced Voice of Customer techniques: 5 Whys root cause analysis, customer segmentation strategy, building customer-centric culture, dashboard setup, and maturity benchmarking."
        ogImage="/og-images/og-voc-advanced.jpg"
        ogType="article"
        articlePublishedTime="2026-01-23"
        articleAuthor="BizHealth.ai Research Team"
      />
      <StructuredData data={structuredData} />

      <main className="min-h-screen bg-background">
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

        <GradientDivider variant="green-gold" />
      </main>
    </>
  );
};

export default AdvancedTechniques;
