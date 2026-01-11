import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleAuthor?: string;
  noindex?: boolean;
}

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website',
  ogImage = 'https://bizhealth.ai/og-image.jpg',
  articlePublishedTime,
  articleModifiedTime,
  articleAuthor,
  noindex = false,
}: SEOProps) => {
  const siteTitle = 'BizHealth.ai';
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;
  
  // CRITICAL: Use canonical prop directly when provided to ensure correct URL during SSR/prerendering
  // Only fall back to window.location if canonical is not explicitly set
  const url = canonical || (typeof window !== 'undefined' ? `https://bizhealth.ai${window.location.pathname}` : 'https://bizhealth.ai');
  
  // Convert relative OG image paths to absolute URLs for social sharing
  const absoluteOgImage = ogImage.startsWith('http') 
    ? ogImage 
    : `https://bizhealth.ai${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteOgImage} />

      {/* Article Specific Tags */}
      {ogType === 'article' && (
        <>
          {articlePublishedTime && (
            <meta property="article:published_time" content={articlePublishedTime} />
          )}
          {articleModifiedTime && (
            <meta property="article:modified_time" content={articleModifiedTime} />
          )}
          {articleAuthor && (
            <meta property="article:author" content={articleAuthor} />
          )}
        </>
      )}

      {/* Additional SEO Tags */}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <meta name="googlebot" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <meta name="bingbot" content={noindex ? "noindex, nofollow" : "index, follow"} />
    </Helmet>
  );
};

export default SEO;
