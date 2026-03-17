interface StatCardProps {
  label: string;
  value: number | string;
  sub?: string;          // optional small text below the value
  accent?: boolean;      // highlights the card with violet tint
}

export default function StatCard({
  label,
  value,
  sub,
  accent = false,
}: StatCardProps) {
  return (
    <div
      className={`rounded-xl p-4 flex flex-col gap-1 border transition-colors
        ${accent
          ? 'bg-violet-50 border-violet-100'
          : 'bg-white border-gray-100 hover:border-gray-200'
        }`}
    >
      <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
        {label}
      </span>
      <span
        className={`text-3xl font-semibold tabular-nums
          ${accent ? 'text-violet-700' : 'text-gray-800'}`}
      >
        {value}
      </span>
      {sub && (
        <span className="text-xs text-gray-400">{sub}</span>
      )}
    </div>
  );
}