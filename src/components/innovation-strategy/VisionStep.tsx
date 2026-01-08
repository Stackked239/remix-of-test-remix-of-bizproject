import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Lightbulb, AlertCircle } from "lucide-react";
import { useInnovationStrategyStore } from "@/stores/innovationStrategyStore";
import { Alert, AlertDescription } from "@/components/ui/alert";

const strategicIntents = [
  { value: "lead", label: "Lead our industry", description: "Be the innovator everyone copies" },
  { value: "follow", label: "Keep pace with leaders", description: "Fast follower approach" },
  { value: "niche", label: "Serve a specific niche better than anyone", description: "Focused specialist" },
  { value: "disrupt", label: "Disrupt with a new business model", description: "Game-changer" }
];

const customerPersonas = [
  { value: "existing", label: "Existing customers", description: "Keep and grow current relationships" },
  { value: "adjacent", label: "Adjacent customers", description: "Similar needs, new segment" },
  { value: "new", label: "Entirely new customers", description: "New market" }
];

const VisionStep = () => {
  const { data, updateVision } = useInnovationStrategyStore();
  const vision = data.vision;
  const [showExample, setShowExample] = useState(false);

  const handlePersonaToggle = (persona: string, checked: boolean) => {
    const current = vision.customerPersonas;
    if (checked && current.length < 2) {
      updateVision({ customerPersonas: [...current, persona] });
    } else if (!checked) {
      updateVision({ customerPersonas: current.filter(p => p !== persona) });
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-biz-navy mb-2">
          Step 2: Vision
        </h2>
        <p className="font-open-sans text-muted-foreground">
          Define your strategic intent and competitive positioning
        </p>
      </div>

      {/* Strategic Intent */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Label className="font-montserrat font-semibold">
              Strategic Intent <span className="text-destructive">*</span>
            </Label>
            <RadioGroup
              value={vision.strategicIntent}
              onValueChange={(value) => updateVision({ strategicIntent: value })}
              className="space-y-3"
            >
              {strategicIntents.map((intent) => (
                <div 
                  key={intent.value} 
                  className={`flex items-start space-x-3 p-4 rounded-lg border transition-colors ${
                    vision.strategicIntent === intent.value 
                      ? 'border-biz-teal bg-biz-teal/5' 
                      : 'border-border hover:border-biz-teal/50'
                  }`}
                >
                  <RadioGroupItem value={intent.value} id={intent.value} className="mt-1" />
                  <div>
                    <Label htmlFor={intent.value} className="font-open-sans font-semibold cursor-pointer">
                      {intent.label}
                    </Label>
                    <p className="text-sm text-muted-foreground font-open-sans">
                      {intent.description}
                    </p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* 3-Year Ambition Statement */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <Label htmlFor="ambition" className="font-montserrat font-semibold">
              3-Year Ambition Statement <span className="text-destructive">*</span>
            </Label>
            <p className="text-sm text-muted-foreground font-open-sans">
              Complete this sentence: "In 3 years, we will be known for..."
            </p>
            <Textarea
              id="ambition"
              placeholder="e.g., In 3 years, we will be known for the fastest delivery times in the Midwest and proprietary logistics software that customers can track in real-time."
              value={vision.threeYearAmbition}
              onChange={(e) => updateVision({ threeYearAmbition: e.target.value })}
              className="min-h-[100px] font-open-sans"
              maxLength={300}
            />
            <div className="flex justify-between items-center">
              <Alert className="bg-biz-lime/10 border-biz-lime/30 py-2 flex-1 mr-4">
                <AlertCircle className="h-4 w-4 text-biz-lime" />
                <AlertDescription className="text-xs font-open-sans">
                  Be specific. Vague = "We'll be the best." Specific = "We'll deliver in 48 hours vs. industry standard 7 days."
                </AlertDescription>
              </Alert>
              <p className="text-xs text-muted-foreground font-open-sans whitespace-nowrap">
                {vision.threeYearAmbition.length}/300
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Core Differentiator */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <Label htmlFor="coreDiff" className="font-montserrat font-semibold">
              Core Differentiator (TODAY) <span className="text-destructive">*</span>
            </Label>
            <p className="text-sm text-muted-foreground font-open-sans">
              What do customers choose you for right now? Why do they pick you over competitors?
            </p>
            <Textarea
              id="coreDiff"
              placeholder="e.g., Customers choose us for custom engineering - we solve problems competitors consider 'too complex' or 'not worth the hassle.'"
              value={vision.coreDifferentiator}
              onChange={(e) => updateVision({ coreDifferentiator: e.target.value })}
              className="min-h-[100px] font-open-sans"
              maxLength={400}
            />
            <p className="text-xs text-muted-foreground text-right font-open-sans">
              {vision.coreDifferentiator.length}/400 characters
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Future Differentiator */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <Label htmlFor="futureDiff" className="font-montserrat font-semibold">
              Future Differentiator (3 YEARS) <span className="text-destructive">*</span>
            </Label>
            <p className="text-sm text-muted-foreground font-open-sans">
              What new capability, product, or service will set you apart by 2028?
            </p>
            <Textarea
              id="futureDiff"
              placeholder="e.g., By 2028, we'll offer AI-powered design automation that cuts customer engineering time from weeks to hours."
              value={vision.futureDifferentiator}
              onChange={(e) => updateVision({ futureDifferentiator: e.target.value })}
              className="min-h-[100px] font-open-sans"
              maxLength={400}
            />
            <p className="text-xs text-muted-foreground text-right font-open-sans">
              {vision.futureDifferentiator.length}/400 characters
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Customer Persona Priority */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Label className="font-montserrat font-semibold">
                Customer Persona Priority <span className="text-destructive">*</span>
              </Label>
              <p className="text-sm text-muted-foreground font-open-sans mt-1">
                Who are you innovating FOR? Select 1-2 personas (max 2)
              </p>
            </div>
            <div className="space-y-3">
              {customerPersonas.map((persona) => (
                <div 
                  key={persona.value}
                  className={`flex items-start space-x-3 p-4 rounded-lg border transition-colors ${
                    vision.customerPersonas.includes(persona.value)
                      ? 'border-biz-teal bg-biz-teal/5'
                      : 'border-border hover:border-biz-teal/50'
                  }`}
                >
                  <Checkbox
                    id={persona.value}
                    checked={vision.customerPersonas.includes(persona.value)}
                    onCheckedChange={(checked) => handlePersonaToggle(persona.value, checked as boolean)}
                    disabled={!vision.customerPersonas.includes(persona.value) && vision.customerPersonas.length >= 2}
                    className="mt-1"
                  />
                  <div>
                    <Label htmlFor={persona.value} className="font-open-sans font-semibold cursor-pointer">
                      {persona.label}
                    </Label>
                    <p className="text-sm text-muted-foreground font-open-sans">
                      {persona.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Example Card */}
      <Collapsible open={showExample} onOpenChange={setShowExample}>
        <Card className="border-biz-teal/30 bg-biz-teal/5">
          <CollapsibleTrigger className="w-full">
            <CardHeader className="cursor-pointer hover:bg-biz-teal/10 transition-colors">
              <CardTitle className="flex items-center justify-between text-biz-teal font-montserrat text-lg">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  See Example: Tech Startup
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform ${showExample ? 'rotate-180' : ''}`} />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="space-y-3 font-open-sans text-sm">
                <p><strong>Strategic Intent:</strong> Disrupt with new model</p>
                <p><strong>3-Year Vision:</strong> "We'll replace expensive consulting with $99/month AI advisor"</p>
                <p><strong>Differentiator TODAY:</strong> Speed</p>
                <p><strong>Differentiator FUTURE:</strong> AI-powered insights at 1/10th the cost</p>
                <p><strong>Customer Priority:</strong> Entirely new customers (new market)</p>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
};

export default VisionStep;
