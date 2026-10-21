import type { ReactNode } from 'react'
import Image from 'next/image'
import { ArrowUpRight, Bell, CalendarDays, Clock, MapPin, UserRound } from 'lucide-react'
import { ActionButton, Card, DemoBadge, Eyebrow, MbfMark, ProgressBar, SectionHeader } from './primitives'
import {
  CLASSES,
  MEMBER,
  MEMBERSHIP_ELAPSED_PERCENT,
  MONTH_ACTIVITY,
  TODAY_LABEL,
  endTime,
  formatDayLabel,
} from './data'
import type { Tab } from './bottom-nav'

export function HomeScreen({
  bookings,
  onNavigate,
  onNotify,
}: {
  bookings: string[]
  onNavigate: (tab: Tab) => void
  onNotify: (message: string) => void
}) {
  const nextClass = CLASSES.filter((gymClass) => bookings.includes(gymClass.id)).sort(
    (a, b) => a.dayIndex - b.dayIndex || a.time.localeCompare(b.time),
  )[0]

  return (
    <div className="flex flex-col gap-8 px-5 pb-8 pt-[max(env(safe-area-inset-top),1.25rem)]">
      <header className="flex items-center justify-between">
        <MbfMark />
        <button
          type="button"
          onClick={() => onNotify('Новых уведомлений нет · демо')}
          className="relative flex size-11 items-center justify-center rounded-full border border-hairline text-foreground/80 transition-colors hover:text-foreground"
        >
          <Bell className="size-[18px]" aria-hidden="true" />
          <span className="sr-only">Уведомления</span>
          <span aria-hidden="true" className="absolute right-3 top-3 size-1.5 rounded-full bg-gold" />
        </button>
      </header>

      <section aria-labelledby="greeting">
        <Eyebrow>{TODAY_LABEL}</Eyebrow>
        <h1
          id="greeting"
          className="mt-2 font-display text-4xl font-medium uppercase leading-[1.05] tracking-wide text-balance"
        >
          С возвращением,
          <br />
          <span className="text-gold-highlight">{MEMBER.firstName}</span>
        </h1>
      </section>

      <MembershipCard />

      <section aria-labelledby="next-workout" className="flex flex-col gap-4">
        <SectionHeader
          id="next-workout"
          title="Ближайшая тренировка"
          action={
            <button
              type="button"
              onClick={() => onNavigate('schedule')}
              className="text-xs font-medium text-gold-soft hover:text-gold-highlight"
            >
              Все
            </button>
          }
        />

        {nextClass ? (
          <Card className="relative overflow-hidden">
            <Image
              src="/images/mbf-ring.png"
              alt=""
              fill
              sizes="390px"
              className="object-cover opacity-45"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
            <div className="relative flex flex-col gap-5 p-5">
              <div className="flex items-center justify-between">
                <Eyebrow>{formatDayLabel(nextClass.dayIndex)}</Eyebrow>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-gold/15 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-gold-highlight">
                    Вы записаны
                  </span>
                  <DemoBadge className="bg-background/60 py-1" />
                </div>
              </div>
              <div>
                <p className="font-display text-5xl font-medium leading-none tracking-tight">
                  {nextClass.time}
                </p>
                <p className="mt-3 font-display text-xl font-medium uppercase tracking-wide">
                  {nextClass.title}
                </p>
              </div>
              <dl className="flex flex-col gap-2 text-sm text-secondary-foreground/80">
                <div className="flex items-center gap-2">
                  <dt className="sr-only">Тренер</dt>
                  <UserRound className="size-4 text-gold" aria-hidden="true" />
                  <dd>{nextClass.coach}</dd>
                </div>
                <div className="flex items-center gap-2">
                  <dt className="sr-only">Время</dt>
                  <Clock className="size-4 text-gold" aria-hidden="true" />
                  <dd>
                    {nextClass.time}–{endTime(nextClass.time, nextClass.duration)} · {nextClass.duration} мин
                  </dd>
                </div>
                <div className="flex items-center gap-2">
                  <dt className="sr-only">Клуб</dt>
                  <MapPin className="size-4 text-gold" aria-hidden="true" />
                  <dd>{MEMBER.club} · Зал 1</dd>
                </div>
              </dl>
            </div>
          </Card>
        ) : (
          <Card className="flex flex-col items-start gap-4 p-5">
            <p className="text-sm leading-relaxed text-muted-foreground">
              У вас нет запланированных тренировок. Выберите занятие в расписании.
            </p>
            <ActionButton onClick={() => onNavigate('schedule')}>Выбрать занятие</ActionButton>
          </Card>
        )}
      </section>

      <MonthActivity />

      <section aria-label="Быстрые действия" className="grid grid-cols-2 gap-3">
        <QuickAction
          icon={<CalendarDays className="size-5" aria-hidden="true" />}
          title="Расписание"
          caption="Запись на занятия"
          onClick={() => onNavigate('schedule')}
        />
        <QuickAction
          icon={<UserRound className="size-5" aria-hidden="true" />}
          title="Профиль"
          caption="Абонемент и цели"
          onClick={() => onNavigate('profile')}
        />
      </section>
    </div>
  )
}

function MembershipCard() {
  return (
    <section aria-label="Абонемент">
      <div className="relative overflow-hidden rounded-2xl border border-gold/35 bg-surface p-5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full border border-gold/15"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 -top-6 size-28 rounded-full border border-gold/10"
        />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <Eyebrow>Абонемент</Eyebrow>
            <p className="mt-2 font-display text-3xl font-semibold uppercase tracking-wider text-gold-highlight">
              {MEMBER.plan}
            </p>
            <p className="mt-1 text-sm text-secondary-foreground/80">{MEMBER.planTerm}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-medium text-foreground">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-gold-highlight" />
              Активен
            </span>
            <DemoBadge />
          </div>
        </div>

        <div className="relative mt-6 flex flex-col gap-2">
          <ProgressBar value={MEMBERSHIP_ELAPSED_PERCENT} label="Использованный срок абонемента" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>с {MEMBER.startDate}</span>
            <span>
              до <span className="text-foreground">{MEMBER.expiryDate}</span>
            </span>
          </div>
        </div>

        <div className="relative mt-5 flex items-end justify-between border-t border-hairline pt-4">
          <div>
            <p className="font-display text-2xl font-medium leading-none">{MEMBER.daysLeft}</p>
            <p className="mt-1.5 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">дней осталось</p>
          </div>
          <div>
            <p className="font-display text-2xl font-medium leading-none">{MEMBER.freezeDaysLeft}</p>
            <p className="mt-1.5 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">дней заморозки</p>
          </div>
          <p className="whitespace-nowrap font-mono text-[10px] tracking-wider text-gold-soft/80">{MEMBER.memberId}</p>
        </div>
      </div>
    </section>
  )
}

function MonthActivity() {
  const max = Math.max(...MONTH_ACTIVITY.weeks.map((week) => week.value), 5)
  const goalPercent = (MONTH_ACTIVITY.workouts / MONTH_ACTIVITY.goal) * 100

  return (
    <section aria-labelledby="activity" className="flex flex-col gap-4">
      <div className="flex items-end justify-between gap-4">
        <h2 id="activity" className="font-display text-lg font-medium uppercase tracking-wide">
          {MONTH_ACTIVITY.month}
        </h2>
        <DemoBadge />
      </div>
      <Card className="flex flex-col gap-5 p-5">
        <div className="flex items-end justify-between gap-6">
          <div className="flex-1">
            <p className="font-display text-4xl font-medium leading-none">
              {MONTH_ACTIVITY.workouts}
              <span className="text-xl text-muted-foreground">/{MONTH_ACTIVITY.goal}</span>
            </p>
            <p className="mt-2 text-xs text-muted-foreground">тренировок к цели месяца</p>
            <ProgressBar value={goalPercent} label="Прогресс к цели месяца" className="mt-3" />
          </div>
          <div className="flex h-20 items-end gap-2" aria-hidden="true">
            {MONTH_ACTIVITY.weeks.map((week, index) => (
              <div key={week.label} className="flex h-full flex-col items-center justify-end gap-1.5">
                <div
                  className={
                    index === MONTH_ACTIVITY.weeks.length - 1
                      ? 'w-5 rounded-sm bg-gold-highlight'
                      : 'w-5 rounded-sm bg-gold/35'
                  }
                  style={{ height: `${(week.value / max) * 56}px` }}
                />
                <span className="text-[9px] text-muted-foreground">{week.label}</span>
              </div>
            ))}
          </div>
        </div>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-hairline">
          <div className="bg-surface-raised p-3.5">
            <dt className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Ккал</dt>
            <dd className="mt-1 font-display text-xl font-medium">{MONTH_ACTIVITY.calories}</dd>
          </div>
          <div className="bg-surface-raised p-3.5">
            <dt className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Часов в зале</dt>
            <dd className="mt-1 font-display text-xl font-medium">{MONTH_ACTIVITY.hours}</dd>
          </div>
        </dl>
      </Card>
    </section>
  )
}

function QuickAction({
  icon,
  title,
  caption,
  onClick,
}: {
  icon: ReactNode
  title: string
  caption: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex flex-col items-start gap-6 rounded-2xl border border-hairline bg-surface p-4 text-left transition-colors hover:border-gold/50 focus-visible:outline-2 focus-visible:outline-gold-highlight"
    >
      <span className="flex w-full items-center justify-between text-gold">
        {icon}
        <ArrowUpRight
          className="size-4 text-muted-foreground transition-colors group-hover:text-gold-highlight"
          aria-hidden="true"
        />
      </span>
      <span>
        <span className="block font-display text-base font-medium uppercase tracking-wide">{title}</span>
        <span className="mt-0.5 block text-xs text-muted-foreground">{caption}</span>
      </span>
    </button>
  )
}
