import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from '@/components/GlobalFooter';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CheckCircle, 
  ArrowRight, 
  Loader2,
  PartyPopper,
  ClipboardList,
  Clock,
  Mail,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const CheckoutSuccess = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  const sessionId = searchParams.get('session_id');

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
      if (!sessionId || !user) {
        setIsVerifying(false);
        return;
      }

      try {
        // Verify the payment session via Edge Function
        const { data, error } = await supabase.functions.invoke('verify-payment', {
          body: {
            session_id: sessionId,
            user_id: user.id,
          },
        });

        if (error) throw error;

        if (data.verified) {
          setIsVerified(true);
          
          // Create or update order record
          await supabase
            .from('orders')
            .upsert({
              user_id: user.id,
              stripe_session_id: sessionId,
              status: 'completed',
              amount: data.amount,
              product_id: data.product_id,
              completed_at: new Date().toISOString(),
            }, {
              onConflict: 'stripe_session_id',
            });
        }
      } catch (error) {
        console.error('Payment verification error:', error);
      } finally {
        setIsVerifying(false);
      }
    };

    if (user && sessionId) {
      verifyPayment();
    } else if (!authLoading && !user) {
      setIsVerifying(false);
    }
  }, [user, sessionId, authLoading]);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <SEO 
        title="Payment Successful - BizHealth.ai" 
        description="Your payment was successful"
        noindex={true}
      />
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
                Thank you for your purchase. You now have full access to the Business Health Assessment.
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
                        Complete the 87-question assessment to evaluate your business health.
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
                <span>Assessment takes approximately 20-30 minutes to complete</span>
              </div>

              {/* CTA Button */}
              <Button
                size="lg"
                className="bg-biz-green hover:bg-biz-green/90 w-full md:w-auto"
                onClick={() => navigate('/questionnaire')}
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
