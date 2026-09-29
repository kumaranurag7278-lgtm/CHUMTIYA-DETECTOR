import { useState } from "react";
import { Lightbulb, X, Send, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { playClick } from "@/lib/sound";

const CATEGORIES = [
  { id: "Chumtiya Detector", label: "Chumtiya Detector (Main Quiz)" },
  { id: "Red Flag Detector", label: "Red Flag Detector 🚩" },
  { id: "Toxic Friend", label: "Toxic Friend Detector 🐍" },
  { id: "Delulu Test", label: "Delulu Detector 🦄" },
  { id: "1v1 Roast Battle", label: "1v1 Roast Battle ⚔️" },
  { id: "Naya Idea", label: "Naya Category / Crazy Idea 💡" },
];

export function SuggestQuestionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState(CATEGORIES[0]!.id);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorHandle, setAuthorHandle] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleOpen = () => {
    playClick();
    setIsOpen(true);
    setSuccess(false);
    setErrorMsg("");
  };

  const handleClose = () => {
    playClick();
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!question.trim() || question.trim().length < 5) {
      setErrorMsg("Bhai sawaal kam se kam 5 characters ka hona chahiye!");
      return;
    }

    if (!authorName.trim()) {
      setErrorMsg("Credit lene ke liye apna naam ya nickname zaroor daalo!");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          question: question.trim(),
          options: options.trim(),
          authorName: authorName.trim(),
          authorHandle: authorHandle.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrorMsg(data?.error || "Submit nahi ho paya. Dobara try karo!");
        setSubmitting(false);
        return;
      }

      setSuccess(true);
      // Reset form fields
      setQuestion("");
      setOptions("");
    } catch {
      setErrorMsg("Network error. Kripya connection check karke dobara try karein.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Sleek Floating Trigger in Bottom Right */}
      <button
        onClick={handleOpen}
        title="Suggest a question or roast idea"
        className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full border border-accent/40 bg-background/85 px-3.5 py-2 text-xs font-semibold text-foreground shadow-lg backdrop-blur-md transition-all duration-200 hover:border-accent hover:bg-accent/10 hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6 sm:px-4 sm:py-2.5 sm:text-sm"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/20 text-accent">
          <Lightbulb className="h-3.5 w-3.5 animate-pulse" />
        </span>
        <span className="tracking-tight">
          <span className="hidden xs:inline">Sawaal </span>Suggest Karo
        </span>
      </button>

      {/* Pop-up Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border/80 bg-card/95 p-6 shadow-2xl backdrop-blur-xl sm:p-8 max-h-[90vh] flex flex-col">
            {/* Top Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-background/50 text-muted-foreground hover:bg-accent/10 hover:text-foreground transition-all"
            >
              <X className="h-4 w-4" />
            </button>

            {success ? (
              /* Success State */
              <div className="py-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 shadow-inner">
                  <CheckCircle2 className="h-8 w-8 animate-bounce" />
                </div>
                <h3 className="mt-4 text-2xl font-black uppercase tracking-tight text-foreground">
                  Zabardast! Sawaal Mil Gaya 🔥
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Aapka sawaal hamare Creator Inbox me chala gaya hai. Review karne ke baad isse
                  official quiz me <strong className="text-foreground">aapke naam/handle ke credit</strong> ke saath feature karenge!
                </p>

                <div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
                  <button
                    onClick={() => setSuccess(false)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-xs font-bold text-accent-foreground transition hover:opacity-90 active:scale-95"
                  >
                    <Sparkles className="h-3.5 w-3.5" /> Ek Aur Sawaal Bhejo
                  </button>
                  <button
                    onClick={handleClose}
                    className="inline-flex items-center justify-center rounded-xl border border-border bg-background/60 px-5 py-2.5 text-xs font-semibold text-foreground transition hover:bg-accent/10 active:scale-95"
                  >
                    Band Karo ✌️
                  </button>
                </div>
              </div>
            ) : (
              /* Form State */
              <div className="overflow-y-auto pr-1">
                <div className="pr-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] font-mono tracking-widest text-accent uppercase">
                    <Sparkles className="h-3 w-3" /> Community Roast Lab
                  </span>
                  <h2 className="mt-2 text-xl font-black uppercase tracking-tight text-foreground sm:text-2xl">
                    Naya Sawaal Suggest Karo
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Apne kisi namoone dost ya ajeeb situation par funny question dimaag me hai? Likho idhar, best questions ko app me feature kiya jayega with your credit!
                  </p>
                </div>

                {errorMsg && (
                  <div className="mt-4 flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  {/* Category Dropdown */}
                  <div>
                    <label className="block text-[11px] font-mono tracking-wider text-muted-foreground uppercase">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-border/80 bg-background/60 px-3.5 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id} className="bg-card text-foreground">
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Question Field */}
                  <div>
                    <label className="block text-[11px] font-mono tracking-wider text-muted-foreground uppercase">
                      Sawaal ya Situation <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      rows={3}
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder='e.g. Jab dost bolta hai "Bhai bas 2 min me pohach raha hu" jabki wo abhi bistar se utha bhi nahi...'
                      className="mt-1.5 w-full rounded-xl border border-border/80 bg-background/60 p-3 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none"
                      required
                    />
                  </div>

                  {/* Options (Optional) */}
                  <div>
                    <label className="block text-[11px] font-mono tracking-wider text-muted-foreground uppercase">
                      Funny Options / Rough Idea (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={options}
                      onChange={(e) => setOptions(e.target.value)}
                      placeholder="1. Chappal nikaal ke maaro&#10;2. Uske ghar jaake so jao&#10;3. Police ko phone lagao"
                      className="mt-1.5 w-full rounded-xl border border-border/80 bg-background/60 p-3 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none"
                    />
                  </div>

                  {/* Contributor Credit info */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] font-mono tracking-wider text-muted-foreground uppercase">
                        Aapka Naam / Nickname <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        placeholder="e.g. Aman / Chiku"
                        className="mt-1.5 w-full rounded-xl border border-border/80 bg-background/60 px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono tracking-wider text-muted-foreground uppercase">
                        Insta / X Handle (Credit ke liye)
                      </label>
                      <input
                        type="text"
                        value={authorHandle}
                        onChange={(e) => setAuthorHandle(e.target.value)}
                        placeholder="e.g. @aman_07"
                        className="mt-1.5 w-full rounded-xl border border-border/80 bg-background/60 px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3 text-xs font-bold text-accent-foreground shadow-md transition hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
                    >
                      {submitting ? (
                        <>Bhej rahe hain... ⏳</>
                      ) : (
                        <>
                          <Send className="h-3.5 w-3.5" /> Submit Sawaal 🚀
                        </>
                      )}
                    </button>
                    <p className="mt-2 text-center text-[10px] text-muted-foreground">
                      Spam ya offensive content allow nahi hai. Only funny & relatable roasting!
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
