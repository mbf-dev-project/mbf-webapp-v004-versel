export type ClassType = 'boxing' | 'fitness' | 'sparring' | 'conditioning'

export type GymClass = {
  id: string
  dayIndex: number
  time: string
  duration: number
  title: string
  type: ClassType
  coach: string
  level: string
  capacity: number
  booked: number
}

export type ScheduleDay = {
  index: number
  weekday: string
  weekdayLong: string
  date: number
  monthGenitive: string
}

export const CLASS_TYPE_LABELS: Record<ClassType, string> = {
  boxing: 'Бокс',
  fitness: 'Фитнес',
  sparring: 'Спарринг',
  conditioning: 'Кардио',
}

export const CLASS_FILTERS: { value: ClassType | 'all'; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'boxing', label: 'Бокс' },
  { value: 'fitness', label: 'Фитнес' },
  { value: 'sparring', label: 'Спарринг' },
  { value: 'conditioning', label: 'Кардио' },
]

export const MEMBER = {
  firstName: 'Алишер',
  lastName: 'Каримов',
  memberId: 'MBF 0482 1937',
  memberSince: 'марта 2025',
  club: 'MBF Ташкент · Сити',
  plan: 'MBF Black',
  tier: 'Black',
  planTerm: 'Безлимит · 12 месяцев',
  startDate: '15.03.2026',
  expiryDate: '15.03.2027',
  daysLeft: 145,
  daysTotal: 365,
  freezeDaysLeft: 14,
  guestPasses: 2,
}

export const MEMBERSHIP_ELAPSED_PERCENT = ((MEMBER.daysTotal - MEMBER.daysLeft) / MEMBER.daysTotal) * 100

export const MONTH_ACTIVITY = {
  month: 'Октябрь',
  workouts: 11,
  goal: 16,
  calories: '9 540',
  hours: '13,5',
  weeks: [
    { label: '29.09', value: 3 },
    { label: '06.10', value: 4 },
    { label: '13.10', value: 3 },
    { label: '20.10', value: 1 },
  ],
}

export const GOALS = [
  { label: 'Снизить вес', current: '79,4 кг', target: '78 кг', progress: 71 },
  {
    label: 'Тренировок в месяц',
    current: String(MONTH_ACTIVITY.workouts),
    target: String(MONTH_ACTIVITY.goal),
    progress: Math.round((MONTH_ACTIVITY.workouts / MONTH_ACTIVITY.goal) * 100),
  },
  { label: 'Техника: комбинации 1–6', current: '4 из 6', target: '6', progress: 67 },
]

export const PROFILE_STATS = [
  { label: 'Тренировок', value: '128' },
  { label: 'Серия, нед.', value: '6' },
  { label: 'Раундов', value: '1 420' },
]

export const SCHEDULE_DAYS: ScheduleDay[] = [
  { index: 0, weekday: 'Ср', weekdayLong: 'Среда', date: 21, monthGenitive: 'октября' },
  { index: 1, weekday: 'Чт', weekdayLong: 'Четверг', date: 22, monthGenitive: 'октября' },
  { index: 2, weekday: 'Пт', weekdayLong: 'Пятница', date: 23, monthGenitive: 'октября' },
  { index: 3, weekday: 'Сб', weekdayLong: 'Суббота', date: 24, monthGenitive: 'октября' },
  { index: 4, weekday: 'Вс', weekdayLong: 'Воскресенье', date: 25, monthGenitive: 'октября' },
  { index: 5, weekday: 'Пн', weekdayLong: 'Понедельник', date: 26, monthGenitive: 'октября' },
  { index: 6, weekday: 'Вт', weekdayLong: 'Вторник', date: 27, monthGenitive: 'октября' },
]

type ClassTemplate = Omit<GymClass, 'id' | 'dayIndex' | 'booked'> & { bookedBase: number }

const TEMPLATES: ClassTemplate[] = [
  { time: '07:00', duration: 60, title: 'MBF Signature', type: 'boxing', coach: 'Тимур Рахимов', level: 'Все уровни', capacity: 20, bookedBase: 14 },
  { time: '09:30', duration: 45, title: 'Strength & Core', type: 'fitness', coach: 'Анна Ким', level: 'Средний', capacity: 16, bookedBase: 9 },
  { time: '12:30', duration: 45, title: 'Boxing Basics', type: 'boxing', coach: 'Рустам Алиев', level: 'Начальный', capacity: 18, bookedBase: 7 },
  { time: '18:00', duration: 50, title: 'Fight Conditioning', type: 'conditioning', coach: 'Анна Ким', level: 'Продвинутый', capacity: 16, bookedBase: 16 },
  { time: '19:00', duration: 60, title: 'MBF Signature', type: 'boxing', coach: 'Тимур Рахимов', level: 'Все уровни', capacity: 20, bookedBase: 17 },
  { time: '20:30', duration: 60, title: 'Технический спарринг', type: 'sparring', coach: 'Дмитрий Ли', level: 'Продвинутый', capacity: 10, bookedBase: 6 },
]

const DAY_PATTERNS: number[][] = [
  [0, 1, 2, 3, 4, 5],
  [0, 1, 3, 4, 5],
  [0, 2, 3, 4],
  [0, 1, 2, 5],
  [1, 2, 4],
  [0, 1, 2, 3, 4, 5],
  [0, 2, 3, 4, 5],
]

export const CLASSES: GymClass[] = DAY_PATTERNS.flatMap((pattern, dayIndex) =>
  pattern.map((templateIndex) => {
    const { bookedBase, ...template } = TEMPLATES[templateIndex]
    const variance = ((dayIndex * 7 + templateIndex * 3) % 5) - 2
    const booked = Math.max(2, Math.min(template.capacity, bookedBase + variance))
    return {
      ...template,
      id: `d${dayIndex}-t${templateIndex}`,
      dayIndex,
      booked: dayIndex === 0 && templateIndex === 3 ? template.capacity : booked,
    }
  }),
)

export const INITIAL_BOOKINGS = ['d0-t4']

export const TODAY_LABEL = `${SCHEDULE_DAYS[0].weekdayLong}, ${SCHEDULE_DAYS[0].date} ${SCHEDULE_DAYS[0].monthGenitive}`

export function getClassById(id: string) {
  return CLASSES.find((gymClass) => gymClass.id === id)
}

export function formatDayLabel(dayIndex: number) {
  if (dayIndex === 0) return 'Сегодня'
  if (dayIndex === 1) return 'Завтра'
  const day = SCHEDULE_DAYS[dayIndex]
  return `${day.weekdayLong}, ${day.date} ${day.monthGenitive}`
}

export function endTime(start: string, duration: number) {
  const [hours, minutes] = start.split(':').map(Number)
  const total = hours * 60 + minutes + duration
  const h = Math.floor(total / 60) % 24
  const m = total % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}
