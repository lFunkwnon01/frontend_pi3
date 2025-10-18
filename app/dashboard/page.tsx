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

        {/* Sección educativa: capacitación y aprendizaje (ahora al fondo) */}
        <section className="py-12">
          <h2 className="text-3xl font-bold text-primary mb-8">Capacitación y Aprendizaje</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="flex flex-col">
              <div className="relative h-48 w-full bg-gray-200 flex items-center justify-center">
                <img src="/placeholder-video.jpg" alt="Video educativo" className="h-full w-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/80 rounded-full p-3 shadow">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7L8 5z" fill="#2563eb"/></svg>
                  </div>
                </div>
              </div>
              <CardHeader>
                <CardTitle>¿Cómo limpiar playas de forma segura?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-2">Aprende los pasos y precauciones para realizar una limpieza efectiva y segura en la playa.</p>
                <ul className="list-disc ml-4 text-muted-foreground text-xs space-y-1">
                  <li>Usa guantes y tapaboca en todo momento.</li>
                  <li>Evita el contacto directo con objetos punzantes o cortantes.</li>
                  <li>Desinfecta tus manos al terminar la jornada.</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="flex flex-col">
              <div className="relative h-48 w-full bg-gray-200 flex items-center justify-center">
                <img src="/placeholder-video.jpg" alt="Video educativo" className="h-full w-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/80 rounded-full p-3 shadow">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7L8 5z" fill="#2563eb"/></svg>
                  </div>
                </div>
              </div>
              <CardHeader>
                <CardTitle>Prevención de riesgos y focos infecciosos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-2">Consejos para evitar accidentes y enfermedades durante las jornadas de limpieza.</p>
                <ul className="list-disc ml-4 text-muted-foreground text-xs space-y-1">
                  <li>Evita tocar jeringas, vidrios rotos o residuos médicos.</li>
                  <li>Usa calzado cerrado para evitar lesiones.</li>
                  <li>Reporta cualquier foco infeccioso a las autoridades.</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="flex flex-col">
              <div className="relative h-48 w-full bg-gray-200 flex items-center justify-center">
                <img src="/placeholder-video.jpg" alt="Video educativo" className="h-full w-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/80 rounded-full p-3 shadow">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7L8 5z" fill="#2563eb"/></svg>
                  </div>
                </div>
              </div>
              <CardHeader>
                <CardTitle>Malaguas y medusas en la costa peruana</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-2">Identifica riesgos y aprende cómo actuar ante la presencia de estos animales.</p>
                <ul className="list-disc ml-4 text-muted-foreground text-xs space-y-1">
                  <li>Evita el contacto con medusas/malaguas.</li>
                  <li>Si eres picado, lava la zona con agua salada y busca atención médica.</li>
                  <li>Infórmate sobre la temporada de mayor presencia.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
