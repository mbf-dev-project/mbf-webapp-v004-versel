'use client'

import { useState } from 'react'
import { Check, UserRound } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ActionButton, DemoBadge, Eyebrow } from './primitives'
import {
  CLASSES,
  CLASS_FILTERS,
  CLASS_TYPE_LABELS,
  SCHEDULE_DAYS,
  endTime,
  formatDayLabel,
  type ClassType,
  type GymClass,
} from './data'

export function ScheduleScreen({
  bookings,
  waitlist,
  onToggleBooking,
}: {
  bookings: string[]
  waitlist: string[]
  onToggleBooking: (classId: string) => void
}) {
  const [dayIndex, setDayIndex] = useState(0)
  const [filter, setFilter] = useState<ClassType | 'all'>('all')

  const dayClasses = CLASSES.filter(
    (gymClass) => gymClass.dayIndex === dayIndex && (filter === 'all' || gymClass.type === filter),
  )

  return (
    <div className="flex flex-col pb-8">
      <header className="sticky top-0 z-10 flex flex-col gap-5 border-b border-hairline bg-background/95 px-5 pb-4 pt-[max(env(safe-area-inset-top),1.25rem)] backdrop-blur">
        <div className="flex items-end justify-between">
          <div>
            <Eyebrow>Октябрь 2026</Eyebrow>
            <h1 className="mt-2 font-display text-3xl font-medium uppercase tracking-wide">Расписание</h1>
          </div>
          <DemoBadge className="mb-1.5" />
        </div>

        <div role="tablist" aria-label="Выбор дня" className="-mx-1 grid grid-cols-7 gap-1">
          {SCHEDULE_DAYS.map((day) => {
            const isActive = day.index === dayIndex
            const hasBooking = CLASSES.some(
              (gymClass) => gymClass.dayIndex === day.index && bookings.includes(gymClass.id),
            )
            return (
              <button
                key={day.index}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`${day.weekdayLong}, ${day.date} ${day.monthGenitive}${hasBooking ? ', есть запись' : ''}`}
                onClick={() => setDayIndex(day.index)}
                className={cn(
                  'flex h-16 flex-col items-center justify-center gap-1 rounded-xl border transition-colors focus-visible:outline-2 focus-visible:outline-gold-highlight',
                  isActive
                    ? 'border-gold bg-gold text-primary-foreground'
                    : 'border-transparent text-foreground hover:border-hairline',
                )}
              >
                <span
                  className={cn(
                    'text-[10px] font-medium uppercase tracking-[0.12em]',
                    isActive ? 'text-primary-foreground/70' : 'text-muted-foreground',
                  )}
                >
                  {day.weekday}
                </span>
                <span className="font-display text-lg font-medium leading-none">{day.date}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'size-1 rounded-full',
                    hasBooking ? (isActive ? 'bg-primary-foreground' : 'bg-gold-highlight') : 'bg-transparent',
                  )}
                />
              </button>
            )
          })}
        </div>

        <div
          role="group"
          aria-label="Тип занятия"
          className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-1.5 overflow-x-auto px-5 [mask-image:linear-gradient(to_right,transparent,black_1.25rem,black_calc(100%-1.25rem),transparent)]"
        >
          {CLASS_FILTERS.map((option) => {
            const isActive = option.value === filter
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={isActive}
                onClick={(event) => {
                  setFilter(option.value)
                  event.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
                }}
                className={cn(
                  'h-9 shrink-0 grow snap-start whitespace-nowrap rounded-full border px-3 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gold-highlight',
                  isActive
                    ? 'border-gold-soft/70 bg-white/5 text-gold-highlight'
                    : 'border-hairline text-muted-foreground hover:text-foreground',
                )}
              >
                {option.label}
              </button>
            )
          })}
        </div>
      </header>

      <section aria-labelledby="day-heading" className="flex flex-col gap-3 px-5 pt-5">
        <div className="flex items-baseline justify-between">
          <h2 id="day-heading" className="font-display text-base font-medium uppercase tracking-wide">
            {formatDayLabel(dayIndex)}
          </h2>
          <p className="text-xs text-muted-foreground">{pluralizeClasses(dayClasses.length)}</p>
        </div>

        {dayClasses.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {dayClasses.map((gymClass) => (
              <li key={gymClass.id}>
                <ClassCard
                  gymClass={gymClass}
                  isBooked={bookings.includes(gymClass.id)}
                  isWaitlisted={waitlist.includes(gymClass.id)}
                  onToggle={() => onToggleBooking(gymClass.id)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-2xl border border-dashed border-hairline px-5 py-10 text-center text-sm text-muted-foreground">
            В этот день нет занятий выбранного типа.
          </p>
        )}
      </section>
    </div>
  )
}

function ClassCard({
  gymClass,
  isBooked,
  isWaitlisted,
  onToggle,
}: {
  gymClass: GymClass
  isBooked: boolean
  isWaitlisted: boolean
  onToggle: () => void
}) {
  const booked = gymClass.booked + (isBooked ? 1 : 0)
  const spotsLeft = Math.max(0, gymClass.capacity - booked)
  const isFull = gymClass.booked >= gymClass.capacity
  const fillPercent = Math.min(100, (booked / gymClass.capacity) * 100)

  return (
    <article
      className={cn(
        'flex flex-col gap-4 rounded-2xl border bg-surface p-4 transition-colors',
        isBooked ? 'border-gold/60' : 'border-hairline',
      )}
    >
      <div className="flex gap-4">
        <div className="flex w-14 shrink-0 flex-col border-r border-hairline pr-4">
          <span className="font-display text-xl font-medium leading-none">{gymClass.time}</span>
          <span className="mt-1.5 text-[11px] text-muted-foreground">
            {endTime(gymClass.time, gymClass.duration)}
          </span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-gold">
              {CLASS_TYPE_LABELS[gymClass.type]}
            </span>
            <span aria-hidden="true" className="text-muted-foreground">
              ·
            </span>
            <span className="text-[11px] text-muted-foreground">{gymClass.level}</span>
          </div>
          <h3 className="truncate font-display text-lg font-medium uppercase leading-tight tracking-wide">
            {gymClass.title}
          </h3>
          <p className="flex items-center gap-1.5 text-xs text-secondary-foreground/75">
            <UserRound className="size-3.5 text-gold-soft" aria-hidden="true" />
            {gymClass.coach} · {gymClass.duration} мин
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/8" aria-hidden="true">
            <div
              className={cn('h-full rounded-full', isFull && !isBooked ? 'bg-white/30' : 'bg-gold')}
              style={{ width: `${fillPercent}%` }}
            />
          </div>
          <p className={cn('text-[11px]', spotsLeft <= 3 ? 'text-gold-highlight' : 'text-muted-foreground')}>
            {isFull && !isBooked
              ? `Мест нет · ${gymClass.capacity} из ${gymClass.capacity}`
              : `Свободно ${spotsLeft} из ${gymClass.capacity}`}
          </p>
        </div>

        {isBooked ? (
          <ActionButton
            variant="confirmed"
            onClick={onToggle}
            aria-label={`Вы записаны на ${gymClass.title} в ${gymClass.time}. Нажмите, чтобы отменить`}
          >
            <Check className="size-4" aria-hidden="true" />
            Вы записаны
          </ActionButton>
        ) : isFull ? (
          <ActionButton variant={isWaitlisted ? 'confirmed' : 'outline'} onClick={onToggle}>
            {isWaitlisted && <Check className="size-4" aria-hidden="true" />}
            {isWaitlisted ? 'В листе' : 'Лист ожидания'}
          </ActionButton>
        ) : (
          <ActionButton onClick={onToggle} aria-label={`Записаться на ${gymClass.title} в ${gymClass.time}`}>
            Записаться
          </ActionButton>
        )}
      </div>
    </article>
  )
}

function pluralizeClasses(count: number) {
  const mod10 = count % 10
  const mod100 = count % 100
  if (mod10 === 1 && mod100 !== 11) return `${count} занятие`
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${count} занятия`
  return `${count} занятий`
}
