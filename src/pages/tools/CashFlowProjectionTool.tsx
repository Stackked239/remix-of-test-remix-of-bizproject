import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { RotateCcw, ArrowLeft, FileDown, Banknote, CheckCircle, BarChart3, FileText, Zap } from 'lucide-react';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from '@/components/GlobalFooter';
import PromotionalBanner from '@/components/PromotionalBanner';
import CashFlowInputForm from '@/components/cashflow-calculator/CashFlowInputForm';
import CashFlowResults from '@/components/cashflow-calculator/CashFlowResults';
import CashFlowChart from '@/components/cashflow-calculator/CashFlowChart';
import CashFlowTable from '@/components/cashflow-calculator/CashFlowTable';
import CashFlowInsights from '@/components/cashflow-calculator/CashFlowInsights';
import CashFlowSidebar from '@/components/cashflow-calculator/CashFlowSidebar';
import LeadCaptureModal from '@/components/cashflow-calculator/LeadCaptureModal';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { CashFlowInputs, OneTimeItem, calculateProjection } from '@/lib/cashFlowCalculations';
import { generateCashFlowPdf } from '@/lib/cashFlowPdfExport';

const CashFlowProjectionTool = () => {
  const now = new Date();
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const [inputs, setInputs] = useState<CashFlowInputs>({
    businessName: '',
    startingCash: 0,
    startMonth: now.getMonth(),
    startYear: now.getFullYear(),
    monthlyRevenue: 0,
    growthRate: 0,
    otherIncome: 0,
    fixedExpenses: 0,
    variableExpensePercent: 30,
    ownersDraw: 0,
    oneTimeItems: []
  });

  const [hasCalculated, setHasCalculated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const result = useMemo(() => calculateProjection(inputs), [inputs]);

  const handleInputChange = (field: keyof CashFlowInputs, value: string | number | OneTimeItem[]) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (inputs.startingCash < 0) newErrors.startingCash = 'Must be 0 or greater';
    if (inputs.monthlyRevenue <= 0) newErrors.monthlyRevenue = 'Must be greater than 0';
    if (inputs.fixedExpenses < 0) newErrors.fixedExpenses = 'Must be 0 or greater';
    if (inputs.variableExpensePercent < 0 || inputs.variableExpensePercent > 100) {
      newErrors.variableExpensePercent = 'Must be between 0 and 100';
    }
    if (inputs.growthRate < -50 || inputs.growthRate > 100) {
      newErrors.growthRate = 'Must be between -50% and 100%';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validateInputs()) {
      toast.error('Please fix the errors before calculating');
      return;
    }
    setHasCalculated(true);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
    toast.success('Projection calculated!');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to start over? This will clear all your inputs.')) {
      setInputs({
        businessName: '',
        startingCash: 0,
        startMonth: now.getMonth(),
        startYear: now.getFullYear(),
        monthlyRevenue: 0,
        growthRate: 0,
        otherIncome: 0,
        fixedExpenses: 0,
        variableExpensePercent: 30,
        ownersDraw: 0,
        oneTimeItems: []
      });
      setHasCalculated(false);
      setErrors({});
      toast.success('Calculator reset');
    }
  };

  const handleDownloadClick = () => {
    if (!result.isValid) {
      toast.error('Please calculate your projection first');
      return;
    }
    setShowModal(true);
  };

  const handleLeadSubmit = async (data: { name: string; email: string; businessName: string }) => {
    setIsGeneratingPdf(true);
    try {
      const updatedInputs = { ...inputs, businessName: data.businessName || inputs.businessName };
      await generateCashFlowPdf({ inputs: updatedInputs, result, userName: data.name, userEmail: data.email });
      toast.success('PDF report downloaded successfully!');
      setShowModal(false);
    } catch (error) {
      toast.error('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const isFormValid = inputs.monthlyRevenue > 0 && inputs.fixedExpenses >= 0;

  return (
    <>
      <SEO 
        title="Cash Flow Projection Tool | Free 12-Month Forecast | BizHealth.ai"
        description="Forecast your business cash flow for the next 12 months. See when money comes in, when it goes out, and whether you'll have enough. Free calculator for SMBs."
        keywords="cash flow projection, cash flow forecast, 12-month cash flow, cash flow calculator, small business cash flow, cash flow management, business cash forecast, cash runway, cash flow planning"
        canonical="https://bizhealth.ai/biztools/toolbox/cash-flow-projection-tool"
        ogImage="https://bizhealth.ai/og-images/og-cashflow-tool.jpg"
      />
      <StructuredData type="organization" />

      <PromotionalBanner />
      <GlobalNavigation />

      <main className="min-h-screen bg-gradient-to-b from-biz-cream to-background">
        {/* Hero Header */}
        <section className="pt-40 pb-12 md:pb-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #242553 0%, #363688 100%)' }}>
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,50 Q25,30 50,50 T100,50 V100 H0 Z" fill="currentColor" className="text-white" />
            </svg>
          </div>
          <div className="absolute top-20 right-10 w-64 h-64 bg-biz-teal/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-48 h-48 bg-biz-green/15 rounded-full blur-2xl" />
          
          <div className="container max-w-6xl mx-auto px-4 text-center relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 text-biz-lime text-sm font-semibold rounded-full mb-4">
              <Banknote className="w-4 h-4 text-biz-lime" />
              Free Business Tool
            </span>
            <h1 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-white">
              Cash Flow Projection Tool
            </h1>
            <p className="font-open-sans text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-6">
              Forecast your business cash flow for the next 12 months. See when money comes in, when it goes out, and whether you'll have enough to cover your obligations.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-white/80">
                <CheckCircle className="w-3.5 h-3.5 text-biz-citrine" /> 100% Free
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-white/80">
                <CheckCircle className="w-3.5 h-3.5 text-biz-citrine" /> 12-Month Forecast
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-white/80">
                <CheckCircle className="w-3.5 h-3.5 text-biz-citrine" /> Visual Chart
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-white/80">
                <CheckCircle className="w-3.5 h-3.5 text-biz-citrine" /> PDF Report
              </span>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 md:py-12">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="mb-6">
              <Link to="/biztools/toolbox" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-biz-navy transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to BizTools
              </Link>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column - 60% */}
              <div className="lg:w-[60%] space-y-8">
                <CashFlowInputForm inputs={inputs} onInputChange={handleInputChange} errors={errors} />
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Button
                    onClick={handleCalculate}
                    disabled={!isFormValid}
                    className="flex-1 min-w-48 bg-biz-citrine text-biz-navy hover:bg-biz-citrine/90 font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Generate 12-Month Cash Flow Projection
                  </Button>
                  <Button variant="outline" onClick={handleReset} className="gap-2">
                    <RotateCcw className="w-4 h-4" /> Reset
                  </Button>
                </div>

                {/* Results Section */}
                {hasCalculated && result.isValid && (
                  <div ref={resultsRef} className="space-y-8 scroll-mt-8">
                    <CashFlowResults result={result} />
                    <CashFlowChart result={result} />
                    <CashFlowTable result={result} />
                    <CashFlowInsights result={result} />
                    
                    {/* Download Button */}
                    <Button
                      onClick={handleDownloadClick}
                      variant="outline"
                      className="w-full py-5 border-biz-navy text-biz-navy hover:bg-biz-navy hover:text-white"
                    >
                      <FileDown className="w-5 h-5 mr-2" />
                      Download Your 12-Month Cash Flow Report
                    </Button>
                  </div>
                )}
              </div>

              {/* Right Column - 40% */}
              <div className="lg:w-[40%]">
                <div className="lg:sticky lg:top-24">
                  <CashFlowSidebar />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <GlobalFooter />

      <LeadCaptureModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleLeadSubmit}
        businessName={inputs.businessName}
        isLoading={isGeneratingPdf}
      />
    </>
  );
};

export default CashFlowProjectionTool;
