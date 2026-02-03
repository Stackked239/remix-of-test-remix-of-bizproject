import { useState, useEffect, ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'loading'> {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Priority images load eagerly (above-the-fold). Default is lazy loading. */
  priority?: boolean;
  /** Optional placeholder color while loading */
  placeholderColor?: string;
  /** Optional CSS object-fit value */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

/**
 * OptimizedImage - Performance-focused image component
 * 
 * Features:
 * - Automatic lazy loading (unless priority=true)
 * - fetchpriority attribute for LCP optimization
 * - Required width/height to prevent CLS (Cumulative Layout Shift)
 * - Optional fade-in animation on load
 * - Proper aspect ratio preservation
 * - Automatic preload link injection for priority images
 * 
 * Usage:
 * <OptimizedImage 
 *   src={myImage} 
 *   alt="Description" 
 *   width={800} 
 *   height={600}
 *   priority // for above-the-fold images
 * />
 */
const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  priority = false,
  placeholderColor = 'bg-muted',
  objectFit = 'cover',
  className,
  ...props
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Inject preload link for priority images
  useEffect(() => {
    if (priority && src) {
      // Check if preload link already exists
      const existingPreload = document.querySelector(`link[rel="preload"][href="${src}"]`);
      if (!existingPreload) {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        preloadLink.href = src;
        preloadLink.setAttribute('fetchpriority', 'high');
        document.head.appendChild(preloadLink);
        
        return () => {
          // Cleanup on unmount
          if (preloadLink.parentNode) {
            preloadLink.parentNode.removeChild(preloadLink);
          }
        };
      }
    }
  }, [priority, src]);

  return (
    <div 
      className={cn(
        'relative overflow-hidden',
        placeholderColor,
        className
      )}
      style={{ 
        aspectRatio: `${width} / ${height}`,
        maxWidth: width 
      }}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          // @ts-ignore - fetchpriority is a valid HTML attribute but not yet in React types
          fetchpriority={priority ? 'high' : 'low'}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={cn(
            'w-full h-full transition-opacity duration-300',
            objectFit === 'cover' && 'object-cover',
            objectFit === 'contain' && 'object-contain',
            objectFit === 'fill' && 'object-fill',
            objectFit === 'none' && 'object-none',
            objectFit === 'scale-down' && 'object-scale-down',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          {...props}
        />
      ) : (
        <div 
          className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-sm"
          role="img"
          aria-label={alt}
        >
          Image unavailable
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;

/**
 * LazyImage - Simplified lazy loading wrapper for inline images
 * Use this for blog/content images where OptimizedImage wrapper isn't needed
 */
export const LazyImage = ({
  src,
  alt,
  className,
  priority = false,
  ...props
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
} & ImgHTMLAttributes<HTMLImageElement>) => (
  <img
    src={src}
    alt={alt}
    loading={priority ? 'eager' : 'lazy'}
    decoding={priority ? 'sync' : 'async'}
    // @ts-ignore
    fetchpriority={priority ? 'high' : 'low'}
    className={className}
    {...props}
  />
);
