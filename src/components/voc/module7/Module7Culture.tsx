import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Eye, Users, Trophy, FlaskConical, Lightbulb, Download, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const PILLARS = [
  {
    id: "purpose",
    title: "Shared Purpose",
    icon: Heart,
    description: "Everyone understands WHY listening matters",
    implementation: "Share customer churn analysis, win/loss reviews, monthly insights",
    metric: "% of team who can articulate why VoC matters"
  },
  {
    id: "transparency",
    title: "Transparency",
    icon: Eye,
    description: "Everyone sees feedback, not just leadership",
    implementation: "Public NPS scores, weekly sentiment review, accessible database",
    metric: "# of team members who access feedback data"
  },
  {
    id: "accountability",
    title: "Accountability",
    icon: Users,
    description: "Tie team metrics to listening and action",
    implementation: "Assign theme owners, track items closed, include in reviews",
    metric: "Average time from feedback to action"
  },
  {
    id: "celebration",
    title: "Celebration",
    icon: Trophy,
    description: "Make wins visible, not just problems",
    implementation: "Share testimonials, highlight improvements, 'customer hero' shoutouts",
    metric: "Team engagement in feedback discussions"
  },
  {
    id: "experimentation",
    title: "Experimentation",
    icon: FlaskConical,
    description: "Failing forward is okay; ignoring feedback is not",
    implementation: "Test changes, share results (good and bad), iterate",
    metric: "# of experiments run per quarter"
  }
];

const ASSESSMENT_QUESTIONS = [
  { pillar: "purpose", question: "Does your team know WHY you listen to customers?", options: ["No", "Some do", "Most do", "All do"] },
  { pillar: "transparency", question: "Can team members access customer feedback?", options: ["No", "Limited", "Most can", "All can"] },
  { pillar: "accountability", question: "Are team goals tied to customer listening?", options: ["No", "Loosely", "Somewhat", "Directly"] },
  { pillar: "celebration", question: "Do you celebrate customer wins publicly?", options: ["Never", "Rarely", "Sometimes", "Often"] },
  { pillar: "experimentation", question: "Do you run customer-informed experiments?", options: ["Never", "Rarely", "Sometimes", "Often"] }
];

const Module7Culture = () => {
  const { toast } = useToast();
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (pillar: string, score: number) => {
    setAssessmentAnswers(prev => ({ ...prev, [pillar]: score }));
  };

  const calculateScore = () => {
    const total = Object.values(assessmentAnswers).reduce((sum, val) => sum + val, 0);
    return total;
  };

  const getStage = (score: number) => {
    if (score <= 5) return { name: "Resistant", desc: "Culture change hasn't started" };
    if (score <= 10) return { name: "Emerging", desc: "Early signs of listening culture" };
    if (score <= 15) return { name: "Developing", desc: "Good foundation, room to grow" };
    return { name: "Mature", desc: "Strong customer-centric culture" };
  };

  const handleDownload = (asset: string) => {
    toast({ title: "Download Started!", description: `${asset} is downloading.` });
  };

  return (
    <section id="culture" className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-[hsl(var(--biz-navy))]/15 text-[hsl(var(--biz-navy))] text-sm font-medium mb-4">
            Section 03
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Building Customer-Centric Culture
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            You have a VoC system. But does your team believe in it? Companies with customer-centric cultures see 2.5x faster revenue growth.
          </p>
        </div>

        {/* Why Culture Change is Hard */}
        <div className="bg-[hsl(var(--biz-gold))]/20 border border-[hsl(var(--biz-gold))]/40 rounded-xl p-6 mb-8">
          <h3 className="font-bold text-foreground mb-4">Common Cultural Barriers:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              '"We know what customers want" (not listening)',
              '"They\'ll just ask for free stuff" (dismissive)',
              '"We\'re too small for formal feedback" (passive)',
              '"It\'s customer service\'s job" (siloed)'
            ].map((barrier, idx) => (
              <div key={idx} className="flex items-center gap-2 text-foreground">
                <span className="text-[hsl(var(--biz-gold))]">⚠️</span>
                {barrier}
              </div>
            ))}
          </div>
        </div>

        {/* 5 Pillars */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-foreground mb-6">The 5 Pillars of Customer-Centric Culture</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              const isSelected = selectedPillar === pillar.id;
              
              return (
                <motion.button
                  key={pillar.id}
                  onClick={() => setSelectedPillar(isSelected ? null : pillar.id)}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    isSelected 
                      ? 'border-[hsl(var(--biz-navy))] bg-[hsl(var(--biz-navy))]/5' 
                      : 'border-border bg-card hover:border-muted-foreground/30'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-[hsl(var(--biz-navy))]/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-[hsl(var(--biz-navy))]" />
                  </div>
                  <h4 className="font-medium text-foreground text-sm">{pillar.title}</h4>
                </motion.button>
              );
            })}
          </div>

          {selectedPillar && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-6 bg-card border rounded-xl"
            >
              {(() => {
                const pillar = PILLARS.find(p => p.id === selectedPillar)!;
                const Icon = pillar.icon;
                return (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className="w-6 h-6 text-[hsl(var(--biz-navy))]" />
                      <h4 className="text-lg font-bold text-foreground">{pillar.title}</h4>
                    </div>
                    <p className="text-muted-foreground mb-4">{pillar.description}</p>
                    <div className="space-y-2">
                      <p className="text-sm"><strong>How to implement:</strong> {pillar.implementation}</p>
                      <p className="text-sm"><strong>Measure:</strong> {pillar.metric}</p>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          )}
        </div>

        {/* Culture Assessment */}
        <div className="bg-card border-2 border-[hsl(var(--biz-navy))]/30 rounded-xl p-6 md:p-8 mb-8">
          <h3 className="text-xl font-bold text-foreground mb-6">Culture Assessment Tool</h3>
          
          <div className="space-y-6">
            {ASSESSMENT_QUESTIONS.map((q, idx) => (
              <div key={idx}>
                <p className="font-medium text-foreground mb-3">{q.question}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {q.options.map((option, optIdx) => (
                    <Button
                      key={optIdx}
                      variant={assessmentAnswers[q.pillar] === optIdx ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleAnswer(q.pillar, optIdx)}
                      className={assessmentAnswers[q.pillar] === optIdx ? "bg-[hsl(var(--biz-navy))] text-white" : ""}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {Object.keys(assessmentAnswers).length === 5 && (
            <div className="mt-6 pt-6 border-t">
              <Button 
                onClick={() => setShowResults(true)}
                className="bg-[hsl(var(--biz-green))] hover:bg-[hsl(var(--biz-green))]/90 text-white"
              >
                See My Results
              </Button>

              {showResults && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-6 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {getStage(calculateScore()).name}
                      </p>
                      <p className="text-muted-foreground">{getStage(calculateScore()).desc}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-[hsl(var(--biz-navy))]">{calculateScore()}/15</p>
                      <p className="text-sm text-muted-foreground">Score</p>
                    </div>
                  </div>
                  <Progress value={(calculateScore() / 15) * 100} className="h-2" />
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* Key Takeaway */}
        <div className="bg-[hsl(var(--biz-gold))]/20 border border-[hsl(var(--biz-gold))]/40 rounded-xl p-5 mb-8">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-[hsl(var(--biz-gold))] flex-shrink-0 mt-0.5" />
            <p className="text-foreground">
              <strong>Key Takeaway:</strong> Culture eats strategy for breakfast. A VoC system without cultural buy-in is just a database of ignored complaints.
            </p>
          </div>
        </div>

        {/* Downloads */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Culture Diagnostic", format: "PDF + Excel" },
            { title: "30-Day Kickstart Checklist", format: "PDF" },
            { title: "Team Meeting Agendas", format: "PDF" }
          ].map((asset) => (
            <Button
              key={asset.title}
              variant="outline"
              onClick={() => handleDownload(asset.title)}
              className="justify-start gap-2 h-auto py-3"
            >
              <Download className="w-4 h-4 text-[hsl(var(--biz-green))]" />
              <div className="text-left">
                <p className="font-medium">{asset.title}</p>
                <p className="text-xs text-muted-foreground">{asset.format}</p>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Module7Culture;
