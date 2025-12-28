import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  ChevronDown, 
  Laptop,
  Zap,
  Wrench,
  Rocket,
  Calendar,
  AlertCircle
} from "lucide-react";
import { useInnovationStrategyStore } from "@/stores/innovationStrategyStore";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { format, addDays } from "date-fns";

const reviewCadences = ['Weekly', 'Bi-weekly', 'Monthly'];

const RoadmapStep = () => {
  const { data, updateRoadmap } = useInnovationStrategyStore();
  const [showExample, setShowExample] = useState(false);
  const roadmap = data.roadmap;

  // Default to 90 days from now if not set
  const defaultDate = format(addDays(new Date(), 90), 'yyyy-MM-dd');

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-biz-navy mb-2">
          Step 6: Roadmap
        </h2>
        <p className="font-open-sans text-muted-foreground">
          Create your 90-day action plan
        </p>
      </div>

      {/* Instructions */}
      <Alert className="bg-biz-navy/5 border-biz-navy/20">
        <AlertCircle className="h-4 w-4 text-biz-navy" />
        <AlertDescription className="font-open-sans text-sm">
          Break your innovation strategy into a practical 90-day roadmap. What will you DO in the next 3 months to build momentum?
        </AlertDescription>
      </Alert>

      {/* Month 1: Quick Wins */}
      <Card className="border-l-4 border-l-biz-lime">
        <CardHeader className="pb-3">
          <CardTitle className="font-montserrat text-lg flex items-center gap-2">
            <div className="bg-biz-lime/20 p-2 rounded-lg">
              <Zap className="w-5 h-5 text-biz-lime" />
            </div>
            <div>
              <span className="text-biz-lime">MONTH 1:</span> Quick Wins
            </div>
          </CardTitle>
          <p className="font-open-sans text-sm text-muted-foreground ml-11">
            What can you accomplish NOW?
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="font-montserrat font-semibold">
              Quick Win #1 <span className="text-destructive">*</span>
            </Label>
            <p className="text-xs text-muted-foreground font-open-sans">
              What's one thing you can launch, fix, or test in the next 30 days?
            </p>
            <Input
              placeholder="e.g., Launch customer feedback survey to validate top 3 pain points"
              value={roadmap.month1QuickWin}
              onChange={(e) => updateRoadmap({ month1QuickWin: e.target.value })}
              maxLength={200}
              className="font-open-sans"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-montserrat font-semibold">
                Owner <span className="text-destructive">*</span>
              </Label>
              <Input
                placeholder="e.g., Marketing Director"
                value={roadmap.month1Owner}
                onChange={(e) => updateRoadmap({ month1Owner: e.target.value })}
                className="font-open-sans"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-montserrat font-semibold">
                Success Metric <span className="text-destructive">*</span>
              </Label>
              <Input
                placeholder="e.g., 100+ responses, identify top 3 pain points"
                value={roadmap.month1SuccessMetric}
                onChange={(e) => updateRoadmap({ month1SuccessMetric: e.target.value })}
                className="font-open-sans"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Month 2: Build Capability */}
      <Card className="border-l-4 border-l-biz-teal">
        <CardHeader className="pb-3">
          <CardTitle className="font-montserrat text-lg flex items-center gap-2">
            <div className="bg-biz-teal/20 p-2 rounded-lg">
              <Wrench className="w-5 h-5 text-biz-teal" />
            </div>
            <div>
              <span className="text-biz-teal">MONTH 2:</span> Build Capability
            </div>
          </CardTitle>
          <p className="font-open-sans text-sm text-muted-foreground ml-11">
            What do you need to set up?
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="font-montserrat font-semibold">
              Capability to Build <span className="text-destructive">*</span>
            </Label>
            <p className="text-xs text-muted-foreground font-open-sans">
              What skill, process, or system do you need to execute your innovation strategy?
            </p>
            <Input
              placeholder="e.g., Establish monthly innovation review meeting with leadership team"
              value={roadmap.month2Capability}
              onChange={(e) => updateRoadmap({ month2Capability: e.target.value })}
              maxLength={200}
              className="font-open-sans"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-montserrat font-semibold">
                Owner <span className="text-destructive">*</span>
              </Label>
              <Input
                placeholder="e.g., Operations Manager"
                value={roadmap.month2Owner}
                onChange={(e) => updateRoadmap({ month2Owner: e.target.value })}
                className="font-open-sans"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-montserrat font-semibold">
                Deliverable <span className="text-destructive">*</span>
              </Label>
              <Input
                placeholder="e.g., Innovation dashboard tracking 5 key metrics"
                value={roadmap.month2Deliverable}
                onChange={(e) => updateRoadmap({ month2Deliverable: e.target.value })}
                className="font-open-sans"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Month 3: Launch & Learn */}
      <Card className="border-l-4 border-l-biz-copper">
        <CardHeader className="pb-3">
          <CardTitle className="font-montserrat text-lg flex items-center gap-2">
            <div className="bg-biz-copper/20 p-2 rounded-lg">
              <Rocket className="w-5 h-5 text-biz-copper" />
            </div>
            <div>
              <span className="text-biz-copper">MONTH 3:</span> Launch & Learn
            </div>
          </CardTitle>
          <p className="font-open-sans text-sm text-muted-foreground ml-11">
            What will you ship?
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="font-montserrat font-semibold">
              Initiative to Launch <span className="text-destructive">*</span>
            </Label>
            <p className="text-xs text-muted-foreground font-open-sans">
              What new product, service, process, or experiment will you launch?
            </p>
            <Input
              placeholder="e.g., Pilot real-time order tracking with 20 customers"
              value={roadmap.month3Initiative}
              onChange={(e) => updateRoadmap({ month3Initiative: e.target.value })}
              maxLength={200}
              className="font-open-sans"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-montserrat font-semibold">
                Owner <span className="text-destructive">*</span>
              </Label>
              <Input
                placeholder="e.g., Product Manager"
                value={roadmap.month3Owner}
                onChange={(e) => updateRoadmap({ month3Owner: e.target.value })}
                className="font-open-sans"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-montserrat font-semibold">
                Success Criteria <span className="text-destructive">*</span>
              </Label>
              <Input
                placeholder="e.g., 80%+ customer satisfaction, 50% reduction in calls"
                value={roadmap.month3SuccessCriteria}
                onChange={(e) => updateRoadmap({ month3SuccessCriteria: e.target.value })}
                className="font-open-sans"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Review Cadence */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="font-montserrat text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5 text-biz-navy" />
            Review Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-montserrat font-semibold">
                Review Cadence <span className="text-destructive">*</span>
              </Label>
              <Select 
                value={roadmap.reviewCadence} 
                onValueChange={(value) => updateRoadmap({ reviewCadence: value })}
              >
                <SelectTrigger className="font-open-sans">
                  <SelectValue placeholder="How often will you review?" />
                </SelectTrigger>
                <SelectContent>
                  {reviewCadences.map((cadence) => (
                    <SelectItem key={cadence} value={cadence}>{cadence}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-montserrat font-semibold">
                Next Milestone Date <span className="text-destructive">*</span>
              </Label>
              <Input
                type="date"
                value={roadmap.nextMilestoneDate || defaultDate}
                onChange={(e) => updateRoadmap({ nextMilestoneDate: e.target.value })}
                className="font-open-sans"
              />
              <p className="text-xs text-muted-foreground font-open-sans">
                Set a calendar reminder now. Most strategies fail because they're written once and never revisited.
              </p>
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
                  <Laptop className="w-5 h-5" />
                  See Example: SaaS Startup
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform ${showExample ? 'rotate-180' : ''}`} />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="space-y-3 font-open-sans text-sm">
                <p><strong className="text-biz-lime">Month 1 Quick Win:</strong> Launch MVP to 10 beta users</p>
                <p><strong className="text-biz-teal">Month 2 Capability:</strong> Build customer feedback loop (weekly interviews + Notion database)</p>
                <p><strong className="text-biz-copper">Month 3 Launch:</strong> Public beta with 100 users, target $5K MRR</p>
                <p><strong>Review Cadence:</strong> Weekly</p>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
};

export default RoadmapStep;
