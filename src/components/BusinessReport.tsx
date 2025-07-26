import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Download, Mail, ArrowLeft, TrendingUp, AlertTriangle, CheckCircle, Target } from "lucide-react";

interface BusinessReportProps {
  data: any;
  onBack: () => void;
}

const BusinessReport = ({ data, onBack }: BusinessReportProps) => {
  // Mock AI analysis based on user inputs
  const generateAnalysis = () => {
    const analysis = {
      overallScore: calculateOverallScore(),
      strengths: getStrengths(),
      weaknesses: getWeaknesses(),
      recommendations: getRecommendations(),
      categoryScores: getCategoryScores()
    };
    return analysis;
  };

  const calculateOverallScore = () => {
    // Simple scoring algorithm based on responses
    let score = 60; // Base score
    
    // Financial health
    if (data.revenueGrowth === 'growing-fast') score += 15;
    else if (data.revenueGrowth === 'growing-steady') score += 10;
    else if (data.revenueGrowth === 'stable') score += 5;
    else score -= 5;
    
    if (data.profitMargin[0] > 20) score += 10;
    else if (data.profitMargin[0] > 10) score += 5;
    
    if (data.cashFlowIssues === 'none') score += 8;
    else if (data.cashFlowIssues === 'occasional') score += 3;
    else score -= 5;
    
    // Operations
    if (data.supplyChainReliability[0] >= 8) score += 8;
    else if (data.supplyChainReliability[0] >= 6) score += 4;
    
    // Customer satisfaction
    if (data.customerSatisfaction[0] >= 8) score += 10;
    else if (data.customerSatisfaction[0] >= 6) score += 5;
    
    if (data.retentionRate[0] >= 80) score += 8;
    else if (data.retentionRate[0] >= 60) score += 4;
    
    // HR
    if (data.employeeTurnover[0] <= 10) score += 8;
    else if (data.employeeTurnover[0] <= 20) score += 4;
    else score -= 5;
    
    if (data.teamSatisfaction[0] >= 8) score += 8;
    else if (data.teamSatisfaction[0] >= 6) score += 4;
    
    return Math.min(100, Math.max(20, score));
  };

  const getStrengths = () => {
    const strengths = [];
    
    if (data.revenueGrowth === 'growing-fast' || data.revenueGrowth === 'growing-steady') {
      strengths.push("Strong revenue growth trajectory shows market demand and business traction");
    }
    
    if (data.profitMargin[0] > 15) {
      strengths.push("Healthy profit margins indicate efficient operations and good pricing strategy");
    }
    
    if (data.cashFlowIssues === 'none') {
      strengths.push("Excellent cash flow management provides financial stability and growth opportunities");
    }
    
    if (data.customerSatisfaction[0] >= 8) {
      strengths.push("High customer satisfaction scores demonstrate strong product-market fit");
    }
    
    if (data.retentionRate[0] >= 75) {
      strengths.push("Strong customer retention indicates valuable service delivery and loyalty");
    }
    
    if (data.employeeTurnover[0] <= 15) {
      strengths.push("Low employee turnover suggests good workplace culture and management");
    }
    
    if (data.supplyChainReliability[0] >= 7) {
      strengths.push("Reliable supply chain ensures consistent operations and customer delivery");
    }
    
    return strengths.slice(0, 4); // Top 4 strengths
  };

  const getWeaknesses = () => {
    const weaknesses = [];
    
    if (data.revenueGrowth === 'declining') {
      weaknesses.push("Declining revenue trend requires immediate attention to market strategy and operations");
    }
    
    if (data.profitMargin[0] < 10) {
      weaknesses.push("Low profit margins suggest need for cost optimization or pricing strategy review");
    }
    
    if (data.cashFlowIssues === 'frequent') {
      weaknesses.push("Frequent cash flow issues pose significant operational and growth risks");
    }
    
    if (data.customerSatisfaction[0] < 6) {
      weaknesses.push("Low customer satisfaction scores indicate product or service quality concerns");
    }
    
    if (data.retentionRate[0] < 60) {
      weaknesses.push("Poor customer retention suggests value proposition or service delivery issues");
    }
    
    if (data.employeeTurnover[0] > 25) {
      weaknesses.push("High employee turnover indicates potential HR, culture, or compensation issues");
    }
    
    if (data.technologyStack === 'outdated') {
      weaknesses.push("Outdated technology stack may hinder efficiency and competitive positioning");
    }
    
    if (data.cybersecurity === 'minimal') {
      weaknesses.push("Minimal cybersecurity measures expose the business to significant security risks");
    }
    
    return weaknesses.slice(0, 4); // Top 4 weaknesses
  };

  const getRecommendations = () => {
    const recommendations = [];
    
    if (data.revenueGrowth === 'declining' || data.revenueGrowth === 'stable') {
      recommendations.push({
        title: "Accelerate Growth Strategy",
        description: "Focus on customer acquisition, market expansion, or product development to drive revenue growth",
        priority: "High"
      });
    }
    
    if (data.profitMargin[0] < 15) {
      recommendations.push({
        title: "Optimize Profit Margins",
        description: "Review pricing strategy, reduce operational costs, or improve operational efficiency",
        priority: "High"
      });
    }
    
    if (data.employeeTurnover[0] > 20) {
      recommendations.push({
        title: "Improve Employee Retention",
        description: "Implement engagement surveys, review compensation, and strengthen management practices",
        priority: "Medium"
      });
    }
    
    if (data.customerSatisfaction[0] < 7) {
      recommendations.push({
        title: "Enhance Customer Experience",
        description: "Invest in customer service training, product improvements, and feedback systems",
        priority: "High"
      });
    }
    
    if (data.technologyStack === 'outdated') {
      recommendations.push({
        title: "Modernize Technology Infrastructure",
        description: "Upgrade systems to improve efficiency, security, and competitive advantage",
        priority: "Medium"
      });
    }
    
    if (data.rdInvestment[0] < 3) {
      recommendations.push({
        title: "Increase Innovation Investment",
        description: "Allocate more resources to R&D to stay competitive and drive future growth",
        priority: "Medium"
      });
    }
    
    return recommendations.slice(0, 5); // Top 5 recommendations
  };

  const getCategoryScores = () => {
    return {
      financial: calculateFinancialScore(),
      operations: calculateOperationsScore(),
      marketing: calculateMarketingScore(),
      hr: calculateHRScore(),
      customer: calculateCustomerScore(),
      innovation: calculateInnovationScore(),
      risk: calculateRiskScore()
    };
  };

  const calculateFinancialScore = () => {
    let score = 50;
    if (data.revenueGrowth === 'growing-fast') score += 25;
    else if (data.revenueGrowth === 'growing-steady') score += 15;
    else if (data.revenueGrowth === 'stable') score += 5;
    
    if (data.profitMargin[0] > 20) score += 15;
    else if (data.profitMargin[0] > 10) score += 8;
    
    if (data.cashFlowIssues === 'none') score += 10;
    else if (data.cashFlowIssues === 'occasional') score += 5;
    
    return Math.min(100, score);
  };

  const calculateOperationsScore = () => {
    let score = 50;
    score += (data.supplyChainReliability[0] - 5) * 5;
    if (data.technologyStack === 'modern') score += 15;
    else if (data.technologyStack === 'adequate') score += 8;
    return Math.min(100, Math.max(0, score));
  };

  const calculateMarketingScore = () => {
    let score = 50;
    score += data.conversionRate[0] * 2;
    if (data.salesPipeline === 'strong') score += 20;
    else if (data.salesPipeline === 'adequate') score += 10;
    return Math.min(100, Math.max(0, score));
  };

  const calculateHRScore = () => {
    let score = 50;
    score -= data.employeeTurnover[0] * 0.8;
    score += (data.teamSatisfaction[0] - 5) * 5;
    if (data.trainingPrograms === 'comprehensive') score += 15;
    else if (data.trainingPrograms === 'basic') score += 8;
    return Math.min(100, Math.max(0, score));
  };

  const calculateCustomerScore = () => {
    let score = 30;
    score += (data.customerSatisfaction[0] - 5) * 8;
    score += (data.retentionRate[0] - 50) * 0.4;
    return Math.min(100, Math.max(0, score));
  };

  const calculateInnovationScore = () => {
    let score = 40;
    if (data.productDevelopment === 'active') score += 25;
    else if (data.productDevelopment === 'planning') score += 15;
    score += data.rdInvestment[0] * 2;
    return Math.min(100, Math.max(0, score));
  };

  const calculateRiskScore = () => {
    let score = 70;
    if (data.legalIssues === 'significant') score -= 20;
    else if (data.legalIssues === 'minor') score -= 5;
    
    if (data.cybersecurity === 'comprehensive') score += 15;
    else if (data.cybersecurity === 'basic') score += 5;
    else score -= 10;
    
    if (data.compliance === 'full') score += 15;
    else if (data.compliance === 'mostly') score += 8;
    else score -= 5;
    
    return Math.min(100, Math.max(0, score));
  };

  const analysis = generateAnalysis();

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Improvement";
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "destructive";
      case "Medium": return "secondary";
      default: return "outline";
    }
  };

  const getIndustryBenchmark = (industry: string) => {
    const benchmarks: { [key: string]: any } = {
      technology: { avgProfit: 22, avgRetention: 85, avgTurnover: 12 },
      retail: { avgProfit: 8, avgRetention: 65, avgTurnover: 18 },
      healthcare: { avgProfit: 15, avgRetention: 90, avgTurnover: 8 },
      finance: { avgProfit: 25, avgRetention: 80, avgTurnover: 10 },
      manufacturing: { avgProfit: 12, avgRetention: 75, avgTurnover: 15 },
      services: { avgProfit: 18, avgRetention: 70, avgTurnover: 14 },
      default: { avgProfit: 15, avgRetention: 75, avgTurnover: 15 }
    };
    return benchmarks[industry] || benchmarks.default;
  };

  const benchmark = getIndustryBenchmark(data.industry);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Business Health Report</h1>
            <p className="text-xl text-muted-foreground mt-2">
              Comprehensive Analysis for {data.businessName}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Assessment
            </Button>
            <Button variant="outline">
              <Mail className="w-4 h-4 mr-2" />
              Email Report
            </Button>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Executive Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              Executive Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className={`text-6xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                  {analysis.overallScore}
                </div>
                <div className="text-lg text-muted-foreground">Overall Health Score</div>
                <Badge variant="secondary" className="mt-2">
                  {getScoreBadge(analysis.overallScore)}
                </Badge>
              </div>
              <div>
                <h4 className="font-semibold text-success mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Key Strengths
                </h4>
                <ul className="space-y-1 text-sm">
                  {analysis.strengths.slice(0, 3).map((strength, index) => (
                    <li key={index} className="text-muted-foreground">• {strength}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-destructive mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Areas for Improvement
                </h4>
                <ul className="space-y-1 text-sm">
                  {analysis.weaknesses.slice(0, 3).map((weakness, index) => (
                    <li key={index} className="text-muted-foreground">• {weakness}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Category Performance Analysis</CardTitle>
            <CardDescription>
              Detailed breakdown across key business areas compared to {data.industry} industry averages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(analysis.categoryScores).map(([category, score]) => (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium capitalize">
                      {category === 'hr' ? 'Human Resources' : category}
                    </span>
                    <span className={`font-bold ${getScoreColor(score as number)}`}>
                      {score}/100
                    </span>
                  </div>
                  <Progress value={score as number} className="h-3" />
                  <div className="text-xs text-muted-foreground">
                    {getScoreBadge(score as number)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Industry Benchmarking */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Industry Benchmarking</CardTitle>
            <CardDescription>How your business compares to {data.industry} industry standards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {data.profitMargin[0]}%
                </div>
                <div className="text-sm text-muted-foreground">Your Profit Margin</div>
                <div className="text-xs mt-1">
                  Industry Avg: {benchmark.avgProfit}%
                  <span className={data.profitMargin[0] > benchmark.avgProfit ? "text-success" : "text-destructive"}>
                    {data.profitMargin[0] > benchmark.avgProfit ? " ↗" : " ↘"}
                  </span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {data.retentionRate[0]}%
                </div>
                <div className="text-sm text-muted-foreground">Customer Retention</div>
                <div className="text-xs mt-1">
                  Industry Avg: {benchmark.avgRetention}%
                  <span className={data.retentionRate[0] > benchmark.avgRetention ? "text-success" : "text-destructive"}>
                    {data.retentionRate[0] > benchmark.avgRetention ? " ↗" : " ↘"}
                  </span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {data.employeeTurnover[0]}%
                </div>
                <div className="text-sm text-muted-foreground">Employee Turnover</div>
                <div className="text-xs mt-1">
                  Industry Avg: {benchmark.avgTurnover}%
                  <span className={data.employeeTurnover[0] < benchmark.avgTurnover ? "text-success" : "text-destructive"}>
                    {data.employeeTurnover[0] < benchmark.avgTurnover ? " ↗" : " ↘"}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Strategic Recommendations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-6 h-6" />
              Strategic Recommendations
            </CardTitle>
            <CardDescription>
              Actionable steps to improve your business performance and drive growth
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysis.recommendations.map((rec, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{rec.title}</h4>
                    <Badge variant={getPriorityColor(rec.priority) as any}>
                      {rec.priority} Priority
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">{rec.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Conclusion */}
        <Card>
          <CardHeader>
            <CardTitle>Conclusion & Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground">
                Based on your comprehensive business assessment, your overall health score of{" "}
                <span className={`font-bold ${getScoreColor(analysis.overallScore)}`}>
                  {analysis.overallScore}/100
                </span>{" "}
                indicates that your business is{" "}
                {analysis.overallScore >= 80 ? "performing excellently" :
                 analysis.overallScore >= 60 ? "performing well with room for improvement" :
                 "facing significant challenges that require immediate attention"}.
              </p>
              <p className="text-muted-foreground mt-4">
                Focus on implementing the high-priority recommendations first, particularly around{" "}
                {analysis.recommendations.filter(r => r.priority === "High").length > 0 
                  ? analysis.recommendations.filter(r => r.priority === "High")[0].title.toLowerCase()
                  : "operational efficiency"
                }. 
                We recommend reassessing your business health quarterly to track progress and identify new opportunities.
              </p>
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Want to dive deeper?</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Consider booking a consultation with our business experts for personalized guidance on implementing these recommendations.
                </p>
                <Button variant="outline" size="sm">
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessReport;