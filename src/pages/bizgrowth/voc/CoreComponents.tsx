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

// Module 2 Section Components
import Module2Hero from "@/components/voc/module2/Module2Hero";
import Module2Introduction from "@/components/voc/module2/Module2Introduction";
import Module2Component1 from "@/components/voc/module2/Module2Component1";
import Module2Component2 from "@/components/voc/module2/Module2Component2";
import Module2Component3 from "@/components/voc/module2/Module2Component3";
import Module2Component4 from "@/components/voc/module2/Module2Component4";
import Module2Synthesis from "@/components/voc/module2/Module2Synthesis";
import Module2Quiz from "@/components/voc/module2/Module2Quiz";
import Module2Takeaways from "@/components/voc/module2/Module2Takeaways";
import Module2Downloads from "@/components/voc/module2/Module2Downloads";
import Module2Navigation from "@/components/voc/module2/Module2Navigation";
import Module2FAQ from "@/components/voc/module2/Module2FAQ";

const CoreComponents = () => {
  const [userSegment, setUserSegment] = useState<string | null>(null);
  const [sourcesSelected, setSourcesSelected] = useState(false);
  const [channelsReviewed, setChannelsReviewed] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [takeawaysAcknowledged, setTakeawaysAcknowledged] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);

  // Load existing state on mount
  useEffect(() => {
    const state = vocState.getState();
    if (state.recommendation?.segment) {
      setUserSegment(state.recommendation.segment);
    }
    
    // Mark module as started
    vocState.startModule(2);
  }, []);

  // Update progress based on completed sections
  useEffect(() => {
    let progress = 0;
    if (sourcesSelected) progress += 25;
    if (channelsReviewed) progress += 25;
    if (quizCompleted) progress += 25;
    if (takeawaysAcknowledged) progress += 25;
    setProgressPercentage(progress);
  }, [sourcesSelected, channelsReviewed, quizCompleted, takeawaysAcknowledged]);

  const handleSourcesSelected = () => {
    setSourcesSelected(true);
  };

  const handleChannelsReviewed = () => {
    setChannelsReviewed(true);
  };

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
    setQuizCompleted(true);
    if (score >= 2) {
      vocState.completeModule(2);
    }
  };

  const handleTakeawaysAcknowledged = () => {
    setTakeawaysAcknowledged(true);
    vocState.completeModule(2);
  };

  const isModuleComplete = quizCompleted && quizScore >= 2;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Module 2: The Four Core Components | Voice of Customer Curriculum"
        description="Learn the four essential components of VoC systems: active + passive feedback, omnichannel listening, closing the loop, and centralized data. Free templates included."
        keywords="voice of customer, VoC components, customer feedback, active feedback, passive feedback, omnichannel listening, closing the loop, feedback tracker, SMB"
        canonical="https://bizhealth.ai/bizgrowth/voc/core-components"
        ogType="article"
        ogImage="/og-images/og-voc-module2.jpg"
        articlePublishedTime="2026-01-22"
        articleAuthor="BizHealth.ai Research Team"
      />

      <StructuredData
        type="course"
        name="Module 2: The Four Core Components of Voice of Customer"
        description="Learn the four essential components that make VoC systems work: active + passive feedback collection, omnichannel listening, closing the loop, and centralized data management."
        provider="BizHealth.ai"
        providerUrl="https://bizhealth.ai"
        url="https://bizhealth.ai/bizgrowth/voc/core-components"
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
            <span className="text-foreground font-medium">Module 2</span>
          </nav>
        </div>

        {/* Progress Bar - sticky under nav */}
        <div className="sticky top-[144px] z-30 bg-background/95 backdrop-blur-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-foreground">Module 2 of 7</span>
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
        <Module2Hero />

        {/* Section 2: Introduction */}
        <Module2Introduction />

        {/* Section 3: Component 1 - Active + Passive Feedback */}
        <Module2Component1 onComplete={handleSourcesSelected} />

        {/* Section 4: Component 2 - Omnichannel Listening */}
        <Module2Component2 
          userSegment={userSegment} 
          onComplete={handleChannelsReviewed} 
        />

        {/* Section 5: Component 3 - Closing the Loop */}
        <Module2Component3 />

        {/* Section 6: Component 4 - Centralized Data */}
        <Module2Component4 />

        {/* Section 7: Synthesis Story */}
        <Module2Synthesis />

        {/* Section 8: Quiz */}
        <Module2Quiz onComplete={handleQuizComplete} />

        {/* Section 9: Key Takeaways */}
        <Module2Takeaways 
          onAcknowledge={handleTakeawaysAcknowledged}
          acknowledged={takeawaysAcknowledged}
        />

        {/* Section 10: Downloads */}
        <Module2Downloads />

        {/* Section 11: Module Navigation */}
        <Module2Navigation isComplete={isModuleComplete} />

        {/* Section 12: FAQ */}
        <Module2FAQ />
      </main>

      <GradientDivider variant="green-gold" />
      <GlobalFooter />
    </div>
  );
};

export default CoreComponents;
