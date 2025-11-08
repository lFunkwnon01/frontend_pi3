export interface CalendarEvent {
  id: string
  title: string
  description?: string
  start: Date
  end?: Date
  location?: string
}

function pad(n: number) { return n.toString().padStart(2, '0') }
function toICSDate(d: Date) {
  // UTC format YYYYMMDDTHHMMSSZ
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth()+1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`
}

export function googleCalendarUrl(ev: CalendarEvent) {
  const start = toICSDate(ev.start)
  const end = toICSDate(ev.end || new Date(ev.start.getTime() + 2*60*60*1000))
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: ev.title,
    dates: `${start}/${end}`,
    details: ev.description || '',
    location: ev.location || ''
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export function buildICS(ev: CalendarEvent) {
  const dtstamp = toICSDate(new Date())
  const dtstart = toICSDate(ev.start)
  const dtend = toICSDate(ev.end || new Date(ev.start.getTime() + 2*60*60*1000))
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//EcoPlaya//Events//ES',
    'BEGIN:VEVENT',
    `UID:${ev.id}@ecoplaya`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${dtstart}`,
    `DTEND:${dtend}`,
    `SUMMARY:${ev.title}`,
    `DESCRIPTION:${(ev.description || '').replace(/\n/g,'\\n')}`,
    `LOCATION:${ev.location || ''}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n')
  const blob = new Blob([ics], { type: 'text/calendar' })
  return URL.createObjectURL(blob)
}

// Reminders (simulation): store desired reminders in localStorage
export function activateReminders(eventId: string, start: Date) {
  const reminders = JSON.parse(localStorage.getItem('eventReminders') || '{}')
  reminders[eventId] = {
    start: start.toISOString(),
    notify24h: new Date(start.getTime() - 24*60*60*1000).toISOString(),
    notify1h: new Date(start.getTime() - 60*60*1000).toISOString()
  }
  localStorage.setItem('eventReminders', JSON.stringify(reminders))
}

export function registerReferral(eventId: string, refUserId: string) {
  const key = 'eventReferrals'
  const map = JSON.parse(localStorage.getItem(key) || '{}')
  map[eventId] = map[eventId] || {}
  map[eventId][refUserId] = (map[eventId][refUserId] || 0) + 1
  localStorage.setItem(key, JSON.stringify(map))
}

export function getReferralParam(): string | null {
  if (typeof window === 'undefined') return null
  const url = new URL(window.location.href)
  return url.searchParams.get('ref')
}
