import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import PromotionalBanner from "@/components/PromotionalBanner";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useSWOTStore } from "@/stores/swotStore";
import { SWOTDashboard } from "@/components/swot/SWOTDashboard";
import { BusinessProfileStep } from "@/components/swot/BusinessProfileStep";
import { SWOTMatrixBuilder } from "@/components/swot/SWOTMatrixBuilder";
import { InsightsView } from "@/components/swot/InsightsView";
import { X } from "lucide-react";

const SWOTAnalysisTool = () => {
  const navigate = useNavigate();
  const { currentAnalysis, createNewAnalysis, clearCurrentAnalysis, currentStep, setCurrentStep } = useSWOTStore();
  const [showExitDialog, setShowExitDialog] = useState(false);

  const handleStartNew = () => {
    createNewAnalysis();
    setCurrentStep(1);
  };

  const handleExit = () => {
    setShowExitDialog(true);
  };

  const confirmExit = () => {
    clearCurrentAnalysis();
    navigate('/biztools/toolbox');
  };

  const renderStep = () => {
    if (!currentAnalysis) {
      return <SWOTDashboard onStartNew={handleStartNew} />;
    }

    switch (currentStep) {
      case 1:
        return (
          <BusinessProfileStep
            onNext={() => setCurrentStep(2)}
            onSkip={() => setCurrentStep(2)}
          />
        );
      case 2:
        return (
          <SWOTMatrixBuilder
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        );
      case 3:
        return (
          <InsightsView
            onBack={() => setCurrentStep(2)}
          />
        );
      default:
        return <SWOTDashboard onStartNew={handleStartNew} />;
    }
  };

  return (
    <>
      <SEO
        title="SWOT Analysis Tool | BizHealth.ai"
        description="Conduct comprehensive SWOT analysis for your small business. Identify strengths, weaknesses, opportunities, and threats with our interactive strategic planning tool."
        keywords="SWOT analysis, business strategy, strategic planning, competitive analysis, business assessment, small business tools"
        canonical="https://bizhealth.ai/biztools/toolbox/swot-analysis-tool"
      />

      <div className="min-h-screen flex flex-col bg-background">
        <PromotionalBanner />
        <GlobalNavigation />

        {/* Exit Button (shown when in analysis) */}
        {currentAnalysis && (
          <div className="fixed top-20 right-4 z-50">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExit}
              className="shadow-lg bg-red-50 hover:bg-red-100 border-red-200 text-red-700 hover:text-red-800"
            >
              <X className="h-4 w-4 mr-2" />
              Exit Tool
            </Button>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1">
          {renderStep()}
        </main>

        <GlobalFooter />
      </div>

      {/* Exit Confirmation Dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Exit SWOT Analysis?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to exit? Any unsaved progress will be lost.
              Make sure to save your work before leaving.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Working</AlertDialogCancel>
            <AlertDialogAction onClick={confirmExit} className="bg-red-600 hover:bg-red-700">
              Exit Without Saving
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SWOTAnalysisTool;
