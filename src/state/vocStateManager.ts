/**
 * VoC User State Manager
 * Persistent state across quiz completion, module progress, and downloads
 */

export interface QuizAnswers {
  businessStage: 'launch' | 'growth' | 'scaling' | 'enterprise' | null;
  employeeCount: 'solo' | 'small' | 'medium' | 'large' | null;
  vocMaturity: 'none' | 'informal' | 'basic' | 'established' | null;
  primaryGoal: 'retention' | 'growth' | 'operations' | 'culture' | null;
}

export interface Recommendation {
  segment: string;
  segmentLabel: string;
  startModule: number;
  pathModules: number[];
  totalTime: number;
  complexity: string;
  quickWinOutcomes: string[];
  toolsUnlocked: string[];
}

export interface VocUserState {
  quiz: {
    completed: boolean;
    completedAt: string | null;
    answers: QuizAnswers;
  };
  recommendation: Recommendation | null;
  progression: {
    modulesStarted: number[];
    modulesCompleted: number[];
    currentModule: number | null;
    lastActivityAt: string | null;
    totalTimeSpent: number;
  };
  downloads: {
    toolId: string;
    downloadedAt: string;
    fromModule: number;
  }[];
  session: {
    id: string;
    startedAt: string;
    source: string;
    device: 'mobile' | 'tablet' | 'desktop';
  };
}

function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const DEFAULT_VOC_STATE: VocUserState = {
  quiz: {
    completed: false,
    completedAt: null,
    answers: {
      businessStage: null,
      employeeCount: null,
      vocMaturity: null,
      primaryGoal: null,
    },
  },
  recommendation: null,
  progression: {
    modulesStarted: [],
    modulesCompleted: [],
    currentModule: null,
    lastActivityAt: null,
    totalTimeSpent: 0,
  },
  downloads: [],
  session: {
    id: generateUUID(),
    startedAt: new Date().toISOString(),
    source: typeof document !== 'undefined' ? document.referrer || 'direct' : 'direct',
    device: getDeviceType(),
  },
};

const STORAGE_KEY = 'bizhealth_voc_user_state';

export class VocStateManager {
  private state: VocUserState;

  constructor() {
    this.state = this.loadState();
  }

  private loadState(): VocUserState {
    if (typeof window === 'undefined') return { ...DEFAULT_VOC_STATE };
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...DEFAULT_VOC_STATE, ...parsed };
      }
    } catch (e) {
      console.error('Failed to load VoC state:', e);
    }
    return { ...DEFAULT_VOC_STATE };
  }

  private saveState(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('Failed to save VoC state:', e);
    }
  }

  completeQuiz(answers: QuizAnswers, recommendation: Recommendation): void {
    this.state.quiz = {
      completed: true,
      completedAt: new Date().toISOString(),
      answers,
    };
    this.state.recommendation = recommendation;
    this.saveState();
  }

  startModule(moduleNumber: number): void {
    if (!this.state.progression.modulesStarted.includes(moduleNumber)) {
      this.state.progression.modulesStarted.push(moduleNumber);
    }
    this.state.progression.currentModule = moduleNumber;
    this.state.progression.lastActivityAt = new Date().toISOString();
    this.saveState();
  }

  completeModule(moduleNumber: number): void {
    if (!this.state.progression.modulesCompleted.includes(moduleNumber)) {
      this.state.progression.modulesCompleted.push(moduleNumber);
    }
    this.saveState();
  }

  trackDownload(toolId: string, fromModule: number): void {
    this.state.downloads.push({
      toolId,
      downloadedAt: new Date().toISOString(),
      fromModule,
    });
    this.saveState();
  }

  getState(): VocUserState {
    return { ...this.state };
  }

  hasCompletedQuiz(): boolean {
    return this.state.quiz.completed;
  }

  getNextModule(): number | null {
    const { recommendation, progression } = this.state;
    if (!recommendation) return 1;

    const { pathModules } = recommendation;
    const { modulesCompleted } = progression;

    for (const moduleNum of pathModules) {
      if (!modulesCompleted.includes(moduleNum)) {
        return moduleNum;
      }
    }
    return null;
  }

  getProgressPercentage(): number {
    const { recommendation, progression } = this.state;
    if (!recommendation) return 0;

    const totalModules = recommendation.pathModules.length;
    const completedModules = progression.modulesCompleted.length;

    return Math.round((completedModules / totalModules) * 100);
  }

  isModule7Unlocked(): boolean {
    const requiredModules = [1, 2, 3, 4, 5, 6];
    return requiredModules.every((m) =>
      this.state.progression.modulesCompleted.includes(m)
    );
  }

  resetState(): void {
    this.state = { ...DEFAULT_VOC_STATE };
    this.saveState();
  }
}

export const vocState = new VocStateManager();
