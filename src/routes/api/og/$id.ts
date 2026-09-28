import { createFileRoute } from "@tanstack/react-router";
import { outcomeFromId } from "@/lib/scoring";
import { renderResultPng } from "@/lib/og-image.server";

export const Route = createFileRoute("/api/og/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const rawId = params.id.replace(/\.png$/, "").toLowerCase();
        if (rawId === "home" || rawId === "default" || rawId === "landing") {
          return new Response(null, {
            status: 302,
            headers: {
              Location: "/og-dashboard.png",
            },
          });
        }

        const outcome = outcomeFromId(rawId);
        if (!outcome) return new Response("Not found", { status: 404 });
        const png = await renderResultPng(outcome);
        return new Response(png as BodyInit, {
          headers: {
            "Content-Type": "image/png",
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      },
    },
  },
});
