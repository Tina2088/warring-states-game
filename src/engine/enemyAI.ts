import type { EnemyState } from '../types/game'
import { applyEnemyEffects } from './applyEnemyEffects'

// 敌国每回合自增（玩家出完卡后调用）
export function advanceEnemyTurn(enemy: EnemyState): EnemyState {
  const militaryDelta = 2 + Math.floor(Math.random() * 3)   // +2 to +4
  const diplomacyDelta = -1 + Math.floor(Math.random() * 4) // -1 to +2
  const afterCore = applyEnemyEffects(enemy, [
    { stat: 'military', delta: militaryDelta },
    { stat: 'diplomacy', delta: diplomacyDelta },
  ])

  // vitality = 60% 当前值 + 40% (军力*0.4 + 外交*0.3 + 随机0-30)
  const target = afterCore.military * 0.4 + afterCore.diplomacy * 0.3 + Math.random() * 30
  const newVitality = Math.round(afterCore.vitality * 0.6 + target * 0.4)
  return applyEnemyEffects(afterCore, [
    { stat: 'vitality', delta: newVitality - afterCore.vitality },
  ])
}
