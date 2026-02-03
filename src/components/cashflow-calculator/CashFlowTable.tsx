import React, { useState } from 'react';
import { Table as TableIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { CashFlowResult, formatCurrency } from '@/lib/cashFlowCalculations';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface CashFlowTableProps {
  result: CashFlowResult;
}

const CashFlowTable: React.FC<CashFlowTableProps> = ({ result }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!result.isValid || result.projection.length === 0) {
    return null;
  }

  const { projection, summary } = result;

  const getStatusIndicator = (status: 'healthy' | 'warning' | 'danger') => {
    switch (status) {
      case 'healthy':
        return <span className="inline-block w-3 h-3 rounded-full bg-green-500" title="Healthy (>2x monthly expenses)" />;
      case 'warning':
        return <span className="inline-block w-3 h-3 rounded-full bg-amber-500" title="Watch (<2x monthly expenses)" />;
      case 'danger':
        return <span className="inline-block w-3 h-3 rounded-full bg-red-500" title="Danger (negative balance)" />;
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="bg-white rounded-2xl shadow-lg border border-border/50 overflow-hidden">
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center justify-between p-6 hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-biz-navy/10">
                <TableIcon className="w-5 h-5 text-biz-navy" />
              </div>
              <h3 className="text-lg font-bold text-foreground font-montserrat">Monthly Cash Flow Breakdown</h3>
            </div>
            {isOpen ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-biz-navy text-white">
                  <th className="px-4 py-3 text-left font-semibold sticky left-0 bg-biz-navy z-10">Month</th>
                  <th className="px-4 py-3 text-right font-semibold">Opening</th>
                  <th className="px-4 py-3 text-right font-semibold">Cash In</th>
                  <th className="px-4 py-3 text-right font-semibold">Cash Out</th>
                  <th className="px-4 py-3 text-right font-semibold">Net Flow</th>
                  <th className="px-4 py-3 text-right font-semibold">Closing</th>
                  <th className="px-4 py-3 text-center font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {projection.map((month, index) => (
                  <tr 
                    key={month.index}
                    className={`
                      ${index % 2 === 0 ? 'bg-white' : 'bg-muted/30'}
                      ${month.closing < 0 ? 'bg-red-50' : ''}
                      ${month.index === summary.lowestMonthIndex ? 'ring-1 ring-inset ring-amber-300' : ''}
                      hover:bg-muted/50 transition-colors
                    `}
                  >
                    <td className={`px-4 py-3 font-medium sticky left-0 z-10 ${index % 2 === 0 ? 'bg-white' : 'bg-muted/30'} ${month.closing < 0 ? 'bg-red-50' : ''}`}>
                      {month.name}
                    </td>
                    <td className="px-4 py-3 text-right text-muted-foreground tabular-nums">
                      {formatCurrency(month.opening)}
                    </td>
                    <td className="px-4 py-3 text-right text-green-600 tabular-nums">
                      {formatCurrency(month.cashIn)}
                    </td>
                    <td className="px-4 py-3 text-right text-red-600 tabular-nums">
                      {formatCurrency(month.cashOut)}
                    </td>
                    <td className={`px-4 py-3 text-right font-medium tabular-nums ${month.netFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {month.netFlow >= 0 ? '+' : ''}{formatCurrency(month.netFlow)}
                    </td>
                    <td className={`px-4 py-3 text-right font-semibold tabular-nums ${month.closing < 0 ? 'text-red-600' : 'text-biz-navy'}`}>
                      {formatCurrency(month.closing)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {getStatusIndicator(month.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-biz-navy text-white font-semibold">
                  <td className="px-4 py-3 sticky left-0 bg-biz-navy">TOTALS</td>
                  <td className="px-4 py-3 text-right">—</td>
                  <td className="px-4 py-3 text-right tabular-nums">{formatCurrency(summary.totalCashIn)}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{formatCurrency(summary.totalCashOut)}</td>
                  <td className={`px-4 py-3 text-right tabular-nums ${summary.netChange >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                    {summary.netChange >= 0 ? '+' : ''}{formatCurrency(summary.netChange)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">{formatCurrency(summary.endingBalance)}</td>
                  <td className="px-4 py-3"></td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Legend */}
          <div className="px-6 py-4 bg-muted/30 border-t border-border flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="font-medium">Status:</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              <span>Healthy (closing &gt; 2x expenses)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>Watch (closing &lt; 2x expenses)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span>Danger (negative balance)</span>
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

export default CashFlowTable;
