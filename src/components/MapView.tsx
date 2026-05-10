import { useGameStore } from '../store/gameStore'
import { MAP_NODES } from '../data/mapNodes'
import { Panel } from './ui/Panel'
import { SectionTitle } from './ui/SectionTitle'
import { ASSETS } from '../data/assets'

export function MapView() {
  const country = useGameStore(s => s.country)
  const eventChainIndex = useGameStore(s => s.eventChainIndex)
  const factionNodes = MAP_NODES.filter(n => n.faction === country.id).sort((a, b) => a.stageIndex - b.stageIndex)

  return (
    <Panel className="h-full">
      <SectionTitle>山河图 · {country.name}</SectionTitle>
      <div className="flex flex-col items-center gap-1 py-4">
        {factionNodes.map((node, i) => {
          const status: 'completed' | 'current' | 'upcoming' =
            node.stageIndex < eventChainIndex ? 'completed' :
            node.stageIndex === eventChainIndex ? 'current' : 'upcoming'
          const classes = {
            completed: 'border-accent-bronze opacity-80',
            current: 'border-accent-gold shadow-[0_0_16px_rgba(201,168,76,0.5)] scale-110',
            upcoming: 'border-border-main opacity-40',
          }[status]
          return (
            <div key={node.id} className="flex flex-col items-center">
              <div className={`w-16 h-16 rounded-full bg-bg-card border-2 flex items-center justify-center transition-all duration-300 ${classes}`}
                   title={node.description}>
                <img src={ASSETS.mapNodes[node.nodeType]} className="w-8 h-8" alt={node.nodeType} />
              </div>
              <div className={`text-xs mt-1 ${status === 'current' ? 'text-accent-gold font-bold' : 'text-text-muted'}`}>
                {node.name}
              </div>
              {i < factionNodes.length - 1 && (
                <div className="w-0.5 h-6 bg-border-main border-dashed my-1" />
              )}
            </div>
          )
        })}
      </div>
    </Panel>
  )
}
