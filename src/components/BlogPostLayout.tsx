import React from "react";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import GradientDivider from "@/components/GradientDivider";

interface BlogPostLayoutProps {
  children: React.ReactNode;
}

/**
 * A reusable layout wrapper for blog posts that includes:
 * - GlobalNavigation at the top
 * - GradientDivider before the footer
 * - GlobalFooter at the bottom
 * 
 * @example
 * <BlogPostLayout>
 *   <SEO ... />
 *   <StructuredData ... />
 *   <BlogHeroSection ... />
 *   <article>...</article>
 *   <RelatedArticles ... />
 * </BlogPostLayout>
 */
const BlogPostLayout = ({ children }: BlogPostLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <GlobalNavigation />
      {children}
      <GradientDivider />
      <GlobalFooter />
    </div>
  );
};

export default BlogPostLayout;
