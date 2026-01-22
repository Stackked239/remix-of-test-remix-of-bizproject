/**
 * Voice of Customer (VoC) Curriculum URL Configuration
 * Canonical URL structure for all VoC pages
 */

export const VOC_URLS = {
  // Landing Page
  landing: '/bizgrowth/voice-of-customer',
  
  // Module Pages
  modules: {
    1: {
      url: '/bizgrowth/voc/why-it-matters',
      title: 'Why VoC Matters',
      slug: 'why-it-matters',
      duration: 20,
      level: 'Beginner'
    },
    2: {
      url: '/bizgrowth/voc/core-components',
      title: 'The Four Core Components',
      slug: 'core-components',
      duration: 25,
      level: 'Beginner'
    },
    3: {
      url: '/bizgrowth/voc/metrics',
      title: 'Measuring What Matters',
      slug: 'metrics',
      duration: 20,
      level: 'Intermediate'
    },
    4: {
      url: '/bizgrowth/voc/closing-the-loop',
      title: 'Closing the Loop',
      slug: 'closing-the-loop',
      duration: 15,
      level: 'Intermediate'
    },
    5: {
      url: '/bizgrowth/voc/7-day-quickstart',
      title: 'Your 7-Day Quick Start',
      slug: '7-day-quickstart',
      duration: 25,
      level: 'Intermediate'
    },
    6: {
      url: '/bizgrowth/voc/90-day-system',
      title: 'Building Your 90-Day System',
      slug: '90-day-system',
      duration: 25,
      level: 'Advanced'
    },
    7: {
      url: '/bizgrowth/voc/advanced',
      title: 'Advanced Techniques',
      slug: 'advanced',
      duration: 35,
      level: 'Advanced',
      gated: true,
      requiresCompletion: [1, 2, 3, 4, 5, 6]
    }
  },
  
  // External Links (BizHealth ecosystem)
  external: {
    assessment: '/pricing',
    coaching: '/bizguides',
    tools: '/biztools',
    academy: '/bizgrowth',
    onboarding: '/onboarding'
  }
} as const;

// Helper functions
export function getModuleUrl(moduleNumber: number): string {
  const module = VOC_URLS.modules[moduleNumber as keyof typeof VOC_URLS.modules];
  return module?.url || VOC_URLS.landing;
}

export function getModuleTitle(moduleNumber: number): string {
  const module = VOC_URLS.modules[moduleNumber as keyof typeof VOC_URLS.modules];
  return module?.title || 'Unknown Module';
}

export function getModuleConfig(moduleNumber: number) {
  return VOC_URLS.modules[moduleNumber as keyof typeof VOC_URLS.modules] || null;
}

export function getAllModules() {
  return Object.entries(VOC_URLS.modules).map(([num, config]) => ({
    number: parseInt(num),
    ...config
  }));
}
