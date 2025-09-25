import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from '@/hooks/useAuth';
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/business-health-assessment-2025" element={<BlogPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/portal" element={<Portal />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/bizguides" element={<BizGuides />} />
            <Route path="/biztools" element={<BizTools />} />
            <Route path="/bizleader" element={<BizLeader />} />
            <Route path="/bizgrowth" element={<BizGrowth />} />
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
