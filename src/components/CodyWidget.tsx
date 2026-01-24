import { useEffect, useRef } from 'react';

const WIDGET_ID = 'a0273a0d-bd73-4772-b4e6-aaf5cb7c4aef';
const SCRIPT_ID = 'cody-widget-loader';
const SCRIPT_URL = 'https://trinketsofcody.com/cody-widget.js';

export const CodyWidget = () => {
  const mounted = useRef(false);

  useEffect(() => {
    // Prevent double mount in StrictMode
    if (mounted.current) return;
    mounted.current = true;

    console.log('[CodyWidget] Component mounted, initializing...');

    const loadScript = () => {
      // Skip if already loaded
      if (document.getElementById(SCRIPT_ID)) {
        console.log('[CodyWidget] Script already in DOM');
        return;
      }

      // Set Cody settings FIRST
      (window as any).codySettings = {
        widget_id: WIDGET_ID,
        base_url: 'https://getcody.ai',
      };

      console.log('[CodyWidget] Settings configured, injecting script...');

      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.src = SCRIPT_URL;
      script.async = true;

      script.onload = () => {
        console.log('[CodyWidget] ✓ Script loaded successfully');
      };

      script.onerror = (e) => {
        console.error('[CodyWidget] ✗ Script failed to load:', e);
        // Single retry after 3 seconds
        setTimeout(() => {
          console.log('[CodyWidget] Retrying...');
          const existing = document.getElementById(SCRIPT_ID);
          if (existing) existing.remove();
          
          const retry = document.createElement('script');
          retry.id = SCRIPT_ID;
          retry.src = SCRIPT_URL;
          retry.async = true;
          document.body.appendChild(retry);
        }, 3000);
      };

      document.body.appendChild(script);
    };

    // Load immediately - don't wait for idle
    if (document.readyState === 'complete') {
      loadScript();
    } else {
      window.addEventListener('load', loadScript, { once: true });
    }

    // Patch iframes for z-index visibility
    const observer = new MutationObserver(() => {
      document.querySelectorAll('iframe[class*="cody"]').forEach((el) => {
        const iframe = el as HTMLIFrameElement;
        if (!iframe.dataset.patched) {
          iframe.dataset.patched = '1';
          iframe.style.zIndex = '2147483647';
        }
      });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
};

export default CodyWidget;
