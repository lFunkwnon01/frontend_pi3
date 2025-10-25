"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, AlertTriangle, CheckCircle, Clock, Eye } from "lucide-react"
import { mockBeaches, type Beach, mockDistrictMarkers, type DistrictMarker } from "@/lib/mock-data"

interface BeachMapProps {
  onBeachSelect?: (beach: Beach) => void
}

export function BeachMap({ onBeachSelect }: BeachMapProps) {
  const [selectedBeach, setSelectedBeach] = useState<Beach | null>(null)
  const [beaches, setBeaches] = useState<Beach[]>([])
  const router = useRouter()

  useEffect(() => {
    setBeaches(mockBeaches)
  }, [])

  const getStatusColor = (status: Beach["status"]) => {
    switch (status) {
      case "clean":
        return "bg-green-500"
      case "regular":
        return "bg-yellow-500"
      case "dirty":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: Beach["status"]) => {
    switch (status) {
      case "clean":
        return <CheckCircle className="h-4 w-4" />
      case "regular":
        return <Clock className="h-4 w-4" />
      case "dirty":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  const getStatusText = (status: Beach["status"]) => {
    switch (status) {
      case "clean":
        return "Limpia"
      case "regular":
        return "Regular"
      case "dirty":
        return "Necesita Limpieza"
      default:
        return "Sin datos"
    }
  }

  const getStatusVariant = (status: Beach["status"]) => {
    switch (status) {
      case "clean":
        return "default" as const
      case "regular":
        return "secondary" as const
      case "dirty":
        return "destructive" as const
      default:
        return "outline" as const
    }
  }

  const handleBeachClick = (beach: Beach) => {
    setSelectedBeach(beach)
    onBeachSelect?.(beach)
  }

  return (
    <div className="space-y-6">
      {/* Map Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Mapa de Playas</span>
          </CardTitle>
          <CardDescription>Haz clic en una playa para ver más detalles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm">Limpia</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm">Regular</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm">Necesita Limpieza</span>
            </div>
          </div>

          {/* Imagen real de mapa de Costa Verde con marcadores interactivos */}
          <div className="relative rounded-lg h-[30rem] md:h-[36rem] overflow-hidden flex items-center justify-center bg-gray-100">
            <img src="/costa_verde.png" alt="Mapa Costa Verde" className="object-cover w-full h-full" />

            {/* Overlay markers: position absolutely using a simple lat/lng -> percentage transform within a predefined bbox (mock) */}
            <div className="absolute inset-0 pointer-events-none">
              {mockDistrictMarkers.map((m: DistrictMarker) => {
                // Mock bounding box for Costa Verde area (approx)
                const minLat = -12.20 // south
                const maxLat = -12.05 // north
                const minLng = -77.10 // west
                const maxLng = -77.01 // east

                const latRange = maxLat - minLat
                const lngRange = maxLng - minLng

                // Convert lat/lng to percentage positions (top/left)
                const top = ((maxLat - m.lat) / latRange) * 100
                const left = ((m.lng - minLng) / lngRange) * 100

                const isPrimary = m.color === "primary"

                return (
                  <div
                    key={m.id}
                    className="absolute"
                    style={{ left: `${left}%`, top: `${top}%`, transform: "translate(-50%, -50%)" }}
                  >
                    {isPrimary ? (
                      // Accessible button-like marker for Chorrillos
                      <button
                        title={`Ver aliados en ${m.nombre_distrito}`}
                        aria-label={`Ver aliados en ${m.nombre_distrito}`}
                        className="pointer-events-auto w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-green-600 text-white ring-4 ring-green-200/60 shadow-lg"
                        onClick={() => router.push(`/aliados?distrito=${encodeURIComponent(m.nombre_distrito.toLowerCase())}`)}
                      >
                        <span className="sr-only">Ver aliados en {m.nombre_distrito}</span>
                        {/* Visible short label inside the circle (initials) */}
                        <span className="text-sm font-semibold">{m.nombre_distrito.split(" ")[0]}</span>
                      </button>
                    ) : (
                      // Secondary marker: small turquoise dot, clickable area larger for accessibility
                      <div className="pointer-events-auto flex items-center space-x-2">
                        <button
                          title={m.nombre_distrito}
                          aria-label={m.nombre_distrito}
                          className="w-3 h-3 min-w-[24px] min-h-[24px] md:min-w-[28px] md:min-h-[28px] rounded-full bg-teal-400/90 shadow"
                          onClick={() => router.push(`/aliados?distrito=${encodeURIComponent(m.nombre_distrito.toLowerCase())}`)}
                        />
                        <span className="hidden md:inline text-xs text-muted-foreground">{m.nombre_distrito}</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Beach Details */}
      {selectedBeach && (
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>{selectedBeach.name}</span>
                </CardTitle>
                <CardDescription className="mt-2">{selectedBeach.description}</CardDescription>
              </div>
              <Badge variant={getStatusVariant(selectedBeach.status)} className="flex items-center space-x-1">
                {getStatusIcon(selectedBeach.status)}
                <span>{getStatusText(selectedBeach.status)}</span>
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{selectedBeach.reports}</div>
                <div className="text-sm text-muted-foreground">Reportes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {new Date(selectedBeach.lastUpdated).toLocaleDateString()}
                </div>
                <div className="text-sm text-muted-foreground">Última actualización</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {selectedBeach.location.lat.toFixed(4)}, {selectedBeach.location.lng.toFixed(4)}
                </div>
                <div className="text-sm text-muted-foreground">Coordenadas</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button className="flex-1">
                <Eye className="h-4 w-4 mr-2" />
                Ver Reportes
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Reportar Problema
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Beach List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Playas</CardTitle>
          <CardDescription>Todas las playas monitoreadas en la plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {beaches.map((beach) => (
              <div
                key={beach.id}
                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors hover:bg-muted ${
                  selectedBeach?.id === beach.id ? "bg-muted border-primary" : ""
                }`}
                onClick={() => handleBeachClick(beach)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(beach.status)}`}></div>
                  <div>
                    <div className="font-medium">{beach.name}</div>
                    <div className="text-sm text-muted-foreground">{beach.reports} reportes</div>
                  </div>
                </div>
                <Badge variant={getStatusVariant(beach.status)}>{getStatusText(beach.status)}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
