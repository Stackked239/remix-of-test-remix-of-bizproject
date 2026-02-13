import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from '@/components/GlobalFooter';
import PromotionalBanner from '@/components/PromotionalBanner';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  ChevronLeft, 
  ChevronRight, 
  Save, 
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Import questionnaire data and components
import { 
  allChapters, 
  businessOverviewFields,
  getAllSections,
  getSectionByIndex,
  getTotalSections,
  transformToPipelineFormat,
  validateQuestionnaire,
} from '@/data/questionnaire-index';

import BusinessOverviewSection from '@/components/questionnaire/BusinessOverviewSection';
import QuestionSection from '@/components/questionnaire/QuestionSection';
import ReviewSection from '@/components/questionnaire/ReviewSection';

const Questionnaire = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // State
  const [currentSection, setCurrentSection] = useState(-1); // -1 = business overview, 0+ = dimension sections
  const [companyProfile, setCompanyProfile] = useState<Record<string, any>>({});
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [existingAssessmentId, setExistingAssessmentId] = useState<string | null>(null);

  const totalSections = getTotalSections();
  const isBusinessOverview = currentSection === -1;
  const isReviewSection = currentSection === totalSections;
  const currentSectionInfo = !isBusinessOverview && !isReviewSection ? getSectionByIndex(currentSection) : null;

  // Calculate progress
  const progressPercentage = isBusinessOverview 
    ? 0 
    : isReviewSection 
      ? 100 
      : Math.round(((currentSection + 1) / (totalSections + 1)) * 100);

  // Check if user has purchased access
  useEffect(() => {
    const checkAccess = async () => {
      if (!user) return;

      try {
        // Check for completed payment/order (growth, enterprise, standard, or premium plans)
        // Essentials users should use /essentials-questionnaire instead
        const { data: orders, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'completed')
          .in('product_id', ['growth', 'enterprise', 'standard', 'premium'])
          .order('created_at', { ascending: false })
          .limit(1);

        if (error) throw error;

        if (orders && orders.length > 0) {
          setHasAccess(true);

          // Check for existing in-progress assessment
          const { data: assessments } = await supabase
            .from('questionnaires')
            .select('*')
            .eq('user_id', user.id)
            .eq('status', 'in_progress')
            .order('created_at', { ascending: false })
            .limit(1);

          if (assessments && assessments.length > 0) {
            setExistingAssessmentId(assessments[0].id);
            // Load saved responses
            if (assessments[0].responses) {
              setResponses(assessments[0].responses as Record<string, any>);
            }
            if (assessments[0].company_profile) {
              setCompanyProfile(assessments[0].company_profile as Record<string, any>);
            }
            if (assessments[0].current_section !== undefined) {
              setCurrentSection(assessments[0].current_section);
            }
          }
        } else {
          // Check if user has essentials tier - redirect them
          const { data: essentialsOrders } = await supabase
            .from('orders')
            .select('*')
            .eq('user_id', user.id)
            .eq('status', 'completed')
            .eq('product_id', 'essentials')
            .limit(1);

          if (essentialsOrders && essentialsOrders.length > 0) {
            // User has essentials tier - redirect to essentials questionnaire
            navigate('/essentials-questionnaire');
            return;
          }

          setHasAccess(false);
        }
      } catch (error) {
        console.error('Error checking access:', error);
        setHasAccess(false);
      }
    };

    if (user) {
      checkAccess();
    }
  }, [user, navigate]);

  // Auto-save functionality
  const saveProgress = useCallback(async () => {
    if (!user || !hasAccess) return;

    setIsSaving(true);
    try {
      const assessmentData = {
        user_id: user.id,
        company_profile: companyProfile,
        responses: responses,
        current_section: currentSection,
        status: 'in_progress',
        updated_at: new Date().toISOString(),
      };

      if (existingAssessmentId) {
        await supabase
          .from('questionnaires')
          .update(assessmentData)
          .eq('id', existingAssessmentId);
      } else {
        const { data, error } = await supabase
          .from('questionnaires')
          .insert(assessmentData)
          .select()
          .single();

        if (error) throw error;
        if (data) setExistingAssessmentId(data.id);
      }

      toast({
        title: 'Progress saved',
        description: 'Your responses have been saved.',
      });
    } catch (error) {
      console.error('Error saving progress:', error);
      toast({
        title: 'Save failed',
        description: 'Could not save your progress. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  }, [user, hasAccess, companyProfile, responses, currentSection, existingAssessmentId, toast]);

  // Handle response updates
  const handleResponseChange = (questionId: string, value: any) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // Handle company profile updates
  const handleProfileChange = (field: string, value: any) => {
    setCompanyProfile(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Navigation handlers
  const handleNext = async () => {
    // Save progress before moving
    await saveProgress();

    if (currentSection < totalSections) {
      setCurrentSection(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentSection > -1) {
      setCurrentSection(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleJumpToSection = (sectionIndex: number) => {
    setCurrentSection(sectionIndex);
    window.scrollTo(0, 0);
  };

  // Submit assessment
  const handleSubmit = async () => {
    if (!user || !existingAssessmentId) return;

    // Validate
    const validation = validateQuestionnaire(responses);
    if (!validation.isValid) {
      toast({
        title: 'Incomplete Assessment',
        description: `Please complete all required questions. ${validation.missingRequired.length} questions remaining.`,
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Transform to pipeline format
      const pipelineData = transformToPipelineFormat(companyProfile, responses);

      // Update questionnaire status
      await supabase
        .from('questionnaires')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          pipeline_payload: pipelineData,
        })
        .eq('id', existingAssessmentId);

      // Trigger the pipeline (via Edge Function)
      const { error: triggerError } = await supabase.functions.invoke('trigger-pipeline', {
        body: {
          questionnaire_id: existingAssessmentId,
          user_id: user.id,
          payload: pipelineData,
        },
      });

      if (triggerError) {
        console.error('Pipeline trigger error:', triggerError);
        // Don't fail the submission, just log the error
      }

      toast({
        title: 'Assessment Submitted!',
        description: 'Your assessment has been submitted. Reports will be generated shortly.',
      });

      // Redirect to portal
      navigate('/portal');
    } catch (error) {
      console.error('Error submitting assessment:', error);
      toast({
        title: 'Submission Failed',
        description: 'Could not submit your assessment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (authLoading || hasAccess === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-biz-green" />
      </div>
    );
  }

  // Not logged in
  if (!user) {
    navigate('/login', { state: { from: '/questionnaire' } });
    return null;
  }

  // No access - redirect to checkout
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <SEO title="Assessment Access Required - BizHealth.ai" description="Access your BizHealth.ai business assessment questionnaire." noindex={true} />
        <PromotionalBanner />
        <GlobalNavigation />
        
        <main className="flex-1 container mx-auto px-4 py-12 pt-24 max-w-2xl">
          <Card className="shadow-elegant">
            <CardHeader className="text-center">
              <AlertCircle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
              <CardTitle className="text-2xl font-montserrat text-biz-navy">
                Assessment Access Required
              </CardTitle>
              <CardDescription className="text-lg">
                You need to purchase an assessment to continue.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-biz-grey">
                Get your comprehensive business health assessment with personalized insights 
                and actionable recommendations.
              </p>
              <Button 
                size="lg" 
                className="bg-biz-green hover:bg-biz-green/90"
                onClick={() => navigate('/pricing')}
              >
                View Pricing & Purchase
              </Button>
            </CardContent>
          </Card>
        </main>
        
        <GlobalFooter />
      </div>
    );
  }

  // Get current chapter info for display
  const getCurrentChapter = () => {
    if (isBusinessOverview) return { name: 'Business Overview', code: 'INTRO' };
    if (isReviewSection) return { name: 'Review & Submit', code: 'REVIEW' };
    if (currentSectionInfo) {
      return {
        name: currentSectionInfo.chapterName,
        code: currentSectionInfo.chapterCode,
      };
    }
    return { name: '', code: '' };
  };

  const currentChapter = getCurrentChapter();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO 
        title="Business Health Assessment - BizHealth.ai" 
        description="Complete your comprehensive business health assessment"
        noindex={true}
      />
      <PromotionalBanner />
      <GlobalNavigation />
      
      <main className="flex-1 container mx-auto px-4 py-8 pt-24 max-w-4xl">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-biz-grey font-open-sans">
                {isBusinessOverview ? 'Getting Started' : isReviewSection ? 'Final Step' : `Chapter: ${currentChapter.name}`}
              </p>
              <h1 className="text-2xl font-montserrat font-bold text-biz-navy">
                {isBusinessOverview 
                  ? 'Business Overview' 
                  : isReviewSection 
                    ? 'Review & Submit'
                    : currentSectionInfo?.dimensionName}
              </h1>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={saveProgress}
              disabled={isSaving}
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save Progress
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-biz-grey">
              <span>Progress</span>
              <span>{progressPercentage}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>

        {/* Section Navigation Pills */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            <button
              onClick={() => handleJumpToSection(-1)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                isBusinessOverview 
                  ? 'bg-biz-green text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Overview
            </button>
            {getAllSections().map((section, idx) => (
              <button
                key={section.dimensionCode}
                onClick={() => handleJumpToSection(idx)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  currentSection === idx 
                    ? 'bg-biz-green text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {section.dimensionName}
              </button>
            ))}
            <button
              onClick={() => handleJumpToSection(totalSections)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                isReviewSection 
                  ? 'bg-biz-green text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Review
            </button>
          </div>
        </div>

        {/* Content Area */}
        <Card className="shadow-elegant mb-8">
          <CardContent className="p-6 md:p-8">
            {isBusinessOverview && (
              <BusinessOverviewSection
                data={companyProfile}
                onChange={handleProfileChange}
              />
            )}

            {!isBusinessOverview && !isReviewSection && currentSectionInfo && (
              <QuestionSection
                chapterCode={currentSectionInfo.chapterCode}
                dimensionCode={currentSectionInfo.dimensionCode}
                responses={responses}
                onChange={handleResponseChange}
              />
            )}

            {isReviewSection && (
              <ReviewSection
                companyProfile={companyProfile}
                responses={responses}
                onEdit={handleJumpToSection}
              />
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentSection === -1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {isReviewSection ? (
            <Button
              className="bg-biz-green hover:bg-biz-green/90"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Submit Assessment
                </>
              )}
            </Button>
          ) : (
            <Button
              className="bg-biz-green hover:bg-biz-green/90"
              onClick={handleNext}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </main>
      
      <GlobalFooter />
    </div>
  );
};

export default Questionnaire;
