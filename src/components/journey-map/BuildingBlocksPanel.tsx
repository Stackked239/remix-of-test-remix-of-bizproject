import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDraggable } from "@dnd-kit/core";
import { Globe, Mail, Phone, MessageSquare, Store, Smartphone, Headphones, Star, TrendingUp, Facebook, ShoppingBag, Users, Calendar, Flag, Lightbulb, User } from "lucide-react";
import { ChannelType } from "@/stores/journeyMapStore";

interface DraggableItemProps {
  id: string;
  type: 'touchpoint' | 'emotion' | 'pain-point' | 'opportunity';
  label: string;
  icon: React.ReactNode;
  data?: any;
}

const DraggableItem = ({ id, type, label, icon, data }: DraggableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: { type, ...data },
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    opacity: isDragging ? 0.5 : 1,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex items-center gap-2 p-2 rounded-lg bg-background hover:bg-muted cursor-grab active:cursor-grabbing border border-border transition-colors"
    >
      <div className="text-biz-navy">{icon}</div>
      <span className="text-sm text-foreground">{label}</span>
    </div>
  );
};

interface BuildingBlocksPanelProps {}

const channelIcons: Record<ChannelType, { icon: React.ReactNode; label: string }> = {
  'website': { icon: <Globe className="h-4 w-4" />, label: 'Website' },
  'email': { icon: <Mail className="h-4 w-4" />, label: 'Email' },
  'phone': { icon: <Phone className="h-4 w-4" />, label: 'Phone' },
  'social-media': { icon: <Facebook className="h-4 w-4" />, label: 'Social Media' },
  'in-store': { icon: <Store className="h-4 w-4" />, label: 'In-Store' },
  'chat': { icon: <MessageSquare className="h-4 w-4" />, label: 'Live Chat' },
  'mobile-app': { icon: <Smartphone className="h-4 w-4" />, label: 'Mobile App' },
  'support': { icon: <Headphones className="h-4 w-4" />, label: 'Support' },
  'reviews': { icon: <Star className="h-4 w-4" />, label: 'Reviews' },
  'ads': { icon: <TrendingUp className="h-4 w-4" />, label: 'Advertising' },
  'word-of-mouth': { icon: <Users className="h-4 w-4" />, label: 'Word of Mouth' },
  'newsletter': { icon: <Mail className="h-4 w-4" />, label: 'Newsletter' },
  'events': { icon: <Calendar className="h-4 w-4" />, label: 'Events' },
};

export const BuildingBlocksPanel = ({}: BuildingBlocksPanelProps) => {
  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-montserrat text-biz-navy">Building Blocks</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[600px]">
          <div className="space-y-4 p-4">
            {/* Touchpoints */}
            <div>
              <h4 className="text-sm font-semibold text-biz-grey mb-2">Touchpoints</h4>
              <div className="space-y-2">
                {(Object.entries(channelIcons) as [ChannelType, { icon: React.ReactNode; label: string }][]).map(([channel, { icon, label }]) => (
                  <DraggableItem
                    key={channel}
                    id={`touchpoint-${channel}`}
                    type="touchpoint"
                    label={label}
                    icon={icon}
                    data={{ channel }}
                  />
                ))}
              </div>
            </div>

            {/* Markers */}
            <div>
              <h4 className="text-sm font-semibold text-biz-grey mb-2">Markers</h4>
              <div className="space-y-2">
                <DraggableItem
                  id="pain-point"
                  type="pain-point"
                  label="Pain Point"
                  icon={<Flag className="h-4 w-4 text-destructive" />}
                />
                <DraggableItem
                  id="opportunity"
                  type="opportunity"
                  label="Opportunity"
                  icon={<Lightbulb className="h-4 w-4 text-biz-green" />}
                />
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
