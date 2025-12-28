import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { HelpCircle, ChevronDown, Building2 } from "lucide-react";
import { useInnovationStrategyStore } from "@/stores/innovationStrategyStore";

const industries = [
  "Manufacturing",
  "Professional Services",
  "Healthcare",
  "Technology",
  "Retail/E-commerce",
  "Food & Beverage",
  "Construction",
  "Financial Services",
  "Other"
];

const companySizes = [
  { value: "5-10", label: "5-10 employees" },
  { value: "11-25", label: "11-25 employees" },
  { value: "26-50", label: "26-50 employees" },
  { value: "51+", label: "51+ employees" }
];

const revenueRanges = [
  "$500K-$1M",
  "$1M-$5M",
  "$5M-$10M",
  "$10M-$25M",
  "$25M+"
];

const innovationChallenges = [
  "We're growing too slowly",
  "Competition is catching up",
  "Customers want new features/products",
  "Our market is changing rapidly",
  "We're operationally inefficient",
  "We lack a clear innovation process"
];

const FoundationStep = () => {
  const { data, updateFoundation } = useInnovationStrategyStore();
  const foundation = data.foundation;
  const [showExample, setShowExample] = useState(false);

  const handleChallengeToggle = (challenge: string, checked: boolean) => {
    const current = foundation.innovationChallenges;
    if (checked && current.length < 3) {
      updateFoundation({ innovationChallenges: [...current, challenge] });
    } else if (!checked) {
      updateFoundation({ innovationChallenges: current.filter(c => c !== challenge) });
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-biz-navy mb-2">
          Step 1: Foundation
        </h2>
        <p className="font-open-sans text-muted-foreground">
          Establish your company context and primary innovation challenge
        </p>
      </div>

      {/* Company Name */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <Label htmlFor="companyName" className="font-montserrat font-semibold">
              Company Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="companyName"
              placeholder="e.g., Acme Manufacturing"
              value={foundation.companyName}
              onChange={(e) => updateFoundation({ companyName: e.target.value })}
              className="font-open-sans"
            />
          </div>
        </CardContent>
      </Card>

      {/* Industry */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <Label className="font-montserrat font-semibold">
              Industry <span className="text-destructive">*</span>
            </Label>
            <Select 
              value={foundation.industry} 
              onValueChange={(value) => updateFoundation({ industry: value })}
            >
              <SelectTrigger className="font-open-sans">
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {foundation.industry === "Other" && (
              <Input
                placeholder="Please specify your industry"
                value={foundation.customIndustry}
                onChange={(e) => updateFoundation({ customIndustry: e.target.value })}
                className="mt-2 font-open-sans"
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Company Size */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <Label className="font-montserrat font-semibold">
              Company Size <span className="text-destructive">*</span>
            </Label>
            <RadioGroup
              value={foundation.companySize}
              onValueChange={(value) => updateFoundation({ companySize: value })}
              className="grid grid-cols-2 gap-3"
            >
              {companySizes.map((size) => (
                <div key={size.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={size.value} id={size.value} />
                  <Label htmlFor={size.value} className="font-open-sans cursor-pointer">
                    {size.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Annual Revenue */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <Label className="font-montserrat font-semibold">
              Annual Revenue Range <span className="text-destructive">*</span>
            </Label>
            <Select 
              value={foundation.annualRevenue} 
              onValueChange={(value) => updateFoundation({ annualRevenue: value })}
            >
              <SelectTrigger className="font-open-sans">
                <SelectValue placeholder="Select revenue range" />
              </SelectTrigger>
              <SelectContent>
                {revenueRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Innovation Challenges */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <Label className="font-montserrat font-semibold">
                  Primary Innovation Challenge <span className="text-destructive">*</span>
                </Label>
                <p className="text-sm text-muted-foreground font-open-sans mt-1">
                  Select 1-3 challenges (max 3)
                </p>
              </div>
              <div className="flex items-center gap-1 text-biz-teal">
                <HelpCircle className="w-4 h-4" />
                <span className="text-xs font-open-sans">Your challenges help us tailor examples</span>
              </div>
            </div>
            <div className="grid gap-3">
              {innovationChallenges.map((challenge) => (
                <div key={challenge} className="flex items-center space-x-3">
                  <Checkbox
                    id={challenge}
                    checked={foundation.innovationChallenges.includes(challenge)}
                    onCheckedChange={(checked) => handleChallengeToggle(challenge, checked as boolean)}
                    disabled={!foundation.innovationChallenges.includes(challenge) && foundation.innovationChallenges.length >= 3}
                  />
                  <Label htmlFor={challenge} className="font-open-sans cursor-pointer">
                    {challenge}
                  </Label>
                </div>
              ))}
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="other-challenge"
                  checked={foundation.innovationChallenges.includes("Other")}
                  onCheckedChange={(checked) => handleChallengeToggle("Other", checked as boolean)}
                  disabled={!foundation.innovationChallenges.includes("Other") && foundation.innovationChallenges.length >= 3}
                />
                <Label htmlFor="other-challenge" className="font-open-sans">Other</Label>
              </div>
              {foundation.innovationChallenges.includes("Other") && (
                <Input
                  placeholder="Please describe your challenge"
                  value={foundation.customChallenge}
                  onChange={(e) => updateFoundation({ customChallenge: e.target.value })}
                  className="ml-6 font-open-sans"
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Why Innovation Matters */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <Label htmlFor="whyMatters" className="font-montserrat font-semibold">
              Why Innovation Matters to You Now <span className="text-destructive">*</span>
            </Label>
            <p className="text-sm text-muted-foreground font-open-sans">
              Write 2-3 sentences about why innovation is important for your business right now
            </p>
            <Textarea
              id="whyMatters"
              placeholder="e.g., We've been doing the same thing for 5 years. Revenue has plateaued and customers are asking for solutions we don't offer yet."
              value={foundation.whyInnovationMatters}
              onChange={(e) => updateFoundation({ whyInnovationMatters: e.target.value })}
              className="min-h-[120px] font-open-sans"
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground text-right font-open-sans">
              {foundation.whyInnovationMatters.length}/500 characters
            </p>
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
                  See Example: Maria's Cleaning Service
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform ${showExample ? 'rotate-180' : ''}`} />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="space-y-3 font-open-sans text-sm">
                <p><strong>Industry:</strong> Professional Services</p>
                <p><strong>Size:</strong> 11-25 employees</p>
                <p><strong>Revenue:</strong> $1M-$5M</p>
                <p><strong>Challenge:</strong> "Competition is catching up"</p>
                <p className="italic text-muted-foreground">
                  Maria chose this because new franchises entered her market with mobile apps and instant booking — something her company didn't offer yet.
                </p>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
};

export default FoundationStep;
