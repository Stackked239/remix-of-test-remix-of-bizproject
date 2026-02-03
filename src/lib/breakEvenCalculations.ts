// Break-Even Analysis Calculation Types and Functions

export interface BreakEvenInputs {
  monthlyFixedCosts: number;
  variableCostPerUnit: number;
  pricePerUnit: number;
  businessName: string;
}

export interface BreakEvenResult {
  breakEvenUnits: number;
  breakEvenRevenue: number;
  contributionMarginDollars: number;
  contributionMarginPercent: number;
  daysToBreakEven: number;
  annualBreakEvenUnits: number;
  annualBreakEvenRevenue: number;
  profitPerUnit: number;
  isValid: boolean;
  errorMessage: string;
}

export function calculateBreakEven(inputs: BreakEvenInputs): BreakEvenResult {
  const { monthlyFixedCosts, variableCostPerUnit, pricePerUnit } = inputs;
  
  // Default result for invalid inputs
  const defaultResult: BreakEvenResult = {
    breakEvenUnits: 0,
    breakEvenRevenue: 0,
    contributionMarginDollars: 0,
    contributionMarginPercent: 0,
    daysToBreakEven: 0,
    annualBreakEvenUnits: 0,
    annualBreakEvenRevenue: 0,
    profitPerUnit: 0,
    isValid: false,
    errorMessage: 'Enter your numbers to see results',
  };

  // Validation
  if (!monthlyFixedCosts || !variableCostPerUnit || !pricePerUnit) {
    return { ...defaultResult, errorMessage: 'Please fill in all required fields' };
  }

  if (variableCostPerUnit >= pricePerUnit) {
    return { 
      ...defaultResult, 
      errorMessage: 'Variable cost must be less than selling price to achieve profitability',
      contributionMarginDollars: pricePerUnit - variableCostPerUnit,
      contributionMarginPercent: ((pricePerUnit - variableCostPerUnit) / pricePerUnit) * 100,
    };
  }

  if (monthlyFixedCosts <= 0 || variableCostPerUnit < 0 || pricePerUnit <= 0) {
    return { ...defaultResult, errorMessage: 'Please enter valid positive numbers' };
  }

  // Calculate metrics
  const contributionMarginDollars = pricePerUnit - variableCostPerUnit;
  const contributionMarginPercent = (contributionMarginDollars / pricePerUnit) * 100;
  const breakEvenUnits = Math.ceil(monthlyFixedCosts / contributionMarginDollars);
  const breakEvenRevenue = breakEvenUnits * pricePerUnit;
  const daysToBreakEven = Math.ceil(breakEvenUnits / 1); // Assuming 1 unit per day average (will be adjusted in UI)
  const annualBreakEvenUnits = breakEvenUnits * 12;
  const annualBreakEvenRevenue = breakEvenRevenue * 12;
  const profitPerUnit = contributionMarginDollars;

  return {
    breakEvenUnits,
    breakEvenRevenue,
    contributionMarginDollars,
    contributionMarginPercent,
    daysToBreakEven,
    annualBreakEvenUnits,
    annualBreakEvenRevenue,
    profitPerUnit,
    isValid: true,
    errorMessage: '',
  };
}

export function getMarginHealthStatus(marginPercent: number): {
  status: 'excellent' | 'healthy' | 'moderate' | 'tight' | 'danger';
  label: string;
  color: string;
  description: string;
} {
  if (marginPercent >= 50) {
    return {
      status: 'excellent',
      label: 'Excellent',
      color: 'text-emerald-600',
      description: 'Outstanding margin! Your business model is highly efficient.',
    };
  } else if (marginPercent >= 40) {
    return {
      status: 'healthy',
      label: 'Healthy',
      color: 'text-green-600',
      description: 'Strong margin. Each sale contributes significantly to profitability.',
    };
  } else if (marginPercent >= 25) {
    return {
      status: 'moderate',
      label: 'Moderate',
      color: 'text-yellow-600',
      description: 'Acceptable margin. Consider optimizing costs or pricing.',
    };
  } else if (marginPercent > 0) {
    return {
      status: 'tight',
      label: 'Tight',
      color: 'text-orange-600',
      description: 'Low margin. You need high volume or cost reduction to build profit.',
    };
  } else {
    return {
      status: 'danger',
      label: 'Unprofitable',
      color: 'text-red-600',
      description: 'You lose money on every sale. Increase price or reduce costs immediately.',
    };
  }
}

export function generateInsights(inputs: BreakEvenInputs, result: BreakEvenResult): {
  type: 'positive' | 'warning' | 'info';
  title: string;
  text: string;
}[] {
  const insights: { type: 'positive' | 'warning' | 'info'; title: string; text: string }[] = [];

  if (!result.isValid) return insights;

  // Always add the clear target insight
  insights.push({
    type: 'positive',
    title: 'Clear Sales Target',
    text: `You need to sell ${result.breakEvenUnits.toLocaleString()} units monthly to cover all costs. Track actual sales against this number weekly.`,
  });

  // Margin-based insights
  if (result.contributionMarginPercent >= 40) {
    insights.push({
      type: 'positive',
      title: 'Strong Margin Advantage',
      text: `Your ${result.contributionMarginPercent.toFixed(1)}% contribution margin is excellent. Focus on scaling sales while maintaining quality.`,
    });
  } else if (result.contributionMarginPercent < 25) {
    insights.push({
      type: 'warning',
      title: 'Cost Optimization Needed',
      text: `Your ${result.contributionMarginPercent.toFixed(1)}% margin is tight. Explore supplier negotiations, efficiency improvements, or strategic price increases.`,
    });
  }

  // Revenue-based insights
  if (result.breakEvenRevenue > inputs.monthlyFixedCosts * 3) {
    insights.push({
      type: 'info',
      title: 'High Volume Requirement',
      text: `Your break-even revenue of $${result.breakEvenRevenue.toLocaleString()} is ${(result.breakEvenRevenue / inputs.monthlyFixedCosts).toFixed(1)}x your fixed costs. Consider if your market supports this volume.`,
    });
  }

  // Fixed cost insight
  if (inputs.monthlyFixedCosts > 10000) {
    insights.push({
      type: 'info',
      title: 'Fixed Cost Review',
      text: `Your $${inputs.monthlyFixedCosts.toLocaleString()} monthly fixed costs require ${result.breakEvenUnits} sales just to break even. Review each expense quarterly.`,
    });
  }

  // Next steps
  insights.push({
    type: 'info',
    title: 'Recommended Next Steps',
    text: '(1) Create a 6-month sales forecast to verify you can exceed break-even. (2) Review fixed costs quarterly for reduction opportunities. (3) Use this analysis in investor or lender conversations.',
  });

  // Real-world reminder
  insights.push({
    type: 'info',
    title: 'Real-World Reminder',
    text: 'This assumes consistent pricing and costs. In reality, you may negotiate bulk discounts, add product lines, or face seasonal demand. Revisit this quarterly.',
  });

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
  return new Intl.NumberFormat('en-US').format(value);
}
