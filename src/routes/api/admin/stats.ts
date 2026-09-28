import { createFileRoute } from "@tanstack/react-router";
import { isOwnerAuthenticated } from "@/lib/auth.server";
import { getAnalyticsDashboardData } from "@/lib/analytics-store.server";

export const Route = createFileRoute("/api/admin/stats")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const authenticated = isOwnerAuthenticated(request);
        if (!authenticated) {
          return new Response(JSON.stringify({ error: "Unauthorized access." }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
          });
        }

        const data = await getAnalyticsDashboardData();
        return new Response(JSON.stringify(data), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, max-age=0",
          },
        });
      },
    },
  },
});
