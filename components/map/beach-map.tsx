"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, AlertTriangle, CheckCircle, Clock, Eye, Filter, Map } from "lucide-react"
import { mockBeaches, type Beach, mockDistrictMarkers, type DistrictMarker, mockEvents } from "@/lib/mock-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface BeachMapProps {
  onBeachSelect?: (beach: Beach) => void
}

export function BeachMap({ onBeachSelect }: BeachMapProps) {
  const [selectedBeach, setSelectedBeach] = useState<Beach | null>(null)
  const [beaches, setBeaches] = useState<Beach[]>([])
  const [showUrgentOnly, setShowUrgentOnly] = useState(false)
  const [showUpcomingEvents, setShowUpcomingEvents] = useState(true)
  const [district, setDistrict] = useState<string>("")
  const [popup, setPopup] = useState<{ top: number; left: number; beach: Beach } | null>(null)
  const router = useRouter()
  const [bgOk, setBgOk] = useState(true)

  useEffect(() => {
    setBeaches(mockBeaches)
  }, [])

  const filteredBeaches = useMemo(() => {
    return beaches.filter((b) => {
      if (showUrgentOnly && b.status !== "dirty") return false
      if (district && !b.name.toLowerCase().includes(district.toLowerCase())) return false
      return true
    })
  }, [beaches, showUrgentOnly, district])

  const beachesWithEvents = useMemo(() => {
    const beachIdsWithEvents = new Set(mockEvents.map((e) => e.beachId))
    return filteredBeaches.filter((b) => beachIdsWithEvents.has(b.id))
  }, [filteredBeaches])

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

  const handleBeachClick = (beach: Beach, pos?: { top: number; left: number }) => {
    setSelectedBeach(beach)
    onBeachSelect?.(beach)
    if (pos) setPopup({ ...pos, beach })
  }

  return (
    <div className="space-y-6">
      {/* Map Legend */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <CardTitle>Mapa de Playas</CardTitle>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
              <Filter className="h-4 w-4" />
              Filtros rápidos
            </div>
          </div>
          <CardDescription>Haz clic en un marcador para ver detalles y eventos</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <label className="flex items-center gap-2 text-sm">
              <Checkbox checked={showUrgentOnly} onCheckedChange={(v) => setShowUrgentOnly(!!v)} />
              Ver solo urgente
            </label>
            <label className="flex items-center gap-2 text-sm">
              <Checkbox checked={showUpcomingEvents} onCheckedChange={(v) => setShowUpcomingEvents(!!v)} />
              Ver eventos próximos en el mapa
            </label>
            <div className="flex items-center gap-2 text-sm">
              <span>Distrito</span>
              <Select value={district || "all"} onValueChange={(v) => setDistrict(v === "all" ? "" : v)}>
                <SelectTrigger className="w-[160px]"><SelectValue placeholder="Todos" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="Miraflores">Miraflores</SelectItem>
                  <SelectItem value="Barranco">Barranco</SelectItem>
                  <SelectItem value="Chorrillos">Chorrillos</SelectItem>
                  <SelectItem value="San Miguel">San Miguel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

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
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm">Eventos próximos</span>
            </div>
          </div>

          {/* Imagen real de mapa de Costa Verde con marcadores interactivos */}
          <div className="relative rounded-lg h-[30rem] md:h-[36rem] overflow-hidden flex items-center justify-center bg-gray-100">
            {bgOk ? (
              <img src="/costa_verde.png" alt="Mapa Costa Verde" className="object-cover w-full h-full" onError={() => setBgOk(false)} />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-teal-50" />
            )}

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

              {/* Beach markers based on filters */}
              {filteredBeaches.map((b) => {
                const minLat = -12.20
                const maxLat = -12.05
                const minLng = -77.10
                const maxLng = -77.01
                const latRange = maxLat - minLat
                const lngRange = maxLng - minLng
                const top = ((maxLat - b.location.lat) / latRange) * 100
                const left = ((b.location.lng - minLng) / lngRange) * 100
                return (
                  <div key={`beach-${b.id}`} className="absolute" style={{ left: `${left}%`, top: `${top}%`, transform: "translate(-50%, -100%)" }}>
                    <button
                      className={`pointer-events-auto w-4 h-4 rounded-full ring-4 ${b.status === 'dirty' ? 'bg-red-500 ring-red-200/70' : b.status === 'regular' ? 'bg-yellow-500 ring-yellow-200/70' : 'bg-green-500 ring-green-200/70'}`}
                      title={b.name}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleBeachClick(b, { top, left })
                      }}
                    />
                  </div>
                )
              })}

              {/* Upcoming events markers (blue) */}
              {showUpcomingEvents && beachesWithEvents.map((b) => {
                const minLat = -12.20
                const maxLat = -12.05
                const minLng = -77.10
                const maxLng = -77.01
                const latRange = maxLat - minLat
                const lngRange = maxLng - minLng
                const top = ((maxLat - b.location.lat) / latRange) * 100
                const left = ((b.location.lng - minLng) / lngRange) * 100
                return (
                  <div key={`event-${b.id}`} className="absolute" style={{ left: `${left}%`, top: `${top}%`, transform: "translate(-50%, -50%)" }}>
                    <button
                      className="pointer-events-auto w-6 h-6 flex items-center justify-center rounded-full bg-blue-600 text-white ring-4 ring-blue-200/60 shadow"
                      title={`Eventos en ${b.name}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleBeachClick(b, { top, left })
                      }}
                    >
                      <Map className="w-3 h-3" />
                    </button>
                  </div>
                )
              })}

              {/* Popup card near marker */}
              {popup && (
                <div
                  className="absolute pointer-events-auto"
                  style={{ left: `${popup.left}%`, top: `${popup.top}%`, transform: "translate(-50%, calc(-100% - 12px))" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="bg-white rounded-lg shadow-xl border w-64 overflow-hidden">
                    <img src="/placeholder.jpg" alt={popup.beach.name} className="w-full h-24 object-cover" />
                    <div className="p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-sm">{popup.beach.name}</div>
                        <Badge variant={getStatusVariant(popup.beach.status)}>{getStatusText(popup.beach.status)}</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">Último reporte: {new Date(popup.beach.lastUpdated).toLocaleDateString('es-PE')}</div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1" onClick={() => router.push(`/events?distrito=${encodeURIComponent(popup.beach.name.split(' ')[1] || '')}`)}>
                          Ver eventos disponibles
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setPopup(null)}>Cerrar</Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Beach Details (panel) */}
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
