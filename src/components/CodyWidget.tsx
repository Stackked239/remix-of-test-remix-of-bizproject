import { useEffect } from 'react';

export const CodyWidget = () => {
  useEffect(() => {
    // Set Cody settings
    (window as any).codySettings = { 
      widget_id: 'a0273a0d-bd73-4772-b4e6-aaf5cb7c4aef' 
    };

    // Load Cody script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://trinketsofcody.com/cody-widget.js';
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return null;
};
