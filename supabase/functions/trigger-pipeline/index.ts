// Supabase Edge Function: Trigger BizHealth Report Pipeline
// Deploy with: supabase functions deploy trigger-pipeline

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Pipeline API endpoint (configure based on your deployment)
const PIPELINE_API_URL = Deno.env.get('PIPELINE_API_URL') || '';
const PIPELINE_API_KEY = Deno.env.get('PIPELINE_API_KEY') || '';

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { questionnaire_id, user_id, payload } = await req.json();

    if (!questionnaire_id || !user_id || !payload) {
      throw new Error('Missing required parameters');
    }

    // Generate unique submission ID
    const submissionId = crypto.randomUUID();
    const companyProfileId = `${payload.raw_company_profile.company_name.toLowerCase().replace(/\s+/g, '-')}-${submissionId.substring(0, 8)}`;

    // Prepare the full pipeline payload
    const pipelinePayload = {
      id: submissionId,
      company_profile_id: companyProfileId,
      raw_company_profile: payload.raw_company_profile,
      raw_questionnaire: {
        ...payload.raw_questionnaire,
        submission_id: submissionId,
      },
      meta: {
        received_at: new Date().toISOString(),
        questionnaire_version: 'v2025-09-16',
        cp_version: 'v2025-09-16',
        source: 'web_app',
        user_id: user_id,
        questionnaire_id: questionnaire_id,
      },
    };

    // Create initial report records in database
    const reportTypes = [
      { type: 'comprehensive', title: 'Comprehensive Business Health Report' },
      { type: 'executive_summary', title: 'Executive Summary' },
      { type: 'action_plan', title: 'Priority Action Plan' },
      { type: 'benchmark', title: 'Industry Benchmark Analysis' },
    ];

    for (const reportType of reportTypes) {
      await supabase.from('reports').insert({
        user_id: user_id,
        questionnaire_id: questionnaire_id,
        report_type: reportType.type,
        title: reportType.title,
        status: 'generating',
        created_at: new Date().toISOString(),
      });
    }

    // Option 1: Call external pipeline API
    if (PIPELINE_API_URL) {
      const pipelineResponse = await fetch(PIPELINE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${PIPELINE_API_KEY}`,
        },
        body: JSON.stringify({
          payload: pipelinePayload,
          callback_url: `${supabaseUrl}/functions/v1/pipeline-callback`,
          user_id: user_id,
          questionnaire_id: questionnaire_id,
        }),
      });

      if (!pipelineResponse.ok) {
        throw new Error(`Pipeline API error: ${pipelineResponse.statusText}`);
      }

      const pipelineResult = await pipelineResponse.json();

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Pipeline triggered successfully',
          submission_id: submissionId,
          pipeline_job_id: pipelineResult.job_id,
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    // Option 2: Store payload for manual/scheduled processing
    // This is useful if the pipeline runs on a separate server
    await supabase.from('pipeline_queue').insert({
      id: submissionId,
      user_id: user_id,
      questionnaire_id: questionnaire_id,
      payload: pipelinePayload,
      status: 'pending',
      created_at: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Pipeline job queued',
        submission_id: submissionId,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error: any) {
    console.error('Pipeline trigger error:', error);
    return new Response(
      JSON.stringify({ error: error.message, success: false }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
