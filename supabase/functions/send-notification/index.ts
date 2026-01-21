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
  type: "popup_subscriber" | "contact_form" | "checklist_download";
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
      type: z.enum(["popup_subscriber", "contact_form", "checklist_download"]),
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
