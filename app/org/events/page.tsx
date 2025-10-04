"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, MessageCircle, Clock, CheckCircle2, XCircle, Plus } from "lucide-react"
import { mockEvents } from "@/lib/mock-data"

export default function OrgEventsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/auth")
      return
    }
    if (currentUser.role !== "organization") {
      router.push("/events")
      return
    }
    setUser(currentUser)
  }, [router])

  if (!user) {
    return null
  }

  // Filter events created by this organization
  const myEvents = mockEvents.filter(event => event.organizerId === user.id)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500"><CheckCircle2 className="mr-1 h-3 w-3" />Aprobado</Badge>
      case "pending":
        return <Badge variant="outline" className="border-yellow-500 text-yellow-600"><Clock className="mr-1 h-3 w-3" />Pendiente</Badge>
      case "rejected":
        return <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3" />Rechazado</Badge>
      case "completed":
        return <Badge variant="secondary"><CheckCircle2 className="mr-1 h-3 w-3" />Completado</Badge>
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Mis Eventos</h1>
          <p className="text-muted-foreground">Gestiona los eventos de {user.organizationName}</p>
        </div>
        <Button onClick={() => router.push("/org/create-event")}>
          <Plus className="mr-2 h-4 w-4" />
          Crear Evento
        </Button>
      </div>

      {/* Events Grid */}
      {myEvents.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {myEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative overflow-hidden bg-muted">
                <img
                  src={event.image}
                  alt={event.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-3 right-3">
                  {getStatusBadge(event.status)}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                <CardDescription className="line-clamp-2">{event.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  {event.date} - {event.time}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  {event.beachName}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="mr-2 h-4 w-4" />
                  {event.registeredUsers?.length || 0} / {event.maxVolunteers} voluntarios
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat grupal activo
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => router.push(`/events/${event.id}`)}
                  >
                    Ver Detalles
                  </Button>
                  {event.status === "approved" && (
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => router.push(`/events/${event.id}/chat`)}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Chat
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No tienes eventos creados</h3>
            <p className="text-muted-foreground mb-6">
              Crea tu primer evento para comenzar a organizar actividades de limpieza
            </p>
            <Button onClick={() => router.push("/org/create-event")}>
              <Plus className="mr-2 h-4 w-4" />
              Crear Primer Evento
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
