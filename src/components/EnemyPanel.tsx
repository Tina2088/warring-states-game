import { useGameStore } from '../store/gameStore'
import { ASSETS } from '../data/assets'

const ENEMY_STATS: { key: 'military' | 'diplomacy' | 'vitality'; label: string }[] = [
  { key: 'military', label: '军力' },
  { key: 'diplomacy', label: '外交' },
  { key: 'vitality', label: '国势' },
]

export function EnemyPanel() {
  const enemy = useGameStore(s => s.enemy)
  return (
    <div className="flex items-center gap-3 bg-bg-card/60 border border-border-main rounded px-3 py-2">
      <img src={ASSETS.icons[enemy.id]} alt={enemy.name} className="w-8 h-8 opacity-80" />
      <div className="flex flex-col">
        <div className="text-xs text-text-muted tracking-widest">敌国 · {enemy.name}</div>
        <div className="flex gap-3 mt-1">
          {ENEMY_STATS.map(s => {
            const val = enemy[s.key]
            const warn = val >= 80
            return (
              <div key={s.key} className="flex items-center gap-1">
                <span className={`text-xs ${warn ? 'text-accent-red' : 'text-text-muted'}`}>{s.label}</span>
                <span className={`text-sm font-serif ${warn ? 'text-accent-red font-bold' : 'text-accent-gold'}`}>{val}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
