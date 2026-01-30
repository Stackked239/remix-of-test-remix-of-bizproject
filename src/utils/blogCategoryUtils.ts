// Centralized utility for blog category pages
// Auto-filters posts from blogData.ts based on category field

import { blogPosts as blogPostsData, BlogPost as BlogPostData } from "@/data/blogData";

// Import all images used across blog posts
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
import exponentialPowerEmpowermentImage from "@/assets/images/exponential-power-empowerment-hero.jpg";

// Centralized image map - slug to imported image
export const blogImageMap: Record<string, string> = {
  "/blog/exponential-power-empowerment-scaling": exponentialPowerEmpowermentImage,
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

// Default fallback image
export const defaultBlogImage = businessAnalystImage;

// Blog post interface for category pages (transformed from blogData)
export interface CategoryBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  subcategory: string;
  author: string;
  publishedAt: string;
  readTime: number;
}

// Category name mapping - maps blogData category names to URL-friendly identifiers
export const categoryMapping: Record<string, string> = {
  "Business Strategy": "business-strategy",
  "Financial Management": "financial-management",
  "Financials": "financial-management",
  "Operations": "operations",
  "Technology": "technology",
  "Risk Management": "risk-management",
  "Growth & Scaling": "growth-scaling",
  "Business Leadership": "leadership",
  "Business Intelligence": "technology" // Merged into Technology
};

// Parse date string to Date object for sorting
function parseDate(dateStr: string): Date {
  // Handle formats like "January 20, 2026" or "Jan 20, 2026"
  return new Date(dateStr);
}

// Extract read time as number from string like "10 min read"
function parseReadTime(readTimeStr: string): number {
  const match = readTimeStr.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 10;
}

// Format date for display (e.g., "Jan 20, 2026")
function formatDateForDisplay(dateStr: string): string {
  const date = parseDate(dateStr);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
}

// Extract slug without /blog/ prefix
function extractSlug(fullSlug: string): string {
  return fullSlug.replace('/blog/', '');
}

/**
 * Get all blog posts that belong to a specific category
 * @param categoryName - The category name as it appears in blogData (e.g., "Risk Management", "Growth & Scaling")
 * @param defaultSubcategory - Optional default subcategory to assign if none specified
 * @returns Array of CategoryBlogPost objects sorted by date (newest first)
 */
export function getPostsByCategory(
  categoryName: string, 
  defaultSubcategory: string = "General"
): CategoryBlogPost[] {
  const posts = blogPostsData
    .filter(post => {
      // Split categories and check if any matches
      const categories = post.category.split(',').map(c => c.trim());
      return categories.some(cat => 
        cat.toLowerCase() === categoryName.toLowerCase() ||
        // Also match "Financials" to "Financial Management"
        (categoryName === "Financial Management" && cat === "Financials")
      );
    })
    .map((post, index) => ({
      id: String(index),
      slug: extractSlug(post.slug),
      title: post.title,
      excerpt: post.excerpt,
      featuredImage: blogImageMap[post.slug] || defaultBlogImage,
      subcategory: defaultSubcategory, // Will be overridden by subcategory mapping if available
      author: post.author,
      publishedAt: formatDateForDisplay(post.date),
      readTime: parseReadTime(post.readTime)
    }))
    .sort((a, b) => {
      // Sort by date descending (newest first)
      const dateA = parseDate(blogPostsData.find(p => extractSlug(p.slug) === a.slug)?.date || '');
      const dateB = parseDate(blogPostsData.find(p => extractSlug(p.slug) === b.slug)?.date || '');
      return dateB.getTime() - dateA.getTime();
    });

  // Re-assign IDs after sorting
  return posts.map((post, index) => ({
    ...post,
    id: String(index)
  }));
}

/**
 * Get posts by category with custom subcategory assignments
 * @param categoryName - The category name
 * @param subcategoryMap - A map of slug to subcategory name
 * @param defaultSubcategory - Default subcategory if not in map
 */
export function getPostsByCategoryWithSubcategories(
  categoryName: string,
  subcategoryMap: Record<string, string>,
  defaultSubcategory: string = "General"
): CategoryBlogPost[] {
  const posts = getPostsByCategory(categoryName, defaultSubcategory);
  
  return posts.map(post => ({
    ...post,
    subcategory: subcategoryMap[post.slug] || defaultSubcategory
  }));
}

// Export the raw blogPostsData for advanced use cases
export { blogPostsData };
