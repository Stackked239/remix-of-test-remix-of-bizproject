/**
 * VoC Analytics - Event Tracking for Voice of Customer Curriculum
 */

import { vocState } from '@/state/vocStateManager';
import { VOC_URLS } from '@/config/vocUrls';

// Event Categories
export const VOC_EVENT_CATEGORIES = {
  LANDING: 'voc_landing',
  QUIZ: 'voc_quiz',
  MODULE: 'voc_module',
  TOOL: 'voc_tool',
  ASSESSMENT: 'voc_assessment',
  COACHING: 'voc_coaching',
} as const;

// Landing Page Events
export const LANDING_EVENTS = {
  PAGE_VIEW: 'voc_landing_page_view',
  QUIZ_START: 'voc_quiz_start',
  QUIZ_QUESTION_ANSWERED: 'voc_quiz_question_answered',
  QUIZ_COMPLETE: 'voc_quiz_complete',
  RESULTS_VIEW: 'voc_results_view',
  MODULE_CTA_CLICK: 'voc_module_cta_click',
  ASSESSMENT_CTA_CLICK: 'voc_assessment_cta_click',
  TOOL_PREVIEW_CLICK: 'voc_tool_preview_click',
  FAQ_EXPAND: 'voc_faq_expand',
  COACHING_CTA_CLICK: 'voc_coaching_cta_click',
  PDF_DOWNLOAD: 'voc_pdf_download',
} as const;

// Module Page Events
export const MODULE_EVENTS = {
  PAGE_VIEW: 'voc_module_page_view',
  MODULE_START: 'voc_module_start',
  MODULE_PROGRESS: 'voc_module_progress',
  MODULE_COMPLETE: 'voc_module_complete',
  VIDEO_PLAY: 'voc_video_play',
  VIDEO_COMPLETE: 'voc_video_complete',
  TOOL_DOWNLOAD: 'voc_tool_download',
  ASSESSMENT_COMPLETE: 'voc_assessment_complete',
  NEXT_MODULE_CLICK: 'voc_next_module_click',
  PREV_MODULE_CLICK: 'voc_prev_module_click',
} as const;

interface EventProperties {
  [key: string]: string | number | boolean | null | undefined;
}

class VocAnalytics {
  private sessionId: string;

  constructor() {
    this.sessionId = vocState.getState().session.id;
  }

  track(eventName: string, properties: EventProperties = {}): void {
    const state = vocState.getState();
    
    const baseProperties = {
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
      page_url: typeof window !== 'undefined' ? window.location.href : '',
      user_segment: state.recommendation?.segment || null,
      quiz_completed: vocState.hasCompletedQuiz(),
      modules_completed: state.progression.modulesCompleted.length,
    };

    const fullProperties = { ...baseProperties, ...properties };

    // Send to GA4 if available
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', eventName, fullProperties);
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[VoC Analytics]', eventName, fullProperties);
    }
  }

  trackQuizStart(): void {
    this.track(LANDING_EVENTS.QUIZ_START);
  }

  trackQuizQuestionAnswered(questionId: number, answer: string, timeOnQuestion: number): void {
    this.track(LANDING_EVENTS.QUIZ_QUESTION_ANSWERED, {
      question_id: questionId,
      answer,
      time_on_question: timeOnQuestion,
    });
  }

  trackQuizComplete(answers: object, recommendation: { segment: string; startModule: number; pathModules: number[] }): void {
    this.track(LANDING_EVENTS.QUIZ_COMPLETE, {
      ...answers,
      recommended_segment: recommendation.segment,
      recommended_start_module: recommendation.startModule,
      path_length: recommendation.pathModules.length,
    });
  }

  trackModuleCTAClick(moduleNumber: number, source: 'results' | 'preview' | 'nav'): void {
    const module = VOC_URLS.modules[moduleNumber as keyof typeof VOC_URLS.modules];
    this.track(LANDING_EVENTS.MODULE_CTA_CLICK, {
      module_number: moduleNumber,
      module_title: module?.title || 'Unknown',
      source,
    });
  }

  trackAssessmentCTAClick(placement: string): void {
    this.track(LANDING_EVENTS.ASSESSMENT_CTA_CLICK, { placement });
  }

  trackFAQExpand(questionId: number): void {
    this.track(LANDING_EVENTS.FAQ_EXPAND, { question_id: questionId });
  }

  trackCoachingCTAClick(sessionType: string): void {
    this.track(LANDING_EVENTS.COACHING_CTA_CLICK, { session_type: sessionType });
  }
}

export const vocAnalytics = new VocAnalytics();
