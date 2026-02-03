import React from 'react';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Calendar, 
  PieChart, 
  BarChart2,
  CheckCircle,
  AlertCircle,
  Timer
} from 'lucide-react';
import { CashFlowResult, getHealthStatus, formatCurrency } from '@/lib/cashFlowCalculations';

interface CashFlowResultsProps {
  result: CashFlowResult;
}

const CashFlowResults: React.FC<CashFlowResultsProps> = ({ result }) => {
  if (!result.isValid || result.projection.length === 0) {
    return null;
  }

  const { summary } = result;
  const healthStatus = getHealthStatus(summary);

  const getStatusIcon = () => {
    switch (healthStatus.status) {
      case 'danger': return <AlertCircle className="w-6 h-6" />;
      case 'warning': return <AlertTriangle className="w-6 h-6" />;
      default: return <CheckCircle className="w-6 h-6" />;
    }
  };

  const getStatusBgColor = () => {
    switch (healthStatus.status) {
      case 'danger': return 'bg-red-50 border-red-200';
      case 'warning': return 'bg-amber-50 border-amber-200';
      default: return 'bg-green-50 border-green-200';
    }
  };

  const getStatusTextColor = () => {
    switch (healthStatus.status) {
      case 'danger': return 'text-red-700';
      case 'warning': return 'text-amber-700';
      default: return 'text-green-700';
    }
  };

  const metrics = [
    {
      icon: <Wallet className="w-5 h-5" />,
      label: 'Ending Cash Balance',
      value: formatCurrency(summary.endingBalance),
      sublabel: 'After 12 months',
      color: 'text-biz-navy'
    },
    {
      icon: summary.netChange >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />,
      label: '12-Month Net Change',
      value: `${summary.netChange >= 0 ? '+' : ''}${formatCurrency(summary.netChange)}`,
      sublabel: 'Total change from start',
      color: summary.netChange >= 0 ? 'text-green-600' : 'text-red-600'
    },
    {
      icon: <AlertTriangle className="w-5 h-5" />,
      label: 'Lowest Cash Point',
      value: formatCurrency(summary.lowestBalance),
      sublabel: summary.lowestMonth || 'Tightest month',
      color: summary.lowestBalance < 0 ? 'text-red-600' : summary.lowestBalance < summary.avgMonthlyExpense * 2 ? 'text-amber-600' : 'text-green-600'
    },
    {
      icon: <Timer className="w-5 h-5" />,
      label: 'Cash Runway',
      value: summary.cashRunway >= 24 ? '24+ months' : `${summary.cashRunway} months`,
      sublabel: 'At current burn rate',
      color: summary.cashRunway >= 12 ? 'text-green-600' : summary.cashRunway >= 6 ? 'text-amber-600' : 'text-red-600'
    }
  ];

  const additionalMetrics = [
    {
      icon: <PieChart className="w-5 h-5" />,
      label: 'Expense Ratio',
      value: `${summary.expenseRatio.toFixed(1)}%`,
      sublabel: 'Of total revenue',
      color: summary.expenseRatio > 100 ? 'text-red-600' : summary.expenseRatio > 80 ? 'text-amber-600' : 'text-green-600'
    },
    {
      icon: <BarChart2 className="w-5 h-5" />,
      label: 'Months with Deficit',
      value: String(summary.deficitMonths),
      sublabel: 'Negative closing balance',
      color: summary.deficitMonths > 0 ? 'text-red-600' : 'text-green-600'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-biz-navy/5 to-biz-teal/5 rounded-2xl p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-biz-navy/10">
          <TrendingUp className="w-6 h-6 text-biz-navy" />
        </div>
        <h2 className="text-xl font-bold text-foreground font-montserrat">Your 12-Month Cash Flow Projection</h2>
      </div>

      {/* Health Status Banner */}
      <div className={`${getStatusBgColor()} border rounded-xl p-4 md:p-5 flex items-start gap-4`}>
        <div className={getStatusTextColor()}>
          {getStatusIcon()}
        </div>
        <div>
          <h3 className={`font-bold ${getStatusTextColor()}`}>{healthStatus.title}</h3>
          <p className={`text-sm mt-1 ${getStatusTextColor()} opacity-90`}>{healthStatus.message}</p>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-border/50">
            <div className="flex items-center gap-2 mb-2 text-muted-foreground">
              {metric.icon}
              <span className="text-xs font-medium">{metric.label}</span>
            </div>
            <p className={`text-xl md:text-2xl font-bold ${metric.color}`}>{metric.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{metric.sublabel}</p>
          </div>
        ))}
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-2 gap-4">
        {additionalMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-border/50">
            <div className="flex items-center gap-2 mb-2 text-muted-foreground">
              {metric.icon}
              <span className="text-xs font-medium">{metric.label}</span>
            </div>
            <p className={`text-xl font-bold ${metric.color}`}>{metric.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{metric.sublabel}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CashFlowResults;
