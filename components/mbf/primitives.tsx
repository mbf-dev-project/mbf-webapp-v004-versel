import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Eyebrow({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'font-display text-[11px] font-medium uppercase tracking-[0.22em] text-gold',
        className,
      )}
      {...props}
    />
  )
}

export function SectionHeader({
  id,
  title,
  action,
}: {
  id?: string
  title: string
  action?: ReactNode
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <h2 id={id} className="font-display text-lg font-medium uppercase tracking-wide text-foreground">
        {title}
      </h2>
      {action}
    </div>
  )
}

export function Card({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn('rounded-2xl border border-hairline bg-surface', className)}
      {...props}
    />
  )
}

export function DemoBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-gold/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-gold-soft',
        className,
      )}
    >
      Демо
    </span>
  )
}

type ActionButtonProps = ComponentProps<'button'> & {
  variant?: 'gold' | 'outline' | 'ghost' | 'confirmed'
  size?: 'md' | 'lg'
}

export function ActionButton({
  variant = 'gold',
  size = 'md',
  className,
  type = 'button',
  ...props
}: ActionButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-display font-medium uppercase tracking-[0.12em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-highlight disabled:pointer-events-none disabled:opacity-40',
        size === 'md' && 'h-11 px-5 text-xs',
        size === 'lg' && 'h-13 px-6 text-sm',
        variant === 'gold' && 'bg-gold text-primary-foreground hover:bg-gold-highlight active:bg-gold-highlight',
        variant === 'outline' &&
          'border border-gold/50 text-gold-soft hover:border-gold-highlight hover:text-gold-highlight',
        variant === 'ghost' && 'text-foreground/80 hover:bg-white/5 hover:text-foreground',
        variant === 'confirmed' &&
          'border border-gold-highlight/60 bg-gold/10 text-gold-highlight hover:bg-gold/15',
        className,
      )}
      {...props}
    />
  )
}

export function ProgressBar({
  value,
  label,
  className,
}: {
  value: number
  label: string
  className?: string
}) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('h-1 w-full overflow-hidden rounded-full bg-white/8', className)}
    >
      <div className="h-full rounded-full bg-gold" style={{ width: `${clamped}%` }} />
    </div>
  )
}

export function MbfMark({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <span
        aria-hidden="true"
        className="flex size-9 items-center justify-center rounded-full border border-gold/60 font-display text-[11px] font-semibold tracking-wider text-gold"
      >
        MBF
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[13px] font-semibold uppercase tracking-[0.18em] text-foreground">
          Mayweather
        </span>
        <span className="mt-1 font-display text-[9px] font-medium uppercase tracking-[0.3em] text-gold-soft">
          Boxing + Fitness
        </span>
      </span>
    </div>
  )
}
