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

// Module 3 Section Components
import Module3Hero from "@/components/voc/module3/Module3Hero";
import Module3WhyMetricsMatter from "@/components/voc/module3/Module3WhyMetricsMatter";
import Module3NPS from "@/components/voc/module3/Module3NPS";
import Module3CSAT from "@/components/voc/module3/Module3CSAT";
import Module3CES from "@/components/voc/module3/Module3CES";
import Module3Sentiment from "@/components/voc/module3/Module3Sentiment";
import Module3ChoosingMetric from "@/components/voc/module3/Module3ChoosingMetric";
import Module3Trends from "@/components/voc/module3/Module3Trends";
import Module3QuickStart from "@/components/voc/module3/Module3QuickStart";
import Module3Downloads from "@/components/voc/module3/Module3Downloads";
import Module3Navigation from "@/components/voc/module3/Module3Navigation";
import Module3FAQ from "@/components/voc/module3/Module3FAQ";

const Metrics = () => {
  const [userSegment, setUserSegment] = useState<string | null>(null);
  const [calculatorUsed, setCalculatorUsed] = useState(false);
  const [quickStartStarted, setQuickStartStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [sectionsViewed, setSectionsViewed] = useState<string[]>([]);

  // Load existing state on mount
  useEffect(() => {
    const state = vocState.getState();
    if (state.recommendation?.segment) {
      setUserSegment(state.recommendation.segment);
    }
    
    // Mark module as started
    vocState.startModule(3);
  }, []);

  // Update progress based on completed sections
  useEffect(() => {
    const totalSections = 9;
    const uniqueSections = [...new Set(sectionsViewed)];
    let progress = Math.round((uniqueSections.length / totalSections) * 100);
    if (calculatorUsed) progress = Math.min(100, progress + 10);
    setProgressPercentage(Math.min(100, progress));
    
    // Mark complete if progress is 100%
    if (progress >= 100) {
      vocState.completeModule(3);
    }
  }, [sectionsViewed, calculatorUsed]);

  const handleSectionView = (sectionId: string) => {
    if (!sectionsViewed.includes(sectionId)) {
      setSectionsViewed(prev => [...prev, sectionId]);
    }
  };

  const handleCalculatorUsed = () => {
    setCalculatorUsed(true);
  };

  const handleQuickStartAction = () => {
    setQuickStartStarted(true);
  };

  const isModuleComplete = progressPercentage >= 80;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Module 3: Measuring What Matters | Voice of Customer Curriculum"
        description="Learn the 4 key VoC metrics: NPS, CSAT, CES, and Sentiment Analysis. Includes interactive NPS calculator, survey templates, and 7-day implementation guide."
        keywords="NPS, CSAT, CES, sentiment analysis, customer satisfaction metrics, Net Promoter Score, Customer Effort Score, voice of customer metrics, VoC measurement, customer feedback metrics, SMB"
        canonical="https://bizhealth.ai/bizgrowth/voc/metrics"
        ogType="article"
        ogImage="/og-images/og-voc-module3.jpg"
        articlePublishedTime="2026-01-23"
        articleAuthor="BizHealth.ai Research Team"
      />

      <StructuredData
        type="course"
        name="Module 3: Measuring What Matters - VoC Metrics"
        description="Master the 4 essential customer satisfaction metrics: NPS, CSAT, CES, and Sentiment Analysis. Includes interactive calculators and downloadable templates."
        provider="BizHealth.ai"
        providerUrl="https://bizhealth.ai"
        url="https://bizhealth.ai/bizgrowth/voc/metrics"
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
            <span className="text-foreground font-medium">Module 3</span>
          </nav>
        </div>

        {/* Progress Bar */}
        <div className="sticky top-[72px] z-40 bg-background/95 backdrop-blur-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-foreground">Module 3 of 7</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-[hsl(var(--biz-green))] to-[hsl(var(--biz-green))]/70 rounded-full"
                />
              </div>
              <span className="text-sm text-muted-foreground">{progressPercentage}%</span>
            </div>
          </div>
        </div>

        {/* Section 1: Hero */}
        <Module3Hero onView={() => handleSectionView('hero')} />

        {/* Section 2: Why Metrics Matter */}
        <Module3WhyMetricsMatter onView={() => handleSectionView('why-metrics')} />

        {/* Section 3: NPS with Calculator */}
        <Module3NPS 
          onView={() => handleSectionView('nps')} 
          onCalculatorUsed={handleCalculatorUsed}
        />

        {/* Section 4: CSAT */}
        <Module3CSAT onView={() => handleSectionView('csat')} />

        {/* Section 5: CES */}
        <Module3CES onView={() => handleSectionView('ces')} />

        {/* Section 6: Sentiment Analysis */}
        <Module3Sentiment onView={() => handleSectionView('sentiment')} />

        {/* Section 7: Choosing the Right Metric */}
        <Module3ChoosingMetric 
          userSegment={userSegment} 
          onView={() => handleSectionView('choosing')} 
        />

        {/* Section 8: Tracking Trends */}
        <Module3Trends onView={() => handleSectionView('trends')} />

        {/* Section 9: 7-Day Quick Start */}
        <Module3QuickStart 
          onView={() => handleSectionView('quickstart')}
          onAction={handleQuickStartAction}
        />

        {/* Section 10: Downloads */}
        <Module3Downloads />

        {/* Module Navigation */}
        <Module3Navigation isComplete={isModuleComplete} />

        {/* FAQ */}
        <Module3FAQ />
      </main>

      <GradientDivider variant="green-gold" />
      <GlobalFooter />
    </div>
  );
};

export default Metrics;
