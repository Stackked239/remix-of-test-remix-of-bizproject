/**
 * LIL Executive Overview Builder
 * 
 * Dedicated builder for the Executive Overview in the LIL (Essentials) pipeline.
 * This is a NEW report type added in North Star v4.0 — the 9th report.
 * 
 * Purpose: A concise, high-level snapshot designed for board members, advisors,
 * investors, and external stakeholders who need the "big picture" without
 * operational detail.
 * 
 * v4.1: Professional authority framing, Accessible Expert tone.
 * 
 * Report Sections:
 * 1. Cover & Title
 * 2. BLUF (Bottom Line Up Front)
 * 3. One-Page Health Snapshot (overall + 4 chapter scores)
 * 4. Top 3 Priorities (with data)
 * 5. Key Risks & Mitigations
 * 6. 90-Day Outlook
 * 
 * Target: 6-10 pages (North Star v4.0)
 * Brand: BizBlue #242553, BizGreen #969423, Montserrat + Open Sans
 */

import Anthropic from '@anthropic-ai/sdk';
import { logger } from '../../utils/logger.js';
import { LIL_PIPELINE_CONFIG } from '../../config/lil-pipeline.config.js';
import {
  LILIDMOutput,
  LILPhase4_5Output,
  LILGeneratedReport,
  LILBusinessOverview,
  LILCategoryAnalysis
} from '../../types/lil-pipeline.types.js';
import { CategoryCode } from '../../data/question-category-mapping-lil.js';

const anthropic = new Anthropic();

// ═══════════════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════

const CHAPTERS: Array<{ code: string; name: string; categories: CategoryCode[] }> = [
  { code: 'GE', name: 'Growth Engine', categories: ['STR', 'SAL', 'MKT', 'CXP'] },
  { code: 'PH', name: 'Performance & Health', categories: ['OPS', 'FIN'] },
  { code: 'PL', name: 'People & Leadership', categories: ['HRS', 'LDG'] },
  { code: 'RS', name: 'Resilience & Safeguards', categories: ['TIN', 'ITD', 'RMS', 'CMP'] }
];

const CATEGORY_NAMES: Record<string, string> = {
  STR: 'Strategy', LDG: 'Leadership & Governance', RMS: 'Risk Management',
  SAL: 'Sales', MKT: 'Marketing', CXP: 'Customer Experience',
  OPS: 'Operations', FIN: 'Financials', HRS: 'Human Resources',
  TIN: 'Technology & Innovation', ITD: 'IT & Data Security', CMP: 'Compliance'
};

interface ScoreBand { label: string; color: string; bgColor: string; icon: string; }
function getScoreBand(score: number): ScoreBand {
  if (score >= 80) return { label: 'Excellence', color: '#28a745', bgColor: '#d4edda', icon: '●' };
  if (score >= 70) return { label: 'Proficiency', color: '#2563eb', bgColor: '#dbeafe', icon: '●' };
  if (score >= 60) return { label: 'Attention', color: '#d97706', bgColor: '#fef3c7', icon: '▲' };
  if (score >= 40) return { label: 'Concern', color: '#ea580c', bgColor: '#ffedd5', icon: '▲' };
  return { label: 'Critical', color: '#dc3545', bgColor: '#fee2e2', icon: '▼' };
}

function safeNum(val: unknown, fallback: number = 0): number { if (typeof val === 'number' && !isNaN(val)) return val; return fallback; }
function safeStr(val: unknown, fallback: string = ''): string { if (typeof val === 'string' && val.trim().length > 0) return val.trim(); return fallback; }

// ═══════════════════════════════════════════════════════════════════════════
// HTML/CSS TEMPLATE
// ═══════════════════════════════════════════════════════════════════════════

const REPORT_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="generator" content="BizHealth.ai LIL Executive Overview Builder">
  <meta name="robots" content="noindex, nofollow">
  <title>Executive Overview — {{COMPANY_NAME}}</title>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root { --biz-blue: #242553; --biz-green: #969423; --warm-gold: #E8B54D; --excellence: #28a745; --proficiency: #2563eb; --attention: #d97706; --concern: #ea580c; --critical: #dc3545; --text-primary: #333333; --text-secondary: #666666; --bg-light: #f8f9fa; --border-color: #e0e0e0; --card-shadow: 0 2px 8px rgba(0,0,0,0.06); }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 16px; line-height: 1.7; color: var(--text-primary); background: #fff; -webkit-font-smoothing: antialiased; }
    h1, h2, h3, h4, h5 { font-family: 'Montserrat', sans-serif; color: var(--biz-blue); line-height: 1.3; }
    h1 { font-size: 2.25rem; font-weight: 700; } h2 { font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; } h3 { font-size: 1.2rem; font-weight: 600; margin-bottom: 0.75rem; } h4 { font-size: 1rem; font-weight: 600; } p { margin-bottom: 1em; }
    .report-container { max-width: 900px; margin: 0 auto; padding: 0 40px; }
    .report-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 40px; border-bottom: 4px solid var(--biz-blue); background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); }
    .header-logo { font-family: 'Montserrat', sans-serif; font-size: 1.5rem; font-weight: 700; color: var(--biz-blue); } .header-logo span { color: var(--biz-green); }
    .header-meta { text-align: right; font-size: 0.875rem; color: var(--text-secondary); } .header-meta .report-title { font-family: 'Montserrat', sans-serif; font-weight: 600; color: var(--biz-blue); }

    /* Title Section */
    .title-section { text-align: center; padding: 70px 40px; margin: 30px 0; background: linear-gradient(135deg, var(--biz-blue) 0%, #1a1b3d 50%, #2d3570 100%); color: white; border-radius: 12px; position: relative; overflow: hidden; }
    .title-section::before { content: ''; position: absolute; top: -30%; right: -15%; width: 50%; height: 160%; background: rgba(255,255,255,0.02); transform: rotate(15deg); pointer-events: none; }
    .title-section h1 { color: white; margin-bottom: 10px; font-size: 2.5rem; letter-spacing: -0.5px; } .title-section .company-name { color: var(--warm-gold); font-size: 1.6rem; font-weight: 600; font-family: 'Montserrat', sans-serif; }
    .title-section .title-divider { width: 60px; height: 3px; background: var(--biz-green); margin: 20px auto; border-radius: 2px; }
    .title-section .report-subtitle { margin-top: 14px; font-size: 1rem; line-height: 1.6; opacity: 0.95; max-width: 600px; margin-left: auto; margin-right: auto; }
    .title-section .report-date { margin-top: 14px; opacity: 0.9; color: white; font-size: 0.9rem; }
    .title-section .title-plan { font-size: 0.8rem; opacity: 0.55; letter-spacing: 2px; text-transform: uppercase; margin-top: 24px; }
    .title-section .title-confidential { font-size: 0.75rem; opacity: 0.45; margin-top: 10px; font-style: italic; }

    /* BLUF Section */
    .bluf-section { background: linear-gradient(135deg, #242553 0%, #2d3561 100%); color: white; padding: 2rem; border-radius: 12px; margin: 2rem 0; }
    .bluf-section h2 { color: white; font-size: 1.3rem; margin-bottom: 1rem; }
    .bluf-headline { font-size: 1.25rem; font-weight: 600; margin-bottom: 1.25rem; color: var(--warm-gold); line-height: 1.4; }
    .bluf-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
    .bluf-item { background: rgba(255,255,255,0.1); padding: 12px 16px; border-radius: 8px; border-left: 3px solid var(--biz-green); }
    .bluf-item .bluf-label { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; color: rgba(255,255,255,0.85); font-weight: 600; }
    .bluf-item .bluf-value { font-size: 0.95rem; line-height: 1.6; color: white; }

    /* Health Snapshot */
    .snapshot-section { margin: 2.5rem 0; }
    .snapshot-grid { display: grid; grid-template-columns: 200px 1fr; gap: 2rem; align-items: center; margin: 1.5rem 0; }
    .overall-score-circle { width: 180px; height: 180px; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 0 auto; border: 6px solid; }
    .overall-score-circle .score-number { font-family: 'Montserrat', sans-serif; font-size: 3.5rem; font-weight: 700; line-height: 1; } .overall-score-circle .score-label { font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }
    .chapter-cards { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
    .chapter-card { background: white; border: 1px solid var(--border-color); border-radius: 10px; padding: 16px; box-shadow: var(--card-shadow); display: flex; align-items: center; gap: 14px; }
    .chapter-card .ch-score { font-family: 'Montserrat', sans-serif; font-size: 1.75rem; font-weight: 700; min-width: 50px; text-align: center; }
    .chapter-card .ch-info { flex: 1; } .chapter-card .ch-name { font-family: 'Montserrat', sans-serif; font-size: 0.9rem; font-weight: 600; color: var(--biz-blue); } .chapter-card .ch-band { font-size: 0.8rem; color: var(--text-secondary); }

    /* Priorities Section */
    .priorities-section { margin: 2.5rem 0; }
    .priority-card { display: grid; grid-template-columns: 60px 1fr; gap: 1rem; padding: 1.5rem; margin: 1rem 0; background: white; border: 1px solid var(--border-color); border-radius: 12px; box-shadow: var(--card-shadow); align-items: start; }
    .priority-number { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Montserrat', sans-serif; font-size: 1.5rem; font-weight: 700; color: white; }
    .priority-content h3 { margin-bottom: 0.5rem; font-size: 1.1rem; } .priority-content p { font-size: 0.95rem; margin-bottom: 0.5rem; }
    .priority-data { display: flex; gap: 1.5rem; margin-top: 0.5rem; font-size: 0.85rem; color: var(--text-secondary); }
    .priority-data .data-item { display: flex; align-items: center; gap: 4px; }

    /* Risks Section */
    .risks-section { margin: 2.5rem 0; }
    .risk-table { width: 100%; border-collapse: collapse; margin: 1rem 0; border-radius: 10px; overflow: hidden; box-shadow: var(--card-shadow); }
    .risk-table th { background: var(--biz-blue); color: white; padding: 12px 16px; text-align: left; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; }
    .risk-table td { padding: 12px 16px; border-bottom: 1px solid var(--border-color); font-size: 0.9rem; vertical-align: top; }
    .risk-table tr:last-child td { border-bottom: none; }
    .risk-level { display: inline-block; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; padding: 2px 10px; border-radius: 4px; color: white; }
    .risk-level.high { background: #dc3545; } .risk-level.medium { background: #d97706; } .risk-level.low { background: #28a745; }

    /* Outlook Section */
    .outlook-section { margin: 2.5rem 0; }
    .outlook-timeline { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 1.5rem 0; }
    .outlook-phase { background: var(--bg-light); border-radius: 12px; padding: 1.5rem; border-top: 4px solid var(--biz-blue); }
    .outlook-phase h4 { text-align: center; padding: 8px; background: var(--biz-blue); color: white; border-radius: 8px; margin-bottom: 1rem; font-size: 0.9rem; }
    .outlook-phase.phase-30 { border-top-color: #dc3545; } .outlook-phase.phase-30 h4 { background: #dc3545; }
    .outlook-phase.phase-60 { border-top-color: #d97706; } .outlook-phase.phase-60 h4 { background: #d97706; }
    .outlook-phase.phase-90 { border-top-color: #28a745; } .outlook-phase.phase-90 h4 { background: #28a745; }
    .outlook-item { padding: 8px 12px; margin: 6px 0; background: white; border-radius: 8px; font-size: 0.85rem; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
    .outlook-item .oi-cat { display: inline-block; font-family: 'Montserrat', sans-serif; font-size: 0.65rem; font-weight: 700; color: white; background: var(--biz-blue); padding: 1px 6px; border-radius: 3px; text-transform: uppercase; margin-bottom: 3px; }

    /* Closing */
    .closing-callout { background: linear-gradient(135deg, #242553 0%, #2d3561 100%); color: white; padding: 2rem; border-radius: 12px; margin: 2.5rem 0; text-align: center; }
    .closing-callout h3 { color: var(--biz-green); font-size: 1.1rem; margin-bottom: 0.75rem; } .closing-callout .callout-action { font-size: 1.125rem; line-height: 1.6; margin-bottom: 0.5rem; } .closing-callout .callout-meta { font-size: 0.875rem; opacity: 0.8; }

    .report-footer { margin-top: 3rem; padding: 2rem 40px; background: var(--biz-blue); color: white; text-align: center; }
    .footer-logo { font-family: 'Montserrat', sans-serif; font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; } .footer-logo span { color: var(--biz-green); } .report-footer p { font-size: 0.85rem; opacity: 0.8; margin-bottom: 0.25rem; }

    @media print { body { font-size: 11pt; } .report-container { padding: 0 20px; } }
    @media (max-width: 768px) { .bluf-grid { grid-template-columns: 1fr; } .chapter-cards { grid-template-columns: 1fr; } .outlook-timeline { grid-template-columns: 1fr; } .snapshot-grid { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <header class="report-header">
    <div class="header-logo">BizHealth<span>.ai</span></div>
    <div class="header-meta">
      <div class="report-title">Executive Overview</div>
      <div>{{DATE}}</div>
    </div>
  </header>
  <div class="report-container">{{CONTENT}}</div>
  <footer class="report-footer">
    <div class="footer-logo">BizHealth<span>.ai</span></div>
    <p>Executive Overview — Essentials Plan</p>
    <p>&copy; {{YEAR}} BizHealth.ai. All rights reserved.</p>
    <p><em>This report is confidential and intended for authorized recipients only.</em></p>
  </footer>
</body>
</html>`;

// ═══════════════════════════════════════════════════════════════════════════
// SECTION BUILDERS
// ═══════════════════════════════════════════════════════════════════════════

function buildTitleSection(companyName: string, currentDate: string): string {
  return `
    <div class="title-section">
      <h1>Executive Overview</h1>
      <div class="company-name">${companyName}</div>
      <div class="title-divider"></div>
      <div class="report-subtitle">A high-level snapshot of business health across strategy, operations, people, and resilience — designed for board members, advisors, and stakeholders.</div>
      <div class="report-date">${currentDate}</div>
      <div class="title-plan">Essentials Plan</div>
      <div class="title-confidential">Confidential — Prepared exclusively for ${companyName}</div>
    </div>`;
}

function buildBlufSection(bluf?: LILPhase4_5Output['blufs'][keyof LILPhase4_5Output['blufs']]): string {
  if (!bluf) return '';
  return `
    <div class="bluf-section">
      <h2>⚡ Bottom Line Up Front</h2>
      <div class="bluf-headline">${bluf.headline}</div>
      <div class="bluf-grid">
        <div class="bluf-item"><div class="bluf-label">Key Takeaway</div><div class="bluf-value">${bluf.keyTakeaway}</div></div>
        <div class="bluf-item"><div class="bluf-label">Score Highlight</div><div class="bluf-value">${bluf.scoreHighlight}</div></div>
        <div class="bluf-item"><div class="bluf-label">Top Priority</div><div class="bluf-value">${bluf.topPriority}</div></div>
        <div class="bluf-item"><div class="bluf-label">Recommended Action</div><div class="bluf-value">${bluf.callToAction}</div></div>
      </div>
    </div>`;
}

function buildHealthSnapshot(idmOutput: LILIDMOutput): string {
  const overallScore = safeNum(idmOutput.healthScores?.overall, 0);
  const band = getScoreBand(overallScore);

  const chapterCardsHtml = CHAPTERS.map(ch => {
    const chScore = safeNum(idmOutput.healthScores?.byChapter?.[ch.code as keyof typeof idmOutput.healthScores.byChapter], 0);
    const chBand = getScoreBand(chScore);
    return `<div class="chapter-card"><div class="ch-score" style="color: ${chBand.color};">${chScore}</div><div class="ch-info"><div class="ch-name">${ch.name}</div><div class="ch-band">${chBand.icon} ${chBand.label}</div></div></div>`;
  }).join('');

  return `
    <div class="snapshot-section">
      <h2>Business Health Snapshot</h2>
      <div class="snapshot-grid">
        <div class="overall-score-circle" style="border-color: ${band.color}; background: ${band.bgColor};">
          <div class="score-number" style="color: ${band.color};">${overallScore}</div>
          <div class="score-label" style="color: ${band.color};">${band.label}</div>
        </div>
        <div class="chapter-cards">${chapterCardsHtml}</div>
      </div>
    </div>`;
}

function buildTopPriorities(idmOutput: LILIDMOutput): string {
  // Identify top 3 priorities by finding the lowest-scoring categories with the biggest gaps
  const ALL_CATS: CategoryCode[] = ['STR', 'SAL', 'MKT', 'CXP', 'OPS', 'FIN', 'HRS', 'LDG', 'TIN', 'ITD', 'RMS', 'CMP'];
  const catScores = ALL_CATS.map(code => ({
    code,
    score: safeNum(idmOutput.healthScores?.byCategory?.[code], 0),
    gap: 70 - safeNum(idmOutput.healthScores?.byCategory?.[code], 0), // gap to benchmark
    data: idmOutput.categoryData?.[code]
  })).sort((a, b) => b.gap - a.gap);

  const priorities = catScores.filter(c => c.gap > 0).slice(0, 3);
  const colors = ['#dc3545', '#d97706', '#2563eb'];

  const priorityCardsHtml = priorities.map((p, idx) => {
    const catName = CATEGORY_NAMES[p.code] || p.code;
    const topRec = p.data?.recommendations?.[0];
    const description = topRec ? safeStr(topRec.description, `${catName} scored ${p.score}/100, ${p.gap} points below the 70-point benchmark.`) : `${catName} scored ${p.score}/100, ${p.gap} points below the 70-point benchmark.`;
    const timeframe = topRec?.timeframe || '30-day';
    const impact = topRec?.estimatedImpact || `+${Math.min(p.gap, 15)} point improvement potential`;

    return `
      <div class="priority-card">
        <div class="priority-number" style="background: ${colors[idx]};">${idx + 1}</div>
        <div class="priority-content">
          <h3>${catName}: ${topRec ? safeStr(topRec.title, 'Address Gap') : 'Address Gap'}</h3>
          <p>${description}</p>
          <div class="priority-data">
            <div class="data-item">📊 Score: <strong>${p.score}/100</strong></div>
            <div class="data-item">📏 Gap: <strong>${p.gap} pts</strong></div>
            <div class="data-item">⏱ ${timeframe}</div>
            <div class="data-item">📈 ${impact}</div>
          </div>
        </div>
      </div>`;
  }).join('');

  return `
    <div class="priorities-section">
      <h2>Top 3 Priorities</h2>
      <p>The three areas with the largest gap to the 70-point benchmark, ranked by improvement potential and business impact.</p>
      ${priorityCardsHtml}
    </div>`;
}

function buildRisksSection(idmOutput: LILIDMOutput): string {
  // Gather risks from category threats
  const risks: Array<{ area: string; risk: string; level: string; mitigation: string }> = [];
  const ALL_CATS: CategoryCode[] = ['STR', 'SAL', 'MKT', 'CXP', 'OPS', 'FIN', 'HRS', 'LDG', 'TIN', 'ITD', 'RMS', 'CMP'];

  for (const code of ALL_CATS) {
    const catData = idmOutput.categoryData?.[code];
    if (!catData) continue;
    const score = safeNum(catData.score, 0);
    const threats = catData.threats || [];
    const recs = catData.recommendations || [];

    if (threats.length > 0 && score < 70) {
      const level = score < 40 ? 'high' : score < 60 ? 'medium' : 'low';
      const mitigation = recs.length > 0 ? safeStr(recs[0].title, 'Implement improvement plan') : 'Implement improvement plan';
      risks.push({
        area: CATEGORY_NAMES[code] || code,
        risk: threats[0],
        level,
        mitigation
      });
    }
  }

  // Sort by severity and take top 5
  const sortedRisks = risks.sort((a, b) => {
    const order: Record<string, number> = { high: 0, medium: 1, low: 2 };
    return (order[a.level] || 2) - (order[b.level] || 2);
  }).slice(0, 5);

  if (sortedRisks.length === 0) {
    return `
      <div class="risks-section">
        <h2>Key Risks</h2>
        <p>No significant risks identified. All business dimensions are performing at or above benchmark levels.</p>
      </div>`;
  }

  const rowsHtml = sortedRisks.map(r => `
    <tr>
      <td><strong>${r.area}</strong></td>
      <td>${r.risk}</td>
      <td><span class="risk-level ${r.level}">${r.level}</span></td>
      <td>${r.mitigation}</td>
    </tr>`).join('');

  return `
    <div class="risks-section">
      <h2>Key Risks &amp; Mitigations</h2>
      <table class="risk-table">
        <thead><tr><th>Area</th><th>Risk</th><th>Level</th><th>Mitigation</th></tr></thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    </div>`;
}

function buildOutlookSection(idmOutput: LILIDMOutput): string {
  const buildItems = (items: Array<{ action: string; category: CategoryCode; impact: string }>) =>
    items.slice(0, 3).map(item => {
      const catName = CATEGORY_NAMES[item.category] || item.category;
      return `<div class="outlook-item"><span class="oi-cat">${catName}</span><div>${item.action}</div></div>`;
    }).join('');

  return `
    <div class="outlook-section">
      <h2>90-Day Outlook</h2>
      <p>A phased execution plan highlighting the most impactful actions across each 30-day window.</p>
      <div class="outlook-timeline">
        <div class="outlook-phase phase-30"><h4>Days 1–30</h4>${buildItems(idmOutput.roadmap?.thirtyDay || [])}</div>
        <div class="outlook-phase phase-60"><h4>Days 31–60</h4>${buildItems(idmOutput.roadmap?.sixtyDay || [])}</div>
        <div class="outlook-phase phase-90"><h4>Days 61–90</h4>${buildItems(idmOutput.roadmap?.ninetyDay || [])}</div>
      </div>
    </div>`;
}

function buildClosingSection(companyName: string, idmOutput: LILIDMOutput, bluf?: LILPhase4_5Output['blufs'][keyof LILPhase4_5Output['blufs']]): string {
  const callToAction = bluf?.callToAction || 'Schedule a follow-up session to discuss these findings and align on priorities.';
  const overallScore = safeNum(idmOutput.healthScores?.overall, 0);
  const band = getScoreBand(overallScore);
  return `
    <div class="closing-callout">
      <h3>Next Steps</h3>
      <p class="callout-action">${callToAction}</p>
      <p class="callout-meta">Current overall health: <strong>${overallScore}/100 (${band.label})</strong>. For detailed analysis, refer to the Comprehensive Report or the relevant Manager Reports.</p>
    </div>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// AI NARRATIVE GENERATION
// ═══════════════════════════════════════════════════════════════════════════

async function generateExecutiveNarrative(idmOutput: LILIDMOutput, businessOverview: LILBusinessOverview): Promise<{ narrative: string; tokensUsed: number }> {
  const companyName = businessOverview.companyName || 'your company';
  const overallScore = safeNum(idmOutput.healthScores?.overall, 0);

  const chapterContext = CHAPTERS.map(ch => {
    const chScore = safeNum(idmOutput.healthScores?.byChapter?.[ch.code as keyof typeof idmOutput.healthScores.byChapter], 0);
    return `${ch.name}: ${chScore}/100`;
  }).join(', ');

  const prompt = `You are BizHealth.ai's senior analyst writing a brief executive narrative for ${companyName}'s Executive Overview.

COMPANY: ${companyName}
INDUSTRY: ${businessOverview.industry || 'General'}
OVERALL SCORE: ${overallScore}/100
CHAPTER SCORES: ${chapterContext}
TOP STRENGTHS: ${(idmOutput.consolidatedInsights?.topStrengths || []).slice(0, 2).join('; ') || 'N/A'}
TOP GAPS: ${(idmOutput.consolidatedInsights?.topWeaknesses || []).slice(0, 2).join('; ') || 'N/A'}

VOICE RULES (MANDATORY):
- Use "${companyName}" when referring to the business
- Average sentence length: 18-25 words max
- Active voice only
- Tone: Accessible Expert — professional, concise, data-driven
- This is for board/advisor audience — be direct and strategic
- No hat metaphors, no apologetic language about business size

Write a 2-paragraph executive narrative (100-150 words total) that:
1. Summarizes ${companyName}'s overall health position in business context
2. States the single most important strategic takeaway and 90-day trajectory

Output ONLY the HTML paragraphs (using <p> tags). No headings, no wrapper divs.`;

  try {
    const response = await anthropic.messages.create({ model: LIL_PIPELINE_CONFIG.aiConfig.model, max_tokens: 400, messages: [{ role: 'user', content: prompt }] });
    const content = response.content[0]; if (content.type !== 'text') throw new Error('Unexpected response type');
    return { narrative: content.text, tokensUsed: (response.usage?.input_tokens || 0) + (response.usage?.output_tokens || 0) };
  } catch (error) {
    logger.warn({ error }, 'Failed to generate executive narrative, using fallback');
    return { narrative: `<p>${companyName} achieved an overall business health score of ${overallScore}/100. This executive overview provides a high-level snapshot of business health across all four chapters, highlighting the top priorities and key risks for stakeholder review.</p>`, tokensUsed: 0 };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════════

export async function buildLilExecutiveOverview(
  idmOutput: LILIDMOutput, businessOverview: LILBusinessOverview, bluf?: LILPhase4_5Output['blufs'][keyof LILPhase4_5Output['blufs']]
): Promise<{ report: LILGeneratedReport; tokensUsed: number }> {
  const companyName = businessOverview.companyName || 'Company';
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const currentYear = new Date().getFullYear().toString();

  logger.info({ companyName }, 'Building LIL Executive Overview (v4.1)');

  const { narrative, tokensUsed } = await generateExecutiveNarrative(idmOutput, businessOverview);

  const sections = [
    buildTitleSection(companyName, currentDate),
    buildBlufSection(bluf),
    `<div class="snapshot-section"><h2>Executive Narrative</h2>${narrative}</div>`,
    buildHealthSnapshot(idmOutput),
    buildTopPriorities(idmOutput),
    buildRisksSection(idmOutput),
    buildOutlookSection(idmOutput),
    buildClosingSection(companyName, idmOutput, bluf)
  ];

  const contentHtml = sections.join('\n');
  const htmlContent = REPORT_TEMPLATE
    .replace(/{{COMPANY_NAME}}/g, companyName)
    .replace(/{{DATE}}/g, currentDate)
    .replace(/{{YEAR}}/g, currentYear)
    .replace('{{CONTENT}}', contentHtml);

  const pageCount = Math.ceil(htmlContent.length / 3000);

  const report: LILGeneratedReport = {
    reportType: 'executive-overview' as any,
    title: 'Executive Overview',
    htmlContent,
    pageCount,
    sections: [
      'Title & Introduction', 'Bottom Line Up Front', 'Executive Narrative',
      'Business Health Snapshot', 'Top 3 Priorities',
      'Key Risks & Mitigations', '90-Day Outlook', 'Next Steps'
    ],
    generatedAt: new Date().toISOString()
  };

  logger.info({ pageCount, tokensUsed, sectionsGenerated: report.sections.length, htmlLength: htmlContent.length }, 'LIL Executive Overview (v4.1) built successfully');
  return { report, tokensUsed };
}
