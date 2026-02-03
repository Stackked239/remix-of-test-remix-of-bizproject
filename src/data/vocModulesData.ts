/**
 * VoC Curriculum Module Data
 */

export interface ModuleData {
  number: number;
  title: string;
  description: string;
  duration: number;
  level: string;
  outcomes: string[];
  tools: string[];
}

export const modulesData: ModuleData[] = [
  {
    number: 1,
    title: "Why VoC Matters",
    description: "The real cost of not listening + your current state assessment",
    duration: 20,
    level: "Beginner",
    outcomes: [
      "Understand the business case for VoC",
      "Assess your current feedback maturity",
      "Identify your #1 customer mystery"
    ],
    tools: ["VoC Self-Assessment Scorecard"]
  },
  {
    number: 2,
    title: "The Four Core Components",
    description: "Active vs. passive collection, omnichannel listening, closing loops",
    duration: 25,
    level: "Beginner",
    outcomes: [
      "Set up active + passive feedback collection",
      "Identify all feedback channels",
      "Create centralized feedback tracker"
    ],
    tools: ["Customer Feedback Tracker Template"]
  },
  {
    number: 3,
    title: "Metrics That Drive Revenue",
    description: "NPS, CSAT, CES, Sentiment — which one and how to track it",
    duration: 20,
    level: "Intermediate",
    outcomes: [
      "Choose the right metric for your business",
      "Set up tracking without expensive tools",
      "Establish your baseline score"
    ],
    tools: ["NPS Calculator", "Survey Templates Bundle"]
  },
  {
    number: 4,
    title: "Closing the Loop",
    description: "The secret sauce: how to respond so customers become advocates",
    duration: 15,
    level: "Intermediate",
    outcomes: [
      "Master the 6-step closed-loop process",
      "Handle difficult feedback gracefully",
      "Turn detractors into promoters"
    ],
    tools: ["Loop Closure Email Templates"]
  },
  {
    number: 5,
    title: "Your 7-Day & 90-Day Plans",
    description: "Step-by-step implementation roadmaps",
    duration: 25,
    level: "Intermediate",
    outcomes: [
      "Create your 7-day quick start plan",
      "Build your 90-day implementation roadmap",
      "Assign ownership and accountability"
    ],
    tools: ["7-Day Checklist", "90-Day Roadmap Template"]
  },
  {
    number: 6,
    title: "Building VoC Culture",
    description: "Getting the whole team obsessed with customer feedback",
    duration: 25,
    level: "Advanced",
    outcomes: [
      "Get buy-in from leadership and teams",
      "Create visible feedback rituals",
      "Build customer-centric culture"
    ],
    tools: ["Team Workshop Guide", "Culture Assessment"]
  },
  {
    number: 7,
    title: "Advanced Techniques",
    description: "Predictive analytics, root cause analysis, and strategic insights",
    duration: 35,
    level: "Advanced",
    outcomes: [
      "Implement predictive customer analytics",
      "Master root cause analysis",
      "Use VoC for strategic decisions"
    ],
    tools: ["Advanced Analytics Framework", "Predictive Modeling Guide"]
  }
];

// Tools data
export interface ToolData {
  id: number;
  name: string;
  description: string;
  format: string;
  setupTime: string;
  module: number;
  downloads: number;
}

export const toolsData: ToolData[] = [
  {
    id: 1,
    name: "Customer Feedback Tracker Template",
    description: "All feedback in ONE place. Columns for date, customer, source, sentiment, category, owner, and status.",
    format: "Google Sheets / Excel",
    setupTime: "10 min",
    module: 2,
    downloads: 2340
  },
  {
    id: 2,
    name: "NPS Calculator & Tracker",
    description: "Auto-calculate your NPS from survey responses. Track trends over time with built-in charts.",
    format: "Google Sheets / Excel",
    setupTime: "5 min",
    module: 3,
    downloads: 1890
  },
  {
    id: 3,
    name: "7-Day Quick Start Checklist",
    description: "Day-by-day implementation guide. Print it, hang it up, check things off.",
    format: "PDF (Printable)",
    setupTime: "0 min",
    module: 5,
    downloads: 3120
  },
  {
    id: 4,
    name: "Loop Closure Email Templates",
    description: "Copy-paste templates for acknowledging feedback, following up, and announcing changes.",
    format: "Google Docs / Word",
    setupTime: "5 min",
    module: 4,
    downloads: 2780
  }
];

// Success stories data
export interface SuccessStory {
  id: number;
  segment: string;
  businessType: string;
  location: string;
  before: string;
  metricValue: string;
  metricDescription: string;
  timeframe: string;
  quote: string;
  attribution: string;
  employees: string;
  revenue: string;
}

export const successStories: SuccessStory[] = [
  {
    id: 1,
    segment: "launch",
    businessType: "Solo Consultant",
    location: "Denver, CO",
    before: "I was guessing what services to offer",
    metricValue: "40%",
    metricDescription: "increase in repeat bookings",
    timeframe: "2 months",
    quote: "I finally understood what my clients actually valued. Turned out it wasn't what I thought.",
    attribution: "Jamie R., Strategy Consultant",
    employees: "1",
    revenue: "$180K"
  },
  {
    id: 2,
    segment: "launch",
    businessType: "Food Truck",
    location: "Portland, OR",
    before: "No clue which menu items to keep or cut",
    metricValue: "15%",
    metricDescription: "margin improvement",
    timeframe: "6 weeks",
    quote: "The feedback tracker showed us our most profitable items weren't what customers loved. We pivoted.",
    attribution: "Chen L., Owner",
    employees: "3",
    revenue: "$340K"
  },
  {
    id: 3,
    segment: "growth",
    businessType: "Home Services Company",
    location: "Austin, TX",
    before: "We had no idea why customers weren't coming back. We just assumed our work was fine.",
    metricValue: "23%",
    metricDescription: "increase in customer retention",
    timeframe: "3 months",
    quote: "The feedback tracker alone was worth it. We found out our scheduling was the problem, not our service quality. Fixed it in a week.",
    attribution: "Marcus T., Owner",
    employees: "12",
    revenue: "$1.8M"
  },
  {
    id: 4,
    segment: "growth",
    businessType: "Marketing Agency",
    location: "Chicago, IL",
    before: "Client churn was unpredictable",
    metricValue: "18%",
    metricDescription: "improvement in client retention",
    timeframe: "4 months",
    quote: "We started asking clients about their experience, not just our deliverables. Game changer.",
    attribution: "Sarah M., Partner",
    employees: "22",
    revenue: "$3.2M"
  },
  {
    id: 5,
    segment: "scaling",
    businessType: "Manufacturing",
    location: "Cleveland, OH",
    before: "Feedback was siloed across departments",
    metricValue: "12%",
    metricDescription: "cost reduction",
    timeframe: "6 months",
    quote: "Finally, everyone sees the same customer feedback. Operations, sales, support — all aligned.",
    attribution: "David K., COO",
    employees: "85",
    revenue: "$18M"
  },
  {
    id: 6,
    segment: "scaling",
    businessType: "SaaS Company",
    location: "Seattle, WA",
    before: "Churn was a black box",
    metricValue: "28%",
    metricDescription: "churn reduction",
    timeframe: "5 months",
    quote: "We identified our top 3 churn drivers in the first week. Everything after that was execution.",
    attribution: "Lisa W., VP Customer Success",
    employees: "45",
    revenue: "$8M ARR"
  }
];

// FAQ data
export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    id: 1,
    question: "How long will this actually take?",
    answer: "The full curriculum is about 90 minutes across 4-6 modules (depending on your path). But here's the real answer: you can get your first win in 7 days by just completing the first module and taking action. You don't need to finish everything to see results."
  },
  {
    id: 2,
    question: "Do I need any special software or tools?",
    answer: "No. We designed this for businesses without big budgets. You'll use Google Forms, Google Sheets, and basic email — tools you probably already have. If you want to upgrade later, we'll show you options, but they're never required."
  },
  {
    id: 3,
    question: "What if I've tried customer feedback before and it didn't work?",
    answer: "That's exactly who this is for. Most businesses collect feedback but don't have a *system* for acting on it. This curriculum focuses on the action part — not just collecting data, but actually using it to improve. That's the difference."
  },
  {
    id: 4,
    question: "Is this just theory, or will I actually do something?",
    answer: "Every module has a specific action you'll complete. Module 1: assess your current state. Module 2: set up your tracker. Module 3: choose your metric. Module 4: create your 7-day plan. By the end, you'll have a working system — not just knowledge."
  },
  {
    id: 5,
    question: "What's the difference between this and the full BizHealth Assessment?",
    answer: "This curriculum teaches you HOW to build a customer feedback system. The BizHealth Assessment tells you WHERE your business stands across 12 dimensions (VoC is just one). Think of this as the 'how to' course; the assessment is the 'diagnosis.' Both are valuable; they serve different purposes."
  },
  {
    id: 6,
    question: "Can my team do this with me?",
    answer: "Absolutely. Module 6 is specifically about building VoC culture across your team. Many businesses have their leadership team complete the curriculum together, then assign ownership of different components."
  },
  {
    id: 7,
    question: "What if I get stuck or have questions?",
    answer: "You have options: (1) The FAQ and help sections in each module, (2) Our BizGuides coaching sessions (1-on-1 with a business advisor), or (3) The BizHealth community forum where other business owners share what's working."
  },
  {
    id: 8,
    question: "Is there a money-back guarantee?",
    answer: "The curriculum itself is included with your BizGrowth Academy access. If you're asking about the BizHealth Assessment, yes — if you complete the assessment and don't find it valuable, contact support within 7 days for a full refund."
  }
];

// Helper to get matched stories by segment
export function getMatchedStories(segment: string | null): SuccessStory[] {
  if (!segment) {
    // Return one from each segment
    return ['launch', 'growth', 'scaling'].map(seg => 
      successStories.find(s => s.segment === seg)!
    ).filter(Boolean);
  }
  
  // Return 2-3 from matching segment
  return successStories.filter(s => s.segment === segment).slice(0, 3);
}
