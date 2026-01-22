import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { VOC_URLS } from "@/config/vocUrls";

interface Module2NavigationProps {
  isComplete: boolean;
}

const Module2Navigation = ({ isComplete }: Module2NavigationProps) => {
  return (
    <section className="py-8 bg-background border-t">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to={VOC_URLS.modules[1].url} className="flex items-center gap-2 text-[hsl(var(--biz-blue))] hover:opacity-80 transition-opacity">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Module 1: Why VoC Matters</span>
          </Link>

          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <div key={num} className={`w-8 h-2 rounded ${num <= 2 ? 'bg-[hsl(var(--biz-blue))]' : 'bg-muted'}`} />
            ))}
          </div>

          <Link
            to={isComplete ? VOC_URLS.modules[3].url : '#'}
            onClick={(e) => !isComplete && e.preventDefault()}
            className={`flex items-center gap-2 ${isComplete ? 'text-[hsl(var(--biz-blue))] hover:opacity-80' : 'text-muted-foreground cursor-not-allowed'} transition-opacity`}
          >
            <span className="text-sm">Module 3: Measuring What Matters</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {!isComplete && (
          <div className="mt-4 text-center p-3 bg-[hsl(var(--biz-gold))]/10 rounded-lg">
            <p className="text-sm text-muted-foreground">Complete the quiz above to unlock Module 3</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Module2Navigation;
