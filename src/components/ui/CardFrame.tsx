import type { ReactNode } from 'react'
import type { CardRarity } from '../../types/game'

interface Props { children: ReactNode; rarity?: CardRarity; playable?: boolean; onClick?: () => void }
export function CardFrame({ children, rarity = 'common', playable = true, onClick }: Props) {
  const rarityBorder = {
    common: 'border-border-main',
    rare: 'border-accent-bronze',
    legendary: 'border-accent-gold shadow-[0_0_16px_rgba(201,168,76,0.3)]',
  }[rarity]
  const state = playable
    ? 'cursor-pointer hover:-translate-y-2 hover:shadow-[0_12px_32px_rgba(0,0,0,0.6)]'
    : 'opacity-50 cursor-not-allowed'
  return (
    <div onClick={playable ? onClick : undefined}
         className={`bg-bg-card border-2 ${rarityBorder} rounded p-3 transition-all duration-200 ${state}`}>
      {children}
    </div>
  )
}
