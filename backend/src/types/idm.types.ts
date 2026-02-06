/**
 * BizHealth.ai Insights Data Model (IDM) v1.0
 *
 * This module defines the core data model for BizHealth assessments.
 * The IDM serves as the canonical source of truth for all report generation.
 *
 * Framework Structure:
 * - 4 Chapters: GE (Growth Engine), PH (Performance Health), PL (People & Leadership), RS (Resilience & Safeguards)
 * - 12 Dimensions: STR, SAL, MKT, CXP, OPS, FIN, HRS, LDG, TIN, ITD, RMS, CMP
 * - 3-5 Sub-indicators per dimension
 * - 87 questionnaire questions mapped to dimensions
 *
 * NOTE: IT & Data dimension uses canonical code 'ITD' (Phase 1.5+).
 * Legacy code 'IDS' is still supported for backward compatibility.
 */

import { z } from 'zod';
import type {
  CategoryAnalysis,
  ChapterSummary,
  CrossCategoryInsights
} from './phase1-5.types.js';
import {
  StrategicFinancialOpportunitySchema,
  FinancialImpactSummarySchema
} from './strategic-financial.types.js';
import type {
  StrategicFinancialOpportunity,
  FinancialImpactSummary
} from './strategic-financial.types.js';

// ============================================================================
// ENUMS AND CONSTANTS
// ============================================================================

/**
 * Chapter codes representing the 4 main assessment chapters
 */
export const ChapterCodeSchema = z.enum(['GE', 'PH', 'PL', 'RS']);
export type ChapterCode = z.infer<typeof ChapterCodeSchema>;

/**
 * Chapter names for display
 */
export const CHAPTER_NAMES: Record<ChapterCode, string> = {
  GE: 'Growth Engine',
  PH: 'Performance & Health',
  PL: 'People & Leadership',
  RS: 'Resilience & Safeguards'
};

/**
 * Dimension codes representing the 12 assessment dimensions
 * NOTE: Both ITD (canonical) and IDS (legacy) are accepted for backward compatibility
 */
export const DimensionCodeSchema = z.enum([
  'STR', // Strategy
  'SAL', // Sales
  'MKT', // Marketing
  'CXP', // Customer Experience
  'OPS', // Operations
  'FIN', // Financials
  'HRS', // Human Resources
  'LDG', // Leadership & Governance
  'TIN', // Technology & Innovation
  'ITD', // IT & Data Security (canonical code for Phase 1.5+)
  'IDS', // IT, Data & Systems (legacy code - maps to ITD)
  'RMS', // Risk Management & Sustainability
  'CMP'  // Compliance
]);
export type DimensionCode = z.infer<typeof DimensionCodeSchema>;

/**
 * Canonical dimension codes (excludes legacy IDS code)
 */
export const CANONICAL_DIMENSION_CODES = [
  'STR', 'SAL', 'MKT', 'CXP', 'OPS', 'FIN',
  'HRS', 'LDG', 'TIN', 'ITD', 'RMS', 'CMP'
] as const;

/**
 * Normalize a dimension code to its canonical form
 * Maps legacy IDS → ITD
 */
export function normalizeDimensionCode(code: string): DimensionCode {
  if (code === 'IDS') return 'ITD';
  return code as DimensionCode;
}

/**
 * Dimension metadata including name, description, and chapter mapping
 */
export const DIMENSION_METADATA: Record<DimensionCode, { name: string; description: string; chapter: ChapterCode }> = {
  STR: {
    name: 'Strategy',
    description: 'Strategic planning, market positioning, and growth strategy',
    chapter: 'GE'
  },
  SAL: {
    name: 'Sales',
    description: 'Sales effectiveness, pipeline management, and revenue generation',
    chapter: 'GE'
  },
  MKT: {
    name: 'Marketing',
    description: 'Brand awareness, customer acquisition, and marketing ROI',
    chapter: 'GE'
  },
  CXP: {
    name: 'Customer Experience',
    description: 'Customer satisfaction, retention, and experience quality',
    chapter: 'GE'
  },
  OPS: {
    name: 'Operations',
    description: 'Operational efficiency, process optimization, and workflow management',
    chapter: 'PH'
  },
  FIN: {
    name: 'Financials',
    description: 'Financial health, profitability, and fiscal management',
    chapter: 'PH'
  },
  HRS: {
    name: 'Human Resources',
    description: 'Talent management, culture, and employee engagement',
    chapter: 'PL'
  },
  LDG: {
    name: 'Leadership & Governance',
    description: 'Leadership effectiveness, decision-making, and organizational governance',
    chapter: 'PL'
  },
  TIN: {
    name: 'Technology & Innovation',
    description: 'Technology adoption, innovation culture, and digital transformation',
    chapter: 'RS'
  },
  ITD: {
    name: 'IT & Data Security',
    description: 'IT infrastructure, data management, and cybersecurity',
    chapter: 'RS'
  },
  IDS: {
    name: 'IT, Data & Systems',
    description: 'IT infrastructure, data management, and cybersecurity (legacy code - use ITD)',
    chapter: 'RS'
  },
  RMS: {
    name: 'Risk Management & Sustainability',
    description: 'Risk identification, mitigation, and business continuity',
    chapter: 'RS'
  },
  CMP: {
    name: 'Compliance',
    description: 'Regulatory compliance, policy adherence, and legal requirements',
    chapter: 'RS'
  }
};

/**
 * Finding types
 */
export const FindingTypeSchema = z.enum(['strength', 'gap', 'risk', 'opportunity']);
export type FindingType = z.infer<typeof FindingTypeSchema>;

/**
 * Recommendation horizons
 */
export const RecommendationHorizonSchema = z.enum(['90_days', '12_months', '24_months_plus']);
export type RecommendationHorizon = z.infer<typeof RecommendationHorizonSchema>;

/**
 * Score bands for performance tier classification
 */
export const ScoreBandSchema = z.enum(['Critical', 'Attention', 'Proficiency', 'Excellence']);
export type ScoreBand = z.infer<typeof ScoreBandSchema>;

/**
 * Trajectory indicators
 *
 * - 'Initial': First assessment (baseline established, no comparison available)
 * - 'Improving': Score increased by >5 points from prior assessment
 * - 'Stable': Score within ±5 points of prior assessment
 * - 'Declining': Score decreased by >5 points from prior assessment
 * - 'Flat': DEPRECATED - use 'Stable' for subsequent assessments, 'Initial' for first
 */
export const TrajectorySchema = z.enum(['Improving', 'Stable', 'Declining', 'Initial', 'Flat']);
export type Trajectory = z.infer<typeof TrajectorySchema>;

// ============================================================================
// META SCHEMA
// ============================================================================

/**
 * IDM Metadata
 */
export const MetaSchema = z.object({
  assessment_run_id: z.string().uuid(),
  company_profile_id: z.string().uuid(),
  created_at: z.string().datetime(),
  methodology_version: z.string().default('1.0.0'),
  scoring_version: z.string().default('1.0.0'),
  idm_schema_version: z.string().default('1.0.0')
});
export type Meta = z.infer<typeof MetaSchema>;

// ============================================================================
// BENCHMARK SCHEMA
// ============================================================================

/**
 * Peer comparison bands for benchmark classification
 */
export const PeerComparisonBandSchema = z.enum([
  'below_average',
  'average',
  'above_average',
  'top_quartile'
]);
export type PeerComparisonBand = z.infer<typeof PeerComparisonBandSchema>;

/**
 * Chapter/Dimension benchmark data for comparative analysis
 */
export const BenchmarkSchema = z.object({
  peer_percentile: z.number().min(0).max(100),
  band_description: z.string(),
  industry_average: z.number().min(0).max(100).optional(),
  peer_comparison_band: PeerComparisonBandSchema.optional(),
  benchmark_narrative: z.string().optional()
}).optional();
export type Benchmark = z.infer<typeof BenchmarkSchema>;

/**
 * Overall benchmark data for scores summary
 */
export const OverallBenchmarkSchema = z.object({
  percentile_rank: z.number().min(0).max(100),
  industry_benchmark: z.number().min(0).max(100),
  peer_group_description: z.string(),
  peer_group_size: z.number().int().positive(),
  benchmark_narrative: z.string()
}).optional();
export type OverallBenchmark = z.infer<typeof OverallBenchmarkSchema>;

// ============================================================================
// CHAPTER SCHEMA
// ============================================================================

/**
 * Chapter representing a major assessment grouping
 */
export const ChapterSchema = z.object({
  chapter_code: ChapterCodeSchema,
  name: z.string(),
  score_overall: z.number().min(0).max(100),
  score_band: ScoreBandSchema,
  benchmark: BenchmarkSchema,
  previous_score_overall: z.number().min(0).max(100).optional()
});
export type Chapter = z.infer<typeof ChapterSchema>;

// ============================================================================
// SUB-INDICATOR SCHEMA
// ============================================================================

/**
 * Sub-indicator representing a specific aspect within a dimension
 */
export const SubIndicatorSchema = z.object({
  id: z.string(),
  dimension_code: DimensionCodeSchema,
  name: z.string(),
  score: z.number().min(0).max(100),
  score_band: ScoreBandSchema.optional(),
  contributing_question_ids: z.array(z.string())
});
export type SubIndicator = z.infer<typeof SubIndicatorSchema>;

// ============================================================================
// DIMENSION SCHEMA
// ============================================================================

/**
 * Dimension representing one of 12 assessment areas
 */
export const DimensionSchema = z.object({
  dimension_code: DimensionCodeSchema,
  chapter_code: ChapterCodeSchema,
  name: z.string(),
  description: z.string(),
  score_overall: z.number().min(0).max(100),
  score_band: ScoreBandSchema,
  sub_indicators: z.array(SubIndicatorSchema),
  benchmark: BenchmarkSchema,
  previous_score_overall: z.number().min(0).max(100).optional()
});
export type Dimension = z.infer<typeof DimensionSchema>;

// ============================================================================
// QUESTION SCHEMA
// ============================================================================

/**
 * Question mapping questionnaire responses to dimensions
 */
export const QuestionSchema = z.object({
  question_id: z.string(),
  dimension_code: DimensionCodeSchema,
  sub_indicator_id: z.string(),
  raw_response: z.unknown(),
  normalized_score: z.number().min(0).max(100).optional()
});
export type Question = z.infer<typeof QuestionSchema>;

// ============================================================================
// EVIDENCE REFERENCES SCHEMA
// ============================================================================

/**
 * Evidence references for findings and recommendations
 */
export const EvidenceRefsSchema = z.object({
  question_ids: z.array(z.string()).optional(),
  metrics: z.array(z.string()).optional(),
  benchmarks: z.array(z.string()).optional()
}).optional();
export type EvidenceRefs = z.infer<typeof EvidenceRefsSchema>;

// ============================================================================
// FINDING SCHEMA
// ============================================================================

/**
 * Finding representing an insight from the analysis
 */
export const FindingSchema = z.object({
  id: z.string(),
  dimension_code: DimensionCodeSchema,
  sub_indicator_id: z.string().optional(),
  type: FindingTypeSchema,
  severity: z.union([z.string(), z.number()]),
  confidence_level: z.union([z.string(), z.number()]),
  short_label: z.string(),
  narrative: z.string(),
  evidence_refs: EvidenceRefsSchema
});
export type Finding = z.infer<typeof FindingSchema>;

// ============================================================================
// RECOMMENDATION SCHEMA
// ============================================================================

/**
 * Recommendation for business improvement
 */
export const RecommendationSchema = z.object({
  id: z.string(),
  dimension_code: DimensionCodeSchema,
  linked_finding_ids: z.array(z.string()),
  theme: z.string(),
  priority_rank: z.number().int().positive(),
  impact_score: z.number().min(0).max(100),
  effort_score: z.number().min(0).max(100),
  horizon: RecommendationHorizonSchema,
  required_capabilities: z.array(z.string()).optional(),
  action_steps: z.array(z.string()),
  expected_outcomes: z.string()
});
export type Recommendation = z.infer<typeof RecommendationSchema>;

// ============================================================================
// QUICK WIN SCHEMA
// ============================================================================

/**
 * Quick win - a recommendation identified as high impact, low effort
 */
export const QuickWinSchema = z.object({
  recommendation_id: z.string()
});
export type QuickWin = z.infer<typeof QuickWinSchema>;

// ============================================================================
// RISK SCHEMA
// ============================================================================

/**
 * Risk identified in the assessment
 */
export const RiskSchema = z.object({
  id: z.string(),
  dimension_code: DimensionCodeSchema,
  severity: z.union([z.string(), z.number()]),
  likelihood: z.union([z.string(), z.number()]),
  narrative: z.string(),
  linked_recommendation_ids: z.array(z.string()).optional(),
  category: z.string().optional()
});
export type Risk = z.infer<typeof RiskSchema>;

// ============================================================================
// ROADMAP PHASE SCHEMA
// ============================================================================

/**
 * Roadmap phase for implementation planning
 */
export const RoadmapPhaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  time_horizon: z.string(),
  linked_recommendation_ids: z.array(z.string()),
  narrative: z.string()
});
export type RoadmapPhase = z.infer<typeof RoadmapPhaseSchema>;

/**
 * Complete roadmap
 */
export const RoadmapSchema = z.object({
  phases: z.array(RoadmapPhaseSchema)
});
export type Roadmap = z.infer<typeof RoadmapSchema>;

// ============================================================================
// SCORES SUMMARY SCHEMA
// ============================================================================

/**
 * Overall scores summary with benchmark context
 */
export const ScoresSummarySchema = z.object({
  overall_health_score: z.number().min(0).max(100),
  descriptor: z.string(),
  trajectory: TrajectorySchema,
  key_imperatives: z.array(z.string()),
  overall_benchmark: OverallBenchmarkSchema
});
export type ScoresSummary = z.infer<typeof ScoresSummarySchema>;

// ============================================================================
// VISUALIZATION SPEC SCHEMA (for IDM integration)
// ============================================================================

/**
 * Visualization types supported by the rendering engine
 */
export const VisualizationTypeSchema = z.enum([
  'gauge',
  'bar_chart',
  'horizontal_bar',
  'comparison_matrix',
  'score_tiles',
  'timeline',
  'risk_matrix',
  'heatmap',
  'radar_chart',
  'priority_table',
  'progress_indicator',
  'trend_sparkline',
  'kpi_card'
]);
export type VisualizationType = z.infer<typeof VisualizationTypeSchema>;

/**
 * Data point for visualization
 */
export const VisualizationDataPointSchema = z.object({
  label: z.string(),
  value: z.number(),
  unit: z.enum(['%', '$', 'count', 'score', 'days', 'ratio', 'none']).optional(),
  category: z.enum([
    'strength',
    'gap',
    'risk',
    'opportunity',
    'neutral',
    'excellence',
    'proficiency',
    'attention',
    'critical'
  ]).optional(),
  secondaryValue: z.number().optional(),
  trend: z.enum(['up', 'down', 'stable']).optional(),
  benchmark: z.number().optional()
});
export type VisualizationDataPoint = z.infer<typeof VisualizationDataPointSchema>;

/**
 * Visualization specification extracted from AI output
 */
export const VisualizationSpecSchema = z.object({
  vizId: z.string().optional(),
  vizType: VisualizationTypeSchema,
  title: z.string(),
  subtitle: z.string().optional(),
  data: z.array(VisualizationDataPointSchema),
  metadata: z.object({
    source: z.string().optional(),
    assessmentSection: z.string().optional(),
    dimensionCode: z.string().optional(),
    chapterCode: z.string().optional(),
    generatedBy: z.enum(['phase1', 'phase2', 'phase3']).optional(),
    confidenceScore: z.number().min(0).max(1).optional()
  }).optional(),
  renderOptions: z.object({
    showLegend: z.boolean().optional(),
    showValues: z.boolean().optional(),
    colorScheme: z.enum(['default', 'monochrome', 'score_bands']).optional(),
    height: z.enum(['compact', 'standard', 'expanded']).optional()
  }).optional()
});
export type VisualizationSpecIDM = z.infer<typeof VisualizationSpecSchema>;

/**
 * Collection of visualizations from all phases
 */
export const IDMVisualizationsSchema = z.object({
  /** Visualizations from Phase 1 analyses */
  phase1: z.array(VisualizationSpecSchema).default([]),
  /** Visualizations from Phase 2 syntheses */
  phase2: z.array(VisualizationSpecSchema).default([]),
  /** Visualizations from Phase 3 executive synthesis */
  phase3: z.array(VisualizationSpecSchema).default([]),
  /** Total count of all visualizations */
  totalCount: z.number().int().nonnegative().default(0)
}).optional();
export type IDMVisualizations = z.infer<typeof IDMVisualizationsSchema>;

// ============================================================================
// DATA QUALITY SUMMARY SCHEMA
// ============================================================================

/**
 * Quality summary embedded in IDM from Phase 4 data quality tracking
 */
export const IDMQualitySummarySchema = z.object({
  runId: z.string(),
  status: z.enum(['PASS', 'FAIL', 'NEEDS_REVIEW']),
  criticalIssues: z.number().int().nonnegative(),
  warnings: z.number().int().nonnegative(),
  auditFilePath: z.string()
}).optional();
export type IDMQualitySummary = z.infer<typeof IDMQualitySummarySchema>;

// ============================================================================
// CROSS-DIMENSIONAL SYNTHESIS (Sections 5-8)
// ============================================================================

/**
 * Root Cause identified across dimensions (Section 5.1)
 */
export interface RootCause {
  causeId: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  affectedCategories: string[];
  affectedDimensions: string[];
  evidenceQuestions: string[];
  remediation: string;
}

/**
 * Cascade step for cascade risk analysis
 */
export interface CascadeStep {
  stepNumber: number;
  category: string;
  impact: string;
  timeToImpact: string;
  compoundingFactor: number;
}

/**
 * Cascade Risk for systematic issue impact analysis (Section 5.2)
 */
export interface CascadeRiskItem {
  triggerId: string;
  triggerCategory: string;
  triggerScore: number;
  cascadeChain: CascadeStep[];
  totalImpact: 'severe' | 'high' | 'moderate' | 'low';
  mitigationStrategy: string;
}

/**
 * Strategic Leverage Point (Section 6.3)
 */
export interface LeveragePoint {
  categoryId: string;
  categoryName: string;
  leverageScore: number;
  impactMultiplier: number;
  implementationEffort: 'low' | 'medium' | 'high';
  expectedTimeframe: string;
  dependencies: string[];
  recommendations: string[];
}

/**
 * Integrated Investment Summary (Section 6.4)
 */
export interface IntegratedInvestment {
  totalInvestment: {
    immediate: number;
    shortTerm: number;
    longTerm: number;
  };
  investmentByCategory: Record<string, number>;
  expectedROI: {
    conservative: number;
    moderate: number;
    optimistic: number;
  };
  paybackPeriod: string;
  fundingStrategy: string[];
}

/**
 * Overall Health Scorecard (Section 7.1)
 */
export interface HealthScorecard {
  overallScore: number;
  dimensionScores: Record<string, number>;
  categoryScores: Record<string, number>;
  trajectory: 'improving' | 'stable' | 'declining';
  benchmarkComparison: {
    industry: string;
    percentile: number;
  };
  strengthAreas: string[];
  riskAreas: string[];
}

/**
 * Network node for interdependency map
 */
export interface NetworkNode {
  id: string;
  label: string;
  score: number;
  centrality: number;
  color: string;
}

/**
 * Network edge for interdependency map
 */
export interface NetworkEdge {
  source: string;
  target: string;
  weight: number;
  type: 'enables' | 'constrains' | 'amplifies';
}

/**
 * Category cluster for interdependency grouping
 */
export interface CategoryCluster {
  name: string;
  categories: string[];
  clusterScore: number;
  criticalPath: boolean;
}

/**
 * Interdependency Network Data (Section 7.2)
 */
export interface InterdependencyNetwork {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  clusters: CategoryCluster[];
}

/**
 * Strategic Narrative (Section 8.1)
 */
export interface StrategicNarrative {
  currentState: string;
  rootCauseSummary: string;
  strategicOpportunity: string;
  recommendedApproach: string;
}

/**
 * Decision Option for leadership questions
 */
export interface DecisionOption {
  description: string;
  pros: string[];
  cons: string[];
  requiredResources: string;
  timeline: string;
  riskLevel: 'low' | 'medium' | 'high';
}

/**
 * Leadership Question (Section 8.2)
 */
export interface LeadershipQuestion {
  questionId: string;
  question: string;
  context: string;
  optionA: DecisionOption;
  optionB: DecisionOption;
  recommendedPath: 'A' | 'B' | 'hybrid';
}

/**
 * Action Phase for Path Forward
 */
export interface ActionPhase {
  name: string;
  objectives: string[];
  initiatives: string[];
  expectedOutcomes: string[];
  resourceRequirements: string;
  criticalSuccessFactors: string[];
}

/**
 * Milestone for Path Forward
 */
export interface Milestone {
  name: string;
  targetDate: string;
  deliverables: string[];
  owner: string;
}

/**
 * Path Forward (Section 8.3)
 */
export interface PathForward {
  phase1: ActionPhase;
  phase2: ActionPhase;
  phase3: ActionPhase;
  successMetrics: string[];
  keyMilestones: Milestone[];
}

/**
 * PMO Resource Requirement
 */
export interface ResourceRequirement {
  role: string;
  fte: number;
  duration: string;
  skills: string[];
  estimatedCost: number;
}

/**
 * PMO Success Metric
 */
export interface SuccessMetric {
  metric: string;
  baseline: string;
  target: string;
  measurementFrequency: string;
  owner: string;
}

/**
 * PMO Requirements for implementation
 */
export interface PMORequirements {
  phase1: {
    resourceRequirements: ResourceRequirement[];
    riskConsiderations: string[];
    successMetrics: SuccessMetric[];
  };
  phase4: {
    resourceRequirements: ResourceRequirement[];
    successMetrics: SuccessMetric[];
  };
}

/**
 * Initiative for implementation summary
 */
export interface Initiative {
  title: string;
  description: string;
  expectedROI: number;
  timeline: string;
  investmentRequired: number;
  owner: string;
  riskLevel: 'low' | 'medium' | 'high';
  quickWin: boolean;
}

/**
 * Implementation Summary
 */
export interface ImplementationSummary {
  totalInitiatives: number;
  timelineRange: { min: string; max: string };
  totalInvestment: number;
  totalResourceRequirements: { fte: number; contractors: number };
  overallRisk: 'low' | 'medium' | 'high';
  expectedBusinessImpact: string;
  top3Initiatives: Initiative[];
}

/**
 * Cross-Dimensional Synthesis - Sections 5-8 of Comprehensive Report
 * Populated from Phase 1.5 category analysis data
 */
export interface CrossDimensionalSynthesis {
  // Section 5: Interdependency Synthesis
  rootCauseHierarchy: RootCause[];
  systematicIssueImpactCascade: CascadeRiskItem[];

  // Section 6: Strategic Leverage Points
  leveragePointImplementationSequence: LeveragePoint[];
  integratedInvestmentSummary: IntegratedInvestment;

  // Section 7: Overall Health Assessment
  overallHealthScorecard: HealthScorecard;
  interdependencyMapData: InterdependencyNetwork;

  // Section 8: Executive Synthesis
  coreStrategicNarrative: StrategicNarrative;
  criticalQuestionsOfLeadership: LeadershipQuestion[];
  pathForward: PathForward;

  // Metadata
  synthesisQuality: 'complete' | 'partial' | 'minimal';
  dataCompleteness: number;
  generatedAt: string;
}

// ============================================================================
// IDM ROOT SCHEMA
// ============================================================================

/**
 * Complete Insights Data Model (IDM)
 */
export const IDMSchema = z.object({
  meta: MetaSchema,
  chapters: z.array(ChapterSchema),
  dimensions: z.array(DimensionSchema),
  questions: z.array(QuestionSchema),
  findings: z.array(FindingSchema),
  recommendations: z.array(RecommendationSchema),
  quick_wins: z.array(QuickWinSchema),
  risks: z.array(RiskSchema),
  roadmap: RoadmapSchema,
  scores_summary: ScoresSummarySchema,
  /**
   * Extracted visualization specifications from all phases.
   * These are the ONLY source for chart rendering in Phase 5.
   * ASCII visualizations are prohibited and will not appear here.
   */
  visualizations: IDMVisualizationsSchema,

  // ========================================================================
  // Phase 1.5 Integration (optional for backward compatibility)
  // ========================================================================

  /**
   * Category-level analyses from Phase 1.5.
   * Provides granular insights for all 12 business dimensions.
   */
  categoryAnalyses: z.array(z.custom<CategoryAnalysis>()).optional(),

  /**
   * Chapter summaries aggregated from category analyses.
   * Groups insights by the 4 main chapters (GE, PH, PL, RS).
   */
  chapterSummaries: z.array(z.custom<ChapterSummary>()).optional(),

  /**
   * Cross-category insights including systemic patterns,
   * interdependency analysis, and prioritization matrix.
   */
  crossCategoryInsights: z.custom<CrossCategoryInsights>().optional(),

  /**
   * Overall health metrics from Phase 1.5 (more granular than scores_summary).
   * Used when Phase 1.5 data is available for enhanced accuracy.
   */
  phase15OverallHealth: z.object({
    score: z.number().min(0).max(100),
    status: z.string(),
    trajectory: z.enum(['Declining', 'Stable', 'Improving'])
  }).optional(),

  /**
   * Data quality summary from Phase 4 consolidation.
   * Contains audit status, issue counts, and path to full audit file.
   */
  dataQuality: IDMQualitySummarySchema,

  // ========================================================================
  // Phase B: Structured Financial Data
  // ========================================================================

  /**
   * Strategic financial opportunities from Phase 2 AI analysis.
   * Contains structured financial impact data with min/base/max estimates,
   * confidence levels, and calculation basis.
   */
  strategic_financial_opportunities: z.array(StrategicFinancialOpportunitySchema).optional(),

  /**
   * Aggregated financial impact summary.
   * Includes total values, category breakdown, scenario analysis,
   * and data quality scoring.
   */
  financial_impact_summary: FinancialImpactSummarySchema.optional(),

  // ========================================================================
  // Cross-Dimensional Synthesis (Sections 5-8)
  // ========================================================================

  /**
   * Cross-dimensional synthesis data for comprehensive report sections 5-8.
   * Generated from Phase 1.5 category analyses with interdependency analysis.
   */
  crossDimensionalSynthesis: z.custom<CrossDimensionalSynthesis>().optional(),

  /**
   * PMO requirements for implementation phases.
   * Contains resource requirements, risk considerations, and success metrics.
   */
  pmoRequirements: z.custom<PMORequirements>().optional(),

  /**
   * Comprehensive implementation summary.
   * Contains aggregated initiative data, investment totals, and top priorities.
   */
  implementationSummary: z.custom<ImplementationSummary>().optional()
});
export type IDM = z.infer<typeof IDMSchema>;

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validate and parse IDM
 */
export function validateIDM(data: unknown): IDM {
  return IDMSchema.parse(data);
}

/**
 * Safe validate IDM without throwing
 */
export function safeValidateIDM(data: unknown) {
  return IDMSchema.safeParse(data);
}

/**
 * Validate Meta
 */
export function validateMeta(data: unknown): Meta {
  return MetaSchema.parse(data);
}

/**
 * Validate Chapter
 */
export function validateChapter(data: unknown): Chapter {
  return ChapterSchema.parse(data);
}

/**
 * Validate Dimension
 */
export function validateDimension(data: unknown): Dimension {
  return DimensionSchema.parse(data);
}

/**
 * Validate Finding
 */
export function validateFinding(data: unknown): Finding {
  return FindingSchema.parse(data);
}

/**
 * Validate Recommendation
 */
export function validateRecommendation(data: unknown): Recommendation {
  return RecommendationSchema.parse(data);
}

/**
 * Validate Risk
 */
export function validateRisk(data: unknown): Risk {
  return RiskSchema.parse(data);
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get score band from numeric score
 */
export function getScoreBand(score: number): ScoreBand {
  if (score >= 80) return 'Excellence';
  if (score >= 60) return 'Proficiency';
  if (score >= 40) return 'Attention';
  return 'Critical';
}

/**
 * Get chapter code for a dimension
 */
export function getChapterForDimension(dimensionCode: DimensionCode): ChapterCode {
  return DIMENSION_METADATA[dimensionCode].chapter;
}

/**
 * Get all dimensions for a chapter
 */
export function getDimensionsForChapter(chapterCode: ChapterCode): DimensionCode[] {
  return Object.entries(DIMENSION_METADATA)
    .filter(([_, meta]) => meta.chapter === chapterCode)
    .map(([code, _]) => code as DimensionCode);
}

/**
 * Calculate chapter score from dimensions
 */
export function calculateChapterScore(dimensions: Dimension[], chapterCode: ChapterCode): number {
  const chapterDimensions = dimensions.filter(d => d.chapter_code === chapterCode);
  if (chapterDimensions.length === 0) return 0;
  const sum = chapterDimensions.reduce((acc, d) => acc + d.score_overall, 0);
  return Math.round(sum / chapterDimensions.length);
}

/**
 * Calculate overall health score from chapters
 */
export function calculateOverallHealthScore(chapters: Chapter[]): number {
  if (chapters.length === 0) return 0;
  const sum = chapters.reduce((acc, c) => acc + c.score_overall, 0);
  return Math.round(sum / chapters.length);
}

/**
 * Get health descriptor from score
 */
export function getHealthDescriptor(score: number): string {
  if (score >= 85) return 'Excellent Health';
  if (score >= 75) return 'Good Health';
  if (score >= 65) return 'Fair Health';
  if (score >= 50) return 'Needs Improvement';
  return 'Critical Condition';
}

/**
 * Determine trajectory from current and previous scores
 *
 * For INITIAL assessments (no prior data):
 *   Returns 'Initial' - baseline established, trajectory tracking begins with next assessment
 *
 * For SUBSEQUENT assessments:
 *   - 'Improving': delta > +5 points
 *   - 'Declining': delta < -5 points
 *   - 'Stable': delta within ±5 points
 */
export function determineTrajectory(currentScore: number, previousScore?: number): Trajectory {
  // Initial assessment - no prior data available
  if (previousScore === undefined || previousScore === null) {
    return 'Initial';
  }

  // Subsequent assessment - calculate actual trajectory
  const delta = currentScore - previousScore;
  if (delta > 5) return 'Improving';
  if (delta < -5) return 'Declining';
  return 'Stable';
}

// ============================================================================
// QUESTION TO DIMENSION MAPPING
// ============================================================================

/**
 * Sub-indicator definitions for each dimension
 * Each dimension has 3-5 canonical sub-indicators
 */
export const SUB_INDICATOR_DEFINITIONS: Record<DimensionCode, { id: string; name: string }[]> = {
  STR: [
    { id: 'STR_001', name: 'Competitive Differentiation' },
    { id: 'STR_002', name: 'Market Position' },
    { id: 'STR_003', name: 'Growth Planning' },
    { id: 'STR_004', name: 'Strategic Review Process' },
    { id: 'STR_005', name: 'Exit/Growth Strategy' }
  ],
  SAL: [
    { id: 'SAL_001', name: 'Sales Target Alignment' },
    { id: 'SAL_002', name: 'Pipeline Management' },
    { id: 'SAL_003', name: 'Sales Cycle Efficiency' },
    { id: 'SAL_004', name: 'Customer Retention' },
    { id: 'SAL_005', name: 'Upselling Effectiveness' }
  ],
  MKT: [
    { id: 'MKT_001', name: 'Brand Awareness' },
    { id: 'MKT_002', name: 'Customer Targeting' },
    { id: 'MKT_003', name: 'Marketing Economics (CAC/LTV)' },
    { id: 'MKT_004', name: 'Marketing ROI' },
    { id: 'MKT_005', name: 'Channel Strategy' }
  ],
  CXP: [
    { id: 'CXP_001', name: 'Customer Feedback Systems' },
    { id: 'CXP_002', name: 'Customer Satisfaction' },
    { id: 'CXP_003', name: 'Net Promoter Score' },
    { id: 'CXP_004', name: 'Issue Resolution' },
    { id: 'CXP_005', name: 'Response Time' }
  ],
  OPS: [
    { id: 'OPS_001', name: 'Operational Efficiency' },
    { id: 'OPS_002', name: 'Process Documentation' },
    { id: 'OPS_003', name: 'Operational Reliability' },
    { id: 'OPS_004', name: 'Lean Practices' },
    { id: 'OPS_005', name: 'Resource Utilization' }
  ],
  FIN: [
    { id: 'FIN_001', name: 'Financial Controls' },
    { id: 'FIN_002', name: 'Cash Management' },
    { id: 'FIN_003', name: 'Profitability' },
    { id: 'FIN_004', name: 'Financial Planning' },
    { id: 'FIN_005', name: 'Growth Readiness' }
  ],
  HRS: [
    { id: 'HRS_001', name: 'HR Infrastructure' },
    { id: 'HRS_002', name: 'Company Culture' },
    { id: 'HRS_003', name: 'Talent Acquisition' },
    { id: 'HRS_004', name: 'Employee Development' },
    { id: 'HRS_005', name: 'Performance Management' }
  ],
  LDG: [
    { id: 'LDG_001', name: 'Leadership Effectiveness' },
    { id: 'LDG_002', name: 'Decision-Making Structure' },
    { id: 'LDG_003', name: 'Board Oversight' },
    { id: 'LDG_004', name: 'Leadership Culture' },
    { id: 'LDG_005', name: 'Development & Mentorship' }
  ],
  TIN: [
    { id: 'TIN_001', name: 'Technology Investment' },
    { id: 'TIN_002', name: 'Innovation Culture' },
    { id: 'TIN_003', name: 'Technology Adoption' },
    { id: 'TIN_004', name: 'Automation Utilization' },
    { id: 'TIN_005', name: 'Innovation Impact' }
  ],
  // ITD (canonical): IT & Data Security - canonical code for Phase 1.5+
  // Uses same structure as IDS (legacy) but with ITD prefixed IDs
  ITD: [
    { id: 'ITD_001', name: 'IT Infrastructure' },
    { id: 'ITD_002', name: 'Network Effectiveness' },
    { id: 'ITD_003', name: 'Cybersecurity' },
    { id: 'ITD_004', name: 'Data Management' },
    { id: 'ITD_005', name: 'IT Scalability' }
  ],
  // IDS (legacy): IT, Data & Systems - legacy code, maps to ITD
  IDS: [
    { id: 'IDS_001', name: 'IT Infrastructure' },
    { id: 'IDS_002', name: 'Network Effectiveness' },
    { id: 'IDS_003', name: 'Cybersecurity' },
    { id: 'IDS_004', name: 'Data Management' },
    { id: 'IDS_005', name: 'IT Scalability' }
  ],
  RMS: [
    { id: 'RMS_001', name: 'Risk Outlook' },
    { id: 'RMS_002', name: 'Risk Identification' },
    { id: 'RMS_003', name: 'Risk Mitigation' },
    { id: 'RMS_004', name: 'Business Continuity' },
    { id: 'RMS_005', name: 'Strategic Adaptability' }
  ],
  CMP: [
    { id: 'CMP_001', name: 'Compliance Awareness' },
    { id: 'CMP_002', name: 'Policy Adherence' },
    { id: 'CMP_003', name: 'Compliance Monitoring' },
    { id: 'CMP_004', name: 'Documentation' },
    { id: 'CMP_005', name: 'Incident Reporting' }
  ]
};

/**
 * Question to dimension and sub-indicator mapping
 * Maps each of the 87 questionnaire questions to its dimension and sub-indicator
 */
export interface QuestionMapping {
  question_id: string;
  dimension_code: DimensionCode;
  sub_indicator_id: string;
  weight: number;
}

export const QUESTION_MAPPINGS: QuestionMapping[] = [
  // Strategy (STR) - 8 questions (matching question-mapping.json)
  // SUB_INDICATOR_DEFINITIONS: STR_001=Competitive Differentiation, STR_002=Market Position, STR_003=Growth Planning, STR_004=Strategic Review Process, STR_005=Exit/Growth Strategy
  { question_id: 'STR01', dimension_code: 'STR', sub_indicator_id: 'STR_001', weight: 1.0 },   // competitive_differentiators_understanding -> Competitive Differentiation
  { question_id: 'STR02', dimension_code: 'STR', sub_indicator_id: 'STR_002', weight: 1.0 },   // local_market_share -> Market Position
  { question_id: 'STR03', dimension_code: 'STR', sub_indicator_id: 'STR_003', weight: 1.0 },   // sales_growth_past_year -> Growth Planning
  { question_id: 'STR04', dimension_code: 'STR', sub_indicator_id: 'STR_003', weight: 1.0 },   // target_sales_growth -> Growth Planning
  { question_id: 'STR05', dimension_code: 'STR', sub_indicator_id: 'STR_003', weight: 1.5 },   // business_goals_plan -> Growth Planning
  { question_id: 'STR06', dimension_code: 'STR', sub_indicator_id: 'STR_003', weight: 0 },     // goals_barriers -> text, skip normalization
  { question_id: 'STR07', dimension_code: 'STR', sub_indicator_id: 'STR_004', weight: 1.0 },   // business_plan_review -> Strategic Review Process
  { question_id: 'STR08', dimension_code: 'STR', sub_indicator_id: 'STR_005', weight: 1.5 },   // growth_exit_plan -> Exit/Growth Strategy

  // Sales (SAL) - 10 questions
  // SUB_INDICATOR_DEFINITIONS: SAL_001=Sales Target Alignment, SAL_002=Pipeline Management, SAL_003=Sales Cycle Efficiency, SAL_004=Customer Retention, SAL_005=Upselling Effectiveness
  { question_id: 'SAL01', dimension_code: 'SAL', sub_indicator_id: 'SAL_001', weight: 0 },     // b2b_percentage -> skip normalization
  { question_id: 'SAL02', dimension_code: 'SAL', sub_indicator_id: 'SAL_001', weight: 0 },     // b2c_percentage -> skip normalization
  { question_id: 'SAL03', dimension_code: 'SAL', sub_indicator_id: 'SAL_001', weight: 1.0 },   // sales_targets_alignment -> Sales Target Alignment
  { question_id: 'SAL04', dimension_code: 'SAL', sub_indicator_id: 'SAL_002', weight: 1.5 },   // sales_pipeline_management -> Pipeline Management
  { question_id: 'SAL05', dimension_code: 'SAL', sub_indicator_id: 'SAL_003', weight: 0.5 },   // average_sales_cycle_days -> Sales Cycle Efficiency
  { question_id: 'SAL06', dimension_code: 'SAL', sub_indicator_id: 'SAL_003', weight: 1.0 },   // close_rate -> Sales Cycle Efficiency
  { question_id: 'SAL07', dimension_code: 'SAL', sub_indicator_id: 'SAL_003', weight: 0 },     // average_sale_size -> skip normalization
  { question_id: 'SAL08', dimension_code: 'SAL', sub_indicator_id: 'SAL_004', weight: 1.0 },   // repeat_sales_percentage -> Customer Retention
  { question_id: 'SAL09', dimension_code: 'SAL', sub_indicator_id: 'SAL_005', weight: 1.0 },   // upselling_focus -> Upselling Effectiveness
  { question_id: 'SAL10', dimension_code: 'SAL', sub_indicator_id: 'SAL_005', weight: 0 },     // upselling_obstacles -> text, skip normalization

  // Marketing (MKT) - 9 questions
  // SUB_INDICATOR_DEFINITIONS: MKT_001=Brand Awareness, MKT_002=Customer Targeting, MKT_003=Marketing Economics (CAC/LTV), MKT_004=Marketing ROI, MKT_005=Channel Strategy
  { question_id: 'MKT01', dimension_code: 'MKT', sub_indicator_id: 'MKT_001', weight: 1.0 },   // brand_awareness -> Brand Awareness
  { question_id: 'MKT02', dimension_code: 'MKT', sub_indicator_id: 'MKT_005', weight: 0 },     // marketing_methods_count -> skip normalization
  { question_id: 'MKT03', dimension_code: 'MKT', sub_indicator_id: 'MKT_005', weight: 0 },     // current_marketing_channels -> text, skip normalization
  { question_id: 'MKT04', dimension_code: 'MKT', sub_indicator_id: 'MKT_002', weight: 1.0 },   // customer_targeting -> Customer Targeting
  { question_id: 'MKT05', dimension_code: 'MKT', sub_indicator_id: 'MKT_003', weight: 0.5 },   // customer_acquisition_cost -> Marketing Economics
  { question_id: 'MKT06', dimension_code: 'MKT', sub_indicator_id: 'MKT_003', weight: 0 },     // customer_lifetime_value -> skip normalization
  { question_id: 'MKT07', dimension_code: 'MKT', sub_indicator_id: 'MKT_003', weight: 1.0 },   // awareness_conversion_rate -> Marketing Economics
  { question_id: 'MKT08', dimension_code: 'MKT', sub_indicator_id: 'MKT_004', weight: 1.0 },   // marketing_roi -> Marketing ROI
  { question_id: 'MKT09', dimension_code: 'MKT', sub_indicator_id: 'MKT_004', weight: 0 },     // monthly_marketing_spend -> skip normalization

  // Customer Experience (CXP) - 8 questions
  // SUB_INDICATOR_DEFINITIONS: CXP_001=Customer Feedback Systems, CXP_002=Customer Satisfaction, CXP_003=Net Promoter Score, CXP_004=Issue Resolution, CXP_005=Response Time
  { question_id: 'CXP01', dimension_code: 'CXP', sub_indicator_id: 'CXP_001', weight: 1.0 },   // customer_feedback_tracking -> Customer Feedback Systems
  { question_id: 'CXP02', dimension_code: 'CXP', sub_indicator_id: 'CXP_001', weight: 0 },     // feedback_challenges -> text, skip normalization
  { question_id: 'CXP03', dimension_code: 'CXP', sub_indicator_id: 'CXP_002', weight: 1.5 },   // customer_satisfaction -> Customer Satisfaction
  { question_id: 'CXP04', dimension_code: 'CXP', sub_indicator_id: 'CXP_003', weight: 1.5 },   // net_promoter_score -> Net Promoter Score
  { question_id: 'CXP05', dimension_code: 'CXP', sub_indicator_id: 'CXP_002', weight: 1.0 },   // customer_effort_score -> Customer Satisfaction
  { question_id: 'CXP06', dimension_code: 'CXP', sub_indicator_id: 'CXP_002', weight: 1.0 },   // competitive_strength -> Customer Satisfaction
  { question_id: 'CXP07', dimension_code: 'CXP', sub_indicator_id: 'CXP_004', weight: 1.0 },   // issue_resolution -> Issue Resolution
  { question_id: 'CXP08', dimension_code: 'CXP', sub_indicator_id: 'CXP_005', weight: 1.0 },   // response_time_hours -> Response Time

  // Operations (OPS) - 9 questions
  // SUB_INDICATOR_DEFINITIONS: OPS_001=Operational Efficiency, OPS_002=Process Documentation, OPS_003=Operational Reliability, OPS_004=Lean Practices, OPS_005=Resource Utilization
  { question_id: 'OPS01', dimension_code: 'OPS', sub_indicator_id: 'OPS_001', weight: 1.5 },   // operational_efficiency -> Operational Efficiency
  { question_id: 'OPS02', dimension_code: 'OPS', sub_indicator_id: 'OPS_001', weight: 0 },     // operational_challenges -> text, skip normalization
  { question_id: 'OPS03', dimension_code: 'OPS', sub_indicator_id: 'OPS_002', weight: 1.0 },   // workflow_documentation -> Process Documentation
  { question_id: 'OPS04', dimension_code: 'OPS', sub_indicator_id: 'OPS_005', weight: 0 },     // inventory_turnover_rate -> skip normalization
  { question_id: 'OPS05', dimension_code: 'OPS', sub_indicator_id: 'OPS_003', weight: 1.5 },   // operational_reliability -> Operational Reliability
  { question_id: 'OPS06', dimension_code: 'OPS', sub_indicator_id: 'OPS_004', weight: 1.0 },   // lean_principles -> Lean Practices
  { question_id: 'OPS07', dimension_code: 'OPS', sub_indicator_id: 'OPS_005', weight: 1.0 },   // space_utilization -> Resource Utilization
  { question_id: 'OPS08', dimension_code: 'OPS', sub_indicator_id: 'OPS_005', weight: 1.0 },   // equipment_utilization -> Resource Utilization
  { question_id: 'OPS09', dimension_code: 'OPS', sub_indicator_id: 'OPS_005', weight: 1.0 },   // personnel_utilization -> Resource Utilization

  // Financials (FIN) - 12 questions
  // SUB_INDICATOR_DEFINITIONS: FIN_001=Financial Controls, FIN_002=Cash Management, FIN_003=Profitability, FIN_004=Financial Planning, FIN_005=Growth Readiness
  { question_id: 'FIN01', dimension_code: 'FIN', sub_indicator_id: 'FIN_001', weight: 0 },     // total_debt_liabilities -> skip normalization
  { question_id: 'FIN02', dimension_code: 'FIN', sub_indicator_id: 'FIN_002', weight: 0 },     // total_working_capital -> skip normalization
  { question_id: 'FIN03', dimension_code: 'FIN', sub_indicator_id: 'FIN_001', weight: 1.0 },   // debt_monitoring -> Financial Controls
  { question_id: 'FIN04', dimension_code: 'FIN', sub_indicator_id: 'FIN_002', weight: 0 },     // current_cash_available -> skip normalization
  { question_id: 'FIN05', dimension_code: 'FIN', sub_indicator_id: 'FIN_002', weight: 0 },     // cash_runway_months -> skip normalization
  { question_id: 'FIN06', dimension_code: 'FIN', sub_indicator_id: 'FIN_003', weight: 1.0 },   // gross_profit_margin -> Profitability
  { question_id: 'FIN07', dimension_code: 'FIN', sub_indicator_id: 'FIN_003', weight: 0 },     // monthly_profit_estimate -> skip normalization
  { question_id: 'FIN08', dimension_code: 'FIN', sub_indicator_id: 'FIN_002', weight: 0 },     // burn_rate -> skip normalization
  { question_id: 'FIN09', dimension_code: 'FIN', sub_indicator_id: 'FIN_002', weight: 1.0 },   // cash_flow_forecasting -> Cash Management
  { question_id: 'FIN10', dimension_code: 'FIN', sub_indicator_id: 'FIN_004', weight: 1.0 },   // budgeting_financial_planning -> Financial Planning
  { question_id: 'FIN11', dimension_code: 'FIN', sub_indicator_id: 'FIN_005', weight: 1.5 },   // financial_readiness_growth -> Growth Readiness
  { question_id: 'FIN12', dimension_code: 'FIN', sub_indicator_id: 'FIN_004', weight: 0 },     // financial_concerns -> text, skip normalization

  // Human Resources (HRS) - 8 questions
  // SUB_INDICATOR_DEFINITIONS: HRS_001=HR Infrastructure, HRS_002=Company Culture, HRS_003=Talent Acquisition, HRS_004=Employee Development, HRS_005=Performance Management
  { question_id: 'HRS01', dimension_code: 'HRS', sub_indicator_id: 'HRS_001', weight: 1.5 },   // hr_infrastructure -> HR Infrastructure
  { question_id: 'HRS02', dimension_code: 'HRS', sub_indicator_id: 'HRS_002', weight: 1.5 },   // company_culture -> Company Culture
  { question_id: 'HRS03', dimension_code: 'HRS', sub_indicator_id: 'HRS_003', weight: 1.0 },   // recruiting_onboarding -> Talent Acquisition
  { question_id: 'HRS04', dimension_code: 'HRS', sub_indicator_id: 'HRS_004', weight: 1.0 },   // training_development -> Employee Development
  { question_id: 'HRS05', dimension_code: 'HRS', sub_indicator_id: 'HRS_004', weight: 0 },     // training_resources_needed -> text, skip normalization
  { question_id: 'HRS06', dimension_code: 'HRS', sub_indicator_id: 'HRS_002', weight: 1.5 },   // employee_turnover_rate -> Company Culture
  { question_id: 'HRS07', dimension_code: 'HRS', sub_indicator_id: 'HRS_002', weight: 1.5 },   // employee_engagement -> Company Culture
  { question_id: 'HRS08', dimension_code: 'HRS', sub_indicator_id: 'HRS_005', weight: 1.0 },   // performance_management -> Performance Management

  // Leadership & Governance (LDG) - 7 questions
  // SUB_INDICATOR_DEFINITIONS: LDG_001=Leadership Effectiveness, LDG_002=Decision-Making Structure, LDG_003=Board Oversight, LDG_004=Leadership Culture, LDG_005=Development & Mentorship
  { question_id: 'LDG01', dimension_code: 'LDG', sub_indicator_id: 'LDG_001', weight: 1.5 },   // leadership_effectiveness -> Leadership Effectiveness
  { question_id: 'LDG02', dimension_code: 'LDG', sub_indicator_id: 'LDG_002', weight: 1.0 },   // decision_making_structure -> Decision-Making Structure
  { question_id: 'LDG03', dimension_code: 'LDG', sub_indicator_id: 'LDG_003', weight: 1.0 },   // leadership_board_oversight -> Board Oversight
  { question_id: 'LDG04', dimension_code: 'LDG', sub_indicator_id: 'LDG_003', weight: 0.5 },   // has_advisory_board -> Board Oversight
  { question_id: 'LDG05', dimension_code: 'LDG', sub_indicator_id: 'LDG_002', weight: 1.5 },   // decision_making_effectiveness -> Decision-Making Structure
  { question_id: 'LDG06', dimension_code: 'LDG', sub_indicator_id: 'LDG_004', weight: 1.0 },   // leadership_culture_effectiveness -> Leadership Culture
  { question_id: 'LDG07', dimension_code: 'LDG', sub_indicator_id: 'LDG_005', weight: 1.0 },   // development_mentorship -> Development & Mentorship

  // Technology & Innovation (TIN) - 7 questions
  // SUB_INDICATOR_DEFINITIONS: TIN_001=Technology Investment, TIN_002=Innovation Culture, TIN_003=Technology Adoption, TIN_004=Automation Utilization, TIN_005=Innovation Impact
  { question_id: 'TIN01', dimension_code: 'TIN', sub_indicator_id: 'TIN_001', weight: 0 },     // technology_investment -> skip normalization
  { question_id: 'TIN02', dimension_code: 'TIN', sub_indicator_id: 'TIN_005', weight: 1.0 },   // innovation_pipeline_percentage -> Innovation Impact
  { question_id: 'TIN03', dimension_code: 'TIN', sub_indicator_id: 'TIN_002', weight: 1.0 },   // innovation_culture -> Innovation Culture
  { question_id: 'TIN04', dimension_code: 'TIN', sub_indicator_id: 'TIN_003', weight: 1.0 },   // emerging_technologies -> Technology Adoption
  { question_id: 'TIN05', dimension_code: 'TIN', sub_indicator_id: 'TIN_003', weight: 1.0 },   // technology_adoption -> Technology Adoption
  { question_id: 'TIN06', dimension_code: 'TIN', sub_indicator_id: 'TIN_004', weight: 1.5 },   // automation_utilization -> Automation Utilization
  { question_id: 'TIN07', dimension_code: 'TIN', sub_indicator_id: 'TIN_005', weight: 1.0 },   // innovation_impact -> Innovation Impact

  // IT, Data & Systems (ITD) - 7 questions
  // SUB_INDICATOR_DEFINITIONS: ITD_001=IT Infrastructure, ITD_002=Network Effectiveness, ITD_003=Cybersecurity, ITD_004=Data Management, ITD_005=IT Scalability
  { question_id: 'ITD01', dimension_code: 'ITD', sub_indicator_id: 'ITD_001', weight: 1.5 },   // it_infrastructure -> IT Infrastructure
  { question_id: 'ITD02', dimension_code: 'ITD', sub_indicator_id: 'ITD_002', weight: 1.0 },   // network_effectiveness -> Network Effectiveness
  { question_id: 'ITD03', dimension_code: 'ITD', sub_indicator_id: 'ITD_003', weight: 2.0 },   // cybersecurity -> Cybersecurity
  { question_id: 'ITD04', dimension_code: 'ITD', sub_indicator_id: 'ITD_004', weight: 1.5 },   // data_management -> Data Management
  { question_id: 'ITD05', dimension_code: 'ITD', sub_indicator_id: 'ITD_004', weight: 1.0 },   // data_governance -> Data Management
  { question_id: 'ITD06', dimension_code: 'ITD', sub_indicator_id: 'ITD_005', weight: 1.5 },   // it_scalability -> IT Scalability
  { question_id: 'ITD07', dimension_code: 'ITD', sub_indicator_id: 'ITD_001', weight: 1.0 },   // it_support_maintenance -> IT Infrastructure

  // Risk Management & Sustainability (RMS) - 10 questions
  // SUB_INDICATOR_DEFINITIONS: RMS_001=Risk Outlook, RMS_002=Risk Identification, RMS_003=Risk Mitigation, RMS_004=Business Continuity, RMS_005=Strategic Adaptability
  { question_id: 'RMS01', dimension_code: 'RMS', sub_indicator_id: 'RMS_001', weight: 1.5 },   // overall_risk_outlook -> Risk Outlook
  { question_id: 'RMS02', dimension_code: 'RMS', sub_indicator_id: 'RMS_002', weight: 0 },     // specific_risks_concern -> text, skip normalization
  { question_id: 'RMS03', dimension_code: 'RMS', sub_indicator_id: 'RMS_002', weight: 1.0 },   // risk_identification_review -> Risk Identification
  { question_id: 'RMS04', dimension_code: 'RMS', sub_indicator_id: 'RMS_003', weight: 1.5 },   // risk_mitigation -> Risk Mitigation
  { question_id: 'RMS05', dimension_code: 'RMS', sub_indicator_id: 'RMS_003', weight: 1.5 },   // contingency_plans -> Risk Mitigation
  { question_id: 'RMS06', dimension_code: 'RMS', sub_indicator_id: 'RMS_004', weight: 1.5 },   // financial_resilience -> Business Continuity
  { question_id: 'RMS07', dimension_code: 'RMS', sub_indicator_id: 'RMS_004', weight: 1.5 },   // operational_continuity -> Business Continuity
  { question_id: 'RMS08', dimension_code: 'RMS', sub_indicator_id: 'RMS_005', weight: 1.0 },   // sustainability_practices -> Strategic Adaptability
  { question_id: 'RMS09', dimension_code: 'RMS', sub_indicator_id: 'RMS_004', weight: 0 },     // disruption_impact -> text, skip normalization
  { question_id: 'RMS10', dimension_code: 'RMS', sub_indicator_id: 'RMS_005', weight: 1.0 },   // succession_leadership_stability -> Strategic Adaptability

  // Compliance - Legal & Regulatory (CMP) - 8 questions
  // SUB_INDICATOR_DEFINITIONS: CMP_001=Compliance Awareness, CMP_002=Policy Adherence, CMP_003=Compliance Monitoring, CMP_004=Documentation, CMP_005=Incident Reporting
  { question_id: 'CMP01', dimension_code: 'CMP', sub_indicator_id: 'CMP_001', weight: 0 },     // compliance_costs -> skip normalization
  { question_id: 'CMP02', dimension_code: 'CMP', sub_indicator_id: 'CMP_002', weight: 1.5 },   // policy_adherence -> Policy Adherence
  { question_id: 'CMP03', dimension_code: 'CMP', sub_indicator_id: 'CMP_005', weight: 1.0 },   // incident_reporting -> Incident Reporting
  { question_id: 'CMP04', dimension_code: 'CMP', sub_indicator_id: 'CMP_003', weight: 1.5 },   // regulatory_updates -> Compliance Monitoring
  { question_id: 'CMP05', dimension_code: 'CMP', sub_indicator_id: 'CMP_001', weight: 1.0 },   // training_completion -> Compliance Awareness
  { question_id: 'CMP06', dimension_code: 'CMP', sub_indicator_id: 'CMP_001', weight: 1.5 },   // compliance_awareness -> Compliance Awareness
  { question_id: 'CMP07', dimension_code: 'CMP', sub_indicator_id: 'CMP_003', weight: 1.0 },   // compliance_monitoring -> Compliance Monitoring
  { question_id: 'CMP08', dimension_code: 'CMP', sub_indicator_id: 'CMP_004', weight: 1.0 }    // compliance_documentation -> Documentation
];

/**
 * Get question mapping by question ID
 */
export function getQuestionMapping(questionId: string): QuestionMapping | undefined {
  return QUESTION_MAPPINGS.find(m => m.question_id === questionId);
}

/**
 * Get all questions for a dimension
 */
export function getQuestionsForDimension(dimensionCode: DimensionCode): QuestionMapping[] {
  return QUESTION_MAPPINGS.filter(m => m.dimension_code === dimensionCode);
}

/**
 * Get all questions for a sub-indicator
 */
export function getQuestionsForSubIndicator(subIndicatorId: string): QuestionMapping[] {
  return QUESTION_MAPPINGS.filter(m => m.sub_indicator_id === subIndicatorId);
}

