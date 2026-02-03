/**
 * Essentials Plan Questionnaire ($99)
 * 
 * 45-question micro-questionnaire for micro-businesses and solopreneurs.
 * Organized into 4 chapters with 12 categories.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';
import { useAuth } from '@/hooks/useAuth';

// Types
interface QuestionResponse {
  questionId: string;
  value: number | string | boolean | string[];
  isEstimate?: boolean;
  followUpResponse?: string;
}

interface BusinessOverview {
  companyName: string;
  location: { city: string; state: string; country: string };
  multipleLocations: boolean;
  numberOfLocations?: number;
  industry: string;
  industryDetails?: string;
  corporateStructure: string;
  website?: string;
  yearStarted: number;
  workforce: {
    executiveLeadership: number;
    supportAdmin: number;
    fullTimeEmployees: number;
    partTimeEmployees: number;
    contractors: number;
    seasonal: number;
  };
  salesRevenue: {
    lastYear: number;
    projectedThisYear: number;
    highestYear: number;
    highestAmount: number;
  };
  productsServices: Array<{ name: string; percentOfSales: number; type: 'product' | 'service' }>;
  currentChallenges: string[];
  competitors: Array<{ name: string; website?: string; isDirect: boolean }>;
}

// Chapter and section definitions
const CHAPTERS = [
  {
    id: 'intro',
    title: 'Business Overview',
    description: 'Baseline business context for the assessment',
    icon: '🏢'
  },
  {
    id: 'GE',
    title: 'Growth Engine',
    description: 'How your business drives revenue and engages the market',
    icon: '🚀',
    categories: ['Strategy', 'Sales', 'Marketing', 'Customer Experience']
  },
  {
    id: 'PH',
    title: 'Performance & Health',
    description: 'How your business delivers consistently and sustains results',
    icon: '📊',
    categories: ['Operations', 'Financials']
  },
  {
    id: 'PL',
    title: 'People & Leadership',
    description: 'The human side of growth, culture, and decision-making',
    icon: '👥',
    categories: ['Human Resources', 'Leadership & Governance']
  },
  {
    id: 'RS',
    title: 'Resilience & Safeguards',
    description: 'Long-term viability, adaptability, and compliance',
    icon: '🛡️',
    categories: ['Technology & Innovation', 'IT & Data', 'Risk Management', 'Compliance']
  }
];

// Industry options
const INDUSTRIES = [
  'Agriculture & Farming',
  'Arts & Entertainment',
  'Automotive',
  'Construction & Trades',
  'Consulting & Professional Services',
  'Education & Training',
  'Finance & Insurance',
  'Food & Beverage',
  'Healthcare & Medical',
  'Hospitality & Tourism',
  'Information Technology',
  'Manufacturing',
  'Marketing & Advertising',
  'Non-Profit',
  'Real Estate',
  'Retail & E-commerce',
  'Transportation & Logistics',
  'Other'
];

// Corporate structure options
const CORPORATE_STRUCTURES = [
  'Sole Proprietorship',
  'Partnership',
  'LLC (Limited Liability Company)',
  'S Corporation',
  'C Corporation',
  'Non-Profit',
  'Other'
];

// Scale descriptions for 1-5 questions
const SCALE_LABELS = {
  1: 'Poor/None',
  2: 'Limited',
  3: 'Moderate',
  4: 'Good',
  5: 'Excellent'
};

export default function EssentialsQuestionnaire() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [existingAssessmentId, setExistingAssessmentId] = useState<string | null>(null);
  
  // Business Overview state
  const [businessOverview, setBusinessOverview] = useState<BusinessOverview>({
    companyName: '',
    location: { city: '', state: '', country: 'United States' },
    multipleLocations: false,
    industry: '',
    corporateStructure: '',
    yearStarted: new Date().getFullYear(),
    workforce: {
      executiveLeadership: 0,
      supportAdmin: 0,
      fullTimeEmployees: 0,
      partTimeEmployees: 0,
      contractors: 0,
      seasonal: 0
    },
    salesRevenue: {
      lastYear: 0,
      projectedThisYear: 0,
      highestYear: new Date().getFullYear(),
      highestAmount: 0
    },
    productsServices: [],
    currentChallenges: [],
    competitors: []
  });

  // Question responses state
  const [responses, setResponses] = useState<Record<string, QuestionResponse>>({});

  // Check if user has purchased access to essentials tier
  useEffect(() => {
    const checkAccess = async () => {
      if (!user) return;

      try {
        // Check for completed payment/order (essentials plan specifically)
        const { data: orders, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'completed')
          .in('product_id', ['essentials'])
          .order('created_at', { ascending: false })
          .limit(1);

        if (error) throw error;

        if (orders && orders.length > 0) {
          setHasAccess(true);

          // Check for existing in-progress assessment
          const { data: assessments } = await (supabase
            .from('questionnaires')
            .select('*')
            .eq('user_id', user.id)
            .eq('status', 'in_progress') as any)
            .order('created_at', { ascending: false })
            .limit(1);

          if (assessments && assessments.length > 0) {
            setExistingAssessmentId(assessments[0].id);
            // Load saved responses
            if (assessments[0].responses) {
              setResponses(assessments[0].responses as unknown as Record<string, QuestionResponse>);
            }
            if (assessments[0].company_profile) {
              setBusinessOverview(assessments[0].company_profile as unknown as BusinessOverview);
            }
          }
        } else {
          setHasAccess(false);
        }
      } catch (error) {
        console.error('Error checking access:', error);
        setHasAccess(false);
      }
    };

    if (user) {
      checkAccess();
    }
  }, [user]);

  // Calculate progress
  useEffect(() => {
    const totalSteps = 6; // Intro + 4 chapters + Review
    setProgress(Math.round((currentStep / totalSteps) * 100));
  }, [currentStep]);

  // Update a response
  const updateResponse = (questionId: string, value: any, isEstimate?: boolean, followUp?: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: {
        questionId,
        value,
        isEstimate,
        followUpResponse: followUp
      }
    }));
  };

  // Scale question component
  const ScaleQuestion = ({ 
    id, 
    question, 
    descriptions 
  }: { 
    id: string; 
    question: string; 
    descriptions?: Record<number, string>;
  }) => {
    const currentValue = responses[id]?.value as number || 0;
    
    return (
      <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <p className="text-lg font-medium text-gray-900 mb-4">{question}</p>
        <div className="flex justify-between gap-2">
          {[1, 2, 3, 4, 5].map(num => (
            <button
              key={num}
              onClick={() => updateResponse(id, num)}
              className={`flex-1 py-4 px-2 rounded-lg border-2 transition-all ${
                currentValue === num
                  ? 'border-[#212653] bg-[#212653] text-white'
                  : 'border-gray-200 hover:border-[#969423] bg-white'
              }`}
            >
              <div className="text-2xl font-bold">{num}</div>
              <div className="text-xs mt-1">
                {descriptions?.[num] || SCALE_LABELS[num as keyof typeof SCALE_LABELS]}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Number input question component
  const NumberQuestion = ({ 
    id, 
    question, 
    prefix = '', 
    suffix = '',
    allowEstimate = false
  }: { 
    id: string; 
    question: string; 
    prefix?: string;
    suffix?: string;
    allowEstimate?: boolean;
  }) => {
    const response = responses[id];
    
    return (
      <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <p className="text-lg font-medium text-gray-900 mb-4">{question}</p>
        <div className="flex items-center gap-2">
          {prefix && <span className="text-gray-500 text-lg">{prefix}</span>}
          <input
            type="number"
            value={response?.value as number || ''}
            onChange={(e) => updateResponse(id, parseFloat(e.target.value) || 0, response?.isEstimate)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#212653] focus:border-transparent"
            placeholder="Enter value"
          />
          {suffix && <span className="text-gray-500 text-lg">{suffix}</span>}
        </div>
        {allowEstimate && (
          <label className="flex items-center mt-3 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={response?.isEstimate || false}
              onChange={(e) => updateResponse(id, response?.value || 0, e.target.checked)}
              className="mr-2 rounded border-gray-300"
            />
            This is an estimate
          </label>
        )}
      </div>
    );
  };

  // Render Business Overview section
  const renderBusinessOverview = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#212653]">Welcome to BizHealth.ai</h2>
        <p className="text-gray-600 mt-2">Let's start by learning about your business</p>
      </div>

      {/* Company Name */}
      <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <label className="block text-lg font-medium text-gray-900 mb-2">Company Name *</label>
        <input
          type="text"
          value={businessOverview.companyName}
          onChange={(e) => setBusinessOverview(prev => ({ ...prev, companyName: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#212653]"
          placeholder="Enter your company name"
        />
      </div>

      {/* Location */}
      <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <label className="block text-lg font-medium text-gray-900 mb-4">Location</label>
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            value={businessOverview.location.city}
            onChange={(e) => setBusinessOverview(prev => ({
              ...prev,
              location: { ...prev.location, city: e.target.value }
            }))}
            className="px-4 py-3 border border-gray-300 rounded-lg"
            placeholder="City"
          />
          <input
            type="text"
            value={businessOverview.location.state}
            onChange={(e) => setBusinessOverview(prev => ({
              ...prev,
              location: { ...prev.location, state: e.target.value }
            }))}
            className="px-4 py-3 border border-gray-300 rounded-lg"
            placeholder="State/Province"
          />
          <select
            value={businessOverview.location.country}
            onChange={(e) => setBusinessOverview(prev => ({
              ...prev,
              location: { ...prev.location, country: e.target.value }
            }))}
            className="px-4 py-3 border border-gray-300 rounded-lg"
          >
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Australia">Australia</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Industry */}
      <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <label className="block text-lg font-medium text-gray-900 mb-2">Industry / Business Sector *</label>
        <select
          value={businessOverview.industry}
          onChange={(e) => setBusinessOverview(prev => ({ ...prev, industry: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
        >
          <option value="">Select your industry</option>
          {INDUSTRIES.map(ind => (
            <option key={ind} value={ind}>{ind}</option>
          ))}
        </select>
      </div>

      {/* Corporate Structure */}
      <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <label className="block text-lg font-medium text-gray-900 mb-2">Corporate Structure</label>
        <select
          value={businessOverview.corporateStructure}
          onChange={(e) => setBusinessOverview(prev => ({ ...prev, corporateStructure: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
        >
          <option value="">Select structure</option>
          {CORPORATE_STRUCTURES.map(struct => (
            <option key={struct} value={struct}>{struct}</option>
          ))}
        </select>
      </div>

      {/* Year Started */}
      <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <label className="block text-lg font-medium text-gray-900 mb-2">Year Company Started</label>
        <input
          type="number"
          value={businessOverview.yearStarted}
          onChange={(e) => setBusinessOverview(prev => ({ ...prev, yearStarted: parseInt(e.target.value) }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          min="1900"
          max={new Date().getFullYear()}
        />
      </div>

      {/* Workforce */}
      <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <label className="block text-lg font-medium text-gray-900 mb-4">Employees & Workforce</label>
        <p className="text-sm text-gray-500 mb-4">Enter the number of personnel in each category (enter 0 if not applicable)</p>
        <div className="grid grid-cols-2 gap-4">
          {[
            { key: 'executiveLeadership', label: 'Executive & Leadership' },
            { key: 'supportAdmin', label: 'Support & Admin Staff' },
            { key: 'fullTimeEmployees', label: 'Full-Time Employees' },
            { key: 'partTimeEmployees', label: 'Part-Time Employees' },
            { key: 'contractors', label: 'Contractors (1099)' },
            { key: 'seasonal', label: 'Seasonal Employees' }
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-sm text-gray-600 mb-1">{label}</label>
              <input
                type="number"
                value={businessOverview.workforce[key as keyof typeof businessOverview.workforce]}
                onChange={(e) => setBusinessOverview(prev => ({
                  ...prev,
                  workforce: { ...prev.workforce, [key]: parseInt(e.target.value) || 0 }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                min="0"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Sales Revenue */}
      <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <label className="block text-lg font-medium text-gray-900 mb-4">Sales & Revenue</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Last Year Total Sales</label>
            <div className="flex items-center">
              <span className="text-gray-500 mr-2">$</span>
              <input
                type="number"
                value={businessOverview.salesRevenue.lastYear}
                onChange={(e) => setBusinessOverview(prev => ({
                  ...prev,
                  salesRevenue: { ...prev.salesRevenue, lastYear: parseFloat(e.target.value) || 0 }
                }))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Projected This Year</label>
            <div className="flex items-center">
              <span className="text-gray-500 mr-2">$</span>
              <input
                type="number"
                value={businessOverview.salesRevenue.projectedThisYear}
                onChange={(e) => setBusinessOverview(prev => ({
                  ...prev,
                  salesRevenue: { ...prev.salesRevenue, projectedThisYear: parseFloat(e.target.value) || 0 }
                }))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Current Challenges */}
      <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <label className="block text-lg font-medium text-gray-900 mb-4">Current Challenges or Areas of Concern</label>
        <div className="grid grid-cols-3 gap-3">
          {['Sales', 'Marketing', 'Operations', 'Financials', 'Leadership', 'Technology', 'Human Resources', 'Strategy', 'Customer Experience'].map(challenge => (
            <label key={challenge} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={businessOverview.currentChallenges.includes(challenge)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setBusinessOverview(prev => ({
                      ...prev,
                      currentChallenges: [...prev.currentChallenges, challenge]
                    }));
                  } else {
                    setBusinessOverview(prev => ({
                      ...prev,
                      currentChallenges: prev.currentChallenges.filter(c => c !== challenge)
                    }));
                  }
                }}
                className="mr-2 rounded border-gray-300"
              />
              {challenge}
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  // Render Growth Engine chapter
  const renderGrowthEngine = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-4xl mb-2">🚀</div>
        <h2 className="text-2xl font-bold text-[#212653]">Chapter 1: Growth Engine</h2>
        <p className="text-gray-600 mt-2">How your business drives revenue and engages the market</p>
      </div>

      {/* Strategy Section */}
      <div className="border-l-4 border-[#969423] pl-4 mb-6">
        <h3 className="text-xl font-semibold text-[#212653]">Strategy</h3>
        <p className="text-gray-500 text-sm">Vision, goals, and alignment</p>
      </div>

      <ScaleQuestion
        id="LQ001"
        question="How well does your company understand your competitive differentiators (what makes you different from competitors) and why customers choose you?"
        descriptions={{
          1: 'Minimal understanding',
          2: 'Limited awareness',
          3: 'Moderate understanding',
          4: 'Good clarity',
          5: 'Excellent insight'
        }}
      />

      <NumberQuestion
        id="LQ002"
        question="What percent has your sales grown in the past year?"
        suffix="%"
        allowEstimate
      />

      <ScaleQuestion
        id="LQ003"
        question="Do you have a set plan or documented business goals for the next year?"
        descriptions={{
          1: 'No plan',
          2: 'Informal goals',
          3: 'Basic documentation',
          4: 'Structured goals',
          5: 'Comprehensive plan'
        }}
      />

      <NumberQuestion
        id="LQ004"
        question="What is your target sales growth for the upcoming year?"
        suffix="%"
        allowEstimate
      />

      {/* Sales Section */}
      <div className="border-l-4 border-[#969423] pl-4 mb-6 mt-10">
        <h3 className="text-xl font-semibold text-[#212653]">Sales</h3>
        <p className="text-gray-500 text-sm">Revenue generation and customer acquisition</p>
      </div>

      <NumberQuestion
        id="LQ006"
        question="On average, how many days does it typically take to close a sale?"
        suffix="days"
      />

      <NumberQuestion
        id="LQ007"
        question="What is your average sale/order size?"
        prefix="$"
      />

      <NumberQuestion
        id="LQ008"
        question="What percentage of your monthly sales are from returning customers?"
        suffix="%"
      />

      <NumberQuestion
        id="LQ009"
        question="What percentage of your sales opportunities or leads typically result in a sale?"
        suffix="%"
        allowEstimate
      />

      <ScaleQuestion
        id="LQ010"
        question="How actively does your business focus on increasing sales to existing customers (upselling/cross-selling)?"
        descriptions={{
          1: 'Rarely',
          2: 'Minimal effort',
          3: 'Moderate focus',
          4: 'Strong focus',
          5: 'Optimal strategy'
        }}
      />

      {/* Marketing Section */}
      <div className="border-l-4 border-[#969423] pl-4 mb-6 mt-10">
        <h3 className="text-xl font-semibold text-[#212653]">Marketing</h3>
        <p className="text-gray-500 text-sm">Branding, positioning, and outreach effectiveness</p>
      </div>

      <ScaleQuestion
        id="LQ011"
        question="How many different marketing methods or channels do you actively use?"
        descriptions={{
          1: '0-1 methods',
          2: '2 methods',
          3: '3-5 methods',
          4: '6+ methods',
          5: '7+ strategic channels'
        }}
      />

      <ScaleQuestion
        id="LQ012"
        question="Do you know who your best customers are and target them with your marketing?"
        descriptions={{
          1: 'No targeting',
          2: 'Limited targeting',
          3: 'Basic knowledge',
          4: 'Good targeting',
          5: 'Excellent targeting'
        }}
      />

      <NumberQuestion
        id="LQ013"
        question="How much do you spend to acquire one new customer (Customer Acquisition Cost)?"
        prefix="$"
        allowEstimate
      />

      <NumberQuestion
        id="LQ015"
        question="What is the average lifetime value of a customer?"
        prefix="$"
        allowEstimate
      />

      {/* Customer Experience Section */}
      <div className="border-l-4 border-[#969423] pl-4 mb-6 mt-10">
        <h3 className="text-xl font-semibold text-[#212653]">Customer Experience</h3>
        <p className="text-gray-500 text-sm">Customer satisfaction, loyalty, and advocacy</p>
      </div>

      <ScaleQuestion
        id="LQ016"
        question="How satisfied are your customers with the overall quality and value of your products or services?"
        descriptions={{
          1: 'Dissatisfied',
          2: 'Subpar',
          3: 'Average',
          4: 'Satisfied',
          5: 'Excellent'
        }}
      />

      <ScaleQuestion
        id="LQ017"
        question="How likely are your customers to recommend your business to others?"
        descriptions={{
          1: 'Unlikely',
          2: 'Hesitant',
          3: 'Neutral',
          4: 'Supportive',
          5: 'Advocate'
        }}
      />

      <ScaleQuestion
        id="LQ018"
        question="How effectively does your business resolve customer issues on the first contact?"
        descriptions={{
          1: '<30% resolved',
          2: '30-50% resolved',
          3: '50-70% resolved',
          4: '70-90% resolved',
          5: '>90% resolved'
        }}
      />
    </div>
  );

  // Render Performance & Health chapter
  const renderPerformanceHealth = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-4xl mb-2">📊</div>
        <h2 className="text-2xl font-bold text-[#212653]">Chapter 2: Performance & Health</h2>
        <p className="text-gray-600 mt-2">How your business delivers consistently and sustains results</p>
      </div>

      {/* Operations Section */}
      <div className="border-l-4 border-[#969423] pl-4 mb-6">
        <h3 className="text-xl font-semibold text-[#212653]">Operations</h3>
        <p className="text-gray-500 text-sm">Efficiency, scalability, and delivery consistency</p>
      </div>

      <ScaleQuestion
        id="LQ019"
        question="How well are your workflows documented, standardized, and streamlined?"
        descriptions={{
          1: 'Minimal',
          2: 'Basic',
          3: 'Developing',
          4: 'Strong',
          5: 'Optimal'
        }}
      />

      <ScaleQuestion
        id="LQ020"
        question="How would you rate your ability to deliver high-quality services or products on time?"
        descriptions={{
          1: 'Unreliable',
          2: 'Inconsistent',
          3: 'Adequate',
          4: 'Good',
          5: 'Excellent'
        }}
      />

      <ScaleQuestion
        id="LQ021"
        question="How efficiently do you believe your business operates (minimal waste, smooth processes)?"
        descriptions={{
          1: 'Inefficient',
          2: 'Basic',
          3: 'Adequate',
          4: 'Efficient',
          5: 'Optimized'
        }}
      />

      <NumberQuestion
        id="LQ022"
        question="On average, what percentage of your resources (personnel, space, equipment) are you currently utilizing?"
        suffix="%"
      />

      {/* Financials Section */}
      <div className="border-l-4 border-[#969423] pl-4 mb-6 mt-10">
        <h3 className="text-xl font-semibold text-[#212653]">Financials</h3>
        <p className="text-gray-500 text-sm">Financial stability, profitability, and resource management</p>
      </div>

      <NumberQuestion
        id="LQ023"
        question="What is your total current cash available?"
        prefix="$"
      />

      <NumberQuestion
        id="LQ024"
        question="How many months could your business operate solely on your current cash reserves?"
        suffix="months"
      />

      <NumberQuestion
        id="LQ025"
        question="What percent of your sales remains after paying for what you sold (Gross Profit Margin)?"
        suffix="%"
      />

      <ScaleQuestion
        id="LQ026"
        question="Are your monthly expenses at a level that supports healthy growth?"
        descriptions={{
          1: 'Unsustainable',
          2: 'Elevated',
          3: 'Balanced',
          4: 'Sustainable',
          5: 'Optimized'
        }}
      />

      <NumberQuestion
        id="LQ027"
        question="What is your total monthly debt payment (loans, credit lines, financing)?"
        prefix="$"
      />

      <ScaleQuestion
        id="LQ028"
        question="How well do you track and plan your business finances?"
        descriptions={{
          1: 'Absent',
          2: 'Minimal',
          3: 'Functional',
          4: 'Strong',
          5: 'Optimized'
        }}
      />

      <ScaleQuestion
        id="LQ029"
        question="How accurately can you predict your cash coming in and out next month?"
        descriptions={{
          1: 'None',
          2: 'Limited',
          3: 'Basic',
          4: 'Strong',
          5: 'Optimal'
        }}
      />
    </div>
  );

  // Render People & Leadership chapter
  const renderPeopleLeadership = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-4xl mb-2">👥</div>
        <h2 className="text-2xl font-bold text-[#212653]">Chapter 3: People & Leadership</h2>
        <p className="text-gray-600 mt-2">The human side of growth, culture, and decision-making</p>
      </div>

      {/* Human Resources Section */}
      <div className="border-l-4 border-[#969423] pl-4 mb-6">
        <h3 className="text-xl font-semibold text-[#212653]">Human Resources</h3>
        <p className="text-gray-500 text-sm">Talent, engagement, and workforce management</p>
      </div>

      <ScaleQuestion
        id="LQ030"
        question="How clearly defined and communicated are your company's values and culture?"
        descriptions={{
          1: 'Undefined',
          2: 'Fragmented',
          3: 'Developing',
          4: 'Strong',
          5: 'Thriving'
        }}
      />

      <ScaleQuestion
        id="LQ031"
        question="How well does your company provide employee training and professional development?"
        descriptions={{
          1: 'None',
          2: 'Limited',
          3: 'Basic',
          4: 'Established',
          5: 'Comprehensive'
        }}
      />

      <ScaleQuestion
        id="LQ032"
        question="How actively does your company measure and address employee satisfaction and retention?"
        descriptions={{
          1: 'None',
          2: 'Informal',
          3: 'Limited',
          4: 'Regular',
          5: 'Proactive'
        }}
      />

      {/* Leadership & Governance Section */}
      <div className="border-l-4 border-[#969423] pl-4 mb-6 mt-10">
        <h3 className="text-xl font-semibold text-[#212653]">Leadership & Governance</h3>
        <p className="text-gray-500 text-sm">Oversight, accountability, and decision-making strength</p>
      </div>

      <ScaleQuestion
        id="LQ033"
        question="How clearly does your leadership communicate strategic goals and inspire long-term growth?"
        descriptions={{
          1: 'Unclear',
          2: 'Basic',
          3: 'Moderate',
          4: 'Strong',
          5: 'Optimal'
        }}
      />

      <ScaleQuestion
        id="LQ034"
        question="How well do your leaders build trust, empathy, and team morale while embodying company values?"
        descriptions={{
          1: 'Low',
          2: 'Inconsistent',
          3: 'Moderate',
          4: 'Strong',
          5: 'High'
        }}
      />
    </div>
  );

  // Render Resilience & Safeguards chapter
  const renderResilienceSafeguards = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-4xl mb-2">🛡️</div>
        <h2 className="text-2xl font-bold text-[#212653]">Chapter 4: Resilience & Safeguards</h2>
        <p className="text-gray-600 mt-2">Long-term viability, adaptability, and compliance</p>
      </div>

      {/* Technology & Innovation Section */}
      <div className="border-l-4 border-[#969423] pl-4 mb-6">
        <h3 className="text-xl font-semibold text-[#212653]">Technology & Innovation</h3>
        <p className="text-gray-500 text-sm">Leveraging tech for competitiveness and future growth</p>
      </div>

      <NumberQuestion
        id="LQ035"
        question="What is your company's annual spend on technology (IT infrastructure, tools, platforms)?"
        prefix="$"
        allowEstimate
      />

      <ScaleQuestion
        id="LQ036"
        question="How actively does your company pursue new methods, technologies, or approaches?"
        descriptions={{
          1: 'Inactive',
          2: 'Minimal',
          3: 'Developing',
          4: 'Proactive',
          5: 'Optimal'
        }}
      />

      <ScaleQuestion
        id="LQ037"
        question="How effectively do employees adopt and utilize business technology tools?"
        descriptions={{
          1: 'Minimal',
          2: 'Limited',
          3: 'Average',
          4: 'Good',
          5: 'Excellent'
        }}
      />

      <ScaleQuestion
        id="LQ038"
        question="How effectively does your business use automation to streamline repetitive tasks?"
        descriptions={{
          1: 'None',
          2: 'Minimal',
          3: 'Moderate',
          4: 'Strong',
          5: 'Optimal'
        }}
      />

      {/* IT & Data Section */}
      <div className="border-l-4 border-[#969423] pl-4 mb-6 mt-10">
        <h3 className="text-xl font-semibold text-[#212653]">IT, Data Management & Systems</h3>
        <p className="text-gray-500 text-sm">Infrastructure, security, and digital backbone</p>
      </div>

      <ScaleQuestion
        id="LQ039"
        question="How prepared is your business for cybersecurity threats?"
        descriptions={{
          1: 'Unprepared',
          2: 'Basic',
          3: 'Moderate',
          4: 'Strong',
          5: 'Optimal'
        }}
      />

      <ScaleQuestion
        id="LQ040"
        question="How robust are your data backup and recovery processes?"
        descriptions={{
          1: 'Weak',
          2: 'Minimal',
          3: 'Adequate',
          4: 'Strong',
          5: 'Optimal'
        }}
      />

      {/* Risk Management Section */}
      <div className="border-l-4 border-[#969423] pl-4 mb-6 mt-10">
        <h3 className="text-xl font-semibold text-[#212653]">Risk Management & Sustainability</h3>
        <p className="text-gray-500 text-sm">Resilience, risk mitigation, and long-term sustainability</p>
      </div>

      <ScaleQuestion
        id="LQ041"
        question="What percent of big risks do you have a backup plan for?"
        descriptions={{
          1: 'None',
          2: 'Minimal',
          3: 'Partial',
          4: 'Strong',
          5: 'Comprehensive'
        }}
      />

      <ScaleQuestion
        id="LQ042"
        question="How prepared is your business to handle unexpected financial setbacks?"
        descriptions={{
          1: 'Unprepared',
          2: 'Limited',
          3: 'Moderate',
          4: 'Strong',
          5: 'Optimal'
        }}
      />

      <ScaleQuestion
        id="LQ043"
        question="How prepared is your business to continue operations if faced with a major disruption?"
        descriptions={{
          1: 'Unprepared',
          2: 'Basic',
          3: 'Partial',
          4: 'Full',
          5: 'Seamless'
        }}
      />

      {/* Compliance Section */}
      <div className="border-l-4 border-[#969423] pl-4 mb-6 mt-10">
        <h3 className="text-xl font-semibold text-[#212653]">Compliance - Legal & Regulatory</h3>
        <p className="text-gray-500 text-sm">Adherence to rules, regulations, and industry standards</p>
      </div>

      <ScaleQuestion
        id="LQ044"
        question="How effectively does your business follow key compliance rules (safety standards, data privacy)?"
        descriptions={{
          1: 'Poor',
          2: 'Fair',
          3: 'Moderate',
          4: 'Good',
          5: 'Excellent'
        }}
      />

      <ScaleQuestion
        id="LQ045"
        question="How up-to-date are your business licenses, permits, and certifications?"
        descriptions={{
          1: 'Incomplete',
          2: 'Minimal',
          3: 'Partially',
          4: 'Mostly',
          5: 'Fully'
        }}
      />
    </div>
  );

  // Render Review section
  const renderReview = () => {
    const answeredCount = Object.keys(responses).length;
    const totalQuestions = 45;
    
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">✅</div>
          <h2 className="text-2xl font-bold text-[#212653]">Review & Submit</h2>
          <p className="text-gray-600 mt-2">You've completed the assessment!</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-[#212653] mb-4">Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-[#212653]">{answeredCount}</div>
              <div className="text-sm text-gray-500">Questions Answered</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl font-bold text-[#969423]">{totalQuestions - answeredCount}</div>
              <div className="text-sm text-gray-500">Skipped</div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-[#212653] text-white rounded-lg">
          <h3 className="text-lg font-semibold mb-2">What Happens Next?</h3>
          <ul className="space-y-2 text-sm">
            <li>✓ Your responses will be analyzed by our AI engine</li>
            <li>✓ 8 comprehensive reports will be generated</li>
            <li>✓ You'll receive a 30-60-90 day action plan</li>
            <li>✓ Reports will be ready in approximately 8 minutes</li>
          </ul>
        </div>

        <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> By submitting, you confirm that the information provided is accurate to the best of your knowledge. Your data is secure and will only be used to generate your business health reports.
          </p>
        </div>
      </div>
    );
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!user) {
      alert('Please log in to submit the questionnaire');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create submission record
      const submissionId = crypto.randomUUID();
      
      // Prepare questionnaire data
      const questionnaireData = {
        submissionId,
        timestamp: new Date().toISOString(),
        pipelineType: 'LIL',
        businessOverview,
        responses: Object.values(responses)
      };

      // Save to questionnaires table
      const { error: questionnaireError } = await supabase
        .from('questionnaires')
        .insert([{
          id: submissionId,
          user_id: user.id,
          status: 'completed',
          responses: JSON.parse(JSON.stringify(questionnaireData)),
          created_at: new Date().toISOString()
        }] as any);

      if (questionnaireError) throw questionnaireError;

      // Add to pipeline queue
      const { error: queueError } = await supabase
        .from('pipeline_queue')
        .insert([{
          user_id: user.id,
          questionnaire_id: submissionId,
          status: 'pending',
          payload: JSON.parse(JSON.stringify(questionnaireData)),
          created_at: new Date().toISOString()
        }] as any);

      if (queueError) throw queueError;

      // Navigate to processing page
      navigate('/processing', { 
        state: { 
          submissionId,
          pipelineType: 'LIL',
          companyName: businessOverview.companyName
        }
      });

    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your questionnaire. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case 0: return renderBusinessOverview();
      case 1: return renderGrowthEngine();
      case 2: return renderPerformanceHealth();
      case 3: return renderPeopleLeadership();
      case 4: return renderResilienceSafeguards();
      case 5: return renderReview();
      default: return null;
    }
  };

  // Loading state
  if (authLoading || hasAccess === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#212653] mx-auto mb-4" />
          <p className="text-gray-600">Loading assessment...</p>
        </div>
      </div>
    );
  }

  // No access - redirect to checkout
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <img src="/bizhealth-logo.png" alt="BizHealth" className="h-8" />
          </div>
        </header>

        <main className="flex-1 container mx-auto px-4 py-12 max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-[#212653] mb-2">
              Assessment Access Required
            </h1>
            <p className="text-gray-600 mb-6">
              You need to purchase the Essentials assessment to continue.
            </p>
            <p className="text-gray-500 mb-8">
              Get your comprehensive business health assessment with personalized insights
              and actionable recommendations.
            </p>
            <button
              onClick={() => navigate('/pricing')}
              className="px-6 py-3 bg-[#969423] text-white rounded-lg font-medium hover:bg-[#7a7a1d] transition-colors"
            >
              View Pricing & Purchase
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-[#969423] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/bizhealth-logo.png" alt="BizHealth" className="h-8" />
            <span className="text-sm text-gray-500">Essentials Assessment</span>
          </div>
          <div className="text-sm text-gray-500">
            {progress}% Complete
          </div>
        </div>
      </header>

      {/* Chapter Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex justify-between">
            {CHAPTERS.map((chapter, index) => (
              <button
                key={chapter.id}
                onClick={() => setCurrentStep(index)}
                className={`flex flex-col items-center px-4 py-2 rounded-lg transition-all ${
                  currentStep === index
                    ? 'bg-[#212653] text-white'
                    : currentStep > index
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-400'
                }`}
              >
                <span className="text-xl">{chapter.icon}</span>
                <span className="text-xs mt-1 hidden sm:block">{chapter.title}</span>
              </button>
            ))}
            <button
              onClick={() => setCurrentStep(5)}
              className={`flex flex-col items-center px-4 py-2 rounded-lg transition-all ${
                currentStep === 5
                  ? 'bg-[#212653] text-white'
                  : 'text-gray-400'
              }`}
            >
              <span className="text-xl">✅</span>
              <span className="text-xs mt-1 hidden sm:block">Review</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {renderStep()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          <button
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          
          {currentStep < 5 ? (
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="px-6 py-3 bg-[#212653] text-white rounded-lg hover:bg-[#2d3570]"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !businessOverview.companyName}
              className="px-8 py-3 bg-[#969423] text-white rounded-lg hover:bg-[#7a7a1d] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit Assessment'
              )}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
