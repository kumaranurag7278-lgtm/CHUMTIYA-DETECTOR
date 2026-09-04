type Props = {
  onStart: () => void;
  leaving: boolean;
};

export function Landing({ onStart, leaving }: Props) {
  return (
    <section
      className={`flex min-h-[100svh] flex-col items-center justify-center px-6 text-center ${
        leaving ? "stage-exit" : "stage-enter"
      }`}
    >
      <p className="font-mono text-xs tracking-[0.4em] text-muted-foreground uppercase">
        Diagnostic v1.0
      </p>
      <h1 className="mt-6 text-[clamp(2.75rem,12vw,9rem)] leading-[0.85] font-black tracking-tighter">
        CHUMTIYA
        <br />
        <span className="text-accent">DETECTOR</span>
      </h1>
      <p className="mt-8 max-w-md text-balance text-lg text-muted-foreground sm:text-xl">
        Let&apos;s find out what&apos;s actually wrong with you.
      </p>
      <button
        onClick={onStart}
        className="mt-12 rounded-full bg-accent px-10 py-4 text-sm font-bold tracking-[0.2em] text-accent-foreground uppercase transition-transform duration-200 hover:scale-[1.04] active:scale-[0.98]"
      >
        Detect Chumtiya
      </button>
      <p className="mt-10 max-w-xs font-mono text-[11px] leading-relaxed text-muted-foreground/60 uppercase">
        Not a real psychological test. Results are for laughs only.
      </p>
    </section>
  );
}
