"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin, Users, Award, CheckCircle, ExternalLink } from "lucide-react"
import type { Event } from "@/lib/mock-data"

interface EventCardProps {
  event: Event
  onRegister?: (eventId: string) => void
  isRegistered?: boolean
}

export function EventCard({ event, onRegister, isRegistered = false }: EventCardProps) {
  const router = useRouter()
  const [isRegistering, setIsRegistering] = useState(false)

  const handleRegister = async () => {
    setIsRegistering(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onRegister?.(event.id)
    setIsRegistering(false)
  }

  const handleViewDetails = () => {
    router.push(`/events/${event.id}`)
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getVolunteerPercentage = () => {
    return Math.round((event.volunteers / event.maxVolunteers) * 100)
  }

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4">
          <Badge className="bg-primary/90 text-primary-foreground">
            <Award className="h-3 w-3 mr-1" />
            {event.points} pts
          </Badge>
        </div>
      </div>

      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{event.title}</CardTitle>
            <CardDescription className="text-sm">{event.description}</CardDescription>
            <div className="mt-2 text-xs text-primary font-semibold">
              Incluye kit de limpieza básico: bolsa, guantes y tapaboca.
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Event Details */}
        <div className="space-y-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{formatDate(event.date)}</span>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            <span>
              {event.time} - {event.duration}
            </span>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{event.beachName}</span>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-2" />
            <span>
              {event.volunteers} / {event.maxVolunteers} voluntarios
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Participación</span>
            <span className="font-medium">{getVolunteerPercentage()}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${getVolunteerPercentage()}%` }}
            />
          </div>
        </div>

  {/* Kit básico info (mobile/desktop) */}
        <div className="flex items-center space-x-2 pt-2 border-t">
          <Avatar className="h-6 w-6">
            <AvatarImage src="/placeholder.svg" alt={event.organizer} />
            <AvatarFallback className="text-xs">
              {event.organizer
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">Organizado por {event.organizer}</span>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 space-y-2">
          <Button
            onClick={handleViewDetails}
            variant="outline"
            className="w-full"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Ver Detalles
          </Button>
          
          {!isRegistered && (
            <Button
              onClick={handleRegister}
              disabled={isRegistering || event.volunteers >= event.maxVolunteers}
              className="w-full"
            >
              {isRegistering ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Registrando...
                </>
              ) : event.volunteers >= event.maxVolunteers ? (
                "Evento Completo"
              ) : (
                <>
                  <Users className="h-4 w-4 mr-2" />
                  Unirse al Evento
                </>
              )}
            </Button>
          )}
          
          {isRegistered && (
            <Button disabled className="w-full">
              <CheckCircle className="h-4 w-4 mr-2" />
              Ya estás registrado
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
