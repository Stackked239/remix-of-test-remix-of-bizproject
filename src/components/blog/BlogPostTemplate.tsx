import { ReactNode } from 'react';
import SEO from '@/components/SEO';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from '@/components/GlobalFooter';
import SocialShareButtons from '@/components/SocialShareButtons';
import StructuredData from '@/components/StructuredData';
import RelatedArticles from '@/components/RelatedArticles';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react';

interface RelatedArticle {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
}

interface BlogPostTemplateProps {
  // SEO Props
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  
  // Article metadata
  publishedDate: string;
  modifiedDate?: string;
  author?: string;
  readTime?: string;
  category?: string;
  
  // Hero section
  heroImage: string;
  heroImageAlt: string;
  
  // Content
  children: ReactNode;
  
  // Related articles
  showRelatedArticles?: boolean;
  relatedArticles?: RelatedArticle[];
  
  // Optional customization
  showBreadcrumb?: boolean;
  breadcrumbCategory?: string;
  breadcrumbCategoryLink?: string;
}

const BlogPostTemplate = ({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  publishedDate,
  modifiedDate,
  author = 'BizHealth.ai Team',
  readTime = '8 min read',
  category,
  heroImage,
  heroImageAlt,
  children,
  showRelatedArticles = true,
  relatedArticles = [],
  showBreadcrumb = true,
  breadcrumbCategory = 'Blog',
  breadcrumbCategoryLink = '/blog',
}: BlogPostTemplateProps) => {
  // Format dates for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title={title}
        description={description}
        keywords={keywords}
        canonical={canonical}
        ogType="article"
        ogImage={ogImage}
        articlePublishedTime={publishedDate}
        articleModifiedTime={modifiedDate || publishedDate}
        articleAuthor={author}
      />
      
      <StructuredData
        type="article"
        headline={title}
        description={description}
        image={ogImage || heroImage}
        datePublished={publishedDate}
        dateModified={modifiedDate || publishedDate}
        author={author}
        url={canonical || `https://bizhealth.ai${typeof window !== 'undefined' ? window.location.pathname : ''}`}
      />

      <GlobalNavigation />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12 md:py-16">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            {showBreadcrumb && (
              <nav className="mb-6" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <li>
                    <Link to="/" className="hover:text-primary transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>/</li>
                  <li>
                    <Link to={breadcrumbCategoryLink} className="hover:text-primary transition-colors">
                      {breadcrumbCategory}
                    </Link>
                  </li>
                  {category && (
                    <>
                      <li>/</li>
                      <li className="text-foreground">{category}</li>
                    </>
                  )}
                </ol>
              </nav>
            )}

            <div className="max-w-4xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                {title}
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-6">
                {description}
              </p>

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={publishedDate}>{formatDate(publishedDate)}</time>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{readTime}</span>
                </div>
              </div>

              {/* Share buttons */}
              <SocialShareButtons
                title={title}
                description={description}
                variant="inline"
              />
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <div className="container mx-auto px-4 -mt-4 mb-8">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={heroImage}
                alt={heroImageAlt}
                className="w-full h-auto aspect-video object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="container mx-auto px-4 pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-li:text-muted-foreground">
              {children}
            </div>

            {/* Bottom share buttons */}
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">Found this article helpful? Share it with your network:</p>
              <SocialShareButtons
                title={title}
                description={description}
                variant="inline"
              />
            </div>

            {/* Back to blog */}
            <div className="mt-8">
              <Link 
                to="/blog" 
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to all articles
              </Link>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {showRelatedArticles && relatedArticles.length > 0 && (
          <RelatedArticles articles={relatedArticles} />
        )}
      </main>

      <GlobalFooter />
    </div>
  );
};

export default BlogPostTemplate;
