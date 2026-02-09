/**
 * LIL Owner's Strategic Report Builder
 * 
 * Dedicated builder for the Owner's Report in the LIL (Essentials) pipeline.
 * v4.1: Professional authority framing, Accessible Expert tone.
 * 
 * Primary categories: STR, FIN, LDG, RMS
 * Secondary context: All categories (for overall health context)
 * 
 * Report Sections:
 * 1. Cover & Title
 * 2. BLUF (Bottom Line Up Front)
 * 3. Executive Summary (AI-generated)
 * 4. Strategic Health Overview (overall + key dimensions)
 * 5. Financial Position
 * 6. Leadership & Governance
 * 7. Risk Assessment
 * 8. Strategic Roadmap (30/60/90)
 * 9. Key Decisions Required
 * 
 * Target: 20-30 pages (North Star v4.0)
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

const OWNER_PRIMARY_CATEGORIES: CategoryCode[] = ['STR', 'FIN', 'LDG', 'RMS'];
const ALL_CATEGORIES: CategoryCode[] = ['STR', 'SAL', 'MKT', 'CXP', 'OPS', 'FIN', 'HRS', 'LDG', 'TIN', 'ITD', 'RMS', 'CMP'];

const CATEGORY_NAMES: Record<string, string> = {
  STR: 'Strategy', LDG: 'Leadership & Governance', RMS: 'Risk Management',
  SAL: 'Sales', MKT: 'Marketing', CXP: 'Customer Experience',
  OPS: 'Operations', FIN: 'Financials', HRS: 'Human Resources',
  TIN: 'Technology & Innovation', ITD: 'IT & Data Security', CMP: 'Compliance'
};

interface ScoreBand { label: string; color: string; bgColor: string; }
function getScoreBand(score: number): ScoreBand {
  if (score >= 80) return { label: 'Excellence', color: '#28a745', bgColor: '#d4edda' };
  if (score >= 70) return { label: 'Proficiency', color: '#2563eb', bgColor: '#dbeafe' };
  if (score >= 60) return { label: 'Attention', color: '#d97706', bgColor: '#fef3c7' };
  if (score >= 40) return { label: 'Concern', color: '#ea580c', bgColor: '#ffedd5' };
  return { label: 'Critical', color: '#dc3545', bgColor: '#fee2e2' };
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
  <meta name="generator" content="BizHealth.ai LIL Owner Report Builder">
  <meta name="robots" content="noindex, nofollow">
  <title>Owner's Strategic Report — {{COMPANY_NAME}}</title>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root { --biz-blue: #242553; --biz-green: #969423; --warm-gold: #E8B54D; --excellence: #28a745; --proficiency: #2563eb; --attention: #d97706; --concern: #ea580c; --critical: #dc3545; --text-primary: #333333; --text-secondary: #666666; --bg-light: #f8f9fa; --border-color: #e0e0e0; --card-shadow: 0 2px 8px rgba(0,0,0,0.06); }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 16px; line-height: 1.7; color: var(--text-primary); background: #fff; -webkit-font-smoothing: antialiased; }
    h1, h2, h3, h4, h5 { font-family: 'Montserrat', sans-serif; color: var(--biz-blue); line-height: 1.3; }
    h1 { font-size: 2.25rem; font-weight: 700; } h2 { font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; } h3 { font-size: 1.2rem; font-weight: 600; margin-bottom: 0.75rem; } h4 { font-size: 1rem; font-weight: 600; } p { margin-bottom: 1em; }
    .report-container { max-width: 1000px; margin: 0 auto; padding: 0 40px; }
    .report-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 40px; border-bottom: 4px solid var(--biz-blue); background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); }
    .header-logo { font-family: 'Montserrat', sans-serif; font-size: 1.5rem; font-weight: 700; color: var(--biz-blue); } .header-logo span { color: var(--biz-green); }
    .header-meta { text-align: right; font-size: 0.875rem; color: var(--text-secondary); } .header-meta .report-title { font-family: 'Montserrat', sans-serif; font-weight: 600; color: var(--biz-blue); }

    .title-section { text-align: center; padding: 60px 40px; margin: 30px 0; background: linear-gradient(135deg, var(--biz-blue) 0%, #2d3570 100%); color: white; border-radius: 12px; }
    .title-section h1 { color: white; margin-bottom: 12px; } .title-section .company-name { color: var(--warm-gold); font-size: 1.75rem; font-weight: 600; font-family: 'Montserrat', sans-serif; }
    .title-section .report-subtitle { margin-top: 16px; font-size: 1.05rem; line-height: 1.6; opacity: 0.95; max-width: 700px; margin-left: auto; margin-right: auto; }
    .title-section .report-date { margin-top: 12px; opacity: 0.9; color: white; font-size: 0.95rem; }

    .bluf-section { background: linear-gradient(135deg, #242553 0%, #2d3561 100%); color: white; padding: 2rem; border-radius: 12px; margin: 2rem 0; }
    .bluf-section h2 { color: white; font-size: 1.3rem; margin-bottom: 1rem; }
    .bluf-headline { font-size: 1.25rem; font-weight: 600; margin-bottom: 1.25rem; color: var(--warm-gold); line-height: 1.4; }
    .bluf-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
    .bluf-item { background: rgba(255,255,255,0.1); padding: 14px 18px; border-radius: 8px; border-left: 3px solid var(--biz-green); }
    .bluf-item .bluf-label { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; color: rgba(255,255,255,0.85); font-weight: 600; }
    .bluf-item .bluf-value { font-size: 0.95rem; line-height: 1.6; color: white; }

    /* Strategic Health Overview */
    .health-overview { margin: 2.5rem 0; }
    .overview-grid { display: grid; grid-template-columns: 200px 1fr; gap: 2rem; align-items: start; margin: 1.5rem 0; }
    .overall-score-circle { width: 180px; height: 180px; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 0 auto; border: 6px solid; }
    .overall-score-circle .score-number { font-family: 'Montserrat', sans-serif; font-size: 3.5rem; font-weight: 700; line-height: 1; } .overall-score-circle .score-label { font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }
    .dimension-bars { display: flex; flex-direction: column; gap: 12px; }
    .dim-bar-row { display: grid; grid-template-columns: 180px 1fr 60px; align-items: center; gap: 12px; }
    .dim-bar-label { font-size: 0.9rem; font-weight: 500; } .dim-bar-track { height: 24px; background: #e9ecef; border-radius: 12px; overflow: hidden; position: relative; } .dim-bar-fill { height: 100%; border-radius: 12px; } .dim-bar-benchmark { position: absolute; top: 0; height: 100%; width: 3px; background: var(--biz-blue); opacity: 0.6; } .dim-bar-score { font-family: 'Montserrat', sans-serif; font-size: 1rem; font-weight: 700; text-align: right; }

    /* Dimension Deep Dive Sections */
    .dimension-section { margin: 2.5rem 0; padding-top: 1.5rem; border-top: 2px solid var(--border-color); }
    .dimension-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 8px; }
    .score-badge { display: inline-block; padding: 6px 16px; border-radius: 20px; font-size: 1rem; font-weight: 700; font-family: 'Montserrat', sans-serif; color: white; }
    .dim-narrative { font-size: 0.95rem; line-height: 1.7; margin-bottom: 1rem; }

    .finding-card { padding: 1.25rem; margin: 1rem 0; border-radius: 10px; border-left: 5px solid; background: white; box-shadow: var(--card-shadow); }
    .finding-card h4 { margin-bottom: 0.5rem; } .finding-card ul { margin-left: 18px; font-size: 0.9rem; } .finding-card li { margin-bottom: 6px; }
    .finding-card.strengths { border-left-color: #28a745; background: linear-gradient(90deg, #f0fff4 0%, white 20%); }
    .finding-card.gaps { border-left-color: #dc3545; background: linear-gradient(90deg, #fff5f5 0%, white 20%); }

    .rec-card { padding: 1.25rem; margin: 1rem 0; background: white; border: 1px solid var(--border-color); border-radius: 10px; box-shadow: var(--card-shadow); }
    .rec-card h4 { margin-bottom: 0.5rem; color: var(--biz-blue); }
    .rec-card p { margin: 0; font-size: 0.9rem; } .rec-meta { display: flex; gap: 1rem; margin-top: 8px; font-size: 0.8rem; color: var(--text-secondary); }
    .priority-tag { display: inline-block; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; padding: 2px 8px; border-radius: 4px; color: white; }
    .priority-tag.high { background: #dc3545; } .priority-tag.medium { background: #d97706; } .priority-tag.low { background: #28a745; }

    .metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin: 1rem 0; }
    .metric-card { background: white; border: 1px solid var(--border-color); border-radius: 10px; padding: 16px; text-align: center; box-shadow: var(--card-shadow); }
    .metric-card .metric-value { font-size: 1.5rem; font-weight: 700; font-family: 'Montserrat', sans-serif; }
    .metric-card .metric-name { font-size: 0.85rem; color: var(--text-secondary); margin-top: 4px; }
    .metric-card .metric-benchmark { font-size: 0.78rem; color: var(--text-secondary); margin-top: 4px; font-style: italic; }

    /* Key Decisions */
    .decisions-section { margin: 2.5rem 0; }
    .decision-card { padding: 1.5rem; margin: 1rem 0; background: linear-gradient(135deg, #f0f4ff 0%, var(--bg-light) 100%); border-radius: 10px; border-left: 5px solid var(--biz-blue); box-shadow: var(--card-shadow); }
    .decision-card h4 { margin-bottom: 0.5rem; } .decision-card p { font-size: 0.9rem; margin: 0; }
    .decision-urgency { display: inline-block; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; padding: 3px 10px; border-radius: 4px; margin-bottom: 8px; }
    .decision-urgency.immediate { background: #fee2e2; color: #dc2626; } .decision-urgency.near-term { background: #fef3c7; color: #d97706; } .decision-urgency.strategic { background: #dbeafe; color: #2563eb; }

    /* Roadmap */
    .roadmap-section { margin: 2.5rem 0; }
    .roadmap-container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 1.5rem 0; }
    .roadmap-column { background: var(--bg-light); padding: 1.5rem; border-radius: 12px; border-top: 4px solid var(--biz-blue); }
    .roadmap-column h4 { text-align: center; padding: 10px; background: var(--biz-blue); color: white; border-radius: 8px; margin-bottom: 1rem; font-size: 0.95rem; }
    .roadmap-column.days-30 { border-top-color: #dc3545; } .roadmap-column.days-30 h4 { background: #dc3545; }
    .roadmap-column.days-60 { border-top-color: #d97706; } .roadmap-column.days-60 h4 { background: #d97706; }
    .roadmap-column.days-90 { border-top-color: #28a745; } .roadmap-column.days-90 h4 { background: #28a745; }
    .roadmap-item { padding: 10px 14px; margin: 8px 0; background: white; border-radius: 8px; font-size: 0.9rem; box-shadow: 0 1px 4px rgba(0,0,0,0.05); }
    .rm-category { display: inline-block; font-family: 'Montserrat', sans-serif; font-size: 0.7rem; font-weight: 700; color: white; background: var(--biz-blue); padding: 2px 8px; border-radius: 4px; text-transform: uppercase; margin-bottom: 4px; }
    .rm-impact { font-size: 0.8rem; color: var(--text-secondary); font-style: italic; margin-top: 4px; }

    /* Closing */
    .closing-callout { background: linear-gradient(135deg, #242553 0%, #2d3561 100%); color: white; padding: 2rem; border-radius: 12px; margin: 2.5rem 0; text-align: center; }
    .closing-callout h3 { color: var(--biz-green); font-size: 1.1rem; margin-bottom: 0.75rem; } .closing-callout .callout-action { font-size: 1.125rem; line-height: 1.6; margin-bottom: 0.5rem; } .closing-callout .callout-meta { font-size: 0.875rem; opacity: 0.8; }

    .report-footer { margin-top: 3rem; padding: 2rem 40px; background: var(--biz-blue); color: white; text-align: center; }
    .footer-logo { font-family: 'Montserrat', sans-serif; font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; } .footer-logo span { color: var(--biz-green); } .report-footer p { font-size: 0.85rem; opacity: 0.8; margin-bottom: 0.25rem; }

    @media print { body { font-size: 11pt; } .report-container { padding: 0 20px; } .dimension-section { break-inside: avoid; } }
    @media (max-width: 768px) { .bluf-grid { grid-template-columns: 1fr; } .roadmap-container { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <header class="report-header">
    <div class="header-logo">BizHealth<span>.ai</span></div>
    <div class="header-meta">
      <div class="report-title">Owner's Strategic Report</div>
      <div>{{DATE}}</div>
    </div>
  </header>
  <div class="report-container">{{CONTENT}}</div>
  <footer class="report-footer">
    <div class="footer-logo">BizHealth<span>.ai</span></div>
    <p>Owner's Strategic Report — Essentials Plan</p>
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
      <h1>Owner's Strategic Report</h1>
      <div class="company-name">${companyName}</div>
      <div class="report-subtitle">A strategic-level analysis of ${companyName}'s business health, focusing on strategy, financial position, leadership, and risk — the four dimensions that most directly impact ownership decisions.</div>
      <div class="report-date">${currentDate}</div>
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

function buildHealthOverview(idmOutput: LILIDMOutput): string {
  const overallScore = safeNum(idmOutput.healthScores?.overall, 0);
  const band = getScoreBand(overallScore);

  // Show all 12 categories as bars for owner context
  const barsHtml = ALL_CATEGORIES.map(code => {
    const score = safeNum(idmOutput.healthScores?.byCategory?.[code], 0);
    const catBand = getScoreBand(score);
    const isPrimary = OWNER_PRIMARY_CATEGORIES.includes(code);
    const name = CATEGORY_NAMES[code] || code;
    return `<div class="dim-bar-row"><div class="dim-bar-label" style="${isPrimary ? 'font-weight: 700;' : ''}">${isPrimary ? '★ ' : ''}${name}</div><div class="dim-bar-track"><div class="dim-bar-fill" style="width: ${score}%; background: ${catBand.color};"></div><div class="dim-bar-benchmark" style="left: 70%;" title="Benchmark: 70"></div></div><div class="dim-bar-score" style="color: ${catBand.color};">${score}</div></div>`;
  }).join('');

  return `
    <div class="health-overview">
      <h2>Strategic Health Overview</h2>
      <div class="overview-grid">
        <div class="overall-score-circle" style="border-color: ${band.color}; background: ${band.bgColor};">
          <div class="score-number" style="color: ${band.color};">${overallScore}</div>
          <div class="score-label" style="color: ${band.color};">${band.label}</div>
        </div>
        <div class="dimension-bars">${barsHtml}</div>
      </div>
      <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.5rem;">★ Primary owner-focus dimensions. Benchmark line at 70/100.</p>
    </div>`;
}

function buildDimensionSection(code: CategoryCode, idmOutput: LILIDMOutput, sectionTitle: string): string {
  const catData = idmOutput.categoryData?.[code];
  if (!catData) return '';
  const catScore = safeNum(catData.score, 0);
  const band = getScoreBand(catScore);
  const catName = CATEGORY_NAMES[code] || code;

  const strengths = (catData.strengths || []).slice(0, 3);
  const weaknesses = (catData.weaknesses || []).slice(0, 3);
  const recs = (catData.recommendations || []).slice(0, 3);
  const metrics = (catData.keyMetrics || []).slice(0, 3);

  const strengthsHtml = strengths.length > 0 ? `<div class="finding-card strengths"><h4>Current Strengths</h4><ul>${strengths.map(s => `<li>${s}</li>`).join('')}</ul></div>` : '';
  const gapsHtml = weaknesses.length > 0 ? `<div class="finding-card gaps"><h4>Areas Requiring Attention</h4><ul>${weaknesses.map(w => `<li>${w}</li>`).join('')}</ul></div>` : '';

  const recsHtml = recs.map(rec => {
    const priority = rec.priority || 'medium';
    return `<div class="rec-card"><h4><span class="priority-tag ${priority}">${priority}</span> ${safeStr(rec.title, 'Improvement Action')}</h4><p>${safeStr(rec.description, '')}</p><div class="rec-meta"><span>⏱ ${safeStr(rec.timeframe, '30-day')}</span>${rec.estimatedImpact ? `<span>📈 ${rec.estimatedImpact}</span>` : ''}</div></div>`;
  }).join('');

  const metricsHtml = metrics.length > 0 ? `<div class="metrics-grid">${metrics.map(m => {
    const statusColor = m.status === 'good' ? '#28a745' : m.status === 'critical' ? '#dc3545' : '#d97706';
    return `<div class="metric-card" style="border-left: 4px solid ${statusColor};"><div class="metric-value" style="color: ${statusColor};">${m.value}</div><div class="metric-name">${m.name}</div>${m.benchmark ? `<div class="metric-benchmark">Benchmark: ${m.benchmark}</div>` : ''}</div>`;
  }).join('')}</div>` : '';

  return `
    <div class="dimension-section">
      <div class="dimension-header">
        <h2>${sectionTitle}</h2>
        <span class="score-badge" style="background: ${band.color};">${catScore}/100 — ${band.label}</span>
      </div>
      <div class="dim-narrative">${safeStr(catData.summary, `${catName} analysis for this business.`)}</div>
      ${metricsHtml}
      ${strengthsHtml}
      ${gapsHtml}
      ${recs.length > 0 ? `<h3>Recommendations</h3>${recsHtml}` : ''}
    </div>`;
}

function buildKeyDecisions(idmOutput: LILIDMOutput, companyName: string): string {
  const decisions: Array<{ title: string; description: string; urgency: string }> = [];

  // Generate decisions from the lowest-scoring primary categories
  for (const code of OWNER_PRIMARY_CATEGORIES) {
    const catData = idmOutput.categoryData?.[code];
    if (!catData) continue;
    const score = safeNum(catData.score, 0);
    const catName = CATEGORY_NAMES[code] || code;

    if (score < 60 && catData.recommendations?.length > 0) {
      const topRec = catData.recommendations[0];
      decisions.push({
        title: `${catName}: ${safeStr(topRec.title, 'Address Critical Gap')}`,
        description: safeStr(topRec.description, `${catName} scored ${score}/100, requiring immediate attention.`),
        urgency: score < 40 ? 'immediate' : 'near-term'
      });
    } else if (score < 70 && catData.recommendations?.length > 0) {
      const topRec = catData.recommendations[0];
      decisions.push({
        title: `${catName}: ${safeStr(topRec.title, 'Optimize Performance')}`,
        description: safeStr(topRec.description, `${catName} scored ${score}/100, with room for improvement.`),
        urgency: 'near-term'
      });
    }
  }

  // Add a strategic decision if overall score is reasonable
  const overallScore = safeNum(idmOutput.healthScores?.overall, 0);
  if (overallScore >= 60) {
    decisions.push({
      title: 'Strategic Growth Investment',
      description: `With an overall health score of ${overallScore}/100, ${companyName} has a foundation to support targeted growth investments. Prioritize the highest-scoring dimensions as competitive advantages.`,
      urgency: 'strategic'
    });
  }

  if (decisions.length === 0) {
    decisions.push({
      title: 'Comprehensive Improvement Plan',
      description: `Review the recommendations across all four primary dimensions and select the top 3 actions for immediate implementation.`,
      urgency: 'immediate'
    });
  }

  const decisionsHtml = decisions.slice(0, 4).map(d => `
    <div class="decision-card">
      <span class="decision-urgency ${d.urgency}">${d.urgency === 'immediate' ? '🔴 Immediate' : d.urgency === 'near-term' ? '🟡 Near-Term' : '🔵 Strategic'}</span>
      <h4>${d.title}</h4>
      <p>${d.description}</p>
    </div>`).join('');

  return `
    <div class="decisions-section">
      <h2>Key Decisions Required</h2>
      <p>The following decisions require owner-level attention based on the assessment findings. Each is prioritized by urgency and potential business impact.</p>
      ${decisionsHtml}
    </div>`;
}

function buildRoadmapSection(idmOutput: LILIDMOutput): string {
  const buildItems = (items: Array<{ action: string; category: CategoryCode; impact: string }>) => {
    const ownerItems = items.filter(item => OWNER_PRIMARY_CATEGORIES.includes(item.category)).slice(0, 4);
    const otherItems = items.filter(item => !OWNER_PRIMARY_CATEGORIES.includes(item.category)).slice(0, 2);
    return [...ownerItems, ...otherItems].slice(0, 5).map(item => {
      const catName = CATEGORY_NAMES[item.category] || item.category;
      return `<div class="roadmap-item"><span class="rm-category">${catName}</span><div>${item.action}</div>${item.impact ? `<div class="rm-impact">${item.impact}</div>` : ''}</div>`;
    }).join('');
  };

  return `
    <div class="roadmap-section">
      <h2>Strategic Roadmap</h2>
      <p>A phased implementation plan prioritizing owner-level strategic, financial, leadership, and risk actions.</p>
      <div class="roadmap-container">
        <div class="roadmap-column days-30"><h4>First 30 Days</h4>${buildItems(idmOutput.roadmap?.thirtyDay || [])}</div>
        <div class="roadmap-column days-60"><h4>Days 31–60</h4>${buildItems(idmOutput.roadmap?.sixtyDay || [])}</div>
        <div class="roadmap-column days-90"><h4>Days 61–90</h4>${buildItems(idmOutput.roadmap?.ninetyDay || [])}</div>
      </div>
    </div>`;
}

function buildClosingSection(companyName: string, idmOutput: LILIDMOutput, bluf?: LILPhase4_5Output['blufs'][keyof LILPhase4_5Output['blufs']]): string {
  const callToAction = bluf?.callToAction || 'Schedule a follow-up consultation to discuss strategic priorities and next steps.';
  const overallScore = safeNum(idmOutput.healthScores?.overall, 0);
  const band = getScoreBand(overallScore);
  return `
    <div class="closing-callout">
      <h3>Next Steps</h3>
      <p class="callout-action">${callToAction}</p>
      <p class="callout-meta">Current overall health: <strong>${overallScore}/100 (${band.label})</strong>. Executing the strategic roadmap positions ${companyName} for measurable improvement within 90 days.</p>
    </div>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// AI NARRATIVE GENERATION
// ═══════════════════════════════════════════════════════════════════════════

async function generateOwnerSummary(idmOutput: LILIDMOutput, businessOverview: LILBusinessOverview): Promise<{ narrative: string; tokensUsed: number }> {
  const companyName = businessOverview.companyName || 'your company';
  const overallScore = safeNum(idmOutput.healthScores?.overall, 0);

  const dimContext = OWNER_PRIMARY_CATEGORIES.map(code => {
    const score = safeNum(idmOutput.healthScores?.byCategory?.[code], 0);
    const catData = idmOutput.categoryData?.[code];
    const strengths = (catData?.strengths || []).slice(0, 2).join('; ');
    const gaps = (catData?.weaknesses || []).slice(0, 2).join('; ');
    return `${CATEGORY_NAMES[code]}: ${score}/100. Strengths: ${strengths || 'N/A'}. Gaps: ${gaps || 'N/A'}.`;
  }).join('\n');

  const prompt = `You are BizHealth.ai's senior strategic advisor writing an executive summary for ${companyName}'s Owner's Strategic Report.

COMPANY: ${companyName}
INDUSTRY: ${businessOverview.industry || 'General'}
OVERALL SCORE: ${overallScore}/100

OWNER-FOCUS DIMENSIONS:
${dimContext}

CRITICAL ACTIONS: ${(idmOutput.consolidatedInsights?.criticalActions || []).slice(0, 3).join('; ') || 'N/A'}

VOICE RULES (MANDATORY):
- Use "${companyName}" when referring to the business
- Average sentence length: 18-25 words max
- Active voice only
- Lead with findings and evidence, not platitudes
- Tone: Accessible Expert — professional, competent, data-driven
- Reading level: 10th-12th grade
- Address the reader as the business owner/decision-maker
- No hat metaphors, no apologetic language about business size

Write a 3-4 paragraph executive summary (200-280 words total) that:
1. Opens with ${companyName}'s overall position and what it means for the owner
2. Highlights the strongest owner-focus dimension and its strategic value
3. Identifies the #1 risk or gap requiring owner attention with data
4. Closes with a clear statement about the 90-day strategic opportunity

Output ONLY the HTML paragraphs (using <p> tags). No headings, no wrapper divs.`;

  try {
    const response = await anthropic.messages.create({ model: LIL_PIPELINE_CONFIG.aiConfig.model, max_tokens: 700, messages: [{ role: 'user', content: prompt }] });
    const content = response.content[0]; if (content.type !== 'text') throw new Error('Unexpected response type');
    return { narrative: content.text, tokensUsed: (response.usage?.input_tokens || 0) + (response.usage?.output_tokens || 0) };
  } catch (error) {
    logger.warn({ error }, 'Failed to generate owner summary, using fallback');
    return { narrative: `<p>${companyName} achieved an overall business health score of ${overallScore}/100. This report examines the four dimensions most critical to ownership decisions: strategy, financials, leadership, and risk management. The findings below identify specific opportunities for strengthening the business foundation within the next 90 days.</p>`, tokensUsed: 0 };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════════

export async function buildLilOwnerReport(
  idmOutput: LILIDMOutput, businessOverview: LILBusinessOverview, bluf?: LILPhase4_5Output['blufs'][keyof LILPhase4_5Output['blufs']]
): Promise<{ report: LILGeneratedReport; tokensUsed: number }> {
  const companyName = businessOverview.companyName || 'Company';
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const currentYear = new Date().getFullYear().toString();

  logger.info({ companyName }, 'Building LIL Owner Report (v4.1)');

  const { narrative, tokensUsed } = await generateOwnerSummary(idmOutput, businessOverview);

  const sections = [
    buildTitleSection(companyName, currentDate),
    buildBlufSection(bluf),
    `<div class="health-overview"><h2>Executive Summary</h2>${narrative}</div>`,
    buildHealthOverview(idmOutput),
    buildDimensionSection('STR', idmOutput, 'Strategic Position'),
    buildDimensionSection('FIN', idmOutput, 'Financial Position'),
    buildDimensionSection('LDG', idmOutput, 'Leadership & Governance'),
    buildDimensionSection('RMS', idmOutput, 'Risk Assessment'),
    buildRoadmapSection(idmOutput),
    buildKeyDecisions(idmOutput, companyName),
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
    reportType: 'owner',
    title: "Owner's Strategic Report",
    htmlContent,
    pageCount,
    sections: [
      'Title & Introduction', 'Bottom Line Up Front', 'Executive Summary',
      'Strategic Health Overview', 'Strategic Position', 'Financial Position',
      'Leadership & Governance', 'Risk Assessment', 'Strategic Roadmap',
      'Key Decisions Required', 'Next Steps'
    ],
    generatedAt: new Date().toISOString()
  };

  logger.info({ pageCount, tokensUsed, sectionsGenerated: report.sections.length, htmlLength: htmlContent.length }, 'LIL Owner Report (v4.1) built successfully');
  return { report, tokensUsed };
}
