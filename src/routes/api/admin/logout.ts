import { createFileRoute } from "@tanstack/react-router";
import { getOwnerClearCookie } from "@/lib/auth.server";

export const Route = createFileRoute("/api/admin/logout")({
  server: {
    handlers: {
      POST: async () => {
        const cookieHeader = getOwnerClearCookie();
        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Set-Cookie": cookieHeader,
          },
        });
      },
    },
  },
});
