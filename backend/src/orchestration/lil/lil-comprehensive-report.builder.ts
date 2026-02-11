/**
 * LIL Comprehensive Business Health Report Builder
 * 
 * Dedicated builder for the Comprehensive Report in the LIL (Essentials) pipeline.
 * Covers ALL 12 categories organized into 4 chapters per North Star v4.0.
 * v4.1: Professional authority framing, Accessible Expert tone.
 * 
 * Chapter Structure:
 *   Chapter 1: Growth Engine (STR, SAL, MKT, CXP)
 *   Chapter 2: Performance & Health (OPS, FIN)
 *   Chapter 3: People & Leadership (HRS, LDG)
 *   Chapter 4: Resilience & Safeguards (TIN, ITD, RMS, CMP)
 * 
 * Report Sections:
 * 1. Cover & Title
 * 2. Executive Summary (AI-generated)
 * 3. Business Health Score Overview (overall + 12-category dashboard)
 * 4. Chapter 1: Growth Engine
 * 5. Chapter 2: Performance & Health
 * 6. Chapter 3: People & Leadership
 * 7. Chapter 4: Resilience & Safeguards
 * 8. 30-60-90 Day Action Plan
 * 9. Appendix: Methodology
 * 
 * Target: 30-50 pages (North Star v4.0)
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

const ALL_CATEGORIES: CategoryCode[] = ['STR', 'SAL', 'MKT', 'CXP', 'OPS', 'FIN', 'HRS', 'LDG', 'TIN', 'ITD', 'RMS', 'CMP'];

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

interface ScoreBand { label: string; cssClass: string; color: string; bgColor: string; }
function getScoreBand(score: number): ScoreBand {
  if (score >= 80) return { label: 'Excellence', cssClass: 'score-excellence', color: '#28a745', bgColor: '#d4edda' };
  if (score >= 70) return { label: 'Proficiency', cssClass: 'score-proficiency', color: '#2563eb', bgColor: '#dbeafe' };
  if (score >= 60) return { label: 'Attention', cssClass: 'score-attention', color: '#d97706', bgColor: '#fef3c7' };
  if (score >= 40) return { label: 'Concern', cssClass: 'score-concern', color: '#ea580c', bgColor: '#ffedd5' };
  return { label: 'Critical', cssClass: 'score-critical', color: '#dc3545', bgColor: '#fee2e2' };
}

function getSeverityBadge(score: number): { label: string; color: string; bgColor: string; borderColor: string } {
  if (score <= 20) return { label: 'Critical Gap', color: '#dc2626', bgColor: '#fee2e2', borderColor: '#dc2626' };
  if (score <= 39) return { label: 'Significant Gap', color: '#ea580c', bgColor: '#ffedd5', borderColor: '#ea580c' };
  if (score <= 59) return { label: 'Area for Improvement', color: '#d97706', bgColor: '#fef3c7', borderColor: '#d97706' };
  return { label: 'Below Target', color: '#2563eb', bgColor: '#dbeafe', borderColor: '#2563eb' };
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
  <meta name="generator" content="BizHealth.ai LIL Comprehensive Report Builder">
  <meta name="robots" content="noindex, nofollow">
  <title>Comprehensive Business Health Report — {{COMPANY_NAME}}</title>
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
    /* Cover Page */
    .cover-page { min-height: 100vh; background: linear-gradient(135deg, var(--biz-blue) 0%, #1a1b3d 50%, #2d3570 100%); color: white; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 60px 40px; position: relative; overflow: hidden; page-break-after: always; }
    .cover-page::before { content: ''; position: absolute; top: -30%; right: -15%; width: 50%; height: 160%; background: rgba(255,255,255,0.02); transform: rotate(15deg); pointer-events: none; }
    .cover-page .cover-logo { font-family: 'Montserrat', sans-serif; font-size: 2rem; font-weight: 700; margin-bottom: 60px; letter-spacing: 1px; } .cover-page .cover-logo span { color: var(--biz-green); }
    .cover-page h1 { color: white; font-size: 2.75rem; font-weight: 700; margin-bottom: 16px; letter-spacing: -0.5px; }
    .cover-page .company-name { color: var(--warm-gold); font-size: 1.75rem; font-weight: 600; font-family: 'Montserrat', sans-serif; margin-bottom: 12px; }
    .cover-page .cover-divider { width: 80px; height: 3px; background: var(--biz-green); margin: 24px auto; border-radius: 2px; }
    .cover-page .role-framing { font-size: 1.05rem; color: rgba(255,255,255,0.85); line-height: 1.7; max-width: 700px; margin: 0 auto 30px; }
    .cover-page .report-date { font-size: 1rem; opacity: 0.8; margin-bottom: 8px; }
    .cover-page .cover-plan { font-size: 0.85rem; opacity: 0.6; letter-spacing: 2px; text-transform: uppercase; margin-top: 40px; }
    .cover-page .cover-confidential { font-size: 0.8rem; opacity: 0.5; margin-top: 12px; font-style: italic; }

    /* BLUF Section */
    .bluf-section { background: linear-gradient(135deg, #242553 0%, #2d3561 100%); color: white; padding: 2rem; border-radius: 12px; margin: 2rem 0; }
    .bluf-section h2 { color: white; font-size: 1.3rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 10px; }
    .bluf-headline { font-size: 1.25rem; font-weight: 600; margin-bottom: 1.25rem; color: var(--warm-gold); line-height: 1.4; }
    .bluf-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
    .bluf-item { background: rgba(255,255,255,0.1); padding: 14px 18px; border-radius: 8px; border-left: 3px solid var(--biz-green); }
    .bluf-item .bluf-label { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; color: rgba(255,255,255,0.85); font-weight: 600; }
    .bluf-item .bluf-value { font-size: 0.95rem; line-height: 1.6; color: white; }

    /* Score Overview */
    .score-overview { margin: 2.5rem 0; }
    .score-overview-grid { display: grid; grid-template-columns: 200px 1fr; gap: 2rem; align-items: start; margin: 1.5rem 0; }
    .overall-score-circle { width: 180px; height: 180px; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 0 auto; border: 6px solid; }
    .overall-score-circle .score-number { font-family: 'Montserrat', sans-serif; font-size: 3.5rem; font-weight: 700; line-height: 1; } .overall-score-circle .score-label { font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }
    .score-context { font-size: 1rem; line-height: 1.7; }

    /* 12-Category Dashboard */
    .category-dashboard { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin: 2rem 0; }
    .cat-dash-item { background: white; border: 2px solid var(--border-color); border-radius: 10px; padding: 18px 14px; text-align: center; box-shadow: var(--card-shadow); transition: border-color 0.2s; }
    .cat-dash-item .cat-name-header { font-family: 'Montserrat', sans-serif; font-size: 0.8rem; font-weight: 700; color: var(--biz-blue); line-height: 1.3; margin-bottom: 8px; min-height: 2.2em; }
    .cat-dash-item .cat-score { font-family: 'Montserrat', sans-serif; font-size: 2rem; font-weight: 700; display: block; margin-bottom: 2px; }
    .cat-dash-item .cat-band-label { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; padding: 3px 10px; border-radius: 12px; display: inline-block; margin-bottom: 6px; }
    .cat-dash-item .benchmark-ind { font-size: 0.72rem; font-weight: 600; padding: 2px 10px; border-radius: 12px; display: inline-block; }
    .benchmark-ind.above { background: #d4edda; color: #155724; } .benchmark-ind.at { background: #fff3cd; color: #856404; } .benchmark-ind.below { background: #f8d7da; color: #721c24; }

    /* Chapter Sections */
    .chapter-section { margin: 3rem 0; padding-top: 2rem; border-top: 3px solid var(--biz-blue); }
    .chapter-header { display: flex; align-items: center; gap: 12px; margin-bottom: 1.5rem; }
    .chapter-number { display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; background: var(--biz-blue); color: white; font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 1.1rem; }
    .chapter-title { font-size: 1.5rem; font-weight: 700; color: var(--biz-blue); margin: 0; }
    .chapter-intro { font-size: 1rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.5rem; font-style: italic; }
    .chapter-score-bar { display: flex; align-items: center; gap: 14px; margin-bottom: 1.5rem; padding: 14px 20px; border-radius: 10px; border: 2px solid; }
    .chapter-score-bar .ch-score { font-family: 'Montserrat', sans-serif; font-size: 1.75rem; font-weight: 700; }
    .chapter-score-bar .ch-band-pill { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; padding: 4px 14px; border-radius: 14px; color: white; }
    .chapter-score-bar .ch-label { font-size: 0.9rem; color: var(--text-primary); font-weight: 500; }
    .chapter-score-bar .ch-descriptor { font-size: 0.85rem; color: var(--text-secondary); margin-left: auto; font-style: italic; max-width: 50%; text-align: right; line-height: 1.4; }

    /* Category Cards */
    .category-card { background: var(--bg-light); border-left: 5px solid var(--biz-green); padding: 1.5rem; margin: 1.5rem 0; border-radius: 0 12px 12px 0; box-shadow: var(--card-shadow); }
    .category-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 8px; }
    .category-card-header h3 { margin: 0; font-size: 1.4rem; font-weight: 700; color: var(--biz-blue); }
    .cat-score-badge { display: inline-block; padding: 6px 16px; border-radius: 20px; font-size: 1rem; font-weight: 700; font-family: 'Montserrat', sans-serif; color: white; }
    .category-summary { font-size: 0.95rem; line-height: 1.7; margin-bottom: 1rem; }

    /* SWOT Grid */
    .swot-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin: 1rem 0; }
    .swot-box { padding: 14px; border-radius: 8px; }
    .swot-box h4 { margin-bottom: 8px; font-size: 0.95rem; } .swot-box ul { margin-left: 18px; font-size: 0.9rem; } .swot-box li { margin-bottom: 6px; }
    .swot-box.strengths { background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%); border: 1px solid #b1dfbb; }
    .swot-box.weaknesses { background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%); border: 1px solid #f1b0b7; }
    .swot-box.opportunities { background: linear-gradient(135deg, #d1ecf1 0%, #bee5eb 100%); border: 1px solid #abdde5; }
    .swot-box.threats { background: linear-gradient(135deg, #fff3cd 0%, #ffeeba 100%); border: 1px solid #ffeaa7; }

    /* Recommendations */
    .rec-list { margin: 1rem 0; }
    .rec-item { padding: 14px 16px; margin: 10px 0; background: white; border: 1px solid var(--border-color); border-radius: 10px; box-shadow: 0 2px 6px rgba(0,0,0,0.04); }
    .rec-item.high { border-left: 5px solid var(--critical); } .rec-item.medium { border-left: 5px solid var(--attention); } .rec-item.low { border-left: 5px solid var(--excellence); }
    .rec-item h5 { font-family: 'Montserrat', sans-serif; font-size: 0.95rem; font-weight: 600; color: var(--biz-blue); margin-bottom: 6px; }
    .rec-item p { margin: 0; font-size: 0.9rem; } .rec-meta { display: flex; gap: 1rem; margin-top: 8px; font-size: 0.8rem; color: var(--text-secondary); }
    .priority-tag { display: inline-block; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; padding: 2px 8px; border-radius: 4px; }
    .priority-tag.high { background: var(--critical); color: white; } .priority-tag.medium { background: var(--attention); color: white; } .priority-tag.low { background: var(--excellence); color: white; }

    /* Key Metrics */
    .metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin: 1rem 0; }
    .metric-card { background: white; border: 1px solid var(--border-color); border-radius: 10px; padding: 16px; text-align: center; box-shadow: var(--card-shadow); }
    .metric-card .metric-value { font-size: 1.5rem; font-weight: 700; color: var(--biz-blue); font-family: 'Montserrat', sans-serif; }
    .metric-card .metric-name { font-size: 0.85rem; color: var(--text-secondary); margin-top: 4px; }
    .metric-card .metric-benchmark { font-size: 0.78rem; color: var(--text-secondary); margin-top: 4px; font-style: italic; }

    /* Roadmap / Action Plan */
    .action-plan-section { margin: 2.5rem 0; }
    .roadmap-container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 1.5rem 0; }
    .roadmap-column { background: var(--bg-light); padding: 1.5rem; border-radius: 12px; border-top: 4px solid var(--biz-blue); }
    .roadmap-column h4 { text-align: center; padding: 10px; background: var(--biz-blue); color: white; border-radius: 8px; margin-bottom: 1rem; font-size: 0.95rem; }
    .roadmap-column.days-30 { border-top-color: var(--critical); } .roadmap-column.days-30 h4 { background: var(--critical); }
    .roadmap-column.days-60 { border-top-color: var(--attention); } .roadmap-column.days-60 h4 { background: var(--attention); }
    .roadmap-column.days-90 { border-top-color: var(--excellence); } .roadmap-column.days-90 h4 { background: var(--excellence); }
    .roadmap-item { padding: 10px 14px; margin: 8px 0; background: white; border-radius: 8px; font-size: 0.9rem; box-shadow: 0 1px 4px rgba(0,0,0,0.05); }
    .roadmap-item .rm-category { display: inline-block; font-family: 'Montserrat', sans-serif; font-size: 0.7rem; font-weight: 700; color: white; background: var(--biz-blue); padding: 2px 8px; border-radius: 4px; text-transform: uppercase; margin-bottom: 4px; }
    .roadmap-item .rm-action { font-size: 0.9rem; margin-bottom: 4px; } .roadmap-item .rm-impact { font-size: 0.8rem; color: var(--text-secondary); font-style: italic; }

    /* Appendix */
    .appendix-section { margin: 2.5rem 0; padding: 2rem; background: var(--bg-light); border-radius: 12px; border: 1px solid var(--border-color); }
    .appendix-section h2 { margin-bottom: 1.5rem; }
    .methodology-item { margin-bottom: 1.25rem; } .methodology-item h4 { margin-bottom: 0.25rem; } .methodology-item p { font-size: 0.9rem; color: var(--text-secondary); margin: 0; }

    /* Closing */
    .closing-callout { background: linear-gradient(135deg, #242553 0%, #2d3561 100%); color: white; padding: 2rem; border-radius: 12px; margin: 2.5rem 0; text-align: center; }
    .closing-callout h3 { color: var(--biz-green); font-size: 1.1rem; margin-bottom: 0.75rem; } .closing-callout .callout-action { font-size: 1.125rem; line-height: 1.6; margin-bottom: 0.5rem; } .closing-callout .callout-meta { font-size: 0.875rem; opacity: 0.8; }

    .report-footer { margin-top: 3rem; padding: 2rem 40px; background: var(--biz-blue); color: white; text-align: center; }
    .footer-logo { font-family: 'Montserrat', sans-serif; font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; } .footer-logo span { color: var(--biz-green); } .report-footer p { font-size: 0.85rem; opacity: 0.8; margin-bottom: 0.25rem; }

    @media print { body { font-size: 11pt; } .report-container { padding: 0 20px; } .cover-page { min-height: 100vh; page-break-after: always; } .chapter-section { break-before: page; } .category-card { break-inside: avoid; } }
    @media (max-width: 768px) { .category-dashboard { grid-template-columns: repeat(2, 1fr); } .swot-grid { grid-template-columns: 1fr; } .roadmap-container { grid-template-columns: 1fr; } .bluf-grid { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <header class="report-header">
    <div class="header-logo">BizHealth<span>.ai</span></div>
    <div class="header-meta">
      <div class="report-title">Comprehensive Business Health Report</div>
      <div>{{DATE}}</div>
    </div>
  </header>
  <div class="report-container">{{CONTENT}}</div>
  <footer class="report-footer">
    <div class="footer-logo">BizHealth<span>.ai</span></div>
    <p>Comprehensive Business Health Report — Essentials Plan</p>
    <p>&copy; {{YEAR}} BizHealth.ai. All rights reserved.</p>
    <p><em>This report is confidential and intended for authorized recipients only.</em></p>
  </footer>
</body>
</html>`;

// ═══════════════════════════════════════════════════════════════════════════
// SECTION BUILDERS
// ═══════════════════════════════════════════════════════════════════════════

function buildCoverPage(companyName: string, currentDate: string): string {
  return `
    <div class="cover-page">
      <div class="cover-logo">BizHealth<span>.ai</span></div>
      <h1>Comprehensive Business Health Report</h1>
      <div class="company-name">${companyName}</div>
      <div class="cover-divider"></div>
      <div class="role-framing">A complete analysis of all 12 business health dimensions across strategy, operations, people, and resilience — with data-driven recommendations and a 90-day action plan.</div>
      <div class="report-date">${currentDate}</div>
      <div class="cover-plan">Essentials Plan</div>
      <div class="cover-confidential">Confidential — Prepared exclusively for ${companyName}</div>
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

function buildScoreOverview(idmOutput: LILIDMOutput): string {
  const overallScore = safeNum(idmOutput.healthScores?.overall, 0);
  const band = getScoreBand(overallScore);

  // 12-category dashboard
  const dashboardHtml = ALL_CATEGORIES.map(code => {
    const score = safeNum(idmOutput.healthScores?.byCategory?.[code], 0);
    const catBand = getScoreBand(score);
    const catData = idmOutput.categoryData?.[code];
    const benchmark = catData?.benchmarkComparison || 'at';
    const benchmarkLabel = benchmark === 'above' ? '▲ Above' : benchmark === 'below' ? '▼ Below' : '● At Benchmark';
    return `<div class="cat-dash-item" style="border-color: ${catBand.color};"><div class="cat-name-header">${CATEGORY_NAMES[code]}</div><div class="cat-score" style="color: ${catBand.color};">${score}</div><span class="cat-band-label" style="background: ${catBand.bgColor}; color: ${catBand.color};">${catBand.label}</span><br/><span class="benchmark-ind ${benchmark}">${benchmarkLabel}</span></div>`;
  }).join('');

  const chapterDescriptors: Record<string, Record<string, string>> = {
    GE: { Excellence: 'Strong growth trajectory across all dimensions', Proficiency: 'Solid growth foundation with room to optimize', Attention: 'Growth engine needs targeted improvements', Concern: 'Significant gaps in revenue-driving capabilities', Critical: 'Growth engine requires urgent intervention' },
    PH: { Excellence: 'Operations and finances running at peak efficiency', Proficiency: 'Sound operational and financial management', Attention: 'Operational or financial gaps need attention', Concern: 'Performance sustainability at risk', Critical: 'Immediate operational and financial stabilization needed' },
    PL: { Excellence: 'Exceptional people strategy and governance', Proficiency: 'Capable team with solid leadership structures', Attention: 'People and leadership gaps emerging', Concern: 'Talent and governance weaknesses impacting results', Critical: 'Leadership and people infrastructure critically weak' },
    RS: { Excellence: 'Robust safeguards across all risk dimensions', Proficiency: 'Good resilience with minor exposure areas', Attention: 'Some safeguard gaps require attention', Concern: 'Business exposed to material risks', Critical: 'Critical vulnerabilities across resilience dimensions' }
  };

  // Chapter scores bar
  const chapterBarsHtml = CHAPTERS.map(ch => {
    const chScore = safeNum(idmOutput.healthScores?.byChapter?.[ch.code as keyof typeof idmOutput.healthScores.byChapter], 0);
    const chBand = getScoreBand(chScore);
    const descriptor = chapterDescriptors[ch.code]?.[chBand.label] || '';
    return `<div class="chapter-score-bar" style="border-color: ${chBand.color}; background: ${chBand.bgColor};"><span class="ch-score" style="color: ${chBand.color};">${chScore}</span><span class="ch-band-pill" style="background: ${chBand.color};">${chBand.label}</span><span class="ch-label">${ch.name}</span>${descriptor ? `<span class="ch-descriptor">${descriptor}</span>` : ''}</div>`;
  }).join('');

  return `
    <div class="score-overview">
      <h2>Business Health Score Overview</h2>
      <div class="score-overview-grid">
        <div class="overall-score-circle" style="border-color: ${band.color}; background: ${band.bgColor};">
          <div class="score-number" style="color: ${band.color};">${overallScore}</div>
          <div class="score-label" style="color: ${band.color};">${band.label}</div>
        </div>
        <div class="score-context">
          ${chapterBarsHtml}
        </div>
      </div>
      <h3>12-Category Dashboard</h3>
      <div class="category-dashboard">${dashboardHtml}</div>
    </div>`;
}

function buildChapterSection(chapter: typeof CHAPTERS[number], chapterIndex: number, idmOutput: LILIDMOutput): string {
  const chScore = safeNum(idmOutput.healthScores?.byChapter?.[chapter.code as keyof typeof idmOutput.healthScores.byChapter], 0);
  const chBand = getScoreBand(chScore);

  const chapterIntros: Record<string, string> = {
    GE: 'The Growth Engine encompasses the strategic, sales, marketing, and customer experience dimensions that drive revenue and market position.',
    PH: 'Performance & Health examines the operational efficiency and financial management practices that sustain day-to-day business viability.',
    PL: 'People & Leadership evaluates the human capital and governance structures that enable organizational capability and culture.',
    RS: 'Resilience & Safeguards assesses the technology, security, risk management, and compliance frameworks that protect the business.'
  };

  // Build category cards for this chapter
  const categoryCardsHtml = chapter.categories.map(code => {
    const catData = idmOutput.categoryData?.[code];
    if (!catData) return '';
    const catScore = safeNum(catData.score, 0);
    const catBand = getScoreBand(catScore);
    const catName = CATEGORY_NAMES[code] || code;

    const strengths = (catData.strengths || []).slice(0, 3);
    const weaknesses = (catData.weaknesses || []).slice(0, 3);
    const opportunities = (catData.opportunities || []).slice(0, 3);
    const threats = (catData.threats || []).slice(0, 3);

    const swotHtml = `<div class="swot-grid">
      ${strengths.length > 0 ? `<div class="swot-box strengths"><h4>Strengths</h4><ul>${strengths.map(s => `<li>${s}</li>`).join('')}</ul></div>` : ''}
      ${weaknesses.length > 0 ? `<div class="swot-box weaknesses"><h4>Areas for Improvement</h4><ul>${weaknesses.map(w => `<li>${w}</li>`).join('')}</ul></div>` : ''}
      ${opportunities.length > 0 ? `<div class="swot-box opportunities"><h4>Opportunities</h4><ul>${opportunities.map(o => `<li>${o}</li>`).join('')}</ul></div>` : ''}
      ${threats.length > 0 ? `<div class="swot-box threats"><h4>Threats</h4><ul>${threats.map(t => `<li>${t}</li>`).join('')}</ul></div>` : ''}
    </div>`;

    // Recommendations
    const recs = (catData.recommendations || []).slice(0, 3);
    const recsHtml = recs.length > 0 ? `<div class="rec-list"><h4>Recommendations</h4>${recs.map(rec => {
      const priority = rec.priority || 'medium';
      return `<div class="rec-item ${priority}"><h5><span class="priority-tag ${priority}">${priority}</span> ${safeStr(rec.title, 'Improvement Action')}</h5><p>${safeStr(rec.description, '')}</p><div class="rec-meta"><span>⏱ ${safeStr(rec.timeframe, '30-day')}</span>${rec.estimatedImpact ? `<span>📈 ${rec.estimatedImpact}</span>` : ''}</div></div>`;
    }).join('')}</div>` : '';

    // Key Metrics
    const metrics = (catData.keyMetrics || []).slice(0, 3);
    const metricsHtml = metrics.length > 0 ? `<div class="metrics-grid">${metrics.map(m => {
      const statusColor = m.status === 'good' ? '#28a745' : m.status === 'critical' ? '#dc3545' : '#d97706';
      return `<div class="metric-card" style="border-left: 4px solid ${statusColor};"><div class="metric-value" style="color: ${statusColor};">${m.value}</div><div class="metric-name">${m.name}</div>${m.benchmark ? `<div class="metric-benchmark">Benchmark: ${m.benchmark}</div>` : ''}</div>`;
    }).join('')}</div>` : '';

    const benchmarkStatus = catData.benchmarkComparison || 'at';
    const benchmarkLabel = benchmarkStatus === 'above' ? 'Above Benchmark' : benchmarkStatus === 'below' ? 'Below Benchmark' : 'At Benchmark';

    return `
      <div class="category-card" style="border-left-color: ${catBand.color};">
        <div class="category-card-header">
          <h3>${catName}</h3>
          <span class="cat-score-badge" style="background: ${catBand.color};">${catScore}/100 — ${catBand.label}</span>
        </div>
        <span class="benchmark-ind ${benchmarkStatus}" style="margin-bottom: 12px; display: inline-block;">${benchmarkLabel}</span>
        <div class="category-summary">${safeStr(catData.summary, `${catName} analysis for this business.`)}</div>
        ${metricsHtml}
        ${swotHtml}
        ${recsHtml}
      </div>`;
  }).join('');

  return `
    <div class="chapter-section">
      <div class="chapter-header">
        <span class="chapter-number">${chapterIndex + 1}</span>
        <h2 class="chapter-title">${chapter.name}</h2>
      </div>
      <div class="chapter-intro">${chapterIntros[chapter.code] || ''}</div>
      <div class="chapter-score-bar" style="border-color: ${chBand.color}; background: ${chBand.bgColor};">
        <span class="ch-score" style="color: ${chBand.color};">${chScore}/100</span>
        <span class="ch-band-pill" style="background: ${chBand.color};">${chBand.label}</span>
        <span class="ch-label">Chapter Score</span>
      </div>
      ${categoryCardsHtml}
    </div>`;
}

function buildActionPlanSection(idmOutput: LILIDMOutput): string {
  const buildItems = (items: Array<{ action: string; category: CategoryCode; impact: string }>) => items.slice(0, 5).map(item => {
    const catName = CATEGORY_NAMES[item.category] || item.category;
    return `<div class="roadmap-item"><span class="rm-category">${catName}</span><div class="rm-action">${item.action}</div>${item.impact ? `<div class="rm-impact">${item.impact}</div>` : ''}</div>`;
  }).join('');

  const thirtyDay = idmOutput.roadmap?.thirtyDay || [];
  const sixtyDay = idmOutput.roadmap?.sixtyDay || [];
  const ninetyDay = idmOutput.roadmap?.ninetyDay || [];

  return `
    <div class="action-plan-section">
      <h2>30-60-90 Day Action Plan</h2>
      <p>A phased implementation plan prioritized by impact and urgency. Each phase builds on the previous phase's progress across all business dimensions.</p>
      <div class="roadmap-container">
        <div class="roadmap-column days-30"><h4>First 30 Days</h4>${buildItems(thirtyDay)}</div>
        <div class="roadmap-column days-60"><h4>Days 31–60</h4>${buildItems(sixtyDay)}</div>
        <div class="roadmap-column days-90"><h4>Days 61–90</h4>${buildItems(ninetyDay)}</div>
      </div>
    </div>`;
}

function buildAppendix(): string {
  return `
    <div class="appendix-section">
      <h2>Appendix: Methodology</h2>
      <div class="methodology-item"><h4>Assessment Framework</h4><p>The BizHealth.ai assessment evaluates 12 business dimensions across 45 questions, each mapped to specific categories and weighted by relevance to small business health.</p></div>
      <div class="methodology-item"><h4>Scoring System</h4><p>Scores range from 0-100 per category. Bands: Excellence (80-100), Proficiency (70-79), Attention (60-69), Concern (40-59), Critical (0-39). Benchmarks are derived from industry-specific micro-business data.</p></div>
      <div class="methodology-item"><h4>Chapter Aggregation</h4><p>Chapter scores are weighted averages of their constituent categories, adjusted for question count and category importance within each chapter.</p></div>
      <div class="methodology-item"><h4>Recommendations</h4><p>All recommendations are generated from assessment data and prioritized using a combination of gap-to-benchmark analysis, impact potential, and implementation feasibility for small businesses.</p></div>
      <div class="methodology-item"><h4>Data Privacy</h4><p>All assessment data is processed securely and confidentially. Reports are generated for the exclusive use of the assessed business and its authorized stakeholders.</p></div>
    </div>`;
}

function buildClosingSection(companyName: string, idmOutput: LILIDMOutput, bluf?: LILPhase4_5Output['blufs'][keyof LILPhase4_5Output['blufs']]): string {
  const callToAction = bluf?.callToAction || 'Schedule a follow-up consultation to discuss findings and prioritize next steps.';
  const overallScore = safeNum(idmOutput.healthScores?.overall, 0);
  const band = getScoreBand(overallScore);
  return `
    <div class="closing-callout">
      <h3>Next Steps</h3>
      <p class="callout-action">${callToAction}</p>
      <p class="callout-meta">Current overall health: <strong>${overallScore}/100 (${band.label})</strong>. Executing the 90-day action plan positions ${companyName} for measurable improvement across all business dimensions.</p>
    </div>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// AI NARRATIVE GENERATION
// ═══════════════════════════════════════════════════════════════════════════

async function generateExecutiveSummary(idmOutput: LILIDMOutput, businessOverview: LILBusinessOverview): Promise<{ narrative: string; tokensUsed: number }> {
  const companyName = businessOverview.companyName || 'your company';
  const overallScore = safeNum(idmOutput.healthScores?.overall, 0);

  const chapterContext = CHAPTERS.map(ch => {
    const chScore = safeNum(idmOutput.healthScores?.byChapter?.[ch.code as keyof typeof idmOutput.healthScores.byChapter], 0);
    return `${ch.name}: ${chScore}/100`;
  }).join(', ');

  const topStrengths = (idmOutput.consolidatedInsights?.topStrengths || []).slice(0, 3).join('; ');
  const topWeaknesses = (idmOutput.consolidatedInsights?.topWeaknesses || []).slice(0, 3).join('; ');

  const prompt = `You are BizHealth.ai's senior business analyst writing the executive summary for ${companyName}'s Comprehensive Business Health Report.

COMPANY: ${companyName}
INDUSTRY: ${businessOverview.industry || 'General'}
OVERALL SCORE: ${overallScore}/100
CHAPTER SCORES: ${chapterContext}
TOP STRENGTHS: ${topStrengths || 'N/A'}
TOP GAPS: ${topWeaknesses || 'N/A'}
CRITICAL ACTIONS: ${(idmOutput.consolidatedInsights?.criticalActions || []).slice(0, 3).join('; ') || 'N/A'}

VOICE RULES (MANDATORY):
- Use "${companyName}" when referring to the business
- Average sentence length: 18-25 words max
- Active voice only
- Lead with findings and evidence, not platitudes
- Tone: Accessible Expert — professional, competent, data-driven
- Reading level: 10th-12th grade
- Acknowledge strengths FIRST, then address gaps constructively
- No hat metaphors, no apologetic language about business size
- Treat the reader as a competent decision-maker

Write a 4-5 paragraph executive summary (250-350 words total) that:
1. Opens with ${companyName}'s overall health score and what it means in context
2. Highlights the strongest chapter and its business implications
3. Identifies the weakest chapter and the #1 priority gap with data
4. Summarizes the cross-cutting themes across all 4 chapters
5. Closes with a forward-looking statement about the 90-day trajectory

Output ONLY the HTML paragraphs (using <p> tags). No headings, no wrapper divs.`;

  try {
    const response = await anthropic.messages.create({ model: LIL_PIPELINE_CONFIG.aiConfig.model, max_tokens: 800, messages: [{ role: 'user', content: prompt }] });
    const content = response.content[0]; if (content.type !== 'text') throw new Error('Unexpected response type');
    return { narrative: content.text, tokensUsed: (response.usage?.input_tokens || 0) + (response.usage?.output_tokens || 0) };
  } catch (error) {
    logger.warn({ error }, 'Failed to generate executive summary, using fallback');
    return { narrative: `<p>${companyName} achieved an overall business health score of ${overallScore}/100. This comprehensive assessment examines all 12 business dimensions across strategy, operations, people, and resilience. The findings below identify specific strengths to leverage and priority gaps to address within the next 90 days.</p>`, tokensUsed: 0 };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════════

export async function buildLilComprehensiveReport(
  idmOutput: LILIDMOutput, businessOverview: LILBusinessOverview, bluf?: LILPhase4_5Output['blufs'][keyof LILPhase4_5Output['blufs']]
): Promise<{ report: LILGeneratedReport; tokensUsed: number }> {
  const companyName = businessOverview.companyName || 'Company';
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const currentYear = new Date().getFullYear().toString();

  logger.info({ companyName }, 'Building LIL Comprehensive Report (v4.1)');

  const { narrative, tokensUsed } = await generateExecutiveSummary(idmOutput, businessOverview);

  const sections = [
    buildCoverPage(companyName, currentDate),
    buildBlufSection(bluf),
    `<div class="score-overview"><h2>Executive Summary</h2>${narrative}</div>`,
    buildScoreOverview(idmOutput),
    ...CHAPTERS.map((ch, idx) => buildChapterSection(ch, idx, idmOutput)),
    buildActionPlanSection(idmOutput),
    buildAppendix(),
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
    reportType: 'comprehensive',
    title: 'Comprehensive Business Health Report',
    htmlContent,
    pageCount,
    sections: [
      'Cover Page', 'Bottom Line Up Front', 'Executive Summary',
      'Business Health Score Overview', 'Chapter 1: Growth Engine',
      'Chapter 2: Performance & Health', 'Chapter 3: People & Leadership',
      'Chapter 4: Resilience & Safeguards', '30-60-90 Day Action Plan',
      'Appendix: Methodology', 'Next Steps'
    ],
    generatedAt: new Date().toISOString()
  };

  logger.info({ pageCount, tokensUsed, sectionsGenerated: report.sections.length, htmlLength: htmlContent.length }, 'LIL Comprehensive Report (v4.1) built successfully');
  return { report, tokensUsed };
}
