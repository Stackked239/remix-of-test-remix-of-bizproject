import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  BookOpen, 
  Filter,
  ArrowUp,
  Lightbulb,
  TrendingUp,
  Calculator
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import SEO from '@/components/SEO';
import GlobalNavigation from '@/components/GlobalNavigation';
import StoryBrandHeader from '@/components/StoryBrandHeader';
import GlobalFooter from '@/components/GlobalFooter';
import GradientDivider from '@/components/GradientDivider';
import PromotionalBanner from '@/components/PromotionalBanner';
import { glossaryTerms, categories, categoryColors, GlossaryTerm } from '@/data/glossaryData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const GlossaryOfTerms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Terms');
  const [expandedTerms, setExpandedTerms] = useState<Set<number>>(new Set());
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('glossary-favorites');
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
    // Simulate loading
    setTimeout(() => setIsLoading(false), 300);
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('glossary-favorites', JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter terms based on search and category
  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter(term => {
      const matchesSearch = searchTerm === '' || 
        term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.smbApplication.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All Terms' || term.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const toggleTerm = (id: number) => {
    const newExpanded = new Set(expandedTerms);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedTerms(newExpanded);
  };

  const toggleFavorite = (id: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const copyToClipboard = (term: GlossaryTerm) => {
    const text = `${term.term}\n\n${term.definition}\n\n${term.formula ? `Formula: ${term.formula}\n\n` : ''}Why Important: ${term.whyImportant}\n\nSMB Application: ${term.smbApplication}`;
    navigator.clipboard.writeText(text);
    setCopiedId(term.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Terms');
  };

  const hasActiveFilters = searchTerm !== '' || selectedCategory !== 'All Terms';

  return (
    <>
      <SEO 
        title="Business Glossary - 93 Key Terms for SMBs | BizHealth.ai"
        description="Master essential business terminology with our comprehensive glossary. 93 terms with definitions, formulas, and SMB examples to boost your business acumen."
        keywords="business glossary, SMB terms, business metrics, financial ratios, customer metrics, small business education, business terminology, KPI definitions"
        canonical="https://bizhealth.ai/glossary-of-terms"
        ogType="website"
        ogImage="https://bizhealth.ai/og-images/og-glossary.jpg"
      />

      <div className="min-h-screen bg-background">
        <PromotionalBanner />
        <GlobalNavigation />
        
        {/* Hero Section */}
        <section className="bg-biz-navy text-white pt-44 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <BookOpen className="w-16 h-16 text-biz-green" />
              </div>
              <h1 className="text-5xl font-montserrat font-bold mb-6">
                Business Terms Glossary
              </h1>
              <p className="text-2xl font-open-sans mb-4 text-biz-accent">
                Essential business terms with clear definitions, formulas, and real-world applications
              </p>
            </div>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Search and Filter Controls */}
          <div className="bg-biz-green/95 backdrop-blur-sm border-2 border-biz-blue rounded-lg shadow-lg p-6 mb-8 sticky top-36 z-30">
            <p className="text-base text-biz-blue mb-6 text-center">
              <span className="font-bold">Interactive Glossary - </span>
              Whether you're completing your BizHealth.ai assessment or expanding your business knowledge, 
              this interactive glossary is your comprehensive guide to understanding key business concepts.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              {/* Search Bar */}
              <div className="md:col-span-5">
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  Search Terms
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search by term, definition, or application..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-10 h-11"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter */}
              <div className="md:col-span-4">
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  Filter by Category
                </label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="All Terms" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Results Count and Clear */}
              <div className="md:col-span-3 flex flex-col items-end justify-end space-y-2">
                <p className="text-sm font-semibold text-white">
                  Showing {filteredTerms.length} of {glossaryTerms.length} terms
                </p>
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="w-full md:w-auto"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Empty State */}
          {!isLoading && filteredTerms.length === 0 && (
            <Card className="p-12 text-center">
              <Filter className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-2xl font-semibold mb-2">No terms found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </Card>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <Card key={i} className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </Card>
              ))}
            </div>
          )}

          {/* Terms Grid */}
          {!isLoading && filteredTerms.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTerms.map((term) => {
                const isExpanded = expandedTerms.has(term.id);
                const isFavorite = favorites.has(term.id);
                const isCopied = copiedId === term.id;
                
                return (
                  <Card 
                    key={term.id}
                    onClick={() => toggleTerm(term.id)}
                    className={`group hover:shadow-xl transition-all duration-300 cursor-pointer ${
                      isExpanded ? 'md:col-span-2 lg:col-span-3' : ''
                    }`}
                  >
                    <CardContent className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-biz-green transition-colors">
                            {term.term}
                          </h3>
                          <Badge 
                            className={`${categoryColors[term.category]} text-white`}
                          >
                            {term.category}
                          </Badge>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(term.id);
                          }}
                          className={`ml-2 transition-colors ${
                            isFavorite ? 'text-yellow-500' : 'text-muted-foreground hover:text-yellow-500'
                          }`}
                          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                        >
                          <svg className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        </button>
                      </div>

                      {/* Definition Preview */}
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {term.definition}
                      </p>

                      {/* Expanded Content */}
                      {isExpanded && (
                        <div className="space-y-4 animate-in fade-in duration-300">
                          <div className="pt-4 border-t border-border">
                            <p className="text-foreground leading-relaxed">
                              {term.definition}
                            </p>
                          </div>

                          {/* Formula */}
                          {term.formula && (
                            <div className="bg-biz-accent/10 rounded-lg p-4 border-l-4 border-biz-green">
                              <div className="flex items-start space-x-2">
                                <Calculator className="w-5 h-5 text-biz-green mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-sm font-semibold text-foreground mb-1">Formula</p>
                                  <code className="text-sm text-foreground font-mono">
                                    {term.formula}
                                  </code>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Why Important */}
                          <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4">
                            <div className="flex items-start space-x-2">
                              <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-sm font-semibold text-foreground mb-1">Why Important</p>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {term.whyImportant}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* SMB Application */}
                          <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4">
                            <div className="flex items-start space-x-2">
                              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-sm font-semibold text-foreground mb-1">SMB Application</p>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {term.smbApplication}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Copy Button */}
                          <div className="pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(term);
                              }}
                              className="w-full"
                            >
                              {isCopied ? (
                                <>
                                  <Check className="w-4 h-4 mr-2" />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="w-4 h-4 mr-2" />
                                  Copy Term Details
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Expand/Collapse Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTerm(term.id);
                        }}
                        className="w-full mt-4 flex items-center justify-center space-x-2 text-biz-blue hover:text-biz-green transition-colors font-medium"
                      >
                        <span>{isExpanded ? 'Show Less' : 'Read More'}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* CTA Section */}
          <section className="mt-16 bg-[hsl(var(--biz-grey))] rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-montserrat font-bold mb-4 text-[hsl(var(--biz-navy))]">
              Ready to Apply These Concepts?
            </h2>
            <p className="text-lg font-open-sans mb-8 max-w-2xl mx-auto text-[hsl(var(--biz-blue))]">
              Take your BizHealth.ai assessment to see how these metrics apply to your business and receive personalized insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-[hsl(var(--biz-green))] text-white hover:bg-[hsl(var(--biz-green))]/90">
                  Start Your Business Assessment
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" className="bg-[hsl(var(--biz-navy))] text-white hover:bg-[hsl(var(--biz-navy))]/90 border-[hsl(var(--biz-navy))]">
                  View Pricing
                </Button>
              </Link>
            </div>
          </section>
        </main>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-biz-green hover:bg-biz-green/90 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        )}

        <GradientDivider variant="green-gold" />
        <GlobalFooter />
      </div>
    </>
  );
};

export default GlossaryOfTerms;
