"use client"

import React, { useMemo, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import AllyCard from "./ally-card"
import { mockAllies, type Ally } from "@/lib/mock-data"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"

const DISTRICTS = ["Todos", "Chorrillos", "Barranco", "Miraflores", "San Miguel"]
const ACTIVITIES = [
  "Todas",
  "Clases de surf",
  "Alquiler de equipos",
  "Reciclaje/Voluntariado",
  "Guardavidas",
  "Otros",
]

export function AllyList() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialDistrito = searchParams?.get("distrito") || "Todos"

  const [distrito, setDistrito] = useState<string>(initialDistrito)
  const [actividad, setActividad] = useState<string>("Todas")
  const [q, setQ] = useState<string>("")

  const filtered = useMemo(() => {
    return mockAllies.filter((a) => {
      if (distrito && distrito !== "Todos" && a.distrito !== distrito) return false
      if (actividad && actividad !== "Todas") {
        if (!a.actividades.includes(actividad)) return false
      }
      if (q && !a.nombre.toLowerCase().includes(q.toLowerCase())) return false
      return true
    })
  }, [distrito, actividad, q])

  const onDistritoChange = (val: string) => {
    setDistrito(val)
    // update query param
    const params = new URLSearchParams(Array.from(searchParams.entries()))
    if (val === "Todos") params.delete("distrito")
    else params.set("distrito", val)
    router.replace(`/aliados?${params.toString()}`)
  }

  return (
    <div>
      <div className="sticky top-16 z-10 bg-background py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4">
          <div className="w-full md:w-64">
            <label className="text-xs text-muted-foreground">Distrito</label>
            <select
              className="w-full mt-1 px-3 py-2 border rounded-md"
              value={distrito}
              onChange={(e) => onDistritoChange(e.target.value)}
            >
              {DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full md:w-64">
            <label className="text-xs text-muted-foreground">Actividad</label>
            <select
              className="w-full mt-1 px-3 py-2 border rounded-md"
              value={actividad}
              onChange={(e) => setActividad(e.target.value)}
            >
              {ACTIVITIES.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="text-xs text-muted-foreground">Buscar</label>
            <input
              type="search"
              placeholder="Buscar por nombre"
              className="w-full mt-1 px-3 py-2 border rounded-md"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((ally) => (
            <div key={ally.id}>
              <AllyCard {...ally} />
            </div>
          ))}
        </div>
        {filtered.length === 0 && <p className="text-center text-muted-foreground mt-8">No se encontraron aliados.</p>}
      </div>
    </div>
  )
}

export default AllyList
