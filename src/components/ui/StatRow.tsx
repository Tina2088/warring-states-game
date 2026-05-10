interface Props { label: string; value: number; max?: number; colorClass?: string }
export function StatRow({ label, value, max = 100, colorClass = 'bg-accent-gold' }: Props) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className="flex items-center gap-2 text-sm py-1">
      <span className="w-20 text-text-muted shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-bg-main rounded overflow-hidden">
        <div className={`h-full ${colorClass} transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
      <span className="w-10 text-right text-text-main">{value}</span>
    </div>
  )
}
