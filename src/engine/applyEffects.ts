import type { CountryState, Effect } from '../types/game'
import { clamp } from './utils'

export function applyEffects(state: CountryState, effects: Effect[]): CountryState {
  const next = { ...state }
  for (const e of effects) {
    const current = next[e.stat as keyof typeof next] as number
    ;(next as Record<string, unknown>)[e.stat] = clamp(current + e.delta)
  }
  return next
}
