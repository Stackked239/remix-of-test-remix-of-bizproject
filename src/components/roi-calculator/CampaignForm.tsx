import React from 'react';
import CurrencyInput from './CurrencyInput';
import NumberInput from './NumberInput';
import InfoBubble from './InfoBubble';
import type { CampaignInputs } from '@/lib/roiCalculations';

interface CampaignFormProps {
  inputs: CampaignInputs;
  onChange: (inputs: CampaignInputs) => void;
}

const CampaignForm: React.FC<CampaignFormProps> = ({ inputs, onChange }) => {
  return (
    <div className="space-y-6">
      {/* Campaign Cost */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <label htmlFor="campaignCost" className="font-montserrat font-semibold text-biz-navy">
            What will this campaign cost?
          </label>
          <InfoBubble title="Total Campaign Cost">
            <p className="mb-2">Include everything:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Ad spend (Facebook, Google, print, etc.)</li>
              <li>Design/creative costs</li>
              <li>Copywriting</li>
              <li>Agency fees</li>
              <li>Landing page or website work</li>
              <li>Your time (hours × your rate)</li>
            </ul>
            <p className="mt-2 text-biz-citrine">Example: $2,000 ad spend + $1,000 design + $500 landing page + 10 hours of your time ($100/hr = $1,000) = $4,500</p>
            <p className="mt-2 italic">First time running ads? Start small ($500-2,000) and test.</p>
          </InfoBubble>
        </div>
        <CurrencyInput
          id="campaignCost"
          label="Campaign Cost"
          value={inputs.campaignCost}
          onChange={(value) => onChange({ ...inputs, campaignCost: value })}
          placeholder="5,000"
        />
      </div>

      {/* Expected Revenue */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <label htmlFor="expectedRevenue" className="font-montserrat font-semibold text-biz-navy">
            How much in sales do you expect?
          </label>
          <InfoBubble title="Expected Revenue from This Campaign">
            <p className="mb-2">Be realistic:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>How many leads do you expect? (Clicks × conversion rate)</li>
              <li>What's your average sale amount?</li>
              <li>How many of those leads will actually buy?</li>
            </ul>
            <p className="mt-2 font-semibold">Example:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>1,000 clicks × 5% conversion = 50 leads</li>
              <li>50 leads × 20% close rate = 10 customers</li>
              <li>10 customers × $2,000 average sale = $20,000</li>
            </ul>
            <p className="mt-2 italic">Never run a campaign before? Ask others in your industry what they see. Or start with: Revenue = Campaign Cost × 3 (conservative).</p>
          </InfoBubble>
        </div>
        <CurrencyInput
          id="expectedRevenue"
          label="Expected Revenue"
          value={inputs.expectedRevenue}
          onChange={(value) => onChange({ ...inputs, expectedRevenue: value })}
          placeholder="20,000"
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
          placeholder="35"
          suffix="%"
          min={1}
          max={100}
        />
      </div>

      {/* Repeat Revenue */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <label htmlFor="repeatRevenue" className="font-montserrat font-semibold text-biz-navy">
            Will customers buy again next year?
          </label>
          <InfoBubble title="Repeat Revenue (Customer Lifetime Value)">
            <p className="mb-2">The best part of marketing: customers often buy more than once.</p>
            <p className="mb-1 font-semibold">Think about:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Will they reorder/renew?</li>
              <li>How much will each customer spend in Year 2?</li>
            </ul>
            <p className="mt-2 text-biz-citrine">Example: You acquire 10 customers. 7 buy again next year at $1,500 each = $10,500</p>
            <p className="mt-2 italic">One-time purchase business (home remodeling, car sales)? Enter $0.</p>
            <p className="mt-1 italic">Subscription or repeat business (services, software)? This number matters a lot.</p>
          </InfoBubble>
        </div>
        <CurrencyInput
          id="repeatRevenue"
          label="Repeat Revenue"
          value={inputs.repeatRevenue}
          onChange={(value) => onChange({ ...inputs, repeatRevenue: value })}
          placeholder="15,000"
        />
      </div>
    </div>
  );
};

export default CampaignForm;
