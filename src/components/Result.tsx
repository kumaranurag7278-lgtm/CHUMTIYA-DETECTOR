import { useEffect, useState } from "react";
import type { Outcome } from "@/lib/scoring";

type Props = {
  outcome: Outcome;
  onRetry: () => void;
};

export function Result({ outcome, onRetry }: Props) {
  const [shown, setShown] = useState(0);
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const text = [
      "🧪 CHUTIYA DETECTOR",
      "━━━━━━━━━━━━━━",
      `Chutiya Level: ${outcome.percentage}%`,
      `Verdict: ${outcome.band}`,
      `Primary Trait: ${outcome.traitName}`,
      "━━━━━━━━━━━━━━",
      "Think everyone around you is a chutiya? Prove it.",
    ].join("\n");

    try {
      if (navigator.share) {
        await navigator.share({ title: "Chutiya Detector", text, url: window.location.origin });
        return;
      }
      throw new Error("no-share");
    } catch {
      try {
        await navigator.clipboard.writeText(`${text}\n${window.location.origin}`);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      } catch {
        /* clipboard unavailable — do nothing */
      }
    }
  };

  useEffect(() => {
    const target = outcome.percentage;
    if (target === 0) return;
    const duration = 1000;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [outcome.percentage]);

  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center px-6 py-16 text-center">
      <div className="stage-enter mx-auto w-full max-w-xl">
        <p className="font-mono text-xs tracking-[0.4em] text-muted-foreground uppercase">
          Your Chutiya Level
        </p>
        <p className="mt-4 text-[clamp(4.5rem,22vw,12rem)] leading-[0.85] font-black tracking-tighter text-accent tabular-nums">
          {shown}%
        </p>
        <h2 className="result-pop mt-4 text-[clamp(1.5rem,6vw,3rem)] leading-tight font-black tracking-tight uppercase">
          {outcome.band}
        </h2>

        <div className="mt-14 border-t border-border pt-10">
          <p className="font-mono text-xs tracking-[0.4em] text-muted-foreground uppercase">
            Primary Trait
          </p>
          <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{outcome.traitName}</h3>
          <p className="mt-4 text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            {outcome.traitDescription}
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={share}
            className="rounded-full bg-accent px-8 py-3.5 text-sm font-bold tracking-[0.2em] text-accent-foreground uppercase transition-transform duration-200 hover:scale-[1.03] active:scale-95"
          >
            {copied ? "Copied!" : "Share Result"}
          </button>
          <button
            onClick={onRetry}
            className="rounded-full border border-border px-8 py-3.5 text-sm font-bold tracking-[0.2em] uppercase transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            Try Again
          </button>
        </div>
      </div>
    </section>
  );
}
