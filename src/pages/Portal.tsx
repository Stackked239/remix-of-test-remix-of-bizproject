import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, FileText, TrendingUp, AlertCircle, Star, Lock } from 'lucide-react';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from '@/components/GlobalFooter';
import SEO from '@/components/SEO';

interface Report {
  id: string;
  report_type: string;
  created_at: string;
  content: any;
  pdf_url?: string;
}

interface Questionnaire {
  id: string;
  tier: string;
  completed_at: string | null;
  responses: any;
}

const Portal = () => {
  const { user, loading } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      // Fetch reports
      const { data: reportsData } = await supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false });

      // Fetch questionnaires
      const { data: questionnairesData } = await supabase
        .from('questionnaires')
        .select('*')
        .order('created_at', { ascending: false });

      setReports(reportsData || []);
      setQuestionnaires(questionnairesData || []);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoadingData(false);
    }
  };

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

  // Sample data for charts
  const businessHealthData = [
    { area: 'Strategy', score: 75 },
    { area: 'Financials', score: 68 },
    { area: 'Sales', score: 82 },
    { area: 'Marketing', score: 71 },
    { area: 'Operations', score: 79 },
    { area: 'Technology', score: 65 },
  ];

  const pieData = [
    { name: 'Strong Areas', value: 3, color: '#969423' },
    { name: 'Needs Attention', value: 2, color: '#7C7C7C' },
    { name: 'Critical Areas', value: 1, color: '#ef4444' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO 
        title="Dashboard - BizHealth.ai"
        description="Your business health dashboard and reports"
        noindex={true}
      />
      <GlobalNavigation />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-montserrat font-bold text-biz-navy mb-2">
            Business Health Dashboard
          </h1>
          <p className="text-biz-grey font-open-sans">
            Welcome back! Track your business health insights and access your reports.
          </p>
        </div>

        {loadingData ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-biz-green"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Dashboard */}
            <div className="lg:col-span-2 space-y-6">
              {/* Health Overview */}
              <Card className="shadow-elegant border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-montserrat text-biz-navy">
                    <TrendingUp className="h-5 w-5" />
                    Business Health Overview
                  </CardTitle>
                  <CardDescription className="font-open-sans">
                    Your overall business performance across key areas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {reports.length > 0 ? (
                    <div className="space-y-6">
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={businessHealthData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="area" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="score" fill="#969423" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-montserrat font-bold text-biz-navy">74%</div>
                          <div className="text-sm text-biz-grey font-open-sans">Overall Health Score</div>
                        </div>
                        <div className="h-32">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={20}
                                outerRadius={40}
                                dataKey="value"
                              >
                                {pieData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <AlertCircle className="h-12 w-12 text-biz-grey mx-auto mb-4" />
                      <h3 className="text-lg font-montserrat font-semibold text-biz-navy mb-2">
                        No Assessments Yet
                      </h3>
                      <p className="text-biz-grey font-open-sans mb-4">
                        Complete your first business health assessment to see your dashboard
                      </p>
                      <Button asChild className="bg-biz-green hover:bg-biz-green/90 text-white font-montserrat">
                        <Link to="/pricing">Start Assessment</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Reports */}
              <Card className="shadow-elegant border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-montserrat text-biz-navy">
                    <FileText className="h-5 w-5" />
                    Your Reports
                  </CardTitle>
                  <CardDescription className="font-open-sans">
                    Access and download your business health reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {reports.length > 0 ? (
                    <div className="space-y-4">
                      {reports.map((report) => (
                        <div key={report.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                          <div>
                            <h4 className="font-montserrat font-semibold text-biz-navy">
                              {report.report_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} Report
                            </h4>
                            <p className="text-sm text-biz-grey font-open-sans">
                              Generated on {new Date(report.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-biz-grey font-open-sans text-center py-4">
                      No reports available yet. Complete an assessment to generate your first report.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="shadow-elegant border-border/50">
                <CardHeader>
                  <CardTitle className="font-montserrat text-biz-navy">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full bg-biz-green hover:bg-biz-green/90 text-white font-montserrat">
                    <Link to="/questionnaire">New Assessment</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full font-open-sans">
                    <Link to="/pricing">Upgrade Plan</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full font-open-sans">
                    <Link to="/bizguides">Book Consultation</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Available Reports */}
              <Card className="shadow-elegant border-border/50">
                <CardHeader>
                  <CardTitle className="font-montserrat text-biz-navy">Available Reports</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 border border-border/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-montserrat font-semibold text-biz-navy">Executive Report</span>
                      <Badge variant="secondary">$79</Badge>
                    </div>
                    <p className="text-sm text-biz-grey font-open-sans mb-3">
                      Comprehensive C-suite focused insights
                    </p>
                    <Button size="sm" variant="outline" className="w-full" disabled>
                      <Lock className="h-4 w-4 mr-2" />
                      Upgrade to Unlock
                    </Button>
                  </div>
                  
                  <div className="p-3 border border-border/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-montserrat font-semibold text-biz-navy">Manager's Report</span>
                      <Badge variant="secondary">$49</Badge>
                    </div>
                    <p className="text-sm text-biz-grey font-open-sans mb-3">
                      Team-focused operational insights
                    </p>
                    <Button size="sm" variant="outline" className="w-full" disabled>
                      <Lock className="h-4 w-4 mr-2" />
                      Upgrade to Unlock
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Hub Access */}
              <Card className="shadow-elegant border-border/50">
                <CardHeader>
                  <CardTitle className="font-montserrat text-biz-navy">Growth Hubs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild variant="outline" className="w-full justify-start font-open-sans">
                    <Link to="/bizguides">
                      <Star className="h-4 w-4 mr-2 text-[#4A90E2]" />
                      BizGuides
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start font-open-sans">
                    <Link to="/biztools">
                      <Star className="h-4 w-4 mr-2 text-[#D2691E]" />
                      BizTools
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start font-open-sans">
                    <Link to="/bizleader">
                      <Star className="h-4 w-4 mr-2 text-[#8CBF2F]" />
                      BizLeaDeR
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start font-open-sans">
                    <Link to="/bizgrowth">
                      <Star className="h-4 w-4 mr-2 text-[#E6B800]" />
                      BizGrowth
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
      
      <GlobalFooter />
    </div>
  );
};

export default Portal;