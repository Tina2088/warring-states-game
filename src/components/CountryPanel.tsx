import { useGameStore } from '../store/gameStore'
import { Panel } from './ui/Panel'
import { SectionTitle } from './ui/SectionTitle'
import { StatRow } from './ui/StatRow'

const STAT_META: { key: keyof import('../types/game').CountryStats; label: string; color: string }[] = [
  { key: 'treasury', label: '国库', color: 'bg-accent-gold' },
  { key: 'food', label: '粮草', color: 'bg-accent-green' },
  { key: 'military', label: '军力', color: 'bg-accent-red' },
  { key: 'popularSupport', label: '民心', color: 'bg-accent-green' },
  { key: 'monarchPower', label: '君权', color: 'bg-accent-gold' },
  { key: 'nobleResistance', label: '贵族阻力', color: 'bg-accent-red' },
  { key: 'scholarPrestige', label: '士人声望', color: 'bg-accent-bronze' },
  { key: 'diplomaticCredit', label: '外交信用', color: 'bg-accent-bronze' },
  { key: 'terror', label: '恐怖值', color: 'bg-accent-red' },
  { key: 'socialVitality', label: '社会活力', color: 'bg-accent-green' },
]

export function CountryPanel() {
  const country = useGameStore(s => s.country)
  return (
    <Panel>
      <SectionTitle>{country.name}国 · 国势</SectionTitle>
      {STAT_META.map(m => (
        <StatRow key={m.key} label={m.label} value={country[m.key]} colorClass={m.color} />
      ))}
    </Panel>
  )
}
