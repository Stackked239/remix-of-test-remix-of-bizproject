import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useSWOTStore } from "@/stores/swotStore";
import { Download, FileText, FileSpreadsheet, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Document, Packer, Paragraph, TextRun, Table, TableCell, TableRow, WidthType, BorderStyle, AlignmentType } from "docx";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

interface InsightsViewProps {
  onBack: () => void;
}

export const InsightsView = ({ onBack }: InsightsViewProps) => {
  const navigate = useNavigate();
  const { currentAnalysis } = useSWOTStore();
  const [showCompleteDialog, setShowCompleteDialog] = useState(false);

  const handleComplete = () => {
    toast.success("SWOT Analysis completed!");
    navigate('/biztools/toolbox');
  };

  const getQuadrantCount = (quadrant: string) => {
    return currentAnalysis?.items.filter(item => item.quadrant === quadrant).length || 0;
  };

  const exportToWord = async () => {
    if (!currentAnalysis) return;

    try {
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            // Title
            new Paragraph({
              text: "SWOT Analysis Report",
              heading: "Title",
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 },
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 },
              children: [
                new TextRun({
                  text: currentAnalysis.businessProfile?.businessName || "Business",
                  bold: true,
                  size: 32,
                }),
              ],
            }),
            new Paragraph({
              text: `Industry: ${currentAnalysis.businessProfile?.industry || "N/A"}`,
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 },
            }),

            // Summary
            new Paragraph({
              text: "SWOT Summary",
              heading: "Heading1",
              spacing: { before: 400, after: 200 },
            }),

            // Summary Table
            new Table({
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({
                        children: [new TextRun({ text: "Category", bold: true })],
                      })],
                      width: { size: 50, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [new Paragraph({
                        children: [new TextRun({ text: "Count", bold: true })],
                      })],
                      width: { size: 50, type: WidthType.PERCENTAGE },
                    }),
                  ],
                }),
                ...(['strength', 'weakness', 'opportunity', 'threat'] as const).map(quadrant => 
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph(quadrant.charAt(0).toUpperCase() + quadrant.slice(1) + 's')],
                      }),
                      new TableCell({
                        children: [new Paragraph(getQuadrantCount(quadrant).toString())],
                      }),
                    ],
                  })
                ),
              ],
              width: { size: 100, type: WidthType.PERCENTAGE },
            }),

            // Detailed SWOT Items
            ...((['strength', 'weakness', 'opportunity', 'threat'] as const).flatMap(quadrant => {
              const items = currentAnalysis.items.filter(item => item.quadrant === quadrant);
              return [
                new Paragraph({
                  text: quadrant.charAt(0).toUpperCase() + quadrant.slice(1) + 's',
                  heading: "Heading2",
                  spacing: { before: 400, after: 200 },
                }),
                ...items.map((item, index) => 
                  new Paragraph({
                    text: `${index + 1}. ${item.text}`,
                    spacing: { after: 100 },
                  })
                ),
              ];
            })),
          ],
        }],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `SWOT-Analysis-${currentAnalysis.businessProfile?.businessName || 'Report'}.docx`);
      toast.success("Word document exported successfully");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export Word document");
    }
  };

  const exportToExcel = () => {
    if (!currentAnalysis) return;

    try {
      const wb = XLSX.utils.book_new();

      // SWOT Matrix Sheet
      const matrixData = [
        ['SWOT Analysis', currentAnalysis.businessProfile?.businessName || ''],
        ['Industry', currentAnalysis.businessProfile?.industry || ''],
        [],
        ['Category', 'Count', 'Items'],
      ];

      (['strength', 'weakness', 'opportunity', 'threat'] as const).forEach(quadrant => {
        const items = currentAnalysis.items.filter(item => item.quadrant === quadrant);
        const itemsList = items.map(item => item.text).join('; ');
        matrixData.push([
          quadrant.charAt(0).toUpperCase() + quadrant.slice(1) + 's',
          items.length.toString(),
          itemsList,
        ]);
      });

      const ws = XLSX.utils.aoa_to_sheet(matrixData);
      XLSX.utils.book_append_sheet(wb, ws, 'SWOT Matrix');

      // Detailed Items Sheet
      const detailData = [
        ['Quadrant', 'Item', 'Impact Level', 'Details', 'Evidence'],
        ...currentAnalysis.items.map(item => [
          item.quadrant.charAt(0).toUpperCase() + item.quadrant.slice(1),
          item.text,
          item.impactLevel,
          item.details || '',
          item.evidence || '',
        ]),
      ];

      const ws2 = XLSX.utils.aoa_to_sheet(detailData);
      XLSX.utils.book_append_sheet(wb, ws2, 'Detailed Items');

      XLSX.writeFile(wb, `SWOT-Analysis-${currentAnalysis.businessProfile?.businessName || 'Report'}.xlsx`);
      toast.success("Excel spreadsheet exported successfully");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export Excel spreadsheet");
    }
  };

  return (
    <div className="container mx-auto px-4 pt-44 pb-8 max-w-6xl">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-montserrat font-bold text-3xl text-biz-navy">
            Strategic Insights
          </h2>
          <span className="text-sm text-muted-foreground">Step 3/3</span>
        </div>
        <p className="text-muted-foreground">
          Review your SWOT analysis and export your strategic report
        </p>
      </div>

      {/* SWOT Summary */}
      <Card className="p-6 mb-6">
        <h3 className="font-montserrat font-bold text-2xl mb-4 text-biz-navy">
          SWOT Summary
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-700 mb-1">
              {getQuadrantCount('strength')}
            </div>
            <div className="text-sm font-semibold text-green-700">Strengths</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-3xl font-bold text-red-700 mb-1">
              {getQuadrantCount('weakness')}
            </div>
            <div className="text-sm font-semibold text-red-700">Weaknesses</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-700 mb-1">
              {getQuadrantCount('opportunity')}
            </div>
            <div className="text-sm font-semibold text-blue-700">Opportunities</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-3xl font-bold text-orange-700 mb-1">
              {getQuadrantCount('threat')}
            </div>
            <div className="text-sm font-semibold text-orange-700">Threats</div>
          </div>
        </div>
      </Card>

      {/* Key Insights */}
      <Card className="p-6 mb-6 bg-gradient-to-br from-biz-lime/5 to-biz-copper/5">
        <h3 className="font-montserrat font-bold text-xl mb-4 text-biz-navy">
          🎯 Key Strategic Insights
        </h3>
        <div className="space-y-3">
          <div className="p-4 bg-white rounded-lg border border-biz-lime/20">
            <h4 className="font-semibold mb-2">Competitive Advantages</h4>
            <p className="text-sm text-muted-foreground">
              You have {getQuadrantCount('strength')} identified strengths that differentiate your business.
              Focus on leveraging these to capture market opportunities.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-biz-lime/20">
            <h4 className="font-semibold mb-2">Areas for Improvement</h4>
            <p className="text-sm text-muted-foreground">
              {getQuadrantCount('weakness')} weaknesses have been identified. Prioritize addressing
              critical gaps that could hinder growth.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-biz-lime/20">
            <h4 className="font-semibold mb-2">Market Opportunities</h4>
            <p className="text-sm text-muted-foreground">
              {getQuadrantCount('opportunity')} opportunities are available. Align your strengths
              with these opportunities for maximum growth potential.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-biz-lime/20">
            <h4 className="font-semibold mb-2">Risk Mitigation</h4>
            <p className="text-sm text-muted-foreground">
              {getQuadrantCount('threat')} threats require attention. Develop contingency plans
              to protect your business from external challenges.
            </p>
          </div>
        </div>
      </Card>

      {/* Export Section */}
      <Card className="p-6 mb-6">
        <h3 className="font-montserrat font-bold text-xl mb-4 text-biz-navy">
          <Download className="inline-block mr-2 h-5 w-5" />
          Export Your Analysis
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Download your SWOT analysis in your preferred format
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            onClick={exportToWord}
            className="h-auto py-4 flex-col items-start text-left"
            variant="outline"
          >
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-5 w-5" />
              <span className="font-semibold">Word Document (.docx)</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Professional strategic report with detailed analysis
            </p>
          </Button>
          <Button
            onClick={exportToExcel}
            className="h-auto py-4 flex-col items-start text-left"
            variant="outline"
          >
            <div className="flex items-center gap-2 mb-2">
              <FileSpreadsheet className="h-5 w-5" />
              <span className="font-semibold">Excel Spreadsheet (.xlsx)</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Workbook for tracking and ongoing analysis
            </p>
          </Button>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Matrix
        </Button>
        <Button 
          onClick={() => setShowCompleteDialog(true)}
          className="bg-biz-lime hover:bg-biz-lime/90 text-biz-navy"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Complete Analysis
        </Button>
      </div>

      {/* Completion Dialog */}
      <AlertDialog open={showCompleteDialog} onOpenChange={setShowCompleteDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-2xl">
              <CheckCircle className="h-6 w-6 text-green-600" />
              Congratulations!
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-4 text-base">
              <p className="font-semibold text-foreground">
                You've successfully completed your SWOT Analysis! 🎉
              </p>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-900">
                  <strong>Important:</strong> Don't forget to export your analysis using the buttons above to save your work. 
                  Your analysis will be lost if you exit without exporting.
                </p>
              </div>
              <p className="text-sm">
                Ready to return to your toolbox?
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Reviewing</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleComplete}
              className="bg-biz-lime hover:bg-biz-lime/90 text-biz-navy"
            >
              Return to Toolbox
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
