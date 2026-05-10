import type { ReactNode } from 'react'

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-serif text-accent-gold text-lg tracking-widest border-b border-border-main pb-1 mb-3">
      {children}
    </h3>
  )
}
