import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSWOTStore, SWOTItem } from "@/stores/swotStore";
import { Plus, Sparkles, X, Edit2, Save } from "lucide-react";
import { toast } from "sonner";

interface SWOTMatrixBuilderProps {
  onNext: () => void;
  onBack: () => void;
}

export const SWOTMatrixBuilder = ({ onNext, onBack }: SWOTMatrixBuilderProps) => {
  const { currentAnalysis, addSWOTItem, updateSWOTItem, deleteSWOTItem, saveAnalysis } = useSWOTStore();
  const [editingItem, setEditingItem] = useState<SWOTItem | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [activeQuadrant, setActiveQuadrant] = useState<'strength' | 'weakness' | 'opportunity' | 'threat'>('strength');
  const [newItemText, setNewItemText] = useState('');
  const [itemDetails, setItemDetails] = useState({
    details: '',
    evidence: '',
    impactLevel: 'medium' as 'low' | 'medium' | 'high',
  });

  const getQuadrantItems = (quadrant: string) => {
    return currentAnalysis?.items.filter(item => item.quadrant === quadrant) || [];
  };

  const handleAddItem = () => {
    if (!newItemText.trim()) return;
    
    addSWOTItem({
      quadrant: activeQuadrant,
      text: newItemText.trim(),
      details: itemDetails.details || undefined,
      evidence: itemDetails.evidence || undefined,
      impactLevel: itemDetails.impactLevel,
    });

    setNewItemText('');
    setItemDetails({ details: '', evidence: '', impactLevel: 'medium' });
    setShowAddDialog(false);
    toast.success('Item added successfully');
  };

  const handleEditItem = (item: SWOTItem) => {
    setEditingItem(item);
    setNewItemText(item.text);
    setItemDetails({
      details: item.details || '',
      evidence: item.evidence || '',
      impactLevel: item.impactLevel,
    });
    setShowAddDialog(true);
  };

  const handleUpdateItem = () => {
    if (!editingItem || !newItemText.trim()) return;

    updateSWOTItem(editingItem.id, {
      text: newItemText.trim(),
      details: itemDetails.details || undefined,
      evidence: itemDetails.evidence || undefined,
      impactLevel: itemDetails.impactLevel,
    });

    setEditingItem(null);
    setNewItemText('');
    setItemDetails({ details: '', evidence: '', impactLevel: 'medium' });
    setShowAddDialog(false);
    toast.success('Item updated successfully');
  };

  const handleSaveProgress = () => {
    saveAnalysis();
    toast.success('Progress saved');
  };

  const handleNext = () => {
    saveAnalysis();
    onNext();
  };

  const quadrantConfig = {
    strength: {
      title: 'STRENGTHS',
      subtitle: 'Internal • Positive',
      icon: '💪',
      borderColor: 'border-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
    },
    weakness: {
      title: 'WEAKNESSES',
      subtitle: 'Internal • Negative',
      icon: '⚠️',
      borderColor: 'border-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
    },
    opportunity: {
      title: 'OPPORTUNITIES',
      subtitle: 'External • Positive',
      icon: '🎯',
      borderColor: 'border-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
    },
    threat: {
      title: 'THREATS',
      subtitle: 'External • Negative',
      icon: '🛡️',
      borderColor: 'border-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
    },
  };

  const renderQuadrant = (quadrant: 'strength' | 'weakness' | 'opportunity' | 'threat') => {
    const config = quadrantConfig[quadrant];
    const items = getQuadrantItems(quadrant);

    return (
      <Card className={`p-4 ${config.bgColor} border-l-4 ${config.borderColor}`}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">{config.icon}</span>
          <div className="flex-1">
            <h3 className={`font-montserrat font-bold text-lg ${config.textColor}`}>
              {config.title}
            </h3>
            <p className="text-xs text-muted-foreground">{config.subtitle}</p>
          </div>
          <span className="text-sm font-semibold text-muted-foreground">
            {items.length} items
          </span>
        </div>

        <div className="space-y-2 min-h-[200px]">
          {items.map((item) => (
            <Card
              key={item.id}
              className="p-3 bg-white hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start gap-2">
                <span className="text-sm flex-1">{item.text}</span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEditItem(item)}
                    className="h-6 w-6 p-0"
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteSWOTItem(item.id)}
                    className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              {item.impactLevel && (
                <div className="mt-2 text-xs text-muted-foreground">
                  Impact: <span className="font-semibold capitalize">{item.impactLevel}</span>
                </div>
              )}
            </Card>
          ))}
        </div>

        <div className="mt-3 space-y-2">
          <Button
            size="sm"
            variant="outline"
            className="w-full"
            onClick={() => {
              setActiveQuadrant(quadrant);
              setEditingItem(null);
              setNewItemText('');
              setItemDetails({ details: '', evidence: '', impactLevel: 'medium' });
              setShowAddDialog(true);
            }}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add {config.title.slice(0, -1)}
          </Button>
          <Button size="sm" variant="ghost" className="w-full text-xs">
            <Sparkles className="h-3 w-3 mr-1" />
            Get AI Ideas
          </Button>
        </div>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-montserrat font-bold text-3xl text-biz-navy">
            SWOT Analysis: {currentAnalysis?.businessProfile?.businessName || 'Your Business'}
          </h2>
          <span className="text-sm text-muted-foreground">Step 2/3</span>
        </div>
        <p className="text-muted-foreground">
          Add factors to each quadrant. Click [+] to add items, or use AI suggestions.
        </p>
      </div>

      {/* SWOT Matrix Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {renderQuadrant('strength')}
        {renderQuadrant('weakness')}
        {renderQuadrant('opportunity')}
        {renderQuadrant('threat')}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <Button variant="outline" onClick={onBack}>
          ← Back
        </Button>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleSaveProgress}>
            <Save className="h-4 w-4 mr-2" />
            Save Progress
          </Button>
          <Button
            onClick={handleNext}
            className="bg-biz-navy hover:bg-biz-navy/90"
            disabled={currentAnalysis?.items.length === 0}
          >
            Next: Insights →
          </Button>
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit' : 'Add'} {quadrantConfig[activeQuadrant].title.slice(0, -1)}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="itemText">
                Description <span className="text-red-500">*</span>
              </Label>
              <Input
                id="itemText"
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                placeholder="E.g., Strong brand in local market"
                maxLength={200}
              />
              <p className="text-xs text-muted-foreground">
                {newItemText.length}/200 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="details">Details (Optional)</Label>
              <Textarea
                id="details"
                value={itemDetails.details}
                onChange={(e) => setItemDetails({ ...itemDetails, details: e.target.value })}
                placeholder="Add more context or explanation..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="evidence">Evidence/Data (Optional)</Label>
              <Textarea
                id="evidence"
                value={itemDetails.evidence}
                onChange={(e) => setItemDetails({ ...itemDetails, evidence: e.target.value })}
                placeholder="E.g., 70% brand awareness in 5-mile radius"
                rows={2}
              />
            </div>

            <div className="space-y-3">
              <Label>Impact Level</Label>
              <RadioGroup
                value={itemDetails.impactLevel}
                onValueChange={(value) => setItemDetails({ ...itemDetails, impactLevel: value as 'low' | 'medium' | 'high' })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="low" />
                  <Label htmlFor="low" className="font-normal cursor-pointer">Low</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium" className="font-normal cursor-pointer">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="high" />
                  <Label htmlFor="high" className="font-normal cursor-pointer">High</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={editingItem ? handleUpdateItem : handleAddItem}
              disabled={!newItemText.trim()}
              className="bg-biz-navy hover:bg-biz-navy/90"
            >
              {editingItem ? 'Update' : 'Add'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
