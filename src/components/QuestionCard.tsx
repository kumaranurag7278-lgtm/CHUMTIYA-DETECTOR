import type { Question } from "@/data/questions";

type Props = {
  question: Question;
  selected: number | null;
  onSelect: (index: number) => void;
  phase: "in" | "out";
};

export function QuestionCard({ question, selected, onSelect, phase }: Props) {
  return (
    <div className={phase === "out" ? "q-exit" : "q-enter"}>
      <h2 className="text-balance text-[clamp(1.6rem,4.5vw,3rem)] leading-[1.1] font-bold tracking-tight">
        {question.question}
      </h2>
      <ul className="mt-10 flex flex-col gap-3">
        {question.answers.map((answer, i) => {
          const isSelected = selected === i;
          return (
            <li key={answer.text}>
              <button
                onClick={() => onSelect(i)}
                disabled={selected !== null}
                className={`w-full rounded-2xl border px-6 py-4 text-left text-base transition-colors duration-150 sm:text-lg ${
                  isSelected
                    ? "border-accent bg-accent text-accent-foreground"
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
