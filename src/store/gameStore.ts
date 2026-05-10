import { create } from 'zustand'
import type { GameState, GameActions, Advisor, Card, FactionId } from '../types/game'
import { COUNTRY_MAP } from '../data/countries'
import { ADVISORS } from '../data/advisors'
import { CARDS } from '../data/cards'
import { resolveCard } from '../engine/cardResolver'
import { getEventNode } from '../engine/eventResolver'
import { applyEffects } from '../engine/applyEffects'
import { applyEnemyEffects } from '../engine/applyEnemyEffects'
import { advanceEnemyTurn } from '../engine/enemyAI'
import { resolveEnding } from '../engine/endingResolver'
import { shuffle, randomFrom } from '../engine/utils'
import { getEnemyForFaction } from '../data/enemies'
import { loadMeta, saveMeta, applyEndingToMeta } from '../engine/metaProgress'

const SAVE_VERSION = 2
const SAVE_KEY = 'cewenshanhe_save_v2'

function initialForFaction(factionId: FactionId): Omit<GameState, keyof GameActions> {
  const country = { ...COUNTRY_MAP[factionId] }
  const meta = loadMeta()
  const initialDeck = shuffle(
    CARDS.filter(c =>
      (c.unlockedByDefault !== false || meta.unlockedCards.includes(c.id)) &&
      (!c.faction || c.faction === factionId)
    )
  )
  return {
    saveVersion: SAVE_VERSION,
    phase: 'game',
    country,
    enemy: getEnemyForFaction(factionId),
    year: 262,
    turn: 1,
    advisors: [],
    hand: [],
    deck: initialDeck,
    log: [],
    flags: {},
    eventChainIndex: 0,
    currentChainNode: getEventNode(factionId, 0),
    endingId: null,
    pendingAdvisor: null,
    showMap: false,
  }
}

// 每回合保底抽到的"资源卡"白名单（粮草 + 国库）
// 保证每回合手牌 4 张里至少有 1 张粮草或国库卡
const RESOURCE_CARDS = new Set([
  'encourage-farming', // 劝课农桑：粮 +20
  'farm-war',          // 耕战令：粮 +15, 军 +10
  'open-granary',      // 开仓赈粮：消耗粮 30 → 民心 +20
  'promote-trade',     // 鼓励商贸：国库 +15
  'levy-tax',          // 加征赋税：国库 +25
])

const HAND_SIZE = 4

// 每回合从完整卡池（扣除已打出的卡后）重抽
// deck 参数保留作为存档兼容字段，但实际不消耗
function drawHand(
  _deck: Card[],
  advisors: Advisor[],
  faction: FactionId,
): { hand: Card[]; deck: Card[] } {
  const meta = loadMeta()
  const unlockedIds = new Set(advisors.flatMap(a => a.unlocksCards))

  // 完整卡池（不依赖 deck 状态）：满足解锁条件 + 国家匹配
  const pool = CARDS.filter(c => {
    // 国家过滤
    if (c.faction && c.faction !== faction) return false
    // 解锁过滤：默认解锁的卡 / 元进程解锁的卡 / 士人解锁的卡
    const unlocked = c.unlockedByDefault !== false
      || meta.unlockedCards.includes(c.id)
      || unlockedIds.has(c.id)
    return unlocked
  })

  // 保底：至少 1 张资源卡
  const resourceCards = pool.filter(c => RESOURCE_CARDS.has(c.id))

  if (resourceCards.length > 0) {
    const guaranteed = shuffle(resourceCards)[0]
    const remainingPool = pool.filter(c => c.id !== guaranteed.id)
    const rest = shuffle(remainingPool).slice(0, HAND_SIZE - 1)
    const hand = shuffle([guaranteed, ...rest])
    return { hand, deck: [] }
  }

  // 资源卡白名单全不在可用池（极端情况）：纯随机
  const shuffled = shuffle(pool)
  return { hand: shuffled.slice(0, HAND_SIZE), deck: [] }
}

function saveToStorage(state: Partial<GameState>) {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)) } catch { /* ignore */ }
}

function loadFromStorage(): Omit<GameState, keyof GameActions> | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed.saveVersion !== SAVE_VERSION) return null
    return parsed
  } catch { return null }
}

export const useGameStore = create<GameState & GameActions>((set, get) => ({
  ...initialForFaction('qin'),
  phase: 'start',

  newGame: (factionId: FactionId) => {
    const initial = initialForFaction(factionId)
    const { hand, deck } = drawHand(initial.deck, [], factionId)
    const state = { ...initial, hand, deck }
    saveToStorage(state)
    set(state)
  },

  continueGame: () => {
    const saved = loadFromStorage()
    if (saved) set(saved)
    else get().newGame('qin')
  },

  resetSave: () => {
    localStorage.removeItem(SAVE_KEY)
    set({ ...initialForFaction('qin'), phase: 'start' })
  },

  playCard: (cardId: string) => {
    const { country, enemy, hand, deck, advisors, turn, year, log, flags, eventChainIndex } = get()
    const card = hand.find(c => c.id === cardId)
    if (!card) return
    const result = resolveCard(card, country)
    if (!result.success) return

    let newState = result.newState
    for (const a of advisors) newState = applyEffects(newState, a.passiveEffect)

    // 应用卡牌对敌效果
    let newEnemy = applyEnemyEffects(enemy, result.enemyEffects)
    // 敌国每回合自增
    newEnemy = advanceEnemyTurn(newEnemy)

    const nextIndex = eventChainIndex + 1
    const nextNode = getEventNode(country.id, nextIndex)

    const meta = loadMeta()
    const unrecruited = ADVISORS.filter(a => !advisors.find(r => r.id === a.id))
      .filter(a => a.unlockedByDefault !== false || meta.unlockedAdvisors.includes(a.id))
      .filter(a => !a.faction || a.faction === country.id)
    const pendingAdvisor = Math.random() < 0.2 && unrecruited.length > 0 ? randomFrom(unrecruited) : null

    // 每回合完整重抽，保证资源卡保底机制在每个回合都生效
    const { hand: finalHand, deck: newDeck } = drawHand(deck, advisors, country.id)

    const newLog = [...log, { ...result.logEntry, turn, year }]

    // 压力事件
    let pressuredState = newState
    if (pressuredState.military < newEnemy.military - 30) {
      pressuredState = applyEffects(pressuredState, [
        { stat: 'military', delta: -5 }, { stat: 'food', delta: -5 },
      ])
      newLog.push({ text: `【边境告急】敌军压境，我军节节败退`, type: 'threshold', turn, year })
    }
    if (newEnemy.vitality >= 90) {
      pressuredState = applyEffects(pressuredState, [{ stat: 'popularSupport', delta: -10 }])
      newLog.push({ text: `【敌势滔天】${newEnemy.name}国势如日中天，民心摇动`, type: 'threshold', turn, year })
    }

    const newTurn = turn + 1
    const newYear = year + 1

    // 崩坏检查
    let endingId: string | null = null
    let phase: GameState['phase'] = 'game'
    if (pressuredState.nobleResistance >= 90 ||
        (pressuredState.terror >= 85 && pressuredState.popularSupport <= 30) ||
        pressuredState.treasury <= 0 || pressuredState.food <= 0) {
      endingId = resolveEnding(pressuredState, flags, newEnemy)
      phase = 'ending'
    } else if (nextIndex >= 8) {
      endingId = resolveEnding(pressuredState, flags, newEnemy)
      phase = 'ending'
    }

    // 达成结局时更新 meta
    if (endingId && phase === 'ending') {
      const nextMeta = applyEndingToMeta(meta, endingId, country.id)
      saveMeta(nextMeta)
    }

    const next = {
      country: pressuredState, enemy: newEnemy, hand: finalHand, deck: newDeck,
      turn: newTurn, year: newYear, log: newLog, pendingAdvisor,
      eventChainIndex: nextIndex, currentChainNode: nextNode,
      endingId, phase,
    }
    saveToStorage({ ...get(), ...next })
    set(next)
  },

  makeEventChoice: (choiceIndex: number) => {
    const { currentChainNode, country, enemy, flags, log, turn, year } = get()
    if (!currentChainNode) return
    const choice = currentChainNode.choices[choiceIndex]
    if (!choice) return
    const newCountry = applyEffects(country, choice.effects)
    const newEnemy = choice.enemyEffects ? applyEnemyEffects(enemy, choice.enemyEffects) : enemy
    const newFlags = { ...flags }
    choice.setsFlags?.forEach(f => { newFlags[f] = true })
    choice.clearsFlags?.forEach(f => { newFlags[f] = false })
    const newLog = [...log, {
      text: `【${currentChainNode.title}】${choice.text}`,
      type: 'event' as const, turn, year,
    }]
    const next = { country: newCountry, enemy: newEnemy, flags: newFlags, log: newLog, currentChainNode: null }
    saveToStorage({ ...get(), ...next })
    set(next)
  },

  recruitAdvisor: (advisorId: string) => {
    const { advisors, country, log, turn, year } = get()
    const advisor = ADVISORS.find(a => a.id === advisorId)
    if (!advisor) return
    const newCountry = applyEffects(country, advisor.immediateEffect)
    const newLog = [...log, { text: `【士人】${advisor.name}投奔`, type: 'advisor' as const, turn, year }]
    const next = { advisors: [...advisors, advisor], country: newCountry, log: newLog, pendingAdvisor: null }
    saveToStorage({ ...get(), ...next })
    set(next)
  },

  dismissAdvisor: () => set({ pendingAdvisor: null }),

  toggleMap: () => set(s => ({ showMap: !s.showMap })),

  addLog: (entry) => {
    const { log, turn, year } = get()
    set({ log: [...log, { ...entry, turn, year }] })
  },
}))
