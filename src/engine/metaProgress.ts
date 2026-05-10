import type { MetaProgress, FactionId } from '../types/game'

const META_KEY = 'cewenshanhe_meta_v1'
const META_VERSION = 1

export function getDefaultMeta(): MetaProgress {
  return {
    version: META_VERSION,
    completedRuns: 0,
    endingsUnlocked: [],
    factionsCompleted: [],
    strongVictories: [],
    unlockedAdvisors: [],
    unlockedCards: [],
    showSecretEpilogue: false,
  }
}

export function loadMeta(): MetaProgress {
  try {
    const raw = localStorage.getItem(META_KEY)
    if (!raw) return getDefaultMeta()
    const parsed = JSON.parse(raw)
    if (parsed.version !== META_VERSION) return getDefaultMeta()
    return parsed
  } catch {
    return getDefaultMeta()
  }
}

export function saveMeta(m: MetaProgress) {
  try { localStorage.setItem(META_KEY, JSON.stringify(m)) } catch { /* ignore */ }
}

const STRONG_VICTORY_ENDING: Record<FactionId, string> = {
  qin:  'qin-hegemony',
  zhao: 'zhao-heroic-defense',
  qi:   'qi-cultural-flourish',
}

const FIRST_CLEAR_ADVISOR: Record<FactionId, string> = {
  qin:  'gongsun-yan',
  zhao: 'su-qin',
  qi:   'zou-ji',
}

const STRONG_VICTORY_CARD: Record<FactionId, string> = {
  qin:  'unified-edict',
  zhao: 'coalition-oath',
  qi:   'hundred-schools',
}

// 根据当前结局更新 meta，返回新 meta（不直接写盘，由调用者决定时机）
export function applyEndingToMeta(
  meta: MetaProgress,
  endingId: string,
  faction: FactionId,
): MetaProgress {
  const next: MetaProgress = { ...meta }
  next.completedRuns = meta.completedRuns + 1

  if (!next.endingsUnlocked.includes(endingId)) {
    next.endingsUnlocked = [...next.endingsUnlocked, endingId]
  }

  if (!next.factionsCompleted.includes(faction)) {
    next.factionsCompleted = [...next.factionsCompleted, faction]
    const advisorId = FIRST_CLEAR_ADVISOR[faction]
    if (advisorId && !next.unlockedAdvisors.includes(advisorId)) {
      next.unlockedAdvisors = [...next.unlockedAdvisors, advisorId]
    }
  }

  if (endingId === STRONG_VICTORY_ENDING[faction]) {
    if (!next.strongVictories.includes(faction)) {
      next.strongVictories = [...next.strongVictories, faction]
    }
    const cardId = STRONG_VICTORY_CARD[faction]
    if (cardId && !next.unlockedCards.includes(cardId)) {
      next.unlockedCards = [...next.unlockedCards, cardId]
    }
  }

  // 苏秦的六国合纵卡解锁：达到赵国的第一次通关
  if (faction === 'zhao' && !meta.factionsCompleted.includes('zhao')) {
    if (!next.unlockedCards.includes('six-nations-pact')) {
      next.unlockedCards = [...next.unlockedCards, 'six-nations-pact']
    }
  }
  // 邹忌的进谏之言卡解锁：达到齐国的第一次通关
  if (faction === 'qi' && !meta.factionsCompleted.includes('qi')) {
    if (!next.unlockedCards.includes('honest-advice')) {
      next.unlockedCards = [...next.unlockedCards, 'honest-advice']
    }
  }

  if (next.endingsUnlocked.length >= 12) {
    next.showSecretEpilogue = true
  }

  return next
}
