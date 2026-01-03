import React from 'react';
import { cn } from '@/lib/utils';
import { PricingResults as PricingResultsType } from '@/lib/pricingCalculations';
import { CheckCircle } from 'lucide-react';

interface PricingResultsProps {
  results: PricingResultsType | null;
  monthlyUnits: number;
}

const PricingResults: React.FC<PricingResultsProps> = ({ results, monthlyUnits }) => {
  if (!results) {
    return (
      <div className="text-center py-12 text-gray-400">
        <div className="text-6xl mb-4">🧮</div>
        <p className="text-lg font-open-sans">Enter your numbers on the left</p>
        <p className="text-sm">Results will appear here automatically</p>
      </div>
    );
  }

  const { 
    netProfitPerUnit, 
    netMargin, 
    monthlyNetProfit, 
    breakEvenUnits, 
    marginHealth,
    interpretation,
    actions 
  } = results;

  const profitColorClasses = {
    healthy: 'bg-green-100 text-green-800 border-green-200',
    caution: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    danger: 'bg-red-100 text-red-800 border-red-200',
  };

  const marginColorClasses = {
    healthy: 'bg-green-500',
    caution: 'bg-yellow-500',
    danger: 'bg-red-500',
  };

  const clampedMargin = Math.min(Math.max(netMargin, 0), 100);

  return (
    <div className="space-y-6" role="status" aria-live="polite">
      {/* Primary Result: Profit Per Sale */}
      <div className={cn(
        "p-6 rounded-xl border-2",
        profitColorClasses[marginHealth]
      )}>
        <p className="text-sm opacity-80 mb-1 font-open-sans">Your Profit Per Sale</p>
        <p className="text-4xl md:text-5xl font-bold font-montserrat">
          {netProfitPerUnit >= 0 ? '' : '-'}${Math.abs(netProfitPerUnit).toFixed(2)}
        </p>
        <p className="text-sm opacity-70 mt-1 font-open-sans">
          What you actually keep after all costs
        </p>
      </div>

      {/* Profit Margin Visual */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600 font-open-sans">Your Profit Margin</span>
          <span className="font-bold text-lg font-montserrat">{netMargin.toFixed(1)}%</span>
        </div>
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={cn(
              "h-full rounded-full transition-all duration-500",
              marginColorClasses[marginHealth]
            )}
            style={{ width: `${clampedMargin}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0%</span>
          <span className="text-yellow-600">15% (healthy)</span>
          <span>50%+</span>
        </div>
      </div>

      {/* Monthly Profit */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 font-open-sans">Monthly Profit</p>
            <p className="text-xs text-gray-400">At {monthlyUnits} sales/month</p>
          </div>
          <p className={cn(
            "text-2xl font-bold font-montserrat",
            monthlyNetProfit >= 0 ? 'text-green-600' : 'text-red-600'
          )}>
            {monthlyNetProfit >= 0 ? '' : '-'}${Math.abs(monthlyNetProfit).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Break-Even Point */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 font-open-sans">Break-Even Point</p>
            <p className="text-xs text-gray-400">Sales needed to cover overhead</p>
          </div>
          <p className="text-xl font-bold text-biz-navy font-montserrat">
            {breakEvenUnits === null || breakEvenUnits === 0 
              ? 'N/A' 
              : `${breakEvenUnits} sales`}
          </p>
        </div>
      </div>

      {/* Interpretation */}
      <div className="bg-biz-navy/5 p-4 rounded-lg border border-biz-navy/20">
        <h3 className="font-semibold text-biz-navy mb-2 flex items-center font-montserrat">
          <span className="mr-2">💡</span> What This Means
        </h3>
        <p className="text-gray-700 text-sm leading-relaxed font-open-sans">
          {interpretation}
        </p>
      </div>

      {/* Suggested Actions */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="font-semibold text-gray-700 mb-3 flex items-center font-montserrat">
          <span className="mr-2">🎯</span> Suggested Next Steps
        </h3>
        <ul className="space-y-2">
          {actions.map((action, i) => (
            <li key={i} className="flex items-start text-sm">
              <CheckCircle className="w-4 h-4 text-biz-citrine mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-600 font-open-sans">{action}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PricingResults;
