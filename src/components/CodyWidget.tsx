import { useEffect } from 'react';

export const CodyWidget = () => {
  useEffect(() => {
    // Expose Cody settings before script loads
    (window as any).codySettings = {
      widget_id: 'a0273a0d-bd73-4772-b4e6-aaf5cb7c4aef',
      base_url: 'https://getcody.ai',
    };
    // Debug
    try { console.debug('[CodyWidget] init with widget_id a0273a0d-bd73-4772-b4e6-aaf5cb7c4aef'); } catch {}
    // Capture widget errors for debugging (CSP, domain allowlist, invalid id)
    window.addEventListener('unhandledrejection', (ev: any) => {
      try { console.error('[CodyWidget] unhandled rejection', ev?.reason); } catch {}
    });
    window.addEventListener('error', (ev: any) => {
      try { console.error('[CodyWidget] window error', ev?.message || ev?.error); } catch {}
    });

    // Avoid duplicate injection (React 18 StrictMode double-invokes effects in dev)
    const existing = document.getElementById('cody-widget-loader') as HTMLScriptElement | null;
    if (existing) {
      try { console.debug('[CodyWidget] loader script already present'); } catch {}
      return; // already loaded
    }

    const script = document.createElement('script');
    script.id = 'cody-widget-loader';
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://trinketsofcody.com/cody-widget.js';

    script.addEventListener('load', () => {
      try { console.debug('[CodyWidget] widget script loaded'); } catch {}
    });
    script.addEventListener('error', (e) => {
      try { console.error('[CodyWidget] widget script failed to load', e); } catch {}
    });

    // Insert before the first script tag (closer to vendor guidance)
    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else if (document.head) {
      document.head.appendChild(script);
    } else {
      document.body.appendChild(script);
    }

    // Patch Cody iframes with required permissions and top z-index
    const patchIframes = () => {
      document.querySelectorAll('iframe.cody-iframe').forEach((el) => {
        const iframe = el as HTMLIFrameElement;
        if (!iframe.hasAttribute('data-cody-patched')) {
          iframe.setAttribute('data-cody-patched', '1');
          try { iframe.allow = 'microphone; camera; clipboard-write; autoplay'; } catch {}
          // Ensure widget stays on top if site has overlays
          if (!iframe.style.zIndex) iframe.style.zIndex = '2147483647';
          iframe.addEventListener('load', () => { try { console.debug('[CodyWidget] iframe loaded', iframe.src); } catch {} });
          iframe.addEventListener('error', (e) => { try { console.error('[CodyWidget] iframe error', e); } catch {} });
        }
      });
    };
    const observer = new MutationObserver(() => patchIframes());
    observer.observe(document.body, { childList: true, subtree: true });
    // Initial pass in case iframes are already present after first click
    patchIframes();

    // Do not remove the loader on cleanup to keep the widget persistent across routes
    return () => { observer.disconnect(); };
  }, []);

  return null;
};

