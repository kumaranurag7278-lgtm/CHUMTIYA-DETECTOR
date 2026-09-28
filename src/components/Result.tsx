import { useEffect, useState } from "react";
import { outcomeId, type Outcome } from "@/lib/scoring";
import { CertificateModal } from "./CertificateModal";
import { StoryCardModal } from "./StoryCardModal";
import { playClick, playFanfare } from "@/lib/sound";
import { Award, Smartphone, Swords, Share2, RotateCcw } from "lucide-react";

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
  const [battleCopied, setBattleCopied] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showStoryCard, setShowStoryCard] = useState(false);

  useEffect(() => {
    playFanfare();
  }, []);

  const share = async () => {
    playClick();
    const url = `${window.location.origin}/result/${outcomeId(outcome)}`;
    const title = `Chumtiya Level: ${outcome.percentage}% — ${outcome.band} | Chumtiya Detector`;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const copyBattleLink = async () => {
    playClick();
    const battleUrl = `${window.location.origin}/vs/${outcomeId(outcome)}`;
    const shareText = `⚔️ I dare you to beat my score! I scored ${outcome.percentage}% on Chumtiya Detector (${outcome.band}). Can you do better? Battle me 1v1 here: ${battleUrl}`;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "1v1 Chumtiya Battle Challenge",
          text: shareText,
          url: battleUrl,
        });
        return;
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }
      }
    }

    try {
      await navigator.clipboard.writeText(battleUrl);
      setBattleCopied(true);
      window.setTimeout(() => setBattleCopied(false), 2200);
    } catch {
      /* clipboard unavailable */
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
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 py-12 text-center sm:px-6 sm:py-16">
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
        <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase sm:text-xs sm:tracking-[0.4em]">
          Your Chumtiya Level
        </p>
        <p className="mt-3 text-[clamp(4rem,24vw,12rem)] leading-[0.85] font-black tracking-tighter text-accent tabular-nums sm:mt-4">
          {shown}%
        </p>
        <h2 className="result-pop mt-3 text-balance text-[clamp(1.35rem,6.5vw,3rem)] leading-tight font-black tracking-tight uppercase sm:mt-4">
          {outcome.band}
        </h2>

        <div className="mt-8 border-t border-border pt-6 sm:mt-10 sm:pt-8">
          <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase sm:text-xs sm:tracking-[0.4em]">
            Primary Trait
          </p>
          <h3 className="mt-2 text-balance text-xl font-bold tracking-tight sm:text-2xl">
            {outcome.traitName}
          </h3>
          <p className="mt-2 text-pretty text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
            {outcome.traitDescription}
          </p>
        </div>

        {/* Viral Action Grid: Certificate, Story Card, 1v1 Battle */}
        <div className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          <button
            onClick={() => {
              playClick();
              setShowCertificate(true);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card/70 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:border-accent hover:text-accent hover:scale-[1.02] active:scale-95"
          >
            <Award className="h-4 w-4 text-accent" />
            Certificate
          </button>

          <button
            onClick={() => {
              playClick();
              setShowStoryCard(true);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card/70 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:border-accent hover:text-accent hover:scale-[1.02] active:scale-95"
          >
            <Smartphone className="h-4 w-4 text-accent" />
            Story Card (9:16)
          </button>

          <button
            onClick={copyBattleLink}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-accent/60 bg-accent/10 px-4 py-3 text-xs font-bold text-accent uppercase tracking-wider transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:scale-[1.02] active:scale-95"
          >
            <Swords className="h-4 w-4" />
            {battleCopied ? "Battle Link Copied!" : "1v1 Roast Friend"}
          </button>
        </div>

        {/* Primary Share & Retry buttons */}
        <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <button
            onClick={share}
            className="inline-flex min-h-[3rem] w-full max-w-xs items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-bold tracking-[0.2em] text-accent-foreground uppercase transition-transform duration-200 hover:scale-[1.03] active:scale-95 sm:w-auto"
          >
            <Share2 className="h-4 w-4" />
            {copied ? "Link Copied!" : "Share Result"}
          </button>
          <button
            onClick={() => {
              playClick();
              setConfirming(true);
            }}
            className="inline-flex min-h-[3rem] w-full max-w-xs items-center justify-center gap-2 rounded-full border border-border px-8 py-3.5 text-sm font-bold tracking-[0.2em] uppercase transition-colors duration-200 hover:border-accent hover:text-accent sm:w-auto"
          >
            <RotateCcw className="h-4 w-4" />
            Try Again
          </button>
        </div>

        {confirming && (
          <div className="mt-7 rounded-2xl border border-border bg-card p-5 animate-scale-in sm:mt-8 sm:p-6">
            <p className="text-sm font-bold tracking-[0.15em] uppercase">
              Lose this result?
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Your {outcome.percentage}% verdict will be gone forever. RIP.
            </p>
            <div className="mt-5 flex flex-col justify-center gap-2.5 sm:flex-row sm:gap-3">
              <button
                onClick={() => {
                  playClick();
                  onRetry();
                }}
                className="min-h-[2.75rem] rounded-full bg-destructive px-6 py-2.5 text-xs font-bold tracking-[0.2em] text-destructive-foreground uppercase transition-transform duration-200 hover:scale-[1.03] active:scale-95"
              >
                Yes, Retry
              </button>
              <button
                onClick={() => {
                  playClick();
                  setConfirming(false);
                }}
                className="min-h-[2.75rem] rounded-full border border-border px-6 py-2.5 text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                Keep Result
              </button>
            </div>
          </div>
        )}
      </div>

      {showCertificate && (
        <CertificateModal outcome={outcome} onClose={() => setShowCertificate(false)} />
      )}
      {showStoryCard && (
        <StoryCardModal outcome={outcome} onClose={() => setShowStoryCard(false)} />
      )}
    </section>
  );
}
