import { useEffect, useRef, useState } from "react";
import { questions } from "@/data/questions";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProgressBar } from "./ProgressBar";
import { QuestionCard } from "./QuestionCard";

type Props = {
  onFinish: (answers: number[]) => void;
};

const HIGHLIGHT_MS = 160;
const SLIDE_MS = 450;
const HINT_MS = 6000;

export function Survey({ onFinish }: Props) {
  const isMobile = useIsMobile();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const [dir, setDir] = useState<1 | -1>(1);
  const [finishing, setFinishing] = useState(false);
  const [hintDismissed, setHintDismissed] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const showHint = isMobile && step > 0 && !hintDismissed;
  const canGoBack = step > 0 && selected === null;

  useEffect(() => {
    if (!showHint) return;
    const t = window.setTimeout(() => setHintDismissed(true), HINT_MS);
    return () => window.clearTimeout(t);
  }, [showHint]);

  const goBack = () => {
    if (!canGoBack) return;
    setHintDismissed(true);
    setDir(-1);
    setPhase("out");
    window.setTimeout(() => {
      setStep(step - 1);
      setPhase("in");
    }, SLIDE_MS);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    if (t) touchStartRef.current = { x: t.clientX, y: t.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    if (!t) return;
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    // Swipe right = go back to previous question
    if (dx > 70 && Math.abs(dy) < 80) goBack();
  };

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    setDir(1);
    setSelected(index);
    const next = [...answers];
    next[step] = index;

    window.setTimeout(() => {
      setPhase("out");
      if (step === questions.length - 1) {
        setFinishing(true);
        window.setTimeout(() => onFinish(next), SLIDE_MS);
        return;
      }
      window.setTimeout(() => {
        setAnswers(next);
        setStep(step + 1);
        setSelected(null);
        setPhase("in");
      }, SLIDE_MS);
    }, HIGHLIGHT_MS);
  };

  const current = questions[step];
  if (!current) return null;

  return (
    <section
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`flex min-h-[100svh] touch-pan-y flex-col justify-center overflow-hidden px-4 py-8 sm:px-6 sm:py-12 ${
        finishing ? "stage-exit" : ""
      }`}
    >
      <div className="mx-auto w-full max-w-2xl">
        <ProgressBar current={step + 1} total={questions.length} />
        <div className="mt-7 sm:mt-10">
          <QuestionCard
            key={step}
            question={current}
            selected={selected}
            previous={answers[step] ?? null}
            onSelect={handleSelect}
            phase={phase}
            dir={dir}
          />
        </div>

        <div className="mt-6 flex min-h-[3rem] items-center justify-between gap-3 sm:mt-8">
          <button
            type="button"
            onClick={goBack}
            disabled={!canGoBack}
            className="inline-flex min-h-[2.75rem] items-center gap-2 rounded-full border border-border px-5 py-2.5 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-200 disabled:pointer-events-none disabled:opacity-0 hover:border-accent hover:text-accent"
          >
            <span aria-hidden="true">←</span> Back
          </button>
          {showHint && (
            <p className="hint-fade font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
              Swipe right to go back
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
