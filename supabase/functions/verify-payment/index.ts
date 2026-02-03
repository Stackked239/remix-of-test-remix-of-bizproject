// Supabase Edge Function: Verify Stripe Payment
// Deploy with: supabase functions deploy verify-payment

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@13.10.0?target=deno';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { session_id, user_id } = await req.json();

    if (!session_id) {
      throw new Error('Session ID is required');
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    // Verify the payment was successful
    if (session.payment_status !== 'paid') {
      return new Response(
        JSON.stringify({
          verified: false,
          message: 'Payment not completed'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    const isGuestCheckout = session.metadata?.is_guest === 'true';

    // For non-guest checkouts, verify the user matches (if provided in metadata)
    if (!isGuestCheckout && session.metadata?.user_id && session.metadata.user_id !== user_id) {
      return new Response(
        JSON.stringify({
          verified: false,
          message: 'User mismatch'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    return new Response(
      JSON.stringify({
        verified: true,
        amount: session.amount_total ? session.amount_total / 100 : 0,
        product_id: session.metadata?.product_id || 'standard',
        customer_email: session.customer_email,
        is_guest: isGuestCheckout,
        stripe_session_id: session_id,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error: any) {
    console.error('Payment verification error:', error);
    return new Response(
      JSON.stringify({ error: error.message, verified: false }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
