import { useEffect, useState } from 'react';

interface UseImagePreloadOptions {
  /** Start preloading immediately, or wait until called */
  immediate?: boolean;
  /** Priority level for the preload */
  priority?: 'high' | 'low' | 'auto';
}

/**
 * Hook to preload images and track loading state
 * 
 * Usage:
 * const { isLoaded, isError } = useImagePreload(heroImage, { immediate: true, priority: 'high' });
 */
export const useImagePreload = (
  src: string | undefined,
  options: UseImagePreloadOptions = {}
) => {
  const { immediate = true, priority = 'auto' } = options;
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!src || !immediate) return;

    // Add preload link to head
    const existingPreload = document.querySelector(`link[rel="preload"][href="${src}"]`);
    let preloadLink: HTMLLinkElement | null = null;

    if (!existingPreload && priority === 'high') {
      preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'image';
      preloadLink.href = src;
      preloadLink.setAttribute('fetchpriority', 'high');
      document.head.appendChild(preloadLink);
    }

    // Also use Image constructor to track loading state
    const img = new Image();
    img.src = src;
    
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setIsError(true);

    // Check if already cached
    if (img.complete) {
      setIsLoaded(true);
    }

    return () => {
      if (preloadLink?.parentNode) {
        preloadLink.parentNode.removeChild(preloadLink);
      }
    };
  }, [src, immediate, priority]);

  return { isLoaded, isError };
};

/**
 * Preload multiple images at once
 * 
 * Usage:
 * const { allLoaded, loadedCount } = useImagesPreload([img1, img2, img3]);
 */
export const useImagesPreload = (
  srcs: (string | undefined)[],
  options: UseImagePreloadOptions = {}
) => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const validSrcs = srcs.filter((src): src is string => !!src);

  useEffect(() => {
    if (!options.immediate) return;

    validSrcs.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => setLoadedCount((c) => c + 1);
      img.onerror = () => setErrorCount((c) => c + 1);
    });
  }, [validSrcs.join(','), options.immediate]);

  return {
    allLoaded: loadedCount === validSrcs.length,
    loadedCount,
    errorCount,
    total: validSrcs.length,
  };
};

export default useImagePreload;
