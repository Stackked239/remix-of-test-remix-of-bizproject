import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface VocQuizProgressProps {
  currentStep: number;
  totalSteps: number;
}

const VocQuizProgress = ({ currentStep, totalSteps }: VocQuizProgressProps) => {
  return (
    <div 
      className="flex items-center justify-center gap-0 mb-8"
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
    >
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNum = index + 1;
        const isComplete = stepNum < currentStep;
        const isCurrent = stepNum === currentStep;

        return (
          <div key={stepNum} className="flex items-center">
            {/* Step Dot */}
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                isComplete && "bg-[hsl(var(--biz-yellow))] text-[hsl(var(--biz-blue))]",
                isCurrent && "border-[3px] border-[hsl(var(--biz-yellow))] bg-transparent animate-pulse",
                !isComplete && !isCurrent && "border-2 border-muted-foreground/30 bg-transparent"
              )}
            >
              {isComplete && <Check className="h-4 w-4" />}
              {isCurrent && (
                <span className="w-3 h-3 bg-[hsl(var(--biz-yellow))] rounded-full" />
              )}
            </div>

            {/* Connector Line (except after last) */}
            {stepNum < totalSteps && (
              <div
                className={cn(
                  "w-10 h-0.5 transition-colors duration-200",
                  isComplete ? "bg-[hsl(var(--biz-yellow))]" : "bg-muted-foreground/30"
                )}
              />
            )}
          </div>
        );
      })}

      {/* Screen Reader Text */}
      <span className="sr-only">
        Step {currentStep} of {totalSteps}
      </span>
    </div>
  );
};

export default VocQuizProgress;
