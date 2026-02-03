import React from 'react';
import CurrencyInput from './CurrencyInput';
import NumberInput from './NumberInput';
import InfoBubble from './InfoBubble';
import type { EquipmentInputs } from '@/lib/roiCalculations';

interface EquipmentFormProps {
  inputs: EquipmentInputs;
  onChange: (inputs: EquipmentInputs) => void;
}

const EquipmentForm: React.FC<EquipmentFormProps> = ({ inputs, onChange }) => {
  return (
    <div className="space-y-6">
      {/* Equipment Cost */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <label htmlFor="equipmentCost" className="font-montserrat font-semibold text-biz-navy">
            Equipment Cost
          </label>
          <InfoBubble title="What to Include in Equipment Cost">
            <p className="mb-2">Purchase price + shipping + installation + training</p>
            <p className="font-semibold mb-1">Don't Forget:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Sales tax (varies by state)</li>
              <li>Extended warranty (if buying)</li>
              <li>Special setup (electrical work, construction, software licenses)</li>
              <li>Financing total (if paying over time, what's the TOTAL you'll pay?)</li>
            </ul>
            <p className="mt-2 text-biz-citrine">Example: A $10,000 machine might actually cost $11,500 after tax, shipping, and professional installation.</p>
          </InfoBubble>
        </div>
        <CurrencyInput
          id="equipmentCost"
          label="Equipment Cost"
          value={inputs.equipmentCost}
          onChange={(value) => onChange({ ...inputs, equipmentCost: value })}
          placeholder="10,000"
        />
      </div>

      {/* Annual Savings */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <label htmlFor="annualSavings" className="font-montserrat font-semibold text-biz-navy">
            How much will this save you each year?
          </label>
          <InfoBubble title="What Counts as 'Savings'?">
            <p className="mb-2">Think about costs this equipment will reduce:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Labor costs you won't pay anymore (hours × hourly rate)</li>
              <li>Materials you won't waste</li>
              <li>Outsourcing fees you'll eliminate</li>
              <li>Maintenance/repair costs of old equipment</li>
            </ul>
            <p className="mt-2 text-biz-citrine">Example: If a machine saves 10 hours per week at $25/hour labor, that's $13,000 per year in savings.</p>
            <p className="mt-2 italic">Not Sure? Start with $0 and focus on the revenue field instead.</p>
          </InfoBubble>
        </div>
        <CurrencyInput
          id="annualSavings"
          label="Annual Savings"
          value={inputs.annualSavings}
          onChange={(value) => onChange({ ...inputs, annualSavings: value })}
          placeholder="10,000"
        />
      </div>

      {/* Annual Revenue */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <label htmlFor="annualRevenue" className="font-montserrat font-semibold text-biz-navy">
            How much NEW revenue will this generate each year?
          </label>
          <InfoBubble title="What Counts as 'New Revenue'?">
            <p className="mb-2">Think about money this equipment will bring in:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>New services you can offer</li>
              <li>More products you can produce and sell</li>
              <li>Jobs you'll win because you now have this capability</li>
              <li>Higher prices you can charge (faster delivery, better quality)</li>
            </ul>
            <p className="mt-2 text-biz-citrine">Example: A new pizza oven lets you bake 20 more pizzas/day × $15 profit × 300 days = $90,000/year in new revenue.</p>
            <p className="mt-2 italic">Not Sure? Start with $0 and focus on savings instead.</p>
          </InfoBubble>
        </div>
        <CurrencyInput
          id="annualRevenue"
          label="Annual Revenue"
          value={inputs.annualRevenue}
          onChange={(value) => onChange({ ...inputs, annualRevenue: value })}
          placeholder="20,000"
        />
      </div>

      {/* Useful Years */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <label htmlFor="usefulYears" className="font-montserrat font-semibold text-biz-navy">
            How many years will you use this?
          </label>
          <InfoBubble title="How Long Will This Last?">
            <p className="mb-2">Think realistically:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Computers/software: 3-5 years</li>
              <li>Light equipment: 5-7 years</li>
              <li>Heavy machinery: 10-15 years</li>
              <li>Vehicles: 5-10 years</li>
            </ul>
            <p className="mt-2 italic">Don't worry about getting it perfect. Even a rough estimate helps you make a better decision.</p>
          </InfoBubble>
        </div>
        <NumberInput
          id="usefulYears"
          label="Useful Years"
          value={inputs.usefulYears}
          onChange={(value) => onChange({ ...inputs, usefulYears: value })}
          placeholder="5"
          suffix="years"
          min={1}
          max={30}
        />
      </div>
    </div>
  );
};

export default EquipmentForm;
