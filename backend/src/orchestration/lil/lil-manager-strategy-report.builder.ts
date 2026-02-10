/**
 * LIL Manager Strategy Report Builder
 * 
 * Dedicated builder for the Manager's Strategy Report in the LIL (Essentials) pipeline.
 * Implements all P0/P1/P2 fixes from the Enhancement Sprint:
 * 
 * P0: Quick Win sign error fix, Priority Focus tiered algorithm
 * P1: Strategy-scoped Deep Dive, severity badge calibration, unique Quick Wins, LIL tone
 * P2: 30/60/90 action plan, Priority Action callout, evidence citations, enhanced metrics, gap chart
 * v4.1: Role-based authority reframe (removed hat framing per exec team decision)
 * 
 * This builder is deterministic (template-based) with a single AI call for narrative content.
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

/** Strategy report scoped categories */
const STRATEGY_CATEGORIES: CategoryCode[] = ['STR', 'LDG', 'RMS'];
const STRATEGY_CATEGORIES_WITH_GROWTH: CategoryCode[] = ['STR', 'LDG', 'RMS', 'SAL'];

const CATEGORY_NAMES: Record<string, string> = {
  STR: 'Strategy',
  LDG: 'Leadership & Governance',
  RMS: 'Risk Management',
  SAL: 'Sales & Growth',
  MKT: 'Marketing',
  CXP: 'Customer Experience',
  OPS: 'Operations',
  FIN: 'Financials',
  HRS: 'Human Resources',
  TIN: 'Technology & Innovation',
  ITD: 'IT & Data Security',
  CMP: 'Compliance'
};

/** Score band thresholds and labels */
interface ScoreBand {
  label: string;
  cssClass: string;
  color: string;
  bgColor: string;
  recommendation: string;
}

function getScoreBand(score: number): ScoreBand {
  if (score >= 80) return { label: 'Excellence', cssClass: 'score-excellence', color: '#28a745', bgColor: '#d4edda', recommendation: 'Monitor & Maintain' };
  if (score >= 70) return { label: 'Proficiency', cssClass: 'score-proficiency', color: '#2563eb', bgColor: '#dbeafe', recommendation: 'Optimize & Refine' };
  if (score >= 60) return { label: 'Attention', cssClass: 'score-attention', color: '#d97706', bgColor: '#fef3c7', recommendation: 'Active Improvement' };
  if (score >= 40) return { label: 'Concern', cssClass: 'score-concern', color: '#ea580c', bgColor: '#ffedd5', recommendation: 'Active Improvement' };
  return { label: 'Critical', cssClass: 'score-critical', color: '#dc3545', bgColor: '#fee2e2', recommendation: 'Immediate Focus' };
}

/** P0 FIX 2: Priority Focus tiered algorithm */
interface PriorityTier {
  label: string;
  cssClass: string;
  color: string;
  bgColor: string;
  recommendation: string;
}

function getPriorityTier(score: number): PriorityTier {
  if (score >= 80) return { label: 'Maintain', cssClass: 'priority-maintain', color: '#28a745', bgColor: '#d4edda', recommendation: 'Monitor & Maintain' };
  if (score >= 70) return { label: 'Optimize', cssClass: 'priority-optimize', color: '#2563eb', bgColor: '#dbeafe', recommendation: 'Optimize & Refine' };
  if (score >= 60) return { label: 'Medium Priority', cssClass: 'priority-medium', color: '#d97706', bgColor: '#fef3c7', recommendation: 'Active Improvement' };
  if (score >= 40) return { label: 'High Priority', cssClass: 'priority-high', color: '#ea580c', bgColor: '#ffedd5', recommendation: 'Active Improvement' };
  return { label: 'Urgent', cssClass: 'priority-urgent', color: '#dc3545', bgColor: '#fee2e2', recommendation: 'Immediate Focus' };
}

/** Apply relative ranking bumps (+1 tier) */
function applyPriorityBumps(
  dimensions: Array<{ code: CategoryCode; score: number; gapToBenchmark: number }>,
  tiers: Map<CategoryCode, PriorityTier>
): Map<CategoryCode, PriorityTier> {
  if (dimensions.length === 0) return tiers;
  
  // Find lowest-scoring dimension
  const lowestScoring = dimensions.reduce((min, d) => d.score < min.score ? d : min, dimensions[0]);
  // Find largest gap-to-benchmark
  const largestGap = dimensions.reduce((max, d) => d.gapToBenchmark > max.gapToBenchmark ? d : max, dimensions[0]);
  
  const bumpTier = (tier: PriorityTier): PriorityTier => {
    if (tier.label === 'Maintain') return { label: 'Optimize', cssClass: 'priority-optimize', color: '#2563eb', bgColor: '#dbeafe', recommendation: 'Optimize & Refine' };
    if (tier.label === 'Optimize') return { label: 'Medium Priority', cssClass: 'priority-medium', color: '#d97706', bgColor: '#fef3c7', recommendation: 'Active Improvement' };
    if (tier.label === 'Medium Priority') return { label: 'High Priority', cssClass: 'priority-high', color: '#ea580c', bgColor: '#ffedd5', recommendation: 'Active Improvement' };
    if (tier.label === 'High Priority') return { label: 'Urgent', cssClass: 'priority-urgent', color: '#dc3545', bgColor: '#fee2e2', recommendation: 'Immediate Focus' };
    return tier; // Already Urgent
  };
  
  // Bump lowest-scoring dimension
  const currentLowest = tiers.get(lowestScoring.code);
  if (currentLowest) tiers.set(lowestScoring.code, bumpTier(currentLowest));
  
  // Bump largest gap-to-benchmark (only if different from lowest)
  if (largestGap.code !== lowestScoring.code) {
    const currentGap = tiers.get(largestGap.code);
    if (currentGap) tiers.set(largestGap.code, bumpTier(currentGap));
  }
  
  return tiers;
}

/** P1 FIX 4: Severity badge calibration for sub-indicators */
interface SeverityBadge {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

function getSeverityBadge(score: number): SeverityBadge {
  if (score <= 20) return { label: 'Critical Gap', color: '#dc2626', bgColor: '#fee2e2', borderColor: '#dc2626' };
  if (score <= 39) return { label: 'Significant Gap', color: '#ea580c', bgColor: '#ffedd5', borderColor: '#ea580c' };
  if (score <= 59) return { label: 'Area for Improvement', color: '#d97706', bgColor: '#fef3c7', borderColor: '#d97706' };
  return { label: 'Below Target', color: '#2563eb', bgColor: '#dbeafe', borderColor: '#2563eb' };
}

/** P0 FIX 1: Quick Win expected outcome calculation (CORRECT: addition, not subtraction) */
function calculateExpectedOutcome(currentScore: number, benchmarkScore: number = 80): { expectedScore: number; improvementPoints: number; gapClosurePercent: number } {
  const gap = Math.max(0, benchmarkScore - currentScore);
  const gapClosurePercent = 50; // Close 50% of gap
  const improvementPoints = Math.round(gap * (gapClosurePercent / 100));
  const expectedScore = currentScore + improvementPoints; // CORRECT: addition
  return { expectedScore, improvementPoints, gapClosurePercent };
}

/** Safe numeric extraction */
function safeNum(val: unknown, fallback: number = 0): number {
  if (typeof val === 'number' && !isNaN(val)) return val;
  return fallback;
}

/** Safe string extraction */
function safeStr(val: unknown, fallback: string = ''): string {
  if (typeof val === 'string' && val.trim().length > 0) return val.trim();
  return fallback;
}

// ═══════════════════════════════════════════════════════════════════════════
// HTML/CSS TEMPLATE
// ═══════════════════════════════════════════════════════════════════════════

const STRATEGY_REPORT_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="generator" content="BizHealth.ai LIL Manager Strategy Report Builder">
  <meta name="robots" content="noindex, nofollow">
  <title>Manager Strategy Report — {{COMPANY_NAME}}</title>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --biz-navy: #242553;
      --biz-green: #969423;
      --warm-gold: #E8B54D;
      --excellence: #28a745;
      --proficiency: #2563eb;
      --attention: #d97706;
      --critical: #dc3545;
      --text-primary: #333333;
      --text-secondary: #666666;
      --bg-light: #f8f9fa;
      --border-color: #e0e0e0;
      --card-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 16px;
      line-height: 1.7;
      color: var(--text-primary);
      background: #fff;
      -webkit-font-smoothing: antialiased;
    }

    h1, h2, h3, h4, h5 {
      font-family: 'Montserrat', sans-serif;
      color: var(--biz-navy);
      line-height: 1.3;
    }

    h1 { font-size: 2.25rem; font-weight: 700; }
    h2 { font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; }
    h3 { font-size: 1.2rem; font-weight: 600; margin-bottom: 0.75rem; }
    h4 { font-size: 1rem; font-weight: 600; }
    p { margin-bottom: 1em; }

    .report-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 40px;
    }

    /* Header */
    .report-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 40px;
      border-bottom: 4px solid var(--biz-navy);
      background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
    }

    .header-logo {
      font-family: 'Montserrat', sans-serif;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--biz-navy);
    }

    .header-logo span { color: var(--biz-green); }

    .header-meta {
      text-align: right;
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    .header-meta .report-title {
      font-family: 'Montserrat', sans-serif;
      font-weight: 600;
      color: var(--biz-navy);
    }

    /* Cover Page */
    .cover-page {
      min-height: 100vh;
      background: linear-gradient(135deg, var(--biz-navy) 0%, #1a1b3d 50%, #2d3570 100%);
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 60px 40px;
      position: relative;
      overflow: hidden;
      page-break-after: always;
    }

    .cover-page::before {
      content: '';
      position: absolute;
      top: -30%;
      right: -15%;
      width: 50%;
      height: 160%;
      background: rgba(255,255,255,0.02);
      transform: rotate(15deg);
      pointer-events: none;
    }

    .cover-page .cover-logo {
      font-family: 'Montserrat', sans-serif;
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 60px;
      letter-spacing: 1px;
    }

    .cover-page .cover-logo span { color: var(--biz-green); }

    .cover-page h1 {
      color: white;
      font-size: 2.75rem;
      font-weight: 700;
      margin-bottom: 16px;
      letter-spacing: -0.5px;
    }

    .cover-page .company-name {
      color: var(--warm-gold);
      font-size: 1.75rem;
      font-weight: 600;
      font-family: 'Montserrat', sans-serif;
      margin-bottom: 12px;
    }

    .cover-page .cover-divider {
      width: 80px;
      height: 3px;
      background: var(--biz-green);
      margin: 24px auto;
      border-radius: 2px;
    }

    .cover-page .role-framing {
      font-size: 1.05rem;
      color: rgba(255,255,255,0.85);
      line-height: 1.7;
      max-width: 600px;
      margin: 0 auto 30px;
    }

    .cover-page .report-date {
      font-size: 1rem;
      opacity: 0.8;
      margin-bottom: 8px;
    }

    .cover-page .cover-plan {
      font-size: 0.85rem;
      opacity: 0.6;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-top: 40px;
    }

    .cover-page .cover-confidential {
      font-size: 0.8rem;
      opacity: 0.5;
      margin-top: 12px;
      font-style: italic;
    }

    /* One Thing Callout (P2 Enhancement B) */
    .one-thing-callout {
      background: linear-gradient(135deg, #242553 0%, #2d3561 100%);
      color: white;
      padding: 2rem;
      border-radius: 12px;
      margin: 2rem 0;
      text-align: center;
    }

    .one-thing-callout h3 {
      color: var(--biz-green);
      font-size: 1.1rem;
      margin-bottom: 0.75rem;
    }

    .one-thing-callout .one-thing-action {
      font-size: 1.125rem;
      line-height: 1.6;
      margin-bottom: 0.5rem;
    }

    .one-thing-callout .one-thing-meta {
      font-size: 0.875rem;
      opacity: 0.8;
    }

    /* Snapshot Section */
    .snapshot-section {
      margin: 2rem 0;
    }

    .snapshot-grid {
      display: grid;
      grid-template-columns: 200px 1fr;
      gap: 2rem;
      align-items: start;
      margin: 1.5rem 0;
    }

    .overall-score-circle {
      width: 160px;
      height: 160px;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      border: 6px solid;
    }

    .overall-score-circle .score-number {
      font-family: 'Montserrat', sans-serif;
      font-size: 3rem;
      font-weight: 700;
      line-height: 1;
    }

    .overall-score-circle .score-label {
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 4px;
    }

    .dimension-bars {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .dimension-bar-row {
      display: grid;
      grid-template-columns: 180px 1fr 60px;
      align-items: center;
      gap: 12px;
    }

    .dimension-bar-label {
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--text-primary);
    }

    .dimension-bar-track {
      height: 24px;
      background: #e9ecef;
      border-radius: 12px;
      overflow: hidden;
      position: relative;
    }

    .dimension-bar-fill {
      height: 100%;
      border-radius: 12px;
      transition: width 0.3s ease;
    }

    .dimension-bar-benchmark {
      position: absolute;
      top: 0;
      height: 100%;
      width: 3px;
      background: var(--biz-navy);
      opacity: 0.6;
    }

    .dimension-bar-score {
      font-family: 'Montserrat', sans-serif;
      font-size: 1rem;
      font-weight: 700;
      text-align: right;
    }

    /* Priority Focus Table (P0 FIX 2) */
    .priority-table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.5rem 0;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: var(--card-shadow);
    }

    .priority-table th {
      background: var(--biz-navy);
      color: white;
      padding: 12px 16px;
      text-align: left;
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .priority-table td {
      padding: 14px 16px;
      border-bottom: 1px solid var(--border-color);
      font-size: 0.95rem;
    }

    .priority-table tr:last-child td { border-bottom: none; }
    .priority-table tr:hover { background: var(--bg-light); }

    .priority-badge {
      display: inline-block;
      padding: 4px 14px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    /* Deep Dive Section */
    .deep-dive-section { margin: 2.5rem 0; }

    .finding-card {
      padding: 1.5rem;
      margin: 1.25rem 0;
      border-radius: 10px;
      border-left: 5px solid;
      background: white;
      box-shadow: var(--card-shadow);
    }

    .finding-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }

    .finding-card-header h4 { margin: 0; }

    .severity-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .finding-narrative { font-size: 0.95rem; line-height: 1.7; margin-bottom: 0.75rem; }

    .finding-action {
      background: var(--bg-light);
      padding: 0.75rem 1rem;
      border-radius: 8px;
      font-size: 0.9rem;
    }

    .finding-action strong { color: var(--biz-navy); }

    /* Evidence Citation (P2 Enhancement C) */
    .evidence-citation {
      background: #f8f9fa;
      border-left: 4px solid var(--biz-green);
      padding: 0.75rem 1rem;
      margin: 0.75rem 0;
      font-size: 0.9rem;
      border-radius: 0 6px 6px 0;
    }

    .evidence-citation strong { color: var(--biz-navy); }

    /* Quick Wins Section (P0 FIX 1 + P1 FIX 5) */
    .quick-wins-section { margin: 2.5rem 0; }

    .quick-win-card {
      padding: 1.5rem;
      margin: 1.25rem 0;
      background: white;
      border: 1px solid var(--border-color);
      border-radius: 10px;
      box-shadow: var(--card-shadow);
    }

    .quick-win-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }

    .quick-win-header h4 { margin: 0; flex: 1; }

    .quick-win-score-change {
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: 'Montserrat', sans-serif;
      font-size: 0.9rem;
      font-weight: 600;
      white-space: nowrap;
    }

    .quick-win-score-change .arrow-up { color: var(--excellence); }

    .quick-win-body { font-size: 0.95rem; line-height: 1.7; }

    .quick-win-meta {
      display: flex;
      gap: 1.5rem;
      margin-top: 1rem;
      padding-top: 0.75rem;
      border-top: 1px solid var(--border-color);
      font-size: 0.85rem;
      color: var(--text-secondary);
      flex-wrap: wrap;
    }

    .quick-win-meta span { display: flex; align-items: center; gap: 4px; }

    .accountable-tag {
      display: inline-block;
      background: var(--bg-light);
      padding: 2px 10px;
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: 500;
      color: var(--biz-navy);
    }

    /* 30/60/90 Action Plan (P2 Enhancement A) */
    .action-plan-section { margin: 2.5rem 0; }

    .action-plan-month {
      margin: 1.5rem 0;
      padding: 1.5rem;
      background: white;
      border-radius: 10px;
      box-shadow: var(--card-shadow);
    }

    .action-plan-month h3 {
      display: flex;
      align-items: center;
      gap: 8px;
      padding-bottom: 0.75rem;
      border-bottom: 2px solid var(--border-color);
      margin-bottom: 1rem;
    }

    .action-plan-month.month-1 h3 { border-bottom-color: var(--critical); }
    .action-plan-month.month-2 h3 { border-bottom-color: var(--attention); }
    .action-plan-month.month-3 h3 { border-bottom-color: var(--excellence); }

    .action-item {
      display: grid;
      grid-template-columns: 24px 1fr auto auto;
      gap: 12px;
      align-items: start;
      padding: 10px 0;
      border-bottom: 1px solid #f0f0f0;
      font-size: 0.95rem;
    }

    .action-item:last-child { border-bottom: none; }

    .action-checkbox {
      width: 20px;
      height: 20px;
      border: 2px solid var(--border-color);
      border-radius: 4px;
      margin-top: 2px;
    }

    .action-time {
      font-size: 0.8rem;
      color: var(--text-secondary);
      white-space: nowrap;
    }

    .action-impact {
      font-size: 0.8rem;
      color: var(--proficiency);
      font-weight: 500;
      white-space: nowrap;
    }

    .ongoing-habits {
      margin: 1.5rem 0;
      padding: 1.5rem;
      background: linear-gradient(135deg, #f0f4ff 0%, var(--bg-light) 100%);
      border-radius: 10px;
      border-left: 5px solid var(--biz-navy);
    }

    .ongoing-habits h3 {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .habit-item {
      padding: 8px 0;
      font-size: 0.95rem;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* Enhanced Metrics (P2 Enhancement D) */
    .metrics-section { margin: 2.5rem 0; }

    .metric-enhanced-card {
      padding: 1.25rem;
      margin: 1rem 0;
      background: white;
      border: 1px solid var(--border-color);
      border-radius: 10px;
      box-shadow: var(--card-shadow);
    }

    .metric-enhanced-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }

    .metric-enhanced-header h4 { margin: 0; font-size: 0.95rem; }

    .metric-scores {
      display: flex;
      gap: 1rem;
      align-items: baseline;
    }

    .metric-current {
      font-family: 'Montserrat', sans-serif;
      font-size: 1.5rem;
      font-weight: 700;
    }

    .metric-target {
      font-size: 0.85rem;
      color: var(--text-secondary);
    }

    .metric-target span {
      font-weight: 600;
      color: var(--proficiency);
    }

    .metric-progress-bar {
      height: 8px;
      background: #e9ecef;
      border-radius: 4px;
      overflow: hidden;
      margin: 0.5rem 0;
    }

    .metric-progress-fill {
      height: 100%;
      border-radius: 4px;
    }

    .metric-guidance {
      font-size: 0.85rem;
      color: var(--text-secondary);
      font-style: italic;
      margin-top: 0.5rem;
    }

    /* Gap Chart (P2 Enhancement E - replaces radar) */
    .gap-chart-section { margin: 2rem 0; }

    .gap-bar-row {
      display: grid;
      grid-template-columns: 180px 1fr 80px;
      align-items: center;
      gap: 12px;
      padding: 8px 0;
    }

    .gap-bar-label { font-size: 0.9rem; font-weight: 500; }

    .gap-bar-container {
      height: 28px;
      background: #e9ecef;
      border-radius: 6px;
      overflow: hidden;
      position: relative;
    }

    .gap-bar-current {
      height: 100%;
      border-radius: 6px;
      position: relative;
    }

    .gap-bar-target {
      position: absolute;
      top: 0;
      height: 100%;
      width: 3px;
      background: var(--biz-navy);
      z-index: 2;
    }

    .gap-bar-remaining {
      position: absolute;
      top: 0;
      height: 100%;
      background: repeating-linear-gradient(
        45deg,
        transparent,
        transparent 4px,
        rgba(0,0,0,0.05) 4px,
        rgba(0,0,0,0.05) 8px
      );
      border-radius: 0 6px 6px 0;
    }

    .gap-bar-value {
      font-family: 'Montserrat', sans-serif;
      font-size: 0.9rem;
      font-weight: 600;
      text-align: right;
    }

    /* Footer */
    .report-footer {
      margin-top: 3rem;
      padding: 2rem 40px;
      background: var(--biz-navy);
      color: white;
      text-align: center;
    }

    .footer-logo {
      font-family: 'Montserrat', sans-serif;
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .footer-logo span { color: var(--biz-green); }

    .report-footer p {
      font-size: 0.85rem;
      opacity: 0.8;
      margin-bottom: 0.25rem;
    }

    @media print {
      body { font-size: 11pt; }
      .report-container { padding: 0 20px; }
      .cover-page { min-height: 100vh; page-break-after: always; }
      .one-thing-callout { break-inside: avoid; }
      .finding-card, .quick-win-card, .action-plan-month { break-inside: avoid; }
    }
  </style>
</head>
<body>
  <header class="report-header">
    <div class="header-logo">BizHealth<span>.ai</span></div>
    <div class="header-meta">
      <div class="report-title">Manager Strategy Report</div>
      <div>{{DATE}}</div>
    </div>
  </header>

  <div class="report-container">
    {{CONTENT}}
  </div>

  <footer class="report-footer">
    <div class="footer-logo">BizHealth<span>.ai</span></div>
    <p>Manager Strategy Report — Essentials Plan</p>
    <p>&copy; {{YEAR}} BizHealth.ai. All rights reserved.</p>
    <p><em>This report is confidential and intended for authorized recipients only.</em></p>
  </footer>
</body>
</html>`;


// ═══════════════════════════════════════════════════════════════════════════
// SECTION BUILDERS
// ═══════════════════════════════════════════════════════════════════════════

/** Build the cover page */
function buildCoverPage(companyName: string, currentDate: string): string {
  return `
    <div class="cover-page">
      <div class="cover-logo">BizHealth<span>.ai</span></div>
      <h1>Manager Strategy Report</h1>
      <div class="company-name">${companyName}</div>
      <div class="cover-divider"></div>
      <div class="role-framing">Strategic direction defines how ${companyName} competes and grows. This report analyzes the current strategic position and delivers actionable recommendations.</div>
      <div class="report-date">${currentDate}</div>
      <div class="cover-plan">Essentials Plan</div>
      <div class="cover-confidential">Confidential — Intended for authorized recipients only</div>
    </div>`;
}

/** Build the Company Health Snapshot (Section 1) */
function buildSnapshotSection(
  idmOutput: LILIDMOutput
): string {
  const overallScore = safeNum(idmOutput.healthScores?.overall, 0);
  const overallBand = getScoreBand(overallScore);
  
  // Build dimension bars for strategy-scoped categories
  const dimensionBarsHtml = STRATEGY_CATEGORIES.map(code => {
    const score = safeNum(idmOutput.healthScores?.byCategory?.[code], 0);
    const band = getScoreBand(score);
    const benchmark = 70; // Industry benchmark default
    const name = CATEGORY_NAMES[code] || code;
    
    return `
      <div class="dimension-bar-row">
        <div class="dimension-bar-label">${name}</div>
        <div class="dimension-bar-track">
          <div class="dimension-bar-fill" style="width: ${score}%; background: ${band.color};"></div>
          <div class="dimension-bar-benchmark" style="left: ${benchmark}%;" title="Industry Benchmark: ${benchmark}"></div>
        </div>
        <div class="dimension-bar-score" style="color: ${band.color};">${score}</div>
      </div>`;
  }).join('');

  return `
    <div class="snapshot-section">
      <h2>Strategy Health Snapshot</h2>
      <div class="snapshot-grid">
        <div class="overall-score-circle" style="border-color: ${overallBand.color}; background: ${overallBand.bgColor};">
          <div class="score-number" style="color: ${overallBand.color};">${overallScore}</div>
          <div class="score-label" style="color: ${overallBand.color};">${overallBand.label}</div>
        </div>
        <div class="dimension-bars">
          ${dimensionBarsHtml}
        </div>
      </div>
    </div>`;
}

/** Build the Priority Action callout (P2 Enhancement B — reframed v4.1) */
function buildOneThingCallout(
  idmOutput: LILIDMOutput
): string {
  // Find the highest-impact quick win from strategy categories
  const strategyCategories = STRATEGY_CATEGORIES_WITH_GROWTH;
  let bestAction = '';
  let bestCategory = '';
  let bestImpact = '';
  let lowestScore = 101;
  
  for (const code of strategyCategories) {
    const catData = idmOutput.categoryData?.[code];
    if (!catData) continue;
    const score = safeNum(catData.score, 100);
    if (score < lowestScore && catData.recommendations?.length > 0) {
      lowestScore = score;
      const topRec = catData.recommendations[0];
      bestAction = topRec.title || topRec.description || '';
      bestCategory = CATEGORY_NAMES[code] || code;
      bestImpact = topRec.estimatedImpact || '';
    }
  }
  
  if (!bestAction) {
    bestAction = 'Review the strategy dimension scores below and select the highest-priority area for immediate action.';
    bestCategory = 'Strategy';
  }

  return `
    <div class="one-thing-callout">
      <h3>Priority Action</h3>
      <p class="one-thing-action">${bestAction}</p>
      <p class="one-thing-meta">
        ⏱ Estimated effort: 30–60 minutes | 📈 Directly impacts ${bestCategory} performance
      </p>
    </div>`;
}

/** Build the Priority Focus Table (P0 FIX 2) */
function buildPriorityFocusTable(
  idmOutput: LILIDMOutput
): string {
  const dimensions = STRATEGY_CATEGORIES.map(code => {
    const score = safeNum(idmOutput.healthScores?.byCategory?.[code], 0);
    const benchmark = 70;
    const gapToBenchmark = Math.max(0, benchmark - score);
    return { code, score, gapToBenchmark, name: CATEGORY_NAMES[code] || code };
  });
  
  // Calculate base tiers
  const tiers = new Map<CategoryCode, PriorityTier>();
  for (const dim of dimensions) {
    tiers.set(dim.code, getPriorityTier(dim.score));
  }
  
  // Apply relative ranking bumps
  applyPriorityBumps(dimensions, tiers);
  
  const rowsHtml = dimensions
    .sort((a, b) => a.score - b.score) // Show lowest first
    .map(dim => {
      const tier = tiers.get(dim.code)!;
      const benchmark = 70;
      const gap = dim.score - benchmark;
      const gapStr = gap >= 0 ? `+${gap}` : `${gap}`;
      const gapColor = gap >= 0 ? '#28a745' : '#dc3545';
      
      return `
        <tr>
          <td><strong>${dim.name}</strong></td>
          <td style="text-align: center;">
            <span style="font-family: 'Montserrat', sans-serif; font-weight: 700; color: ${getScoreBand(dim.score).color};">${dim.score}</span>
          </td>
          <td style="text-align: center;">
            <span style="color: ${gapColor}; font-weight: 600;">${gapStr}</span>
          </td>
          <td style="text-align: center;">
            <span class="priority-badge" style="background: ${tier.bgColor}; color: ${tier.color};">${tier.label}</span>
          </td>
          <td>${tier.recommendation}</td>
        </tr>`;
    }).join('');

  return `
    <div class="snapshot-section">
      <h2>Priority Focus Areas</h2>
      <p>Strategic dimensions ranked by urgency, with gap-to-benchmark analysis and recommended focus level.</p>
      <table class="priority-table">
        <thead>
          <tr>
            <th>Dimension</th>
            <th style="text-align: center;">Score</th>
            <th style="text-align: center;">vs Benchmark</th>
            <th style="text-align: center;">Priority</th>
            <th>Recommendation</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </div>`;
}


/** Build the Deep Dive Findings section (P1 FIX 3: scoped to strategy categories + P1 FIX 4: severity badges) */
function buildDeepDiveSection(
  idmOutput: LILIDMOutput
): string {
  const findingsHtml: string[] = [];
  
  // Only include strategy-scoped categories (P1 FIX 3)
  for (const code of STRATEGY_CATEGORIES_WITH_GROWTH) {
    const catData = idmOutput.categoryData?.[code];
    if (!catData) continue;
    
    const catName = CATEGORY_NAMES[code] || code;
    const catScore = safeNum(catData.score, 0);
    const catBand = getScoreBand(catScore);
    
    // Build strengths
    const strengths = (catData.strengths || []).slice(0, 3);
    const weaknesses = (catData.weaknesses || []).slice(0, 3);
    
    // Category header
    findingsHtml.push(`
      <div class="deep-dive-section">
        <h3 style="display: flex; align-items: center; gap: 10px;">
          ${catName}
          <span class="priority-badge" style="background: ${catBand.bgColor}; color: ${catBand.color}; font-size: 0.8rem;">${catScore}/100 — ${catBand.label}</span>
        </h3>`);
    
    // Strengths as finding cards (green border)
    if (strengths.length > 0) {
      findingsHtml.push(`
        <div class="finding-card" style="border-left-color: #28a745;">
          <div class="finding-card-header">
            <h4>Current Strengths</h4>
            <span class="severity-badge" style="background: #d4edda; color: #155724;">Strength</span>
          </div>
          <div class="finding-narrative">
            <ul style="margin-left: 18px;">
              ${strengths.map(s => `<li>${s}</li>`).join('')}
            </ul>
          </div>
        </div>`);
    }
    
    // Weaknesses as finding cards with severity badges (P1 FIX 4) — FULL TEXT, no truncation
    for (const weakness of weaknesses) {
      const severity = getSeverityBadge(catScore);
      
      // Build contextual recommendation based on category and score
      const gapToTarget = Math.max(0, 80 - catScore);
      const urgencyLabel = catScore < 40 ? 'Immediate' : catScore < 60 ? 'Near-term' : 'Ongoing';
      const actionContext = `${urgencyLabel} priority. Closing this gap could improve the ${catName} score by up to ${Math.round(gapToTarget * 0.5)} points toward the 80/100 Excellence threshold.`;
      
      findingsHtml.push(`
        <div class="finding-card" style="border-left-color: ${severity.borderColor};">
          <div class="finding-card-header">
            <h4>${weakness}</h4>
            <span class="severity-badge" style="background: ${severity.bgColor}; color: ${severity.color};">${severity.label}</span>
          </div>
          <div class="finding-narrative">
            <p>This finding reflects a gap in ${catName} performance that directly affects the overall strategic health of the business. Addressing it strengthens the foundation for sustainable growth.</p>
          </div>
          <div class="finding-action">
            <strong>Impact Assessment:</strong> ${actionContext} See the Quick Wins and Action Plan sections for specific implementation steps.
          </div>
        </div>`);
    }
    
    // Evidence citation (P2 Enhancement C)
    if (catData.keyMetrics && catData.keyMetrics.length > 0) {
      const metric = catData.keyMetrics[0];
      findingsHtml.push(`
        <div class="evidence-citation">
          <strong>📊 Assessment Data:</strong>
          <span>${catName} scored ${catScore}/100. ${metric.name}: ${metric.value}${metric.benchmark ? ` (benchmark: ${metric.benchmark})` : ''}.</span>
        </div>`);
    }
    
    findingsHtml.push(`</div>`); // Close deep-dive-section
  }

  return `
    <div class="deep-dive-section">
      <h2>Deep Dive: Strategy Dimensions</h2>
      <p>The following analysis examines each strategic dimension, highlighting current performance and identifying specific opportunities for improvement.</p>
      ${findingsHtml.join('')}
    </div>`;
}

/** Build the Quick Wins section (P0 FIX 1 + P1 FIX 5 + P1 FIX 6) */
function buildQuickWinsSection(
  idmOutput: LILIDMOutput
): string {
  const quickWinsHtml: string[] = [];
  const usedTitles = new Set<string>(); // P1 FIX 5: ensure unique quick wins
  
  for (const code of STRATEGY_CATEGORIES_WITH_GROWTH) {
    const catData = idmOutput.categoryData?.[code];
    if (!catData) continue;
    
    const catName = CATEGORY_NAMES[code] || code;
    const catScore = safeNum(catData.score, 0);
    
    // Get recommendations for this category
    const recs = (catData.recommendations || []).slice(0, 2);
    
    for (const rec of recs) {
      const title = safeStr(rec.title, `Optimize ${catName} Performance`);
      
      // P1 FIX 5: Skip duplicate titles
      if (usedTitles.has(title.toLowerCase())) continue;
      usedTitles.add(title.toLowerCase());
      
      // P0 FIX 1: CORRECT calculation (addition, not subtraction)
      const outcome = calculateExpectedOutcome(catScore);
      
      quickWinsHtml.push(`
        <div class="quick-win-card">
          <div class="quick-win-header">
            <h4>${title}</h4>
            <div class="quick-win-score-change">
              <span class="arrow-up">▲</span>
              ${catScore} → ${outcome.expectedScore}
            </div>
          </div>
          <div class="quick-win-body">
            <p>${safeStr(rec.description, 'Targeted improvement in this area will yield measurable results.')}</p>
            ${rec.estimatedImpact ? `<p><strong>Expected Impact:</strong> ${rec.estimatedImpact}</p>` : ''}
          </div>
          <div class="quick-win-meta">
            <span>📂 ${catName}</span>
            <span>⏱ ${safeStr(rec.timeframe, '30-day')}</span>
            <span>📈 Closing ${outcome.gapClosurePercent}% of gap to benchmark</span>
            <span class="accountable-tag">👤 Strategy Lead</span>
          </div>
        </div>`);
    }
  }

  return `
    <div class="quick-wins-section">
      <h2>Quick Wins: Highest-Impact Actions</h2>
      <p>The following actions target specific gaps in strategy scores and can be implemented within 30 days for measurable improvement.</p>
      ${quickWinsHtml.join('')}
    </div>`;
}

/** Build the 30/60/90 Day Action Plan (P2 Enhancement A) */
function buildActionPlanSection(
  idmOutput: LILIDMOutput
): string {
  const roadmap = idmOutput.roadmap;
  
  const buildActionItems = (items: Array<{ action: string; category: CategoryCode; impact: string }>) => {
    return items.map(item => {
      const catName = CATEGORY_NAMES[item.category] || item.category;
      return `
        <div class="action-item">
          <div class="action-checkbox"></div>
          <div>${item.action}</div>
          <div class="action-time">${catName}</div>
          <div class="action-impact">${item.impact || ''}</div>
        </div>`;
    }).join('');
  };
  
  const thirtyDayItems = (roadmap?.thirtyDay || []).filter(item => 
    STRATEGY_CATEGORIES_WITH_GROWTH.includes(item.category)
  ).slice(0, 3);
  
  const sixtyDayItems = (roadmap?.sixtyDay || []).filter(item => 
    STRATEGY_CATEGORIES_WITH_GROWTH.includes(item.category)
  ).slice(0, 3);
  
  const ninetyDayItems = (roadmap?.ninetyDay || []).filter(item => 
    STRATEGY_CATEGORIES_WITH_GROWTH.includes(item.category)
  ).slice(0, 3);

  // Build ongoing habits from top strengths
  const habits = (idmOutput.consolidatedInsights?.criticalActions || []).slice(0, 3);
  const habitsHtml = habits.length > 0 ? `
    <div class="ongoing-habits">
      <h3>🔄 Ongoing Habits</h3>
      ${habits.map(h => `<div class="habit-item">🔁 ${h}</div>`).join('')}
    </div>` : '';

  return `
    <div class="action-plan-section">
      <h2>Strategic Action Plan</h2>
      <p>A phased implementation plan organized by priority. Each phase builds on the previous phase's progress.</p>
      
      <div class="action-plan-month month-1">
        <h3>📋 Phase 1: Days 1–30</h3>
        ${buildActionItems(thirtyDayItems)}
      </div>
      
      <div class="action-plan-month month-2">
        <h3>📋 Phase 2: Days 31–60</h3>
        ${buildActionItems(sixtyDayItems)}
      </div>
      
      <div class="action-plan-month month-3">
        <h3>📋 Phase 3: Days 61–90</h3>
        ${buildActionItems(ninetyDayItems)}
      </div>
      
      ${habitsHtml}
    </div>`;
}


/** Build Enhanced Metrics section (P2 Enhancement D) */
function buildMetricsSection(
  idmOutput: LILIDMOutput
): string {
  const metricsHtml: string[] = [];
  
  for (const code of STRATEGY_CATEGORIES) {
    const catData = idmOutput.categoryData?.[code];
    if (!catData) continue;
    
    const catName = CATEGORY_NAMES[code] || code;
    const catScore = safeNum(catData.score, 0);
    const targetScore = Math.min(catScore + 15, 100); // 90-day target: +15 points or cap at 100
    const band = getScoreBand(catScore);
    
    // Key metrics from category data
    const keyMetrics = (catData.keyMetrics || []).slice(0, 3);
    const metricsDetail = keyMetrics.map(m => {
      const status = m.status || 'warning';
      const statusColor = status === 'good' ? '#28a745' : status === 'critical' ? '#dc3545' : '#d97706';
      return `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; font-size: 0.9rem;">
          <span>${m.name}</span>
          <span style="font-weight: 600; color: ${statusColor};">${m.value}${m.benchmark ? ` (target: ${m.benchmark})` : ''}</span>
        </div>`;
    }).join('');
    
    metricsHtml.push(`
      <div class="metric-enhanced-card">
        <div class="metric-enhanced-header">
          <h4>${catName}</h4>
          <div class="metric-scores">
            <span class="metric-current" style="color: ${band.color};">${catScore}</span>
            <span class="metric-target">90-day target: <span>${targetScore}</span></span>
          </div>
        </div>
        <div class="metric-progress-bar">
          <div class="metric-progress-fill" style="width: ${catScore}%; background: ${band.color};"></div>
        </div>
        ${metricsDetail}
        <div class="metric-guidance">
          <strong>What moves this score:</strong> Implementing the Quick Wins above for ${catName.toLowerCase()} directly impacts this metric. 
          Target: ${targetScore}/100 within 90 days.
        </div>
      </div>`);
  }

  return `
    <div class="metrics-section">
      <h2>Strategy Metrics & 90-Day Targets</h2>
      <p>Current performance by dimension with projected targets based on recommended actions.</p>
      ${metricsHtml.join('')}
    </div>`;
}

/** Build Gap-to-Excellence Chart (P2 Enhancement E - replaces radar) */
function buildGapChart(
  idmOutput: LILIDMOutput
): string {
  const target = 80; // Excellence threshold
  
  const barsHtml = STRATEGY_CATEGORIES.map(code => {
    const score = safeNum(idmOutput.healthScores?.byCategory?.[code], 0);
    const band = getScoreBand(score);
    const gap = Math.max(0, target - score);
    const name = CATEGORY_NAMES[code] || code;
    
    return `
      <div class="gap-bar-row">
        <div class="gap-bar-label">${name}</div>
        <div class="gap-bar-container">
          <div class="gap-bar-current" style="width: ${score}%; background: ${band.color};"></div>
          <div class="gap-bar-target" style="left: ${target}%;" title="Excellence: ${target}"></div>
          ${gap > 0 ? `<div class="gap-bar-remaining" style="left: ${score}%; width: ${gap}%;"></div>` : ''}
        </div>
        <div class="gap-bar-value" style="color: ${band.color};">
          ${gap > 0 ? `−${gap} gap` : '✓ On track'}
        </div>
      </div>`;
  }).join('');

  return `
    <div class="gap-chart-section">
      <h2>Gap to Excellence</h2>
      <p>Distance from the Excellence threshold (80/100) by strategic dimension. The vertical marker indicates the target.</p>
      ${barsHtml}
    </div>`;
}

/** Build the closing section */
function buildClosingSection(
  companyName: string,
  idmOutput: LILIDMOutput,
  bluf?: LILPhase4_5Output['blufs'][keyof LILPhase4_5Output['blufs']]
): string {
  const callToAction = bluf?.callToAction || 'Schedule a follow-up consultation to discuss your strategy priorities.';
  const overallScore = safeNum(idmOutput.healthScores?.overall, 0);
  const band = getScoreBand(overallScore);
  
  return `
    <div class="one-thing-callout" style="margin-top: 3rem;">
      <h3>Next Steps</h3>
      <p class="one-thing-action">${callToAction}</p>
      <p class="one-thing-meta">
        Current strategic health: <strong>${overallScore}/100 (${band.label})</strong>. 
        Executing the action plan above positions ${companyName} to reach Proficiency within 90 days.
      </p>
    </div>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// AI NARRATIVE GENERATION (P1 FIX 6: LIL Tone)
// ═══════════════════════════════════════════════════════════════════════════

/** Generate AI-powered narrative content for the executive summary */
async function generateNarrativeSummary(
  idmOutput: LILIDMOutput,
  businessOverview: LILBusinessOverview
): Promise<{ narrative: string; tokensUsed: number }> {
  const companyName = businessOverview.companyName || 'your company';
  const overallScore = safeNum(idmOutput.healthScores?.overall, 0);
  
  // Build strategy dimension context
  const dimensionContext = STRATEGY_CATEGORIES.map(code => {
    const score = safeNum(idmOutput.healthScores?.byCategory?.[code], 0);
    const catData = idmOutput.categoryData?.[code];
    const strengths = (catData?.strengths || []).slice(0, 2).join('; ');
    const weaknesses = (catData?.weaknesses || []).slice(0, 2).join('; ');
    return `${CATEGORY_NAMES[code]}: ${score}/100. Strengths: ${strengths || 'N/A'}. Gaps: ${weaknesses || 'N/A'}.`;
  }).join('\n');

  const prompt = `You are BizHealth.ai's strategy analyst writing a professional executive summary for ${companyName}'s strategy report.

COMPANY: ${companyName}
OVERALL STRATEGY SCORE: ${overallScore}/100
INDUSTRY: ${businessOverview.industry || 'General'}

DIMENSION SCORES:
${dimensionContext}

TOP STRENGTHS: ${(idmOutput.consolidatedInsights?.topStrengths || []).slice(0, 3).join('; ')}
TOP GAPS: ${(idmOutput.consolidatedInsights?.topWeaknesses || []).slice(0, 3).join('; ')}

VOICE RULES (MANDATORY):
- Use "${companyName}" when referring to the business — address the reader as the person responsible for strategy
- Average sentence length: 18-25 words max
- Active voice only ("The assessment reveals..." not "It was found that...")
- Lead with findings and evidence, not platitudes
- Tone: Accessible Expert — professional, competent, data-driven but not corporate jargon
- Reading level: 10th-12th grade
- Acknowledge strengths FIRST, then address gaps constructively with specific data points
- No hat metaphors, no "wearing hats", no "solopreneur", no "even if you don't have a dedicated role"
- No apologetic language about business size
- Treat the reader as a competent decision-maker responsible for strategic direction

Write a 3-4 paragraph executive summary (150-200 words total) that:
1. Opens with ${companyName}'s strongest strategic dimension and what it means for the business
2. Contextualizes the overall score (${overallScore}/100) with specific benchmark references
3. Identifies the #1 priority area with data-backed reasoning
4. Closes with a forward-looking statement about strategic trajectory

Output ONLY the HTML paragraphs (using <p> tags). No headings, no wrapper divs.`;

  try {
    const response = await anthropic.messages.create({
      model: LIL_PIPELINE_CONFIG.aiConfig.model,
      max_tokens: 600,
      messages: [{ role: 'user', content: prompt }]
    });

    const content = response.content[0];
    if (content.type !== 'text') throw new Error('Unexpected response type');
    
    const tokensUsed = (response.usage?.input_tokens || 0) + (response.usage?.output_tokens || 0);
    return { narrative: content.text, tokensUsed };
  } catch (error) {
    logger.warn({ error }, 'Failed to generate narrative summary, using fallback');
    return {
      narrative: `<p>The strategy assessment reveals a current health score of ${overallScore}/100, indicating a foundation with clear opportunities for improvement. The priority areas identified below represent the highest-impact focus points for the next 90 days.</p>`,
      tokensUsed: 0
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Build the LIL Manager Strategy Report
 * 
 * Deterministic template builder with a single AI call for the executive summary narrative.
 * All sections are scoped to strategy categories (STR, LDG, RMS, SAL for growth context).
 */
export async function buildLilManagerStrategyReport(
  idmOutput: LILIDMOutput,
  businessOverview: LILBusinessOverview,
  bluf?: LILPhase4_5Output['blufs'][keyof LILPhase4_5Output['blufs']]
): Promise<{ report: LILGeneratedReport; tokensUsed: number }> {
  
  const companyName = businessOverview.companyName || 'Company';
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const currentYear = new Date().getFullYear().toString();
  
  logger.info({ companyName }, 'Building LIL Manager Strategy Report (v4.1 role-based authority)');
  
  // Generate AI narrative (single API call)
  const { narrative, tokensUsed } = await generateNarrativeSummary(idmOutput, businessOverview);
  
  // Build all sections deterministically
  const sections = [
    buildCoverPage(companyName, currentDate),
    `<div class="snapshot-section"><h2>Executive Summary</h2>${narrative}</div>`,
    buildSnapshotSection(idmOutput),
    buildOneThingCallout(idmOutput),
    buildPriorityFocusTable(idmOutput),
    buildGapChart(idmOutput),
    buildDeepDiveSection(idmOutput),
    buildQuickWinsSection(idmOutput),
    buildActionPlanSection(idmOutput),
    buildMetricsSection(idmOutput),
    buildClosingSection(companyName, idmOutput, bluf)
  ];
  
  const contentHtml = sections.join('\n');
  
  // Assemble full HTML
  const htmlContent = STRATEGY_REPORT_TEMPLATE
    .replace(/{{COMPANY_NAME}}/g, companyName)
    .replace(/{{DATE}}/g, currentDate)
    .replace(/{{YEAR}}/g, currentYear)
    .replace('{{CONTENT}}', contentHtml);
  
  // Estimate page count (~3000 chars per page)
  const pageCount = Math.ceil(htmlContent.length / 3000);
  
  const report: LILGeneratedReport = {
    reportType: 'managersStrategy' as any,
    title: "Manager Strategy Report",
    htmlContent,
    pageCount,
    sections: [
      'Cover Page',
      'Executive Summary',
      'Strategy Health Snapshot',
      'Priority Action',
      'Priority Focus Areas',
      'Gap to Excellence',
      'Deep Dive: Strategy Dimensions',
      'Quick Wins',
      'Strategic Action Plan',
      'Strategy Metrics & 90-Day Targets',
      'Next Steps'
    ],
    generatedAt: new Date().toISOString()
  };
  
  logger.info({
    pageCount,
    tokensUsed,
    sectionsGenerated: report.sections.length,
    htmlLength: htmlContent.length
  }, 'LIL Manager Strategy Report (v4.1) built successfully');
  
  return { report, tokensUsed };
}
