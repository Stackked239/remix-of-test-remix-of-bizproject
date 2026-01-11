import React from 'react';
import { 
  Lightbulb, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  AlertOctagon, 
  Wallet,
  Calendar,
  Timer,
  MinusCircle,
  ArrowRight
} from 'lucide-react';
import { CashFlowResult, generateInsights, Insight } from '@/lib/cashFlowCalculations';
import { Link } from 'react-router-dom';

interface CashFlowInsightsProps {
  result: CashFlowResult;
}

const CashFlowInsights: React.FC<CashFlowInsightsProps> = ({ result }) => {
  if (!result.isValid || result.projection.length === 0) {
    return null;
  }

  const insights = generateInsights(result.summary);

  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      TrendingUp: <TrendingUp className="w-5 h-5" />,
      TrendingDown: <TrendingDown className="w-5 h-5" />,
      AlertTriangle: <AlertTriangle className="w-5 h-5" />,
      AlertOctagon: <AlertOctagon className="w-5 h-5" />,
      Wallet: <Wallet className="w-5 h-5" />,
      Calendar: <Calendar className="w-5 h-5" />,
      Timer: <Timer className="w-5 h-5" />,
      MinusCircle: <MinusCircle className="w-5 h-5" />
    };
    return icons[iconName] || <Lightbulb className="w-5 h-5" />;
  };

  const getBorderColor = (type: Insight['type']) => {
    switch (type) {
      case 'positive': return 'border-l-green-500 bg-green-50/50';
      case 'warning': return 'border-l-amber-500 bg-amber-50/50';
      case 'danger': return 'border-l-red-500 bg-red-50/50';
      default: return 'border-l-biz-navy bg-biz-navy/5';
    }
  };

  const getIconColor = (type: Insight['type']) => {
    switch (type) {
      case 'positive': return 'text-green-600';
      case 'warning': return 'text-amber-600';
      case 'danger': return 'text-red-600';
      default: return 'text-biz-navy';
    }
  };

  const nextSteps = [
    { title: 'Compare to Actuals', desc: 'Review this projection against your actual numbers each month' },
    { title: 'Update Quarterly', desc: 'Revisit and adjust your projection every 3 months' },
    { title: 'Negotiate Vendor Terms', desc: 'Contact vendors about extended payment terms' },
    { title: 'Consider a Line of Credit', desc: "It's easier to get when you don't urgently need it" }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-border/50 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-biz-citrine/20">
          <Lightbulb className="w-5 h-5 text-biz-citrine" />
        </div>
        <h3 className="text-lg font-bold text-foreground font-montserrat">Cash Flow Insights & Recommendations</h3>
      </div>

      {/* Dynamic Insights */}
      <div className="space-y-4 mb-8">
        {insights.map((insight, index) => (
          <div 
            key={index}
            className={`border-l-4 rounded-lg p-4 ${getBorderColor(insight.type)}`}
          >
            <div className="flex items-start gap-3">
              <div className={getIconColor(insight.type)}>
                {getIcon(insight.icon)}
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{insight.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{insight.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Next Steps */}
      <div className="border-t border-border pt-6">
        <h4 className="font-semibold text-foreground mb-4">Recommended Next Steps</h4>
        <div className="grid sm:grid-cols-2 gap-3">
          {nextSteps.map((step, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-biz-green flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">{index + 1}</span>
              </div>
              <div>
                <p className="font-medium text-sm text-foreground">{step.title}</p>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pro Tip */}
      <div className="mt-6 bg-biz-navy rounded-xl p-4 text-white">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-biz-citrine flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold">Pro Tip: Cash Flow ≠ Profit</h4>
            <p className="text-sm text-white/80 mt-1">
              Cash flow shows when money moves; profit shows what you earned. A profitable business can still run out of cash if timing is wrong. Track both!
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-biz-navy to-biz-navy/90 text-white">
        <h4 className="font-semibold mb-2">Cash Flow is Just One Piece</h4>
        <p className="text-sm text-white/80 mb-4">
          Get a complete health check across all 12 areas of your business—from financial health to operations, sales, and leadership.
        </p>
        <Link 
          to="/register"
          className="inline-flex items-center gap-2 px-4 py-2 bg-biz-citrine text-biz-navy font-semibold rounded-lg hover:bg-biz-citrine/90 transition-colors"
        >
          Take Free Business Assessment
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default CashFlowInsights;
