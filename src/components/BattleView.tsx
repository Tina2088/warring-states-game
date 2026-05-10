import { useGameStore } from '../store/gameStore'
import { Panel } from './ui/Panel'
import { GameButton } from './ui/GameButton'
import { SectionTitle } from './ui/SectionTitle'

export function BattleView() {
  const node = useGameStore(s => s.currentChainNode)
  const country = useGameStore(s => s.country)
  const makeEventChoice = useGameStore(s => s.makeEventChoice)
  if (!node || node.nodeType !== 'campaign') return null

  return (
    <div className="fixed inset-0 z-50 bg-bg-main flex items-center justify-center p-6"
         style={{ backgroundImage: 'url(/assets/backgrounds/battle-bg.png)', backgroundSize: 'cover' }}>
      <div className="bg-bg-main/80 absolute inset-0" />
      <div className="relative z-10 w-full max-w-4xl flex flex-col gap-6">
        <div className="text-center">
          <h2 className="font-serif text-4xl text-accent-gold tracking-widest mb-2">{node.title}</h2>
          <div className="text-text-muted">{country.name}国 · 长卷战报</div>
        </div>
        <Panel className="min-h-[200px]">
          <SectionTitle>战报</SectionTitle>
          <p className="text-text-main leading-loose font-serif text-lg whitespace-pre-line">{node.narrative}</p>
        </Panel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {node.choices.map((c, i) => (
            <GameButton key={i} onClick={() => makeEventChoice(i)}>{c.text}</GameButton>
          ))}
        </div>
      </div>
    </div>
  )
}
