import { useGameStore } from '../store/gameStore'
import { Panel } from './ui/Panel'
import { SectionTitle } from './ui/SectionTitle'
import { Tag } from './ui/Tag'

export function AdvisorPanel() {
  const advisors = useGameStore(s => s.advisors)
  return (
    <Panel>
      <SectionTitle>朝堂 · 士人</SectionTitle>
      {advisors.length === 0 && (
        <div className="text-text-muted text-sm italic">尚无士人投奔</div>
      )}
      <div className="flex flex-col gap-2">
        {advisors.map(a => (
          <div key={a.id} className="flex gap-2 items-start border border-border-main p-2 rounded">
            <img src={`/assets/advisors/${a.id}.png`} alt={a.name} className="w-12 h-16 shrink-0" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-serif text-accent-gold">{a.name}</span>
                {a.tags.map(t => <Tag key={t}>{t}</Tag>)}
              </div>
              <div className="text-xs text-text-muted">{a.risk}</div>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  )
}
