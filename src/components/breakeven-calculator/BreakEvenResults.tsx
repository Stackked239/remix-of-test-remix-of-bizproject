import React from 'react';
import { TrendingUp, Target, Percent, Calendar, DollarSign, BarChart3, AlertCircle } from 'lucide-react';
import { BreakEvenResult, formatCurrency, formatNumber, getMarginHealthStatus } from '@/lib/breakEvenCalculations';
import { cn } from '@/lib/utils';

interface BreakEvenResultsProps {
  result: BreakEvenResult;
}

const BreakEvenResults: React.FC<BreakEvenResultsProps> = ({ result }) => {
  const marginHealth = getMarginHealthStatus(result.contributionMarginPercent);
  
  if (!result.isValid) {
    return (
      <div className="bg-white rounded-xl shadow-card border border-border p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-biz-teal/10">
            <Target className="w-6 h-6 text-biz-teal" />
          </div>
          <h2 className="font-montserrat font-bold text-biz-navy text-xl">
            Your Break-Even Point
          </h2>
        </div>
        
        <div className="flex flex-col items-center justify-center py-12 text-center">
          {result.errorMessage.includes('less than selling price') ? (
            <>
              <AlertCircle className="w-12 h-12 text-destructive mb-4" />
              <p className="text-destructive font-semibold text-lg mb-2">
                Pricing Issue Detected
              </p>
              <p className="text-muted-foreground max-w-md">
                {result.errorMessage}
              </p>
              {result.contributionMarginPercent < 0 && (
                <div className="mt-4 p-4 bg-destructive/10 rounded-lg">
                  <p className="text-sm text-destructive">
                    Current margin: <strong>{result.contributionMarginPercent.toFixed(1)}%</strong>
                    <br />
                    You lose <strong>{formatCurrency(Math.abs(result.contributionMarginDollars))}</strong> on every sale.
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              <BarChart3 className="w-12 h-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">
                {result.errorMessage}
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-card border border-border p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-biz-teal/10">
          <Target className="w-6 h-6 text-biz-teal" />
        </div>
        <h2 className="font-montserrat font-bold text-biz-navy text-xl">
          Your Break-Even Point
        </h2>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Units to Break Even */}
        <div className="bg-gradient-to-br from-biz-teal/5 to-biz-green/5 rounded-xl p-4 border-l-4 border-biz-teal">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-biz-teal" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Units to Break Even
            </span>
          </div>
          <p className="text-3xl font-bold text-biz-teal">
            {formatNumber(result.breakEvenUnits)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">units per month</p>
        </div>

        {/* Revenue at Break-Even */}
        <div className="bg-gradient-to-br from-biz-green/5 to-biz-lime/5 rounded-xl p-4 border-l-4 border-biz-green">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-biz-green" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Revenue at Break-Even
            </span>
          </div>
          <p className="text-3xl font-bold text-biz-green">
            {formatCurrency(result.breakEvenRevenue)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">monthly revenue</p>
        </div>

        {/* Contribution Margin */}
        <div className="bg-gradient-to-br from-biz-copper/5 to-biz-citrine/5 rounded-xl p-4 border-l-4 border-biz-copper">
          <div className="flex items-center gap-2 mb-2">
            <Percent className="w-4 h-4 text-biz-copper" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Contribution Margin
            </span>
          </div>
          <p className="text-3xl font-bold text-biz-copper">
            {result.contributionMarginPercent.toFixed(1)}%
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {formatCurrency(result.contributionMarginDollars)} per unit
          </p>
        </div>

        {/* Margin Health */}
        <div className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl p-4 border-l-4 border-muted-foreground/30">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Margin Health
            </span>
          </div>
          <p className={cn("text-3xl font-bold", marginHealth.color)}>
            {marginHealth.label}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {marginHealth.description.substring(0, 40)}...
          </p>
        </div>
      </div>

      {/* Interpretation Box */}
      <div className="bg-biz-navy/5 rounded-xl p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">📌</span>
          <h3 className="font-semibold text-biz-navy">What This Means</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          You need to sell at least <strong className="text-foreground">{formatNumber(result.breakEvenUnits)} units</strong> per 
          month to break even, generating roughly <strong className="text-foreground">{formatCurrency(result.breakEvenRevenue)}</strong> in 
          revenue. Your <strong className={marginHealth.color}>{result.contributionMarginPercent.toFixed(1)}% contribution margin</strong> means 
          each sale contributes <strong className="text-foreground">{formatCurrency(result.contributionMarginDollars)}</strong> toward 
          covering your fixed costs.
        </p>
      </div>

      {/* Annual Projections */}
      <div className="border-t border-border pt-5">
        <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Annual Projections
        </h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-foreground">{formatNumber(result.annualBreakEvenUnits)}</p>
            <p className="text-xs text-muted-foreground">Units/Year</p>
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">{formatCurrency(result.annualBreakEvenRevenue)}</p>
            <p className="text-xs text-muted-foreground">Revenue/Year</p>
          </div>
          <div>
            <p className="text-lg font-bold text-biz-green">{formatCurrency(result.profitPerUnit)}</p>
            <p className="text-xs text-muted-foreground">Profit/Unit</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakEvenResults;
