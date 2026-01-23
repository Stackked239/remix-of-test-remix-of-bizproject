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

// Module 6 Section Components
import Module6Hero from "@/components/voc/module6/Module6Hero";
import Module6Timeline from "@/components/voc/module6/Module6Timeline";
import Module6Foundation from "@/components/voc/module6/Module6Foundation";
import Module6Refinement from "@/components/voc/module6/Module6Refinement";
import Module6Optimization from "@/components/voc/module6/Module6Optimization";
import Module6RACI from "@/components/voc/module6/Module6RACI";
import Module6Pitfalls from "@/components/voc/module6/Module6Pitfalls";
import Module6Rhythm from "@/components/voc/module6/Module6Rhythm";
import Module6QuickWin from "@/components/voc/module6/Module6QuickWin";
import Module6Downloads from "@/components/voc/module6/Module6Downloads";
import Module6CoachingCTA from "@/components/voc/module6/Module6CoachingCTA";
import Module6Navigation from "@/components/voc/module6/Module6Navigation";

const NinetyDaySystem = () => {
  const [activePhase, setActivePhase] = useState<1 | 2 | 3>(1);
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Mark module as started
    vocState.startModule(6);
    
    // Check if module was previously completed
    const savedState = localStorage.getItem('voc_module6_complete');
    if (savedState === 'true') {
      setIsComplete(true);
    }
  }, []);

  const handleMarkComplete = () => {
    setIsComplete(true);
    localStorage.setItem('voc_module6_complete', 'true');
    vocState.completeModule(6);
  };

  const toggleWeekExpanded = (weekNumber: number) => {
    setExpandedWeeks(prev => 
      prev.includes(weekNumber) 
        ? prev.filter(w => w !== weekNumber)
        : [...prev, weekNumber]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Module 6: Building Your 90-Day VoC System | Voice of Customer Curriculum"
        description="Complete 90-day implementation roadmap with team accountability, ownership models, and proven rhythms. Transform quick wins into sustainable Voice of Customer systems."
        keywords="90 day VoC system, VoC implementation roadmap, team accountability VoC, VoC ownership model, RACI matrix customer feedback, VoC program management, sustainable feedback system, VoC module 6"
        canonical="https://bizhealth.ai/bizgrowth/voc/90-day-system"
        ogType="article"
        ogImage="/og-images/og-voc-module6.jpg"
        articlePublishedTime="2026-01-23"
        articleAuthor="BizHealth.ai Research Team"
      />

      <StructuredData
        type="course"
        name="Module 6: Building Your 90-Day VoC System - VoC Curriculum"
        description="Complete 90-day implementation roadmap with team accountability, ownership models, and proven rhythms. Transform quick wins into sustainable Voice of Customer systems."
        provider="BizHealth.ai"
        providerUrl="https://bizhealth.ai"
        url="https://bizhealth.ai/bizgrowth/voc/90-day-system"
        educationalLevel="Professional"
        isAccessibleForFree={true}
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
            <span className="text-foreground font-medium">Module 6</span>
          </nav>
        </div>

        {/* Sticky Progress Bar */}
        <div className="sticky top-[144px] z-30 bg-background/95 backdrop-blur-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-foreground">Module 6 of 7</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: isComplete ? "100%" : "85.7%" }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-[hsl(var(--biz-green))] to-[hsl(var(--biz-yellow))] rounded-full"
                />
              </div>
              <span className="text-sm text-muted-foreground">{isComplete ? "Complete" : "22-28 min"}</span>
            </div>
          </div>
        </div>

        {/* Section 1: Hero */}
        <Module6Hero />

        {/* Section 2: Interactive Timeline Overview */}
        <Module6Timeline 
          activePhase={activePhase}
          onPhaseClick={setActivePhase}
        />

        {/* Section 3: Days 1-30 Foundation */}
        <Module6Foundation 
          expandedWeeks={expandedWeeks}
          onToggleWeek={toggleWeekExpanded}
        />

        {/* Section 4: Days 31-60 Refinement */}
        <Module6Refinement />

        {/* Section 5: Days 61-90 Optimization */}
        <Module6Optimization />

        {/* Section 6: RACI Ownership Model */}
        <Module6RACI />

        {/* Section 7: Common Pitfalls */}
        <Module6Pitfalls />

        {/* Section 8: Building the Rhythm */}
        <Module6Rhythm />

        {/* Section 9: Quick Win - Take Action Now */}
        <Module6QuickWin />

        {/* Section 10: Downloads */}
        <Module6Downloads />

        {/* Section 11: Coaching CTA */}
        <Module6CoachingCTA />

        {/* Section 12: Navigation */}
        <Module6Navigation 
          isComplete={isComplete}
          onMarkComplete={handleMarkComplete}
        />
      </main>

      <GradientDivider variant="green-gold" />
      <GlobalFooter />
    </div>
  );
};

export default NinetyDaySystem;
