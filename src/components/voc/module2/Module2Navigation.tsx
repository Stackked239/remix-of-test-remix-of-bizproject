import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { VOC_URLS } from "@/config/vocUrls";

interface Module2NavigationProps {
  isComplete: boolean;
}

const Module2Navigation = ({ isComplete }: Module2NavigationProps) => {
  return (
    <section className="py-8 bg-background">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-r from-[hsl(var(--biz-navy))]/5 via-[hsl(var(--biz-blue))]/5 to-[hsl(var(--biz-navy))]/5 rounded-xl border border-[hsl(var(--biz-blue))]/20 p-4 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link 
              to={VOC_URLS.modules[1].url} 
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[hsl(var(--biz-blue))]/30 text-[hsl(var(--biz-blue))] hover:bg-[hsl(var(--biz-blue))]/10 hover:border-[hsl(var(--biz-blue))]/50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Module 1: Why VoC Matters</span>
            </Link>

            <Link
              to={VOC_URLS.landing}
              className="text-sm font-medium text-[hsl(var(--biz-blue))] hover:text-[hsl(var(--biz-navy))] transition-colors px-3 py-1.5 rounded-lg hover:bg-[hsl(var(--biz-blue))]/10"
            >
              Back to Curriculum Overview
            </Link>

            <Link
              to={isComplete ? VOC_URLS.modules[3].url : '#'}
              onClick={(e) => !isComplete && e.preventDefault()}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                isComplete 
                  ? 'border-[hsl(var(--biz-green))]/30 text-[hsl(var(--biz-green))] hover:bg-[hsl(var(--biz-green))]/10 hover:border-[hsl(var(--biz-green))]/50' 
                  : 'border-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              <span className="text-sm font-medium">Module 3: Measuring What Matters</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {!isComplete && (
          <div className="mt-4 text-center p-3 bg-[hsl(var(--biz-gold))]/10 rounded-lg border border-[hsl(var(--biz-gold))]/20">
            <p className="text-sm text-muted-foreground">Complete the quiz above to unlock Module 3</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Module2Navigation;
