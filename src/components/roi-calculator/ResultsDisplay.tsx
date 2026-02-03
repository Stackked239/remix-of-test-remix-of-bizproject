import React from 'react';
import { cn } from '@/lib/utils';
import { Check, AlertTriangle, X, TrendingUp, TrendingDown, Clock, DollarSign } from 'lucide-react';
import type { CalculationResult } from '@/lib/roiCalculations';
import { formatCurrency, formatPercent } from '@/lib/roiCalculations';

interface ResultsDisplayProps {
  result: CalculationResult;
  scenario: 'equipment' | 'hire' | 'campaign';
  usefulYears?: number;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, scenario, usefulYears = 5 }) => {
  const hasResults = result.recommendation !== "Enter your numbers to see results";
  
  const getResultIcon = () => {
    if (result.isGood) return <Check className="w-8 h-8" />;
    if (result.isNeutral) return <AlertTriangle className="w-8 h-8" />;
    return <X className="w-8 h-8" />;
  };

  const getResultColor = () => {
    if (result.isGood) return 'text-biz-green bg-biz-green/10 border-biz-green';
    if (result.isNeutral) return 'text-biz-citrine bg-biz-citrine/10 border-biz-citrine';
    return 'text-destructive bg-destructive/10 border-destructive';
  };

  const getRoiLabel = () => {
    if (scenario === 'equipment') return `over ${usefulYears} years`;
    if (scenario === 'hire') return 'Year 1 ROI';
    return 'Campaign ROI';
  };

  return (
    <div className="bg-white rounded-xl shadow-card border border-border overflow-hidden">
      {/* Primary Result */}
      <div className={cn(
        "p-6 border-b-4 transition-all duration-300",
        hasResults ? getResultColor() : "bg-muted/50 border-muted"
      )}>
        <div className="flex items-start gap-4">
          {hasResults && (
            <div className={cn(
              "flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center",
              result.isGood && "bg-biz-green text-white",
              result.isNeutral && "bg-biz-citrine text-biz-navy",
              result.isBad && "bg-destructive text-white"
            )}>
              {getResultIcon()}
            </div>
          )}
          <div className="flex-1">
            <p className={cn(
              "font-montserrat font-bold text-lg md:text-xl leading-tight",
              !hasResults && "text-muted-foreground"
            )}>
              {result.recommendation}
            </p>
            {hasResults && (
              <p className="mt-2 text-3xl md:text-5xl font-montserrat font-bold">
                {formatPercent(result.roi)} <span className="text-lg font-normal opacity-75">{getRoiLabel()}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {hasResults && (
        <>
          {/* What This Means */}
          <div className="p-6 border-b border-border">
            <h3 className="font-montserrat font-semibold text-biz-navy text-lg mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-biz-green" />
              WHAT THIS MEANS
            </h3>
            <p className="font-open-sans text-foreground leading-relaxed">
              {result.explanation}
            </p>
          </div>

          {/* The Details */}
          <div className="p-6 border-b border-border bg-muted/30">
            <h3 className="font-montserrat font-semibold text-biz-navy text-lg mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-biz-copper" />
              THE DETAILS
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border border-border">
                <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Break-even
                </p>
                <p className="text-2xl font-montserrat font-bold text-biz-navy">
                  {result.breakeven.toFixed(1)} {scenario === 'campaign' ? 'mo' : 'yr'}
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-border">
                <p className="text-sm text-muted-foreground mb-1">Year 1 Impact</p>
                <p className={cn(
                  "text-2xl font-montserrat font-bold",
                  result.year1Impact >= 0 ? "text-biz-green" : "text-destructive"
                )}>
                  {result.year1Impact >= 0 ? '+' : ''}{formatCurrency(result.year1Impact)}
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-border">
                <p className="text-sm text-muted-foreground mb-1">2-Year Total</p>
                <p className={cn(
                  "text-2xl font-montserrat font-bold",
                  result.year2Total >= 0 ? "text-biz-green" : "text-destructive"
                )}>
                  {result.year2Total >= 0 ? '+' : ''}{formatCurrency(result.year2Total)}
                </p>
              </div>
              {result.fiveYearTotal !== undefined && (
                <div className="bg-white rounded-lg p-4 border border-border">
                  <p className="text-sm text-muted-foreground mb-1">5-Year Total</p>
                  <p className={cn(
                    "text-2xl font-montserrat font-bold",
                    result.fiveYearTotal >= 0 ? "text-biz-green" : "text-destructive"
                  )}>
                    {result.fiveYearTotal >= 0 ? '+' : ''}{formatCurrency(result.fiveYearTotal)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Benchmark Context */}
          {result.benchmarkText && (
            <div className="p-6 border-b border-border">
              <h3 className="font-montserrat font-semibold text-biz-navy text-lg mb-3">
                IS {Math.abs(result.roi).toFixed(0)}% ROI GOOD?
              </h3>
              <p className="font-open-sans text-foreground leading-relaxed">
                {result.benchmarkText}
              </p>
            </div>
          )}

          {/* Things to Think About */}
          {result.considerations.length > 0 && (
            <div className="p-6 bg-biz-citrine/10">
              <h3 className="font-montserrat font-semibold text-biz-navy text-lg mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-biz-citrine" />
                THINGS TO THINK ABOUT
              </h3>
              <ul className="space-y-2">
                {result.considerations.map((consideration, index) => (
                  <li key={index} className="flex items-start gap-2 font-open-sans text-foreground">
                    <span className="text-biz-citrine font-bold">•</span>
                    {consideration}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ResultsDisplay;
