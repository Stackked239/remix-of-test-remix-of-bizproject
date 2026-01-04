import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Save, X, Clock, CheckCircle } from "lucide-react";
import { useInnovationStrategyStore } from "@/stores/innovationStrategyStore";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import PromotionalBanner from "@/components/PromotionalBanner";
import SEO from "@/components/SEO";
import InnovationLanding from "@/components/innovation-strategy/InnovationLanding";
import FoundationStep from "@/components/innovation-strategy/FoundationStep";
import VisionStep from "@/components/innovation-strategy/VisionStep";
import OpportunitiesStep from "@/components/innovation-strategy/OpportunitiesStep";
import PortfolioStep from "@/components/innovation-strategy/PortfolioStep";
import MetricsStep from "@/components/innovation-strategy/MetricsStep";
import RoadmapStep from "@/components/innovation-strategy/RoadmapStep";
import ReviewStep from "@/components/innovation-strategy/ReviewStep";
import { generateInnovationStrategyPDF } from "@/utils/innovationStrategyPdfExport";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

const InnovationStrategyTool = () => {
  const store = useInnovationStrategyStore();
  const { currentStep, setCurrentStep, isActive, startNewSession, resumeSession, elapsedTime, updateElapsedTime, lastSaved, getCompletionPercentage, isStepComplete, exitTool, data } = store;
  const [showExitDialog, setShowExitDialog] = useState(false);

  // Timer effect
  useEffect(() => {
    if (!isActive || currentStep === 0 || currentStep === 7) return;
    const interval = setInterval(() => {
      updateElapsedTime(elapsedTime + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive, currentStep, elapsedTime, updateElapsedTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    startNewSession();
  };

  const handleResume = () => {
    resumeSession();
  };

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 6) {
      setCurrentStep(7); // Go to review
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleEditStep = (step: number) => {
    setCurrentStep(step);
  };

  const handleDownloadPDF = async () => {
    try {
      toast.loading("Generating PDF...");
      await generateInnovationStrategyPDF(data);
      toast.dismiss();
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  const confirmExit = () => {
    exitTool();
    setShowExitDialog(false);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <FoundationStep />;
      case 2: return <VisionStep />;
      case 3: return <OpportunitiesStep />;
      case 4: return <PortfolioStep />;
      case 5: return <MetricsStep />;
      case 6: return <RoadmapStep />;
      case 7: return <ReviewStep onEditStep={handleEditStep} onDownloadPDF={handleDownloadPDF} />;
      default: return null;
    }
  };

  const stepNames = ['Foundation', 'Vision', 'Opportunities', 'Portfolio', 'Metrics', 'Roadmap'];

  // Landing page
  if (currentStep === 0 || !isActive) {
    return (
      <div className="min-h-screen bg-background">
        <SEO 
          title="Innovation Strategy Builder - 60-Minute Guided Tool | BizHealth.ai"
          description="Build a complete innovation strategy in 60 minutes. A guided framework with proven prompts and downloadable PDF for your leadership team."
          canonical="https://bizhealth.ai/biztools/toolbox/innovation-strategy-tool"
          ogImage="https://bizhealth.ai/og-images/og-innovation-strategy.jpg"
        />
        <PromotionalBanner />
        <GlobalNavigation />
        <div className="pt-32">
          <InnovationLanding onStart={handleStart} onResume={handleResume} />
        </div>
        <GlobalFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO 
        title="Innovation Strategy Builder - 60-Minute Guided Tool | BizHealth.ai"
        description="Build a complete innovation strategy in 60 minutes."
        canonical="https://bizhealth.ai/biztools/toolbox/innovation-strategy-tool"
      />

      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-background border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setShowExitDialog(true)} className="text-muted-foreground">
                <X className="w-4 h-4 mr-1" /> Exit
              </Button>
              <span className="font-montserrat font-bold text-biz-navy hidden sm:inline">
                Innovation Strategy Builder
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="font-open-sans">{formatTime(elapsedTime)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Save className="w-4 h-4 text-biz-lime" />
                <span className="font-open-sans text-muted-foreground hidden sm:inline">
                  Saved {lastSaved ? formatDistanceToNow(new Date(lastSaved), { addSuffix: true }) : 'just now'}
                </span>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="font-montserrat text-sm font-semibold text-biz-navy">
                {currentStep === 7 ? 'Review' : `Step ${currentStep} of 6: ${stepNames[currentStep - 1]}`}
              </span>
              <span className="font-open-sans text-sm text-muted-foreground">
                {getCompletionPercentage()}% Complete
              </span>
            </div>
            <Progress value={getCompletionPercentage()} className="h-2" />
            
            {/* Step indicators */}
            <div className="flex justify-between mt-2">
              {stepNames.map((name, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentStep(i + 1)}
                  className={`flex items-center gap-1 text-xs font-open-sans transition-colors ${
                    currentStep === i + 1 
                      ? 'text-biz-teal font-semibold' 
                      : isStepComplete(i + 1) 
                        ? 'text-biz-lime' 
                        : 'text-muted-foreground'
                  }`}
                >
                  {isStepComplete(i + 1) && <CheckCircle className="w-3 h-3" />}
                  <span className="hidden md:inline">{name}</span>
                  <span className="md:hidden">{i + 1}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        {renderStep()}
      </main>

      {/* Bottom Navigation */}
      {currentStep !== 7 && (
        <div className="sticky bottom-0 bg-background border-t py-4">
          <div className="container mx-auto px-4 max-w-4xl flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Previous Step
            </Button>
            <Button
              onClick={handleNext}
              className="bg-biz-teal hover:bg-biz-teal/90 text-white"
            >
              {currentStep === 6 ? 'Review Strategy' : 'Next Step'} <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* Exit Dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Exit Innovation Strategy Builder?</AlertDialogTitle>
            <AlertDialogDescription>
              Your progress is automatically saved. You can resume anytime from where you left off.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Working</AlertDialogCancel>
            <AlertDialogAction onClick={confirmExit}>Save & Exit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default InnovationStrategyTool;
