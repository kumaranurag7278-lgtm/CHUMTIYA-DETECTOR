import { useState, useRef } from "react";
import type { Outcome } from "@/lib/scoring";
import { Download, X, Smartphone, Sparkles } from "lucide-react";
import { playClick } from "@/lib/sound";

type Props = {
  outcome: Outcome;
  onClose: () => void;
};

export function StoryCardModal({ outcome, onClose }: Props) {
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadStoryCard = () => {
    playClick();
    setDownloading(true);

    try {
      const W = 1080;
      const H = 1920;
      const canvas = document.createElement("canvas");
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
      bgGrad.addColorStop(0, "#0c0c0e");
      bgGrad.addColorStop(0.5, "#151518");
      bgGrad.addColorStop(1, "#0a0a0c");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Subtle background grid or glow
      const radialGlow = ctx.createRadialGradient(W / 2, 600, 50, W / 2, 600, 600);
      radialGlow.addColorStop(0, "rgba(255, 106, 48, 0.15)");
      radialGlow.addColorStop(1, "rgba(255, 106, 48, 0)");
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, W, H);

      // Card borders / accent corners
      ctx.strokeStyle = "#27272e";
      ctx.lineWidth = 4;
      ctx.strokeRect(60, 60, W - 120, H - 120);

      // Glowing corner tags
      ctx.fillStyle = "#ff6a30";
      ctx.fillRect(60, 60, 40, 8);
      ctx.fillRect(60, 60, 8, 40);
      ctx.fillRect(W - 100, 60, 40, 8);
      ctx.fillRect(W - 68, 60, 8, 40);
      ctx.fillRect(60, H - 68, 40, 8);
      ctx.fillRect(60, H - 100, 8, 40);
      ctx.fillRect(W - 100, H - 68, 40, 8);
      ctx.fillRect(W - 68, H - 100, 8, 40);

      // Header Tag
      ctx.textAlign = "center";
      ctx.fillStyle = "#ff6a30";
      ctx.font = "bold 26px 'Space Grotesk', sans-serif";
      ctx.letterSpacing = "6px";
      ctx.fillText("● OFFICIAL SCAN RESULTS", W / 2, 180);

      // App Title
      ctx.fillStyle = "#f5f5f7";
      ctx.font = "900 64px 'Space Grotesk', sans-serif";
      ctx.letterSpacing = "3px";
      ctx.fillText("CHUMTIYA DETECTOR", W / 2, 270);

      ctx.fillStyle = "#71717a";
      ctx.font = "24px 'Space Grotesk', sans-serif";
      ctx.fillText("CLINICAL DIAGNOSIS FOR SOCIAL REASONING", W / 2, 320);

      // Circle Percentage Gauge
      const gaugeY = 660;
      const radius = 220;

      // Gauge background ring
      ctx.lineWidth = 26;
      ctx.strokeStyle = "#202026";
      ctx.beginPath();
      ctx.arc(W / 2, gaugeY, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Gauge active arc
      const pctArc = (outcome.percentage / 100) * (Math.PI * 2);
      ctx.strokeStyle = "#ff6a30";
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.arc(W / 2, gaugeY, radius, -Math.PI / 2, -Math.PI / 2 + pctArc);
      ctx.stroke();
      ctx.lineCap = "butt";

      // Score inside gauge
      ctx.fillStyle = "#f5f5f7";
      ctx.font = "900 140px 'Space Grotesk', sans-serif";
      ctx.letterSpacing = "-2px";
      ctx.fillText(`${outcome.percentage}%`, W / 2, gaugeY + 45);

      ctx.fillStyle = "#ff6a30";
      ctx.font = "bold 24px 'Space Grotesk', sans-serif";
      ctx.letterSpacing = "4px";
      ctx.fillText("CHUMTIYA LEVEL", W / 2, gaugeY + 105);

      // Verdict Box
      const boxY = 980;
      const boxW = 860;
      const boxH = 260;
      ctx.fillStyle = "rgba(255, 106, 48, 0.08)";
      ctx.strokeStyle = "#ff6a30";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect((W - boxW) / 2, boxY, boxW, boxH, 24);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#a1a1aa";
      ctx.font = "bold 22px 'Space Grotesk', sans-serif";
      ctx.letterSpacing = "4px";
      ctx.fillText("VERDICT", W / 2, boxY + 60);

      ctx.fillStyle = "#ffffff";
      ctx.font = "900 48px 'Space Grotesk', sans-serif";
      ctx.letterSpacing = "1px";
      ctx.fillText(`"${outcome.band.toUpperCase()}"`, W / 2, boxY + 130);

      ctx.fillStyle = "#ff6a30";
      ctx.font = "bold 28px 'Space Grotesk', sans-serif";
      ctx.letterSpacing = "1px";
      ctx.fillText(`Archetype: ${outcome.traitName}`, W / 2, boxY + 195);

      // Trait description
      ctx.fillStyle = "#d4d4d8";
      ctx.font = "italic 32px 'Space Grotesk', sans-serif";
      const desc = `“${outcome.traitDescription}”`;
      ctx.fillText(desc, W / 2, 1340);

      // Challenge / Call to Action Box
      const ctaY = 1450;
      ctx.fillStyle = "#18181c";
      ctx.strokeStyle = "#3f3f46";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect((W - 860) / 2, ctaY, 860, 220, 24);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#f5f5f7";
      ctx.font = "bold 34px 'Space Grotesk', sans-serif";
      ctx.fillText("Think you're less chumtiya than me?", W / 2, ctaY + 70);

      ctx.fillStyle = "#ff6a30";
      ctx.font = "900 40px 'Space Grotesk', sans-serif";
      ctx.fillText("TAG ME & TAKE THE TEST 👇", W / 2, ctaY + 135);

      ctx.fillStyle = "#71717a";
      ctx.font = "bold 24px 'Space Grotesk', sans-serif";
      ctx.fillText("chumtiyadetector.com", W / 2, ctaY + 185);

      // Bottom disclaimer
      ctx.fillStyle = "#52525b";
      ctx.font = "18px 'Space Grotesk', sans-serif";
      ctx.fillText("Official 100% Satirical Diagnosis • Generated via Chumtiya Detector", W / 2, H - 100);

      // Trigger download
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `Chumtiya-Story-${outcome.percentage}pct.png`;
      a.click();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative my-8 w-full max-w-md rounded-2xl border border-border bg-card p-5 shadow-2xl sm:p-6">
        <button
          onClick={() => {
            playClick();
            onClose();
          }}
          className="absolute top-4 right-4 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 text-accent">
          <Smartphone className="h-5 w-5" />
          <h2 className="text-lg font-bold tracking-tight uppercase">Story Card (9:16)</h2>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Perfect for Instagram Stories, Snapchat, and WhatsApp Status.
        </p>

        {/* Story Card Miniature Preview (9:16 aspect ratio) */}
        <div
          ref={cardRef}
          className="mt-4 mx-auto w-[240px] aspect-[9/16] rounded-2xl border-2 border-accent/60 bg-gradient-to-b from-[#0c0c0e] via-[#151518] to-[#0a0a0c] p-4 flex flex-col justify-between text-center shadow-xl relative overflow-hidden select-none"
        >
          <div className="pt-2">
            <span className="font-mono text-[8px] font-bold tracking-wider text-accent uppercase">
              ● SCAN RESULT
            </span>
            <h4 className="text-xs font-black tracking-wider text-foreground">
              CHUMTIYA DETECTOR
            </h4>
          </div>

          <div className="my-auto py-2">
            <div className="mx-auto flex h-24 w-24 flex-col items-center justify-center rounded-full border-4 border-accent bg-accent/10 shadow-[0_0_20px_rgba(255,106,48,0.25)]">
              <span className="text-3xl font-black text-foreground">{outcome.percentage}%</span>
              <span className="text-[7px] font-bold text-accent tracking-wider uppercase">Level</span>
            </div>
            <p className="mt-3 text-[10px] font-black uppercase text-foreground">
              “{outcome.band}”
            </p>
            <span className="mt-1 inline-block rounded-full bg-accent/20 px-2 py-0.5 text-[8px] font-bold text-accent">
              {outcome.traitName}
            </span>
          </div>

          <div className="rounded-lg border border-border/80 bg-background/60 p-2 pb-2.5">
            <p className="text-[8px] font-bold text-muted-foreground">Think you can beat me?</p>
            <p className="text-[9px] font-black text-accent uppercase">Tag me & take the test</p>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            className="rounded-full border border-border px-5 py-2 text-xs font-bold uppercase hover:bg-muted"
          >
            Close
          </button>
          <button
            onClick={downloadStoryCard}
            disabled={downloading}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-2.5 text-xs font-bold text-accent-foreground uppercase transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            {downloading ? "Saving..." : "Save Story PNG (1080×1920)"}
          </button>
        </div>
      </div>
    </div>
  );
}
