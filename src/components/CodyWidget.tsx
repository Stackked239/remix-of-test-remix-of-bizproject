import { useEffect, useRef } from 'react';

export const CodyWidget = () => {
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Prevent double initialization (React 18 StrictMode)
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const loadWidget = () => {
      // Avoid duplicate injection
      const existing = document.getElementById('cody-widget-loader') as HTMLScriptElement | null;
      if (existing) {
        console.log('[CodyWidget] Script already exists, skipping');
        return;
      }

      // Expose Cody settings before script loads
      (window as any).codySettings = {
        widget_id: 'a0273a0d-bd73-4772-b4e6-aaf5cb7c4aef',
        base_url: 'https://getcody.ai',
      };

      console.log('[CodyWidget] Injecting cody-widget.js script');

      const script = document.createElement('script');
      script.id = 'cody-widget-loader';
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://trinketsofcody.com/cody-widget.js';
      
      script.onerror = (e) => {
        console.error('[CodyWidget] Failed to load cody-widget.js:', e);
      };
      
      script.onload = () => {
        console.log('[CodyWidget] Script loaded successfully');
      };

      document.body.appendChild(script);

      // Patch Cody iframes with required permissions and top z-index
      const patchIframes = () => {
        document.querySelectorAll('iframe.cody-iframe').forEach((el) => {
          const iframe = el as HTMLIFrameElement;
          if (!iframe.hasAttribute('data-cody-patched')) {
            iframe.setAttribute('data-cody-patched', '1');
            try { iframe.allow = 'microphone; camera; clipboard-write; autoplay'; } catch {}
            if (!iframe.style.zIndex) iframe.style.zIndex = '2147483647';
          }
        });
      };
      const observer = new MutationObserver(() => patchIframes());
      observer.observe(document.body, { childList: true, subtree: true });
      patchIframes();
    };

    // For SSG: wait for hydration to complete before injecting external scripts
    // Use requestIdleCallback for better timing, with setTimeout fallback
    const scheduleLoad = () => {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => {
          setTimeout(loadWidget, 100);
        }, { timeout: 2000 });
      } else {
        setTimeout(loadWidget, 500);
      }
    };

    // Check document ready state for SSG hydration scenarios
    if (document.readyState === 'complete') {
      scheduleLoad();
    } else {
      // Wait for page to fully load
      const handleLoad = () => {
        scheduleLoad();
        window.removeEventListener('load', handleLoad);
      };
      window.addEventListener('load', handleLoad);
      
      return () => {
        window.removeEventListener('load', handleLoad);
      };
    }
  }, []);

  return null;
};

export default CodyWidget;
