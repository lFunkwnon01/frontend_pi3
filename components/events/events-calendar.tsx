"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EventCard } from "./event-card"
import { Calendar, Grid, List, Filter } from "lucide-react"
import { mockEvents, type Event } from "@/lib/mock-data"

export function EventsCalendar() {
  const [events, setEvents] = useState<Event[]>([])
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([])
  const [filter, setFilter] = useState<"all" | "upcoming" | "registered">("all")

  useEffect(() => {
    setEvents(mockEvents)
    // Load registered events from localStorage
    const registered = JSON.parse(localStorage.getItem("registeredEvents") || "[]")
    setRegisteredEvents(registered)
  }, [])

  const handleRegister = (eventId: string) => {
    const newRegistered = [...registeredEvents, eventId]
    setRegisteredEvents(newRegistered)
    localStorage.setItem("registeredEvents", JSON.stringify(newRegistered))

    // Update event volunteer count
    setEvents((prev) =>
      prev.map((event) => (event.id === eventId ? { ...event, volunteers: event.volunteers + 1 } : event)),
    )
  }

  const filteredEvents = events.filter((event) => {
    switch (filter) {
      case "upcoming":
        return new Date(event.date) >= new Date()
      case "registered":
        return registeredEvents.includes(event.id)
      default:
        return true
    }
  })

  const upcomingEvents = events.filter((event) => new Date(event.date) >= new Date())
  const myEvents = events.filter((event) => registeredEvents.includes(event.id))

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{upcomingEvents.length}</div>
              <div className="text-sm text-muted-foreground">Eventos Próximos</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{myEvents.length}</div>
              <div className="text-sm text-muted-foreground">Mis Eventos</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {myEvents.reduce((sum, event) => sum + event.points, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Puntos Potenciales</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Events Tabs */}
      <Tabs defaultValue="grid" className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <TabsList>
            <TabsTrigger value="grid" className="flex items-center space-x-2">
              <Grid className="h-4 w-4" />
              <span>Cuadrícula</span>
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center space-x-2">
              <List className="h-4 w-4" />
              <span>Lista</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Calendario</span>
            </TabsTrigger>
          </TabsList>

          {/* Filter Buttons */}
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
              Todos
            </Button>
            <Button
              variant={filter === "upcoming" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("upcoming")}
            >
              Próximos
            </Button>
            <Button
              variant={filter === "registered" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("registered")}
            >
              Mis Eventos
            </Button>
          </div>
        </div>

        <TabsContent value="grid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRegister={handleRegister}
                isRegistered={registeredEvents.includes(event.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Eventos</CardTitle>
              <CardDescription>Todos los eventos de limpieza disponibles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.beachName}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-muted-foreground">
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                          <Badge variant="outline">
                            {event.volunteers}/{event.maxVolunteers} voluntarios
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge>{event.points} pts</Badge>
                      <Button
                        size="sm"
                        disabled={registeredEvents.includes(event.id)}
                        onClick={() => handleRegister(event.id)}
                      >
                        {registeredEvents.includes(event.id) ? "Registrado" : "Unirse"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Vista de Calendario</CardTitle>
              <CardDescription>Eventos organizados por fecha</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Group events by month */}
                {Object.entries(
                  filteredEvents.reduce(
                    (acc, event) => {
                      const month = new Date(event.date).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                      })
                      if (!acc[month]) acc[month] = []
                      acc[month].push(event)
                      return acc
                    },
                    {} as Record<string, Event[]>,
                  ),
                ).map(([month, monthEvents]) => (
                  <div key={month}>
                    <h3 className="text-lg font-semibold mb-4 capitalize">{month}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {monthEvents.map((event) => (
                        <div key={event.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{event.title}</h4>
                            <Badge variant="outline">{new Date(event.date).getDate()}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{event.beachName}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">{event.time}</span>
                            <Button
                              size="sm"
                              disabled={registeredEvents.includes(event.id)}
                              onClick={() => handleRegister(event.id)}
                            >
                              {registeredEvents.includes(event.id) ? "Registrado" : "Unirse"}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
