import { ChevronLeft, Home, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { VOC_URLS } from "@/config/vocUrls";

const Module7Navigation = () => {
  return (
    <section className="py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-card border rounded-xl">
          <Button asChild variant="ghost" className="gap-2">
            <Link to={VOC_URLS.modules[6].url}>
              <ChevronLeft className="w-4 h-4" />
              Module 6: 90-Day System
            </Link>
          </Button>
          <div className="flex gap-3">
            <Button asChild variant="outline" className="gap-2">
              <Link to={VOC_URLS.landing}>
                <Home className="w-4 h-4" />
                Curriculum Home
              </Link>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <Link to="/bizgrowth">
                <BookOpen className="w-4 h-4" />
                All Courses
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Module7Navigation;
