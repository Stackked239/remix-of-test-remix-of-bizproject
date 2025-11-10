import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { quadrant, businessProfile, existingItems } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const quadrantInfo = {
      strength: {
        name: 'Strengths',
        description: 'Internal positive factors the business controls',
        examples: 'strong brand reputation, skilled team, proprietary technology, loyal customer base, prime location'
      },
      weakness: {
        name: 'Weaknesses',
        description: 'Internal negative factors that need improvement',
        examples: 'limited cash flow, outdated equipment, skill gaps, poor online presence, inefficient processes'
      },
      opportunity: {
        name: 'Opportunities',
        description: 'External positive factors in the market that can be leveraged',
        examples: 'growing market demand, new technology, partnerships, untapped customer segments, government incentives'
      },
      threat: {
        name: 'Threats',
        description: 'External negative factors that could harm the business',
        examples: 'new competitors, economic downturn, changing regulations, supply chain disruptions, shifting customer preferences'
      }
    };

    const info = quadrantInfo[quadrant as keyof typeof quadrantInfo];
    
    const systemPrompt = `You are a business strategy consultant helping create SWOT analysis suggestions. 
Generate 5 specific, actionable ${info.name.toLowerCase()} for the business based on their profile.
Each suggestion should be concise (under 100 characters), relevant to their specific industry and situation, and distinct from existing items.`;

    const userPrompt = `Business Profile:
- Name: ${businessProfile.businessName}
- Industry: ${businessProfile.industry}
- Size: ${businessProfile.businessSize}
- Years: ${businessProfile.yearsInBusiness}
- Description: ${businessProfile.description || 'Not provided'}

${existingItems?.length ? `Existing ${info.name}: ${existingItems.join(', ')}` : ''}

Generate 5 specific ${info.name.toLowerCase()} (${info.description}). Examples: ${info.examples}.

Return ONLY a JSON array of objects with this structure:
[{"text": "suggestion text", "impactLevel": "high|medium|low"}]`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits depleted. Please add credits in workspace settings.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      throw new Error('AI generation failed');
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse JSON from the response
    let suggestions;
    try {
      // Try to extract JSON if it's wrapped in markdown code blocks
      const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/) || content.match(/\[[\s\S]*\]/);
      const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : content;
      suggestions = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      throw new Error('Invalid AI response format');
    }

    return new Response(
      JSON.stringify({ suggestions }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-swot-ideas:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
