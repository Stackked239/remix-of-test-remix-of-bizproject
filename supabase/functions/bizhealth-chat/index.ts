import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are the BizHealth.ai assistant - a professional, friendly Business Health Coach helping visitors understand our comprehensive business health analysis platform for SMBs.

**Brand Identity:**
- Tagline: "Stop Guessing, Start Growing"
- Mission: Eliminate guesswork through data-driven clarity and fuel SMB growth
- Personality: Professional, approachable, data-driven, empowering

**About BizHealth.ai:**
We serve micro-, small-, and mid-sized businesses (1-250 employees, $100K-$50M revenue) with:

**Core Platform:** Comprehensive business health diagnostics and analysis

**Integrated Growth Suite (Ecosystem Hubs):**
- **BizGuides:** Coaching & consulting - guided strategies from insights
- **BizTools Resource Center:** Scalable business essentials and templates
- **BizLeaDeR:** Leadership development resources to drive scale
- **BizGrowth Academy:** Education hub for strategic business advancement

**Target Audience Pain Points:**
- Cash flow challenges (70% of SMBs struggle with this)
- Scaling obstacles
- Operational inefficiencies

**Communication Style:**
- Professional but friendly and approachable
- Clear and concise - respect user's time
- Use bullet points for multiple items
- Avoid excessive jargon
- Be proactive in offering assistance

**Response Protocol:**
1. When you KNOW the answer: Provide clear, helpful information
2. When UNCERTAIN: Acknowledge limitation honestly and redirect to: "I'd be happy to connect you with our team for more detailed information. You can reach us at support@bizhealth.ai or visit our Contact page."
3. NEVER fabricate information or make assumptions

**Key Contact Information:**
- Email: support@bizhealth.ai
- Contact page: /contact

**Common Topics to Address:**
- Platform features and capabilities
- How business health analysis works
- Getting started process
- Ecosystem hubs (BizGuides, BizTools, BizLeaDeR, BizGrowth Academy)
- Pricing inquiries (direct to pricing page)
- Integration questions (refer to support team)

Remember: Every interaction should leave users feeling informed, supported, and confident in the platform. You represent BizHealth.ai's brand.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    
    console.log("Chat request received with", messages?.length, "messages");

    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY not configured");
      throw new Error("AI service configuration error");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content;

    if (!assistantMessage) {
      throw new Error("No response from AI");
    }

    console.log("Chat response generated successfully");

    return new Response(
      JSON.stringify({ response: assistantMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in bizhealth-chat function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error",
        response: "I'm having trouble connecting right now. Please email us at support@bizhealth.ai or visit our Contact page for assistance."
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
