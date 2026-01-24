import { useEffect, useRef } from 'react';

const MAX_RETRIES = 3;
const RETRY_DELAYS = [1000, 3000, 5000]; // Exponential backoff

export const CodyWidget = () => {
  const hasInitialized = useRef(false);
  const retryCount = useRef(0);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const loadWidget = (attempt = 0) => {
      // Remove failed script if retrying
      const existing = document.getElementById('cody-widget-loader');
      if (existing && attempt > 0) {
        existing.remove();
        console.log(`[CodyWidget] Retry attempt ${attempt}/${MAX_RETRIES}`);
      } else if (existing) {
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
      
      script.onerror = () => {
        console.error(`[CodyWidget] Failed to load (attempt ${attempt + 1})`);
        retryCount.current = attempt + 1;
        
        if (retryCount.current < MAX_RETRIES) {
          const delay = RETRY_DELAYS[retryCount.current - 1] || 5000;
          console.log(`[CodyWidget] Retrying in ${delay}ms...`);
          setTimeout(() => loadWidget(retryCount.current), delay);
        } else {
          console.error('[CodyWidget] Max retries reached, widget unavailable');
        }
      };
      
      script.onload = () => {
        console.log('[CodyWidget] Script loaded successfully');
        retryCount.current = 0;
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

    const scheduleLoad = () => {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => {
          setTimeout(() => loadWidget(0), 100);
        }, { timeout: 2000 });
      } else {
        setTimeout(() => loadWidget(0), 500);
      }
    };

    if (document.readyState === 'complete') {
      scheduleLoad();
    } else {
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
