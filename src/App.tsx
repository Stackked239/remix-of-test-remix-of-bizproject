import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from '@/hooks/useAuth';
import ScrollToTop from "@/components/ScrollToTop";
import { CodyWidget } from "@/components/CodyWidget";
import Index from "./pages/Index";
import HowItWorks from "./pages/HowItWorks";
import Pricing from "./pages/Pricing";
import Resources from "./pages/Resources";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Portal from "./pages/Portal";
import Checkout from "./pages/Checkout";
import Onboarding from "./pages/Onboarding";
import NotFound from "./pages/NotFound";
import BizGuides from "./pages/BizGuides";
import BizTools from "./pages/BizTools";
import BizLeader from "./pages/BizLeader";
import BizGrowth from "./pages/BizGrowth";
import BizGrowthLaunch from "./pages/BizGrowthLaunch";
import BizGrowthLaunchStep2 from "./pages/BizGrowthLaunchStep2";
import BizToolsHowItWorks from "./pages/BizToolsHowItWorks";
import BizToolsToolbox from "./pages/BizToolsToolbox";
import WarningSignsBusiness from "./pages/blog/WarningSignsBusiness";
import OperationalResilience from "./pages/blog/OperationalResilience";
import FinancialHealthMetrics from "./pages/blog/FinancialHealthMetrics";
import AIBusinessAnalytics from "./pages/blog/AIBusinessAnalytics";
import StrategicPlanning from "./pages/blog/StrategicPlanning";
import BusinessIntelligenceROI from "./pages/blog/BusinessIntelligenceROI";
import WhenToPivot from "./pages/blog/WhenToPivot";
import LeadershipStressSuccess from "./pages/blog/LeadershipStressSuccess";
import Operations from "./pages/blog/Operations";
import BusinessStrategy from "./pages/blog/BusinessStrategy";
import FinancialManagement from "./pages/blog/FinancialManagement";
import Technology from "./pages/blog/Technology";
import RiskManagement from "./pages/blog/RiskManagement";
import BusinessIntelligence from "./pages/blog/BusinessIntelligence";
import BusinessLeadership from "./pages/blog/BusinessLeadership";
import RetailRemoteTools from "./pages/blog/RetailRemoteTools";
import DailyGrindFixes from "./pages/blog/DailyGrindFixes";
import RealTimeAnalyticsSMB from "./pages/blog/RealTimeAnalyticsSMB";
import SolvingSMBWorkforceGaps from "./pages/blog/SolvingSMBWorkforceGaps";
import SMBFinancialTrends2025 from "./pages/blog/SMBFinancialTrends2025";
import ECommerceScalingSMB2025 from "./pages/blog/ECommerceScalingSMB2025";
import TalentWarsHiring from "./pages/blog/TalentWarsHiring";
import SMBCashFlowHacks2025 from "./pages/blog/SMBCashFlowHacks2025";
import ImpactOverInformation from "./pages/blog/ImpactOverInformation";
import Q4CostCuts2025 from "./pages/blog/Q4CostCuts2025";
import CashFlowCrisisManagement from "./pages/blog/CashFlowCrisisManagement";
import SMBScalingParadox2025 from "./pages/blog/SMBScalingParadox2025";
import SmallBusinessAIAdoption from "./pages/blog/SmallBusinessAIAdoption";
import SmallBusinessSurvivalChecklist from "./pages/blog/SmallBusinessSurvivalChecklist";
import BusinessBlindSpots2025 from "./pages/blog/BusinessBlindSpots2025";
import ConfirmBusinessWeaknessesWithoutConsultants from "./pages/blog/ConfirmBusinessWeaknessesWithoutConsultants";
import SmallBusinessStruggles from "./pages/blog/SmallBusinessStruggles";
import SuccessBeginsWith2026Strategy from "./pages/blog/SuccessBeginsWith2026Strategy";
import ScalingOperationsWithoutLosingControl from "./pages/blog/ScalingOperationsWithoutLosingControl";
import IdentifyingSMBLeadershipBlindSpots from "./pages/blog/IdentifyingSMBLeadershipBlindSpots";
import CompleteGuideBusinessHealthAssessment2026 from "./pages/blog/CompleteGuideBusinessHealthAssessment2026";
import FinancialStewardshipEveryonesResponsibility from "./pages/blog/FinancialStewardshipEveryonesResponsibility";
import HiddenCostsManualProcesses from "./pages/blog/HiddenCostsManualProcesses";
import OvercomingBIChallengesSMB from "./pages/blog/OvercomingBIChallengesSMB";
import HowToCheckYourBusinessHealth from "./pages/blog/HowToCheckYourBusinessHealth";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";
import FAQs from "./pages/FAQs";
import GlossaryOfTerms from "./pages/GlossaryOfTerms";
import Reports from "./pages/Reports";
import Security from "./pages/Security";
import Legal from "./pages/Legal";
import CashFlowTracker from "./pages/tools/CashFlowTracker";
import ProcessMappingTools from "./pages/tools/ProcessMappingTools";
import ProcessMappingGuide from "./pages/tools/ProcessMappingGuide";
import SWOTAnalysisTool from "./pages/tools/SWOTAnalysisTool";
import CustomerJourneyMapsTool from "./pages/tools/CustomerJourneyMapsTool";

import Search from "./pages/Search";
import ForAIAssistants from "./pages/ForAIAssistants";
import OurLogo from "./pages/OurLogo";
import Concerns from "./pages/Concerns";
import BizLeaderBot from "./pages/BizLeaderBot";
import BizGuideSherpa from "./pages/BizGuideSherpa";
import Sherpas from "./pages/Sherpas";
import LandscapingPlaybook from "./pages/playbooks/LandscapingPlaybook";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <CodyWidget />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/logo" element={<OurLogo />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/business-health-assessment-2025" element={<BlogPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/portal" element={<Portal />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/bizguides" element={<BizGuides />} />
            <Route path="/bizguides/bizguide-sherpa" element={<BizGuideSherpa />} />
            <Route path="/sherpas" element={<Sherpas />} />
            <Route path="/business-leadership-sherpas" element={<Sherpas />} />
            <Route path="/biztools" element={<BizTools />} />
            <Route path="/biztools/how-it-works" element={<BizToolsHowItWorks />} />
            <Route path="/biztools/toolbox" element={<BizToolsToolbox />} />
            <Route path="/bizleader" element={<BizLeader />} />
            <Route path="/bizleader/leadership-development-bot" element={<BizLeaderBot />} />
            <Route path="/bizgrowth" element={<BizGrowth />} />
            <Route path="/bizgrowth/launch" element={<BizGrowthLaunch />} />
            <Route path="/bizgrowth/launch/step-2-fix-cash-squeeze" element={<BizGrowthLaunchStep2 />} />
            <Route path="/blog/warning-signs-business" element={<WarningSignsBusiness />} />
            <Route path="/blog/operational-resilience" element={<OperationalResilience />} />
            <Route path="/blog/financial-health-metrics" element={<FinancialHealthMetrics />} />
            <Route path="/blog/ai-business-analytics" element={<AIBusinessAnalytics />} />
            <Route path="/blog/strategic-planning-post-pandemic" element={<StrategicPlanning />} />
            <Route path="/blog/business-intelligence-roi" element={<BusinessIntelligenceROI />} />
            <Route path="/blog/when-to-pivot" element={<WhenToPivot />} />
            <Route path="/blog/leadership-stress-success" element={<LeadershipStressSuccess />} />
            <Route path="/blog/operations" element={<Operations />} />
            <Route path="/blog/business-strategy" element={<BusinessStrategy />} />
            <Route path="/blog/financial-management" element={<FinancialManagement />} />
            <Route path="/blog/technology" element={<Technology />} />
            <Route path="/blog/risk-management" element={<RiskManagement />} />
            <Route path="/blog/business-intelligence" element={<BusinessIntelligence />} />
            <Route path="/blog/business-leadership" element={<BusinessLeadership />} />
            <Route path="/blog/retail-remote-tools" element={<RetailRemoteTools />} />
            <Route path="/blog/daily-grind-fixes" element={<DailyGrindFixes />} />
            <Route path="/blog/real-time-analytics-smb-agility" element={<RealTimeAnalyticsSMB />} />
            <Route path="/blog/solving-smb-workforce-gaps-2025" element={<SolvingSMBWorkforceGaps />} />
            <Route path="/blog/talent-wars-smb-hiring-2025" element={<TalentWarsHiring />} />
            <Route path="/blog/2025-smb-financial-trends" element={<SMBFinancialTrends2025 />} />
            <Route path="/blog/e-commerce-scaling-5-strategies-for-smbs-thriving-in-2025" element={<ECommerceScalingSMB2025 />} />
            <Route path="/blog/smb-cash-flow-hacks-2025" element={<SMBCashFlowHacks2025 />} />
            <Route path="/blog/impact-over-information" element={<ImpactOverInformation />} />
            <Route path="/blog/Q4-Cost-Cuts-2025" element={<Q4CostCuts2025 />} />
            <Route path="/blog/cash-flow-crisis-management" element={<CashFlowCrisisManagement />} />
            <Route path="/blog/smb-scaling-paradox-2025" element={<SMBScalingParadox2025 />} />
            <Route path="/blog/small-business-ai-adoption" element={<SmallBusinessAIAdoption />} />
            <Route path="/blog/small-business-survival-checklist-2025" element={<SmallBusinessSurvivalChecklist />} />
            <Route path="/blog/small-business-blind-spots-2025" element={<BusinessBlindSpots2025 />} />
            <Route path="/blog/confirm-business-weaknesses-without-consultants" element={<ConfirmBusinessWeaknessesWithoutConsultants />} />
            <Route path="/blog/small-business-struggles" element={<SmallBusinessStruggles />} />
            <Route path="/blog/success-begins-with-2026-strategy" element={<SuccessBeginsWith2026Strategy />} />
            <Route path="/blog/scaling-operations-without-losing-control" element={<ScalingOperationsWithoutLosingControl />} />
            <Route path="/blog/identifying-smb-leadership-blind-spots" element={<IdentifyingSMBLeadershipBlindSpots />} />
            <Route path="/blog/complete-guide-business-health-assessment-2026" element={<CompleteGuideBusinessHealthAssessment2026 />} />
            <Route path="/blog/financial-stewardship-everyones-responsibility" element={<FinancialStewardshipEveryonesResponsibility />} />
            <Route path="/blog/hidden-costs-manual-processes" element={<HiddenCostsManualProcesses />} />
            <Route path="/blog/overcoming-bi-challenges-smb" element={<OvercomingBIChallengesSMB />} />
            <Route path="/blog/how-to-check-your-business-health" element={<HowToCheckYourBusinessHealth />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/security" element={<Security />} />
          <Route path="/legal" element={<Legal />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/concerns" element={<Concerns />} />
            <Route path="/glossary-of-terms" element={<GlossaryOfTerms />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/biztools/toolbox/cash-flow-tracker" element={<CashFlowTracker />} />
            <Route path="/biztools/toolbox/process-mapping-tools" element={<ProcessMappingTools />} />
            <Route path="/biztools/toolbox/process-mapping-tools/guide" element={<ProcessMappingGuide />} />
            <Route path="/biztools/toolbox/swot-analysis-tool" element={<SWOTAnalysisTool />} />
            <Route path="/biztools/toolbox/customer-journey-maps-tool" element={<CustomerJourneyMapsTool />} />
            <Route path="/search" element={<Search />} />
            <Route path="/for-ai-assistants" element={<ForAIAssistants />} />
            <Route path="/playbooks/landscaping" element={<LandscapingPlaybook />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
