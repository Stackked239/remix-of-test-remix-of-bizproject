import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, Zap, ChevronDown } from "lucide-react";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import PromotionalBanner from "@/components/PromotionalBanner";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import VocQuiz from "@/components/voc/VocQuiz";
import VocResults from "@/components/voc/VocResults";
import VocCurriculumPreview from "@/components/voc/VocCurriculumPreview";
import VocToolsPreview from "@/components/voc/VocToolsPreview";
import VocSuccessStories from "@/components/voc/VocSuccessStories";
import VocFAQ from "@/components/voc/VocFAQ";
import VocCoachingGateway from "@/components/voc/VocCoachingGateway";
import VocFinalCTA from "@/components/voc/VocFinalCTA";
import VocAssessmentUpsell from "@/components/voc/VocAssessmentUpsell";
import { QuizAnswers, Recommendation } from "@/state/vocStateManager";
import { useVocState } from "@/hooks/useVocState";
import vocHeroBg from "@/assets/images/voc-hero-bg.jpg";

const VoiceOfCustomer = () => {
  const { completeQuiz } = useVocState();
  const [showResults, setShowResults] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers | null>(null);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);

  const handleQuizComplete = (answers: QuizAnswers, rec: Recommendation) => {
    setQuizAnswers(answers);
    setRecommendation(rec);
    completeQuiz(answers, rec);
    setShowResults(true);
    
    // Scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const scrollToQuiz = () => {
    document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Voice of Customer (VoC) Curriculum | Free Customer Feedback Training"
        description="Build a customer feedback system that actually works. 7 modules in ~90 minutes. Get a personalized learning path in 60 seconds. No business degree required. Real results in 7 days. Free VoC training for SMBs."
        keywords="voice of customer, VoC curriculum, customer feedback system, customer feedback training, VoC program, customer listening, customer experience training, NPS, CSAT, customer satisfaction, customer retention, feedback collection, VoC for small business, free VoC training, customer insights, customer success, bizgrowth academy, customer centric business"
        canonical="https://bizhealth.ai/bizgrowth/voice-of-customer"
        ogImage="/og-images/og-voc-curriculum.jpg"
        ogType="website"
      />
      <StructuredData
        type="course"
        name="Voice of Customer (VoC) Curriculum - Free Customer Feedback Training"
        description="Learn how to build a customer feedback system that drives business growth. 7 modules covering feedback collection, analysis, metrics (NPS/CSAT), loop closure, and implementation. Personalized learning paths based on your business stage. ~90 minutes total, real results in 7 days."
        url="https://bizhealth.ai/bizgrowth/voice-of-customer"
        provider="BizHealth.ai"
        providerUrl="https://bizhealth.ai"
        courseMode="Self-Paced"
        isAccessibleForFree={true}
        educationalLevel="Beginner to Intermediate"
        learningResourceType="Curriculum"
        inLanguage="en-US"
      />
      
      <PromotionalBanner />
      <GlobalNavigation />

      {/* Hero Section - pt-40 accounts for fixed banner (80px) + nav bar */}
      <section 
        className="relative min-h-[60vh] md:min-h-[50vh] flex items-center justify-center px-4 py-20 pt-40"
        style={{
          backgroundImage: `linear-gradient(135deg, hsl(var(--biz-blue)) 0%, #1a1b3d 100%)`,
        }}
      >
        <div 
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `url(${vocHeroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        
        <div className="relative z-10 max-w-[720px] mx-auto text-center">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block bg-[hsl(var(--biz-yellow))] text-[hsl(var(--biz-blue))] font-heading text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider mb-6"
          >
            BizGrowth Academy
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight"
          >
            Build a Customer Feedback System That Actually Works
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-white/80 mb-8"
          >
            Get a personalized learning path in 60 seconds.<br />
            No business degree required. Real results in 7 days.
          </motion.p>
          
          {/* Trust Stats - with glassmorphism for better contrast */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-3 gap-4 md:gap-6 max-w-lg mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
          >
            <div className="flex flex-col items-center gap-2">
              <BookOpen className="h-6 w-6 text-white" />
              <span className="text-3xl md:text-4xl font-heading font-bold text-white">7</span>
              <span className="text-sm font-medium text-white/90">Modules</span>
            </div>
            <div className="flex flex-col items-center gap-2 border-x border-white/20 px-4">
              <Clock className="h-6 w-6 text-white" />
              <span className="text-3xl md:text-4xl font-heading font-bold text-white">~90</span>
              <span className="text-sm font-medium text-white/90">Minutes</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Zap className="h-6 w-6 text-white" />
              <span className="text-3xl md:text-4xl font-heading font-bold text-white">7-Day</span>
              <span className="text-sm font-medium text-white/90">First Win</span>
            </div>
          </motion.div>
          
          {/* Primary CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10"
          >
            <button
              onClick={scrollToQuiz}
              className="inline-flex items-center gap-2 bg-[hsl(var(--biz-green))] hover:bg-[hsl(var(--biz-green))]/90 text-white font-semibold text-lg px-8 py-4 rounded-full shadow-lg shadow-[hsl(var(--biz-green))]/30 transition-all hover:scale-105"
            >
              Take the Quiz
              <ChevronDown className="h-5 w-5 animate-bounce" />
            </button>
            <p className="text-white/70 text-sm mt-3">60 seconds · No email required</p>
          </motion.div>
        </div>
      </section>

      {/* Quiz Section */}
      <VocQuiz onComplete={handleQuizComplete} />

      {/* Results Section (shown after quiz) */}
      {showResults && quizAnswers && recommendation && (
        <VocResults answers={quizAnswers} recommendation={recommendation} />
      )}

      {/* Curriculum Preview */}
      <VocCurriculumPreview />

      {/* Tools Preview */}
      <VocToolsPreview />

      {/* Assessment Upsell */}
      <VocAssessmentUpsell />

      {/* Success Stories */}
      <VocSuccessStories />

      {/* FAQ */}
      <VocFAQ />

      {/* Coaching Gateway */}
      <VocCoachingGateway />

      {/* Final CTA */}
      <VocFinalCTA />

      <GlobalFooter />
    </div>
  );
};

export default VoiceOfCustomer;
