import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from '@/components/GlobalFooter';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Loader2,
  FileText,
  Download,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  PlayCircle,
  BarChart3,
  TrendingUp,
  Target,
  Calendar,
  RefreshCw,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface Assessment {
  id: string;
  status: 'in_progress' | 'completed' | 'processing';
  created_at: string;
  completed_at: string | null;
  company_profile: {
    company_name?: string;
  } | null;
  current_section: number;
}

interface Report {
  id: string;
  report_type: string;
  title: string;
  status: 'generating' | 'completed' | 'failed';
  created_at: string;
  file_url: string | null;
  html_content: string | null;
  summary: {
    overall_score?: number;
    key_insights?: string[];
  } | null;
}

interface Order {
  id: string;
  product_id: string;
  amount: number;
  status: string;
  created_at: string;
}

const PortalNew = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  // Fetch user data
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        // Fetch assessments
        const { data: assessmentData } = await supabase
          .from('questionnaires')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (assessmentData) {
          setAssessments(assessmentData as Assessment[]);
        }

        // Fetch reports
        const { data: reportData } = await supabase
          .from('reports')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (reportData) {
          setReports(reportData as Report[]);
        }

        // Fetch orders
        const { data: orderData } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (orderData) {
          setOrders(orderData as Order[]);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login', { state: { from: '/portal' } });
    }
  }, [user, authLoading, navigate]);

  // View report
  const handleViewReport = (report: Report) => {
    if (report.html_content) {
      // Open in new tab with HTML content
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.write(report.html_content);
        newWindow.document.close();
      }
    } else if (report.file_url) {
      window.open(report.file_url, '_blank');
    }
  };

  // Download report
  const handleDownloadReport = async (report: Report) => {
    if (report.file_url) {
      window.open(report.file_url, '_blank');
    } else if (report.html_content) {
      // Create downloadable HTML file
      const blob = new Blob([report.html_content], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${report.title.replace(/\s+/g, '_')}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case 'processing':
        return <Badge className="bg-yellow-100 text-yellow-800">Processing</Badge>;
      case 'generating':
        return <Badge className="bg-purple-100 text-purple-800">Generating</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // Get report type icon
  const getReportIcon = (type: string) => {
    switch (type) {
      case 'comprehensive':
        return <FileText className="h-5 w-5" />;
      case 'executive_summary':
        return <BarChart3 className="h-5 w-5" />;
      case 'action_plan':
        return <Target className="h-5 w-5" />;
      case 'benchmark':
        return <TrendingUp className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-biz-green" />
      </div>
    );
  }

  const hasCompletedOrder = orders.some(o => o.status === 'completed');
  const latestAssessment = assessments[0];
  const completedReports = reports.filter(r => r.status === 'completed');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SEO 
        title="Dashboard - BizHealth.ai" 
        description="View your business health assessment and reports"
        noindex={true}
      />
      <GlobalNavigation />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-montserrat font-bold text-biz-navy mb-2">
            Welcome back{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ''}!
          </h1>
          <p className="text-biz-grey">
            Manage your assessments and view your business health reports.
          </p>
        </div>

        {/* Quick Actions */}
        {!hasCompletedOrder && (
          <Card className="mb-8 border-amber-200 bg-amber-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <AlertCircle className="h-8 w-8 text-amber-600" />
                  <div>
                    <h3 className="font-semibold text-amber-800">Get Started with Your Assessment</h3>
                    <p className="text-sm text-amber-700">
                      Purchase an assessment to unlock your business health insights.
                    </p>
                  </div>
                </div>
                <Button 
                  className="bg-biz-green hover:bg-biz-green/90"
                  onClick={() => navigate('/pricing')}
                >
                  View Pricing
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {hasCompletedOrder && !latestAssessment && (
          <Card className="mb-8 border-biz-green/30 bg-biz-green/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <PlayCircle className="h-8 w-8 text-biz-green" />
                  <div>
                    <h3 className="font-semibold text-biz-navy">Ready to Start!</h3>
                    <p className="text-sm text-biz-grey">
                      Your assessment is ready. Complete it to receive your personalized reports.
                    </p>
                  </div>
                </div>
                <Button 
                  className="bg-biz-green hover:bg-biz-green/90"
                  onClick={() => navigate('/questionnaire')}
                >
                  Start Assessment
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {latestAssessment?.status === 'in_progress' && (
          <Card className="mb-8 border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Clock className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-blue-800">Assessment In Progress</h3>
                    <p className="text-sm text-blue-700">
                      Continue where you left off to complete your assessment.
                    </p>
                  </div>
                </div>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => navigate('/questionnaire')}
                >
                  Continue Assessment
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs defaultValue="reports" className="space-y-6">
          <TabsList className="bg-white border">
            <TabsTrigger value="reports" className="data-[state=active]:bg-biz-green data-[state=active]:text-white">
              <FileText className="h-4 w-4 mr-2" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="assessments" className="data-[state=active]:bg-biz-green data-[state=active]:text-white">
              <BarChart3 className="h-4 w-4 mr-2" />
              Assessments
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-biz-green data-[state=active]:text-white">
              <Calendar className="h-4 w-4 mr-2" />
              Orders
            </TabsTrigger>
          </TabsList>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-4">
            {completedReports.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-biz-navy mb-2">No Reports Yet</h3>
                  <p className="text-biz-grey mb-6">
                    Complete your assessment to generate your personalized business health reports.
                  </p>
                  {hasCompletedOrder && (
                    <Button 
                      className="bg-biz-green hover:bg-biz-green/90"
                      onClick={() => navigate('/questionnaire')}
                    >
                      Start Assessment
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {completedReports.map((report) => (
                  <Card key={report.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-biz-navy/10 rounded-lg text-biz-navy">
                            {getReportIcon(report.report_type)}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{report.title}</CardTitle>
                            <CardDescription>
                              Generated {format(new Date(report.created_at), 'MMM d, yyyy')}
                            </CardDescription>
                          </div>
                        </div>
                        {getStatusBadge(report.status)}
                      </div>
                    </CardHeader>
                    {report.summary?.overall_score && (
                      <CardContent className="pb-3">
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-biz-navy">
                              {report.summary.overall_score}
                            </div>
                            <div className="text-xs text-biz-grey">Health Score</div>
                          </div>
                          <div className="flex-1">
                            <Progress 
                              value={report.summary.overall_score} 
                              className="h-2"
                            />
                          </div>
                        </div>
                      </CardContent>
                    )}
                    <CardFooter className="pt-3 border-t flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewReport(report)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownloadReport(report)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}

            {/* Processing Reports */}
            {reports.filter(r => r.status === 'generating').length > 0 && (
              <Card className="border-purple-200 bg-purple-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <RefreshCw className="h-8 w-8 text-purple-600 animate-spin" />
                    <div>
                      <h3 className="font-semibold text-purple-800">Reports Being Generated</h3>
                      <p className="text-sm text-purple-700">
                        Your reports are being generated. This usually takes 5-10 minutes.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Assessments Tab */}
          <TabsContent value="assessments" className="space-y-4">
            {assessments.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-biz-navy mb-2">No Assessments</h3>
                  <p className="text-biz-grey">
                    You haven't started any assessments yet.
                  </p>
                </CardContent>
              </Card>
            ) : (
              assessments.map((assessment) => (
                <Card key={assessment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-biz-navy/10 rounded-lg">
                          <BarChart3 className="h-6 w-6 text-biz-navy" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-biz-navy">
                            {assessment.company_profile?.company_name || 'Business Assessment'}
                          </h3>
                          <p className="text-sm text-biz-grey">
                            Started {format(new Date(assessment.created_at), 'MMM d, yyyy')}
                            {assessment.completed_at && (
                              <> • Completed {format(new Date(assessment.completed_at), 'MMM d, yyyy')}</>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {getStatusBadge(assessment.status)}
                        {assessment.status === 'in_progress' && (
                          <Button 
                            size="sm"
                            onClick={() => navigate('/questionnaire')}
                          >
                            Continue
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            {orders.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-biz-navy mb-2">No Orders</h3>
                  <p className="text-biz-grey mb-6">
                    You haven't made any purchases yet.
                  </p>
                  <Button 
                    className="bg-biz-green hover:bg-biz-green/90"
                    onClick={() => navigate('/pricing')}
                  >
                    View Pricing
                  </Button>
                </CardContent>
              </Card>
            ) : (
              orders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-biz-navy">
                          {order.product_id === 'premium' ? 'Premium Assessment + Consultation' : 'Business Health Assessment'}
                        </h3>
                        <p className="text-sm text-biz-grey">
                          {format(new Date(order.created_at), 'MMM d, yyyy h:mm a')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-biz-navy">${order.amount}</p>
                        {getStatusBadge(order.status)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <GlobalFooter />
    </div>
  );
};

export default PortalNew;
