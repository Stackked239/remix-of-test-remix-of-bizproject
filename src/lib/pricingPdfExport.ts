import jsPDF from 'jspdf';
import type { PricingInputs, PricingResults } from './pricingCalculations';

interface PDFExportOptions {
  inputs: PricingInputs;
  results: PricingResults;
}

// Helper to load image as base64 with dimensions
const loadImageAsBase64 = (url: string): Promise<{ base64: string; width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        resolve({
          base64: canvas.toDataURL('image/jpeg'),
          width: img.width,
          height: img.height
        });
      } else {
        reject(new Error('Could not get canvas context'));
      }
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = url;
  });
};

const formatCurrency = (value: number): string => {
  return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const formatPercent = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export async function generatePricingPdf(options: PDFExportOptions): Promise<void> {
  const { inputs, results } = options;
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
  const cautionOrange: [number, number, number] = [234, 179, 8];

  let yPos = 15;

  // Compact Header
  doc.setFillColor(bizNavy[0], bizNavy[1], bizNavy[2]);
  doc.rect(0, 0, pageWidth, 38, 'F');
  
  // Try to load and add logo image
  try {
    const logoData = await loadImageAsBase64('/assets/bizhealth-logo-pdf.jpg');
    const targetHeight = 8;
    const aspectRatio = logoData.width / logoData.height;
    const targetWidth = targetHeight * aspectRatio;
    doc.addImage(logoData.base64, 'JPEG', 15, 6, targetWidth, targetHeight);
  } catch (error) {
    doc.setTextColor(bizYellow[0], bizYellow[1], bizYellow[2]);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('BizHealth.ai', 15, 12);
  }
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Pricing Net Profit Calculator Results', 15, 22);
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Find out if your prices actually make you money.', 15, 30);

  yPos = 45;

  // Status Badge - inline with primary result
  const statusColor = results.marginHealth === 'healthy' ? bizGreen : 
                      results.marginHealth === 'caution' ? cautionOrange : dangerRed;
  const statusText = results.marginHealth === 'healthy' ? 'HEALTHY' :
                     results.marginHealth === 'caution' ? 'CAUTION' : 'LOSING $';
  
  doc.setFillColor(statusColor[0], statusColor[1], statusColor[2]);
  doc.roundedRect(15, yPos - 5, 28, 7, 1.5, 1.5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text(statusText, 18, yPos);
  
  // Primary Result: Profit Per Sale - same line
  const profitColor = results.netProfitPerUnit >= 0 ? bizGreen : dangerRed;
  doc.setTextColor(profitColor[0], profitColor[1], profitColor[2]);
  doc.setFontSize(18);
  const profitSign = results.netProfitPerUnit >= 0 ? '' : '-';
  doc.text(`${profitSign}${formatCurrency(Math.abs(results.netProfitPerUnit))} per sale`, 50, yPos);
  
  doc.setTextColor(textLight[0], textLight[1], textLight[2]);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`Net Margin: ${formatPercent(results.netMargin)}`, 130, yPos);
  
  yPos += 10;

  // Divider
  doc.setDrawColor(200, 200, 200);
  doc.line(15, yPos, pageWidth - 15, yPos);
  yPos += 6;

  // Two-column layout for compact display
  const leftCol = 15;
  const rightCol = pageWidth / 2 + 5;
  const colWidth = (pageWidth / 2) - 20;

  // LEFT COLUMN: Inputs + Monthly Snapshot
  doc.setTextColor(bizNavy[0], bizNavy[1], bizNavy[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('YOUR INPUTS', leftCol, yPos);
  
  let leftY = yPos + 6;
  const inputDetails: [string, string][] = [
    ['Selling Price:', formatCurrency(inputs.sellingPrice)],
    ['Direct Cost:', formatCurrency(inputs.directCost)],
    ['Overhead/Sale:', formatCurrency(inputs.overheadPerSale)],
    ['Monthly Volume:', `${inputs.monthlyUnits} units`],
  ];

  doc.setFontSize(8);
  inputDetails.forEach(([label, value]) => {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textLight[0], textLight[1], textLight[2]);
    doc.text(label, leftCol, leftY);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(value, leftCol + 35, leftY);
    leftY += 5;
  });

  leftY += 4;
  doc.setTextColor(bizNavy[0], bizNavy[1], bizNavy[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('MONTHLY SNAPSHOT', leftCol, leftY);
  leftY += 6;

  const monthlyDetails: [string, string][] = [
    ['Revenue:', formatCurrency(results.monthlyRevenue)],
    ['Direct Costs:', formatCurrency(results.monthlyDirectCosts)],
    ['Overhead:', formatCurrency(results.monthlyOverhead)],
    ['Net Profit:', formatCurrency(results.monthlyNetProfit)],
  ];

  if (results.breakEvenUnits !== null && results.breakEvenUnits > 0) {
    monthlyDetails.push(['Break-Even:', `${results.breakEvenUnits} sales`]);
  }

  doc.setFontSize(8);
  monthlyDetails.forEach(([label, value]) => {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textLight[0], textLight[1], textLight[2]);
    doc.text(label, leftCol, leftY);
    doc.setFont('helvetica', 'bold');
    const valueColor = label === 'Net Profit:' 
      ? (results.monthlyNetProfit >= 0 ? bizGreen : dangerRed)
      : textDark;
    doc.setTextColor(valueColor[0], valueColor[1], valueColor[2]);
    doc.text(value, leftCol + 35, leftY);
    leftY += 5;
  });

  // RIGHT COLUMN: What This Means + Next Steps
  doc.setTextColor(bizNavy[0], bizNavy[1], bizNavy[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('WHAT THIS MEANS', rightCol, yPos);
  
  let rightY = yPos + 6;
  const cleanInterpretation = results.interpretation.replace(/[⚠️🟡✅🎉]/g, '').trim();
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  const interpretationLines = doc.splitTextToSize(cleanInterpretation, colWidth);
  doc.text(interpretationLines, rightCol, rightY);
  rightY += interpretationLines.length * 4 + 6;

  doc.setTextColor(bizNavy[0], bizNavy[1], bizNavy[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('NEXT STEPS', rightCol, rightY);
  rightY += 6;

  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  
  results.actions.slice(0, 4).forEach((action) => {
    const lines = doc.splitTextToSize(`• ${action}`, colWidth);
    doc.text(lines, rightCol, rightY);
    rightY += lines.length * 4 + 1;
  });

  // Footer - positioned at bottom
  const footerY = pageHeight - 12;
  doc.setDrawColor(200, 200, 200);
  doc.line(15, footerY - 6, pageWidth - 15, footerY - 6);
  
  doc.setTextColor(textLight[0], textLight[1], textLight[2]);
  doc.setFontSize(6);
  doc.setFont('helvetica', 'normal');
  doc.text('This calculator provides estimates for educational purposes. Consult a financial advisor for specific guidance.', 15, footerY - 1);
  
  doc.setTextColor(bizNavy[0], bizNavy[1], bizNavy[2]);
  doc.setFont('helvetica', 'bold');
  doc.text(`Generated: ${new Date().toLocaleDateString()} | bizhealth.ai`, 15, footerY + 4);

  // Save
  const filename = `Pricing-Analysis-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
}
