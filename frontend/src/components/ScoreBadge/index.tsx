interface Props {
  label: string;
  value: number;
}

export function ScoreBadge({ label, value }: Props) {
  const pct = Math.round(value * 100);
  return (
    <div className="flex-1 flex flex-col gap-1">
      <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
        {label}
      </span>
      <div className="h-1.5 bg-gray-200 rounded-sm overflow-hidden">
        <div
          className="h-full bg-indigo-500 rounded-sm transition-[width] duration-300 ease-in-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[13px] font-semibold text-gray-900">{pct}%</span>
    </div>
  );
}
