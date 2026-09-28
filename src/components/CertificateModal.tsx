import { useState, useRef } from "react";
import type { Outcome } from "@/lib/scoring";
import { Download, X, Award } from "lucide-react";
import { playClick } from "@/lib/sound";

type Props = {
  outcome: Outcome;
  onClose: () => void;
};

export function CertificateModal({ outcome, onClose }: Props) {
  const [name, setName] = useState("Proud Citizen");
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadCertificate = async () => {
    playClick();
    setDownloading(true);

    try {
      const W = 1200;
      const H = 840;
      const canvas = document.createElement("canvas");
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Outer background
      ctx.fillStyle = "#111114";
      ctx.fillRect(0, 0, W, H);

      // Certificate border
      ctx.strokeStyle = "#ff6a30";
      ctx.lineWidth = 10;
      ctx.strokeRect(30, 30, W - 60, H - 60);

      // Inner thin gold/subtle border
      ctx.strokeStyle = "#40404a";
      ctx.lineWidth = 2;
      ctx.strokeRect(45, 45, W - 90, H - 90);

      // Top corner decorations
      ctx.fillStyle = "#ff6a30";
      ctx.fillRect(30, 30, 40, 40);
      ctx.fillRect(W - 70, 30, 40, 40);
      ctx.fillRect(30, H - 70, 40, 40);
      ctx.fillRect(W - 70, H - 70, 40, 40);

      // Header
      ctx.textAlign = "center";
      ctx.fillStyle = "#a0a0aa";
      ctx.font = "bold 16px 'Space Grotesk', sans-serif";
      ctx.letterSpacing = "6px";
      ctx.fillText("INTERNATIONAL COUNCIL OF CHUMTIYAPA", W / 2, 110);

      ctx.fillStyle = "#f5f5f7";
      ctx.font = "900 48px 'Space Grotesk', sans-serif";
      ctx.letterSpacing = "2px";
      ctx.fillText("CERTIFICATE OF EXCELLENCE", W / 2, 180);

      ctx.fillStyle = "#a0a0aa";
      ctx.font = "20px 'Space Grotesk', sans-serif";
      ctx.fillText("THIS IS TO HUMBLY CERTIFY THAT", W / 2, 240);

      // User name
      ctx.fillStyle = "#ff6a30";
      ctx.font = "bold 44px 'Space Grotesk', sans-serif";
      ctx.fillText(name.trim() || "Proud Citizen", W / 2, 310);

      ctx.strokeStyle = "#ff6a30";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(W / 2 - 250, 330);
      ctx.lineTo(W / 2 + 250, 330);
      ctx.stroke();

      // Certificate Body Text
      ctx.fillStyle = "#f5f5f7";
      ctx.font = "22px 'Space Grotesk', sans-serif";
      ctx.fillText(
        `has achieved an official diagnosis of ${outcome.percentage}% Chumtiya Level`,
        W / 2,
        385
      );
      ctx.fillText(
        `and is hereby conferred the supreme rank of`,
        W / 2,
        425
      );

      // Band Rank
      ctx.fillStyle = "#ff6a30";
      ctx.font = "900 36px 'Space Grotesk', sans-serif";
      ctx.fillText(`“${outcome.band.toUpperCase()}”`, W / 2, 480);

      // Primary trait
      ctx.fillStyle = "#a0a0aa";
      ctx.font = "18px 'Space Grotesk', sans-serif";
      ctx.fillText(`Specialization: ${outcome.traitName}`, W / 2, 530);

      ctx.fillStyle = "#70707a";
      ctx.font = "italic 16px 'Space Grotesk', sans-serif";
      ctx.fillText(`"${outcome.traitDescription}"`, W / 2, 570);

      // Stamp circle
      ctx.save();
      ctx.translate(W / 2 - 320, 680);
      ctx.rotate(-0.15);
      ctx.strokeStyle = "#ff6a30";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 0, 55, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "#ff6a30";
      ctx.font = "bold 13px sans-serif";
      ctx.fillText("OFFICIALLY", 0, -15);
      ctx.fillText("VERIFIED", 0, 5);
      ctx.fillText("CHUMTIYA", 0, 25);
      ctx.restore();

      // Signatures
      ctx.textAlign = "left";
      ctx.fillStyle = "#f5f5f7";
      ctx.font = "italic bold 22px 'Caveat', cursive, serif";
      ctx.fillText("Dr. Self-Awareness", W / 2 + 150, 690);
      ctx.strokeStyle = "#70707a";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(W / 2 + 130, 705);
      ctx.lineTo(W / 2 + 360, 705);
      ctx.stroke();
      ctx.font = "14px 'Space Grotesk', sans-serif";
      ctx.fillStyle = "#a0a0aa";
      ctx.fillText("Director of Reality Checks", W / 2 + 170, 730);

      // Trigger download
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `Chumtiya-Certificate-${outcome.percentage}pct.png`;
      a.click();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative my-8 w-full max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-2xl sm:p-8">
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
          <Award className="h-6 w-6" />
          <h2 className="text-xl font-bold tracking-tight uppercase">Official Certificate</h2>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter your name to generate your printable certificate of Chumtiyapa.
        </p>

        <div className="mt-4">
          <label className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
            Your Name / Nickname
          </label>
          <input
            type="text"
            value={name}
            maxLength={40}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-base font-bold text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            placeholder="e.g. Anurag Kumar"
          />
        </div>

        {/* Certificate Preview Card */}
        <div
          ref={cardRef}
          className="mt-5 rounded-xl border-2 border-accent/60 bg-background/90 p-6 text-center shadow-inner relative overflow-hidden"
        >
          <p className="font-mono text-[9px] tracking-[0.3em] text-muted-foreground uppercase">
            International Council of Chumtiyapa
          </p>
          <h3 className="mt-2 text-xl font-black tracking-tight text-foreground sm:text-2xl">
            CERTIFICATE OF EXCELLENCE
          </h3>
          <p className="mt-3 text-xs text-muted-foreground">THIS IS TO HUMBLY CERTIFY THAT</p>
          <p className="mt-1 text-xl font-bold text-accent sm:text-2xl">{name || "Proud Citizen"}</p>
          <div className="mx-auto my-3 h-0.5 w-40 bg-accent/40" />
          <p className="text-sm text-foreground">
            has achieved an official score of{" "}
            <span className="font-bold text-accent">{outcome.percentage}%</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">and is conferred the supreme rank of</p>
          <p className="mt-1 text-lg font-black tracking-wider text-foreground uppercase sm:text-xl">
            “{outcome.band}”
          </p>
          <p className="mt-2 text-xs font-semibold text-muted-foreground">
            Specialization: {outcome.traitName}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-end">
          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            className="rounded-full border border-border px-6 py-2.5 text-xs font-bold tracking-wider uppercase hover:bg-muted"
          >
            Cancel
          </button>
          <button
            onClick={downloadCertificate}
            disabled={downloading}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-2.5 text-xs font-bold tracking-wider text-accent-foreground uppercase transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            {downloading ? "Generating..." : "Download Certificate (PNG)"}
          </button>
        </div>
      </div>
    </div>
  );
}
