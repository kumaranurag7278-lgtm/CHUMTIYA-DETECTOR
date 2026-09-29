import { track } from "@vercel/analytics";
import type { AnalyticsEventName } from "./analytics-types";

function getVisitorInfo(): { visitorId: string; isNewVisitor: boolean } {
  try {
    const key = "chumtiya_vid";
    const existing = localStorage.getItem(key);
    if (existing) {
      return { visitorId: existing, isNewVisitor: false };
    }
    const newId = "v_" + Math.random().toString(36).slice(2, 10);
    localStorage.setItem(key, newId);
    return { visitorId: newId, isNewVisitor: true };
  } catch {
    return { visitorId: "anon", isNewVisitor: false };
  }
}

/**
 * Universal client analytics dispatcher.
 * Integrates with Vercel Web Analytics custom event engine (`@vercel/analytics`)
 * AND synchronizes with the internal private owner metrics store.
 */
export function recordEvent(
  event: AnalyticsEventName,
  metadata?: Record<string, string | number | boolean | null | undefined>
): void {
  if (typeof window === "undefined") return;

  const visitorInfo = getVisitorInfo();
  const enrichedMetadata = {
    ...metadata,
    visitorId: visitorInfo.visitorId,
    isNewVisitor: visitorInfo.isNewVisitor,
  };

  // 1. Dispatch custom event to Vercel Analytics
  try {
    track(event, metadata as Parameters<typeof track>[1]);
  } catch {
    /* Vercel Analytics client handles unconfigured environments silently */
  }

  // 2. Dispatch to server-side telemetry store
  try {
    const payload = JSON.stringify({
      event,
      metadata: enrichedMetadata,
      timestamp: Date.now(),
    });

    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      const blob = new Blob([payload], { type: "application/json" });
      const sent = navigator.sendBeacon("/api/analytics/track", blob);
      if (sent) return;
    }

    // Fallback to fetch with keepalive
    fetch("/api/analytics/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
      keepalive: true,
    }).catch(() => {
      /* Silent non-blocking failure */
    });
  } catch {
    /* Safe failure, never disrupt user experience */
  }
}
