import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  Home,
  ClipboardList,
  Settings,
  LogOut,
  Bell,
  Search,
  CreditCard,
  HelpCircle,
  Zap,
  Award,
  Activity,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  User,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format, formatDistanceToNow } from 'date-fns';

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

interface ActivityItem {
  id: string;
  type: 'report' | 'assessment' | 'order' | 'system';
  title: string;
  description: string;
  timestamp: string;
  icon: React.ReactNode;
}

const PortalRevamped = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Fetch user data
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        const { data: assessmentData } = await supabase
          .from('questionnaires')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (assessmentData) {
          setAssessments(assessmentData as Assessment[]);
        }

        const { data: reportData } = await supabase
          .from('reports')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (reportData) {
          setReports(reportData as Report[]);
        }

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

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login', { state: { from: '/portal' } });
    }
  }, [user, authLoading, navigate]);

  const handleViewReport = (report: Report) => {
    // Navigate to the dedicated report viewer page
    navigate(`/report/${report.id}`);
  };

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
    } else {
      toast({
        title: 'Download not available',
        description: 'This report is not available for download.',
        variant: 'destructive',
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-[#1e3a5f]" />
      </div>
    );
  }

  const hasCompletedOrder = orders.some(o => o.status === 'completed');
  const latestAssessment = assessments[0];
  const completedReports = reports.filter(r => r.status === 'completed');
  const processingReports = reports.filter(r => r.status === 'generating');
  
  // Calculate health score (mock for now, will come from reports)
  const healthScore = completedReports.length > 0 ? 76 : null;
  
  // Generate activity items
  const activityItems: ActivityItem[] = [
    ...reports.slice(0, 3).map(r => ({
      id: r.id,
      type: 'report' as const,
      title: r.status === 'completed' ? 'Report Generated' : 'Report Processing',
      description: r.title,
      timestamp: r.created_at,
      icon: <FileText className="h-4 w-4" />,
    })),
    ...assessments.slice(0, 2).map(a => ({
      id: a.id,
      type: 'assessment' as const,
      title: a.status === 'completed' ? 'Assessment Completed' : 'Assessment Started',
      description: a.company_profile?.company_name || 'Business Assessment',
      timestamp: a.created_at,
      icon: <ClipboardList className="h-4 w-4" />,
    })),
    ...orders.slice(0, 2).map(o => ({
      id: o.id,
      type: 'order' as const,
      title: 'Payment Received',
      description: `$${Number(o.amount).toFixed(0)} - Assessment Package`,
      timestamp: o.created_at,
      icon: <CreditCard className="h-4 w-4" />,
    })),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 5);

  const userInitials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
    : user?.email?.substring(0, 2).toUpperCase() || 'U';

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <SEO 
        title="Dashboard - BizHealth.ai" 
        description="View your business health assessment and reports"
        noindex={true}
      />
      
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-[#1e3a5f] text-white transition-all duration-300 z-50 ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#9ab847] rounded-lg flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            {!sidebarCollapsed && (
              <span className="font-montserrat font-bold text-xl">BizHealth</span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'overview' 
                ? 'bg-[#9ab847] text-white' 
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Home className="h-5 w-5" />
            {!sidebarCollapsed && <span>Dashboard</span>}
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'reports' 
                ? 'bg-[#9ab847] text-white' 
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <FileText className="h-5 w-5" />
            {!sidebarCollapsed && <span>Reports</span>}
          </button>

          <button
            onClick={() => setActiveTab('assessments')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'assessments' 
                ? 'bg-[#9ab847] text-white' 
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <ClipboardList className="h-5 w-5" />
            {!sidebarCollapsed && <span>Assessments</span>}
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'orders' 
                ? 'bg-[#9ab847] text-white' 
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <CreditCard className="h-5 w-5" />
            {!sidebarCollapsed && <span>Orders</span>}
          </button>

          <div className="pt-4 border-t border-white/10 mt-4">
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'settings' 
                  ? 'bg-[#9ab847] text-white' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Settings className="h-5 w-5" />
              {!sidebarCollapsed && <span>Settings</span>}
            </button>

            <button
              onClick={() => window.open('mailto:support@bizhealth.ai', '_blank')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            >
              <HelpCircle className="h-5 w-5" />
              {!sidebarCollapsed && <span>Help & Support</span>}
            </button>
          </div>
        </nav>

        {/* User Profile at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-[#9ab847]">
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback className="bg-[#9ab847] text-white">{userInitials}</AvatarFallback>
            </Avatar>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{userName}</p>
                <p className="text-xs text-white/60 truncate">{user?.email}</p>
              </div>
            )}
            <button
              onClick={handleSignOut}
              className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Sign Out"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-montserrat font-bold text-[#1e3a5f]">
                {activeTab === 'overview' && 'Dashboard'}
                {activeTab === 'reports' && 'My Reports'}
                {activeTab === 'assessments' && 'Assessments'}
                {activeTab === 'orders' && 'Order History'}
                {activeTab === 'settings' && 'Settings'}
              </h1>
              <p className="text-sm text-gray-500">
                {activeTab === 'overview' && `Welcome back, ${userName}!`}
                {activeTab === 'reports' && 'View and download your business health reports'}
                {activeTab === 'assessments' && 'Track your assessment progress'}
                {activeTab === 'orders' && 'View your purchase history'}
                {activeTab === 'settings' && 'Manage your account settings'}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg w-64 focus:ring-2 focus:ring-[#9ab847] focus:bg-white transition-colors"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-500 hover:text-[#1e3a5f] hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
                {processingReports.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#9ab847] rounded-full" />
                )}
              </button>

              {/* Quick Action */}
              {hasCompletedOrder && !latestAssessment && (
                <Button 
                  className="bg-[#9ab847] hover:bg-[#8aa93d] text-white"
                  onClick={() => navigate('/questionnaire')}
                >
                  Start Assessment
                </Button>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Status Banner */}
              {!hasCompletedOrder && (
                <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-amber-100">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center">
                          <AlertCircle className="h-6 w-6 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-amber-800">Get Started with Your Assessment</h3>
                          <p className="text-sm text-amber-700">
                            Purchase an assessment to unlock your business health insights.
                          </p>
                        </div>
                      </div>
                      <Button 
                        className="bg-amber-600 hover:bg-amber-700 text-white"
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
                <Card className="border-[#9ab847]/30 bg-gradient-to-r from-[#9ab847]/5 to-[#9ab847]/10">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#9ab847]/20 rounded-full flex items-center justify-center">
                          <PlayCircle className="h-6 w-6 text-[#9ab847]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#1e3a5f]">Ready to Start!</h3>
                          <p className="text-sm text-gray-600">
                            Your assessment is ready. Complete it to receive your personalized reports.
                          </p>
                        </div>
                      </div>
                      <Button 
                        className="bg-[#9ab847] hover:bg-[#8aa93d] text-white"
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
                <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                          <Clock className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-blue-800">Assessment In Progress</h3>
                          <p className="text-sm text-blue-700">
                            Continue where you left off to complete your assessment.
                          </p>
                        </div>
                      </div>
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => navigate('/questionnaire')}
                      >
                        Continue Assessment
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Metric Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Health Score Card */}
                <Card className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wide">Business Health Score</p>
                        {healthScore ? (
                          <p className="text-4xl font-bold text-[#1e3a5f] mt-1">{healthScore}<span className="text-lg text-gray-400">/100</span></p>
                        ) : (
                          <p className="text-2xl font-bold text-gray-300 mt-1">--</p>
                        )}
                      </div>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${healthScore ? 'bg-[#9ab847]/10' : 'bg-gray-100'}`}>
                        <Award className={`h-6 w-6 ${healthScore ? 'text-[#9ab847]' : 'text-gray-400'}`} />
                      </div>
                    </div>
                    {healthScore && (
                      <div className="flex items-center gap-2">
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600">Above industry average</span>
                      </div>
                    )}
                    {!healthScore && (
                      <p className="text-sm text-gray-400">Complete assessment to see score</p>
                    )}
                  </CardContent>
                </Card>

                {/* Reports Card */}
                <Card className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wide">Reports Generated</p>
                        <p className="text-4xl font-bold text-[#1e3a5f] mt-1">{completedReports.length}</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <FileText className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                    {processingReports.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 text-amber-500 animate-spin" />
                        <span className="text-sm text-amber-600">{processingReports.length} generating</span>
                      </div>
                    )}
                    {processingReports.length === 0 && completedReports.length > 0 && (
                      <p className="text-sm text-gray-400">All reports ready</p>
                    )}
                    {completedReports.length === 0 && processingReports.length === 0 && (
                      <p className="text-sm text-gray-400">No reports yet</p>
                    )}
                  </CardContent>
                </Card>

                {/* Assessments Card */}
                <Card className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wide">Assessments</p>
                        <p className="text-4xl font-bold text-[#1e3a5f] mt-1">{assessments.length}</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <ClipboardList className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    {latestAssessment?.status === 'in_progress' && (
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-blue-600">1 in progress</span>
                      </div>
                    )}
                    {(!latestAssessment || latestAssessment.status === 'completed') && (
                      <p className="text-sm text-gray-400">{assessments.filter(a => a.status === 'completed').length} completed</p>
                    )}
                  </CardContent>
                </Card>

                {/* Orders Card */}
                <Card className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wide">Total Invested</p>
                        <p className="text-4xl font-bold text-[#1e3a5f] mt-1">
                          ${orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + Number(o.amount), 0).toFixed(0)}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <CreditCard className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">{orders.filter(o => o.status === 'completed').length} orders</p>
                  </CardContent>
                </Card>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Reports */}
                <div className="lg:col-span-2">
                  <Card className="bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-[#1e3a5f]">Recent Reports</h2>
                        {completedReports.length > 0 && (
                          <Button variant="ghost" size="sm" onClick={() => setActiveTab('reports')}>
                            View All
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        )}
                      </div>

                      {completedReports.length === 0 ? (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="h-8 w-8 text-gray-400" />
                          </div>
                          <h3 className="font-medium text-gray-900 mb-1">No Reports Yet</h3>
                          <p className="text-sm text-gray-500 mb-4">Complete your assessment to generate personalized reports.</p>
                          {hasCompletedOrder && (
                            <Button 
                              className="bg-[#9ab847] hover:bg-[#8aa93d]"
                              onClick={() => navigate('/questionnaire')}
                            >
                              Start Assessment
                            </Button>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {completedReports.slice(0, 4).map((report) => (
                            <div 
                              key={report.id}
                              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                  report.report_type === 'comprehensive' ? 'bg-[#1e3a5f]' :
                                  report.report_type === 'executive_summary' ? 'bg-purple-600' :
                                  report.report_type === 'action_plan' ? 'bg-[#9ab847]' :
                                  'bg-blue-600'
                                }`}>
                                  <FileText className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-[#1e3a5f]">{report.title}</h4>
                                  <p className="text-sm text-gray-500">
                                    {format(new Date(report.created_at), 'MMM d, yyyy')}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleViewReport(report)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleDownloadReport(report)}
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Activity Feed */}
                <div>
                  <Card className="bg-white">
                    <CardContent className="p-6">
                      <h2 className="text-lg font-semibold text-[#1e3a5f] mb-6">Recent Activity</h2>
                      
                      {activityItems.length === 0 ? (
                        <div className="text-center py-8">
                          <Activity className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">No recent activity</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {activityItems.map((item, index) => (
                            <div key={item.id} className="flex gap-4">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                item.type === 'report' ? 'bg-purple-100 text-purple-600' :
                                item.type === 'assessment' ? 'bg-blue-100 text-blue-600' :
                                item.type === 'order' ? 'bg-green-100 text-green-600' :
                                'bg-gray-100 text-gray-600'
                              }`}>
                                {item.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900">{item.title}</p>
                                <p className="text-sm text-gray-500 truncate">{item.description}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              {reports.length === 0 ? (
                <Card className="bg-white">
                  <CardContent className="p-12 text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Reports Yet</h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                      Complete your business health assessment to generate personalized reports with actionable insights.
                    </p>
                    {hasCompletedOrder && (
                      <Button 
                        className="bg-[#9ab847] hover:bg-[#8aa93d]"
                        onClick={() => navigate('/questionnaire')}
                      >
                        Start Assessment
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {reports.map((report) => (
                    <Card key={report.id} className="bg-white hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                          report.report_type === 'comprehensive' ? 'bg-[#1e3a5f]' :
                          report.report_type === 'executive_summary' ? 'bg-purple-600' :
                          report.report_type === 'action_plan' ? 'bg-[#9ab847]' :
                          'bg-blue-600'
                        }`}>
                          <FileText className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-[#1e3a5f] mb-1">{report.title}</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          {format(new Date(report.created_at), 'MMMM d, yyyy')}
                        </p>
                        <Badge className={
                          report.status === 'completed' ? 'bg-green-100 text-green-800' :
                          report.status === 'generating' ? 'bg-amber-100 text-amber-800' :
                          'bg-red-100 text-red-800'
                        }>
                          {report.status === 'completed' ? 'Ready' : 
                           report.status === 'generating' ? 'Generating...' : 'Failed'}
                        </Badge>
                        {report.status === 'completed' && (
                          <div className="flex gap-2 mt-4">
                            <Button 
                              className="flex-1 bg-[#1e3a5f] hover:bg-[#152a45]"
                              onClick={() => handleViewReport(report)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={() => handleDownloadReport(report)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Assessments Tab */}
          {activeTab === 'assessments' && (
            <div className="space-y-6">
              {assessments.length === 0 ? (
                <Card className="bg-white">
                  <CardContent className="p-12 text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ClipboardList className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Assessments Yet</h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                      Start your business health assessment to get personalized insights and recommendations.
                    </p>
                    {hasCompletedOrder ? (
                      <Button 
                        className="bg-[#9ab847] hover:bg-[#8aa93d]"
                        onClick={() => navigate('/questionnaire')}
                      >
                        Start Assessment
                      </Button>
                    ) : (
                      <Button 
                        className="bg-[#9ab847] hover:bg-[#8aa93d]"
                        onClick={() => navigate('/pricing')}
                      >
                        View Pricing
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {assessments.map((assessment) => (
                    <Card key={assessment.id} className="bg-white">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              assessment.status === 'completed' ? 'bg-green-100' :
                              assessment.status === 'processing' ? 'bg-amber-100' :
                              'bg-blue-100'
                            }`}>
                              {assessment.status === 'completed' ? (
                                <CheckCircle className="h-6 w-6 text-green-600" />
                              ) : assessment.status === 'processing' ? (
                                <Loader2 className="h-6 w-6 text-amber-600 animate-spin" />
                              ) : (
                                <Clock className="h-6 w-6 text-blue-600" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold text-[#1e3a5f]">
                                {assessment.company_profile?.company_name || 'Business Assessment'}
                              </h3>
                              <p className="text-sm text-gray-500">
                                Started {format(new Date(assessment.created_at), 'MMMM d, yyyy')}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge className={
                              assessment.status === 'completed' ? 'bg-green-100 text-green-800' :
                              assessment.status === 'processing' ? 'bg-amber-100 text-amber-800' :
                              'bg-blue-100 text-blue-800'
                            }>
                              {assessment.status === 'completed' ? 'Completed' :
                               assessment.status === 'processing' ? 'Processing' : 'In Progress'}
                            </Badge>
                            {assessment.status === 'in_progress' && (
                              <Button 
                                className="bg-[#9ab847] hover:bg-[#8aa93d]"
                                onClick={() => navigate('/questionnaire')}
                              >
                                Continue
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              {orders.length === 0 ? (
                <Card className="bg-white">
                  <CardContent className="p-12 text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CreditCard className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Orders Yet</h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                      Purchase an assessment package to get started with your business health analysis.
                    </p>
                    <Button 
                      className="bg-[#9ab847] hover:bg-[#8aa93d]"
                      onClick={() => navigate('/pricing')}
                    >
                      View Pricing
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-white">
                  <CardContent className="p-0">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Order ID</th>
                          <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Date</th>
                          <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Amount</th>
                          <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {orders.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-mono text-gray-600">
                              {order.id.substring(0, 8)}...
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {format(new Date(order.created_at), 'MMM d, yyyy')}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                              ${Number(order.amount).toFixed(2)}
                            </td>
                            <td className="px-6 py-4">
                              <Badge className={
                                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                order.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                                'bg-red-100 text-red-800'
                              }>
                                {order.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl space-y-6">
              <Card className="bg-white">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-[#1e3a5f] mb-6">Profile Settings</h2>
                  <div className="flex items-center gap-6 mb-6">
                    <Avatar className="h-20 w-20 border-4 border-[#9ab847]">
                      <AvatarImage src={user?.user_metadata?.avatar_url} />
                      <AvatarFallback className="bg-[#9ab847] text-white text-2xl">{userInitials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-[#1e3a5f]">{userName}</h3>
                      <p className="text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-500"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-red-200">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h2>
                  <p className="text-sm text-gray-500 mb-4">
                    Sign out of your account. You can sign back in at any time.
                  </p>
                  <Button 
                    variant="outline" 
                    className="border-red-300 text-red-600 hover:bg-red-50"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PortalRevamped;
