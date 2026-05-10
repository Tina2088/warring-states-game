import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useMetaStore } from '../store/metaStore'
import { ADVISORS } from '../data/advisors'
import { CARDS } from '../data/cards'
import { ENDINGS } from '../data/endings'
import { Panel } from './ui/Panel'
import { SectionTitle } from './ui/SectionTitle'
import { GameButton } from './ui/GameButton'
import { Tag } from './ui/Tag'
import type { FactionId } from '../types/game'

const FACTION_NAMES: Record<FactionId, string> = { qin: '秦', zhao: '赵', qi: '齐' }

export function MetaProgressPage() {
  const navigate = useNavigate()
  const meta = useMetaStore(s => s.meta)

  const extraAdvisors = ADVISORS.filter(a => a.unlockedByDefault === false)
  const extraCards = CARDS.filter(c => c.unlockedByDefault === false)

  return (
    <motion.div className="min-h-screen p-6 md:p-10 relative"
      style={{ backgroundImage: 'url(/assets/backgrounds/start-bg.png)', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <div className="absolute inset-0 bg-bg-main/80" />
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-6">
        <div className="text-center py-4">
          <div className="text-text-muted tracking-widest mb-2">策问山河</div>
          <h1 className="font-serif text-4xl md:text-5xl text-accent-gold tracking-[0.3em]">典藏阁</h1>
        </div>

        <Panel>
          <SectionTitle>进度总览</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div className="text-text-muted">通关次数：<span className="text-accent-gold">{meta.completedRuns}</span></div>
            <div className="text-text-muted">结局收集：<span className="text-accent-gold">{meta.endingsUnlocked.length}/12</span></div>
            <div className="text-text-muted">通关国家：<span className="text-accent-gold">{meta.factionsCompleted.length}/3</span></div>
            <div className="text-text-muted">强势胜利：<span className="text-accent-gold">{meta.strongVictories.length}/3</span></div>
          </div>
          {meta.showSecretEpilogue && (
            <div className="mt-3 text-accent-gold font-serif italic">✦ 太史公之眼已开启 ✦</div>
          )}
        </Panel>

        <Panel>
          <SectionTitle>结局收集</SectionTitle>
          {(['qin', 'zhao', 'qi'] as FactionId[]).map(f => (
            <div key={f} className="mb-3">
              <div className="text-accent-gold font-serif mb-2">{FACTION_NAMES[f]}国</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {ENDINGS.filter(e => e.faction === f).map(e => {
                  const unlocked = meta.endingsUnlocked.includes(e.id)
                  return (
                    <div key={e.id} className={`border rounded p-2 ${unlocked ? 'border-accent-gold' : 'border-border-main opacity-50'}`}>
                      <div className={`text-sm ${unlocked ? 'text-accent-gold' : 'text-text-muted'}`}>
                        {unlocked ? e.title : '？？？'}
                      </div>
                      {unlocked && <div className="text-xs text-text-muted mt-1">{e.description}</div>}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </Panel>

        <Panel>
          <SectionTitle>士人收藏</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {extraAdvisors.map(a => {
              const unlocked = meta.unlockedAdvisors.includes(a.id)
              return (
                <div key={a.id} className={`border rounded p-2 ${unlocked ? 'border-accent-gold' : 'border-border-main opacity-40'}`}>
                  <div className={`font-serif ${unlocked ? 'text-accent-gold' : 'text-text-muted'}`}>
                    {unlocked ? a.name : '？？？'}
                  </div>
                  {unlocked && <div className="flex gap-1 mt-1">{a.tags.map(t => <Tag key={t}>{t}</Tag>)}</div>}
                </div>
              )
            })}
          </div>
        </Panel>

        <Panel>
          <SectionTitle>传奇卡</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {extraCards.map(c => {
              const unlocked = meta.unlockedCards.includes(c.id)
              return (
                <div key={c.id} className={`border rounded p-2 ${unlocked ? 'border-accent-gold' : 'border-border-main opacity-40'}`}>
                  <div className={`font-serif ${unlocked ? 'text-accent-gold' : 'text-text-muted'}`}>
                    {unlocked ? c.title : '？？？'}
                  </div>
                  {unlocked && c.description && <div className="text-xs text-text-muted mt-1">{c.description}</div>}
                </div>
              )
            })}
          </div>
        </Panel>

        <div className="flex justify-center py-4">
          <GameButton onClick={() => navigate('/')}>返回主页</GameButton>
        </div>
      </div>
    </motion.div>
  )
}
