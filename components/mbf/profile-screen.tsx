import Image from 'next/image'
import {
  ChevronRight,
  Headset,
  MapPin,
  MessageCircle,
  Phone,
  Settings,
  Snowflake,
  Ticket,
  type LucideIcon,
} from 'lucide-react'
import { ActionButton, Card, DemoBadge, Eyebrow, ProgressBar, SectionHeader } from './primitives'
import { GOALS, MEMBER, MEMBERSHIP_ELAPSED_PERCENT, PROFILE_STATS } from './data'

const CONTACTS: { icon: LucideIcon; label: string; caption: string; message: string }[] = [
  { icon: Phone, label: 'Позвонить в клуб', caption: '+998 71 000-00-00', message: 'Звонок недоступен в прототипе' },
  { icon: MessageCircle, label: 'Написать менеджеру', caption: 'Ответ в течение 15 минут', message: 'Чат откроется в рабочей версии' },
  { icon: MapPin, label: 'Как добраться', caption: MEMBER.club, message: 'Карта недоступна в прототипе' },
  { icon: Headset, label: 'Служба поддержки', caption: 'Ежедневно 07:00–23:00', message: 'Обращение создано · демо' },
]

export function ProfileScreen({ onNotify }: { onNotify: (message: string) => void }) {
  return (
    <div className="flex flex-col gap-8 px-5 pb-8 pt-[max(env(safe-area-inset-top),1.25rem)]">
      <header className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-medium uppercase tracking-wide">Профиль</h1>
        <button
          type="button"
          onClick={() => onNotify('Настройки появятся в рабочей версии')}
          className="flex size-11 items-center justify-center rounded-full border border-hairline text-foreground/80 transition-colors hover:text-foreground"
        >
          <Settings className="size-[18px]" aria-hidden="true" />
          <span className="sr-only">Настройки</span>
        </button>
      </header>

      <section aria-label="Участник" className="flex flex-col items-center text-center">
        <div className="relative">
          <div className="size-24 overflow-hidden rounded-full border-2 border-gold p-1">
            <Image
              src="/images/member-avatar.png"
              alt={`Фото участника ${MEMBER.firstName} ${MEMBER.lastName}`}
              width={96}
              height={96}
              className="size-full rounded-full object-cover"
            />
          </div>
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-gold px-2.5 py-0.5 font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground">
            {MEMBER.tier}
          </span>
        </div>
        <p className="mt-5 font-display text-2xl font-medium uppercase tracking-wide">
          {MEMBER.firstName} {MEMBER.lastName}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">Участник с {MEMBER.memberSince}</p>
        <p className="mt-2 font-mono text-[11px] tracking-widest text-gold-soft/80">{MEMBER.memberId}</p>

        <dl className="mt-6 grid w-full grid-cols-3 divide-x divide-hairline rounded-2xl border border-hairline bg-surface py-4">
          {PROFILE_STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse items-center gap-1">
              <dt className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{stat.label}</dt>
              <dd className="font-display text-xl font-medium leading-none">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="membership-status" className="flex flex-col gap-4">
        <SectionHeader id="membership-status" title="Абонемент" action={<DemoBadge />} />
        <Card className="flex flex-col gap-5 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Eyebrow>Статус</Eyebrow>
              <p className="mt-2 flex items-center gap-2 font-display text-xl font-medium uppercase tracking-wide">
                <span aria-hidden="true" className="size-2 rounded-full bg-gold-highlight" />
                Активен
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Действует до</p>
              <p className="mt-2 font-display text-xl font-medium">{MEMBER.expiryDate}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <ProgressBar value={MEMBERSHIP_ELAPSED_PERCENT} label="Использованный срок абонемента" />
            <p className="text-xs text-muted-foreground">
              {MEMBER.plan} · {MEMBER.planTerm} · осталось {MEMBER.daysLeft} дней
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 border-t border-hairline pt-4">
            <div className="flex items-center gap-3">
              <Snowflake className="size-4 text-gold" aria-hidden="true" />
              <p className="text-xs text-secondary-foreground/80">
                <span className="block font-medium text-foreground">{MEMBER.freezeDaysLeft} дней</span>
                заморозки
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Ticket className="size-4 text-gold" aria-hidden="true" />
              <p className="text-xs text-secondary-foreground/80">
                <span className="block font-medium text-foreground">{MEMBER.guestPasses} гостевых</span>
                визита
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <ActionButton onClick={() => onNotify('Продление оформляется в клубе · демо')}>Продлить</ActionButton>
            <ActionButton variant="outline" onClick={() => onNotify('Заявка на заморозку создана · демо')}>
              Заморозить
            </ActionButton>
          </div>
        </Card>
      </section>

      <section aria-labelledby="goals" className="flex flex-col gap-4">
        <h2 id="goals" className="font-display text-lg font-medium uppercase tracking-wide">
          Цели и прогресс
        </h2>
        <Card>
          <ul className="divide-y divide-hairline">
            {GOALS.map((goal) => (
              <li key={goal.label} className="flex flex-col gap-3 p-4">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-sm font-medium">{goal.label}</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-foreground">{goal.current}</span> / {goal.target}
                  </p>
                </div>
                <ProgressBar value={goal.progress} label={goal.label} />
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section aria-labelledby="contacts" className="flex flex-col gap-4">
        <h2 id="contacts" className="font-display text-lg font-medium uppercase tracking-wide">
          Связь с клубом
        </h2>
        <Card>
          <ul className="divide-y divide-hairline">
            {CONTACTS.map(({ icon: Icon, label, caption, message }) => (
              <li key={label}>
                <button
                  type="button"
                  onClick={() => onNotify(message)}
                  className="flex min-h-16 w-full items-center gap-4 px-4 py-3 text-left transition-colors hover:bg-white/[0.03] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gold-highlight"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium">{label}</span>
                    <span className="block truncate text-xs text-muted-foreground">{caption}</span>
                  </span>
                  <ChevronRight className="size-4 text-muted-foreground" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
        Прототип для презентации. Все данные участника, абонемента
        <br />и записи являются демонстрационными.
      </p>
    </div>
  )
}
