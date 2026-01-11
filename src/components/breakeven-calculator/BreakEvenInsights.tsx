import React from 'react';
import { Lightbulb, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { BreakEvenInputs, BreakEvenResult, generateInsights } from '@/lib/breakEvenCalculations';
import { cn } from '@/lib/utils';

interface BreakEvenInsightsProps {
  inputs: BreakEvenInputs;
  result: BreakEvenResult;
}

const BreakEvenInsights: React.FC<BreakEvenInsightsProps> = ({ inputs, result }) => {
  const insights = generateInsights(inputs, result);

  if (!result.isValid || insights.length === 0) {
    return null;
  }

  const getInsightStyles = (type: 'positive' | 'warning' | 'info') => {
    switch (type) {
      case 'positive':
        return {
          borderColor: 'border-l-biz-green',
          icon: <CheckCircle className="w-5 h-5 text-biz-green flex-shrink-0" />,
          bgColor: 'bg-biz-green/5',
        };
      case 'warning':
        return {
          borderColor: 'border-l-amber-500',
          icon: <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />,
          bgColor: 'bg-amber-500/5',
        };
      case 'info':
        return {
          borderColor: 'border-l-biz-teal',
          icon: <Info className="w-5 h-5 text-biz-teal flex-shrink-0" />,
          bgColor: 'bg-biz-teal/5',
        };
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-card border border-border p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-biz-citrine/20">
          <Lightbulb className="w-6 h-6 text-biz-citrine" />
        </div>
        <h2 className="font-montserrat font-bold text-biz-navy text-xl">
          Key Insights & Next Steps
        </h2>
      </div>

      <div className="space-y-4">
        {insights.map((insight, index) => {
          const styles = getInsightStyles(insight.type);
          return (
            <div
              key={index}
              className={cn(
                "rounded-lg p-4 border-l-4 flex gap-3",
                styles.borderColor,
                styles.bgColor
              )}
            >
              {styles.icon}
              <div>
                <h4 className="font-semibold text-foreground text-sm mb-1">
                  {insight.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {insight.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BreakEvenInsights;
