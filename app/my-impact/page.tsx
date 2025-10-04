"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser, type User } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { 
  Waves, 
  TrendingUp, 
  Award, 
  Calendar, 
  MapPin, 
  Users, 
  Trash2, 
  Leaf,
  Target,
  Star,
  Trophy
} from "lucide-react"

export default function MyImpactPage() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  // Mock data del impacto personal del usuario
  const impactData = {
    totalEvents: 12,
    totalReports: 8,
    trashCollected: 145, // kg
    hoursContributed: 48,
    beachesCleaned: 8,
    co2Prevented: 87, // kg
    rank: 15, // posición en el ranking
    nextLevel: "Protector del Océano",
    progressToNextLevel: 65,
  }

  const recentActivities = [
    {
      id: 1,
      type: "event",
      title: "Limpieza Playa Miraflores",
      date: "2024-01-14",
      points: 70,
      icon: Calendar,
    },
    {
      id: 2,
      type: "report",
      title: "Reporte de basura verificado",
      date: "2024-01-14",
      points: 40,
      icon: MapPin,
    },
    {
      id: 3,
      type: "event",
      title: "Restauración de Dunas",
      date: "2024-01-10",
      points: 80,
      icon: Calendar,
    },
    {
      id: 4,
      type: "report",
      title: "Reporte de contaminación",
      date: "2024-01-10",
      points: 40,
      icon: MapPin,
    },
  ]

  const achievements = [
    {
      id: 1,
      title: "Primera Limpieza",
      description: "Participó en su primer evento",
      icon: "🏖️",
      unlocked: true,
    },
    {
      id: 2,
      title: "Reportero Activo",
      description: "Realizó 5 reportes verificados",
      icon: "📸",
      unlocked: true,
    },
    {
      id: 3,
      title: "Voluntario Dedicado",
      description: "Participó en 10 eventos",
      icon: "⭐",
      unlocked: true,
    },
    {
      id: 4,
      title: "Guardián del Mar",
      description: "Limpió 10 playas diferentes",
      icon: "🌊",
      unlocked: false,
    },
    {
      id: 5,
      title: "Líder Ambiental",
      description: "Organizó un evento de limpieza",
      icon: "👑",
      unlocked: false,
    },
    {
      id: 6,
      title: "Eco Influencer",
      description: "Compartió 20 fotos en EcoShare",
      icon: "📱",
      unlocked: false,
    },
  ]

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/auth")
      return
    }
    setUser(currentUser)
  }, [router])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Waves className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header con Avatar y Nombre */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="text-2xl">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="secondary" className="text-sm">
                  <Award className="h-3 w-3 mr-1" />
                  {user.level}
                </Badge>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">Ranking #{impactData.rank}</span>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground">
            Tu impacto positivo en la protección de nuestras costas
          </p>
        </div>

        {/* Progreso al Siguiente Nivel */}
        <Card className="mb-6 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950 border-cyan-200">
          <CardHeader>
            <CardTitle className="flex items-center text-cyan-900 dark:text-cyan-100">
              <Target className="h-5 w-5 mr-2" />
              Progreso al Siguiente Nivel
            </CardTitle>
            <CardDescription className="text-cyan-700 dark:text-cyan-300">
              {impactData.progressToNextLevel}% para alcanzar {impactData.nextLevel}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={impactData.progressToNextLevel} className="h-3" />
            <p className="text-sm text-cyan-600 dark:text-cyan-400 mt-2">
              {user.points} puntos • Faltan {Math.ceil((1500 - user.points) / 70)} eventos o{" "}
              {Math.ceil((1500 - user.points) / 40)} reportes
            </p>
          </CardContent>
        </Card>

        {/* Estadísticas Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eventos Participados</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan-600">{impactData.totalEvents}</div>
              <p className="text-xs text-muted-foreground">{impactData.hoursContributed} horas totales</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reportes Realizados</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{impactData.totalReports}</div>
              <p className="text-xs text-muted-foreground">6 verificados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Basura Recolectada</CardTitle>
              <Trash2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{impactData.trashCollected} kg</div>
              <p className="text-xs text-muted-foreground">{impactData.beachesCleaned} playas limpiadas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CO₂ Prevenido</CardTitle>
              <Leaf className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">{impactData.co2Prevented} kg</div>
              <p className="text-xs text-muted-foreground">Equiv. a 4 árboles plantados</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Actividad Reciente */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Actividad Reciente
              </CardTitle>
              <CardDescription>Tus últimas contribuciones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <activity.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(activity.date).toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "short",
                          })}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      +{activity.points} pts
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Logros */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="h-5 w-5 mr-2" />
                Logros Desbloqueados
              </CardTitle>
              <CardDescription>
                {achievements.filter((a) => a.unlocked).length} de {achievements.length} logros
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`flex flex-col items-center text-center p-3 rounded-lg border-2 transition-all ${
                      achievement.unlocked
                        ? "border-primary bg-primary/5"
                        : "border-muted bg-muted/50 opacity-50"
                    }`}
                  >
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <p className="text-xs font-medium">{achievement.title}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comparativa con la Comunidad */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Comparación con la Comunidad
            </CardTitle>
            <CardDescription>Tu posición en el ranking general</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Top 1% de voluntarios</span>
                  <span className="font-medium">Ranking #{impactData.rank}</span>
                </div>
                <Progress value={98} className="h-2" />
              </div>
              <Separator />
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary">{user.points}</p>
                  <p className="text-xs text-muted-foreground">Tus puntos</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-muted-foreground">1,450</p>
                  <p className="text-xs text-muted-foreground">Promedio comunidad</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-600">-200</p>
                  <p className="text-xs text-muted-foreground">Para Top 10</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
