import jsPDF from 'jspdf';
import { 
  CashFlowInputs, 
  CashFlowResult, 
  formatCurrency, 
  getHealthStatus, 
  generateInsights 
} from './cashFlowCalculations';

interface PdfExportParams {
  inputs: CashFlowInputs;
  result: CashFlowResult;
  userName?: string;
  userEmail?: string;
}

export async function generateCashFlowPdf({ inputs, result, userName, userEmail }: PdfExportParams): Promise<void> {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  
  const bizBlue = '#242553';
  const bizGreen = '#969423';
  const bizGrey = '#7C7C7C';
  const danger = '#dc2626';
  const warning = '#f59e0b';
  const success = '#16a34a';
  
  const healthStatus = getHealthStatus(result.summary);
  const insights = generateInsights(result.summary);
  
  let y = margin;

  // Helper functions
  const addHeader = () => {
    pdf.setFillColor(36, 37, 83);
    pdf.rect(0, 0, pageWidth, 40, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text('BizHealth.ai', margin, 25);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text('12-Month Cash Flow Projection Report', pageWidth - margin, 25, { align: 'right' });
    return 50;
  };

  const addFooter = (pageNum: number) => {
    pdf.setFontSize(8);
    pdf.setTextColor(124, 124, 124);
    pdf.text(`Page ${pageNum} | Generated ${new Date().toLocaleDateString()} | BizHealth.ai`, pageWidth / 2, pageHeight - 10, { align: 'center' });
  };

  const checkNewPage = (requiredSpace: number, currentY: number, pageNum: number): { y: number; pageNum: number } => {
    if (currentY + requiredSpace > pageHeight - 25) {
      addFooter(pageNum);
      pdf.addPage();
      pageNum++;
      return { y: addHeader(), pageNum };
    }
    return { y: currentY, pageNum };
  };

  // ===================== PAGE 1: Executive Summary =====================
  let pageNum = 1;
  y = addHeader();
  
  // Title section
  pdf.setTextColor(36, 37, 83);
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Cash Flow Projection Report', margin, y);
  y += 10;
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(124, 124, 124);
  const businessName = inputs.businessName || 'Your Business';
  const preparedFor = userName ? `Prepared for ${userName}` : '';
  pdf.text(`${businessName}${preparedFor ? ` | ${preparedFor}` : ''}`, margin, y);
  y += 15;

  // Health Status Banner
  const statusColor = healthStatus.status === 'danger' ? danger : healthStatus.status === 'warning' ? warning : success;
  pdf.setFillColor(statusColor === danger ? 220 : statusColor === warning ? 245 : 22, 
                   statusColor === danger ? 38 : statusColor === warning ? 158 : 163,
                   statusColor === danger ? 38 : statusColor === warning ? 11 : 74);
  pdf.roundedRect(margin, y, contentWidth, 25, 3, 3, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text(healthStatus.title, margin + 10, y + 10);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  const wrappedMessage = pdf.splitTextToSize(healthStatus.message, contentWidth - 20);
  pdf.text(wrappedMessage[0], margin + 10, y + 18);
  y += 35;

  // Key Metrics Grid
  pdf.setTextColor(36, 37, 83);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Key Metrics', margin, y);
  y += 10;

  const metricBoxWidth = (contentWidth - 10) / 2;
  const metricBoxHeight = 35;
  
  const metrics = [
    { label: 'Ending Cash Balance', value: formatCurrency(result.summary.endingBalance), sublabel: 'After 12 months' },
    { label: '12-Month Net Change', value: formatCurrency(result.summary.netChange), sublabel: 'Total change from start', positive: result.summary.netChange >= 0 },
    { label: 'Lowest Cash Point', value: formatCurrency(result.summary.lowestBalance), sublabel: result.summary.lowestMonth || 'Tightest month' },
    { label: 'Cash Runway', value: result.summary.cashRunway >= 24 ? '24+ months' : `${result.summary.cashRunway} months`, sublabel: 'At current burn rate' },
    { label: 'Expense Ratio', value: `${result.summary.expenseRatio.toFixed(1)}%`, sublabel: 'Of total revenue' },
    { label: 'Months with Deficit', value: String(result.summary.deficitMonths), sublabel: 'Negative closing balance' }
  ];

  metrics.forEach((metric, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const boxX = margin + col * (metricBoxWidth + 10);
    const boxY = y + row * (metricBoxHeight + 5);
    
    pdf.setFillColor(250, 251, 252);
    pdf.roundedRect(boxX, boxY, metricBoxWidth, metricBoxHeight, 2, 2, 'F');
    
    pdf.setFontSize(9);
    pdf.setTextColor(124, 124, 124);
    pdf.text(metric.label, boxX + 5, boxY + 8);
    
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    if ('positive' in metric) {
      pdf.setTextColor(metric.positive ? 22 : 220, metric.positive ? 163 : 38, metric.positive ? 74 : 38);
    } else {
      pdf.setTextColor(36, 37, 83);
    }
    pdf.text(metric.value, boxX + 5, boxY + 22);
    
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(124, 124, 124);
    pdf.text(metric.sublabel, boxX + 5, boxY + 30);
  });
  
  y += (Math.ceil(metrics.length / 2)) * (metricBoxHeight + 5) + 15;

  // Assumptions Summary
  ({ y, pageNum } = checkNewPage(60, y, pageNum));
  pdf.setTextColor(36, 37, 83);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Projection Assumptions', margin, y);
  y += 8;
  
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(80, 80, 80);
  
  const assumptions = [
    `Starting Cash: ${formatCurrency(inputs.startingCash)}`,
    `Monthly Revenue: ${formatCurrency(inputs.monthlyRevenue)} (${inputs.growthRate >= 0 ? '+' : ''}${inputs.growthRate}% growth/month)`,
    `Fixed Expenses: ${formatCurrency(inputs.fixedExpenses)}/month`,
    `Variable Expenses: ${inputs.variableExpensePercent}% of revenue`,
    `Owner's Draw: ${formatCurrency(inputs.ownersDraw)}/month`,
    inputs.otherIncome > 0 ? `Other Income: ${formatCurrency(inputs.otherIncome)}/month` : null
  ].filter(Boolean) as string[];
  
  assumptions.forEach(assumption => {
    pdf.text(`• ${assumption}`, margin + 5, y);
    y += 6;
  });

  addFooter(pageNum);

  // ===================== PAGE 2: Monthly Breakdown =====================
  pdf.addPage();
  pageNum++;
  y = addHeader();
  
  pdf.setTextColor(36, 37, 83);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Monthly Cash Flow Breakdown', margin, y);
  y += 12;

  // Table headers
  const colWidths = [25, 25, 28, 28, 25, 28, 15];
  const headers = ['Month', 'Opening', 'Cash In', 'Cash Out', 'Net Flow', 'Closing', 'Status'];
  
  pdf.setFillColor(36, 37, 83);
  pdf.rect(margin, y, contentWidth, 8, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'bold');
  
  let colX = margin;
  headers.forEach((header, i) => {
    pdf.text(header, colX + 2, y + 5.5);
    colX += colWidths[i];
  });
  y += 10;

  // Table rows
  result.projection.forEach((month, index) => {
    ({ y, pageNum } = checkNewPage(8, y, pageNum));
    
    const rowColor = index % 2 === 0 ? [255, 255, 255] : [250, 251, 252];
    pdf.setFillColor(rowColor[0], rowColor[1], rowColor[2]);
    pdf.rect(margin, y - 4, contentWidth, 7, 'F');
    
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    
    colX = margin;
    const rowData = [
      month.name,
      formatCurrency(month.opening),
      formatCurrency(month.cashIn),
      formatCurrency(month.cashOut),
      (month.netFlow >= 0 ? '+' : '') + formatCurrency(month.netFlow),
      formatCurrency(month.closing),
      month.status === 'healthy' ? '●' : month.status === 'warning' ? '◐' : '○'
    ];
    
    rowData.forEach((data, i) => {
      if (i === 4) { // Net Flow column
        pdf.setTextColor(month.netFlow >= 0 ? 22 : 220, month.netFlow >= 0 ? 163 : 38, month.netFlow >= 0 ? 74 : 38);
      } else if (i === 5 && month.closing < 0) { // Closing column if negative
        pdf.setTextColor(220, 38, 38);
      } else if (i === 6) { // Status column
        pdf.setTextColor(
          month.status === 'healthy' ? 22 : month.status === 'warning' ? 245 : 220,
          month.status === 'healthy' ? 163 : month.status === 'warning' ? 158 : 38,
          month.status === 'healthy' ? 74 : month.status === 'warning' ? 11 : 38
        );
      } else {
        pdf.setTextColor(80, 80, 80);
      }
      pdf.text(data, colX + 2, y);
      colX += colWidths[i];
    });
    y += 7;
  });

  // Totals row
  y += 3;
  pdf.setFillColor(36, 37, 83);
  pdf.rect(margin, y - 4, contentWidth, 8, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFont('helvetica', 'bold');
  
  colX = margin;
  const totals = [
    'TOTALS',
    '—',
    formatCurrency(result.summary.totalCashIn),
    formatCurrency(result.summary.totalCashOut),
    (result.summary.netChange >= 0 ? '+' : '') + formatCurrency(result.summary.netChange),
    formatCurrency(result.summary.endingBalance),
    ''
  ];
  
  totals.forEach((data, i) => {
    pdf.text(data, colX + 2, y + 1);
    colX += colWidths[i];
  });
  y += 15;

  // Legend
  pdf.setTextColor(124, 124, 124);
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Status: ● Healthy (>2x expenses)  ◐ Watch (<2x expenses)  ○ Danger (negative)', margin, y);

  addFooter(pageNum);

  // ===================== PAGE 3: Insights & Recommendations =====================
  pdf.addPage();
  pageNum++;
  y = addHeader();
  
  pdf.setTextColor(36, 37, 83);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Insights & Recommendations', margin, y);
  y += 12;

  // Dynamic insights
  insights.forEach(insight => {
    ({ y, pageNum } = checkNewPage(25, y, pageNum));
    
    const insightColor = insight.type === 'danger' ? danger : insight.type === 'warning' ? warning : insight.type === 'positive' ? success : bizBlue;
    
    // Left border
    pdf.setFillColor(
      insight.type === 'danger' ? 220 : insight.type === 'warning' ? 245 : insight.type === 'positive' ? 22 : 36,
      insight.type === 'danger' ? 38 : insight.type === 'warning' ? 158 : insight.type === 'positive' ? 163 : 37,
      insight.type === 'danger' ? 38 : insight.type === 'warning' ? 11 : insight.type === 'positive' ? 74 : 83
    );
    pdf.rect(margin, y, 3, 20, 'F');
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(36, 37, 83);
    pdf.text(insight.title, margin + 8, y + 6);
    
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(80, 80, 80);
    const wrappedInsight = pdf.splitTextToSize(insight.message, contentWidth - 15);
    pdf.text(wrappedInsight, margin + 8, y + 13);
    y += 25;
  });

  // Next Steps
  y += 10;
  ({ y, pageNum } = checkNewPage(50, y, pageNum));
  
  pdf.setTextColor(36, 37, 83);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Recommended Next Steps', margin, y);
  y += 10;

  const nextSteps = [
    { title: 'Compare to Actuals', desc: 'Review this projection against your actual numbers each month to identify variances early.' },
    { title: 'Update Quarterly', desc: 'Revisit and adjust your projection every 3 months as your business changes.' },
    { title: 'Negotiate Terms', desc: 'Contact vendors about extended payment terms to improve your cash timing.' },
    { title: 'Line of Credit', desc: 'Consider establishing a business line of credit before you need it—it\'s easier to get when you don\'t need it.' }
  ];

  nextSteps.forEach((step, index) => {
    ({ y, pageNum } = checkNewPage(15, y, pageNum));
    
    pdf.setFillColor(150, 148, 35);
    pdf.circle(margin + 3, y - 1, 3, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'bold');
    pdf.text(String(index + 1), margin + 2, y + 1);
    
    pdf.setTextColor(36, 37, 83);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text(step.title, margin + 10, y);
    
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(80, 80, 80);
    pdf.text(step.desc, margin + 10, y + 6);
    y += 15;
  });

  // Pro tip
  y += 5;
  ({ y, pageNum } = checkNewPage(25, y, pageNum));
  
  pdf.setFillColor(36, 37, 83);
  pdf.roundedRect(margin, y, contentWidth, 25, 3, 3, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.text('💡 Pro Tip: Cash Flow ≠ Profit', margin + 10, y + 8);
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Cash flow shows when money moves; profit shows what you earned. A profitable business', margin + 10, y + 15);
  pdf.text('can still run out of cash if timing is wrong. Track both!', margin + 10, y + 21);

  addFooter(pageNum);

  // ===================== PAGE 4: Call to Action =====================
  pdf.addPage();
  pageNum++;
  y = addHeader();
  
  // CTA section
  pdf.setTextColor(36, 37, 83);
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Cash Flow is Just One Piece', pageWidth / 2, y, { align: 'center' });
  y += 12;
  
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(80, 80, 80);
  const ctaText = 'Get a complete health check across all 12 areas of your business—from financial health to operations, sales, marketing, and leadership.';
  const wrappedCta = pdf.splitTextToSize(ctaText, contentWidth);
  pdf.text(wrappedCta, pageWidth / 2, y, { align: 'center' });
  y += 20;
  
  // CTA Box
  pdf.setFillColor(230, 184, 0);
  pdf.roundedRect(margin + 30, y, contentWidth - 60, 20, 3, 3, 'F');
  pdf.setTextColor(36, 37, 83);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Take Free Business Assessment', pageWidth / 2, y + 12, { align: 'center' });
  y += 30;
  
  pdf.setTextColor(36, 37, 83);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Visit: bizhealth.ai/register', pageWidth / 2, y, { align: 'center' });
  y += 25;

  // Disclaimer
  pdf.setFontSize(8);
  pdf.setTextColor(124, 124, 124);
  const disclaimer = 'Disclaimer: This projection is based on the inputs you provided and assumes consistent patterns. Actual results may vary based on market conditions, business decisions, and other factors. This report is for planning purposes only and does not constitute financial advice. Consult with a financial professional for personalized guidance.';
  const wrappedDisclaimer = pdf.splitTextToSize(disclaimer, contentWidth);
  pdf.text(wrappedDisclaimer, margin, y);

  addFooter(pageNum);

  // Save the PDF
  const fileName = inputs.businessName 
    ? `${inputs.businessName.replace(/[^a-z0-9]/gi, '-')}-Cash-Flow-Projection.pdf`
    : 'Cash-Flow-Projection-Report.pdf';
  pdf.save(fileName);
}
