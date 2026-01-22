import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

interface RelatedArticle {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
}

interface RelatedArticlesEnhancedProps {
  articles: RelatedArticle[];
}

const RelatedArticlesEnhanced = ({ articles }: RelatedArticlesEnhancedProps) => {
  return (
    <section className="pt-12 pb-20 relative overflow-hidden bg-gradient-to-br from-[hsl(var(--biz-navy))]/5 via-[hsl(var(--biz-green))]/8 to-[hsl(var(--biz-gold))]/5">
      {/* Subtle texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--biz-navy)) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[hsl(var(--biz-green))]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[hsl(var(--biz-navy))]/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header with decorative accent */}
          <div className="text-center mb-12">
            {/* Decorative accent */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-[hsl(var(--biz-green))] to-transparent" />
              <Sparkles className="w-4 h-4 text-[hsl(var(--biz-green))]" />
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-[hsl(var(--biz-green))] to-transparent" />
            </div>
            
            {/* Enhanced heading */}
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-[hsl(var(--biz-navy))] via-[hsl(var(--biz-blue))] to-[hsl(var(--biz-green))] bg-clip-text text-transparent">
              Related Articles
            </h2>
            
            {/* Enhanced subheading with gradient accent */}
            <p className="mt-3 max-w-xl mx-auto text-base">
              <span className="bg-gradient-to-r from-[hsl(var(--biz-navy))]/70 to-[hsl(var(--biz-green))]/80 bg-clip-text text-transparent font-medium">
                Explore more insights to help grow your business
              </span>
            </p>
          </div>
          
          {/* Articles Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                className="group relative bg-background rounded-2xl border border-border/40 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-[hsl(var(--biz-green))]/8 hover:border-[hsl(var(--biz-green))]/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Hover gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--biz-green))]/0 via-[hsl(var(--biz-navy))]/0 to-[hsl(var(--biz-gold))]/0 group-hover:from-[hsl(var(--biz-green))]/3 group-hover:via-[hsl(var(--biz-navy))]/2 group-hover:to-[hsl(var(--biz-gold))]/3 transition-all duration-500" />
                
                {/* Top accent bar */}
                <div className="h-1 w-full bg-gradient-to-r from-[hsl(var(--biz-green))] via-[hsl(var(--biz-blue))] to-[hsl(var(--biz-gold))] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="p-6 relative z-10">
                  {/* Refined category badge - softer, smaller */}
                  <div className="mb-4">
                    <span className="inline-flex items-center text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border border-border/50 bg-[hsl(var(--biz-navy))]/5 text-[hsl(var(--biz-navy))]/70 dark:text-foreground/60">
                      {article.category}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-[hsl(var(--biz-green))] transition-colors duration-300 line-clamp-2 leading-tight">
                    {article.title}
                  </h3>
                  
                  {/* Excerpt */}
                  <p className="text-sm text-muted-foreground mb-5 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  {/* Read More Link */}
                  <div className="flex items-center gap-2 text-[hsl(var(--biz-green))] font-semibold text-sm">
                    <span className="relative">
                      Read Article
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[hsl(var(--biz-green))] group-hover:w-full transition-all duration-300" />
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
                
                {/* Corner decoration */}
                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-tl from-[hsl(var(--biz-green))]/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedArticlesEnhanced;
