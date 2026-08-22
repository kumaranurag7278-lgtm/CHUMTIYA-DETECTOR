type Props = {
  current: number; // 1-based
  total: number;
};

const pad = (n: number) => String(n).padStart(2, "0");

export function ProgressBar({ current, total }: Props) {
  return (
    <div className="w-full">
      <div className="mb-3 flex items-baseline justify-between font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">
        <span>
          {pad(current)} / {pad(total)}
        </span>
        <span className="hidden sm:inline">Chutiya Detector</span>
      </div>
      <div className="h-[3px] w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-500 ease-out"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
    </div>
  );
}
