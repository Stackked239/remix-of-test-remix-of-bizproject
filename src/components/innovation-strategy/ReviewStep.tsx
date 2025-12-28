import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Edit2, 
  Building2,
  Target,
  Lightbulb,
  Layers,
  BarChart3,
  Calendar,
  CheckCircle,
  ArrowRight,
  FileText
} from "lucide-react";
import { useInnovationStrategyStore } from "@/stores/innovationStrategyStore";
import { format } from "date-fns";

interface ReviewStepProps {
  onEditStep: (step: number) => void;
  onDownloadPDF: () => void;
}

const ReviewStep = ({ onEditStep, onDownloadPDF }: ReviewStepProps) => {
  const { data } = useInnovationStrategyStore();

  const getOpportunityById = (id: string) => data.opportunities.find(opp => opp.id === id);

  const sections = [
    { step: 1, title: 'Foundation', icon: Building2, color: 'biz-navy' },
    { step: 2, title: 'Vision', icon: Target, color: 'biz-teal' },
    { step: 3, title: 'Opportunities', icon: Lightbulb, color: 'biz-lime' },
    { step: 4, title: 'Portfolio', icon: Layers, color: 'biz-copper' },
    { step: 5, title: 'Metrics', icon: BarChart3, color: 'biz-citrine' },
    { step: 6, title: 'Roadmap', icon: Calendar, color: 'biz-green' },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-biz-lime/20 rounded-full mb-4">
          <CheckCircle className="w-8 h-8 text-biz-lime" />
        </div>
        <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-biz-navy mb-2">
          Your Innovation Strategy is Ready!
        </h2>
        <p className="font-open-sans text-muted-foreground">
          Review your complete strategy below, then download your professional PDF
        </p>
      </div>

      {/* Download CTA */}
      <Card className="bg-gradient-to-br from-biz-navy to-biz-navy-deep text-white">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded-lg">
                <FileText className="w-8 h-8 text-biz-lime" />
              </div>
              <div>
                <h3 className="font-montserrat font-bold text-xl">
                  Download Your Strategy
                </h3>
                <p className="font-open-sans text-white/70">
                  Get a professional PDF to share with your team
                </p>
              </div>
            </div>
            <Button
              onClick={onDownloadPDF}
              size="lg"
              className="bg-biz-lime hover:bg-biz-lime/90 text-biz-navy font-montserrat font-bold"
            >
              <Download className="w-5 h-5 mr-2" />
              Download PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Section 1: Foundation */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-montserrat text-lg flex items-center gap-2">
            <Building2 className="w-5 h-5 text-biz-navy" />
            Company Foundation
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => onEditStep(1)}>
            <Edit2 className="w-4 h-4 mr-1" /> Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-3 font-open-sans">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Company Name</p>
              <p className="font-semibold">{data.foundation.companyName || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Industry</p>
              <p className="font-semibold">
                {data.foundation.industry === 'Other' ? data.foundation.customIndustry : data.foundation.industry || 'Not specified'}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Company Size</p>
              <p className="font-semibold">{data.foundation.companySize ? `${data.foundation.companySize} employees` : 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Annual Revenue</p>
              <p className="font-semibold">{data.foundation.annualRevenue || 'Not specified'}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Primary Innovation Challenges</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {data.foundation.innovationChallenges.map((challenge, i) => (
                <Badge key={i} variant="secondary">{challenge}</Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Why Innovation Matters Now</p>
            <p className="italic">{data.foundation.whyInnovationMatters || 'Not specified'}</p>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Vision */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-montserrat text-lg flex items-center gap-2">
            <Target className="w-5 h-5 text-biz-teal" />
            Strategic Vision
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => onEditStep(2)}>
            <Edit2 className="w-4 h-4 mr-1" /> Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-3 font-open-sans">
          <div>
            <p className="text-sm text-muted-foreground">Strategic Intent</p>
            <p className="font-semibold capitalize">
              {data.vision.strategicIntent === 'lead' ? 'Lead our industry' :
               data.vision.strategicIntent === 'follow' ? 'Keep pace with leaders' :
               data.vision.strategicIntent === 'niche' ? 'Serve a specific niche better than anyone' :
               data.vision.strategicIntent === 'disrupt' ? 'Disrupt with a new business model' : 'Not specified'}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">3-Year Ambition</p>
            <p className="italic">"{data.vision.threeYearAmbition || 'Not specified'}"</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Core Differentiator (Today)</p>
              <p>{data.vision.coreDifferentiator || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Future Differentiator (3 Years)</p>
              <p>{data.vision.futureDifferentiator || 'Not specified'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Opportunities */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-montserrat text-lg flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-biz-lime" />
            Opportunities Identified ({data.opportunities.length})
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => onEditStep(3)}>
            <Edit2 className="w-4 h-4 mr-1" /> Edit
          </Button>
        </CardHeader>
        <CardContent className="font-open-sans">
          <div className="space-y-3">
            {data.opportunities.map((opp, i) => (
              <div key={opp.id} className="p-3 rounded-lg border bg-muted/30">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold">{i + 1}. {opp.title || 'Untitled'}</p>
                    <p className="text-sm text-muted-foreground">{opp.opportunityType}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">
                      {opp.estimatedImpact?.toUpperCase()} Impact
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {opp.effortToExecute?.toUpperCase()} Effort
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section 4: Portfolio */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-montserrat text-lg flex items-center gap-2">
            <Layers className="w-5 h-5 text-biz-copper" />
            Innovation Portfolio
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => onEditStep(4)}>
            <Edit2 className="w-4 h-4 mr-1" /> Edit
          </Button>
        </CardHeader>
        <CardContent className="font-open-sans">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-3 rounded-lg bg-biz-lime/10 border border-biz-lime/30">
              <p className="font-montserrat font-bold text-biz-lime mb-2">CORE ({data.portfolio.core.length})</p>
              <ul className="space-y-1 text-sm">
                {data.portfolio.core.map(id => (
                  <li key={id}>{getOpportunityById(id)?.title || 'Unknown'}</li>
                ))}
              </ul>
            </div>
            <div className="p-3 rounded-lg bg-biz-teal/10 border border-biz-teal/30">
              <p className="font-montserrat font-bold text-biz-teal mb-2">ADJACENT ({data.portfolio.adjacent.length})</p>
              <ul className="space-y-1 text-sm">
                {data.portfolio.adjacent.map(id => (
                  <li key={id}>{getOpportunityById(id)?.title || 'Unknown'}</li>
                ))}
              </ul>
            </div>
            <div className="p-3 rounded-lg bg-biz-copper/10 border border-biz-copper/30">
              <p className="font-montserrat font-bold text-biz-copper mb-2">TRANSFORMATIONAL ({data.portfolio.transformational.length})</p>
              <ul className="space-y-1 text-sm">
                {data.portfolio.transformational.map(id => (
                  <li key={id}>{getOpportunityById(id)?.title || 'Unknown'}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 5: Metrics */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-montserrat text-lg flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-biz-citrine" />
            Success Metrics ({data.metrics.length})
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => onEditStep(5)}>
            <Edit2 className="w-4 h-4 mr-1" /> Edit
          </Button>
        </CardHeader>
        <CardContent className="font-open-sans">
          <div className="space-y-3">
            {data.metrics.map((metric) => (
              <div key={metric.id} className="p-3 rounded-lg border bg-muted/30">
                <p className="font-semibold mb-2">{metric.name}</p>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Baseline</p>
                    <p>{metric.baseline || 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Target</p>
                    <p>{metric.target || 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Track</p>
                    <p>{metric.trackingFrequency || 'Not set'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section 6: Roadmap */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-montserrat text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5 text-biz-green" />
            90-Day Roadmap
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => onEditStep(6)}>
            <Edit2 className="w-4 h-4 mr-1" /> Edit
          </Button>
        </CardHeader>
        <CardContent className="font-open-sans">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-biz-lime/20 p-2 rounded-lg flex-shrink-0">
                <span className="font-montserrat font-bold text-biz-lime text-sm">M1</span>
              </div>
              <div>
                <p className="font-semibold">{data.roadmap.month1QuickWin || 'Not specified'}</p>
                <p className="text-sm text-muted-foreground">
                  Owner: {data.roadmap.month1Owner || 'TBD'} • Success: {data.roadmap.month1SuccessMetric || 'TBD'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-biz-teal/20 p-2 rounded-lg flex-shrink-0">
                <span className="font-montserrat font-bold text-biz-teal text-sm">M2</span>
              </div>
              <div>
                <p className="font-semibold">{data.roadmap.month2Capability || 'Not specified'}</p>
                <p className="text-sm text-muted-foreground">
                  Owner: {data.roadmap.month2Owner || 'TBD'} • Deliverable: {data.roadmap.month2Deliverable || 'TBD'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-biz-copper/20 p-2 rounded-lg flex-shrink-0">
                <span className="font-montserrat font-bold text-biz-copper text-sm">M3</span>
              </div>
              <div>
                <p className="font-semibold">{data.roadmap.month3Initiative || 'Not specified'}</p>
                <p className="text-sm text-muted-foreground">
                  Owner: {data.roadmap.month3Owner || 'TBD'} • Success: {data.roadmap.month3SuccessCriteria || 'TBD'}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm">
              <strong>Review Cadence:</strong> {data.roadmap.reviewCadence || 'Not set'} •{' '}
              <strong>Next Milestone:</strong> {data.roadmap.nextMilestoneDate ? format(new Date(data.roadmap.nextMilestoneDate), 'MMM d, yyyy') : 'Not set'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* What's Next */}
      <Card className="border-biz-lime/30 bg-biz-lime/5">
        <CardHeader>
          <CardTitle className="font-montserrat text-lg flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-biz-lime" />
            What's Next?
          </CardTitle>
        </CardHeader>
        <CardContent className="font-open-sans">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-biz-lime flex-shrink-0 mt-0.5" />
              <p>Set a calendar reminder for your {data.roadmap.nextMilestoneDate ? format(new Date(data.roadmap.nextMilestoneDate), 'MMM d') : '90-day'} review</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-biz-lime flex-shrink-0 mt-0.5" />
              <p>Share this strategy with your leadership team</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-biz-lime flex-shrink-0 mt-0.5" />
              <p>Schedule your first innovation review meeting</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-biz-lime flex-shrink-0 mt-0.5" />
              <p>Take the BizHealth Assessment for deeper insights</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Download CTA */}
      <div className="text-center pt-4">
        <Button
          onClick={onDownloadPDF}
          size="lg"
          className="bg-biz-lime hover:bg-biz-lime/90 text-biz-navy font-montserrat font-bold"
        >
          <Download className="w-5 h-5 mr-2" />
          Download Your Strategy PDF
        </Button>
      </div>
    </div>
  );
};

export default ReviewStep;
