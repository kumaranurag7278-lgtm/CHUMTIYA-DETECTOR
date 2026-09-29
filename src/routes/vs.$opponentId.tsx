import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { outcomeFromId, computeOutcome, outcomeId, type Outcome } from "@/lib/scoring";
import { getRequestOrigin } from "@/lib/origin.functions";
import { Survey } from "@/components/Survey";
import { playClick, playRoastSoundForScore } from "@/lib/sound";
import { Swords, Trophy, Share2, RotateCcw } from "lucide-react";
import { recordEvent } from "@/lib/analytics";

export const Route = createFileRoute("/vs/$opponentId")({
  loader: async ({ params }) => {
    const opponent = outcomeFromId(params.opponentId);
    if (!opponent) throw notFound();
    const origin = await getRequestOrigin();
    return { opponent, opponentId: params.opponentId, origin };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { opponent: o, opponentId, origin } = loaderData;
    const title = `⚔️ 1v1 Chumtiya Battle: Beat ${o.percentage}%! | Chumtiya Detector`;
    const description = `Your friend scored ${o.percentage}% (${o.band}). Think you're more sensible? Challenge them now!`;
    const url = `${origin}/vs/${opponentId}`;
    const image = `${origin}/api/og/${opponentId}.png`;
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
    <main className="flex min-h-[100svh] items-center justify-center p-6 text-center">
      <div>
        <p className="text-xl font-bold">Opponent result not found.</p>
        <a href="/" className="mt-4 inline-block font-bold text-accent underline">
          Take the solo test
        </a>
      </div>
    </main>
  ),
  component: VsPage,
});

function VsPage() {
  const { opponent, opponentId } = Route.useLoaderData();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"challenge" | "quiz" | "verdict">("challenge");
  const [myOutcome, setMyOutcome] = useState<Outcome | null>(null);
  const [copied, setCopied] = useState(false);

  const startQuiz = () => {
    playClick();
    recordEvent("survey_started", { mode: "battle" });
    setPhase("quiz");
  };

  const handleFinish = (answers: number[]) => {
    const outcome = computeOutcome(answers);
    setMyOutcome(outcome);
    setPhase("verdict");
    playRoastSoundForScore(outcome.percentage, "battle");
    recordEvent("survey_completed", { mode: "battle", score: outcome.percentage, band: outcome.band });
    recordEvent("result_viewed", { source: "battle_verdict", percentage: outcome.percentage });
  };

  const diff = myOutcome ? Math.abs(myOutcome.percentage - opponent.percentage) : 0;

  const shareBattle = async () => {
    playClick();
    if (!myOutcome) return;
    const shareText = `⚔️ Chumtiya Battle Result:\nChallenger: ${opponent.percentage}% vs Me: ${myOutcome.percentage}%\n${
      opponent.percentage > myOutcome.percentage
        ? "I won! My friend is officially more chumtiya than me 😂"
        : opponent.percentage < myOutcome.percentage
          ? "I lost! Apparently I am the bigger chumtiya 😭"
          : "We tied! Equally deluded."
    }\nCheck it out: ${window.location.origin}/vs/${outcomeId(myOutcome)}`;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        recordEvent("share_clicked", { channel: "native", type: "battle_result" });
        await navigator.share({
          title: "Chumtiya Battle Result",
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      recordEvent("share_link_copied", { source: "battle_result_text" });
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  if (phase === "quiz") {
    return (
      <main className="min-h-[100svh] bg-background text-foreground">
        <Survey onFinish={handleFinish} />
      </main>
    );
  }

  if (phase === "verdict" && myOutcome) {
    const isWinner = myOutcome.percentage < opponent.percentage;
    const isLoser = myOutcome.percentage > opponent.percentage;
    const isTie = myOutcome.percentage === opponent.percentage;

    return (
      <main className="min-h-[100svh] bg-background text-foreground flex flex-col items-center justify-center px-4 py-12 text-center">
        <div className="mx-auto w-full max-w-xl animate-fade-in">
          <div className="flex items-center justify-center gap-2 text-accent">
            <Trophy className="h-6 w-6" />
            <p className="font-mono text-xs font-bold tracking-[0.3em] uppercase">
              Battle Complete
            </p>
          </div>

          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl uppercase">
            {isWinner && "You Won The Battle!"}
            {isLoser && "You Lost The Battle!"}
            {isTie && "It's A Dead Tie!"}
          </h2>

          {/* Side by side comparison */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border bg-card p-5">
              <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
                Challenger
              </span>
              <p className="mt-2 text-4xl font-black text-foreground sm:text-5xl">
                {opponent.percentage}%
              </p>
              <p className="mt-1 text-xs font-bold text-accent uppercase">
                {opponent.band}
              </p>
              <p className="mt-2 text-[11px] text-muted-foreground">
                {opponent.traitName}
              </p>
            </div>

            <div className="rounded-2xl border-2 border-accent bg-accent/10 p-5 shadow-lg shadow-accent/10">
              <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold">
                Your Score
              </span>
              <p className="mt-2 text-4xl font-black text-foreground sm:text-5xl">
                {myOutcome.percentage}%
              </p>
              <p className="mt-1 text-xs font-bold text-accent uppercase">
                {myOutcome.band}
              </p>
              <p className="mt-2 text-[11px] text-muted-foreground">
                {myOutcome.traitName}
              </p>
            </div>
          </div>

          {/* Verdict description */}
          <div className="mt-6 rounded-2xl border border-border bg-card/60 p-5 text-balance">
            {isWinner && (
              <p className="text-sm sm:text-base text-foreground">
                🏆 <strong className="text-accent">Superior intellect verified!</strong> Your friend is{" "}
                <span className="font-bold text-accent">{diff}% more chumtiya</span> than you. Make them buy you coffee.
              </p>
            )}
            {isLoser && (
              <p className="text-sm sm:text-base text-foreground">
                💀 <strong className="text-destructive">Massive L detected!</strong> You are{" "}
                <span className="font-bold text-destructive">{diff}% more chumtiya</span> than your friend. Bow down to their superior life choices.
              </p>
            )}
            {isTie && (
              <p className="text-sm sm:text-base text-foreground">
                🤝 <strong className="text-accent">Equal wavelengths!</strong> You both possess the exact same level of questionable judgment.
              </p>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={shareBattle}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 text-xs font-bold tracking-[0.2em] text-accent-foreground uppercase transition-transform hover:scale-105 active:scale-95"
            >
              <Share2 className="h-4 w-4" />
              {copied ? "Result Copied!" : "Share Battle Result"}
            </button>
            <button
              onClick={() => navigate({ to: "/" })}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-xs font-bold tracking-[0.2em] uppercase hover:bg-muted"
            >
              <RotateCcw className="h-4 w-4" /> Home
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Phase: Challenge Lobby
  return (
    <main className="min-h-[100svh] bg-background text-foreground flex flex-col items-center justify-center px-4 py-12 text-center">
      <div className="mx-auto w-full max-w-lg animate-fade-in">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-accent bg-accent/10 text-accent shadow-lg shadow-accent/20">
          <Swords className="h-8 w-8" />
        </div>

        <p className="mt-5 font-mono text-[10px] tracking-[0.35em] text-accent uppercase sm:text-xs">
          Friend vs Friend Roast Battle
        </p>

        <h1 className="mt-2 text-balance text-3xl font-black tracking-tight sm:text-5xl uppercase">
          You've Been Challenged!
        </h1>

        <div className="mt-8 rounded-3xl border-2 border-accent/60 bg-card p-6 sm:p-8">
          <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
            Challenger's Score
          </p>
          <p className="mt-2 text-6xl font-black text-accent sm:text-7xl">
            {opponent.percentage}%
          </p>
          <p className="mt-2 text-lg font-black uppercase text-foreground">
            “{opponent.band}”
          </p>
          <span className="mt-2 inline-block rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-accent">
            {opponent.traitName}
          </span>
          <p className="mt-4 text-xs italic text-muted-foreground sm:text-sm">
            "{opponent.traitDescription}"
          </p>
        </div>

        <p className="mt-6 text-balance text-sm text-muted-foreground sm:text-base">
          Your friend thinks they have better life choices than you. Answer the 16 questions to see who gets roasted!
        </p>

        <button
          onClick={startQuiz}
          className="mt-8 w-full max-w-xs rounded-full bg-accent px-8 py-4 text-sm font-bold tracking-[0.2em] text-accent-foreground uppercase transition-transform hover:scale-105 active:scale-95 sm:w-auto"
        >
          Accept Battle Challenge
        </button>
      </div>
    </main>
  );
}
