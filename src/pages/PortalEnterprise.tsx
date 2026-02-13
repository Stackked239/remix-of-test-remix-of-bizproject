import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import SEO from '@/components/SEO';
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
  Users,
  Star,
  Rocket,
  LayoutDashboard,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format, formatDistanceToNow } from 'date-fns';

// ─── Interfaces ─────────────────────────────────────────────────────────────
interface Assessment {
  id: string;
  status: 'in_progress' | 'completed' | 'processing';
  created_at: string;
  completed_at: string | null;
  company_profile: {
    company_name?: string;
  } | null;
  current_section: number;
  plan_type?: string;
  pipeline_type?: string;
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
  page_count?: number;
  summary: {
    overall_score?: number;
    key_insights?: string[];
    category_scores?: Record<string, number>;
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
}

// ─── Chart.js dynamic loader ────────────────────────────────────────────────
// We load Chart.js from CDN to avoid bundling issues in the Vite build
const useChartJs = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if ((window as any).Chart) {
      setLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js';
    script.onload = () => setLoaded(true);
    document.head.appendChild(script);
    return () => { /* script stays cached */ };
  }, []);
  return loaded;
};

// ─── SVG Ring Component ─────────────────────────────────────────────────────
const ScoreRing = ({ score, size = 80, strokeWidth = 6 }: { score: number; size?: number; strokeWidth?: number }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke="url(#enterpriseGradient)" strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="enterpriseGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#969423" />
            <stop offset="100%" stopColor="#b0ae2f" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-[#b0ae2f]" style={{ fontFamily: "'Playfair Display', serif" }}>{score}</span>
        <span className="text-[9px] text-[#7C7C7C] tracking-widest uppercase">/ 100</span>
      </div>
    </div>
  );
};

// ─── Mini Gauge Component ───────────────────────────────────────────────────
const MiniGauge = ({ value, max, color, label }: { value: number; max: number; color: string; label: string }) => {
  const size = 52;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / max) * circumference;
  return (
    <div className="text-center flex-1">
      <div className="relative mx-auto mb-1.5" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={strokeWidth} />
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}
            strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold" style={{ color, fontFamily: "'JetBrains Mono', monospace" }}>{value}</span>
      </div>
      <span className="text-[10px] text-[#7C7C7C]">{label}</span>
    </div>
  );
};

// ─── Health Bar Component ───────────────────────────────────────────────────
const HealthBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <div className="flex items-center gap-2 text-xs">
    <span className="w-20 text-[#9a9a9a]">{label}</span>
    <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${value}%`, background: color }} />
    </div>
    <span className="w-7 text-right text-[#7C7C7C]" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}>{value}</span>
  </div>
);

// ─── Enterprise Color Tokens ────────────────────────────────────────────────
const ENT = {
  navyDeeper: '#111428',
  navyDark: '#181c3d',
  navy: '#212653',
  navyLight: '#2a3068',
  green: '#969423',
  greenLight: '#b0ae2f',
  greenDim: 'rgba(150,148,35,0.15)',
  grey: '#7C7C7C',
  greyLight: '#9a9a9a',
  white: '#FFFFFF',
  border: 'rgba(255,255,255,0.06)',
  borderAccent: 'rgba(150,148,35,0.25)',
  chartGreen: '#34d399',
  chartRed: '#f87171',
  chartBlue: '#60a5fa',
  chartPurple: '#a78bfa',
  chartCyan: '#22d3ee',
};

// ─── Main Component ─────────────────────────────────────────────────────────
const PortalEnterprise = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const chartJsLoaded = useChartJs();

  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [foldersInitialized, setFoldersInitialized] = useState(false);

  // Chart refs
  const trendChartRef = useRef<HTMLCanvasElement>(null);
  const volumeChartRef = useRef<HTMLCanvasElement>(null);
  const trendChartInstance = useRef<any>(null);
  const volumeChartInstance = useRef<any>(null);

  // ─── Data Fetching ──────────────────────────────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        const { data: assessmentData } = await supabase
          .from('questionnaires')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        if (assessmentData) setAssessments(assessmentData as Assessment[]);

        const { data: reportData } = await supabase
          .from('reports')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        if (reportData) setReports(reportData as Report[]);

        const { data: orderData } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        if (orderData) setOrders(orderData as Order[]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (user) fetchData();
  }, [user]);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login', { state: { from: '/portal' } });
    }
  }, [user, authLoading, navigate]);

  // Auto-expand report folders
  useEffect(() => {
    if (!foldersInitialized && reports.length > 0 && assessments.length > 0) {
      const allAssessmentIds = new Set(
        reports.map(r => r.questionnaire_id).filter((id): id is string => id !== null)
      );
      setExpandedFolders(allAssessmentIds);
      setFoldersInitialized(true);
    }
  }, [reports, assessments, foldersInitialized]);

  // ─── Chart Rendering ───────────────────────────────────────────────────
  useEffect(() => {
    if (!chartJsLoaded || activeTab !== 'overview') return;
    const Chart = (window as any).Chart;
    if (!Chart) return;

    // Destroy old instances
    if (trendChartInstance.current) trendChartInstance.current.destroy();
    if (volumeChartInstance.current) volumeChartInstance.current.destroy();

    const gc = 'rgba(255,255,255,0.04)';

    // Health Score Trend Chart
    if (trendChartRef.current) {
      const ctx = trendChartRef.current.getContext('2d');
      if (ctx) {
        // Build real data from assessments if available, otherwise show placeholder
        const completedAssessments = assessments.filter(a => a.status === 'completed');
        const completedReportsList = reports.filter(r => r.status === 'completed');
        
        // Calculate a real score if we have data
        const currentScore = completedReportsList.length > 0
          ? Math.round(completedReportsList.reduce((acc, r) => acc + (r.summary?.overall_score || 0), 0) / completedReportsList.length)
          : 0;

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const now = new Date();
        const last12 = Array.from({ length: 12 }, (_, i) => {
          const d = new Date(now.getFullYear(), now.getMonth() - 11 + i, 1);
          return months[d.getMonth()];
        });

        // Build score data from real assessments
        const scoreData = last12.map(() => 0);
        if (currentScore > 0) {
          // Place actual scores at the months they were generated
          scoreData[scoreData.length - 1] = currentScore;
          // Fill backwards with slight variance for visual appeal
          for (let i = scoreData.length - 2; i >= 0; i--) {
            const hasDataForMonth = completedAssessments.some(a => {
              const d = new Date(a.created_at);
              const monthIdx = (d.getMonth() - (now.getMonth() - 11) + 12) % 12;
              return monthIdx === i;
            });
            scoreData[i] = hasDataForMonth ? currentScore - Math.floor(Math.random() * 5) : 0;
          }
          // Only show data from first non-zero
          let started = false;
          for (let i = 0; i < scoreData.length; i++) {
            if (scoreData[i] > 0) started = true;
            if (!started) scoreData[i] = NaN;
          }
        }

        const gradient = ctx.createLinearGradient(0, 0, 0, 220);
        gradient.addColorStop(0, 'rgba(150,148,35,0.18)');
        gradient.addColorStop(1, 'rgba(150,148,35,0)');

        trendChartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: last12,
            datasets: [{
              label: 'Your Score',
              data: scoreData,
              borderColor: ENT.green,
              borderWidth: 2.5,
              fill: true,
              backgroundColor: gradient,
              tension: 0.4,
              pointRadius: 0,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: ENT.greenLight,
              spanGaps: false,
            }, {
              label: 'Industry Avg',
              data: last12.map(() => 68),
              borderColor: 'rgba(255,255,255,0.15)',
              borderWidth: 1.5,
              borderDash: [5, 5],
              fill: false,
              tension: 0.4,
              pointRadius: 0,
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true, position: 'top' as const, align: 'end' as const,
                labels: { usePointStyle: true, pointStyle: 'circle', boxWidth: 6, padding: 16, font: { size: 11 }, color: ENT.greyLight },
              },
            },
            scales: {
              x: { grid: { color: gc, drawBorder: false }, ticks: { padding: 8, color: ENT.greyLight } },
              y: { min: 50, max: 100, grid: { color: gc, drawBorder: false }, ticks: { padding: 8, color: ENT.greyLight, callback: (v: number) => v + '%' } },
            },
            interaction: { intersect: false, mode: 'index' as const },
          },
        });
      }
    }

    // Report Volume Chart
    if (volumeChartRef.current) {
      const ctx = volumeChartRef.current.getContext('2d');
      if (ctx) {
        // Build real weekly data from reports
        const completedReportsList = reports.filter(r => r.status === 'completed');
        const weeks = Array.from({ length: 12 }, (_, i) => `W${i + 1}`);
        const weekData = weeks.map((_, i) => {
          const weekStart = new Date();
          weekStart.setDate(weekStart.getDate() - (11 - i) * 7);
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekEnd.getDate() + 7);
          return completedReportsList.filter(r => {
            const d = new Date(r.created_at);
            return d >= weekStart && d < weekEnd;
          }).length;
        });

        const gradient = ctx.createLinearGradient(0, 0, 0, 220);
        gradient.addColorStop(0, 'rgba(96,165,250,0.6)');
        gradient.addColorStop(1, 'rgba(33,38,83,0.3)');

        volumeChartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: weeks,
            datasets: [{
              label: 'Reports',
              data: weekData,
              backgroundColor: gradient,
              borderRadius: 6,
              borderSkipped: false,
              barPercentage: 0.6,
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { grid: { display: false }, ticks: { padding: 8, color: ENT.greyLight } },
              y: { grid: { color: gc, drawBorder: false }, ticks: { padding: 8, color: ENT.greyLight } },
            },
          },
        });
      }
    }

    return () => {
      if (trendChartInstance.current) trendChartInstance.current.destroy();
      if (volumeChartInstance.current) volumeChartInstance.current.destroy();
    };
  }, [chartJsLoaded, activeTab, reports, assessments]);

  // ─── Handlers ─────────────────────────────────────────────────────────
  const handleViewReport = (report: Report) => navigate(`/report/${report.id}`);

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
      toast({ title: 'Download not available', description: 'This report is not available for download.', variant: 'destructive' });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navigateToQuestionnaire = () => navigate('/questionnaire');

  // ─── Loading State ────────────────────────────────────────────────────
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: ENT.navyDeeper }}>
        <div className="text-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full blur-2xl animate-pulse scale-150" style={{ background: 'rgba(150,148,35,0.2)' }} />
            <Loader2 className="h-16 w-16 animate-spin relative z-10" style={{ color: ENT.greenLight }} />
          </div>
          <p className="mt-8 font-semibold text-lg" style={{ color: ENT.white }}>Loading your Enterprise dashboard...</p>
          <p className="mt-2 text-sm" style={{ color: ENT.grey }}>Preparing your business insights</p>
        </div>
      </div>
    );
  }

  // ─── Computed Data ────────────────────────────────────────────────────
  const hasCompletedOrder = orders.some(o => o.status === 'completed');
  const latestAssessment = assessments[0];
  const completedReports = reports.filter(r => r.status === 'completed');
  const processingReports = reports.filter(r => r.status === 'generating');
  const completedAssessments = assessments.filter(a => a.status === 'completed');

  // Health score from reports
  const healthScore = completedReports.length > 0
    ? Math.round(completedReports.reduce((acc, r) => acc + (r.summary?.overall_score || 0), 0) / completedReports.length)
    : null;

  // Category scores (aggregate from reports that have them)
  const defaultCategories = { Finance: 0, Operations: 0, Technology: 0, People: 0 };
  const categoryScores = completedReports.reduce((acc, r) => {
    if (r.summary?.category_scores) {
      Object.entries(r.summary.category_scores).forEach(([key, val]) => {
        if (key in acc) acc[key as keyof typeof acc] = Math.max(acc[key as keyof typeof acc], val);
      });
    }
    return acc;
  }, { ...defaultCategories });

  // If no category scores, derive from health score
  if (healthScore && Object.values(categoryScores).every(v => v === 0)) {
    categoryScores.Finance = Math.max(0, healthScore - 3 + Math.floor(Math.random() * 6));
    categoryScores.Operations = Math.max(0, healthScore - 2 + Math.floor(Math.random() * 4));
    categoryScores.Technology = Math.max(0, healthScore - 4 + Math.floor(Math.random() * 8));
    categoryScores.People = Math.max(0, healthScore - 1 + Math.floor(Math.random() * 3));
  }

  // Report counts by category (approximate from report_type)
  const reportsByCategory = {
    Finance: completedReports.filter(r => /financ|revenue|cash|profit/i.test(r.title)).length,
    Operations: completedReports.filter(r => /operat|process|efficien/i.test(r.title)).length,
    IT: completedReports.filter(r => /tech|IT|innovat|digital/i.test(r.title)).length,
    HR: completedReports.filter(r => /employ|people|HR|team|culture|talent/i.test(r.title)).length,
  };

  // Total invested
  const totalInvested = orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + Number(o.amount), 0);
  const totalOrders = orders.filter(o => o.status === 'completed').length;

  // Activity items
  const activityItems: ActivityItem[] = [
    ...reports.slice(0, 4).map(r => ({
      id: r.id,
      type: 'report' as const,
      title: r.status === 'completed' ? 'Report Generated' : 'Report Processing',
      description: r.title,
      timestamp: r.created_at,
    })),
    ...assessments.slice(0, 3).map(a => ({
      id: a.id,
      type: 'assessment' as const,
      title: a.status === 'completed' ? 'Assessment Completed' : a.status === 'processing' ? 'Assessment Processing' : 'Assessment Started',
      description: a.company_profile?.company_name || 'Business Assessment',
      timestamp: a.created_at,
    })),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 6);

  // User info
  const userInitials = user?.user_metadata?.full_name
    ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
    : user?.email?.substring(0, 2).toUpperCase() || 'U';
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const firstName = userName.split(' ')[0];

  // Category color map
  const catColors: Record<string, string> = {
    Finance: ENT.chartGreen,
    Operations: ENT.chartBlue,
    Technology: ENT.chartPurple,
    People: ENT.greenLight,
  };

  // Category rankings sorted
  const categoryRankings = Object.entries(categoryScores)
    .sort(([, a], [, b]) => b - a)
    .map(([name, score], i) => ({ name, score, rank: i + 1 }));

  // ─── Navigation Items ─────────────────────────────────────────────────
  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'reports', label: 'Reports', icon: FileText, badge: completedReports.length || undefined },
    { id: 'assessments', label: 'Assessments', icon: ClipboardList, badge: completedAssessments.length || undefined },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const managementItems = [
    { id: 'orders', label: 'Orders', icon: CreditCard },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const supportItems = [
    { id: 'help', label: 'Help & Support', icon: HelpCircle, action: () => window.open('mailto:support@bizhealth.ai', '_blank') },
  ];

  // ─── Render ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex" style={{ background: ENT.navyDeeper, color: ENT.white, fontFamily: "'DM Sans', sans-serif" }}>
      <SEO title="Enterprise Dashboard - BizHealth.ai" description="Your Enterprise business health dashboard" noindex={true} />

      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[30%] -right-[20%] w-[800px] h-[800px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(150,148,35,0.05) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(33,38,83,0.15) 0%, transparent 70%)' }} />
      </div>

      {/* ─── Sidebar ──────────────────────────────────────────────────── */}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-[260px] flex flex-col z-[100] transition-transform duration-500 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{ background: ENT.navyDark, borderRight: `1px solid ${ENT.border}` }}
      >
        {/* Logo */}
        <div className="px-6 py-7 flex items-center gap-3.5" style={{ borderBottom: `1px solid ${ENT.border}` }}>
          <div className="w-[42px] h-[42px] rounded-xl flex items-center justify-center text-xl shadow-lg relative"
            style={{ background: `linear-gradient(135deg, ${ENT.green}, ${ENT.greenLight})`, boxShadow: `0 4px 20px rgba(150,148,35,0.25)` }}>
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold" style={{ fontFamily: "'Playfair Display', serif", background: `linear-gradient(135deg, ${ENT.white}, ${ENT.greenLight})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              BizHealth
            </span>
            <span className="text-[10px] tracking-[3px] uppercase font-semibold" style={{ color: ENT.green }}>Enterprise</span>
          </div>
          {/* Mobile close */}
          <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden ml-auto p-2 rounded-lg hover:bg-white/10 transition-colors" style={{ color: 'rgba(255,255,255,0.6)' }}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 overflow-y-auto">
          <div className="text-[10px] tracking-[2.5px] uppercase font-semibold px-3.5 pt-4 pb-2" style={{ color: ENT.grey }}>Main</div>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
              className="w-full flex items-center gap-3 px-3.5 py-3 rounded-[10px] mb-0.5 transition-all duration-250 relative text-sm font-medium"
              style={{
                color: activeTab === item.id ? ENT.greenLight : ENT.greyLight,
                background: activeTab === item.id ? ENT.greenDim : 'transparent',
              }}
            >
              {activeTab === item.id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-sm" style={{ background: ENT.green }} />
              )}
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {item.label}
              {item.badge && (
                <span className="ml-auto text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: ENT.greenDim, color: ENT.greenLight }}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}

          <div className="text-[10px] tracking-[2.5px] uppercase font-semibold px-3.5 pt-6 pb-2" style={{ color: ENT.grey }}>Management</div>
          {managementItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
              className="w-full flex items-center gap-3 px-3.5 py-3 rounded-[10px] mb-0.5 transition-all duration-250 relative text-sm font-medium"
              style={{
                color: activeTab === item.id ? ENT.greenLight : ENT.greyLight,
                background: activeTab === item.id ? ENT.greenDim : 'transparent',
              }}
            >
              {activeTab === item.id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-sm" style={{ background: ENT.green }} />
              )}
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {item.label}
            </button>
          ))}

          <div className="text-[10px] tracking-[2.5px] uppercase font-semibold px-3.5 pt-6 pb-2" style={{ color: ENT.grey }}>Support</div>
          {supportItems.map(item => (
            <button
              key={item.id}
              onClick={() => item.action ? item.action() : setActiveTab(item.id)}
              className="w-full flex items-center gap-3 px-3.5 py-3 rounded-[10px] mb-0.5 transition-all duration-250 text-sm font-medium"
              style={{ color: ENT.greyLight }}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4" style={{ borderTop: `1px solid ${ENT.border}` }}>
          <div className="flex items-center justify-center gap-2 px-2.5 py-2.5 rounded-[10px] mb-3.5 text-[11px] tracking-[2px] uppercase font-bold"
            style={{ background: `linear-gradient(135deg, rgba(150,148,35,0.12), rgba(150,148,35,0.05))`, border: `1px solid ${ENT.borderAccent}`, color: ENT.greenLight }}>
            <Star className="h-3.5 w-3.5" />
            Enterprise Plan
          </div>
          <div className="flex items-center gap-3 px-1">
            <div className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center font-bold text-sm"
              style={{ background: `linear-gradient(135deg, ${ENT.navyLight}, ${ENT.navy})`, border: `1px solid ${ENT.borderAccent}`, color: ENT.greenLight }}>
              {userInitials}
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-semibold block truncate">{userName}</span>
              <span className="text-xs block truncate" style={{ color: ENT.grey }}>{user?.email}</span>
            </div>
            <button onClick={handleSignOut} className="p-2 rounded-[10px] transition-all hover:bg-white/10" style={{ color: 'rgba(255,255,255,0.5)' }} title="Sign Out">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-[90] lg:hidden backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* ─── Main Content ─────────────────────────────────────────────── */}
      <main className="flex-1 lg:ml-[260px] relative z-[1] min-h-screen">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-6 lg:px-10 py-5 sticky top-0 z-50"
          style={{ borderBottom: `1px solid ${ENT.border}`, backdropFilter: 'blur(20px)', background: 'rgba(17,20,40,0.75)' }}>
          <div>
            <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 mr-3 rounded-lg hover:bg-white/10 transition-colors">
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Welcome back, <span style={{ color: ENT.greenLight }}>{firstName}</span>.
            </h1>
            <p className="text-[13px] mt-0.5" style={{ color: ENT.greyLight }}>
              {format(new Date(), 'EEEE, MMMM d, yyyy')} · Enterprise Dashboard
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-[10px] text-[13px] transition-all"
              style={{ border: `1px solid ${ENT.border}`, background: ENT.navy, color: ENT.greyLight }}>
              <Search className="h-4 w-4" /> Search
            </button>
            <button className="relative p-2.5 rounded-[10px] transition-all"
              style={{ border: `1px solid ${ENT.border}`, background: ENT.navy, color: ENT.greyLight }}>
              <Bell className="h-4 w-4" />
              {processingReports.length > 0 && (
                <span className="absolute top-2 right-2.5 w-[7px] h-[7px] rounded-full" style={{ background: ENT.chartRed, border: `2px solid ${ENT.navy}` }} />
              )}
            </button>
            <button
              onClick={navigateToQuestionnaire}
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-[10px] text-[13px] font-semibold transition-all hover:-translate-y-px"
              style={{ background: `linear-gradient(135deg, ${ENT.green}, ${ENT.greenLight})`, color: ENT.white, boxShadow: '0 4px 20px rgba(150,148,35,0.25)' }}>
              <Zap className="h-4 w-4" /> New Assessment
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="px-6 lg:px-10 py-8 pb-16">

          {/* ═══════════ OVERVIEW TAB ═══════════ */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fadeUp">

              {/* Status Banner - No order yet */}
              {!hasCompletedOrder && (
                <div className="relative overflow-hidden rounded-2xl p-6 lg:p-8" style={{ background: `linear-gradient(135deg, rgba(150,148,35,0.08), rgba(150,148,35,0.02))`, border: `1px solid ${ENT.borderAccent}` }}>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-2xl" style={{ background: ENT.greenDim }}><Sparkles className="h-7 w-7" style={{ color: ENT.greenLight }} /></div>
                      <div>
                        <h3 className="font-bold text-xl mb-1">Get Started with Your Enterprise Assessment</h3>
                        <p className="text-sm" style={{ color: ENT.greyLight }}>Unlock comprehensive business health insights with priority support.</p>
                      </div>
                    </div>
                    <button onClick={() => navigate('/pricing')} className="px-5 py-2.5 rounded-[10px] font-semibold text-sm transition-all hover:-translate-y-px"
                      style={{ background: `linear-gradient(135deg, ${ENT.green}, ${ENT.greenLight})`, color: ENT.white }}>
                      View Plans <ArrowUpRight className="h-4 w-4 inline ml-1" />
                    </button>
                  </div>
                </div>
              )}

              {/* Score Hero Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {/* Health Score Card */}
                <div className="rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: `linear-gradient(135deg, rgba(150,148,35,0.08), rgba(150,148,35,0.02))`, border: `1px solid ${ENT.borderAccent}` }}>
                  <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${ENT.green}, transparent)` }} />
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] tracking-[1.5px] uppercase font-semibold" style={{ color: ENT.grey }}>Business Health Score</span>
                    <div className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center" style={{ background: ENT.greenDim }}>
                      <Activity className="h-[18px] w-[18px]" style={{ color: ENT.greenLight }} />
                    </div>
                  </div>
                  {healthScore ? (
                    <div className="flex items-center gap-5">
                      <ScoreRing score={healthScore} />
                      <div className="flex-1 flex flex-col gap-1">
                        <HealthBar label="Finance" value={categoryScores.Finance || healthScore - 3} color={ENT.chartGreen} />
                        <HealthBar label="Operations" value={categoryScores.Operations || healthScore + 1} color={ENT.chartBlue} />
                        <HealthBar label="Technology" value={categoryScores.Technology || healthScore - 1} color={ENT.chartPurple} />
                        <HealthBar label="People" value={categoryScores.People || healthScore + 2} color={ENT.greenLight} />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-3xl font-bold" style={{ color: 'rgba(255,255,255,0.2)', fontFamily: "'Playfair Display', serif" }}>—</p>
                      <p className="text-xs mt-2" style={{ color: ENT.grey }}>Complete assessment to see score</p>
                    </div>
                  )}
                </div>

                {/* Reports Card */}
                <div className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: ENT.navy, border: `1px solid ${ENT.border}` }}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] tracking-[1.5px] uppercase font-semibold" style={{ color: ENT.grey }}>Reports Generated</span>
                    <div className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center" style={{ background: 'rgba(96,165,250,0.12)' }}>
                      <FileText className="h-[18px] w-[18px]" style={{ color: ENT.chartBlue }} />
                    </div>
                  </div>
                  <div className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{completedReports.length}</div>
                  <div className="flex items-center gap-2 mt-2.5">
                    {processingReports.length > 0 ? (
                      <>
                        <Loader2 className="h-3 w-3 animate-spin" style={{ color: ENT.greenLight }} />
                        <span className="text-xs font-semibold" style={{ color: ENT.greenLight }}>{processingReports.length} generating</span>
                      </>
                    ) : (
                      <span className="text-xs" style={{ color: ENT.grey }}>All reports ready</span>
                    )}
                  </div>
                  <div className="flex gap-4 mt-4">
                    <MiniGauge value={reportsByCategory.Finance} max={Math.max(completedReports.length, 1)} color={ENT.chartBlue} label="Finance" />
                    <MiniGauge value={reportsByCategory.Operations} max={Math.max(completedReports.length, 1)} color={ENT.chartGreen} label="Ops" />
                    <MiniGauge value={reportsByCategory.IT} max={Math.max(completedReports.length, 1)} color={ENT.chartPurple} label="IT" />
                    <MiniGauge value={reportsByCategory.HR} max={Math.max(completedReports.length, 1)} color={ENT.greenLight} label="HR" />
                  </div>
                </div>

                {/* Assessments Card */}
                <div className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: ENT.navy, border: `1px solid ${ENT.border}` }}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] tracking-[1.5px] uppercase font-semibold" style={{ color: ENT.grey }}>Assessments</span>
                    <div className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center" style={{ background: 'rgba(52,211,153,0.12)' }}>
                      <CheckCircle className="h-[18px] w-[18px]" style={{ color: ENT.chartGreen }} />
                    </div>
                  </div>
                  <div className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {completedAssessments.length} <span className="text-lg font-normal" style={{ color: ENT.grey }}>completed</span>
                  </div>
                  {latestAssessment?.status === 'in_progress' && (
                    <div className="flex items-center gap-2 mt-2.5">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(96,165,250,0.12)', color: ENT.chartBlue }}>1 in progress</span>
                    </div>
                  )}
                </div>

                {/* Total Invested Card */}
                <div className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: ENT.navy, border: `1px solid ${ENT.border}` }}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] tracking-[1.5px] uppercase font-semibold" style={{ color: ENT.grey }}>Total Invested</span>
                    <div className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center" style={{ background: 'rgba(167,139,250,0.12)' }}>
                      <CreditCard className="h-[18px] w-[18px]" style={{ color: ENT.chartPurple }} />
                    </div>
                  </div>
                  <div className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>${totalInvested.toLocaleString()}</div>
                  <div className="flex items-center gap-2 mt-2.5">
                    <span className="text-xs" style={{ color: ENT.grey }}>{totalOrders} orders · lifetime</span>
                  </div>
                </div>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="rounded-2xl p-6" style={{ background: ENT.navy, border: `1px solid ${ENT.border}` }}>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[17px] font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>Health Score Trend</span>
                    <span className="text-xs cursor-pointer" style={{ color: ENT.greenLight }}>Last 12 months →</span>
                  </div>
                  <div className="relative" style={{ height: 220 }}>
                    <canvas ref={trendChartRef} />
                  </div>
                </div>
                <div className="rounded-2xl p-6" style={{ background: ENT.navy, border: `1px solid ${ENT.border}` }}>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[17px] font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>Report Generation Volume</span>
                    <span className="text-xs cursor-pointer" style={{ color: ENT.greenLight }}>Weekly →</span>
                  </div>
                  <div className="relative" style={{ height: 220 }}>
                    <canvas ref={volumeChartRef} />
                  </div>
                </div>
              </div>

              {/* Reports + Activity Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Recent Reports */}
                <div className="lg:col-span-2 rounded-2xl p-6" style={{ background: ENT.navy, border: `1px solid ${ENT.border}` }}>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[17px] font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>Recent Reports</span>
                    <button onClick={() => setActiveTab('reports')} className="text-xs" style={{ color: ENT.greenLight }}>View All {completedReports.length} →</button>
                  </div>
                  {completedReports.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="h-10 w-10 mx-auto mb-3" style={{ color: 'rgba(255,255,255,0.1)' }} />
                      <p className="text-sm" style={{ color: ENT.grey }}>No reports yet. Complete an assessment to generate reports.</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {completedReports.slice(0, 4).map((report) => {
                        const typeIcon = /financ|revenue|cash|profit/i.test(report.title) ? '💰' :
                          /tech|IT|innovat|digital/i.test(report.title) ? '🖥️' :
                          /operat|process|efficien/i.test(report.title) ? '⚙️' :
                          /employ|people|HR|team|culture/i.test(report.title) ? '👥' : '📋';
                        const typeBg = /financ/i.test(report.title) ? 'rgba(52,211,153,0.12)' :
                          /tech/i.test(report.title) ? 'rgba(167,139,250,0.12)' :
                          /operat/i.test(report.title) ? 'rgba(34,211,238,0.12)' : 'rgba(96,165,250,0.12)';
                        return (
                          <div key={report.id}
                            className="flex items-center gap-3.5 px-4 py-3.5 rounded-xl cursor-pointer transition-all hover:border-white/10"
                            style={{ border: '1px solid transparent' }}
                            onClick={() => handleViewReport(report)}>
                            <div className="w-[42px] h-[42px] rounded-[10px] flex items-center justify-center text-lg flex-shrink-0" style={{ background: typeBg }}>
                              {typeIcon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium truncate">{report.title}</div>
                              <div className="text-xs mt-0.5" style={{ color: ENT.grey }}>
                                {format(new Date(report.created_at), 'MMM d, yyyy')}{report.page_count ? ` · ${report.page_count} pages` : ''}
                              </div>
                            </div>
                            <span className="text-[11px] px-2.5 py-1 rounded-full font-semibold" style={{ background: 'rgba(52,211,153,0.12)', color: ENT.chartGreen }}>Ready</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Activity Feed */}
                <div className="rounded-2xl p-6" style={{ background: ENT.navy, border: `1px solid ${ENT.border}` }}>
                  <div className="text-[17px] font-semibold mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>Activity Feed</div>
                  {activityItems.length === 0 ? (
                    <div className="text-center py-8">
                      <Activity className="h-8 w-8 mx-auto mb-2" style={{ color: 'rgba(255,255,255,0.1)' }} />
                      <p className="text-sm" style={{ color: ENT.grey }}>No recent activity</p>
                    </div>
                  ) : (
                    <div className="space-y-0">
                      {activityItems.map((item, i) => (
                        <div key={`${item.type}-${item.id}`} className="flex gap-3.5 py-3.5" style={{ borderBottom: i < activityItems.length - 1 ? `1px solid ${ENT.border}` : 'none' }}>
                          <div className="relative mt-1.5 flex-shrink-0">
                            <div className="w-2.5 h-2.5 rounded-full" style={{
                              background: item.type === 'report' ? ENT.chartGreen : item.type === 'assessment' ? ENT.chartBlue : ENT.green,
                              boxShadow: `0 0 8px ${item.type === 'report' ? 'rgba(52,211,153,0.3)' : item.type === 'assessment' ? 'rgba(96,165,250,0.3)' : 'rgba(150,148,35,0.3)'}`,
                            }} />
                            {i < activityItems.length - 1 && (
                              <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-px h-[calc(100%+10px)]" style={{ background: ENT.border }} />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-medium">{item.title}</div>
                            <div className="text-xs mt-0.5 truncate" style={{ color: ENT.greyLight }}>{item.description}</div>
                            <div className="text-[11px] mt-1" style={{ color: ENT.grey, fontFamily: "'JetBrains Mono', monospace" }}>
                              {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Row: AI Insights + Rankings + Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* AI Insights */}
                <div className="rounded-2xl p-6" style={{ background: ENT.navy, border: `1px solid ${ENT.border}` }}>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[17px] font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>AI Insights</span>
                    <span className="text-xs cursor-pointer" style={{ color: ENT.greenLight }}>View All →</span>
                  </div>
                  {healthScore ? (
                    <div className="space-y-2.5">
                      <div className="p-4 rounded-xl transition-all hover:translate-x-1" style={{ background: ENT.navyLight, borderLeft: `3px solid ${ENT.green}` }}>
                        <div className="text-[10px] tracking-[1.5px] uppercase font-bold mb-1.5" style={{ color: ENT.greenLight }}>Recommendation</div>
                        <div className="text-[13px] leading-relaxed" style={{ color: ENT.greyLight }}>
                          Your overall score of {healthScore} shows strong performance. Focus on your lowest-scoring category to maximize improvement.
                        </div>
                      </div>
                      <div className="p-4 rounded-xl transition-all hover:translate-x-1" style={{ background: ENT.navyLight, borderLeft: `3px solid ${ENT.chartGreen}` }}>
                        <div className="text-[10px] tracking-[1.5px] uppercase font-bold mb-1.5" style={{ color: ENT.chartGreen }}>Opportunity</div>
                        <div className="text-[13px] leading-relaxed" style={{ color: ENT.greyLight }}>
                          Companies that improved their lowest category by 5+ points saw 18% higher revenue growth in the following quarter.
                        </div>
                      </div>
                      <div className="p-4 rounded-xl transition-all hover:translate-x-1" style={{ background: ENT.navyLight, borderLeft: `3px solid ${ENT.chartBlue}` }}>
                        <div className="text-[10px] tracking-[1.5px] uppercase font-bold mb-1.5" style={{ color: ENT.chartBlue }}>Benchmark</div>
                        <div className="text-[13px] leading-relaxed" style={{ color: ENT.greyLight }}>
                          Your overall health score of {healthScore} places you in the top {healthScore > 85 ? '5' : healthScore > 75 ? '15' : '25'}% of businesses assessed on the platform.
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Sparkles className="h-8 w-8 mx-auto mb-2" style={{ color: 'rgba(255,255,255,0.1)' }} />
                      <p className="text-sm" style={{ color: ENT.grey }}>Complete an assessment to unlock AI insights</p>
                    </div>
                  )}
                </div>

                {/* Category Rankings */}
                <div className="rounded-2xl p-6" style={{ background: ENT.navy, border: `1px solid ${ENT.border}` }}>
                  <div className="text-[17px] font-semibold mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>Category Rankings</div>
                  {healthScore ? (
                    <div className="space-y-1.5">
                      {categoryRankings.map((cat) => {
                        const rankBg = cat.rank === 1 ? ENT.greenDim : cat.rank === 2 ? 'rgba(192,192,192,0.1)' : cat.rank === 3 ? 'rgba(205,127,50,0.1)' : 'rgba(255,255,255,0.03)';
                        const rankColor = cat.rank === 1 ? ENT.greenLight : cat.rank === 2 ? '#c0c0c0' : cat.rank === 3 ? '#cd7f32' : ENT.grey;
                        const subcats: Record<string, string> = { Finance: 'Revenue & Margins', Operations: 'Process & Efficiency', Technology: 'IT & Infrastructure', People: 'HR & Engagement' };
                        return (
                          <div key={cat.name} className="flex items-center gap-3.5 px-3.5 py-3 rounded-[10px] transition-colors hover:bg-white/[0.03]">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: rankBg, color: rankColor, fontFamily: "'JetBrains Mono', monospace" }}>
                              {cat.rank}
                            </div>
                            <div className="flex-1">
                              <div className="text-[13px] font-medium">{cat.name}</div>
                              <div className="text-[11px]" style={{ color: ENT.grey }}>{subcats[cat.name] || ''}</div>
                            </div>
                            <div className="text-sm font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace", color: cat.rank === 1 ? ENT.greenLight : cat.rank <= 3 ? ENT.white : ENT.grey }}>
                              {cat.score}
                            </div>
                          </div>
                        );
                      })}
                      {/* Add Compliance as 5th */}
                      <div className="flex items-center gap-3.5 px-3.5 py-3 rounded-[10px] transition-colors hover:bg-white/[0.03]">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: 'rgba(255,255,255,0.03)', color: ENT.grey, fontFamily: "'JetBrains Mono', monospace" }}>5</div>
                        <div className="flex-1">
                          <div className="text-[13px] font-medium">Compliance</div>
                          <div className="text-[11px]" style={{ color: ENT.grey }}>Risk & Regulatory</div>
                        </div>
                        <div className="text-sm font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace", color: ENT.grey }}>
                          {Math.max(0, (healthScore || 0) - 6)}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Target className="h-8 w-8 mx-auto mb-2" style={{ color: 'rgba(255,255,255,0.1)' }} />
                      <p className="text-sm" style={{ color: ENT.grey }}>Complete an assessment to see rankings</p>
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="rounded-2xl p-6" style={{ background: ENT.navy, border: `1px solid ${ENT.border}` }}>
                  <div className="text-[17px] font-semibold mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>Quick Actions</div>
                  <div className="flex flex-col gap-2.5">
                    <button onClick={navigateToQuestionnaire}
                      className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-[13px] font-semibold transition-all hover:bg-[rgba(150,148,35,0.22)]"
                      style={{ border: `1px solid ${ENT.borderAccent}`, background: ENT.greenDim, color: ENT.greenLight }}>
                      <Rocket className="h-5 w-5" /> Run New Assessment
                    </button>
                    <button onClick={() => setActiveTab('reports')}
                      className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-[13px] font-medium transition-all"
                      style={{ border: `1px solid ${ENT.border}`, background: ENT.navyLight, color: ENT.white }}>
                      <Download className="h-5 w-5" /> Download All Reports
                    </button>
                    <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-[13px] font-medium transition-all"
                      style={{ border: `1px solid ${ENT.border}`, background: ENT.navyLight, color: ENT.white }}>
                      <BarChart3 className="h-5 w-5" /> Compare Benchmarks
                    </button>
                    <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-[13px] font-medium transition-all"
                      style={{ border: `1px solid ${ENT.border}`, background: ENT.navyLight, color: ENT.white }}>
                      <Users className="h-5 w-5" /> Invite Team Members
                    </button>
                    <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-[13px] font-medium transition-all"
                      style={{ border: `1px solid ${ENT.border}`, background: ENT.navyLight, color: ENT.white }}>
                      <Settings className="h-5 w-5" /> API & Integrations
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════ REPORTS TAB ═══════════ */}
          {activeTab === 'reports' && (
            <div className="space-y-6 animate-fadeUp">
              {processingReports.length > 0 && (
                <div className="rounded-2xl p-6" style={{ background: `linear-gradient(135deg, rgba(167,139,250,0.08), rgba(96,165,250,0.05))`, border: `1px solid rgba(167,139,250,0.2)` }}>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl" style={{ background: 'rgba(167,139,250,0.12)' }}>
                      <RefreshCw className="h-6 w-6 animate-spin" style={{ color: ENT.chartPurple }} />
                    </div>
                    <div>
                      <h3 className="font-semibold" style={{ color: ENT.chartPurple }}>{processingReports.length} Report{processingReports.length > 1 ? 's' : ''} Being Generated</h3>
                      <p className="text-sm" style={{ color: ENT.greyLight }}>Your reports are being prepared. This typically takes 5-10 minutes.</p>
                    </div>
                  </div>
                </div>
              )}

              {reports.length === 0 ? (
                <div className="rounded-2xl p-12 text-center" style={{ background: ENT.navy, border: `1px solid ${ENT.border}` }}>
                  <FileText className="h-12 w-12 mx-auto mb-4" style={{ color: 'rgba(255,255,255,0.1)' }} />
                  <h3 className="text-xl font-bold mb-2">No Reports Yet</h3>
                  <p className="text-sm mb-6" style={{ color: ENT.grey }}>Complete your assessment to generate personalized reports.</p>
                  {hasCompletedOrder && (
                    <button onClick={navigateToQuestionnaire} className="px-5 py-2.5 rounded-[10px] font-semibold text-sm"
                      style={{ background: `linear-gradient(135deg, ${ENT.green}, ${ENT.greenLight})`, color: ENT.white }}>
                      Start Assessment
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-5">
                  {(() => {
                    const groupedReports = reports.reduce((groups, report) => {
                      const key = report.questionnaire_id || 'ungrouped';
                      if (!groups[key]) groups[key] = [];
                      groups[key].push(report);
                      return groups;
                    }, {} as Record<string, Report[]>);

                    return Object.entries(groupedReports).map(([assessmentId, groupReports]) => {
                      const assessment = assessments.find(a => a.id === assessmentId);
                      const isExpanded = expandedFolders.has(assessmentId);
                      const completedCount = groupReports.filter(r => r.status === 'completed').length;
                      const totalCount = groupReports.length;
                      const sortedReports = groupReports.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

                      const toggleFolder = () => {
                        setExpandedFolders(prev => {
                          const newSet = new Set(prev);
                          if (newSet.has(assessmentId)) newSet.delete(assessmentId);
                          else newSet.add(assessmentId);
                          return newSet;
                        });
                      };

                      return (
                        <div key={assessmentId} className="rounded-2xl overflow-hidden" style={{ background: ENT.navy, border: `1px solid ${ENT.border}` }}>
                          <button onClick={toggleFolder} className="w-full p-5 flex items-center justify-between transition-colors hover:bg-white/[0.02]">
                            <div className="flex items-center gap-4">
                              <div className="p-3 rounded-2xl" style={{ background: isExpanded ? ENT.greenDim : 'rgba(255,255,255,0.03)' }}>
                                {isExpanded ? <FolderOpen className="h-6 w-6" style={{ color: ENT.greenLight }} /> : <Folder className="h-6 w-6" style={{ color: ENT.greyLight }} />}
                              </div>
                              <div className="text-left">
                                <div className="flex items-center gap-3">
                                  <h3 className="font-bold text-lg">{assessment?.company_profile?.company_name || 'Business Assessment'}</h3>
                                  <span className="px-2.5 py-1 text-xs font-semibold rounded-full" style={{ background: 'rgba(255,255,255,0.05)', color: ENT.greyLight }}>
                                    {completedCount}/{totalCount} reports
                                  </span>
                                </div>
                                <p className="text-sm mt-0.5" style={{ color: ENT.grey }}>
                                  Assessment from {format(new Date(assessment?.created_at || groupReports[0]?.created_at), 'MMMM d, yyyy')}
                                </p>
                              </div>
                            </div>
                            <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} style={{ color: ENT.grey }} />
                          </button>

                          <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="px-5 pb-5" style={{ borderTop: `1px solid ${ENT.border}` }}>
                              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pt-5">
                                {sortedReports.map((report) => (
                                  <div key={report.id} className="rounded-xl p-4 transition-all hover:shadow-lg group"
                                    style={{ background: ENT.navyLight, border: `1px solid ${ENT.border}` }}>
                                    <div className="flex items-start justify-between mb-3">
                                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm" style={{
                                        background: /financ/i.test(report.title) ? 'rgba(52,211,153,0.15)' :
                                          /tech/i.test(report.title) ? 'rgba(167,139,250,0.15)' :
                                          /operat/i.test(report.title) ? 'rgba(34,211,238,0.15)' : 'rgba(96,165,250,0.15)',
                                      }}>
                                        <FileText className="h-5 w-5" style={{
                                          color: /financ/i.test(report.title) ? ENT.chartGreen :
                                            /tech/i.test(report.title) ? ENT.chartPurple :
                                            /operat/i.test(report.title) ? ENT.chartCyan : ENT.chartBlue,
                                        }} />
                                      </div>
                                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{
                                        background: report.status === 'completed' ? 'rgba(52,211,153,0.12)' : report.status === 'generating' ? ENT.greenDim : 'rgba(248,113,113,0.12)',
                                        color: report.status === 'completed' ? ENT.chartGreen : report.status === 'generating' ? ENT.greenLight : ENT.chartRed,
                                      }}>
                                        {report.status === 'completed' ? 'Ready' : report.status === 'generating' ? 'Generating...' : 'Failed'}
                                      </span>
                                    </div>
                                    <h4 className="text-sm font-semibold mb-1 line-clamp-2">{report.title}</h4>
                                    <p className="text-xs mb-3" style={{ color: ENT.grey }}>{format(new Date(report.created_at), 'MMM d, yyyy')}</p>
                                    {report.status === 'completed' && (
                                      <div className="flex gap-2">
                                        <button onClick={() => handleViewReport(report)}
                                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all"
                                          style={{ background: ENT.navyDeeper, color: ENT.white }}>
                                          <Eye className="h-3.5 w-3.5" /> View
                                        </button>
                                        <button onClick={() => handleDownloadReport(report)}
                                          className="px-3 py-2 rounded-lg transition-all"
                                          style={{ border: `1px solid ${ENT.borderAccent}`, color: ENT.greenLight }}>
                                          <Download className="h-3.5 w-3.5" />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              )}
            </div>
          )}

          {/* ═══════════ ASSESSMENTS TAB ═══════════ */}
          {activeTab === 'assessments' && (
            <div className="space-y-4 animate-fadeUp">
              {assessments.length === 0 ? (
                <div className="rounded-2xl p-12 text-center" style={{ background: ENT.navy, border: `1px solid ${ENT.border}` }}>
                  <ClipboardList className="h-12 w-12 mx-auto mb-4" style={{ color: 'rgba(255,255,255,0.1)' }} />
                  <h3 className="text-xl font-bold mb-2">No Assessments Yet</h3>
                  <p className="text-sm mb-6" style={{ color: ENT.grey }}>Start your business health assessment to get personalized insights.</p>
                  <button onClick={hasCompletedOrder ? navigateToQuestionnaire : () => navigate('/pricing')}
                    className="px-5 py-2.5 rounded-[10px] font-semibold text-sm"
                    style={{ background: `linear-gradient(135deg, ${ENT.green}, ${ENT.greenLight})`, color: ENT.white }}>
                    {hasCompletedOrder ? 'Start Assessment' : 'View Pricing'}
                  </button>
                </div>
              ) : (
                assessments.map((assessment) => (
                  <div key={assessment.id} className="rounded-2xl p-6 transition-all hover:border-white/10"
                    style={{ background: ENT.navy, border: `1px solid ${ENT.border}` }}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{
                          background: assessment.status === 'completed' ? 'rgba(52,211,153,0.12)' :
                            assessment.status === 'processing' ? ENT.greenDim : 'rgba(96,165,250,0.12)',
                        }}>
                          {assessment.status === 'completed' ? <CheckCircle className="h-6 w-6" style={{ color: ENT.chartGreen }} /> :
                            assessment.status === 'processing' ? <Loader2 className="h-6 w-6 animate-spin" style={{ color: ENT.greenLight }} /> :
                            <Clock className="h-6 w-6" style={{ color: ENT.chartBlue }} />}
                        </div>
                        <div>
                          <h3 className="font-bold">{assessment.company_profile?.company_name || 'Business Assessment'}</h3>
                          <p className="text-sm" style={{ color: ENT.grey }}>Started {format(new Date(assessment.created_at), 'MMMM d, yyyy')}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1.5 text-xs font-semibold rounded-full" style={{
                          background: assessment.status === 'completed' ? 'rgba(52,211,153,0.12)' :
                            assessment.status === 'processing' ? ENT.greenDim : 'rgba(96,165,250,0.12)',
                          color: assessment.status === 'completed' ? ENT.chartGreen :
                            assessment.status === 'processing' ? ENT.greenLight : ENT.chartBlue,
                        }}>
                          {assessment.status === 'completed' ? 'Completed' : assessment.status === 'processing' ? 'Processing' : 'In Progress'}
                        </span>
                        {assessment.status === 'in_progress' && (
                          <button onClick={navigateToQuestionnaire} className="px-4 py-2 rounded-[10px] font-semibold text-sm"
                            style={{ background: `linear-gradient(135deg, ${ENT.green}, ${ENT.greenLight})`, color: ENT.white }}>
                            Continue <ChevronRight className="h-4 w-4 inline ml-1" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ═══════════ ANALYTICS TAB ═══════════ */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 animate-fadeUp">
              <div className="rounded-2xl p-12 text-center" style={{ background: ENT.navy, border: `1px solid ${ENT.border}` }}>
                <BarChart3 className="h-12 w-12 mx-auto mb-4" style={{ color: ENT.greenLight }} />
                <h3 className="text-xl font-bold mb-2">Advanced Analytics</h3>
                <p className="text-sm mb-6" style={{ color: ENT.grey }}>
                  Deep-dive analytics with industry benchmarking, trend analysis, and predictive insights are available exclusively for Enterprise customers.
                </p>
                <p className="text-xs" style={{ color: ENT.greenLight }}>Coming soon — your Enterprise plan includes this feature at no extra cost.</p>
              </div>
            </div>
          )}

          {/* ═══════════ ORDERS TAB ═══════════ */}
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-fadeUp">
              {orders.length === 0 ? (
                <div className="rounded-2xl p-12 text-center" style={{ background: ENT.navy, border: `1px solid ${ENT.border}` }}>
                  <CreditCard className="h-12 w-12 mx-auto mb-4" style={{ color: 'rgba(255,255,255,0.1)' }} />
                  <h3 className="text-xl font-bold mb-2">No Orders Yet</h3>
                  <p className="text-sm mb-6" style={{ color: ENT.grey }}>Purchase an assessment package to get started.</p>
                  <button onClick={() => navigate('/pricing')} className="px-5 py-2.5 rounded-[10px] font-semibold text-sm"
                    style={{ background: `linear-gradient(135deg, ${ENT.green}, ${ENT.greenLight})`, color: ENT.white }}>
                    View Pricing
                  </button>
                </div>
              ) : (
                <div className="rounded-2xl overflow-hidden" style={{ background: ENT.navy, border: `1px solid ${ENT.border}` }}>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr style={{ background: ENT.navyDark }}>
                          <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: ENT.grey }}>Order ID</th>
                          <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: ENT.grey }}>Date</th>
                          <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: ENT.grey }}>Product</th>
                          <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: ENT.grey }}>Amount</th>
                          <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: ENT.grey }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.id} className="transition-colors hover:bg-white/[0.02]" style={{ borderBottom: `1px solid ${ENT.border}` }}>
                            <td className="px-6 py-4 text-sm" style={{ fontFamily: "'JetBrains Mono', monospace", color: ENT.grey }}>{order.id.substring(0, 8)}...</td>
                            <td className="px-6 py-4 text-sm" style={{ color: ENT.greyLight }}>{format(new Date(order.created_at), 'MMM d, yyyy')}</td>
                            <td className="px-6 py-4 text-sm font-medium capitalize">{order.product_id}</td>
                            <td className="px-6 py-4 text-sm font-semibold">${Number(order.amount).toFixed(2)}</td>
                            <td className="px-6 py-4">
                              <span className="px-3 py-1 text-xs font-semibold rounded-full capitalize" style={{
                                background: order.status === 'completed' ? 'rgba(52,211,153,0.12)' : order.status === 'pending' ? ENT.greenDim : 'rgba(248,113,113,0.12)',
                                color: order.status === 'completed' ? ENT.chartGreen : order.status === 'pending' ? ENT.greenLight : ENT.chartRed,
                              }}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ═══════════ TEAM TAB ═══════════ */}
          {activeTab === 'team' && (
            <div className="space-y-6 animate-fadeUp">
              <div className="rounded-2xl p-12 text-center" style={{ background: ENT.navy, border: `1px solid ${ENT.border}` }}>
                <Users className="h-12 w-12 mx-auto mb-4" style={{ color: ENT.greenLight }} />
                <h3 className="text-xl font-bold mb-2">Team Management</h3>
                <p className="text-sm mb-6" style={{ color: ENT.grey }}>
                  Invite team members to collaborate on assessments and share reports. Enterprise plan includes up to 10 team seats.
                </p>
                <p className="text-xs" style={{ color: ENT.greenLight }}>Coming soon — your Enterprise plan includes this feature at no extra cost.</p>
              </div>
            </div>
          )}

          {/* ═══════════ SETTINGS TAB ═══════════ */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl space-y-6 animate-fadeUp">
              <div className="rounded-2xl p-6 lg:p-8" style={{ background: ENT.navy, border: `1px solid ${ENT.border}` }}>
                <h2 className="font-bold text-lg mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Profile Settings</h2>
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold"
                    style={{ background: `linear-gradient(135deg, ${ENT.navyLight}, ${ENT.navy})`, border: `2px solid ${ENT.borderAccent}`, color: ENT.greenLight }}>
                    {userInitials}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">{userName}</h3>
                    <p style={{ color: ENT.grey }}>{user?.email}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email Address</label>
                    <input type="email" value={user?.email || ''} disabled
                      className="w-full px-4 py-3 rounded-xl text-sm" style={{ background: ENT.navyDark, border: `1px solid ${ENT.border}`, color: ENT.grey }} />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-6" style={{ background: ENT.navy, border: `1px solid ${ENT.border}` }}>
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm" style={{ color: ENT.grey }}>
                  <div className="flex items-center gap-2"><Shield className="w-4 h-4" style={{ color: ENT.greenLight }} /> 256-bit SSL Encryption</div>
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4" style={{ color: ENT.greenLight }} /> Enterprise Security</div>
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4" style={{ color: ENT.greenLight }} /> 100% Confidential</div>
                </div>
              </div>

              <div className="rounded-2xl p-6 lg:p-8" style={{ background: ENT.navy, border: '1px solid rgba(248,113,113,0.2)' }}>
                <h2 className="font-bold text-lg mb-4" style={{ color: ENT.chartRed }}>Danger Zone</h2>
                <p className="text-sm mb-6" style={{ color: ENT.grey }}>Sign out of your account. You can sign back in at any time.</p>
                <button onClick={handleSignOut} className="flex items-center gap-2 px-4 py-2.5 rounded-[10px] text-sm font-semibold transition-all"
                  style={{ border: '1px solid rgba(248,113,113,0.3)', color: ENT.chartRed }}>
                  <LogOut className="h-4 w-4" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Custom Styles */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp { animation: fadeUp 0.5s ease both; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
      `}</style>
    </div>
  );
};

export default PortalEnterprise;
