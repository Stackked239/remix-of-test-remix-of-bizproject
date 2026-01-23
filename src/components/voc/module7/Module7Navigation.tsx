import { ChevronLeft, Home, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { VOC_URLS } from "@/config/vocUrls";

const Module7Navigation = () => {
  return (
    <section className="py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-r from-[hsl(var(--biz-navy))]/5 via-[hsl(var(--biz-blue))]/5 to-[hsl(var(--biz-navy))]/5 rounded-xl border border-[hsl(var(--biz-blue))]/20 p-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Button 
              asChild 
              variant="outline" 
              className="gap-2 border-[hsl(var(--biz-blue))]/30 hover:bg-[hsl(var(--biz-blue))]/10 hover:border-[hsl(var(--biz-blue))]/50 text-[hsl(var(--biz-blue))]"
            >
              <Link to={VOC_URLS.modules[6].url}>
                <ChevronLeft className="w-4 h-4" />
                Module 6: 90-Day System
              </Link>
            </Button>
            <div className="flex gap-3">
              <Button 
                asChild 
                variant="outline" 
                className="gap-2 border-[hsl(var(--biz-green))]/30 hover:bg-[hsl(var(--biz-green))]/10 hover:border-[hsl(var(--biz-green))]/50 text-[hsl(var(--biz-green))]"
              >
                <Link to={VOC_URLS.landing}>
                  <Home className="w-4 h-4" />
                  Curriculum Home
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                className="gap-2 border-[hsl(var(--biz-blue))]/30 hover:bg-[hsl(var(--biz-blue))]/10 hover:border-[hsl(var(--biz-blue))]/50 text-[hsl(var(--biz-blue))]"
              >
                <Link to="/bizgrowth">
                  <BookOpen className="w-4 h-4" />
                  All Courses
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Module7Navigation;
