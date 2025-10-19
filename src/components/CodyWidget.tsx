import { useEffect } from 'react';

export const CodyWidget = () => {
  useEffect(() => {
    // Expose Cody settings before script loads
    (window as any).codySettings = {
      widget_id: 'a0273a0d-bd73-4772-b4e6-aaf5cb7c4aef',
    };
    // Debug
    try { console.debug('[CodyWidget] init with widget_id a0273a0d-bd73-4772-b4e6-aaf5cb7c4aef'); } catch {}

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

    // Do not remove the loader on cleanup to keep the widget persistent across routes
    return () => {};
  }, []);

  return null;
};

