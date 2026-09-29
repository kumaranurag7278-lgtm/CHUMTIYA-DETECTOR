import { useState } from "react";
import { X, Landmark, Heart, Sparkles, AlertCircle, CheckCircle2, UserX, Send } from "lucide-react";
import { playClick, playFanfare, playOptionSelect } from "@/lib/sound";

interface ReservationQuotaModalProps {
  currentScore: number;
  onApplyQuota: (newScore: number, quotaName: string, delta: number) => void;
  onClose: () => void;
}

type Verdict = {
  title: string;
  badge: string;
  description: string;
  delta: number;
  type: "success" | "reject" | "warning";
};

export function ReservationQuotaModal({ currentScore, onApplyQuota, onClose }: ReservationQuotaModalProps) {
  const [selected, setSelected] = useState<"general" | "women" | "unemployed" | "admin" | null>(null);
  const [loveMsg, setLoveMsg] = useState("");
  const [verdict, setVerdict] = useState<Verdict | null>(null);

  const handleSelectGeneral = () => {
    playClick();
    setSelected("general");
    const delta = 2;
    setVerdict({
      title: "APPLICATION REJECTED! ❌",
      badge: "0% Relief + 2% Penalty",
      description:
        "General category waale ho, yahan bhi koi chhoot nahi milegi! Line me sabse piche jaake khade ho jao. Ulte overthinking aur kismat ko kosne ke jurm me +2% penalty jod di gayi hai!",
      delta,
      type: "reject",
    });
  };

  const handleSelectWomen = () => {
    playClick();
    setSelected("women");
    const delta = 5;
    setVerdict({
      title: "5% WOMEN QUOTA APPROVED! ✅",
      badge: "+5% Special Women Quota",
      description:
        "Congratulations! 5% Quota approve ho gaya! Par yahan cutoff kam nahi hota... 'Mujhe kuch nahi hua, mai theek hu' bolke 3 din mood off rakhne ke jurm me +5% Extra Chumtiya jod diya gaya hai!",
      delta,
      type: "warning",
    });
  };

  const handleSelectUnemployed = () => {
    playClick();
    setSelected("unemployed");
    const delta = -5;
    setVerdict({
      title: "SYMPATHY QUOTA GRANTED! 🥺",
      badge: "-5% Relief Discount",
      description:
        "Roz 8 ghante bistar me lete-lete reels dekhne aur 'bhai bas kuch bada karenge' bolne par hume aapse poori hamdardi hai. -5% Chumtiya score discount diya jata hai!",
      delta,
      type: "success",
    });
  };

  const handleAdminRizzSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loveMsg.trim()) return;

    const clean = loveMsg.toLowerCase().trim();
    const isLove =
      clean.includes("i love you") ||
      clean.includes("i love u") ||
      clean.includes("ily") ||
      clean.includes("love you");

    if (isLove) {
      playFanfare();
      // Silently record love message to admin suggestions inbox
      fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: "Rizz Quota (Admin Love)",
          question: `💌 Message: "${loveMsg.trim()}"`,
          authorName: "Quota Claimer",
        }),
      }).catch(() => {});

      const delta = -20;
      setVerdict({
        title: "ADMIN PIGHAL GAYA! 😳💖",
        badge: "-20% RIZZ QUOTA APPROVED",
        description:
          "Arrey sharma gaya admin! Rizz quota 100% verified! Chumtiya score me seedha 20% ki bhari chhoot (-20%) di jaati hai! Tum toh dil jeet liye yaar!",
        delta,
        type: "success",
      });
    } else {
      playOptionSelect();
      setVerdict({
        title: "RIZZ FAILED! 💔",
        badge: "0% Quota Denied",
        description:
          "Bhai saaf saaf likha tha 'I love you' bolne par 20% quota milega! Ye kya bhej diya? Dil tod diya admin ka. 0% discount!",
        delta: 0,
        type: "reject",
      });
    }
  };

  const handleConfirmApply = () => {
    playClick();
    if (verdict) {
      const newScore = Math.max(0, Math.min(100, currentScore + verdict.delta));
      const quotaName =
        selected === "general"
          ? "General Quota"
          : selected === "women"
          ? "Women Quota"
          : selected === "unemployed"
          ? "Berozgar Quota"
          : "Admin Rizz Quota";
      onApplyQuota(newScore, quotaName, verdict.delta);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-amber-500/40 bg-card/95 p-6 shadow-2xl backdrop-blur-xl sm:p-8 max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-background/50 text-muted-foreground hover:bg-accent/10 hover:text-foreground transition-all"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="overflow-y-auto pr-1">
          {/* Header */}
          <div className="pr-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-[10px] font-mono tracking-widest text-amber-400 uppercase">
              <Landmark className="h-3.5 w-3.5" /> Sarkari Quota Allocation Center
            </span>
            <h3 className="mt-2 text-xl font-black uppercase tracking-tight text-foreground sm:text-2xl">
              Reservation Chaiye? Idhar Aao
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Score se khush nahi ho? Koi baat nahi, category chuno aur apna quota claim karo:
            </p>
          </div>

          {!verdict ? (
            /* Option Buttons */
            <div className="mt-6 space-y-3">
              {/* Option 1: General Category */}
              <button
                onClick={handleSelectGeneral}
                className="flex w-full items-center justify-between rounded-2xl border border-border/80 bg-background/60 p-4 text-left transition-all hover:border-accent hover:bg-accent/5 active:scale-[0.99]"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <UserX className="h-4 w-4 text-muted-foreground" />
                    <span className="font-bold text-sm text-foreground">General Category</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    "Hamare saath hamesha na-insaafi hoti hai" quota.
                  </p>
                </div>
                <span className="shrink-0 rounded-lg border border-border bg-card px-2.5 py-1 text-[11px] font-mono text-muted-foreground">
                  Claim Quota →
                </span>
              </button>

              {/* Option 2: Women Quota */}
              <button
                onClick={handleSelectWomen}
                className="flex w-full items-center justify-between rounded-2xl border border-pink-500/30 bg-pink-500/5 p-4 text-left transition-all hover:border-pink-500 hover:bg-pink-500/10 active:scale-[0.99]"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-pink-400" />
                    <span className="font-bold text-sm text-foreground">Women Quota (5% Special)</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    "Main theek hu" bolke mood kharab karne ka quota.
                  </p>
                </div>
                <span className="shrink-0 rounded-lg border border-pink-500/40 bg-pink-500/10 px-2.5 py-1 text-[11px] font-mono font-bold text-pink-400">
                  +5% Quota →
                </span>
              </button>

              {/* Option 3: Unemployed / Berozgar */}
              <button
                onClick={handleSelectUnemployed}
                className="flex w-full items-center justify-between rounded-2xl border border-blue-500/30 bg-blue-500/5 p-4 text-left transition-all hover:border-blue-500 hover:bg-blue-500/10 active:scale-[0.99]"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-blue-400" />
                    <span className="font-bold text-sm text-foreground">Berozgar / Unemployed Quota</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Sympathy Quota for 24/7 reels scrollers.
                  </p>
                </div>
                <span className="shrink-0 rounded-lg border border-blue-500/40 bg-blue-500/10 px-2.5 py-1 text-[11px] font-mono font-bold text-blue-400">
                  -5% Sympathy →
                </span>
              </button>

              {/* Option 4: Admin Love / Rizz Quota */}
              <div className="rounded-2xl border border-amber-500/50 bg-amber-500/10 p-4">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-rose-500 animate-pulse" />
                  <span className="font-bold text-sm text-foreground">
                    Admin ko "I love you" bolo (Flat 20% Quota 🔥)
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Admin pighal gaya toh score me seedha 20% ki bhari chhoot milegi!
                </p>

                <form onSubmit={handleAdminRizzSubmit} className="mt-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={loveMsg}
                      onChange={(e) => {
                        setSelected("admin");
                        setLoveMsg(e.target.value);
                      }}
                      placeholder='Send a message... (e.g. "I love you admin")'
                      className="flex-1 rounded-xl border border-border/80 bg-background/80 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-amber-400 focus:outline-none"
                      required
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-black shadow transition hover:opacity-90 active:scale-95"
                    >
                      <Send className="h-3.5 w-3.5" /> Bhejo
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            /* Verdict State */
            <div className="mt-6 py-4 text-center">
              <div
                className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border shadow-inner ${
                  verdict.type === "success"
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                    : verdict.type === "warning"
                    ? "border-pink-500/40 bg-pink-500/10 text-pink-400"
                    : "border-destructive/40 bg-destructive/10 text-destructive"
                }`}
              >
                {verdict.type === "success" ? (
                  <CheckCircle2 className="h-8 w-8 animate-bounce" />
                ) : verdict.type === "warning" ? (
                  <Sparkles className="h-8 w-8 animate-pulse" />
                ) : (
                  <UserX className="h-8 w-8" />
                )}
              </div>

              <span
                className={`mt-4 inline-block rounded-full border px-3 py-0.5 font-mono text-[11px] font-bold uppercase ${
                  verdict.type === "success"
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                    : verdict.type === "warning"
                    ? "border-pink-500/30 bg-pink-500/10 text-pink-400"
                    : "border-destructive/30 bg-destructive/10 text-destructive"
                }`}
              >
                {verdict.badge}
              </span>

              <h4 className="mt-2 text-xl font-black uppercase tracking-tight text-foreground sm:text-2xl">
                {verdict.title}
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {verdict.description}
              </p>

              {/* Score impact display */}
              <div className="mt-5 rounded-xl border border-border/80 bg-background/50 p-3 text-xs font-mono">
                <span>Original Score: </span>
                <strong className="text-foreground">{currentScore}%</strong>
                <span className="mx-2">➔</span>
                <span>Adjusted Score: </span>
                <strong className="text-accent text-sm">
                  {Math.max(0, Math.min(100, currentScore + verdict.delta))}%
                </strong>
              </div>

              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
                <button
                  onClick={handleConfirmApply}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-xs font-bold text-accent-foreground transition hover:opacity-90 active:scale-95"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" /> Ye Quota Apply Karo
                </button>
                <button
                  onClick={() => setVerdict(null)}
                  className="inline-flex items-center justify-center rounded-xl border border-border bg-background/60 px-5 py-2.5 text-xs font-semibold text-foreground transition hover:bg-accent/10 active:scale-95"
                >
                  Dusra Option Dekho ↩
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
