// Supabase Edge Function: Create Stripe Checkout Session
// Deploy with: supabase functions deploy create-checkout-session

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

// Product price mapping (in cents)
const PRODUCTS: Record<string, { name: string; price: number; description: string }> = {
  // New product tiers
  essentials: {
    name: 'Essentials Assessment',
    price: 9900, // $99.00
    description: '45-question micro-assessment for solopreneurs and micro-businesses',
  },
  growth: {
    name: 'Growth Assessment',
    price: 29900, // $299.00
    description: 'Comprehensive 87-question, 12-dimension business health analysis',
  },
  enterprise: {
    name: 'Enterprise Assessment',
    price: 49900, // $499.00
    description: 'Full assessment plus industry benchmarks and priority support',
  },
  // Legacy product mappings (for backward compatibility)
  standard: {
    name: 'Business Health Assessment',
    price: 29900, // $299.00 (mapped to Growth)
    description: 'Comprehensive 12-dimension analysis with personalized recommendations',
  },
  premium: {
    name: 'Premium Assessment + Consultation',
    price: 59700, // $597.00
    description: 'Everything in Standard plus 1-hour expert consultation',
  },
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { 
      product_id, 
      user_id, 
      user_email, 
      promo_code,
      success_url, 
      cancel_url 
    } = await req.json();

    // Validate product
    const product = PRODUCTS[product_id];
    if (!product) {
      throw new Error('Invalid product ID');
    }

    // Calculate discount if promo code provided
    let discountAmount = 0;
    const validCodes: Record<string, number> = {
      'LAUNCH50': 5000,    // $50 off
      'BIZHEALTH20': 2000, // $20 off
      'EARLYBIRD': 10000,  // $100 off
    };

    if (promo_code && validCodes[promo_code.toUpperCase()]) {
      discountAmount = validCodes[promo_code.toUpperCase()];
    }

    const finalPrice = product.price - discountAmount;

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: finalPrice,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: success_url,
      cancel_url: cancel_url,
      customer_email: user_email,
      metadata: {
        user_id: user_id,
        product_id: product_id,
        promo_code: promo_code || '',
      },
      // Enable automatic tax calculation if needed
      // automatic_tax: { enabled: true },
    });

    return new Response(
      JSON.stringify({ sessionId: session.id, url: session.url }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error: any) {
    console.error('Checkout session error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
