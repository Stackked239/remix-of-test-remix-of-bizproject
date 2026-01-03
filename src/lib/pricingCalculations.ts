// Pricing Net Profit Calculator - Core Calculations

export interface PricingInputs {
  sellingPrice: number;
  directCost: number;
  overheadPerSale: number;
  monthlyUnits: number;
}

export interface OverheadHelperInputs {
  monthlyRent: number;
  monthlyUtilities: number;
  monthlyInsurance: number;
  monthlySoftware: number;
  monthlyVehicle: number;
  monthlyOther: number;
  overheadSalesVolume: number;
}

export interface PricingResults {
  grossProfitPerUnit: number;
  grossMargin: number;
  netProfitPerUnit: number;
  netMargin: number;
  monthlyRevenue: number;
  monthlyDirectCosts: number;
  monthlyOverhead: number;
  monthlyGrossProfit: number;
  monthlyNetProfit: number;
  breakEvenUnits: number | null;
  isProfitable: boolean;
  marginHealth: 'healthy' | 'caution' | 'danger';
  interpretation: string;
  actions: string[];
}

export const calculateOverheadPerSale = (inputs: OverheadHelperInputs): number => {
  const totalMonthlyOverhead = 
    inputs.monthlyRent +
    inputs.monthlyUtilities +
    inputs.monthlyInsurance +
    inputs.monthlySoftware +
    inputs.monthlyVehicle +
    inputs.monthlyOther;
  
  if (inputs.overheadSalesVolume <= 0) return 0;
  return totalMonthlyOverhead / inputs.overheadSalesVolume;
};

export const getInterpretation = (margin: number, netProfit: number): string => {
  if (netProfit < 0) {
    return `⚠️ You're losing $${Math.abs(netProfit).toFixed(2)} on every sale. This means the more you sell, the more money you lose. You need to either raise your price, lower your costs, or both. This is urgent to fix.`;
  }
  
  if (margin < 5) {
    return `🟡 You're barely breaking even. At ${margin.toFixed(1)}% margin, one unexpected cost or slow month could push you into losses. Most healthy businesses need at least 15-20% margins to survive and grow. Consider raising prices or cutting costs.`;
  }
  
  if (margin < 15) {
    return `🟡 Your margins are thin at ${margin.toFixed(1)}%. You're making money, but there's not much cushion for surprises. Many business experts recommend 15-20% minimum. You might want to look at ways to increase this.`;
  }
  
  if (margin < 25) {
    return `✅ Nice! At ${margin.toFixed(1)}% margin, you're in healthy territory. You're keeping about ${Math.round(margin)} cents from every dollar. This gives you room to handle slow periods and invest back into your business.`;
  }
  
  return `🎉 Excellent! ${margin.toFixed(1)}% is a strong profit margin. You're keeping ${Math.round(margin)} cents from every dollar. Make sure your prices aren't so high that you're losing potential customers, but if sales are good, keep doing what you're doing!`;
};

export const getActions = (margin: number, netProfit: number): string[] => {
  const actions: string[] = [];
  
  if (netProfit < 0) {
    actions.push("Calculate your minimum viable price using our pricing formula guide");
    actions.push("List 3 costs you could reduce without hurting quality");
    actions.push("Research what competitors charge for similar offerings");
  } else if (margin < 15) {
    actions.push("Try raising prices 10-15% and see if customers still buy");
    actions.push("Look for ways to reduce your direct costs by 5-10%");
    actions.push("Consider which low-margin products/services to phase out");
  } else {
    actions.push("Document this pricing so you can replicate it");
    actions.push("Test whether you could increase volume at this price point");
    actions.push("Consider premium versions with even higher margins");
  }
  
  actions.push("Run this calculator for your other products/services");
  
  return actions;
};

export const calculatePricingResults = (inputs: PricingInputs): PricingResults | null => {
  const { sellingPrice, directCost, overheadPerSale, monthlyUnits } = inputs;
  
  // Need valid selling price and monthly units
  if (sellingPrice <= 0 || monthlyUnits <= 0) {
    return null;
  }
  
  // Gross Profit (before overhead)
  const grossProfitPerUnit = sellingPrice - directCost;
  const grossMargin = (grossProfitPerUnit / sellingPrice) * 100;
  
  // Net Profit (after overhead)
  const netProfitPerUnit = sellingPrice - directCost - overheadPerSale;
  const netMargin = (netProfitPerUnit / sellingPrice) * 100;
  
  // Monthly figures
  const monthlyRevenue = sellingPrice * monthlyUnits;
  const monthlyDirectCosts = directCost * monthlyUnits;
  const monthlyOverhead = overheadPerSale * monthlyUnits;
  const monthlyGrossProfit = grossProfitPerUnit * monthlyUnits;
  const monthlyNetProfit = netProfitPerUnit * monthlyUnits;
  
  // Break-even: sales needed to cover total overhead
  // breakEvenUnits = Fixed Costs / Contribution Margin per Unit
  const contributionMargin = sellingPrice - directCost;
  let breakEvenUnits: number | null = null;
  
  if (contributionMargin > 0 && monthlyOverhead > 0) {
    breakEvenUnits = Math.ceil(monthlyOverhead / contributionMargin);
  } else if (monthlyOverhead === 0) {
    breakEvenUnits = 0; // No overhead to cover
  }
  
  // Determine margin health
  let marginHealth: 'healthy' | 'caution' | 'danger' = 'danger';
  if (netMargin >= 15) {
    marginHealth = 'healthy';
  } else if (netMargin >= 5) {
    marginHealth = 'caution';
  }
  
  return {
    grossProfitPerUnit,
    grossMargin,
    netProfitPerUnit,
    netMargin,
    monthlyRevenue,
    monthlyDirectCosts,
    monthlyOverhead,
    monthlyGrossProfit,
    monthlyNetProfit,
    breakEvenUnits,
    isProfitable: netProfitPerUnit > 0,
    marginHealth,
    interpretation: getInterpretation(netMargin, netProfitPerUnit),
    actions: getActions(netMargin, netProfitPerUnit),
  };
};
