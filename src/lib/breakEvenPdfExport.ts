import jsPDF from 'jspdf';
import { BreakEvenInputs, BreakEvenResult, formatCurrency, formatNumber, getMarginHealthStatus } from './breakEvenCalculations';

interface BreakEvenPdfData {
  inputs: BreakEvenInputs;
  result: BreakEvenResult;
}

export async function generateBreakEvenPdf(data: BreakEvenPdfData): Promise<void> {
  const { inputs, result } = data;
  const doc = new jsPDF();
  
  const businessName = inputs.businessName || 'Your Business';
  const timestamp = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const marginHealth = getMarginHealthStatus(result.contributionMarginPercent);
  
  // Colors
  const navyColor: [number, number, number] = [31, 33, 33];
  const tealColor: [number, number, number] = [12, 199, 211];
  const greyColor: [number, number, number] = [127, 140, 140];
  
  let yPos = 20;
  
  // Header
  doc.setFillColor(...tealColor);
  doc.rect(0, 0, 210, 45, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('BizHealth.ai', 20, 15);
  
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('Break-Even Analysis Report', 20, 30);
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated: ${timestamp}`, 20, 40);
  
  yPos = 60;
  
  // Business Name
  doc.setTextColor(...navyColor);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(`Business: ${businessName}`, 20, yPos);
  yPos += 15;
  
  // Divider
  doc.setDrawColor(...tealColor);
  doc.setLineWidth(0.5);
  doc.line(20, yPos, 190, yPos);
  yPos += 15;
  
  // Financial Inputs Section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Your Financial Inputs', 20, yPos);
  yPos += 10;
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...greyColor);
  
  const inputsData = [
    ['Monthly Fixed Costs:', formatCurrency(inputs.monthlyFixedCosts)],
    ['Variable Cost Per Unit:', formatCurrency(inputs.variableCostPerUnit)],
    ['Price Per Unit:', formatCurrency(inputs.pricePerUnit)],
  ];
  
  inputsData.forEach(([label, value]) => {
    doc.text(label, 25, yPos);
    doc.setTextColor(...navyColor);
    doc.setFont('helvetica', 'bold');
    doc.text(value, 100, yPos);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...greyColor);
    yPos += 8;
  });
  
  yPos += 10;
  
  // Divider
  doc.setDrawColor(200, 200, 200);
  doc.line(20, yPos, 190, yPos);
  yPos += 15;
  
  // Results Section
  doc.setTextColor(...navyColor);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Break-Even Results', 20, yPos);
  yPos += 15;
  
  // Results boxes
  const boxWidth = 80;
  const boxHeight = 30;
  const boxGap = 10;
  
  // Row 1
  doc.setFillColor(245, 250, 250);
  doc.roundedRect(20, yPos, boxWidth, boxHeight, 3, 3, 'F');
  doc.roundedRect(20 + boxWidth + boxGap, yPos, boxWidth, boxHeight, 3, 3, 'F');
  
  doc.setFontSize(9);
  doc.setTextColor(...greyColor);
  doc.text('UNITS TO BREAK EVEN', 25, yPos + 10);
  doc.text('REVENUE AT BREAK-EVEN', 25 + boxWidth + boxGap, yPos + 10);
  
  doc.setFontSize(16);
  doc.setTextColor(...tealColor);
  doc.setFont('helvetica', 'bold');
  doc.text(formatNumber(result.breakEvenUnits), 25, yPos + 23);
  doc.text(formatCurrency(result.breakEvenRevenue), 25 + boxWidth + boxGap, yPos + 23);
  
  yPos += boxHeight + 10;
  
  // Row 2
  doc.setFillColor(245, 250, 250);
  doc.roundedRect(20, yPos, boxWidth, boxHeight, 3, 3, 'F');
  doc.roundedRect(20 + boxWidth + boxGap, yPos, boxWidth, boxHeight, 3, 3, 'F');
  
  doc.setFontSize(9);
  doc.setTextColor(...greyColor);
  doc.setFont('helvetica', 'normal');
  doc.text('CONTRIBUTION MARGIN', 25, yPos + 10);
  doc.text('MARGIN HEALTH', 25 + boxWidth + boxGap, yPos + 10);
  
  doc.setFontSize(16);
  doc.setTextColor(...tealColor);
  doc.setFont('helvetica', 'bold');
  doc.text(`${result.contributionMarginPercent.toFixed(1)}%`, 25, yPos + 23);
  doc.text(marginHealth.label, 25 + boxWidth + boxGap, yPos + 23);
  
  yPos += boxHeight + 20;
  
  // Key Takeaway
  doc.setFillColor(...tealColor);
  doc.roundedRect(20, yPos, 170, 35, 3, 3, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('KEY TAKEAWAY', 30, yPos + 12);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const takeawayText = `You must sell ${formatNumber(result.breakEvenUnits)} units monthly (${formatCurrency(result.breakEvenRevenue)} revenue) to cover all costs. Each sale contributes ${formatCurrency(result.contributionMarginDollars)} toward fixed costs and profit.`;
  const splitTakeaway = doc.splitTextToSize(takeawayText, 155);
  doc.text(splitTakeaway, 30, yPos + 22);
  
  yPos += 50;
  
  // Annual Projections
  doc.setTextColor(...navyColor);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Annual Projections', 20, yPos);
  yPos += 10;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...greyColor);
  doc.text(`Annual Break-Even Units: ${formatNumber(result.annualBreakEvenUnits)}`, 25, yPos);
  yPos += 7;
  doc.text(`Annual Break-Even Revenue: ${formatCurrency(result.annualBreakEvenRevenue)}`, 25, yPos);
  yPos += 7;
  doc.text(`Profit Per Unit Sold: ${formatCurrency(result.profitPerUnit)}`, 25, yPos);
  
  yPos += 20;
  
  // Footer
  doc.setDrawColor(...tealColor);
  doc.line(20, yPos, 190, yPos);
  yPos += 10;
  
  doc.setFontSize(9);
  doc.setTextColor(...greyColor);
  doc.text('This analysis is for planning purposes. Actual results may vary.', 20, yPos);
  yPos += 5;
  doc.text('Revisit quarterly as your business evolves.', 20, yPos);
  yPos += 10;
  
  doc.setTextColor(...tealColor);
  doc.setFont('helvetica', 'bold');
  doc.text('BizHealth.ai - Know Your Business Health', 20, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text('bizhealth.ai', 130, yPos);
  
  // Save
  const filename = `${businessName.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-break-even-analysis.pdf`;
  doc.save(filename);
}
