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

// Module 4 Section Components
import Module4Hero from "@/components/voc/module4/Module4Hero";
import Module4Comparison from "@/components/voc/module4/Module4Comparison";
import Module4SixSteps from "@/components/voc/module4/Module4SixSteps";
import Module4Communication from "@/components/voc/module4/Module4Communication";
import Module4Templates from "@/components/voc/module4/Module4Templates";
import Module4QuickWin from "@/components/voc/module4/Module4QuickWin";
import Module4CoachingCTA from "@/components/voc/module4/Module4CoachingCTA";
import Module4Navigation from "@/components/voc/module4/Module4Navigation";
import Module4FAQ from "@/components/voc/module4/Module4FAQ";

const ClosingTheLoop = () => {
  const [userSegment, setUserSegment] = useState<string | null>(null);
  const [templatesCopied, setTemplatesCopied] = useState(0);
  const [closuresCompleted, setClosuresCompleted] = useState<boolean[]>([false, false, false]);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [sectionsViewed, setSectionsViewed] = useState<string[]>([]);

  // Load existing state on mount
  useEffect(() => {
    const state = vocState.getState();
    if (state.recommendation?.segment) {
      setUserSegment(state.recommendation.segment);
    }
    
    // Load saved closures from localStorage
    const savedClosures = localStorage.getItem('voc_module4_closures');
    if (savedClosures) {
      setClosuresCompleted(JSON.parse(savedClosures));
    }
    
    // Mark module as started
    vocState.startModule(4);
  }, []);

  // Update progress based on completed sections
  useEffect(() => {
    const totalSections = 8;
    const uniqueSections = [...new Set(sectionsViewed)];
    let progress = Math.round((uniqueSections.length / totalSections) * 100);
    
    // Bonus progress for closures completed
    const closureBonus = closuresCompleted.filter(Boolean).length * 5;
    progress = Math.min(100, progress + closureBonus);
    
    setProgressPercentage(Math.min(100, progress));
    
    // Mark complete if progress is 100%
    if (progress >= 100) {
      vocState.completeModule(4);
    }
  }, [sectionsViewed, closuresCompleted]);

  const handleSectionView = (sectionId: string) => {
    if (!sectionsViewed.includes(sectionId)) {
      setSectionsViewed(prev => [...prev, sectionId]);
    }
  };

  const handleTemplateCopied = () => {
    setTemplatesCopied(prev => prev + 1);
  };

  const handleClosureToggle = (index: number) => {
    const updated = [...closuresCompleted];
    updated[index] = !updated[index];
    setClosuresCompleted(updated);
    localStorage.setItem('voc_module4_closures', JSON.stringify(updated));
  };

  const isModuleComplete = progressPercentage >= 80;
  const allClosuresComplete = closuresCompleted.every(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Module 4: Closing the Loop | Voice of Customer Curriculum"
        description="Learn the 6-step closed-loop process that transforms customer feedback into loyalty. Includes ready-to-use email templates and quick-win action checklist."
        keywords="closing the loop, customer feedback response, VoC follow-up, feedback loop, customer recovery, detractor outreach, feedback acknowledgment, customer loyalty, closed-loop system, VoC best practices"
        canonical="https://bizhealth.ai/bizgrowth/voc/closing-the-loop"
        ogType="article"
        ogImage="/og-images/og-voc-module4.jpg"
        articlePublishedTime="2026-01-23"
        articleAuthor="BizHealth.ai Research Team"
      />

      <StructuredData
        type="course"
        name="Module 4: Closing the Loop - VoC Curriculum"
        description="Master the 6-step closed-loop process to transform customer feedback into loyalty. Includes email templates for every scenario and interactive progress tracking."
        provider="BizHealth.ai"
        providerUrl="https://bizhealth.ai"
        url="https://bizhealth.ai/bizgrowth/voc/closing-the-loop"
        educationalLevel="Professional"
        isAccessibleForFree={true}
      />

      <PromotionalBanner />
      <GlobalNavigation />

      <main className="pt-32">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link to="/bizgrowth" className="hover:text-foreground transition-colors">BizGrowth Academy</Link>
            <span>/</span>
            <Link to={VOC_URLS.landing} className="hover:text-foreground transition-colors">Voice of Customer</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Module 4</span>
          </nav>
        </div>

        {/* Progress Bar - positioned below nav with breadcrumb space */}
        <div className="sticky top-[80px] z-40 bg-background/95 backdrop-blur-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-foreground">Module 4 of 7</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-[hsl(var(--biz-yellow))] to-[hsl(var(--biz-yellow))]/70 rounded-full"
                />
              </div>
              <span className="text-sm text-muted-foreground">{progressPercentage}%</span>
            </div>
          </div>
        </div>

        {/* Section 1: Hero */}
        <Module4Hero onView={() => handleSectionView('hero')} />

        {/* Section 2: Bad Loop vs Good Loop Comparison */}
        <Module4Comparison onView={() => handleSectionView('comparison')} />

        {/* Section 3: The 6-Step Closed-Loop Process */}
        <Module4SixSteps onView={() => handleSectionView('six-steps')} />

        {/* Section 4: How to Communicate Closures */}
        <Module4Communication onView={() => handleSectionView('communication')} />

        {/* Section 5: Email Templates */}
        <Module4Templates 
          onView={() => handleSectionView('templates')}
          onTemplateCopied={handleTemplateCopied}
        />

        {/* Section 6: Quick Win - First Three Closures */}
        <Module4QuickWin 
          onView={() => handleSectionView('quick-win')}
          closuresCompleted={closuresCompleted}
          onToggleClosure={handleClosureToggle}
          allComplete={allClosuresComplete}
        />

        {/* Section 7: Coaching CTA */}
        <Module4CoachingCTA onView={() => handleSectionView('coaching')} />

        {/* Module Navigation */}
        <Module4Navigation isComplete={isModuleComplete} />

        {/* FAQ */}
        <Module4FAQ onView={() => handleSectionView('faq')} />
      </main>

      <GradientDivider variant="green-gold" />
      <GlobalFooter />
    </div>
  );
};

export default ClosingTheLoop;
