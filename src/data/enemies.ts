import type { EnemyState, FactionId } from '../types/game'

// 根据玩家阵营，返回对应的敌国初始状态
export function getEnemyForFaction(playerFaction: FactionId): EnemyState {
  switch (playerFaction) {
    case 'qin':
      return { id: 'zhao', name: '赵', military: 65, diplomacy: 50, vitality: 60 }
    case 'zhao':
      return { id: 'qin', name: '秦', military: 70, diplomacy: 30, vitality: 65 }
    case 'qi':
      return { id: 'qin', name: '秦', military: 75, diplomacy: 40, vitality: 70 }
  }
}
