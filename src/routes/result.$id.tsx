import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { Result } from "@/components/Result";
import { outcomeFromId } from "@/lib/scoring";
import { getRequestOrigin } from "@/lib/origin.functions";

export const Route = createFileRoute("/result/$id")({
  loader: async ({ params }) => {
    const outcome = outcomeFromId(params.id);
    if (!outcome) throw notFound();
    const origin = await getRequestOrigin();
    return { outcome, origin };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) return {};
    const { outcome: o, origin } = loaderData;
    const title = `Chumtiya Level: ${o.percentage}% — ${o.band} | Chumtiya Detector`;
    const description = `Verdict: ${o.band}. Primary Trait: ${o.traitName}. Think you're less of a chumtiya? Prove it.`;
    const url = `${origin}/result/${params.id}`;
    const image = `${origin}/api/og/${params.id}.png`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { property: "og:image:secure_url", content: image },
        { property: "og:image:type", content: "image/png" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: title },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
        { name: "twitter:image:alt", content: title },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: () => (
    <main className="flex min-h-[100svh] items-center justify-center p-6 text-center">
      <a href="/" className="font-bold text-accent underline">Result not found — take the test</a>
    </main>
  ),
  component: ResultPage,
});

function ResultPage() {
  const { outcome } = Route.useLoaderData();
  const navigate = useNavigate();
  return (
    <main className="min-h-[100svh] bg-background text-foreground">
      <Result outcome={outcome} onRetry={() => navigate({ to: "/" })} />
    </main>
  );
}
