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

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    const next = [...answers, index];

    window.setTimeout(() => {
      setPhase("out");
      if (step === questions.length - 1) {
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
    <section className="flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 py-12">
      <div className="mx-auto w-full max-w-2xl">
        <ProgressBar current={step + 1} total={questions.length} />
        <div className="mt-10">
          <QuestionCard
            key={step}
            question={current}
            selected={selected}
            onSelect={handleSelect}
            phase={phase}
          />
        </div>
      </div>
    </section>
  );
}
