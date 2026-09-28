import { createFileRoute } from "@tanstack/react-router";
import {
  verifyOwnerPassword,
  createOwnerSessionToken,
  getOwnerSessionCookie,
} from "@/lib/auth.server";

export const Route = createFileRoute("/api/admin/login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json().catch(() => ({}));
          const password = body?.password;

          if (!password || !verifyOwnerPassword(password)) {
            return new Response(
              JSON.stringify({ ok: false, error: "Invalid owner access key." }),
              {
                status: 401,
                headers: { "Content-Type": "application/json" },
              }
            );
          }

          const token = createOwnerSessionToken();
          const cookieHeader = getOwnerSessionCookie(token);

          return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Set-Cookie": cookieHeader,
            },
          });
        } catch {
          return new Response(
            JSON.stringify({ ok: false, error: "Server authentication error." }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      },
    },
  },
});
