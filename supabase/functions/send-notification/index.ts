import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { z } from "npm:zod@3.23.8";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    const emailSchema = z.object({
      type: z.enum(["popup_subscriber", "contact_form"]),
      email: z.string().trim().email(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      company: z.string().optional(),
      subject: z.string().optional(),
      message: z.string().optional(),
      hubColor: z.string().optional(),
    });
    const data = emailSchema.parse(payload);
    console.log("Received notification request:", data.type);

    const fromEmail = Deno.env.get("RESEND_FROM_EMAIL") || "BizHealth Notifications <onboarding@resend.dev>";

    let emailSubject = "";
    let emailHtml = "";

    if (data.type === "popup_subscriber") {
      emailSubject = "New Newsletter Subscriber";
      emailHtml = `
        <h2>New Newsletter Subscriber</h2>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Source:</strong> ${data.hubColor || "Main site"} popup banner</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
      `;
    } else if (data.type === "contact_form") {
      emailSubject = `New Contact Form: ${data.subject || "General Inquiry"}`;
      emailHtml = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Company:</strong> ${data.company || "Not provided"}</p>
        <p><strong>Subject:</strong> ${data.subject || "General Inquiry"}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
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
