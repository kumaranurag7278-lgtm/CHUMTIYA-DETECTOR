type Props = {
  onStart: () => void;
  leaving: boolean;
};

export function Landing({ onStart, leaving }: Props) {
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
      <button
        onClick={onStart}
        className="mt-9 min-h-[3rem] w-full max-w-xs rounded-full bg-accent px-8 py-4 text-sm font-bold tracking-[0.2em] text-accent-foreground uppercase transition-transform duration-200 hover:scale-[1.04] active:scale-[0.98] sm:mt-12 sm:w-auto sm:px-10"
      >
        Detect Chumtiya
      </button>
      <p className="mt-8 max-w-xs text-balance font-mono text-[10px] leading-relaxed text-muted-foreground/60 uppercase sm:mt-10 sm:text-[11px]">
        Not a real psychological test. Results are for laughs only.
      </p>
    </section>
  );
}
