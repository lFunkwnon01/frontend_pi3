"use client"

import { useState, useEffect, useMemo } from "react"
import type { EventAdvanced } from "@/lib/event-model"
import mockEventsAdvanced, { mockAllies } from "@/lib/event-model"
import EventFilters, { type FiltersState } from "./event-filters"

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (v: number) => (v * Math.PI) / 180
  const R = 6371 // km
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export function EventsCalendar() {
  const [events, setEvents] = useState<EventAdvanced[]>([])
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([])
  const [filters, setFilters] = useState<FiltersState | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  useEffect(() => {
    setEvents(mockEventsAdvanced)
    const registered = JSON.parse(localStorage.getItem("registeredEvents") || "[]")
    setRegisteredEvents(registered)
  }, [])

  useEffect(() => {
    if (!('geolocation' in navigator)) return
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => {},
    )
  }, [])

  const handleRegister = (eventId: string) => {
    if (registeredEvents.includes(eventId)) return
    const newRegistered = [...registeredEvents, eventId]
    setRegisteredEvents(newRegistered)
    localStorage.setItem("registeredEvents", JSON.stringify(newRegistered))
  }

  const applyFilters = (all: EventAdvanced[], f: FiltersState | null) => {
    if (!f) return all
    const q = f.q.trim().toLowerCase()
    let list = all.filter((ev) => {
      // text search (title, organizer, playa, ally names)
      const allyNames = ev.allies.map((a) => a.name).join(" ").toLowerCase()
      const organizer = ev.organizer?.name?.toLowerCase() || ""
      const inText = [ev.title, organizer, ev.location.playa, allyNames].join(" ").toLowerCase()
      if (q && !inText.includes(q)) return false

      if (f.districts.length && !f.districts.includes(ev.location.distrito)) return false
      if (f.scope !== "Any" && ev.category !== f.scope) return false
      if (f.activities.length && !f.activities.some((a) => ev.activities.includes(a))) return false
      if (f.allies.length && !f.allies.some((aid) => ev.allies.some((a) => a.id === aid))) return false
      if (f.boat && !ev.allies.some((a) => a.capabilities.boat)) return false
      if (f.sup && !ev.allies.some((a) => a.capabilities.sup)) return false
      if (f.kits && !ev.allies.some((a) => a.capabilities.kits)) return false
      if (f.certificate && !(ev.benefits?.certificate)) return false
      if ((ev.benefits?.points || 0) < f.minPoints) return false
      if ((ev.benefits?.volunteerHours || 0) < f.minHours) return false
      if (f.mustKnowSwimming && !ev.requirements?.mustKnowSwimming) return false

      // date filter (single day)
      if (f.date) {
        const d1 = new Date(ev.startDate).toDateString()
        const d2 = new Date(f.date).toDateString()
        if (d1 !== d2) return false
      }
      return true
    })

    // sort
    if (f.sortBy === "closest" && userLocation) {
      list = list
        .map((ev) => ({ ev, d: haversineDistance(userLocation.lat, userLocation.lng, ev.location.lat, ev.location.lng) }))
        .sort((a, b) => a.d - b.d)
        .map((x) => x.ev)
    } else if (f.sortBy === "points") {
      list.sort((a, b) => (b.benefits?.points || 0) - (a.benefits?.points || 0))
    } else {
      list.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    }

    return list
  }

  const filteredEvents = useMemo(() => applyFilters(events, filters), [events, filters, userLocation])

  return (
    <div className="space-y-6">
      <EventFilters allies={mockAllies} onChange={(f) => setFilters(f)} />

      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Eventos</h2>
        <div className="text-sm text-muted-foreground">{filteredEvents.length} resultados</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((ev) => (
          <article key={ev.id} className="border rounded-lg overflow-hidden shadow-sm">
            <div className="aspect-video bg-gray-50">
              <img src={ev.images?.[0] || "/placeholder.svg"} alt={ev.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg">{ev.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{ev.location.playa} — {ev.location.distrito}</p>
              <p className="text-sm mt-2 text-muted-foreground">{ev.description}</p>

              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm">
                  <div>{new Date(ev.startDate).toLocaleString("es-ES", { dateStyle: "medium", timeStyle: "short" })}</div>
                  <div className="text-muted-foreground">{ev.benefits?.points || 0} pts • {ev.benefits?.volunteerHours || 0} hrs</div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <button
                    onClick={() => handleRegister(ev.id)}
                    disabled={registeredEvents.includes(ev.id)}
                    className={`px-3 py-1 rounded ${registeredEvents.includes(ev.id) ? 'bg-gray-200' : 'bg-primary text-white'}`}
                  >
                    {registeredEvents.includes(ev.id) ? 'Registrado' : 'Unirse'}
                  </button>
                  <a className="text-xs text-muted-foreground" href={`/events/${ev.id}`}>Ver detalles</a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default EventsCalendar
