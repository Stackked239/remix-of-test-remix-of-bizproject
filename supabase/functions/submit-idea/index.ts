import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface IdeaSubmission {
  fullName: string;
  email: string;
  company?: string;
  category: string;
  ideaTitle: string;
  description: string;
  problemsSolved: string[];
  urgency?: string;
  betaTesting?: string;
  privacyConsent: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const submission: IdeaSubmission = await req.json();
    
    // Validate required fields
    if (!submission.fullName || !submission.email || !submission.category || 
        !submission.ideaTitle || !submission.description || !submission.privacyConsent) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Create Supabase client with service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get next idea number from sequence
    const { data: seqData, error: seqError } = await supabase.rpc('nextval', { seq_name: 'idea_number_seq' });
    
    let ideaNumber: number;
    if (seqError) {
      // Fallback: generate random number if sequence fails
      console.error("Sequence error, using fallback:", seqError);
      ideaNumber = 4000 + Math.floor(Math.random() * 10000);
    } else {
      ideaNumber = seqData;
    }

    // Insert into database
    const { data: insertData, error: insertError } = await supabase
      .from("idea_submissions")
      .insert({
        idea_number: ideaNumber,
        full_name: submission.fullName,
        email: submission.email,
        company: submission.company || null,
        category: submission.category,
        idea_title: submission.ideaTitle,
        description: submission.description,
        problems_solved: submission.problemsSolved || [],
        urgency: submission.urgency || null,
        beta_testing: submission.betaTesting || null,
        privacy_consent: submission.privacyConsent,
        status: "new"
      })
      .select()
      .single();

    if (insertError) {
      console.error("Database insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to save idea submission" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Send confirmation email
    const firstName = submission.fullName.split(" ")[0];
    
    try {
      await resend.emails.send({
        from: "BizHealth.ai <support@bizhealth.ai>",
        to: [submission.email],
        subject: `We received your idea! (#${ideaNumber})`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1B365D; font-size: 24px; margin-bottom: 10px;">Thanks for sharing your idea, ${firstName}! 🎉</h1>
            </div>
            
            <div style="background: linear-gradient(135deg, #34A853 0%, #2E8B57 100%); padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
              <p style="color: white; margin: 0; font-size: 14px;">Your Idea Number</p>
              <p style="color: white; margin: 10px 0 0 0; font-size: 32px; font-weight: bold;">#${ideaNumber}</p>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 12px; margin-bottom: 30px;">
              <h2 style="color: #1B365D; font-size: 18px; margin: 0 0 15px 0;">Your Submission</h2>
              <p style="margin: 0 0 10px 0;"><strong>Idea:</strong> ${submission.ideaTitle}</p>
              <p style="margin: 0 0 10px 0;"><strong>Category:</strong> ${submission.category}</p>
              <p style="margin: 0;"><strong>Submitted:</strong> ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            
            <div style="margin-bottom: 30px;">
              <h3 style="color: #1B365D; font-size: 16px; margin-bottom: 15px;">What happens next?</h3>
              <ol style="padding-left: 20px; margin: 0;">
                <li style="margin-bottom: 10px;">Our team reviews all submissions weekly</li>
                <li style="margin-bottom: 10px;">Ideas that align with our roadmap get prioritized</li>
                <li style="margin-bottom: 10px;">You'll be notified if your idea moves forward</li>
                ${submission.betaTesting === 'yes' ? '<li>You\'ve been added to our beta tester list!</li>' : ''}
              </ol>
            </div>
            
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 14px; margin-bottom: 15px;">
                Have more ideas? We'd love to hear them.
              </p>
              <a href="https://www.bizhealth.ai/ideas" style="display: inline-block; background-color: #34A853; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">Submit Another Idea</a>
            </div>
            
            <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #999; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} BizHealth.ai. All rights reserved.<br>
                <a href="https://www.bizhealth.ai/privacy" style="color: #34A853;">Privacy Policy</a> | 
                <a href="https://www.bizhealth.ai/contact" style="color: #34A853;">Contact Us</a>
              </p>
            </div>
          </body>
          </html>
        `,
      });
      console.log("Confirmation email sent to:", submission.email);
    } catch (emailError) {
      // Log email error but don't fail the submission
      console.error("Email sending error:", emailError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        ideaNumber,
        message: "Idea submitted successfully" 
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error: any) {
    console.error("Error in submit-idea function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
