import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  allChapters,
  getAllSections,
  validateQuestionnaire,
} from '@/data/questionnaire-index';
import { 
  CheckCircle, 
  AlertCircle, 
  Edit2, 
  Building2,
  Target,
  TrendingUp,
  Users,
  Shield,
} from 'lucide-react';

interface ReviewSectionProps {
  companyProfile: Record<string, any>;
  responses: Record<string, any>;
  onEdit: (sectionIndex: number) => void;
}

const chapterIcons: Record<string, React.ReactNode> = {
  GE: <TrendingUp className="h-5 w-5" />,
  PH: <Target className="h-5 w-5" />,
  PL: <Users className="h-5 w-5" />,
  RS: <Shield className="h-5 w-5" />,
};

const ReviewSection: React.FC<ReviewSectionProps> = ({
  companyProfile,
  responses,
  onEdit,
}) => {
  const validation = validateQuestionnaire(responses);
  const sections = getAllSections();

  // Calculate completion per dimension
  const getDimensionCompletion = (dimensionCode: string): { answered: number; total: number } => {
    let answered = 0;
    let total = 0;

    allChapters.forEach(chapter => {
      chapter.dimensions.forEach(dimension => {
        if (dimension.code === dimensionCode) {
          dimension.questions.forEach(question => {
            total++;
            if (responses[question.id] !== undefined && responses[question.id] !== null && responses[question.id] !== '') {
              answered++;
            }
          });
        }
      });
    });

    return { answered, total };
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-biz-navy/5 to-biz-green/5 rounded-lg p-6">
        <h2 className="text-xl font-montserrat font-semibold text-biz-navy mb-2">
          Review Your Assessment
        </h2>
        <p className="text-biz-grey font-open-sans">
          Please review your responses before submitting. You can click "Edit" on any section to make changes.
        </p>
      </div>

      {/* Completion Status */}
      <Card className={validation.isValid ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'}>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            {validation.isValid ? (
              <>
                <CheckCircle className="h-6 w-6 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">Assessment Complete!</p>
                  <p className="text-sm text-green-700">
                    All required questions have been answered. You're ready to submit.
                  </p>
                </div>
              </>
            ) : (
              <>
                <AlertCircle className="h-6 w-6 text-amber-600" />
                <div>
                  <p className="font-medium text-amber-800">
                    {validation.completionPercentage}% Complete
                  </p>
                  <p className="text-sm text-amber-700">
                    {validation.missingRequired.length} required questions remaining. 
                    Please complete all required questions before submitting.
                  </p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Company Overview Summary */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-biz-navy" />
              <CardTitle className="text-lg">Business Overview</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onEdit(-1)}>
              <Edit2 className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-biz-grey">Company Name:</span>
              <span className="ml-2 font-medium">{companyProfile.company_name || 'Not provided'}</span>
            </div>
            <div>
              <span className="text-biz-grey">Industry:</span>
              <span className="ml-2 font-medium">{companyProfile.industry || 'Not provided'}</span>
            </div>
            <div>
              <span className="text-biz-grey">Location:</span>
              <span className="ml-2 font-medium">
                {companyProfile.location ? `${companyProfile.location}, ${companyProfile.country || 'US'}` : 'Not provided'}
              </span>
            </div>
            <div>
              <span className="text-biz-grey">Team Size:</span>
              <span className="ml-2 font-medium">
                {(companyProfile.full_time_employees || 0) + (companyProfile.part_time_employees || 0)} employees
              </span>
            </div>
            <div>
              <span className="text-biz-grey">Last Year Revenue:</span>
              <span className="ml-2 font-medium">
                {companyProfile.last_year_revenue 
                  ? `$${companyProfile.last_year_revenue.toLocaleString()}` 
                  : 'Not provided'}
              </span>
            </div>
            <div>
              <span className="text-biz-grey">Corporate Structure:</span>
              <span className="ml-2 font-medium">{companyProfile.corporate_structure || 'Not provided'}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chapter Summaries */}
      {allChapters.map((chapter, chapterIdx) => (
        <Card key={chapter.code}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-biz-navy/10 text-biz-navy">
                {chapterIcons[chapter.code]}
              </div>
              <div>
                <CardTitle className="text-lg">{chapter.name}</CardTitle>
                <p className="text-sm text-biz-grey">{chapter.description}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {chapter.dimensions.map((dimension) => {
                const completion = getDimensionCompletion(dimension.code);
                const sectionIndex = sections.findIndex(s => s.dimensionCode === dimension.code);
                const isComplete = completion.answered === completion.total;

                return (
                  <div 
                    key={dimension.code}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {isComplete ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                      )}
                      <div>
                        <p className="font-medium text-biz-navy">{dimension.name}</p>
                        <p className="text-sm text-biz-grey">
                          {completion.answered} of {completion.total} questions answered
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={isComplete ? 'default' : 'secondary'}>
                        {Math.round((completion.answered / completion.total) * 100)}%
                      </Badge>
                      <Button variant="ghost" size="sm" onClick={() => onEdit(sectionIndex)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* What Happens Next */}
      <Card className="border-biz-green/30 bg-biz-green/5">
        <CardHeader>
          <CardTitle className="text-lg text-biz-navy">What Happens After You Submit?</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-biz-green text-white flex items-center justify-center text-xs font-bold">1</span>
              <div>
                <p className="font-medium text-biz-navy">Analysis Begins</p>
                <p className="text-biz-grey">Our AI-powered system analyzes your responses against industry benchmarks.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-biz-green text-white flex items-center justify-center text-xs font-bold">2</span>
              <div>
                <p className="font-medium text-biz-navy">Reports Generated</p>
                <p className="text-biz-grey">Multiple detailed reports are created including your comprehensive health assessment.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-biz-green text-white flex items-center justify-center text-xs font-bold">3</span>
              <div>
                <p className="font-medium text-biz-navy">Access Your Dashboard</p>
                <p className="text-biz-grey">View and download your reports from your personalized dashboard (usually within 5-10 minutes).</p>
              </div>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewSection;
