import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  ChevronDown, 
  Building2, 
  AlertCircle,
  ArrowRight,
  Layers,
  TrendingUp,
  Rocket
} from "lucide-react";
import { useInnovationStrategyStore } from "@/stores/innovationStrategyStore";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const PortfolioStep = () => {
  const { data, assignToPortfolio, updatePortfolio } = useInnovationStrategyStore();
  const [showExample, setShowExample] = useState(false);

  const getUnassignedOpportunities = () => {
    const assigned = [
      ...data.portfolio.core,
      ...data.portfolio.adjacent,
      ...data.portfolio.transformational
    ];
    return data.opportunities.filter(opp => !assigned.includes(opp.id));
  };

  const getOpportunityById = (id: string) => data.opportunities.find(opp => opp.id === id);

  const totalAssigned = data.portfolio.core.length + data.portfolio.adjacent.length + data.portfolio.transformational.length;
  const corePercent = totalAssigned > 0 ? Math.round((data.portfolio.core.length / totalAssigned) * 100) : 0;
  const adjacentPercent = totalAssigned > 0 ? Math.round((data.portfolio.adjacent.length / totalAssigned) * 100) : 0;
  const transformationalPercent = totalAssigned > 0 ? Math.round((data.portfolio.transformational.length / totalAssigned) * 100) : 0;

  const getPortfolioWarning = () => {
    if (totalAssigned === 0) return null;
    if (corePercent > 90) return "Your portfolio is very conservative. Consider adding more Adjacent or Transformational bets.";
    if (transformationalPercent > 30) return "Your portfolio is quite aggressive. Consider balancing with more Core improvements.";
    if (corePercent < 50) return "Consider adding more Core improvements to ensure near-term ROI.";
    return null;
  };

  const warning = getPortfolioWarning();
  const unassigned = getUnassignedOpportunities();

  const buckets = [
    {
      key: 'core' as const,
      title: 'CORE (Target: 70%)',
      subtitle: 'Improve What You Do',
      description: 'Enhance existing products/services. Fix inefficiencies. Respond to customer requests. Low risk, near-term ROI.',
      color: 'biz-lime',
      bgColor: 'bg-biz-lime/10',
      borderColor: 'border-biz-lime/30',
      icon: Layers,
      items: data.portfolio.core,
      percent: corePercent
    },
    {
      key: 'adjacent' as const,
      title: 'ADJACENT (Target: 20%)',
      subtitle: 'Expand Where You Play',
      description: 'New customer segments. Complementary products. Related markets. Moderate risk, 12-18 month horizon.',
      color: 'biz-teal',
      bgColor: 'bg-biz-teal/10',
      borderColor: 'border-biz-teal/30',
      icon: TrendingUp,
      items: data.portfolio.adjacent,
      percent: adjacentPercent
    },
    {
      key: 'transformational' as const,
      title: 'TRANSFORMATIONAL (Target: 10%)',
      subtitle: 'Reinvent the Game',
      description: 'New business models. Disruptive tech. Entirely new markets. High risk, 24-36 month horizon.',
      color: 'biz-copper',
      bgColor: 'bg-biz-copper/10',
      borderColor: 'border-biz-copper/30',
      icon: Rocket,
      items: data.portfolio.transformational,
      percent: transformationalPercent
    }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-biz-navy mb-2">
          Step 4: Portfolio
        </h2>
        <p className="font-open-sans text-muted-foreground">
          Prioritize your opportunities using the 70-20-10 framework
        </p>
      </div>

      {/* Instructions */}
      <Card className="bg-biz-navy/5 border-biz-navy/20">
        <CardContent className="pt-6">
          <h3 className="font-montserrat font-bold text-lg text-biz-navy mb-3">
            The 70-20-10 Rule
          </h3>
          <p className="font-open-sans text-sm text-foreground mb-4">
            Balanced innovation portfolios allocate resources strategically:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-montserrat font-bold text-biz-lime">70%</span>
              <span className="font-open-sans text-sm">to Core (improve what you do)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-montserrat font-bold text-biz-teal">20%</span>
              <span className="font-open-sans text-sm">to Adjacent (expand where you play)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-montserrat font-bold text-biz-copper">10%</span>
              <span className="font-open-sans text-sm">to Transformational (reinvent the game)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Unassigned Opportunities */}
      {unassigned.length > 0 && (
        <Card className="border-biz-citrine/50 bg-biz-citrine/5">
          <CardHeader className="pb-3">
            <CardTitle className="font-montserrat text-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-biz-citrine" />
              Unassigned Opportunities ({unassigned.length})
            </CardTitle>
            <CardDescription className="font-open-sans">
              Click an opportunity to assign it to a portfolio bucket
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {unassigned.map((opp) => (
                <div 
                  key={opp.id}
                  className="p-3 bg-background rounded-lg border border-border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-montserrat font-semibold text-foreground">
                      {opp.title || 'Untitled Opportunity'}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {opp.opportunityType || 'No Type'}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-biz-lime text-biz-lime hover:bg-biz-lime/10"
                      onClick={() => assignToPortfolio(opp.id, 'core')}
                    >
                      <Layers className="w-3 h-3 mr-1" /> Core
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-biz-teal text-biz-teal hover:bg-biz-teal/10"
                      onClick={() => assignToPortfolio(opp.id, 'adjacent')}
                    >
                      <TrendingUp className="w-3 h-3 mr-1" /> Adjacent
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-biz-copper text-biz-copper hover:bg-biz-copper/10"
                      onClick={() => assignToPortfolio(opp.id, 'transformational')}
                    >
                      <Rocket className="w-3 h-3 mr-1" /> Transform
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Portfolio Buckets */}
      <div className="grid md:grid-cols-3 gap-4">
        {buckets.map((bucket) => (
          <Card key={bucket.key} className={`${bucket.borderColor} ${bucket.bgColor}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 mb-1">
                <bucket.icon className={`w-5 h-5 text-${bucket.color}`} />
                <CardTitle className={`font-montserrat text-sm text-${bucket.color}`}>
                  {bucket.title}
                </CardTitle>
              </div>
              <p className="font-montserrat font-bold text-foreground">{bucket.subtitle}</p>
              <CardDescription className="font-open-sans text-xs">
                {bucket.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-open-sans text-muted-foreground">Current allocation</span>
                  <span className={`font-montserrat font-bold text-${bucket.color}`}>
                    {bucket.percent}%
                  </span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-${bucket.color} transition-all duration-300`}
                    style={{ width: `${bucket.percent}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2 min-h-[60px]">
                {bucket.items.length === 0 ? (
                  <p className="text-xs text-muted-foreground font-open-sans italic text-center py-4">
                    No opportunities assigned yet
                  </p>
                ) : (
                  bucket.items.map((id) => {
                    const opp = getOpportunityById(id);
                    if (!opp) return null;
                    return (
                      <div 
                        key={id}
                        className="p-2 bg-background rounded border border-border flex items-center justify-between group"
                      >
                        <span className="font-open-sans text-sm truncate flex-1">
                          {opp.title || 'Untitled'}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="opacity-0 group-hover:opacity-100 transition-opacity h-6 text-xs"
                          onClick={() => {
                            // Move to different bucket - cycle through
                            const nextBucket = bucket.key === 'core' ? 'adjacent' : bucket.key === 'adjacent' ? 'transformational' : 'core';
                            assignToPortfolio(id, nextBucket);
                          }}
                        >
                          <ArrowRight className="w-3 h-3" />
                        </Button>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Portfolio Warning */}
      {warning && (
        <Alert className="bg-biz-citrine/10 border-biz-citrine/30">
          <AlertCircle className="h-4 w-4 text-biz-citrine" />
          <AlertDescription className="font-open-sans text-sm">
            {warning}
          </AlertDescription>
        </Alert>
      )}

      {/* Acknowledgment */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="acknowledge"
              checked={data.portfolio.acknowledged}
              onCheckedChange={(checked) => updatePortfolio({ acknowledged: checked as boolean })}
            />
            <div>
              <Label htmlFor="acknowledge" className="font-open-sans cursor-pointer">
                I acknowledge this portfolio allocation and understand the 70-20-10 framework
              </Label>
              <p className="text-xs text-muted-foreground font-open-sans mt-1">
                It's OK to vary from 70-20-10, but know why. Early-stage companies might do 80-20-0 (survival mode). High-growth might do 50-30-20 (aggressive expansion).
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
                  <Building2 className="w-5 h-5" />
                  See Example: Consulting Firm
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform ${showExample ? 'rotate-180' : ''}`} />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="space-y-3 font-open-sans text-sm">
                <p><strong className="text-biz-lime">CORE:</strong> Productized strategy templates (faster delivery)</p>
                <p><strong className="text-biz-teal">ADJACENT:</strong> Fractional executive services (new offering to existing clients)</p>
                <p><strong className="text-biz-copper">TRANSFORMATIONAL:</strong> AI strategy platform (replace consulting with SaaS)</p>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
};

export default PortfolioStep;
