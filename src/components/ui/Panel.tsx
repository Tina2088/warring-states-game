import type { ReactNode } from 'react'

export function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-bg-panel border border-border-main rounded p-4 shadow-[inset_0_0_20px_rgba(0,0,0,0.4)] ${className}`}>
      {children}
    </div>
  )
}
