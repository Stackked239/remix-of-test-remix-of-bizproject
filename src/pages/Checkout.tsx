import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from '@/components/GlobalFooter';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  Shield,
  Lock,
  CreditCard,
  Loader2,
  ArrowRight,
  Star,
  Zap,
  FileText,
  BarChart3,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

// Product configuration
const PRODUCTS = {
  essentials: {
    id: 'essentials',
    name: 'Essentials Assessment',
    description: 'Focused 45-question assessment for startups and small businesses',
    price: 99,
    originalPrice: 199,
    pipelineType: 'LIL',
    questionnaireUrl: '/essentials-questionnaire',
    features: [
      '45-question focused assessment',
      'Basic business health score',
      'Core recommendations report',
      'Industry benchmark comparison',
      'PDF download',
      'Email support',
      '30-60-90 day roadmap',
    ],
  },
  growth: {
    id: 'growth',
    name: 'Growth Assessment',
    description: 'Comprehensive 12-dimension analysis with personalized recommendations',
    price: 299,
    originalPrice: 499,
    pipelineType: 'BIG',
    questionnaireUrl: '/questionnaire',
    features: [
      'Complete 87-question assessment',
      '12-dimension health score',
      'Industry benchmark comparison',
      'Executive summary report',
      'Detailed analysis report',
      'Priority action recommendations',
      '90-day transformation roadmap',
      '17+ comprehensive reports',
    ],
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise Assessment',
    description: 'Complete solution for established businesses planning major transitions',
    price: 499,
    originalPrice: 799,
    pipelineType: 'BIG',
    questionnaireUrl: '/questionnaire',
    features: [
      'Comprehensive business assessment',
      'Complete business valuation insights',
      'Exit strategy recommendations',
      'Risk assessment & mitigation plans',
      'Market positioning analysis',
      'Leadership transition planning',
      'Quarterly review sessions',
      'Direct consultant access',
    ],
  },
  // Legacy mappings for backward compatibility
  standard: {
    id: 'growth',
    name: 'Growth Assessment',
    description: 'Comprehensive 12-dimension analysis with personalized recommendations',
    price: 299,
    originalPrice: 499,
    pipelineType: 'BIG',
    questionnaireUrl: '/questionnaire',
    features: [
      'Complete 87-question assessment',
      '12-dimension health score',
      'Industry benchmark comparison',
      'Executive summary report',
      'Detailed analysis report',
      'Priority action recommendations',
      '90-day transformation roadmap',
    ],
  },
  premium: {
    id: 'enterprise',
    name: 'Enterprise Assessment',
    description: 'Complete solution with expert consultation',
    price: 499,
    originalPrice: 799,
    pipelineType: 'BIG',
    questionnaireUrl: '/questionnaire',
    features: [
      'Everything in Growth Assessment',
      '1-hour expert consultation call',
      'Custom implementation plan',
      'Priority email support (30 days)',
      'Quarterly progress check-in',
    ],
  },
};

const Checkout = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  // Support both 'product' and 'tier' query params
  const productId = searchParams.get('tier') || searchParams.get('product') || 'growth';
  const product = PRODUCTS[productId as keyof typeof PRODUCTS] || PRODUCTS.standard;

  const [isProcessing, setIsProcessing] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login', { state: { from: `/checkout?product=${productId}` } });
    }
  }, [user, authLoading, navigate, productId]);

  // Apply promo code
  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;

    // Simple promo code validation (in production, validate against database)
    const validCodes: Record<string, number> = {
      'LAUNCH50': 50,
      'BIZHEALTH20': 20,
      'EARLYBIRD': 100,
    };

    const discountAmount = validCodes[promoCode.toUpperCase()];
    if (discountAmount) {
      setDiscount(discountAmount);
      setPromoApplied(true);
      toast({
        title: 'Promo code applied!',
        description: `$${discountAmount} discount has been applied.`,
      });
    } else {
      toast({
        title: 'Invalid promo code',
        description: 'The promo code you entered is not valid.',
        variant: 'destructive',
      });
    }
  };

  // Handle checkout
  const handleCheckout = async () => {
    if (!user) {
      navigate('/login', { state: { from: `/checkout?product=${productId}` } });
      return;
    }

    setIsProcessing(true);

    try {
      // Create checkout session via Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          product_id: productId,
          user_id: user.id,
          user_email: user.email,
          promo_code: promoApplied ? promoCode : null,
          success_url: `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${window.location.origin}/checkout?product=${productId}`,
        },
      });

      if (error) throw error;

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (stripeError) throw stripeError;

    } catch (error: any) {
      console.error('Checkout error:', error);
      toast({
        title: 'Checkout failed',
        description: error.message || 'Unable to process checkout. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const finalPrice = product.price - discount;

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-biz-green" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <SEO
        title="Checkout - BizHealth.ai"
        description="Complete your purchase and start your business health assessment"
        noindex={true}
      />
      <GlobalNavigation />

      <main className="flex-1 container mx-auto px-4 py-12 pt-24">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-biz-navy mb-3">
              Complete Your Purchase
            </h1>
            <p className="text-lg text-biz-grey">
              You're one step away from transforming your business
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Order Summary - Left Side */}
            <div className="lg:col-span-3 space-y-6">
              {/* Product Card */}
              <Card className="shadow-elegant">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge className="mb-2 bg-biz-green">
                        {productId === 'essentials' ? 'Best for Startups' : productId === 'enterprise' ? 'Best Value' : 'Most Popular'}
                      </Badge>
                      <CardTitle className="text-2xl text-biz-navy">{product.name}</CardTitle>
                      <CardDescription className="text-base mt-1">
                        {product.description}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-biz-grey line-through">${product.originalPrice}</p>
                      <p className="text-3xl font-bold text-biz-navy">${product.price}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-biz-green flex-shrink-0" />
                        <span className="text-sm text-biz-grey">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* What You'll Get */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What You'll Receive</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-biz-navy/10 rounded-lg">
                      <FileText className="h-6 w-6 text-biz-navy" />
                    </div>
                    <div>
                      <h4 className="font-medium text-biz-navy">Comprehensive Health Report</h4>
                      <p className="text-sm text-biz-grey">
                        50+ page detailed analysis of your business across 12 key dimensions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-biz-navy/10 rounded-lg">
                      <BarChart3 className="h-6 w-6 text-biz-navy" />
                    </div>
                    <div>
                      <h4 className="font-medium text-biz-navy">Industry Benchmarks</h4>
                      <p className="text-sm text-biz-grey">
                        See how you compare to similar businesses in your industry
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-biz-navy/10 rounded-lg">
                      <Zap className="h-6 w-6 text-biz-navy" />
                    </div>
                    <div>
                      <h4 className="font-medium text-biz-navy">Action Roadmap</h4>
                      <p className="text-sm text-biz-grey">
                        Prioritized recommendations with a 90-day implementation plan
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Section - Right Side */}
            <div className="lg:col-span-2">
              <Card className="shadow-elegant sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-biz-green" />
                    Secure Checkout
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Order Summary */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-biz-grey">Subtotal</span>
                      <span>${product.price}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Promo Discount</span>
                        <span>-${discount}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-biz-navy">${finalPrice}</span>
                    </div>
                  </div>

                  {/* Promo Code */}
                  <div className="space-y-2">
                    <Label htmlFor="promo">Promo Code</Label>
                    <div className="flex gap-2">
                      <Input
                        id="promo"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter code"
                        disabled={promoApplied}
                      />
                      <Button
                        variant="outline"
                        onClick={handleApplyPromo}
                        disabled={promoApplied || !promoCode.trim()}
                      >
                        Apply
                      </Button>
                    </div>
                    {promoApplied && (
                      <p className="text-sm text-green-600 flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        Promo code applied!
                      </p>
                    )}
                  </div>

                  {/* Checkout Button */}
                  <Button
                    className="w-full bg-biz-green hover:bg-biz-green/90 h-12 text-lg"
                    onClick={handleCheckout}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-5 w-5 mr-2" />
                        Pay ${finalPrice}
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </>
                    )}
                  </Button>

                  {/* Trust Badges */}
                  <div className="space-y-3 pt-4">
                    <div className="flex items-center gap-2 text-sm text-biz-grey">
                      <Shield className="h-4 w-4 text-biz-green" />
                      <span>256-bit SSL encryption</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-biz-grey">
                      <Lock className="h-4 w-4 text-biz-green" />
                      <span>Secure payment via Stripe</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-biz-grey">
                      <Star className="h-4 w-4 text-biz-green" />
                      <span>30-day money-back guarantee</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 rounded-b-lg">
                  <p className="text-xs text-center text-biz-grey w-full">
                    By completing this purchase, you agree to our{' '}
                    <a href="/terms" className="underline hover:text-biz-navy">Terms of Service</a>
                    {' '}and{' '}
                    <a href="/privacy-policy" className="underline hover:text-biz-navy">Privacy Policy</a>.
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Testimonial */}
          <div className="mt-12 max-w-2xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <blockquote className="text-lg text-biz-grey italic mb-4">
              "The BizHealth assessment gave us clarity we never had before. Within 90 days of
              implementing their recommendations, we saw a 23% improvement in operational efficiency."
            </blockquote>
            <p className="font-medium text-biz-navy">— Sarah M., CEO of TechStart Solutions</p>
          </div>
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
};

export default Checkout;
