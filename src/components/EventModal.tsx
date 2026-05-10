import { useGameStore } from '../store/gameStore'
import { Modal } from './ui/Modal'
import { GameButton } from './ui/GameButton'
import { SectionTitle } from './ui/SectionTitle'
import { Tag } from './ui/Tag'
import { statLabel } from '../data/statLabels'

const NODE_TYPE_LABELS: Record<string, string> = {
  battle: '战事',
  diplomacy: '外交',
  talent: '人才',
  crisis: '危机',
  campaign: '战役',
}

export function EventModal() {
  const currentChainNode = useGameStore(s => s.currentChainNode)
  const pendingAdvisor = useGameStore(s => s.pendingAdvisor)
  const makeEventChoice = useGameStore(s => s.makeEventChoice)
  const recruitAdvisor = useGameStore(s => s.recruitAdvisor)
  const dismissAdvisor = useGameStore(s => s.dismissAdvisor)

  if (currentChainNode) {
    return (
      <Modal open={true}>
        <SectionTitle>{currentChainNode.title}</SectionTitle>
        <div className="flex gap-2 mb-3">
          <Tag color="bronze">{NODE_TYPE_LABELS[currentChainNode.nodeType] ?? currentChainNode.nodeType}</Tag>
        </div>
        <p className="text-text-main leading-relaxed mb-4 font-serif">{currentChainNode.narrative}</p>
        <div className="flex flex-col gap-2">
          {currentChainNode.choices.map((c, i) => (
            <GameButton key={i} onClick={() => makeEventChoice(i)}>{c.text}</GameButton>
          ))}
        </div>
      </Modal>
    )
  }

  if (pendingAdvisor) {
    return (
      <Modal open={true}>
        <SectionTitle>士人投奔 · {pendingAdvisor.name}</SectionTitle>
        <div className="flex gap-4 mb-4">
          <img src={`/assets/advisors/${pendingAdvisor.id}.png`} className="w-24 h-32" alt={pendingAdvisor.name} />
          <div className="flex-1">
            <div className="flex gap-2 mb-2">
              {pendingAdvisor.tags.map(t => <Tag key={t}>{t}</Tag>)}
            </div>
            <div className="text-sm text-accent-green mb-2">
              立即效果：{pendingAdvisor.immediateEffect.map(e => `${statLabel(e.stat)}${e.delta > 0 ? '+' : ''}${e.delta}`).join('，')}
            </div>
            <div className="text-sm text-text-muted mb-2">
              长期效果：{pendingAdvisor.passiveEffect.map(e => `${statLabel(e.stat)}${e.delta > 0 ? '+' : ''}${e.delta}`).join('，') || '无'}
            </div>
            <div className="text-sm text-accent-red">风险：{pendingAdvisor.risk}</div>
          </div>
        </div>
        <div className="flex gap-3">
          <GameButton onClick={() => recruitAdvisor(pendingAdvisor.id)}>纳贤</GameButton>
          <GameButton variant="secondary" onClick={dismissAdvisor}>婉拒</GameButton>
        </div>
      </Modal>
    )
  }

  return null
}
