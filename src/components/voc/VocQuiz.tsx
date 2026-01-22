import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import VocQuizProgress from "./VocQuizProgress";
import VocQuizOption from "./VocQuizOption";
import { quizQuestions } from "@/data/vocQuizData";
import { getRecommendation } from "@/data/vocRoutingMatrix";
import { QuizAnswers, Recommendation } from "@/state/vocStateManager";
import { vocAnalytics } from "@/analytics/vocAnalytics";

interface VocQuizProps {
  onComplete: (answers: QuizAnswers, recommendation: Recommendation) => void;
}

const VocQuiz = ({ onComplete }: VocQuizProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>({
    businessStage: null,
    employeeCount: null,
    vocMaturity: null,
    primaryGoal: null,
  });
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  const currentQuestion = quizQuestions[currentStep - 1];
  const currentAnswer = answers[currentQuestion.answerKey];
  const totalSteps = quizQuestions.length;
  const isLastStep = currentStep === totalSteps;
  const allAnswered = Object.values(answers).every(a => a !== null);

  useEffect(() => {
    // Track quiz start
    if (currentStep === 1) {
      vocAnalytics.trackQuizStart();
    }
  }, []);

  useEffect(() => {
    setQuestionStartTime(Date.now());
  }, [currentStep]);

  const handleSelectAnswer = (value: string) => {
    const timeOnQuestion = Math.round((Date.now() - questionStartTime) / 1000);
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.answerKey]: value as any
    }));

    vocAnalytics.trackQuizQuestionAnswered(currentStep, value, timeOnQuestion);

    // Auto-advance to next question after short delay
    if (!isLastStep) {
      setTimeout(() => {
        setDirection('forward');
        setCurrentStep(prev => prev + 1);
      }, 300);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection('back');
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleGetResults = () => {
    const recommendation = getRecommendation(answers);
    vocAnalytics.trackQuizComplete(answers, recommendation);
    onComplete(answers, recommendation);
  };

  const slideVariants = {
    enter: (direction: 'forward' | 'back') => ({
      x: direction === 'forward' ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: 'forward' | 'back') => ({
      x: direction === 'forward' ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <section className="py-16 px-4 bg-background" id="quiz">
      <div className="max-w-[600px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
            Find Your Personalized Path
          </h2>
          <p className="text-muted-foreground">
            Answer 4 quick questions — takes about 60 seconds
          </p>
        </div>

        {/* Progress Indicator */}
        <VocQuizProgress currentStep={currentStep} totalSteps={totalSteps} />

        {/* Quiz Card */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Question */}
              <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                {currentQuestion.headline}
              </h3>
              <p className="text-muted-foreground mb-6">
                {currentQuestion.subtext}
              </p>

              {/* Options */}
              <div className="flex flex-col gap-3">
                {currentQuestion.options.map((option) => (
                  <VocQuizOption
                    key={option.value}
                    option={option}
                    isSelected={currentAnswer === option.value}
                    onSelect={handleSelectAnswer}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="text-muted-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            {isLastStep && allAnswered ? (
              <Button
                onClick={handleGetResults}
                className="bg-[hsl(var(--biz-yellow))] hover:bg-[hsl(var(--biz-yellow))]/90 text-[hsl(var(--biz-blue))] font-semibold px-6"
              >
                Get My Personalized Path
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            ) : (
              <div className="text-sm text-muted-foreground">
                {currentAnswer ? (
                  <span className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="h-4 w-4" /> Answer recorded
                  </span>
                ) : (
                  <span>Select an option to continue</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Reassurance */}
        <p className="text-center text-sm text-muted-foreground mt-4">
          No wrong answers. Your path is personalized to you.
        </p>
      </div>
    </section>
  );
};

export default VocQuiz;
