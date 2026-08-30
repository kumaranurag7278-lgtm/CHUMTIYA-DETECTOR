import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Landing } from "@/components/Landing";
import { Survey } from "@/components/Survey";
import { Result } from "@/components/Result";
import { computeOutcome, type Outcome } from "@/lib/scoring";

const TITLE = "Chutiya Detector — A 14-Question Personality Diagnosis";
const DESCRIPTION =
  "A fast, funny 14-question survey that measures exactly how convinced you are that everyone around you is a chutiya. Not a real test.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Stage = "landing" | "survey" | "result";

function Index() {
  const [stage, setStage] = useState<Stage>("landing");
  const [leaving, setLeaving] = useState(false);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [runId, setRunId] = useState(0);

  const start = () => {
    setLeaving(true);
    window.setTimeout(() => {
      setLeaving(false);
      setStage("survey");
    }, 350);
  };

  const finish = (answers: number[]) => {
    setOutcome(computeOutcome(answers));
    setStage("result");
  };

  const retry = () => {
    setOutcome(null);
    setRunId((n) => n + 1);
    setStage("survey");
  };

  return (
    <main className="min-h-[100svh] bg-background text-foreground">
      {stage === "landing" && <Landing onStart={start} leaving={leaving} />}
      {stage === "survey" && <Survey key={runId} onFinish={finish} />}
      {stage === "result" && outcome && <Result outcome={outcome} onRetry={retry} />}
    </main>
  );
}
