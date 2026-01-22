import { useEffect } from 'react';

export const CodyWidget = () => {
  useEffect(() => {
    const loadWidget = () => {
      // Expose Cody settings before script loads
      (window as any).codySettings = {
        widget_id: 'a0273a0d-bd73-4772-b4e6-aaf5cb7c4aef',
        base_url: 'https://getcody.ai',
      };

      // Avoid duplicate injection (React 18 StrictMode double-invokes effects in dev)
      const existing = document.getElementById('cody-widget-loader') as HTMLScriptElement | null;
      if (existing) {
        return; // already loaded
      }

      const script = document.createElement('script');
      script.id = 'cody-widget-loader';
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://trinketsofcody.com/cody-widget.js';

      // Insert at end of body for lowest priority
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

    // Wait for page load, then delay 1.5s for React hydration to complete
    const initWidget = () => {
      setTimeout(loadWidget, 1500);
    };

    if (document.readyState === 'complete') {
      initWidget();
    } else {
      window.addEventListener('load', initWidget);
      return () => window.removeEventListener('load', initWidget);
    }
  }, []);

  return null;
};

