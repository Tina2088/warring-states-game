import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { useMetaStore } from '../store/metaStore'
import { GameButton } from './ui/GameButton'
import type { FactionId } from '../types/game'

const FACTIONS: { id: FactionId; name: string; desc: string; tag: string }[] = [
  { id: 'qin', name: '秦', desc: '制度改革线', tag: '虎狼之国' },
  { id: 'zhao', name: '赵', desc: '军事与地缘压力线', tag: '胡服骑射' },
  { id: 'qi', name: '齐', desc: '富庶与士人线', tag: '稷下繁华' },
]

export function StartPage() {
  const navigate = useNavigate()
  const { newGame, continueGame, resetSave } = useGameStore()
  const resetMeta = useMetaStore(s => s.reset)
  const [selected, setSelected] = useState<FactionId | null>(null)
  const hasSave = !!localStorage.getItem('cewenshanhe_save_v2')

  function handleStart() {
    if (!selected) return
    newGame(selected)
    navigate('/game')
  }

  function handleFullReset() {
    if (!confirm('彻底重开将清除所有存档和典藏阁解锁记录，确定继续？')) return
    resetSave()
    resetMeta()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
         style={{ backgroundImage: 'url(/assets/backgrounds/start-bg.png)', backgroundSize: 'cover' }}>
      <div className="absolute inset-0 bg-bg-main opacity-50" />
      <motion.div className="relative z-10 flex flex-col items-center gap-10 px-4"
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <div className="text-center">
          <h1 className="font-serif text-6xl md:text-7xl text-accent-gold mb-3 tracking-[0.3em]">策问山河</h1>
          <p className="text-text-muted text-base md:text-lg tracking-[0.3em]">一策可兴邦 · 一问定山河</p>
        </div>
        <div className="flex flex-wrap gap-6 justify-center">
          {FACTIONS.map(f => (
            <motion.div key={f.id}
              className={`w-40 h-56 bg-bg-panel border-2 rounded cursor-pointer flex flex-col items-center justify-center gap-3 transition-all duration-300
                ${selected === f.id ? 'border-accent-gold shadow-[0_0_24px_rgba(201,168,76,0.4)]' : 'border-border-main hover:border-accent-gold'}`}
              whileHover={{ scale: 1.05, y: -4 }} onClick={() => setSelected(f.id)}>
              <span className="font-serif text-6xl text-accent-gold">{f.name}</span>
              <span className="text-text-muted text-sm">{f.desc}</span>
              <span className="text-xs text-text-muted border border-border-main px-2 py-0.5 rounded">{f.tag}</span>
            </motion.div>
          ))}
        </div>
        <div className="flex gap-4 flex-wrap justify-center">
          <GameButton onClick={handleStart} disabled={!selected}>开始游戏</GameButton>
          {hasSave && <GameButton variant="secondary" onClick={() => { continueGame(); navigate('/game') }}>继续游戏</GameButton>}
          <GameButton variant="secondary" onClick={() => navigate('/guide')}>游戏玩法</GameButton>
          <GameButton variant="secondary" onClick={() => navigate('/meta')}>典藏阁</GameButton>
          {hasSave && <GameButton variant="secondary" onClick={resetSave}>重置存档</GameButton>}
          <GameButton variant="secondary" onClick={handleFullReset}>彻底重开</GameButton>
        </div>
      </motion.div>
    </div>
  )
}
