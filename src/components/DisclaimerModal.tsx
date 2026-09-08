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
      className="fixed inset-0 z-50 flex items-center justify-center px-6 py-8"
    >
      <div className="overlay-fade absolute inset-0 bg-background/80 backdrop-blur-sm" aria-hidden="true" />
      <div className="modal-enter relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card/95 p-8 shadow-2xl sm:p-10">
        <div className="flex flex-col items-center text-center">
          <span
            className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-3xl"
            aria-hidden="true"
          >
            ⚠️
          </span>
          <h2
            id="disclaimer-title"
            className="mt-6 text-2xl font-black tracking-tight sm:text-3xl"
          >
            Just a heads-up!
          </h2>
          <p className="mt-4 text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            This survey is created purely for entertainment and fun. The questions and final
            results are not a real psychological, intelligence, or personality assessment and should
            not be taken seriously or personally.
          </p>
          <p className="mt-4 text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            By continuing, you understand that this is just a fun game and that the results are
            meant for entertainment purposes only.
          </p>
          <button
            ref={buttonRef}
            onClick={onContinue}
            className="mt-8 w-full rounded-full bg-accent px-8 py-4 text-sm font-bold tracking-[0.15em] text-accent-foreground uppercase transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] sm:mt-10"
          >
            OK, Continue
          </button>
        </div>
      </div>
    </div>
  );
}
