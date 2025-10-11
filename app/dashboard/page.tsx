"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { BeachMap } from "@/components/map/beach-map"
import { getCurrentUser, type User } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Waves, TrendingUp, Users, Calendar } from "lucide-react"

export default function DashboardPage() {
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
          <Waves className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">¡Bienvenido de vuelta, {user.name}!</h1>
          <p className="text-muted-foreground">Explora el estado de nuestras playas y contribuye a su cuidado</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Tus Puntos</CardTitle>
              <TrendingUp className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{user.points}</div>
              <p className="text-xs text-muted-foreground mt-1">+23% desde el mes pasado</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Playas Limpias</CardTitle>
              <Waves className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">2</div>
              <p className="text-xs text-muted-foreground mt-1">de 4 playas monitoreadas</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Voluntarios Activos</CardTitle>
              <Users className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground mt-1">+180 esta semana</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Próximo Evento</CardTitle>
              <Calendar className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">20 Ene</div>
              <p className="text-xs text-muted-foreground mt-1">Limpieza Miraflores</p>
            </CardContent>
          </Card>
        </div>

        {/* Beach Map */}
        <BeachMap />

        {/* Secciones resumen */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Eventos */}
          <Card className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Eventos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Participa en jornadas de limpieza y actividades ambientales.</p>
              <button
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition"
                onClick={() => router.push('/events')}
              >
                Ver más
              </button>
            </CardContent>
          </Card>

          {/* EcoShare */}
          <Card className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">EcoShare</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Comparte logros, fotos y experiencias con la comunidad EcoPlaya.</p>
              <button
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition"
                onClick={() => router.push('/ecoshare')}
              >
                Ver más
              </button>
            </CardContent>
          </Card>

          {/* Reportes */}
          <Card className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Reportes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Reporta problemas ambientales o visualiza reportes recientes.</p>
              <button
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition"
                onClick={() => router.push('/reports')}
              >
                Ver más
              </button>
            </CardContent>
          </Card>

          {/* Recompensas */}
          <Card className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recompensas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Canjea tus puntos por descuentos, premios y experiencias.</p>
              <button
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition"
                onClick={() => router.push('/rewards')}
              >
                Ver más
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
