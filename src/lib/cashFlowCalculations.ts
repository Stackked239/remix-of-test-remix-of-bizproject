// ============================================================================
// CASH FLOW PROJECTION CALCULATIONS
// ============================================================================

export interface OneTimeItem {
  id: string;
  type: 'income' | 'expense';
  month: number;
  amount: number;
  description: string;
}

export interface CashFlowInputs {
  businessName: string;
  startingCash: number;
  startMonth: number; // 0-11
  startYear: number;
  monthlyRevenue: number;
  growthRate: number; // percentage, can be negative
  otherIncome: number;
  fixedExpenses: number;
  variableExpensePercent: number;
  ownersDraw: number;
  oneTimeItems: OneTimeItem[];
}

export interface MonthProjection {
  index: number;
  name: string;
  fullName: string;
  month: number;
  year: number;
  opening: number;
  revenue: number;
  otherIncome: number;
  oneTimeIncome: number;
  cashIn: number;
  fixedExpenses: number;
  variableExpenses: number;
  ownersDraw: number;
  oneTimeExpenses: number;
  cashOut: number;
  netFlow: number;
  closing: number;
  status: 'healthy' | 'warning' | 'danger';
}

export interface CashFlowSummary {
  startingCash: number;
  endingBalance: number;
  netChange: number;
  lowestBalance: number;
  lowestMonth: string;
  lowestMonthIndex: number;
  deficitMonths: number;
  totalCashIn: number;
  totalCashOut: number;
  expenseRatio: number;
  cashRunway: number; // months
  avgMonthlyExpense: number;
  avgMonthlyRevenue: number;
}

export interface CashFlowResult {
  projection: MonthProjection[];
  summary: CashFlowSummary;
  isValid: boolean;
}

export interface HealthStatus {
  status: 'healthy' | 'warning' | 'danger';
  icon: string;
  title: string;
  message: string;
  color: string;
}

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const FULL_MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function generateMonths(startMonth: number, startYear: number): { index: number; name: string; fullName: string; month: number; year: number }[] {
  const months = [];
  let month = startMonth;
  let year = startYear;
  
  for (let i = 0; i < 12; i++) {
    months.push({
      index: i,
      name: `${MONTH_NAMES[month]} '${String(year).slice(-2)}`,
      fullName: `${FULL_MONTH_NAMES[month]} ${year}`,
      month,
      year
    });
    month++;
    if (month > 11) { month = 0; year++; }
  }
  return months;
}

export function calculateProjection(inputs: CashFlowInputs): CashFlowResult {
  const {
    startingCash,
    startMonth,
    startYear,
    monthlyRevenue,
    growthRate = 0,
    otherIncome = 0,
    fixedExpenses,
    variableExpensePercent,
    ownersDraw = 0,
    oneTimeItems = []
  } = inputs;

  // Validation
  if (startingCash < 0 || monthlyRevenue <= 0 || fixedExpenses < 0 || variableExpensePercent < 0 || variableExpensePercent > 100) {
    return {
      projection: [],
      summary: {
        startingCash: 0,
        endingBalance: 0,
        netChange: 0,
        lowestBalance: 0,
        lowestMonth: '',
        lowestMonthIndex: 0,
        deficitMonths: 0,
        totalCashIn: 0,
        totalCashOut: 0,
        expenseRatio: 0,
        cashRunway: 0,
        avgMonthlyExpense: 0,
        avgMonthlyRevenue: 0
      },
      isValid: false
    };
  }

  const months = generateMonths(startMonth, startYear);
  const projection: MonthProjection[] = [];
  let currentBalance = startingCash;
  let lowestBalance = startingCash;
  let lowestMonth = '';
  let lowestMonthIndex = 0;
  let deficitMonths = 0;
  let totalCashIn = 0;
  let totalCashOut = 0;
  let totalRevenue = 0;

  months.forEach((monthData, index) => {
    // Calculate revenue with growth
    const monthRevenue = index === 0 
      ? monthlyRevenue 
      : monthlyRevenue * Math.pow(1 + (growthRate / 100), index);
    
    // One-time income for this month
    const oneTimeIncome = oneTimeItems
      .filter(item => item.month === index && item.type === 'income')
      .reduce((sum, item) => sum + item.amount, 0);
    
    // Total cash inflows
    const cashIn = monthRevenue + otherIncome + oneTimeIncome;
    
    // Variable expenses based on revenue
    const variableExpenses = monthRevenue * (variableExpensePercent / 100);
    
    // One-time expenses for this month
    const oneTimeExpenses = oneTimeItems
      .filter(item => item.month === index && item.type === 'expense')
      .reduce((sum, item) => sum + item.amount, 0);
    
    // Total cash outflows
    const cashOut = fixedExpenses + variableExpenses + ownersDraw + oneTimeExpenses;
    
    // Net flow and closing balance
    const netFlow = cashIn - cashOut;
    const openingBalance = currentBalance;
    const closingBalance = openingBalance + netFlow;
    
    // Track metrics
    totalCashIn += cashIn;
    totalCashOut += cashOut;
    totalRevenue += monthRevenue;
    
    if (closingBalance < lowestBalance) {
      lowestBalance = closingBalance;
      lowestMonth = monthData.fullName;
      lowestMonthIndex = index;
    }
    
    if (closingBalance < 0) {
      deficitMonths++;
    }
    
    // Determine status
    const monthlyExpenseAvg = fixedExpenses + variableExpenses + ownersDraw;
    let status: 'healthy' | 'warning' | 'danger' = 'healthy';
    if (closingBalance < 0) {
      status = 'danger';
    } else if (closingBalance < monthlyExpenseAvg * 2) {
      status = 'warning';
    }
    
    projection.push({
      ...monthData,
      opening: openingBalance,
      revenue: monthRevenue,
      otherIncome: otherIncome,
      oneTimeIncome,
      cashIn,
      fixedExpenses,
      variableExpenses,
      ownersDraw,
      oneTimeExpenses,
      cashOut,
      netFlow,
      closing: closingBalance,
      status
    });
    
    currentBalance = closingBalance;
  });

  // Calculate summary metrics
  const endingBalance = currentBalance;
  const netChange = endingBalance - startingCash;
  const avgMonthlyExpense = totalCashOut / 12;
  const avgMonthlyRevenue = totalRevenue / 12;
  const expenseRatio = totalCashIn > 0 ? (totalCashOut / totalCashIn) * 100 : 0;
  
  // Cash runway calculation (months until $0 at current burn rate)
  let cashRunway = Infinity;
  if (netChange < 0) {
    const monthlyBurn = Math.abs(netChange / 12);
    cashRunway = monthlyBurn > 0 ? Math.floor(startingCash / monthlyBurn) : Infinity;
  } else if (deficitMonths > 0) {
    // Find first deficit month
    const firstDeficit = projection.findIndex(p => p.closing < 0);
    cashRunway = firstDeficit >= 0 ? firstDeficit : Infinity;
  }

  return {
    projection,
    summary: {
      startingCash,
      endingBalance,
      netChange,
      lowestBalance,
      lowestMonth,
      lowestMonthIndex,
      deficitMonths,
      totalCashIn,
      totalCashOut,
      expenseRatio,
      cashRunway: cashRunway === Infinity ? 99 : cashRunway,
      avgMonthlyExpense,
      avgMonthlyRevenue
    },
    isValid: true
  };
}

export function getHealthStatus(summary: CashFlowSummary): HealthStatus {
  const { endingBalance, netChange, lowestBalance, deficitMonths, avgMonthlyExpense, startingCash, lowestMonth } = summary;
  
  if (lowestBalance < 0 || deficitMonths > 0) {
    return {
      status: 'danger',
      icon: 'AlertCircle',
      title: 'Cash Flow Warning: Action Needed',
      message: `Your projection shows negative cash in ${lowestMonth || 'some months'}. You'll need to increase revenue, cut expenses, or secure funding before then.`,
      color: '#dc2626'
    };
  }
  
  if (lowestBalance < avgMonthlyExpense * 2) {
    return {
      status: 'warning',
      icon: 'AlertTriangle', 
      title: 'Watch Your Cash Closely',
      message: `Your cash drops to ${formatCurrency(lowestBalance)} in ${lowestMonth}—less than 2 months of expenses. Consider building a larger buffer.`,
      color: '#f59e0b'
    };
  }
  
  const changeText = netChange >= 0 
    ? `end with ${formatCurrency(Math.abs(netChange))} more than you started` 
    : `end with ${formatCurrency(Math.abs(netChange))} less than you started`;
  
  return {
    status: 'healthy',
    icon: 'CheckCircle',
    title: 'Your Cash Flow Looks Healthy',
    message: `You maintain positive cash throughout all 12 months and ${changeText}. Keep monitoring monthly.`,
    color: '#16a34a'
  };
}

export interface Insight {
  type: 'positive' | 'neutral' | 'warning' | 'danger';
  icon: string;
  title: string;
  message: string;
}

export function generateInsights(summary: CashFlowSummary): Insight[] {
  const insights: Insight[] = [];
  const { netChange, expenseRatio, deficitMonths, lowestBalance, avgMonthlyExpense, lowestMonth, cashRunway, endingBalance, startingCash } = summary;

  // Trajectory insight
  if (netChange > 0) {
    insights.push({
      type: 'positive',
      icon: 'TrendingUp',
      title: 'Positive Trajectory',
      message: `Great news! Your 12-month projection shows positive cash flow of ${formatCurrency(netChange)}. You're building cash reserves. Consider investing in growth or building an emergency fund.`
    });
  } else if (netChange === 0) {
    insights.push({
      type: 'neutral',
      icon: 'MinusCircle',
      title: 'Break-Even Cash Flow',
      message: 'Your revenue and expenses are balanced over 12 months. Focus on growth opportunities or cost optimization to start building surplus cash.'
    });
  } else {
    insights.push({
      type: 'danger',
      icon: 'TrendingDown',
      title: 'Negative Trajectory',
      message: `Warning: You're projected to lose ${formatCurrency(Math.abs(netChange))} over 12 months. Review your expenses and look for ways to increase revenue.`
    });
  }

  // Expense ratio insight
  if (expenseRatio > 100) {
    insights.push({
      type: 'danger',
      icon: 'AlertOctagon',
      title: 'Expense Overrun',
      message: `Your expenses (${expenseRatio.toFixed(0)}%) exceed your income. You're spending more than you earn—this is unsustainable without changes or additional funding.`
    });
  } else if (expenseRatio > 80) {
    insights.push({
      type: 'warning',
      icon: 'AlertTriangle',
      title: 'Tight Margins',
      message: `Your expense ratio is ${expenseRatio.toFixed(0)}%—leaving only ${(100 - expenseRatio).toFixed(0)}% for savings or unexpected costs. Consider cost optimization.`
    });
  }

  // Cash buffer insight
  if (lowestBalance < avgMonthlyExpense * 2 && lowestBalance >= 0) {
    insights.push({
      type: 'warning',
      icon: 'Wallet',
      title: 'Low Cash Buffer',
      message: `Your lowest point (${formatCurrency(lowestBalance)} in ${lowestMonth}) is less than 2 months of expenses. Aim for 3-6 months as a safety net.`
    });
  }

  // Deficit months insight
  if (deficitMonths > 0) {
    insights.push({
      type: 'danger',
      icon: 'Calendar',
      title: `${deficitMonths} Month${deficitMonths > 1 ? 's' : ''} with Deficit`,
      message: `You have ${deficitMonths} month${deficitMonths > 1 ? 's' : ''} where your closing balance goes negative. Plan now to cover these gaps with a line of credit, savings, or cost cuts.`
    });
  }

  // Cash runway insight (only if burning cash)
  if (netChange < 0 && cashRunway < 24) {
    insights.push({
      type: 'warning',
      icon: 'Timer',
      title: 'Cash Runway Alert',
      message: `At your current burn rate, you have approximately ${cashRunway} months until your starting cash runs out. Consider reducing expenses or increasing revenue.`
    });
  }

  return insights;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function getMonthOptions(startFromCurrent: boolean = true): { value: number; label: string; year: number }[] {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  const options = [];
  let month = startFromCurrent ? currentMonth : 0;
  let year = currentYear;
  
  for (let i = 0; i < 12; i++) {
    options.push({
      value: month,
      label: `${FULL_MONTH_NAMES[month]} ${year}`,
      year
    });
    month++;
    if (month > 11) { month = 0; year++; }
  }
  
  return options;
}
