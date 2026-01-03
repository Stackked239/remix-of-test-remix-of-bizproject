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

  let yPos = 20;

  // Header
  doc.setFillColor(bizNavy[0], bizNavy[1], bizNavy[2]);
  doc.rect(0, 0, pageWidth, 50, 'F');
  
  // Try to load and add logo image
  try {
    const logoData = await loadImageAsBase64('/assets/bizhealth-logo-pdf.jpg');
    const targetHeight = 10;
    const aspectRatio = logoData.width / logoData.height;
    const targetWidth = targetHeight * aspectRatio;
    doc.addImage(logoData.base64, 'JPEG', 20, 8, targetWidth, targetHeight);
  } catch (error) {
    // Fallback to text if image fails to load
    doc.setTextColor(bizYellow[0], bizYellow[1], bizYellow[2]);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('BizHealth.ai', 20, 18);
  }
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Pricing Net Profit Calculator Results', 20, 30);
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Find out if your prices actually make you money.', 20, 40);

  yPos = 58;

  // Status Badge
  const statusColor = results.marginHealth === 'healthy' ? bizGreen : 
                      results.marginHealth === 'caution' ? cautionOrange : dangerRed;
  const statusText = results.marginHealth === 'healthy' ? 'Healthy Margins' :
                     results.marginHealth === 'caution' ? 'Thin Margins' : 'Losing Money';
  
  doc.setFillColor(statusColor[0], statusColor[1], statusColor[2]);
  doc.roundedRect(20, yPos, 50, 8, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(statusText, 25, yPos + 5.5);
  
  yPos += 18;

  // Primary Result: Profit Per Sale
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('YOUR PROFIT PER SALE', 20, yPos);
  yPos += 8;
  
  const profitColor = results.netProfitPerUnit >= 0 ? bizGreen : dangerRed;
  doc.setTextColor(profitColor[0], profitColor[1], profitColor[2]);
  doc.setFontSize(24);
  const profitSign = results.netProfitPerUnit >= 0 ? '' : '-';
  doc.text(`${profitSign}${formatCurrency(Math.abs(results.netProfitPerUnit))}`, 20, yPos);
  
  doc.setTextColor(textLight[0], textLight[1], textLight[2]);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('What you actually keep after all costs', 75, yPos - 2);
  
  yPos += 12;

  // Profit Margin
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`Your Profit Margin: ${formatPercent(results.netMargin)}`, 20, yPos);
  
  yPos += 8;

  // Divider
  doc.setDrawColor(200, 200, 200);
  doc.line(20, yPos, pageWidth - 20, yPos);
  yPos += 8;

  // What This Means
  doc.setTextColor(bizNavy[0], bizNavy[1], bizNavy[2]);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('WHAT THIS MEANS', 20, yPos);
  yPos += 8;
  
  // Remove emoji from interpretation for PDF
  const cleanInterpretation = results.interpretation.replace(/[⚠️🟡✅🎉]/g, '').trim();
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const interpretationLines = doc.splitTextToSize(cleanInterpretation, pageWidth - 40);
  doc.text(interpretationLines, 20, yPos);
  yPos += interpretationLines.length * 5 + 8;

  // Monthly Snapshot
  doc.setTextColor(bizNavy[0], bizNavy[1], bizNavy[2]);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('MONTHLY SNAPSHOT', 20, yPos);
  yPos += 10;

  const monthlyDetails: [string, string][] = [
    ['Monthly Revenue:', formatCurrency(results.monthlyRevenue)],
    ['Monthly Direct Costs:', formatCurrency(results.monthlyDirectCosts)],
    ['Monthly Overhead:', formatCurrency(results.monthlyOverhead)],
    ['Monthly Net Profit:', formatCurrency(results.monthlyNetProfit)],
  ];

  if (results.breakEvenUnits !== null && results.breakEvenUnits > 0) {
    monthlyDetails.push(['Break-Even Point:', `${results.breakEvenUnits} sales`]);
  }

  doc.setFontSize(10);
  monthlyDetails.forEach(([label, value]) => {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textLight[0], textLight[1], textLight[2]);
    doc.text(label, 20, yPos);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(value, 75, yPos);
    yPos += 6;
  });

  yPos += 6;

  // Your Inputs
  doc.setTextColor(bizNavy[0], bizNavy[1], bizNavy[2]);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('YOUR INPUTS', 20, yPos);
  yPos += 10;

  const inputDetails: [string, string][] = [
    ['Selling Price:', formatCurrency(inputs.sellingPrice)],
    ['Direct Cost:', formatCurrency(inputs.directCost)],
    ['Overhead Per Sale:', formatCurrency(inputs.overheadPerSale)],
    ['Monthly Sales Volume:', `${inputs.monthlyUnits} units`],
  ];

  doc.setFontSize(10);
  inputDetails.forEach(([label, value]) => {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textLight[0], textLight[1], textLight[2]);
    doc.text(label, 20, yPos);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(value, 70, yPos);
    yPos += 6;
  });

  yPos += 8;

  // Suggested Next Steps
  doc.setTextColor(bizNavy[0], bizNavy[1], bizNavy[2]);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('SUGGESTED NEXT STEPS', 20, yPos);
  yPos += 10;

  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  results.actions.forEach((action) => {
    const lines = doc.splitTextToSize(`• ${action}`, pageWidth - 45);
    doc.text(lines, 20, yPos);
    yPos += lines.length * 5 + 2;
  });

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
  doc.text('This calculator provides estimates for educational purposes. Results should not be considered financial advice.', 20, footerY - 4);
  doc.text('Consult with a qualified accountant or financial advisor for specific guidance.', 20, footerY + 1);
  
  doc.setTextColor(bizNavy[0], bizNavy[1], bizNavy[2]);
  doc.setFont('helvetica', 'bold');
  doc.text(`Generated: ${new Date().toLocaleDateString()} | bizhealth.ai`, 20, footerY + 7);

  // Save
  const filename = `Pricing-Net-Profit-Analysis-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
}
