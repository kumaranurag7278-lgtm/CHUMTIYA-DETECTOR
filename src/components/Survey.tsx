import { useState } from "react";
import { questions } from "@/data/questions";
import { ProgressBar } from "./ProgressBar";
import { QuestionCard } from "./QuestionCard";

type Props = {
  onFinish: (answers: number[]) => void;
};

const HIGHLIGHT_MS = 160;
const SLIDE_MS = 450;

export function Survey({ onFinish }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const [dir, setDir] = useState<1 | -1>(1);
  const [finishing, setFinishing] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const goBack = () => {
    if (step === 0 || selected !== null) return;
    setDir(-1);
    setPhase("out");
    window.setTimeout(() => {
      setAnswers(answers.slice(0, step - 1));
      setStep(step - 1);
      setPhase("in");
    }, SLIDE_MS);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    if (t) setTouchStart({ x: t.clientX, y: t.clientY });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart[0];
    setTouchStart(null);
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
    const next = [...answers, index];

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
      className={`flex min-h-[100svh] touch-pan-y flex-col justify-center overflow-hidden px-6 py-12 ${
        finishing ? "stage-exit" : ""
      }`}
    >
      <div className="mx-auto w-full max-w-2xl">
        <ProgressBar current={step + 1} total={questions.length} />
        <div className="mt-10">
          <QuestionCard
            key={step}
            question={current}
            selected={selected}
            onSelect={handleSelect}
            phase={phase}
            dir={dir}
          />
        </div>
        {step > 0 && (
          <p className="mt-8 text-center font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase opacity-60">
            Swipe right to go back
          </p>
        )}
      </div>
    </section>
  );
}
