import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import SEO from "@/components/SEO";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import PromotionalBanner from "@/components/PromotionalBanner";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useJourneyMapStore } from "@/stores/journeyMapStore";
import { JourneyMapDashboard } from "@/components/journey-map/JourneyMapDashboard";
import { TemplateLibrary } from "@/components/journey-map/TemplateLibrary";
import { BuildingBlocksPanel } from "@/components/journey-map/BuildingBlocksPanel";
import { PersonaBuilder } from "@/components/journey-map/PersonaBuilder";
import { JourneyCanvas } from "@/components/journey-map/JourneyCanvas";
import { TouchpointDetails } from "@/components/journey-map/TouchpointDetails";
import { X, Save, Download, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import StructuredData from "@/components/StructuredData";

const CustomerJourneyMapsTool = () => {
  const navigate = useNavigate();
  const { currentMap, createNewMap, saveCurrentMap, clearCurrentMap, addTouchpoint, loadMap } = useJourneyMapStore();
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [activeDragItem, setActiveDragItem] = useState<any>(null);

  const handleStartNew = (name: string) => {
    createNewMap(name);
    toast.success("New journey map created");
  };

  const handleLoadMap = (id: string) => {
    loadMap(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = () => {
    saveCurrentMap();
    toast.success("Journey map saved successfully");
  };

  const handleExit = () => {
    setShowExitDialog(true);
  };

  const confirmExit = () => {
    clearCurrentMap();
    navigate('/biztools/toolbox');
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragItem(null);

    if (!over || !currentMap) return;

    const dragData = active.data.current;
    const dropStageId = over.id as string;

    if (dragData?.type === 'touchpoint') {
      const existingTouchpoints = currentMap.touchpoints.filter(t => t.stageId === dropStageId);
      addTouchpoint({
        name: '',
        channel: dragData.channel,
        customerAction: '',
        businessAction: '',
        emotion: 3,
        notes: '',
        stageId: dropStageId,
        position: existingTouchpoints.length,
      });
      toast.success("Touchpoint added");
    }
  };

  const handleExportPDF = async () => {
    const canvas = document.getElementById('journey-canvas');
    if (!canvas) return;

    toast.loading("Generating PDF...");
    
    try {
      const imgData = await html2canvas(canvas, { scale: 2 });
      const pdf = new jsPDF('l', 'mm', 'a4');
      const imgWidth = 297;
      const imgHeight = (imgData.height * imgWidth) / imgData.width;
      
      pdf.addImage(imgData.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${currentMap?.name || 'journey-map'}.pdf`);
      toast.success("PDF exported successfully");
    } catch (error) {
      toast.error("Failed to export PDF");
    }
  };

  const handleExportPNG = async () => {
    const canvas = document.getElementById('journey-canvas');
    if (!canvas) return;

    toast.loading("Generating PNG...");
    
    try {
      const imgData = await html2canvas(canvas, { scale: 2 });
      const link = document.createElement('a');
      link.download = `${currentMap?.name || 'journey-map'}.png`;
      link.href = imgData.toDataURL();
      link.click();
      toast.success("PNG exported successfully");
    } catch (error) {
      toast.error("Failed to export PNG");
    }
  };

  return (
    <>
      <SEO
        title="Free Customer Journey Map Tool - Visualize Client Experience | BizHealth.ai"
        description="Create professional customer journey maps with our free tool. Drag-and-drop interface for mapping customer touchpoints, client journey stages, pain points & opportunities. Templates included for SMBs."
        keywords="customer journey, customer journey tool, journey map, client journey, customer journey map tool, customer journey mapping, journey map template, client journey map, customer experience visualization, touchpoint mapping, free journey map tool, small business customer journey, customer journey builder"
        canonical="https://bizhealth.ai/biztools/toolbox/customer-journey-maps-tool"
      />
      <StructuredData
        type="service"
        name="Customer Journey Maps Tool"
        description="Free online customer journey mapping tool for small businesses. Create, visualize, and export professional customer journey maps with drag-and-drop interface, templates, and persona builders."
        provider="BizHealth.ai"
        areaServed="United States"
        url="https://bizhealth.ai/biztools/toolbox/customer-journey-maps-tool"
      />

      <div className="min-h-screen flex flex-col bg-background">
        <PromotionalBanner />
        <GlobalNavigation />

        {/* Toolbar (shown when in mapping) */}
        {currentMap && (
          <div className="sticky top-0 z-40 bg-background border-b border-border shadow-sm">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
              <h2 className="text-lg font-montserrat font-bold text-biz-navy truncate max-w-xs">
                {currentMap.name}
              </h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowGuide(!showGuide)}
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  {showGuide ? 'Hide' : 'Show'} Guide
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSave}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportPDF}
                >
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportPNG}
                >
                  <Download className="h-4 w-4 mr-2" />
                  PNG
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExit}
                  className="bg-red-50 hover:bg-red-100 border-red-200 text-red-700 hover:text-red-800"
                >
                  <X className="h-4 w-4 mr-2" />
                  Exit
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 pt-32">
          {!currentMap ? (
            <JourneyMapDashboard onStartNew={handleStartNew} onLoadMap={handleLoadMap} />
          ) : (
            <DndContext onDragEnd={handleDragEnd} onDragStart={(e) => setActiveDragItem(e.active.data.current)}>
              <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-12 gap-4">
                  {/* Left Sidebar */}
                  <div className="col-span-12 lg:col-span-3 space-y-4">
                    <TemplateLibrary onSelectTemplate={(template) => toast.info("Template loading coming soon")} />
                    <BuildingBlocksPanel />
                  </div>

                  {/* Center Canvas */}
                  <div className="col-span-12 lg:col-span-6">
                    <div id="journey-canvas" className="bg-background rounded-lg border border-border p-6 min-h-[600px]">
                      <JourneyCanvas />
                    </div>
                  </div>

                  {/* Right Sidebar */}
                  <div className="col-span-12 lg:col-span-3 space-y-4">
                    <PersonaBuilder />
                    <TouchpointDetails />
                  </div>
                </div>
              </div>

              {/* Drag Overlay */}
              <DragOverlay>
                {activeDragItem && (
                  <div className="p-2 bg-background border border-biz-green rounded shadow-lg">
                    Dragging...
                  </div>
                )}
              </DragOverlay>
            </DndContext>
          )}
        </main>

        <GlobalFooter />
      </div>

      {/* Exit Confirmation Dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Exit Journey Map Tool?</AlertDialogTitle>
            <AlertDialogDescription>
              Make sure to save your work before leaving. Any unsaved changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Working</AlertDialogCancel>
            <AlertDialogAction onClick={confirmExit} className="bg-red-600 hover:bg-red-700">
              Exit Without Saving
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CustomerJourneyMapsTool;
