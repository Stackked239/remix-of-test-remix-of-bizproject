import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, Zap, ChevronDown } from "lucide-react";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import VocQuiz from "@/components/voc/VocQuiz";
import VocResults from "@/components/voc/VocResults";
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
        title="Voice of Customer (VoC) Curriculum | BizGrowth Academy"
        description="Build a customer feedback system that actually works. Get a personalized learning path in 60 seconds. No business degree required. Real results in 7 days."
        canonical="https://bizhealth.ai/bizgrowth/voice-of-customer"
        ogImage="/og-images/og-voc-curriculum.jpg"
        ogType="website"
      />
      <StructuredData
        type="course"
        courseName="Voice of Customer (VoC) Curriculum"
        courseDescription="Learn how to build a customer feedback system that drives business growth. Personalized learning paths based on your business stage."
        provider="BizHealth.ai"
        duration="PT90M"
      />
      
      <GlobalNavigation />

      {/* Hero Section */}
      <section 
        className="relative min-h-[60vh] md:min-h-[50vh] flex items-center justify-center px-4 py-20"
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
          
          {/* Trust Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-3 gap-4 md:gap-8 max-w-md mx-auto"
          >
            <div className="flex flex-col items-center gap-1">
              <BookOpen className="h-6 w-6 text-[hsl(var(--biz-yellow))]" />
              <span className="text-2xl font-heading font-bold text-[hsl(var(--biz-yellow))]">7</span>
              <span className="text-sm text-white/70">Modules</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Clock className="h-6 w-6 text-[hsl(var(--biz-yellow))]" />
              <span className="text-2xl font-heading font-bold text-[hsl(var(--biz-yellow))]">~90</span>
              <span className="text-sm text-white/70">Minutes</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Zap className="h-6 w-6 text-[hsl(var(--biz-yellow))]" />
              <span className="text-2xl font-heading font-bold text-[hsl(var(--biz-yellow))]">7-Day</span>
              <span className="text-sm text-white/70">First Win</span>
            </div>
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={scrollToQuiz}
            className="hidden md:flex flex-col items-center gap-2 mt-12 text-white/60 hover:text-white transition-colors cursor-pointer"
            aria-label="Scroll to quiz"
          >
            <span className="text-sm">Take the Quiz</span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </motion.button>
        </div>
      </section>

      {/* Quiz Section */}
      <VocQuiz onComplete={handleQuizComplete} />

      {/* Results Section (shown after quiz) */}
      {showResults && quizAnswers && recommendation && (
        <VocResults answers={quizAnswers} recommendation={recommendation} />
      )}

      {/* Placeholder for additional sections */}
      <section className="py-16 px-4 bg-muted/30" id="modules">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
            Your Learning Path
          </h2>
          <p className="text-muted-foreground mb-8">
            Each module builds on the last — complete at your own pace
          </p>
          <p className="text-muted-foreground">
            Module cards and additional sections coming soon...
          </p>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
};

export default VoiceOfCustomer;
