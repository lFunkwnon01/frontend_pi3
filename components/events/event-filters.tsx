"use client"

import React, { useState, useEffect } from "react"
import type { AllyRef } from "@/lib/event-model"
import type { District } from "@/lib/event-model"

export type FiltersState = {
  q: string
  districts: District[]
  scope: "Costa" | "Mar" | "Any"
  activities: string[]
  allies: string[]
  boat: boolean
  sup: boolean
  kits: boolean
  certificate: boolean
  minPoints: number
  minHours: number
  mustKnowSwimming: boolean
  sortBy: "upcoming" | "points" | "closest"
  date?: string | null
}

interface Props {
  allies: AllyRef[]
  value?: Partial<FiltersState>
  onChange?: (filters: FiltersState) => void
}

const ALL_ACTIVITIES = [
  "Limpieza",
  "Restauración de Dunas",
  "Buceo",
  "Snorkel",
  "Kayak",
  "SUP",
  "Educación",
  "Reciclaje",
]

export function EventFilters({ allies, value = {}, onChange }: Props) {
  const [filters, setFilters] = useState<FiltersState>({
    q: "",
    districts: [],
    scope: "Any",
    activities: [],
    allies: [],
    boat: false,
    sup: false,
    kits: false,
    certificate: false,
    minPoints: 0,
    minHours: 0,
    mustKnowSwimming: false,
    sortBy: "upcoming",
    date: null,
    ...value,
  })

  useEffect(() => onChange?.(filters), [filters, onChange])

  const toggleArray = (key: keyof FiltersState, item: string | District) => {
    setFilters((prev: FiltersState) => {
      const arr = (prev as any)[key] as any[]
      const exists = arr.includes(item)
      const next = exists ? arr.filter((i) => i !== item) : [...arr, item]
      return { ...prev, [key]: next }
    })
  }

  // Airbnb-like top bar with 3 compact popovers: Distritos, Día, Actividades
  return (
    <div className="w-full">
      <div className="rounded-full border shadow-sm px-2 py-1 bg-background">
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Text search (optional) */}
          <input
            type="search"
            value={filters.q}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters((p: FiltersState) => ({ ...p, q: e.target.value }))}
            placeholder="Buscar por título o playa"
            className="hidden md:block flex-1 px-3 py-2 rounded-full focus:outline-none"
            aria-label="Buscar"
          />

          <Popover>
            <PopoverTrigger asChild>
              <button className="px-3 py-2 rounded-full hover:bg-accent text-sm">
                {filters.districts.length > 0 ? `${filters.districts.length} distrito(s)` : "Distritos"}
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-64">
              <div className="text-sm font-medium mb-2">Distritos</div>
              <div className="grid grid-cols-2 gap-2">
                {(["Miraflores", "Barranco", "Chorrillos", "San Miguel"] as District[]).map((d) => (
                  <label key={d} className="inline-flex items-center space-x-2">
                    <input type="checkbox" checked={filters.districts.includes(d)} onChange={() => toggleArray("districts", d)} />
                    <span className="text-sm">{d}</span>
                  </label>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <button className="px-3 py-2 rounded-full hover:bg-accent text-sm">
                {filters.date ? new Date(filters.date).toLocaleDateString("es-ES", { dateStyle: "medium" }) : "Día"}
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="p-0">
              <Calendar
                mode="single"
                selected={filters.date ? new Date(filters.date) : undefined}
                onSelect={(d?: Date) => setFilters((p: FiltersState)=>({ ...p, date: d ? new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString() : null }))}
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <button className="px-3 py-2 rounded-full hover:bg-accent text-sm">
                {filters.activities.length > 0 ? `${filters.activities.length} actividades` : "Actividades"}
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-72">
              <div className="text-sm font-medium mb-2">Actividades</div>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Costa / Orilla</div>
                  <div className="grid grid-cols-2 gap-2">
                    {["Limpieza","Restauración de Dunas","Educación","Reciclaje"].map((act) => (
                      <label key={act} className="inline-flex items-center space-x-2">
                        <input type="checkbox" checked={filters.activities.includes(act)} onChange={() => toggleArray("activities", act)} />
                        <span className="text-sm">{act}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Mar (dentro)</div>
                  <div className="grid grid-cols-2 gap-2">
                    {["Buceo","Snorkel","Kayak","SUP"].map((act) => (
                      <label key={act} className="inline-flex items-center space-x-2">
                        <input type="checkbox" checked={filters.activities.includes(act)} onChange={() => toggleArray("activities", act)} />
                        <span className="text-sm">{act}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Entorno quick chips */}
          <div className="hidden sm:flex items-center gap-1 ml-1">
            {(["Any","Costa","Mar"] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setFilters((p: FiltersState)=>({ ...p, scope: opt }))}
                className={`px-3 py-2 rounded-full text-sm ${filters.scope===opt ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
              >
                {opt === 'Any' ? 'Todos' : opt === 'Costa' ? 'Costa' : 'Mar'}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <select
              value={filters.sortBy}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>setFilters((p: FiltersState)=>({...p, sortBy: e.target.value as FiltersState["sortBy"]}))}
              className="text-sm border rounded-full px-3 py-2 bg-background"
            >
              <option value="upcoming">Próximos primero</option>
              <option value="points">Más puntos</option>
              <option value="closest">Más cercanos</option>
            </select>
            <button
              className="px-3 py-2 rounded-full bg-muted text-sm"
              onClick={() => setFilters({
                q: "",
                districts: [],
                scope: "Any",
                activities: [],
                allies: [],
                boat: false,
                sup: false,
                kits: false,
                certificate: false,
                minPoints: 0,
                minHours: 0,
                mustKnowSwimming: false,
                sortBy: "upcoming",
                date: null,
              })}
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventFilters

// Date selector with popover + calendar
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon } from "lucide-react"

function DateSelector({ value, onChange }: { value?: string | null; onChange: (iso: string | null) => void }) {
  const [open, setOpen] = useState(false)
  const selected = value ? new Date(value) : undefined

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="w-full px-3 py-2 rounded border flex items-center justify-between">
          <span className="text-sm">
            {selected ? selected.toLocaleDateString("es-ES", { dateStyle: "medium" }) : "Seleccionar día"}
          </span>
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(d) => {
            onChange(d ? new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString() : null)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
