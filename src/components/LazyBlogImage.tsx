import { useState } from 'react';
import { cn } from '@/lib/utils';

interface LazyBlogImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Width percentage of container (e.g., 85 for 85%) */
  widthPercent?: number;
  /** Aspect ratio as "width/height" (e.g., "16/9", "4/3", "1/1") */
  aspectRatio?: string;
}

/**
 * LazyBlogImage - Optimized lazy-loaded image for blog content
 * 
 * Features:
 * - Lazy loading for below-the-fold images
 * - Fixed aspect ratio to prevent CLS
 * - Fade-in animation on load
 * - Proper width/height for layout stability
 */
const LazyBlogImage = ({ 
  src, 
  alt, 
  className,
  widthPercent = 85,
  aspectRatio = "16/9"
}: LazyBlogImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Parse aspect ratio to calculate dimensions
  const [w, h] = aspectRatio.split('/').map(Number);
  const width = 1200;
  const height = Math.round(width * (h / w));

  return (
    <figure 
      className={cn("my-10 mx-auto", className)}
      style={{ width: `${widthPercent}%` }}
    >
      <div 
        className="rounded-xl overflow-hidden shadow-lg bg-muted"
        style={{ aspectRatio }}
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          // @ts-ignore
          fetchpriority="low"
          onLoad={() => setIsLoaded(true)}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
        />
      </div>
    </figure>
  );
};

export default LazyBlogImage;
