import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, TrendingUp, ArrowRight, Mail } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: Array<{ value: string; label: string; points: number }>;
}

interface QuizResult {
  category: string;
  title: string;
  description: string;
  action: string;
  scoreRange: string;
}

const LeadershipQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState('');
  const [expandedResult, setExpandedResult] = useState<string | null>(null);

  const questions: Question[] = [
    {
      id: 1,
      question: "How many years have you been in a leadership role?",
      options: [
        { value: "A", label: "Less than 2 years (or aspiring to one)", points: 1 },
        { value: "B", label: "2-5 years", points: 2 },
        { value: "C", label: "6-10 years", points: 3 },
        { value: "D", label: "More than 10 years", points: 4 }
      ]
    },
    {
      id: 2,
      question: "What best describes your primary responsibilities right now?",
      options: [
        { value: "A", label: "Learning basics, supporting teams, or preparing for management", points: 1 },
        { value: "B", label: "Managing day-to-day tasks, building skills, and handling small teams (6-20 people)", points: 2 },
        { value: "C", label: "Overseeing departments, setting goals, and driving performance", points: 3 },
        { value: "D", label: "Shaping company vision, making strategic decisions, and leading at the top level", points: 4 }
      ]
    },
    {
      id: 3,
      question: "What's your biggest leadership challenge currently?",
      options: [
        { value: "A", label: "Gaining confidence or foundational knowledge amid daily fires", points: 1 },
        { value: "B", label: "Balancing tasks while developing influence and efficiency", points: 2 },
        { value: "C", label: "Motivating larger teams or aligning with business goals like KPI tracking", points: 3 },
        { value: "D", label: "Navigating exits, scaling, or high-level risks like market shifts or inflation (top SMB issue per BILL 2025)", points: 4 }
      ]
    },
    {
      id: 4,
      question: "How large is the team or organization you lead/influence?",
      options: [
        { value: "A", label: "None yet, or very small (1-5 people)", points: 1 },
        { value: "B", label: "Small to medium (6-20 people)", points: 2 },
        { value: "C", label: "Medium to large (21-100 people)", points: 3 },
        { value: "D", label: "Enterprise-level (100+ people) or full company oversight (e.g., $100K-$50M revenue)", points: 4 }
      ]
    },
    {
      id: 5,
      question: "What leadership goal excites you most?",
      options: [
        { value: "A", label: "Stepping into my first role or building core skills", points: 1 },
        { value: "B", label: "Refining my approach to lead more effectively in growth stages", points: 2 },
        { value: "C", label: "Expanding impact through strategic team building and EOS/Traction tools", points: 3 },
        { value: "D", label: "Optimizing for long-term success, like sustainable growth or succession planning", points: 4 }
      ]
    }
  ];

  const results: QuizResult[] = [
    {
      category: "emerging",
      title: "Emerging Leader",
      description: "You're at the foundation stage of your leadership journey. Focus on building core competencies, gaining confidence, and learning essential management principles. This is your time to develop self-awareness and establish your leadership identity.",
      action: "Start with our free 'Leadership Basics' module—sign up below for instant access.",
      scoreRange: "5-8"
    },
    {
      category: "developing", 
      title: "Developing Leader",
      description: "You have leadership experience but are ready to refine your skills. Focus on improving team dynamics, communication effectiveness, and operational efficiency. You're building the bridge between managing tasks and leading people.",
      action: "Explore 'Team Efficiency Tracks' at 20% off your first session—enter email for a personalized demo.",
      scoreRange: "9-13"
    },
    {
      category: "executive",
      title: "Executive Leader", 
      description: "You're leading at a strategic level, managing multiple teams and driving organizational outcomes. Your focus should be on advanced leadership competencies, strategic thinking, and creating high-performance cultures that scale.",
      action: "Book a $99 webinar on 'Strategic Alignment'—get notified via email.",
      scoreRange: "14-17"
    },
    {
      category: "csuite",
      title: "Owner/C-Suite",
      description: "You're operating at the highest levels of leadership, making decisions that impact the entire organization. Focus on visionary leadership, succession planning, market positioning, and building sustainable competitive advantages.",
      action: "Upgrade to premium 'C-Suite Mastery' bundle—claim your ROI calculator by subscribing.",
      scoreRange: "18-20"
    }
  ];

  const totalScore = Object.values(answers).reduce((sum, points) => sum + points, 0);

  const getResult = (): QuizResult => {
    if (totalScore >= 5 && totalScore <= 8) return results[0];
    if (totalScore >= 9 && totalScore <= 13) return results[1]; 
    if (totalScore >= 14 && totalScore <= 17) return results[2];
    return results[3];
  };

  const handleAnswerChange = (points: number) => {
    setAnswers({ ...answers, [currentQuestion]: points });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentAnswer = answers[currentQuestion];

  if (showResults) {
    const result = getResult();
    
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="font-montserrat font-bold text-3xl md:text-4xl mb-6 text-biz-navy">
                Your Leadership Path Revealed
              </h3>
              <p className="font-open-sans text-lg text-biz-grey mb-4">
                Based on your responses, here's your personalized leadership development recommendation:
              </p>
              <div className="bg-biz-lime/10 rounded-lg p-4 inline-block">
                <span className="font-montserrat font-semibold text-biz-navy">
                  Your Score: {totalScore}/20 | Category: {result.title}
                </span>
              </div>
            </div>

            <Card className="border-biz-lime/20 shadow-hub-lime mb-8">
              <CardHeader className="bg-biz-lime/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-biz-lime/20 rounded-full p-3">
                    <TrendingUp className="w-6 h-6 text-biz-lime" />
                  </div>
                  <div>
                    <CardTitle className="font-montserrat font-bold text-2xl text-biz-navy">
                      {result.title}
                    </CardTitle>
                    <p className="font-open-sans text-biz-grey">Score Range: {result.scoreRange}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="font-open-sans text-biz-navy mb-6 leading-relaxed">
                  {result.description}
                </p>
                <div className="bg-biz-lime/10 rounded-lg p-4 mb-6">
                  <h4 className="font-montserrat font-semibold text-biz-navy mb-2">
                    Recommended Action:
                  </h4>
                  <p className="font-open-sans text-biz-navy">
                    {result.action}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Email Capture Form */}
            <Card className="border-biz-lime/20 mb-8">
              <CardHeader>
                <CardTitle className="font-montserrat font-bold text-xl text-biz-navy flex items-center gap-2">
                  <Mail className="w-5 h-5 text-biz-lime" />
                  Get Your Personalized Plan
                </CardTitle>
                <p className="font-open-sans text-biz-grey">
                  Enter email for quiz results PDF and exclusive tips.
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 border-biz-grey/20 focus:border-biz-lime"
                  />
                  <Button 
                    className="bg-biz-lime hover:bg-biz-lime/90 text-white font-montserrat font-semibold px-6"
                    onClick={() => {
                      // Handle email submission logic here
                      console.log('Email submitted:', email);
                    }}
                  >
                    Get My Plan
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Other Leadership Paths */}
            <div className="space-y-4">
              <h4 className="font-montserrat font-bold text-xl text-biz-navy mb-4">
                Explore All Leadership Paths
              </h4>
              {results.filter(r => r.category !== result.category).map((otherResult) => (
                <Collapsible key={otherResult.category}>
                  <CollapsibleTrigger asChild>
                    <Card className="border-biz-grey/20 cursor-pointer hover:border-biz-lime/40 transition-colors">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-biz-grey/10 rounded-full p-2">
                              <TrendingUp className="w-4 h-4 text-biz-grey" />
                            </div>
                            <div>
                              <h5 className="font-montserrat font-semibold text-biz-navy">
                                {otherResult.title}
                              </h5>
                              <p className="font-open-sans text-sm text-biz-grey">
                                Score Range: {otherResult.scoreRange}
                              </p>
                            </div>
                          </div>
                          <ChevronDown className="w-5 h-5 text-biz-grey" />
                        </div>
                      </CardContent>
                    </Card>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <Card className="border-biz-grey/20 mt-2">
                      <CardContent className="pt-4">
                        <p className="font-open-sans text-biz-navy mb-4">
                          {otherResult.description}
                        </p>
                        <div className="bg-biz-grey/5 rounded-lg p-3">
                          <p className="font-open-sans text-sm text-biz-grey">
                            {otherResult.action}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>

            {/* CTA Footer */}
            <div className="text-center mt-12 p-8 bg-biz-lime/5 rounded-2xl">
              <h4 className="font-montserrat font-bold text-2xl text-biz-navy mb-4">
                This quiz is more than a starting point—it's your gateway to personalized growth in the BizHealth.ai ecosystem.
              </h4>
              <p className="font-open-sans text-biz-grey mb-6">
                Ready to scale?
              </p>
              <Button 
                size="lg"
                className="bg-biz-lime hover:bg-biz-lime/90 text-white font-montserrat font-semibold text-lg px-8 py-4"
              >
                Start My Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-muted/50" role="main" aria-labelledby="quiz-title">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 id="quiz-title" className="font-montserrat font-bold text-3xl md:text-4xl mb-6 text-biz-navy">
              Unlock Your Leadership Path: A Quick Self-Assessment for BizLeaDeR
            </h3>
            <div className="max-w-3xl mx-auto font-open-sans text-biz-grey leading-relaxed">
              <p className="mb-4">
                As a busy SMB owner or executive juggling cash flow squeezes and scaling uncertainties (affecting <strong>70% of SMBs per SBA 2025</strong>), you know leadership growth isn't one-size-fits-all—it's about meeting you where you are.
              </p>
              <p className="mb-4">
                Our <strong>5-question quiz (under 2 minutes!)</strong> draws from proven frameworks like the Balanced Scorecard and McKinsey 7S Model, boosting engagement by <strong>30%</strong> with tailored recommendations (HubSpot State of Marketing Report 2025).
              </p>
              <p className="mb-4">
                Pinpoint your stage: <strong>Emerging Leader</strong> (building foundations), <strong>Developing Leader</strong> (honing skills amid growth), <strong>Executive Leader</strong> (driving teams and strategy), or <strong>Owner/C-Suite</strong> (navigating high-stakes decisions).
              </p>
              <p>
                Answer honestly—unlock <strong>15-20% performance gains</strong> like our logistics case studies.
              </p>
            </div>
          </div>

          <Card className="border-biz-lime/20 shadow-hub-lime">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <CardTitle className="font-montserrat font-semibold text-xl text-biz-navy">
                  Question {currentQuestion + 1} of {questions.length}
                </CardTitle>
                <div className="text-sm font-open-sans text-biz-grey">
                  {Math.round(progress)}% Complete
                </div>
              </div>
              <Progress 
                value={progress} 
                className="h-3"
                aria-label={`Quiz progress: Question ${currentQuestion + 1} of ${questions.length}`}
              />
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <h4 className="font-montserrat font-semibold text-lg text-biz-navy mb-6">
                  {questions[currentQuestion].question}
                </h4>
                
                <RadioGroup
                  value={currentAnswer?.toString() || ""}
                  onValueChange={(value) => handleAnswerChange(parseInt(value))}
                  className="space-y-4"
                >
                  {questions[currentQuestion].options.map((option, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 rounded-lg border border-biz-grey/20 hover:border-biz-lime/40 hover:bg-biz-lime/5 transition-all">
                      <RadioGroupItem 
                        value={option.points.toString()} 
                        id={`option-${index}`}
                        className="mt-0.5 border-biz-lime text-biz-lime focus:ring-biz-lime"
                      />
                      <Label 
                        htmlFor={`option-${index}`} 
                        className="font-open-sans text-biz-navy cursor-pointer leading-relaxed flex-1"
                      >
                        <span className="font-semibold text-biz-lime mr-2">{option.value})</span>
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="border-biz-grey text-biz-grey hover:bg-biz-grey/10 font-montserrat"
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!currentAnswer}
                  className="bg-biz-lime hover:bg-biz-lime/90 text-white font-montserrat font-semibold px-6"
                >
                  {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LeadershipQuiz;
