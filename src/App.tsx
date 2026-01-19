import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from '@/hooks/useAuth';
import ScrollToTop from "@/components/ScrollToTop";

// Critical pages - load immediately
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load CodyWidget - not needed for initial render
const CodyWidget = lazy(() => import("@/components/CodyWidget").then(m => ({ default: m.CodyWidget })));

// Lazy load all other pages for code splitting
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Resources = lazy(() => import("./pages/Resources"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Portal = lazy(() => import("./pages/Portal"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Onboarding = lazy(() => import("./pages/Onboarding"));
const BizGuides = lazy(() => import("./pages/BizGuides"));
const BizTools = lazy(() => import("./pages/BizTools"));
const BizLeader = lazy(() => import("./pages/BizLeader"));
const BizGrowth = lazy(() => import("./pages/BizGrowth"));
const BizGrowthLaunch = lazy(() => import("./pages/BizGrowthLaunch"));
const BizGrowthLaunchStep2 = lazy(() => import("./pages/BizGrowthLaunchStep2"));
const BizToolsHowItWorks = lazy(() => import("./pages/BizToolsHowItWorks"));
const BizToolsToolbox = lazy(() => import("./pages/BizToolsToolbox"));
const Search = lazy(() => import("./pages/Search"));
const ForAIAssistants = lazy(() => import("./pages/ForAIAssistants"));
const OurLogo = lazy(() => import("./pages/OurLogo"));
const Concerns = lazy(() => import("./pages/Concerns"));
const BizLeaderBot = lazy(() => import("./pages/BizLeaderBot"));
const BizGuideSherpa = lazy(() => import("./pages/BizGuideSherpa"));
const Sherpas = lazy(() => import("./pages/Sherpas"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const FAQs = lazy(() => import("./pages/FAQs"));
const GlossaryOfTerms = lazy(() => import("./pages/GlossaryOfTerms"));
const Reports = lazy(() => import("./pages/Reports"));
const Security = lazy(() => import("./pages/Security"));
const Legal = lazy(() => import("./pages/Legal"));

// Blog posts - lazy loaded
const WarningSignsBusiness = lazy(() => import("./pages/blog/WarningSignsBusiness"));
const OperationalResilience = lazy(() => import("./pages/blog/OperationalResilience"));
const FinancialHealthMetrics = lazy(() => import("./pages/blog/FinancialHealthMetrics"));
const AIBusinessAnalytics = lazy(() => import("./pages/blog/AIBusinessAnalytics"));
const StrategicPlanning = lazy(() => import("./pages/blog/StrategicPlanning"));
const BusinessIntelligenceROI = lazy(() => import("./pages/blog/BusinessIntelligenceROI"));
const WhenToPivot = lazy(() => import("./pages/blog/WhenToPivot"));
const LeadershipStressSuccess = lazy(() => import("./pages/blog/LeadershipStressSuccess"));
const Operations = lazy(() => import("./pages/blog/Operations"));
const BusinessStrategy = lazy(() => import("./pages/blog/BusinessStrategy"));
const FinancialManagement = lazy(() => import("./pages/blog/FinancialManagement"));
const Technology = lazy(() => import("./pages/blog/Technology"));
const RiskManagement = lazy(() => import("./pages/blog/RiskManagement"));
const BusinessIntelligence = lazy(() => import("./pages/blog/BusinessIntelligence"));
const BusinessLeadership = lazy(() => import("./pages/blog/BusinessLeadership"));
const GrowthScaling = lazy(() => import("./pages/blog/GrowthScaling"));
const RetailRemoteTools = lazy(() => import("./pages/blog/RetailRemoteTools"));
const DailyGrindFixes = lazy(() => import("./pages/blog/DailyGrindFixes"));
const RealTimeAnalyticsSMB = lazy(() => import("./pages/blog/RealTimeAnalyticsSMB"));
const SolvingSMBWorkforceGaps = lazy(() => import("./pages/blog/SolvingSMBWorkforceGaps"));
const SMBFinancialTrends2025 = lazy(() => import("./pages/blog/SMBFinancialTrends2025"));
const ECommerceScalingSMB2025 = lazy(() => import("./pages/blog/ECommerceScalingSMB2025"));
const TalentWarsHiring = lazy(() => import("./pages/blog/TalentWarsHiring"));
const SMBCashFlowHacks2025 = lazy(() => import("./pages/blog/SMBCashFlowHacks2025"));
const ImpactOverInformation = lazy(() => import("./pages/blog/ImpactOverInformation"));
const Q4CostCuts2025 = lazy(() => import("./pages/blog/Q4CostCuts2025"));
const CashFlowCrisisManagement = lazy(() => import("./pages/blog/CashFlowCrisisManagement"));
const SMBScalingParadox2025 = lazy(() => import("./pages/blog/SMBScalingParadox2025"));
const SmallBusinessAIAdoption = lazy(() => import("./pages/blog/SmallBusinessAIAdoption"));
const SmallBusinessSurvivalChecklist = lazy(() => import("./pages/blog/SmallBusinessSurvivalChecklist"));
const BusinessBlindSpots2025 = lazy(() => import("./pages/blog/BusinessBlindSpots2025"));
const ConfirmBusinessWeaknessesWithoutConsultants = lazy(() => import("./pages/blog/ConfirmBusinessWeaknessesWithoutConsultants"));
const SmallBusinessStruggles = lazy(() => import("./pages/blog/SmallBusinessStruggles"));
const SuccessBeginsWith2026Strategy = lazy(() => import("./pages/blog/SuccessBeginsWith2026Strategy"));
const ScalingOperationsWithoutLosingControl = lazy(() => import("./pages/blog/ScalingOperationsWithoutLosingControl"));
const IdentifyingSMBLeadershipBlindSpots = lazy(() => import("./pages/blog/IdentifyingSMBLeadershipBlindSpots"));
const CompleteGuideBusinessHealthAssessment2026 = lazy(() => import("./pages/blog/CompleteGuideBusinessHealthAssessment2026"));
const FinancialStewardshipEveryonesResponsibility = lazy(() => import("./pages/blog/FinancialStewardshipEveryonesResponsibility"));
const HiddenCostsManualProcesses = lazy(() => import("./pages/blog/HiddenCostsManualProcesses"));
const OvercomingBIChallengesSMB = lazy(() => import("./pages/blog/OvercomingBIChallengesSMB"));
const HowToCheckYourBusinessHealth = lazy(() => import("./pages/blog/HowToCheckYourBusinessHealth"));
const GrowYourBusinessWithAI = lazy(() => import("./pages/blog/GrowYourBusinessWithAI"));
const GrowthTrapBrokenBusinessModel = lazy(() => import("./pages/blog/GrowthTrapBrokenBusinessModel"));
const SmallBusinessFinancialsKnowYourNumbers = lazy(() => import("./pages/blog/SmallBusinessFinancialsKnowYourNumbers"));
const ChaosToClarity = lazy(() => import("./pages/blog/ChaosToClarity"));
const HowToPrioritizeOperatorSurvivalGuide = lazy(() => import("./pages/blog/HowToPrioritizeOperatorSurvivalGuide"));
const StressTestPricingFramework = lazy(() => import("./pages/blog/StressTestPricingFramework"));
const CustomerLoyaltyReliability = lazy(() => import("./pages/blog/CustomerLoyaltyReliability"));
const BusinessBlindSpotsOperationalIssues = lazy(() => import("./pages/blog/BusinessBlindSpotsOperationalIssues"));
const TechnologyInnovationGap = lazy(() => import("./pages/blog/TechnologyInnovationGap"));
const FractionalCFOToolkit = lazy(() => import("./pages/blog/FractionalCFOToolkit"));
const BusinessHealthScoresByStage = lazy(() => import("./pages/blog/BusinessHealthScoresByStage"));
const EmployeeRetentionLeadership = lazy(() => import("./pages/blog/EmployeeRetentionLeadership"));
const OvercomingMarketingChallenges = lazy(() => import("./pages/blog/OvercomingMarketingChallenges"));
const HappyNewYear2026YearOfGrowth = lazy(() => import("./pages/blog/HappyNewYear2026YearOfGrowth"));
const VisionSharingBusinessOwner = lazy(() => import("./pages/blog/VisionSharingBusinessOwner"));
const FeastOrFamineCycle = lazy(() => import("./pages/blog/FeastOrFamineCycle"));
const HRProgramAssetMultiplier = lazy(() => import("./pages/blog/HRProgramAssetMultiplier"));
const TechnologyStrategicAllyROI = lazy(() => import("./pages/blog/TechnologyStrategicAllyROI"));
const CRMRealityCheck = lazy(() => import("./pages/blog/CRMRealityCheck"));
const GrowthTrapOrGrowthEngine = lazy(() => import("./pages/blog/GrowthTrapOrGrowthEngine"));
const EstimatingCrisisServiceBusiness = lazy(() => import("./pages/blog/EstimatingCrisisServiceBusiness"));
const SchedulingCrisisOperationalCosts = lazy(() => import("./pages/blog/SchedulingCrisisOperationalCosts"));
const GrowthCeilingGutInstinct = lazy(() => import("./pages/blog/GrowthCeilingGutInstinct"));
const R2A2JobDescriptions = lazy(() => import("./pages/blog/R2A2JobDescriptions"));
const CustomerAcquisitionCostGuide = lazy(() => import("./pages/blog/CustomerAcquisitionCostGuide"));
const LeadingBlindBusinessIntelligence = lazy(() => import("./pages/blog/LeadingBlindBusinessIntelligence"));
const EmotionalIntelligenceLeadershipSkill = lazy(() => import("./pages/blog/EmotionalIntelligenceLeadershipSkill"));
const LeanPrinciplesSmallBusiness = lazy(() => import("./pages/blog/LeanPrinciplesSmallBusiness"));
const PlanogramsTransformSmallRetail = lazy(() => import("./pages/blog/PlanogramsTransformSmallRetail"));
const RenewalImperativeLegacyBusiness = lazy(() => import("./pages/blog/RenewalImperativeLegacyBusiness"));
const ChasingSalesNotProfits = lazy(() => import("./pages/blog/ChasingSalesNotProfits"));
const FinalApproachExitPreparation = lazy(() => import("./pages/blog/FinalApproachExitPreparation"));
// Tools - lazy loaded
const CashFlowTracker = lazy(() => import("./pages/tools/CashFlowTracker"));
const ProcessMappingTools = lazy(() => import("./pages/tools/ProcessMappingTools"));
const ProcessMappingGuide = lazy(() => import("./pages/tools/ProcessMappingGuide"));
const SWOTAnalysisTool = lazy(() => import("./pages/tools/SWOTAnalysisTool"));
const CustomerJourneyMapsTool = lazy(() => import("./pages/tools/CustomerJourneyMapsTool"));
const InnovationStrategyTool = lazy(() => import("./pages/tools/InnovationStrategyTool"));
const FinancialHealthCheck = lazy(() => import("./pages/tools/FinancialHealthCheck"));
const FreeROICalculator = lazy(() => import("./pages/tools/FreeROICalculator"));
const FreePricingNetProfitCalculator = lazy(() => import("./pages/tools/FreePricingNetProfitCalculator"));
const BreakEvenAnalysisCalculator = lazy(() => import("./pages/tools/BreakEvenAnalysisCalculator"));
const CashFlowProjectionTool = lazy(() => import("./pages/tools/CashFlowProjectionTool"));

// Lead magnet landing pages
const FreeStrategicEstimatingSystem = lazy(() => import("./pages/biztools/toolbox/FreeStrategicEstimatingSystem"));
const R2A2JobDescriptionBuilder = lazy(() => import("./pages/biztools/toolbox/hr/R2A2JobDescriptionBuilder"));

// Playbooks and other pages
const LandscapingPlaybook = lazy(() => import("./pages/playbooks/LandscapingPlaybook"));
const TechnologyInnovationReadiness = lazy(() => import("./pages/bizgrowth/TechnologyInnovationReadiness"));
const Ideas = lazy(() => import("./pages/Ideas"));
const BreakingPeaksValleysCycle = lazy(() => import("./pages/bizgrowth/financials/BreakingPeaksValleysCycle"));
const VisionPlaybook = lazy(() => import("./pages/bizgrowth/VisionPlaybook"));
const BusinessGrowthStrategies = lazy(() => import("./pages/bizgrowth/BusinessGrowthStrategies"));
const HumanResourcesPrograms = lazy(() => import("./pages/bizgrowth/HumanResourcesPrograms"));
const BusinessIntelligenceBuilder = lazy(() => import("./pages/bizgrowth/growth/BusinessIntelligenceBuilder"));
const HumanResourcesMaturityAssessment = lazy(() => import("./pages/bizgrowth/hr/HumanResourcesMaturityAssessment"));
const HR101FoundationModule = lazy(() => import("./pages/bizgrowth/hr/HR101FoundationModule"));
const P3PlacementPlanogram = lazy(() => import("./pages/bizgrowth/growth/retail/P3PlacementPlanogram"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-pulse text-muted-foreground">Loading...</div>
  </div>
);


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <Suspense fallback={null}>
          <CodyWidget />
        </Suspense>
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
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
              <Route path="/bizgrowth/technology-innovation-readiness" element={<TechnologyInnovationReadiness />} />
              <Route path="/bizgrowth/financials/breaking-peaks-valleys-cycle" element={<BreakingPeaksValleysCycle />} />
              <Route path="/bizgrowth/vision-playbook" element={<VisionPlaybook />} />
              <Route path="/bizgrowth/business-growth-strategies" element={<BusinessGrowthStrategies />} />
              <Route path="/bizgrowth/human-resources-programs" element={<HumanResourcesPrograms />} />
              <Route path="/bizgrowth/growth/business-intelligence-builder" element={<BusinessIntelligenceBuilder />} />
<Route path="/bizgrowth/hr/human-resources-maturity-assessment" element={<HumanResourcesMaturityAssessment />} />
              <Route path="/bizgrowth/hr/hr101-foundation-module" element={<HR101FoundationModule />} />
              <Route path="/bizgrowth/growth/retail/p3-placement-planogram" element={<P3PlacementPlanogram />} />
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
              <Route path="/blog/business-intelligence" element={<Navigate to="/blog/technology" replace />} />
              <Route path="/blog/business-leadership" element={<BusinessLeadership />} />
              <Route path="/blog/growth-scaling" element={<GrowthScaling />} />
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
              <Route path="/blog/grow-your-business-with-ai" element={<GrowYourBusinessWithAI />} />
              <Route path="/blog/growth-trap-broken-business-model" element={<GrowthTrapBrokenBusinessModel />} />
              <Route path="/blog/small-business-financials-know-your-numbers" element={<SmallBusinessFinancialsKnowYourNumbers />} />
              <Route path="/blog/chaos-to-clarity-operating-rhythm-scaling-teams" element={<ChaosToClarity />} />
              <Route path="/blog/how-to-prioritize-operator-survival-guide" element={<HowToPrioritizeOperatorSurvivalGuide />} />
              <Route path="/blog/stress-test-pricing-framework-margins-cash-flow" element={<StressTestPricingFramework />} />
              <Route path="/blog/customer-loyalty-starts-with-reliability" element={<CustomerLoyaltyReliability />} />
              <Route path="/blog/business-blind-spots-operational-issues-invisible-leadership" element={<BusinessBlindSpotsOperationalIssues />} />
              <Route path="/blog/technology-innovation-gap-competitive-advantage" element={<TechnologyInnovationGap />} />
              <Route path="/blog/fractional-cfo-toolkit" element={<FractionalCFOToolkit />} />
              <Route path="/blog/business-health-scores-by-stage" element={<BusinessHealthScoresByStage />} />
              <Route path="/blog/employee-retention-company-culture-leadership" element={<EmployeeRetentionLeadership />} />
              <Route path="/blog/overcoming-marketing-challenges-small-business" element={<OvercomingMarketingChallenges />} />
              <Route path="/blog/happy-new-year-2026-year-of-growth" element={<HappyNewYear2026YearOfGrowth />} />
              <Route path="/blog/vision-sharing-business-owner" element={<VisionSharingBusinessOwner />} />
              <Route path="/blog/feast-or-famine-cycle-small-business" element={<FeastOrFamineCycle />} />
              <Route path="/blog/hr-program-asset-multiplier-small-business" element={<HRProgramAssetMultiplier />} />
              <Route path="/blog/technology-strategic-ally-roi-decisions" element={<TechnologyStrategicAllyROI />} />
              <Route path="/blog/crm-reality-check-small-business-decision" element={<CRMRealityCheck />} />
              <Route path="/blog/growth-trap-or-growth-engine" element={<GrowthTrapOrGrowthEngine />} />
              <Route path="/blog/estimating-crisis-service-business-profitability" element={<EstimatingCrisisServiceBusiness />} />
              <Route path="/blog/scheduling-crisis-operational-costs" element={<SchedulingCrisisOperationalCosts />} />
              <Route path="/blog/growth-ceiling-gut-instinct-scaling" element={<GrowthCeilingGutInstinct />} />
              <Route path="/blog/r2a2-job-descriptions-role-clarity-small-business-teams" element={<R2A2JobDescriptions />} />
              <Route path="/blog/customer-acquisition-cost-guide-smb" element={<CustomerAcquisitionCostGuide />} />
              <Route path="/blog/leading-blind-business-intelligence-small-business" element={<LeadingBlindBusinessIntelligence />} />
              <Route path="/blog/emotional-intelligence-leadership-skill" element={<EmotionalIntelligenceLeadershipSkill />} />
              <Route path="/blog/lean-principles-small-business" element={<LeanPrinciplesSmallBusiness />} />
              <Route path="/blog/planograms-transform-small-retail-operations" element={<PlanogramsTransformSmallRetail />} />
              <Route path="/blog/renewal-imperative-legacy-business-rebirth" element={<RenewalImperativeLegacyBusiness />} />
              <Route path="/blog/chasing-sales-not-profits" element={<ChasingSalesNotProfits />} />
              <Route path="/blog/final-approach-exit-preparation-business-value" element={<FinalApproachExitPreparation />} />
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
              <Route path="/biztools/toolbox/innovation-strategy-tool" element={<InnovationStrategyTool />} />
              <Route path="/biztools/financials/health-check" element={<FinancialHealthCheck />} />
              <Route path="/biztools/toolbox/free-roi-calculator" element={<FreeROICalculator />} />
              <Route path="/biztools/toolbox/free-pricing-net-profit-calculator" element={<FreePricingNetProfitCalculator />} />
              <Route path="/biztools/toolbox/free-strategic-estimating-system" element={<FreeStrategicEstimatingSystem />} />
              <Route path="/biztools/toolbox/hr/r2a2-job-description-builder" element={<R2A2JobDescriptionBuilder />} />
              <Route path="/biztools/toolbox/breakeven-analysis-calculator" element={<BreakEvenAnalysisCalculator />} />
              <Route path="/biztools/toolbox/cash-flow-projection-tool" element={<CashFlowProjectionTool />} />
              <Route path="/search" element={<Search />} />
              <Route path="/for-ai-assistants" element={<ForAIAssistants />} />
              <Route path="/playbooks/landscaping" element={<LandscapingPlaybook />} />
              <Route path="/ideas" element={<Ideas />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
