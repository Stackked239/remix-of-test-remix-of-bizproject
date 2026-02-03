import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface BlogHeroImageProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * BlogHeroImage - Optimized hero image for blog posts
 * 
 * Features:
 * - Eager loading with high fetch priority for LCP
 * - Fixed aspect ratio to prevent CLS
 * - Preload link injection
 * - Fade-in animation on load
 */
const BlogHeroImage = ({ src, alt, className }: BlogHeroImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Inject preload link for hero image
  useEffect(() => {
    if (src) {
      const existingPreload = document.querySelector(`link[rel="preload"][href="${src}"]`);
      if (!existingPreload) {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        preloadLink.href = src;
        preloadLink.setAttribute('fetchpriority', 'high');
        document.head.appendChild(preloadLink);
        
        return () => {
          if (preloadLink.parentNode) {
            preloadLink.parentNode.removeChild(preloadLink);
          }
        };
      }
    }
  }, [src]);

  return (
    <div 
      className={cn(
        "rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-muted",
        className
      )}
      style={{ aspectRatio: '16 / 9' }}
    >
      <img
        src={src}
        alt={alt}
        width={1200}
        height={675}
        loading="eager"
        decoding="sync"
        // @ts-ignore - fetchpriority is valid but not in React types
        fetchpriority="high"
        onLoad={() => setIsLoaded(true)}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
      />
    </div>
  );
};

export default BlogHeroImage;
