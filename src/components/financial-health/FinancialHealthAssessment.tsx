import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  ArrowRight,
  Mail,
  RotateCcw
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Question {
  id: string;
  title: string;
  options: { label: string; value: number }[];
}

interface ResultCategory {
  id: 'at-risk' | 'stable' | 'scale-ready';
  title: string;
  description: string;
  color: string;
  bgColor: string;
  icon: React.ElementType;
  nextSteps: string[];
}

const questions: Question[] = [
  {
    id: "cash-flow",
    title: "How would you describe your business's cash flow over the past 6 months?",
    options: [
      { label: "Frequently negative or unpredictable", value: 1 },
      { label: "Occasionally tight, especially around expenses", value: 2 },
      { label: "Generally stable with minor fluctuations", value: 3 },
      { label: "Consistently positive with some buffer", value: 4 },
      { label: "Strong and predictable with 3+ months runway", value: 5 },
    ],
  },
  {
    id: "profitability",
    title: "How confident are you that you know your actual profit margins by product/service?",
    options: [
      { label: "I don't track margins at all", value: 1 },
      { label: "I have a rough idea but no real numbers", value: 2 },
      { label: "I know overall margins but not by product/service", value: 3 },
      { label: "I track margins regularly and review them", value: 4 },
      { label: "I have detailed margin data and optimize continuously", value: 5 },
    ],
  },
  {
    id: "forecasting",
    title: "How far ahead can you reliably predict your cash position?",
    options: [
      { label: "I don't forecast at all", value: 1 },
      { label: "About 1-2 weeks", value: 2 },
      { label: "About 1 month", value: 3 },
      { label: "2-3 months", value: 4 },
      { label: "6+ months with scenario planning", value: 5 },
    ],
  },
  {
    id: "runway",
    title: "If revenue stopped today, how long could your business survive on current cash and credit?",
    options: [
      { label: "Less than 2 weeks", value: 1 },
      { label: "2-4 weeks", value: 2 },
      { label: "1-2 months", value: 3 },
      { label: "3-6 months", value: 4 },
      { label: "6+ months", value: 5 },
    ],
  },
  {
    id: "scaling",
    title: "How confident are you that your financial systems could handle 2-3x growth?",
    options: [
      { label: "They'd break completely", value: 1 },
      { label: "Major overhaul needed", value: 2 },
      { label: "Would need some upgrades", value: 3 },
      { label: "Could handle it with minor adjustments", value: 4 },
      { label: "Built to scale—bring it on", value: 5 },
    ],
  },
];

const resultCategories: Record<string, ResultCategory> = {
  "at-risk": {
    id: "at-risk",
    title: "Your Financial Foundation Needs Immediate Attention",
    description: "Based on your answers, there are some critical gaps in your financial visibility and stability. The good news? These are fixable—and knowing where you stand is the first step.",
    color: "text-red-600",
    bgColor: "bg-red-50 border-red-200",
    icon: AlertTriangle,
    nextSteps: [
      "Start with your cash flow—track every dollar in and out for 2 weeks",
      "Identify your 3 biggest expenses and evaluate if they're necessary right now",
    ],
  },
  "stable": {
    id: "stable",
    title: "You Have Decent Control—With Room to Optimize",
    description: "You're not in crisis mode, but there are blind spots that could become problems during growth or a downturn. A few targeted improvements could significantly strengthen your position.",
    color: "text-amber-600",
    bgColor: "bg-amber-50 border-amber-200",
    icon: TrendingUp,
    nextSteps: [
      "Build a simple 13-week cash flow forecast to see around corners",
      "Calculate your profit margin on your top 3 products/services",
    ],
  },
  "scale-ready": {
    id: "scale-ready",
    title: "Strong Financial Foundation—Ready to Accelerate",
    description: "Your financial health is solid. You have visibility, predictability, and runway. Now the question is: how do you optimize and prepare for the next level of growth?",
    color: "text-green-600",
    bgColor: "bg-green-50 border-green-200",
    icon: CheckCircle,
    nextSteps: [
      "Focus on unit economics and customer lifetime value optimization",
      "Consider scenario planning for different growth trajectories",
    ],
  },
};

export const FinancialHealthAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const calculateResult = useCallback((): ResultCategory => {
    const values = Object.values(answers);
    const average = values.reduce((sum, val) => sum + val, 0) / values.length;
    
    if (average <= 2.0) return resultCategories["at-risk"];
    if (average <= 3.5) return resultCategories["stable"];
    return resultCategories["scale-ready"];
  }, [answers]);

  const handleSelectOption = (value: number) => {
    setSelectedOption(value);
    const questionId = questions[currentQuestion].id;
    
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    // Auto-advance after short delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedOption(null);
      } else {
        setShowResults(true);
      }
    }, 300);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // In a real app, this would send to an API
    toast({
      title: "Check your inbox!",
      description: "We'll send your personalized breakdown shortly.",
    });
    setEmailSubmitted(true);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setEmail("");
    setEmailSubmitted(false);
    setSelectedOption(null);
  };

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;
  const averageScore = Object.values(answers).length > 0 
    ? Math.round((Object.values(answers).reduce((sum, val) => sum + val, 0) / Object.values(answers).length) * 20) 
    : 0;

  if (showResults) {
    const result = calculateResult();
    const ResultIcon = result.icon;

    return (
      <Card className={`shadow-elegant border-2 ${result.bgColor} animate-fade-in-up`}>
        <CardContent className="p-8">
          {/* Score Display */}
          <div className="text-center mb-8">
            <div className={`w-24 h-24 rounded-full ${result.bgColor} flex items-center justify-center mx-auto mb-4`}>
              <ResultIcon className={`w-12 h-12 ${result.color}`} />
            </div>
            <div className="mb-4">
              <span className={`font-montserrat font-bold text-5xl ${result.color}`}>
                {averageScore}
              </span>
              <span className="font-montserrat text-2xl text-muted-foreground">/100</span>
            </div>
            <h3 className={`font-montserrat font-bold text-2xl ${result.color} mb-3`}>
              {result.title}
            </h3>
            <p className="font-open-sans text-muted-foreground max-w-lg mx-auto">
              {result.description}
            </p>
          </div>

          {/* Next Steps */}
          <div className="mb-8">
            <h4 className="font-montserrat font-semibold text-lg text-foreground mb-4">
              Your Next Steps:
            </h4>
            <ul className="space-y-3">
              {result.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-biz-citrine text-biz-navy font-montserrat font-bold text-sm flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="font-open-sans text-foreground">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Email Capture */}
          {!emailSubmitted ? (
            <div className="bg-background rounded-lg p-6 mb-6">
              <h4 className="font-montserrat font-semibold text-foreground mb-2">
                Want a deeper breakdown with 2-3 quick wins tailored to your situation?
              </h4>
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  required
                />
                <Button 
                  type="submit"
                  className="bg-biz-citrine hover:bg-biz-citrine/90 text-biz-navy font-montserrat font-semibold"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send My Insights
                </Button>
              </form>
              <p className="font-open-sans text-xs text-muted-foreground mt-2">
                We'll send your personalized breakdown and occasional financial tips. Unsubscribe anytime.
              </p>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-center">
              <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="font-open-sans text-green-700">
                Check your inbox! Your personalized breakdown is on its way.
              </p>
            </div>
          )}

          {/* CTA to Full Assessment */}
          <div className="bg-biz-navy rounded-lg p-6 text-center">
            <h4 className="font-montserrat font-bold text-xl text-white mb-2">
              Ready for the Full Picture?
            </h4>
            <p className="font-open-sans text-white/80 mb-4 text-sm">
              The Financial Health Check is just one piece of the puzzle. Our comprehensive Business Health Assessment evaluates 12 key areas of your business in 30 minutes—giving you a complete roadmap for growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                asChild
                className="bg-biz-citrine hover:bg-biz-citrine/90 text-biz-navy font-montserrat font-semibold"
              >
                <Link to="/pricing">
                  Get My Full Business Health Baseline (30 min)
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button 
                variant="outline"
                onClick={handleRestart}
                className="border-biz-blue text-biz-blue hover:bg-biz-navy hover:text-white hover:border-biz-navy transition-all duration-200"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake Assessment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <Card className="shadow-elegant border-border/50 bg-card">
      <CardContent className="p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-montserrat font-semibold text-sm text-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="font-open-sans text-sm text-muted-foreground">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-2 bg-secondary"
          />
        </div>

        {/* Question */}
        <div className="mb-8 animate-fade-in-up" key={currentQuestion}>
          <h3 className="font-montserrat font-semibold text-xl md:text-2xl text-foreground mb-6">
            {currentQ.title}
          </h3>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectOption(option.value)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 hover:border-biz-citrine hover:bg-biz-citrine/5 focus:outline-none focus:ring-2 focus:ring-biz-citrine focus:ring-offset-2 ${
                  selectedOption === option.value
                    ? 'border-biz-citrine bg-biz-citrine/10'
                    : 'border-border bg-background'
                }`}
              >
                <span className="font-open-sans text-foreground">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Question Indicators */}
        <div className="flex justify-center gap-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index < currentQuestion
                  ? 'bg-biz-green'
                  : index === currentQuestion
                  ? 'bg-biz-citrine'
                  : 'bg-secondary'
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
