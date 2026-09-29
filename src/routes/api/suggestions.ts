import { createFileRoute } from "@tanstack/react-router";
import { saveQuestionSuggestion } from "@/lib/analytics-store.server";

export const Route = createFileRoute("/api/suggestions")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json().catch(() => ({}));
          const question = typeof body?.question === "string" ? body.question.trim() : "";
          const category = typeof body?.category === "string" ? body.category.trim() : "General";
          const options = typeof body?.options === "string" ? body.options.trim() : "";
          const authorName = typeof body?.authorName === "string" ? body.authorName.trim() : "Anonymous";
          const authorHandle = typeof body?.authorHandle === "string" ? body.authorHandle.trim() : "";

          if (!question || question.length < 5) {
            return new Response(
              JSON.stringify({ ok: false, error: "Bhai sawaal thoda dhang se likho (at least 5 characters)!" }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          if (!authorName) {
            return new Response(
              JSON.stringify({ ok: false, error: "Aapka naam ya nickname toh batao credit dene ke liye!" }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          const result = await saveQuestionSuggestion({
            category,
            question,
            options,
            authorName,
            authorHandle,
          });

          return new Response(
            JSON.stringify({
              ok: true,
              id: result.id,
              message: "Mazedaar! Sawaal inbox me submit ho gaya. Creator verify karke app me feature karega! 🔥",
            }),
            {
              status: 200,
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );
        } catch (err: unknown) {
          return new Response(
            JSON.stringify({
              ok: false,
              error: err instanceof Error ? err.message : "Kuch gadbad ho gayi. Dobara try karo.",
            }),
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
