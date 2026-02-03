import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from 'recharts';
import { LineChart as LineChartIcon } from 'lucide-react';
import { CashFlowResult, formatCurrency } from '@/lib/cashFlowCalculations';

interface CashFlowChartProps {
  result: CashFlowResult;
}

const CashFlowChart: React.FC<CashFlowChartProps> = ({ result }) => {
  if (!result.isValid || result.projection.length === 0) {
    return null;
  }

  const chartData = result.projection.map(month => ({
    name: month.name,
    fullName: month.fullName,
    closing: month.closing,
    cashIn: month.cashIn,
    cashOut: month.cashOut,
    netFlow: month.netFlow,
    isLowest: month.index === result.summary.lowestMonthIndex
  }));

  const minValue = Math.min(...chartData.map(d => d.closing), 0);
  const maxValue = Math.max(...chartData.map(d => d.closing));
  const padding = (maxValue - minValue) * 0.1;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-border shadow-lg rounded-lg p-3 min-w-48">
          <p className="font-semibold text-biz-navy mb-2">{data.fullName}</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ending Balance:</span>
              <span className={`font-medium ${data.closing < 0 ? 'text-red-600' : 'text-biz-navy'}`}>
                {formatCurrency(data.closing)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cash In:</span>
              <span className="font-medium text-green-600">{formatCurrency(data.cashIn)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cash Out:</span>
              <span className="font-medium text-red-600">{formatCurrency(data.cashOut)}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-border mt-1">
              <span className="text-muted-foreground">Net Flow:</span>
              <span className={`font-medium ${data.netFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {data.netFlow >= 0 ? '+' : ''}{formatCurrency(data.netFlow)}
              </span>
            </div>
          </div>
          {data.isLowest && (
            <div className="mt-2 pt-2 border-t border-amber-200 bg-amber-50 -mx-3 -mb-3 px-3 py-2 rounded-b-lg">
              <span className="text-xs text-amber-700 font-medium">⚠ Lowest cash point</span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const hasNegative = chartData.some(d => d.closing < 0);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-border/50 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-biz-navy/10">
          <LineChartIcon className="w-5 h-5 text-biz-navy" />
        </div>
        <h3 className="text-lg font-bold text-foreground font-montserrat">Cash Balance Over 12 Months</h3>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="cashPositive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#242553" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#242553" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="cashNegative" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#dc2626" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#dc2626" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 11, fill: '#7C7C7C' }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={false}
            />
            <YAxis 
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              tick={{ fontSize: 11, fill: '#7C7C7C' }}
              axisLine={false}
              tickLine={false}
              domain={[minValue - padding, maxValue + padding]}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine 
              y={0} 
              stroke="#9ca3af" 
              strokeDasharray="4 4" 
              label={{ value: '$0', position: 'insideLeft', fontSize: 10, fill: '#9ca3af' }} 
            />
            <Area
              type="monotone"
              dataKey="closing"
              stroke="#242553"
              strokeWidth={2}
              fill="url(#cashPositive)"
              dot={(props: any) => {
                const { cx, cy, payload } = props;
                if (payload.isLowest) {
                  return (
                    <g key={`dot-${payload.name}`}>
                      <circle cx={cx} cy={cy} r={6} fill={payload.closing < 0 ? '#dc2626' : '#f59e0b'} stroke="#fff" strokeWidth={2} />
                    </g>
                  );
                }
                return <circle key={`dot-${payload.name}`} cx={cx} cy={cy} r={4} fill="#242553" stroke="#fff" strokeWidth={2} />;
              }}
              activeDot={{ r: 6, fill: '#242553', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-biz-navy rounded-full"></div>
          <span>Cash Balance</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0 border-t border-dashed border-gray-400"></div>
          <span>Zero Line</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 border-2 border-white shadow-sm"></div>
          <span>Lowest Point</span>
        </div>
      </div>
    </div>
  );
};

export default CashFlowChart;
