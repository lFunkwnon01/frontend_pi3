"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, CheckCircle2, Clock, Plus, TrendingUp } from "lucide-react"
import { mockEvents } from "@/lib/mock-data"

export default function OrgDashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/auth")
      return
    }
    if (currentUser.role !== "organization") {
      router.push("/dashboard")
      return
    }
    setUser(currentUser)
  }, [router])

  if (!user) {
    return null
  }

  // Filter events created by this organization
  const myEvents = mockEvents.filter(event => event.organizerId === user.id)
  const activeEvents = myEvents.filter(event => event.status === "approved")
  const pendingEvents = myEvents.filter(event => event.status === "pending")
  const completedEvents = myEvents.filter(event => event.status === "completed")
  
  const totalVolunteers = myEvents.reduce((sum, event) => sum + (event.registeredUsers?.length || 0), 0)

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{user.organizationName}</h1>
        <p className="text-muted-foreground text-base">Panel de Control de Organización</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Eventos Activos</CardTitle>
            <Calendar className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activeEvents.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Eventos aprobados</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pendientes</CardTitle>
            <Clock className="h-5 w-5 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingEvents.length}</div>
            <p className="text-xs text-muted-foreground mt-1">En revisión</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Voluntarios</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalVolunteers}</div>
            <p className="text-xs text-muted-foreground mt-1">Total inscritos</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completados</CardTitle>
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{completedEvents.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Eventos finalizados</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>Gestiona tus eventos y actividades</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              className="w-full justify-start" 
              onClick={() => router.push("/org/create-event")}
            >
              <Plus className="mr-2 h-4 w-4" />
              Crear Nuevo Evento
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => router.push("/org/events")}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Ver Mis Eventos
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => router.push("/reports")}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Ver Reportes de la Comunidad
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximos Eventos</CardTitle>
            <CardDescription>Tus eventos programados</CardDescription>
          </CardHeader>
          <CardContent>
            {activeEvents.length > 0 ? (
              <div className="space-y-4">
                {activeEvents.slice(0, 3).map(event => (
                  <div key={event.id} className="flex items-start space-x-3 border-b pb-3 last:border-0 last:pb-0">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.date} • {event.registeredUsers?.length || 0}/{event.maxVolunteers} voluntarios
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No tienes eventos activos</p>
                <Button 
                  variant="link" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => router.push("/org/create-event")}
                >
                  Crear tu primer evento
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Info Banner */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            Cuenta Verificada
          </CardTitle>
          <CardDescription>
            Tu organización está verificada y puede crear eventos públicos en EcoPlaya
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
