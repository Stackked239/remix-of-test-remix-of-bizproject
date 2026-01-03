// ROI Calculation Types and Functions

export type ScenarioType = 'equipment' | 'hire' | 'campaign';

export interface EquipmentInputs {
  equipmentCost: number;
  annualSavings: number;
  annualRevenue: number;
  usefulYears: number;
}

export interface HireInputs {
  annualSalary: number;
  expectedRevenue: number;
  profitMargin: number;
  onboardingCost: number;
  payrollBenefits: number; // percentage
  rampUpMonths: number;
}

export interface CampaignInputs {
  campaignCost: number;
  expectedRevenue: number;
  profitMargin: number;
  repeatRevenue: number;
}

export interface CalculationResult {
  isGood: boolean;
  isNeutral: boolean;
  isBad: boolean;
  roi: number;
  breakeven: number;
  year1Impact: number;
  year2Total: number;
  fiveYearTotal?: number;
  recommendation: string;
  explanation: string;
  benchmarkText: string;
  considerations: string[];
}

// Equipment Investment Calculations
export function calculateEquipmentROI(inputs: EquipmentInputs): CalculationResult {
  const { equipmentCost, annualSavings, annualRevenue, usefulYears } = inputs;
  
  const annualBenefit = annualSavings + annualRevenue;
  
  // If no equipment cost or useful years, show empty result
  if (equipmentCost <= 0 || usefulYears <= 0) {
    return getEmptyResult();
  }
  
  // If equipment costs something but generates no benefit, show negative result
  if (annualBenefit <= 0) {
    return {
      isGood: false,
      isNeutral: false,
      isBad: true,
      roi: -100,
      breakeven: Infinity,
      year1Impact: -equipmentCost,
      year2Total: -equipmentCost,
      fiveYearTotal: -equipmentCost,
      recommendation: "THIS DOESN'T GENERATE ANY RETURN",
      explanation: `This equipment costs $${equipmentCost.toLocaleString()} but generates no savings or revenue. You'll lose the entire investment.`,
      benchmarkText: "Any investment should generate some measurable return. If you can't identify savings or revenue, reconsider the purchase.",
      considerations: [
        "Are there hidden benefits you haven't quantified?",
        "Could this enable future revenue you haven't accounted for?",
        "Is this a necessary expense regardless of ROI (compliance, safety)?",
        "Consider if there are cheaper alternatives."
      ]
    };
  }

  const totalBenefit = annualBenefit * usefulYears;
  const netGain = totalBenefit - equipmentCost;
  const roi = ((totalBenefit - equipmentCost) / equipmentCost) * 100;
  const annualROI = roi / usefulYears;
  const breakeven = equipmentCost / annualBenefit;
  
  const year1Impact = annualBenefit - equipmentCost;
  const year2Total = (annualBenefit * 2) - equipmentCost;
  const fiveYearTotal = usefulYears >= 5 ? (annualBenefit * 5) - equipmentCost : undefined;

  const isGood = annualROI > 20;
  const isNeutral = annualROI >= 0 && annualROI <= 20;
  const isBad = annualROI < 0;

  let recommendation = '';
  let explanation = '';
  let benchmarkText = '';

  if (isGood) {
    recommendation = "YES, THIS LOOKS LIKE A GOOD INVESTMENT";
    explanation = `This equipment should pay for itself in ${breakeven.toFixed(1)} years. You'll be ${year1Impact >= 0 ? 'up' : 'down'} $${Math.abs(year1Impact).toLocaleString()} in Year 1, and up $${year2Total.toLocaleString()} by Year 2.`;
    benchmarkText = `For equipment, 20%+ per year is good. 50%+ is great. At ${annualROI.toFixed(1)}% annually, you're doing well!`;
  } else if (isNeutral) {
    recommendation = "THIS MIGHT BE WORTH CONSIDERING";
    explanation = `This equipment pays for itself in ${breakeven.toFixed(1)} years. Year 1 impact: ${year1Impact >= 0 ? '+' : ''}$${year1Impact.toLocaleString()}. Returns are modest but positive.`;
    benchmarkText = `For equipment, 20%+ per year is good. At ${annualROI.toFixed(1)}% annually, this is borderline. Consider if there are better uses for this money.`;
  } else {
    recommendation = "THIS DOESN'T LOOK LIKE A GOOD INVESTMENT";
    explanation = `This equipment won't pay for itself within its useful life. Net loss over ${usefulYears} years: $${Math.abs(netGain).toLocaleString()}.`;
    benchmarkText = `Negative ROI means you'll lose money on this investment. Reconsider or find ways to increase savings.`;
  }

  const considerations = [
    "This assumes the savings happen right away. If there's a learning curve, it might take longer.",
    `Make sure you have cash to cover the $${equipmentCost.toLocaleString()} upfront cost.`,
    "What if it breaks? Factor in maintenance costs.",
    "Is this the best use of your money right now?"
  ];

  return {
    isGood,
    isNeutral,
    isBad,
    roi,
    breakeven,
    year1Impact,
    year2Total,
    fiveYearTotal,
    recommendation,
    explanation,
    benchmarkText,
    considerations
  };
}

// New Hire Calculations
export function calculateHireROI(inputs: HireInputs): CalculationResult {
  const { annualSalary, expectedRevenue, profitMargin, onboardingCost, payrollBenefits, rampUpMonths } = inputs;
  
  if (annualSalary <= 0 || expectedRevenue <= 0) {
    return getEmptyResult();
  }

  const payrollMultiplier = 1 + (payrollBenefits / 100);
  const totalCompensation = annualSalary * payrollMultiplier;
  
  const year1Cost = totalCompensation + onboardingCost;
  
  // Revenue with ramp-up
  const rampFactor = rampUpMonths / 12;
  const year1ProductivityFactor = 1 - (rampFactor * 0.5); // 3 months = 87.5% productivity
  const year1Revenue = expectedRevenue * year1ProductivityFactor;
  
  const year1Profit = (year1Revenue * profitMargin) / 100;
  const year1NetGain = year1Profit - year1Cost;
  
  // Year 2 (Full productivity)
  const year2Profit = (expectedRevenue * profitMargin) / 100;
  const year2NetGain = year2Profit - totalCompensation;
  
  const twoYearTotal = year1NetGain + year2NetGain;
  
  const roi = (year1NetGain / year1Cost) * 100;
  const breakeven = year1Cost / year2Profit;

  const isGood = year1NetGain > 0;
  const isNeutral = year1NetGain <= 0 && twoYearTotal > 0;
  const isBad = twoYearTotal <= 0;

  let recommendation = '';
  let explanation = '';
  let benchmarkText = '';

  if (isGood) {
    recommendation = "YES, THIS HIRE MAKES FINANCIAL SENSE";
    explanation = `This person will generate $${year1Profit.toLocaleString()} in profit. They'll cost you $${year1Cost.toLocaleString()} in Year 1 (salary + taxes + benefits + onboarding). Year 1 net impact: +$${year1NetGain.toLocaleString()}`;
    benchmarkText = "Positive in Year 1 is great! By Year 2, they should be generating even more value.";
  } else if (isNeutral) {
    recommendation = "THIS HIRE BREAKS EVEN (Might still be worth it)";
    explanation = `Year 1 net impact: -$${Math.abs(year1NetGain).toLocaleString()}. By Year 2, you'll be up $${twoYearTotal.toLocaleString()} total. This is normal for most hires.`;
    benchmarkText = "Breaking even in Year 1 is normal for most hires. By Year 2, a good hire should generate 2-3× their total cost in profit.";
  } else {
    recommendation = "THIS HIRE WILL LOSE MONEY";
    explanation = `Even after 2 years, you'll be down $${Math.abs(twoYearTotal).toLocaleString()}. The revenue doesn't justify the compensation.`;
    benchmarkText = "This hire doesn't make financial sense. Consider if they can generate more revenue or if the salary is too high.";
  }

  const considerations = [
    "This assumes they hit the revenue targets. What if they don't?",
    "Can you afford to carry this cost while they ramp up?",
    "What happens if they leave after 6 months?",
    "Are you hiring too early? (Do you have enough work for them?)"
  ];

  return {
    isGood,
    isNeutral,
    isBad,
    roi,
    breakeven,
    year1Impact: year1NetGain,
    year2Total: twoYearTotal,
    recommendation,
    explanation,
    benchmarkText,
    considerations
  };
}

// Marketing Campaign Calculations
export function calculateCampaignROI(inputs: CampaignInputs): CalculationResult {
  const { campaignCost, expectedRevenue, profitMargin, repeatRevenue } = inputs;
  
  if (campaignCost <= 0 || expectedRevenue <= 0) {
    return getEmptyResult();
  }

  const year1Profit = (expectedRevenue * profitMargin) / 100;
  const year1NetGain = year1Profit - campaignCost;
  
  const year2Profit = (repeatRevenue * profitMargin) / 100;
  const twoYearTotal = year1NetGain + year2Profit;
  
  const roi = (year1NetGain / campaignCost) * 100;
  const roiRatio = (year1Profit / campaignCost);
  const breakeven = campaignCost / (year1Profit / 12); // Months

  const isGood = roiRatio >= 2;
  const isNeutral = roiRatio >= 1 && roiRatio < 2;
  const isBad = roiRatio < 1;

  let recommendation = '';
  let explanation = '';
  let benchmarkText = '';

  if (isGood) {
    recommendation = "YES, THIS CAMPAIGN IS WORTH IT";
    explanation = `Your campaign costs $${campaignCost.toLocaleString()}. It should generate $${expectedRevenue.toLocaleString()} in sales. With a ${profitMargin}% profit margin, you'll earn $${year1Profit.toLocaleString()} in profit. Year 1 net: +$${year1NetGain.toLocaleString()}${repeatRevenue > 0 ? `. If customers buy again, Year 2 adds another $${year2Profit.toLocaleString()} in profit.` : ''}`;
    benchmarkText = `At ${roiRatio.toFixed(1)}:1, this is excellent! 5:1+ is exceptional, and you're close.`;
  } else if (isNeutral) {
    recommendation = "THIS CAMPAIGN BREAKS EVEN";
    explanation = `Your $${campaignCost.toLocaleString()} investment returns $${year1Profit.toLocaleString()} in profit. That's a ${roiRatio.toFixed(1)}:1 return—not bad for a first campaign.`;
    benchmarkText = "1:1 ROI (break even) is your minimum. 2:1 or better is healthy. For first-time campaigns, 1.5:1 is a win.";
  } else {
    recommendation = "THIS CAMPAIGN WILL LOSE MONEY";
    explanation = `You'll spend $${campaignCost.toLocaleString()} to make $${year1Profit.toLocaleString()} in profit. That's a loss of $${Math.abs(year1NetGain).toLocaleString()}.`;
    benchmarkText = "Less than 1:1 means you're losing money. Either reduce costs or increase expected response.";
  }

  const considerations = [
    "These are estimates. Your actual results might be different.",
    "Can you track results? (Use tracking links, unique phone numbers, promo codes)",
    "What if response is lower than expected?",
    "Start small, test, then scale what works."
  ];

  return {
    isGood,
    isNeutral,
    isBad,
    roi,
    breakeven,
    year1Impact: year1NetGain,
    year2Total: twoYearTotal,
    recommendation,
    explanation,
    benchmarkText,
    considerations
  };
}

function getEmptyResult(): CalculationResult {
  return {
    isGood: false,
    isNeutral: false,
    isBad: false,
    roi: 0,
    breakeven: 0,
    year1Impact: 0,
    year2Total: 0,
    recommendation: "Enter your numbers to see results",
    explanation: "Fill in the fields on the left to calculate your ROI.",
    benchmarkText: "",
    considerations: []
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
}

export function parseCurrencyInput(value: string): number {
  const cleaned = value.replace(/[^0-9.-]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : Math.max(0, parsed);
}
