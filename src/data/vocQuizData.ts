/**
 * VoC Quiz Questions Data
 */

export interface QuizOption {
  value: string;
  title: string;
  description: string;
}

export interface QuizQuestionData {
  id: number;
  headline: string;
  subtext: string;
  answerKey: 'businessStage' | 'employeeCount' | 'vocMaturity' | 'primaryGoal';
  options: QuizOption[];
}

export const quizQuestions: QuizQuestionData[] = [
  {
    id: 1,
    headline: "How long has your business been operating?",
    subtext: "Choose the option that best describes your situation:",
    answerKey: 'businessStage',
    options: [
      {
        value: "launch",
        title: "Just getting started",
        description: "0-2 years, still finding our footing"
      },
      {
        value: "growth",
        title: "Building momentum",
        description: "2-5 years, systems are forming"
      },
      {
        value: "scaling",
        title: "Ready to scale",
        description: "5+ years, growth is the priority"
      },
      {
        value: "enterprise",
        title: "Enterprise operations",
        description: "10+ years, complex operations"
      }
    ]
  },
  {
    id: 2,
    headline: "How many people work in your business?",
    subtext: "This helps us recommend the right complexity level:",
    answerKey: 'employeeCount',
    options: [
      {
        value: "solo",
        title: "Just me (solo)",
        description: "Founder-led, no employees"
      },
      {
        value: "small",
        title: "Small team",
        description: "2-10 employees"
      },
      {
        value: "medium",
        title: "Growing team",
        description: "11-50 employees"
      },
      {
        value: "large",
        title: "Established organization",
        description: "50+ employees"
      }
    ]
  },
  {
    id: 3,
    headline: "How does your business currently collect customer feedback?",
    subtext: "Be honest — there's no wrong answer:",
    answerKey: 'vocMaturity',
    options: [
      {
        value: "none",
        title: "We don't have a system",
        description: "We guess what customers want or wait for complaints"
      },
      {
        value: "informal",
        title: "Informal and inconsistent",
        description: "We ask sometimes, but nothing structured"
      },
      {
        value: "basic",
        title: "Basic system in place",
        description: "We have surveys, but no real process for action"
      },
      {
        value: "established",
        title: "Established practices",
        description: "Regular collection with some follow-through"
      }
    ]
  },
  {
    id: 4,
    headline: "What's the #1 thing you want from customer feedback?",
    subtext: "Pick the one that matters most right now:",
    answerKey: 'primaryGoal',
    options: [
      {
        value: "retention",
        title: "Stop losing customers",
        description: "Understand why they leave and fix it"
      },
      {
        value: "growth",
        title: "Find growth opportunities",
        description: "Discover unmet needs to expand offerings"
      },
      {
        value: "operations",
        title: "Improve operations",
        description: "Make the business run smoother"
      },
      {
        value: "culture",
        title: "Build customer-centric culture",
        description: "Get the whole team focused on customers"
      }
    ]
  }
];
