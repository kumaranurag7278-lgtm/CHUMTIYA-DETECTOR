import { track } from "@vercel/analytics";
import type { AnalyticsEventName } from "./analytics-types";

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

  // 1. Dispatch custom event to Vercel Analytics
  try {
    track(event, metadata as Parameters<typeof track>[1]);
  } catch {
    /* Vercel Analytics client handles unconfigured environments silently */
  }

  // 2. Dispatch to server-side telemetry store
  try {
    const payload = JSON.stringify({ event, metadata, timestamp: Date.now() });

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
