import { useMemo } from 'react';
import { useCashFlow } from '@/contexts/CashFlowContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ReportsView = () => {
  const { transactions, startingBalance } = useCashFlow();

  const profitLoss = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income' && t.status === 'received')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = transactions
      .filter(t => t.type === 'expense' && t.status === 'paid')
      .reduce((sum, t) => sum + t.amount, 0);

    const netIncome = income - expenses;

    const incomeByCategory = new Map<string, number>();
    const expensesByCategory = new Map<string, number>();

    transactions.forEach(t => {
      if (t.type === 'income' && t.status === 'received') {
        const current = incomeByCategory.get(t.category) || 0;
        incomeByCategory.set(t.category, current + t.amount);
      } else if (t.type === 'expense' && t.status === 'paid') {
        const current = expensesByCategory.get(t.category) || 0;
        expensesByCategory.set(t.category, current + t.amount);
      }
    });

    return {
      totalIncome: income,
      totalExpenses: expenses,
      netIncome,
      incomeByCategory: Array.from(incomeByCategory.entries()),
      expensesByCategory: Array.from(expensesByCategory.entries()),
    };
  }, [transactions]);

  return (
    <div className="space-y-6">
      {/* Profit & Loss Statement */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Profit & Loss Statement</CardTitle>
              <CardDescription>Summary of income and expenses</CardDescription>
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Income Section */}
            <div>
              <h3 className="font-semibold text-lg mb-3 text-biz-green">Income</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {profitLoss.incomeByCategory.length > 0 ? (
                    profitLoss.incomeByCategory.map(([category, amount]) => (
                      <TableRow key={category}>
                        <TableCell>{category}</TableCell>
                        <TableCell className="text-right text-biz-green font-semibold">
                          ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center text-muted-foreground">
                        No income recorded
                      </TableCell>
                    </TableRow>
                  )}
                  <TableRow className="font-bold">
                    <TableCell>Total Income</TableCell>
                    <TableCell className="text-right text-biz-green">
                      ${profitLoss.totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Expenses Section */}
            <div>
              <h3 className="font-semibold text-lg mb-3 text-biz-copper">Expenses</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {profitLoss.expensesByCategory.length > 0 ? (
                    profitLoss.expensesByCategory.map(([category, amount]) => (
                      <TableRow key={category}>
                        <TableCell>{category}</TableCell>
                        <TableCell className="text-right text-biz-copper font-semibold">
                          ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center text-muted-foreground">
                        No expenses recorded
                      </TableCell>
                    </TableRow>
                  )}
                  <TableRow className="font-bold">
                    <TableCell>Total Expenses</TableCell>
                    <TableCell className="text-right text-biz-copper">
                      ${profitLoss.totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Net Income */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Net Income</span>
                <span className={profitLoss.netIncome >= 0 ? 'text-biz-green' : 'text-biz-copper'}>
                  ${profitLoss.netIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Reports</CardTitle>
          <CardDescription>More reporting features coming soon</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <FileText className="w-8 h-8" />
              <div className="text-center">
                <div className="font-semibold">Cash Flow Statement</div>
                <div className="text-xs text-muted-foreground">Coming Soon</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <FileText className="w-8 h-8" />
              <div className="text-center">
                <div className="font-semibold">Budget vs Actual</div>
                <div className="text-xs text-muted-foreground">Coming Soon</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsView;
