"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, Heart, MessageCircle, Share2, Users, Calendar, MapPin, Film, Download, Clock, Hash } from "lucide-react"
import Image from "next/image"
import TestimonialsSection from "@/components/ecoshare/testimonials"
import BeforeAfterSlider from "@/components/ecoshare/before-after"
import PhotoContest from "@/components/ecoshare/contest"

interface EventAlbum {
  id: string
  eventId: string
  eventTitle: string
  eventDate: string
  location: string
  participants: number
  photos: number
  comments: number
  likes: number
  status: "collecting" | "generating" | "completed"
  daysLeft?: number
  videoUrl?: string
  coverPhoto: string
  recentPhotos: string[]
  hashtags: string[]
}

export default function EcoSharePage() {
  const user = getCurrentUser()
  const router = useRouter()
  const [selectedTag, setSelectedTag] = useState<string>("")

  const albums: EventAlbum[] = [
    {
      id: "1",
      eventId: "1",
      eventTitle: "Limpieza Masiva Playa Miraflores",
      eventDate: "2024-01-20",
      location: "Playa Miraflores",
      participants: 45,
      photos: 127,
      comments: 34,
      likes: 156,
      status: "collecting",
      daysLeft: 2,
      coverPhoto: "/beach-cleanup-volunteers.png",
      recentPhotos: [
        "/beach-cleanup-volunteers.png",
        "/beach-trash-bottles.jpg",
        "/placeholder.jpg",
        "/placeholder.jpg",
      ],
      hashtags: ["#LimpioMiraflores", "#EcoShare", "#CostaLimpia"],
    },
    {
      id: "2",
      eventId: "2",
      eventTitle: "Restauración de Dunas - Playa Barranco",
      eventDate: "2024-01-15",
      location: "Playa Barranco",
      participants: 32,
      photos: 89,
      comments: 28,
      likes: 142,
      status: "completed",
      coverPhoto: "/dune-restoration-planting.jpg",
      videoUrl: "/videos/barranco-cleanup.mp4",
      recentPhotos: [
        "/dune-restoration-planting.jpg",
        "/placeholder.jpg",
        "/placeholder.jpg",
        "/placeholder.jpg",
      ],
      hashtags: ["#DesafíoBarranco", "#EcoShare", "#DunasVivas"],
    },
    {
      id: "3",
      eventId: "3",
      eventTitle: "Campaña de Concientización - Costa Verde",
      eventDate: "2024-01-10",
      location: "Playa de la Concha",
      participants: 28,
      photos: 64,
      comments: 19,
      likes: 98,
      status: "completed",
      coverPhoto: "/placeholder.jpg",
      videoUrl: "/videos/costa-verde.mp4",
      recentPhotos: [
        "/placeholder.jpg",
        "/placeholder.jpg",
        "/placeholder.jpg",
        "/placeholder.jpg",
      ],
      hashtags: ["#CostaVerde", "#EcoShare"],
    },
  ]

  if (!user) return null

  const getStatusBadge = (album: EventAlbum) => {
    if (album.status === "collecting") {
      return (
        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
          <Clock className="h-3 w-3 mr-1" />
          Recopilando • {album.daysLeft} días
        </Badge>
      )
    }
    if (album.status === "generating") {
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
          <Film className="h-3 w-3 mr-1" />
          Generando video...
        </Badge>
      )
    }
    return (
      <Badge variant="secondary" className="bg-green-100 text-green-700">
        <Film className="h-3 w-3 mr-1" />
        Video disponible
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center">
          <Camera className="h-8 w-8 mr-3 text-primary" />
          EcoShare
        </h1>
        <p className="text-muted-foreground">
          Comparte momentos de nuestros eventos de limpieza y celebra el impacto colectivo
        </p>
      </div>

      <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950 border-cyan-200">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Camera className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-cyan-900 dark:text-cyan-100 mb-1">
                ¿Cómo funciona EcoShare?
              </h3>
              <p className="text-sm text-cyan-700 dark:text-cyan-300 mb-3">
                Después de cada evento, los participantes pueden subir fotos al álbum compartido. Tras 3-5
                días, todas las fotos se convierten automáticamente en un video memorable que puedes
                descargar y compartir en tus redes sociales.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-cyan-600 dark:text-cyan-400">
                <span>✓ Solo participantes pueden subir fotos</span>
                <span>•</span>
                <span>✓ Video generado automáticamente</span>
                <span>•</span>
                <span>✓ Descarga y comparte en TikTok, Instagram, etc.</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Hash className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground mr-2">Trending del mes:</span>
          {(["#LimpioMiraflores", "#DesafíoBarranco", "#EcoShare"]).map((tag) => (
            <button key={tag} className="px-3 py-1 rounded-full border hover:bg-accent" onClick={() => setSelectedTag(tag)}>
              {tag}
            </button>
          ))}
          {selectedTag && (
            <button className="ml-auto text-xs underline" onClick={() => setSelectedTag("")}>Limpiar filtro</button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {albums
          .filter(a => !selectedTag || a.hashtags.includes(selectedTag))
          .map((album) => (
            <Card key={album.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-video bg-muted">
                <Image
                  src={album.coverPhoto}
                  alt={album.eventTitle}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3">
                  {getStatusBadge(album)}
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">{album.eventTitle}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground space-x-4 mt-2">
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(album.eventDate).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {album.location}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {album.hashtags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-full bg-muted text-xs cursor-pointer" onClick={() => setSelectedTag(tag)}>{tag}</span>
                  ))}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-4 gap-1">
                  {album.recentPhotos.slice(0, 4).map((photo, idx) => (
                    <div key={idx} className="relative aspect-square bg-muted rounded overflow-hidden">
                      <Image src={photo} alt={`Photo ${idx + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {album.participants}
                  </span>
                  <span className="flex items-center">
                    <Camera className="h-4 w-4 mr-1" />
                    {album.photos}
                  </span>
                  <span className="flex items-center">
                    <Heart className="h-4 w-4 mr-1" />
                    {album.likes}
                  </span>
                  <span className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {album.comments}
                  </span>
                </div>

                <div className="flex gap-2">
                  {album.status === "collecting" && (
                    <Button variant="default" className="flex-1" size="sm">
                      <Camera className="h-4 w-4 mr-2" />
                      Subir Fotos
                    </Button>
                  )}
                  {album.status === "completed" && (
                    <>
                      <Button variant="default" className="flex-1" size="sm">
                        <Film className="h-4 w-4 mr-2" />
                        Ver Video
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  <Button variant="outline" size="sm" onClick={() => {
                    const tags = album.hashtags.join(' ')
                    const text = `${album.eventTitle} — EcoShare ${tags}`
                    const url = typeof window !== 'undefined' ? window.location.href : 'https://ecoplaya.local'
                    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
                    window.open(shareUrl, '_blank')
                  }}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>

                <BeforeAfterSlider campaignId={album.id} />
                <TestimonialsSection />
              </CardContent>
            </Card>
          ))}
      </div>

      <div className="mt-10">
        <PhotoContest />
      </div>

      {albums.length === 0 && (
        <div className="text-center py-16">
          <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">No hay álbumes disponibles</h3>
          <p className="text-muted-foreground mb-4">
            Participa en eventos para empezar a crear recuerdos compartidos
          </p>
          <Button onClick={() => router.push("/dashboard/events")}>Ver Eventos Disponibles</Button>
        </div>
      )}
    </div>
  )
}
