import { MAX_SCORE, bands, questions, traitInfo, type Trait } from "@/data/questions";

// Tie-break order when two traits accumulate the same weight.
const TRAIT_PRIORITY: Trait[] = [
  "superiority",
  "main-character",
  "judgment",
  "complainer",
  "cynicism",
  "anti-mainstream",
  "isolation",
  "overthinking",
  "normal",
];

export type Outcome = {
  percentage: number;
  band: string;
  traitName: string;
  traitDescription: string;
  trait: Trait;
};

function buildOutcome(percentage: number, trait: Trait): Outcome {
  const band =
    bands.find((b) => percentage >= b.min && percentage <= b.max)?.label ?? "Surprisingly Normal";
  const info = traitInfo[trait];
  return { percentage, band, traitName: info.name, traitDescription: info.description, trait };
}

/** Shareable result id, e.g. "23-isolation". */
export const outcomeId = (o: Outcome) => `${o.percentage}-${o.trait}`;

export function outcomeFromId(id: string): Outcome | null {
  const m = /^(\d{1,3})-([a-z-]+)$/.exec(id);
  if (!m) return null;
  const pct = Number(m[1]);
  if (pct > 100 || !(m[2] in traitInfo)) return null;
  return buildOutcome(pct, m[2] as Trait);
}

/** answerIndexes[i] is the chosen answer index for questions[i]. */
export function computeOutcome(answerIndexes: number[]): Outcome {
  let total = 0;
  const traitWeights = new Map<Trait, number>();

  answerIndexes.forEach((choice, i) => {
    const answer = questions[i]?.answers[choice];
    if (!answer) return;
    total += answer.score;
    if (answer.trait !== "normal") {
      traitWeights.set(answer.trait, (traitWeights.get(answer.trait) ?? 0) + answer.score);
    }
  });

  const percentage = Math.round((total / MAX_SCORE) * 100);
  let trait: Trait = "normal";
  if (percentage > 20) {
    let best = 0;
    for (const candidate of TRAIT_PRIORITY) {
      const weight = traitWeights.get(candidate) ?? 0;
      if (weight > best) {
        best = weight;
        trait = candidate;
      }
    }
  }

  return buildOutcome(percentage, trait);
}
