import { useState, useRef } from "react";
import { Download, X, Award, Scroll } from "lucide-react";
import { playClick } from "@/lib/sound";

type Props = {
  friendName: string;
  scorePct: number;
  archetype: { title: string; desc: string };
  onClose: () => void;
};

export function FriendCertificateModal({ friendName, scorePct, archetype, onClose }: Props) {
  const [senderName, setSenderName] = useState("A Concerned Friend");
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const certId = `CHC-DECREE-2026-${scorePct}-${Math.floor(1000 + Math.random() * 9000)}`;

  const downloadCertificate = () => {
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
      ctx.strokeStyle = "#0f172a";
      ctx.lineWidth = 10;
      ctx.strokeRect(36, 36, W - 72, H - 72);

      ctx.strokeStyle = "#1e293b";
      ctx.lineWidth = 2;
      ctx.strokeRect(48, 48, W - 96, H - 96);

      ctx.strokeStyle = "#c59b27";
      ctx.lineWidth = 4;
      ctx.strokeRect(58, 58, W - 116, H - 116);

      // Corner Accents
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

      // Insignia Icon at Top Center
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
      ctx.fillText("⚖️", W / 2, 122);

      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 19px 'Times New Roman', Times, serif";
      ctx.letterSpacing = "4px";
      ctx.fillText("CHUMTIYA HACKATHON CONTEST", W / 2, 170);

      ctx.fillStyle = "#64748b";
      ctx.font = "italic 13px 'Times New Roman', serif";
      ctx.letterSpacing = "1.5px";
      ctx.fillText(
        "Special Peer-Nominated Citizen Award • Friendship Tribunal Bench",
        W / 2,
        192
      );

      // Decorative divider
      ctx.strokeStyle = "#c59b27";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(W / 2 - 280, 208);
      ctx.lineTo(W / 2 + 280, 208);
      ctx.stroke();

      // 4. Main Certificate Title
      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 42px 'Times New Roman', Times, serif";
      ctx.letterSpacing = "2px";
      ctx.fillText("OFFICIAL DECREE OF CHUMTIYAPA", W / 2, 260);

      ctx.fillStyle = "#b45309";
      ctx.font = "bold 14px 'Space Grotesk', sans-serif";
      ctx.letterSpacing = "4px";
      ctx.fillText("PUBLIC ANNOUNCEMENT & CITATION OF MERIT", W / 2, 290);

      ctx.fillStyle = "#475569";
      ctx.font = "16px 'Times New Roman', serif";
      ctx.letterSpacing = "1.5px";
      ctx.fillText("BY SPECIAL ORDER OF THE CONCERNED FRIEND & WITNESS COUNCIL, CONFERRED UPON", W / 2, 340);

      // 5. Friend Name (Recipient)
      const recipient = (friendName.trim() || "Dear Friend").toUpperCase();
      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 44px 'Times New Roman', Times, serif";
      ctx.letterSpacing = "2px";
      ctx.fillText(recipient, W / 2, 405);

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
        "having been thoroughly observed across 7 critical situational decisions and verified by firsthand eyewitness testimony,",
        W / 2,
        475
      );
      ctx.fillText(
        "is hereby officially proclaimed and accredited with the unappealable status of:",
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
      ctx.fillText("OFFICIAL DOST CHUMTIYA RATING", W / 2, boxY + 32);

      ctx.fillStyle = "#dc2626";
      ctx.font = "bold 34px 'Times New Roman', Times, serif";
      ctx.letterSpacing = "1px";
      ctx.fillText(
        `${scorePct}% — ${archetype.title.toUpperCase()}`,
        W / 2,
        boxY + 74
      );

      // Offense Trait
      ctx.fillStyle = "#475569";
      ctx.font = "italic 16px 'Times New Roman', serif";
      ctx.fillText(
        `Documented Behavioral Pattern: “${archetype.desc}”`,
        W / 2,
        665
      );

      // 8. Bottom Meta / Serial No.
      ctx.textAlign = "left";
      ctx.font = "12px 'Space Grotesk', monospace";
      ctx.fillStyle = "#64748b";
      ctx.fillText(`Decree ID: ${certId}`, 100, 715);
      ctx.fillText(`Date of Proclamation: ${today}`, 100, 735);
      ctx.fillText(`Nominated By: ${senderName.trim() || "Concerned Friend"}`, 100, 755);

      // 9. Authentic Embossed Golden Seal in Center
      ctx.save();
      ctx.translate(W / 2, 795);
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
      ctx.font = "bold 8px 'Space Grotesk', sans-serif";
      ctx.fillText("OFFICIAL DECREE", 0, -20);
      ctx.font = "bold 12px 'Times New Roman', serif";
      ctx.fillText("★ GUILTY ★", 0, -2);
      ctx.font = "bold 8px 'Space Grotesk', sans-serif";
      ctx.fillText("PROCLAIMED", 0, 15);
      ctx.fillText("2026", 0, 26);
      ctx.restore();

      // 10. Signatures: Sender on Left, Evaluator on Right
      // Left Signature (Sender)
      const validSender = senderName.trim() || "Concerned Friend";
      ctx.textAlign = "center";
      ctx.fillStyle = "#0f172a";
      ctx.font = "italic bold 24px 'Brush Script MT', cursive, serif";
      ctx.fillText(validSender, 310, 835);

      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(190, 850);
      ctx.lineTo(430, 850);
      ctx.stroke();

      ctx.font = "bold 13px 'Times New Roman', serif";
      ctx.fillStyle = "#0f172a";
      ctx.fillText(validSender, 310, 870);
      ctx.font = "12px 'Times New Roman', serif";
      ctx.fillStyle = "#64748b";
      ctx.fillText("Primary Eyewitness & Nominating Friend", 310, 888);

      // Right Signature
      ctx.fillStyle = "#0f172a";
      ctx.font = "italic bold 24px 'Brush Script MT', cursive, serif";
      ctx.fillText("Dr. Reality Check", W - 310, 835);

      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(W - 430, 850);
      ctx.lineTo(W - 190, 850);
      ctx.stroke();

      ctx.font = "bold 13px 'Times New Roman', serif";
      ctx.fillStyle = "#0f172a";
      ctx.fillText("Dr. Reality Check", W - 310, 870);
      ctx.font = "12px 'Times New Roman', serif";
      ctx.fillStyle = "#64748b";
      ctx.fillText("Chief Evaluation Lead, CHC", W - 310, 888);

      // Bottom legal disclaimer (100% parody protection)
      ctx.textAlign = "center";
      ctx.fillStyle = "#94a3b8";
      ctx.font = "11px 'Times New Roman', serif";
      ctx.fillText(
        "100% Satirical Parody Decree • Generated via Chumtiya Detector (chumtiyadetector.com) • For humor and roasting purposes only.",
        W / 2,
        925
      );

      // Trigger download
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `Official-Decree-${friendName}-${scorePct}pct.png`;
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
          <Scroll className="h-6 w-6 text-accent" />
          <h2 className="text-xl font-bold tracking-tight uppercase">
            Official Decree of Chumtiyapa
          </h2>
        </div>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
          An official formal public announcement certificate issued by YOU to roast <strong className="text-foreground">{friendName}</strong>.
        </p>

        <div className="mt-4">
          <label className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
            Your Name (To sign as the Official Eyewitness)
          </label>
          <input
            type="text"
            value={senderName}
            maxLength={40}
            onChange={(e) => setSenderName(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-base font-bold text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            placeholder="e.g. Anurag Kumar"
          />
        </div>

        {/* Certificate Preview Card */}
        <div
          ref={cardRef}
          className="mt-5 rounded-xl border-4 border-[#0f172a] bg-[#fcfbf7] p-6 text-center text-[#0f172a] shadow-inner relative overflow-hidden select-none"
        >
          <div className="absolute inset-2 border-2 border-[#c59b27] pointer-events-none rounded-sm" />

          <p className="font-serif text-[10px] font-bold tracking-[0.2em] text-[#64748b] uppercase">
            Chumtiya Hackathon Contest
          </p>
          <p className="text-[8px] italic text-[#94a3b8]">
            Special Peer-Nominated Citizen Award • Friendship Tribunal
          </p>

          <h3 className="mt-3 font-serif text-lg font-bold tracking-wider text-[#0f172a] sm:text-2xl">
            OFFICIAL DECREE OF CHUMTIYAPA
          </h3>
          <p className="font-mono text-[9px] font-bold tracking-widest text-[#b45309] uppercase">
            Public Announcement & Citation of Merit
          </p>

          <p className="mt-2 text-[10px] tracking-widest text-[#64748b] uppercase">
            Formally conferred upon
          </p>

          <p className="mt-1 font-serif text-2xl font-bold text-[#0f172a] uppercase sm:text-3xl">
            {friendName.trim() || "Dear Friend"}
          </p>
          <div className="mx-auto my-2 h-0.5 w-48 bg-[#c59b27]" />

          <p className="text-[11px] text-[#334155] sm:text-xs">
            having been thoroughly observed and verified by eyewitness testimony across 7 critical decisions:
          </p>

          <div className="mx-auto my-3 max-w-md rounded-lg border border-[#c59b27] bg-white p-2.5 shadow-sm">
            <span className="font-mono text-[9px] font-bold tracking-widest text-[#64748b] uppercase">
              Official Chumtiya Quotient
            </span>
            <p className="font-serif text-xl font-black text-[#dc2626] sm:text-2xl">
              {scorePct}% — {archetype.title.toUpperCase()}
            </p>
          </div>

          <p className="text-[10px] text-[#64748b] italic">
            Behavioral Pattern: “{archetype.desc}”
          </p>

          <div className="mt-5 flex items-center justify-between border-t border-[#cbd5e1] pt-3 text-[9px] text-[#64748b]">
            <div className="text-left">
              <span className="font-bold block text-[#0f172a]">{senderName || "Concerned Friend"}</span>
              Primary Eyewitness
            </div>
            <div className="rounded-full border border-[#c59b27] bg-[#fef9c3] px-2 py-0.5 text-[8px] font-bold text-[#b45309]">
              ★ OFFICIAL DECREE ★
            </div>
            <div className="text-right">
              <span className="font-bold block text-[#0f172a]">Dr. Reality Check</span>
              Evaluation Lead, CHC
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
            {downloading ? "Generating Decree..." : "Download Official Decree (PNG)"}
          </button>
        </div>
      </div>
    </div>
  );
}
