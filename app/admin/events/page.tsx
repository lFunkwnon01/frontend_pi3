"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Calendar, MapPin, Users, CheckCircle2, XCircle, Clock, Award } from "lucide-react"
import { mockEvents } from "@/lib/mock-data"

export default function AdminEventsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/auth")
      return
    }
    if (currentUser.role !== "admin") {
      router.push("/dashboard")
      return
    }
    setUser(currentUser)
  }, [router])

  if (!user) {
    return null
  }

  const pendingEvents = mockEvents.filter(e => e.status === "pending")
  const approvedEvents = mockEvents.filter(e => e.status === "approved")
  const rejectedEvents = mockEvents.filter(e => e.status === "rejected")
  const completedEvents = mockEvents.filter(e => e.status === "completed")

  const handleApproveEvent = (eventId: string, eventTitle: string) => {
    toast({
      title: "Evento Aprobado",
      description: `"${eventTitle}" ha sido aprobado y publicado.`,
    })
  }

  const handleRejectEvent = (eventId: string) => {
    toast({
      title: "Evento Rechazado",
      description: "El evento ha sido rechazado.",
      variant: "destructive",
    })
  }

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
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Gestión de Eventos</h1>
        <p className="text-muted-foreground text-base">Aprueba, rechaza y gestiona los eventos de la plataforma</p>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">
            Pendientes
            {pendingEvents.length > 0 && (
              <Badge variant="destructive" className="ml-2">{pendingEvents.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved">Aprobados ({approvedEvents.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rechazados ({rejectedEvents.length})</TabsTrigger>
          <TabsTrigger value="completed">Completados ({completedEvents.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingEvents.length > 0 ? (
            pendingEvents.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="mb-2">{event.title}</CardTitle>
                      <CardDescription>{event.description}</CardDescription>
                    </div>
                    {getStatusBadge(event.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Organización</p>
                      <p className="font-medium">{event.organizer}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Fecha</p>
                      <p className="font-medium">{event.date}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Playa</p>
                      <p className="font-medium">{event.beachName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Capacidad</p>
                      <p className="font-medium">{event.maxVolunteers} personas</p>
                    </div>
                  </div>

                  <div className="aspect-video relative overflow-hidden rounded-lg bg-muted">
                    <img src={event.image} alt={event.title} className="object-cover w-full h-full" />
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={() => handleApproveEvent(event.id, event.title)} className="flex-1">
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Aprobar Evento
                    </Button>
                    <Button variant="destructive" onClick={() => handleRejectEvent(event.id)} className="flex-1">
                      <XCircle className="mr-2 h-4 w-4" />
                      Rechazar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <CheckCircle2 className="h-16 w-16 mx-auto mb-4 text-green-500" />
                <h3 className="text-xl font-semibold mb-2">¡Todo al día!</h3>
                <p className="text-muted-foreground">No hay eventos pendientes de revisión</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {approvedEvents.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  {getStatusBadge(event.status)}
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{event.beachName}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{event.registeredUsers?.length || 0} / {event.maxVolunteers}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => router.push(`/events/${event.id}`)}>
                    Ver Detalles
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rejectedEvents.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  {getStatusBadge(event.status)}
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{event.beachName}</span>
                  </div>
                  <p className="text-muted-foreground">Organizado por {event.organizer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {completedEvents.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  {getStatusBadge(event.status)}
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{event.registeredUsers?.length || 0} asistentes</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{event.points} puntos otorgados</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
