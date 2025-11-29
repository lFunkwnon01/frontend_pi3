"use client"

import { useRef, useState, useEffect } from "react"
import { getCurrentUser } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImpactChart } from "@/components/impact/impact-chart"
import { mockImpactStats } from "@/lib/mock-data"
import { useToast } from "@/components/ui/use-toast"
import {
  TrendingUp,
  Award,
  Calendar,
  MapPin,
  Users,
  Trash2,
  Leaf,
  Target,
  Trophy,
} from "lucide-react"

export default function ProfilePage() {
  const user = getCurrentUser()
  const { toast } = useToast()
  const reportRef = useRef<HTMLDivElement>(null)
  const shareRef = useRef<HTMLDivElement>(null)

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
    { id: 1, type: "event", title: "Limpieza Playa Miraflores", date: "2024-01-14", points: 70, icon: Calendar },
    { id: 2, type: "report", title: "Reporte de basura verificado", date: "2024-01-14", points: 40, icon: MapPin },
    { id: 3, type: "event", title: "Restauración de Dunas", date: "2024-01-10", points: 80, icon: Calendar },
    { id: 4, type: "report", title: "Reporte de contaminación", date: "2024-01-10", points: 40, icon: MapPin },
  ]

  const achievements = [
    { id: 1, title: "Primera Limpieza", description: "Participó en su primer evento", icon: "🏖️", unlocked: true },
    { id: 2, title: "Reportero Activo", description: "Realizó 5 reportes verificados", icon: "📸", unlocked: true },
    { id: 3, title: "Voluntario Dedicado", description: "Participó en 10 eventos", icon: "⭐", unlocked: true },
    { id: 4, title: "Guardián del Mar", description: "Limpió 10 playas diferentes", icon: "🌊", unlocked: false },
    { id: 5, title: "Líder Ambiental", description: "Organizó un evento de limpieza", icon: "👑", unlocked: false },
    { id: 6, title: "Eco Influencer", description: "Compartió 20 fotos en EcoShare", icon: "📱", unlocked: false },
  ]

  // Comparativas vs comunidad
  const communityAvgTrashPerUser = Math.max(
    1,
    Math.round(mockImpactStats.trashCollected / Math.max(1, mockImpactStats.totalVolunteers))
  )
  const percentBetterTrash = Math.round(
    ((impactData.trashCollected - communityAvgTrashPerUser) / communityAvgTrashPerUser) * 100
  )
  const topReportersPercent = 10 // mock

  // Charts data with timeframe toggle
  const [timeframe, setTimeframe] = useState<"mensual" | "trimestral" | "anual">("mensual")
  const monthlySeries = Array.from({ length: 12 }).map((_, i) => ({
    mes: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"][i],
    puntos: 80 + Math.round(Math.random() * 40),
    eventos: Math.max(0, Math.round(2 + Math.sin(i) * 2)),
    kg: 8 + Math.round(Math.random() * 6),
  }))
  const quarterlySeries = [
    { periodo: "Q1", puntos: 260, eventos: 9, kg: 32 },
    { periodo: "Q2", puntos: 310, eventos: 12, kg: 41 },
    { periodo: "Q3", puntos: 295, eventos: 10, kg: 39 },
    { periodo: "Q4", puntos: 330, eventos: 13, kg: 44 },
  ]
  const annualSeries = [
    { anio: "2023", puntos: 1060, eventos: 38, kg: 155 },
    { anio: "2024", puntos: 1210, eventos: 45, kg: 172 },
    { anio: "2025", puntos: 1340, eventos: 52, kg: 188 },
  ]

  // Goals (localStorage)
  type Goal = {
    id: string
    type: "events-month" | "kg-year" | "points-year"
    target: number
    created: string
    completed?: string
  }
  const GOALS_KEY = "my_impact_goals"
  const [goals, setGoals] = useState<Goal[]>([])
  useEffect(() => {
    setGoals(JSON.parse(localStorage.getItem(GOALS_KEY) || "[]"))
  }, [])
  const addGoal = (g: Omit<Goal, "id" | "created">) => {
    const goal: Goal = { id: Date.now().toString(), created: new Date().toISOString(), ...g }
    const next = [...goals, goal]
    setGoals(next)
    localStorage.setItem(GOALS_KEY, JSON.stringify(next))
  }
  const markCompleted = (id: string) => {
    const next = goals.map((g) => (g.id === id ? { ...g, completed: new Date().toISOString() } : g))
    setGoals(next)
    localStorage.setItem(GOALS_KEY, JSON.stringify(next))
    // Award bonus points + badge (mock)
    const bonus = 200
    const bonusKey = "my_impact_bonus_points"
    const prev = parseInt(localStorage.getItem(bonusKey) || "0", 10)
    localStorage.setItem(bonusKey, String(prev + bonus))
    toast({ title: "¡Meta lograda!", description: `Has ganado +${bonus} puntos y un badge especial.` })
  }
  const goalProgress = (g: Goal) => {
    if (g.type === "events-month") return Math.min(100, Math.round(((impactData.totalEvents % 12) / Math.max(1, g.target)) * 100))
    if (g.type === "kg-year") return Math.min(100, Math.round((impactData.trashCollected / Math.max(1, g.target)) * 100))
    if (g.type === "points-year") return Math.min(100, Math.round(((user?.points || 0) / Math.max(1, g.target)) * 100))
    return 0
  }

  // PDF and share image generation
  const handleDownloadPDF = async () => {
    const el = reportRef.current
    if (!el) return
    const [{ jsPDF }, html2canvas] = await Promise.all([
      import("jspdf"),
      import("html2canvas").then((m) => m.default),
    ])
    const canvas = await html2canvas(el as HTMLElement, { scale: 2, backgroundColor: "#ffffff" })
    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" })
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height)
    const imgWidth = canvas.width * ratio
    const imgHeight = canvas.height * ratio
    pdf.addImage(imgData, "PNG", (pageWidth - imgWidth) / 2, 24, imgWidth, imgHeight)
    pdf.setFontSize(9)
    pdf.text(
      `Certificado digital EcoPlaya • ${new Date().toLocaleDateString("es-ES")} • ID: ${user?.id || "N/A"}`,
      40,
      pageHeight - 24
    )
    pdf.save("Mi-Informe-de-Impacto.pdf")
  }
  const handleShareImage = async () => {
    const el = shareRef.current
    if (!el) return
    const html2canvas = (await import("html2canvas")).default
    const canvas = await html2canvas(el as HTMLElement, { scale: 2, backgroundColor: "#ffffff" })
    const dataUrl = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.href = dataUrl
    link.download = "EcoPlaya-mi-impacto.png"
    link.click()
  }

  if (!user) return null

  return (
    <div className="space-y-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="sr-only">Mi Impacto</h1>
          <div className="flex items-center gap-2">
            <button onClick={handleShareImage} className="text-xs underline">
              Descargar imagen para compartir
            </button>
            <button onClick={handleDownloadPDF} className="text-xs underline">
              Descargar Mi Informe de Impacto (PDF)
            </button>
          </div>
        </div>

        {/* Header con Avatar y Nombre */}
        <div className="mb-8" ref={shareRef}>
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
          <p className="text-muted-foreground">Tu impacto positivo en la protección de nuestras costas</p>
        </div>

        {/* Progreso al Siguiente Nivel */}
        <Card
          className="mb-6 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950 border-cyan-200"
          ref={reportRef}
        >
          <CardHeader>
            <CardTitle className="flex items-center text-cyan-900 dark:text-cyan-100">
              <Target className="h-5 w-5 mr-2" /> Progreso al Siguiente Nivel
            </CardTitle>
            <CardDescription className="text-cyan-700 dark:text-cyan-300">
              {impactData.progressToNextLevel}% para alcanzar {impactData.nextLevel}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={impactData.progressToNextLevel} className="h-3" />
            <p className="text-sm text-cyan-600 dark:text-cyan-400 mt-2">
              {user.points} puntos • Faltan {Math.ceil((1500 - user.points) / 70)} eventos o {Math.ceil((1500 - user.points) / 40)}
              reportes
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
                <TrendingUp className="h-5 w-5 mr-2" /> Actividad Reciente
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
                          {new Date(activity.date).toLocaleDateString("es-ES", { day: "numeric", month: "short" })}
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
                <Trophy className="h-5 w-5 mr-2" /> Logros Desbloqueados
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
                    className={`flex flex-col items-center text-center p-3 rounded-lg border-2 transition-all ${achievement.unlocked ? "border-primary bg-primary/5" : "border-muted bg-muted/50 opacity-50"
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

        {/* Comparativa con la Comunidad - enriquecida */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" /> Comparación con la Comunidad
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
              <div className="text-sm text-muted-foreground">
                Has recolectado <span className="font-semibold text-foreground">{Math.abs(percentBetterTrash)}%</span>{" "}
                {percentBetterTrash >= 0 ? "más" : "menos"} basura que el promedio. Estás en el{" "}
                <span className="font-semibold text-foreground">top {topReportersPercent}%</span> de reporteros más activos.
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

        {/* Gráficos interactivos con selector de periodo */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Evolución de tu impacto</CardTitle>
            <CardDescription>Cambia la vista por periodo</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={timeframe} onValueChange={(v) => setTimeframe(v as any)}>
              <TabsList>
                <TabsTrigger value="mensual">Mensual</TabsTrigger>
                <TabsTrigger value="trimestral">Trimestral</TabsTrigger>
                <TabsTrigger value="anual">Anual</TabsTrigger>
              </TabsList>
              <TabsContent value="mensual" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <ImpactChart type="line" data={monthlySeries} title="Puntos" dataKey="puntos" xAxisKey="mes" color="#0ea5e9" />
                  <ImpactChart type="bar" data={monthlySeries} title="Eventos" dataKey="eventos" xAxisKey="mes" color="#8b5cf6" />
                  <ImpactChart type="bar" data={monthlySeries} title="Kg recolectados" dataKey="kg" xAxisKey="mes" color="#10b981" />
                </div>
              </TabsContent>
              <TabsContent value="trimestral" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <ImpactChart type="line" data={quarterlySeries} title="Puntos" dataKey="puntos" xAxisKey="periodo" color="#0ea5e9" />
                  <ImpactChart type="bar" data={quarterlySeries} title="Eventos" dataKey="eventos" xAxisKey="periodo" color="#8b5cf6" />
                  <ImpactChart type="bar" data={quarterlySeries} title="Kg recolectados" dataKey="kg" xAxisKey="periodo" color="#10b981" />
                </div>
              </TabsContent>
              <TabsContent value="anual" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <ImpactChart type="line" data={annualSeries} title="Puntos" dataKey="puntos" xAxisKey="anio" color="#0ea5e9" />
                  <ImpactChart type="bar" data={annualSeries} title="Eventos" dataKey="eventos" xAxisKey="anio" color="#8b5cf6" />
                  <ImpactChart type="bar" data={annualSeries} title="Kg recolectados" dataKey="kg" xAxisKey="anio" color="#10b981" />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Metas personales */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Metas personales</CardTitle>
            <CardDescription>Define tus objetivos y gana bonus al cumplirlos</CardDescription>
          </CardHeader>
          <CardContent>
            <GoalForm onAdd={addGoal} />
            <div className="mt-4 space-y-3">
              {goals.map((g) => (
                <div key={g.id} className="border rounded p-3">
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <div className="font-medium">
                        {g.type === "events-month" && `Asistir a ${g.target} eventos este mes`}
                        {g.type === "kg-year" && `Recolectar ${g.target} kg este año`}
                        {g.type === "points-year" && `Alcanzar ${g.target} puntos este año`}
                      </div>
                      <Progress value={goalProgress(g)} className="h-2 mt-2" />
                      <div className="text-[10px] text-muted-foreground mt-1">Progreso: {goalProgress(g)}%</div>
                    </div>
                    {!g.completed ? (
                      <button
                        className="text-xs underline"
                        onClick={() => markCompleted(g.id)}
                        disabled={goalProgress(g) < 100}
                        title={goalProgress(g) < 100 ? "Aún no cumple la meta" : ""}
                      >
                        Marcar completada
                      </button>
                    ) : (
                      <Badge className="bg-emerald-500 text-white">Completada</Badge>
                    )}
                  </div>
                </div>
              ))}
              {goals.length === 0 && (
                <div className="text-xs text-muted-foreground">Aún no tienes metas. ¡Crea una arriba!</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Timeline simple de contribuciones (mock) */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Línea de tiempo</CardTitle>
            <CardDescription>Tus contribuciones más destacadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative pl-6">
              <div className="absolute left-2 top-0 bottom-0 w-px bg-muted" />
              {[...recentActivities].map((a) => (
                <div key={a.id} className="relative mb-4">
                  <div className="absolute left-0 top-1 h-3 w-3 rounded-full bg-primary" />
                  <div className="ml-4 p-3 border rounded">
                    <div className="text-xs text-muted-foreground">{new Date(a.date).toLocaleDateString("es-ES")}</div>
                    <div className="text-sm font-medium flex items-center gap-2 mt-1">
                      <a.icon className="h-4 w-4 text-primary" /> {a.title}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-1">+{a.points} pts</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function GoalForm({ onAdd }: { onAdd: (g: { type: "events-month" | "kg-year" | "points-year"; target: number }) => void }) {
  const [type, setType] = useState<"events-month" | "kg-year" | "points-year">("events-month")
  const [target, setTarget] = useState(10)
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (target <= 0) return
        onAdd({ type, target })
      }}
      className="grid grid-cols-1 md:grid-cols-3 gap-3"
    >
      <select value={type} onChange={(e) => setType(e.target.value as any)} className="border rounded px-2 py-2 text-sm">
        <option value="events-month">Asistir a X eventos este mes</option>
        <option value="kg-year">Recolectar X kg este año</option>
        <option value="points-year">Alcanzar X puntos este año</option>
      </select>
      <input
        type="number"
        value={target}
        onChange={(e) => setTarget(parseInt(e.target.value) || 0)}
        className="border rounded px-2 py-2 text-sm"
        placeholder="Cantidad"
      />
      <button type="submit" className="border rounded px-3 py-2 text-sm">
        Agregar meta
      </button>
    </form>
  )
}
