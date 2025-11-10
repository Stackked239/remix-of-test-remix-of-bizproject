import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SWOTItem {
  id: string;
  quadrant: 'strength' | 'weakness' | 'opportunity' | 'threat';
  text: string;
  details?: string;
  evidence?: string;
  impactLevel: 'low' | 'medium' | 'high';
  order: number;
  createdAt: Date;
}

export interface BusinessProfile {
  id: string;
  businessName: string;
  industry: string;
  size: 'solo' | 'micro' | 'small' | 'medium';
  yearsInBusiness: number;
  analysisPurpose?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ActionItem {
  id: string;
  priorityId: string;
  action: string;
  owner: string;
  dueDate: string;
  completed: boolean;
  notes?: string;
}

export interface Priority {
  id: string;
  title: string;
  description: string;
  timeline: string;
  actions: ActionItem[];
  order: number;
}

export interface SWOTAnalysis {
  id: string;
  businessProfile: BusinessProfile | null;
  items: SWOTItem[];
  priorities: Priority[];
  createdAt: Date;
  updatedAt: Date;
}

interface SWOTStore {
  currentAnalysis: SWOTAnalysis | null;
  savedAnalyses: SWOTAnalysis[];
  currentStep: number;
  
  // Actions
  createNewAnalysis: () => void;
  setBusinessProfile: (profile: BusinessProfile) => void;
  addSWOTItem: (item: Omit<SWOTItem, 'id' | 'createdAt' | 'order'>) => void;
  updateSWOTItem: (id: string, updates: Partial<SWOTItem>) => void;
  deleteSWOTItem: (id: string) => void;
  addPriority: (priority: Omit<Priority, 'id'>) => void;
  updatePriority: (id: string, updates: Partial<Priority>) => void;
  deletePriority: (id: string) => void;
  setCurrentStep: (step: number) => void;
  saveAnalysis: () => void;
  loadAnalysis: (id: string) => void;
  clearCurrentAnalysis: () => void;
}

export const useSWOTStore = create<SWOTStore>()(
  persist(
    (set, get) => ({
      currentAnalysis: null,
      savedAnalyses: [],
      currentStep: 0,

      createNewAnalysis: () => {
        const newAnalysis: SWOTAnalysis = {
          id: `swot_${Date.now()}`,
          businessProfile: null,
          items: [],
          priorities: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set({ currentAnalysis: newAnalysis, currentStep: 0 });
      },

      setBusinessProfile: (profile) => {
        const { currentAnalysis } = get();
        if (currentAnalysis) {
          set({
            currentAnalysis: {
              ...currentAnalysis,
              businessProfile: profile,
              updatedAt: new Date(),
            },
          });
        }
      },

      addSWOTItem: (item) => {
        const { currentAnalysis } = get();
        if (currentAnalysis) {
          const newItem: SWOTItem = {
            ...item,
            id: `item_${Date.now()}_${Math.random()}`,
            createdAt: new Date(),
            order: currentAnalysis.items.filter(i => i.quadrant === item.quadrant).length,
          };
          set({
            currentAnalysis: {
              ...currentAnalysis,
              items: [...currentAnalysis.items, newItem],
              updatedAt: new Date(),
            },
          });
        }
      },

      updateSWOTItem: (id, updates) => {
        const { currentAnalysis } = get();
        if (currentAnalysis) {
          set({
            currentAnalysis: {
              ...currentAnalysis,
              items: currentAnalysis.items.map(item =>
                item.id === id ? { ...item, ...updates } : item
              ),
              updatedAt: new Date(),
            },
          });
        }
      },

      deleteSWOTItem: (id) => {
        const { currentAnalysis } = get();
        if (currentAnalysis) {
          set({
            currentAnalysis: {
              ...currentAnalysis,
              items: currentAnalysis.items.filter(item => item.id !== id),
              updatedAt: new Date(),
            },
          });
        }
      },

      addPriority: (priority) => {
        const { currentAnalysis } = get();
        if (currentAnalysis) {
          const newPriority: Priority = {
            ...priority,
            id: `priority_${Date.now()}`,
          };
          set({
            currentAnalysis: {
              ...currentAnalysis,
              priorities: [...currentAnalysis.priorities, newPriority],
              updatedAt: new Date(),
            },
          });
        }
      },

      updatePriority: (id, updates) => {
        const { currentAnalysis } = get();
        if (currentAnalysis) {
          set({
            currentAnalysis: {
              ...currentAnalysis,
              priorities: currentAnalysis.priorities.map(p =>
                p.id === id ? { ...p, ...updates } : p
              ),
              updatedAt: new Date(),
            },
          });
        }
      },

      deletePriority: (id) => {
        const { currentAnalysis } = get();
        if (currentAnalysis) {
          set({
            currentAnalysis: {
              ...currentAnalysis,
              priorities: currentAnalysis.priorities.filter(p => p.id !== id),
              updatedAt: new Date(),
            },
          });
        }
      },

      setCurrentStep: (step) => {
        set({ currentStep: step });
      },

      saveAnalysis: () => {
        const { currentAnalysis, savedAnalyses } = get();
        if (currentAnalysis) {
          const existingIndex = savedAnalyses.findIndex(a => a.id === currentAnalysis.id);
          if (existingIndex >= 0) {
            const updated = [...savedAnalyses];
            updated[existingIndex] = currentAnalysis;
            set({ savedAnalyses: updated });
          } else {
            set({ savedAnalyses: [...savedAnalyses, currentAnalysis] });
          }
        }
      },

      loadAnalysis: (id) => {
        const { savedAnalyses } = get();
        const analysis = savedAnalyses.find(a => a.id === id);
        if (analysis) {
          set({ currentAnalysis: analysis, currentStep: 0 });
        }
      },

      clearCurrentAnalysis: () => {
        set({ currentAnalysis: null, currentStep: 0 });
      },
    }),
    {
      name: 'swot-analysis-storage',
    }
  )
);
