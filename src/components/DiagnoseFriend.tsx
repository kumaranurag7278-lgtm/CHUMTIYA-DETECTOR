import { useState, useMemo } from "react";
import { getFriendQuestions } from "@/data/friendQuestions";
import { playClick, playOptionSelect, playFanfare } from "@/lib/sound";
import { UserCheck, Share2, Download, ArrowLeft, RotateCcw } from "lucide-react";

type Props = {
  onBack: () => void;
};

export function DiagnoseFriend({ onBack }: Props) {
  const [friendName, setFriendName] = useState("");
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [selectedIndices, setSelectedIndices] = useState<(number | null)[]>([]);
  const [finished, setFinished] = useState(false);
  const [copied, setCopied] = useState(false);

  const questions = useMemo(() => getFriendQuestions(friendName), [friendName]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!friendName.trim()) return;
    playClick();
    setStarted(true);
  };

  const handleAnswer = (optionIndex: number) => {
    playOptionSelect();
    const next = [...selectedIndices];
    next[step] = optionIndex;
    setSelectedIndices(next);

    if (step + 1 >= questions.length) {
      setFinished(true);
      playFanfare();
    } else {
      setStep(step + 1);
    }
  };

  const goBack = () => {
    if (step <= 0) return;
    playClick();
    setStep(step - 1);
  };

  const goForward = () => {
    if (step >= questions.length - 1 || selectedIndices[step] == null) return;
    playClick();
    setStep(step + 1);
  };

  const pointsTotal = useMemo(() => {
    return selectedIndices.reduce<number>((acc, ansIdx, qIdx) => {
      if (ansIdx == null) return acc;
      return acc + (questions[qIdx]?.answers[ansIdx]?.points ?? 0);
    }, 0);
  }, [selectedIndices, questions]);

  // 7 questions * 3 max points = 21 max points
  const scorePct = Math.min(100, Math.max(15, Math.round((pointsTotal / 21) * 100)));

  const archetype = useMemo(() => {
    if (scorePct >= 85) {
      return {
        title: "National Level Phekuchand",
        desc: "Bolero ke aage photo laga kar system hang karne wala. Phekne me Olympic gold medalist.",
      };
    }
    if (scorePct >= 70) {
      return {
        title: "Muftkhor & Hisaab King",
        desc: "Aapke paise pe maze karega, par ₹20 ke chai ke hisaab pe dosti todne pe utar aayega.",
      };
    }
    if (scorePct >= 50) {
      return {
        title: "Bol Bachchan Specialist",
        desc: "Badi-badi baatein karega jaise sab iske contact me hain, par Google Pay ke time server down ho jata hai.",
      };
    }
    return {
      title: "Chhupa Rustam",
      desc: "Duniya ke saamne shareef banta hai, par asliyat sirf aapko pata hai.",
    };
  }, [scorePct]);

  const name = friendName.trim() || "Dost";

  const shareReport = async () => {
    playClick();
    const shareText = `Bro 😂 maine abhi abhi ${name} ka Chumtiya Detector test kiya aur score aaya ${scorePct}% (${archetype.title})!\nDekh apna official report: ${window.location.origin}`;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${name} ka Chumtiya Diagnosis`,
          text: shareText,
          url: window.location.origin,
        });
        return;
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const downloadCard = () => {
    playClick();
    const W = 1080;
    const H = 1080;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#0f0f13";
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = "#ff6a30";
    ctx.lineWidth = 6;
    ctx.strokeRect(40, 40, W - 80, H - 80);

    ctx.textAlign = "center";
    ctx.fillStyle = "#ff6a30";
    ctx.font = "bold 26px 'Space Grotesk', sans-serif";
    ctx.letterSpacing = "6px";
    ctx.fillText("● CONFIDENTIAL FRIEND REPORT", W / 2, 130);

    ctx.fillStyle = "#f5f5f7";
    ctx.font = "900 56px 'Space Grotesk', sans-serif";
    ctx.letterSpacing = "2px";
    ctx.fillText("CHUMTIYA DETECTOR", W / 2, 210);

    ctx.fillStyle = "#a1a1aa";
    ctx.font = "28px 'Space Grotesk', sans-serif";
    ctx.fillText("OFFICIAL DOST EVALUATION", W / 2, 260);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 52px 'Space Grotesk', sans-serif";
    ctx.fillText(name.toUpperCase(), W / 2, 380);

    ctx.fillStyle = "#ff6a30";
    ctx.font = "900 130px 'Space Grotesk', sans-serif";
    ctx.fillText(`${scorePct}%`, W / 2, 530);

    ctx.fillStyle = "#a1a1aa";
    ctx.font = "bold 24px 'Space Grotesk', sans-serif";
    ctx.letterSpacing = "4px";
    ctx.fillText("CHUMTIYA INDEX", W / 2, 590);

    ctx.fillStyle = "rgba(255, 106, 48, 0.1)";
    ctx.strokeStyle = "#ff6a30";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(80, 640, W - 160, 180, 20);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "900 36px 'Space Grotesk', sans-serif";
    ctx.fillText(`“${archetype.title.toUpperCase()}”`, W / 2, 710);

    ctx.fillStyle = "#d4d4d8";
    ctx.font = "italic 22px 'Space Grotesk', sans-serif";
    ctx.fillText(`"${archetype.desc}"`, W / 2, 765);

    ctx.fillStyle = "#71717a";
    ctx.font = "20px 'Space Grotesk', sans-serif";
    ctx.fillText("Submitted confidentially by a frustrated friend • chumtiyadetector.com", W / 2, 950);

    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `${name}-Chumtiya-Report-${scorePct}pct.png`;
    a.click();
  };

  // Step 1: Friend Name Input
  if (!started) {
    return (
      <section className="relative mx-auto flex min-h-[100svh] max-w-xl flex-col items-center justify-center px-4 py-12 text-center animate-fade-in">
        {/* Prominent Floating Top-Left Back Button */}
        <button
          onClick={onBack}
          className="fixed top-5 left-5 z-40 inline-flex items-center gap-2 rounded-full border border-border bg-card/85 px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground backdrop-blur-md transition-all hover:border-accent hover:text-accent hover:scale-105 active:scale-95 shadow-sm"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </button>

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-accent/40 bg-accent/10 text-accent shadow-lg shadow-accent/20">
          <UserCheck className="h-8 w-8" />
        </div>

        <h2 className="mt-5 text-balance text-3xl font-black tracking-tight sm:text-4xl">
          Dost Ko Diagnose Karo
        </h2>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Kya aapka dost bhi ajeeb harkatein karke aapka dimaag kharab karta hai? 7 sawaalo ke jawab do aur uska official confidential dossier nikaalo.
        </p>

        <form onSubmit={handleStart} className="mt-8 w-full max-w-sm">
          <div className="text-left">
            <label className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
              Dost Ka Naam / Nickname
            </label>
            <input
              type="text"
              required
              maxLength={30}
              value={friendName}
              onChange={(e) => setFriendName(e.target.value)}
              placeholder="e.g. Rahul, Priya, Bunty"
              className="mt-2 w-full rounded-2xl border border-input bg-card px-5 py-3.5 text-lg font-bold text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              autoFocus
            />
          </div>

          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
            <button
              type="button"
              onClick={onBack}
              className="w-full sm:w-1/3 rounded-full border border-border px-5 py-3.5 text-xs font-bold tracking-wider uppercase transition-colors hover:bg-muted text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!friendName.trim()}
              className="w-full sm:w-2/3 rounded-full bg-accent px-6 py-3.5 text-xs font-bold tracking-[0.2em] text-accent-foreground uppercase transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              Start 7Q Scan →
            </button>
          </div>
        </form>
      </section>
    );
  }

  // Step 3: Finished Report Card
  if (finished) {
    return (
      <section className="mx-auto flex min-h-[100svh] max-w-xl flex-col items-center justify-center px-4 py-12 text-center animate-fade-in">
        <p className="font-mono text-xs font-bold tracking-[0.3em] text-accent uppercase">
          ● Dossier Ready
        </p>
        <h2 className="mt-2 text-balance text-2xl font-black tracking-tight sm:text-3xl">
          {name} Ki Official Report
        </h2>

        <div className="mt-6 w-full rounded-3xl border-2 border-accent/60 bg-gradient-to-b from-card to-background p-6 shadow-2xl sm:p-8">
          <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
            Official Chumtiya Level
          </p>
          <p className="mt-2 text-6xl font-black text-accent sm:text-7xl">
            {scorePct}%
          </p>
          <div className="mt-4 inline-block rounded-full bg-accent/20 px-4 py-1 text-xs font-bold text-accent uppercase tracking-wider">
            {archetype.title}
          </div>
          <p className="mt-4 text-sm text-foreground/80 sm:text-base italic">
            "{archetype.desc}"
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 w-full max-w-sm sm:flex-row sm:justify-center">
          <button
            onClick={shareReport}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-xs font-bold tracking-wider text-accent-foreground uppercase transition-transform hover:scale-105 active:scale-95"
          >
            <Share2 className="h-4 w-4" />
            {copied ? "Link Copied!" : "Send to " + name}
          </button>

          <button
            onClick={downloadCard}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-xs font-bold tracking-wider uppercase hover:border-accent hover:text-accent"
          >
            <Download className="h-4 w-4" />
            Save Card (PNG)
          </button>
        </div>

        <div className="mt-6 flex gap-4 text-xs">
          <button
            onClick={() => {
              playClick();
              setStep(0);
              setSelectedIndices([]);
              setFinished(false);
              setFriendName("");
              setStarted(false);
            }}
            className="inline-flex items-center gap-1.5 font-bold text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Doosre Dost Ko Diagnose Karo
          </button>
          <span className="text-muted-foreground">•</span>
          <button
            onClick={onBack}
            className="font-bold text-muted-foreground hover:text-foreground"
          >
            Home
          </button>
        </div>
      </section>
    );
  }

  // Step 2: Friend Questions Flow
  const currentQ = questions[step];
  if (!currentQ) return null;

  const currentSelection = selectedIndices[step];
  const canGoBack = step > 0;
  const canGoForward = step < questions.length - 1 && currentSelection != null;

  return (
    <section className="mx-auto flex min-h-[100svh] max-w-2xl flex-col justify-center px-4 py-8 animate-fade-in sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <span className="font-mono text-xs font-bold tracking-wider text-accent uppercase">
          Diagnosing {name}
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          {step + 1} / {questions.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-accent transition-all duration-300"
          style={{ width: `${((step + 1) / questions.length) * 100}%` }}
        />
      </div>

      <h3 className="mt-8 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {currentQ.question}
      </h3>

      <div className="mt-6 flex flex-col gap-3 sm:mt-8">
        {currentQ.answers.map((ans, i) => {
          const isSelected = currentSelection === i;
          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className={`flex min-h-[3rem] w-full items-center rounded-2xl border px-5 py-3.5 text-left text-base transition-all duration-150 active:scale-[0.99] ${
                isSelected
                  ? "border-accent bg-accent text-accent-foreground font-semibold shadow-md shadow-accent/20"
                  : "border-border bg-card text-foreground hover:border-accent hover:bg-secondary"
              }`}
            >
              {ans.text}
            </button>
          );
        })}
      </div>

      {/* Navigation Buttons: Back and Next */}
      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={goBack}
          disabled={!canGoBack}
          className="inline-flex min-h-[2.5rem] items-center gap-1.5 rounded-full border border-border px-5 py-2 font-mono text-xs tracking-wider uppercase transition-colors disabled:opacity-0 disabled:pointer-events-none hover:border-accent hover:text-accent"
        >
          ← Back
        </button>

        {canGoForward && (
          <button
            type="button"
            onClick={goForward}
            className="inline-flex min-h-[2.5rem] items-center gap-1.5 rounded-full border border-border px-5 py-2 font-mono text-xs tracking-wider uppercase transition-colors hover:border-accent hover:text-accent"
          >
            Next →
          </button>
        )}
      </div>
    </section>
  );
}
