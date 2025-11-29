"use client"

import { EventsCalendar } from "@/components/events/events-calendar"

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Eventos Próximos</h1>
        <p className="text-gray-500">Descubre y únete a actividades de limpieza y conservación.</p>
      </div>
      <EventsCalendar />
    </div>
  )
}
