import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type EmotionLevel = 1 | 2 | 3 | 4 | 5;
export type ChannelType = 'website' | 'email' | 'phone' | 'social-media' | 'in-store' | 'chat' | 'mobile-app' | 'support' | 'reviews' | 'ads' | 'word-of-mouth' | 'newsletter' | 'events';

export interface Persona {
  id: string;
  name: string;
  age: string;
  occupation: string;
  income: string;
  goals: string[];
  frustrations: string[];
  channels: ChannelType[];
  color: string;
}

export interface Touchpoint {
  id: string;
  name: string;
  channel: ChannelType;
  customerAction: string;
  businessAction: string;
  emotion: EmotionLevel;
  notes: string;
  stageId: string;
  position: number;
}

export interface PainPoint {
  id: string;
  description: string;
  stageId: string;
  touchpointId?: string;
}

export interface Opportunity {
  id: string;
  description: string;
  stageId: string;
  touchpointId?: string;
}

export interface JourneyStage {
  id: string;
  name: string;
  position: number;
}

export interface JourneyMap {
  id: string;
  name: string;
  personas: Persona[];
  stages: JourneyStage[];
  touchpoints: Touchpoint[];
  painPoints: PainPoint[];
  opportunities: Opportunity[];
  activePersonaId: string | null;
  createdAt: string;
  updatedAt: string;
}

interface JourneyMapState {
  currentMap: JourneyMap | null;
  savedMaps: JourneyMap[];
  selectedTouchpointId: string | null;
  
  // Map management
  createNewMap: (name: string) => void;
  loadMap: (id: string) => void;
  saveCurrentMap: () => void;
  deleteMap: (id: string) => void;
  clearCurrentMap: () => void;
  updateMapName: (name: string) => void;
  
  // Persona management
  addPersona: (persona: Omit<Persona, 'id'>) => void;
  updatePersona: (id: string, updates: Partial<Persona>) => void;
  deletePersona: (id: string) => void;
  setActivePersona: (id: string) => void;
  
  // Stage management
  addStage: (name: string) => void;
  updateStage: (id: string, name: string) => void;
  deleteStage: (id: string) => void;
  
  // Touchpoint management
  addTouchpoint: (touchpoint: Omit<Touchpoint, 'id'>) => void;
  updateTouchpoint: (id: string, updates: Partial<Touchpoint>) => void;
  deleteTouchpoint: (id: string) => void;
  setSelectedTouchpoint: (id: string | null) => void;
  
  // Pain points & opportunities
  addPainPoint: (painPoint: Omit<PainPoint, 'id'>) => void;
  updatePainPoint: (id: string, description: string) => void;
  deletePainPoint: (id: string) => void;
  
  addOpportunity: (opportunity: Omit<Opportunity, 'id'>) => void;
  updateOpportunity: (id: string, description: string) => void;
  deleteOpportunity: (id: string) => void;
  
  // Templates
  loadTemplate: (templateType: string) => void;
}

const defaultStages: JourneyStage[] = [
  { id: 'awareness', name: 'Awareness', position: 0 },
  { id: 'consideration', name: 'Consideration', position: 1 },
  { id: 'purchase', name: 'Purchase/Decision', position: 2 },
  { id: 'experience', name: 'Experience', position: 3 },
  { id: 'loyalty', name: 'Loyalty/Advocacy', position: 4 },
];

const generateId = () => `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const useJourneyMapStore = create<JourneyMapState>()(
  persist(
    (set, get) => ({
      currentMap: null,
      savedMaps: [],
      selectedTouchpointId: null,

      createNewMap: (name: string) => {
        const newMap: JourneyMap = {
          id: generateId(),
          name,
          personas: [],
          stages: defaultStages,
          touchpoints: [],
          painPoints: [],
          opportunities: [],
          activePersonaId: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set({ currentMap: newMap });
      },

      loadMap: (id: string) => {
        const map = get().savedMaps.find(m => m.id === id);
        if (map) {
          set({ currentMap: { ...map } });
        }
      },

      saveCurrentMap: () => {
        const { currentMap, savedMaps } = get();
        if (!currentMap) return;

        const updatedMap = { ...currentMap, updatedAt: new Date().toISOString() };
        const existingIndex = savedMaps.findIndex(m => m.id === currentMap.id);
        
        if (existingIndex >= 0) {
          const newSavedMaps = [...savedMaps];
          newSavedMaps[existingIndex] = updatedMap;
          set({ savedMaps: newSavedMaps, currentMap: updatedMap });
        } else {
          set({ savedMaps: [...savedMaps, updatedMap], currentMap: updatedMap });
        }
      },

      deleteMap: (id: string) => {
        set(state => ({
          savedMaps: state.savedMaps.filter(m => m.id !== id),
          currentMap: state.currentMap?.id === id ? null : state.currentMap,
        }));
      },

      clearCurrentMap: () => {
        set({ currentMap: null, selectedTouchpointId: null });
      },

      updateMapName: (name: string) => {
        set(state => ({
          currentMap: state.currentMap ? { ...state.currentMap, name } : null,
        }));
      },

      addPersona: (persona) => {
        const newPersona: Persona = { ...persona, id: generateId() };
        set(state => ({
          currentMap: state.currentMap ? {
            ...state.currentMap,
            personas: [...state.currentMap.personas, newPersona],
            activePersonaId: state.currentMap.activePersonaId || newPersona.id,
          } : null,
        }));
      },

      updatePersona: (id, updates) => {
        set(state => ({
          currentMap: state.currentMap ? {
            ...state.currentMap,
            personas: state.currentMap.personas.map(p =>
              p.id === id ? { ...p, ...updates } : p
            ),
          } : null,
        }));
      },

      deletePersona: (id) => {
        set(state => {
          if (!state.currentMap) return {};
          const remainingPersonas = state.currentMap.personas.filter(p => p.id !== id);
          return {
            currentMap: {
              ...state.currentMap,
              personas: remainingPersonas,
              activePersonaId: state.currentMap.activePersonaId === id
                ? (remainingPersonas[0]?.id || null)
                : state.currentMap.activePersonaId,
            },
          };
        });
      },

      setActivePersona: (id) => {
        set(state => ({
          currentMap: state.currentMap ? { ...state.currentMap, activePersonaId: id } : null,
        }));
      },

      addStage: (name) => {
        set(state => {
          if (!state.currentMap) return {};
          const position = state.currentMap.stages.length;
          const newStage: JourneyStage = { id: generateId(), name, position };
          return {
            currentMap: { ...state.currentMap, stages: [...state.currentMap.stages, newStage] },
          };
        });
      },

      updateStage: (id, name) => {
        set(state => ({
          currentMap: state.currentMap ? {
            ...state.currentMap,
            stages: state.currentMap.stages.map(s => s.id === id ? { ...s, name } : s),
          } : null,
        }));
      },

      deleteStage: (id) => {
        set(state => ({
          currentMap: state.currentMap ? {
            ...state.currentMap,
            stages: state.currentMap.stages.filter(s => s.id !== id),
            touchpoints: state.currentMap.touchpoints.filter(t => t.stageId !== id),
            painPoints: state.currentMap.painPoints.filter(p => p.stageId !== id),
            opportunities: state.currentMap.opportunities.filter(o => o.stageId !== id),
          } : null,
        }));
      },

      addTouchpoint: (touchpoint) => {
        const newTouchpoint: Touchpoint = { ...touchpoint, id: generateId() };
        set(state => ({
          currentMap: state.currentMap ? {
            ...state.currentMap,
            touchpoints: [...state.currentMap.touchpoints, newTouchpoint],
          } : null,
        }));
      },

      updateTouchpoint: (id, updates) => {
        set(state => ({
          currentMap: state.currentMap ? {
            ...state.currentMap,
            touchpoints: state.currentMap.touchpoints.map(t =>
              t.id === id ? { ...t, ...updates } : t
            ),
          } : null,
        }));
      },

      deleteTouchpoint: (id) => {
        set(state => ({
          currentMap: state.currentMap ? {
            ...state.currentMap,
            touchpoints: state.currentMap.touchpoints.filter(t => t.id !== id),
          } : null,
          selectedTouchpointId: state.selectedTouchpointId === id ? null : state.selectedTouchpointId,
        }));
      },

      setSelectedTouchpoint: (id) => {
        set({ selectedTouchpointId: id });
      },

      addPainPoint: (painPoint) => {
        const newPainPoint: PainPoint = { ...painPoint, id: generateId() };
        set(state => ({
          currentMap: state.currentMap ? {
            ...state.currentMap,
            painPoints: [...state.currentMap.painPoints, newPainPoint],
          } : null,
        }));
      },

      updatePainPoint: (id, description) => {
        set(state => ({
          currentMap: state.currentMap ? {
            ...state.currentMap,
            painPoints: state.currentMap.painPoints.map(p =>
              p.id === id ? { ...p, description } : p
            ),
          } : null,
        }));
      },

      deletePainPoint: (id) => {
        set(state => ({
          currentMap: state.currentMap ? {
            ...state.currentMap,
            painPoints: state.currentMap.painPoints.filter(p => p.id !== id),
          } : null,
        }));
      },

      addOpportunity: (opportunity) => {
        const newOpportunity: Opportunity = { ...opportunity, id: generateId() };
        set(state => ({
          currentMap: state.currentMap ? {
            ...state.currentMap,
            opportunities: [...state.currentMap.opportunities, newOpportunity],
          } : null,
        }));
      },

      updateOpportunity: (id, description) => {
        set(state => ({
          currentMap: state.currentMap ? {
            ...state.currentMap,
            opportunities: state.currentMap.opportunities.map(o =>
              o.id === id ? { ...o, description } : o
            ),
          } : null,
        }));
      },

      deleteOpportunity: (id) => {
        set(state => ({
          currentMap: state.currentMap ? {
            ...state.currentMap,
            opportunities: state.currentMap.opportunities.filter(o => o.id !== id),
          } : null,
        }));
      },

      loadTemplate: (templateType) => {
        // Template logic will be implemented in a separate function
        const templates = get().savedMaps.filter(m => m.name.includes(templateType));
        if (templates.length > 0) {
          get().loadMap(templates[0].id);
        }
      },
    }),
    {
      name: 'journey-map-storage',
    }
  )
);
