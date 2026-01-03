import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { RotateCcw, ArrowLeft, Printer, Share2, Download } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from '@/components/GlobalFooter';
import PromotionalBanner from '@/components/PromotionalBanner';
import PricingInput from '@/components/pricing-calculator/PricingInput';
import OverheadHelper from '@/components/pricing-calculator/OverheadHelper';
import PricingResults from '@/components/pricing-calculator/PricingResults';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { calculatePricingResults, PricingInputs } from '@/lib/pricingCalculations';
import { generatePricingPdf } from '@/lib/pricingPdfExport';

// Tooltip content as per specification
const tooltips = {
  sellingPrice: (
    <>
      <strong className="text-biz-citrine">💡 What You Charge</strong>
      {"\n\n"}
      This is the price your customer pays for your product or service.
      {"\n\n"}
      <strong>📍 Where to find it:</strong>{"\n"}
      Look at your invoice, menu, price list, or what you quote customers.
      {"\n\n"}
      <strong>📝 Example:</strong>{"\n"}
      If you charge $75 for a lawn care visit, enter 75.{"\n"}
      If you sell a product for $24.99, enter 24.99.
      {"\n\n"}
      <strong>⚠️ Don't include:</strong>{"\n"}
      • Sales tax you collect for the government{"\n"}
      • Tips (if applicable){"\n"}
      • Shipping you pass through at cost
    </>
  ),
  directCost: (
    <>
      <strong className="text-biz-citrine">💡 Your Direct Cost</strong>
      {"\n\n"}
      This is what you pay to make or deliver THIS specific product or service. These costs only happen when you make a sale.
      {"\n\n"}
      <strong>📍 What to include:</strong>{"\n"}
      • Materials and supplies used{"\n"}
      • Products you resell (wholesale cost){"\n"}
      • Labor paid per job (subcontractors, hourly workers){"\n"}
      • Packaging for this item{"\n"}
      • Credit card processing fees (usually 2-3%)
      {"\n\n"}
      <strong>📝 Examples:</strong>{"\n"}
      • Landscaper: Gas, mulch, plants = $18 per job{"\n"}
      • Bakery: Ingredients, box, card fee = $8 per cake{"\n"}
      • Consultant: Nothing direct = $0 (your time is covered elsewhere)
      {"\n\n"}
      <strong>❌ Don't include here:</strong>{"\n"}
      • Rent, utilities, insurance (that's overhead - next field){"\n"}
      • Your own salary{"\n"}
      • Equipment you already own
    </>
  ),
  overheadPerSale: (
    <>
      <strong className="text-biz-citrine">💡 Your Overhead Per Sale</strong>
      {"\n\n"}
      Overhead = the costs of running your business that happen whether you make a sale or not.
      {"\n\n"}
      <strong>To find YOUR overhead per sale:</strong>{"\n"}
      1. Add up monthly costs: rent + utilities + insurance + subscriptions + loan payments{"\n"}
      2. Divide by how many sales you make per month
      {"\n\n"}
      <strong>📝 Example:</strong>{"\n"}
      Monthly overhead: $3,000{"\n"}
      Sales per month: 150{"\n"}
      Overhead per sale: $3,000 ÷ 150 = $20
      {"\n\n"}
      <strong>💭 Why this matters:</strong>{"\n"}
      Many business owners forget about overhead and think they're profitable when they're not. This is the #1 pricing mistake.
      {"\n\n"}
      <strong>🤷 Not sure?</strong>{"\n"}
      • New business: Estimate $10-25 per sale to start{"\n"}
      • Use our helper calculator below to figure it out{"\n"}
      • It's okay to estimate - something is better than nothing!
    </>
  ),
  monthlyUnits: (
    <>
      <strong className="text-biz-citrine">💡 Monthly Sales Volume</strong>
      {"\n\n"}
      How many of this product or service do you expect to sell in a typical month?
      {"\n\n"}
      <strong>📍 Where to find it:</strong>{"\n"}
      • Check last month's sales records{"\n"}
      • Count invoices or transactions{"\n"}
      • Look at your POS or booking system
      {"\n\n"}
      <strong>📝 Examples:</strong>{"\n"}
      • Landscaper with 40 weekly clients: 160 services/month{"\n"}
      • Bakery selling 15 cakes/week: 60 cakes/month{"\n"}
      • Consultant with 4 clients: 4 projects/month
      {"\n\n"}
      <strong>💭 If you're not sure:</strong>{"\n"}
      Start with a conservative estimate. You can always recalculate with different numbers to see various scenarios.
    </>
  ),
};

const FreePricingNetProfitCalculator = () => {
  const [inputs, setInputs] = useState<PricingInputs>({
    sellingPrice: 0,
    directCost: 0,
    overheadPerSale: 0,
    monthlyUnits: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const results = useMemo(() => {
    // Validate inputs
    const newErrors: Record<string, string> = {};
    
    if (inputs.directCost >= inputs.sellingPrice && inputs.sellingPrice > 0 && inputs.directCost > 0) {
      newErrors.directCost = "⚠️ Your cost is higher than your price - you'll lose money on every sale!";
    }
    
    setErrors(newErrors);
    
    return calculatePricingResults(inputs);
  }, [inputs]);

  const handleInputChange = (field: keyof PricingInputs) => (value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to start over? This will clear all your inputs.')) {
      setInputs({
        sellingPrice: 0,
        directCost: 0,
        overheadPerSale: 0,
        monthlyUnits: 0,
      });
      setErrors({});
      toast.success('Calculator reset');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Pricing Analysis - BizHealth.ai',
          text: `Profit per sale: $${results?.netProfitPerUnit.toFixed(2) || 0}`,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Copy link to clipboard
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleDownloadPdf = async () => {
    if (!results) {
      toast.error('Please complete the calculator first');
      return;
    }
    
    try {
      toast.loading('Generating PDF...');
      await generatePricingPdf({ inputs, results });
      toast.dismiss();
      toast.success('PDF downloaded successfully!');
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to generate PDF. Please try again.');
      console.error('PDF generation error:', error);
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Pricing Net Profit Calculator",
    "description": "Free calculator to determine if your product/service pricing is profitable",
    "url": "https://bizhealth.ai/biztools/toolbox/free-pricing-net-profit-calculator",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "publisher": {
      "@type": "Organization",
      "name": "BizHealth.ai",
      "url": "https://bizhealth.ai"
    }
  };

  return (
    <>
      <Helmet>
        <title>Free Pricing Net Profit Calculator | BizHealth.ai</title>
        <meta name="description" content="Find out if your prices actually make you money. Free calculator for small business owners to check profit margins and stop losing money on every sale." />
        <meta name="keywords" content="pricing calculator, profit margin calculator, small business pricing, net profit calculator, pricing strategy tool" />
        <link rel="canonical" href="https://bizhealth.ai/biztools/toolbox/free-pricing-net-profit-calculator" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Free Pricing Net Profit Calculator | BizHealth.ai" />
        <meta property="og:description" content="Find out if your prices actually make you money. Takes 2 minutes." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bizhealth.ai/biztools/toolbox/free-pricing-net-profit-calculator" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Pricing Net Profit Calculator" />
        <meta name="twitter:description" content="Find out if your prices actually make you money." />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <PromotionalBanner />
      <GlobalNavigation />

      <main className="min-h-screen bg-biz-cream print:bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-biz-navy to-[#1a1b3d] text-white pt-40 pb-16" style={{ paddingTop: '180px' }}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center bg-biz-citrine/20 text-biz-citrine px-4 py-1 rounded-full text-sm mb-4">
              <span className="mr-2">🎯</span> Free Tool
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-montserrat mb-4">
              Pricing Net Profit Calculator
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-2 font-montserrat text-biz-citrine">
              Find out if your prices actually make you money
            </p>
            <p className="text-base md:text-lg opacity-70 max-w-2xl mx-auto font-open-sans">
              Enter a few numbers about what you charge and what it costs you. 
              We'll show you exactly how much profit you're making (or losing) on every sale.
            </p>
          </div>
        </section>

        {/* Calculator Card */}
        <section className="max-w-6xl mx-auto px-4 py-8 -mt-8 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden print:shadow-none">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Input Section */}
              <div className="p-6 md:p-8 bg-white border-r border-gray-100 print:hidden">
                <h2 className="text-xl font-bold text-biz-navy font-montserrat mb-6">
                  Enter Your Numbers
                </h2>

                <PricingInput
                  id="sellingPrice"
                  label="What You Charge (Selling Price)"
                  value={inputs.sellingPrice}
                  onChange={handleInputChange('sellingPrice')}
                  placeholder="e.g., 75.00"
                  tooltipContent={tooltips.sellingPrice}
                />

                <PricingInput
                  id="directCost"
                  label="Your Direct Cost (What It Costs You)"
                  value={inputs.directCost}
                  onChange={handleInputChange('directCost')}
                  placeholder="e.g., 25.00"
                  tooltipContent={tooltips.directCost}
                  error={errors.directCost}
                />

                <PricingInput
                  id="overheadPerSale"
                  label="Your Overhead Per Sale"
                  value={inputs.overheadPerSale}
                  onChange={handleInputChange('overheadPerSale')}
                  placeholder="e.g., 12.00"
                  tooltipContent={tooltips.overheadPerSale}
                  helperText={
                    <OverheadHelper onUseValue={handleInputChange('overheadPerSale')} />
                  }
                />

                <PricingInput
                  id="monthlyUnits"
                  label="How Many Will You Sell Per Month?"
                  value={inputs.monthlyUnits}
                  onChange={handleInputChange('monthlyUnits')}
                  placeholder="e.g., 50"
                  tooltipContent={tooltips.monthlyUnits}
                  prefix=""
                  suffix="units"
                  isInteger
                />

                {/* Action Buttons */}
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
              </div>

              {/* Results Section */}
              <div className="p-6 md:p-8 bg-gray-50 print:bg-white">
                <h2 className="text-xl font-bold text-biz-navy font-montserrat mb-6 flex items-center">
                  <span className="mr-2">📊</span> Your Results
                </h2>
                
                <PricingResults results={results} monthlyUnits={inputs.monthlyUnits} />

                {/* Secondary Actions */}
                {results && (
                  <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-200 print:hidden">
                    <Button
                      variant="outline"
                      onClick={handlePrint}
                      className="flex-1"
                    >
                      <Printer className="w-4 h-4 mr-2" />
                      Print
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleDownloadPdf}
                      className="flex-1"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button
                      variant="default"
                      onClick={handleShare}
                      className="flex-1 bg-biz-citrine text-biz-navy hover:bg-biz-citrine/90"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Educational CTA */}
        <section className="max-w-4xl mx-auto px-4 py-12 print:hidden">
          <div className="bg-gradient-to-r from-biz-navy to-[#363775] rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold font-montserrat mb-3">
              📚 Want to Master Pricing Strategy?
            </h2>
            <p className="opacity-90 mb-6 max-w-xl mx-auto font-open-sans">
              This calculator is just the beginning. Learn how to set prices that 
              maximize profit while keeping customers happy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/bizgrowth"
                className="bg-white text-biz-navy px-6 py-3 rounded-lg font-semibold 
                           hover:bg-gray-100 transition-colors"
              >
                Explore BizGrowth Academy →
              </Link>
              <Link 
                to="/biztools/toolbox"
                className="border-2 border-white/30 text-white px-6 py-3 rounded-lg 
                           font-semibold hover:bg-white/10 transition-colors"
              >
                Explore More BizTools
              </Link>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <p className="max-w-3xl mx-auto px-4 pb-12 text-center text-sm text-muted-foreground font-open-sans print:hidden">
          Disclaimer: This calculator provides estimates for educational purposes only. 
          Results should not be considered financial advice. Consult with a qualified 
          accountant or financial advisor for specific guidance on your business finances.
        </p>
      </main>

      <GlobalFooter />

      {/* Print Styles */}
      <style>{`
        @media print {
          .print\\:hidden { display: none !important; }
          .print\\:bg-white { background: white !important; }
          .print\\:shadow-none { box-shadow: none !important; }
        }
      `}</style>
    </>
  );
};

export default FreePricingNetProfitCalculator;
