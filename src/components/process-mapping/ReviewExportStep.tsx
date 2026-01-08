import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useProcessMapStore } from '@/stores/processMapStore';
import { exportToWord } from '@/utils/processExport';
import { Download, FileText, Table, File, Image, CheckCircle2, AlertCircle, X, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface ReviewExportStepProps {
  onBack: () => void;
  onComplete: () => void;
  onExit: () => void;
}

const ReviewExportStep = ({ onBack, onComplete, onExit }: ReviewExportStepProps) => {
  const { currentProcess } = useProcessMapStore();
  const [exportFormats, setExportFormats] = useState({
    word: true,
    excel: true,
    pdf: false,
    png: false,
  });
  const [includeAI, setIncludeAI] = useState(true);
  const [includeBranding, setIncludeBranding] = useState(true);
  const [exporting, setExporting] = useState(false);

  if (!currentProcess) return null;

  const nodes = currentProcess.nodes.filter((n) => n.type !== 'start' && n.type !== 'end');
  const completedTasks = nodes.filter((n) => n.assignedRole && n.data?.instructions).length;
  const totalCycleTime = nodes.reduce((sum, n) => {
    if (n.data?.duration) {
      const days =
        n.data.duration.unit === 'days'
          ? n.data.duration.value
          : n.data.duration.unit === 'hours'
          ? n.data.duration.value / 24
          : n.data.duration.unit === 'weeks'
          ? n.data.duration.value * 7
          : n.data.duration.value / 1440;
      return sum + days;
    }
    return sum;
  }, 0);

  const roleBreakdown = nodes.reduce((acc, n) => {
    if (n.assignedRole) {
      acc[n.assignedRole] = (acc[n.assignedRole] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const handleExport = async () => {
    if (!exportFormats.word && !exportFormats.excel && !exportFormats.pdf && !exportFormats.png) {
      toast.error('Please select at least one export format');
      return;
    }

    setExporting(true);
    
    try {
      if (exportFormats.word) {
        await exportToWord(currentProcess);
        toast.success('Word document generated successfully!');
      }
      
      if (exportFormats.excel) {
        toast.info('Excel export coming soon!');
      }
      
      if (exportFormats.pdf) {
        toast.info('PDF export coming soon!');
      }
      
      if (exportFormats.png) {
        toast.info('PNG export coming soon!');
      }

      // Small delay to show success messages
      setTimeout(() => {
        onComplete();
      }, 2000);
    } catch (error) {
      toast.error('Failed to generate documents. Please try again.');
      console.error('Export error:', error);
    } finally {
      setExporting(false);
    }
  };

  const optimizationInsights = [
    {
      type: 'warning',
      title: 'Bottleneck Alert',
      description: 'Some tasks may take longer than expected. Consider breaking them down.',
    },
    {
      type: 'success',
      title: 'Good Coverage',
      description: `${completedTasks}/${nodes.length} tasks have detailed instructions.`,
    },
    {
      type: 'info',
      title: 'Multiple Handoffs',
      description: `Process involves ${Object.keys(roleBreakdown).length} different roles.`,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-foreground">Step 4: Review & Export</h2>
        <p className="text-muted-foreground">
          Review your process and generate professional SOP documents
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Process Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Process Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm text-muted-foreground">Steps Mapped</span>
              <span className="font-semibold">{nodes.length}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm text-muted-foreground">Details Complete</span>
              <span className="font-semibold">
                {completedTasks}/{nodes.length}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm text-muted-foreground">Decision Points</span>
              <span className="font-semibold">
                {currentProcess.nodes.filter((n) => n.type === 'decision').length}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm text-muted-foreground">Est. Cycle Time</span>
              <span className="font-semibold">{Math.round(totalCycleTime)} days</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Roles Involved</span>
              <span className="font-semibold">{Object.keys(roleBreakdown).length}</span>
            </div>

            <div className="pt-4">
              <h4 className="text-sm font-semibold mb-2 text-foreground">Task Breakdown</h4>
              <div className="space-y-2">
                {Object.entries(roleBreakdown).map(([role, count]) => (
                  <div key={role} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{role}</span>
                    <span className="font-medium">{count} tasks</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Optimization Insights */}
        <Card>
          <CardHeader>
            <CardTitle>AI Optimization Insights</CardTitle>
            <CardDescription>Recommendations to improve your process</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {optimizationInsights.map((insight, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  insight.type === 'warning'
                    ? 'bg-yellow-50 border-yellow-200'
                    : insight.type === 'success'
                    ? 'bg-green-50 border-green-200'
                    : 'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  {insight.type === 'warning' ? (
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                  )}
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{insight.title}</h4>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Options</CardTitle>
          <CardDescription>Select the document formats you want to generate</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3 p-4 border rounded-lg">
              <Checkbox
                id="word"
                checked={exportFormats.word}
                onCheckedChange={(checked) =>
                  setExportFormats({ ...exportFormats, word: !!checked })
                }
              />
              <div className="flex-1">
                <Label htmlFor="word" className="flex items-center gap-2 cursor-pointer">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Word Document (.docx)</span>
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Professional SOP with flowchart and tables
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 border rounded-lg">
              <Checkbox
                id="excel"
                checked={exportFormats.excel}
                onCheckedChange={(checked) =>
                  setExportFormats({ ...exportFormats, excel: !!checked })
                }
              />
              <div className="flex-1">
                <Label htmlFor="excel" className="flex items-center gap-2 cursor-pointer">
                  <Table className="w-5 h-5 text-green-600" />
                  <span className="font-semibold">Excel Spreadsheet (.xlsx)</span>
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Tabular format for analysis and tracking
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 border rounded-lg">
              <Checkbox
                id="pdf"
                checked={exportFormats.pdf}
                onCheckedChange={(checked) =>
                  setExportFormats({ ...exportFormats, pdf: !!checked })
                }
              />
              <div className="flex-1">
                <Label htmlFor="pdf" className="flex items-center gap-2 cursor-pointer">
                  <File className="w-5 h-5 text-red-600" />
                  <span className="font-semibold">PDF Document (.pdf)</span>
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Locked format for sharing and printing
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 border rounded-lg">
              <Checkbox
                id="png"
                checked={exportFormats.png}
                onCheckedChange={(checked) =>
                  setExportFormats({ ...exportFormats, png: !!checked })
                }
              />
              <div className="flex-1">
                <Label htmlFor="png" className="flex items-center gap-2 cursor-pointer">
                  <Image className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold">Process Image (.png)</span>
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Flowchart diagram only (high resolution)
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ai"
                checked={includeAI}
                onCheckedChange={(checked) => setIncludeAI(!!checked)}
              />
              <Label htmlFor="ai" className="cursor-pointer">
                Include AI optimization insights
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="branding"
                checked={includeBranding}
                onCheckedChange={(checked) => setIncludeBranding(!!checked)}
              />
              <Label htmlFor="branding" className="cursor-pointer">
                Add BizHealth.ai branding (header/footer)
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between pt-6 border-t">
        <div className="flex gap-2">
          <Button variant="outline" onClick={onBack}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="bg-destructive/10 hover:bg-destructive/20 text-destructive border-destructive/30">
                <X className="w-4 h-4 mr-2" />
                Exit
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Exit Process Mapping?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to exit? The current process map will be deleted (unsaved) and not recoverable. All your progress will be lost.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onExit}>
                  Agree - Please Exit
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onComplete}>
            Save as Draft
          </Button>
          <Button onClick={handleExport} size="lg" disabled={exporting}>
            <Download className="w-4 h-4 mr-2" />
            {exporting ? 'Generating...' : 'Generate Documents'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewExportStep;
