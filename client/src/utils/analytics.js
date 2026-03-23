export function trackEvent(eventName, params = {}) {
  if (!eventName) return;

  if (typeof window === 'undefined') return;

  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
      return;
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...params });
      return;
    }

    if (import.meta.env.DEV) {
      console.info('[analytics]', eventName, params);
    }
  } catch (err) {
    if (import.meta.env.DEV) {
      console.warn('Analytics tracking failed:', err);
    }
  }
}
