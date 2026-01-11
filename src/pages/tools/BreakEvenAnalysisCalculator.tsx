import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { RotateCcw, ArrowLeft, FileDown, Calculator, TrendingUp, Target, Zap } from 'lucide-react';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from '@/components/GlobalFooter';
import PromotionalBanner from '@/components/PromotionalBanner';
import BreakEvenInputForm from '@/components/breakeven-calculator/BreakEvenInputForm';
import BreakEvenResults from '@/components/breakeven-calculator/BreakEvenResults';
import BreakEvenInsights from '@/components/breakeven-calculator/BreakEvenInsights';
import BreakEvenDefinitions from '@/components/breakeven-calculator/BreakEvenDefinitions';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  type BreakEvenInputs,
  calculateBreakEven,
} from '@/lib/breakEvenCalculations';
import { generateBreakEvenPdf } from '@/lib/breakEvenPdfExport';

const BreakEvenAnalysisCalculator = () => {
  const [inputs, setInputs] = useState<BreakEvenInputs>({
    monthlyFixedCosts: 0,
    variableCostPerUnit: 0,
    pricePerUnit: 0,
    businessName: '',
  });

  const result = useMemo(() => calculateBreakEven(inputs), [inputs]);

  const handleReset = () => {
    if (confirm('Are you sure you want to start over? This will clear all your inputs.')) {
      setInputs({
        monthlyFixedCosts: 0,
        variableCostPerUnit: 0,
        pricePerUnit: 0,
        businessName: '',
      });
      toast.success('Calculator reset');
    }
  };

  const handleDownloadPDF = async () => {
    if (!result.isValid) {
      toast.error('Please enter valid numbers to generate a report');
      return;
    }
    
    try {
      await generateBreakEvenPdf({ inputs, result });
      toast.success('PDF report downloaded successfully!');
    } catch (error) {
      toast.error('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <>
      <SEO 
        title="Break-Even Analysis Calculator | Free Business Tool | BizHealth.ai"
        description="Calculate your break-even point in minutes. Find exactly how many units you need to sell to cover all costs and start making profit. Free calculator for SMBs."
        keywords="break-even calculator, break-even analysis, break-even point, contribution margin calculator, profitability calculator, small business calculator, fixed costs, variable costs, business profitability"
        canonical="https://bizhealth.ai/biztools/toolbox/breakeven-analysis-calculator"
        ogImage="https://bizhealth.ai/og-images/og-breakeven-calculator.jpg"
      />
      <StructuredData type="organization" />

      <PromotionalBanner />
      <GlobalNavigation />

      <main className="min-h-screen bg-gradient-to-b from-biz-cream to-background">
        {/* Hero Header */}
        <section className="bg-biz-navy text-white pt-40 pb-12 md:pb-16 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-20 right-10 w-64 h-64 bg-biz-teal/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-48 h-48 bg-biz-green/15 rounded-full blur-2xl" />
          
          <div className="container max-w-6xl mx-auto px-4 text-center relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-biz-teal/20 border border-biz-teal/40 text-biz-teal text-sm font-semibold rounded-full mb-4">
              <Calculator className="w-4 h-4" />
              Part of BizTools
            </span>
            <h1 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
              Break-Even Analysis Calculator
            </h1>
            <p className="font-montserrat text-xl md:text-2xl text-biz-citrine mb-4">
              Find Your Path to Profitability
            </p>
            <p className="font-open-sans text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-6">
              Discover the exact point where your business revenue equals expenses. 
              Know your numbers. Make better decisions.
            </p>
            
            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-white/80">
                <Zap className="w-3.5 h-3.5 text-biz-citrine" />
                Instant Results
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-white/80">
                <Target className="w-3.5 h-3.5 text-biz-green" />
                Clear Targets
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-white/80">
                <TrendingUp className="w-3.5 h-3.5 text-biz-teal" />
                Actionable Insights
              </span>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-8 md:py-12">
          <div className="container max-w-6xl mx-auto px-4">
            {/* Main Grid */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Input Column */}
              <div className="bg-white rounded-xl shadow-card border border-border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-biz-copper/10">
                    <Calculator className="w-6 h-6 text-biz-copper" />
                  </div>
                  <h2 className="font-montserrat font-bold text-biz-navy text-xl">
                    Your Business Financials
                  </h2>
                </div>
                
                <BreakEvenInputForm inputs={inputs} onChange={setInputs} />

                {/* Action Buttons */}
                <div className="mt-8 pt-6 border-t border-border space-y-4">
                  <div className="flex flex-wrap gap-3">
                    {result.isValid && (
                      <Button 
                        onClick={handleDownloadPDF}
                        className="flex-1 bg-biz-green hover:bg-biz-green/90 text-white"
                      >
                        <FileDown className="w-4 h-4 mr-2" />
                        Download PDF Report
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      onClick={handleReset}
                      className="text-destructive border-destructive/30 hover:bg-destructive/10"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Start Over
                    </Button>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    asChild 
                    className="w-full text-biz-navy bg-biz-navy/5 hover:bg-biz-navy hover:text-white transition-colors"
                  >
                    <Link to="/biztools/toolbox">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to BizTools Toolbox
                    </Link>
                  </Button>
                </div>

                {/* Help Box */}
                <div className="mt-6 p-4 bg-biz-teal/5 border border-biz-teal/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">💡</span>
                    <h3 className="font-semibold text-biz-navy text-sm">Need Help?</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Gather your recent financial statements or P&L. Don't worry about being 100% accurate—an estimate is perfect for getting started.
                  </p>
                </div>
              </div>

              {/* Results Column */}
              <div className="space-y-6">
                <BreakEvenResults result={result} />
                
                {result.isValid && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">⚠️</span>
                      <h4 className="font-semibold text-amber-800 text-sm">Pro Tips</h4>
                    </div>
                    <ul className="text-sm text-amber-700 space-y-1">
                      <li>• Review your assumptions quarterly as your business grows</li>
                      <li>• Consider seasonal fluctuations in your projections</li>
                      <li>• Track actual sales vs. break-even target weekly</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Insights Section */}
            {result.isValid && (
              <div className="mb-8">
                <BreakEvenInsights inputs={inputs} result={result} />
              </div>
            )}

            {/* Definitions Section */}
            <div className="mb-8">
              <BreakEvenDefinitions />
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-biz-navy to-biz-navy/90 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-biz-teal/20 rounded-full -mr-16 -mt-16 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-biz-green/20 rounded-full -ml-12 -mb-12 blur-2xl" />
              
              <div className="relative z-10">
                <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-3">
                  Ready to Go Deeper?
                </h2>
                <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
                  Break-even analysis is just the beginning. Understand your complete business health 
                  with BizHealth.ai's comprehensive diagnostic assessment.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    asChild
                    size="lg"
                    className="bg-biz-teal hover:bg-biz-teal/90 text-white font-semibold px-8"
                  >
                    <Link to="/how-it-works">
                      Take the Full Assessment
                    </Link>
                  </Button>
                  <Button 
                    asChild
                    variant="outline"
                    size="lg"
                    className="bg-transparent border-white/30 text-white hover:bg-white/10"
                  >
                    <Link to="/biztools/toolbox">
                      Explore More Tools
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="mt-12 text-center text-sm text-muted-foreground font-open-sans max-w-3xl mx-auto">
              This calculator provides simplified estimates for planning purposes. Actual results may vary based on your specific situation. 
              For major financial decisions, consult with a financial advisor or accountant. BizHealth.ai is not responsible for business 
              decisions made based on this calculator.
            </p>
          </div>
        </section>
      </main>

      <GlobalFooter />
    </>
  );
};

export default BreakEvenAnalysisCalculator;
