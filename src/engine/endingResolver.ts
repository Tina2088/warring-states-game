import type { CountryState, EnemyState } from '../types/game'
import { ENDINGS } from '../data/endings'

export function resolveEnding(
  country: CountryState,
  flags: Record<string, boolean>,
  enemy: EnemyState,
): string {
  const faction = country.id

  // 崩坏优先
  if (country.nobleResistance >= 90) return `${faction}-collapse`
  if (country.terror >= 85 && country.popularSupport <= 30) return `${faction}-collapse`
  if (country.treasury <= 0 || country.food <= 0) return `${faction}-collapse`

  const candidates = ENDINGS.filter(e => {
    if (e.faction !== faction && e.faction !== 'any') return false
    if (e.priority !== 1) return false
    if (e.requiredFlags?.some(f => !flags[f])) return false
    if (e.forbiddenFlags?.some(f => flags[f])) return false
    if (e.statConditions) {
      for (const [stat, cond] of Object.entries(e.statConditions)) {
        const val = country[stat as keyof CountryState] as number
        if (cond.min !== undefined && val < cond.min) return false
        if (cond.max !== undefined && val > cond.max) return false
      }
    }
    if (e.enemyConditions) {
      for (const [stat, cond] of Object.entries(e.enemyConditions)) {
        const val = enemy[stat as 'military' | 'diplomacy' | 'vitality']
        if (cond.min !== undefined && val < cond.min) return false
        if (cond.max !== undefined && val > cond.max) return false
      }
    }
    return true
  })

  if (candidates.length > 0) return candidates[0].id

  const fallback = ENDINGS.find(e => e.faction === faction && e.priority === 2)
  return fallback?.id ?? `${faction}-collapse`
}
