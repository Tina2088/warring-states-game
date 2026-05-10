import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { CountryPanel } from './CountryPanel'
import { AdvisorPanel } from './AdvisorPanel'
import { CardHand } from './CardHand'
import { EventModal } from './EventModal'
import { MapView } from './MapView'
import { BattleView } from './BattleView'
import { LogPanel } from './LogPanel'
import { GameButton } from './ui/GameButton'
import { EnemyPanel } from './EnemyPanel'

export function GamePage() {
  const navigate = useNavigate()
  const phase = useGameStore(s => s.phase)
  const country = useGameStore(s => s.country)
  const year = useGameStore(s => s.year)
  const turn = useGameStore(s => s.turn)
  const showMap = useGameStore(s => s.showMap)
  const toggleMap = useGameStore(s => s.toggleMap)
  const currentChainNode = useGameStore(s => s.currentChainNode)

  useEffect(() => {
    if (phase === 'ending') navigate('/ending')
  }, [phase, navigate])

  const isCampaign = currentChainNode?.nodeType === 'campaign'

  return (
    <motion.div className="min-h-screen p-4 relative"
      style={{ backgroundImage: 'url(/assets/backgrounds/game-bg.png)', backgroundSize: 'cover' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="absolute inset-0 bg-bg-main/70" />
      <div className="relative z-10 flex flex-col gap-4">
        {/* 顶部状态栏 */}
        <div className="flex items-center justify-between bg-bg-panel/80 border border-border-main rounded px-4 py-2">
          <div className="font-serif text-accent-gold text-lg">{country.name}国 · 第{turn}回合</div>
          <div className="text-text-muted">{year} B.C.</div>
          <EnemyPanel />
          <div className="flex gap-2">
            <GameButton variant="secondary" onClick={toggleMap}>{showMap ? '关闭地图' : '山河图'}</GameButton>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          {/* 左：国家面板 */}
          <div className="col-span-12 md:col-span-3"><CountryPanel /></div>
          {/* 中：主舞台 / 地图 */}
          <div className="col-span-12 md:col-span-6">
            {showMap ? <MapView /> : (
              <div className="bg-bg-panel/60 border border-border-main rounded p-6 min-h-[360px] flex items-center justify-center text-center">
                {currentChainNode ? (
                  <div className="font-serif text-accent-gold text-xl">
                    当前阶段：{currentChainNode.title}
                    <div className="text-sm text-text-muted mt-2">请在弹窗中作出抉择</div>
                  </div>
                ) : (
                  <div className="text-text-muted italic">请从手牌中选择国策</div>
                )}
              </div>
            )}
          </div>
          {/* 右：士人面板 */}
          <div className="col-span-12 md:col-span-3"><AdvisorPanel /></div>
        </div>
        {/* 底部手牌 */}
        <div className="mt-2"><CardHand /></div>
      </div>
      <LogPanel />
      {isCampaign ? <BattleView /> : <EventModal />}
    </motion.div>
  )
}
