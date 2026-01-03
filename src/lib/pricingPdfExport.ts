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
  doc.rect(0, 0, pageWidth, 32, 'F');
  
  // Try to load and add logo image
  try {
    const logoData = await loadImageAsBase64('/assets/bizhealth-logo-pdf.jpg');
    const targetHeight = 8;
    const aspectRatio = logoData.width / logoData.height;
    const targetWidth = targetHeight * aspectRatio;
    doc.addImage(logoData.base64, 'JPEG', 15, 5, targetWidth, targetHeight);
  } catch (error) {
    doc.setTextColor(bizYellow[0], bizYellow[1], bizYellow[2]);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('BizHealth.ai', 15, 10);
  }
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Pricing Net Profit Calculator Results', 15, 20);
  
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text('Find out if your prices actually make you money.', 15, 26);

  yPos = 38;

  // Status Badge
  const statusColor = results.marginHealth === 'healthy' ? bizGreen : 
                      results.marginHealth === 'caution' ? cautionOrange : dangerRed;
  const statusText = results.marginHealth === 'healthy' ? 'Healthy Margins' :
                     results.marginHealth === 'caution' ? 'Thin Margins' : 'Losing Money';
  
  doc.setFillColor(statusColor[0], statusColor[1], statusColor[2]);
  doc.roundedRect(15, yPos, 40, 6, 1.5, 1.5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text(statusText, 18, yPos + 4);
  
  yPos += 12;

  // Primary Result: Profit Per Sale
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('YOUR PROFIT PER SALE', 15, yPos);
  yPos += 6;
  
  const profitColor = results.netProfitPerUnit >= 0 ? bizGreen : dangerRed;
  doc.setTextColor(profitColor[0], profitColor[1], profitColor[2]);
  doc.setFontSize(20);
  const profitSign = results.netProfitPerUnit >= 0 ? '' : '-';
  doc.text(`${profitSign}${formatCurrency(Math.abs(results.netProfitPerUnit))}`, 15, yPos);
  
  doc.setTextColor(textLight[0], textLight[1], textLight[2]);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('What you actually keep after all costs', 60, yPos - 2);
  
  yPos += 6;

  // Profit Margin
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(`Your Profit Margin: ${formatPercent(results.netMargin)}`, 15, yPos);
  
  yPos += 5;

  // Divider
  doc.setDrawColor(200, 200, 200);
  doc.line(15, yPos, pageWidth - 15, yPos);
  yPos += 5;

  // What This Means
  doc.setTextColor(bizNavy[0], bizNavy[1], bizNavy[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('WHAT THIS MEANS', 15, yPos);
  yPos += 5;
  
  const cleanInterpretation = results.interpretation.replace(/[⚠️🟡✅🎉]/g, '').trim();
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  const interpretationLines = doc.splitTextToSize(cleanInterpretation, pageWidth - 30);
  doc.text(interpretationLines, 15, yPos);
  yPos += interpretationLines.length * 4 + 4;

  // Monthly Snapshot
  doc.setTextColor(bizNavy[0], bizNavy[1], bizNavy[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('MONTHLY SNAPSHOT', 15, yPos);
  yPos += 5;

  const monthlyDetails: [string, string][] = [
    ['Monthly Revenue:', formatCurrency(results.monthlyRevenue)],
    ['Monthly Direct Costs:', formatCurrency(results.monthlyDirectCosts)],
    ['Monthly Overhead:', formatCurrency(results.monthlyOverhead)],
    ['Monthly Net Profit:', formatCurrency(results.monthlyNetProfit)],
  ];

  if (results.breakEvenUnits !== null && results.breakEvenUnits > 0) {
    monthlyDetails.push(['Break-Even Point:', `${results.breakEvenUnits} sales`]);
  }

  doc.setFontSize(8);
  monthlyDetails.forEach(([label, value]) => {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textLight[0], textLight[1], textLight[2]);
    doc.text(label, 15, yPos);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(value, 60, yPos);
    yPos += 4;
  });

  yPos += 3;

  // Your Inputs
  doc.setTextColor(bizNavy[0], bizNavy[1], bizNavy[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('YOUR INPUTS', 15, yPos);
  yPos += 5;

  const inputDetails: [string, string][] = [
    ['Selling Price:', formatCurrency(inputs.sellingPrice)],
    ['Direct Cost:', formatCurrency(inputs.directCost)],
    ['Overhead Per Sale:', formatCurrency(inputs.overheadPerSale)],
    ['Monthly Sales Volume:', `${inputs.monthlyUnits} units`],
  ];

  doc.setFontSize(8);
  inputDetails.forEach(([label, value]) => {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textLight[0], textLight[1], textLight[2]);
    doc.text(label, 15, yPos);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(value, 55, yPos);
    yPos += 4;
  });

  yPos += 3;

  // Suggested Next Steps
  doc.setTextColor(bizNavy[0], bizNavy[1], bizNavy[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('SUGGESTED NEXT STEPS', 15, yPos);
  yPos += 5;

  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  
  results.actions.forEach((action) => {
    const lines = doc.splitTextToSize(`• ${action}`, pageWidth - 30);
    doc.text(lines, 15, yPos);
    yPos += lines.length * 4 + 1;
  });

  // Professional Branded Footer
  const footerY = pageHeight - 28;
  
  // Footer background
  doc.setFillColor(bizNavy[0], bizNavy[1], bizNavy[2]);
  doc.rect(0, footerY - 4, pageWidth, 32, 'F');
  
  // Disclaimer text
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(6);
  doc.setFont('helvetica', 'normal');
  doc.text('This calculator provides estimates for educational purposes only. Results should not be considered financial advice.', 15, footerY + 2);
  doc.text('Consult with a qualified accountant or financial advisor for specific guidance on your business finances.', 15, footerY + 6);
  
  // Divider line in footer
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.2);
  doc.line(15, footerY + 10, pageWidth - 15, footerY + 10);
  
  // Brand info
  doc.setTextColor(bizYellow[0], bizYellow[1], bizYellow[2]);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('BizHealth.ai', 15, footerY + 17);
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text('Your Trusted Business Health Advisor', 15, footerY + 22);
  
  // Right side: date and URL
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth - 55, footerY + 17);
  doc.setTextColor(bizYellow[0], bizYellow[1], bizYellow[2]);
  doc.text('bizhealth.ai', pageWidth - 55, footerY + 22);

  // Save
  const filename = `Pricing-Net-Profit-Analysis-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
}
