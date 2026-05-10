import type { ReactNode } from 'react'
export function Tag({ children, color = 'gold' }: { children: ReactNode; color?: 'gold' | 'red' | 'green' | 'bronze' }) {
  const map = {
    gold: 'border-accent-gold text-accent-gold',
    red: 'border-accent-red text-accent-red',
    green: 'border-accent-green text-accent-green',
    bronze: 'border-accent-bronze text-accent-bronze',
  }
  return <span className={`inline-block text-xs px-2 py-0.5 border rounded ${map[color]}`}>{children}</span>
}
