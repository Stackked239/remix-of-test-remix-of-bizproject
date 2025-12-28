import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Lightbulb, 
  Target, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  Play,
  RotateCcw,
  FileText,
  ArrowLeft
} from "lucide-react";
import { useInnovationStrategyStore } from "@/stores/innovationStrategyStore";
import { formatDistanceToNow } from "date-fns";

interface InnovationLandingProps {
  onStart: () => void;
  onResume: () => void;
}

const InnovationLanding = ({ onStart, onResume }: InnovationLandingProps) => {
  const { sessionId, lastSaved, currentStep, getCompletionPercentage, clearSession } = useInnovationStrategyStore();
  const hasSavedSession = sessionId && currentStep > 0;

  const steps = [
    { icon: Target, title: "Foundation", time: "8-10 min", description: "Company context & primary challenges" },
    { icon: Lightbulb, title: "Vision", time: "12-15 min", description: "Strategic intent & differentiation" },
    { icon: TrendingUp, title: "Opportunities", time: "15-18 min", description: "Identify 3-5 innovation opportunities" },
    { icon: FileText, title: "Portfolio", time: "10-12 min", description: "Prioritize using 70-20-10 framework" },
    { icon: CheckCircle, title: "Metrics", time: "8-10 min", description: "Define success measurements" },
    { icon: Clock, title: "Roadmap", time: "5-8 min", description: "Create 90-day action plan" },
  ];

  return (
    <div className="bg-gradient-to-br from-biz-navy via-biz-navy/95 to-biz-navy-deep">
      {/* Back to Toolbox Link */}
      <div className="container mx-auto px-4 pt-4">
        <Link 
          to="/biztools/toolbox" 
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-open-sans text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to BizTools Toolbox
        </Link>
      </div>
      
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="font-montserrat font-bold text-3xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
              Build Your Innovation Strategy
              <span className="block text-biz-lime">in One Focused Hour</span>
            </h1>
            <p className="font-open-sans text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8">
              A guided framework. Proven prompts. A downloadable strategy your team can execute.
            </p>
            
            {/* Time indicator */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
              <Clock className="w-5 h-5 text-biz-lime" />
              <span className="text-white font-open-sans">Total time: ~60 minutes</span>
            </div>
          </div>

          {/* Resume Card (if saved session exists) */}
          {hasSavedSession && (
            <Card className="mb-8 border-biz-lime/30 bg-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-left">
                    <h3 className="font-montserrat font-semibold text-lg text-white mb-1">
                      Resume Your Strategy
                    </h3>
                    <p className="font-open-sans text-white/70 text-sm">
                      Last saved {lastSaved ? formatDistanceToNow(new Date(lastSaved), { addSuffix: true }) : 'recently'} • 
                      {getCompletionPercentage()}% complete
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={onResume}
                      className="bg-biz-lime hover:bg-biz-lime/90 text-biz-navy font-montserrat font-semibold"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Resume
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (confirm('Are you sure you want to start over? This will clear your saved progress.')) {
                          clearSession();
                        }
                      }}
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Start Fresh
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* CTA Button */}
          {!hasSavedSession && (
            <Button
              onClick={onStart}
              size="lg"
              className="bg-biz-lime hover:bg-biz-lime/90 text-biz-navy font-montserrat font-bold text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-12"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Building
            </Button>
          )}

          {/* 6-Step Overview */}
          <div className="mt-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-1 w-12 bg-biz-lime rounded-full" />
              <span className="text-biz-teal font-montserrat font-semibold text-sm uppercase tracking-wider">
                The Framework
              </span>
              <div className="h-1 w-12 bg-biz-lime rounded-full" />
            </div>
            <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-white mb-3">
              Your 6-Step Journey
            </h2>
            <p className="font-open-sans text-white/60 mb-8 max-w-xl mx-auto">
              Follow our proven framework to build a comprehensive innovation strategy
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {steps.map((step, index) => (
                <Card 
                  key={index}
                  className="relative overflow-hidden bg-biz-navy-deep/80 border-biz-teal/20 hover:border-biz-teal/50 transition-all duration-300 group shadow-xl"
                >
                  {/* Step number badge */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-biz-teal/30 flex items-center justify-center">
                    <span className="text-biz-lime font-montserrat font-bold text-sm">{index + 1}</span>
                  </div>
                  
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 bg-gradient-to-br from-biz-lime/30 to-biz-teal/20 rounded-xl p-3 group-hover:from-biz-lime/40 group-hover:to-biz-teal/30 transition-colors shadow-lg shadow-biz-lime/10">
                        <step.icon className="w-6 h-6 text-biz-lime" />
                      </div>
                      <div className="text-left flex-1">
                        <h3 className="font-montserrat font-bold text-white text-lg mb-1 group-hover:text-biz-lime transition-colors">
                          {step.title}
                        </h3>
                        <div className="inline-flex items-center gap-1.5 mb-2">
                          <Clock className="w-3 h-3 text-biz-teal" />
                          <span className="text-biz-teal font-open-sans text-xs font-medium">
                            {step.time}
                          </span>
                        </div>
                        <p className="font-open-sans text-white/80 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  
                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-biz-lime via-biz-teal to-biz-lime opacity-0 group-hover:opacity-100 transition-opacity" />
                </Card>
              ))}
            </div>
          </div>

          {/* Why Innovation Strategy Matters */}
          <div className="mt-16">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-8">
                <h3 className="font-montserrat font-semibold text-xl text-white mb-4">
                  Why Innovation Strategy Matters
                </h3>
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div>
                    <p className="text-biz-lime font-montserrat font-bold text-2xl mb-2">70%</p>
                    <p className="font-open-sans text-white/70 text-sm">
                      of SMBs without an innovation strategy fail to grow beyond their current revenue
                    </p>
                  </div>
                  <div>
                    <p className="text-biz-lime font-montserrat font-bold text-2xl mb-2">3.2x</p>
                    <p className="font-open-sans text-white/70 text-sm">
                      higher growth rate for companies with documented innovation strategies
                    </p>
                  </div>
                  <div>
                    <p className="text-biz-lime font-montserrat font-bold text-2xl mb-2">90 Days</p>
                    <p className="font-open-sans text-white/70 text-sm">
                      is all you need to see meaningful results from your innovation efforts
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnovationLanding;
