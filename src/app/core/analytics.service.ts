import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __BL_CONFIG?: {
      gaMeasurementId?: string;
    };
  }
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private initialized = false;

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  trackEvent(eventName: string, params: AnalyticsParams = {}): void {
    this.initializeIfNeeded();

    if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
      return;
    }

    window.gtag('event', eventName, params);
  }

  private initializeIfNeeded(): void {
    if (this.initialized || typeof window === 'undefined') {
      return;
    }

    const measurementId = window.__BL_CONFIG?.gaMeasurementId?.trim();
    if (!measurementId) {
      return;
    }

    window.dataLayer = window.dataLayer ?? [];
    window.gtag = window.gtag ?? ((...args: unknown[]) => {
      window.dataLayer?.push(args);
    });

    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      anonymize_ip: true,
      send_page_view: true
    });

    const gaScript = this.document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    this.document.head.appendChild(gaScript);

    this.initialized = true;
  }
}
