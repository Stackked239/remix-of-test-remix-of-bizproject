import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, 
  Stethoscope, 
  AlertCircle,
  Check,
  X,
  Plus
} from "lucide-react";
import { useInnovationStrategyStore, Metric } from "@/stores/innovationStrategyStore";
import { Alert, AlertDescription } from "@/components/ui/alert";

const suggestedMetrics = {
  revenueGrowth: [
    { id: 'rev_new', name: 'Revenue from new products/services launched in past 12 months ($ or %)' },
    { id: 'cust_acq', name: 'Customer acquisition from new market segments (# or %)' },
    { id: 'deal_size', name: 'Average deal size (new vs. existing products)' }
  ],
  efficiency: [
    { id: 'time_market', name: 'Time to market (idea → launch)' },
    { id: 'cost_project', name: 'Cost per innovation project' },
    { id: 'roi_innovation', name: 'ROI on innovation investments' }
  ],
  customer: [
    { id: 'nps_new', name: 'Net Promoter Score (NPS) for new offerings' },
    { id: 'retention', name: 'Customer retention rate (existing vs. new products)' },
    { id: 'ltv', name: 'Customer lifetime value (LTV) increase' }
  ],
  capability: [
    { id: 'experiments', name: 'Number of validated experiments run per quarter' },
    { id: 'employee_involve', name: 'Percentage of employees involved in innovation activities' },
    { id: 'ideas_ratio', name: 'Ideas submitted → ideas implemented ratio' }
  ]
};

const trackingFrequencies = ['Monthly', 'Quarterly', 'Annually', 'After each initiative'];

const MetricsStep = () => {
  const { data, addMetric, updateMetric, removeMetric } = useInnovationStrategyStore();
  const [showExample, setShowExample] = useState(false);
  const [customMetricName, setCustomMetricName] = useState('');

  const isMetricSelected = (id: string) => data.metrics.some(m => m.id === id);

  const handleToggleMetric = (id: string, name: string, checked: boolean) => {
    if (checked && data.metrics.length < 5) {
      addMetric({
        id,
        name,
        isCustom: false,
        baseline: '',
        target: '',
        trackingFrequency: ''
      });
    } else if (!checked) {
      removeMetric(id);
    }
  };

  const handleAddCustomMetric = () => {
    if (!customMetricName.trim() || data.metrics.length >= 5) return;
    addMetric({
      id: `custom_${Date.now()}`,
      name: customMetricName.trim(),
      isCustom: true,
      baseline: '',
      target: '',
      trackingFrequency: ''
    });
    setCustomMetricName('');
  };

  const getMetricDetails = (metric: Metric) => {
    const hasBaseline = !!metric.baseline;
    const hasTarget = !!metric.target;
    const hasFrequency = !!metric.trackingFrequency;
    const isComplete = hasBaseline && hasTarget && hasFrequency;
    return { hasBaseline, hasTarget, hasFrequency, isComplete };
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-biz-navy mb-2">
          Step 5: Metrics
        </h2>
        <p className="font-open-sans text-muted-foreground">
          Define how you'll measure innovation success (no vanity metrics)
        </p>
      </div>

      {/* Instructions */}
      <Alert className="bg-biz-navy/5 border-biz-navy/20">
        <AlertCircle className="h-4 w-4 text-biz-navy" />
        <AlertDescription className="font-open-sans text-sm">
          Pick 3-5 metrics you'll track quarterly. Avoid vanity metrics (social media followers, website visits). 
          Focus on metrics that tie to revenue, profitability, customer value, or competitive advantage.
        </AlertDescription>
      </Alert>

      {/* Metric Categories */}
      <div className="space-y-4">
        {Object.entries(suggestedMetrics).map(([category, metrics]) => (
          <Card key={category}>
            <CardHeader className="pb-3">
              <CardTitle className="font-montserrat text-lg capitalize">
                {category === 'revenueGrowth' ? 'Revenue & Growth Metrics' :
                 category === 'efficiency' ? 'Efficiency & Cost Metrics' :
                 category === 'customer' ? 'Customer Metrics' : 'Capability Metrics'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {metrics.map((metric) => (
                  <div 
                    key={metric.id}
                    className={`flex items-start space-x-3 p-3 rounded-lg border transition-colors ${
                      isMetricSelected(metric.id) 
                        ? 'border-biz-teal bg-biz-teal/5' 
                        : 'border-border hover:border-biz-teal/50'
                    }`}
                  >
                    <Checkbox
                      id={metric.id}
                      checked={isMetricSelected(metric.id)}
                      onCheckedChange={(checked) => handleToggleMetric(metric.id, metric.name, checked as boolean)}
                      disabled={!isMetricSelected(metric.id) && data.metrics.length >= 5}
                      className="mt-0.5"
                    />
                    <Label 
                      htmlFor={metric.id} 
                      className="font-open-sans cursor-pointer flex-1"
                    >
                      {metric.name}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Custom Metric */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="font-montserrat text-lg">Custom Metric</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter your own metric..."
              value={customMetricName}
              onChange={(e) => setCustomMetricName(e.target.value)}
              className="font-open-sans flex-1"
              disabled={data.metrics.length >= 5}
            />
            <Button
              onClick={handleAddCustomMetric}
              disabled={!customMetricName.trim() || data.metrics.length >= 5}
              className="bg-biz-teal hover:bg-biz-teal/90"
            >
              <Plus className="w-4 h-4 mr-1" /> Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Selected Metrics Configuration */}
      {data.metrics.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-montserrat text-lg">
              Configure Your Metrics ({data.metrics.length}/5)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.metrics.map((metric) => {
              const { isComplete } = getMetricDetails(metric);
              return (
                <div 
                  key={metric.id}
                  className={`p-4 rounded-lg border ${isComplete ? 'border-biz-lime bg-biz-lime/5' : 'border-biz-citrine bg-biz-citrine/5'}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {isComplete ? (
                        <Check className="w-4 h-4 text-biz-lime" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-biz-citrine" />
                      )}
                      <span className="font-montserrat font-semibold text-sm">
                        {metric.name}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeMetric(metric.id)}
                      className="h-6 text-muted-foreground hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs font-open-sans text-muted-foreground">
                        Current Baseline <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        placeholder="e.g., $50K (5% of total)"
                        value={metric.baseline}
                        onChange={(e) => updateMetric(metric.id, { baseline: e.target.value })}
                        className="font-open-sans text-sm h-9"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-open-sans text-muted-foreground">
                        12-Month Target <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        placeholder="e.g., $200K (15% of total)"
                        value={metric.target}
                        onChange={(e) => updateMetric(metric.id, { target: e.target.value })}
                        className="font-open-sans text-sm h-9"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-open-sans text-muted-foreground">
                        Tracking Frequency <span className="text-destructive">*</span>
                      </Label>
                      <Select 
                        value={metric.trackingFrequency} 
                        onValueChange={(value) => updateMetric(metric.id, { trackingFrequency: value })}
                      >
                        <SelectTrigger className="font-open-sans text-sm h-9">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          {trackingFrequencies.map((freq) => (
                            <SelectItem key={freq} value={freq}>{freq}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Validation Message */}
      {data.metrics.length < 3 && (
        <Alert className="bg-biz-citrine/10 border-biz-citrine/30">
          <AlertCircle className="h-4 w-4 text-biz-citrine" />
          <AlertDescription className="font-open-sans text-sm">
            Please select at least 3 metrics to continue (currently {data.metrics.length})
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
                  <Stethoscope className="w-5 h-5" />
                  See Example: Healthcare Practice
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform ${showExample ? 'rotate-180' : ''}`} />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="space-y-3 font-open-sans text-sm">
                <p><strong>Metric:</strong> Same-day appointment availability</p>
                <p><strong>Baseline:</strong> 20% of slots available same-day</p>
                <p><strong>Target:</strong> 80% in 12 months</p>
                <p><strong>Track:</strong> Weekly</p>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
};

export default MetricsStep;
