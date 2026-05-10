import { useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { Panel } from './ui/Panel'
import { SectionTitle } from './ui/SectionTitle'
import { GameButton } from './ui/GameButton'

export function LogPanel() {
  const log = useGameStore(s => s.log)
  const [open, setOpen] = useState(false)
  const colorMap = {
    event: 'text-accent-gold',
    card: 'text-text-main',
    advisor: 'text-accent-bronze',
    threshold: 'text-accent-red',
  }

  if (!open) {
    return (
      <div className="fixed bottom-4 right-4 z-20">
        <GameButton variant="secondary" onClick={() => setOpen(true)}>展开战报</GameButton>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 max-h-96 z-20">
      <Panel>
        <div className="flex items-center justify-between mb-2">
          <SectionTitle>战报 · 日志</SectionTitle>
          <button className="text-text-muted hover:text-text-main" onClick={() => setOpen(false)}>×</button>
        </div>
        <div className="overflow-y-auto max-h-64 text-xs space-y-1">
          {log.slice().reverse().map((e, i) => (
            <div key={i} className={colorMap[e.type]}>
              <span className="text-text-muted mr-2">[{e.year}B.C.]</span>{e.text}
            </div>
          ))}
        </div>
      </Panel>
    </div>
  )
}
