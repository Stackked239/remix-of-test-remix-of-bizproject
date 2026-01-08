import { useMemo, useState } from 'react';
import { useCashFlow } from '@/contexts/CashFlowContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, TrendingUp, TrendingDown, DollarSign, Activity, Loader2 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';
const CashFlowDashboard = () => {
  const { transactions, startingBalance } = useCashFlow();

  const metrics = useMemo(() => {
    const sortedTransactions = [...transactions].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    let currentBalance = startingBalance;
    const totalIncome = transactions
      .filter(t => t.type === 'income' && t.status === 'received')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = transactions
      .filter(t => t.type === 'expense' && t.status === 'paid')
      .reduce((sum, t) => sum + t.amount, 0);

    currentBalance = startingBalance + totalIncome - totalExpenses;

    // Calculate 30-day forecast
    const today = new Date();
    const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    
    const recurringIncome = transactions
      .filter(t => t.type === 'income' && t.isRecurring)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const recurringExpenses = transactions
      .filter(t => t.type === 'expense' && t.isRecurring)
      .reduce((sum, t) => sum + t.amount, 0);

    const forecast30Day = currentBalance + recurringIncome - recurringExpenses;

    // Calculate burn rate (monthly)
    const monthlyExpenses = totalExpenses;
    const monthlyIncome = totalIncome;
    const burnRate = monthlyExpenses - monthlyIncome;

    return {
      currentBalance,
      totalIncome,
      totalExpenses,
      forecast30Day,
      burnRate,
      netCashFlow: totalIncome - totalExpenses,
    };
  }, [transactions, startingBalance]);

  const chartData = useMemo(() => {
    const sortedTransactions = [...transactions].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    let runningBalance = startingBalance;
    const balanceData: any[] = [];
    const dailyData = new Map<string, { income: number; expenses: number; date: string }>();

    sortedTransactions.forEach(txn => {
      if (txn.type === 'income' && txn.status === 'received') {
        runningBalance += txn.amount;
      } else if (txn.type === 'expense' && txn.status === 'paid') {
        runningBalance -= txn.amount;
      }

      const date = txn.date;
      if (!dailyData.has(date)) {
        dailyData.set(date, { income: 0, expenses: 0, date });
      }
      
      const dayData = dailyData.get(date)!;
      if (txn.type === 'income' && txn.status === 'received') {
        dayData.income += txn.amount;
      } else if (txn.type === 'expense' && txn.status === 'paid') {
        dayData.expenses += txn.amount;
      }

      balanceData.push({
        date,
        balance: runningBalance,
      });
    });

    return {
      balanceData: balanceData.slice(-30),
      incomeExpenseData: Array.from(dailyData.values()).slice(-30),
    };
  }, [transactions, startingBalance]);

  const categoryData = useMemo(() => {
    const expensesByCategory = new Map<string, number>();
    
    transactions
      .filter(t => t.type === 'expense' && t.status === 'paid')
      .forEach(t => {
        const current = expensesByCategory.get(t.category) || 0;
        expensesByCategory.set(t.category, current + t.amount);
      });

    return Array.from(expensesByCategory.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [transactions]);

  const COLORS = ['hsl(var(--biz-green))', 'hsl(var(--biz-copper))', 'hsl(var(--biz-lime))', 'hsl(var(--biz-navy))', 'hsl(var(--biz-citrine))'];

  const [isExporting, setIsExporting] = useState(false);

  const exportToExcel = async () => {
    setIsExporting(true);
    try {
      // Dynamically import xlsx only when needed
      const XLSX = await import('xlsx');
      
      const wb = XLSX.utils.book_new();

      // Summary sheet
      const summaryData = [
        ['Cash Flow Summary', ''],
        ['Current Balance', metrics.currentBalance],
        ['Total Income', metrics.totalIncome],
        ['Total Expenses', metrics.totalExpenses],
        ['Net Cash Flow', metrics.netCashFlow],
        ['30-Day Forecast', metrics.forecast30Day],
        ['Burn Rate', metrics.burnRate],
      ];
      const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
      XLSX.utils.book_append_sheet(wb, summarySheet, 'Summary');

      // Transactions sheet
      const txnData = transactions.map(t => ({
        Date: t.date,
        Type: t.type,
        Amount: t.amount,
        Category: t.category,
        Description: t.description,
        Status: t.status || '',
        Vendor: t.vendor || '',
      }));
      const txnSheet = XLSX.utils.json_to_sheet(txnData);
      XLSX.utils.book_append_sheet(wb, txnSheet, 'Transactions');

      XLSX.writeFile(wb, `CashFlow_${new Date().toISOString().split('T')[0]}.xlsx`);
      toast.success('Excel workbook downloaded successfully');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export Excel workbook');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-biz-green">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-biz-green">
              ${metrics.currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {metrics.netCashFlow >= 0 ? (
                <span className="text-biz-green flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Positive cash flow
                </span>
              ) : (
                <span className="text-biz-copper flex items-center">
                  <TrendingDown className="w-4 h-4 mr-1" />
                  Negative cash flow
                </span>
              )}
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-biz-navy">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">30-Day Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-biz-navy">
              ${metrics.forecast30Day.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Based on recurring transactions
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-biz-lime">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-biz-lime">
              ${metrics.totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              All time received
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-biz-copper">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-biz-copper">
              ${metrics.totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              All time paid
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and exports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button onClick={exportToExcel} disabled={isExporting} className="bg-biz-green hover:bg-biz-green/90">
              {isExporting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
              {isExporting ? 'Preparing...' : 'Download Excel Workbook'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Balance Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Cash Balance Trend</CardTitle>
            <CardDescription>Last 30 transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData.balanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                <Legend />
                <Line type="monotone" dataKey="balance" stroke="hsl(var(--biz-green))" strokeWidth={2} name="Balance" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Expense Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Top Expense Categories</CardTitle>
            <CardDescription>Breakdown by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) => `${entry.name}: $${entry.value.toFixed(0)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Income vs Expenses */}
      <Card>
        <CardHeader>
          <CardTitle>Income vs Expenses</CardTitle>
          <CardDescription>Daily comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.incomeExpenseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
              <Legend />
              <Bar dataKey="income" fill="hsl(var(--biz-green))" name="Income" />
              <Bar dataKey="expenses" fill="hsl(var(--biz-copper))" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default CashFlowDashboard;
