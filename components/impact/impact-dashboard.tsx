"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ImpactChart } from "./impact-chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Waves, Users, Trash2, TrendingUp, Award, Leaf, Target, BarChart3, PieChart, Activity } from "lucide-react"
import { mockImpactStats } from "@/lib/mock-data"

export function ImpactDashboard() {
  const [stats, setStats] = useState(mockImpactStats)

  // Mock data for charts
  const monthlyData = [
    { month: "Ene", volunteers: 180, trash: 850, events: 8 },
    { month: "Feb", volunteers: 220, trash: 1200, events: 12 },
    { month: "Mar", volunteers: 280, trash: 1450, events: 15 },
    { month: "Abr", volunteers: 320, trash: 1680, events: 18 },
    { month: "May", volunteers: 380, trash: 1920, events: 22 },
    { month: "Jun", volunteers: 450, trash: 2150, events: 25 },
  ]

  const beachStatusData = [
    { name: "Limpias", value: 12, color: "#10b981" },
    { name: "Regulares", value: 8, color: "#f59e0b" },
    { name: "Necesitan Limpieza", value: 3, color: "#ef4444" },
  ]

  const wasteTypeData = [
    { name: "Plásticos", value: 45 },
    { name: "Vidrio", value: 20 },
    { name: "Metal", value: 15 },
    { name: "Papel", value: 12 },
    { name: "Otros", value: 8 },
  ]

  return (
    <div className="space-y-6">
      {/* Main Impact Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Voluntarios Activos</p>
                <p className="text-3xl font-bold text-blue-700">{stats.totalVolunteers.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+{stats.monthlyGrowth}% este mes</span>
                </div>
              </div>
              <Users className="h-12 w-12 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Basura Recolectada</p>
                <p className="text-3xl font-bold text-green-700">{(stats.trashCollected / 1000).toFixed(1)}t</p>
                <p className="text-sm text-green-600 mt-2">{stats.trashCollected.toLocaleString()} kg total</p>
              </div>
              <Trash2 className="h-12 w-12 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Playas Restauradas</p>
                <p className="text-3xl font-bold text-purple-700">{stats.beachesRestored}</p>
                <p className="text-sm text-purple-600 mt-2">{stats.eventsCompleted} eventos completados</p>
              </div>
              <Waves className="h-12 w-12 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">CO₂ Evitado</p>
                <p className="text-3xl font-bold text-orange-700">{(stats.co2Prevented / 1000).toFixed(1)}t</p>
                <p className="text-sm text-orange-600 mt-2">Equivalente a plantar 400 árboles</p>
              </div>
              <Leaf className="h-12 w-12 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="trends" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trends" className="flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span>Tendencias</span>
          </TabsTrigger>
          <TabsTrigger value="distribution" className="flex items-center space-x-2">
            <PieChart className="h-4 w-4" />
            <span>Distribución</span>
          </TabsTrigger>
          <TabsTrigger value="comparison" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Comparación</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ImpactChart
              type="line"
              data={monthlyData}
              title="Crecimiento de Voluntarios"
              description="Número de voluntarios activos por mes"
              dataKey="volunteers"
              xAxisKey="month"
              color="#0ea5e9"
            />

            <ImpactChart
              type="bar"
              data={monthlyData}
              title="Basura Recolectada Mensual"
              description="Kilogramos de basura recolectada por mes"
              dataKey="trash"
              xAxisKey="month"
              color="#10b981"
            />
          </div>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ImpactChart
              type="pie"
              data={beachStatusData}
              title="Estado de las Playas"
              description="Distribución del estado de limpieza"
              dataKey="value"
            />

            <ImpactChart
              type="pie"
              data={wasteTypeData}
              title="Tipos de Residuos"
              description="Distribución por tipo de basura recolectada"
              dataKey="value"
            />
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <ImpactChart
            type="bar"
            data={monthlyData}
            title="Eventos por Mes"
            description="Número de eventos de limpieza organizados"
            dataKey="events"
            xAxisKey="month"
            color="#8b5cf6"
          />
        </TabsContent>
      </Tabs>

      {/* Achievements Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>Logros de la Comunidad</span>
          </CardTitle>
          <CardDescription>Hitos importantes alcanzados por nuestra comunidad</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 border rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50">
              <Target className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Meta 2024 Alcanzada</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Superamos la meta de 10 toneladas de basura recolectada
              </p>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                154% completado
              </Badge>
            </div>

            <div className="text-center p-6 border rounded-lg bg-gradient-to-br from-green-50 to-emerald-50">
              <Waves className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Playa Modelo</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Playa de la Concha certificada como playa modelo por su limpieza
              </p>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Certificación obtenida
              </Badge>
            </div>

            <div className="text-center p-6 border rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50">
              <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Comunidad Creciente</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Alcanzamos los 2,500 voluntarios registrados en la plataforma
              </p>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Hito alcanzado
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Environmental Impact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Leaf className="h-5 w-5" />
            <span>Impacto Ambiental</span>
          </CardTitle>
          <CardDescription>El impacto positivo de nuestras acciones en el medio ambiente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">8.9t</div>
              <div className="text-sm text-muted-foreground">CO₂ Evitado</div>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">450</div>
              <div className="text-sm text-muted-foreground">Árboles Equivalentes</div>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">12</div>
              <div className="text-sm text-muted-foreground">Especies Protegidas</div>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-1">85%</div>
              <div className="text-sm text-muted-foreground">Mejora en Calidad</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
