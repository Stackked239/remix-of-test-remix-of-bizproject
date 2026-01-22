import { useState, useEffect, useCallback } from 'react';
import { vocState, VocUserState, QuizAnswers, Recommendation } from '@/state/vocStateManager';

export function useVocState() {
  const [state, setState] = useState<VocUserState>(vocState.getState());

  useEffect(() => {
    const handleStorageChange = () => {
      setState(vocState.getState());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const completeQuiz = useCallback((answers: QuizAnswers, recommendation: Recommendation) => {
    vocState.completeQuiz(answers, recommendation);
    setState(vocState.getState());
  }, []);

  const startModule = useCallback((moduleNumber: number) => {
    vocState.startModule(moduleNumber);
    setState(vocState.getState());
  }, []);

  const completeModule = useCallback((moduleNumber: number) => {
    vocState.completeModule(moduleNumber);
    setState(vocState.getState());
  }, []);

  const trackDownload = useCallback((toolId: string, fromModule: number) => {
    vocState.trackDownload(toolId, fromModule);
    setState(vocState.getState());
  }, []);

  const resetState = useCallback(() => {
    vocState.resetState();
    setState(vocState.getState());
  }, []);

  return {
    state,
    completeQuiz,
    startModule,
    completeModule,
    trackDownload,
    hasCompletedQuiz: vocState.hasCompletedQuiz(),
    nextModule: vocState.getNextModule(),
    progressPercentage: vocState.getProgressPercentage(),
    isModule7Unlocked: vocState.isModule7Unlocked(),
    resetState,
  };
}
