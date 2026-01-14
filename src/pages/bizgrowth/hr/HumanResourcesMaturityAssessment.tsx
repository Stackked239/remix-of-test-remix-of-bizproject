import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, Download, ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react';
import jsPDF from 'jspdf';
import SEO from '@/components/SEO';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from '@/components/GlobalFooter';
import PromotionalBanner from '@/components/PromotionalBanner';
import bizHealthLogo from '@/assets/bizhealth-logo-horizontal.jpg';
import bizHealthEmailLogo from '@/assets/bizhealth-email-logo.jpg';

// Brand colors
const COLORS = {
  bizBlue: '#242553',
  bizGreen: '#969423',
  bizLime: '#65A30D',
  bizCopper: '#B45309',
};

interface Question {
  id: string;
  pillar: string;
  question: string;
  options: { value: number; label: string }[];
}

interface PillarScore {
  score: number;
  max: number;
}

interface Results {
  totalScore: number;
  maxScore: number;
  percentage: string;
  maturityLevel: string;
  levelDescription: string;
  recommendations: string[];
  pillarScores: Record<string, PillarScore>;
}

const HumanResourcesMaturityAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<Results | null>(null);

  const questions: Question[] = [
    {
      id: 'q1',
      pillar: 'HR Strategy & Workforce Planning',
      question: 'Do you have a documented HR strategy aligned with your business goals?',
      options: [
        { value: 0, label: 'No formal HR strategy exists' },
        { value: 1, label: 'Informal planning, not documented' },
        { value: 2, label: 'Basic documented plan exists' },
        { value: 3, label: 'Comprehensive strategic HR plan aligned to business' }
      ]
    },
    {
      id: 'q2',
      pillar: 'Talent Acquisition & Recruiting',
      question: 'Do you have a documented, consistent hiring process?',
      options: [
        { value: 0, label: 'No process - we hire reactively' },
        { value: 1, label: 'Informal process, varies by manager' },
        { value: 2, label: 'Documented process, mostly followed' },
        { value: 3, label: 'Structured process with scorecards and metrics' }
      ]
    },
    {
      id: 'q3',
      pillar: 'Onboarding & New Hire Integration',
      question: 'Do you have a structured onboarding program for new hires?',
      options: [
        { value: 0, label: 'No formal onboarding - new hires figure it out' },
        { value: 1, label: 'Basic orientation, not structured' },
        { value: 2, label: 'Documented 30-60-90 day plan' },
        { value: 3, label: 'Comprehensive onboarding with regular check-ins and metrics' }
      ]
    },
    {
      id: 'q4',
      pillar: 'Performance Management',
      question: 'How do you manage employee performance?',
      options: [
        { value: 0, label: 'No formal performance reviews' },
        { value: 1, label: 'Annual reviews, informal feedback' },
        { value: 2, label: 'Quarterly or semi-annual structured reviews' },
        { value: 3, label: 'Continuous feedback with quarterly reviews and goal tracking' }
      ]
    },
    {
      id: 'q5',
      pillar: 'Compensation & Total Rewards',
      question: 'Do you have documented compensation ranges and philosophy?',
      options: [
        { value: 0, label: 'No structure - pay is ad-hoc' },
        { value: 1, label: 'Rough guidelines, not documented' },
        { value: 2, label: 'Documented salary bands for key roles' },
        { value: 3, label: 'Comprehensive comp structure with market benchmarking' }
      ]
    },
    {
      id: 'q6',
      pillar: 'Employee Engagement & Retention',
      question: 'Do you measure and act on employee engagement?',
      options: [
        { value: 0, label: 'No engagement measurement' },
        { value: 1, label: 'Informal check-ins only' },
        { value: 2, label: 'Annual or bi-annual surveys' },
        { value: 3, label: 'Quarterly pulse surveys with action plans' }
      ]
    },
    {
      id: 'q7',
      pillar: 'Learning & Development',
      question: 'Do you have development plans and training for employees?',
      options: [
        { value: 0, label: 'No formal development or training' },
        { value: 1, label: 'Occasional training, no development plans' },
        { value: 2, label: 'Basic development planning for some roles' },
        { value: 3, label: 'Comprehensive L&D with individual development plans' }
      ]
    },
    {
      id: 'q8',
      pillar: 'HR Compliance & Risk Management',
      question: 'Do you have an employee handbook and understand compliance requirements?',
      options: [
        { value: 0, label: 'No handbook, unsure of compliance requirements' },
        { value: 1, label: 'Basic policies, limited compliance knowledge' },
        { value: 2, label: 'Employee handbook exists, basic compliance covered' },
        { value: 3, label: 'Comprehensive handbook, regular compliance audits' }
      ]
    }
  ];

  const calculateResults = () => {
    const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const maxScore = questions.length * 3;
    const percentage = (totalScore / maxScore) * 100;

    let maturityLevel: string;
    let levelDescription: string;
    let recommendations: string[];

    if (percentage < 25) {
      maturityLevel = 'Level 1: Ad-Hoc';
      levelDescription = 'Your HR practices are largely reactive and informal. You need to establish foundational HR systems to reduce risk and improve consistency.';
      recommendations = [
        'Start with HR 101 Foundation Module to understand core concepts',
        'Create basic employee handbook (HR Compliance & Risk Management)',
        'Document your hiring process (Talent Acquisition & Recruiting)',
        'Implement simple onboarding checklist (Onboarding & Integration)',
        'Consider BizHealth.ai Start-Up Journey (12 weeks)'
      ];
    } else if (percentage < 50) {
      maturityLevel = 'Level 2: Reactive';
      levelDescription = 'You have some HR processes in place, but they are inconsistent and not fully documented. Focus on systematizing and formalizing your practices.';
      recommendations = [
        'Document and standardize hiring process',
        'Implement structured onboarding program',
        'Establish performance review cycle',
        'Create compensation structure with salary bands',
        'Consider BizHealth.ai Scaling Journey (16 weeks)'
      ];
    } else if (percentage < 75) {
      maturityLevel = 'Level 3: Systematic';
      levelDescription = 'You have documented HR processes and systems. Now focus on optimizing, measuring effectiveness, and developing leadership capability.';
      recommendations = [
        'Implement engagement measurement with pulse surveys',
        'Build leadership development program',
        'Optimize compensation strategy with market benchmarking',
        'Develop succession plans for key roles',
        'Consider BizHealth.ai Established Journey (16 weeks)'
      ];
    } else {
      maturityLevel = 'Level 4: Strategic';
      levelDescription = 'Your HR practices are mature, data-driven, and aligned with business strategy. Focus on continuous improvement, innovation, and preparing for growth or transition.';
      recommendations = [
        'Conduct HR audit for due diligence readiness',
        'Optimize HR technology stack for efficiency',
        'Refine leadership succession planning',
        'Build advanced engagement and culture programs',
        'Consider BizHealth.ai Enterprise Journey (14-16 weeks)'
      ];
    }

    const pillarScores = questions.reduce((acc, q) => {
      const pillar = q.pillar;
      if (!acc[pillar]) {
        acc[pillar] = { score: 0, max: 0 };
      }
      acc[pillar].score += answers[q.id] || 0;
      acc[pillar].max += 3;
      return acc;
    }, {} as Record<string, PillarScore>);

    setResults({
      totalScore,
      maxScore,
      percentage: percentage.toFixed(1),
      maturityLevel,
      levelDescription,
      recommendations,
      pillarScores
    });
    setShowResults(true);
  };

  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleStartNew = () => {
    setShowResults(false);
    setCurrentQuestion(0);
    setAnswers({});
    setResults(null);
  };

  const generatePDF = async () => {
    if (!results) return;
    
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - (margin * 2);

    // Helper function to draw rounded rectangle
    const drawRoundedRect = (x: number, y: number, w: number, h: number, r: number, fill: boolean = true) => {
      doc.roundedRect(x, y, w, h, r, r, fill ? 'F' : 'S');
    };

    // Helper function to draw progress bar
    const drawProgressBar = (x: number, y: number, width: number, height: number, percentage: number) => {
      doc.setFillColor(230, 230, 230);
      drawRoundedRect(x, y, width, height, 1.5);
      
      const fillWidth = (width * percentage) / 100;
      if (fillWidth > 0) {
        if (percentage >= 75) {
          doc.setFillColor(101, 163, 13);
        } else if (percentage >= 50) {
          doc.setFillColor(150, 148, 35);
        } else if (percentage >= 25) {
          doc.setFillColor(180, 83, 9);
        } else {
          doc.setFillColor(220, 38, 38);
        }
        drawRoundedRect(x, y, Math.max(fillWidth, 3), height, 1.5);
      }
    };

    // Add logo - larger size, locked aspect ratio
    let logoEndY = 22;
    try {
      const img = new Image();
      img.src = bizHealthEmailLogo;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      
      const originalWidth = img.width;
      const originalHeight = img.height;
      const maxLogoWidth = 70;
      const aspectRatio = originalWidth / originalHeight;
      const logoWidth = maxLogoWidth;
      const logoHeight = logoWidth / aspectRatio;
      
      doc.addImage(bizHealthEmailLogo, 'JPEG', margin, 8, logoWidth, logoHeight);
      logoEndY = 8 + logoHeight;
    } catch (error) {
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(36, 37, 83);
      doc.text('BizHealth.ai', margin, 18);
    }

    // Header accent bar
    const barY = logoEndY + 2;
    doc.setFillColor(36, 37, 83);
    doc.rect(0, barY, pageWidth, 2, 'F');
    doc.setFillColor(150, 148, 35);
    doc.rect(0, barY + 2, pageWidth, 0.5, 'F');

    // Title section - separate lines for title and date
    let yPos = barY + 10;
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(36, 37, 83);
    doc.text('HR Maturity Assessment Results', margin, yPos);
    
    // Assessment Date - on same line, right aligned
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    const date = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    doc.text(`Assessment Date: ${date}`, pageWidth - margin, yPos, { align: 'right' });

    yPos += 8;

    // Overall Score Card - compact
    doc.setFillColor(36, 37, 83);
    drawRoundedRect(margin, yPos, contentWidth, 28, 3);
    
    // Score circle
    doc.setFillColor(255, 255, 255);
    doc.circle(margin + 18, yPos + 14, 12, 'F');
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(36, 37, 83);
    doc.text(`${results.percentage}%`, margin + 18, yPos + 16.5, { align: 'center' });
    
    // Score labels
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Overall HR Maturity Score', margin + 38, yPos + 10);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`${results.totalScore} / ${results.maxScore} points  •  ${results.maturityLevel}`, margin + 38, yPos + 18);

    yPos += 34;

    // Level Description - compact
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(80, 80, 80);
    const splitDescription = doc.splitTextToSize(results.levelDescription, contentWidth);
    doc.text(splitDescription, margin, yPos);
    yPos += (splitDescription.length * 3.5) + 4;

    // Pillar Scores Section - compact grid layout
    doc.setFillColor(248, 250, 252);
    const pillarEntries = Object.entries(results.pillarScores);
    const pillarSectionHeight = 8 + (pillarEntries.length * 9);
    drawRoundedRect(margin, yPos, contentWidth, pillarSectionHeight, 2);
    
    yPos += 6;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(36, 37, 83);
    doc.text('Scores by HR Pillar', margin + 5, yPos);
    yPos += 7;

    doc.setFontSize(8);
    pillarEntries.forEach(([pillar, scores]) => {
      const pillarPercentage = Math.round((scores.score / scores.max) * 100);
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      const pillarText = pillar.length > 40 ? pillar.substring(0, 40) + '...' : pillar;
      doc.text(pillarText, margin + 5, yPos);
      
      // Progress bar
      drawProgressBar(margin + 105, yPos - 2.5, 50, 4, pillarPercentage);
      
      // Percentage
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(36, 37, 83);
      doc.text(`${pillarPercentage}%`, pageWidth - margin - 5, yPos, { align: 'right' });
      
      yPos += 8;
    });

    yPos += 4;

    // Recommendations Section - compact
    doc.setFillColor(180, 83, 9);
    drawRoundedRect(margin, yPos, contentWidth, 7, 2);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('Recommended Next Steps', margin + 5, yPos + 5);
    yPos += 11;

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    
    results.recommendations.forEach((rec, index) => {
      doc.setFillColor(36, 37, 83);
      doc.circle(margin + 4, yPos - 1, 2.5, 'F');
      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text(`${index + 1}`, margin + 4, yPos, { align: 'center' });
      
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(50, 50, 50);
      const splitRec = doc.splitTextToSize(rec, contentWidth - 15);
      doc.text(splitRec, margin + 10, yPos);
      yPos += (splitRec.length * 3.5) + 3;
    });

    // Footer - compact
    const footerY = pageHeight - 15;
    
    doc.setDrawColor(150, 148, 35);
    doc.setLineWidth(0.3);
    doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);
    
    // Disclaimer - single line
    doc.setFontSize(6);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(120, 120, 120);
    const disclaimer = 'Disclaimer: This assessment provides a general overview of HR maturity. Results should be used as a starting point for discussion with qualified HR professionals.';
    const splitDisclaimer = doc.splitTextToSize(disclaimer, contentWidth);
    doc.text(splitDisclaimer, margin, footerY);
    
    // Copyright
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('© 2026 BizHealth.ai', margin, footerY + 8);
    
    doc.setTextColor(36, 37, 83);
    doc.setFont('helvetica', 'bold');
    doc.text('www.bizhealth.ai', pageWidth - margin, footerY + 8, { align: 'right' });

    doc.save('BizHealth-HR-Maturity-Assessment-Results.pdf');
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <>
      <SEO
        title="HR Maturity Assessment Tool | BizHealth.ai"
        description="Evaluate your organization's HR practices across 8 key pillars. Get personalized recommendations to improve talent acquisition, performance management, employee engagement, and HR compliance."
        keywords="HR maturity assessment, human resources evaluation, HR strategy, talent acquisition, performance management, employee engagement, HR compliance, workforce planning"
        canonical="https://bizhealth.ai/bizgrowth/hr/human-resources-maturity-assessment"
        ogImage="/og-images/og-hr-maturity-assessment.jpg"
      />

      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-green-50">
        <PromotionalBanner />
        <GlobalNavigation />

        <main className="flex-1 py-8 px-4 sm:px-6 pt-40">
          {showResults && results ? (
            <ResultsView 
              results={results} 
              onDownloadPDF={generatePDF} 
              onStartNew={handleStartNew}
              logoSrc={bizHealthLogo}
            />
          ) : (
            <QuestionView
              currentQuestion={currentQuestion}
              questions={questions}
              answers={answers}
              progress={progress}
              onAnswerChange={handleAnswerChange}
              onNext={handleNext}
              onPrevious={handlePrevious}
              logoSrc={bizHealthLogo}
            />
          )}
        </main>

        <GlobalFooter />
      </div>
    </>
  );
};

// Question View Component
interface QuestionViewProps {
  currentQuestion: number;
  questions: Question[];
  answers: Record<string, number>;
  progress: number;
  onAnswerChange: (questionId: string, value: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  logoSrc: string;
}

const QuestionView = ({
  currentQuestion,
  questions,
  answers,
  progress,
  onAnswerChange,
  onNext,
  onPrevious,
  logoSrc
}: QuestionViewProps) => {
  const currentQ = questions[currentQuestion];
  const isAnswered = answers[currentQ.id] !== undefined;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2" style={{ color: COLORS.bizBlue }}>
          HR Maturity Assessment
        </h1>
        <p className="text-muted-foreground">
          Evaluate your organization's HR practices and get personalized recommendations
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress 
          value={progress} 
          className="h-3"
          style={{ 
            ['--progress-background' as string]: COLORS.bizLime 
          }}
        />
      </div>

      {/* Question Card */}
      <Card className="shadow-xl border-2" style={{ borderColor: COLORS.bizGreen }}>
        <CardHeader 
          className="text-white"
          style={{ 
            background: `linear-gradient(to right, ${COLORS.bizBlue}, ${COLORS.bizGreen})` 
          }}
        >
          <CardTitle className="text-lg">
            {currentQ.pillar}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            {currentQ.question}
          </h2>

          <RadioGroup
            value={answers[currentQ.id]?.toString()}
            onValueChange={(value) => onAnswerChange(currentQ.id, parseInt(value))}
            className="space-y-4"
          >
            {currentQ.options.map((option) => {
              const isSelected = answers[currentQ.id] === option.value;
              return (
                <div
                  key={option.value}
                  className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer
                    ${isSelected
                      ? 'bg-green-50'
                      : 'border-border hover:bg-muted/50'
                    }`}
                  style={{
                    borderColor: isSelected ? COLORS.bizLime : undefined
                  }}
                  onClick={() => onAnswerChange(currentQ.id, option.value)}
                >
                  <RadioGroupItem
                    value={option.value.toString()}
                    id={`${currentQ.id}-${option.value}`}
                    className="mt-1"
                  />
                  <Label
                    htmlFor={`${currentQ.id}-${option.value}`}
                    className="flex-1 cursor-pointer text-foreground leading-relaxed"
                  >
                    {option.label}
                  </Label>
                  {isSelected && (
                    <CheckCircle2 
                      className="h-5 w-5 flex-shrink-0" 
                      style={{ color: COLORS.bizLime }}
                    />
                  )}
                </div>
              );
            })}
          </RadioGroup>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              onClick={onPrevious}
              disabled={currentQuestion === 0}
              variant="outline"
              className="px-6"
              style={{
                borderColor: COLORS.bizGreen,
                color: COLORS.bizGreen
              }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            <Button
              onClick={onNext}
              disabled={!isAnswered}
              className="px-6 text-white"
              style={{ 
                backgroundColor: COLORS.bizBlue,
                opacity: !isAnswered ? 0.5 : 1
              }}
            >
              {currentQuestion === questions.length - 1 ? 'View Results' : 'Next'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-xs text-muted-foreground">
          © 2026 BizHealth.ai | Your Business Health Analyst
        </p>
      </div>
    </div>
  );
};

// Results View Component
interface ResultsViewProps {
  results: Results;
  onDownloadPDF: () => void;
  onStartNew: () => void;
  logoSrc: string;
}

const ResultsView = ({ results, onDownloadPDF, onStartNew, logoSrc }: ResultsViewProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-xl border-2" style={{ borderColor: COLORS.bizGreen }}>
        <CardHeader 
          className="text-white"
          style={{ 
            background: `linear-gradient(to right, ${COLORS.bizBlue}, ${COLORS.bizGreen})` 
          }}
        >
          <CardTitle className="text-2xl flex items-center gap-2">
            <CheckCircle2 className="h-8 w-8" />
            Assessment Complete - Your HR Maturity Results
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
          {/* Overall Score */}
          <div 
            className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border-2"
            style={{ borderColor: COLORS.bizLime }}
          >
            <div className="text-center">
              <div 
                className="text-5xl font-bold mb-2"
                style={{ color: COLORS.bizLime }}
              >
                {results.percentage}%
              </div>
              <div className="text-sm text-muted-foreground">
                Overall HR Maturity Score
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                ({results.totalScore} out of {results.maxScore} points)
              </div>
            </div>
          </div>

          {/* Maturity Level */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3" style={{ color: COLORS.bizBlue }}>
              Your HR Maturity Level
            </h3>
            <Alert 
              className="border"
              style={{ 
                backgroundColor: `${COLORS.bizCopper}15`,
                borderColor: COLORS.bizCopper
              }}
            >
              <AlertDescription 
                className="text-lg font-medium"
                style={{ color: COLORS.bizCopper }}
              >
                {results.maturityLevel}
              </AlertDescription>
            </Alert>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              {results.levelDescription}
            </p>
          </div>

          {/* Pillar Scores */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4" style={{ color: COLORS.bizBlue }}>
              Scores by HR Pillar
            </h3>
            <div className="space-y-4">
              {Object.entries(results.pillarScores).map(([pillar, scores]) => {
                const percentage = (scores.score / scores.max) * 100;
                return (
                  <div key={pillar} className="bg-white p-4 rounded-lg border border-border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-foreground">{pillar}</span>
                      <span className="font-semibold" style={{ color: COLORS.bizLime }}>
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: COLORS.bizLime
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommendations */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4" style={{ color: COLORS.bizBlue }}>
              Recommended Next Steps
            </h3>
            <div className="space-y-3">
              {results.recommendations.map((rec, index) => (
                <div 
                  key={index} 
                  className="flex gap-3 p-4 bg-white rounded-lg shadow-sm"
                  style={{ borderLeft: `4px solid ${COLORS.bizLime}` }}
                >
                  <div 
                    className="flex-shrink-0 w-6 h-6 rounded-full text-white flex items-center justify-center text-sm font-semibold"
                    style={{ backgroundColor: COLORS.bizLime }}
                  >
                    {index + 1}
                  </div>
                  <p className="text-foreground leading-relaxed">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button 
              onClick={onDownloadPDF}
              className="px-8 py-6 text-lg text-white"
              style={{ backgroundColor: COLORS.bizBlue }}
            >
              <Download className="mr-2 h-5 w-5" />
              Download PDF Report
            </Button>
            <Button 
              onClick={onStartNew}
              variant="outline"
              className="px-8 py-6 text-lg"
              style={{ 
                borderColor: COLORS.bizGreen,
                color: COLORS.bizGreen
              }}
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              Start New Assessment
            </Button>
          </div>

          {/* Footer Disclaimer */}
          <div className="mt-8 pt-6 border-t-2 border-border">
            <p className="text-xs text-muted-foreground leading-relaxed text-center">
              <strong>Disclaimer:</strong> This assessment provides a general overview of your HR maturity based on your responses. 
              It is not a substitute for professional HR consultation or legal advice. Results are indicative and should be used as a 
              starting point for discussion with qualified HR professionals.
            </p>
            <p className="text-xs text-muted-foreground/70 text-center mt-3">
              © 2026 BizHealth.ai | Your Business Health Analyst | www.bizhealth.ai
            </p>
          </div>
        </CardContent>
      </Card>

      {/* CTA Section for Full Business Health Assessment */}
      <Card 
        className="mt-8 shadow-xl border-2 overflow-hidden"
        style={{ borderColor: COLORS.bizBlue }}
      >
        <div 
          className="p-6 sm:p-8 text-white"
          style={{ 
            background: `linear-gradient(135deg, ${COLORS.bizBlue} 0%, #3a3b7a 50%, ${COLORS.bizGreen} 100%)` 
          }}
        >
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Assess Your Entire Business Health?
            </h3>
            <p className="text-white/90 mb-6 leading-relaxed">
              HR is just one pillar of a healthy business. Our comprehensive Business Health Assessment 
              evaluates all 10 critical areas including financial health, operations, marketing, technology, 
              and more to give you a complete picture of your business wellness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/business-health-assessment">
                <Button 
                  size="lg"
                  className="px-8 py-6 text-lg font-semibold bg-white hover:bg-white/90"
                  style={{ color: COLORS.bizBlue }}
                >
                  Take Full Business Health Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
            <p className="text-white/70 text-sm mt-4">
              Comprehensive evaluation across Finance, HR, Operations, Sales, Marketing & more
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HumanResourcesMaturityAssessment;
