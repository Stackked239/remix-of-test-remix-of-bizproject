import React, { useState, useEffect, useRef } from 'react';
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
  ChevronRight,
  Sparkles,
  Shield,
  ArrowUpRight,
  Zap,
  Award,
  Activity,
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

const Portal = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [activeTab, setActiveTab] = useState('reports');

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

  // Get status badge with modern styling
  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300";
    switch (status) {
      case 'completed':
        return <span className={`${baseClasses} bg-biz-green/15 text-biz-green border border-biz-green/30`}>Completed</span>;
      case 'in_progress':
        return <span className={`${baseClasses} bg-blue-500/15 text-blue-600 border border-blue-500/30`}>In Progress</span>;
      case 'processing':
        return <span className={`${baseClasses} bg-amber-500/15 text-amber-600 border border-amber-500/30`}>Processing</span>;
      case 'generating':
        return <span className={`${baseClasses} bg-purple-500/15 text-purple-600 border border-purple-500/30 animate-pulse`}>Generating</span>;
      case 'failed':
        return <span className={`${baseClasses} bg-red-500/15 text-red-600 border border-red-500/30`}>Failed</span>;
      default:
        return <span className={`${baseClasses} bg-gray-500/15 text-gray-600 border border-gray-500/30`}>{status}</span>;
    }
  };

  // Get report type icon with styling
  const getReportIcon = (type: string) => {
    const iconClass = "h-5 w-5";
    switch (type) {
      case 'comprehensive':
        return <FileText className={iconClass} />;
      case 'executive_summary':
        return <BarChart3 className={iconClass} />;
      case 'action_plan':
        return <Target className={iconClass} />;
      case 'benchmark':
        return <TrendingUp className={iconClass} />;
      default:
        return <FileText className={iconClass} />;
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-biz-cream flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-biz-green/20 rounded-full blur-xl animate-pulse"></div>
            <Loader2 className="h-16 w-16 animate-spin text-biz-green relative z-10" />
          </div>
          <p className="mt-6 font-montserrat font-semibold text-biz-navy">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const hasCompletedOrder = orders.some(o => o.status === 'completed');
  const latestAssessment = assessments[0];
  const completedReports = reports.filter(r => r.status === 'completed');
  const generatingReports = reports.filter(r => r.status === 'generating');

  // Calculate stats
  const totalReports = completedReports.length;
  const avgScore = completedReports.length > 0
    ? Math.round(completedReports.reduce((acc, r) => acc + (r.summary?.overall_score || 0), 0) / completedReports.length)
    : 0;

  return (
    <div className="min-h-screen bg-biz-cream flex flex-col">
      <SEO
        title="Dashboard - BizHealth.ai"
        description="View your business health assessment and reports"
        noindex={true}
      />
      <GlobalNavigation />

      {/* Hero Section with Background Elements */}
      <div className="relative bg-biz-navy overflow-hidden" style={{ paddingTop: '100px' }}>
        {/* Decorative Background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-20 w-96 h-96 bg-biz-green/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-72 h-72 bg-biz-green/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-biz-navy-light/30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12 pb-24">
          {/* Welcome Header */}
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-12 bg-biz-green rounded-full"></div>
              <span className="font-open-sans text-biz-green text-sm font-semibold tracking-wider uppercase">Your Dashboard</span>
            </div>
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl text-white mb-4 leading-tight">
              Welcome back{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name.split(' ')[0]}` : ''}
              <span className="text-biz-green">.</span>
            </h1>
            <p className="font-open-sans text-lg text-white/70 max-w-2xl">
              Track your business health journey, access your reports, and unlock actionable insights to drive growth.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {[
              { label: 'Reports Generated', value: totalReports.toString(), icon: FileText, color: 'biz-green' },
              { label: 'Avg Health Score', value: avgScore > 0 ? `${avgScore}%` : '—', icon: Activity, color: 'biz-green' },
              { label: 'Assessments', value: assessments.length.toString(), icon: BarChart3, color: 'biz-green' },
              { label: 'Account Status', value: hasCompletedOrder ? 'Active' : 'New', icon: Shield, color: 'biz-green' },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-open-sans text-xs text-white/50 uppercase tracking-wider mb-1">{stat.label}</p>
                    <p className="font-montserrat font-bold text-2xl md:text-3xl text-white">{stat.value}</p>
                  </div>
                  <div className={`p-2 rounded-xl bg-${stat.color}/20`}>
                    <stat.icon className={`h-5 w-5 text-${stat.color}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Curved Bottom Edge */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60V0C240 40 480 60 720 60C960 60 1200 40 1440 0V60H0Z" fill="hsl(40, 33%, 97%)" />
          </svg>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8 -mt-8 relative z-20">
        {/* Quick Actions */}
        {!hasCompletedOrder && (
          <div className="mb-8 animate-fade-in-up">
            <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/50 rounded-2xl p-6 md:p-8">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-300/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-100 rounded-2xl">
                    <Sparkles className="h-7 w-7 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-bold text-xl text-amber-900 mb-1">Get Started with Your Assessment</h3>
                    <p className="font-open-sans text-amber-700/80">
                      Unlock comprehensive business health insights and actionable recommendations.
                    </p>
                  </div>
                </div>
                <Button
                  className="bg-biz-green hover:bg-biz-green/90 text-white font-montserrat font-semibold shadow-feature hover:shadow-xl transition-all duration-300 hover:scale-105 whitespace-nowrap"
                  onClick={() => navigate('/pricing')}
                >
                  View Plans
                  <ArrowUpRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {hasCompletedOrder && !latestAssessment && (
          <div className="mb-8 animate-fade-in-up">
            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 border border-biz-green/20 rounded-2xl p-6 md:p-8">
              <div className="absolute top-0 right-0 w-64 h-64 bg-biz-green/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-biz-green/10 rounded-2xl animate-pulse">
                    <PlayCircle className="h-7 w-7 text-biz-green" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-bold text-xl text-biz-navy mb-1">Ready to Start Your Assessment!</h3>
                    <p className="font-open-sans text-biz-grey">
                      Complete your assessment to receive personalized business health reports.
                    </p>
                  </div>
                </div>
                <Button
                  className="bg-biz-green hover:bg-biz-green/90 text-white font-montserrat font-semibold shadow-feature hover:shadow-xl transition-all duration-300 hover:scale-105 whitespace-nowrap"
                  onClick={() => navigate('/questionnaire')}
                >
                  Start Now
                  <img src="/favicon.svg" alt="" className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {latestAssessment?.status === 'in_progress' && (
          <div className="mb-8 animate-fade-in-up">
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/50 rounded-2xl p-6 md:p-8">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-300/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-2xl">
                    <Clock className="h-7 w-7 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-bold text-xl text-blue-900 mb-1">Assessment In Progress</h3>
                    <p className="font-open-sans text-blue-700/80">
                      Continue where you left off to complete your business health assessment.
                    </p>
                  </div>
                </div>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-montserrat font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 whitespace-nowrap"
                  onClick={() => navigate('/questionnaire')}
                >
                  Continue
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-gray-200/80 p-1.5 rounded-xl shadow-sm w-full md:w-auto inline-flex">
            {[
              { value: 'reports', label: 'Reports', icon: FileText, count: completedReports.length },
              { value: 'assessments', label: 'Assessments', icon: BarChart3, count: assessments.length },
              { value: 'orders', label: 'Orders', icon: Calendar, count: orders.length },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex-1 md:flex-none data-[state=active]:bg-biz-navy data-[state=active]:text-white data-[state=active]:shadow-md font-montserrat font-semibold px-6 py-2.5 rounded-lg transition-all duration-300"
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
                {tab.count > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-current/10">{tab.count}</span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6 animate-fade-in">
            {/* Generating Reports Notice */}
            {generatingReports.length > 0 && (
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200/50 rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <RefreshCw className="h-6 w-6 text-purple-600 animate-spin" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-purple-900">Reports Being Generated</h3>
                    <p className="font-open-sans text-sm text-purple-700/80">
                      Your reports are being prepared. This typically takes 5-10 minutes.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {completedReports.length === 0 && generatingReports.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200/80 shadow-card p-12 text-center">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-biz-navy/5 rounded-full blur-xl"></div>
                  <div className="relative bg-biz-navy/5 rounded-full p-6">
                    <FileText className="h-12 w-12 text-biz-navy/40" />
                  </div>
                </div>
                <h3 className="font-montserrat font-bold text-2xl text-biz-navy mb-3">No Reports Yet</h3>
                <p className="font-open-sans text-biz-grey mb-8 max-w-md mx-auto">
                  Complete your assessment to generate personalized business health reports with actionable insights.
                </p>
                {hasCompletedOrder && (
                  <Button
                    className="bg-biz-green hover:bg-biz-green/90 text-white font-montserrat font-semibold shadow-feature hover:shadow-xl transition-all duration-300 hover:scale-105"
                    onClick={() => navigate('/questionnaire')}
                  >
                    Start Assessment
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {completedReports.map((report, index) => (
                  <div
                    key={report.id}
                    className="group bg-white rounded-2xl border border-gray-200/80 shadow-card hover:shadow-feature transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Card Header with Gradient */}
                    <div className="relative p-6 pb-4">
                      <div className="absolute inset-0 bg-gradient-to-br from-biz-navy/[0.02] to-transparent"></div>
                      <div className="relative flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-biz-navy/5 rounded-xl group-hover:bg-biz-navy/10 transition-colors duration-300">
                            <div className="text-biz-navy">
                              {getReportIcon(report.report_type)}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-montserrat font-bold text-lg text-biz-navy leading-tight mb-1">
                              {report.title}
                            </h3>
                            <p className="font-open-sans text-sm text-biz-grey">
                              {format(new Date(report.created_at), 'MMMM d, yyyy')}
                            </p>
                          </div>
                        </div>
                        {getStatusBadge(report.status)}
                      </div>
                    </div>

                    {/* Score Section */}
                    {report.summary?.overall_score && (
                      <div className="px-6 pb-4">
                        <div className="bg-biz-cream/50 rounded-xl p-4">
                          <div className="flex items-center gap-6">
                            <div className="relative">
                              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 100 100">
                                <circle
                                  cx="50"
                                  cy="50"
                                  r="42"
                                  fill="none"
                                  stroke="hsl(233, 20%, 90%)"
                                  strokeWidth="8"
                                />
                                <circle
                                  cx="50"
                                  cy="50"
                                  r="42"
                                  fill="none"
                                  stroke="hsl(59, 62%, 36%)"
                                  strokeWidth="8"
                                  strokeLinecap="round"
                                  strokeDasharray={`${(report.summary.overall_score / 100) * 264} 264`}
                                  className="transition-all duration-1000"
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="font-montserrat font-bold text-2xl text-biz-navy">
                                  {report.summary.overall_score}
                                </span>
                              </div>
                            </div>
                            <div className="flex-1">
                              <p className="font-open-sans text-sm text-biz-grey mb-1">Health Score</p>
                              <p className="font-montserrat font-semibold text-biz-navy">
                                {report.summary.overall_score >= 80 ? 'Excellent' :
                                 report.summary.overall_score >= 60 ? 'Good' :
                                 report.summary.overall_score >= 40 ? 'Fair' : 'Needs Attention'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="px-6 pb-6 pt-2 flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewReport(report)}
                        className="flex-1 border-biz-navy/20 text-biz-navy hover:bg-biz-navy hover:text-white font-montserrat font-semibold transition-all duration-300"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Report
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadReport(report)}
                        className="border-biz-green/30 text-biz-green hover:bg-biz-green hover:text-white font-montserrat font-semibold transition-all duration-300"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Assessments Tab */}
          <TabsContent value="assessments" className="space-y-4 animate-fade-in">
            {assessments.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200/80 shadow-card p-12 text-center">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-biz-navy/5 rounded-full blur-xl"></div>
                  <div className="relative bg-biz-navy/5 rounded-full p-6">
                    <BarChart3 className="h-12 w-12 text-biz-navy/40" />
                  </div>
                </div>
                <h3 className="font-montserrat font-bold text-2xl text-biz-navy mb-3">No Assessments Yet</h3>
                <p className="font-open-sans text-biz-grey">
                  You haven't started any business health assessments yet.
                </p>
              </div>
            ) : (
              assessments.map((assessment, index) => (
                <div
                  key={assessment.id}
                  className="group bg-white rounded-2xl border border-gray-200/80 shadow-card hover:shadow-feature transition-all duration-300 p-6"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-biz-navy/5 rounded-xl group-hover:bg-biz-navy/10 transition-colors duration-300">
                        <BarChart3 className="h-6 w-6 text-biz-navy" />
                      </div>
                      <div>
                        <h3 className="font-montserrat font-bold text-lg text-biz-navy">
                          {assessment.company_profile?.company_name || 'Business Assessment'}
                        </h3>
                        <p className="font-open-sans text-sm text-biz-grey">
                          Started {format(new Date(assessment.created_at), 'MMMM d, yyyy')}
                          {assessment.completed_at && (
                            <span className="text-biz-green ml-2">
                              • Completed {format(new Date(assessment.completed_at), 'MMMM d, yyyy')}
                            </span>
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
                          className="bg-biz-green hover:bg-biz-green/90 text-white font-montserrat font-semibold"
                        >
                          Continue
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4 animate-fade-in">
            {orders.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200/80 shadow-card p-12 text-center">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-biz-navy/5 rounded-full blur-xl"></div>
                  <div className="relative bg-biz-navy/5 rounded-full p-6">
                    <Calendar className="h-12 w-12 text-biz-navy/40" />
                  </div>
                </div>
                <h3 className="font-montserrat font-bold text-2xl text-biz-navy mb-3">No Orders Yet</h3>
                <p className="font-open-sans text-biz-grey mb-8">
                  You haven't made any purchases yet.
                </p>
                <Button
                  className="bg-biz-green hover:bg-biz-green/90 text-white font-montserrat font-semibold shadow-feature hover:shadow-xl transition-all duration-300 hover:scale-105"
                  onClick={() => navigate('/pricing')}
                >
                  View Plans
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            ) : (
              orders.map((order, index) => (
                <div
                  key={order.id}
                  className="group bg-white rounded-2xl border border-gray-200/80 shadow-card hover:shadow-feature transition-all duration-300 p-6"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-biz-green/10 rounded-xl">
                        <Award className="h-6 w-6 text-biz-green" />
                      </div>
                      <div>
                        <h3 className="font-montserrat font-bold text-lg text-biz-navy">
                          {order.product_id === 'premium' ? 'Premium Assessment + Consultation' : 'Business Health Assessment'}
                        </h3>
                        <p className="font-open-sans text-sm text-biz-grey">
                          {format(new Date(order.created_at), 'MMMM d, yyyy • h:mm a')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-montserrat font-bold text-xl text-biz-navy">${order.amount}</span>
                      {getStatusBadge(order.status)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>

        {/* Trust Footer */}
        <div className="mt-12 bg-white rounded-2xl border border-gray-200/80 shadow-card p-6">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-biz-grey">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-biz-green" />
              <span className="font-open-sans">256-bit SSL Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-biz-green" />
              <span className="font-open-sans">Enterprise Security</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-biz-green" />
              <span className="font-open-sans">100% Confidential</span>
            </div>
          </div>
        </div>
      </main>

      <GlobalFooter />

      {/* Custom Styles */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Portal;
