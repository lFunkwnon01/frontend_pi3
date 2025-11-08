"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Calendar, MapPin, Users, Clock, Award, MessageCircle, ArrowLeft, Send, CheckCircle2 } from "lucide-react"
import { mockEvents, mockEventChats, type Event, type EventChat } from "@/lib/mock-data"
import mockEventsAdvanced, { type EventAdvanced } from "@/lib/event-model"

export default function EventDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [event, setEvent] = useState<Event | null>(null)
  const [chat, setChat] = useState<EventChat | null>(null)
  const [isRegistered, setIsRegistered] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/auth")
      return
    }
    setUser(currentUser)

    // Find the event (legacy or advanced)
    const foundEvent = mockEvents.find(e => e.id === params.id)
    if (foundEvent) {
      setEvent(foundEvent)
      setIsRegistered(foundEvent.registeredUsers?.includes(currentUser.id) || false)
      const foundChat = mockEventChats.find(c => c.id === foundEvent.chatId)
      if (foundChat) setChat(foundChat)
      return
    }

    // Try advanced events
    const adv = mockEventsAdvanced.find((e: EventAdvanced) => e.id === params.id)
    if (adv) {
      const durationMs = adv.endDate ? Math.max(0, new Date(adv.endDate).getTime() - new Date(adv.startDate).getTime()) : 0
      const durationHours = durationMs ? Math.round(durationMs / (1000 * 60 * 60)) : 3
      const mapped: Event = {
        id: adv.id,
        title: adv.title,
        description: adv.description,
        beachId: "-",
        beachName: adv.location.playa,
        date: new Date(adv.startDate).toISOString().slice(0, 10),
        time: new Date(adv.startDate).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
        duration: `${durationHours} horas`,
        volunteers: 0,
        maxVolunteers: adv.capacity?.maxVolunteers || 0,
        organizer: adv.organizer.name,
        organizerId: adv.organizer.name,
        image: adv.images?.[0] || "/placeholder.svg",
        points: adv.benefits?.points || 0,
        status: adv.status === "upcoming" ? "approved" : adv.status === "past" ? "completed" : "pending",
        chatId: `adv-chat-${adv.id}`,
        registeredUsers: [],
      }
      setEvent(mapped)
      setIsRegistered(false)
      // Advanced events: no predefined chat; keep chat hidden
      return
    }
  }, [params.id, router])

  const handleRegister = () => {
    if (!event || !user) return

    if (isRegistered) {
      // Unregister
      toast({
        title: "Cancelaste tu inscripción",
        description: "Has sido removido de este evento.",
      })
      setIsRegistered(false)
    } else {
      // Register
      toast({
        title: "¡Inscripción exitosa!",
        description: `Te has inscrito al evento. Se han creado ${event.points} puntos pendientes de confirmación.`,
      })
      setIsRegistered(true)
    }
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !user) return

    toast({
      title: "Mensaje enviado",
      description: "Tu mensaje ha sido publicado en el chat.",
    })
    setMessage("")
  }

  if (!event || !user) {
    return (
      <div className="container mx-auto py-8 px-4">
        <p>Cargando...</p>
      </div>
    )
  }

  const canRegister = user.role === "user" && event.status === "approved"
  const canAccessChat = isRegistered || user.role === "organization" || user.role === "admin"
  const isOrganizer = user.id === event.organizerId

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        className="mb-4"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver
      </Button>

      {/* Event Header */}
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <div className="md:col-span-2">
          <div className="aspect-video relative overflow-hidden rounded-lg bg-muted mb-4">
            <img
              src={event.image}
              alt={event.title}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{event.title}</CardTitle>
            <CardDescription>{event.organizer}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{event.date} - {event.time}</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{event.duration}</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{event.beachName}</span>
              </div>
              <div className="flex items-center text-sm">
                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{event.registeredUsers?.length || 0} / {event.maxVolunteers} inscritos</span>
              </div>
              <div className="flex items-center text-sm">
                <Award className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{event.points} puntos</span>
              </div>
            </div>

            {canRegister && (
              <>
                <div className="pt-2">
                  <Button 
                    className="w-full" 
                    onClick={handleRegister}
                    variant={isRegistered ? "outline" : "default"}
                  >
                    {isRegistered ? (
                      <>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Cancelar Inscripción
                      </>
                    ) : (
                      <>
                        <Users className="mr-2 h-4 w-4" />
                        Inscribirse al Evento
                      </>
                    )}
                  </Button>
                </div>
                {isRegistered && (
                  <p className="text-xs text-muted-foreground text-center">
                    Recibirás los puntos al confirmar tu asistencia
                  </p>
                )}
              </>
            )}

            {isOrganizer && (
              <div className="pt-2 space-y-2">
                <Button 
                  className="w-full" 
                  onClick={() => router.push(`/org/events/${event.id}/attendance`)}
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Validar Asistencia
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Marca quién asistió al evento
                </p>
              </div>
            )}

            {event.status === "pending" && (
              <Badge variant="outline" className="w-full justify-center border-yellow-500 text-yellow-600">
                Pendiente de Aprobación
              </Badge>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Detalles</TabsTrigger>
          {canAccessChat && (
            <TabsTrigger value="chat">
              <MessageCircle className="mr-2 h-4 w-4" />
              Chat del Evento
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Descripción del Evento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {event.description}
              </p>

              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-3">Información Importante</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Llega 15 minutos antes del inicio</li>
                  <li>✓ Trae ropa cómoda y protector solar</li>
                  <li>✓ Se proporcionarán guantes y bolsas</li>
                  <li>✓ Trae tu propia agua</li>
                  <li>✓ La asistencia será validada al finalizar</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {canAccessChat && chat && (
          <TabsContent value="chat">
            <Card>
              <CardHeader>
                <CardTitle>Chat del Evento</CardTitle>
                <CardDescription>
                  {chat.participants.length} participantes
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Messages */}
                <div className="space-y-4 mb-4 max-h-[400px] overflow-y-auto">
                  {chat.messages.map((msg) => (
                    <div key={msg.id} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={msg.userAvatar} />
                        <AvatarFallback>{msg.userName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2">
                          <span className="font-medium text-sm">{msg.userName}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(msg.timestamp).toLocaleString()}
                          </span>
                          {msg.type === "announcement" && (
                            <Badge variant="secondary" className="text-xs">Anuncio</Badge>
                          )}
                          {msg.type === "system" && (
                            <Badge variant="outline" className="text-xs">Sistema</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Send Message Form */}
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    placeholder="Escribe un mensaje..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
