import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Log404Request {
  attemptedUrl: string;
  referrer?: string;
  userAgent?: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    let userId = null;

    if (authHeader) {
      const { data: { user } } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
      userId = user?.id || null;
    }

    const { attemptedUrl, referrer, userAgent }: Log404Request = await req.json();

    // Get IP address from request
    const ipAddress = req.headers.get('x-forwarded-for') || 
                     req.headers.get('x-real-ip') || 
                     'unknown';

    console.log('Logging 404 error:', {
      attemptedUrl,
      referrer,
      userAgent,
      ipAddress,
      userId,
      timestamp: new Date().toISOString()
    });

    // Insert the log entry
    const { error: insertError } = await supabase
      .from('page_not_found_logs')
      .insert({
        attempted_url: attemptedUrl,
        referrer: referrer || null,
        user_agent: userAgent || null,
        ip_address: ipAddress,
        user_id: userId,
      });

    if (insertError) {
      console.error('Error inserting 404 log:', insertError);
      throw insertError;
    }

    console.log('404 error logged successfully');

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error('Error in log-404-error function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
});
