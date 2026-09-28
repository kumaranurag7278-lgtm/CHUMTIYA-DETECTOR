import { useState, useRef } from "react";
import type { Outcome } from "@/lib/scoring";
import { Download, X, Award, ShieldCheck } from "lucide-react";
import { playClick } from "@/lib/sound";

type Props = {
  outcome: Outcome;
  onClose: () => void;
};

export function CertificateModal({ outcome, onClose }: Props) {
  const [name, setName] = useState("Candidate Name");
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const certId = `AICBS-HACK-2026-${outcome.percentage}${outcome.traitName.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const downloadCertificate = async () => {
    playClick();
    setDownloading(true);

    try {
      const W = 1400;
      const H = 980;
      const canvas = document.createElement("canvas");
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // 1. Certificate Ivory / Linen Background
      const bgGrad = ctx.createLinearGradient(0, 0, W, H);
      bgGrad.addColorStop(0, "#fcfbf7");
      bgGrad.addColorStop(0.5, "#faf7ed");
      bgGrad.addColorStop(1, "#f4efdf");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Subtle Watermark Guilloche Lines
      ctx.strokeStyle = "rgba(197, 155, 39, 0.08)";
      ctx.lineWidth = 1;
      for (let i = 0; i < W; i += 35) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(W - i, H);
        ctx.stroke();
      }

      // 2. Formal Double Borders (Navy Outer & Gold Inner)
      // Outer Navy border
      ctx.strokeStyle = "#0f172a";
      ctx.lineWidth = 10;
      ctx.strokeRect(36, 36, W - 72, H - 72);

      // Thin Inner Navy border
      ctx.strokeStyle = "#1e293b";
      ctx.lineWidth = 2;
      ctx.strokeRect(48, 48, W - 96, H - 96);

      // Gold Filigree Border
      ctx.strokeStyle = "#c59b27";
      ctx.lineWidth = 4;
      ctx.strokeRect(58, 58, W - 116, H - 116);

      // Corner Accents (Gold geometric brackets)
      const cSize = 40;
      const drawCorner = (x: number, y: number, dx: number, dy: number) => {
        ctx.fillStyle = "#c59b27";
        ctx.fillRect(x, y, dx * cSize, dy * 6);
        ctx.fillRect(x, y, dx * 6, dy * cSize);
      };
      drawCorner(62, 62, 1, 1);
      drawCorner(W - 62, 62, -1, 1);
      drawCorner(62, H - 62, 1, -1);
      drawCorner(W - 62, H - 62, -1, -1);

      // 3. Organization Header & Insignia
      ctx.textAlign = "center";

      // Government / Council Seal Icon at Top Center
      ctx.fillStyle = "#0f172a";
      ctx.beginPath();
      ctx.arc(W / 2, 115, 26, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#c59b27";
      ctx.beginPath();
      ctx.arc(W / 2, 115, 22, 0, Math.PI * 2);
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.font = "bold 18px 'Space Grotesk', serif";
      ctx.fillStyle = "#fcfbf7";
      ctx.fillText("★", W / 2, 122);

      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 17px 'Times New Roman', Times, serif";
      ctx.letterSpacing = "3px";
      ctx.fillText(
        "ALL INDIA COUNCIL OF BEHAVIORAL SCIENCES & COGNITIVE REASONING",
        W / 2,
        170
      );

      ctx.fillStyle = "#64748b";
      ctx.font = "italic 13px 'Times New Roman', serif";
      ctx.letterSpacing = "1px";
      ctx.fillText(
        "Autonomous Apex Body for Social Diagnostics & Human Intelligence | Reg. Act 2026/CHUM-8491",
        W / 2,
        192
      );

      // Decorative divider
      ctx.strokeStyle = "#c59b27";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(W / 2 - 320, 208);
      ctx.lineTo(W / 2 + 320, 208);
      ctx.stroke();

      // 4. Main Certificate Title
      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 44px 'Times New Roman', Times, serif";
      ctx.letterSpacing = "2px";
      ctx.fillText("CERTIFICATE OF MERIT & ACCREDITATION", W / 2, 260);

      ctx.fillStyle = "#b45309";
      ctx.font = "bold 15px 'Space Grotesk', sans-serif";
      ctx.letterSpacing = "4px";
      ctx.fillText("NATIONAL DIAGNOSTIC HACKATHON 2026", W / 2, 290);

      ctx.fillStyle = "#475569";
      ctx.font = "16px 'Times New Roman', serif";
      ctx.letterSpacing = "1.5px";
      ctx.fillText("THIS IS TO HUMBLY & OFFICIALLY CONFER THAT", W / 2, 340);

      // 5. Candidate Name
      const displayName = (name.trim() || "Proud Candidate").toUpperCase();
      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 44px 'Times New Roman', Times, serif";
      ctx.letterSpacing = "2px";
      ctx.fillText(displayName, W / 2, 405);

      // Name Underline with center diamond
      ctx.strokeStyle = "#c59b27";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(W / 2 - 280, 425);
      ctx.lineTo(W / 2 + 280, 425);
      ctx.stroke();
      ctx.fillStyle = "#c59b27";
      ctx.fillRect(W / 2 - 4, 421, 8, 8);

      // 6. Citation Text
      ctx.fillStyle = "#334155";
      ctx.font = "18px 'Times New Roman', serif";
      ctx.letterSpacing = "0.5px";
      ctx.fillText(
        "has successfully undergone the National Psychometric & Behavioral Competency Evaluation Protocol,",
        W / 2,
        475
      );
      ctx.fillText(
        "demonstrating extraordinary decision-making aptitude, and is hereby certified with an official",
        W / 2,
        505
      );

      // 7. Official Accredited Rating Box
      const boxW = 860;
      const boxH = 100;
      const boxY = 535;
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "#c59b27";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect((W - boxW) / 2, boxY, boxW, boxH, 12);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 15px 'Space Grotesk', sans-serif";
      ctx.letterSpacing = "3px";
      ctx.fillText("ACCREDITED CHUMTIYAPA QUOTIENT (CQ)", W / 2, boxY + 32);

      ctx.fillStyle = "#dc2626";
      ctx.font = "bold 36px 'Times New Roman', Times, serif";
      ctx.letterSpacing = "1px";
      ctx.fillText(
        `${outcome.percentage}% — ${outcome.band.toUpperCase()}`,
        W / 2,
        boxY + 74
      );

      // Specialization Trait
      ctx.fillStyle = "#475569";
      ctx.font = "italic 16px 'Times New Roman', serif";
      ctx.fillText(
        `Primary Specialization: ${outcome.traitName} (“${outcome.traitDescription}”)`,
        W / 2,
        665
      );

      // 8. Bottom Meta / Serial No.
      ctx.textAlign = "left";
      ctx.font = "12px 'Space Grotesk', monospace";
      ctx.fillStyle = "#64748b";
      ctx.fillText(`Certificate ID: ${certId}`, 100, 715);
      ctx.fillText(`Date of Issuance: ${today}`, 100, 735);
      ctx.fillText("Verification Status: ACCREDITED & LOGGED", 100, 755);

      // 9. Authentic Embossed Golden Seal in Center
      ctx.save();
      ctx.translate(W / 2, 795);
      // Outer golden sunburst ring
      ctx.strokeStyle = "#c59b27";
      ctx.fillStyle = "#fef9c3";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 0, 52, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.strokeStyle = "#b45309";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, 44, 0, Math.PI * 2);
      ctx.stroke();

      ctx.textAlign = "center";
      ctx.fillStyle = "#9a3412";
      ctx.font = "bold 9px 'Space Grotesk', sans-serif";
      ctx.fillText("OFFICIAL SEAL", 0, -20);
      ctx.font = "bold 14px 'Times New Roman', serif";
      ctx.fillText("★ MERIT ★", 0, -2);
      ctx.font = "bold 8px 'Space Grotesk', sans-serif";
      ctx.fillText("VALIDATED", 0, 15);
      ctx.fillText("2026", 0, 26);
      ctx.restore();

      // 10. Formal Signatures
      // Left Signature
      ctx.textAlign = "center";
      ctx.fillStyle = "#0f172a";
      ctx.font = "italic bold 24px 'Brush Script MT', cursive, serif";
      ctx.fillText("Dr. Rajesh V. Ramanathan", 310, 835);

      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(190, 850);
      ctx.lineTo(430, 850);
      ctx.stroke();

      ctx.font = "bold 13px 'Times New Roman', serif";
      ctx.fillStyle = "#0f172a";
      ctx.fillText("Dr. Rajesh V. Ramanathan", 310, 870);
      ctx.font = "12px 'Times New Roman', serif";
      ctx.fillStyle = "#64748b";
      ctx.fillText("Chief Evaluation Officer, AICBS", 310, 888);

      // Right Signature
      ctx.fillStyle = "#0f172a";
      ctx.font = "italic bold 24px 'Brush Script MT', cursive, serif";
      ctx.fillText("Prof. Vikramaditya Sen", W - 310, 835);

      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(W - 430, 850);
      ctx.lineTo(W - 190, 850);
      ctx.stroke();

      ctx.font = "bold 13px 'Times New Roman', serif";
      ctx.fillStyle = "#0f172a";
      ctx.fillText("Prof. Vikramaditya Sen", W - 310, 870);
      ctx.font = "12px 'Times New Roman', serif";
      ctx.fillStyle = "#64748b";
      ctx.fillText("Director General & Jury Chair", W - 310, 888);

      // Bottom legal disclaimer
      ctx.textAlign = "center";
      ctx.fillStyle = "#94a3b8";
      ctx.font = "11px 'Times New Roman', serif";
      ctx.fillText(
        "Issued under Section 42 of the Behavioral Diagnostics Charter. Peer-reviewed for academic & humor assessment.",
        W / 2,
        925
      );

      // Trigger download
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `Official-Hackathon-Certificate-${outcome.percentage}pct.png`;
      a.click();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative my-8 w-full max-w-3xl rounded-2xl border border-border bg-card p-5 shadow-2xl sm:p-7">
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
          <ShieldCheck className="h-6 w-6 text-accent" />
          <h2 className="text-xl font-bold tracking-tight uppercase">
            Official Hackathon Certificate
          </h2>
        </div>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
          A genuine, highly serious, official certificate designed for portfolio, LinkedIn, or print.
        </p>

        <div className="mt-4">
          <label className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
            Candidate Full Name (As it should appear on certificate)
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

        {/* Certificate Realistic Hackathon Style Live Preview */}
        <div
          ref={cardRef}
          className="mt-5 rounded-xl border-4 border-[#0f172a] bg-[#fcfbf7] p-6 text-center text-[#0f172a] shadow-inner relative overflow-hidden select-none"
        >
          {/* Inner gold border */}
          <div className="absolute inset-2 border-2 border-[#c59b27] pointer-events-none rounded-sm" />

          <p className="font-serif text-[9px] font-bold tracking-[0.2em] text-[#64748b] uppercase">
            All India Council of Behavioral Sciences & Cognitive Reasoning
          </p>
          <p className="text-[8px] italic text-[#94a3b8]">
            National Diagnostics Hackathon 2026 • Reg. Act 2026/CHUM-8491
          </p>

          <h3 className="mt-3 font-serif text-lg font-bold tracking-wider text-[#0f172a] sm:text-2xl">
            CERTIFICATE OF MERIT & ACCREDITATION
          </h3>

          <p className="mt-2 text-[10px] tracking-widest text-[#64748b] uppercase">
            This is proudly conferred upon
          </p>

          <p className="mt-1 font-serif text-2xl font-bold text-[#0f172a] uppercase sm:text-3xl">
            {name.trim() || "Candidate Name"}
          </p>
          <div className="mx-auto my-2 h-0.5 w-48 bg-[#c59b27]" />

          <p className="text-[11px] text-[#334155] sm:text-xs">
            for successfully completing the National Behavioral & Social Intelligence Benchmark, achieving
          </p>

          <div className="mx-auto my-3 max-w-md rounded-lg border border-[#c59b27] bg-white p-2.5 shadow-sm">
            <span className="font-mono text-[9px] font-bold tracking-widest text-[#64748b] uppercase">
              Accredited Chumtiyapa Quotient
            </span>
            <p className="font-serif text-xl font-black text-[#dc2626] sm:text-2xl">
              {outcome.percentage}% — {outcome.band.toUpperCase()}
            </p>
          </div>

          <p className="text-[10px] text-[#64748b] italic">
            Specialization: {outcome.traitName}
          </p>

          <div className="mt-5 flex items-center justify-between border-t border-[#cbd5e1] pt-3 text-[9px] text-[#64748b]">
            <div className="text-left">
              <span className="font-bold block text-[#0f172a]">Dr. R. V. Ramanathan</span>
              Chief Evaluation Officer
            </div>
            <div className="rounded-full border border-[#c59b27] bg-[#fef9c3] px-2 py-0.5 text-[8px] font-bold text-[#b45309]">
              ★ OFFICIAL MERIT SEAL ★
            </div>
            <div className="text-right">
              <span className="font-bold block text-[#0f172a]">Prof. V. Sen</span>
              Director General, AICBS
            </div>
          </div>
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
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-2.5 text-xs font-bold tracking-wider text-accent-foreground uppercase transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            {downloading ? "Generating..." : "Download Official Certificate (PNG)"}
          </button>
        </div>
      </div>
    </div>
  );
}
