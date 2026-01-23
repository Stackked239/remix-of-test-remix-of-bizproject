import { useState, useEffect, useRef } from "react";
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
import { useToast } from "@/hooks/use-toast";

// Module 5 Section Components
import Module5Hero from "@/components/voc/module5/Module5Hero";
import Module5Timeline from "@/components/voc/module5/Module5Timeline";
import Module5Day1 from "@/components/voc/module5/Module5Day1";
import Module5Day2 from "@/components/voc/module5/Module5Day2";
import Module5Day3 from "@/components/voc/module5/Module5Day3";
import Module5Day4 from "@/components/voc/module5/Module5Day4";
import Module5Day5 from "@/components/voc/module5/Module5Day5";
import Module5Day6 from "@/components/voc/module5/Module5Day6";
import Module5Day7 from "@/components/voc/module5/Module5Day7";
import Module5Success from "@/components/voc/module5/Module5Success";
import Module5FAQ from "@/components/voc/module5/Module5FAQ";
import Module5Navigation from "@/components/voc/module5/Module5Navigation";

export interface DayProgress {
  dayNumber: number;
  completed: boolean;
  completedAt?: string;
}

const SevenDayQuickstart = () => {
  const { toast } = useToast();
  const [daysCompleted, setDaysCompleted] = useState<DayProgress[]>(
    Array.from({ length: 7 }, (_, i) => ({ dayNumber: i + 1, completed: false }))
  );
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [currentActiveDay, setCurrentActiveDay] = useState(1);
  
  const dayRefs = useRef<(HTMLDivElement | null)[]>(Array(7).fill(null));

  // Load existing state on mount
  useEffect(() => {
    // Load saved day progress from localStorage
    const savedProgress = localStorage.getItem('voc_module5_days');
    if (savedProgress) {
      setDaysCompleted(JSON.parse(savedProgress));
    }
    
    // Mark module as started
    vocState.startModule(5);
  }, []);

  // Update progress based on completed days
  useEffect(() => {
    const completedCount = daysCompleted.filter(d => d.completed).length;
    const progress = Math.round((completedCount / 7) * 100);
    setProgressPercentage(progress);
    
    // Mark module complete if all days done
    if (completedCount === 7) {
      vocState.completeModule(5);
    }
    
    // Find first incomplete day for active indicator
    const firstIncomplete = daysCompleted.find(d => !d.completed);
    setCurrentActiveDay(firstIncomplete?.dayNumber || 7);
  }, [daysCompleted]);

  const handleDayComplete = (dayNumber: number) => {
    setDaysCompleted(prev => {
      const updated = prev.map(d => 
        d.dayNumber === dayNumber 
          ? { ...d, completed: !d.completed, completedAt: d.completed ? undefined : new Date().toISOString() }
          : d
      );
      localStorage.setItem('voc_module5_days', JSON.stringify(updated));
      return updated;
    });

    const day = daysCompleted.find(d => d.dayNumber === dayNumber);
    if (!day?.completed) {
      const completedCount = daysCompleted.filter(d => d.completed).length + 1;
      toast({
        title: `Day ${dayNumber} Complete! 🎉`,
        description: completedCount < 7 
          ? `You're on Day ${completedCount} of 7! Keep going!`
          : "Amazing! You've completed all 7 days!",
      });
    }
  };

  const scrollToDay = (dayNumber: number) => {
    const element = dayRefs.current[dayNumber - 1];
    if (element) {
      // Account for nav (144px) + progress bar (~36px) + timeline (~110px) + buffer
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 310;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  const isDayComplete = (dayNumber: number) => {
    return daysCompleted.find(d => d.dayNumber === dayNumber)?.completed || false;
  };

  const completedDaysCount = daysCompleted.filter(d => d.completed).length;
  const isAllComplete = completedDaysCount === 7;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Module 5: Your 7-Day Quick Start | Voice of Customer Curriculum"
        description="Transform from learner to implementer with this realistic 7-day VoC action plan. Collect real feedback, find patterns, and make ONE visible improvement this week."
        keywords="7 day VoC plan, VoC quick start, customer feedback implementation, VoC action plan, survey templates, feedback tracker, closing the loop, customer insights implementation, VoC module 5"
        canonical="https://bizhealth.ai/bizgrowth/voc/7-day-quickstart"
        ogType="article"
        ogImage="/og-images/og-voc-module5.jpg"
        articlePublishedTime="2026-01-23"
        articleAuthor="BizHealth.ai Research Team"
      />

      <StructuredData
        type="course"
        name="Module 5: Your 7-Day Quick Start - VoC Curriculum"
        description="Transform from learner to implementer with this realistic 7-day VoC action plan. Collect real feedback, find patterns, and make ONE visible improvement this week."
        provider="BizHealth.ai"
        providerUrl="https://bizhealth.ai"
        url="https://bizhealth.ai/bizgrowth/voc/7-day-quickstart"
        educationalLevel="Professional"
        isAccessibleForFree={true}
      />

      <PromotionalBanner />
      <GlobalNavigation />

      <main className="pt-36">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 mb-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link to="/bizgrowth" className="hover:text-foreground transition-colors">BizGrowth Academy</Link>
            <span>/</span>
            <Link to={VOC_URLS.landing} className="hover:text-foreground transition-colors">Voice of Customer</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Module 5</span>
          </nav>
        </div>

        {/* Sticky Progress Bar */}
        <div className="sticky top-[144px] z-40 bg-background backdrop-blur-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-foreground">Module 5 of 7</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-[hsl(var(--biz-green))] to-[hsl(var(--biz-yellow))] rounded-full"
                />
              </div>
              <span className="text-sm text-muted-foreground">{completedDaysCount}/7 Days</span>
            </div>
          </div>
        </div>

        {/* Section 1: Hero */}
        <Module5Hero />

        {/* Section 2: Timeline Navigation */}
        <Module5Timeline 
          daysCompleted={daysCompleted}
          currentActiveDay={currentActiveDay}
          onDayClick={scrollToDay}
        />

        {/* Day Sections */}
        <div ref={el => dayRefs.current[0] = el}>
          <Module5Day1 
            isComplete={isDayComplete(1)}
            onToggleComplete={() => handleDayComplete(1)}
          />
        </div>

        <div ref={el => dayRefs.current[1] = el}>
          <Module5Day2 
            isComplete={isDayComplete(2)}
            onToggleComplete={() => handleDayComplete(2)}
          />
        </div>

        <div ref={el => dayRefs.current[2] = el}>
          <Module5Day3 
            isComplete={isDayComplete(3)}
            onToggleComplete={() => handleDayComplete(3)}
          />
        </div>

        <div ref={el => dayRefs.current[3] = el}>
          <Module5Day4 
            isComplete={isDayComplete(4)}
            onToggleComplete={() => handleDayComplete(4)}
          />
        </div>

        <div ref={el => dayRefs.current[4] = el}>
          <Module5Day5 
            isComplete={isDayComplete(5)}
            onToggleComplete={() => handleDayComplete(5)}
          />
        </div>

        <div ref={el => dayRefs.current[5] = el}>
          <Module5Day6 
            isComplete={isDayComplete(6)}
            onToggleComplete={() => handleDayComplete(6)}
          />
        </div>

        <div ref={el => dayRefs.current[6] = el}>
          <Module5Day7 
            isComplete={isDayComplete(7)}
            onToggleComplete={() => handleDayComplete(7)}
          />
        </div>

        {/* Section 10: Success After Day 7 */}
        <Module5Success isAllComplete={isAllComplete} />

        {/* Section 11: FAQ */}
        <Module5FAQ />

        {/* Section 12: Navigation to Module 6 */}
        <Module5Navigation isComplete={isAllComplete || progressPercentage >= 50} />
      </main>

      <GradientDivider variant="green-gold" />
      <GlobalFooter />
    </div>
  );
};

export default SevenDayQuickstart;
