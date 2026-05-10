import type { FactionId, EventChainNode } from '../types/game'
import { EVENT_CHAINS } from '../data/events'

export function getEventNode(faction: FactionId, stageIndex: number): EventChainNode | null {
  return EVENT_CHAINS.find(n => n.faction === faction && n.stageIndex === stageIndex) ?? null
}
