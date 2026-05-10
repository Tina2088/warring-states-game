import type { Card, CountryState, CountryStats, EnemyEffect, LogEntry } from '../types/game'
import { applyEffects } from './applyEffects'
import { statLabel } from '../data/statLabels'

interface CardResult {
  success: boolean
  reason?: string
  newState: CountryState
  enemyEffects: EnemyEffect[]
  logEntry: Omit<LogEntry, 'turn' | 'year'>
}

export function resolveCard(card: Card, state: CountryState): CardResult {
  for (const [stat, required] of Object.entries(card.cost)) {
    const current = state[stat as keyof CountryState]
    if (typeof current === 'number' && current < (required as number)) {
      return {
        success: false,
        reason: `${statLabel(stat)} 不足（需要 ${required}，当前 ${current}）`,
        newState: state,
        enemyEffects: [],
        logEntry: { text: `【国策】${card.title} 执行失败`, type: 'card' },
      }
    }
  }
  const costEffects = Object.entries(card.cost).map(([stat, delta]) => ({
    stat: stat as keyof CountryStats,
    delta: -(delta as number),
  }))
  const afterCost = applyEffects(state, costEffects)
  const afterEffects = applyEffects(afterCost, card.effects)
  const afterSide = applyEffects(afterEffects, card.sideEffects)
  return {
    success: true,
    newState: afterSide,
    enemyEffects: card.enemyEffects ?? [],
    logEntry: { text: `【国策】执行《${card.title}》`, type: 'card' },
  }
}
