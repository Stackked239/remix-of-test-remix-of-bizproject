/**
 * VoC Routing Matrix
 * Determines personalized recommendations based on quiz answers
 */

import { Recommendation, QuizAnswers } from '@/state/vocStateManager';

// Segment configuration
export const segmentConfig = {
  launch: {
    label: "Getting Started",
    color: "#22C55E",
    lightBg: "rgba(34, 197, 94, 0.08)",
    icon: "🌱"
  },
  growth: {
    label: "Building Momentum",
    color: "#3B82F6",
    lightBg: "rgba(59, 130, 246, 0.08)",
    icon: "📈"
  },
  scaling: {
    label: "Ready to Scale",
    color: "#8B5CF6",
    lightBg: "rgba(139, 92, 246, 0.08)",
    icon: "🚀"
  },
  enterprise: {
    label: "Enterprise-Level",
    color: "#EC4899",
    lightBg: "rgba(236, 72, 153, 0.08)",
    icon: "🏢"
  }
};

export const maturityLabels = {
  none: "minimal",
  informal: "basic",
  basic: "intermediate",
  established: "advanced"
};

export const businessStageLabels = {
  launch: "Early-Stage",
  growth: "Growth-Phase",
  scaling: "Scaling",
  enterprise: "Enterprise"
};

// Full routing matrix
const routingMatrix: Record<string, Recommendation> = {
  // LAUNCH SEGMENT - No Maturity
  "launch_solo_none": {
    segment: "launch",
    segmentLabel: "Getting Started",
    startModule: 1,
    pathModules: [1, 2, 3, 4, 5],
    totalTime: 105,
    complexity: "high",
    quickWinOutcomes: [
      "Identify 5 key moments when customer feedback matters most",
      "Set up a free centralized feedback tracker (Google Sheets)",
      "Send your first customer survey and get 10+ responses"
    ],
    toolsUnlocked: [
      "VoC Self-Assessment Scorecard",
      "Customer Feedback Tracker Template",
      "Survey Templates Bundle"
    ]
  },
  "launch_small_none": {
    segment: "launch",
    segmentLabel: "Getting Started",
    startModule: 1,
    pathModules: [1, 2, 3, 4, 5],
    totalTime: 105,
    complexity: "high",
    quickWinOutcomes: [
      "Map your customer touchpoints for feedback collection",
      "Create a team feedback tracker everyone can use",
      "Send surveys to 20+ customers and analyze results"
    ],
    toolsUnlocked: [
      "VoC Self-Assessment Scorecard",
      "Team Feedback Tracker Template",
      "Survey Templates Bundle"
    ]
  },
  "launch_solo_informal": {
    segment: "launch",
    segmentLabel: "Getting Started",
    startModule: 2,
    pathModules: [2, 3, 4, 5],
    totalTime: 85,
    complexity: "medium",
    quickWinOutcomes: [
      "Transform ad-hoc feedback into a structured system",
      "Choose ONE metric to track (NPS, CSAT, or CES)",
      "Create your first feedback dashboard"
    ],
    toolsUnlocked: [
      "Customer Feedback Tracker Template",
      "NPS Calculator & Tracker",
      "Survey Templates Bundle"
    ]
  },

  // GROWTH SEGMENT
  "growth_solo_informal": {
    segment: "growth",
    segmentLabel: "Building Momentum",
    startModule: 2,
    pathModules: [2, 3, 4, 5],
    totalTime: 85,
    complexity: "medium",
    quickWinOutcomes: [
      "Formalize your ad-hoc feedback into a structured system",
      "Choose ONE metric to track consistently (NPS, CSAT, or CES)",
      "Set your baseline and 90-day improvement target"
    ],
    toolsUnlocked: [
      "Feedback Tracker Template",
      "NPS Calculator & Tracker",
      "90-Day VoC Roadmap"
    ]
  },
  "growth_small_basic": {
    segment: "growth",
    segmentLabel: "Building Momentum",
    startModule: 3,
    pathModules: [3, 4, 5],
    totalTime: 60,
    complexity: "low",
    quickWinOutcomes: [
      "Choose the RIGHT metric for your business (not just the popular one)",
      "Set up automated tracking without expensive tools",
      "Create your 7-day action plan for measurable improvement"
    ],
    toolsUnlocked: [
      "Metrics Selection Guide",
      "NPS Calculator & Tracker",
      "7-Day Quick Start Checklist"
    ]
  },
  "growth_medium_basic": {
    segment: "growth",
    segmentLabel: "Building Momentum",
    startModule: 3,
    pathModules: [3, 4, 5, 6],
    totalTime: 85,
    complexity: "medium",
    quickWinOutcomes: [
      "Select and implement the right metrics for your team size",
      "Build a departmental feedback review process",
      "Create cross-functional feedback loops"
    ],
    toolsUnlocked: [
      "Metrics Dashboard Template",
      "Team Feedback Review Guide",
      "90-Day Implementation Roadmap"
    ]
  },

  // SCALING SEGMENT
  "scaling_medium_basic": {
    segment: "scaling",
    segmentLabel: "Ready to Scale",
    startModule: 3,
    pathModules: [3, 4, 5, 6],
    totalTime: 85,
    complexity: "medium",
    quickWinOutcomes: [
      "Implement organization-wide feedback tracking",
      "Set up departmental ownership and accountability",
      "Create executive-level VoC reporting dashboard"
    ],
    toolsUnlocked: [
      "Enterprise Metrics Dashboard",
      "Team Ownership Matrix",
      "90-Day Implementation Roadmap"
    ]
  },
  "scaling_large_established": {
    segment: "scaling",
    segmentLabel: "Ready to Scale",
    startModule: 5,
    pathModules: [5, 6, 7],
    totalTime: 85,
    complexity: "low",
    quickWinOutcomes: [
      "Optimize your existing system for faster loop closure",
      "Build cross-functional VoC culture",
      "Implement predictive customer analytics"
    ],
    toolsUnlocked: [
      "Advanced Analytics Framework",
      "Culture Building Playbook",
      "Predictive Modeling Guide"
    ]
  },

  // ENTERPRISE SEGMENT
  "enterprise_large_established": {
    segment: "enterprise",
    segmentLabel: "Enterprise-Level",
    startModule: 7,
    pathModules: [7],
    totalTime: 35,
    complexity: "mastery",
    quickWinOutcomes: [
      "Implement advanced root cause analysis and predictive modeling",
      "Build enterprise-wide customer-centric culture",
      "Use VoC insights for M&A strategy and market expansion"
    ],
    toolsUnlocked: [
      "Advanced Predictive Modeling Framework",
      "Organizational Culture Transformation Guide",
      "Strategic M&A Intelligence System"
    ]
  }
};

// Default recommendation for unmatched combinations
const defaultRecommendation: Recommendation = {
  segment: "launch",
  segmentLabel: "Getting Started",
  startModule: 1,
  pathModules: [1, 2, 3, 4, 5],
  totalTime: 105,
  complexity: "high",
  quickWinOutcomes: [
    "Understand why customer feedback matters for YOUR business",
    "Set up your first feedback collection system",
    "Get actionable insights from real customer data"
  ],
  toolsUnlocked: [
    "VoC Self-Assessment Scorecard",
    "Customer Feedback Tracker Template",
    "Survey Templates Bundle"
  ]
};

export function getRecommendation(answers: QuizAnswers): Recommendation {
  const { businessStage, employeeCount, vocMaturity } = answers;
  
  if (!businessStage || !employeeCount || !vocMaturity) {
    return defaultRecommendation;
  }

  // Try exact match
  const key = `${businessStage}_${employeeCount}_${vocMaturity}`;
  if (routingMatrix[key]) {
    return routingMatrix[key];
  }

  // Fallback: stage + maturity with various employee counts
  const fallbackKeys = [
    `${businessStage}_solo_${vocMaturity}`,
    `${businessStage}_small_${vocMaturity}`,
    `${businessStage}_medium_${vocMaturity}`,
    `${businessStage}_large_${vocMaturity}`,
  ];

  for (const fallbackKey of fallbackKeys) {
    if (routingMatrix[fallbackKey]) {
      return routingMatrix[fallbackKey];
    }
  }

  // Second fallback: stage only
  const stageDefaults: Record<string, Recommendation> = {
    launch: routingMatrix["launch_solo_none"],
    growth: routingMatrix["growth_solo_informal"],
    scaling: routingMatrix["scaling_medium_basic"],
    enterprise: routingMatrix["enterprise_large_established"],
  };

  return stageDefaults[businessStage] || defaultRecommendation;
}
