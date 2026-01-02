import jsPDF from 'jspdf';
import type { ScenarioType, CalculationResult, EquipmentInputs, HireInputs, CampaignInputs } from './roiCalculations';
import { formatCurrency, formatPercent } from './roiCalculations';

interface PDFExportOptions {
  scenario: ScenarioType;
  result: CalculationResult;
  inputs: EquipmentInputs | HireInputs | CampaignInputs;
}

export function generateROIPdf(options: PDFExportOptions): void {
  const { scenario, result, inputs } = options;
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Colors as tuples for TypeScript
  const bizNavy: [number, number, number] = [33, 38, 83];
  const bizGreen: [number, number, number] = [150, 148, 35];
  const bizYellow: [number, number, number] = [230, 184, 0];
  const textDark: [number, number, number] = [50, 50, 50];
  const textLight: [number, number, number] = [120, 120, 120];
  const dangerRed: [number, number, number] = [220, 38, 38];

  let yPos = 20;

  // Header
  doc.setFillColor(bizNavy[0], bizNavy[1], bizNavy[2]);
  doc.rect(0, 0, pageWidth, 50, 'F');
  
  // Logo text (BizHealth.ai branding)
  doc.setTextColor(bizYellow[0], bizYellow[1], bizYellow[2]);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('BizHealth.ai', 20, 18);
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('ROI Calculator Results', 20, 32);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Stop Guessing, Start Growing.', 20, 42);

  yPos = 60;

  // Scenario Badge
  const scenarioLabels: Record<ScenarioType, string> = {
    equipment: 'Equipment Investment',
    hire: 'New Hire',
    campaign: 'Marketing Campaign',
  };
  
  doc.setFillColor(bizYellow[0], bizYellow[1], bizYellow[2]);
  doc.roundedRect(20, yPos, 60, 8, 2, 2, 'F');
  doc.setTextColor(bizNavy[0], bizNavy[1], bizNavy[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(scenarioLabels[scenario], 25, yPos + 5.5);
  
  yPos += 20;

  // Main Result - wrap long recommendation text (use ASCII-safe icons)
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  
  const resultIcon = result.isGood ? '[YES]' : result.isNeutral ? '[MAYBE]' : '[NO]';
  const recommendationText = `${resultIcon} ${result.recommendation}`;
  const recommendationLines = doc.splitTextToSize(recommendationText, pageWidth - 40);
  doc.text(recommendationLines, 20, yPos);
  yPos += recommendationLines.length * 5 + 4;
  
  // ROI Value
  const roiColor = result.isGood ? bizGreen : result.isNeutral ? bizYellow : dangerRed;
  doc.setTextColor(roiColor[0], roiColor[1], roiColor[2]);
  doc.setFontSize(24);
  doc.text(formatPercent(result.roi), 20, yPos);
  
  doc.setTextColor(textLight[0], textLight[1], textLight[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(scenario === 'equipment' ? `over ${(inputs as EquipmentInputs).usefulYears || 5} years` : 'Year 1 ROI', 65, yPos - 2);
  
  yPos += 14;

  // Divider
  doc.setDrawColor(200, 200, 200);
  doc.line(20, yPos, pageWidth - 20, yPos);
  yPos += 10;

  // What This Means
  doc.setTextColor(bizNavy[0], bizNavy[1], bizNavy[2]);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('WHAT THIS MEANS', 20, yPos);
  yPos += 8;
  
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  const explanationLines = doc.splitTextToSize(result.explanation, pageWidth - 40);
  doc.text(explanationLines, 20, yPos);
  yPos += explanationLines.length * 5 + 6;

  // The Details
  doc.setTextColor(bizNavy[0], bizNavy[1], bizNavy[2]);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('THE DETAILS', 20, yPos);
  yPos += 10;

  const details: [string, string][] = [
    ['Break-even:', `${result.breakeven.toFixed(1)} ${scenario === 'campaign' ? 'months' : 'years'}`],
    ['Year 1 Impact:', formatCurrency(result.year1Impact)],
    ['2-Year Total:', formatCurrency(result.year2Total)],
  ];
  
  if (result.fiveYearTotal !== undefined) {
    details.push(['5-Year Total:', formatCurrency(result.fiveYearTotal)]);
  }

  doc.setFontSize(11);
  details.forEach(([label, value]) => {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textLight[0], textLight[1], textLight[2]);
    doc.text(label, 20, yPos);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(value, 70, yPos);
    yPos += 7;
  });

  yPos += 6;

  // Input Summary
  doc.setTextColor(bizNavy[0], bizNavy[1], bizNavy[2]);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('YOUR INPUTS', 20, yPos);
  yPos += 10;

  let inputDetails: [string, string][] = [];
  
  if (scenario === 'equipment') {
    const eq = inputs as EquipmentInputs;
    inputDetails = [
      ['Equipment Cost:', formatCurrency(eq.equipmentCost)],
      ['Annual Savings:', formatCurrency(eq.annualSavings)],
      ['Useful Years:', `${eq.usefulYears} years`],
    ];
  } else if (scenario === 'hire') {
    const hire = inputs as HireInputs;
    inputDetails = [
      ['Annual Salary:', formatCurrency(hire.annualSalary)],
      ['Expected Revenue:', formatCurrency(hire.expectedRevenue)],
      ['Profit Margin:', `${hire.profitMargin}%`],
      ['Onboarding Cost:', formatCurrency(hire.onboardingCost)],
    ];
  } else {
    const camp = inputs as CampaignInputs;
    inputDetails = [
      ['Campaign Cost:', formatCurrency(camp.campaignCost)],
      ['Expected Revenue:', formatCurrency(camp.expectedRevenue)],
      ['Profit Margin:', `${camp.profitMargin}%`],
      ['Repeat Revenue:', formatCurrency(camp.repeatRevenue)],
    ];
  }

  doc.setFontSize(11);
  inputDetails.forEach(([label, value]) => {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textLight[0], textLight[1], textLight[2]);
    doc.text(label, 20, yPos);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(value, 70, yPos);
    yPos += 7;
  });

  yPos += 8;

  // Things to Think About
  if (result.considerations.length > 0) {
    doc.setTextColor(bizNavy[0], bizNavy[1], bizNavy[2]);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('THINGS TO THINK ABOUT', 20, yPos);
    yPos += 10;

    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    result.considerations.forEach((consideration) => {
      const lines = doc.splitTextToSize(`• ${consideration}`, pageWidth - 45);
      doc.text(lines, 20, yPos);
      yPos += lines.length * 5 + 3;
    });
  }

  // Check if content exceeds footer area, add new page if needed
  const footerY = pageHeight - 20;
  if (yPos > footerY - 30) {
    doc.addPage();
    yPos = 20;
  }

  // Footer
  doc.setDrawColor(200, 200, 200);
  doc.line(20, footerY - 10, pageWidth - 20, footerY - 10);
  
  doc.setTextColor(textLight[0], textLight[1], textLight[2]);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text('This calculator provides simplified estimates for planning purposes. Actual results may vary.', 20, footerY - 4);
  doc.text('For major financial decisions, consult with a financial advisor.', 20, footerY + 1);
  
  doc.setTextColor(bizNavy[0], bizNavy[1], bizNavy[2]);
  doc.setFont('helvetica', 'bold');
  doc.text(`Generated: ${new Date().toLocaleDateString()} | bizhealth.ai`, 20, footerY + 7);

  // Save
  const filename = `ROI-Calculator-${scenarioLabels[scenario].replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
}
