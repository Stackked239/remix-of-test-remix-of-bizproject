import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from '@/components/GlobalFooter';
import PromotionalBanner from '@/components/PromotionalBanner';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  CheckCircle,
  ArrowRight,
  Loader2,
  PartyPopper,
  ClipboardList,
  Clock,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useToast } from '@/hooks/use-toast';

// Tier configuration
const TIER_CONFIG = {
  essentials: {
    name: 'Essentials',
    questions: 45,
    time: '10-15 minutes',
    questionnaireUrl: '/essentials-questionnaire',
    pipelineType: 'LIL',
  },
  growth: {
    name: 'Growth',
    questions: 87,
    time: '20-30 minutes',
    questionnaireUrl: '/questionnaire',
    pipelineType: 'BIG',
  },
  enterprise: {
    name: 'Enterprise',
    questions: 87,
    time: '20-30 minutes',
    questionnaireUrl: '/questionnaire',
    pipelineType: 'BIG',
  },
  // Legacy mappings
  standard: {
    name: 'Growth',
    questions: 87,
    time: '20-30 minutes',
    questionnaireUrl: '/questionnaire',
    pipelineType: 'BIG',
  },
};

const CheckoutSuccess = () => {
  const { user, loading: authLoading, signUp } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const [isVerifying, setIsVerifying] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [purchasedTier, setPurchasedTier] = useState<string>('growth');
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [stripeSessionId, setStripeSessionId] = useState<string>('');

  // Guest account creation state
  const [isGuestCheckout, setIsGuestCheckout] = useState(false);
  const [guestEmail, setGuestEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [accountError, setAccountError] = useState('');

  const sessionId = searchParams.get('session_id');
  const tierFromUrl = searchParams.get('tier');

  // Get tier config
  const tierConfig = TIER_CONFIG[purchasedTier as keyof typeof TIER_CONFIG] || TIER_CONFIG.growth;

  useEffect(() => {
    // Trigger confetti on mount
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setIsVerifying(false);
        setIsVerified(false);
        return;
      }

      try {
        // Verify the payment session via Edge Function
        const { data, error } = await supabase.functions.invoke('verify-payment', {
          body: {
            session_id: sessionId,
            user_id: user?.id || null,
          },
        });

        if (error) throw error;

        if (data.verified) {
          setIsVerified(true);

          // Get the tier from the payment data or URL
          const tier = data.product_id || tierFromUrl || 'growth';
          setPurchasedTier(tier);
          setPaymentAmount(data.amount || 0);
          setStripeSessionId(sessionId);

          // Check if this was a guest checkout
          if (data.is_guest) {
            setIsGuestCheckout(true);
            setGuestEmail(data.customer_email || '');
          } else if (user) {
            // Logged-in user - create order immediately
            await supabase
              .from('orders')
              .upsert({
                user_id: user.id,
                stripe_session_id: sessionId,
                status: 'completed',
                amount: data.amount,
                product_id: tier,
                plan_type: tier,
                completed_at: new Date().toISOString(),
              }, {
                onConflict: 'stripe_session_id',
              });

            // Also update user's profile with their purchased plan
            await supabase
              .from('profiles')
              .upsert({
                id: user.id,
                plan_type: tier,
                has_paid: true,
                updated_at: new Date().toISOString(),
              }, {
                onConflict: 'id',
              });
          }
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        // Do NOT grant access if verification fails - security requirement
        setIsVerified(false);
      } finally {
        setIsVerifying(false);
      }
    };

    // Verify payment for both logged-in users and guests
    if (sessionId && (!authLoading || !user)) {
      verifyPayment();
    } else if (!sessionId) {
      setIsVerifying(false);
      setIsVerified(false);
    }
  }, [user, sessionId, authLoading, tierFromUrl]);

  const handleStartAssessment = () => {
    navigate(tierConfig.questionnaireUrl);
  };

  // Handle guest account creation
  const handleCreateAccount = async () => {
    setAccountError('');

    // Validate password
    if (password.length < 8) {
      setAccountError('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      setAccountError('Passwords do not match');
      return;
    }

    setIsCreatingAccount(true);

    try {
      // Create the account using Supabase Auth
      const { error: signUpError } = await signUp(guestEmail, password, {
        first_name: '',
        last_name: '',
      });

      if (signUpError) {
        // Check for specific error types
        if (signUpError.message?.includes('already registered')) {
          setAccountError('An account with this email already exists. Please log in instead.');
          return;
        }
        throw signUpError;
      }

      // Wait a moment for the auth state to update
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get the newly created user
      const { data: { user: newUser } } = await supabase.auth.getUser();

      if (newUser) {
        // Create the order record linked to the new user
        await supabase
          .from('orders')
          .upsert({
            user_id: newUser.id,
            stripe_session_id: stripeSessionId,
            status: 'completed',
            amount: paymentAmount,
            product_id: purchasedTier,
            plan_type: purchasedTier,
            completed_at: new Date().toISOString(),
          }, {
            onConflict: 'stripe_session_id',
          });

        // Update the user's profile
        await supabase
          .from('profiles')
          .upsert({
            id: newUser.id,
            plan_type: purchasedTier,
            has_paid: true,
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'id',
          });

        toast({
          title: 'Account created!',
          description: 'Your account has been created successfully.',
        });

        // Mark as no longer guest checkout so the UI updates
        setIsGuestCheckout(false);

        // Navigate to the questionnaire
        navigate(tierConfig.questionnaireUrl);
      }
    } catch (error: any) {
      console.error('Account creation error:', error);
      setAccountError(error.message || 'Failed to create account. Please try again.');
    } finally {
      setIsCreatingAccount(false);
    }
  };

  if (authLoading || isVerifying) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-biz-green mx-auto mb-4" />
          <p className="text-biz-grey">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  // Payment verification failed
  if (!isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex flex-col">
        <SEO
          title="Payment Verification Failed - BizHealth.ai"
          description="We couldn't verify your payment"
          noindex={true}
        />
        <PromotionalBanner />
        <GlobalNavigation />

        <main className="flex-1 container mx-auto px-4 py-12 pt-24">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-elegant text-center">
              <CardHeader className="pb-4">
                <div className="mx-auto mb-4 p-4 bg-amber-100 rounded-full w-fit">
                  <svg className="h-16 w-16 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <CardTitle className="text-3xl font-montserrat text-biz-navy">
                  Payment Verification Issue
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-biz-grey">
                  We couldn't verify your payment. This could be because:
                </p>

                <ul className="text-left text-biz-grey space-y-2 bg-gray-50 rounded-lg p-6">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">•</span>
                    The payment is still being processed
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">•</span>
                    The payment was cancelled or declined
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500">•</span>
                    There was a technical issue
                  </li>
                </ul>

                <p className="text-biz-grey">
                  If you believe this is an error, please contact our support team with your session details.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => navigate('/pricing')}
                  >
                    Return to Pricing
                  </Button>
                  <Button
                    size="lg"
                    className="bg-biz-green hover:bg-biz-green/90"
                    onClick={() => navigate('/contact')}
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <GlobalFooter />
      </div>
    );
  }

  // Guest checkout - show account creation form
  if (isGuestCheckout && isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
        <SEO
          title="Create Your Account - BizHealth.ai"
          description="Complete your account setup to access your assessment"
          noindex={true}
        />
        <PromotionalBanner />
        <GlobalNavigation />

        <main className="flex-1 container mx-auto px-4 py-12 pt-24">
          <div className="max-w-2xl mx-auto">
            {/* Success + Account Creation Card */}
            <Card className="shadow-elegant">
              <CardHeader className="pb-4 text-center">
                <div className="mx-auto mb-4 p-4 bg-green-100 rounded-full w-fit">
                  <CheckCircle className="h-16 w-16 text-green-600" />
                </div>
                <CardTitle className="text-3xl font-montserrat text-biz-navy">
                  Payment Successful!
                </CardTitle>
                <p className="text-biz-grey mt-2">
                  One more step — create a password to access your {tierConfig.name} Assessment
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email Display */}
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                    <Mail className="h-4 w-4 text-biz-grey" />
                    <span className="text-biz-navy font-medium">{guestEmail}</span>
                    <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                  </div>
                </div>

                {/* Password Fields */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Create Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-biz-grey" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="At least 8 characters"
                        className="pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-biz-grey hover:text-biz-navy"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-biz-grey" />
                      <Input
                        id="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                {accountError && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">{accountError}</span>
                  </div>
                )}

                {/* Create Account Button */}
                <Button
                  size="lg"
                  className="w-full bg-biz-green hover:bg-biz-green/90"
                  onClick={handleCreateAccount}
                  disabled={isCreatingAccount || !password || !confirmPassword}
                >
                  {isCreatingAccount ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account & Start Assessment
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </>
                  )}
                </Button>

                {/* Info */}
                <p className="text-xs text-center text-biz-grey">
                  By creating an account, you agree to our{' '}
                  <a href="/terms" className="underline hover:text-biz-navy">Terms of Service</a>
                  {' '}and{' '}
                  <a href="/privacy-policy" className="underline hover:text-biz-navy">Privacy Policy</a>.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>

        <GlobalFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <SEO
        title="Payment Successful - BizHealth.ai"
        description="Your payment was successful"
        noindex={true}
      />
      <PromotionalBanner />
      <GlobalNavigation />

      <main className="flex-1 container mx-auto px-4 py-12 pt-24">
        <div className="max-w-2xl mx-auto">
          {/* Success Card */}
          <Card className="shadow-elegant text-center">
            <CardHeader className="pb-4">
              <div className="mx-auto mb-4 p-4 bg-green-100 rounded-full w-fit">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
              <CardTitle className="text-3xl font-montserrat text-biz-navy">
                Payment Successful!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center gap-2 text-lg text-biz-grey">
                <PartyPopper className="h-5 w-5 text-yellow-500" />
                <span>Welcome to BizHealth!</span>
              </div>

              <p className="text-biz-grey">
                Thank you for your purchase. You now have full access to the {tierConfig.name} Assessment.
              </p>

              {/* Next Steps */}
              <div className="bg-gray-50 rounded-lg p-6 text-left space-y-4">
                <h3 className="font-semibold text-biz-navy flex items-center gap-2">
                  <ClipboardList className="h-5 w-5" />
                  Next Steps
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-biz-green text-white flex items-center justify-center text-sm font-bold">1</span>
                    <div>
                      <p className="font-medium text-biz-navy">Start Your Assessment</p>
                      <p className="text-sm text-biz-grey">
                        Complete the {tierConfig.questions}-question assessment to evaluate your business health.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-biz-green text-white flex items-center justify-center text-sm font-bold">2</span>
                    <div>
                      <p className="font-medium text-biz-navy">Receive Your Reports</p>
                      <p className="text-sm text-biz-grey">
                        After submission, your personalized reports will be generated within minutes.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-biz-green text-white flex items-center justify-center text-sm font-bold">3</span>
                    <div>
                      <p className="font-medium text-biz-navy">Take Action</p>
                      <p className="text-sm text-biz-grey">
                        Use your insights and roadmap to transform your business.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Time Estimate */}
              <div className="flex items-center justify-center gap-2 text-sm text-biz-grey">
                <Clock className="h-4 w-4" />
                <span>Assessment takes approximately {tierConfig.time} to complete</span>
              </div>

              {/* CTA Button */}
              <Button
                size="lg"
                className="bg-biz-green hover:bg-biz-green/90 w-full md:w-auto"
                onClick={handleStartAssessment}
              >
                Start Assessment Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>

              {/* Email Confirmation */}
              <div className="flex items-center justify-center gap-2 text-sm text-biz-grey pt-4 border-t">
                <Mail className="h-4 w-4" />
                <span>A confirmation email has been sent to {user?.email}</span>
              </div>
            </CardContent>
          </Card>

          {/* Support Info */}
          <div className="mt-8 text-center text-sm text-biz-grey">
            <p>
              Questions? Contact us at{' '}
              <a href="mailto:support@bizhealth.ai" className="text-biz-green hover:underline">
                support@bizhealth.ai
              </a>
            </p>
          </div>
        </div>
      </main>
      
      <GlobalFooter />
    </div>
  );
};

export default CheckoutSuccess;
