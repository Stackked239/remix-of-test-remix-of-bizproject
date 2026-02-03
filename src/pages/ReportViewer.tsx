import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { 
  Loader2,
  ArrowLeft,
  Download,
  Printer,
  ExternalLink,
} from 'lucide-react';

interface Report {
  id: string;
  report_type: string;
  title: string;
  status: string;
  html_content: string | null;
  file_url: string | null;
  created_at: string;
}

const ReportViewer = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      if (!user || !reportId) return;

      try {
        const { data, error: fetchError } = await supabase
          .from('reports')
          .select('*')
          .eq('id', reportId)
          .eq('user_id', user.id)
          .single();

        if (fetchError) {
          setError('Report not found or access denied');
          return;
        }

        setReport(data as Report);
      } catch (err) {
        setError('Failed to load report');
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchReport();
    }
  }, [user, reportId]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login', { state: { from: `/report/${reportId}` } });
    }
  }, [user, authLoading, navigate, reportId]);

  const handleDownload = () => {
    if (!report) return;
    
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

  const handlePrint = () => {
    window.print();
  };

  const handleOpenNewTab = () => {
    if (!report?.html_content) return;
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(report.html_content);
      newWindow.document.close();
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-[#1e3a5f]" />
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <SEO title="Report Not Found - BizHealth.ai" description="The requested report could not be found." noindex={true} />
        <h1 className="text-2xl font-bold text-[#1e3a5f] mb-4">
          {error || 'Report not found'}
        </h1>
        <Button onClick={() => navigate('/portal')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <SEO 
        title={`${report.title} - BizHealth.ai`}
        description={`View your ${report.title} business assessment report.`}
        noindex={true}
      />
      
      {/* Header Bar */}
      <div className="bg-[#1e3a5f] text-white py-3 px-4 flex items-center justify-between print:hidden sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-white hover:bg-white/10"
            onClick={() => navigate('/portal')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <span className="text-white/50">|</span>
          <h1 className="font-semibold truncate max-w-md">{report.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-white hover:bg-white/10"
            onClick={handleOpenNewTab}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open in New Tab
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-white hover:bg-white/10"
            onClick={handlePrint}
          >
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-white hover:bg-white/10"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Report Content */}
      <div className="flex-1 bg-white">
        {report.html_content ? (
          <iframe
            srcDoc={report.html_content}
            className="w-full h-[calc(100vh-52px)] border-0"
            title={report.title}
            sandbox="allow-same-origin allow-scripts"
          />
        ) : report.file_url ? (
          <iframe
            src={report.file_url}
            className="w-full h-[calc(100vh-52px)] border-0"
            title={report.title}
          />
        ) : (
          <div className="flex items-center justify-center h-[calc(100vh-52px)]">
            <p className="text-gray-500">Report content not available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportViewer;
