import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types for each step
export interface FoundationData {
  companyName: string;
  industry: string;
  customIndustry: string;
  companySize: string;
  annualRevenue: string;
  innovationChallenges: string[];
  customChallenge: string;
  whyInnovationMatters: string;
}

export interface VisionData {
  strategicIntent: string;
  threeYearAmbition: string;
  coreDifferentiator: string;
  futureDifferentiator: string;
  customerPersonas: string[];
}

export interface Opportunity {
  id: string;
  title: string;
  problemDescription: string;
  opportunityType: string;
  estimatedImpact: string;
  effortToExecute: string;
}

export interface PortfolioData {
  core: string[]; // Array of opportunity IDs
  adjacent: string[];
  transformational: string[];
  acknowledged: boolean;
}

export interface Metric {
  id: string;
  name: string;
  isCustom: boolean;
  baseline: string;
  target: string;
  trackingFrequency: string;
}

export interface RoadmapData {
  month1QuickWin: string;
  month1Owner: string;
  month1SuccessMetric: string;
  month2Capability: string;
  month2Owner: string;
  month2Deliverable: string;
  month3Initiative: string;
  month3Owner: string;
  month3SuccessCriteria: string;
  reviewCadence: string;
  nextMilestoneDate: string;
}

export interface InnovationStrategyData {
  foundation: FoundationData;
  vision: VisionData;
  opportunities: Opportunity[];
  portfolio: PortfolioData;
  metrics: Metric[];
  roadmap: RoadmapData;
}

interface InnovationStrategyStore {
  // Session info
  sessionId: string;
  startedAt: string;
  lastSaved: string;
  currentStep: number;
  elapsedTime: number;
  isActive: boolean;
  
  // Data
  data: InnovationStrategyData;
  
  // Actions
  startNewSession: () => void;
  resumeSession: () => void;
  clearSession: () => void;
  setCurrentStep: (step: number) => void;
  updateElapsedTime: (time: number) => void;
  updateFoundation: (data: Partial<FoundationData>) => void;
  updateVision: (data: Partial<VisionData>) => void;
  addOpportunity: (opportunity: Opportunity) => void;
  updateOpportunity: (id: string, data: Partial<Opportunity>) => void;
  removeOpportunity: (id: string) => void;
  reorderOpportunities: (opportunities: Opportunity[]) => void;
  updatePortfolio: (data: Partial<PortfolioData>) => void;
  assignToPortfolio: (opportunityId: string, bucket: 'core' | 'adjacent' | 'transformational') => void;
  addMetric: (metric: Metric) => void;
  updateMetric: (id: string, data: Partial<Metric>) => void;
  removeMetric: (id: string) => void;
  updateRoadmap: (data: Partial<RoadmapData>) => void;
  markSaved: () => void;
  getCompletionPercentage: () => number;
  isStepComplete: (step: number) => boolean;
  exitTool: () => void;
}

const getDefaultFoundation = (): FoundationData => ({
  companyName: '',
  industry: '',
  customIndustry: '',
  companySize: '',
  annualRevenue: '',
  innovationChallenges: [],
  customChallenge: '',
  whyInnovationMatters: '',
});

const getDefaultVision = (): VisionData => ({
  strategicIntent: '',
  threeYearAmbition: '',
  coreDifferentiator: '',
  futureDifferentiator: '',
  customerPersonas: [],
});

const getDefaultPortfolio = (): PortfolioData => ({
  core: [],
  adjacent: [],
  transformational: [],
  acknowledged: false,
});

const getDefaultRoadmap = (): RoadmapData => ({
  month1QuickWin: '',
  month1Owner: '',
  month1SuccessMetric: '',
  month2Capability: '',
  month2Owner: '',
  month2Deliverable: '',
  month3Initiative: '',
  month3Owner: '',
  month3SuccessCriteria: '',
  reviewCadence: '',
  nextMilestoneDate: '',
});

const getDefaultData = (): InnovationStrategyData => ({
  foundation: getDefaultFoundation(),
  vision: getDefaultVision(),
  opportunities: [],
  portfolio: getDefaultPortfolio(),
  metrics: [],
  roadmap: getDefaultRoadmap(),
});

const generateSessionId = () => `is_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const useInnovationStrategyStore = create<InnovationStrategyStore>()(
  persist(
    (set, get) => ({
      sessionId: '',
      startedAt: '',
      lastSaved: '',
      currentStep: 0, // 0 = landing, 1-6 = steps, 7 = review
      elapsedTime: 0,
      isActive: false,
      data: getDefaultData(),

      startNewSession: () => {
        const now = new Date().toISOString();
        set({
          sessionId: generateSessionId(),
          startedAt: now,
          lastSaved: now,
          currentStep: 1,
          elapsedTime: 0,
          isActive: true,
          data: getDefaultData(),
        });
      },

      resumeSession: () => {
        set({ isActive: true });
      },

      clearSession: () => {
        set({
          sessionId: '',
          startedAt: '',
          lastSaved: '',
          currentStep: 0,
          elapsedTime: 0,
          isActive: false,
          data: getDefaultData(),
        });
      },

      exitTool: () => {
        set({ isActive: false, currentStep: 0 });
      },

      setCurrentStep: (step) => {
        set({ currentStep: step });
        get().markSaved();
      },

      updateElapsedTime: (time) => set({ elapsedTime: time }),

      updateFoundation: (data) => {
        set((state) => ({
          data: {
            ...state.data,
            foundation: { ...state.data.foundation, ...data },
          },
        }));
        get().markSaved();
      },

      updateVision: (data) => {
        set((state) => ({
          data: {
            ...state.data,
            vision: { ...state.data.vision, ...data },
          },
        }));
        get().markSaved();
      },

      addOpportunity: (opportunity) => {
        set((state) => ({
          data: {
            ...state.data,
            opportunities: [...state.data.opportunities, opportunity],
          },
        }));
        get().markSaved();
      },

      updateOpportunity: (id, data) => {
        set((state) => ({
          data: {
            ...state.data,
            opportunities: state.data.opportunities.map((opp) =>
              opp.id === id ? { ...opp, ...data } : opp
            ),
          },
        }));
        get().markSaved();
      },

      removeOpportunity: (id) => {
        set((state) => ({
          data: {
            ...state.data,
            opportunities: state.data.opportunities.filter((opp) => opp.id !== id),
            portfolio: {
              ...state.data.portfolio,
              core: state.data.portfolio.core.filter((oppId) => oppId !== id),
              adjacent: state.data.portfolio.adjacent.filter((oppId) => oppId !== id),
              transformational: state.data.portfolio.transformational.filter((oppId) => oppId !== id),
            },
          },
        }));
        get().markSaved();
      },

      reorderOpportunities: (opportunities) => {
        set((state) => ({
          data: {
            ...state.data,
            opportunities,
          },
        }));
        get().markSaved();
      },

      updatePortfolio: (data) => {
        set((state) => ({
          data: {
            ...state.data,
            portfolio: { ...state.data.portfolio, ...data },
          },
        }));
        get().markSaved();
      },

      assignToPortfolio: (opportunityId, bucket) => {
        set((state) => {
          const newPortfolio = {
            core: state.data.portfolio.core.filter((id) => id !== opportunityId),
            adjacent: state.data.portfolio.adjacent.filter((id) => id !== opportunityId),
            transformational: state.data.portfolio.transformational.filter((id) => id !== opportunityId),
            acknowledged: state.data.portfolio.acknowledged,
          };
          newPortfolio[bucket].push(opportunityId);
          return {
            data: {
              ...state.data,
              portfolio: newPortfolio,
            },
          };
        });
        get().markSaved();
      },

      addMetric: (metric) => {
        set((state) => ({
          data: {
            ...state.data,
            metrics: [...state.data.metrics, metric],
          },
        }));
        get().markSaved();
      },

      updateMetric: (id, data) => {
        set((state) => ({
          data: {
            ...state.data,
            metrics: state.data.metrics.map((m) =>
              m.id === id ? { ...m, ...data } : m
            ),
          },
        }));
        get().markSaved();
      },

      removeMetric: (id) => {
        set((state) => ({
          data: {
            ...state.data,
            metrics: state.data.metrics.filter((m) => m.id !== id),
          },
        }));
        get().markSaved();
      },

      updateRoadmap: (data) => {
        set((state) => ({
          data: {
            ...state.data,
            roadmap: { ...state.data.roadmap, ...data },
          },
        }));
        get().markSaved();
      },

      markSaved: () => {
        set({ lastSaved: new Date().toISOString() });
      },

      getCompletionPercentage: () => {
        const state = get();
        let completed = 0;
        const total = 6;

        if (state.isStepComplete(1)) completed++;
        if (state.isStepComplete(2)) completed++;
        if (state.isStepComplete(3)) completed++;
        if (state.isStepComplete(4)) completed++;
        if (state.isStepComplete(5)) completed++;
        if (state.isStepComplete(6)) completed++;

        return Math.round((completed / total) * 100);
      },

      isStepComplete: (step) => {
        const { data } = get();
        
        switch (step) {
          case 1: // Foundation
            return !!(
              data.foundation.companyName &&
              data.foundation.industry &&
              data.foundation.companySize &&
              data.foundation.annualRevenue &&
              data.foundation.innovationChallenges.length >= 1 &&
              data.foundation.innovationChallenges.length <= 3 &&
              data.foundation.whyInnovationMatters
            );
          case 2: // Vision
            return !!(
              data.vision.strategicIntent &&
              data.vision.threeYearAmbition &&
              data.vision.coreDifferentiator &&
              data.vision.futureDifferentiator &&
              data.vision.customerPersonas.length >= 1 &&
              data.vision.customerPersonas.length <= 2
            );
          case 3: // Opportunities
            return data.opportunities.length >= 3 && 
              data.opportunities.every(opp => 
                opp.title && opp.problemDescription && opp.opportunityType && 
                opp.estimatedImpact && opp.effortToExecute
              );
          case 4: // Portfolio
            const totalAssigned = 
              data.portfolio.core.length + 
              data.portfolio.adjacent.length + 
              data.portfolio.transformational.length;
            return (
              totalAssigned === data.opportunities.length &&
              data.portfolio.core.length >= 1 &&
              data.portfolio.acknowledged
            );
          case 5: // Metrics
            return (
              data.metrics.length >= 3 &&
              data.metrics.length <= 5 &&
              data.metrics.every(m => m.baseline && m.target && m.trackingFrequency)
            );
          case 6: // Roadmap
            return !!(
              data.roadmap.month1QuickWin &&
              data.roadmap.month1Owner &&
              data.roadmap.month1SuccessMetric &&
              data.roadmap.month2Capability &&
              data.roadmap.month2Owner &&
              data.roadmap.month2Deliverable &&
              data.roadmap.month3Initiative &&
              data.roadmap.month3Owner &&
              data.roadmap.month3SuccessCriteria &&
              data.roadmap.reviewCadence &&
              data.roadmap.nextMilestoneDate
            );
          default:
            return false;
        }
      },
    }),
    {
      name: 'innovation-strategy-storage',
    }
  )
);
