import type { CountryStats } from '../types/game'

export const STAT_LABELS: Record<keyof CountryStats, string> = {
  treasury: '国库',
  food: '粮草',
  military: '军力',
  popularSupport: '民心',
  monarchPower: '君权',
  nobleResistance: '贵族阻力',
  scholarPrestige: '士人声望',
  diplomaticCredit: '外交信用',
  terror: '恐怖值',
  socialVitality: '社会活力',
}

export function statLabel(key: string): string {
  return STAT_LABELS[key as keyof CountryStats] ?? key
}
