import React from 'react';
import { DollarSign, Package, Tag, Building2, HelpCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { BreakEvenInputs } from '@/lib/breakEvenCalculations';

interface BreakEvenInputFormProps {
  inputs: BreakEvenInputs;
  onChange: (inputs: BreakEvenInputs) => void;
}

const BreakEvenInputForm: React.FC<BreakEvenInputFormProps> = ({ inputs, onChange }) => {
  const handleChange = (field: keyof BreakEvenInputs, value: string | number) => {
    onChange({
      ...inputs,
      [field]: typeof value === 'string' && field !== 'businessName' ? parseFloat(value) || 0 : value,
    });
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Monthly Fixed Costs */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="monthlyFixedCosts" className="font-semibold text-foreground flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-biz-teal" />
              Monthly Fixed Costs
              <span className="text-xs text-muted-foreground font-normal">(Required)</span>
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>Expenses that stay the same every month: rent, salaries, insurance, software subscriptions, utilities, etc.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="monthlyFixedCosts"
              type="number"
              placeholder="e.g., 5000"
              min={0}
              step={0.01}
              value={inputs.monthlyFixedCosts || ''}
              onChange={(e) => handleChange('monthlyFixedCosts', e.target.value)}
              className="pl-7 h-12 text-base"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Rent, salaries, insurance, software subscriptions (same every month)
          </p>
        </div>

        {/* Variable Cost Per Unit */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="variableCostPerUnit" className="font-semibold text-foreground flex items-center gap-2">
              <Package className="w-4 h-4 text-biz-copper" />
              Variable Cost Per Unit/Sale
              <span className="text-xs text-muted-foreground font-normal">(Required)</span>
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>Costs that change based on sales volume: materials, packaging, shipping, payment fees, hourly labor, etc.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="variableCostPerUnit"
              type="number"
              placeholder="e.g., 25"
              min={0}
              step={0.01}
              value={inputs.variableCostPerUnit || ''}
              onChange={(e) => handleChange('variableCostPerUnit', e.target.value)}
              className="pl-7 h-12 text-base"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Materials, labor, commissions (cost per item sold)
          </p>
        </div>

        {/* Price Per Unit */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="pricePerUnit" className="font-semibold text-foreground flex items-center gap-2">
              <Tag className="w-4 h-4 text-biz-green" />
              Price Per Unit/Sale
              <span className="text-xs text-muted-foreground font-normal">(Required)</span>
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>What you charge customers per product or service. This should be your average selling price.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="pricePerUnit"
              type="number"
              placeholder="e.g., 50"
              min={0}
              step={0.01}
              value={inputs.pricePerUnit || ''}
              onChange={(e) => handleChange('pricePerUnit', e.target.value)}
              className="pl-7 h-12 text-base"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            What you charge customers per product or service
          </p>
        </div>

        {/* Business Name (Optional) */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="businessName" className="font-semibold text-foreground flex items-center gap-2">
              <Building2 className="w-4 h-4 text-biz-navy" />
              Business Name
              <span className="text-xs text-muted-foreground font-normal">(Optional)</span>
            </Label>
          </div>
          <Input
            id="businessName"
            type="text"
            placeholder="e.g., Smith's Consulting"
            value={inputs.businessName}
            onChange={(e) => handleChange('businessName', e.target.value)}
            className="h-12 text-base"
          />
          <p className="text-xs text-muted-foreground">
            For your personalized PDF report
          </p>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default BreakEvenInputForm;
