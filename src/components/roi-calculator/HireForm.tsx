import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import CurrencyInput from './CurrencyInput';
import NumberInput from './NumberInput';
import InfoBubble from './InfoBubble';
import { cn } from '@/lib/utils';
import type { HireInputs } from '@/lib/roiCalculations';

interface HireFormProps {
  inputs: HireInputs;
  onChange: (inputs: HireInputs) => void;
}

const HireForm: React.FC<HireFormProps> = ({ inputs, onChange }) => {
  const [isAdvanced, setIsAdvanced] = useState(false);

  return (
    <div className="space-y-6">
      {/* Annual Salary */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <label htmlFor="annualSalary" className="font-montserrat font-semibold text-biz-navy">
            What will you pay them per year?
          </label>
          <InfoBubble title="Annual Salary">
            <p className="mb-2">What to enter:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>The base salary you'll pay</li>
              <li>Don't add taxes or benefits yet - we'll calculate those</li>
            </ul>
            <p className="mt-2 text-biz-citrine">Example: If you're hiring someone for $25/hour and they'll work 40 hours/week, that's about $52,000 per year.</p>
            <p className="mt-2 italic">Not sure what to pay? Check salary.com or glassdoor.com for your area.</p>
          </InfoBubble>
        </div>
        <CurrencyInput
          id="annualSalary"
          label="Annual Salary"
          value={inputs.annualSalary}
          onChange={(value) => onChange({ ...inputs, annualSalary: value })}
          placeholder="50,000"
        />
      </div>

      {/* Expected Revenue */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <label htmlFor="expectedRevenue" className="font-montserrat font-semibold text-biz-navy">
            How much revenue will they bring in?
          </label>
          <InfoBubble title="Revenue This Person Will Generate">
            <p className="mb-2">Think about:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Sales they'll close</li>
              <li>Products they'll make that you can sell</li>
              <li>Billable hours (if you charge clients for their time)</li>
              <li>Projects they'll complete</li>
            </ul>
            <p className="mt-2 text-biz-citrine">Example: A salesperson might close $150K in deals. A technician might complete $100K in billable work.</p>
            <p className="mt-2 italic">Not Sure? Be conservative. It's better to underestimate and be pleasantly surprised.</p>
          </InfoBubble>
        </div>
        <CurrencyInput
          id="expectedRevenue"
          label="Expected Revenue"
          value={inputs.expectedRevenue}
          onChange={(value) => onChange({ ...inputs, expectedRevenue: value })}
          placeholder="150,000"
        />
      </div>

      {/* Profit Margin */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <label htmlFor="profitMargin" className="font-montserrat font-semibold text-biz-navy">
            What's your profit margin?
          </label>
          <InfoBubble title="Profit Margin (%)">
            <p className="mb-2">This is how much you keep after costs.</p>
            <p className="mb-1 font-semibold">If you're not sure, here are typical ranges:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Retail: 5-10%</li>
              <li>Restaurants: 3-6%</li>
              <li>Consulting/Services: 20-40%</li>
              <li>SaaS/Software: 40-80%</li>
              <li>Construction: 10-20%</li>
            </ul>
            <p className="mt-2 text-biz-citrine">Example: If you sell $100 worth of stuff and keep $30 after costs, your margin is 30%.</p>
            <p className="mt-2 italic">Still not sure? Enter 25% as a starting point.</p>
          </InfoBubble>
        </div>
        <NumberInput
          id="profitMargin"
          label="Profit Margin"
          value={inputs.profitMargin}
          onChange={(value) => onChange({ ...inputs, profitMargin: value })}
          placeholder="30"
          suffix="%"
          min={1}
          max={100}
        />
      </div>

      {/* Onboarding Cost */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <label htmlFor="onboardingCost" className="font-montserrat font-semibold text-biz-navy">
            What will it cost to get them started?
          </label>
          <InfoBubble title="Onboarding Costs">
            <p className="mb-2">Include:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Recruiting/job posting fees</li>
              <li>Background checks</li>
              <li>Training time (your time × your hourly rate)</li>
              <li>Equipment (computer, phone, tools)</li>
              <li>Software licenses</li>
              <li>Uniforms or work gear</li>
            </ul>
            <p className="mt-2 text-biz-citrine">Example: Job posting ($200) + computer ($1,200) + 40 hours of your training time ($2,000) + software ($600) = $4,000</p>
            <p className="mt-2 italic">First hire ever? Budget $3,000-$5,000.</p>
          </InfoBubble>
        </div>
        <CurrencyInput
          id="onboardingCost"
          label="Onboarding Cost"
          value={inputs.onboardingCost}
          onChange={(value) => onChange({ ...inputs, onboardingCost: value })}
          placeholder="5,000"
        />
      </div>

      {/* Advanced Mode Toggle */}
      <button
        type="button"
        onClick={() => setIsAdvanced(!isAdvanced)}
        className="flex items-center gap-2 text-biz-navy hover:text-biz-navy-deep font-open-sans text-sm transition-colors"
      >
        <Settings className="w-4 h-4" />
        {isAdvanced ? 'Switch to Simple Mode' : 'Switch to Advanced Mode'}
      </button>

      {/* Advanced Fields */}
      {isAdvanced && (
        <div className={cn("space-y-6 pt-4 border-t border-border animate-fade-in-up")}>
          {/* Payroll Taxes & Benefits */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label htmlFor="payrollBenefits" className="font-montserrat font-semibold text-biz-navy">
                Payroll taxes and benefits (%)
              </label>
              <InfoBubble title="Payroll Taxes & Benefits">
                <p className="mb-2">Typical costs on top of salary:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Employer payroll taxes: 7.65% (FICA minimum)</li>
                  <li>Workers comp insurance: 1-5%</li>
                  <li>Health insurance: $400-800/month per person</li>
                  <li>401k match: 3-6%</li>
                  <li>Paid time off: ~8%</li>
                </ul>
                <p className="mt-2 font-semibold">Total: Usually 25-35% of salary</p>
                <p className="mt-2 text-biz-citrine">Example: $50K salary × 25% = $12,500 additional cost = $62,500 total compensation</p>
                <p className="mt-2 italic">Not offering benefits? Enter 10% for taxes only.</p>
              </InfoBubble>
            </div>
            <NumberInput
              id="payrollBenefits"
              label="Payroll Benefits"
              value={inputs.payrollBenefits}
              onChange={(value) => onChange({ ...inputs, payrollBenefits: value })}
              placeholder="25"
              suffix="%"
              min={0}
              max={100}
            />
          </div>

          {/* Ramp-Up Time */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label htmlFor="rampUpMonths" className="font-montserrat font-semibold text-biz-navy">
                How many months until full productivity?
              </label>
              <InfoBubble title="Ramp-Up Time">
                <p className="mb-2">Most new hires take time to get up to speed:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Simple roles: 1-2 months</li>
                  <li>Technical roles: 3-6 months</li>
                  <li>Senior/complex roles: 6-12 months</li>
                </ul>
                <p className="mt-2">During this time, they'll produce less than expected.</p>
                <p className="mt-2 text-biz-citrine">Example: 3-month ramp means they'll be about 50% productive in Year 1.</p>
                <p className="mt-2 italic">First time hiring? Use 3 months.</p>
              </InfoBubble>
            </div>
            <NumberInput
              id="rampUpMonths"
              label="Ramp-Up Months"
              value={inputs.rampUpMonths}
              onChange={(value) => onChange({ ...inputs, rampUpMonths: value })}
              placeholder="3"
              suffix="months"
              min={0}
              max={12}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HireForm;
