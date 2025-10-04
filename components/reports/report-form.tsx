"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, MapPin, Upload, CheckCircle } from "lucide-react"
import { mockBeaches, type Beach } from "@/lib/mock-data"

interface ReportFormProps {
  selectedBeach?: Beach
  onSuccess?: () => void
}

export function ReportForm({ selectedBeach, onSuccess }: ReportFormProps) {
  const [formData, setFormData] = useState({
    beachId: selectedBeach?.id || "",
    type: "",
    description: "",
    image: null as File | null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSuccess(true)

    // Reset form after success
    setTimeout(() => {
      setIsSuccess(false)
      setFormData({
        beachId: selectedBeach?.id || "",
        type: "",
        description: "",
        image: null,
      })
      onSuccess?.()
    }, 2000)
  }

  if (isSuccess) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h3 className="text-2xl font-bold text-green-600">¡Reporte Enviado!</h3>
            <p className="text-muted-foreground">
              Gracias por contribuir al cuidado de nuestras playas. Tu reporte será revisado por nuestro equipo.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800">
                <strong>+25 puntos</strong> agregados a tu cuenta por reportar
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Camera className="h-5 w-5" />
          <span>Reportar Problema Ambiental</span>
        </CardTitle>
        <CardDescription>
          Ayúdanos a mantener nuestras playas limpias reportando problemas que encuentres
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Beach Selection */}
          <div className="space-y-2">
            <Label htmlFor="beach">Playa</Label>
            <Select
              value={formData.beachId}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, beachId: value }))}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una playa" />
              </SelectTrigger>
              <SelectContent>
                {mockBeaches.map((beach) => (
                  <SelectItem key={beach.id} value={beach.id}>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{beach.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Report Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Reporte</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el tipo de problema" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trash">Acumulación de Basura</SelectItem>
                <SelectItem value="pollution">Contaminación del Agua</SelectItem>
                <SelectItem value="infrastructure">Infraestructura Dañada</SelectItem>
                <SelectItem value="wildlife">Problema con Fauna Marina</SelectItem>
                <SelectItem value="other">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Descripción del Problema</Label>
            <Textarea
              id="description"
              placeholder="Describe detalladamente el problema que encontraste..."
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="min-h-[100px]"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image">Foto del Problema</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <input id="image" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              <label htmlFor="image" className="cursor-pointer">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-2">
                  {formData.image ? formData.image.name : "Haz clic para subir una foto"}
                </p>
                <p className="text-xs text-muted-foreground">PNG, JPG hasta 10MB</p>
              </label>
            </div>
          </div>

          {/* Location Info */}
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Ubicación</span>
            </div>
            <p className="text-sm text-muted-foreground">
              La ubicación se detectará automáticamente cuando envíes el reporte
            </p>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Enviando Reporte...
              </>
            ) : (
              <>
                <Camera className="h-4 w-4 mr-2" />
                Enviar Reporte
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
