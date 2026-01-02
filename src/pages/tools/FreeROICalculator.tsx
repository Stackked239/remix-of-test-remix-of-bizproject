import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { RotateCcw, ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from '@/components/GlobalFooter';
import PromotionalBanner from '@/components/PromotionalBanner';
import ScenarioSelector from '@/components/roi-calculator/ScenarioSelector';
import EquipmentForm from '@/components/roi-calculator/EquipmentForm';
import HireForm from '@/components/roi-calculator/HireForm';
import CampaignForm from '@/components/roi-calculator/CampaignForm';
import ResultsDisplay from '@/components/roi-calculator/ResultsDisplay';
import NextSteps from '@/components/roi-calculator/NextSteps';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  type ScenarioType,
  type EquipmentInputs,
  type HireInputs,
  type CampaignInputs,
  calculateEquipmentROI,
  calculateHireROI,
  calculateCampaignROI,
} from '@/lib/roiCalculations';
import { generateROIPdf } from '@/lib/roiPdfExport';

const FreeROICalculator = () => {
  const [scenario, setScenario] = useState<ScenarioType>('equipment');
  
  const [equipmentInputs, setEquipmentInputs] = useState<EquipmentInputs>({
    equipmentCost: 0,
    annualSavings: 0,
    annualRevenue: 0,
    usefulYears: 5,
  });

  const [hireInputs, setHireInputs] = useState<HireInputs>({
    annualSalary: 0,
    expectedRevenue: 0,
    profitMargin: 30,
    onboardingCost: 0,
    payrollBenefits: 25,
    rampUpMonths: 3,
  });

  const [campaignInputs, setCampaignInputs] = useState<CampaignInputs>({
    campaignCost: 0,
    expectedRevenue: 0,
    profitMargin: 35,
    repeatRevenue: 0,
  });

  const result = useMemo(() => {
    switch (scenario) {
      case 'equipment':
        return calculateEquipmentROI(equipmentInputs);
      case 'hire':
        return calculateHireROI(hireInputs);
      case 'campaign':
        return calculateCampaignROI(campaignInputs);
    }
  }, [scenario, equipmentInputs, hireInputs, campaignInputs]);

  const handleReset = () => {
    if (confirm('Are you sure you want to start over? This will clear all your inputs.')) {
      setEquipmentInputs({ equipmentCost: 0, annualSavings: 0, annualRevenue: 0, usefulYears: 5 });
      setHireInputs({ annualSalary: 0, expectedRevenue: 0, profitMargin: 30, onboardingCost: 0, payrollBenefits: 25, rampUpMonths: 3 });
      setCampaignInputs({ campaignCost: 0, expectedRevenue: 0, profitMargin: 35, repeatRevenue: 0 });
      setScenario('equipment');
      toast.success('Calculator reset');
    }
  };

  const handleDownloadPDF = async () => {
    const currentInputs = scenario === 'equipment' 
      ? equipmentInputs 
      : scenario === 'hire' 
        ? hireInputs 
        : campaignInputs;
    
    try {
      await generateROIPdf({
        scenario,
        result,
        inputs: currentInputs,
      });
      toast.success('PDF downloaded successfully!');
    } catch (error) {
      toast.error('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Free ROI Calculator | BizHealth.ai</title>
        <meta name="description" content="Figure out if a new investment makes sense — in plain English, in 5 minutes. Calculate ROI for equipment, new hires, or marketing campaigns." />
        <link rel="canonical" href="https://bizhealth.ai/biztools/toolbox/free-roi-calculator" />
      </Helmet>

      <PromotionalBanner />
      <GlobalNavigation />

      <main className="min-h-screen bg-biz-cream">
        {/* Header */}
        <section className="bg-biz-navy text-white pt-40 pb-12 md:pb-16" style={{ paddingTop: '180px' }}>
          <div className="container max-w-6xl mx-auto px-4 text-center">
            <span className="inline-block px-3 py-1 bg-biz-citrine text-biz-navy text-sm font-semibold rounded-full mb-4">
              Part of BizTools
            </span>
            <h1 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
              ROI Calculator
            </h1>
            <p className="font-montserrat text-xl md:text-2xl text-biz-citrine mb-6">
              Know Your Numbers. Make Better Decisions.
            </p>
            <p className="font-open-sans text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Stop guessing. Calculate your ROI in minutes, not hours.
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-8 md:py-12">
          <div className="container max-w-6xl mx-auto px-4">
            {/* Scenario Selector */}
            <div className="mb-8">
              <h2 className="font-montserrat font-semibold text-biz-navy text-lg mb-4">
                What are you considering?
              </h2>
              <ScenarioSelector selectedScenario={scenario} onSelectScenario={setScenario} />
            </div>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Column */}
              <div className="bg-white rounded-xl shadow-card border border-border p-6 md:p-8">
                <h2 className="font-montserrat font-bold text-biz-navy text-xl mb-6">
                  Enter Your Numbers
                </h2>
                
                {scenario === 'equipment' && (
                  <EquipmentForm inputs={equipmentInputs} onChange={setEquipmentInputs} />
                )}
                {scenario === 'hire' && (
                  <HireForm inputs={hireInputs} onChange={setHireInputs} />
                )}
                {scenario === 'campaign' && (
                  <CampaignForm inputs={campaignInputs} onChange={setCampaignInputs} />
                )}

                <div className="mt-6 pt-6 border-t border-border flex flex-wrap items-center gap-4">
                  <Button 
                    variant="ghost" 
                    onClick={handleReset} 
                    className="text-destructive bg-destructive/10 hover:bg-destructive hover:text-white transition-colors"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Start Over
                  </Button>
                  <Button 
                    variant="ghost" 
                    asChild 
                    className="text-biz-navy bg-biz-navy/5 hover:bg-biz-navy hover:text-white transition-colors"
                  >
                    <Link to="/biztools/toolbox">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Exit, Return to BizTools
                    </Link>
                  </Button>
                </div>

                {/* Helpful Tips Section */}
                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="font-montserrat font-semibold text-biz-navy text-sm mb-3">
                    💡 Quick Tips for Better ROI Analysis
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground font-open-sans">
                    <li className="flex items-start gap-2">
                      <span className="text-biz-citrine font-bold">•</span>
                      <span><strong>Be conservative:</strong> Underestimate revenue and overestimate costs for realistic projections.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-biz-citrine font-bold">•</span>
                      <span><strong>Consider hidden costs:</strong> Training, maintenance, and opportunity costs add up.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-biz-citrine font-bold">•</span>
                      <span><strong>Think long-term:</strong> Some investments pay off slowly but compound over time.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-biz-citrine font-bold">•</span>
                      <span><strong>Compare scenarios:</strong> Run multiple calculations to find your best option.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Results Column */}
              <div className="space-y-6">
                <ResultsDisplay result={result} scenario={scenario} usefulYears={equipmentInputs.usefulYears} />
                {result.recommendation !== "Enter your numbers to see results" && (
                  <NextSteps scenario={scenario} onDownloadPDF={handleDownloadPDF} />
                )}
              </div>
            </div>

            {/* Disclaimer */}
            <p className="mt-12 text-center text-sm text-muted-foreground font-open-sans max-w-3xl mx-auto">
              This calculator provides simplified estimates for planning purposes. Actual results may vary based on your specific situation. For major financial decisions, consult with a financial advisor or accountant. BizHealth.ai is not responsible for business decisions made based on this calculator.
            </p>
          </div>
        </section>
      </main>

      <GlobalFooter />
    </>
  );
};

export default FreeROICalculator;
