type Props = {
  current: number; // 1-based
  total: number;
};

const pad = (n: number) => String(n).padStart(2, "0");

export function ProgressBar({ current, total }: Props) {
  return (
    <div className="w-full">
      <div className="mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3 font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase sm:flex sm:justify-between sm:text-xs sm:tracking-[0.3em]">
        <span className="truncate">
          {pad(current)} / {pad(total)}
        </span>
        <span className="hidden sm:inline">Chumtiya Detector</span>
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
