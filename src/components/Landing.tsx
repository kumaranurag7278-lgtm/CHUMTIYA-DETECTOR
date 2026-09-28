import { playClick } from "@/lib/sound";
import { UserCheck, Sparkles, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

type Props = {
  onStart: () => void;
  onDiagnoseFriend: () => void;
  leaving: boolean;
};

const EXTRA_DETECTORS = [
  {
    id: "red-flag",
    title: "Red Flag Detector",
    emoji: "🚩",
    badge: "10 Questions",
    desc: "Is your crush a walking red carpet, or just slightly sus?",
    borderHover: "hover:border-red-500/60",
    badgeBg: "border-red-500/30 bg-red-500/10 text-red-400",
    accent: "text-red-400",
  },
  {
    id: "toxic-friend",
    title: "Toxic Friend Detector",
    emoji: "🐍",
    badge: "10 Questions",
    desc: "Dost hai ya aasteen ka saanp? Find out before it's too late.",
    borderHover: "hover:border-emerald-500/60",
    badgeBg: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    accent: "text-emerald-400",
  },
  {
    id: "delulu",
    title: "Delulu Detector",
    emoji: "🦄",
    badge: "10 Questions",
    desc: "Story view ko pyaar samajhne ki bimari kitni deep ho chuki hai?",
    borderHover: "hover:border-pink-500/60",
    badgeBg: "border-pink-500/30 bg-pink-500/10 text-pink-400",
    accent: "text-pink-400",
  },
];

export function Landing({ onStart, onDiagnoseFriend, leaving }: Props) {
  return (
    <section
      className={`flex min-h-[100svh] flex-col items-center justify-center px-4 py-12 text-center sm:px-6 ${
        leaving ? "stage-exit" : "stage-enter"
      }`}
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/60 px-3.5 py-1 font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase sm:text-xs">
        <Sparkles className="h-3 w-3 text-accent animate-pulse" />
        <span>Diagnostic Suite v2.0</span>
      </div>

      <h1 className="mt-5 text-[clamp(2.5rem,12vw,8.5rem)] leading-[0.88] font-black tracking-tighter sm:mt-6">
        CHUMTIYA
        <br />
        <span className="text-accent">DETECTOR</span>
      </h1>

      <p className="mt-5 max-w-md text-balance text-base text-muted-foreground sm:mt-7 sm:text-xl">
        Let&apos;s find out what&apos;s actually wrong with you (or your friends).
      </p>

      {/* Primary Actions */}
      <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center">
        <button
          onClick={() => {
            playClick();
            onStart();
          }}
          className="min-h-[3.25rem] w-full max-w-xs rounded-full bg-accent px-8 py-4 text-sm font-bold tracking-[0.2em] text-accent-foreground uppercase transition-transform duration-200 hover:scale-[1.04] active:scale-[0.98] sm:w-auto sm:px-10 shadow-lg"
        >
          Detect Chumtiya (16Q)
        </button>

        <button
          onClick={() => {
            playClick();
            onDiagnoseFriend();
          }}
          className="inline-flex min-h-[3.25rem] w-full max-w-xs items-center justify-center gap-2 rounded-full border border-border bg-card/80 px-7 py-4 text-xs font-bold tracking-[0.15em] uppercase transition-all duration-200 hover:border-accent hover:text-accent hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
        >
          <UserCheck className="h-4 w-4 text-accent" />
          Diagnose a Friend (7Q)
        </button>
      </div>

      {/* DETECTOR ARCADE SUITE */}
      <div className="mt-14 w-full max-w-4xl border-t border-border/60 pt-10 sm:mt-16 sm:pt-12">
        <div className="flex flex-col items-center justify-center gap-1.5">
          <span className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase sm:text-xs">
            ● The Detector Arcade
          </span>
          <h2 className="text-xl font-black uppercase tracking-tight text-foreground sm:text-2xl">
            Choose Your Roast Diagnosis
          </h2>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Take specialized tests with custom scoring, roasts & official report cards.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
          {EXTRA_DETECTORS.map((item) => (
            <Link
              key={item.id}
              to="/test/$testId"
              params={{ testId: item.id }}
              onClick={() => playClick()}
              className={`group relative flex flex-col justify-between rounded-3xl border border-border/80 bg-card/60 p-6 backdrop-blur-md transition-all duration-200 hover:scale-[1.03] hover:bg-card/90 active:scale-[0.98] ${item.borderHover}`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl sm:text-4xl">{item.emoji}</span>
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${item.badgeBg}`}
                  >
                    {item.badge}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-black uppercase tracking-tight text-foreground group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-[13px]">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4 text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground">
                <span>Start Test</span>
                <ChevronRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <p className="mt-12 max-w-xs text-balance font-mono text-[10px] leading-relaxed text-muted-foreground/60 uppercase sm:mt-14 sm:text-[11px]">
        Not real psychological tests. Purely for laughs & roast purposes only.
      </p>
    </section>
  );
}
