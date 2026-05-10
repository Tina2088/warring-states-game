import type { Ending, CountryState, EnemyState, CountryStats } from '../types/game'
import { flagLabel } from '../data/flagLabels'
import { statLabel } from '../data/statLabels'

export interface StatHighlight {
  label: string
  value: number
  condition: string
  met: boolean
}

export interface EndingReason {
  type: 'core' | 'collapse'
  keyChoices: string[]
  avoidedChoices: string[]
  statHighlights: StatHighlight[]
  enemyHighlights: StatHighlight[]
  narrative: string
  collapseReason?: string
}

function buildCollapseReason(country: CountryState): string {
  if (country.treasury <= 0) return `国库穷尽，府藏皆空 —— 国力枯竭`
  if (country.food <= 0) return `粮草耗尽，民不聊生 —— 国力枯竭`
  if (country.nobleResistance >= 90) return `贵族阻力达到 ${country.nobleResistance}，激进变法终遭反扑`
  if (country.terror >= 85 && country.popularSupport <= 30) {
    return `恐怖压迫过深（恐怖值 ${country.terror}），民心离散（民心 ${country.popularSupport}）—— 暴政无以为继`
  }
  return '国势崩坏，大厦将倾'
}

const ENEMY_STAT_LABELS: Record<'military' | 'diplomacy' | 'vitality', string> = {
  military: '敌军力',
  diplomacy: '敌外交',
  vitality: '敌国势',
}

function buildStatHighlights(country: CountryState, ending: Ending): StatHighlight[] {
  if (!ending.statConditions) return []
  const out: StatHighlight[] = []
  for (const [stat, cond] of Object.entries(ending.statConditions)) {
    const value = country[stat as keyof CountryStats] as number
    const parts: string[] = []
    if (cond.min !== undefined) parts.push(`≥ ${cond.min}`)
    if (cond.max !== undefined) parts.push(`≤ ${cond.max}`)
    const metMin = cond.min === undefined || value >= cond.min
    const metMax = cond.max === undefined || value <= cond.max
    out.push({
      label: statLabel(stat),
      value,
      condition: parts.join(' 且 '),
      met: metMin && metMax,
    })
  }
  return out
}

function buildEnemyHighlights(enemy: EnemyState, ending: Ending): StatHighlight[] {
  if (!ending.enemyConditions) return []
  const out: StatHighlight[] = []
  for (const [stat, cond] of Object.entries(ending.enemyConditions)) {
    const key = stat as 'military' | 'diplomacy' | 'vitality'
    const value = enemy[key]
    const parts: string[] = []
    if (cond.min !== undefined) parts.push(`≥ ${cond.min}`)
    if (cond.max !== undefined) parts.push(`≤ ${cond.max}`)
    const metMin = cond.min === undefined || value >= cond.min
    const metMax = cond.max === undefined || value <= cond.max
    out.push({
      label: ENEMY_STAT_LABELS[key],
      value,
      condition: parts.join(' 且 '),
      met: metMin && metMax,
    })
  }
  return out
}

export function reasonForEnding(
  ending: Ending,
  country: CountryState,
  enemy: EnemyState,
  flags: Record<string, boolean>,
): EndingReason {
  const isCollapse = ending.priority === 2 || ending.id.endsWith('-collapse')

  if (isCollapse) {
    return {
      type: 'collapse',
      keyChoices: [],
      avoidedChoices: [],
      statHighlights: [],
      enemyHighlights: [],
      narrative: `${country.name}国${ending.title}。`,
      collapseReason: buildCollapseReason(country),
    }
  }

  const keyChoices = (ending.requiredFlags ?? [])
    .filter(f => flags[f])
    .map(flagLabel)

  const avoidedChoices = (ending.forbiddenFlags ?? [])
    .filter(f => !flags[f])
    .map(flagLabel)

  const parts: string[] = []
  if (keyChoices.length > 0) parts.push(`你选择了：${keyChoices.join('、')}`)
  if (avoidedChoices.length > 0) parts.push(`并避开了：${avoidedChoices.join('、')}`)
  const narrative = (parts.length > 0 ? parts.join('；') + '；' : '') + `最终${country.name}国${ending.title}。`

  return {
    type: 'core',
    keyChoices,
    avoidedChoices,
    statHighlights: buildStatHighlights(country, ending),
    enemyHighlights: buildEnemyHighlights(enemy, ending),
    narrative,
  }
}
