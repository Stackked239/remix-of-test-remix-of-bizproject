import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";

interface QuestionnaireData {
  // Business Overview
  businessName: string;
  industry: string;
  location: string;
  revenueRange: string;
  employeeCount: string;
  yearsInOperation: string;
  competitors: string;
  
  // Financial Health
  revenueGrowth: string;
  profitMargin: number[];
  cashFlowIssues: string;
  debtLevel: string;
  fundingSources: string;
  
  // Operations & Efficiency
  supplyChainReliability: number[];
  technologyStack: string;
  processBottlenecks: string;
  inventoryManagement: string;
  
  // Marketing & Sales
  acquisitionChannels: string;
  conversionRate: number[];
  marketingBudget: string;
  salesPipeline: string;
  
  // Human Resources
  employeeTurnover: number[];
  trainingPrograms: string;
  teamSatisfaction: number[];
  
  // Customer Engagement
  customerSatisfaction: number[];
  retentionRate: number[];
  feedbackMechanisms: string;
  
  // Innovation & Growth
  productDevelopment: string;
  expansionPlans: string;
  rdInvestment: number[];
  
  // Risk & Compliance
  legalIssues: string;
  cybersecurity: string;
  compliance: string;
}

const initialData: QuestionnaireData = {
  businessName: "",
  industry: "",
  location: "",
  revenueRange: "",
  employeeCount: "",
  yearsInOperation: "",
  competitors: "",
  revenueGrowth: "",
  profitMargin: [15],
  cashFlowIssues: "",
  debtLevel: "",
  fundingSources: "",
  supplyChainReliability: [7],
  technologyStack: "",
  processBottlenecks: "",
  inventoryManagement: "",
  acquisitionChannels: "",
  conversionRate: [3],
  marketingBudget: "",
  salesPipeline: "",
  employeeTurnover: [15],
  trainingPrograms: "",
  teamSatisfaction: [7],
  customerSatisfaction: [8],
  retentionRate: [75],
  feedbackMechanisms: "",
  productDevelopment: "",
  expansionPlans: "",
  rdInvestment: [5],
  legalIssues: "",
  cybersecurity: "",
  compliance: ""
};

interface BusinessQuestionnaireProps {
  onComplete: (data: QuestionnaireData) => void;
}

const BusinessQuestionnaire = ({ onComplete }: BusinessQuestionnaireProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<QuestionnaireData>(initialData);

  const updateData = (field: keyof QuestionnaireData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const steps = [
    {
      title: "Business Overview",
      description: "Tell us about your business basics",
      fields: (
        <div className="space-y-6">
          <div>
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              value={data.businessName}
              onChange={(e) => updateData("businessName", e.target.value)}
              placeholder="Your business name"
            />
          </div>
          
          <div>
            <Label htmlFor="industry">Industry</Label>
            <Select value={data.industry} onValueChange={(value) => updateData("industry", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                <SelectItem value="services">Professional Services</SelectItem>
                <SelectItem value="food">Food & Beverage</SelectItem>
                <SelectItem value="real-estate">Real Estate</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="location">Primary Location</Label>
            <Input
              id="location"
              value={data.location}
              onChange={(e) => updateData("location", e.target.value)}
              placeholder="City, State/Country"
            />
          </div>

          <div>
            <Label htmlFor="revenueRange">Annual Revenue Range</Label>
            <Select value={data.revenueRange} onValueChange={(value) => updateData("revenueRange", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select revenue range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under-100k">Under $100K</SelectItem>
                <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                <SelectItem value="5m-10m">$5M - $10M</SelectItem>
                <SelectItem value="over-10m">Over $10M</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="employeeCount">Number of Employees</Label>
            <Select value={data.employeeCount} onValueChange={(value) => updateData("employeeCount", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select employee count" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Just me</SelectItem>
                <SelectItem value="2-5">2-5 employees</SelectItem>
                <SelectItem value="6-20">6-20 employees</SelectItem>
                <SelectItem value="21-50">21-50 employees</SelectItem>
                <SelectItem value="51-100">51-100 employees</SelectItem>
                <SelectItem value="over-100">Over 100 employees</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="yearsInOperation">Years in Operation</Label>
            <Input
              id="yearsInOperation"
              type="number"
              value={data.yearsInOperation}
              onChange={(e) => updateData("yearsInOperation", e.target.value)}
              placeholder="Number of years"
            />
          </div>

          <div>
            <Label htmlFor="competitors">Top 3 Competitors</Label>
            <Textarea
              id="competitors"
              value={data.competitors}
              onChange={(e) => updateData("competitors", e.target.value)}
              placeholder="List your main competitors"
            />
          </div>
        </div>
      )
    },
    {
      title: "Financial Health",
      description: "Assess your financial performance",
      fields: (
        <div className="space-y-6">
          <div>
            <Label>Revenue Growth Trend (Last 12 months)</Label>
            <RadioGroup value={data.revenueGrowth} onValueChange={(value) => updateData("revenueGrowth", value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="growing-fast" id="growing-fast" />
                <Label htmlFor="growing-fast">Growing rapidly (&gt;20%)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="growing-steady" id="growing-steady" />
                <Label htmlFor="growing-steady">Steady growth (5-20%)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="stable" id="stable" />
                <Label htmlFor="stable">Stable (0-5%)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="declining" id="declining" />
                <Label htmlFor="declining">Declining</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label>Profit Margin: {data.profitMargin[0]}%</Label>
            <Slider
              value={data.profitMargin}
              onValueChange={(value) => updateData("profitMargin", value)}
              max={50}
              min={0}
              step={1}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Cash Flow Issues</Label>
            <RadioGroup value={data.cashFlowIssues} onValueChange={(value) => updateData("cashFlowIssues", value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="cash-none" />
                <Label htmlFor="cash-none">No issues</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="occasional" id="cash-occasional" />
                <Label htmlFor="cash-occasional">Occasional challenges</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="frequent" id="cash-frequent" />
                <Label htmlFor="cash-frequent">Frequent problems</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label>Current Debt Level</Label>
            <Select value={data.debtLevel} onValueChange={(value) => updateData("debtLevel", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select debt level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No debt</SelectItem>
                <SelectItem value="low">Low debt (manageable)</SelectItem>
                <SelectItem value="moderate">Moderate debt</SelectItem>
                <SelectItem value="high">High debt (concerning)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Primary Funding Sources</Label>
            <Textarea
              value={data.fundingSources}
              onChange={(e) => updateData("fundingSources", e.target.value)}
              placeholder="e.g., Self-funded, loans, investors, etc."
            />
          </div>
        </div>
      )
    },
    {
      title: "Operations & Efficiency",
      description: "Evaluate your operational performance",
      fields: (
        <div className="space-y-6">
          <div>
            <Label>Supply Chain Reliability: {data.supplyChainReliability[0]}/10</Label>
            <Slider
              value={data.supplyChainReliability}
              onValueChange={(value) => updateData("supplyChainReliability", value)}
              max={10}
              min={1}
              step={1}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Technology Stack</Label>
            <RadioGroup value={data.technologyStack} onValueChange={(value) => updateData("technologyStack", value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="modern" id="tech-modern" />
                <Label htmlFor="tech-modern">Modern and up-to-date</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="adequate" id="tech-adequate" />
                <Label htmlFor="tech-adequate">Adequate for current needs</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="outdated" id="tech-outdated" />
                <Label htmlFor="tech-outdated">Outdated, needs updating</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label>Main Process Bottlenecks</Label>
            <Textarea
              value={data.processBottlenecks}
              onChange={(e) => updateData("processBottlenecks", e.target.value)}
              placeholder="Describe any operational bottlenecks"
            />
          </div>

          <div>
            <Label>Inventory Management (if applicable)</Label>
            <Select value={data.inventoryManagement} onValueChange={(value) => updateData("inventoryManagement", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select inventory status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not-applicable">Not applicable</SelectItem>
                <SelectItem value="excellent">Excellent control</SelectItem>
                <SelectItem value="good">Good management</SelectItem>
                <SelectItem value="adequate">Adequate</SelectItem>
                <SelectItem value="poor">Needs improvement</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )
    },
    {
      title: "Marketing & Sales",
      description: "Review your marketing and sales performance",
      fields: (
        <div className="space-y-6">
          <div>
            <Label>Primary Customer Acquisition Channels</Label>
            <Textarea
              value={data.acquisitionChannels}
              onChange={(e) => updateData("acquisitionChannels", e.target.value)}
              placeholder="e.g., Social media, referrals, paid ads, etc."
            />
          </div>

          <div>
            <Label>Conversion Rate: {data.conversionRate[0]}%</Label>
            <Slider
              value={data.conversionRate}
              onValueChange={(value) => updateData("conversionRate", value)}
              max={20}
              min={0}
              step={0.5}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Marketing Budget as % of Revenue</Label>
            <Select value={data.marketingBudget} onValueChange={(value) => updateData("marketingBudget", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select marketing budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under-5">Under 5%</SelectItem>
                <SelectItem value="5-10">5-10%</SelectItem>
                <SelectItem value="10-15">10-15%</SelectItem>
                <SelectItem value="over-15">Over 15%</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Sales Pipeline Health</Label>
            <RadioGroup value={data.salesPipeline} onValueChange={(value) => updateData("salesPipeline", value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="strong" id="pipeline-strong" />
                <Label htmlFor="pipeline-strong">Strong and consistent</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="adequate" id="pipeline-adequate" />
                <Label htmlFor="pipeline-adequate">Adequate</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weak" id="pipeline-weak" />
                <Label htmlFor="pipeline-weak">Weak or inconsistent</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      )
    },
    {
      title: "Human Resources",
      description: "Assess your team and HR practices",
      fields: (
        <div className="space-y-6">
          <div>
            <Label>Annual Employee Turnover Rate: {data.employeeTurnover[0]}%</Label>
            <Slider
              value={data.employeeTurnover}
              onValueChange={(value) => updateData("employeeTurnover", value)}
              max={50}
              min={0}
              step={1}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Training Programs</Label>
            <RadioGroup value={data.trainingPrograms} onValueChange={(value) => updateData("trainingPrograms", value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="comprehensive" id="training-comprehensive" />
                <Label htmlFor="training-comprehensive">Comprehensive programs</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="basic" id="training-basic" />
                <Label htmlFor="training-basic">Basic training</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="minimal" id="training-minimal" />
                <Label htmlFor="training-minimal">Minimal or none</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label>Team Satisfaction: {data.teamSatisfaction[0]}/10</Label>
            <Slider
              value={data.teamSatisfaction}
              onValueChange={(value) => updateData("teamSatisfaction", value)}
              max={10}
              min={1}
              step={1}
              className="mt-2"
            />
          </div>
        </div>
      )
    },
    {
      title: "Customer Engagement",
      description: "Evaluate your customer relationships",
      fields: (
        <div className="space-y-6">
          <div>
            <Label>Customer Satisfaction Score: {data.customerSatisfaction[0]}/10</Label>
            <Slider
              value={data.customerSatisfaction}
              onValueChange={(value) => updateData("customerSatisfaction", value)}
              max={10}
              min={1}
              step={1}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Customer Retention Rate: {data.retentionRate[0]}%</Label>
            <Slider
              value={data.retentionRate}
              onValueChange={(value) => updateData("retentionRate", value)}
              max={100}
              min={0}
              step={5}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Customer Feedback Mechanisms</Label>
            <Textarea
              value={data.feedbackMechanisms}
              onChange={(e) => updateData("feedbackMechanisms", e.target.value)}
              placeholder="How do you collect customer feedback?"
            />
          </div>
        </div>
      )
    },
    {
      title: "Innovation & Growth",
      description: "Assess your growth and innovation efforts",
      fields: (
        <div className="space-y-6">
          <div>
            <Label>New Product/Service Development</Label>
            <RadioGroup value={data.productDevelopment} onValueChange={(value) => updateData("productDevelopment", value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="active" id="dev-active" />
                <Label htmlFor="dev-active">Actively developing new offerings</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="planning" id="dev-planning" />
                <Label htmlFor="dev-planning">In planning stages</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="dev-none" />
                <Label htmlFor="dev-none">No current plans</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label>Market Expansion Plans</Label>
            <Textarea
              value={data.expansionPlans}
              onChange={(e) => updateData("expansionPlans", e.target.value)}
              placeholder="Describe any expansion plans"
            />
          </div>

          <div>
            <Label>R&D Investment as % of Revenue: {data.rdInvestment[0]}%</Label>
            <Slider
              value={data.rdInvestment}
              onValueChange={(value) => updateData("rdInvestment", value)}
              max={20}
              min={0}
              step={1}
              className="mt-2"
            />
          </div>
        </div>
      )
    },
    {
      title: "Risk & Compliance",
      description: "Review your risk management and compliance",
      fields: (
        <div className="space-y-6">
          <div>
            <Label>Legal Issues</Label>
            <RadioGroup value={data.legalIssues} onValueChange={(value) => updateData("legalIssues", value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="legal-none" />
                <Label htmlFor="legal-none">No current issues</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="minor" id="legal-minor" />
                <Label htmlFor="legal-minor">Minor issues being addressed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="significant" id="legal-significant" />
                <Label htmlFor="legal-significant">Significant legal concerns</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label>Cybersecurity Measures</Label>
            <RadioGroup value={data.cybersecurity} onValueChange={(value) => updateData("cybersecurity", value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="comprehensive" id="cyber-comprehensive" />
                <Label htmlFor="cyber-comprehensive">Comprehensive security measures</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="basic" id="cyber-basic" />
                <Label htmlFor="cyber-basic">Basic security in place</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="minimal" id="cyber-minimal" />
                <Label htmlFor="cyber-minimal">Minimal or no security measures</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label>Regulatory Compliance Status</Label>
            <RadioGroup value={data.compliance} onValueChange={(value) => updateData("compliance", value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="full" id="compliance-full" />
                <Label htmlFor="compliance-full">Fully compliant</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mostly" id="compliance-mostly" />
                <Label htmlFor="compliance-mostly">Mostly compliant</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="gaps" id="compliance-gaps" />
                <Label htmlFor="compliance-gaps">Some compliance gaps</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      )
    }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const canProceed = () => {
    const currentStepData = steps[currentStep];
    if (currentStep === 0) {
      return data.businessName && data.industry && data.location && data.revenueRange && data.employeeCount;
    }
    return true; // For other steps, we'll allow proceeding with any data
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(data);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Business Health Assessment</h1>
            <div className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
          <Progress value={progress} className="w-full" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep].title}</CardTitle>
            <CardDescription>{steps[currentStep].description}</CardDescription>
          </CardHeader>
          <CardContent>
            {steps[currentStep].fields}
            
            <div className="flex justify-between mt-8">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <Button 
                onClick={handleNext}
                disabled={!canProceed()}
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Report
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessQuestionnaire;