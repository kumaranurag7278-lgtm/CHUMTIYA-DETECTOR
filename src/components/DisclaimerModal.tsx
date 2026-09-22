import { useEffect, useRef } from "react";

type Props = {
  onContinue: () => void;
};

export function DisclaimerModal({ onContinue }: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    buttonRef.current?.focus();
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-title"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-4 py-6 sm:px-6 sm:py-8"
    >
      <div className="overlay-fade absolute inset-0 bg-background/80 backdrop-blur-sm" aria-hidden="true" />
      <div className="modal-enter relative my-auto w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card/95 p-6 shadow-2xl sm:p-10">
        <div className="flex flex-col items-center text-center">
          <span
            className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-2xl sm:h-16 sm:w-16 sm:text-3xl"
            aria-hidden="true"
          >
            ⚠️
          </span>
          <h2
            id="disclaimer-title"
            className="mt-5 text-balance text-xl font-black tracking-tight sm:mt-6 sm:text-3xl"
          >
            Just a heads-up!
          </h2>
          <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-lg">
            This survey is created purely for entertainment and fun. The questions and final
            results are not a real psychological, intelligence, or personality assessment and should
            not be taken seriously or personally.
          </p>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-lg">
            By continuing, you understand that this is just a fun game and that the results are
            meant for entertainment purposes only.
          </p>
          <button
            ref={buttonRef}
            onClick={onContinue}
            className="mt-7 min-h-[3rem] w-full rounded-full bg-accent px-8 py-4 text-sm font-bold tracking-[0.15em] text-accent-foreground uppercase transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] sm:mt-10"
          >
            OK, Continue
          </button>
        </div>
      </div>
    </div>
  );
}
