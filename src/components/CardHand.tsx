import { useGameStore } from '../store/gameStore'
import { Card } from './Card'

export function CardHand() {
  const hand = useGameStore(s => s.hand)
  const country = useGameStore(s => s.country)
  const playCard = useGameStore(s => s.playCard)
  const currentChainNode = useGameStore(s => s.currentChainNode)
  const eventPending = !!currentChainNode

  return (
    <div className="flex gap-4 justify-center items-end flex-wrap">
      {hand.map(card => (
        <Card key={card.id} card={card} country={country}
              onClick={() => { if (!eventPending) playCard(card.id) }} />
      ))}
      {eventPending && (
        <div className="text-text-muted italic text-sm self-center">请先处理当前事件</div>
      )}
    </div>
  )
}
