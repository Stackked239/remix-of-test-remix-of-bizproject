import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useJourneyMapStore, EmotionLevel } from "@/stores/journeyMapStore";
import { X } from "lucide-react";
import { toast } from "sonner";

const emotionOptions: { value: EmotionLevel; label: string; emoji: string }[] = [
  { value: 1, label: 'Very Frustrated', emoji: '😟' },
  { value: 2, label: 'Frustrated', emoji: '😕' },
  { value: 3, label: 'Neutral', emoji: '😐' },
  { value: 4, label: 'Satisfied', emoji: '🙂' },
  { value: 5, label: 'Delighted', emoji: '😃' },
];

export const TouchpointDetails = () => {
  const { currentMap, selectedTouchpointId, updateTouchpoint, setSelectedTouchpoint } = useJourneyMapStore();

  if (!selectedTouchpointId || !currentMap) return null;

  const touchpoint = currentMap.touchpoints.find(t => t.id === selectedTouchpointId);
  if (!touchpoint) return null;

  const handleUpdate = (field: string, value: any) => {
    updateTouchpoint(selectedTouchpointId, { [field]: value });
  };

  const handleSave = () => {
    toast.success("Touchpoint updated");
    setSelectedTouchpoint(null);
  };

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-montserrat text-biz-navy">Touchpoint Details</CardTitle>
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6"
            onClick={() => setSelectedTouchpoint(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="touchpoint-name" className="text-xs">Touchpoint Name</Label>
          <Input
            id="touchpoint-name"
            value={touchpoint.name}
            onChange={(e) => handleUpdate('name', e.target.value)}
            placeholder="e.g., Homepage Visit"
            className="h-8 text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="customer-action" className="text-xs">Customer Action</Label>
          <Input
            id="customer-action"
            value={touchpoint.customerAction}
            onChange={(e) => handleUpdate('customerAction', e.target.value)}
            placeholder="What does the customer do?"
            className="h-8 text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="business-action" className="text-xs">Business Action</Label>
          <Input
            id="business-action"
            value={touchpoint.businessAction}
            onChange={(e) => handleUpdate('businessAction', e.target.value)}
            placeholder="What do you do?"
            className="h-8 text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="emotion" className="text-xs">Customer Emotion</Label>
          <Select
            value={touchpoint.emotion?.toString()}
            onValueChange={(value) => handleUpdate('emotion', parseInt(value) as EmotionLevel)}
          >
            <SelectTrigger id="emotion" className="h-8 text-sm">
              <SelectValue placeholder="Select emotion" />
            </SelectTrigger>
            <SelectContent>
              {emotionOptions.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  <span className="flex items-center gap-2">
                    <span>{option.emoji}</span>
                    <span>{option.label}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes" className="text-xs">Notes & Observations</Label>
          <Textarea
            id="notes"
            value={touchpoint.notes}
            onChange={(e) => handleUpdate('notes', e.target.value)}
            placeholder="Add any additional notes..."
            className="text-sm resize-none"
            rows={4}
          />
        </div>

        <Button
          onClick={handleSave}
          className="w-full bg-biz-green hover:bg-biz-green/90"
          size="sm"
        >
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
};
