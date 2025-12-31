import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { Resend } from 'https://esm.sh/resend@4.0.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const resendApiKey = Deno.env.get('RESEND_API_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const resend = new Resend(resendApiKey);

    console.log('Starting 404 report generation...');

    // Calculate date range for last month
    const now = new Date();
    const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    console.log('Fetching 404 logs from', firstDayLastMonth.toISOString(), 'to', lastDayLastMonth.toISOString());

    // Fetch 404 logs from last month
    const { data: logs, error: fetchError } = await supabase
      .from('page_not_found_logs')
      .select('*')
      .gte('timestamp', firstDayLastMonth.toISOString())
      .lte('timestamp', lastDayLastMonth.toISOString())
      .order('timestamp', { ascending: false });

    if (fetchError) {
      console.error('Error fetching logs:', fetchError);
      throw fetchError;
    }

    console.log(`Found ${logs?.length || 0} 404 errors for last month`);

    // Generate statistics
    const totalErrors = logs?.length || 0;
    
    // Count by URL
    const urlCounts = new Map<string, number>();
    logs?.forEach(log => {
      urlCounts.set(log.attempted_url, (urlCounts.get(log.attempted_url) || 0) + 1);
    });

    // Top 10 most common 404s
    const top10Urls = Array.from(urlCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    // Count unique IPs
    const uniqueIps = new Set(logs?.map(log => log.ip_address).filter(Boolean));

    // Generate HTML report
    const monthName = firstDayLastMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
    
    const htmlReport = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      color: #0f1c38;
      border-bottom: 3px solid #00d97e;
      padding-bottom: 10px;
    }
    h2 {
      color: #0f1c38;
      margin-top: 30px;
    }
    .stats {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .stat-item {
      margin: 10px 0;
      font-size: 18px;
    }
    .stat-label {
      font-weight: bold;
      color: #0f1c38;
    }
    .stat-value {
      color: #00d97e;
      font-weight: bold;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    th {
      background: #0f1c38;
      color: white;
    }
    tr:hover {
      background: #f8f9fa;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      color: #666;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <h1>BizHealth.ai - 404 Error Report</h1>
  <p><strong>Report Period:</strong> ${monthName}</p>
  
  <div class="stats">
    <h2>Summary Statistics</h2>
    <div class="stat-item">
      <span class="stat-label">Total 404 Errors:</span>
      <span class="stat-value">${totalErrors}</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">Unique URLs Attempted:</span>
      <span class="stat-value">${urlCounts.size}</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">Unique Visitors:</span>
      <span class="stat-value">${uniqueIps.size}</span>
    </div>
  </div>

  <h2>Top 10 Most Common 404 Errors</h2>
  <table>
    <thead>
      <tr>
        <th>Rank</th>
        <th>Attempted URL</th>
        <th>Count</th>
      </tr>
    </thead>
    <tbody>
      ${top10Urls.map(([url, count], index) => `
        <tr>
          <td>${index + 1}</td>
          <td><code>${url}</code></td>
          <td><strong>${count}</strong></td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  ${totalErrors === 0 ? '<p><em>No 404 errors recorded this month! 🎉</em></p>' : ''}

  <div class="footer">
    <p>This is an automated monthly report from BizHealth.ai.</p>
    <p>Generated on ${now.toLocaleString()}</p>
  </div>
</body>
</html>
    `;

    console.log('Sending email report to support@bizhealth.ai...');

    // Send email
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'BizHealth.ai Analytics <onboarding@resend.dev>',
      to: ['support@bizhealth.ai'],
      subject: `404 Error Report - ${monthName}`,
      html: htmlReport,
    });

    if (emailError) {
      console.error('Error sending email:', emailError);
      throw emailError;
    }

    console.log('Email sent successfully:', emailData);

    return new Response(
      JSON.stringify({ 
        success: true, 
        totalErrors,
        uniqueUrls: urlCounts.size,
        emailId: emailData.id 
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error('Error in send-404-report function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
});
