import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowRight, FileText, Clock, BarChart } from 'lucide-react';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from '@/components/GlobalFooter';
import SEO from '@/components/SEO';

const Onboarding = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-biz-green"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO 
        title="Onboarding - BizHealth.ai"
        description="Get started with your business health assessment"
        noindex={true}
      />
      <GlobalNavigation />
      
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-biz-green rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-montserrat font-bold text-biz-navy mb-4">
            Welcome to BizHealth.ai!
          </h1>
          <p className="text-lg text-biz-grey font-open-sans max-w-2xl mx-auto">
            You're about to discover exactly where your business stands and get actionable insights 
            to drive growth. Let's start your comprehensive business health assessment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="shadow-elegant border-border/50 text-center">
            <CardHeader>
              <FileText className="h-12 w-12 text-biz-green mx-auto mb-4" />
              <CardTitle className="font-montserrat text-biz-navy">Comprehensive Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-biz-grey font-open-sans">
                Answer questions across 12 key business areas to get a complete picture of your company's health.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-elegant border-border/50 text-center">
            <CardHeader>
              <Clock className="h-12 w-12 text-biz-green mx-auto mb-4" />
              <CardTitle className="font-montserrat text-biz-navy">AI Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-biz-grey font-open-sans">
                Our AI analyzes your responses against industry benchmarks and best practices.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-elegant border-border/50 text-center">
            <CardHeader>
              <BarChart className="h-12 w-12 text-biz-green mx-auto mb-4" />
              <CardTitle className="font-montserrat text-biz-navy">Actionable Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-biz-grey font-open-sans">
                Receive personalized recommendations and a roadmap for improvement.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-elegant border-border/50 bg-primary text-white">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl font-montserrat font-bold mb-4">
                  Ready to Begin Your Assessment?
                </h2>
                <p className="font-open-sans opacity-90 mb-4">
                  The assessment takes about 15-20 minutes to complete. Your responses are automatically saved, 
                  so you can take breaks if needed.
                </p>
                <ul className="space-y-2 font-open-sans text-sm opacity-90">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-biz-green" />
                    Auto-save functionality
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-biz-green" />
                    Industry benchmark comparisons
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-biz-green" />
                    Personalized recommendations
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-biz-green hover:bg-biz-green/90 text-white font-montserrat font-semibold px-8"
                >
                  <Link to="/questionnaire">
                    Start Assessment
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
                <p className="text-xs opacity-75 mt-2 font-open-sans">
                  ~15-20 minutes to complete
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <p className="text-biz-grey font-open-sans mb-4">
            Need help or have questions?
          </p>
          <div className="space-x-4">
            <Button variant="outline" asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/faq">View FAQ</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <GlobalFooter />
    </div>
  );
};

export default Onboarding;