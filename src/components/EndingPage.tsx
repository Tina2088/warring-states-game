import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { ENDINGS } from '../data/endings'
import { Panel } from './ui/Panel'
import { GameButton } from './ui/GameButton'
import { SectionTitle } from './ui/SectionTitle'
import { statLabel } from '../data/statLabels'
import { reasonForEnding } from '../engine/endingReasoner'
import { EndingReasonPanel } from './EndingReasonPanel'
import { useMetaStore } from '../store/metaStore'
import { TAISHIGONG_EPILOGUES } from '../data/metaContent'

export function EndingPage() {
  const navigate = useNavigate()
  const endingId = useGameStore(s => s.endingId)
  const country = useGameStore(s => s.country)
  const advisors = useGameStore(s => s.advisors)
  const log = useGameStore(s => s.log)
  const resetSave = useGameStore(s => s.resetSave)

  const enemy = useGameStore(s => s.enemy)
  const flags = useGameStore(s => s.flags)
  const meta = useMetaStore(s => s.meta)

  const ending = ENDINGS.find(e => e.id === endingId)
  const reason = ending ? reasonForEnding(ending, country, enemy, flags) : null
  if (!ending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-text-muted">结局未定，请返回主页</div>
      </div>
    )
  }

  const keyLogs = log.filter(l => l.type === 'event' || l.type === 'advisor').slice(-6)

  return (
    <motion.div className="min-h-screen p-6 flex items-center justify-center"
      style={{ backgroundImage: 'url(/assets/backgrounds/ending-bg.png)', backgroundSize: 'cover' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <div className="absolute inset-0 bg-bg-main/80" />
      <div className="relative z-10 w-full max-w-3xl flex flex-col gap-6">
        <div className="text-center">
          <div className="text-text-muted tracking-widest mb-2">太史公战国列传</div>
          <h1 className="font-serif text-5xl text-accent-gold tracking-[0.3em] mb-3">{ending.title}</h1>
          <div className="text-text-muted">{country.name}国之终</div>
        </div>
        <motion.div
          className="w-full aspect-[3/2] overflow-hidden rounded border-2 border-accent-gold shadow-[0_0_32px_rgba(201,168,76,0.25)]"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <img
            src={`/assets/endings/${ending.id}.png`}
            alt={ending.title}
            className="w-full h-full object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          />
        </motion.div>
        <Panel>
          <p className="font-serif text-text-main text-lg leading-loose whitespace-pre-line">{ending.description}</p>
        </Panel>
        {reason && <EndingReasonPanel reason={reason} />}
        <Panel>
          <SectionTitle>国势终局</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
            {(['treasury', 'food', 'military', 'popularSupport', 'monarchPower',
               'nobleResistance', 'scholarPrestige', 'diplomaticCredit', 'terror', 'socialVitality'] as const).map(k => (
              <div key={k} className="text-text-muted">
                {statLabel(k)}: <span className="text-accent-gold">{country[k]}</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel>
          <SectionTitle>朝堂士人</SectionTitle>
          {advisors.length === 0 ? (
            <div className="text-text-muted italic">未得贤才</div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {advisors.map(a => (
                <span key={a.id} className="px-3 py-1 border border-accent-bronze text-accent-gold rounded">
                  {a.name}
                </span>
              ))}
            </div>
          )}
        </Panel>
        <Panel>
          <SectionTitle>关键抉择</SectionTitle>
          {keyLogs.length === 0 ? (
            <div className="text-text-muted italic">无关键事件</div>
          ) : (
            <div className="space-y-1 text-sm">
              {keyLogs.map((l, i) => (
                <div key={i} className="text-text-main">
                  <span className="text-text-muted mr-2">[{l.year}B.C.]</span>{l.text}
                </div>
              ))}
            </div>
          )}
        </Panel>
        {meta.showSecretEpilogue && (
          <Panel>
            <SectionTitle>太史公曰</SectionTitle>
            <p className="font-serif text-text-main leading-loose italic border-l-2 border-accent-gold pl-4">
              {TAISHIGONG_EPILOGUES[country.id]}
            </p>
          </Panel>
        )}
        <div className="flex gap-4 justify-center">
          <GameButton onClick={() => { resetSave(); navigate('/') }}>重返主页</GameButton>
        </div>
      </div>
    </motion.div>
  )
}
