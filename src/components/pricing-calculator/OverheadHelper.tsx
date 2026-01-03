import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Calculator } from 'lucide-react';
import { cn } from '@/lib/utils';
import { calculateOverheadPerSale, OverheadHelperInputs } from '@/lib/pricingCalculations';
import { Button } from '@/components/ui/button';

interface OverheadHelperProps {
  onUseValue: (value: number) => void;
}

const OverheadHelper: React.FC<OverheadHelperProps> = ({ onUseValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputs, setInputs] = useState<OverheadHelperInputs>({
    monthlyRent: 0,
    monthlyUtilities: 0,
    monthlyInsurance: 0,
    monthlySoftware: 0,
    monthlyVehicle: 0,
    monthlyOther: 0,
    overheadSalesVolume: 0,
  });

  const totalMonthlyOverhead = useMemo(() => {
    return inputs.monthlyRent +
      inputs.monthlyUtilities +
      inputs.monthlyInsurance +
      inputs.monthlySoftware +
      inputs.monthlyVehicle +
      inputs.monthlyOther;
  }, [inputs]);

  const overheadPerSale = useMemo(() => {
    return calculateOverheadPerSale(inputs);
  }, [inputs]);

  const handleInputChange = (field: keyof OverheadHelperInputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value.replace(/[^0-9.]/g, '')) || 0;
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleUseValue = () => {
    onUseValue(overheadPerSale);
    setIsOpen(false);
  };

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-biz-navy font-medium text-sm hover:text-biz-navy/80 transition-colors"
      >
        <Calculator className="w-4 h-4" />
        <span>🧮 Help me figure out my overhead per sale</span>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {isOpen && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100 animate-fade-in">
          <p className="text-sm text-gray-600 mb-4">
            Add up your monthly fixed costs, then divide by how many sales you make per month.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <HelperInput
              label="Monthly rent/mortgage"
              value={inputs.monthlyRent}
              onChange={handleInputChange('monthlyRent')}
            />
            <HelperInput
              label="Utilities"
              value={inputs.monthlyUtilities}
              onChange={handleInputChange('monthlyUtilities')}
            />
            <HelperInput
              label="Insurance"
              value={inputs.monthlyInsurance}
              onChange={handleInputChange('monthlyInsurance')}
            />
            <HelperInput
              label="Software/subscriptions"
              value={inputs.monthlySoftware}
              onChange={handleInputChange('monthlySoftware')}
            />
            <HelperInput
              label="Vehicle payment"
              value={inputs.monthlyVehicle}
              onChange={handleInputChange('monthlyVehicle')}
            />
            <HelperInput
              label="Other monthly costs"
              value={inputs.monthlyOther}
              onChange={handleInputChange('monthlyOther')}
            />
          </div>

          <div className="pt-4 border-t border-blue-200 space-y-3">
            <p className="font-medium text-biz-navy">
              Total Monthly Overhead: <span className="text-lg">${totalMonthlyOverhead.toLocaleString()}</span>
            </p>
            
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-600 whitespace-nowrap">Sales per month:</label>
              <input
                type="text"
                inputMode="numeric"
                value={inputs.overheadSalesVolume || ''}
                onChange={handleInputChange('overheadSalesVolume')}
                placeholder="e.g., 50"
                className="flex-1 h-10 px-3 rounded border border-blue-200 bg-white text-biz-navy focus:border-biz-navy focus:ring-1 focus:ring-biz-navy/20 focus:outline-none"
              />
            </div>

            {inputs.overheadSalesVolume > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <p className="font-medium text-green-700 text-lg">
                  Your Overhead Per Sale: ${overheadPerSale.toFixed(2)}
                </p>
                <Button
                  type="button"
                  onClick={handleUseValue}
                  variant="default"
                  size="sm"
                  className="bg-biz-navy hover:bg-biz-navy/90"
                >
                  Use this number ↑
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

interface HelperInputProps {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const HelperInput: React.FC<HelperInputProps> = ({ label, value, onChange }) => (
  <div className="relative">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
    <input
      type="text"
      inputMode="decimal"
      value={value || ''}
      onChange={onChange}
      placeholder={label}
      className="w-full h-10 pl-7 pr-3 rounded border border-blue-200 bg-white text-biz-navy text-sm placeholder:text-gray-400 focus:border-biz-navy focus:ring-1 focus:ring-biz-navy/20 focus:outline-none"
    />
  </div>
);

export default OverheadHelper;
