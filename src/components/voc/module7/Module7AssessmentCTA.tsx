import { ClipboardCheck, Clock, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Module7AssessmentCTA = () => {
  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-card border rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">
            What's Your Customer Health Score?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Take our full diagnostic assessment to evaluate your VoC program against industry best practices.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" /> 15 minutes
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <ClipboardCheck className="w-4 h-4" /> Detailed report
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Map className="w-4 h-4" /> Custom roadmap
            </div>
          </div>
          <Button asChild size="lg" variant="outline">
            <Link to="/pricing">Take the VoC Assessment</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Module7AssessmentCTA;
