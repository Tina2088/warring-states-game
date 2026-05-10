import type { EnemyState, EnemyEffect } from '../types/game'

function clamp(val: number): number {
  return Math.max(0, Math.min(100, val))
}

export function applyEnemyEffects(state: EnemyState, effects: EnemyEffect[]): EnemyState {
  const next = { ...state }
  for (const e of effects) {
    const current = next[e.stat] as number
    next[e.stat] = clamp(current + e.delta)
  }
  return next
}
