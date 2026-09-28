import { playClick } from "@/lib/sound";
import { UserCheck } from "lucide-react";

type Props = {
  onStart: () => void;
  onDiagnoseFriend: () => void;
  leaving: boolean;
};

export function Landing({ onStart, onDiagnoseFriend, leaving }: Props) {
  return (
    <section
      className={`flex min-h-[100svh] flex-col items-center justify-center px-5 py-10 text-center sm:px-6 ${
        leaving ? "stage-exit" : "stage-enter"
      }`}
    >
      <p className="font-mono text-[10px] tracking-[0.35em] text-muted-foreground uppercase sm:text-xs sm:tracking-[0.4em]">
        Diagnostic v1.0
      </p>

      <h1 className="mt-5 text-[clamp(2.5rem,13vw,9rem)] leading-[0.88] font-black tracking-tighter sm:mt-6">
        CHUMTIYA
        <br />
        <span className="text-accent">DETECTOR</span>
      </h1>

      <p className="mt-6 max-w-md text-balance text-base text-muted-foreground sm:mt-8 sm:text-xl">
        Let&apos;s find out what&apos;s actually wrong with you.
      </p>

      <div className="mt-9 flex flex-col items-center gap-3 sm:mt-12 sm:flex-row sm:justify-center">
        <button
          onClick={() => {
            playClick();
            onStart();
          }}
          className="min-h-[3.25rem] w-full max-w-xs rounded-full bg-accent px-8 py-4 text-sm font-bold tracking-[0.2em] text-accent-foreground uppercase transition-transform duration-200 hover:scale-[1.04] active:scale-[0.98] sm:w-auto sm:px-10"
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
          Diagnose a Friend (7Q)
        </button>
      </div>

      <p className="mt-8 max-w-xs text-balance font-mono text-[10px] leading-relaxed text-muted-foreground/60 uppercase sm:mt-10 sm:text-[11px]">
        Not a real psychological test. Results are for laughs only.
      </p>
    </section>
  );
}
