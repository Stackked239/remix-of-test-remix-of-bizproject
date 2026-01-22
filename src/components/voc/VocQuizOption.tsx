import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { QuizOption } from "@/data/vocQuizData";

interface VocQuizOptionProps {
  option: QuizOption;
  isSelected: boolean;
  onSelect: (value: string) => void;
}

const VocQuizOption = ({ option, isSelected, onSelect }: VocQuizOptionProps) => {
  return (
    <button
      type="button"
      className={cn(
        "flex items-start gap-4 w-full p-4 bg-muted/50 border-2 border-muted-foreground/20 rounded-xl cursor-pointer transition-all duration-200 text-left min-h-[72px] hover:border-[hsl(var(--biz-blue))] hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--biz-yellow))] focus-visible:ring-offset-2",
        isSelected && "border-[hsl(var(--biz-yellow))] border-[3px] bg-[hsl(var(--biz-yellow))]/10"
      )}
      onClick={() => onSelect(option.value)}
      aria-pressed={isSelected}
    >
      <div
        className={cn(
          "w-6 h-6 min-w-[24px] border-2 border-muted-foreground/40 rounded-full flex items-center justify-center mt-0.5 transition-all duration-200",
          isSelected && "bg-[hsl(var(--biz-yellow))] border-[hsl(var(--biz-yellow))] text-[hsl(var(--biz-blue))]"
        )}
      >
        {isSelected && <Check className="h-4 w-4" />}
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-heading font-semibold text-foreground">
          {option.title}
        </span>
        <span className="text-sm text-muted-foreground">
          {option.description}
        </span>
      </div>
    </button>
  );
};

export default VocQuizOption;
