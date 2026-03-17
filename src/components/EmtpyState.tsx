interface EmptyStateProps {
  message?: string;
  sub?: string;       // optional secondary line
  icon?: 'calendar' | 'chart' | 'inbox' | 'check';
}

const icons = {
  calendar: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <path d="M16 2v4M8 2v4M3 10h18"/>
    </svg>
  ),
  chart: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M3 3v18h18"/>
      <path d="M7 16l4-4 4 4 4-6"/>
    </svg>
  ),
  inbox: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
      <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0
               002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24
               a2 2 0 00-1.79 1.11z"/>
    </svg>
  ),
  check: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
};

export default function EmptyState({
  message = 'Nothing here yet',
  sub,
  icon = 'inbox',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center
                    py-16 px-8 text-center">
      <div className="text-gray-200 mb-4">
        {icons[icon]}
      </div>
      <p className="text-gray-500 font-medium text-sm">{message}</p>
      {sub && (
        <p className="text-gray-400 text-xs mt-1 max-w-xs">{sub}</p>
      )}
    </div>
  );
}