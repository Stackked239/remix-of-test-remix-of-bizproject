/**
 * LIL Manager IT & Technology Report Builder
 * 
 * Dedicated builder for the Manager IT & Technology Report in the LIL (Essentials) pipeline.
 * v4.1: Role-based authority framing (no hat metaphors per exec team decision)
 * 
 * Primary categories: TIN, ITD
 * Secondary categories: RMS (for risk context)
 * 
 * 7-Section Structure:
 * 1. Cover & Introduction + Company Context
 * 2. IT & Technology Snapshot
 * 3. Key Metrics Dashboard
 * 4. Category Deep Dives (TIN, ITD)
 * 5. Monthly Action Plan (30/60/90)
 * 6. Essential Tools & Templates
 * 7. Progress Tracker
 * 
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

const PRIMARY_CATEGORIES: CategoryCode[] = ['TIN', 'ITD'];
const ALL_SCOPED_CATEGORIES: CategoryCode[] = ['TIN', 'ITD', 'RMS'];

const CATEGORY_NAMES: Record<string, string> = {
  STR: 'Strategy', LDG: 'Leadership & Governance', RMS: 'Risk Management',
  SAL: 'Sales', MKT: 'Marketing', CXP: 'Customer Experience',
  OPS: 'Operations', FIN: 'Financials', HRS: 'Human Resources',
  TIN: 'Technology & Innovation', ITD: 'IT & Data Security', CMP: 'Compliance'
};

interface ScoreBand { label: string; cssClass: string; color: string; bgColor: string; recommendation: string; }
function getScoreBand(score: number): ScoreBand {
  if (score >= 80) return { label: 'Excellence', cssClass: 'score-excellence', color: '#28a745', bgColor: '#d4edda', recommendation: 'Monitor & Maintain' };
  if (score >= 70) return { label: 'Proficiency', cssClass: 'score-proficiency', color: '#2563eb', bgColor: '#dbeafe', recommendation: 'Optimize & Refine' };
  if (score >= 60) return { label: 'Attention', cssClass: 'score-attention', color: '#d97706', bgColor: '#fef3c7', recommendation: 'Active Improvement' };
  if (score >= 40) return { label: 'Concern', cssClass: 'score-concern', color: '#ea580c', bgColor: '#ffedd5', recommendation: 'Active Improvement' };
  return { label: 'Critical', cssClass: 'score-critical', color: '#dc3545', bgColor: '#fee2e2', recommendation: 'Immediate Focus' };
}

interface PriorityTier { label: string; cssClass: string; color: string; bgColor: string; recommendation: string; }
function getPriorityTier(score: number): PriorityTier {
  if (score >= 80) return { label: 'Maintain', cssClass: 'priority-maintain', color: '#28a745', bgColor: '#d4edda', recommendation: 'Monitor & Maintain' };
  if (score >= 70) return { label: 'Optimize', cssClass: 'priority-optimize', color: '#2563eb', bgColor: '#dbeafe', recommendation: 'Optimize & Refine' };
  if (score >= 60) return { label: 'Medium Priority', cssClass: 'priority-medium', color: '#d97706', bgColor: '#fef3c7', recommendation: 'Active Improvement' };
  if (score >= 40) return { label: 'High Priority', cssClass: 'priority-high', color: '#ea580c', bgColor: '#ffedd5', recommendation: 'Active Improvement' };
  return { label: 'Urgent', cssClass: 'priority-urgent', color: '#dc3545', bgColor: '#fee2e2', recommendation: 'Immediate Focus' };
}

function applyPriorityBumps(dimensions: Array<{ code: CategoryCode; score: number; gapToBenchmark: number }>, tiers: Map<CategoryCode, PriorityTier>): Map<CategoryCode, PriorityTier> {
  if (dimensions.length === 0) return tiers;
  const lowestScoring = dimensions.reduce((min, d) => d.score < min.score ? d : min, dimensions[0]);
  const largestGap = dimensions.reduce((max, d) => d.gapToBenchmark > max.gapToBenchmark ? d : max, dimensions[0]);
  const bumpTier = (tier: PriorityTier): PriorityTier => {
    if (tier.label === 'Maintain') return { label: 'Optimize', cssClass: 'priority-optimize', color: '#2563eb', bgColor: '#dbeafe', recommendation: 'Optimize & Refine' };
    if (tier.label === 'Optimize') return { label: 'Medium Priority', cssClass: 'priority-medium', color: '#d97706', bgColor: '#fef3c7', recommendation: 'Active Improvement' };
    if (tier.label === 'Medium Priority') return { label: 'High Priority', cssClass: 'priority-high', color: '#ea580c', bgColor: '#ffedd5', recommendation: 'Active Improvement' };
    if (tier.label === 'High Priority') return { label: 'Urgent', cssClass: 'priority-urgent', color: '#dc3545', bgColor: '#fee2e2', recommendation: 'Immediate Focus' };
    return tier;
  };
  const currentLowest = tiers.get(lowestScoring.code);
  if (currentLowest) tiers.set(lowestScoring.code, bumpTier(currentLowest));
  if (largestGap.code !== lowestScoring.code) { const currentGap = tiers.get(largestGap.code); if (currentGap) tiers.set(largestGap.code, bumpTier(currentGap)); }
  return tiers;
}

function getSeverityBadge(score: number): { label: string; color: string; bgColor: string; borderColor: string } {
  if (score <= 20) return { label: 'Critical Gap', color: '#dc2626', bgColor: '#fee2e2', borderColor: '#dc2626' };
  if (score <= 39) return { label: 'Significant Gap', color: '#ea580c', bgColor: '#ffedd5', borderColor: '#ea580c' };
  if (score <= 59) return { label: 'Area for Improvement', color: '#d97706', bgColor: '#fef3c7', borderColor: '#d97706' };
  return { label: 'Below Target', color: '#2563eb', bgColor: '#dbeafe', borderColor: '#2563eb' };
}

function calculateExpectedOutcome(currentScore: number, benchmarkScore: number = 80): { expectedScore: number; improvementPoints: number; gapClosurePercent: number } {
  const gap = Math.max(0, benchmarkScore - currentScore);
  const gapClosurePercent = 50;
  const improvementPoints = Math.round(gap * (gapClosurePercent / 100));
  return { expectedScore: currentScore + improvementPoints, improvementPoints, gapClosurePercent };
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
  <meta name="generator" content="BizHealth.ai LIL Manager IT & Technology Report Builder">
  <meta name="robots" content="noindex, nofollow">
  <title>Manager IT & Technology Report — {{COMPANY_NAME}}</title>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root { --biz-blue: #242553; --biz-green: #969423; --warm-gold: #E8B54D; --excellence: #28a745; --proficiency: #2563eb; --attention: #d97706; --critical: #dc3545; --text-primary: #333333; --text-secondary: #666666; --bg-light: #f8f9fa; --border-color: #e0e0e0; --card-shadow: 0 2px 8px rgba(0,0,0,0.06); }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 16px; line-height: 1.7; color: var(--text-primary); background: #fff; -webkit-font-smoothing: antialiased; }
    h1, h2, h3, h4, h5 { font-family: 'Montserrat', sans-serif; color: var(--biz-blue); line-height: 1.3; }
    h1 { font-size: 2.25rem; font-weight: 700; } h2 { font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; } h3 { font-size: 1.2rem; font-weight: 600; margin-bottom: 0.75rem; } h4 { font-size: 1rem; font-weight: 600; } p { margin-bottom: 1em; }
    .report-container { max-width: 1000px; margin: 0 auto; padding: 0 40px; }
    .report-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 40px; border-bottom: 4px solid var(--biz-blue); background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); }
    .header-logo { font-family: 'Montserrat', sans-serif; font-size: 1.5rem; font-weight: 700; color: var(--biz-blue); } .header-logo span { color: var(--biz-green); }
    .header-meta { text-align: right; font-size: 0.875rem; color: var(--text-secondary); } .header-meta .report-title { font-family: 'Montserrat', sans-serif; font-weight: 600; color: var(--biz-blue); }
    .title-section { text-align: center; padding: 50px 40px; margin: 30px 0; background: linear-gradient(135deg, var(--biz-blue) 0%, #2d3570 100%); color: white; border-radius: 12px; }
    .title-section h1 { color: white; margin-bottom: 12px; } .title-section .company-name { color: var(--warm-gold); font-size: 1.5rem; font-weight: 600; font-family: 'Montserrat', sans-serif; }
    .title-section .role-framing { margin-top: 16px; font-size: 1rem; line-height: 1.6; opacity: 0.95; max-width: 700px; margin-left: auto; margin-right: auto; }
    .title-section .report-date { margin-top: 12px; opacity: 0.9; color: white; font-size: 0.95rem; }
    .priority-callout { background: linear-gradient(135deg, #242553 0%, #2d3561 100%); color: white; padding: 2rem; border-radius: 12px; margin: 2rem 0; text-align: center; }
    .priority-callout h3 { color: var(--biz-green); font-size: 1.1rem; margin-bottom: 0.75rem; } .priority-callout .callout-action { font-size: 1.125rem; line-height: 1.6; margin-bottom: 0.5rem; } .priority-callout .callout-meta { font-size: 0.875rem; opacity: 0.8; }
    .snapshot-section { margin: 2rem 0; }
    .snapshot-grid { display: grid; grid-template-columns: 200px 1fr; gap: 2rem; align-items: start; margin: 1.5rem 0; }
    .overall-score-circle { width: 160px; height: 160px; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 0 auto; border: 6px solid; }
    .overall-score-circle .score-number { font-family: 'Montserrat', sans-serif; font-size: 3rem; font-weight: 700; line-height: 1; } .overall-score-circle .score-label { font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }
    .dimension-bars { display: flex; flex-direction: column; gap: 12px; }
    .dimension-bar-row { display: grid; grid-template-columns: 180px 1fr 60px; align-items: center; gap: 12px; }
    .dimension-bar-label { font-size: 0.9rem; font-weight: 500; color: var(--text-primary); } .dimension-bar-track { height: 24px; background: #e9ecef; border-radius: 12px; overflow: hidden; position: relative; } .dimension-bar-fill { height: 100%; border-radius: 12px; } .dimension-bar-benchmark { position: absolute; top: 0; height: 100%; width: 3px; background: var(--biz-blue); opacity: 0.6; } .dimension-bar-score { font-family: 'Montserrat', sans-serif; font-size: 1rem; font-weight: 700; text-align: right; }
    .priority-table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; border-radius: 10px; overflow: hidden; box-shadow: var(--card-shadow); }
    .priority-table th { background: var(--biz-blue); color: white; padding: 12px 16px; text-align: left; font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
    .priority-table td { padding: 14px 16px; border-bottom: 1px solid var(--border-color); font-size: 0.95rem; } .priority-table tr:last-child td { border-bottom: none; } .priority-table tr:hover { background: var(--bg-light); }
    .priority-badge { display: inline-block; padding: 4px 14px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; }
    .deep-dive-section { margin: 2.5rem 0; }
    .finding-card { padding: 1.5rem; margin: 1.25rem 0; border-radius: 10px; border-left: 5px solid; background: white; box-shadow: var(--card-shadow); }
    .finding-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; } .finding-card-header h4 { margin: 0; }
    .severity-badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; }
    .finding-narrative { font-size: 0.95rem; line-height: 1.7; margin-bottom: 0.75rem; }
    .finding-action { background: var(--bg-light); padding: 0.75rem 1rem; border-radius: 8px; font-size: 0.9rem; } .finding-action strong { color: var(--biz-blue); }
    .evidence-citation { background: #f8f9fa; border-left: 4px solid var(--biz-green); padding: 0.75rem 1rem; margin: 0.75rem 0; font-size: 0.9rem; border-radius: 0 6px 6px 0; } .evidence-citation strong { color: var(--biz-blue); }
    .quick-wins-section { margin: 2.5rem 0; }
    .quick-win-card { padding: 1.5rem; margin: 1.25rem 0; background: white; border: 1px solid var(--border-color); border-radius: 10px; box-shadow: var(--card-shadow); }
    .quick-win-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; } .quick-win-header h4 { margin: 0; flex: 1; }
    .quick-win-score-change { display: flex; align-items: center; gap: 6px; font-family: 'Montserrat', sans-serif; font-size: 0.9rem; font-weight: 600; white-space: nowrap; } .quick-win-score-change .arrow-up { color: var(--excellence); }
    .quick-win-body { font-size: 0.95rem; line-height: 1.7; }
    .quick-win-meta { display: flex; gap: 1.5rem; margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid var(--border-color); font-size: 0.85rem; color: var(--text-secondary); flex-wrap: wrap; } .quick-win-meta span { display: flex; align-items: center; gap: 4px; }
    .accountable-tag { display: inline-block; background: var(--bg-light); padding: 2px 10px; border-radius: 4px; font-size: 0.8rem; font-weight: 500; color: var(--biz-blue); }
    .action-plan-section { margin: 2.5rem 0; }
    .action-plan-month { margin: 1.5rem 0; padding: 1.5rem; background: white; border-radius: 10px; box-shadow: var(--card-shadow); }
    .action-plan-month h3 { display: flex; align-items: center; gap: 8px; padding-bottom: 0.75rem; border-bottom: 2px solid var(--border-color); margin-bottom: 1rem; }
    .action-plan-month.month-1 h3 { border-bottom-color: var(--critical); } .action-plan-month.month-2 h3 { border-bottom-color: var(--attention); } .action-plan-month.month-3 h3 { border-bottom-color: var(--excellence); }
    .action-item { display: grid; grid-template-columns: 24px 1fr auto auto; gap: 12px; align-items: start; padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 0.95rem; } .action-item:last-child { border-bottom: none; }
    .action-checkbox { width: 20px; height: 20px; border: 2px solid var(--border-color); border-radius: 4px; margin-top: 2px; }
    .action-time { font-size: 0.8rem; color: var(--text-secondary); white-space: nowrap; } .action-impact { font-size: 0.8rem; color: var(--proficiency); font-weight: 500; white-space: nowrap; }
    .ongoing-habits { margin: 1.5rem 0; padding: 1.5rem; background: linear-gradient(135deg, #f0f4ff 0%, var(--bg-light) 100%); border-radius: 10px; border-left: 5px solid var(--biz-blue); }
    .ongoing-habits h3 { display: flex; align-items: center; gap: 8px; } .habit-item { padding: 8px 0; font-size: 0.95rem; display: flex; align-items: center; gap: 8px; }
    .metrics-section { margin: 2.5rem 0; }
    .metric-enhanced-card { padding: 1.25rem; margin: 1rem 0; background: white; border: 1px solid var(--border-color); border-radius: 10px; box-shadow: var(--card-shadow); }
    .metric-enhanced-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; } .metric-enhanced-header h4 { margin: 0; font-size: 0.95rem; }
    .metric-scores { display: flex; gap: 1rem; align-items: baseline; } .metric-current { font-family: 'Montserrat', sans-serif; font-size: 1.5rem; font-weight: 700; } .metric-target { font-size: 0.85rem; color: var(--text-secondary); } .metric-target span { font-weight: 600; color: var(--proficiency); }
    .metric-progress-bar { height: 8px; background: #e9ecef; border-radius: 4px; overflow: hidden; margin: 0.5rem 0; } .metric-progress-fill { height: 100%; border-radius: 4px; }
    .metric-guidance { font-size: 0.85rem; color: var(--text-secondary); font-style: italic; margin-top: 0.5rem; }
    .gap-chart-section { margin: 2rem 0; }
    .gap-bar-row { display: grid; grid-template-columns: 180px 1fr 80px; align-items: center; gap: 12px; padding: 8px 0; }
    .gap-bar-label { font-size: 0.9rem; font-weight: 500; } .gap-bar-container { height: 28px; background: #e9ecef; border-radius: 6px; overflow: hidden; position: relative; } .gap-bar-current { height: 100%; border-radius: 6px; position: relative; } .gap-bar-target { position: absolute; top: 0; height: 100%; width: 3px; background: var(--biz-blue); z-index: 2; } .gap-bar-remaining { position: absolute; top: 0; height: 100%; background: repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(0,0,0,0.05) 4px, rgba(0,0,0,0.05) 8px); border-radius: 0 6px 6px 0; } .gap-bar-value { font-family: 'Montserrat', sans-serif; font-size: 0.9rem; font-weight: 600; text-align: right; }
    .tools-section { margin: 2.5rem 0; }
    .tool-card { padding: 1.25rem; margin: 1rem 0; background: white; border: 1px solid var(--border-color); border-radius: 10px; box-shadow: var(--card-shadow); display: grid; grid-template-columns: auto 1fr; gap: 1rem; align-items: start; } .tool-icon { font-size: 2rem; } .tool-card h4 { margin: 0 0 0.5rem 0; } .tool-card p { margin: 0; font-size: 0.9rem; color: var(--text-secondary); }
    .progress-tracker { margin: 2.5rem 0; }
    .tracker-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 1.5rem 0; }
    .tracker-card { padding: 1.25rem; background: white; border: 1px solid var(--border-color); border-radius: 10px; box-shadow: var(--card-shadow); text-align: center; } .tracker-card .tracker-score { font-family: 'Montserrat', sans-serif; font-size: 2rem; font-weight: 700; } .tracker-card .tracker-label { font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.25rem; } .tracker-card .tracker-target { font-size: 0.8rem; color: var(--proficiency); font-weight: 600; margin-top: 0.5rem; }
    .report-footer { margin-top: 3rem; padding: 2rem 40px; background: var(--biz-blue); color: white; text-align: center; }
    .footer-logo { font-family: 'Montserrat', sans-serif; font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; } .footer-logo span { color: var(--biz-green); } .report-footer p { font-size: 0.85rem; opacity: 0.8; margin-bottom: 0.25rem; }
    @media print { body { font-size: 11pt; } .report-container { padding: 0 20px; } .title-section, .priority-callout { break-inside: avoid; } .finding-card, .quick-win-card, .action-plan-month { break-inside: avoid; } }
  </style>
</head>
<body>
  <header class="report-header">
    <div class="header-logo">BizHealth<span>.ai</span></div>
    <div class="header-meta">
      <div class="report-title">Manager IT & Technology Report</div>
      <div>{{DATE}}</div>
    </div>
  </header>
  <div class="report-container">{{CONTENT}}</div>
  <footer class="report-footer">
    <div class="footer-logo">BizHealth<span>.ai</span></div>
    <p>Manager IT & Technology Report — Essentials Plan</p>
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
      <h1>Manager IT & Technology Report</h1>
      <div class="company-name">${companyName}</div>
      <div class="role-framing">Technology infrastructure and digital capabilities determine how efficiently ${companyName} operates and how securely it protects its data. This report analyzes technology readiness, IT security posture, and innovation capacity to deliver actionable recommendations.</div>
      <div class="report-date">${currentDate}</div>
    </div>`;
}

function buildSnapshotSection(idmOutput: LILIDMOutput): string {
  const overallScore = safeNum(idmOutput.healthScores?.overall, 0);
  const overallBand = getScoreBand(overallScore);
  const dimensionBarsHtml = PRIMARY_CATEGORIES.map(code => {
    const score = safeNum(idmOutput.healthScores?.byCategory?.[code], 0);
    const band = getScoreBand(score);
    const name = CATEGORY_NAMES[code] || code;
    return `
      <div class="dimension-bar-row">
        <div class="dimension-bar-label">${name}</div>
        <div class="dimension-bar-track">
          <div class="dimension-bar-fill" style="width: ${score}%; background: ${band.color};"></div>
          <div class="dimension-bar-benchmark" style="left: 70%;" title="Industry Benchmark: 70"></div>
        </div>
        <div class="dimension-bar-score" style="color: ${band.color};">${score}</div>
      </div>`;
  }).join('');

  return `
    <div class="snapshot-section">
      <h2>IT & Technology Health Snapshot</h2>
      <div class="snapshot-grid">
        <div class="overall-score-circle" style="border-color: ${overallBand.color}; background: ${overallBand.bgColor};">
          <div class="score-number" style="color: ${overallBand.color};">${overallScore}</div>
          <div class="score-label" style="color: ${overallBand.color};">${overallBand.label}</div>
        </div>
        <div class="dimension-bars">${dimensionBarsHtml}</div>
      </div>
    </div>`;
}

function buildPriorityCallout(idmOutput: LILIDMOutput): string {
  let bestAction = ''; let bestCategory = ''; let lowestScore = 101;
  for (const code of PRIMARY_CATEGORIES) {
    const catData = idmOutput.categoryData?.[code]; if (!catData) continue;
    const score = safeNum(catData.score, 100);
    if (score < lowestScore && catData.recommendations?.length > 0) {
      lowestScore = score; const topRec = catData.recommendations[0];
      bestAction = topRec.title || topRec.description || ''; bestCategory = CATEGORY_NAMES[code] || code;
    }
  }
  if (!bestAction) { bestAction = 'Review the technology and IT security dimension scores below and select the highest-priority area for immediate action.'; bestCategory = 'IT & Technology'; }
  return `
    <div class="priority-callout">
      <h3>Priority Action</h3>
      <p class="callout-action">${bestAction}</p>
      <p class="callout-meta">⏱ Estimated effort: 30–60 minutes | 🔒 Directly impacts ${bestCategory} resilience</p>
    </div>`;
}

function buildPriorityFocusTable(idmOutput: LILIDMOutput): string {
  const dimensions = PRIMARY_CATEGORIES.map(code => {
    const score = safeNum(idmOutput.healthScores?.byCategory?.[code], 0);
    return { code, score, gapToBenchmark: Math.max(0, 70 - score), name: CATEGORY_NAMES[code] || code };
  });
  const tiers = new Map<CategoryCode, PriorityTier>();
  for (const dim of dimensions) tiers.set(dim.code, getPriorityTier(dim.score));
  applyPriorityBumps(dimensions, tiers);
  const rowsHtml = dimensions.sort((a, b) => a.score - b.score).map(dim => {
    const tier = tiers.get(dim.code)!; const gap = dim.score - 70; const gapStr = gap >= 0 ? `+${gap}` : `${gap}`; const gapColor = gap >= 0 ? '#28a745' : '#dc3545';
    return `<tr><td><strong>${dim.name}</strong></td><td style="text-align: center;"><span style="font-family: 'Montserrat', sans-serif; font-weight: 700; color: ${getScoreBand(dim.score).color};">${dim.score}</span></td><td style="text-align: center;"><span style="color: ${gapColor}; font-weight: 600;">${gapStr}</span></td><td style="text-align: center;"><span class="priority-badge" style="background: ${tier.bgColor}; color: ${tier.color};">${tier.label}</span></td><td>${tier.recommendation}</td></tr>`;
  }).join('');
  return `
    <div class="snapshot-section">
      <h2>Priority Focus Areas</h2>
      <p>Technology and IT security dimensions ranked by urgency, with gap-to-benchmark analysis and recommended focus level.</p>
      <table class="priority-table"><thead><tr><th>Dimension</th><th style="text-align: center;">Score</th><th style="text-align: center;">vs Benchmark</th><th style="text-align: center;">Priority</th><th>Recommendation</th></tr></thead><tbody>${rowsHtml}</tbody></table>
    </div>`;
}

function buildGapChart(idmOutput: LILIDMOutput): string {
  const target = 80;
  const barsHtml = PRIMARY_CATEGORIES.map(code => {
    const score = safeNum(idmOutput.healthScores?.byCategory?.[code], 0); const band = getScoreBand(score); const gap = Math.max(0, target - score); const name = CATEGORY_NAMES[code] || code;
    return `<div class="gap-bar-row"><div class="gap-bar-label">${name}</div><div class="gap-bar-container"><div class="gap-bar-current" style="width: ${score}%; background: ${band.color};"></div><div class="gap-bar-target" style="left: ${target}%;" title="Excellence: ${target}"></div>${gap > 0 ? `<div class="gap-bar-remaining" style="left: ${score}%; width: ${gap}%;"></div>` : ''}</div><div class="gap-bar-value" style="color: ${band.color};">${gap > 0 ? `−${gap} gap` : '✓ On track'}</div></div>`;
  }).join('');
  return `<div class="gap-chart-section"><h2>Gap to Excellence</h2><p>Distance from the Excellence threshold (80/100) by IT and technology dimension.</p>${barsHtml}</div>`;
}

function buildDeepDiveSection(idmOutput: LILIDMOutput): string {
  const findingsHtml: string[] = [];
  for (const code of PRIMARY_CATEGORIES) {
    const catData = idmOutput.categoryData?.[code]; if (!catData) continue;
    const catName = CATEGORY_NAMES[code] || code; const catScore = safeNum(catData.score, 0); const catBand = getScoreBand(catScore);
    const strengths = (catData.strengths || []).slice(0, 3); const weaknesses = (catData.weaknesses || []).slice(0, 3);
    findingsHtml.push(`<div class="deep-dive-section"><h3 style="display: flex; align-items: center; gap: 10px;">${catName}<span class="priority-badge" style="background: ${catBand.bgColor}; color: ${catBand.color}; font-size: 0.8rem;">${catScore}/100 — ${catBand.label}</span></h3>`);
    if (strengths.length > 0) {
      findingsHtml.push(`<div class="finding-card" style="border-left-color: #28a745;"><div class="finding-card-header"><h4>Current Strengths</h4><span class="severity-badge" style="background: #d4edda; color: #155724;">Strength</span></div><div class="finding-narrative"><ul style="margin-left: 18px;">${strengths.map(s => `<li>${s}</li>`).join('')}</ul></div></div>`);
    }
    for (const weakness of weaknesses) {
      const severity = getSeverityBadge(catScore);
      findingsHtml.push(`<div class="finding-card" style="border-left-color: ${severity.borderColor};"><div class="finding-card-header"><h4>${weakness.length > 80 ? weakness.substring(0, 77) + '...' : weakness}</h4><span class="severity-badge" style="background: ${severity.bgColor}; color: ${severity.color};">${severity.label}</span></div><div class="finding-action"><strong>Recommended Action:</strong> See the Quick Wins section for specific implementation steps.</div></div>`);
    }
    if (catData.keyMetrics && catData.keyMetrics.length > 0) {
      const metric = catData.keyMetrics[0];
      findingsHtml.push(`<div class="evidence-citation"><strong>📊 Assessment Data:</strong><span>${catName} scored ${catScore}/100. ${metric.name}: ${metric.value}${metric.benchmark ? ` (benchmark: ${metric.benchmark})` : ''}.</span></div>`);
    }
    findingsHtml.push(`</div>`);
  }
  return `<div class="deep-dive-section"><h2>Deep Dive: IT & Technology Dimensions</h2><p>The following analysis examines each technology dimension, highlighting current performance and identifying specific opportunities for improvement.</p>${findingsHtml.join('')}</div>`;
}

function buildQuickWinsSection(idmOutput: LILIDMOutput): string {
  const quickWinsHtml: string[] = []; const usedTitles = new Set<string>();
  for (const code of ALL_SCOPED_CATEGORIES) {
    const catData = idmOutput.categoryData?.[code]; if (!catData) continue;
    const catName = CATEGORY_NAMES[code] || code; const catScore = safeNum(catData.score, 0);
    const recs = (catData.recommendations || []).slice(0, 2);
    for (const rec of recs) {
      const title = safeStr(rec.title, `Optimize ${catName} Performance`);
      if (usedTitles.has(title.toLowerCase())) continue; usedTitles.add(title.toLowerCase());
      const outcome = calculateExpectedOutcome(catScore);
      quickWinsHtml.push(`<div class="quick-win-card"><div class="quick-win-header"><h4>${title}</h4><div class="quick-win-score-change"><span class="arrow-up">▲</span> ${catScore} → ${outcome.expectedScore}</div></div><div class="quick-win-body"><p>${safeStr(rec.description, 'Targeted improvement in this area will yield measurable results.')}</p>${rec.estimatedImpact ? `<p><strong>Expected Impact:</strong> ${rec.estimatedImpact}</p>` : ''}</div><div class="quick-win-meta"><span>📂 ${catName}</span><span>⏱ ${safeStr(rec.timeframe, '30-day')}</span><span>📈 Closing ${outcome.gapClosurePercent}% of gap to benchmark</span><span class="accountable-tag">👤 IT & Technology Lead</span></div></div>`);
    }
  }
  return `<div class="quick-wins-section"><h2>Quick Wins: Highest-Impact Actions</h2><p>The following actions target specific gaps in technology and IT security scores and can be implemented within 30 days for measurable improvement.</p>${quickWinsHtml.join('')}</div>`;
}

function buildActionPlanSection(idmOutput: LILIDMOutput): string {
  const roadmap = idmOutput.roadmap;
  const buildActionItems = (items: Array<{ action: string; category: CategoryCode; impact: string }>) => items.map(item => {
    const catName = CATEGORY_NAMES[item.category] || item.category;
    return `<div class="action-item"><div class="action-checkbox"></div><div>${item.action}</div><div class="action-time">${catName}</div><div class="action-impact">${item.impact || ''}</div></div>`;
  }).join('');
  const thirtyDayItems = (roadmap?.thirtyDay || []).filter(item => ALL_SCOPED_CATEGORIES.includes(item.category)).slice(0, 3);
  const sixtyDayItems = (roadmap?.sixtyDay || []).filter(item => ALL_SCOPED_CATEGORIES.includes(item.category)).slice(0, 3);
  const ninetyDayItems = (roadmap?.ninetyDay || []).filter(item => ALL_SCOPED_CATEGORIES.includes(item.category)).slice(0, 3);
  const habits = (idmOutput.consolidatedInsights?.criticalActions || []).slice(0, 3);
  const habitsHtml = habits.length > 0 ? `<div class="ongoing-habits"><h3>🔄 Ongoing Habits</h3>${habits.map(h => `<div class="habit-item">🔁 ${h}</div>`).join('')}</div>` : '';
  return `<div class="action-plan-section"><h2>IT & Technology Action Plan</h2><p>A phased implementation plan organized by priority. Each phase builds on the previous phase's progress.</p><div class="action-plan-month month-1"><h3>📋 Phase 1: Days 1–30</h3>${buildActionItems(thirtyDayItems)}</div><div class="action-plan-month month-2"><h3>📋 Phase 2: Days 31–60</h3>${buildActionItems(sixtyDayItems)}</div><div class="action-plan-month month-3"><h3>📋 Phase 3: Days 61–90</h3>${buildActionItems(ninetyDayItems)}</div>${habitsHtml}</div>`;
}

function buildToolsSection(): string {
  return `<div class="tools-section"><h2>Essential Tools & Templates</h2><p>Recommended resources to support IT and technology improvement initiatives.</p>
    <div class="tool-card"><div class="tool-icon">🔒</div><div><h4>Security Audit Checklist</h4><p>Comprehensive checklist covering access controls, data encryption, backup procedures, and incident response protocols. Use quarterly to maintain security posture.</p></div></div>
    <div class="tool-card"><div class="tool-icon">📊</div><div><h4>Technology Stack Assessment</h4><p>Evaluate current tools and platforms against business needs. Identify redundancies, gaps, and integration opportunities to optimize the technology portfolio.</p></div></div>
    <div class="tool-card"><div class="tool-icon">📋</div><div><h4>IT Budget Planner</h4><p>Track technology spending, plan upgrades, and forecast costs. Includes ROI calculation templates for technology investments.</p></div></div>
    <div class="tool-card"><div class="tool-icon">🛡️</div><div><h4>Business Continuity Template</h4><p>Document disaster recovery procedures, backup schedules, and communication plans. Essential for minimizing downtime and data loss risk.</p></div></div></div>`;
}

function buildMetricsSection(idmOutput: LILIDMOutput): string {
  const metricsHtml: string[] = [];
  for (const code of PRIMARY_CATEGORIES) {
    const catData = idmOutput.categoryData?.[code]; if (!catData) continue;
    const catName = CATEGORY_NAMES[code] || code; const catScore = safeNum(catData.score, 0); const targetScore = Math.min(catScore + 15, 100); const band = getScoreBand(catScore);
    const keyMetrics = (catData.keyMetrics || []).slice(0, 3);
    const metricsDetail = keyMetrics.map(m => {
      const status = m.status || 'warning'; const statusColor = status === 'good' ? '#28a745' : status === 'critical' ? '#dc3545' : '#d97706';
      return `<div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; font-size: 0.9rem;"><span>${m.name}</span><span style="font-weight: 600; color: ${statusColor};">${m.value}${m.benchmark ? ` (target: ${m.benchmark})` : ''}</span></div>`;
    }).join('');
    metricsHtml.push(`<div class="metric-enhanced-card"><div class="metric-enhanced-header"><h4>${catName}</h4><div class="metric-scores"><span class="metric-current" style="color: ${band.color};">${catScore}</span><span class="metric-target">90-day target: <span>${targetScore}</span></span></div></div><div class="metric-progress-bar"><div class="metric-progress-fill" style="width: ${catScore}%; background: ${band.color};"></div></div>${metricsDetail}<div class="metric-guidance"><strong>What moves this score:</strong> Implementing the Quick Wins above for ${catName.toLowerCase()} directly impacts this metric. Target: ${targetScore}/100 within 90 days.</div></div>`);
  }
  return `<div class="metrics-section"><h2>IT & Technology Metrics & 90-Day Targets</h2><p>Current performance by dimension with projected targets based on recommended actions.</p>${metricsHtml.join('')}</div>`;
}

function buildProgressTracker(idmOutput: LILIDMOutput): string {
  const trackerCards = PRIMARY_CATEGORIES.map(code => {
    const score = safeNum(idmOutput.healthScores?.byCategory?.[code], 0); const band = getScoreBand(score); const targetScore = Math.min(score + 15, 100); const name = CATEGORY_NAMES[code] || code;
    return `<div class="tracker-card"><div class="tracker-score" style="color: ${band.color};">${score}</div><div class="tracker-label">${name}</div><div class="tracker-target">90-day target: ${targetScore}</div></div>`;
  }).join('');
  return `<div class="progress-tracker"><h2>Progress Tracker</h2><p>Use this section to track progress against 90-day targets. Re-assess quarterly to measure improvement.</p><div class="tracker-grid">${trackerCards}</div><div class="evidence-citation" style="margin-top: 1.5rem;"><strong>📅 Next Assessment:</strong> Schedule a follow-up assessment in 90 days to measure progress against these targets and recalibrate priorities.</div></div>`;
}

function buildClosingSection(companyName: string, idmOutput: LILIDMOutput, bluf?: LILPhase4_5Output['blufs'][keyof LILPhase4_5Output['blufs']]): string {
  const callToAction = bluf?.callToAction || 'Schedule a follow-up consultation to discuss IT and technology priorities.';
  const overallScore = safeNum(idmOutput.healthScores?.overall, 0); const band = getScoreBand(overallScore);
  return `<div class="priority-callout" style="margin-top: 3rem;"><h3>Next Steps</h3><p class="callout-action">${callToAction}</p><p class="callout-meta">Current overall health: <strong>${overallScore}/100 (${band.label})</strong>. Executing the action plan above positions ${companyName} for stronger technology resilience and operational efficiency within 90 days.</p></div>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// AI NARRATIVE GENERATION
// ═══════════════════════════════════════════════════════════════════════════

async function generateNarrativeSummary(idmOutput: LILIDMOutput, businessOverview: LILBusinessOverview): Promise<{ narrative: string; tokensUsed: number }> {
  const companyName = businessOverview.companyName || 'your company';
  const overallScore = safeNum(idmOutput.healthScores?.overall, 0);
  const dimensionContext = PRIMARY_CATEGORIES.map(code => {
    const score = safeNum(idmOutput.healthScores?.byCategory?.[code], 0); const catData = idmOutput.categoryData?.[code];
    const strengths = (catData?.strengths || []).slice(0, 2).join('; '); const weaknesses = (catData?.weaknesses || []).slice(0, 2).join('; ');
    return `${CATEGORY_NAMES[code]}: ${score}/100. Strengths: ${strengths || 'N/A'}. Gaps: ${weaknesses || 'N/A'}.`;
  }).join('\n');

  const prompt = `You are BizHealth.ai's IT and technology analyst writing a professional executive summary for ${companyName}'s IT & Technology report.

COMPANY: ${companyName}
OVERALL SCORE: ${overallScore}/100
INDUSTRY: ${businessOverview.industry || 'General'}

DIMENSION SCORES:
${dimensionContext}

TOP STRENGTHS: ${(idmOutput.consolidatedInsights?.topStrengths || []).slice(0, 3).join('; ')}
TOP GAPS: ${(idmOutput.consolidatedInsights?.topWeaknesses || []).slice(0, 3).join('; ')}

VOICE RULES (MANDATORY):
- Use "${companyName}" when referring to the business
- Average sentence length: 18-25 words max
- Active voice only
- Lead with findings and evidence, not platitudes
- Tone: Accessible Expert — professional, competent, data-driven
- Reading level: 10th-12th grade
- Acknowledge strengths FIRST, then address gaps constructively
- No hat metaphors, no apologetic language about business size
- Treat the reader as a competent decision-maker responsible for IT and technology

Write a 3-4 paragraph executive summary (150-200 words total) that:
1. Opens with ${companyName}'s strongest technology dimension and what it means
2. Contextualizes the scores with specific benchmark references
3. Identifies the #1 priority area with data-backed reasoning
4. Closes with a forward-looking statement about technology resilience trajectory

Output ONLY the HTML paragraphs (using <p> tags). No headings, no wrapper divs.`;

  try {
    const response = await anthropic.messages.create({ model: LIL_PIPELINE_CONFIG.aiConfig.model, max_tokens: 600, messages: [{ role: 'user', content: prompt }] });
    const content = response.content[0]; if (content.type !== 'text') throw new Error('Unexpected response type');
    return { narrative: content.text, tokensUsed: (response.usage?.input_tokens || 0) + (response.usage?.output_tokens || 0) };
  } catch (error) {
    logger.warn({ error }, 'Failed to generate narrative summary, using fallback');
    return { narrative: `<p>The IT and technology assessment reveals a current health score of ${overallScore}/100, indicating a foundation with clear opportunities for strengthening technology infrastructure and security posture. The priority areas identified below represent the highest-impact focus points for the next 90 days.</p>`, tokensUsed: 0 };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════════

export async function buildLilManagerItTechnologyReport(
  idmOutput: LILIDMOutput, businessOverview: LILBusinessOverview, bluf?: LILPhase4_5Output['blufs'][keyof LILPhase4_5Output['blufs']]
): Promise<{ report: LILGeneratedReport; tokensUsed: number }> {
  const companyName = businessOverview.companyName || 'Company';
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const currentYear = new Date().getFullYear().toString();
  logger.info({ companyName }, 'Building LIL Manager IT & Technology Report (v4.1)');
  const { narrative, tokensUsed } = await generateNarrativeSummary(idmOutput, businessOverview);
  const sections = [
    buildTitleSection(companyName, currentDate),
    `<div class="snapshot-section"><h2>Executive Summary</h2>${narrative}</div>`,
    buildSnapshotSection(idmOutput),
    buildPriorityCallout(idmOutput),
    buildPriorityFocusTable(idmOutput),
    buildGapChart(idmOutput),
    buildDeepDiveSection(idmOutput),
    buildQuickWinsSection(idmOutput),
    buildActionPlanSection(idmOutput),
    buildToolsSection(),
    buildMetricsSection(idmOutput),
    buildProgressTracker(idmOutput),
    buildClosingSection(companyName, idmOutput, bluf)
  ];
  const contentHtml = sections.join('\n');
  const htmlContent = REPORT_TEMPLATE.replace(/{{COMPANY_NAME}}/g, companyName).replace(/{{DATE}}/g, currentDate).replace(/{{YEAR}}/g, currentYear).replace('{{CONTENT}}', contentHtml);
  const pageCount = Math.ceil(htmlContent.length / 3000);
  const report: LILGeneratedReport = {
    reportType: 'manager-it-technology' as any, title: "Manager IT & Technology Report", htmlContent, pageCount,
    sections: ['Title & Introduction', 'Executive Summary', 'IT & Technology Health Snapshot', 'Priority Action', 'Priority Focus Areas', 'Gap to Excellence', 'Deep Dive: IT & Technology Dimensions', 'Quick Wins', 'IT & Technology Action Plan', 'Essential Tools & Templates', 'IT & Technology Metrics & 90-Day Targets', 'Progress Tracker', 'Next Steps'],
    generatedAt: new Date().toISOString()
  };
  logger.info({ pageCount, tokensUsed, sectionsGenerated: report.sections.length, htmlLength: htmlContent.length }, 'LIL Manager IT & Technology Report (v4.1) built successfully');
  return { report, tokensUsed };
}
