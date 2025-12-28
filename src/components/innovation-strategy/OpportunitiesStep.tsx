import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Plus, 
  Trash2, 
  ChevronDown, 
  Factory, 
  GripVertical,
  AlertCircle
} from "lucide-react";
import { useInnovationStrategyStore, Opportunity } from "@/stores/innovationStrategyStore";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const opportunityTypes = [
  "New Product/Service",
  "Product/Service Enhancement",
  "Process Improvement (Internal)",
  "New Business Model",
  "Technology Implementation",
  "Market Expansion"
];

const impactLevels = [
  { value: "high", label: "High Impact", description: "Game-changer (10x improvement or new revenue stream)" },
  { value: "medium", label: "Medium Impact", description: "Meaningful (2-5x improvement or efficiency gain)" },
  { value: "low", label: "Low Impact", description: "Incremental (10-25% improvement)" }
];

const effortLevels = [
  { value: "low", label: "Low Effort", description: "Can do in 1-3 months with current team/resources" },
  { value: "medium", label: "Medium Effort", description: "3-6 months, may need new skills/tools" },
  { value: "high", label: "High Effort", description: "6-12+ months, significant investment required" }
];

const OpportunitiesStep = () => {
  const { data, addOpportunity, updateOpportunity, removeOpportunity } = useInnovationStrategyStore();
  const [showExample, setShowExample] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [expandedOpps, setExpandedOpps] = useState<string[]>([]);

  const toggleExpanded = (id: string) => {
    setExpandedOpps(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleAddOpportunity = () => {
    if (data.opportunities.length >= 5) return;
    const newOpp: Opportunity = {
      id: `opp_${Date.now()}`,
      title: "",
      problemDescription: "",
      opportunityType: "",
      estimatedImpact: "",
      effortToExecute: ""
    };
    addOpportunity(newOpp);
    setExpandedOpps(prev => [...prev, newOpp.id]);
  };

  const handleDelete = () => {
    if (deleteConfirmId) {
      removeOpportunity(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-biz-lime';
      case 'medium': return 'text-biz-citrine';
      case 'low': return 'text-biz-grey';
      default: return 'text-muted-foreground';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'low': return 'text-biz-lime';
      case 'medium': return 'text-biz-citrine';
      case 'high': return 'text-biz-copper';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-biz-navy mb-2">
          Step 3: Opportunities
        </h2>
        <p className="font-open-sans text-muted-foreground">
          Identify 3-5 specific problems you'll solve through innovation
        </p>
      </div>

      {/* Instructions */}
      <Alert className="bg-biz-navy/5 border-biz-navy/20">
        <AlertCircle className="h-4 w-4 text-biz-navy" />
        <AlertDescription className="font-open-sans text-sm">
          List 3-5 customer problems, market gaps, or internal inefficiencies you could solve with innovation. 
          Be specific. "Improve customer service" is vague. "Reduce customer support response time from 24 hours to 2 hours" is specific.
        </AlertDescription>
      </Alert>

      {/* Opportunities List */}
      <div className="space-y-4">
        {data.opportunities.map((opp, index) => (
          <Card 
            key={opp.id} 
            className={`border-l-4 ${
              opp.title && opp.problemDescription && opp.opportunityType && opp.estimatedImpact && opp.effortToExecute
                ? 'border-l-biz-lime'
                : 'border-l-biz-citrine'
            }`}
          >
            <Collapsible 
              open={expandedOpps.includes(opp.id)} 
              onOpenChange={() => toggleExpanded(opp.id)}
            >
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors py-4">
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <GripVertical className="w-4 h-4 text-muted-foreground" />
                      <span className="font-montserrat font-bold text-biz-navy">
                        Opportunity #{index + 1}
                      </span>
                      {opp.title && (
                        <span className="font-open-sans text-muted-foreground">
                          — {opp.title}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      {opp.estimatedImpact && (
                        <span className={`text-xs font-semibold ${getImpactColor(opp.estimatedImpact)}`}>
                          {opp.estimatedImpact.toUpperCase()} IMPACT
                        </span>
                      )}
                      {opp.effortToExecute && (
                        <span className={`text-xs font-semibold ${getEffortColor(opp.effortToExecute)}`}>
                          {opp.effortToExecute.toUpperCase()} EFFORT
                        </span>
                      )}
                      <ChevronDown className={`w-5 h-5 transition-transform ${expandedOpps.includes(opp.id) ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </CollapsibleTrigger>
              </CardHeader>
              <CollapsibleContent>
                <CardContent className="space-y-4 pt-0">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label className="font-montserrat font-semibold">
                      Opportunity Title <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      placeholder="e.g., Real-time order tracking for customers"
                      value={opp.title}
                      onChange={(e) => updateOpportunity(opp.id, { title: e.target.value })}
                      maxLength={100}
                      className="font-open-sans"
                    />
                  </div>

                  {/* Problem Description */}
                  <div className="space-y-2">
                    <Label className="font-montserrat font-semibold">
                      Problem Description <span className="text-destructive">*</span>
                    </Label>
                    <p className="text-xs text-muted-foreground font-open-sans">
                      What's the problem? Who has it? How expensive/painful is it?
                    </p>
                    <Textarea
                      placeholder="e.g., Customers call us 3-5 times per order asking 'Where's my stuff?' We spend 10+ hours weekly on status calls. Customers are frustrated; we're wasting time."
                      value={opp.problemDescription}
                      onChange={(e) => updateOpportunity(opp.id, { problemDescription: e.target.value })}
                      maxLength={400}
                      className="min-h-[80px] font-open-sans"
                    />
                    <p className="text-xs text-muted-foreground text-right font-open-sans">
                      {opp.problemDescription.length}/400
                    </p>
                  </div>

                  {/* Opportunity Type */}
                  <div className="space-y-2">
                    <Label className="font-montserrat font-semibold">
                      Opportunity Type <span className="text-destructive">*</span>
                    </Label>
                    <Select 
                      value={opp.opportunityType} 
                      onValueChange={(value) => updateOpportunity(opp.id, { opportunityType: value })}
                    >
                      <SelectTrigger className="font-open-sans">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {opportunityTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Impact */}
                  <div className="space-y-3">
                    <Label className="font-montserrat font-semibold">
                      Estimated Impact <span className="text-destructive">*</span>
                    </Label>
                    <RadioGroup
                      value={opp.estimatedImpact}
                      onValueChange={(value) => updateOpportunity(opp.id, { estimatedImpact: value })}
                      className="space-y-2"
                    >
                      {impactLevels.map((level) => (
                        <div key={level.value} className="flex items-start space-x-3">
                          <RadioGroupItem value={level.value} id={`${opp.id}-impact-${level.value}`} className="mt-1" />
                          <div>
                            <Label htmlFor={`${opp.id}-impact-${level.value}`} className="font-open-sans font-semibold cursor-pointer">
                              {level.label}
                            </Label>
                            <p className="text-xs text-muted-foreground font-open-sans">{level.description}</p>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Effort */}
                  <div className="space-y-3">
                    <Label className="font-montserrat font-semibold">
                      Effort to Execute <span className="text-destructive">*</span>
                    </Label>
                    <RadioGroup
                      value={opp.effortToExecute}
                      onValueChange={(value) => updateOpportunity(opp.id, { effortToExecute: value })}
                      className="space-y-2"
                    >
                      {effortLevels.map((level) => (
                        <div key={level.value} className="flex items-start space-x-3">
                          <RadioGroupItem value={level.value} id={`${opp.id}-effort-${level.value}`} className="mt-1" />
                          <div>
                            <Label htmlFor={`${opp.id}-effort-${level.value}`} className="font-open-sans font-semibold cursor-pointer">
                              {level.label}
                            </Label>
                            <p className="text-xs text-muted-foreground font-open-sans">{level.description}</p>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Delete Button */}
                  <div className="pt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeleteConfirmId(opp.id)}
                      className="text-destructive border-destructive/50 hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Opportunity
                    </Button>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>

      {/* Add Button */}
      {data.opportunities.length < 5 && (
        <Button
          onClick={handleAddOpportunity}
          className="w-full bg-biz-teal hover:bg-biz-teal/90 text-white font-montserrat"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Opportunity ({data.opportunities.length}/5)
        </Button>
      )}

      {/* Validation Message */}
      {data.opportunities.length < 3 && (
        <Alert className="bg-biz-citrine/10 border-biz-citrine/30">
          <AlertCircle className="h-4 w-4 text-biz-citrine" />
          <AlertDescription className="font-open-sans text-sm">
            Please add at least 3 opportunities to continue (currently {data.opportunities.length})
          </AlertDescription>
        </Alert>
      )}

      {/* Example Card */}
      <Collapsible open={showExample} onOpenChange={setShowExample}>
        <Card className="border-biz-teal/30 bg-biz-teal/5">
          <CollapsibleTrigger className="w-full">
            <CardHeader className="cursor-pointer hover:bg-biz-teal/10 transition-colors">
              <CardTitle className="flex items-center justify-between text-biz-teal font-montserrat text-lg">
                <div className="flex items-center gap-2">
                  <Factory className="w-5 h-5" />
                  See Example: Manufacturing Company
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform ${showExample ? 'rotate-180' : ''}`} />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="space-y-3 font-open-sans text-sm">
                <p><strong>Opportunity:</strong> Automated quoting system</p>
                <p><strong>Problem:</strong> Manual quotes take 2-3 days; customers go to competitors who quote same day</p>
                <p><strong>Type:</strong> Process Improvement</p>
                <p><strong>Impact:</strong> High (win 30% more deals)</p>
                <p><strong>Effort:</strong> Medium (3-4 months to build)</p>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteConfirmId} onOpenChange={() => setDeleteConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Opportunity?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove this opportunity. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default OpportunitiesStep;
