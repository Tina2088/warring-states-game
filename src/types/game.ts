export type FactionId = 'qin' | 'zhao' | 'qi'
export type AdvisorTag = '法家' | '兵家' | '纵横家' | '儒家'
export type CardType = '内政' | '军事' | '外交' | '变法' | '特殊'
export type CardRarity = 'common' | 'rare' | 'legendary'
export type GamePhase = 'start' | 'game' | 'ending'
export type NodeType = 'battle' | 'diplomacy' | 'talent' | 'crisis' | 'campaign'

export interface Effect {
  stat: keyof CountryStats
  delta: number
}

export interface CountryStats {
  treasury: number
  food: number
  military: number
  popularSupport: number
  monarchPower: number
  nobleResistance: number
  scholarPrestige: number
  diplomaticCredit: number
  terror: number
  socialVitality: number
}

export interface CountryState extends CountryStats {
  id: FactionId
  name: string
}

export interface EventChoice {
  text: string
  effects: Effect[]
  setsFlags?: string[]
  clearsFlags?: string[]
  enemyEffects?: EnemyEffect[]
}

export interface EventChainNode {
  id: string
  faction: FactionId
  stageIndex: number
  title: string
  narrative: string
  nodeType: NodeType
  choices: EventChoice[]
}

export interface MapNode {
  id: string
  faction: FactionId
  stageIndex: number
  name: string
  nodeType: NodeType
  description: string
}

export interface Ending {
  id: string
  faction: FactionId | 'any'
  title: string
  description: string
  requiredFlags?: string[]
  forbiddenFlags?: string[]
  statConditions?: Partial<Record<keyof CountryStats, { min?: number; max?: number }>>
  priority: number
  enemyConditions?: Partial<Record<'military' | 'diplomacy' | 'vitality', { min?: number; max?: number }>>
}

export interface Advisor {
  id: string
  name: string
  faction?: FactionId
  tags: AdvisorTag[]
  immediateEffect: Effect[]
  passiveEffect: Effect[]
  risk: string
  unlocksCards: string[]
  unlockedByDefault?: boolean
}

export interface Card {
  id: string
  title: string
  type: CardType
  cost: Partial<CountryStats>
  effects: Effect[]
  sideEffects: Effect[]
  rarity: CardRarity
  faction?: FactionId
  description?: string
  enemyEffects?: EnemyEffect[]
  unlockedByDefault?: boolean
}

export interface LogEntry {
  turn: number
  year: number
  text: string
  type: 'event' | 'card' | 'advisor' | 'threshold'
}

export interface GameState {
  saveVersion: number
  phase: GamePhase
  country: CountryState
  year: number
  turn: number
  advisors: Advisor[]
  hand: Card[]
  deck: Card[]
  log: LogEntry[]
  flags: Record<string, boolean>
  eventChainIndex: number
  currentChainNode: EventChainNode | null
  endingId: string | null
  pendingAdvisor: Advisor | null
  showMap: boolean
  enemy: EnemyState
}

export interface GameActions {
  newGame: (factionId: FactionId) => void
  continueGame: () => void
  resetSave: () => void
  playCard: (cardId: string) => void
  makeEventChoice: (choiceIndex: number) => void
  recruitAdvisor: (advisorId: string) => void
  dismissAdvisor: () => void
  toggleMap: () => void
  addLog: (entry: Omit<LogEntry, 'turn' | 'year'>) => void
}

export interface EnemyEffect {
  stat: 'military' | 'diplomacy' | 'vitality'
  delta: number
}

export interface EnemyState {
  id: FactionId
  name: string
  military: number
  diplomacy: number
  vitality: number
}

export interface MetaProgress {
  version: number
  completedRuns: number
  endingsUnlocked: string[]
  factionsCompleted: FactionId[]
  strongVictories: FactionId[]
  unlockedAdvisors: string[]
  unlockedCards: string[]
  showSecretEpilogue: boolean
}
