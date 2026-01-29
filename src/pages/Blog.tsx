import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import GradientDivider from "@/components/GradientDivider";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import PromotionalBanner from "@/components/PromotionalBanner";
import { Calendar, Clock, User, ArrowRight, Search } from "lucide-react";
import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { blogPosts as blogPostsData, featuredPost as featuredPostData, searchBlogPosts } from "@/data/blogData";
import businessHealthImage from "@/assets/business-health-assessment-comprehensive.jpg";
import warningSignsImage from "@/assets/business-warning-signs-management.jpg";
import aiAnalyticsImage from "@/assets/ai-business-analytics-dashboard.jpg";
import financialMetricsImage from "@/assets/financial-health-metrics-dashboard.jpg";
import resilienceImage from "@/assets/operational-resilience-strategy.jpg";
import biRoiImage from "@/assets/business-intelligence-roi-analytics.jpg";
import strategicPlanningImage from "@/assets/strategic-planning-post-pandemic.jpg";
import pivotImage from "@/assets/business-pivot-strategy-transformation.jpg";
import leadershipStressImage from "@/assets/business-leadership-stress-success-optimized.jpg";
import retailToolsImage from "@/assets/retail-remote-tools-family-business.jpg";
import dailyGrindImage from "@/assets/daily-grind-food-business-operations.jpg";
import realTimeAnalyticsImage from "@/assets/real-time-analytics-smb-agility-volatile-markets.jpg";
import workforceGapsImage from "@/assets/smb-workforce-gaps-talent-analytics-2025.jpg";
import talentWarsImage from "@/assets/talent-wars-smb-hiring-2025.jpg";
import businessAnalystImage from "@/assets/business-analyst-dashboard-optimized.jpg";
import businessStrategyPlanningImage from "@/assets/business-strategy-planning-2026-growth-optimized.jpg";
import smbTeamHeroImage from "@/assets/smb-team-collaboration-hero.webp";
import smbFinancialTrendsImage from "@/assets/2025-smb-financial-trends-cash-flow-strategies.jpg";
import ecommerceScalingImage from "@/assets/e-commerce-scaling-smb-strategies-2025.jpg";
import cashFlowHacksImage from "@/assets/smb-cash-flow-hacks-2025.jpg";
import informationOverloadImage from "@/assets/information-overload-business-leader.jpg";
import q4CostCutsImage from "@/assets/q4-cost-cuts-operational-fixes-2025.jpg";
import cashFlowCrisisImage from "@/assets/cash-flow-crisis-management-2025.jpg";
import smbScalingParadoxImage from "@/assets/smb-scaling-paradox-2025.jpg";
import aiAdoptionImage from "@/assets/ai-adoption-skeptical-business-owners-2025.jpg";
import survivalChecklistImage from "@/assets/small-business-survival-checklist-2025.jpg";
import blindSpotsImage from "@/assets/business-blind-spots-assessment.jpg";
import confirmWeaknessesImage from "@/assets/confirm-business-weaknesses-without-consultants-optimized.jpg";
import smallBusinessStrugglesImage from "@/assets/small-business-struggles-fixing-wrong-problems-optimized.jpg";
import scalingOperationsImage from "@/assets/scaling-operations-without-losing-control-optimized.jpg";
import leadershipBlindSpotsImage from "@/assets/identifying-smb-leadership-blind-spots-optimized.jpg";
import businessHealthAssessment2026Image from "@/assets/images/business-health-assessment-2026-guide.jpg";
import financialStewardshipImage from "@/assets/financial-stewardship-team-responsibility-smb-optimized.jpg";
import hiddenCostsManualProcessesImage from "@/assets/hidden-costs-manual-processes-smb-optimized.jpg";
import overcomingBIChallengesImage from "@/assets/overcoming-bi-challenges-smb-optimized.jpg";
import howToCheckBusinessHealthImage from "@/assets/how-to-check-business-health-guide-optimized.jpg";
import growWithAIImage from "@/assets/grow-your-business-with-ai-smb-growth-2025.jpg";
import growthTrapImage from "@/assets/growth-trap-broken-business-model-2025.jpg";
import smallBusinessFinancialsImage from "@/assets/small-business-financials-know-your-numbers.jpg";
import chaosToClarity from "@/assets/chaos-to-clarity-operating-rhythm-smb-teams.jpg";
import howToPrioritizeImage from "@/assets/how-to-prioritize-operator-survival-guide.jpg";
import stressTestPricingImage from "@/assets/stress-test-pricing-framework-margins-cash-flow-optimized.jpg";
import customerLoyaltyImage from "@/assets/customer-loyalty-reliability-smb-2025.jpg";
import businessBlindSpotsOperationalImage from "@/assets/business-blind-spots-operational-issues-leadership.jpg";
import technologyInnovationGapImage from "@/assets/technology-innovation-gap-small-business-2025.jpg";
import fractionalCFOToolkitImage from "@/assets/images/fractional-cfo-toolkit-hero-2026.jpg";
import businessHealthScoresStagesImage from "@/assets/business-health-scores-stages-survival-stability-scale-exit.jpg";
import employeeRetentionLeadershipImage from "@/assets/employee-retention-day-to-day-leadership-culture.jpg";
import overcomingMarketingChallengesImage from "@/assets/overcoming-marketing-challenges-small-business-strategic-growth.jpg";
import happyNewYear2026Image from "@/assets/happy-new-year-2026-business-growth.jpg";
import visionSharingImage from "@/assets/vision-sharing-business-owner-team-celebration.jpg";
import feastFamineCycleImage from "@/assets/feast-famine-cycle-small-business-rollercoaster.jpg";
import hrProgramAssetImage from "@/assets/hr-program-small-business-asset-multiplier.jpg";
import technologyStrategicAllyImage from "@/assets/images/technology-strategic-ally-roi-decisions-growth.jpg";
import crmRealityCheckImage from "@/assets/images/crm-reality-check-small-business-decision-guide.jpg";
import growthTrapOrGrowthEngineImage from "@/assets/images/growth-trap-or-growth-engine-business-readiness-assessment.jpg";
import estimatingCrisisImage from "@/assets/images/estimating-crisis-service-business-profitability.jpg";
import schedulingCrisisImage from "@/assets/images/scheduling-crisis-operational-costs-smb.jpg";
import growthCeilingGutInstinctImage from "@/assets/images/growth-ceiling-gut-instinct-scaling-business.jpg";
import r2a2JobDescriptionsImage from "@/assets/images/r2a2-job-descriptions-role-clarity-small-business-teams.jpg";
import customerAcquisitionCostImage from "@/assets/images/customer-acquisition-cost-guide-smb-growth.jpg";
import leadingBlindBIImage from "@/assets/images/blog/leading-blind-business-intelligence.jpg";
import emotionalIntelligenceImage from "@/assets/images/blog/emotional-intelligence-leadership-skill.jpg";
import leanPrinciplesImage from "@/assets/images/blog/lean-principles-small-business-guide.jpg";
import planogramsRetailImage from "@/assets/images/blog/planograms-transform-small-retail-operations.jpg";
import renewalImperativeImage from "@/assets/renewal-imperative-legacy-business-rebirth.jpg";
import chasingSalesNotProfitsImage from "@/assets/images/blog/why-small-businesses-fail-chasing-sales-profits.jpg";
import finalApproachExitImage from "@/assets/images/final-approach-exit-preparation.jpg";
import secretWeaponProcessImage from "@/assets/images/secret-weapon-process-matters-hero.jpg";
import businessBlindSpotsHeroImage from "@/assets/images/business-blind-spots-hero.jpg";
import voiceOfCustomerTruthImage from "@/assets/images/voice-of-customer-truth-hero.jpg";
import marketingMythsImage from "@/assets/images/marketing-myths-smb-growth-hero.jpg";
import sharksInTheWaterImage from "@/assets/images/sharks-in-the-water-business-crisis.jpg";
import buildHighPerformingTeamImage from "@/assets/images/build-high-performing-team-hero.jpg";
import ebitdaBusinessValuationImage from "@/assets/images/ebitda-business-valuation-hero.jpg";
import ebitdaMistakesImage from "@/assets/images/ebitda-mistakes-hero.jpg";
import coachingForGrowthImage from "@/assets/images/coaching-for-growth-hero.jpg";

// Image mapping for blog posts
const imageMap: Record<string, string> = {
  "/blog/coaching-for-growth-leadership": coachingForGrowthImage,
  "/blog/ebitda-mistakes-business-reality": ebitdaMistakesImage,
  "/blog/ebitda-business-valuation": ebitdaBusinessValuationImage,
  "/blog/build-high-performing-team": buildHighPerformingTeamImage,
  "/blog/sharks-in-the-water-business-crisis": sharksInTheWaterImage,
  "/blog/marketing-myths-spending-not-creating-growth": marketingMythsImage,
  "/blog/voice-of-customer-truth": voiceOfCustomerTruthImage,
  "/blog/fix-business-blind-spots": businessBlindSpotsHeroImage,
  "/blog/secret-weapon-why-process-matters": secretWeaponProcessImage,
  "/blog/final-approach-exit-preparation-business-value": finalApproachExitImage,
  "/blog/chasing-sales-not-profits": chasingSalesNotProfitsImage,
  "/blog/renewal-imperative-legacy-business-rebirth": renewalImperativeImage,
  "/blog/planograms-transform-small-retail-operations": planogramsRetailImage,
  "/blog/lean-principles-small-business": leanPrinciplesImage,
  "/blog/emotional-intelligence-leadership-skill": emotionalIntelligenceImage,
  "/blog/leading-blind-business-intelligence-small-business": leadingBlindBIImage,
  "/blog/customer-acquisition-cost-guide-smb": customerAcquisitionCostImage,
  "/blog/r2a2-job-descriptions-role-clarity-small-business-teams": r2a2JobDescriptionsImage,
  "/blog/growth-ceiling-gut-instinct-scaling": growthCeilingGutInstinctImage,
  "/blog/scheduling-crisis-operational-costs": schedulingCrisisImage,
  "/blog/estimating-crisis-service-business-profitability": estimatingCrisisImage,
  "/blog/growth-trap-or-growth-engine": growthTrapOrGrowthEngineImage,
  "/blog/crm-reality-check-small-business-decision": crmRealityCheckImage,
  "/blog/technology-strategic-ally-roi-decisions": technologyStrategicAllyImage,
  "/blog/hr-program-asset-multiplier-small-business": hrProgramAssetImage,
  "/blog/feast-or-famine-cycle-small-business": feastFamineCycleImage,
  "/blog/vision-sharing-business-owner": visionSharingImage,
  "/blog/happy-new-year-2026-year-of-growth": happyNewYear2026Image,
  "/blog/overcoming-marketing-challenges-small-business": overcomingMarketingChallengesImage,
  "/blog/employee-retention-company-culture-leadership": employeeRetentionLeadershipImage,
  "/blog/business-health-scores-by-stage": businessHealthScoresStagesImage,
  "/blog/fractional-cfo-toolkit": fractionalCFOToolkitImage,
  "/blog/technology-innovation-gap-competitive-advantage": technologyInnovationGapImage,
  "/blog/business-blind-spots-operational-issues-invisible-leadership": businessBlindSpotsOperationalImage,
  "/blog/customer-loyalty-starts-with-reliability": customerLoyaltyImage,
  "/blog/stress-test-pricing-framework-margins-cash-flow": stressTestPricingImage,
  "/blog/how-to-prioritize-operator-survival-guide": howToPrioritizeImage,
  "/blog/chaos-to-clarity-operating-rhythm-scaling-teams": chaosToClarity,
  "/blog/small-business-financials-know-your-numbers": smallBusinessFinancialsImage,
  "/blog/growth-trap-broken-business-model": growthTrapImage,
  "/blog/grow-your-business-with-ai": growWithAIImage,
  "/blog/how-to-check-your-business-health": howToCheckBusinessHealthImage,
  "/blog/overcoming-bi-challenges-smb": overcomingBIChallengesImage,
  "/blog/hidden-costs-manual-processes": hiddenCostsManualProcessesImage,
  "/blog/financial-stewardship-everyones-responsibility": financialStewardshipImage,
  "/blog/business-health-assessment-2025": businessHealthImage,
  "/blog/identifying-smb-leadership-blind-spots": leadershipBlindSpotsImage,
  "/blog/scaling-operations-without-losing-control": scalingOperationsImage,
  "/blog/success-begins-with-2026-strategy": businessStrategyPlanningImage,
  "/blog/small-business-struggles": smallBusinessStrugglesImage,
  "/blog/confirm-business-weaknesses-without-consultants": confirmWeaknessesImage,
  "/blog/small-business-blind-spots-2025": blindSpotsImage,
  "/blog/small-business-survival-checklist-2025": survivalChecklistImage,
  "/blog/small-business-ai-adoption": aiAdoptionImage,
  "/blog/smb-scaling-paradox-2025": smbScalingParadoxImage,
  "/blog/cash-flow-crisis-management": cashFlowCrisisImage,
  "/blog/Q4-Cost-Cuts-2025": q4CostCutsImage,
  "/blog/impact-over-information": informationOverloadImage,
  "/blog/smb-cash-flow-hacks-2025": cashFlowHacksImage,
  "/blog/e-commerce-scaling-5-strategies-for-smbs-thriving-in-2025": ecommerceScalingImage,
  "/blog/2025-smb-financial-trends": smbFinancialTrendsImage,
  "/blog/talent-wars-smb-hiring-2025": talentWarsImage,
  "/blog/solving-smb-workforce-gaps-2025": workforceGapsImage,
  "/blog/real-time-analytics-smb-agility": realTimeAnalyticsImage,
  "/blog/daily-grind-fixes": dailyGrindImage,
  "/blog/leadership-stress-success": leadershipStressImage,
  "/blog/retail-remote-tools": retailToolsImage,
  "/blog/warning-signs-business": warningSignsImage,
  "/blog/ai-business-analytics": aiAnalyticsImage,
  "/blog/financial-health-metrics": financialMetricsImage,
  "/blog/operational-resilience": resilienceImage,
  "/blog/business-intelligence-roi": biRoiImage,
  "/blog/strategic-planning-post-pandemic": strategicPlanningImage,
  "/blog/when-to-pivot": pivotImage,
  "/blog/complete-guide-business-health-assessment-2026": businessHealthAssessment2026Image
};

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const resultsRef = useRef<HTMLElement>(null);
  
  // Use centralized data with image mapping
  const featuredPost = {
    ...featuredPostData,
    imageUrl: businessHealthAssessment2026Image
  };

  const blogPosts = blogPostsData.map(post => ({
    ...post,
    imageUrl: imageMap[post.slug] || businessAnalystImage
  }));


  const categories = [
    "All Posts",
    "Business Strategy", 
    "Financial Management",
    "Operations",
    "Technology",
    "Risk Management",
    "Growth & Scaling",
    "Business Leadership"
  ];

  // State for filtering and search
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [searchTerm, setSearchTerm] = useState("");

  // Handle URL search parameters
  useEffect(() => {
    const urlSearchTerm = searchParams.get('search');
    if (urlSearchTerm) {
      setSearchTerm(urlSearchTerm);
    }
  }, [searchParams]);

  // Enhanced filter and search logic
  const filteredPosts = useMemo(() => {
    let filtered = blogPosts;

    // Filter by category (support multiple categories separated by commas)
    if (selectedCategory !== "All Posts") {
      filtered = filtered.filter(post => {
        const categories = post.category.split(',').map(c => c.trim());
        return categories.includes(selectedCategory);
      });
    }

    // Enhanced search across all fields including keywords
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.category.toLowerCase().includes(searchLower) ||
        post.author.toLowerCase().includes(searchLower) ||
        post.altText.toLowerCase().includes(searchLower) ||
        (post.keywords && post.keywords.toLowerCase().includes(searchLower))
      );
    }

    // Sort by date (most recent first)
    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });

    return filtered;
  }, [selectedCategory, searchTerm, blogPosts]);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Business Insights & Growth Strategies Blog | BizHealth.ai"
        description="Expert insights, practical strategies, and data-driven analysis for SMB leaders. Learn from business intelligence experts about operations, finance, leadership, and growth."
        keywords="business blog, SMB insights, business strategy, operational excellence, financial management, leadership development, business intelligence, growth strategies"
        canonical="https://bizhealth.ai/blog"
        ogImage="/og-images/og-blog.jpg"
      />
      <StructuredData 
        type="organization"
      />
      <GlobalNavigation />
      
      {/* Hero Section */}
      <section className="relative pt-40 h-[400px] md:h-[500px] overflow-hidden">
        {/* Background Image */}
        <img 
          src={smbTeamHeroImage} 
          alt="Team discussing business growth strategies"
          width={1200}
          height={500}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          // @ts-ignore - fetchpriority is valid but not in React types
          fetchpriority="high"
          decoding="async"
        />
        
        {/* Semi-transparent Overlay */}
        <div className="absolute inset-0 bg-primary/50" />
        
        {/* Content Container */}
        <div className="relative h-full container mx-auto px-6 flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            <div className="max-w-4xl w-full text-center space-y-6">
              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                Business Insights & Strategies
              </h1>
              
              {/* Description Text */}
              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                Expert insights, practical strategies, and data-driven analysis to help you navigate the complexities 
                of modern business. Learn from our team's decades of experience.
              </p>
            </div>
          </div>
          
          {/* Search Bar - Bottom of Hero */}
          <div className="flex justify-center pb-8">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search blogs, categories, keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
                className="w-full pl-10 pr-20 py-3 border border-border rounded-lg bg-background/95 backdrop-blur-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-lg"
              />
              <button
                onClick={() => {
                  document.activeElement instanceof HTMLElement && document.activeElement.blur();
                  const offset = 80; // Account for navbar height
                  const elementPosition = resultsRef.current?.getBoundingClientRect().top ?? 0;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90 text-white px-4 py-1.5 rounded-md transition-colors text-sm font-medium"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-primary rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
              
              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                {/* Content Column */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">Featured</span>
                    <span className="text-white/80 text-sm">{featuredPost.category}</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                    {featuredPost.title}
                  </h2>
                  
                  <p className="text-white/90 text-lg mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-6 mb-6 text-white/80 flex-wrap">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="text-sm">{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{featuredPost.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{featuredPost.readTime}</span>
                    </div>
                  </div>
                  
                  <Link 
                    to="/blog/complete-guide-business-health-assessment-2026" 
                    className="inline-flex items-center gap-2 bg-background text-primary px-6 py-3 rounded-lg font-semibold hover:bg-muted transition-colors"
                  >
                    Read Full Article
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Image Column */}
                <div className="relative">
                  <img 
                    src={featuredPost.imageUrl}
                    alt={featuredPost.altText}
                    width={600}
                    height={320}
                    className="w-full h-80 object-cover rounded-xl shadow-lg"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Categories Section */}
      <section className="py-10 bg-biz-green/5">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Desktop: Side by Side | Mobile: Stacked */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start lg:items-center">
              
              {/* Search Bar */}
              <div className="w-full lg:w-96 flex-shrink-0">
                <label className="block text-sm font-semibold text-foreground mb-2 pl-1">
                  Search Articles
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary/60 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search articles by title, topic..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm hover:shadow-md transition-all"
                  />
                </div>
              </div>

              {/* Divider - Desktop Only */}
              <div className="hidden lg:block w-px h-10 bg-border"></div>

              {/* Categories Filter */}
              <div className="flex-1 w-full">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category, index) => (
                    <button 
                      key={index}
                      onClick={() => {
                        setSelectedCategory(category);
                        setSearchTerm("");
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedCategory === category 
                          ? 'bg-primary text-white shadow-md scale-105' 
                          : 'bg-background border-2 border-border text-foreground hover:border-primary/50 hover:bg-primary/5 hover:scale-105'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section ref={resultsRef} className="pt-8 pb-20 bg-biz-grey/10">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Results Count */}
            <div className="mb-8 text-center">
              <p className="text-muted-foreground">
                {filteredPosts.length === blogPosts.length 
                  ? `Showing all ${filteredPosts.length} posts` 
                  : `Found ${filteredPosts.length} of ${blogPosts.length} posts`}
                {searchTerm && ` for "${searchTerm}"`}
                {selectedCategory !== "All Posts" && ` in ${selectedCategory}`}
              </p>
            </div>

            {/* Posts Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <Link 
                    key={index} 
                    to={post.slug}
                    className="group"
                  >
                    <article className="border border-border rounded-lg overflow-hidden bg-background transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30 animate-fade-in cursor-pointer h-full flex flex-col">
                      {/* Thumbnail Image */}
                      <div className="relative overflow-hidden">
                        <img 
                          src={post.imageUrl} 
                          alt={`Thumbnail: ${post.altText}`}
                          width={400}
                          height={225}
                          className="w-full h-48 md:h-42 object-cover transition-transform duration-300 group-hover:scale-105"
                          style={{ aspectRatio: '16/9' }}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                            {post.category}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-semibold mb-3 text-foreground leading-tight group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        
                        <p className="text-muted-foreground mb-4 leading-relaxed text-sm flex-1">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        
                        <div className="inline-flex items-center gap-2 text-primary group-hover:text-primary/80 transition-colors font-medium text-sm">
                          Read Article
                          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">No posts found matching your criteria.</p>
                <button 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All Posts");
                  }}
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Clear filters and show all posts
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Stay Ahead of the Curve
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get our latest insights, tools, and strategies delivered straight to your inbox. 
              Join over 2,500 business owners who trust our expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition-all duration-300">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              No spam, unsubscribe at any time. Read our privacy policy.
            </p>
          </div>
        </div>
      </section>

      <GradientDivider variant="green-gold" />
      <GlobalFooter />
      <PromotionalBanner />
    </div>
  );
};

export default Blog;