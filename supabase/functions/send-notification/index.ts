import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { z } from "npm:zod@3.23.8";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface EmailNotificationRequest {
  type: "popup_subscriber" | "contact_form" | "checklist_download" | "bizguides_inquiry" | "custom_request";
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  businessName?: string;
  subject?: string;
  message?: string;
  hubColor?: string;
  checklist?: string;
  source?: string;
  // BizGuides inquiry fields
  fullName?: string;
  companyName?: string;
  industry?: string;
  revenueStage?: string;
  primaryChallenge?: string;
  sessionLength?: string;
  referralSource?: string;
  // Custom request fields
  phone?: string;
  title?: string;
  revenueRange?: string;
  teamSize?: string;
  solutionType?: string;
  areasOfFocus?: string[];
  challengeDescription?: string;
  idealTimeline?: string;
  successMetrics?: string;
  constraints?: string;
  contactPreference?: string;
  formCompletionTime?: number;
}

// HTML escaping function to prevent injection attacks
const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    const emailSchema = z.object({
      type: z.enum(["popup_subscriber", "contact_form", "checklist_download", "bizguides_inquiry", "custom_request"]),
      email: z.string().trim().email().max(255, "Email must be less than 255 characters"),
      name: z.string().trim().max(100, "Name must be less than 100 characters").optional(),
      firstName: z.string().trim().min(1, "First name is required").max(100, "First name must be less than 100 characters").optional(),
      lastName: z.string().trim().min(1, "Last name is required").max(100, "Last name must be less than 100 characters").optional(),
      company: z.string().trim().max(200, "Company name must be less than 200 characters").optional(),
      businessName: z.string().trim().max(200, "Business name must be less than 200 characters").optional(),
      subject: z.string().trim().max(200, "Subject must be less than 200 characters").optional(),
      message: z.string().trim().min(1, "Message is required").max(5000, "Message must be less than 5000 characters").optional(),
      hubColor: z.string().optional(),
      checklist: z.string().optional(),
      source: z.string().optional(),
      // BizGuides inquiry fields
      fullName: z.string().trim().min(2).max(50).optional(),
      companyName: z.string().trim().max(100).optional(),
      industry: z.string().optional(),
      revenueStage: z.string().optional(),
      primaryChallenge: z.string().trim().min(20).max(500).optional(),
      sessionLength: z.string().optional(),
      referralSource: z.string().optional(),
      // Custom request fields
      phone: z.string().optional(),
      title: z.string().optional(),
      revenueRange: z.string().optional(),
      teamSize: z.string().optional(),
      solutionType: z.string().optional(),
      areasOfFocus: z.array(z.string()).optional(),
      challengeDescription: z.string().trim().max(500).optional(),
      idealTimeline: z.string().optional(),
      successMetrics: z.string().optional(),
      constraints: z.string().optional(),
      contactPreference: z.string().optional(),
      formCompletionTime: z.number().optional(),
    });
    const data = emailSchema.parse(payload);
    console.log("Received notification request:", data.type);

    // Create Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const fromEmail = "BizHealth.ai <hello@bizhealth.ai>";

    let emailSubject = "";
    let emailHtml = "";

    if (data.type === "popup_subscriber") {
      // Store subscriber in database
      const { error: dbError } = await supabase
        .from("email_subscribers")
        .insert({
          email: data.email,
          source: data.hubColor || "main_site_popup",
          metadata: { hubColor: data.hubColor }
        });

      if (dbError) {
        // If it's a unique constraint error (already subscribed), that's okay
        if (!dbError.message.includes("duplicate") && !dbError.message.includes("unique")) {
          console.error("Database insert error:", dbError);
          throw new Error(`Failed to save subscriber: ${dbError.message}`);
        } else {
          console.log("Subscriber already exists, skipping insert");
        }
      } else {
        console.log("Subscriber saved to database");
      }

      // Send welcome email to subscriber
      const welcomeEmailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #0D1B2A 0%, #1B3A5C 100%); padding: 40px 40px 30px; text-align: center;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Welcome to BizHealth.ai!</h1>
                      <p style="color: #38B2AC; margin: 10px 0 0; font-size: 16px;">Your journey to business growth starts here</p>
                    </td>
                  </tr>
                  <!-- Body -->
                  <tr>
                    <td style="padding: 40px;">
                      <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                        Thank you for subscribing to the BizHealth.ai newsletter! 🎉
                      </p>
                      <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                        You've taken the first step toward transforming your business with AI-powered insights and strategic growth tools.
                      </p>
                      <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                        Here's what you can expect from us:
                      </p>
                      <ul style="color: #333333; font-size: 16px; line-height: 1.8; margin: 0 0 30px; padding-left: 20px;">
                        <li><strong>Business Health Tips</strong> – Actionable insights to optimize your operations</li>
                        <li><strong>Product Updates</strong> – Be the first to know about new features</li>
                        <li><strong>Exclusive Resources</strong> – Access to guides, templates, and tools</li>
                        <li><strong>Growth Strategies</strong> – Expert advice to scale your business</li>
                      </ul>
                      <table cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                        <tr>
                          <td style="background: linear-gradient(135deg, #38B2AC 0%, #319795 100%); border-radius: 8px;">
                            <a href="https://bizhealth.ai" style="display: inline-block; padding: 14px 32px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px;">Explore BizHealth.ai</a>
                          </td>
                        </tr>
                      </table>
                      <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 0;">
                        Questions? Reply to this email or reach out to us at <a href="mailto:support@bizhealth.ai" style="color: #38B2AC;">support@bizhealth.ai</a>
                      </p>
                    </td>
                  </tr>
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f8f9fa; padding: 30px 40px; text-align: center; border-top: 1px solid #e9ecef;">
                      <p style="color: #666666; font-size: 14px; margin: 0 0 10px;">
                        <strong>BizHealth.ai</strong> – Stop Guessing, Start Growing
                      </p>
                      <p style="color: #999999; font-size: 12px; margin: 0;">
                        You received this email because you subscribed to our newsletter.<br>
                        <a href="https://bizhealth.ai" style="color: #38B2AC;">Unsubscribe</a> | <a href="https://bizhealth.ai/privacy" style="color: #38B2AC;">Privacy Policy</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `;

      // Send welcome email to subscriber
      const { error: welcomeError } = await resend.emails.send({
        from: fromEmail,
        to: [data.email],
        subject: "Welcome to BizHealth.ai! 🚀",
        html: welcomeEmailHtml,
      });

      if (welcomeError) {
        console.error("Failed to send welcome email to subscriber:", welcomeError);
      } else {
        console.log("Welcome email sent to subscriber:", data.email);
      }

      // Team notification email
      emailSubject = "New Newsletter Subscriber";
      emailHtml = `
        <h2>New Newsletter Subscriber</h2>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Source:</strong> ${escapeHtml(data.hubColor || "Main site")} popup banner</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
      `;
    } else if (data.type === "checklist_download") {
      // Handle checklist download requests
      const checklistName = data.checklist || "unknown";
      const userName = data.name || "there";
      const businessName = data.businessName || "";
      const sourcePage = data.source || "unknown";

      console.log(`Processing checklist download: ${checklistName} for ${data.email}`);

      // Store subscriber in database
      const { error: dbError } = await supabase
        .from("email_subscribers")
        .insert({
          email: data.email,
          source: `checklist_${checklistName}`,
          metadata: { 
            checklist: checklistName, 
            name: userName,
            businessName: businessName,
            sourcePage: sourcePage 
          }
        });

      if (dbError) {
        if (!dbError.message.includes("duplicate") && !dbError.message.includes("unique")) {
          console.error("Database insert error:", dbError);
          throw new Error(`Failed to save subscriber: ${dbError.message}`);
        } else {
          console.log("Subscriber already exists, updating metadata");
        }
      } else {
        console.log("Checklist subscriber saved to database");
      }

      // Determine checklist-specific content
      let checklistTitle = "Your Free Checklist";
      let checklistDescription = "your requested checklist";
      let downloadUrl = "https://bizhealth.ai/downloads/";
      let checklistPdfName = "checklist.pdf";

      if (checklistName === "voice-of-customer") {
        checklistTitle = "Customer Feedback Collection Checklist";
        checklistDescription = "your Customer Feedback Collection Checklist—the complete 37-point framework for systematically collecting, analyzing, and acting on customer feedback";
        downloadUrl = "https://bizhealth.ai/downloads/Customer-Feedback-Collection-Checklist-BizHealth.pdf";
        checklistPdfName = "BizHealth-Customer-Feedback-Collection-Checklist.pdf";
      }

      // Send checklist delivery email to subscriber
      const checklistEmailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #242553 0%, #1a1f4d 100%); padding: 40px 40px 30px; text-align: center;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 700;">Your ${escapeHtml(checklistTitle)} Is Ready!</h1>
                      <p style="color: #969423; margin: 10px 0 0; font-size: 16px; font-weight: 600;">Stop Guessing. Start Growing.®</p>
                    </td>
                  </tr>
                  <!-- Body -->
                  <tr>
                    <td style="padding: 40px;">
                      <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                        Hi ${escapeHtml(userName)},
                      </p>
                      <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                        Thank you for downloading ${escapeHtml(checklistDescription)}. 🎉
                      </p>
                      <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                        Click the button below to download your checklist:
                      </p>
                      
                      <!-- Download Button -->
                      <table cellpadding="0" cellspacing="0" style="margin: 30px 0;" width="100%">
                        <tr>
                          <td align="center">
                            <a href="${downloadUrl}" style="display: inline-block; background: linear-gradient(135deg, #969423 0%, #7a7a1c 100%); padding: 16px 40px; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 18px; border-radius: 8px; box-shadow: 0 4px 12px rgba(150,148,35,0.3);">
                              📥 Download Your Checklist
                            </a>
                          </td>
                        </tr>
                      </table>

                      <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 30px 0 20px; padding: 20px; background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #969423;">
                        <strong>💡 Pro Tip:</strong> Print this checklist and keep it visible. Checking items off as you complete them makes implementation more likely and keeps you accountable.
                      </p>

                      <hr style="border: none; border-top: 1px solid #e9ecef; margin: 30px 0;">

                      <h2 style="color: #242553; font-size: 20px; margin: 0 0 15px;">Ready for Deeper Insights?</h2>
                      <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                        This checklist addresses one critical area—but what about the other 11 dimensions of your business health?
                      </p>
                      <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                        The <strong>BizHealth Assessment</strong> analyzes your entire business—from operations and finances to leadership and customer experience—to uncover exactly where you're leaving money on the table.
                      </p>
                      
                      <table cellpadding="0" cellspacing="0" style="margin: 20px 0;">
                        <tr>
                          <td style="background: linear-gradient(135deg, #242553 0%, #1a1f4d 100%); border-radius: 8px;">
                            <a href="https://bizhealth.ai/pricing" style="display: inline-block; padding: 14px 32px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px;">
                              View Assessment Pricing →
                            </a>
                          </td>
                        </tr>
                      </table>

                      <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 30px 0 0;">
                        Questions? Reply to this email or reach out at <a href="mailto:support@bizhealth.ai" style="color: #969423; font-weight: 600;">support@bizhealth.ai</a>
                      </p>
                    </td>
                  </tr>
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f8f9fa; padding: 30px 40px; text-align: center; border-top: 1px solid #e9ecef;">
                      <p style="color: #666666; font-size: 14px; margin: 0 0 10px;">
                        <strong>BizHealth.ai</strong> – Your Trusted Business Health Analyst
                      </p>
                      <p style="color: #999999; font-size: 12px; margin: 0;">
                        <a href="https://bizhealth.ai" style="color: #969423;">Visit Website</a> | 
                        <a href="https://bizhealth.ai/blog" style="color: #969423;">Read Our Blog</a> | 
                        <a href="https://bizhealth.ai/privacy" style="color: #969423;">Privacy Policy</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `;

      // Send checklist email to subscriber
      const { error: checklistEmailError } = await resend.emails.send({
        from: fromEmail,
        to: [data.email],
        subject: `📥 Your ${checklistTitle} Is Ready!`,
        html: checklistEmailHtml,
      });

      if (checklistEmailError) {
        console.error("Failed to send checklist email:", checklistEmailError);
        throw new Error(`Failed to send checklist email: ${checklistEmailError.message}`);
      } else {
        console.log("Checklist email sent to:", data.email);
      }

      // Team notification email
      emailSubject = `New Checklist Download: ${escapeHtml(checklistTitle)}`;
      emailHtml = `
        <h2>New Checklist Download</h2>
        <p><strong>Checklist:</strong> ${escapeHtml(checklistTitle)}</p>
        <p><strong>Name:</strong> ${escapeHtml(userName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Business:</strong> ${escapeHtml(businessName || "Not provided")}</p>
        <p><strong>Source Page:</strong> ${escapeHtml(sourcePage)}</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
      `;
    } else if (data.type === "bizguides_inquiry") {
      // Handle BizGuides coaching session requests (Tier 2)
      const fullName = data.fullName || "Unknown";
      const companyName = data.companyName || "Not provided";
      const industry = data.industry || "Not specified";
      const revenueStage = data.revenueStage || "Not specified";
      const primaryChallenge = data.primaryChallenge || "Not provided";
      const sessionLength = data.sessionLength || "60 min";
      const referralSource = data.referralSource || "Not specified";

      console.log(`Processing BizGuides inquiry from ${data.email}`);

      // Store inquiry in database
      const { error: dbError } = await supabase
        .from("bizguides_inquiries")
        .insert({
          full_name: fullName,
          email: data.email,
          company_name: companyName !== "Not provided" ? companyName : null,
          industry: industry,
          revenue_stage: revenueStage,
          primary_challenge: primaryChallenge,
          session_length: sessionLength,
          referral_source: referralSource !== "Not specified" ? referralSource : null,
          status: "new"
        });

      if (dbError) {
        console.error("Database insert error:", dbError);
        throw new Error(`Failed to save inquiry: ${dbError.message}`);
      }
      console.log("BizGuides inquiry saved to database");

      // Send confirmation email to submitter
      const confirmationEmailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #008080 0%, #006666 100%); padding: 40px 40px 30px; text-align: center;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 700;">Your Coaching Session Request Is Received!</h1>
                      <p style="color: #ffffff; opacity: 0.9; margin: 10px 0 0; font-size: 16px;">Where Insights Meet Execution</p>
                    </td>
                  </tr>
                  <!-- Body -->
                  <tr>
                    <td style="padding: 40px;">
                      <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                        Hi ${escapeHtml(fullName.split(' ')[0])},
                      </p>
                      <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                        Thank you for requesting an expert coaching session with BizGuides! 🎯
                      </p>
                      <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                        <strong>Here's what happens next:</strong>
                      </p>
                      
                      <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                        <table cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td style="padding: 10px 0;">
                              <strong style="color: #008080;">1. Expert Matching (Within 48 hours)</strong>
                              <p style="color: #666666; font-size: 14px; margin: 5px 0 0;">We'll match you with 2-3 coaches who specialize in your industry and growth stage.</p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 10px 0;">
                              <strong style="color: #008080;">2. Session Scheduling (Within 5 business days)</strong>
                              <p style="color: #666666; font-size: 14px; margin: 5px 0 0;">Choose the coach that fits best and schedule your ${escapeHtml(sessionLength)} session.</p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 10px 0;">
                              <strong style="color: #008080;">3. Your First Session</strong>
                              <p style="color: #666666; font-size: 14px; margin: 5px 0 0;">Get personalized guidance + an action plan. 100% satisfaction guaranteed.</p>
                            </td>
                          </tr>
                        </table>
                      </div>

                      <div style="background-color: #008080; color: #ffffff; border-radius: 8px; padding: 16px; margin-bottom: 30px; text-align: center;">
                        <p style="margin: 0; font-size: 14px;">💰 <strong>Money-Back Guarantee:</strong> If your first session doesn't provide clear value, we'll refund 100%.</p>
                      </div>

                      <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 0;">
                        Questions before your session? Reply to this email or reach out at <a href="mailto:support@bizhealth.ai" style="color: #008080; font-weight: 600;">support@bizhealth.ai</a>
                      </p>
                    </td>
                  </tr>
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f8f9fa; padding: 30px 40px; text-align: center; border-top: 1px solid #e9ecef;">
                      <p style="color: #666666; font-size: 14px; margin: 0 0 10px;">
                        <strong>BizGuides by BizHealth.ai</strong>
                      </p>
                      <p style="color: #999999; font-size: 12px; margin: 0;">
                        <a href="https://bizhealth.ai/bizguides" style="color: #008080;">Learn More</a> | 
                        <a href="https://bizhealth.ai/privacy" style="color: #008080;">Privacy Policy</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `;

      // Send confirmation email
      const { error: confirmError } = await resend.emails.send({
        from: fromEmail,
        to: [data.email],
        subject: "🎯 Your BizGuides Session Request Is Confirmed!",
        html: confirmationEmailHtml,
      });

      if (confirmError) {
        console.error("Failed to send confirmation email:", confirmError);
      } else {
        console.log("Confirmation email sent to:", data.email);
      }

      // Team notification email
      emailSubject = "🎯 New BizGuides Coaching Request";
      emailHtml = `
        <h2 style="color: #008080;">New BizGuides Coaching Session Request</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Name</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(fullName)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td>
          </tr>
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Company</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(companyName)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Industry</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(industry)}</td>
          </tr>
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Revenue Stage</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(revenueStage)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Session Length</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(sessionLength)}</td>
          </tr>
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Referral Source</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(referralSource)}</td>
          </tr>
        </table>
        <h3 style="color: #333; margin-top: 20px;">Primary Challenge:</h3>
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #008080; margin-bottom: 20px;">
          <p style="margin: 0; color: #333;">${escapeHtml(primaryChallenge)}</p>
        </div>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        <p style="margin-top: 20px;"><em>⏰ Next Steps: Match with expert within 48 hours and schedule session within 5 business days.</em></p>
      `;
    } else if (data.type === "custom_request") {
      // Handle Custom BizGuides Solution Requests (Tier 3)
      const fullName = data.fullName || "Unknown";
      const companyName = data.companyName || "Not provided";
      const industry = data.industry || "Not specified";
      const revenueRange = data.revenueRange || "Not specified";
      const solutionType = data.solutionType || "Not specified";
      const challengeDescription = data.challengeDescription || "Not provided";
      const teamSize = data.teamSize || "Not specified";
      const idealTimeline = data.idealTimeline || "Not specified";
      const successMetrics = data.successMetrics || "";
      const constraints = data.constraints || "";
      const contactPreference = data.contactPreference || "email";
      const areasOfFocus = data.areasOfFocus || [];
      const phone = data.phone || "";
      const title = data.title || "Not provided";
      const formCompletionTime = data.formCompletionTime || 0;

      console.log(`Processing Custom Request from ${data.email}`);

      // Store inquiry in bizguides_inquiries table with custom request flag
      const { error: dbError } = await supabase
        .from("bizguides_inquiries")
        .insert({
          full_name: fullName,
          email: data.email,
          company_name: companyName !== "Not provided" ? companyName : null,
          industry: industry,
          revenue_stage: revenueRange,
          primary_challenge: `[CUSTOM REQUEST - ${solutionType}] ${challengeDescription}`,
          session_length: `Custom: ${idealTimeline} | Team: ${teamSize} | Areas: ${areasOfFocus.join(", ")}`,
          referral_source: null,
          status: "new"
        });

      if (dbError) {
        console.error("Database insert error:", dbError);
        throw new Error(`Failed to save custom request: ${dbError.message}`);
      }
      console.log("Custom request saved to database");

      // Send confirmation email to submitter
      const solutionLabels: Record<string, string> = {
        "TYPE_A": "Onsite Support & Team Coaching",
        "TYPE_B": "Strategic Consulting & Planning",
        "TYPE_C": "Full Project Management & Execution"
      };
      const solutionLabel = solutionLabels[solutionType] || solutionType;

      const confirmationEmailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #0D1B2A 0%, #1B3A5C 100%); padding: 40px 40px 30px; text-align: center;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 700;">Your Custom Solution Request Is Received!</h1>
                      <p style="color: #38B2AC; margin: 10px 0 0; font-size: 16px; font-weight: 600;">BizGuides Strategic Partnership</p>
                    </td>
                  </tr>
                  <!-- Body -->
                  <tr>
                    <td style="padding: 40px;">
                      <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                        Hi ${escapeHtml(fullName.split(' ')[0])},
                      </p>
                      <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                        Thank you for requesting a custom BizGuides solution! Your request for <strong>${escapeHtml(solutionLabel)}</strong> has been received. 🎯
                      </p>
                      <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                        <strong>Here's what happens next:</strong>
                      </p>
                      
                      <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                        <table cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td style="padding: 10px 0;">
                              <strong style="color: #0D1B2A;">1. Executive Review (Within 24 hours)</strong>
                              <p style="color: #666666; font-size: 14px; margin: 5px 0 0;">Our senior team will review your requirements and prepare a preliminary assessment.</p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 10px 0;">
                              <strong style="color: #0D1B2A;">2. Discovery Call (Within 48 hours)</strong>
                              <p style="color: #666666; font-size: 14px; margin: 5px 0 0;">A dedicated advisor will reach out to schedule a complimentary 30-minute strategy call.</p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 10px 0;">
                              <strong style="color: #0D1B2A;">3. Custom Proposal (Within 5 business days)</strong>
                              <p style="color: #666666; font-size: 14px; margin: 5px 0 0;">Receive a tailored engagement plan with clear deliverables, timelines, and investment.</p>
                            </td>
                          </tr>
                        </table>
                      </div>

                      <div style="background: linear-gradient(135deg, #0D1B2A 0%, #1B3A5C 100%); color: #ffffff; border-radius: 8px; padding: 16px; margin-bottom: 30px; text-align: center;">
                        <p style="margin: 0; font-size: 14px;">🤝 <strong>No Obligation:</strong> The discovery call is completely free. We only proceed if there's mutual fit.</p>
                      </div>

                      <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 0;">
                        Questions? Reply to this email or reach out at <a href="mailto:support@bizhealth.ai" style="color: #38B2AC; font-weight: 600;">support@bizhealth.ai</a>
                      </p>
                    </td>
                  </tr>
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f8f9fa; padding: 30px 40px; text-align: center; border-top: 1px solid #e9ecef;">
                      <p style="color: #666666; font-size: 14px; margin: 0 0 10px;">
                        <strong>BizGuides Custom Solutions by BizHealth.ai</strong>
                      </p>
                      <p style="color: #999999; font-size: 12px; margin: 0;">
                        <a href="https://bizhealth.ai/bizguides/request-custom" style="color: #38B2AC;">Learn More</a> | 
                        <a href="https://bizhealth.ai/privacy" style="color: #38B2AC;">Privacy Policy</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `;

      // Send confirmation email
      const { error: confirmError } = await resend.emails.send({
        from: fromEmail,
        to: [data.email],
        subject: "🎯 Your Custom BizGuides Solution Request Is Confirmed!",
        html: confirmationEmailHtml,
      });

      if (confirmError) {
        console.error("Failed to send confirmation email:", confirmError);
      } else {
        console.log("Confirmation email sent to:", data.email);
      }

      // Team notification email
      emailSubject = "🚀 New Custom BizGuides Solution Request";
      emailHtml = `
        <h2 style="color: #0D1B2A;">New Custom BizGuides Solution Request</h2>
        <div style="background: linear-gradient(135deg, #38B2AC 0%, #319795 100%); color: #fff; padding: 12px 20px; border-radius: 8px; margin-bottom: 20px;">
          <strong>Solution Type:</strong> ${escapeHtml(solutionLabel)}
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Name</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(fullName)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td>
          </tr>
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Phone</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(phone || "Not provided")}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Company</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(companyName)}</td>
          </tr>
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Title/Role</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(title)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Industry</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(industry)}</td>
          </tr>
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Revenue Range</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(revenueRange)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Team Size</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(teamSize)}</td>
          </tr>
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Timeline</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(idealTimeline)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Preferred Contact</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(contactPreference)}</td>
          </tr>
          <tr style="background-color: #f8f9fa;">
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Form Completion Time</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${formCompletionTime}s</td>
          </tr>
        </table>
        <h3 style="color: #333; margin-top: 20px;">Areas of Focus:</h3>
        <div style="background-color: #e8f5f4; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <ul style="margin: 0; padding-left: 20px; color: #333;">
            ${areasOfFocus.map(area => `<li>${escapeHtml(area)}</li>`).join("")}
          </ul>
        </div>
        <h3 style="color: #333; margin-top: 20px;">Challenge Description:</h3>
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #0D1B2A; margin-bottom: 20px;">
          <p style="margin: 0; color: #333;">${escapeHtml(challengeDescription)}</p>
        </div>
        ${successMetrics ? `
        <h3 style="color: #333; margin-top: 20px;">Success Metrics:</h3>
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #38B2AC; margin-bottom: 20px;">
          <p style="margin: 0; color: #333;">${escapeHtml(successMetrics)}</p>
        </div>
        ` : ""}
        ${constraints ? `
        <h3 style="color: #333; margin-top: 20px;">Constraints/Considerations:</h3>
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #ffc107; margin-bottom: 20px;">
          <p style="margin: 0; color: #333;">${escapeHtml(constraints)}</p>
        </div>
        ` : ""}
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        <p style="margin-top: 20px; background-color: #fff3cd; padding: 12px; border-radius: 6px; border-left: 4px solid #ffc107;"><em>⏰ <strong>PRIORITY:</strong> Schedule discovery call within 48 hours. High-value lead.</em></p>
      `;
    } else if (data.type === "contact_form") {
      emailSubject = `New Contact Form: ${escapeHtml(data.subject || "General Inquiry")}`;
      emailHtml = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.firstName || "")} ${escapeHtml(data.lastName || "")}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Company:</strong> ${escapeHtml(data.company || "Not provided")}</p>
        <p><strong>Subject:</strong> ${escapeHtml(data.subject || "General Inquiry")}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(data.message || "")}</p>
        <hr />
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
      `;
    }

    // Send team notification email
    const { data: sendData, error: sendError } = await resend.emails.send({
      from: fromEmail,
      to: ["hello@bizhealth.ai"],
      subject: emailSubject,
      html: emailHtml,
    });

    if (sendError) {
      console.error("Resend send error:", sendError);
      return new Response(
        JSON.stringify({ success: false, error: sendError.message }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Email sent successfully:", sendData);

    return new Response(JSON.stringify({ success: true, data: sendData }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-notification function:", error);
    const status = error?.name === "ZodError" ? 400 : 500;
    const message = error?.issues ? error.issues.map((i: any) => i.message).join(", ") : (error?.message || "Unknown error");
    return new Response(
      JSON.stringify({ success: false, error: message }),
      {
        status,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
