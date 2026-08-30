import { useEffect, useState } from "react";
import type { Outcome } from "@/lib/scoring";

type Props = {
  outcome: Outcome;
  onRetry: () => void;
};

const CONFETTI_COLORS = [
  "bg-accent",
  "bg-foreground",
  "bg-chart-2",
  "bg-chart-4",
  "bg-chart-5",
];

const CONFETTI_PIECES = Array.from({ length: 40 }, (_, i) => ({
  left: (i * 37 + 13) % 100,
  delay: ((i * 97) % 100) / 100 * 0.4,
  duration: 2.2 + ((i * 53) % 100) / 100 * 1.6,
  size: 6 + ((i * 29) % 3) * 3,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  drift: ((i * 61) % 60) - 30,
  spin: 360 + ((i * 71) % 360),
}));

export function Result({ outcome, onRetry }: Props) {
  const [shown, setShown] = useState(0);
  const [copied, setCopied] = useState(false);
  const [confirming, setConfirming] = useState(false);

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
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
      <div aria-hidden="true" className="confetti-layer pointer-events-none absolute inset-0">
        {CONFETTI_PIECES.map((p, i) => (
          <span
            key={i}
            className={`confetti-piece absolute ${p.color}`}
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 0.6,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              ["--drift" as string]: `${p.drift}px`,
              ["--spin" as string]: `${p.spin}deg`,
            }}
          />
        ))}
      </div>
      <div className="stage-enter relative mx-auto w-full max-w-xl">
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
            onClick={() => setConfirming(true)}
            className="rounded-full border border-border px-8 py-3.5 text-sm font-bold tracking-[0.2em] uppercase transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            Try Again
          </button>
        </div>

        {confirming && (
          <div className="mt-8 rounded-2xl border border-border bg-card p-6 animate-scale-in">
            <p className="text-sm font-bold tracking-[0.15em] uppercase">
              Lose this result?
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Your {outcome.percentage}% verdict will be gone forever. RIP.
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <button
                onClick={onRetry}
                className="rounded-full bg-destructive px-6 py-2.5 text-xs font-bold tracking-[0.2em] text-destructive-foreground uppercase transition-transform duration-200 hover:scale-[1.03] active:scale-95"
              >
                Yes, Retry
              </button>
              <button
                onClick={() => setConfirming(false)}
                className="rounded-full border border-border px-6 py-2.5 text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                Keep Result
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
