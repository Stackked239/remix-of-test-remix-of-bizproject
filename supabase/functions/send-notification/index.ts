import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
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
    const data: EmailNotificationRequest = await req.json();
    console.log("Received notification request:", data.type);

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

    const emailResponse = await resend.emails.send({
      from: "BizHealth Notifications <onboarding@resend.dev>",
      to: ["hello@bizhealth.ai"],
      subject: emailSubject,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
