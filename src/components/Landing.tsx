import { useState, useEffect } from "react";
import { playClick } from "@/lib/sound";
import { UserCheck, Activity } from "lucide-react";

type Props = {
  onStart: () => void;
  onDiagnoseFriend: () => void;
  leaving: boolean;
};

const HOTSPOTS = [
  "Bandra, Mumbai",
  "Indiranagar, Bangalore",
  "South Delhi",
  "Koregaon Park, Pune",
  "Gurugram Cyber Hub",
];

export function Landing({ onStart, onDiagnoseFriend, leaving }: Props) {
  const [scanCount, setScanCount] = useState(148924);
  const [hotspotIndex, setHotspotIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setScanCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hTimer = setInterval(() => {
      setHotspotIndex((prev) => (prev + 1) % HOTSPOTS.length);
    }, 4500);
    return () => clearInterval(hTimer);
  }, []);

  return (
    <section
      className={`flex min-h-[100svh] flex-col items-center justify-center px-5 py-10 text-center sm:px-6 ${
        leaving ? "stage-exit" : "stage-enter"
      }`}
    >
      {/* Live Hall of Shame Ticker */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/60 px-3.5 py-1.5 backdrop-blur-md">
        <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
        <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase sm:text-xs">
          <strong className="text-foreground">{scanCount.toLocaleString()}</strong> Scans • Hotspot:{" "}
          <span className="text-accent font-semibold">{HOTSPOTS[hotspotIndex]}</span>
        </span>
      </div>

      <p className="font-mono text-[10px] tracking-[0.35em] text-muted-foreground uppercase sm:text-xs sm:tracking-[0.4em]">
        Diagnostic v2.0
      </p>

      <h1 className="mt-4 text-[clamp(2.5rem,13vw,8.5rem)] leading-[0.88] font-black tracking-tighter sm:mt-5">
        CHUMTIYA
        <br />
        <span className="text-accent">DETECTOR</span>
      </h1>

      <p className="mt-5 max-w-md text-balance text-base text-muted-foreground sm:mt-6 sm:text-xl">
        Let&apos;s find out what&apos;s actually wrong with you.
      </p>

      {/* Action buttons */}
      <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center">
        <button
          onClick={() => {
            playClick();
            onStart();
          }}
          className="min-h-[3.25rem] w-full max-w-xs rounded-full bg-accent px-8 py-4 text-sm font-bold tracking-[0.2em] text-accent-foreground uppercase transition-transform duration-200 hover:scale-[1.04] active:scale-[0.98] sm:w-auto sm:px-9"
        >
          Detect Chumtiya
        </button>

        <button
          onClick={() => {
            playClick();
            onDiagnoseFriend();
          }}
          className="inline-flex min-h-[3.25rem] w-full max-w-xs items-center justify-center gap-2 rounded-full border border-border bg-card/80 px-7 py-4 text-xs font-bold tracking-[0.15em] uppercase transition-all duration-200 hover:border-accent hover:text-accent hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
        >
          <UserCheck className="h-4 w-4 text-accent" />
          Diagnose a Friend (6Q)
        </button>
      </div>

      {/* Mini Hall of Shame stats */}
      <div className="mt-10 grid grid-cols-2 gap-3 max-w-xs w-full text-center sm:max-w-sm">
        <div className="rounded-xl border border-border/60 bg-card/30 p-2.5">
          <p className="text-[10px] font-mono tracking-wider text-muted-foreground uppercase">National Avg</p>
          <p className="mt-0.5 text-lg font-black text-foreground">71.8%</p>
        </div>
        <div className="rounded-xl border border-border/60 bg-card/30 p-2.5">
          <p className="text-[10px] font-mono tracking-wider text-muted-foreground uppercase">Top Archetype</p>
          <p className="mt-0.5 text-xs font-bold text-accent truncate">Reel Philosopher</p>
        </div>
      </div>

      <p className="mt-7 max-w-xs text-balance font-mono text-[10px] leading-relaxed text-muted-foreground/60 uppercase sm:mt-9 sm:text-[11px]">
        Not a real psychological test. Results are for laughs only.
      </p>
    </section>
  );
}
