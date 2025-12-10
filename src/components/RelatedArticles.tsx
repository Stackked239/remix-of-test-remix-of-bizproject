import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

interface RelatedArticle {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
}

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  "Technology": { bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400", border: "border-blue-500/30" },
  "Financial Management": { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500/30" },
  "Operations": { bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400", border: "border-amber-500/30" },
  "Leadership": { bg: "bg-purple-500/10", text: "text-purple-600 dark:text-purple-400", border: "border-purple-500/30" },
  "Strategy": { bg: "bg-rose-500/10", text: "text-rose-600 dark:text-rose-400", border: "border-rose-500/30" },
  "Risk Management": { bg: "bg-orange-500/10", text: "text-orange-600 dark:text-orange-400", border: "border-orange-500/30" },
};

const getColorForCategory = (category: string) => {
  return categoryColors[category] || { bg: "bg-primary/10", text: "text-primary", border: "border-primary/30" };
};

const RelatedArticles = ({ articles }: RelatedArticlesProps) => {
  return (
    <section className="py-20 bg-gradient-to-b from-muted/50 to-muted relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Continue Reading
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Related Articles
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Explore more insights to help grow your business
            </p>
          </div>
          
          {/* Articles Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {articles.map((article, index) => {
              const colors = getColorForCategory(article.category);
              return (
                <Link
                  key={article.slug}
                  to={`/blog/${article.slug}`}
                  className="group relative bg-background rounded-2xl border border-border/50 overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Top accent bar */}
                  <div className={`h-1 w-full bg-gradient-to-r from-primary via-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="p-6">
                    {/* Category badge */}
                    <div className="mb-4">
                      <span className={`inline-flex items-center text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
                        {article.category}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight">
                      {article.title}
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="text-sm text-muted-foreground mb-5 line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>
                    
                    {/* Read More Link */}
                    <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                      <span className="relative">
                        Read Article
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                  
                  {/* Corner decoration */}
                  <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-tl from-primary/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedArticles;
