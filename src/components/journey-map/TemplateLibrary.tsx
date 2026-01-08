import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Store, Users, Cloud, Building2, LayoutTemplate } from "lucide-react";

interface TemplateLibraryProps {
  onSelectTemplate: (template: string) => void;
}

const templates = [
  { value: "blank", label: "Blank Canvas", icon: LayoutTemplate },
  { value: "ecommerce", label: "E-commerce Journey", icon: ShoppingCart },
  { value: "service", label: "Service-Based Business", icon: Users },
  { value: "b2b", label: "B2B Sales Journey", icon: Building2 },
  { value: "saas", label: "SaaS Customer Journey", icon: Cloud },
  { value: "retail", label: "Retail Store Journey", icon: Store },
];

export const TemplateLibrary = ({ onSelectTemplate }: TemplateLibraryProps) => {
  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-montserrat text-biz-navy">Templates</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Select onValueChange={onSelectTemplate}>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Select a template" />
          </SelectTrigger>
          <SelectContent>
            {templates.map((template) => {
              const Icon = template.icon;
              return (
                <SelectItem key={template.value} value={template.value}>
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span>{template.label}</span>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <p className="text-xs text-biz-grey">
          Start with a pre-built template or begin with a blank canvas
        </p>
      </CardContent>
    </Card>
  );
};
