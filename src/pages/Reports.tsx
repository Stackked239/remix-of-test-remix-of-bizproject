import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import PromotionalBanner from '@/components/PromotionalBanner';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from '@/components/GlobalFooter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  FileText,
  TrendingUp,
  Target,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  Download,
  DollarSign,
  Clock,
  BarChart3,
  Shield,
  Zap,
  Award,
  Plus
} from 'lucide-react';
import comprehensiveReportInterior from '@/assets/comprehensive-report-interior.jpg';
import comprehensiveReportRoiInfographic from '@/assets/comprehensive-report-roi-infographic.png';
import businessHealthReportSample from '@/assets/business-health-report-sample-new.jpg';

const Reports = () => {
  const [revenueSlider, setRevenueSlider] = useState(500000);
  const [selectedReports, setSelectedReports] = useState<string[]>([]);

  // Calculate ROI based on revenue slider
  const calculateROI = (revenue: number) => {
    const costSavings = Math.floor(revenue * 0.094); // 9.4% average
    const revenueOpportunities = Math.floor(revenue * 0.25); // 25% average
    const totalValue = costSavings + revenueOpportunities;
    const investment = 997; // Enterprise tier
    const roiMultiple = Math.floor(totalValue / investment);
    
    return { costSavings, revenueOpportunities, totalValue, roiMultiple };
  };

  const roi = calculateROI(revenueSlider);

  const toggleReportSelection = (reportId: string) => {
    setSelectedReports(prev => 
      prev.includes(reportId) 
        ? prev.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };

  const tierMapping: Array<{
    report: string;
    essentials: boolean | 'optional';
    growth: boolean | 'optional';
    enterprise: boolean | 'optional';
    alaCarte: string;
  }> = [
    {
      report: 'Comprehensive Report',
      essentials: true,
      growth: true,
      enterprise: true,
      alaCarte: 'Included'
    },
    {
      report: 'Owner\'s Report',
      essentials: true,
      growth: true,
      enterprise: true,
      alaCarte: 'Included'
    },
    {
      report: 'Executive Report',
      essentials: false,
      growth: 'optional',
      enterprise: 'optional',
      alaCarte: '$299'
    },
    {
      report: 'Managers\' Report',
      essentials: 'optional',
      growth: 'optional',
      enterprise: true,
      alaCarte: '$199 each'
    },
    {
      report: 'Employees\' Report',
      essentials: 'optional',
      growth: 'optional',
      enterprise: true,
      alaCarte: '$149'
    }
  ];

  return (
    <>
      <SEO
        title="Business Health Reports - Comprehensive Insights for SMBs"
        description="Discover our 5 tailored business health reports: Comprehensive, Executive, Owner's, Managers', and Employees' reports. Transform insights into action."
        keywords="business health reports, SMB diagnostics, comprehensive business analysis, executive reports, management reports, employee engagement reports"
        canonical="https://bizhealth.ai/reports"
        ogType="website"
        ogImage="https://bizhealth.ai/assets/bizhealth-logo-main.jpg"
      />

      <StructuredData
        type="service"
        name="Business Health Reports"
        description="Comprehensive business health diagnostic reports for SMBs including Executive, Owner's, Managers', Employees', and Comprehensive reports"
        provider="BizHealth.ai"
        areaServed="United States"
        url="https://bizhealth.ai/reports"
      />

      <div className="min-h-screen bg-background">
        <PromotionalBanner />
        <GlobalNavigation />

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-biz-navy via-biz-navy/95 to-biz-navy pt-40 pb-16 px-6 relative overflow-hidden" style={{ paddingTop: '180px' }}>
          <div className="absolute inset-0">
            <div className="absolute top-20 right-10 w-96 h-96 bg-biz-green/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-72 h-72 bg-biz-green/5 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="text-center space-y-6 mb-12">
              <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
                Discover Our Tailored Reports:
                <span className="text-biz-green block mt-2">Unlock Insights for Every Role</span>
              </h1>
              
              <p className="font-open-sans text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                From boardroom strategy to frontline execution - comprehensive business health insights designed for your team
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-biz-green hover:bg-biz-green/90 text-white font-montserrat font-semibold text-lg px-8 py-6"
                >
                  <Link to="/pricing">View Pricing Tiers</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-biz-navy font-montserrat font-semibold text-lg px-8 py-6 transition-all duration-300"
                >
                  <a href="#comprehensive-report">See Sample Reports</a>
                </Button>
              </div>
            </div>

            {/* Tier Mapping Table - Desktop */}
            <div className="hidden lg:block bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="font-montserrat font-bold text-2xl text-white mb-6 text-center">
                Report Availability by Tier
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-white">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-4 px-4 font-montserrat font-semibold">Report Type</th>
                      <th className="text-center py-4 px-4 font-montserrat font-semibold">Essentials</th>
                      <th className="text-center py-4 px-4 font-montserrat font-semibold">Growth</th>
                      <th className="text-center py-4 px-4 font-montserrat font-semibold">Enterprise</th>
                      <th className="text-center py-4 px-4 font-montserrat font-semibold">A La Carte</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tierMapping.map((row, index) => (
                      <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4 font-open-sans">
                          <a 
                            href={`#${row.report.toLowerCase().replace(/[']/g, '').replace(/\s+/g, '-')}`}
                            className="text-white hover:text-biz-lime transition-colors underline decoration-transparent hover:decoration-biz-lime"
                          >
                            {row.report}
                          </a>
                        </td>
                        <td className="text-center py-4 px-4">
                          {row.essentials === true ? <CheckCircle className="w-5 h-5 text-biz-lime mx-auto" /> : row.essentials === 'optional' ? <Plus className="w-5 h-5 text-yellow-400 mx-auto" /> : <span className="text-white/30">-</span>}
                        </td>
                        <td className="text-center py-4 px-4">
                          {row.growth === true ? <CheckCircle className="w-5 h-5 text-biz-lime mx-auto" /> : row.growth === 'optional' ? <Plus className="w-5 h-5 text-yellow-400 mx-auto" /> : <span className="text-white/30">-</span>}
                        </td>
                        <td className="text-center py-4 px-4">
                          {row.enterprise === true ? <CheckCircle className="w-5 h-5 text-biz-lime mx-auto" /> : row.enterprise === 'optional' ? <Plus className="w-5 h-5 text-yellow-400 mx-auto" /> : <span className="text-white/30">-</span>}
                        </td>
                        <td className="text-center py-4 px-4 font-semibold text-biz-lime">{row.alaCarte}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex items-center justify-center gap-6 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-biz-lime" />
                  <span>Included</span>
                </div>
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4 text-yellow-400" />
                  <span>Optional upgrade</span>
                </div>
              </div>
            </div>

            {/* Tier Mapping - Mobile Cards */}
            <div className="lg:hidden space-y-4">
              {tierMapping.map((row, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <h4 className="font-montserrat font-bold text-lg text-white mb-4">
                    <a 
                      href={`#${row.report.toLowerCase().replace(/[']/g, '').replace(/\s+/g, '-')}`}
                      className="text-white hover:text-biz-lime transition-colors underline decoration-transparent hover:decoration-biz-lime"
                    >
                      {row.report}
                    </a>
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Essentials:</span>
                      {row.essentials === true ? <CheckCircle className="w-4 h-4 text-biz-lime" /> : row.essentials === 'optional' ? <Plus className="w-4 h-4 text-yellow-400" /> : <span className="text-white/30">-</span>}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Growth:</span>
                      {row.growth === true ? <CheckCircle className="w-4 h-4 text-biz-lime" /> : row.growth === 'optional' ? <Plus className="w-4 h-4 text-yellow-400" /> : <span className="text-white/30">-</span>}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Enterprise:</span>
                      {row.enterprise === true ? <CheckCircle className="w-4 h-4 text-biz-lime" /> : row.enterprise === 'optional' ? <Plus className="w-4 h-4 text-yellow-400" /> : <span className="text-white/30">-</span>}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">A La Carte:</span>
                      <span className="text-biz-lime font-semibold">{row.alaCarte}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-6 flex items-center justify-center gap-6 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-biz-lime" />
                  <span>Included</span>
                </div>
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4 text-yellow-400" />
                  <span>Optional upgrade</span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Report Cards Section */}
        <section className="py-16 px-6 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-biz-navy mb-4">
                Five Reports, One Complete Picture
              </h2>
              <p className="font-open-sans text-lg text-biz-grey max-w-3xl mx-auto">
                Each report is designed for specific roles and decision-making needs. Expand to learn how each transforms your organization.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-6">
              {/* CARD 1: COMPREHENSIVE REPORT */}
              <AccordionItem value="comprehensive" id="comprehensive-report" className="border-2 border-amber-400 rounded-2xl overflow-hidden shadow-lg scroll-mt-40">
                <AccordionTrigger className="px-6 py-6 hover:no-underline bg-gradient-to-r from-amber-50 to-yellow-50 hover:from-amber-100 hover:to-yellow-100 transition-all">
                  <div className="flex items-start gap-4 w-full text-left">
                    <FileText className="w-8 h-8 text-amber-600 shrink-0 mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-montserrat font-bold text-xl md:text-2xl text-biz-navy">
                          Comprehensive Report - Your Complete Business Reference Library
                        </h3>
                        <span className="bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                          ALL TIERS
                        </span>
                      </div>
                      <p className="font-open-sans text-sm md:text-base text-biz-grey mb-2">
                        150-200 pages | The gold standard for business diagnostics
                      </p>
                      <div className="flex flex-wrap gap-3 text-xs md:text-sm text-biz-navy font-medium">
                        <span className="flex items-center gap-1">
                          <BarChart3 className="w-4 h-4" /> 12 business categories
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="w-4 h-4" /> 18-28 pages of benchmarks
                        </span>
                        <span className="flex items-center gap-1">
                          <Award className="w-4 h-4" /> Complete action roadmap
                        </span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-8 bg-white">
                  <div className="space-y-8 pt-6">
                    {/* Sample Report Image */}
                    <div className="rounded-xl overflow-hidden border border-gray-200 shadow-lg max-w-[800px] mx-auto">
                      <img
                        src={businessHealthReportSample}
                        alt="Comprehensive Business Health Assessment Report sample pages showing business category scores, critical status indicators, performance metrics, financial benchmarks, firm profile analysis, and strategic recommendations dashboard for small to medium businesses"
                        loading="lazy"
                        width="800"
                        height="300"
                        className="w-full h-auto"
                      />
                    </div>

                    {/* StoryBrand Narrative */}
                    <div className="bg-amber-50 rounded-xl p-6 space-y-4">
                      <h4 className="font-montserrat font-bold text-lg text-biz-navy">Your Strategic Challenge</h4>
                      <div className="space-y-3 font-open-sans text-biz-grey">
                        <p><strong className="text-biz-navy">The Problem:</strong> You're navigating complex business decisions—whether preparing for funding, planning M&A, or building strategic roadmaps—but lack the comprehensive intelligence that million-dollar consulting firms provide to large enterprises.</p>
                        <p><strong className="text-biz-navy">The Stakes:</strong> Without this depth of analysis, you risk missing critical interdependencies, overpaying for consultant advice, or making strategic bets based on incomplete information. The cost of one wrong strategic decision can exceed $100K.</p>
                        <p><strong className="text-biz-navy">The Guide (That's Us):</strong> BizHealth.ai brings Fortune 500-level business diagnostics to ambitious SMBs. We've condensed decades of consulting expertise into an accessible, comprehensive framework.</p>
                        <p><strong className="text-biz-navy">The Plan:</strong> Our 150-200 page Comprehensive Report becomes your organization's strategic foundation—the single source of truth that unifies leadership, informs investors, and guides transformation.</p>
                        <p><strong className="text-amber-700 font-semibold">The Success:</strong> Imagine having instant access to consulting-grade analysis across all 12 business pillars, complete with benchmarks, scenario planning, and prioritized recommendations—all for less than a single consultant's week.</p>
                      </div>
                    </div>

                    {/* Overview */}
                    <div>
                      <h4 className="font-montserrat font-bold text-lg text-biz-navy mb-3">Overview</h4>
                      <p className="font-open-sans text-biz-grey">
                        The Comprehensive Report is your organization's definitive business health encyclopedia - a 150-200 page professional deliverable that mirrors top-tier consulting firm standards. This is the foundation document that all other reports reference.
                      </p>
                    </div>

                    {/* Interior Image */}
                    <div className="rounded-xl overflow-hidden border border-gray-200 shadow-md max-w-[1000px] mx-auto">
                      <img 
                        src={comprehensiveReportInterior} 
                        alt="Comprehensive Business Health Assessment Report showing Strategy Performance Analysis dashboard with business dimensions, category scores, implementation approach timeline, and performance metrics benchmarking" 
                        loading="lazy"
                        width="1000"
                        height="500"
                        className="w-full h-auto"
                      />
                    </div>

                    {/* What's Inside */}
                    <div>
                      <h4 className="font-montserrat font-bold text-lg text-biz-navy mb-3">What's Inside</h4>
                      <ul className="space-y-2 font-open-sans text-biz-grey">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0 mt-0.5" />
                          <span><strong>Executive Summary</strong> (6-8 pages): High-level findings, heatmap overview, major strengths/risks</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0 mt-0.5" />
                          <span><strong>Company Dashboard</strong> (3-5 pages): Visual scorecards across all 12 business elements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0 mt-0.5" />
                          <div>
                            <strong>12 Deep-Dive Category Analyses</strong> (96-120 pages):
                            <ul className="ml-4 mt-2 space-y-1">
                              <li>• Strategy & Vision</li>
                              <li>• Sales Performance</li>
                              <li>• Marketing Effectiveness</li>
                              <li>• Customer Experience</li>
                              <li>• Operations & Efficiency</li>
                              <li>• Financial Health</li>
                              <li>• Human Resources</li>
                              <li>• Leadership & Governance</li>
                              <li>• Technology & Innovation</li>
                              <li>• IT, Data Management & Systems</li>
                              <li>• Risk Management & Sustainability</li>
                              <li>• Compliance & Legal</li>
                            </ul>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0 mt-0.5" />
                          <span><strong>Interdependency Synthesis</strong> (12-16 pages): Cross-category analysis, composite risk/opportunity maps</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0 mt-0.5" />
                          <span><strong>Benchmarks & Appendices</strong> (18-28 pages): Industry peer data, methodology, scoring rubrics</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0 mt-0.5" />
                          <span><strong>Action Roadmap</strong> (8-12 pages): Prioritized recommendations with Gantt charts</span>
                        </li>
                      </ul>
                    </div>

                    {/* Key Features */}
                    <div className="bg-biz-accent rounded-xl p-6">
                      <h4 className="font-montserrat font-bold text-lg text-biz-navy mb-4">Key Features</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0" />
                          <span className="font-open-sans text-sm text-biz-grey">Serves as reference library for all other reports</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0" />
                          <span className="font-open-sans text-sm text-biz-grey">Industry benchmark comparisons across 12 categories</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0" />
                          <span className="font-open-sans text-sm text-biz-grey">Professional consulting-grade deliverable</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0" />
                          <span className="font-open-sans text-sm text-biz-grey">Scenario planning and what-if modeling</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0" />
                          <span className="font-open-sans text-sm text-biz-grey">Complete methodology transparency</span>
                        </div>
                      </div>
                    </div>

                    {/* Value Proposition */}
                    <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl p-6 border-l-4 border-amber-600">
                      <p className="font-montserrat font-bold text-xl text-biz-navy mb-2">
                        Worth $5,000+ in traditional consulting fees
                      </p>
                      <p className="font-open-sans text-biz-grey">
                        Provides the analytical foundation for strategic planning, investor presentations, and acquisition due diligence.
                      </p>
                    </div>

                    {/* Transformation */}
                    <div>
                      <h4 className="font-montserrat font-bold text-lg text-biz-navy mb-3">How It Transforms Your Organization</h4>
                      <ul className="space-y-2 font-open-sans text-biz-grey">
                        <li className="flex items-start gap-2">
                          <Zap className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                          <span>Board meetings become strategic instead of reactive</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                          <span>Investor conversations backed by comprehensive data</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                          <span>M&A due diligence moves 3x faster with ready analysis</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                          <span>Leadership alignment around shared source of truth</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                          <span>Confidence in every major strategic decision</span>
                        </li>
                      </ul>
                    </div>

                    {/* Ideal For */}
                    <div>
                      <h4 className="font-montserrat font-bold text-lg text-biz-navy mb-3">Ideal For</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 text-biz-grey">
                          <Target className="w-5 h-5 text-amber-600 shrink-0" />
                          <span className="font-open-sans text-sm">Businesses preparing for funding rounds or M&A</span>
                        </div>
                        <div className="flex items-center gap-2 text-biz-grey">
                          <Target className="w-5 h-5 text-amber-600 shrink-0" />
                          <span className="font-open-sans text-sm">Companies seeking comprehensive strategic planning resources</span>
                        </div>
                        <div className="flex items-center gap-2 text-biz-grey">
                          <Target className="w-5 h-5 text-amber-600 shrink-0" />
                          <span className="font-open-sans text-sm">Organizations wanting complete benchmark visibility</span>
                        </div>
                        <div className="flex items-center gap-2 text-biz-grey">
                          <Target className="w-5 h-5 text-amber-600 shrink-0" />
                          <span className="font-open-sans text-sm">Leadership teams needing detailed category analyses</span>
                        </div>
                      </div>
                    </div>

                    {/* ROI Highlight */}
                    <div 
                      className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center relative overflow-hidden"
                      style={{
                        backgroundImage: `url(${comprehensiveReportRoiInfographic})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    >
                      {/* Faint overlay to make background subtle */}
                      <div className="absolute inset-0 bg-gray-100/90"></div>
                      
                      {/* Content */}
                      <div className="relative z-10">
                        <DollarSign className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600 font-semibold mb-2">comprehensive-report-roi.png</p>
                        <p className="text-sm text-gray-500 mb-4">800 × 400px - Infographic showing ROI breakdown and value delivery timeline</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 max-w-md mx-auto relative z-10">
                        <p className="font-montserrat font-bold text-biz-navy text-lg mb-2">
                          Average Impact in Year 1
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <p className="text-2xl font-bold text-biz-green">$47K</p>
                            <p className="text-xs text-biz-grey">Cost Savings</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-biz-green">$125K</p>
                            <p className="text-xs text-biz-grey">Revenue Opportunities</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button
                        asChild
                        size="lg"
                        className="bg-amber-600 hover:bg-amber-700 text-white font-montserrat font-semibold flex-1"
                      >
                        <Link to="/pricing">Upgrade to Enterprise</Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-amber-600 text-amber-600 hover:bg-amber-50 font-montserrat font-semibold flex-1"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Sample Pages
                      </Button>
                    </div>

                    {/* Upsell Messaging */}
                    <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-4">
                      <p className="font-open-sans text-sm text-biz-grey">
                        <strong className="text-blue-600">Not ready for Enterprise?</strong> The Owner's Report references this comprehensive analysis - see details below ↓
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* CARD 2: OWNER'S REPORT */}
              <AccordionItem value="owners" id="owners-report" className="border-2 border-emerald-400 rounded-2xl overflow-hidden shadow-lg scroll-mt-40">
                <AccordionTrigger className="px-6 py-6 hover:no-underline bg-gradient-to-r from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100 transition-all">
                  <div className="flex items-start gap-4 w-full text-left">
                    <Target className="w-8 h-8 text-emerald-600 shrink-0 mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="font-montserrat font-bold text-xl md:text-2xl text-biz-navy">
                          Owner's Report - Your Day-to-Day Playbook
                        </h3>
                        <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                          ALL TIERS
                        </span>
                      </div>
                      <p className="font-open-sans text-sm md:text-base text-biz-grey mb-2">
                        35-55 pages | Actionable insights for 90-180 day wins
                      </p>
                      <div className="flex flex-wrap gap-3 text-xs md:text-sm text-biz-navy font-medium">
                        <span className="flex items-center gap-1">
                          <BarChart3 className="w-4 h-4" /> 12 category overviews
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="w-4 h-4" /> Prioritized action plan
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" /> 90/180/365-day roadmap
                        </span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-8 bg-white">
                  <div className="space-y-8 pt-6">
                    {/* Image Placeholder */}
                    <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                      <Target className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 font-semibold mb-2">owners-report-sample.png</p>
                      <p className="text-sm text-gray-500">800 × 600px - Owner's Report cover and sample action plan page</p>
                    </div>

                    {/* StoryBrand Narrative */}
                    <div className="bg-emerald-50 rounded-xl p-6 space-y-4">
                      <h4 className="font-montserrat font-bold text-lg text-biz-navy">Your Daily Reality</h4>
                      <div className="space-y-3 font-open-sans text-biz-grey">
                        <p><strong className="text-biz-navy">The Problem:</strong> You're juggling a thousand priorities with limited resources and no clear roadmap. Every business book promises transformation, but none tell you what to do <em>first</em> in <em>your</em> specific situation.</p>
                        <p><strong className="text-biz-navy">The Stakes:</strong> Scattered focus leads to mediocre results everywhere. Team members pull in different directions. Opportunities fade while you fight fires. The business plateaus while you work harder, not smarter.</p>
                        <p><strong className="text-biz-navy">The Guide (That's Us):</strong> BizHealth.ai acts as your experienced mentor, cutting through the noise to show you exactly where to focus for maximum impact with your available resources.</p>
                        <p><strong className="text-biz-navy">The Plan:</strong> Our 35-55 page Owner's Report prioritizes your next 90 days with surgical precision—the 3-5 moves that will create momentum and compound results.</p>
                        <p><strong className="text-emerald-700 font-semibold">The Success:</strong> Imagine waking up with clarity about today's priorities, confident you're building momentum toward transformation. Your team aligned. Your energy focused. Your business growing sustainably.</p>
                      </div>
                    </div>

                    {/* Overview */}
                    <div>
                      <h4 className="font-montserrat font-bold text-lg text-biz-navy mb-3">Overview</h4>
                      <p className="font-open-sans text-biz-grey">
                        The Owner's Report bridges strategic vision and tactical execution - your personal playbook for what matters most, where to act, and how to realize measurable gains in 90-180 days.
                      </p>
                    </div>

                    {/* Interior Image */}
                    <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                      <Target className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 font-semibold mb-2">owners-report-interior.png</p>
                      <p className="text-sm text-gray-500">1200 × 600px - Two-page spread showing Impact/Effort Matrix and 90-Day Action Plan</p>
                    </div>

                    {/* What's Inside */}
                    <div>
                      <h4 className="font-montserrat font-bold text-lg text-biz-navy mb-3">What's Inside</h4>
                      <ul className="space-y-2 font-open-sans text-biz-grey">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0 mt-0.5" />
                          <span><strong>Executive Summary</strong> (3-4 pages): Overall health, heatmap, top 10 moves with quick-win tags</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0 mt-0.5" />
                          <span><strong>Company Snapshot & Dashboard</strong> (4 pages): Tile scorecards, category radar, trend comparisons</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0 mt-0.5" />
                          <span><strong>12 Category Overviews</strong> (14-24 pages): 1-2 pages per business pillar with current score vs benchmarks, 3 quick wins per category, cross-references to Comprehensive Report (Enterprise)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0 mt-0.5" />
                          <span><strong>Interdependencies</strong> (2 pages): Cross-category effects and flywheels</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0 mt-0.5" />
                          <span><strong>Risk/Compliance</strong> (2 pages): Top gaps and mitigations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0 mt-0.5" />
                          <span><strong>Prioritized Roadmap</strong> (6-8 pages): Impact/effort matrix, sequenced plan with owners and timelines</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0 mt-0.5" />
                          <span><strong>Benchmarks Summary</strong> (2-3 pages): Industry positioning overview</span>
                        </li>
                      </ul>
                    </div>

                    {/* Key Features */}
                    <div className="bg-biz-accent rounded-xl p-6">
                      <h4 className="font-montserrat font-bold text-lg text-biz-navy mb-4">Key Features</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0" />
                          <span className="font-open-sans text-sm text-biz-grey">Optimized for skimmability with visual economy</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0" />
                          <span className="font-open-sans text-sm text-biz-grey">Plain language with empathetic, owner-centric tone</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0" />
                          <span className="font-open-sans text-sm text-biz-grey">Hyperlinked to Comprehensive Report sections (Enterprise)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0" />
                          <span className="font-open-sans text-sm text-biz-grey">Impact/effort prioritization matrix</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0" />
                          <span className="font-open-sans text-sm text-biz-grey">Timeline-based implementation guidance</span>
                        </div>
                      </div>
                    </div>

                    {/* Value Proposition */}
                    <div className="bg-gradient-to-r from-emerald-100 to-green-100 rounded-xl p-6 border-l-4 border-emerald-600">
                      <p className="font-montserrat font-bold text-xl text-biz-navy mb-2">
                        Your trusted mentor in document form
                      </p>
                      <p className="font-open-sans text-biz-grey">
                        Focuses on constraints and quick wins while building toward long-term transformation.
                      </p>
                    </div>

                    {/* Transformation */}
                    <div>
                      <h4 className="font-montserrat font-bold text-lg text-biz-navy mb-3">How It Transforms Your Daily Reality</h4>
                      <ul className="space-y-2 font-open-sans text-biz-grey">
                        <li className="flex items-start gap-2">
                          <Zap className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>Morning clarity replaces overwhelm</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>Team conversations focus on priorities that matter</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>90-day sprints create visible momentum</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>Customer and employee confidence grow as they see improvements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>Business growth becomes sustainable, not exhausting</span>
                        </li>
                      </ul>
                    </div>

                    {/* Timeline Visual */}
                    <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                      <Clock className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 font-semibold mb-2">owners-report-timeline.png</p>
                      <p className="text-sm text-gray-500">1000 × 500px - 90/180/365-day timeline roadmap with key milestones</p>
                    </div>

                    {/* ROI Highlight */}
                    <div className="bg-white rounded-xl p-6 border-2 border-emerald-200">
                      <p className="font-montserrat font-bold text-biz-navy text-lg mb-3 text-center">
                        Owner-Operator Success Metrics
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-3xl font-bold text-emerald-600">3.2x</p>
                          <p className="text-sm text-biz-grey">Faster implementation</p>
                        </div>
                        <div>
                          <p className="text-3xl font-bold text-emerald-600">20-25x</p>
                          <p className="text-sm text-biz-grey">ROI on investment</p>
                        </div>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button
                        asChild
                        size="lg"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-montserrat font-semibold flex-1"
                      >
                        <Link to="/register">Start Your Assessment</Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-montserrat font-semibold flex-1"
                      >
                        Compare Report Types
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* CARD 3: EXECUTIVE REPORT */}
              <AccordionItem value="executive" id="executive-report" className="border-2 border-blue-400 rounded-2xl overflow-hidden shadow-lg scroll-mt-40">
                <AccordionTrigger className="px-6 py-6 hover:no-underline bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all">
                  <div className="flex items-start gap-4 w-full text-left">
                    <TrendingUp className="w-8 h-8 text-blue-600 shrink-0 mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="font-montserrat font-bold text-xl md:text-2xl text-biz-navy">
                          Executive Report - Strategic Overview for Leadership
                        </h3>
                        <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                          Optional Upgrade
                        </span>
                      </div>
                      <p className="font-open-sans text-sm md:text-base text-biz-grey mb-2">
                        10-15 pages | Boardroom-ready strategic insights
                      </p>
                      <div className="flex flex-wrap gap-3 text-xs md:text-sm text-biz-navy font-medium">
                        <span className="flex items-center gap-1">
                          <BarChart3 className="w-4 h-4" /> High-level scorecards
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="w-4 h-4" /> Top 5-7 priorities
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" /> Clear ROI estimates
                        </span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-8 bg-white">
                  <div className="space-y-8 pt-6">
                    {/* Image Placeholder */}
                    <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                      <TrendingUp className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 font-semibold mb-2">executive-report-sample.png</p>
                      <p className="text-sm text-gray-500">800 × 600px - Executive Report cover and sample dashboard page</p>
                    </div>

                    {/* StoryBrand Narrative */}
                    <div className="bg-blue-50 rounded-xl p-6 space-y-4">
                      <h4 className="font-montserrat font-bold text-lg text-biz-navy">Your Leadership Challenge</h4>
                      <div className="space-y-3 font-open-sans text-biz-grey">
                        <p><strong className="text-biz-navy">The Problem:</strong> You're drowning in operational details when you need to focus on strategy. Board meetings require preparation you don't have time for. Investors ask questions you can't answer with confidence.</p>
                        <p><strong className="text-biz-navy">The Stakes:</strong> Strategic opportunities slip away while you're stuck in tactical weeds. Board members question leadership direction. Investor confidence wavers without clear performance visibility.</p>
                        <p><strong className="text-biz-navy">The Guide (That's Us):</strong> BizHealth.ai distills complex business data into executive-ready insights, giving you the clarity and confidence of a seasoned advisor in your back pocket.</p>
                        <p><strong className="text-biz-navy">The Plan:</strong> Our 10-15 page Executive Report delivers boardroom-ready intelligence in the format busy leaders need—scannable, strategic, and action-oriented.</p>
                        <p><strong className="text-blue-700 font-semibold">The Success:</strong> Walk into your next board meeting with data-backed confidence. Make strategic decisions in minutes, not days. Command the room with insights that demonstrate leadership mastery.</p>
                      </div>
                    </div>

                    {/* Overview */}
                    <div>
                      <h4 className="font-montserrat font-bold text-lg text-biz-navy mb-3">Overview</h4>
                      <p className="font-open-sans text-biz-grey">
                        A succinct, strategic resource tailored for C-suite executives, board members, and stakeholders. Delivers high-level insights with actionable next steps in a format optimized for time-constrained decision-makers.
                      </p>
                    </div>

                    {/* Interior Image */}
                    <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                      <TrendingUp className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 font-semibold mb-2">executive-report-interior.png</p>
                      <p className="text-sm text-gray-500">1200 × 600px - Two-page spread showing Executive Summary and Strategic Scorecard</p>
                    </div>

                    {/* What's Inside */}
                    <div>
                      <h4 className="font-montserrat font-bold text-lg text-biz-navy mb-3">What's Inside</h4>
                      <ul className="space-y-2 font-open-sans text-biz-grey">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0 mt-0.5" />
                          <span><strong>Executive Summary</strong> (1-2 pages): Overall scores, top strengths/risks, 3 transformative recommendations with ROI</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0 mt-0.5" />
                          <span><strong>Category Summaries</strong> (6-8 pages): At-a-glance scorecards for Strategy, Sales, Operations, Financials, etc.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0 mt-0.5" />
                          <span><strong>Comparative Analysis</strong> (1 page): Industry/stage benchmarks</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0 mt-0.5" />
                          <span><strong>Top Risks & Opportunities</strong> (2 pages): 5-7 prioritized issues with heatmaps</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0 mt-0.5" />
                          <span><strong>Action Plan & Resources</strong> (1 page): Timeline, next steps, template links</span>
                        </li>
                      </ul>
                    </div>

                    {/* Key Features */}
                    <div className="bg-biz-accent rounded-xl p-6">
                      <h4 className="font-montserrat font-bold text-lg text-biz-navy mb-4">Key Features</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0" />
                          <span className="font-open-sans text-sm text-biz-grey">References Comprehensive Report for drilldown details (Enterprise tier)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0" />
                          <span className="font-open-sans text-sm text-biz-grey">Mobile-optimized for reading on-the-go</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0" />
                          <span className="font-open-sans text-sm text-biz-grey">Crisp infographics and visual dashboards</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0" />
                          <span className="font-open-sans text-sm text-biz-grey">Hyperlinked for instant navigation</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0" />
                          <span className="font-open-sans text-sm text-biz-grey">Secure PDF with embedded assets</span>
                        </div>
                      </div>
                    </div>

                    {/* Value Proposition */}
                    <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl p-6 border-l-4 border-blue-600">
                      <p className="font-montserrat font-bold text-xl text-biz-navy mb-2">
                        Saves executives 10+ hours of analysis time
                      </p>
                      <p className="font-open-sans text-biz-grey">
                        Perfect for board presentations and strategic planning sessions.
                      </p>
                    </div>

                    {/* Transformation */}
                    <div>
                      <h4 className="font-montserrat font-bold text-lg text-biz-navy mb-3">How It Transforms Your Leadership</h4>
                      <ul className="space-y-2 font-open-sans text-biz-grey">
                        <li className="flex items-start gap-2">
                          <Zap className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                          <span>Board prep time reduced from 8 hours to 45 minutes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                          <span>Strategic decisions made with data-backed confidence</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                          <span>Investor conversations become partnership discussions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                          <span>Leadership team aligned around shared priorities</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                          <span>More time for strategic thinking, less time gathering data</span>
                        </li>
                      </ul>
                    </div>

                    {/* ROI Highlight */}
                    <div className="bg-white rounded-xl p-6 border-2 border-blue-200">
                      <p className="font-montserrat font-bold text-biz-navy text-lg mb-3 text-center">
                        Executive Impact Metrics
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-3xl font-bold text-blue-600">40%</p>
                          <p className="text-sm text-biz-grey">Faster strategic decisions</p>
                        </div>
                        <div>
                          <p className="text-3xl font-bold text-blue-600">25%</p>
                          <p className="text-sm text-biz-grey">Higher confidence in outcomes</p>
                        </div>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button
                        asChild
                        size="lg"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-montserrat font-semibold flex-1"
                      >
                        <Link to="/pricing">Get Started - All Tiers</Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-blue-600 text-blue-600 hover:bg-blue-50 font-montserrat font-semibold flex-1"
                      >
                        See Sample Report
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* CARD 4: MANAGERS' REPORT */}
              <AccordionItem value="managers" id="managers-report" className="border-2 border-orange-400 rounded-2xl overflow-hidden shadow-lg scroll-mt-40">
                <AccordionTrigger className="px-6 py-6 hover:no-underline bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 transition-all">
                  <div className="flex items-start gap-4 w-full text-left">
                    <Users className="w-8 h-8 text-orange-600 shrink-0 mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="font-montserrat font-bold text-xl md:text-2xl text-biz-navy">
                          Managers' Report - Operational Excellence Toolkit
                        </h3>
                        <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                          ENTERPRISE
                        </span>
                        <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                          Optional Upgrade
                        </span>
                      </div>
                      <p className="font-open-sans text-sm md:text-base text-biz-grey mb-2">
                        6-10 pages | Department-focused action plans
                      </p>
                      <div className="flex flex-wrap gap-3 text-xs md:text-sm text-biz-navy font-medium">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" /> Team implementation plans
                        </span>
                        <span className="flex items-center gap-1">
                          <BarChart3 className="w-4 h-4" /> Department benchmarks
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="w-4 h-4" /> Quick-reference visuals
                        </span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-8 bg-white">
                  <div className="space-y-8 pt-6">
                    {/* Image Placeholder */}
                    <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                      <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 font-semibold mb-2">managers-report-sample.png</p>
                      <p className="text-sm text-gray-500">800 × 600px - Managers' Report cover and sample department scorecard</p>
                    </div>

                    {/* StoryBrand Narrative */}
                    <div className="bg-orange-50 rounded-xl p-6 space-y-4">
                      <h4 className="font-montserrat font-bold text-lg text-biz-navy">Your Management Challenge</h4>
                      <div className="space-y-3 font-open-sans text-biz-grey">
                        <p><strong className="text-biz-navy">The Problem:</strong> Leadership hands you ambitious goals but no roadmap for how your team should get there. You're caught between strategy and execution with no clear bridge connecting them.</p>
                        <p><strong className="text-biz-navy">The Stakes:</strong> Your team works hard but lacks direction. Metrics feel arbitrary without context. Initiatives fail because everyone interprets priorities differently. Team morale suffers from unclear wins.</p>
                        <p><strong className="text-biz-navy">The Guide (That's Us):</strong> BizHealth.ai translates high-level strategy into department-specific action plans, giving managers the clarity and tools to lead teams effectively.</p>
                        <p><strong className="text-biz-navy">The Plan:</strong> Our 6-10 page Managers' Report breaks down organizational goals into your department's specific priorities, benchmarks, and action steps.</p>
                        <p><strong className="text-orange-700 font-semibold">The Success:</strong> Lead team meetings with confidence, knowing exactly what matters and why. Watch your team align around clear priorities. Celebrate wins you can measure. Build the high-performing team you've always envisioned.</p>
                      </div>
                    </div>

                    {/* Overview */}
                    <div>
                      <h4 className="font-montserrat font-bold text-lg text-biz-navy mb-3">Overview</h4>
                      <p className="font-open-sans text-biz-grey">
                        A concise, actionable toolkit for mid-level managers and team leaders, designed to drive operational improvements, team alignment, and department-level results.
                      </p>
                    </div>

                    {/* Interior Image */}
                    <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                      <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 font-semibold mb-2">managers-report-interior.png</p>
                      <p className="text-sm text-gray-500">1200 × 600px - Two-page spread showing Department Scorecard and Implementation Checklist</p>
                    </div>

                    {/* What's Inside */}
                    <div>
                      <h4 className="font-montserrat font-bold text-lg text-biz-navy mb-3">What's Inside</h4>
                      <ul className="space-y-2 font-open-sans text-biz-grey">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0 mt-0.5" />
                          <span><strong>Manager Overview</strong> (1 page): Company health snapshot, top strengths, team opportunities</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0 mt-0.5" />
                          <span><strong>Category Highlights</strong> (3-5 pages): Key departmental metrics (Operations, Sales, HR) with simplified scores and benchmarks, department-specific impacts, action icons and quick-scan info</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0 mt-0.5" />
                          <span><strong>Team Implementation Plan</strong> (1-2 pages): 3-5 prioritized actions with delegation mapping (who does what), timelines and milestones, projected outcomes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0 mt-0.5" />
                          <span><strong>Motivational Close & Resources</strong> (1 page): Encouraging summary, template links, reassessment prompts</span>
                        </li>
                      </ul>
                    </div>

                    {/* Key Features */}
                    <div className="bg-biz-accent rounded-xl p-6">
                      <h4 className="font-montserrat font-bold text-lg text-biz-navy mb-4">Key Features</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0" />
                          <span className="font-open-sans text-sm text-biz-grey">Checklist infographics for team execution</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0" />
                          <span className="font-open-sans text-sm text-biz-grey">Bar charts showing department vs benchmark performance</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0" />
                          <span className="font-open-sans text-sm text-biz-grey">Timeline snippets for implementation tracking</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0" />
                          <span className="font-open-sans text-sm text-biz-grey">Shareable PDF optimized for team distribution</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0" />
                          <span className="font-open-sans text-sm text-biz-grey">Mobile-responsive for field managers</span>
                        </div>
                      </div>
                    </div>

                    {/* Value Proposition */}
                    <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl p-6 border-l-4 border-orange-600">
                      <p className="font-montserrat font-bold text-xl text-biz-navy mb-2">
                        Bridges strategy and daily practice
                      </p>
                      <p className="font-open-sans text-biz-grey">
                        Transforms high-level insights into team-executable actions.
                      </p>
                    </div>

                    {/* Transformation */}
                    <div>
                      <h4 className="font-montserrat font-bold text-lg text-biz-navy mb-3">How It Transforms Your Team Leadership</h4>
                      <ul className="space-y-2 font-open-sans text-biz-grey">
                        <li className="flex items-start gap-2">
                          <Zap className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                          <span>Team meetings become focused and productive</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                          <span>Every team member knows their role in company success</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                          <span>Department metrics improve measurably within 90 days</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                          <span>Recognition becomes data-driven and meaningful</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                          <span>Your leadership credibility soars as team sees results</span>
                        </li>
                      </ul>
                    </div>

                    {/* Delegation Image */}
                    <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                      <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 font-semibold mb-2">managers-report-delegation.png</p>
                      <p className="text-sm text-gray-500">800 × 400px - Implementation timeline with delegation map showing team responsibilities</p>
                    </div>

                    {/* ROI Highlight */}
                    <div className="bg-white rounded-xl p-6 border-2 border-orange-200">
                      <p className="font-montserrat font-bold text-biz-navy text-lg mb-3 text-center">
                        Team Performance Impact
                      </p>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-orange-600">35%</p>
                        <p className="text-sm text-biz-grey">Improvement in operational metrics within 90 days</p>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button
                        asChild
                        size="lg"
                        className="bg-orange-600 hover:bg-orange-700 text-white font-montserrat font-semibold flex-1"
                      >
                        <Link to="/pricing">Upgrade to Enterprise</Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-orange-600 text-orange-600 hover:bg-orange-50 font-montserrat font-semibold flex-1"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Sample Pages
                      </Button>
                    </div>

                    {/* Upsell */}
                    <div className="bg-blue-50 border-l-4 border-orange-600 rounded-r-xl p-4">
                      <p className="font-open-sans text-sm text-biz-grey">
                        <strong className="text-orange-600">Included in Enterprise tier</strong> - available as an optional upgrade for Essentials & Growth tiers to empower your management team with tailored operational insights.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* CARD 5: EMPLOYEES' REPORT */}
              <AccordionItem value="employees" id="employees-report" className="border-2 border-purple-400 rounded-2xl overflow-hidden shadow-lg scroll-mt-40">
                <AccordionTrigger className="px-6 py-6 hover:no-underline bg-gradient-to-r from-purple-50 to-violet-50 hover:from-purple-100 hover:to-violet-100 transition-all">
                  <div className="flex items-start gap-4 w-full text-left">
                    <Star className="w-8 h-8 text-purple-600 shrink-0 mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="font-montserrat font-bold text-xl md:text-2xl text-biz-navy">
                          Employees' Report - Celebrate Wins & Drive Engagement
                        </h3>
                        <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                          ENTERPRISE
                        </span>
                        <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                          Optional Upgrade
                        </span>
                      </div>
                      <p className="font-open-sans text-sm md:text-base text-biz-grey mb-2">
                        4-6 pages | Motivational insights for all team members
                      </p>
                      <div className="flex flex-wrap gap-3 text-xs md:text-sm text-biz-navy font-medium">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4" /> Team strengths
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" /> Growth ideas
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" /> Upcoming improvements
                        </span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-8 bg-white">
                  <div className="space-y-8 pt-6">
                    {/* Image Placeholder */}
                    <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                      <Star className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 font-semibold mb-2">employees-report-sample.png</p>
                      <p className="text-sm text-gray-500">800 × 600px - Employees' Report cover and sample team strengths page</p>
                    </div>

                    {/* StoryBrand Narrative */}
                    <div className="bg-purple-50 rounded-xl p-6 space-y-4">
                      <h4 className="font-montserrat font-bold text-lg text-biz-navy">Your Team's Engagement Challenge</h4>
                      <div className="space-y-3 font-open-sans text-biz-grey">
                        <p><strong className="text-biz-navy">The Problem:</strong> Your team shows up every day but doesn't see how their work connects to company success. Engagement surveys reveal confusion about direction and lack of recognition for contributions.</p>
                        <p><strong className="text-biz-navy">The Stakes:</strong> Disengaged employees cost you 34% of their salary in lost productivity. Turnover accelerates. Your best people leave for companies where they feel valued and understand their impact.</p>
                        <p><strong className="text-biz-navy">The Guide (That's Us):</strong> BizHealth.ai helps you communicate company health and team contributions in a way that builds pride, clarity, and commitment across your entire workforce.</p>
                        <p><strong className="text-biz-navy">The Plan:</strong> Our 4-6 page Employees' Report celebrates team strengths, explains "how we're doing," and shows every team member their role in company success.</p>
                        <p><strong className="text-purple-700 font-semibold">The Success:</strong> Transform your workforce into engaged advocates who understand the mission, celebrate wins together, and take ownership of improvement opportunities. Build the culture that retains top talent.</p>
                      </div>
                    </div>

                    {/* Overview */}
                    <div>
                      <h4 className="font-montserrat font-bold text-lg text-biz-navy mb-3">Overview</h4>
                      <p className="font-open-sans text-biz-grey">
                        An engaging, motivational document crafted to celebrate team strengths, share company wins, and provide accessible, actionable ideas for everyday growth.
                      </p>
                    </div>

                    {/* Interior Image */}
                    <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                      <Star className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 font-semibold mb-2">employees-report-interior.png</p>
                      <p className="text-sm text-gray-500">1200 × 600px - Two-page spread showing Team Strengths Celebration and Growth Ideas</p>
                    </div>

                    {/* What's Inside */}
                    <div>
                      <h4 className="font-montserrat font-bold text-lg text-biz-navy mb-3">What's Inside</h4>
                      <ul className="space-y-2 font-open-sans text-biz-grey">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0 mt-0.5" />
                          <span><strong>Welcome/Introduction</strong> (0.5-1 page): Team appreciation, company wins, friendly greeting</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0 mt-0.5" />
                          <span><strong>Our Strengths</strong> (1-1.5 pages): Team achievements, cultural strengths, shout-outs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0 mt-0.5" />
                          <span><strong>Comparative Highlights</strong> (1 page): Plain-language benchmarks showing "how we stack up"</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0 mt-0.5" />
                          <span><strong>Growth Ideas</strong> (1 page): 3-5 action points for team improvement with friendly how-tos</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0 mt-0.5" />
                          <span><strong>Improvements Ahead</strong> (1 page): Process/communication/tool upgrades coming soon</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0 mt-0.5" />
                          <span><strong>Closing Motivation</strong> (0.5 page): Appreciation, motivational quotes, feedback CTA</span>
                        </li>
                      </ul>
                    </div>

                    {/* Key Features */}
                    <div className="bg-biz-accent rounded-xl p-6">
                      <h4 className="font-montserrat font-bold text-lg text-biz-navy mb-4">Key Features</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0" />
                          <span className="font-open-sans text-sm text-biz-grey">Warm, approachable language avoiding technical jargon</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0" />
                          <span className="font-open-sans text-sm text-biz-grey">Friendly infographics and "thumbs-up" visuals</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0" />
                          <span className="font-open-sans text-sm text-biz-grey">Large type and ample whitespace for easy reading</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0" />
                          <span className="font-open-sans text-sm text-biz-grey">Team shout-outs and recognition</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-biz-green shrink-0" />
                          <span className="font-open-sans text-sm text-biz-grey">Mobile-friendly formatting</span>
                        </div>
                      </div>
                    </div>

                    {/* Value Proposition */}
                    <div className="bg-gradient-to-r from-purple-100 to-violet-100 rounded-xl p-6 border-l-4 border-purple-600">
                      <p className="font-montserrat font-bold text-xl text-biz-navy mb-2">
                        Builds team pride, clarity, and connection
                      </p>
                      <p className="font-open-sans text-biz-grey">
                        Turns every employee into an engaged contributor to company success.
                      </p>
                    </div>

                    {/* Transformation */}
                    <div>
                      <h4 className="font-montserrat font-bold text-lg text-biz-navy mb-3">How It Transforms Your Team Culture</h4>
                      <ul className="space-y-2 font-open-sans text-biz-grey">
                        <li className="flex items-start gap-2">
                          <Zap className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                          <span>Employees understand how their work matters</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                          <span>Team pride increases as wins are celebrated together</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                          <span>Transparency builds trust between frontline and leadership</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                          <span>Retention improves as people feel valued and connected</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                          <span>Customer experience improves through engaged team members</span>
                        </li>
                      </ul>
                    </div>

                    {/* Strengths Image */}
                    <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                      <Star className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 font-semibold mb-2">employees-report-strengths.png</p>
                      <p className="text-sm text-gray-500">800 × 400px - Team strengths infographic with celebration visuals and positive metrics</p>
                    </div>

                    {/* ROI Highlight */}
                    <div className="bg-white rounded-xl p-6 border-2 border-purple-200">
                      <p className="font-montserrat font-bold text-biz-navy text-lg mb-3 text-center">
                        Employee Engagement Impact
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-3xl font-bold text-purple-600">28%</p>
                          <p className="text-sm text-biz-grey">Higher engagement scores</p>
                        </div>
                        <div>
                          <p className="text-3xl font-bold text-purple-600">15%</p>
                          <p className="text-sm text-biz-grey">Lower turnover within 6 months</p>
                        </div>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button
                        asChild
                        size="lg"
                        className="bg-purple-600 hover:bg-purple-700 text-white font-montserrat font-semibold flex-1"
                      >
                        <Link to="/pricing">Upgrade to Growth Tier</Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-purple-600 text-purple-600 hover:bg-purple-50 font-montserrat font-semibold flex-1"
                      >
                        See Sample Report
                      </Button>
                    </div>

                    {/* Upsell */}
                    <div className="bg-blue-50 border-l-4 border-purple-600 rounded-r-xl p-4">
                      <p className="font-open-sans text-sm text-biz-grey">
                        <strong className="text-purple-600">Included in Growth tier</strong> - invest in team alignment and watch engagement soar.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* ROI Calculator Section */}
        <section className="py-16 px-6 bg-gradient-to-br from-biz-navy to-biz-navy/90">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-white mb-4">
                Calculate Your Potential ROI
              </h2>
              <p className="font-open-sans text-lg text-white/90">
                See how BizHealth.ai reports can transform your bottom line
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <div className="mb-8">
                <label className="font-montserrat font-semibold text-biz-navy mb-4 block text-lg">
                  Annual Revenue: ${revenueSlider.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="100000"
                  max="10000000"
                  step="100000"
                  value={revenueSlider}
                  onChange={(e) => setRevenueSlider(Number(e.target.value))}
                  className="w-full h-3 bg-biz-accent rounded-lg appearance-none cursor-pointer accent-biz-green"
                />
                <div className="flex justify-between text-sm text-biz-grey mt-2">
                  <span>$100K</span>
                  <span>$10M</span>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-emerald-50 rounded-xl p-6 text-center border-2 border-emerald-200">
                  <DollarSign className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                  <p className="text-sm text-biz-grey mb-2">Estimated Cost Savings</p>
                  <p className="text-3xl font-bold text-emerald-600">${roi.costSavings.toLocaleString()}</p>
                </div>

                <div className="bg-blue-50 rounded-xl p-6 text-center border-2 border-blue-200">
                  <TrendingUp className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                  <p className="text-sm text-biz-grey mb-2">Revenue Opportunities</p>
                  <p className="text-3xl font-bold text-blue-600">${roi.revenueOpportunities.toLocaleString()}</p>
                </div>

                <div className="bg-purple-50 rounded-xl p-6 text-center border-2 border-purple-200">
                  <Award className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                  <p className="text-sm text-biz-grey mb-2">Total Value Potential</p>
                  <p className="text-3xl font-bold text-purple-600">${roi.totalValue.toLocaleString()}</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-biz-green to-emerald-600 rounded-xl p-8 text-center text-white">
                <p className="text-lg mb-2">Your Estimated ROI</p>
                <p className="text-5xl font-bold mb-2">{roi.roiMultiple}x</p>
                <p className="text-sm opacity-90">Return on Investment with Enterprise Tier</p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table Section */}
        <section className="py-16 px-6 bg-biz-accent">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-biz-navy mb-4">
                Why BizHealth.ai?
              </h2>
              <p className="font-open-sans text-lg text-biz-grey">
                Get consulting-grade insights at a fraction of traditional costs
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-biz-navy text-white">
                    <tr>
                      <th className="py-4 px-6 text-left font-montserrat">Factor</th>
                      <th className="py-4 px-6 text-left font-montserrat">BizHealth.ai</th>
                      <th className="py-4 px-6 text-left font-montserrat">Traditional Consulting</th>
                    </tr>
                  </thead>
                  <tbody className="font-open-sans">
                    <tr className="border-b border-border hover:bg-biz-accent transition-colors">
                      <td className="py-4 px-6 font-semibold text-biz-navy">Cost</td>
                      <td className="py-4 px-6 text-biz-green font-bold">$199 - $799</td>
                      <td className="py-4 px-6 text-biz-grey">$15,000 - $50,000+</td>
                    </tr>
                    <tr className="border-b border-border hover:bg-biz-accent transition-colors">
                      <td className="py-4 px-6 font-semibold text-biz-navy">Timeline</td>
                      <td className="py-4 px-6 text-biz-green font-bold">&lt; 2 hours</td>
                      <td className="py-4 px-6 text-biz-grey">4 - 12 weeks</td>
                    </tr>
                    <tr className="border-b border-border hover:bg-biz-accent transition-colors">
                      <td className="py-4 px-6 font-semibold text-biz-navy">Depth</td>
                      <td className="py-4 px-6 text-biz-green font-bold">multiple reports</td>
                      <td className="py-4 px-6 text-biz-grey">varies</td>
                    </tr>
                    <tr className="border-b border-border hover:bg-biz-accent transition-colors">
                      <td className="py-4 px-6 font-semibold text-biz-navy">Reassessment</td>
                      <td className="py-4 px-6 text-biz-green font-bold">discounted</td>
                      <td className="py-4 px-6 text-biz-grey">additional</td>
                    </tr>
                    <tr className="border-b border-border hover:bg-biz-accent transition-colors">
                      <td className="py-4 px-6 font-semibold text-biz-navy">Team Reports</td>
                      <td className="py-4 px-6 text-biz-green font-bold">included (Enterprise)</td>
                      <td className="py-4 px-6 text-biz-grey">typically additional</td>
                    </tr>
                    <tr className="hover:bg-biz-accent transition-colors">
                      <td className="py-4 px-6 font-semibold text-biz-navy">Benchmarks</td>
                      <td className="py-4 px-6 text-biz-green font-bold">comprehensive</td>
                      <td className="py-4 px-6 text-biz-grey">varies</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Key Differentiators Section */}
        <section className="py-16 px-6 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-biz-navy mb-4">
                What Makes BizHealth.ai Different
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-2 border-border hover:border-biz-green transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-biz-green/10 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-biz-green" />
                  </div>
                  <CardTitle className="font-montserrat text-xl">Consulting-Grade Quality</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-open-sans text-biz-grey">
                    Get the same analytical depth as $50K consulting engagements at a fraction of the cost.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-border hover:border-biz-green transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-biz-green/10 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-biz-green" />
                  </div>
                  <CardTitle className="font-montserrat text-xl">Tailored for Every Role</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-open-sans text-biz-grey">
                    From executives to frontline employees, everyone gets insights designed for their needs.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-border hover:border-biz-green transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-biz-green/10 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-biz-green" />
                  </div>
                  <CardTitle className="font-montserrat text-xl">Industry Benchmarks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-open-sans text-biz-grey">
                    Compare your performance against industry peers and growth-stage companies.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-border hover:border-biz-green transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-biz-green/10 rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-biz-green" />
                  </div>
                  <CardTitle className="font-montserrat text-xl">Actionable 90-Day Plans</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-open-sans text-biz-grey">
                    Stop wondering what to do next. Get prioritized action plans you can execute immediately.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-border hover:border-biz-green transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-biz-green/10 rounded-lg flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-biz-green" />
                  </div>
                  <CardTitle className="font-montserrat text-xl">Quarterly Reassessments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-open-sans text-biz-grey">
                    Track progress and adjust strategy every quarter - included in all tiers.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-border hover:border-biz-green transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-biz-green/10 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-biz-green" />
                  </div>
                  <CardTitle className="font-montserrat text-xl">AI-Powered, Human-Reviewed</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-open-sans text-biz-grey">
                    Combine AI efficiency with expert human oversight for accurate, actionable insights.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Tier Upgrade Upsell Section */}
        <section className="py-16 px-6 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Essentials to Growth */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-200">
                <h3 className="font-montserrat font-bold text-2xl text-biz-navy mb-4">
                  Empower Your Team
                </h3>
                <p className="font-open-sans text-lg text-biz-grey mb-6">
                  Add Managers' and Employees' Reports
                </p>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-biz-green shrink-0 mt-1" />
                    <span className="font-open-sans text-biz-grey">Align your entire organization, not just leadership</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-biz-green shrink-0 mt-1" />
                    <span className="font-open-sans text-biz-grey">Drive team engagement and operational excellence</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-biz-green shrink-0 mt-1" />
                    <span className="font-open-sans text-biz-grey">Build culture of transparency and shared success</span>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 mb-6">
                  <p className="font-open-sans text-sm text-biz-grey italic">
                    "92% of Growth customers say team reports drove unexpected alignment breakthroughs"
                  </p>
                </div>
                <Button asChild size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-montserrat font-semibold">
                  <Link to="/pricing">See Growth Features</Link>
                </Button>
              </div>

              {/* Growth to Enterprise */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-amber-200">
                <h3 className="font-montserrat font-bold text-2xl text-biz-navy mb-4">
                  Unlock Complete Intelligence
                </h3>
                <p className="font-open-sans text-lg text-biz-grey mb-6">
                  Add 150-200 Page Comprehensive Report
                </p>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-biz-green shrink-0 mt-1" />
                    <span className="font-open-sans text-biz-grey">Get the analytical depth that drives 20-25x ROI</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-biz-green shrink-0 mt-1" />
                    <span className="font-open-sans text-biz-grey">Reference library for strategic planning and due diligence</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-biz-green shrink-0 mt-1" />
                    <span className="font-open-sans text-biz-grey">Complete benchmarks across all 12 business categories</span>
                  </div>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 mb-6">
                  <p className="font-open-sans text-sm text-biz-grey italic">
                    "Enterprise customers report finding average $47K in hidden cost savings through Comprehensive Report"
                  </p>
                </div>
                <Button asChild size="lg" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-montserrat font-semibold">
                  <Link to="/pricing">Explore Enterprise Benefits</Link>
                </Button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="font-open-sans text-biz-grey">
                <strong className="text-biz-navy">Most successful implementations include reports for at least 3 organizational levels</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 px-6 bg-gradient-to-br from-biz-navy to-biz-navy/90 text-center">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-white mb-6">
              Ready to Transform Your Business with Data-Driven Insights?
            </h2>
            <p className="font-open-sans text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Start your comprehensive business health assessment today and get your first report within 48-72 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-biz-green hover:bg-biz-green/90 text-white font-montserrat font-semibold text-lg px-10 py-7"
              >
                <Link to="/register">Get Started Now</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-biz-navy font-montserrat font-semibold text-lg px-10 py-7 transition-all duration-300"
              >
                <Link to="/pricing">Compare Pricing Tiers</Link>
              </Button>
            </div>
          </div>
        </section>

        <GlobalFooter />
      </div>
    </>
  );
};

export default Reports;