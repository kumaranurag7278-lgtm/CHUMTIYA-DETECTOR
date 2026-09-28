import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Landing } from "@/components/Landing";
import { DisclaimerModal } from "@/components/DisclaimerModal";
import { Survey } from "@/components/Survey";
import { Result } from "@/components/Result";
import { computeOutcome, outcomeId, type Outcome } from "@/lib/scoring";
import { getRequestOrigin } from "@/lib/origin.functions";

const TITLE = "Chumtiya Detector — A 16-Question Personality Diagnosis";
const DESCRIPTION =
  "Let's find out what's actually wrong with you. A fast, funny 16-question survey that measures exactly how convinced you are that everyone around you is a chumtiya. Not a real test.";

export const Route = createFileRoute("/")({
  loader: async () => {
    const origin = await getRequestOrigin();
    return { origin };
  },
  head: ({ loaderData }) => {
    const origin = loaderData?.origin || "";
    const url = origin ? `${origin}/` : "/";
    const image = origin ? `${origin}/api/og/home.png` : "/api/og/home.png";
    return {
      meta: [
        { title: TITLE },
        { name: "description", content: DESCRIPTION },
        { property: "og:title", content: TITLE },
        { property: "og:description", content: DESCRIPTION },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { property: "og:image:secure_url", content: image },
        { property: "og:image:type", content: "image/png" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: TITLE },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: TITLE },
        { name: "twitter:description", content: DESCRIPTION },
        { name: "twitter:image", content: image },
        { name: "twitter:image:alt", content: TITLE },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: Index,
});

type Stage = "landing" | "disclaimer" | "survey" | "result";

function Index() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>("landing");
  const [leaving, setLeaving] = useState(false);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [runId, setRunId] = useState(0);

  const start = () => {
    setLeaving(true);
    window.setTimeout(() => {
      setLeaving(false);
      setStage("disclaimer");
    }, 350);
  };

  const proceedToSurvey = () => {
    setStage("survey");
  };

  const finish = (answers: number[]) => {
    const calculated = computeOutcome(answers);
    const id = outcomeId(calculated);
    navigate({ to: "/result/$id", params: { id } });
  };

  const retry = () => {
    setOutcome(null);
    setRunId((n) => n + 1);
    setStage("survey");
  };

  return (
    <main className="min-h-[100svh] bg-background text-foreground">
      {stage === "landing" && <Landing onStart={start} leaving={leaving} />}
      {stage === "disclaimer" && <DisclaimerModal onContinue={proceedToSurvey} />}
      {stage === "survey" && <Survey key={runId} onFinish={finish} />}
      {stage === "result" && outcome && <Result outcome={outcome} onRetry={retry} />}
    </main>
  );
}
