import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { useSWOTStore, SWOTItem } from "@/stores/swotStore";
import { Plus, Sparkles, X, Edit2, Save, Info, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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
  const [showAIDialog, setShowAIDialog] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<Array<{ text: string; impactLevel: 'low' | 'medium' | 'high'; selected: boolean }>>([]);
  const [isGenerating, setIsGenerating] = useState(false);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onNext();
  };

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onBack();
  };

  const handleGetAIIdeas = async (quadrant: 'strength' | 'weakness' | 'opportunity' | 'threat') => {
    if (!currentAnalysis?.businessProfile) {
      toast.error('Please complete business profile first');
      return;
    }

    setActiveQuadrant(quadrant);
    setIsGenerating(true);
    setShowAIDialog(true);
    setAiSuggestions([]);

    try {
      const existingItems = getQuadrantItems(quadrant).map(item => item.text);
      
      const { data, error } = await supabase.functions.invoke('generate-swot-ideas', {
        body: {
          quadrant,
          businessProfile: currentAnalysis.businessProfile,
          existingItems,
        }
      });

      if (error) throw error;

      if (data?.suggestions) {
        setAiSuggestions(data.suggestions.map((s: any) => ({ ...s, selected: false })));
        toast.success('AI suggestions generated!');
      } else {
        throw new Error('No suggestions received');
      }
    } catch (error: any) {
      console.error('Error generating AI ideas:', error);
      toast.error(error.message || 'Failed to generate suggestions');
      setShowAIDialog(false);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddAISuggestions = () => {
    const selectedSuggestions = aiSuggestions.filter(s => s.selected);
    
    selectedSuggestions.forEach(suggestion => {
      addSWOTItem({
        quadrant: activeQuadrant,
        text: suggestion.text,
        impactLevel: suggestion.impactLevel,
      });
    });

    toast.success(`Added ${selectedSuggestions.length} suggestion(s)`);
    setShowAIDialog(false);
    setAiSuggestions([]);
  };

  const toggleSuggestion = (index: number) => {
    setAiSuggestions(prev => 
      prev.map((s, i) => i === index ? { ...s, selected: !s.selected } : s)
    );
  };

  const quadrantConfig = {
    strength: {
      title: 'STRENGTHS',
      singular: 'Strength',
      subtitle: 'Internal • Positive',
      icon: '💪',
      borderColor: 'border-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      helpText: 'Internal positive factors you control. What does your business do well? What unique resources, skills, or advantages do you have? Examples: Strong brand reputation, skilled team, proprietary technology, loyal customer base, prime location.',
    },
    weakness: {
      title: 'WEAKNESSES',
      singular: 'Weakness',
      subtitle: 'Internal • Negative',
      icon: '⚠️',
      borderColor: 'border-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      helpText: 'Internal negative factors you need to improve. What could your business do better? Where are you lacking resources or capabilities? Examples: Limited cash flow, outdated equipment, skill gaps, poor online presence, inefficient processes.',
    },
    opportunity: {
      title: 'OPPORTUNITIES',
      singular: 'Opportunity',
      subtitle: 'External • Positive',
      icon: '🎯',
      borderColor: 'border-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      helpText: 'External positive factors in the market. What favorable trends, market conditions, or circumstances could you leverage? Examples: Growing market demand, new technology, partnerships, untapped customer segments, government incentives.',
    },
    threat: {
      title: 'THREATS',
      singular: 'Threat',
      subtitle: 'External • Negative',
      icon: '🛡️',
      borderColor: 'border-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      helpText: 'External negative factors you need to prepare for. What market conditions, competitors, or external forces could harm your business? Examples: New competitors, economic downturn, changing regulations, supply chain disruptions, shifting customer preferences.',
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
            <div className="flex items-center gap-2">
              <h3 className={`font-montserrat font-bold text-lg ${config.textColor}`}>
                {config.title}
              </h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="focus:outline-none">
                      <Info className={`h-4 w-4 ${config.textColor} opacity-60 hover:opacity-100 transition-opacity`} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs bg-card border-2 shadow-lg">
                    <p className="text-sm leading-relaxed">{config.helpText}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
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
            Add {config.singular}
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className="w-full text-xs"
            onClick={() => handleGetAIIdeas(quadrant)}
          >
            <Sparkles className="h-3 w-3 mr-1" />
            Get AI Ideas
          </Button>
        </div>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 pt-44 pb-8 max-w-7xl">
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
        <Button variant="outline" onClick={handleBack}>
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

      {/* AI Suggestions Dialog */}
      <Dialog open={showAIDialog} onOpenChange={setShowAIDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-biz-navy" />
              AI Suggestions: {quadrantConfig[activeQuadrant].singular}
            </DialogTitle>
          </DialogHeader>

          {isGenerating ? (
            <div className="flex flex-col items-center justify-center py-8 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-biz-navy" />
              <p className="text-muted-foreground">Generating AI suggestions for your business...</p>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Select suggestions to add to your SWOT analysis:
                </p>
                {aiSuggestions.map((suggestion, index) => (
                  <Card 
                    key={index}
                    className="p-3 hover:bg-accent/50 transition-colors cursor-pointer"
                    onClick={() => toggleSuggestion(index)}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={suggestion.selected}
                        onCheckedChange={(checked) => {
                          const isChecked = checked === true;
                          setAiSuggestions(prev =>
                            prev.map((s, i) => (i === index ? { ...s, selected: isChecked } : s))
                          );
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <p className="text-sm">{suggestion.text}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Impact: <span className="font-semibold capitalize">{suggestion.impactLevel}</span>
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAIDialog(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleAddAISuggestions}
                  disabled={!aiSuggestions.some(s => s.selected)}
                  className="bg-biz-navy hover:bg-biz-navy/90"
                >
                  Add Selected ({aiSuggestions.filter(s => s.selected).length})
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add/Edit Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit' : 'Add'} {quadrantConfig[activeQuadrant].singular}
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
