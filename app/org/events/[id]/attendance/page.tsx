"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, CheckCircle2, Users, Award } from "lucide-react"
import { mockEvents } from "@/lib/mock-data"

// Mock user data for registered users
const mockRegisteredUsers = [
  { id: "1", name: "Juan Pérez", email: "juan@example.com", avatar: "/abstract-profile.png" },
  { id: "2", name: "María González", email: "maria@example.com", avatar: "/abstract-profile.png" },
]

export default function AttendanceValidationPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [event, setEvent] = useState<any>(null)
  const [attendees, setAttendees] = useState<Record<string, boolean>>({})

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

    // Find the event
    const foundEvent = mockEvents.find(e => e.id === params.id)
    if (foundEvent) {
      if (foundEvent.organizerId !== currentUser.id) {
        toast({
          title: "Acceso denegado",
          description: "Solo el organizador puede validar la asistencia.",
          variant: "destructive",
        })
        router.push("/org/events")
        return
      }
      setEvent(foundEvent)

      // Initialize attendance state
      const initialAttendance: Record<string, boolean> = {}
      foundEvent.registeredUsers?.forEach((userId: string) => {
        initialAttendance[userId] = false
      })
      setAttendees(initialAttendance)
    }
  }, [params.id, router, toast])

  const handleToggleAttendance = (userId: string) => {
    setAttendees(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }))
  }

  const handleConfirmAttendance = () => {
    const attendedCount = Object.values(attendees).filter(Boolean).length
    
    toast({
      title: "Asistencia Confirmada",
      description: `${attendedCount} voluntarios recibirán ${event.points} puntos cada uno.`,
    })

    // Simulate API call
    setTimeout(() => {
      router.push("/org/events")
    }, 1500)
  }

  if (!event || !user) {
    return (
      <div className="container mx-auto py-8 px-4">
        <p>Cargando...</p>
      </div>
    )
  }

  const registeredUsers = mockRegisteredUsers.filter(u => 
    event.registeredUsers?.includes(u.id)
  )

  const attendedCount = Object.values(attendees).filter(Boolean).length
  const totalRegistered = registeredUsers.length

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        className="mb-4"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver
      </Button>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Validar Asistencia</h1>
        <p className="text-muted-foreground">{event.title}</p>
      </div>

      {/* Stats Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Resumen</CardTitle>
          <CardDescription>Información del evento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <Users className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-2xl font-bold">{totalRegistered}</p>
              <p className="text-sm text-muted-foreground">Inscritos</p>
            </div>
            <div>
              <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold">{attendedCount}</p>
              <p className="text-sm text-muted-foreground">Asistieron</p>
            </div>
            <div>
              <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{event.points}</p>
              <p className="text-sm text-muted-foreground">Puntos c/u</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance List */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Lista de Voluntarios</CardTitle>
          <CardDescription>Marca a los voluntarios que asistieron al evento</CardDescription>
        </CardHeader>
        <CardContent>
          {registeredUsers.length > 0 ? (
            <div className="space-y-4">
              {registeredUsers.map((registeredUser) => (
                <div 
                  key={registeredUser.id} 
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id={`user-${registeredUser.id}`}
                      checked={attendees[registeredUser.id] || false}
                      onCheckedChange={() => handleToggleAttendance(registeredUser.id)}
                    />
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={registeredUser.avatar} />
                      <AvatarFallback>
                        {registeredUser.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{registeredUser.name}</p>
                      <p className="text-sm text-muted-foreground">{registeredUser.email}</p>
                    </div>
                  </div>
                  {attendees[registeredUser.id] && (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No hay voluntarios inscritos en este evento</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      {registeredUsers.length > 0 && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-semibold">
                  {attendedCount} de {totalRegistered} voluntarios marcados
                </p>
                <p className="text-sm text-muted-foreground">
                  Se otorgarán {attendedCount * event.points} puntos en total
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => router.back()}
              >
                Cancelar
              </Button>
              <Button
                className="flex-1"
                onClick={handleConfirmAttendance}
                disabled={attendedCount === 0}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Confirmar Asistencia
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
