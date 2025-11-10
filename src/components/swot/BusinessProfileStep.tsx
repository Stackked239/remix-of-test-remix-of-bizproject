import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSWOTStore, BusinessProfile } from "@/stores/swotStore";
import { Sparkles } from "lucide-react";

interface BusinessProfileStepProps {
  onNext: () => void;
  onSkip: () => void;
}

export const BusinessProfileStep = ({ onNext, onSkip }: BusinessProfileStepProps) => {
  const { currentAnalysis, setBusinessProfile } = useSWOTStore();
  const [formData, setFormData] = useState<{
    businessName: string;
    industry: string;
    size: 'solo' | 'micro' | 'small' | 'medium';
    yearsInBusiness: number;
    analysisPurpose: string;
  }>({
    businessName: currentAnalysis?.businessProfile?.businessName || '',
    industry: currentAnalysis?.businessProfile?.industry || '',
    size: currentAnalysis?.businessProfile?.size || 'small',
    yearsInBusiness: currentAnalysis?.businessProfile?.yearsInBusiness || 0,
    analysisPurpose: currentAnalysis?.businessProfile?.analysisPurpose || '',
  });

  const industries = [
    'Retail',
    'Food & Beverage',
    'Professional Services',
    'Technology',
    'Healthcare',
    'Manufacturing',
    'Construction',
    'Real Estate',
    'Education',
    'Other',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const size = formData.size as 'solo' | 'micro' | 'small' | 'medium';
    const profile: BusinessProfile = {
      id: `profile_${Date.now()}`,
      businessName: formData.businessName,
      industry: formData.industry,
      size: size,
      yearsInBusiness: formData.yearsInBusiness,
      analysisPurpose: formData.analysisPurpose,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setBusinessProfile(profile);
    onNext();
  };

  return (
    <div className="container mx-auto px-4 pt-44 pb-8 max-w-3xl">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-montserrat font-bold text-3xl text-biz-navy">
            Setup Your SWOT Analysis
          </h2>
          <span className="text-sm text-muted-foreground">Step 1/3</span>
        </div>
        <p className="text-muted-foreground">
          Tell us about your business to get personalized insights
        </p>
      </div>

      <Card className="p-6 lg:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Business Name */}
          <div className="space-y-2">
            <Label htmlFor="businessName" className="text-base font-semibold">
              Business Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="businessName"
              required
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              placeholder="Your Business Name"
              className="text-base"
            />
          </div>

          {/* Industry */}
          <div className="space-y-2">
            <Label htmlFor="industry" className="text-base font-semibold">
              Industry <span className="text-red-500">*</span>
            </Label>
            <Select
              required
              value={formData.industry}
              onValueChange={(value) => setFormData({ ...formData, industry: value })}
            >
              <SelectTrigger className="text-base">
                <SelectValue placeholder="Select Industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Business Size */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Business Size</Label>
            <RadioGroup
              value={formData.size}
              onValueChange={(value: string) => setFormData({ ...formData, size: value as 'solo' | 'micro' | 'small' | 'medium' })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="solo" id="solo" />
                <Label htmlFor="solo" className="font-normal cursor-pointer">
                  Solo (Just me)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="micro" id="micro" />
                <Label htmlFor="micro" className="font-normal cursor-pointer">
                  Micro (2-9 employees)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="small" id="small" />
                <Label htmlFor="small" className="font-normal cursor-pointer">
                  Small (10-49 employees)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium" className="font-normal cursor-pointer">
                  Medium (50+ employees)
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Years in Business */}
          <div className="space-y-2">
            <Label htmlFor="years" className="text-base font-semibold">
              Years in Business
            </Label>
            <Input
              id="years"
              type="number"
              min="0"
              value={formData.yearsInBusiness || ''}
              onChange={(e) => setFormData({ ...formData, yearsInBusiness: parseInt(e.target.value) || 0 })}
              placeholder="3"
              className="text-base"
            />
          </div>

          {/* Analysis Purpose */}
          <div className="space-y-2">
            <Label htmlFor="purpose" className="text-base font-semibold">
              Analysis Purpose (Optional)
            </Label>
            <Textarea
              id="purpose"
              value={formData.analysisPurpose}
              onChange={(e) => setFormData({ ...formData, analysisPurpose: e.target.value })}
              placeholder="What are you trying to accomplish with this SWOT analysis? Example: Planning for 2025, considering expansion to a second location"
              rows={4}
              className="text-base resize-none"
            />
          </div>

          {/* AI Assist Banner */}
          <div className="bg-biz-lime/10 border border-biz-lime/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-biz-lime flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-sm mb-1">AI Assist Available</h3>
                <p className="text-sm text-muted-foreground">
                  I can suggest industry-specific SWOT factors based on your profile.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onSkip}
              className="sm:w-auto"
            >
              Skip Setup
            </Button>
            <Button
              type="submit"
              className="bg-biz-navy hover:bg-biz-navy/90 flex-1"
              disabled={!formData.businessName || !formData.industry}
            >
              Next: Build SWOT →
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
