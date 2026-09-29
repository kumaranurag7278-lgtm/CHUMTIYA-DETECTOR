import { ExternalLink } from "lucide-react";
import { recordEvent } from "@/lib/analytics";

// Default destination until you paste your CueLinks / Bumble / Tinder affiliate link here!
export const DATING_AFFILIATE_LINK = "https://bumble.com";

interface Props {
  className?: string;
}

export function DatingPitchCard({ className = "" }: Props) {
  const handleClick = () => {
    recordEvent("share_clicked", {
      channel: "dating_affiliate",
      type: "find_new_one",
    });
  };

  return (
    <div
      className={`mx-auto w-full max-w-md rounded-2xl border border-rose-500/30 bg-gradient-to-r from-rose-950/20 via-card to-background p-3.5 shadow-lg backdrop-blur-md ${className}`}
    >
      <div className="flex items-center justify-between gap-3 text-left">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-black tracking-tight text-rose-400 sm:text-sm">
            Kat gaya na? Call karu? 🥺
          </p>
          <p className="mt-0.5 text-[11px] font-medium text-muted-foreground sm:text-xs">
            Time to find a new one bruh
          </p>
        </div>

        {/* Small compact button placed to the side */}
        <a
          href={DATING_AFFILIATE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-rose-500/50 bg-rose-500/15 px-3 py-1.5 text-[11px] font-bold text-rose-300 transition-all duration-150 hover:bg-rose-500 hover:text-white active:scale-95 shadow-sm"
        >
          <span>Move On</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
