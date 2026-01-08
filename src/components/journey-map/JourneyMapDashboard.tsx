import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useJourneyMapStore } from "@/stores/journeyMapStore";
import { Map, Plus, Clock, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

interface JourneyMapDashboardProps {
  onStartNew: (name: string) => void;
  onLoadMap: (id: string) => void;
}

export const JourneyMapDashboard = ({ onStartNew, onLoadMap }: JourneyMapDashboardProps) => {
  const { savedMaps, deleteMap } = useJourneyMapStore();
  const [newMapName, setNewMapName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateNew = () => {
    if (!newMapName.trim()) {
      toast.error("Please enter a map name");
      return;
    }
    onStartNew(newMapName.trim());
    setIsDialogOpen(false);
    setNewMapName("");
  };

  const handleDelete = (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Delete "${name}"? This action cannot be undone.`)) {
      deleteMap(id);
      toast.success("Journey map deleted");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-biz-green/15 mb-4">
          <Map className="h-8 w-8 text-biz-green" />
        </div>
        <h1 className="text-4xl font-montserrat font-bold text-biz-navy mb-4">
          Customer Journey Maps
        </h1>
        <p className="text-lg text-biz-blue max-w-2xl mx-auto">
          Visualize your customer's experience from first touch to loyal advocate. Map touchpoints, emotions, and opportunities to optimize every interaction.
        </p>
      </div>

      {/* Create New Button */}
      <div className="flex justify-center mb-8">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="bg-biz-green hover:bg-biz-green/90">
              <Plus className="mr-2 h-5 w-5" />
              Create New Journey Map
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Journey Map</DialogTitle>
              <DialogDescription>
                Give your customer journey map a descriptive name
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Input
                placeholder="e.g., E-commerce Customer Journey"
                value={newMapName}
                onChange={(e) => setNewMapName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateNew()}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateNew} className="bg-biz-green hover:bg-biz-green/90">
                Create Map
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Saved Maps */}
      {savedMaps.length > 0 && (
        <div>
          <h2 className="text-2xl font-montserrat font-bold text-biz-navy mb-6">
            Your Journey Maps
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {savedMaps.map((map) => (
              <Card
                key={map.id}
                className="cursor-pointer hover:shadow-lg transition-shadow border-biz-grey/20"
                onClick={() => onLoadMap(map.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-montserrat text-biz-navy line-clamp-1">
                        {map.name}
                      </CardTitle>
                      <CardDescription className="mt-2 flex items-center gap-2 text-biz-grey">
                        <Clock className="h-4 w-4" />
                        {format(new Date(map.updatedAt), 'MMM d, yyyy')}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={(e) => handleDelete(map.id, map.name, e)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-biz-grey">
                    <div className="flex justify-between">
                      <span>Personas:</span>
                      <span className="font-semibold text-biz-navy">{map.personas.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Touchpoints:</span>
                      <span className="font-semibold text-biz-navy">{map.touchpoints.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pain Points:</span>
                      <span className="font-semibold text-destructive">{map.painPoints.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Opportunities:</span>
                      <span className="font-semibold text-biz-green">{map.opportunities.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {savedMaps.length === 0 && (
        <Card className="border-dashed border-2 border-biz-grey/30">
          <CardContent className="py-12 text-center">
            <Map className="h-12 w-12 text-biz-grey/50 mx-auto mb-4" />
            <p className="text-biz-grey mb-4">
              No journey maps yet. Create your first map to start visualizing your customer experience.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
