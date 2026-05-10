import type { ReactNode } from 'react'
interface Props { children: ReactNode; onClick?: () => void; disabled?: boolean; variant?: 'primary' | 'secondary' }
export function GameButton({ children, onClick, disabled, variant = 'primary' }: Props) {
  const base = 'px-6 py-2 border font-serif tracking-wider transition-all duration-200'
  const primary = 'bg-bg-card border-accent-gold text-accent-gold hover:bg-accent-gold hover:text-bg-main hover:shadow-[0_0_12px_rgba(201,168,76,0.4)]'
  const secondary = 'bg-transparent border-border-main text-text-muted hover:border-text-main hover:text-text-main'
  const cls = disabled ? 'opacity-40 cursor-not-allowed' : variant === 'primary' ? primary : secondary
  return <button className={`${base} ${cls}`} onClick={onClick} disabled={disabled}>{children}</button>
}
