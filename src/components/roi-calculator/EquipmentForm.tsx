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
            <p className="mb-2">Think about what this equipment will do for you:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Labor costs you won't pay anymore (hours × hourly rate)</li>
              <li>Time saved that you can use to make more money</li>
              <li>Materials you won't waste</li>
              <li>New products you can make and sell</li>
            </ul>
            <p className="mt-2 text-biz-citrine">Example: If a machine saves 10 hours per week and you charge $50/hour for that work, that's $26,000 per year in savings.</p>
            <p className="mt-2 italic">Not Sure? Start with your best guess. You can adjust it.</p>
          </InfoBubble>
        </div>
        <CurrencyInput
          id="annualSavings"
          label="Annual Savings"
          value={inputs.annualSavings}
          onChange={(value) => onChange({ ...inputs, annualSavings: value })}
          placeholder="15,000"
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
