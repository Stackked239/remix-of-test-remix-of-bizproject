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

// Simple in-memory rate limiting store
// Note: This resets on cold starts, but provides protection during active usage
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMITS = {
  popup_subscriber: { maxRequests: 3, windowMs: 3600000 }, // 3 per hour
  contact_form: { maxRequests: 5, windowMs: 3600000 }, // 5 per hour
  client_concern: { maxRequests: 3, windowMs: 3600000 }, // 3 per hour
};

function getClientIP(req: Request): string {
  // Try various headers that might contain the real IP
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const realIP = req.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }
  const cfIP = req.headers.get("cf-connecting-ip");
  if (cfIP) {
    return cfIP;
  }
  return "unknown";
}

function checkRateLimit(clientIP: string, requestType: string): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const key = `${clientIP}:${requestType}`;
  const limits = RATE_LIMITS[requestType as keyof typeof RATE_LIMITS] || RATE_LIMITS.contact_form;
  
  const existing = rateLimitStore.get(key);
  
  if (!existing || now > existing.resetTime) {
    // First request or window expired - reset
    rateLimitStore.set(key, { count: 1, resetTime: now + limits.windowMs });
    return { allowed: true, remaining: limits.maxRequests - 1, resetIn: limits.windowMs };
  }
  
  if (existing.count >= limits.maxRequests) {
    // Rate limit exceeded
    const resetIn = existing.resetTime - now;
    return { allowed: false, remaining: 0, resetIn };
  }
  
  // Increment counter
  existing.count++;
  rateLimitStore.set(key, existing);
  return { allowed: true, remaining: limits.maxRequests - existing.count, resetIn: existing.resetTime - now };
}

// Cleanup old entries periodically (simple garbage collection)
function cleanupRateLimitStore() {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
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

  // Cleanup old rate limit entries occasionally
  if (Math.random() < 0.1) {
    cleanupRateLimitStore();
  }

  try {
    const payload = await req.json();
    
    const emailSchema = z.object({
      type: z.enum(["popup_subscriber", "contact_form", "client_concern"]),
      email: z.string().trim().email().max(255, "Email must be less than 255 characters"),
      firstName: z.string().trim().min(1, "First name is required").max(100, "First name must be less than 100 characters").optional(),
      lastName: z.string().trim().min(1, "Last name is required").max(100, "Last name must be less than 100 characters").optional(),
      company: z.string().trim().max(200, "Company name must be less than 200 characters").optional(),
      subject: z.string().trim().max(200, "Subject must be less than 200 characters").optional(),
      message: z.string().trim().min(1, "Message is required").max(5000, "Message must be less than 5000 characters").optional(),
      hubColor: z.string().optional(),
      // Client concern specific fields
      fullName: z.string().trim().max(100, "Name must be less than 100 characters").optional(),
      accountEmail: z.string().trim().email().max(255).optional().or(z.literal('')),
      concernType: z.string().trim().max(100).optional(),
      description: z.string().trim().max(1500).optional(),
      desiredOutcome: z.string().trim().max(200).optional(),
      contactMethod: z.enum(["email", "phone", "video"]).optional(),
      phoneNumber: z.string().trim().max(30).optional(),
      bestTime: z.string().trim().max(100).optional(),
    });
    
    const data = emailSchema.parse(payload);
    console.log("Received notification request:", data.type);

    // Check rate limit
    const clientIP = getClientIP(req);
    const rateLimitResult = checkRateLimit(clientIP, data.type);
    
    if (!rateLimitResult.allowed) {
      console.log(`Rate limit exceeded for IP ${clientIP} on ${data.type}`);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Too many requests. Please try again later.",
          retryAfter: Math.ceil(rateLimitResult.resetIn / 1000)
        }),
        {
          status: 429,
          headers: { 
            "Content-Type": "application/json", 
            "Retry-After": Math.ceil(rateLimitResult.resetIn / 1000).toString(),
            ...corsHeaders 
          },
        }
      );
    }

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
    } else if (data.type === "client_concern") {
      // Store concern in database
      const { error: dbError } = await supabase
        .from("email_subscribers")
        .insert({
          email: data.email,
          source: "client_concerns",
          metadata: {
            fullName: data.fullName,
            companyName: data.company,
            accountEmail: data.accountEmail,
            concernType: data.concernType,
            description: data.description,
            desiredOutcome: data.desiredOutcome,
            contactMethod: data.contactMethod,
            phoneNumber: data.phoneNumber,
            bestTime: data.bestTime,
          }
        });

      if (dbError) {
        if (!dbError.message.includes("duplicate") && !dbError.message.includes("unique")) {
          console.error("Database insert error:", dbError);
          throw new Error(`Failed to save concern: ${dbError.message}`);
        } else {
          console.log("Email already exists, updating concern record");
        }
      } else {
        console.log("Concern saved to database");
      }

      emailSubject = `Client Concern: ${escapeHtml(data.concernType || "General")}`;
      emailHtml = `
        <h2>New Client Concern Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.fullName || "Not provided")}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Account Email:</strong> ${escapeHtml(data.accountEmail || "Same as above")}</p>
        <p><strong>Company:</strong> ${escapeHtml(data.company || "Not provided")}</p>
        <p><strong>Concern Type:</strong> ${escapeHtml(data.concernType || "Not specified")}</p>
        <p><strong>Desired Outcome:</strong> ${escapeHtml(data.desiredOutcome || "Not specified")}</p>
        <p><strong>Contact Method:</strong> ${escapeHtml(data.contactMethod || "email")}</p>
        ${data.phoneNumber ? `<p><strong>Phone:</strong> ${escapeHtml(data.phoneNumber)}</p>` : ''}
        ${data.bestTime ? `<p><strong>Best Time to Contact:</strong> ${escapeHtml(data.bestTime)}</p>` : ''}
        <hr />
        <p><strong>Description:</strong></p>
        <p>${escapeHtml(data.description || "")}</p>
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
