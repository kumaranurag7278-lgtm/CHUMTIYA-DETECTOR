import { useState } from "react";
import {
  playMemeSadTrombone,
  playMemeDramaticSting,
  playMemeBoing,
  playMemeRimshot,
  isSoundEnabled,
} from "@/lib/sound";
import { Volume2 } from "lucide-react";

export function MemeSoundboard() {
  const [activeSound, setActiveSound] = useState<string | null>(null);

  const sounds = [
    { id: "fail", label: "Womp Womp", emoji: "🎺", fn: playMemeSadTrombone },
    { id: "dramatic", label: "Dun Dun Dun!", emoji: "⚡", fn: playMemeDramaticSting },
    { id: "boing", label: "Aayein?", emoji: "🤪", fn: playMemeBoing },
    { id: "rimshot", label: "Ba-Dum-Tss", emoji: "🥁", fn: playMemeRimshot },
  ];

  const triggerSound = (id: string, fn: () => void) => {
    setActiveSound(id);
    fn();
    setTimeout(() => setActiveSound(null), 800);
  };

  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-2 rounded-2xl border border-border/60 bg-card/40 p-3.5 backdrop-blur-md">
      <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
        <Volume2 className="h-3 w-3 text-accent" />
        <span>Meme Sound Bites</span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {sounds.map((s) => (
          <button
            key={s.id}
            onClick={() => triggerSound(s.id, s.fn)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-all duration-150 active:scale-90 ${
              activeSound === s.id
                ? "border-accent bg-accent text-accent-foreground scale-105 shadow-md"
                : "border-border/80 bg-background/60 text-foreground/80 hover:border-accent hover:text-accent hover:bg-background/90"
            }`}
          >
            <span>{s.emoji}</span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
