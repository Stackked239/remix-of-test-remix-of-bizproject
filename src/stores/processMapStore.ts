import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ProcessNode {
  id: string;
  type: 'task' | 'decision' | 'document' | 'delay' | 'start' | 'end';
  label: string;
  position: { x: number; y: number };
  color: string;
  icon?: string;
  assignedRole?: string;
  data?: {
    duration?: { value: number; unit: 'minutes' | 'hours' | 'days' | 'weeks' };
    inputs?: string[];
    outputs?: string[];
    riskLevel?: 'low' | 'medium' | 'high';
    instructions?: string;
    attachments?: Array<{
      name: string;
      type: 'file' | 'link';
      content: string;
      size?: number;
    }>;
  };
}

export interface ProcessConnection {
  id: string;
  source: string;
  target: string;
  label?: string;
  type: 'default' | 'conditional';
}

export interface ProcessSetup {
  id: string;
  name: string;
  department: string;
  owner: string;
  purpose: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually' | 'on-demand';
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'in-review' | 'published' | 'archived';
  nodes: ProcessNode[];
  connections: ProcessConnection[];
}

interface ProcessMapState {
  processes: ProcessSetup[];
  currentProcess: ProcessSetup | null;
  currentStep: number;
  
  // Actions
  createProcess: (setup: Omit<ProcessSetup, 'id' | 'createdAt' | 'updatedAt' | 'nodes' | 'connections'>) => void;
  updateProcess: (id: string, updates: Partial<ProcessSetup>) => void;
  deleteProcess: (id: string) => void;
  setCurrentProcess: (id: string | null) => void;
  setCurrentStep: (step: number) => void;
  addNode: (node: ProcessNode) => void;
  updateNode: (id: string, updates: Partial<ProcessNode>) => void;
  deleteNode: (id: string) => void;
  addConnection: (connection: ProcessConnection) => void;
  deleteConnection: (id: string) => void;
  duplicateProcess: (id: string) => void;
}

export const useProcessMapStore = create<ProcessMapState>()(
  persist(
    (set, get) => ({
      processes: [],
      currentProcess: null,
      currentStep: 1,

      createProcess: (setup) => {
        const newProcess: ProcessSetup = {
          ...setup,
          id: `process_${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          status: 'draft',
          nodes: [
            {
              id: 'start',
              type: 'start',
              label: 'START',
              position: { x: 250, y: 50 },
              color: '#4CAF50',
            },
          ],
          connections: [],
        };
        set((state) => ({
          processes: [...state.processes, newProcess],
          currentProcess: newProcess,
        }));
      },

      updateProcess: (id, updates) => {
        set((state) => ({
          processes: state.processes.map((p) =>
            p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
          ),
          currentProcess:
            state.currentProcess?.id === id
              ? { ...state.currentProcess, ...updates, updatedAt: new Date().toISOString() }
              : state.currentProcess,
        }));
      },

      deleteProcess: (id) => {
        set((state) => ({
          processes: state.processes.filter((p) => p.id !== id),
          currentProcess: state.currentProcess?.id === id ? null : state.currentProcess,
        }));
      },

      setCurrentProcess: (id) => {
        const process = id ? get().processes.find((p) => p.id === id) || null : null;
        set({ currentProcess: process });
      },

      setCurrentStep: (step) => set({ currentStep: step }),

      addNode: (node) => {
        const { currentProcess } = get();
        if (!currentProcess) return;

        set((state) => ({
          currentProcess: {
            ...currentProcess,
            nodes: [...currentProcess.nodes, node],
          },
          processes: state.processes.map((p) =>
            p.id === currentProcess.id
              ? { ...p, nodes: [...p.nodes, node], updatedAt: new Date().toISOString() }
              : p
          ),
        }));
      },

      updateNode: (id, updates) => {
        const { currentProcess } = get();
        if (!currentProcess) return;

        set((state) => ({
          currentProcess: {
            ...currentProcess,
            nodes: currentProcess.nodes.map((n) => (n.id === id ? { ...n, ...updates } : n)),
          },
          processes: state.processes.map((p) =>
            p.id === currentProcess.id
              ? {
                  ...p,
                  nodes: p.nodes.map((n) => (n.id === id ? { ...n, ...updates } : n)),
                  updatedAt: new Date().toISOString(),
                }
              : p
          ),
        }));
      },

      deleteNode: (id) => {
        const { currentProcess } = get();
        if (!currentProcess) return;

        set((state) => ({
          currentProcess: {
            ...currentProcess,
            nodes: currentProcess.nodes.filter((n) => n.id !== id),
            connections: currentProcess.connections.filter(
              (c) => c.source !== id && c.target !== id
            ),
          },
          processes: state.processes.map((p) =>
            p.id === currentProcess.id
              ? {
                  ...p,
                  nodes: p.nodes.filter((n) => n.id !== id),
                  connections: p.connections.filter((c) => c.source !== id && c.target !== id),
                  updatedAt: new Date().toISOString(),
                }
              : p
          ),
        }));
      },

      addConnection: (connection) => {
        const { currentProcess } = get();
        if (!currentProcess) return;

        set((state) => ({
          currentProcess: {
            ...currentProcess,
            connections: [...currentProcess.connections, connection],
          },
          processes: state.processes.map((p) =>
            p.id === currentProcess.id
              ? {
                  ...p,
                  connections: [...p.connections, connection],
                  updatedAt: new Date().toISOString(),
                }
              : p
          ),
        }));
      },

      deleteConnection: (id) => {
        const { currentProcess } = get();
        if (!currentProcess) return;

        set((state) => ({
          currentProcess: {
            ...currentProcess,
            connections: currentProcess.connections.filter((c) => c.id !== id),
          },
          processes: state.processes.map((p) =>
            p.id === currentProcess.id
              ? {
                  ...p,
                  connections: p.connections.filter((c) => c.id !== id),
                  updatedAt: new Date().toISOString(),
                }
              : p
          ),
        }));
      },

      duplicateProcess: (id) => {
        const process = get().processes.find((p) => p.id === id);
        if (!process) return;

        const duplicated: ProcessSetup = {
          ...process,
          id: `process_${Date.now()}`,
          name: `${process.name} (Copy)`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          status: 'draft',
        };

        set((state) => ({
          processes: [...state.processes, duplicated],
        }));
      },
    }),
    {
      name: 'process-map-storage',
    }
  )
);
