import React from "react";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import GradientDivider from "@/components/GradientDivider";
import PromotionalBanner from "@/components/PromotionalBanner";

interface BlogPostLayoutProps {
  children: React.ReactNode;
  /** Show PromotionalBanner after the footer (default: false) */
  showPromoBanner?: boolean;
}

/**
 * A reusable layout wrapper for blog posts that includes:
 * - GlobalNavigation at the top
 * - GradientDivider before the footer
 * - GlobalFooter at the bottom
 * - Optional PromotionalBanner after footer
 * 
 * @example
 * <BlogPostLayout>
 *   <SEO ... />
 *   <StructuredData ... />
 *   <BlogHeroSection ... />
 *   <article>...</article>
 *   <RelatedArticles ... />
 * </BlogPostLayout>
 * 
 * @example
 * // With promotional banner
 * <BlogPostLayout showPromoBanner>
 *   ...
 * </BlogPostLayout>
 */
const BlogPostLayout = ({ children, showPromoBanner = false }: BlogPostLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <GlobalNavigation />
      {children}
      <GradientDivider />
      <GlobalFooter />
      {showPromoBanner && <PromotionalBanner />}
    </div>
  );
};

export default BlogPostLayout;
