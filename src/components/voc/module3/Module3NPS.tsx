import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Calculator, Users, ThumbsUp, Meh, ThumbsDown, Lightbulb, CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Module3NPSProps {
  onView: () => void;
  onCalculatorUsed: () => void;
}

interface NPSResult {
  nps: number;
  promoterPct: number;
  passivePct: number;
  detractorPct: number;
  total: number;
  rating: 'excellent' | 'great' | 'good' | 'needswork' | 'critical';
  interpretation: string;
}

const Module3NPS = ({ onView, onCalculatorUsed }: Module3NPSProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [promoters, setPromoters] = useState<string>('');
  const [passives, setPassives] = useState<string>('');
  const [detractors, setDetractors] = useState<string>('');
  const [result, setResult] = useState<NPSResult | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onView();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [onView]);

  const calculateNPS = () => {
    const p = parseInt(promoters) || 0;
    const pa = parseInt(passives) || 0;
    const d = parseInt(detractors) || 0;
    const total = p + pa + d;

    if (total === 0) return;

    const promoterPct = (p / total) * 100;
    const passivePct = (pa / total) * 100;
    const detractorPct = (d / total) * 100;
    const nps = Math.round(promoterPct - detractorPct);

    let rating: NPSResult['rating'];
    let interpretation: string;

    if (nps > 70) {
      rating = 'excellent';
      interpretation = 'World-class! Your customers are your biggest advocates.';
    } else if (nps >= 50) {
      rating = 'great';
      interpretation = 'Strong loyalty. Most customers would recommend you.';
    } else if (nps >= 30) {
      rating = 'good';
      interpretation = 'Solid foundation with room for improvement.';
    } else if (nps >= 0) {
      rating = 'needswork';
      interpretation = 'More passives than promoters. Focus on converting them.';
    } else {
      rating = 'critical';
      interpretation = 'More unhappy customers than happy. Prioritize immediate fixes.';
    }

    setResult({ nps, promoterPct, passivePct, detractorPct, total, rating, interpretation });
    setHasCalculated(true);
    onCalculatorUsed();
  };

  const resetCalculator = () => {
    setPromoters('');
    setPassives('');
    setDetractors('');
    setResult(null);
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'excellent': return 'text-[hsl(var(--biz-green))]';
      case 'great': return 'text-[hsl(var(--biz-blue))]';
      case 'good': return 'text-[hsl(var(--biz-gold))]';
      case 'needswork': return 'text-orange-500';
      case 'critical': return 'text-red-500';
      default: return 'text-muted-foreground';
    }
  };

  const getRatingBg = (rating: string) => {
    switch (rating) {
      case 'excellent': return 'bg-[hsl(var(--biz-green))]/10 border-[hsl(var(--biz-green))]';
      case 'great': return 'bg-[hsl(var(--biz-blue))]/10 border-[hsl(var(--biz-blue))]';
      case 'good': return 'bg-[hsl(var(--biz-gold))]/10 border-[hsl(var(--biz-gold))]';
      case 'needswork': return 'bg-orange-500/10 border-orange-500';
      case 'critical': return 'bg-red-500/10 border-red-500';
      default: return 'bg-muted';
    }
  };

  const benchmarks = [
    { range: ">70", rating: "Excellent", meaning: "World-class (Apple, Costco territory)" },
    { range: "50-70", rating: "Great", meaning: "Strong loyalty, customers advocate for you" },
    { range: "30-50", rating: "Good", meaning: "Solid foundation, room for improvement" },
    { range: "0-30", rating: "Needs Work", meaning: "More passives than promoters" },
    { range: "<0", rating: "Critical", meaning: "More unhappy customers than happy ones" },
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-4"
        >
          Net Promoter Score (NPS): Will They Recommend You?
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Column: Education */}
          <div className="lg:col-span-3 space-y-8">
            {/* What It Measures */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-foreground mb-3">What It Measures</h3>
              <p className="text-muted-foreground leading-relaxed">
                Overall customer loyalty. Would they recommend your business to someone else? 
                It's the simplest, most predictive metric for long-term growth.
              </p>
            </motion.div>

            {/* The Question */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[hsl(var(--biz-blue))]/5 border border-[hsl(var(--biz-blue))]/20 rounded-xl p-5"
            >
              <h4 className="text-sm font-semibold text-[hsl(var(--biz-blue))] uppercase tracking-wide mb-2">
                The Question
              </h4>
              <p className="text-lg font-medium text-foreground italic">
                "How likely are you to recommend [Your Company] to a friend or colleague?"
              </p>
            </motion.div>

            {/* The Scale */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-foreground mb-4">The Scale (0-10)</h3>
              
              <div className="bg-card border rounded-xl p-5 space-y-4">
                {/* Visual Scale */}
                <div className="flex rounded-lg overflow-hidden">
                  <div className="flex-[7] bg-red-100 dark:bg-red-900/30 py-3 px-2 text-center">
                    <span className="text-xs font-medium text-red-600 dark:text-red-400">0-6</span>
                  </div>
                  <div className="flex-[2] bg-yellow-100 dark:bg-yellow-900/30 py-3 px-2 text-center">
                    <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400">7-8</span>
                  </div>
                  <div className="flex-[2] bg-green-100 dark:bg-green-900/30 py-3 px-2 text-center">
                    <span className="text-xs font-medium text-green-600 dark:text-green-400">9-10</span>
                  </div>
                </div>

                {/* Labels */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-start gap-2">
                    <ThumbsDown className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">Detractors</p>
                      <p className="text-xs text-muted-foreground">Unhappy, may damage reputation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Meh className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">Passives</p>
                      <p className="text-xs text-muted-foreground">Satisfied but vulnerable</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <ThumbsUp className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">Promoters</p>
                      <p className="text-xs text-muted-foreground">Loyal advocates</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Formula */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-muted/50 rounded-lg p-4 font-mono text-center"
            >
              <span className="text-lg text-foreground">NPS = % Promoters − % Detractors</span>
              <p className="text-sm text-muted-foreground mt-2">(Passives are counted but not included in the formula)</p>
            </motion.div>

            {/* Benchmarks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-foreground mb-4">What's a Good Score?</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 font-medium text-muted-foreground">Score</th>
                      <th className="text-left py-2 font-medium text-muted-foreground">Rating</th>
                      <th className="text-left py-2 font-medium text-muted-foreground">What It Means</th>
                    </tr>
                  </thead>
                  <tbody>
                    {benchmarks.map((b, i) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="py-3 font-mono text-foreground">{b.range}</td>
                        <td className="py-3 font-medium text-foreground">{b.rating}</td>
                        <td className="py-3 text-muted-foreground">{b.meaning}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* What NPS Tells/Doesn't Tell */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="bg-[hsl(var(--biz-green))]/5 border border-[hsl(var(--biz-green))]/20 rounded-xl p-5">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[hsl(var(--biz-green))]" />
                  What NPS Tells You
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Overall customer loyalty</li>
                  <li>✓ Likelihood of referrals</li>
                  <li>✓ Long-term relationship health</li>
                  <li>✓ Leading indicator of growth</li>
                </ul>
              </div>
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-xl p-5">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-500" />
                  What NPS Doesn't Tell You
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✗ Why they feel that way</li>
                  <li>✗ What specifically to fix</li>
                  <li>✗ Immediate action items</li>
                </ul>
              </div>
            </motion.div>

            {/* Pro Tip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[hsl(var(--biz-gold))]/10 border-l-4 border-[hsl(var(--biz-gold))] rounded-r-xl p-5"
            >
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-[hsl(var(--biz-gold))] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Pro Tip</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    The follow-up question is where the gold is. The number tells you WHAT. 
                    The reason tells you WHY. <strong>Always ask both:</strong> "What's the main reason for your score?"
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Calculator */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="sticky top-32 bg-card border border-border rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[hsl(var(--biz-blue))]/10 flex items-center justify-center">
                  <Calculator className="h-5 w-5 text-[hsl(var(--biz-blue))]" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Try the Calculation</h3>
                  <p className="text-sm text-muted-foreground">Enter your survey numbers</p>
                </div>
              </div>

              {!result ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      How many gave 9-10? (Promoters)
                    </label>
                    <Input
                      type="number"
                      min="0"
                      placeholder="e.g., 60"
                      value={promoters}
                      onChange={(e) => setPromoters(e.target.value)}
                      className="bg-background"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Your biggest fans</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      How many gave 7-8? (Passives)
                    </label>
                    <Input
                      type="number"
                      min="0"
                      placeholder="e.g., 25"
                      value={passives}
                      onChange={(e) => setPassives(e.target.value)}
                      className="bg-background"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Satisfied but not enthusiastic</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      How many gave 0-6? (Detractors)
                    </label>
                    <Input
                      type="number"
                      min="0"
                      placeholder="e.g., 15"
                      value={detractors}
                      onChange={(e) => setDetractors(e.target.value)}
                      className="bg-background"
                    />
                    <p className="text-xs text-muted-foreground mt-1">At risk of leaving or complaining</p>
                  </div>

                  <Button 
                    onClick={calculateNPS}
                    className="w-full bg-[hsl(var(--biz-blue))] hover:bg-[hsl(var(--biz-blue))]/90"
                    disabled={!promoters && !passives && !detractors}
                  >
                    Calculate My NPS
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Don't have survey data yet? Complete this module and come back after your first survey.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Score Display */}
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground mb-1">Your NPS</p>
                    <p className={`text-5xl font-bold ${getRatingColor(result.rating)}`}>
                      {result.nps > 0 ? '+' : ''}{result.nps}
                    </p>
                  </div>

                  {/* Rating Badge */}
                  <div className={`text-center py-2 px-4 rounded-lg border ${getRatingBg(result.rating)}`}>
                    <span className={`text-sm font-semibold uppercase tracking-wide ${getRatingColor(result.rating)}`}>
                      {result.rating === 'excellent' && 'Excellent (>70)'}
                      {result.rating === 'great' && 'Great (50-70)'}
                      {result.rating === 'good' && 'Good (30-50)'}
                      {result.rating === 'needswork' && 'Needs Work (0-30)'}
                      {result.rating === 'critical' && 'Critical (<0)'}
                    </span>
                  </div>

                  {/* Interpretation */}
                  <p className="text-sm text-muted-foreground text-center">
                    {result.interpretation}
                  </p>

                  {/* Breakdown */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Response Breakdown</h4>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground w-20">Promoters</span>
                        <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 rounded-full transition-all duration-500"
                            style={{ width: `${result.promoterPct}%` }}
                          />
                        </div>
                        <span className="text-xs text-foreground w-12 text-right">{Math.round(result.promoterPct)}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground w-20">Passives</span>
                        <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-yellow-500 rounded-full transition-all duration-500"
                            style={{ width: `${result.passivePct}%` }}
                          />
                        </div>
                        <span className="text-xs text-foreground w-12 text-right">{Math.round(result.passivePct)}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground w-20">Detractors</span>
                        <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-red-500 rounded-full transition-all duration-500"
                            style={{ width: `${result.detractorPct}%` }}
                          />
                        </div>
                        <span className="text-xs text-foreground w-12 text-right">{Math.round(result.detractorPct)}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Next Step */}
                  <div className="bg-[hsl(var(--biz-blue))]/5 border border-[hsl(var(--biz-blue))]/20 rounded-lg p-4">
                    <p className="text-sm text-foreground">
                      <strong>Your Next Step:</strong> Ask your detractors why they scored low. 
                      That feedback is your roadmap for improvement.
                    </p>
                  </div>

                  <Button 
                    variant="outline" 
                    onClick={resetCalculator}
                    className="w-full"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset Calculator
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Module3NPS;
