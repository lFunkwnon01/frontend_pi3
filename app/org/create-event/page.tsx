"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { mockBeaches } from "@/lib/mock-data"
import { Calendar, MapPin, Users, Clock, Award } from "lucide-react"

export default function CreateEventPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "¡Evento creado!",
      description: "Tu evento ha sido enviado para revisión. Te notificaremos cuando sea aprobado.",
    })

    setIsSubmitting(false)
    router.push("/org/events")
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Crear Nuevo Evento</h1>
        <p className="text-muted-foreground">
          Organiza una actividad de limpieza y ayuda a proteger nuestras playas
        </p>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Información del Evento</CardTitle>
          <CardDescription>
            Completa los detalles del evento. Será revisado antes de publicarse.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Título del Evento *</Label>
              <Input
                id="title"
                placeholder="Ej: Limpieza Masiva Playa Miraflores"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Descripción *</Label>
              <Textarea
                id="description"
                placeholder="Describe las actividades que se realizarán..."
                rows={4}
                required
              />
            </div>

            {/* Beach Selection */}
            <div className="space-y-2">
              <Label htmlFor="beach">Playa *</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una playa" />
                </SelectTrigger>
                <SelectContent>
                  {mockBeaches.map((beach) => (
                    <SelectItem key={beach.id} value={beach.id}>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {beach.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date and Time */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date">Fecha *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="date"
                    type="date"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Hora de Inicio *</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="time"
                    type="time"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Duration and Max Volunteers */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="duration">Duración</Label>
                <Input
                  id="duration"
                  placeholder="Ej: 4 horas"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxVolunteers">Máximo de Voluntarios *</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="maxVolunteers"
                    type="number"
                    min="1"
                    placeholder="100"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Points */}
            <div className="space-y-2">
              <Label htmlFor="points">Puntos a Otorgar *</Label>
              <div className="relative">
                <Award className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="points"
                  type="number"
                  min="50"
                  max="100"
                  placeholder="70"
                  className="pl-10"
                  required
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Recomendado: 50-80 puntos por evento
              </p>
            </div>

            {/* Image URL (optional) */}
            <div className="space-y-2">
              <Label htmlFor="image">URL de Imagen (Opcional)</Label>
              <Input
                id="image"
                type="url"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              <p className="text-sm text-muted-foreground">
                Imagen representativa del evento
              </p>
            </div>

            {/* Info Card */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <p className="text-sm text-blue-900">
                  <strong>Nota:</strong> Tu evento será revisado por el equipo de EcoPlaya antes de 
                  ser publicado. Esto puede tomar hasta 24 horas. Recibirás una notificación cuando 
                  sea aprobado.
                </p>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => router.push("/org/events")}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creando..." : "Crear Evento"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
