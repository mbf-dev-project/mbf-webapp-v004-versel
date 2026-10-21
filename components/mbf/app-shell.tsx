'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { BottomNav, type Tab } from './bottom-nav'
import { HomeScreen } from './home-screen'
import { ScheduleScreen } from './schedule-screen'
import { ProfileScreen } from './profile-screen'
import { INITIAL_BOOKINGS, CLASSES } from './data'

type Toast = { id: number; message: string }

export function AppShell() {
  const [tab, setTab] = useState<Tab>('home')
  const [bookings, setBookings] = useState<string[]>(INITIAL_BOOKINGS)
  const [waitlist, setWaitlist] = useState<string[]>([])
  const [toast, setToast] = useState<Toast | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const notify = useCallback((message: string) => {
    setToast({ id: Date.now(), message })
  }, [])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(timer)
  }, [toast])

  const navigate = (next: Tab) => {
    setTab(next)
    scrollRef.current?.scrollTo({ top: 0 })
  }

  const toggleBooking = (classId: string) => {
    const gymClass = CLASSES.find((item) => item.id === classId)
    if (!gymClass) return
    const isFull = gymClass.booked >= gymClass.capacity

    if (bookings.includes(classId)) {
      setBookings((current) => current.filter((id) => id !== classId))
      notify('Запись отменена · демо')
      return
    }
    if (isFull) {
      if (waitlist.includes(classId)) {
        setWaitlist((current) => current.filter((id) => id !== classId))
        notify('Вы покинули лист ожидания · демо')
      } else {
        setWaitlist((current) => [...current, classId])
        notify('Вы в листе ожидания · демо')
      }
      return
    }
    setBookings((current) => [...current, classId])
    notify(`Вы записаны на ${gymClass.title}, ${gymClass.time} · демо`)
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background md:bg-[#050505] md:py-6">
      <div className="relative flex h-dvh w-full max-w-[430px] flex-col overflow-hidden bg-background md:h-[min(844px,calc(100dvh-3rem))] md:max-w-[390px] md:rounded-[2.75rem] md:border md:border-white/10 md:shadow-[0_40px_120px_-20px_rgba(164,140,99,0.18)]">
        <div ref={scrollRef} className="no-scrollbar flex-1 overflow-y-auto overscroll-contain">
          {tab === 'home' && (
            <HomeScreen bookings={bookings} onNavigate={navigate} onNotify={notify} />
          )}
          {tab === 'schedule' && (
            <ScheduleScreen bookings={bookings} waitlist={waitlist} onToggleBooking={toggleBooking} />
          )}
          {tab === 'profile' && <ProfileScreen onNotify={notify} />}
        </div>

        <div
          aria-live="polite"
          role="status"
          className="pointer-events-none absolute inset-x-4 bottom-24 z-20 flex justify-center"
        >
          {toast && (
            <p
              key={toast.id}
              className="animate-in fade-in slide-in-from-bottom-2 rounded-full border border-gold/40 bg-surface-raised px-4 py-2.5 text-center text-xs font-medium text-secondary-foreground shadow-lg shadow-black/60"
            >
              {toast.message}
            </p>
          )}
        </div>

        <BottomNav active={tab} onChange={navigate} />
      </div>
    </div>
  )
}
