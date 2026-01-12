import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";
import SuccessScreen from "./SuccessScreen";

export interface FormData {
  fullName: string;
  email: string;
  company: string;
  category: string;
  ideaTitle: string;
  description: string;
  problemsSolved: string[];
  urgency: string;
  betaTesting: string;
  privacyConsent: boolean;
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  company: "",
  category: "",
  ideaTitle: "",
  description: "",
  problemsSolved: [],
  urgency: "",
  betaTesting: "",
  privacyConsent: false
};

const IdeaForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ideaNumber, setIdeaNumber] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const steps = [
    { number: 1, label: "Your Info" },
    { number: 2, label: "Your Idea" },
    { number: 3, label: "Context" }
  ];

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleStepClick = (stepNumber: number) => {
    if (stepNumber < currentStep) {
      setCurrentStep(stepNumber);
    }
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(
        "https://lnthvnzounlxjedsbkgc.supabase.co/functions/v1/submit-idea",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit idea");
      }

      setIdeaNumber(result.ideaNumber);
      setIsSubmitted(true);
      
      toast({
        title: "Idea submitted successfully!",
        description: `Your idea number is #${result.ideaNumber}`,
      });
    } catch (error: any) {
      console.error("Submission error:", error);
      toast({
        title: "Submission failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setIsSubmitted(false);
    setIdeaNumber(null);
  };

  if (isSubmitted && ideaNumber) {
    return (
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <SuccessScreen 
            ideaNumber={ideaNumber} 
            email={formData.email} 
            onReset={handleReset}
          />
        </div>
      </section>
    );
  }

  return (
    <section id="idea-form" className="py-20 bg-gradient-to-b from-slate-50 to-white scroll-mt-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Form Container */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
          {/* Step Indicator Tabs */}
          <div className="flex border-b border-slate-100">
            {steps.map((step, index) => (
              <button
                key={step.number}
                onClick={() => handleStepClick(step.number)}
                disabled={step.number > currentStep}
                className={`flex-1 py-4 px-4 text-center font-montserrat font-semibold text-sm transition-all relative ${
                  currentStep === step.number
                    ? "text-biz-green bg-biz-green/5"
                    : step.number < currentStep
                    ? "text-[#5C5C5C] hover:bg-slate-50 cursor-pointer"
                    : "text-[#5C5C5C] opacity-50 cursor-not-allowed"
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    currentStep === step.number
                      ? "bg-biz-green text-white"
                      : step.number < currentStep
                      ? "bg-biz-green/20 text-biz-green"
                      : "bg-slate-200 text-[#5C5C5C]"
                  }`}>
                    {step.number}
                  </span>
                  {step.label}
                </span>
                {currentStep === step.number && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-biz-green"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <FormStep1
                    formData={formData}
                    updateFormData={updateFormData}
                    onNext={handleNext}
                  />
                </motion.div>
              )}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <FormStep2
                    formData={formData}
                    updateFormData={updateFormData}
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                </motion.div>
              )}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <FormStep3
                    formData={formData}
                    updateFormData={updateFormData}
                    onBack={handleBack}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IdeaForm;
