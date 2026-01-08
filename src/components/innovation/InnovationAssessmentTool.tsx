import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Mail, 
  Share2,
  AlertTriangle,
  TrendingUp,
  Target,
  Users,
  Eye,
  Loader2,
  RotateCcw
} from 'lucide-react';
import { toast } from 'sonner';

interface Question {
  id: number;
  pillar: string;
  pillarNumber: number;
  text: string;
}

interface Scores {
  technology: number;
  strategy: number;
  capacity: number;
  market: number;
  total: number;
  category: 'high' | 'moderate-high' | 'moderate' | 'critical';
}

const questions: Question[] = [
  // Pillar 1: Technology Infrastructure (1-5)
  { id: 1, pillar: 'Technology Infrastructure', pillarNumber: 1, text: 'Our systems are integrated - data flows between systems without manual workarounds' },
  { id: 2, pillar: 'Technology Infrastructure', pillarNumber: 1, text: 'Our systems can scale to handle 3x current volume without significant changes' },
  { id: 3, pillar: 'Technology Infrastructure', pillarNumber: 1, text: 'We use modern, current versions of tools (not legacy systems)' },
  { id: 4, pillar: 'Technology Infrastructure', pillarNumber: 1, text: 'Our team reports that technology enables their work rather than slowing them down' },
  { id: 5, pillar: 'Technology Infrastructure', pillarNumber: 1, text: 'Less than 5% of team time is spent on system workarounds' },
  
  // Pillar 2: Strategic Clarity (6-10)
  { id: 6, pillar: 'Strategic Clarity', pillarNumber: 2, text: 'We have a clear, written innovation strategy that is communicated to the team' },
  { id: 7, pillar: 'Strategic Clarity', pillarNumber: 2, text: 'Our innovation strategy aligns with our overall business strategy' },
  { id: 8, pillar: 'Strategic Clarity', pillarNumber: 2, text: 'Leadership team is fully aligned on what defines "successful innovation"' },
  { id: 9, pillar: 'Strategic Clarity', pillarNumber: 2, text: 'We have a clear process for evaluating and pursuing innovation opportunities' },
  { id: 10, pillar: 'Strategic Clarity', pillarNumber: 2, text: 'We have defined metrics for measuring innovation success' },
  
  // Pillar 3: Organizational Capacity (11-15)
  { id: 11, pillar: 'Organizational Capacity', pillarNumber: 3, text: 'We have an explicit innovation budget (even if small)' },
  { id: 12, pillar: 'Organizational Capacity', pillarNumber: 3, text: 'Team members have dedicated time for innovation (not just "innovate in your spare time")' },
  { id: 13, pillar: 'Organizational Capacity', pillarNumber: 3, text: 'Our culture rewards experimentation and learning from failure' },
  { id: 14, pillar: 'Organizational Capacity', pillarNumber: 3, text: 'Training and skill development happens regularly' },
  { id: 15, pillar: 'Organizational Capacity', pillarNumber: 3, text: 'At least one person\'s role includes innovation as primary responsibility' },
  
  // Pillar 4: Customer & Market Sensing (16-20)
  { id: 16, pillar: 'Customer & Market Sensing', pillarNumber: 4, text: 'We conduct regular customer interviews (at least monthly)' },
  { id: 17, pillar: 'Customer & Market Sensing', pillarNumber: 4, text: 'We track and review competitive intelligence regularly' },
  { id: 18, pillar: 'Customer & Market Sensing', pillarNumber: 4, text: 'We analyze market trends and discuss them with leadership' },
  { id: 19, pillar: 'Customer & Market Sensing', pillarNumber: 4, text: 'Customer feedback is systematically collected and acted upon' },
  { id: 20, pillar: 'Customer & Market Sensing', pillarNumber: 4, text: 'Insights about market gaps and opportunities regularly surface' },
];

const scoreOptions = [
  { value: 5, label: 'Fully Implemented', icon: Check, color: 'bg-green-500' },
  { value: 4, label: 'Mostly Implemented', icon: null, color: 'bg-green-400' },
  { value: 3, label: 'Partially Implemented', icon: null, color: 'bg-yellow-500' },
  { value: 2, label: 'Minimally Implemented', icon: null, color: 'bg-orange-500' },
  { value: 1, label: 'Not Implemented', icon: X, color: 'bg-red-500' },
];

const pillarIcons = {
  'Technology Infrastructure': TrendingUp,
  'Strategic Clarity': Target,
  'Organizational Capacity': Users,
  'Customer & Market Sensing': Eye,
};

const InnovationAssessmentTool: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [displayedScore, setDisplayedScore] = useState(0);
  const [hasResumed, setHasResumed] = useState(false);

  // Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('innovationAssessment');
    if (saved) {
      try {
        const { currentQuestion: savedQ, answers: savedA, timestamp } = JSON.parse(saved);
        // Resume if saved within last 7 days
        if (Date.now() - timestamp < 7 * 24 * 60 * 60 * 1000) {
          setCurrentQuestion(savedQ);
          setAnswers(savedA);
          setHasResumed(true);
          toast.info('Welcome back! Your progress has been restored.');
        }
      } catch (e) {
        console.error('Error loading saved progress:', e);
      }
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    if (Object.keys(answers).length > 0 && !showResults) {
      const progress = {
        currentQuestion,
        answers,
        timestamp: Date.now()
      };
      localStorage.setItem('innovationAssessment', JSON.stringify(progress));
    }
  }, [currentQuestion, answers, showResults]);

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: value }));
  };

  const goNext = () => {
    if (currentQuestion < 20) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Complete the assessment
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setShowResults(true);
        animateScore();
        localStorage.removeItem('innovationAssessment');
      }, 2000);
    }
  };

  const goPrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateScores = (): Scores => {
    const pillars = {
      technology: [1, 2, 3, 4, 5],
      strategy: [6, 7, 8, 9, 10],
      capacity: [11, 12, 13, 14, 15],
      market: [16, 17, 18, 19, 20]
    };
    
    const scores: any = {};
    for (const [pillar, questionIds] of Object.entries(pillars)) {
      scores[pillar] = questionIds.reduce((sum, q) => sum + (answers[q] || 0), 0);
    }
    
    scores.total = scores.technology + scores.strategy + scores.capacity + scores.market;
    
    if (scores.total >= 80) scores.category = 'high';
    else if (scores.total >= 60) scores.category = 'moderate-high';
    else if (scores.total >= 40) scores.category = 'moderate';
    else scores.category = 'critical';
    
    return scores as Scores;
  };

  const animateScore = () => {
    const scores = calculateScores();
    let current = 0;
    const increment = scores.total / 50;
    const interval = setInterval(() => {
      current += increment;
      if (current >= scores.total) {
        current = scores.total;
        clearInterval(interval);
      }
      setDisplayedScore(Math.round(current));
    }, 20);
  };

  const getScoreColor = (score: number, max: number) => {
    const percentage = (score / max) * 100;
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-lime-500';
    if (percentage >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getCategoryConfig = (category: string) => {
    switch (category) {
      case 'high':
        return {
          label: 'High Innovation Readiness',
          color: 'bg-green-500',
          textColor: 'text-green-600',
          borderColor: 'border-green-500',
          description: 'You have the infrastructure and organizational capability to innovate at pace. You are likely outgrowing competitors and expanding market share.'
        };
      case 'moderate-high':
        return {
          label: 'Competitive but Vulnerable',
          color: 'bg-lime-500',
          textColor: 'text-lime-600',
          borderColor: 'border-lime-500',
          description: 'You have some innovation capability but significant gaps remain. You are competitive today but vulnerable to more innovative competitors who are building capability.'
        };
      case 'moderate':
        return {
          label: 'Falling Behind',
          color: 'bg-orange-500',
          textColor: 'text-orange-600',
          borderColor: 'border-orange-500',
          description: 'You have clear gaps across multiple dimensions. Competitors who are investing in innovation are likely outgrowing you. Action is needed urgently.'
        };
      default:
        return {
          label: 'Critical Gap',
          color: 'bg-red-500',
          textColor: 'text-red-600',
          borderColor: 'border-red-500',
          description: 'Your organization lacks the capability to innovate effectively. You are likely losing market share and talent to more innovative competitors. Comprehensive change is required.'
        };
    }
  };

  const getNextSteps = (category: string, scores: Scores) => {
    const lowestPillar = Object.entries({
      'Technology Infrastructure': scores.technology,
      'Strategic Clarity': scores.strategy,
      'Organizational Capacity': scores.capacity,
      'Customer & Market Sensing': scores.market
    }).sort((a, b) => a[1] - b[1])[0][0];

    switch (category) {
      case 'high':
        return [
          `Focus on your lowest-scoring pillar (${lowestPillar}) to achieve excellence across all dimensions`,
          'Document your innovation process to scale it as you grow',
          'Benchmark your performance against industry leaders'
        ];
      case 'moderate-high':
        return [
          `Prioritize ${lowestPillar} - this is your biggest vulnerability`,
          'Allocate 10-15% of team capacity specifically to innovation work',
          'Implement the 90-Day Innovation Gap Closure Plan (download below)'
        ];
      case 'moderate':
        return [
          'URGENT: Schedule a leadership team meeting this week to review these results',
          'Start with Technology Infrastructure - this multiplies capacity for other improvements',
          'Commit to a 90-day sprint focused on closing your largest gap'
        ];
      default:
        return [
          'CRITICAL: This requires board-level attention and committed resources',
          'Consider engaging external expertise to accelerate capability-building',
          'Start with quick wins in technology integration to free up capacity',
          'Download the complete 90-Day Closure Plan and commit to implementation NOW'
        ];
    }
  };

  const getPillarAlerts = (scores: Scores) => {
    const alerts = [];
    
    if (scores.technology < 20) {
      alerts.push({
        pillar: 'Technology Infrastructure',
        icon: TrendingUp,
        problem: 'Your technology stack is holding you back.',
        quickWin: 'Audit your current systems and identify your #1 integration gap. Fixing one critical integration can free up 5-10 hours per week.'
      });
    }
    
    if (scores.strategy < 20) {
      alerts.push({
        pillar: 'Strategic Clarity',
        icon: Target,
        problem: 'Your team lacks clear direction on innovation priorities.',
        quickWin: 'Schedule a 2-hour strategy session with leadership to answer: What are we building, for whom, and why?'
      });
    }
    
    if (scores.capacity < 20) {
      alerts.push({
        pillar: 'Organizational Capacity',
        icon: Users,
        problem: "You're asking people to innovate without giving them time or resources.",
        quickWin: 'Allocate even a small innovation budget ($5K-10K/quarter) and 10% of one person\'s time.'
      });
    }
    
    if (scores.market < 20) {
      alerts.push({
        pillar: 'Customer & Market Sensing',
        icon: Eye,
        problem: "You're innovating without customer insight.",
        quickWin: 'Conduct 5 customer interviews this month asking: "What problems do we NOT solve for you yet?"'
      });
    }
    
    return alerts;
  };

  const handleDownloadPDF = () => {
    // Trigger download of the 90-day plan
    const link = document.createElement('a');
    link.href = '/downloads/90-Day-Innovation-Gap-Closure-Plan-BizHealthai.docx';
    link.download = '90-Day-Innovation-Gap-Closure-Plan-BizHealthai.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Downloading your 90-Day Innovation Gap Closure Plan!');
  };

  const handleShare = (platform: string) => {
    const scores = calculateScores();
    const url = window.location.href;
    const text = `I just scored ${scores.total}/100 on the Innovation Readiness Assessment by @BizHealthAI. Discover your innovation gaps at:`;
    
    if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    }
  };

  const resetAssessment = () => {
    setCurrentQuestion(1);
    setAnswers({});
    setShowResults(false);
    setDisplayedScore(0);
    localStorage.removeItem('innovationAssessment');
    toast.success('Assessment reset. Start fresh!');
  };

  const question = questions[currentQuestion - 1];
  const progressPercent = (currentQuestion / 20) * 100;

  if (isAnalyzing) {
    return (
      <Card className="max-w-3xl mx-auto border-l-8 border-l-biz-citrine shadow-xl">
        <CardContent className="p-12 text-center">
          <Loader2 className="w-16 h-16 text-biz-citrine animate-spin mx-auto mb-6" />
          <h3 className="text-2xl font-montserrat font-bold text-biz-navy mb-2">
            Analyzing Your Innovation Readiness...
          </h3>
          <p className="text-biz-grey font-open-sans">
            Calculating your scores across all four pillars
          </p>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    const scores = calculateScores();
    const categoryConfig = getCategoryConfig(scores.category);
    const nextSteps = getNextSteps(scores.category, scores);
    const pillarAlerts = getPillarAlerts(scores);

    return (
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Overall Score Card */}
        <Card className="border-l-8 border-l-biz-citrine shadow-xl overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-montserrat font-bold text-biz-navy text-center mb-8">
              Your Innovation Readiness Score
            </h3>
            
            {/* Circular Score Display */}
            <div className="flex justify-center mb-8">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${(displayedScore / 100) * 283} 283`}
                    className={categoryConfig.textColor}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-montserrat font-bold text-biz-navy">
                    {displayedScore}
                  </span>
                  <span className="text-biz-grey font-open-sans">out of 100</span>
                </div>
              </div>
            </div>

            {/* Category Badge */}
            <div className="text-center mb-8">
              <Badge className={`${categoryConfig.color} text-white text-lg px-6 py-2`}>
                {categoryConfig.label}
              </Badge>
            </div>

            {/* Pillar Breakdown */}
            <div className="space-y-4 mb-8">
              <h4 className="font-montserrat font-semibold text-biz-navy text-lg">Pillar Breakdown</h4>
              
              {[
                { name: 'Technology Infrastructure', score: scores.technology, icon: TrendingUp },
                { name: 'Strategic Clarity', score: scores.strategy, icon: Target },
                { name: 'Organizational Capacity', score: scores.capacity, icon: Users },
                { name: 'Customer & Market Sensing', score: scores.market, icon: Eye },
              ].map((pillar) => (
                <div key={pillar.name} className="flex items-center gap-4">
                  <pillar.icon className="w-5 h-5 text-biz-grey flex-shrink-0" />
                  <span className="font-open-sans text-biz-navy w-48 flex-shrink-0 text-sm md:text-base">
                    {pillar.name}
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${getScoreColor(pillar.score, 25)}`}
                      style={{ width: `${(pillar.score / 25) * 100}%` }}
                    />
                  </div>
                  <span className="font-montserrat font-semibold text-biz-navy w-12 text-right">
                    {pillar.score}/25
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interpretation Card */}
        <Card className={`border-l-8 ${categoryConfig.borderColor} shadow-lg`}>
          <CardContent className="p-6 md:p-8">
            <h4 className="font-montserrat font-bold text-xl text-biz-navy mb-4">
              What This Means
            </h4>
            <p className="font-open-sans text-biz-grey mb-6 leading-relaxed">
              {categoryConfig.description}
            </p>
            
            <h5 className="font-montserrat font-semibold text-biz-navy mb-3">
              Recommended Next Steps:
            </h5>
            <ol className="space-y-3">
              {nextSteps.map((step, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-biz-citrine text-biz-navy font-bold flex items-center justify-center text-sm">
                    {index + 1}
                  </span>
                  <span className="font-open-sans text-biz-grey">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Pillar Alerts */}
        {pillarAlerts.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-montserrat font-bold text-xl text-biz-navy">
              Priority Improvement Areas
            </h4>
            {pillarAlerts.map((alert) => (
              <Card key={alert.pillar} className="border-l-4 border-l-orange-500 bg-orange-50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-montserrat font-semibold text-biz-navy mb-2">
                        {alert.pillar} Gap
                      </h5>
                      <p className="font-open-sans text-biz-grey mb-3">{alert.problem}</p>
                      <div className="bg-white rounded-lg p-4 border border-orange-200">
                        <span className="font-semibold text-biz-citrine">Quick Win: </span>
                        <span className="font-open-sans text-biz-grey">{alert.quickWin}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <Card className="bg-biz-navy text-white">
          <CardContent className="p-8">
            <h4 className="font-montserrat font-bold text-2xl text-center mb-6">
              Ready to Close Your Innovation Gap?
            </h4>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
              <Button 
                onClick={handleDownloadPDF}
                className="bg-biz-citrine hover:bg-biz-citrine/90 text-biz-navy font-semibold text-lg px-8 py-6"
              >
                <Download className="w-5 h-5 mr-2" />
                Download 90-Day Plan
              </Button>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                variant="outline"
                onClick={() => handleShare('linkedin')}
                className="border-white/50 text-white bg-white/10 hover:bg-white/20"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share on LinkedIn
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleShare('twitter')}
                className="border-white/50 text-white bg-white/10 hover:bg-white/20"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share on X
              </Button>
              <Button 
                variant="outline"
                onClick={resetAssessment}
                className="border-white/50 text-white bg-white/10 hover:bg-white/20"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Question Interface
  const PillarIcon = pillarIcons[question.pillar as keyof typeof pillarIcons];

  return (
    <Card className="max-w-3xl mx-auto border-l-8 border-l-biz-citrine shadow-xl">
      <CardContent className="p-6 md:p-10">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-open-sans text-biz-grey">
              Question <span className="font-semibold text-biz-navy">{currentQuestion}</span> of <span className="font-semibold text-biz-navy">20</span>
            </span>
            <span className="font-open-sans text-biz-grey text-sm">
              {Math.round(progressPercent)}% Complete
            </span>
          </div>
          <Progress value={progressPercent} className="h-3" />
          <div className="flex items-center gap-2 mt-3">
            <PillarIcon className="w-4 h-4 text-biz-citrine" />
            <span className="font-open-sans text-sm text-biz-grey">
              Pillar {question.pillarNumber}: {question.pillar}
            </span>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <div className="flex items-start gap-4 mb-6">
            <span className="flex-shrink-0 w-10 h-10 rounded-full bg-biz-citrine text-biz-navy font-bold flex items-center justify-center text-lg">
              {currentQuestion}
            </span>
            <h3 className="font-montserrat font-semibold text-xl md:text-2xl text-biz-navy leading-tight">
              {question.text}
            </h3>
          </div>

          {/* Score Options */}
          <div className="space-y-3">
            {scoreOptions.map((option) => {
              const isSelected = answers[currentQuestion] === option.value;
              const Icon = option.icon;
              
              return (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 ${
                    isSelected 
                      ? 'border-biz-citrine bg-biz-citrine/10' 
                      : 'border-gray-200 hover:border-biz-citrine/50 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {Icon && (
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        option.value === 5 ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        <Icon className="w-4 h-4 text-white" />
                      </span>
                    )}
                    {!Icon && (
                      <span className={`w-6 h-6 rounded-full ${option.color}`} />
                    )}
                    <span className={`font-open-sans ${isSelected ? 'font-semibold text-biz-navy' : 'text-biz-grey'}`}>
                      {option.label}
                    </span>
                  </div>
                  <span className={`text-sm font-open-sans ${isSelected ? 'text-biz-citrine font-semibold' : 'text-biz-grey'}`}>
                    {option.value} {option.value === 1 ? 'point' : 'points'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-100">
          <Button
            variant="outline"
            onClick={goPrevious}
            disabled={currentQuestion === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <Button
            onClick={goNext}
            disabled={!answers[currentQuestion]}
            className="bg-biz-citrine hover:bg-biz-citrine/90 text-biz-navy font-semibold flex items-center gap-2"
          >
            {currentQuestion === 20 ? 'See My Results' : 'Next'}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InnovationAssessmentTool;
