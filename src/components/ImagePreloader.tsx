import { useEffect } from 'react';

interface ImagePreloaderProps {
  /** Array of image URLs to preload */
  images: string[];
  /** Priority level for preloading */
  priority?: 'high' | 'low' | 'auto';
}

/**
 * ImagePreloader - Preloads critical images for better LCP
 * 
 * Use this component at the top of pages with important hero images
 * to start loading them before the component renders.
 * 
 * Usage:
 * <ImagePreloader 
 *   images={[heroImage, logoImage]} 
 *   priority="high" 
 * />
 */
const ImagePreloader = ({ images, priority = 'high' }: ImagePreloaderProps) => {
  useEffect(() => {
    const preloadLinks: HTMLLinkElement[] = [];

    images.forEach((imageSrc) => {
      if (!imageSrc) return;
      
      // Check if preload link already exists
      const existingPreload = document.querySelector(`link[rel="preload"][href="${imageSrc}"]`);
      if (existingPreload) return;

      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'image';
      preloadLink.href = imageSrc;
      
      if (priority === 'high') {
        preloadLink.setAttribute('fetchpriority', 'high');
      }
      
      document.head.appendChild(preloadLink);
      preloadLinks.push(preloadLink);
    });

    return () => {
      // Cleanup on unmount
      preloadLinks.forEach((link) => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
    };
  }, [images, priority]);

  return null;
};

export default ImagePreloader;

/**
 * Utility to generate static preload links for index.html
 * Call this at build time if needed for critical resources
 */
export const generatePreloadLinks = (images: string[]): string => {
  return images
    .map(
      (src) =>
        `<link rel="preload" as="image" href="${src}" fetchpriority="high" />`
    )
    .join('\n    ');
};
