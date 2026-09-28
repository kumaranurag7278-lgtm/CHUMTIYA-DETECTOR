import { useEffect, useState } from "react";
import { isSoundEnabled, setSoundEnabled, playClick } from "@/lib/sound";
import { Volume2, VolumeX } from "lucide-react";

export function SoundToggle() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    setEnabled(isSoundEnabled());
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    setSoundEnabled(next);
    if (next) playClick();
  };

  return (
    <button
      onClick={toggle}
      title={enabled ? "Mute audio" : "Enable audio"}
      aria-label={enabled ? "Mute audio" : "Enable audio"}
      className="fixed top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/80 text-foreground/80 backdrop-blur-md transition-all duration-200 hover:border-accent hover:text-accent hover:scale-105 active:scale-95 shadow-sm"
    >
      {enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4 text-muted-foreground" />}
    </button>
  );
}
