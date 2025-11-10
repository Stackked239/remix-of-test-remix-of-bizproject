import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSWOTStore } from "@/stores/swotStore";
import { Plus, FileText, Lightbulb, Target } from "lucide-react";

interface SWOTDashboardProps {
  onStartNew: () => void;
}

export const SWOTDashboard = ({ onStartNew }: SWOTDashboardProps) => {
  const { savedAnalyses, loadAnalysis } = useSWOTStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-biz-lime/5">
      <div className="container mx-auto px-4 pt-32 pb-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="font-montserrat font-bold text-4xl lg:text-5xl mb-4 text-biz-navy">
            SWOT Analysis Tool
          </h1>
          <p className="font-montserrat font-semibold text-xl lg:text-2xl mb-2 text-biz-lime">
            Assess Your Strategic Position in Minutes
          </p>
          <p className="font-open-sans text-base text-muted-foreground max-w-2xl mx-auto">
            Identify your business strengths, weaknesses, opportunities, and threats
            with our interactive SWOT analysis framework
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            onClick={onStartNew}
            className="bg-biz-navy hover:bg-biz-navy/90"
          >
            <Plus className="mr-2 h-5 w-5" />
            Start New SWOT Analysis
          </Button>
          {savedAnalyses.length > 0 && (
            <Button
              size="lg"
              variant="outline"
              className="border-biz-navy text-biz-navy hover:bg-biz-navy/5"
            >
              <FileText className="mr-2 h-5 w-5" />
              Load Saved Analysis
            </Button>
          )}
        </div>

        {/* What is SWOT Analysis */}
        <Card className="p-8 mb-8 border-2 border-biz-lime/20">
          <h2 className="font-montserrat font-bold text-2xl mb-6 text-biz-navy">
            What is SWOT Analysis?
          </h2>
          <p className="font-open-sans text-muted-foreground mb-6">
            SWOT Analysis is a strategic planning framework that helps you identify:
          </p>

          {/* SWOT Grid Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">💪</span>
                <h3 className="font-montserrat font-bold text-lg text-green-700">
                  Strengths
                </h3>
              </div>
              <p className="text-sm text-green-700/80">
                Internal • Positive
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                What you control and do well
              </p>
            </div>

            <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">⚠️</span>
                <h3 className="font-montserrat font-bold text-lg text-red-700">
                  Weaknesses
                </h3>
              </div>
              <p className="text-sm text-red-700/80">
                Internal • Negative
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Areas needing improvement
              </p>
            </div>

            <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🎯</span>
                <h3 className="font-montserrat font-bold text-lg text-blue-700">
                  Opportunities
                </h3>
              </div>
              <p className="text-sm text-blue-700/80">
                External • Positive
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Market conditions to leverage
              </p>
            </div>

            <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🛡️</span>
                <h3 className="font-montserrat font-bold text-lg text-orange-700">
                  Threats
                </h3>
              </div>
              <p className="text-sm text-orange-700/80">
                External • Negative
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Challenges to prepare for
              </p>
            </div>
          </div>
        </Card>

        {/* Benefits */}
        <Card className="p-8 border-2 border-biz-copper/20">
          <h2 className="font-montserrat font-bold text-2xl mb-6 text-biz-navy">
            Why Use SWOT Analysis?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Target className="h-6 w-6 text-biz-lime flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-montserrat font-semibold text-base mb-1">
                  Understand Competitive Advantages
                </h3>
                <p className="text-sm text-muted-foreground">
                  Identify what sets your business apart
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Lightbulb className="h-6 w-6 text-biz-lime flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-montserrat font-semibold text-base mb-1">
                  Identify Improvement Areas
                </h3>
                <p className="text-sm text-muted-foreground">
                  Focus resources where they matter most
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Target className="h-6 w-6 text-biz-lime flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-montserrat font-semibold text-base mb-1">
                  Spot Market Opportunities
                </h3>
                <p className="text-sm text-muted-foreground">
                  Discover growth potential early
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Lightbulb className="h-6 w-6 text-biz-lime flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-montserrat font-semibold text-base mb-1">
                  Prepare for Threats
                </h3>
                <p className="text-sm text-muted-foreground">
                  Anticipate and mitigate risks
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Saved Analyses */}
        {savedAnalyses.length > 0 && (
          <div className="mt-8">
            <h2 className="font-montserrat font-bold text-2xl mb-4 text-biz-navy">
              Your Saved Analyses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedAnalyses.map((analysis) => (
                <Card
                  key={analysis.id}
                  className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => loadAnalysis(analysis.id)}
                >
                  <h3 className="font-montserrat font-semibold text-lg mb-2">
                    {analysis.businessProfile?.businessName || 'Untitled Analysis'}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {analysis.businessProfile?.industry || 'No industry specified'}
                  </p>
                  <div className="grid grid-cols-4 gap-2 text-center text-sm">
                    <div>
                      <div className="font-semibold text-green-600">
                        {analysis.items.filter(i => i.quadrant === 'strength').length}
                      </div>
                      <div className="text-xs text-muted-foreground">S</div>
                    </div>
                    <div>
                      <div className="font-semibold text-red-600">
                        {analysis.items.filter(i => i.quadrant === 'weakness').length}
                      </div>
                      <div className="text-xs text-muted-foreground">W</div>
                    </div>
                    <div>
                      <div className="font-semibold text-blue-600">
                        {analysis.items.filter(i => i.quadrant === 'opportunity').length}
                      </div>
                      <div className="text-xs text-muted-foreground">O</div>
                    </div>
                    <div>
                      <div className="font-semibold text-orange-600">
                        {analysis.items.filter(i => i.quadrant === 'threat').length}
                      </div>
                      <div className="text-xs text-muted-foreground">T</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
