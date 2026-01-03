import { useState, ImgHTMLAttributes } from 'react';
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
 * - Required width/height to prevent CLS (Cumulative Layout Shift)
 * - Optional fade-in animation on load
 * - Proper aspect ratio preservation
 * 
 * Usage:
 * <OptimizedImage 
 *   src={myImage} 
 *   alt="Description" 
 *   width={800} 
 *   height={600} 
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

  const aspectRatio = height / width;

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
