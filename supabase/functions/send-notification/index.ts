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
  type: "popup_subscriber" | "contact_form";
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  subject?: string;
  message?: string;
  hubColor?: string;
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
      type: z.enum(["popup_subscriber", "contact_form"]),
      email: z.string().trim().email().max(255, "Email must be less than 255 characters"),
      firstName: z.string().trim().min(1, "First name is required").max(100, "First name must be less than 100 characters").optional(),
      lastName: z.string().trim().min(1, "Last name is required").max(100, "Last name must be less than 100 characters").optional(),
      company: z.string().trim().max(200, "Company name must be less than 200 characters").optional(),
      subject: z.string().trim().max(200, "Subject must be less than 200 characters").optional(),
      message: z.string().trim().min(1, "Message is required").max(5000, "Message must be less than 5000 characters").optional(),
      hubColor: z.string().optional(),
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

      emailSubject = "New Newsletter Subscriber";
      emailHtml = `
        <h2>New Newsletter Subscriber</h2>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Source:</strong> ${escapeHtml(data.hubColor || "Main site")} popup banner</p>
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
