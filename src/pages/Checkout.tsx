import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CreditCard, Check, ArrowLeft, Shield } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from '@/components/GlobalFooter';
import SEO from '@/components/SEO';

const TIER_PRICING = {
  essentials: { price: 99, originalPrice: 199, name: 'Essentials', questions: 50, reports: "Owner's Report", savings: 100 },
  growth: { price: 299, originalPrice: 499, name: 'Growth', questions: 75, reports: 'Comprehensive + Bundles', savings: 200 },
  enterprise: { price: 499, originalPrice: 799, name: 'Enterprise', questions: 'Comprehensive', reports: 'All Reports + Team Access', savings: 300 }
};

const ADD_ONS = {
  executive_report: { price: 79, name: 'Executive Report' },
  managers_report: { price: 49, name: "Manager's Report" },
  custom_consultation: { price: 149, name: 'Custom Consultation Call' }
};

const Checkout = () => {
  const { user, loading } = useAuth();
  const [searchParams] = useSearchParams();
  const [selectedTier, setSelectedTier] = useState<keyof typeof TIER_PRICING>('essentials');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToDisclaimer, setAgreedToDisclaimer] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  // Payment form state
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: '',
    city: '',
    zipCode: '',
    country: 'US'
  });

  useEffect(() => {
    const tier = searchParams.get('tier');
    if (tier && tier in TIER_PRICING) {
      setSelectedTier(tier as keyof typeof TIER_PRICING);
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-biz-green"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleAddOnToggle = (addOnKey: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnKey) 
        ? prev.filter(key => key !== addOnKey)
        : [...prev, addOnKey]
    );
  };

  const calculateTotal = () => {
    const tierPrice = TIER_PRICING[selectedTier].price;
    const addOnPrice = selectedAddOns.reduce((total, key) => 
      total + ADD_ONS[key as keyof typeof ADD_ONS].price, 0
    );
    return tierPrice + addOnPrice;
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setProcessing(true);

    try {
      // TODO: Implement Stripe payment processing
      console.log('Processing payment:', {
        tier: selectedTier,
        addOns: selectedAddOns,
        total: calculateTotal(),
        paymentData
      });

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo, show success
      setCurrentStep(3);
    } catch (err) {
      setError('Payment processing failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const progressValue = (currentStep / 3) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO 
        title="Checkout - BizHealth.ai"
        description="Complete your business health assessment purchase"
        noindex={true}
      />
      <GlobalNavigation />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-montserrat font-bold text-biz-navy">Checkout</h1>
            <Badge variant="outline" className="font-open-sans">
              Step {currentStep} of 3
            </Badge>
          </div>
          <Progress value={progressValue} className="h-2" />
          <div className="flex justify-between mt-2 text-sm font-open-sans text-biz-grey">
            <span className={currentStep >= 1 ? 'text-biz-navy font-semibold' : ''}>Select Tier</span>
            <span className={currentStep >= 2 ? 'text-biz-navy font-semibold' : ''}>Payment</span>
            <span className={currentStep >= 3 ? 'text-biz-navy font-semibold' : ''}>Confirmation</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <Card className="shadow-elegant border-border/50">
                <CardHeader>
                  <CardTitle className="font-montserrat text-biz-navy">Select Your Plan</CardTitle>
                  <CardDescription className="font-open-sans">
                    Choose the assessment tier that best fits your business needs
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(TIER_PRICING).map(([key, tier]) => (
                    <div
                      key={key}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedTier === key 
                          ? 'border-biz-green bg-biz-green/5' 
                          : 'border-border/50 hover:border-biz-green/50'
                      }`}
                      onClick={() => setSelectedTier(key as keyof typeof TIER_PRICING)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-montserrat font-semibold text-biz-navy">{tier.name}</h3>
                          <p className="text-sm text-biz-grey font-open-sans">
                            {tier.questions} questions • {tier.reports}
                          </p>
                          <div className="mt-1">
                            <span className="inline-block bg-warning/10 border border-warning px-2 py-0.5 rounded text-xs text-warning font-semibold">
                              ⏰ Save ${tier.savings}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-biz-grey line-through font-open-sans">
                            ${tier.originalPrice}
                          </div>
                          <div className="text-2xl font-montserrat font-bold text-biz-navy">
                            ${tier.price}
                          </div>
                          {selectedTier === key && (
                            <Check className="h-5 w-5 text-biz-green ml-auto mt-1" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  <Separator />

                  <div>
                    <h3 className="font-montserrat font-semibold text-biz-navy mb-4">Add-Ons</h3>
                    <div className="space-y-3">
                      {Object.entries(ADD_ONS).map(([key, addOn]) => (
                        <div key={key} className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              id={key}
                              checked={selectedAddOns.includes(key)}
                              onCheckedChange={() => handleAddOnToggle(key)}
                            />
                            <Label htmlFor={key} className="font-open-sans cursor-pointer">
                              {addOn.name}
                            </Label>
                          </div>
                          <span className="font-montserrat font-semibold text-biz-navy">
                            +${addOn.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" asChild>
                      <a href="/pricing">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Pricing
                      </a>
                    </Button>
                    <Button 
                      onClick={() => setCurrentStep(2)}
                      className="bg-biz-green hover:bg-biz-green/90 text-white font-montserrat"
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <Card className="shadow-elegant border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-montserrat text-biz-navy">
                    <CreditCard className="h-5 w-5" />
                    Payment Information
                  </CardTitle>
                  <CardDescription className="font-open-sans">
                    Enter your payment details to complete your purchase
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {error && (
                    <Alert variant="destructive" className="mb-6">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="cardNumber" className="font-open-sans font-medium">
                          Card Number
                        </Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={paymentData.cardNumber}
                          onChange={(e) => setPaymentData(prev => ({ ...prev, cardNumber: e.target.value }))}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="expiryDate" className="font-open-sans font-medium">
                          Expiry Date
                        </Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={paymentData.expiryDate}
                          onChange={(e) => setPaymentData(prev => ({ ...prev, expiryDate: e.target.value }))}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="cvv" className="font-open-sans font-medium">
                          CVV
                        </Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={paymentData.cvv}
                          onChange={(e) => setPaymentData(prev => ({ ...prev, cvv: e.target.value }))}
                          required
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <Label htmlFor="cardholderName" className="font-open-sans font-medium">
                          Cardholder Name
                        </Label>
                        <Input
                          id="cardholderName"
                          placeholder="John Doe"
                          value={paymentData.cardholderName}
                          onChange={(e) => setPaymentData(prev => ({ ...prev, cardholderName: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms"
                          checked={agreedToTerms}
                          onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                          required
                        />
                        <Label htmlFor="terms" className="text-sm font-open-sans text-biz-grey cursor-pointer">
                          I agree to the{' '}
                          <a href="/terms" className="text-biz-navy hover:text-biz-green transition-colors" target="_blank" rel="noopener noreferrer">
                            Terms of Service
                          </a>{' '}
                          and{' '}
                          <a href="/privacy" className="text-biz-navy hover:text-biz-green transition-colors" target="_blank" rel="noopener noreferrer">
                            Privacy Policy
                          </a>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="disclaimer"
                          checked={agreedToDisclaimer}
                          onCheckedChange={(checked) => setAgreedToDisclaimer(checked === true)}
                          required
                        />
                        <Label htmlFor="disclaimer" className="text-sm font-open-sans text-biz-grey cursor-pointer">
                          I understand this assessment provides insights and recommendations, not professional advice
                        </Label>
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button 
                        type="button"
                        variant="outline" 
                        onClick={() => setCurrentStep(1)}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                      </Button>
                      <Button 
                        type="submit"
                        disabled={processing || !agreedToTerms || !agreedToDisclaimer}
                        className="bg-biz-green hover:bg-biz-green/90 text-white font-montserrat"
                      >
                        {processing ? 'Processing...' : `Pay $${calculateTotal()}`}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {currentStep === 3 && (
              <Card className="shadow-elegant border-border/50 text-center">
                <CardContent className="pt-8">
                  <div className="w-16 h-16 bg-biz-green rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-montserrat font-bold text-biz-navy mb-4">
                    Payment Successful!
                  </h2>
                  <p className="text-biz-grey font-open-sans mb-6">
                    Thank you for your purchase. You'll receive a confirmation email shortly.
                  </p>
                  <Button asChild className="bg-biz-green hover:bg-biz-green/90 text-white font-montserrat">
                    <a href="/onboarding">Start Your Assessment</a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <Card className="shadow-elegant border-border/50 sticky top-8">
              <CardHeader>
                <CardTitle className="font-montserrat text-biz-navy">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-open-sans">{TIER_PRICING[selectedTier].name} Plan</span>
                  <span className="font-montserrat font-semibold">${TIER_PRICING[selectedTier].price}</span>
                </div>
                
                {selectedAddOns.length > 0 && (
                  <>
                    <Separator />
                    {selectedAddOns.map(key => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="font-open-sans">{ADD_ONS[key as keyof typeof ADD_ONS].name}</span>
                        <span className="font-montserrat">${ADD_ONS[key as keyof typeof ADD_ONS].price}</span>
                      </div>
                    ))}
                  </>
                )}
                
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span className="font-montserrat">Total</span>
                  <span className="font-montserrat text-biz-navy">${calculateTotal()}</span>
                </div>
                
                <div className="pt-4 text-xs text-biz-grey font-open-sans">
                  <Shield className="h-4 w-4 inline mr-1" />
                  Secure payment processing
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <GlobalFooter />
    </div>
  );
};

export default Checkout;