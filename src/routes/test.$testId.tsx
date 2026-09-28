import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { DETECTORS } from "@/data/detectors";
import { DetectorQuiz } from "@/components/DetectorQuiz";
import { getRequestOrigin } from "@/lib/origin.functions";

export const Route = createFileRoute("/test/$testId")({
  loader: async ({ params }) => {
    const detector = DETECTORS[params.testId];
    if (!detector) throw notFound();
    const origin = await getRequestOrigin();
    return { detector, origin, testId: params.testId };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { detector, origin, testId } = loaderData;
    const title = `${detector.emoji} ${detector.title} — Official Diagnosis | Chumtiya Detector`;
    const description = `${detector.tagline} Take the 10-question test now.`;
    const url = `${origin}/test/${testId}`;
    const image = `${origin}/og-dashboard.png`;

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
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: () => (
    <main className="flex min-h-[100svh] flex-col items-center justify-center p-6 text-center">
      <h1 className="text-2xl font-black uppercase text-foreground">Detector Not Found</h1>
      <p className="mt-2 text-sm text-muted-foreground">The requested detector does not exist.</p>
      <a href="/" className="mt-4 font-bold text-accent underline">
        Return to Detector Arcade
      </a>
    </main>
  ),
  component: TestPage,
});

function TestPage() {
  const { detector } = Route.useLoaderData();
  const navigate = useNavigate();

  return (
    <main className="min-h-[100svh] bg-background text-foreground">
      <DetectorQuiz detector={detector} onExit={() => navigate({ to: "/" })} />
    </main>
  );
}
