import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from '@/components/GlobalFooter';
import { useProcessMapStore } from '@/stores/processMapStore';
import ProcessDashboard from '@/components/process-mapping/ProcessDashboard';
import ProcessSetupStep from '@/components/process-mapping/ProcessSetupStep';
import ProcessMappingStep from '@/components/process-mapping/ProcessMappingStep';
import TaskDetailsStep from '@/components/process-mapping/TaskDetailsStep';
import ReviewExportStep from '@/components/process-mapping/ReviewExportStep';

const ProcessMappingTools = () => {
  const navigate = useNavigate();
  const { currentProcess, currentStep, setCurrentStep } = useProcessMapStore();
  const [showWizard, setShowWizard] = useState(false);

  const handleCreateNew = () => {
    setShowWizard(true);
    setCurrentStep(1);
  };

  const handleBackToDashboard = () => {
    setShowWizard(false);
    setCurrentStep(1);
  };

  return (
    <>
      <SEO
        title="Process Mapping & SOP Builder Tools"
        description="Create professional process maps and standard operating procedures. Visual drag-and-drop process builder with AI-assisted suggestions and export to Word, Excel, and PDF."
        keywords="process mapping, SOP builder, standard operating procedures, workflow automation, business process management, process documentation"
        canonical="https://bizhealth.ai/biztools/toolbox/process-mapping-tools"
      />

      <div className="min-h-screen flex flex-col bg-background">
        <GlobalNavigation />

        <main className="flex-1 pt-40">
          {!showWizard && !currentProcess ? (
            <ProcessDashboard onCreateNew={handleCreateNew} />
          ) : (
            <div className="container mx-auto px-4 py-8 max-w-7xl">
              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-foreground text-center">
                    {currentProcess?.name || 'New Process Map'}
                  </h2>
                  <span className="text-sm text-muted-foreground">Step {currentStep} of 4</span>
                </div>

                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`flex-1 h-2 rounded-full transition-colors ${
                        step <= currentStep ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>Define</span>
                  <span>Map</span>
                  <span>Details</span>
                  <span>Export</span>
                </div>
              </div>

              {/* Step Content */}
              <div className="bg-card rounded-lg border shadow-sm p-8">
                {currentStep === 1 && <ProcessSetupStep onNext={() => setCurrentStep(2)} />}
                {currentStep === 2 && (
                  <ProcessMappingStep
                    onBack={() => setCurrentStep(1)}
                    onNext={() => setCurrentStep(3)}
                  />
                )}
                {currentStep === 3 && (
                  <TaskDetailsStep
                    onBack={() => setCurrentStep(2)}
                    onNext={() => setCurrentStep(4)}
                  />
                )}
                {currentStep === 4 && (
                  <ReviewExportStep
                    onBack={() => setCurrentStep(3)}
                    onComplete={handleBackToDashboard}
                  />
                )}
              </div>
            </div>
          )}
        </main>

        <GlobalFooter />
      </div>
    </>
  );
};

export default ProcessMappingTools;
