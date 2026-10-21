import { CalendarDays, House, UserRound, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export type Tab = 'home' | 'schedule' | 'profile'

const ITEMS: { value: Tab; label: string; icon: LucideIcon }[] = [
  { value: 'home', label: 'План', icon: House },
  { value: 'schedule', label: 'Расписание', icon: CalendarDays },
  { value: 'profile', label: 'Профиль', icon: UserRound },
]

export function BottomNav({
  active,
  onChange,
}: {
  active: Tab
  onChange: (tab: Tab) => void
}) {
  return (
    <nav
      aria-label="Основная навигация"
      className="shrink-0 border-t border-hairline bg-background/95 pb-[max(env(safe-area-inset-bottom),0.5rem)] backdrop-blur"
    >
      <ul className="flex items-stretch justify-around px-2">
        {ITEMS.map(({ value, label, icon: Icon }) => {
          const isActive = value === active
          return (
            <li key={value} className="flex-1">
              <button
                type="button"
                onClick={() => onChange(value)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'relative flex h-16 w-full flex-col items-center justify-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.14em] transition-colors focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-gold-highlight',
                  isActive ? 'text-gold-highlight' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute top-0 h-0.5 w-8 rounded-full bg-gold transition-opacity',
                    isActive ? 'opacity-100' : 'opacity-0',
                  )}
                />
                <Icon className="size-5" strokeWidth={isActive ? 2 : 1.6} aria-hidden="true" />
                {label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
