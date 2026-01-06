import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import PromotionalBanner from "@/components/PromotionalBanner";
import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, FileText, HelpCircle, Home, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogData";
import { 
  searchablePages, 
  searchableTools, 
  searchableCurriculum, 
  searchablePlaybooks, 
  searchableFAQs 
} from "@/data/searchIndex";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Get search term from URL
  useEffect(() => {
    const urlSearchTerm = searchParams.get('q');
    if (urlSearchTerm) {
      setSearchTerm(urlSearchTerm);
    }
  }, [searchParams]);

  // Update URL when search changes
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term) {
      setSearchParams({ q: term });
    } else {
      setSearchParams({});
    }
  };

  // Combine all searchable content from centralized index
  // Pages includes: pages, tools, curriculum, playbooks (all non-blog, non-FAQ content)
  const allPagesAndTools = useMemo(() => [
    ...searchablePages,
    ...searchableTools,
    ...searchableCurriculum,
    ...searchablePlaybooks
  ], []);

  // Blog posts from centralized blogData with comprehensive keywords
  const allBlogs = useMemo(() => 
    blogPosts.map(post => ({
      type: "Blog Post" as const,
      title: post.title,
      excerpt: `${post.excerpt} ${post.keywords}`,
      url: post.slug,
      icon: FileText,
      category: post.category,
      keywords: post.keywords
    })), 
  []);

  // FAQs from centralized index
  const allFAQs = useMemo(() => searchableFAQs, []);

  // World-class semantic color system for content types
  const getTypeColors = (type: string): { border: string; iconBg: string; iconText: string; badge: string; badgeText: string; hoverBorder: string } => {
    switch (type) {
      case "Page":
        return {
          border: "border-l-blue-500",
          iconBg: "bg-blue-100 dark:bg-blue-900/30",
          iconText: "text-blue-600 dark:text-blue-400",
          badge: "bg-blue-100 dark:bg-blue-900/40",
          badgeText: "text-blue-700 dark:text-blue-300",
          hoverBorder: "hover:border-blue-400"
        };
      case "Blog Post":
        return {
          border: "border-l-amber-500",
          iconBg: "bg-amber-100 dark:bg-amber-900/30",
          iconText: "text-amber-600 dark:text-amber-400",
          badge: "bg-amber-100 dark:bg-amber-900/40",
          badgeText: "text-amber-700 dark:text-amber-300",
          hoverBorder: "hover:border-amber-400"
        };
      case "Tool":
        return {
          border: "border-l-emerald-500",
          iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
          iconText: "text-emerald-600 dark:text-emerald-400",
          badge: "bg-emerald-100 dark:bg-emerald-900/40",
          badgeText: "text-emerald-700 dark:text-emerald-300",
          hoverBorder: "hover:border-emerald-400"
        };
      case "FAQ":
        return {
          border: "border-l-purple-500",
          iconBg: "bg-purple-100 dark:bg-purple-900/30",
          iconText: "text-purple-600 dark:text-purple-400",
          badge: "bg-purple-100 dark:bg-purple-900/40",
          badgeText: "text-purple-700 dark:text-purple-300",
          hoverBorder: "hover:border-purple-400"
        };
      case "Curriculum":
        return {
          border: "border-l-cyan-500",
          iconBg: "bg-cyan-100 dark:bg-cyan-900/30",
          iconText: "text-cyan-600 dark:text-cyan-400",
          badge: "bg-cyan-100 dark:bg-cyan-900/40",
          badgeText: "text-cyan-700 dark:text-cyan-300",
          hoverBorder: "hover:border-cyan-400"
        };
      case "Playbook":
        return {
          border: "border-l-orange-500",
          iconBg: "bg-orange-100 dark:bg-orange-900/30",
          iconText: "text-orange-600 dark:text-orange-400",
          badge: "bg-orange-100 dark:bg-orange-900/40",
          badgeText: "text-orange-700 dark:text-orange-300",
          hoverBorder: "hover:border-orange-400"
        };
      case "Resource":
        return {
          border: "border-l-slate-500",
          iconBg: "bg-slate-100 dark:bg-slate-800/50",
          iconText: "text-slate-600 dark:text-slate-400",
          badge: "bg-slate-100 dark:bg-slate-800/50",
          badgeText: "text-slate-700 dark:text-slate-300",
          hoverBorder: "hover:border-slate-400"
        };
      default:
        return {
          border: "border-l-gray-500",
          iconBg: "bg-gray-100 dark:bg-gray-800/50",
          iconText: "text-gray-600 dark:text-gray-400",
          badge: "bg-gray-100 dark:bg-gray-800/50",
          badgeText: "text-gray-700 dark:text-gray-300",
          hoverBorder: "hover:border-gray-400"
        };
    }
  };

  // Relevance scoring function - world-class weighted search
  const calculateRelevanceScore = (item: { title: string; excerpt: string; keywords?: string; category?: string; date?: string }, term: string): number => {
    const termLower = term.toLowerCase();
    let score = 0;
    
    // Title match - highest weight (100 points base)
    const titleLower = item.title.toLowerCase();
    if (titleLower === termLower) {
      score += 150; // Exact title match
    } else if (titleLower.startsWith(termLower)) {
      score += 120; // Title starts with search term
    } else if (titleLower.includes(termLower)) {
      score += 100; // Title contains search term
    }
    
    // Excerpt match - medium weight (50 points base)
    const excerptLower = item.excerpt.toLowerCase();
    if (excerptLower.includes(termLower)) {
      // Boost for multiple occurrences
      const occurrences = (excerptLower.match(new RegExp(termLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
      score += 50 + Math.min(occurrences * 5, 25); // Up to 75 points for excerpt
    }
    
    // Category match - medium-low weight (30 points)
    if (item.category && item.category.toLowerCase().includes(termLower)) {
      score += 30;
    }
    
    // Keywords match - lower weight (20 points base)
    if (item.keywords && item.keywords.toLowerCase().includes(termLower)) {
      const keywordsLower = item.keywords.toLowerCase();
      const occurrences = (keywordsLower.match(new RegExp(termLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
      score += 20 + Math.min(occurrences * 2, 10); // Up to 30 points for keywords
    }
    
    return score;
  };

  // Filter and search logic with relevance scoring
  const filteredResults = useMemo(() => {
    if (!searchTerm.trim()) {
      return { pages: [], blogs: [], faqs: [], total: 0 };
    }

    const term = searchTerm.toLowerCase();
    
    // Search and score pages, tools, curriculum, playbooks
    const pages = allPagesAndTools
      .filter(item =>
        item.title.toLowerCase().includes(term) ||
        item.excerpt.toLowerCase().includes(term) ||
        item.keywords.toLowerCase().includes(term)
      )
      .map(item => ({ ...item, relevanceScore: calculateRelevanceScore(item, term) }))
      .sort((a, b) => b.relevanceScore - a.relevanceScore);
    
    // Search and score blog posts (including keywords)
    const blogs = allBlogs
      .filter(item =>
        item.title.toLowerCase().includes(term) ||
        item.excerpt.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        (item.keywords && item.keywords.toLowerCase().includes(term))
      )
      .map(item => ({ ...item, relevanceScore: calculateRelevanceScore(item, term) }))
      .sort((a, b) => b.relevanceScore - a.relevanceScore);
    
    // Search and score FAQs
    const faqs = allFAQs
      .filter(item =>
        item.title.toLowerCase().includes(term) ||
        item.excerpt.toLowerCase().includes(term) ||
        item.keywords.toLowerCase().includes(term)
      )
      .map(item => ({ ...item, relevanceScore: calculateRelevanceScore(item, term) }))
      .sort((a, b) => b.relevanceScore - a.relevanceScore);

    return {
      pages,
      blogs,
      faqs,
      total: pages.length + blogs.length + faqs.length
    };
  }, [searchTerm, allPagesAndTools, allBlogs, allFAQs]);

  // Apply filter and sort combined results by relevance
  const displayResults = useMemo(() => {
    let results: Array<typeof filteredResults.pages[0] | typeof filteredResults.blogs[0] | typeof filteredResults.faqs[0]> = [];
    
    if (selectedFilter === "All") {
      results = [...filteredResults.pages, ...filteredResults.blogs, ...filteredResults.faqs];
    } else if (selectedFilter === "Pages") {
      results = filteredResults.pages;
    } else if (selectedFilter === "Blog Posts") {
      results = filteredResults.blogs;
    } else if (selectedFilter === "FAQs") {
      results = filteredResults.faqs;
    }
    
    // Sort all combined results by relevance score (highest first)
    return results.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
  }, [filteredResults, selectedFilter]);

  const filters = ["All", "Pages", "Blog Posts", "FAQs"];

  return (
    <>
      <Helmet>
        <title>Search Results - BizHealth.ai</title>
        <meta name="description" content="Search results for BizHealth.ai - Find pages, blog posts, FAQs, and resources." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <PromotionalBanner />
      <GlobalNavigation />

      <main className="min-h-screen bg-gradient-to-b from-biz-green/5 via-background to-biz-green/10 pt-40 pb-12">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-biz-green to-biz-navy bg-clip-text text-transparent font-montserrat">
              Search BizHealth.ai
            </h1>
            
            {/* Search Bar */}
            <Card className="mb-6 border-2 border-primary/20 shadow-lg hover:shadow-xl transition-shadow bg-card/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                  <Input
                    type="text"
                    placeholder="Search pages, blogs, tools, FAQs..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 h-12 text-base border-muted-foreground/20 focus:border-primary"
                    autoFocus
                  />
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
            {searchTerm && (
              <div className="flex flex-wrap gap-2 mb-4">
                {filters.map((filter) => (
                  <Button
                    key={filter}
                    variant={selectedFilter === filter ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter(filter)}
                    className="font-open-sans shadow-sm hover:shadow-md transition-shadow"
                  >
                    {filter}
                    {filter === "All" && ` (${filteredResults.total})`}
                    {filter === "Pages" && ` (${filteredResults.pages.length})`}
                    {filter === "Blog Posts" && ` (${filteredResults.blogs.length})`}
                    {filter === "FAQs" && ` (${filteredResults.faqs.length})`}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Results */}
          <div className="space-y-4">
            {!searchTerm ? (
              <Card className="p-8 text-center border border-muted shadow-sm">
                <SearchIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground font-open-sans">
                  Enter a search term to find pages, blog posts, tools, and FAQs.
                </p>
              </Card>
            ) : displayResults.length === 0 ? (
              <Card className="p-8 text-center border border-muted shadow-sm">
                <p className="text-muted-foreground font-open-sans mb-4">
                  No results found for "{searchTerm}"
                </p>
                <p className="text-sm text-muted-foreground">
                  Try different keywords or browse our{" "}
                  <Link to="/blog" className="text-primary hover:underline">blog</Link>,{" "}
                  <Link to="/biztools/toolbox" className="text-primary hover:underline">tools</Link>, or{" "}
                  <Link to="/faqs" className="text-primary hover:underline">FAQs</Link>.
                </p>
              </Card>
            ) : (
              displayResults.map((result, index) => {
                const colors = getTypeColors(result.type);
                return (
                  <Link key={`${result.url}-${index}`} to={result.url}>
                    <Card className={`p-4 hover:shadow-lg transition-all duration-300 border border-muted ${colors.hoverBorder} group bg-card/50 backdrop-blur-sm border-l-[3px] ${colors.border}`}>
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg ${colors.iconBg} ${colors.iconText} transition-colors`}>
                          {result.type === "Blog Post" ? (
                            <FileText className="w-5 h-5" />
                          ) : result.type === "FAQ" ? (
                            <HelpCircle className="w-5 h-5" />
                          ) : (
                            <result.icon className="w-5 h-5" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded ${colors.badge} ${colors.badgeText}`}>
                              {result.type}
                            </span>
                            {'category' in result && result.category && (
                              <span className="text-xs text-muted-foreground">
                                {result.category}
                              </span>
                            )}
                          </div>
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors font-montserrat line-clamp-1">
                            {result.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 font-open-sans mt-1">
                            {result.excerpt.split(' ').slice(0, 30).join(' ')}...
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                      </div>
                    </Card>
                  </Link>
                );
              })
            )}
          </div>

          {/* Search Tips */}
          {searchTerm && displayResults.length > 0 && (
            <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-muted">
              <p className="text-sm text-muted-foreground font-open-sans">
                <strong>Tip:</strong> Use specific keywords like "cash flow", "SWOT", "ROI", or "leadership" to find relevant content faster.
              </p>
            </div>
          )}
        </div>
      </main>

      <GlobalFooter />
    </>
  );
};

export default Search;
