"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { EventsCalendar } from "@/components/events/events-calendar"
import { getCurrentUser, type User } from "@/lib/auth"
// Waves removed; using logo image instead

export default function EventsPage() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/auth")
      return
    }
    setUser(currentUser)
  }, [router])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <img src="/logo_png.png" alt="EcoPlaya" className="h-12 w-auto mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Eventos de Limpieza</h1>
          <p className="text-muted-foreground">
            Únete a jornadas de limpieza organizadas por la comunidad y gana puntos por tu participación
          </p>
        </div>

        <EventsCalendar />
      </div>
    </div>
  )
}
