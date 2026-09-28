import { createFileRoute } from "@tanstack/react-router";
import { recordAnalyticsEvent } from "@/lib/analytics-store.server";
import type { AnalyticsEventName } from "@/lib/analytics-types";

const ALLOWED_EVENTS: Set<string> = new Set([
  "survey_started",
  "survey_completed",
  "result_viewed",
  "share_clicked",
  "share_link_copied",
  "page_view",
]);

export const Route = createFileRoute("/api/analytics/track")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json().catch(() => ({}));
          const event = body?.event as AnalyticsEventName;

          if (event && ALLOWED_EVENTS.has(event)) {
            recordAnalyticsEvent(event, body.metadata);
          }

          return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          });
        } catch {
          return new Response(JSON.stringify({ ok: false }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
