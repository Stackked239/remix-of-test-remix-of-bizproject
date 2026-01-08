import { useDroppable } from "@dnd-kit/core";
import { useJourneyMapStore, Touchpoint, ChannelType } from "@/stores/journeyMapStore";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, Mail, Phone, MessageSquare, Store, Smartphone, Headphones, Star, TrendingUp, Facebook, Users, Calendar, Plus, Trash2, Edit2, Flag, Lightbulb } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const channelIcons: Record<ChannelType, React.ReactNode> = {
  'website': <Globe className="h-4 w-4" />,
  'email': <Mail className="h-4 w-4" />,
  'phone': <Phone className="h-4 w-4" />,
  'social-media': <Facebook className="h-4 w-4" />,
  'in-store': <Store className="h-4 w-4" />,
  'chat': <MessageSquare className="h-4 w-4" />,
  'mobile-app': <Smartphone className="h-4 w-4" />,
  'support': <Headphones className="h-4 w-4" />,
  'reviews': <Star className="h-4 w-4" />,
  'ads': <TrendingUp className="h-4 w-4" />,
  'word-of-mouth': <Users className="h-4 w-4" />,
  'newsletter': <Mail className="h-4 w-4" />,
  'events': <Calendar className="h-4 w-4" />,
};

const emotionEmojis: Record<number, string> = {
  1: '😟',
  2: '😕',
  3: '😐',
  4: '🙂',
  5: '😃',
};

interface DroppableStageProps {
  stageId: string;
  stageName: string;
  touchpoints: Touchpoint[];
  onEditStage: (id: string, name: string) => void;
  onDeleteStage: (id: string) => void;
}

const DroppableStage = ({ stageId, stageName, touchpoints, onEditStage, onDeleteStage }: DroppableStageProps) => {
  const { setNodeRef, isOver } = useDroppable({ id: stageId });
  const { deleteTouchpoint, setSelectedTouchpoint, currentMap } = useJourneyMapStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(stageName);

  const handleSaveEdit = () => {
    if (editName.trim()) {
      onEditStage(stageId, editName);
      setIsEditing(false);
    }
  };

  const painPoints = currentMap?.painPoints.filter(p => p.stageId === stageId) || [];
  const opportunities = currentMap?.opportunities.filter(o => o.stageId === stageId) || [];

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 min-w-[200px] border-2 border-dashed rounded-lg p-4 transition-colors ${
        isOver ? 'border-biz-green bg-biz-green/5' : 'border-border bg-background'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        {isEditing ? (
          <Input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
            className="h-8 font-montserrat font-semibold"
            autoFocus
          />
        ) : (
          <h3 className="font-montserrat font-semibold text-biz-navy">{stageName}</h3>
        )}
        <div className="flex gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit2 className="h-3 w-3" />
          </Button>
          {currentMap && currentMap.stages.length > 1 && (
            <Button
              size="icon"
              variant="ghost"
              className="h-6 w-6 text-destructive hover:text-destructive"
              onClick={() => onDeleteStage(stageId)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>

      {/* Markers */}
      <div className="flex gap-2 mb-3 text-xs">
        {painPoints.length > 0 && (
          <div className="flex items-center gap-1 text-destructive">
            <Flag className="h-3 w-3" />
            <span>{painPoints.length}</span>
          </div>
        )}
        {opportunities.length > 0 && (
          <div className="flex items-center gap-1 text-biz-green">
            <Lightbulb className="h-3 w-3" />
            <span>{opportunities.length}</span>
          </div>
        )}
      </div>

      <div className="space-y-2 min-h-[300px]">
        {touchpoints.map((touchpoint) => (
          <Card
            key={touchpoint.id}
            className="p-3 cursor-pointer hover:shadow-md transition-shadow border-biz-grey/20 group"
            onClick={() => setSelectedTouchpoint(touchpoint.id)}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 flex-1">
                <div className="text-biz-navy">{channelIcons[touchpoint.channel]}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-biz-navy line-clamp-1">
                    {touchpoint.name || touchpoint.channel.replace('-', ' ')}
                  </p>
                  {touchpoint.emotion && (
                    <span className="text-lg">{emotionEmojis[touchpoint.emotion]}</span>
                  )}
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTouchpoint(touchpoint.id);
                  toast.success("Touchpoint deleted");
                }}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </Card>
        ))}
        {touchpoints.length === 0 && !isOver && (
          <p className="text-xs text-biz-grey text-center py-8">
            Drag touchpoints here
          </p>
        )}
      </div>
    </div>
  );
};

export const JourneyCanvas = () => {
  const { currentMap, addStage, updateStage, deleteStage } = useJourneyMapStore();

  const handleAddStage = () => {
    const stageName = prompt("Enter stage name:");
    if (stageName?.trim()) {
      addStage(stageName);
      toast.success("Stage added");
    }
  };

  const handleDeleteStage = (id: string) => {
    if (window.confirm("Delete this stage and all its touchpoints?")) {
      deleteStage(id);
      toast.success("Stage deleted");
    }
  };

  if (!currentMap) return null;

  const sortedStages = [...currentMap.stages].sort((a, b) => a.position - b.position);

  return (
    <div className="space-y-4">
      {/* Emotional Journey Summary */}
      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border">
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Flag className="h-4 w-4 text-destructive" />
            <span className="font-medium">Pain Points:</span>
            <span className="text-destructive font-bold">{currentMap.painPoints.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-biz-green" />
            <span className="font-medium">Opportunities:</span>
            <span className="text-biz-green font-bold">{currentMap.opportunities.length}</span>
          </div>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={handleAddStage}
          className="h-8"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Stage
        </Button>
      </div>

      {/* Journey Stages */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {sortedStages.map((stage) => {
          const stageTouchpoints = currentMap.touchpoints.filter(t => t.stageId === stage.id);
          return (
            <DroppableStage
              key={stage.id}
              stageId={stage.id}
              stageName={stage.name}
              touchpoints={stageTouchpoints}
              onEditStage={updateStage}
              onDeleteStage={handleDeleteStage}
            />
          );
        })}
      </div>
    </div>
  );
};
