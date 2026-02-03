import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import GradientDivider from "@/components/GradientDivider";
import PromotionalBanner from "@/components/PromotionalBanner";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { VOC_URLS } from "@/config/vocUrls";
import { vocState } from "@/state/vocStateManager";

// Module 1 Section Components
import Module1Hero from "@/components/voc/module1/Module1Hero";
import Module1Problem from "@/components/voc/module1/Module1Problem";
import Module1Definition from "@/components/voc/module1/Module1Definition";
import Module1BusinessCase from "@/components/voc/module1/Module1BusinessCase";
import Module1Assessment from "@/components/voc/module1/Module1Assessment";
import Module1SegmentSelector from "@/components/voc/module1/Module1SegmentSelector";
import Module1Completion from "@/components/voc/module1/Module1Completion";
import Module1FAQ from "@/components/voc/module1/Module1FAQ";

const WhyItMatters = () => {
  const [quizScore, setQuizScore] = useState(0);
  const [quizInterpretation, setQuizInterpretation] = useState<'low' | 'medium' | 'high' | null>(null);
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const [showCompletion, setShowCompletion] = useState(false);

  // Load existing state on mount
  useEffect(() => {
    const state = vocState.getState();
    if (state.recommendation?.segment) {
      setSelectedSegment(state.recommendation.segment);
    }
    
    // Mark module as started
    vocState.startModule(1);
  }, []);

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
    const interpretation = score <= 2 ? 'low' : score <= 5 ? 'medium' : 'high';
    setQuizInterpretation(interpretation);
  };

  const handleSegmentSelect = (segment: string) => {
    setSelectedSegment(segment);
  };

  const handleContinueToCompletion = () => {
    setShowCompletion(true);
    vocState.completeModule(1);
    
    // Smooth scroll to completion section
    setTimeout(() => {
      document.getElementById('completion')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const scrollToContent = () => {
    document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Module 1: Why VoC Matters | Voice of Customer Curriculum"
        description="Learn why Voice of Customer is your #1 competitive advantage. Discover the business case, ROI data, and get started with a self-assessment. Free module from BizGrowth Academy."
        keywords="voice of customer, customer feedback, VoC, customer satisfaction, SMB business training, BizHealth"
        canonical="https://bizhealth.ai/bizgrowth/voc/why-it-matters"
        ogType="article"
        ogImage="/og-images/og-voc-module1.jpg"
        articlePublishedTime="2026-01-22"
        articleAuthor="BizHealth.ai Research Team"
      />

      <StructuredData
        type="course"
        name="Module 1: Why VoC Matters"
        description="First module of the BizHealth Voice of Customer curriculum - understand the business case for customer feedback systems"
        provider="BizHealth.ai"
        providerUrl="https://bizhealth.ai"
        url="https://bizhealth.ai/bizgrowth/voc/why-it-matters"
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
            <span className="text-foreground font-medium">Module 1</span>
          </nav>
        </div>

        {/* Progress Bar - sticky under nav */}
        <div className="sticky top-[144px] z-30 bg-background/95 backdrop-blur-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-foreground">Module 1 of 7</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: showCompletion ? '100%' : '50%' }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-[hsl(var(--biz-green))] to-[hsl(var(--biz-green))]/70 rounded-full"
                />
              </div>
              <span className="text-sm text-muted-foreground">{showCompletion ? '100%' : '50%'}</span>
            </div>
          </div>
        </div>

        {/* Section 1: Hero */}
        <Module1Hero onStartClick={scrollToContent} />

        {/* Section 2: The Problem */}
        <div id="problem">
          <Module1Problem />
        </div>

        {/* Section 3: What VoC Actually Means */}
        <Module1Definition />

        {/* Section 4: The Business Case */}
        <Module1BusinessCase />

        {/* Section 5: Self-Assessment Quiz */}
        <Module1Assessment onComplete={handleQuizComplete} />

        {/* Section 6: Segment Selector */}
        <Module1SegmentSelector
          selectedSegment={selectedSegment}
          onSelect={handleSegmentSelect}
          onContinue={handleContinueToCompletion}
          quizCompleted={quizInterpretation !== null}
        />

        {/* Section 7: Module Completion (Conditional) */}
        {showCompletion && (
          <div id="completion">
            <Module1Completion 
              quizScore={quizScore}
              segment={selectedSegment}
            />
          </div>
        )}

        {/* Section 8: FAQ */}
        <Module1FAQ />
      </main>

      <GradientDivider variant="green-gold" />
      <GlobalFooter />
    </div>
  );
};

export default WhyItMatters;
