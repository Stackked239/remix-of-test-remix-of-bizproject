import { useEffect } from 'react';

const WIDGET_ID = 'a0273a0d-bd73-4772-b4e6-aaf5cb7c4aef';
const SCRIPT_ID = 'cody-widget-loader';
const SCRIPT_URL = 'https://trinketsofcody.com/cody-widget.js';

export const CodyWidget = () => {
  useEffect(() => {
    // Skip SSR
    if (typeof window === 'undefined') return;

    // Check if already loaded
    if (document.getElementById(SCRIPT_ID)) {
      console.log('[CodyWidget] Script already exists');
      return;
    }

    // Set Cody settings before loading script
    (window as any).codySettings = {
      widget_id: WIDGET_ID,
      base_url: 'https://getcody.ai',
    };

    console.log('[CodyWidget] Loading widget script...');

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = SCRIPT_URL;
    script.async = true;

    script.onload = () => {
      console.log('[CodyWidget] Script loaded successfully');
    };

    script.onerror = () => {
      console.error('[CodyWidget] Failed to load script');
      // Retry once after 2 seconds
      setTimeout(() => {
        const retryScript = document.getElementById(SCRIPT_ID);
        if (retryScript) retryScript.remove();
        
        const retry = document.createElement('script');
        retry.id = SCRIPT_ID;
        retry.src = SCRIPT_URL;
        retry.async = true;
        retry.onload = () => console.log('[CodyWidget] Retry successful');
        retry.onerror = () => console.error('[CodyWidget] Retry failed');
        document.body.appendChild(retry);
      }, 2000);
    };

    document.body.appendChild(script);

    // Patch iframes for visibility
    const patchIframes = () => {
      document.querySelectorAll('iframe.cody-iframe').forEach((el) => {
        const iframe = el as HTMLIFrameElement;
        if (!iframe.hasAttribute('data-patched')) {
          iframe.setAttribute('data-patched', '1');
          iframe.style.zIndex = '2147483647';
        }
      });
    };

    const observer = new MutationObserver(patchIframes);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
};

export default CodyWidget;
