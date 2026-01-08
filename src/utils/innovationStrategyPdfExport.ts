import { InnovationStrategyData } from '@/stores/innovationStrategyStore';
import { format } from 'date-fns';

export const generateInnovationStrategyPDF = async (data: InnovationStrategyData): Promise<void> => {
  // Dynamically import jspdf only when needed
  const jsPDFModule = await import('jspdf');
  const jsPDF = jsPDFModule.default;
  
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  let y = margin;

  const addPage = () => {
    pdf.addPage();
    y = margin;
  };

  const checkPageBreak = (neededSpace: number) => {
    if (y + neededSpace > 270) {
      addPage();
    }
  };

  // Colors
  const navy = [33, 38, 83];
  const teal = [13, 148, 136];
  const lime = [132, 204, 22];

  // Cover Page
  pdf.setFillColor(navy[0], navy[1], navy[2]);
  pdf.rect(0, 0, pageWidth, 297, 'F');

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(12);
  pdf.text('BizHealth.ai', pageWidth / 2, 40, { align: 'center' });

  pdf.setFontSize(32);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Innovation Strategy', pageWidth / 2, 100, { align: 'center' });

  pdf.setFontSize(24);
  pdf.setTextColor(lime[0], lime[1], lime[2]);
  pdf.text(data.foundation.companyName || 'Your Company', pageWidth / 2, 120, { align: 'center' });

  pdf.setFontSize(12);
  pdf.setTextColor(255, 255, 255);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Generated: ${format(new Date(), 'MMMM d, yyyy')}`, pageWidth / 2, 150, { align: 'center' });

  pdf.setFontSize(10);
  pdf.text('Built with BizHealth.ai BizTools | www.bizhealth.ai', pageWidth / 2, 280, { align: 'center' });

  // Content Pages
  addPage();
  pdf.setTextColor(0, 0, 0);

  // Section 1: Foundation
  pdf.setFillColor(navy[0], navy[1], navy[2]);
  pdf.rect(margin, y, contentWidth, 10, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('1. Company Foundation', margin + 5, y + 7);
  y += 18;
  pdf.setTextColor(0, 0, 0);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);

  const addField = (label: string, value: string) => {
    checkPageBreak(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${label}:`, margin, y);
    pdf.setFont('helvetica', 'normal');
    const lines = pdf.splitTextToSize(value || 'Not specified', contentWidth - 40);
    pdf.text(lines, margin + 40, y);
    y += Math.max(6, lines.length * 5) + 3;
  };

  addField('Company', data.foundation.companyName);
  addField('Industry', data.foundation.industry === 'Other' ? data.foundation.customIndustry : data.foundation.industry);
  addField('Size', data.foundation.companySize ? `${data.foundation.companySize} employees` : '');
  addField('Revenue', data.foundation.annualRevenue);
  addField('Challenges', data.foundation.innovationChallenges.join(', '));
  
  y += 5;
  pdf.setFont('helvetica', 'bold');
  pdf.text('Why Innovation Matters Now:', margin, y);
  y += 6;
  pdf.setFont('helvetica', 'normal');
  const whyLines = pdf.splitTextToSize(data.foundation.whyInnovationMatters || 'Not specified', contentWidth);
  pdf.text(whyLines, margin, y);
  y += whyLines.length * 5 + 10;

  // Section 2: Vision
  checkPageBreak(40);
  pdf.setFillColor(teal[0], teal[1], teal[2]);
  pdf.rect(margin, y, contentWidth, 10, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('2. Strategic Vision', margin + 5, y + 7);
  y += 18;
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(10);

  const intentMap: Record<string, string> = {
    lead: 'Lead our industry',
    follow: 'Keep pace with leaders',
    niche: 'Focused specialist',
    disrupt: 'Disrupt with new model'
  };
  addField('Strategic Intent', intentMap[data.vision.strategicIntent] || data.vision.strategicIntent);
  
  y += 3;
  pdf.setFont('helvetica', 'bold');
  pdf.text('3-Year Ambition:', margin, y);
  y += 6;
  pdf.setFont('helvetica', 'italic');
  const ambitionLines = pdf.splitTextToSize(`"${data.vision.threeYearAmbition}"` || 'Not specified', contentWidth);
  pdf.text(ambitionLines, margin, y);
  y += ambitionLines.length * 5 + 8;

  pdf.setFont('helvetica', 'normal');
  addField('Core Differentiator (Today)', data.vision.coreDifferentiator);
  addField('Future Differentiator', data.vision.futureDifferentiator);

  // Section 3: Opportunities
  checkPageBreak(40);
  pdf.setFillColor(lime[0], lime[1], lime[2]);
  pdf.rect(margin, y, contentWidth, 10, 'F');
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('3. Innovation Opportunities', margin + 5, y + 7);
  y += 18;
  pdf.setFontSize(10);

  data.opportunities.forEach((opp, i) => {
    checkPageBreak(25);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${i + 1}. ${opp.title || 'Untitled'}`, margin, y);
    y += 5;
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Type: ${opp.opportunityType} | Impact: ${opp.estimatedImpact?.toUpperCase()} | Effort: ${opp.effortToExecute?.toUpperCase()}`, margin + 5, y);
    y += 10;
  });

  // Section 4: Portfolio
  y += 5;
  checkPageBreak(40);
  pdf.setFillColor(194, 65, 12);
  pdf.rect(margin, y, contentWidth, 10, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('4. Innovation Portfolio (70-20-10)', margin + 5, y + 7);
  y += 18;
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(10);

  const getOppTitle = (id: string) => data.opportunities.find(o => o.id === id)?.title || 'Unknown';
  
  pdf.setFont('helvetica', 'bold');
  pdf.text('CORE (70%):', margin, y);
  pdf.setFont('helvetica', 'normal');
  pdf.text(data.portfolio.core.map(getOppTitle).join(', ') || 'None assigned', margin + 30, y);
  y += 8;
  
  pdf.setFont('helvetica', 'bold');
  pdf.text('ADJACENT (20%):', margin, y);
  pdf.setFont('helvetica', 'normal');
  pdf.text(data.portfolio.adjacent.map(getOppTitle).join(', ') || 'None assigned', margin + 35, y);
  y += 8;
  
  pdf.setFont('helvetica', 'bold');
  pdf.text('TRANSFORMATIONAL (10%):', margin, y);
  pdf.setFont('helvetica', 'normal');
  pdf.text(data.portfolio.transformational.map(getOppTitle).join(', ') || 'None assigned', margin + 50, y);
  y += 15;

  // Section 5: Metrics
  checkPageBreak(40);
  pdf.setFillColor(202, 138, 4);
  pdf.rect(margin, y, contentWidth, 10, 'F');
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('5. Success Metrics', margin + 5, y + 7);
  y += 18;
  pdf.setFontSize(10);

  data.metrics.forEach((metric) => {
    checkPageBreak(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text(metric.name, margin, y);
    y += 5;
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Baseline: ${metric.baseline} → Target: ${metric.target} | Track: ${metric.trackingFrequency}`, margin + 5, y);
    y += 8;
  });

  // Section 6: Roadmap
  y += 5;
  checkPageBreak(60);
  pdf.setFillColor(34, 197, 94);
  pdf.rect(margin, y, contentWidth, 10, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('6. 90-Day Roadmap', margin + 5, y + 7);
  y += 18;
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(10);

  pdf.setFont('helvetica', 'bold');
  pdf.text('MONTH 1 - Quick Win:', margin, y);
  y += 5;
  pdf.setFont('helvetica', 'normal');
  pdf.text(data.roadmap.month1QuickWin || 'Not specified', margin + 5, y);
  y += 5;
  pdf.text(`Owner: ${data.roadmap.month1Owner} | Success: ${data.roadmap.month1SuccessMetric}`, margin + 5, y);
  y += 10;

  pdf.setFont('helvetica', 'bold');
  pdf.text('MONTH 2 - Build Capability:', margin, y);
  y += 5;
  pdf.setFont('helvetica', 'normal');
  pdf.text(data.roadmap.month2Capability || 'Not specified', margin + 5, y);
  y += 5;
  pdf.text(`Owner: ${data.roadmap.month2Owner} | Deliverable: ${data.roadmap.month2Deliverable}`, margin + 5, y);
  y += 10;

  pdf.setFont('helvetica', 'bold');
  pdf.text('MONTH 3 - Launch & Learn:', margin, y);
  y += 5;
  pdf.setFont('helvetica', 'normal');
  pdf.text(data.roadmap.month3Initiative || 'Not specified', margin + 5, y);
  y += 5;
  pdf.text(`Owner: ${data.roadmap.month3Owner} | Success: ${data.roadmap.month3SuccessCriteria}`, margin + 5, y);
  y += 12;

  pdf.setFont('helvetica', 'bold');
  pdf.text(`Review Cadence: ${data.roadmap.reviewCadence} | Next Review: ${data.roadmap.nextMilestoneDate ? format(new Date(data.roadmap.nextMilestoneDate), 'MMM d, yyyy') : 'Not set'}`, margin, y);

  // Footer on last page
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(128, 128, 128);
  pdf.text('Stop Guessing. Start Growing. | BizHealth.ai', pageWidth / 2, 285, { align: 'center' });

  // Save
  const filename = `Innovation_Strategy_${(data.foundation.companyName || 'Company').replace(/\s+/g, '_')}_${format(new Date(), 'yyyy-MM-dd')}.pdf`;
  pdf.save(filename);
};
