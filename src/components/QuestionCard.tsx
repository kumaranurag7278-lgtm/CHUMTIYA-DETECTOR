import type { Question } from "@/data/questions";

type Props = {
  question: Question;
  selected: number | null;
  previous: number | null;
  onSelect: (index: number) => void;
  phase: "in" | "out";
  dir: 1 | -1;
};

export function QuestionCard({ question, selected, previous, onSelect, phase, dir }: Props) {
  const cls =
    phase === "out"
      ? dir === 1
        ? "q-exit"
        : "q-exit-back"
      : dir === 1
        ? "q-enter"
        : "q-enter-back";
  return (
    <div className={cls}>
      <h2 className="text-balance hyphens-auto break-words text-[clamp(1.35rem,5.5vw,3rem)] leading-[1.15] font-bold tracking-tight">
        {question.question}
      </h2>
      <ul className="mt-6 flex flex-col gap-2.5 sm:mt-10 sm:gap-3">
        {question.answers.map((answer, i) => {
          const isSelected = selected === i;
          const isPrevious = selected === null && previous === i;
          return (
            <li key={answer.text}>
              <button
                onClick={() => onSelect(i)}
                disabled={selected !== null}
                className={`flex min-h-[3rem] w-full items-center rounded-2xl border px-4 py-3.5 text-left text-[0.95rem] leading-snug break-words transition-colors duration-150 sm:min-h-[3.25rem] sm:px-6 sm:py-4 sm:text-lg ${
                  isSelected
                    ? "border-accent bg-accent text-accent-foreground"
                    : isPrevious
                      ? "border-accent/70 bg-secondary text-foreground"
                      : "border-border bg-card text-foreground hover:border-accent/60 hover:bg-secondary"
                }`}
              >
                {answer.text}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
