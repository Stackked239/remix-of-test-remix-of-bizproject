// Analytics utility for tracking conversions and user engagement

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export interface DownloadEventData {
  fileName: string;
  fileType: string;
  source: string;
  category?: string;
  value?: number;
}

export interface LeadEventData {
  contentName: string;
  contentCategory?: string;
  source: string;
  value?: number;
}

export interface PageViewData {
  pagePath: string;
  pageTitle: string;
  source?: string;
}

// Track file download events
export const trackDownload = (data: DownloadEventData) => {
  const { fileName, fileType, source, category = 'lead_magnet', value } = data;
  
  // Console log for development
  console.log('[Analytics] Download tracked:', { fileName, fileType, source, category, value });

  // Google Analytics 4
  if (window.gtag) {
    window.gtag('event', 'file_download', {
      file_name: fileName,
      file_extension: fileType,
      link_url: source,
      event_category: category,
      value: value,
    });

    // Also track as conversion event
    window.gtag('event', 'generate_lead', {
      event_category: 'conversion',
      event_label: fileName,
      value: value || 0,
    });
  }

  // Facebook Pixel
  if (window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: fileName,
      content_category: category,
      value: value || 0,
      currency: 'USD',
    });

    // Also track as custom download event
    window.fbq('trackCustom', 'PDFDownload', {
      content_name: fileName,
      source: source,
    });
  }

  // Push to dataLayer for GTM
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'pdf_download',
      fileName: fileName,
      fileType: fileType,
      source: source,
      category: category,
      value: value,
      timestamp: new Date().toISOString(),
    });
  }
};

// Track CTA button clicks
export const trackCTAClick = (ctaName: string, destination: string, category?: string) => {
  console.log('[Analytics] CTA Click:', { ctaName, destination, category });

  if (window.gtag) {
    window.gtag('event', 'cta_click', {
      event_category: category || 'engagement',
      event_label: ctaName,
      link_url: destination,
    });
  }

  if (window.fbq) {
    window.fbq('trackCustom', 'CTAClick', {
      cta_name: ctaName,
      destination: destination,
      category: category,
    });
  }

  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'cta_click',
      ctaName: ctaName,
      destination: destination,
      category: category,
      timestamp: new Date().toISOString(),
    });
  }
};

// Track scroll depth for engagement analysis
export const trackScrollDepth = (percentage: number, pagePath: string) => {
  console.log('[Analytics] Scroll Depth:', { percentage, pagePath });

  if (window.gtag) {
    window.gtag('event', 'scroll', {
      event_category: 'engagement',
      event_label: pagePath,
      value: percentage,
    });
  }

  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'scroll_depth',
      scrollPercentage: percentage,
      pagePath: pagePath,
      timestamp: new Date().toISOString(),
    });
  }
};

// Track section views for engagement
export const trackSectionView = (sectionName: string, pagePath: string) => {
  console.log('[Analytics] Section View:', { sectionName, pagePath });

  if (window.gtag) {
    window.gtag('event', 'section_view', {
      event_category: 'engagement',
      event_label: sectionName,
      page_path: pagePath,
    });
  }

  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'section_view',
      sectionName: sectionName,
      pagePath: pagePath,
      timestamp: new Date().toISOString(),
    });
  }
};

// Track time on page
export const trackTimeOnPage = (seconds: number, pagePath: string) => {
  console.log('[Analytics] Time on Page:', { seconds, pagePath });

  if (window.gtag) {
    window.gtag('event', 'timing_complete', {
      name: 'time_on_page',
      value: seconds,
      event_category: 'engagement',
      event_label: pagePath,
    });
  }

  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'time_on_page',
      seconds: seconds,
      pagePath: pagePath,
      timestamp: new Date().toISOString(),
    });
  }
};

// Track FAQ interactions
export const trackFAQInteraction = (question: string, action: 'expand' | 'collapse') => {
  console.log('[Analytics] FAQ Interaction:', { question, action });

  if (window.gtag) {
    window.gtag('event', 'faq_interaction', {
      event_category: 'engagement',
      event_label: question,
      event_action: action,
    });
  }

  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'faq_interaction',
      question: question,
      action: action,
      timestamp: new Date().toISOString(),
    });
  }
};
