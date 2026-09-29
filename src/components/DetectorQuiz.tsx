import { useState, useMemo, useEffect } from "react";
import type { DetectorDefinition, DetectorBand } from "@/data/detectors";
import { playClick, playOptionSelect, playRoastSoundForScore } from "@/lib/sound";
import { DatingPitchCard } from "./DatingPitchCard";
import { recordEvent } from "@/lib/analytics";
import {
  ArrowLeft,
  Share2,
  Download,
  RotateCcw,
  Sparkles,
  Award,
  CheckCircle,
  ExternalLink,
} from "lucide-react";

interface Props {
  detector: DetectorDefinition;
  onExit: () => void;
}

export function DetectorQuiz({ detector, onExit }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(detector.questions.length).fill(null)
  );
  const [completed, setCompleted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [animatingPercent, setAnimatingPercent] = useState(0);

  // Track survey_started on mount
  useEffect(() => {
    recordEvent("survey_started", { mode: detector.id });
  }, [detector.id]);

  const questions = detector.questions;
  const totalQuestions = questions.length;
  const currentQ = questions[currentStep];

  // Calculate score: 10 questions * max 3 = 30 max points
  const scorePct = useMemo(() => {
    const rawTotal = selectedAnswers.reduce<number>((acc, ansIdx, qIdx) => {
      if (ansIdx === null) return acc;
      return acc + (questions[qIdx]?.answers[ansIdx]?.score ?? 0);
    }, 0);
    const maxScore = totalQuestions * 3;
    return Math.min(100, Math.max(10, Math.round((rawTotal / maxScore) * 100)));
  }, [selectedAnswers, questions, totalQuestions]);

  // Determine outcome band
  const outcomeBand: DetectorBand = useMemo(() => {
    for (const band of detector.bands) {
      if (scorePct >= band.min && scorePct <= band.max) {
        return band;
      }
    }
    return detector.bands[detector.bands.length - 1]!;
  }, [scorePct, detector.bands]);

  // Handle Option Select
  const handleSelectOption = (optIndex: number) => {
    playOptionSelect();
    const nextAnswers = [...selectedAnswers];
    nextAnswers[currentStep] = optIndex;
    setSelectedAnswers(nextAnswers);

    if (currentStep + 1 >= totalQuestions) {
      // Completed!
      setCompleted(true);
      recordEvent("survey_completed", {
        mode: detector.id,
        score: scorePct,
        band: outcomeBand.title,
      });
      recordEvent("result_viewed", {
        source: detector.id,
        percentage: scorePct,
      });
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      playClick();
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleRetry = () => {
    playClick();
    setSelectedAnswers(new Array(totalQuestions).fill(null));
    setCurrentStep(0);
    setCompleted(false);
    recordEvent("survey_started", { mode: detector.id, retry: true });
  };

  // Percent animation on finish & roast sound
  useEffect(() => {
    if (!completed) return;
    playRoastSoundForScore(scorePct, detector.id);
    let start = 0;
    const end = scorePct;
    const duration = 1000;
    const startTime = performance.now();

    const frame = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const val = Math.round(start + (end - start) * (1 - Math.pow(1 - progress, 3)));
      setAnimatingPercent(val);
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [completed, scorePct]);

  // Share result
  const handleShare = async () => {
    playClick();
    const shareText = `${detector.emoji} Maine abhi "${detector.title}" test liya aur mera score aaya: ${scorePct}% (${outcomeBand.title})!\n${outcomeBand.description}\nTest your own score here: ${window.location.origin}/test/${detector.id}`;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        recordEvent("share_clicked", { channel: "native", type: detector.id });
        await navigator.share({
          title: `${detector.title} Result`,
          text: shareText,
          url: `${window.location.origin}/test/${detector.id}`,
        });
        return;
      } catch (e: unknown) {
        if (e instanceof Error && e.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      recordEvent("share_link_copied", { source: `${detector.id}_text` });
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable */
    }
  };

  // Generate 1080x1080 Report Card PNG
  const handleDownloadCard = () => {
    playClick();
    recordEvent("share_clicked", { channel: "certificate", type: `${detector.id}_card` });

    const canvas = document.createElement("canvas");
    const W = 1080;
    const H = 1080;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background Dark Canvas
    ctx.fillStyle = "#0c0d12";
    ctx.fillRect(0, 0, W, H);

    // Border Glow
    ctx.strokeStyle = detector.themeColor.primary;
    ctx.lineWidth = 8;
    ctx.strokeRect(40, 40, W - 80, H - 80);

    // Decorative Corners
    ctx.fillStyle = detector.themeColor.primary;
    ctx.fillRect(36, 36, 40, 8);
    ctx.fillRect(36, 36, 8, 40);
    ctx.fillRect(W - 76, 36, 40, 8);
    ctx.fillRect(W - 44, 36, 8, 40);
    ctx.fillRect(36, H - 44, 40, 8);
    ctx.fillRect(36, H - 76, 8, 40);
    ctx.fillRect(W - 76, H - 44, 40, 8);
    ctx.fillRect(W - 44, H - 76, 8, 40);

    ctx.textAlign = "center";

    // Header Badge
    ctx.font = "bold 24px 'Space Grotesk', sans-serif";
    ctx.fillStyle = detector.themeColor.primary;
    ctx.letterSpacing = "6px";
    ctx.fillText(`● OFFICIAL ${detector.shortTitle.toUpperCase()} DOSSIER`, W / 2, 130);

    // App Title
    ctx.font = "900 52px 'Space Grotesk', sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.letterSpacing = "2px";
    ctx.fillText("CHUMTIYA DETECTOR ARCADE", W / 2, 205);

    // Subtitle
    ctx.font = "300 24px 'Space Grotesk', sans-serif";
    ctx.fillStyle = "#a1a1aa";
    ctx.fillText(detector.tagline, W / 2, 255);

    // Divider Line
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(120, 290);
    ctx.lineTo(W - 120, 290);
    ctx.stroke();

    // Large Score
    ctx.font = "900 140px 'Space Grotesk', sans-serif";
    ctx.fillStyle = detector.themeColor.primary;
    ctx.fillText(`${scorePct}%`, W / 2, 450);

    // Score label
    ctx.font = "bold 26px 'Space Grotesk', sans-serif";
    ctx.fillStyle = "#a1a1aa";
    ctx.letterSpacing = "4px";
    ctx.fillText(`${detector.shortTitle.toUpperCase()} INDEX`, W / 2, 510);

    // Category Box
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    ctx.strokeStyle = detector.themeColor.primary;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(80, 560, W - 160, 220, 24);
    ctx.fill();
    ctx.stroke();

    // Band Title
    ctx.font = "900 42px 'Space Grotesk', sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${outcomeBand.emoji} ${outcomeBand.title.toUpperCase()}`, W / 2, 635);

    // Band Description
    ctx.font = "italic 22px 'Space Grotesk', sans-serif";
    ctx.fillStyle = "#d4d4d8";
    wrapText(ctx, `"${outcomeBand.description}"`, W / 2, 690, W - 220, 32);

    // Footer
    ctx.font = "bold 20px 'Space Grotesk', sans-serif";
    ctx.fillStyle = "#71717a";
    ctx.fillText("Verified by Chumtiya Detector Lab • chumtiya-detector.vercel.app", W / 2, 940);

    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `${detector.id}-Verdict-${scorePct}pct.png`;
    a.click();
  };

  function wrapText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) {
    const words = text.split(" ");
    let line = "";
    let curY = y;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line, x, curY);
        line = words[n] + " ";
        curY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, curY);
  }

  // --- RESULT SCREEN ---
  if (completed) {
    return (
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 py-12 text-center sm:px-6">
        <div className="relative mx-auto w-full max-w-xl animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-widest backdrop-blur-md"
            style={{
              borderColor: detector.themeColor.primary + "60",
              backgroundColor: detector.themeColor.primary + "15",
              color: detector.themeColor.primary,
            }}
          >
            <span>{detector.emoji}</span>
            <span>{detector.title} Verdict</span>
          </div>

          {/* Animated Percentage */}
          <p
            className="mt-6 text-[clamp(4.5rem,20vw,9rem)] leading-[0.85] font-black tracking-tighter tabular-nums"
            style={{ color: detector.themeColor.primary }}
          >
            {animatingPercent}%
          </p>

          {/* Title Classification */}
          <h2 className="mt-4 text-balance text-2xl font-black uppercase tracking-tight sm:text-4xl text-foreground">
            {outcomeBand.emoji} {outcomeBand.title}
          </h2>

          {/* Card description */}
          <div className="mt-6 rounded-3xl border border-border/80 bg-card/60 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base italic">
              "{outcomeBand.description}"
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={handleShare}
              className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-full px-6 py-3.5 text-xs font-bold tracking-widest uppercase transition-transform hover:scale-105 active:scale-95 shadow-lg"
              style={{
                backgroundColor: detector.themeColor.primary,
                color: "#ffffff",
              }}
            >
              <Share2 className="h-4 w-4" />
              {copied ? "Verdict Copied!" : "Share Verdict"}
            </button>

            <button
              onClick={handleDownloadCard}
              className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-full border border-border bg-card/80 px-6 py-3.5 text-xs font-bold tracking-widest uppercase transition-transform hover:scale-105 active:scale-95"
            >
              <Download className="h-4 w-4 text-accent" />
              Download PNG Card
            </button>
          </div>

          {/* Subtle Dating / Move On Pitch (No auto redirect, compact & to the side) */}
          {(detector.id === "red_flag" || detector.id === "delulu" || detector.id === "toxic_friend") && (
            <DatingPitchCard className="mt-6" />
          )}

          {/* Secondary Controls: Retest & Arcade */}
          <div className="mt-5 flex items-center justify-center gap-4 text-xs font-mono">
            <button
              onClick={handleRetry}
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Retest
            </button>
            <span className="text-border">•</span>
            <button
              onClick={onExit}
              className="inline-flex items-center gap-1.5 text-accent hover:underline"
            >
              ← Back to Detector Arcade
            </button>
          </div>
        </div>
      </section>
    );
  }

  // --- QUIZ QUESTION SCREEN ---
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-between px-4 py-8 sm:px-8 sm:py-12">
      {/* Top Header Bar */}
      <div className="mx-auto flex w-full max-w-2xl items-center justify-between">
        <button
          onClick={currentStep === 0 ? onExit : handlePrev}
          className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-4 py-2 text-xs font-mono text-muted-foreground uppercase transition-all hover:border-accent hover:text-foreground active:scale-95"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {currentStep === 0 ? "Exit" : "Back"}
        </button>

        <div className="flex items-center gap-2">
          <span
            className="rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider"
            style={{
              borderColor: detector.themeColor.primary + "50",
              backgroundColor: detector.themeColor.primary + "10",
              color: detector.themeColor.primary,
            }}
          >
            {detector.emoji} {detector.shortTitle}
          </span>
          <span className="font-mono text-xs font-bold tracking-widest text-muted-foreground">
            {String(currentStep + 1).padStart(2, "0")} / {String(totalQuestions).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mx-auto mt-4 h-1.5 w-full max-w-2xl overflow-hidden rounded-full bg-border/60">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${((currentStep + 1) / totalQuestions) * 100}%`,
            backgroundColor: detector.themeColor.primary,
          }}
        />
      </div>

      {/* Question Center Area */}
      <div className="mx-auto my-auto w-full max-w-2xl py-8">
        <h2 className="text-balance text-xl font-black leading-tight sm:text-3xl text-foreground">
          {currentQ?.question}
        </h2>

        {/* Options Grid */}
        <div className="mt-8 space-y-3">
          {currentQ?.answers.map((ans, optIdx) => {
            const letter = String.fromCharCode(65 + optIdx);
            const isSelected = selectedAnswers[currentStep] === optIdx;

            return (
              <button
                key={optIdx}
                onClick={() => handleSelectOption(optIdx)}
                className={`group flex w-full items-start gap-3.5 rounded-2xl border p-4 text-left transition-all duration-150 active:scale-[0.98] sm:p-5 ${
                  isSelected
                    ? "border-accent bg-accent/15"
                    : "border-border/80 bg-card/60 hover:border-accent/60 hover:bg-card/90"
                }`}
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border border-border bg-background/80 font-mono text-xs font-bold text-muted-foreground transition-colors group-hover:border-accent group-hover:text-accent"
                >
                  {letter}
                </span>
                <span className="text-sm font-medium leading-snug text-foreground/90 sm:text-base">
                  {ans.text}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="mx-auto text-center font-mono text-[11px] text-muted-foreground/60">
        Click an option to proceed • 100% anonymous roast diagnosis
      </div>
    </section>
  );
}
