import { CardFrame } from './ui/CardFrame'
import { Tag } from './ui/Tag'
import type { Card as CardType, CountryStats } from '../types/game'
import { statLabel } from '../data/statLabels'

interface Props { card: CardType; country: CountryStats; onClick: () => void }
export function Card({ card, country, onClick }: Props) {
  const unmet = Object.entries(card.cost).find(([stat, req]) => {
    const cur = country[stat as keyof CountryStats]
    return typeof cur === 'number' && cur < (req as number)
  })
  const playable = !unmet
  const reason = unmet ? `${statLabel(unmet[0])} 不足` : ''

  return (
    <CardFrame rarity={card.rarity} playable={playable} onClick={onClick}>
      <div className="w-40 min-h-56 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-serif text-accent-gold text-base">{card.title}</span>
          <Tag color={card.rarity === 'legendary' ? 'gold' : card.rarity === 'rare' ? 'bronze' : 'bronze'}>{card.type}</Tag>
        </div>
        <div className="text-xs text-text-muted">
          {Object.entries(card.cost).map(([s, v]) => (
            <div key={s}>消耗 {statLabel(s)}: {v as number}</div>
          ))}
        </div>
        <div className="text-xs text-accent-green">
          {card.effects.map((e, i) => (
            <div key={i}>{statLabel(e.stat)} {e.delta > 0 ? '+' : ''}{e.delta}</div>
          ))}
        </div>
        <div className="text-xs text-accent-red">
          {card.sideEffects.map((e, i) => (
            <div key={i}>{statLabel(e.stat)} {e.delta > 0 ? '+' : ''}{e.delta}</div>
          ))}
        </div>
        {card.description && <div className="text-xs text-text-main italic border-t border-border-main pt-1 mt-auto">{card.description}</div>}
        {!playable && <div className="text-xs text-accent-red mt-1">{reason}</div>}
      </div>
    </CardFrame>
  )
}
