import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  ArrowUpRight,
  Sparkles,
  Shield,
  ChevronDown,
  Menu,
  X,
  Folder,
  FolderOpen,
  Building2,
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
  questionnaire_id: string | null;
  summary: {
    overall_score?: number;
    key_insights?: string[];
  } | null;
}

interface ReportGroup {
  assessmentId: string;
  assessmentName: string;
  assessmentDate: string;
  reports: Report[];
  isExpanded: boolean;
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [foldersInitialized, setFoldersInitialized] = useState(false);

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

  // Auto-expand all report folders on initial load
  useEffect(() => {
    if (!foldersInitialized && reports.length > 0 && assessments.length > 0) {
      const allAssessmentIds = new Set(
        reports
          .map(r => r.questionnaire_id)
          .filter((id): id is string => id !== null)
      );
      setExpandedFolders(allAssessmentIds);
      setFoldersInitialized(true);
    }
  }, [reports, assessments, foldersInitialized]);

  const handleViewReport = (report: Report) => {
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

  // Determine correct questionnaire URL based on user's purchased tier
  const getQuestionnaireUrl = () => {
    const completedOrder = orders.find(o => o.status === 'completed');
    if (completedOrder?.product_id === 'essentials') {
      return '/essentials-questionnaire';
    }
    return '/questionnaire';
  };

  // Navigate to the appropriate questionnaire
  const navigateToQuestionnaire = () => {
    navigate(getQuestionnaireUrl());
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-biz-cream flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-biz-green/20 rounded-full blur-2xl animate-pulse scale-150"></div>
            <Loader2 className="h-16 w-16 animate-spin text-biz-green relative z-10" />
          </div>
          <p className="mt-8 font-montserrat font-semibold text-biz-navy text-lg">Loading your dashboard...</p>
          <p className="mt-2 font-open-sans text-biz-grey text-sm">Preparing your business insights</p>
        </div>
      </div>
    );
  }

  const hasCompletedOrder = orders.some(o => o.status === 'completed');
  const latestAssessment = assessments[0];
  const completedReports = reports.filter(r => r.status === 'completed');
  const processingReports = reports.filter(r => r.status === 'generating');

  // Calculate real health score from reports
  const healthScore = completedReports.length > 0
    ? Math.round(completedReports.reduce((acc, r) => acc + (r.summary?.overall_score || 0), 0) / completedReports.length)
    : null;

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

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: Home },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'assessments', label: 'Assessments', icon: ClipboardList },
    { id: 'orders', label: 'Orders', icon: CreditCard },
  ];

  const secondaryNavItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help & Support', icon: HelpCircle, action: () => window.open('mailto:support@bizhealth.ai', '_blank') },
  ];

  return (
    <div className="min-h-screen bg-biz-cream flex">
      <SEO
        title="Dashboard - BizHealth.ai"
        description="View your business health assessment and reports"
        noindex={true}
      />

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-biz-navy text-white transition-all duration-500 z-50 w-72 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Decorative gradient orb */}
        <div className="absolute top-20 -right-20 w-40 h-40 bg-biz-green/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-40 -left-10 w-32 h-32 bg-biz-green/5 rounded-full blur-2xl pointer-events-none"></div>

        {/* Logo */}
        <div className="relative p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-biz-green rounded-xl flex items-center justify-center shadow-lg shadow-biz-green/20 group-hover:scale-105 transition-transform duration-300">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="font-montserrat font-bold text-xl block leading-none">BizHealth</span>
              <span className="text-[10px] text-white/50 font-open-sans tracking-wider uppercase">Dashboard</span>
            </div>
          </Link>

          {/* Mobile close button */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="relative p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                activeTab === item.id
                  ? 'bg-biz-green text-white shadow-lg shadow-biz-green/25'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon className={`h-5 w-5 transition-transform duration-300 ${activeTab === item.id ? '' : 'group-hover:scale-110'}`} />
              <span className="font-open-sans font-medium">{item.label}</span>
              {item.id === 'reports' && processingReports.length > 0 && (
                <span className="ml-auto w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
              )}
            </button>
          ))}

          <div className="pt-6 mt-6 border-t border-white/10 space-y-1">
            {secondaryNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => item.action ? item.action() : setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                  activeTab === item.id
                    ? 'bg-biz-green text-white shadow-lg shadow-biz-green/25'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-open-sans font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* User Profile at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-biz-navy-deep/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11 border-2 border-biz-green shadow-lg">
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback className="bg-biz-green text-white font-montserrat font-bold">{userInitials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-montserrat font-semibold text-sm truncate">{userName}</p>
              <p className="font-open-sans text-xs text-white/50 truncate">{user?.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="p-2.5 text-white/50 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
              title="Sign Out"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 min-h-screen">
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-30">
          <div className="px-4 lg:px-8 py-4 flex items-center justify-between">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-biz-navy hover:bg-biz-navy/5 rounded-xl transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="hidden lg:block">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-1 w-8 bg-biz-green rounded-full"></div>
                <span className="font-open-sans text-biz-green text-xs font-semibold tracking-wider uppercase">
                  {activeTab === 'overview' && 'Dashboard'}
                  {activeTab === 'reports' && 'My Reports'}
                  {activeTab === 'assessments' && 'Assessments'}
                  {activeTab === 'orders' && 'Order History'}
                  {activeTab === 'settings' && 'Settings'}
                </span>
              </div>
              <h1 className="font-montserrat font-bold text-2xl text-biz-navy">
                {activeTab === 'overview' && `Welcome back, ${userName.split(' ')[0]}`}
                {activeTab === 'reports' && 'Your Business Reports'}
                {activeTab === 'assessments' && 'Assessment History'}
                {activeTab === 'orders' && 'Purchase History'}
                {activeTab === 'settings' && 'Account Settings'}
                <span className="text-biz-green">.</span>
              </h1>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-biz-grey" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-11 pr-4 py-2.5 bg-biz-cream border border-gray-200 rounded-xl w-64 focus:ring-2 focus:ring-biz-green/30 focus:border-biz-green focus:bg-white transition-all font-open-sans text-sm"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2.5 text-biz-grey hover:text-biz-navy hover:bg-biz-cream rounded-xl transition-all duration-300">
                <Bell className="h-5 w-5" />
                {processingReports.length > 0 && (
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-biz-green rounded-full ring-2 ring-white" />
                )}
              </button>

              {/* Quick Action */}
              {hasCompletedOrder && !latestAssessment && (
                <Button
                  className="hidden sm:flex bg-biz-green hover:bg-biz-green/90 text-white font-montserrat font-semibold shadow-lg shadow-biz-green/25 hover:shadow-xl hover:shadow-biz-green/30 transition-all duration-300 hover:scale-105"
                  onClick={navigateToQuestionnaire}
                >
                  Start Assessment
                  <Sparkles className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              {/* Status Banners */}
              {!hasCompletedOrder && (
                <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 border border-amber-200/50 rounded-2xl p-6 lg:p-8">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-300/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-amber-200/50 rounded-2xl">
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
                      className="bg-amber-600 hover:bg-amber-700 text-white font-montserrat font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      onClick={() => navigate('/pricing')}
                    >
                      View Plans
                      <ArrowUpRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {hasCompletedOrder && !latestAssessment && (
                <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 border border-biz-green/20 rounded-2xl p-6 lg:p-8">
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
                      className="bg-biz-green hover:bg-biz-green/90 text-white font-montserrat font-semibold shadow-lg shadow-biz-green/25 hover:shadow-xl transition-all duration-300 hover:scale-105"
                      onClick={navigateToQuestionnaire}
                    >
                      Start Now
                      <Zap className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {latestAssessment?.status === 'in_progress' && (
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 border border-blue-200/50 rounded-2xl p-6 lg:p-8">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
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
                      className="bg-blue-600 hover:bg-blue-700 text-white font-montserrat font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      onClick={navigateToQuestionnaire}
                    >
                      Continue
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {/* Health Score Card */}
                <Card className="bg-white border-0 shadow-card hover:shadow-feature transition-all duration-500 hover:-translate-y-1 overflow-hidden group">
                  <CardContent className="p-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-biz-green/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="font-open-sans text-xs text-biz-grey uppercase tracking-wider mb-1">Business Health Score</p>
                          {healthScore ? (
                            <p className="font-montserrat font-bold text-4xl text-biz-navy">{healthScore}<span className="text-lg text-biz-grey/50 font-normal">/100</span></p>
                          ) : (
                            <p className="font-montserrat font-bold text-3xl text-gray-300">—</p>
                          )}
                        </div>
                        <div className={`p-3 rounded-2xl ${healthScore ? 'bg-biz-green/10' : 'bg-gray-100'}`}>
                          <Award className={`h-6 w-6 ${healthScore ? 'text-biz-green' : 'text-gray-400'}`} />
                        </div>
                      </div>
                      {healthScore ? (
                        <div className="flex items-center gap-2">
                          <ArrowUpRight className="h-4 w-4 text-biz-green" />
                          <span className="font-open-sans text-sm text-biz-green font-medium">Above industry average</span>
                        </div>
                      ) : (
                        <p className="font-open-sans text-sm text-biz-grey">Complete assessment to see score</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Reports Card */}
                <Card className="bg-white border-0 shadow-card hover:shadow-feature transition-all duration-500 hover:-translate-y-1 overflow-hidden group">
                  <CardContent className="p-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="font-open-sans text-xs text-biz-grey uppercase tracking-wider mb-1">Reports Generated</p>
                          <p className="font-montserrat font-bold text-4xl text-biz-navy">{completedReports.length}</p>
                        </div>
                        <div className="p-3 rounded-2xl bg-purple-100">
                          <FileText className="h-6 w-6 text-purple-600" />
                        </div>
                      </div>
                      {processingReports.length > 0 ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 text-amber-500 animate-spin" />
                          <span className="font-open-sans text-sm text-amber-600 font-medium">{processingReports.length} generating</span>
                        </div>
                      ) : completedReports.length > 0 ? (
                        <p className="font-open-sans text-sm text-biz-grey">All reports ready</p>
                      ) : (
                        <p className="font-open-sans text-sm text-biz-grey">No reports yet</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Assessments Card */}
                <Card className="bg-white border-0 shadow-card hover:shadow-feature transition-all duration-500 hover:-translate-y-1 overflow-hidden group">
                  <CardContent className="p-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="font-open-sans text-xs text-biz-grey uppercase tracking-wider mb-1">Assessments</p>
                          <p className="font-montserrat font-bold text-4xl text-biz-navy">{assessments.length}</p>
                        </div>
                        <div className="p-3 rounded-2xl bg-blue-100">
                          <ClipboardList className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      {latestAssessment?.status === 'in_progress' ? (
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-blue-500" />
                          <span className="font-open-sans text-sm text-blue-600 font-medium">1 in progress</span>
                        </div>
                      ) : (
                        <p className="font-open-sans text-sm text-biz-grey">{assessments.filter(a => a.status === 'completed').length} completed</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Orders Card */}
                <Card className="bg-white border-0 shadow-card hover:shadow-feature transition-all duration-500 hover:-translate-y-1 overflow-hidden group">
                  <CardContent className="p-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="font-open-sans text-xs text-biz-grey uppercase tracking-wider mb-1">Total Invested</p>
                          <p className="font-montserrat font-bold text-4xl text-biz-navy">
                            ${orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + Number(o.amount), 0).toFixed(0)}
                          </p>
                        </div>
                        <div className="p-3 rounded-2xl bg-green-100">
                          <CreditCard className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                      <p className="font-open-sans text-sm text-biz-grey">{orders.filter(o => o.status === 'completed').length} orders</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Recent Reports */}
                <div className="lg:col-span-2">
                  <Card className="bg-white border-0 shadow-card overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="font-montserrat font-bold text-lg text-biz-navy">Recent Reports</h2>
                        {completedReports.length > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setActiveTab('reports')}
                            className="text-biz-green hover:text-biz-green/80 hover:bg-biz-green/5 font-montserrat font-semibold"
                          >
                            View All
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        )}
                      </div>

                      {completedReports.length === 0 ? (
                        <div className="text-center py-12">
                          <div className="relative inline-block mb-4">
                            <div className="absolute inset-0 bg-biz-navy/5 rounded-full blur-xl"></div>
                            <div className="relative w-16 h-16 bg-biz-cream rounded-full flex items-center justify-center">
                              <FileText className="h-8 w-8 text-biz-grey/50" />
                            </div>
                          </div>
                          <h3 className="font-montserrat font-semibold text-biz-navy mb-2">No Reports Yet</h3>
                          <p className="font-open-sans text-sm text-biz-grey mb-6 max-w-sm mx-auto">Complete your assessment to generate personalized business health reports.</p>
                          {hasCompletedOrder && (
                            <Button
                              className="bg-biz-green hover:bg-biz-green/90 text-white font-montserrat font-semibold shadow-lg shadow-biz-green/25"
                              onClick={navigateToQuestionnaire}
                            >
                              Start Assessment
                            </Button>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {completedReports.slice(0, 4).map((report, index) => (
                            <div
                              key={report.id}
                              className="flex items-center justify-between p-4 bg-biz-cream/50 rounded-2xl hover:bg-biz-cream transition-all duration-300 group"
                              style={{ animationDelay: `${index * 50}ms` }}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-sm ${
                                  report.report_type === 'comprehensive' ? 'bg-biz-navy' :
                                  report.report_type === 'executive_summary' ? 'bg-purple-600' :
                                  report.report_type === 'action_plan' ? 'bg-biz-green' :
                                  'bg-blue-600'
                                }`}>
                                  <FileText className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                  <h4 className="font-montserrat font-semibold text-biz-navy">{report.title}</h4>
                                  <p className="font-open-sans text-sm text-biz-grey">
                                    {format(new Date(report.created_at), 'MMM d, yyyy')}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleViewReport(report)}
                                  className="h-9 w-9 p-0 hover:bg-biz-navy/10 text-biz-navy"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDownloadReport(report)}
                                  className="h-9 w-9 p-0 hover:bg-biz-green/10 text-biz-green"
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
                  <Card className="bg-white border-0 shadow-card overflow-hidden">
                    <CardContent className="p-6">
                      <h2 className="font-montserrat font-bold text-lg text-biz-navy mb-6">Recent Activity</h2>

                      {activityItems.length === 0 ? (
                        <div className="text-center py-8">
                          <Activity className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                          <p className="font-open-sans text-sm text-biz-grey">No recent activity</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {activityItems.map((item, index) => (
                            <div key={`${item.type}-${item.id}`} className="flex gap-4" style={{ animationDelay: `${index * 50}ms` }}>
                              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                item.type === 'report' ? 'bg-purple-100 text-purple-600' :
                                item.type === 'assessment' ? 'bg-blue-100 text-blue-600' :
                                item.type === 'order' ? 'bg-green-100 text-green-600' :
                                'bg-gray-100 text-gray-600'
                              }`}>
                                {item.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-montserrat font-semibold text-sm text-biz-navy">{item.title}</p>
                                <p className="font-open-sans text-sm text-biz-grey truncate">{item.description}</p>
                                <p className="font-open-sans text-xs text-biz-grey/60 mt-1">
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
            <div className="space-y-6 animate-fade-in">
              {/* Processing notice */}
              {processingReports.length > 0 && (
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200/50 rounded-2xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 rounded-xl">
                      <RefreshCw className="h-6 w-6 text-purple-600 animate-spin" />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-semibold text-purple-900">{processingReports.length} Report{processingReports.length > 1 ? 's' : ''} Being Generated</h3>
                      <p className="font-open-sans text-sm text-purple-700/80">
                        Your reports are being prepared. This typically takes 5-10 minutes.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {reports.length === 0 ? (
                <Card className="bg-white border-0 shadow-card">
                  <CardContent className="p-12 text-center">
                    <div className="relative inline-block mb-6">
                      <div className="absolute inset-0 bg-biz-navy/5 rounded-full blur-xl scale-150"></div>
                      <div className="relative w-20 h-20 bg-biz-cream rounded-full flex items-center justify-center">
                        <FileText className="h-10 w-10 text-biz-grey/50" />
                      </div>
                    </div>
                    <h3 className="font-montserrat font-bold text-2xl text-biz-navy mb-3">No Reports Yet</h3>
                    <p className="font-open-sans text-biz-grey mb-8 max-w-md mx-auto">
                      Complete your business health assessment to generate personalized reports with actionable insights.
                    </p>
                    {hasCompletedOrder && (
                      <Button
                        className="bg-biz-green hover:bg-biz-green/90 text-white font-montserrat font-semibold shadow-lg shadow-biz-green/25 hover:shadow-xl transition-all duration-300 hover:scale-105"
                        onClick={navigateToQuestionnaire}
                      >
                        Start Assessment
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {/* Group reports by assessment */}
                  {(() => {
                    // Group reports by questionnaire_id
                    const groupedReports = reports.reduce((groups, report) => {
                      const key = report.questionnaire_id || 'ungrouped';
                      if (!groups[key]) {
                        groups[key] = [];
                      }
                      groups[key].push(report);
                      return groups;
                    }, {} as Record<string, Report[]>);

                    // Get assessment details for each group
                    const reportGroups = Object.entries(groupedReports).map(([assessmentId, groupReports]) => {
                      const assessment = assessments.find(a => a.id === assessmentId);
                      return {
                        assessmentId,
                        assessmentName: assessment?.company_profile?.company_name || 'Business Assessment',
                        assessmentDate: assessment?.created_at || groupReports[0]?.created_at || '',
                        reports: groupReports.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
                      };
                    }).sort((a, b) => new Date(b.assessmentDate).getTime() - new Date(a.assessmentDate).getTime());

                    const toggleFolder = (assessmentId: string) => {
                      setExpandedFolders(prev => {
                        const newSet = new Set(prev);
                        if (newSet.has(assessmentId)) {
                          newSet.delete(assessmentId);
                        } else {
                          newSet.add(assessmentId);
                        }
                        return newSet;
                      });
                    };

                    return reportGroups.map((group, groupIndex) => {
                      const isExpanded = expandedFolders.has(group.assessmentId);
                      const completedCount = group.reports.filter(r => r.status === 'completed').length;
                      const totalCount = group.reports.length;

                      return (
                        <Card
                          key={group.assessmentId}
                          className="bg-white border-0 shadow-card overflow-hidden"
                          style={{ animationDelay: `${groupIndex * 100}ms` }}
                        >
                          {/* Folder Header */}
                          <button
                            onClick={() => toggleFolder(group.assessmentId)}
                            className="w-full p-5 flex items-center justify-between hover:bg-biz-cream/30 transition-colors duration-300"
                          >
                            <div className="flex items-center gap-4">
                              <div className={`p-3 rounded-2xl transition-colors duration-300 ${isExpanded ? 'bg-biz-green/10' : 'bg-biz-navy/5'}`}>
                                {isExpanded ? (
                                  <FolderOpen className={`h-6 w-6 transition-colors duration-300 ${isExpanded ? 'text-biz-green' : 'text-biz-navy'}`} />
                                ) : (
                                  <Folder className="h-6 w-6 text-biz-navy" />
                                )}
                              </div>
                              <div className="text-left">
                                <div className="flex items-center gap-3">
                                  <h3 className="font-montserrat font-bold text-lg text-biz-navy">{group.assessmentName}</h3>
                                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-biz-navy/5 text-biz-navy">
                                    {completedCount}/{totalCount} reports
                                  </span>
                                </div>
                                <p className="font-open-sans text-sm text-biz-grey mt-0.5">
                                  Assessment from {format(new Date(group.assessmentDate), 'MMMM d, yyyy')}
                                </p>
                              </div>
                            </div>
                            <ChevronDown className={`h-5 w-5 text-biz-grey transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>

                          {/* Folder Contents */}
                          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="px-5 pb-5 border-t border-gray-100">
                              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pt-5">
                                {group.reports.map((report, index) => (
                                  <div
                                    key={report.id}
                                    className="group bg-biz-cream/30 hover:bg-biz-cream/60 rounded-xl p-4 transition-all duration-300 hover:shadow-md"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                  >
                                    <div className="flex items-start justify-between mb-3">
                                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${
                                        report.report_type === 'comprehensive' ? 'bg-biz-navy' :
                                        report.report_type === 'executive_summary' ? 'bg-purple-600' :
                                        report.report_type === 'action_plan' ? 'bg-biz-green' :
                                        'bg-blue-600'
                                      }`}>
                                        <FileText className="h-5 w-5 text-white" />
                                      </div>
                                      <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${
                                        report.status === 'completed' ? 'bg-biz-green/10 text-biz-green border border-biz-green/20' :
                                        report.status === 'generating' ? 'bg-amber-100 text-amber-700 border border-amber-200 animate-pulse' :
                                        'bg-red-100 text-red-700 border border-red-200'
                                      }`}>
                                        {report.status === 'completed' ? 'Ready' :
                                         report.status === 'generating' ? 'Generating...' : 'Failed'}
                                      </span>
                                    </div>
                                    <h4 className="font-montserrat font-semibold text-sm text-biz-navy mb-1 line-clamp-2">{report.title}</h4>
                                    <p className="font-open-sans text-xs text-biz-grey mb-3">
                                      {format(new Date(report.created_at), 'MMM d, yyyy')}
                                    </p>

                                    {report.status === 'completed' && (
                                      <div className="flex gap-2">
                                        <Button
                                          size="sm"
                                          className="flex-1 bg-biz-navy hover:bg-biz-navy-light text-white font-montserrat font-semibold text-xs h-8"
                                          onClick={(e) => { e.stopPropagation(); handleViewReport(report); }}
                                        >
                                          <Eye className="h-3.5 w-3.5 mr-1.5" />
                                          View
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          className="border-biz-green/30 text-biz-green hover:bg-biz-green hover:text-white h-8 px-2"
                                          onClick={(e) => { e.stopPropagation(); handleDownloadReport(report); }}
                                        >
                                          <Download className="h-3.5 w-3.5" />
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Card>
                      );
                    });
                  })()}
                </div>
              )}
            </div>
          )}

          {/* Assessments Tab */}
          {activeTab === 'assessments' && (
            <div className="space-y-6 animate-fade-in">
              {assessments.length === 0 ? (
                <Card className="bg-white border-0 shadow-card">
                  <CardContent className="p-12 text-center">
                    <div className="relative inline-block mb-6">
                      <div className="absolute inset-0 bg-biz-navy/5 rounded-full blur-xl scale-150"></div>
                      <div className="relative w-20 h-20 bg-biz-cream rounded-full flex items-center justify-center">
                        <ClipboardList className="h-10 w-10 text-biz-grey/50" />
                      </div>
                    </div>
                    <h3 className="font-montserrat font-bold text-2xl text-biz-navy mb-3">No Assessments Yet</h3>
                    <p className="font-open-sans text-biz-grey mb-8 max-w-md mx-auto">
                      Start your business health assessment to get personalized insights and recommendations.
                    </p>
                    {hasCompletedOrder ? (
                      <Button
                        className="bg-biz-green hover:bg-biz-green/90 text-white font-montserrat font-semibold shadow-lg shadow-biz-green/25 hover:shadow-xl transition-all duration-300 hover:scale-105"
                        onClick={navigateToQuestionnaire}
                      >
                        Start Assessment
                      </Button>
                    ) : (
                      <Button
                        className="bg-biz-green hover:bg-biz-green/90 text-white font-montserrat font-semibold shadow-lg shadow-biz-green/25 hover:shadow-xl transition-all duration-300 hover:scale-105"
                        onClick={() => navigate('/pricing')}
                      >
                        View Pricing
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {assessments.map((assessment, index) => (
                    <Card
                      key={assessment.id}
                      className="bg-white border-0 shadow-card hover:shadow-feature transition-all duration-300 overflow-hidden group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                              assessment.status === 'completed' ? 'bg-biz-green/10' :
                              assessment.status === 'processing' ? 'bg-amber-100' :
                              'bg-blue-100'
                            }`}>
                              {assessment.status === 'completed' ? (
                                <CheckCircle className="h-6 w-6 text-biz-green" />
                              ) : assessment.status === 'processing' ? (
                                <Loader2 className="h-6 w-6 text-amber-600 animate-spin" />
                              ) : (
                                <Clock className="h-6 w-6 text-blue-600" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-montserrat font-bold text-biz-navy">
                                {assessment.company_profile?.company_name || 'Business Assessment'}
                              </h3>
                              <p className="font-open-sans text-sm text-biz-grey">
                                Started {format(new Date(assessment.created_at), 'MMMM d, yyyy')}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${
                              assessment.status === 'completed' ? 'bg-biz-green/10 text-biz-green border border-biz-green/20' :
                              assessment.status === 'processing' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                              'bg-blue-100 text-blue-700 border border-blue-200'
                            }`}>
                              {assessment.status === 'completed' ? 'Completed' :
                               assessment.status === 'processing' ? 'Processing' : 'In Progress'}
                            </span>
                            {assessment.status === 'in_progress' && (
                              <Button
                                className="bg-biz-green hover:bg-biz-green/90 text-white font-montserrat font-semibold"
                                onClick={navigateToQuestionnaire}
                              >
                                Continue
                                <ChevronRight className="h-4 w-4 ml-1" />
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
            <div className="space-y-6 animate-fade-in">
              {orders.length === 0 ? (
                <Card className="bg-white border-0 shadow-card">
                  <CardContent className="p-12 text-center">
                    <div className="relative inline-block mb-6">
                      <div className="absolute inset-0 bg-biz-navy/5 rounded-full blur-xl scale-150"></div>
                      <div className="relative w-20 h-20 bg-biz-cream rounded-full flex items-center justify-center">
                        <CreditCard className="h-10 w-10 text-biz-grey/50" />
                      </div>
                    </div>
                    <h3 className="font-montserrat font-bold text-2xl text-biz-navy mb-3">No Orders Yet</h3>
                    <p className="font-open-sans text-biz-grey mb-8 max-w-md mx-auto">
                      Purchase an assessment package to get started with your business health analysis.
                    </p>
                    <Button
                      className="bg-biz-green hover:bg-biz-green/90 text-white font-montserrat font-semibold shadow-lg shadow-biz-green/25 hover:shadow-xl transition-all duration-300 hover:scale-105"
                      onClick={() => navigate('/pricing')}
                    >
                      View Pricing
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-white border-0 shadow-card overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-biz-cream/50 border-b border-gray-100">
                        <tr>
                          <th className="text-left px-6 py-4 font-montserrat font-semibold text-xs text-biz-grey uppercase tracking-wider">Order ID</th>
                          <th className="text-left px-6 py-4 font-montserrat font-semibold text-xs text-biz-grey uppercase tracking-wider">Date</th>
                          <th className="text-left px-6 py-4 font-montserrat font-semibold text-xs text-biz-grey uppercase tracking-wider">Amount</th>
                          <th className="text-left px-6 py-4 font-montserrat font-semibold text-xs text-biz-grey uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {orders.map((order) => (
                          <tr key={order.id} className="hover:bg-biz-cream/30 transition-colors">
                            <td className="px-6 py-4 font-mono text-sm text-biz-grey">
                              {order.id.substring(0, 8)}...
                            </td>
                            <td className="px-6 py-4 font-open-sans text-sm text-biz-grey">
                              {format(new Date(order.created_at), 'MMM d, yyyy')}
                            </td>
                            <td className="px-6 py-4 font-montserrat font-semibold text-biz-navy">
                              ${Number(order.amount).toFixed(2)}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                order.status === 'completed' ? 'bg-biz-green/10 text-biz-green border border-biz-green/20' :
                                order.status === 'pending' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                                'bg-red-100 text-red-700 border border-red-200'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl space-y-6 animate-fade-in">
              <Card className="bg-white border-0 shadow-card overflow-hidden">
                <CardContent className="p-6 lg:p-8">
                  <h2 className="font-montserrat font-bold text-lg text-biz-navy mb-6">Profile Settings</h2>
                  <div className="flex items-center gap-6 mb-8">
                    <Avatar className="h-20 w-20 border-4 border-biz-green shadow-lg">
                      <AvatarImage src={user?.user_metadata?.avatar_url} />
                      <AvatarFallback className="bg-biz-green text-white font-montserrat font-bold text-2xl">{userInitials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-montserrat font-bold text-xl text-biz-navy">{userName}</h3>
                      <p className="font-open-sans text-biz-grey">{user?.email}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block font-montserrat font-semibold text-sm text-biz-navy mb-2">Email Address</label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="w-full px-4 py-3 bg-biz-cream border border-gray-200 rounded-xl text-biz-grey font-open-sans"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Footer */}
              <Card className="bg-white border-0 shadow-card overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-biz-grey">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-biz-green" />
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
                </CardContent>
              </Card>

              <Card className="bg-white border border-red-200/50 shadow-card overflow-hidden">
                <CardContent className="p-6 lg:p-8">
                  <h2 className="font-montserrat font-bold text-lg text-red-600 mb-4">Danger Zone</h2>
                  <p className="font-open-sans text-sm text-biz-grey mb-6">
                    Sign out of your account. You can sign back in at any time.
                  </p>
                  <Button
                    variant="outline"
                    className="border-red-300 text-red-600 hover:bg-red-50 font-montserrat font-semibold"
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

      {/* Custom Styles */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default PortalRevamped;
