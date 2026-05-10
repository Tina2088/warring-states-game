import type { EndingReason } from '../engine/endingReasoner'
import { Panel } from './ui/Panel'
import { SectionTitle } from './ui/SectionTitle'

export function EndingReasonPanel({ reason }: { reason: EndingReason }) {
  return (
    <Panel>
      <SectionTitle>命运之因</SectionTitle>
      <p className="text-text-main font-serif text-base leading-relaxed mb-3">{reason.narrative}</p>

      {reason.type === 'collapse' && reason.collapseReason && (
        <div className="text-accent-red text-sm border-l-2 border-accent-red pl-3 my-3">
          {reason.collapseReason}
        </div>
      )}

      {reason.keyChoices.length > 0 && (
        <div className="mb-2">
          <div className="text-xs text-text-muted mb-1">关键抉择</div>
          <div className="flex flex-wrap gap-2">
            {reason.keyChoices.map((c, i) => (
              <span key={i} className="text-xs text-accent-gold border border-accent-gold rounded px-2 py-0.5">{c}</span>
            ))}
          </div>
        </div>
      )}

      {reason.avoidedChoices.length > 0 && (
        <div className="mb-2">
          <div className="text-xs text-text-muted mb-1">有意避开</div>
          <div className="flex flex-wrap gap-2">
            {reason.avoidedChoices.map((c, i) => (
              <span key={i} className="text-xs text-text-muted border border-border-main rounded px-2 py-0.5">{c}</span>
            ))}
          </div>
        </div>
      )}

      {reason.statHighlights.length > 0 && (
        <div className="mb-2">
          <div className="text-xs text-text-muted mb-1">数值条件</div>
          <div className="space-y-1">
            {reason.statHighlights.map((h, i) => (
              <div key={i} className={`text-sm ${h.met ? 'text-accent-green' : 'text-accent-red'}`}>
                {h.met ? '✓' : '✗'} {h.label}: {h.value}（要求 {h.condition}）
              </div>
            ))}
          </div>
        </div>
      )}

      {reason.enemyHighlights.length > 0 && (
        <div>
          <div className="text-xs text-text-muted mb-1">敌国态势</div>
          <div className="space-y-1">
            {reason.enemyHighlights.map((h, i) => (
              <div key={i} className={`text-sm ${h.met ? 'text-accent-green' : 'text-accent-red'}`}>
                {h.met ? '✓' : '✗'} {h.label}: {h.value}（要求 {h.condition}）
              </div>
            ))}
          </div>
        </div>
      )}
    </Panel>
  )
}
