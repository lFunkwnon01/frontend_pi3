"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileText, Users, CheckCircle2, XCircle, Clock, AlertTriangle, TrendingUp } from "lucide-react"
import { mockEvents, mockReports } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"

export default function AdminDashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/auth")
      return
    }
    if (currentUser.role !== "admin") {
      router.push("/dashboard")
      return
    }
    setUser(currentUser)
  }, [router])

  if (!user) {
    return null
  }

  const pendingEvents = mockEvents.filter(e => e.status === "pending")
  const approvedEvents = mockEvents.filter(e => e.status === "approved")
  const pendingReports = mockReports.filter(r => r.status === "pending")
  const verifiedReports = mockReports.filter(r => r.status === "verified")

  const handleApproveEvent = (eventId: string) => {
    toast({
      title: "Evento Aprobado",
      description: "El evento ha sido aprobado y publicado.",
    })
  }

  const handleRejectEvent = (eventId: string) => {
    toast({
      title: "Evento Rechazado",
      description: "El evento ha sido rechazado.",
      variant: "destructive",
    })
  }

  const handleVerifyReport = (reportId: string) => {
    toast({
      title: "Reporte Verificado",
      description: "El reporte ha sido verificado y se han otorgado los puntos.",
    })
  }

  const handleRejectReport = (reportId: string) => {
    toast({
      title: "Reporte Rechazado",
      description: "El reporte ha sido rechazado.",
      variant: "destructive",
    })
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Panel de Administración</h1>
        <p className="text-muted-foreground text-base">Gestiona eventos, reportes y usuarios de EcoPlaya</p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Eventos Pendientes</CardTitle>
            <Clock className="h-5 w-5 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingEvents.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Requieren revisión</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Eventos Aprobados</CardTitle>
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{approvedEvents.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Eventos activos</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Reportes Pendientes</CardTitle>
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingReports.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Por verificar</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Reportes Verificados</CardTitle>
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{verifiedReports.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Este mes</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="events" className="space-y-4">
        <TabsList>
          <TabsTrigger value="events">
            <Calendar className="mr-2 h-4 w-4" />
            Eventos Pendientes
            {pendingEvents.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {pendingEvents.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="reports">
            <FileText className="mr-2 h-4 w-4" />
            Reportes Pendientes
            {pendingReports.length > 0 && (
              <Badge variant="destructive" className="ml-2">
                {pendingReports.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="stats">
            <TrendingUp className="mr-2 h-4 w-4" />
            Estadísticas
          </TabsTrigger>
        </TabsList>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-4">
          {pendingEvents.length > 0 ? (
            pendingEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="mb-2 text-xl">{event.title}</CardTitle>
                      <CardDescription className="text-sm">{event.description}</CardDescription>
                    </div>
                    <Badge variant="outline" className="border-yellow-500 text-yellow-600 whitespace-nowrap">
                      <Clock className="mr-1 h-3 w-3" />
                      Pendiente
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Organización</p>
                      <p className="font-medium">{event.organizer}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Fecha</p>
                      <p className="font-medium">{event.date}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Playa</p>
                      <p className="font-medium">{event.beachName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Capacidad</p>
                      <p className="font-medium">{event.maxVolunteers} personas</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={() => handleApproveEvent(event.id)}
                      className="flex-1"
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Aprobar Evento
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => handleRejectEvent(event.id)}
                      className="flex-1"
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Rechazar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <CheckCircle2 className="h-16 w-16 mx-auto mb-4 text-green-500" />
                <h3 className="text-xl font-semibold mb-2">¡Todo al día!</h3>
                <p className="text-muted-foreground">
                  No hay eventos pendientes de revisión
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          {pendingReports.length > 0 ? (
            pendingReports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="mb-2 text-xl">
                        Reporte de {report.type === "trash" ? "Basura" : report.type === "pollution" ? "Contaminación" : "Limpieza"}
                      </CardTitle>
                      <CardDescription className="text-sm">{report.description}</CardDescription>
                    </div>
                    <Badge variant="outline" className="border-yellow-500 text-yellow-600 whitespace-nowrap">
                      <Clock className="mr-1 h-3 w-3" />
                      Pendiente
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Usuario</p>
                      <p className="font-medium">{report.userName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Fecha</p>
                      <p className="font-medium">{new Date(report.timestamp).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">ID Playa</p>
                      <p className="font-medium">{report.beachId}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Tipo</p>
                      <Badge>{report.type}</Badge>
                    </div>
                  </div>

                  {report.image && (
                    <div className="aspect-video relative overflow-hidden rounded-lg bg-muted">
                      <img
                        src={report.image}
                        alt={`Reporte de ${report.type}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button 
                      onClick={() => handleVerifyReport(report.id)}
                      className="flex-1"
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Verificar y Dar Puntos
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => handleRejectReport(report.id)}
                      className="flex-1"
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Rechazar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <CheckCircle2 className="h-16 w-16 mx-auto mb-4 text-green-500" />
                <h3 className="text-xl font-semibold mb-2">¡Todo verificado!</h3>
                <p className="text-muted-foreground">
                  No hay reportes pendientes de verificación
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Stats Tab */}
        <TabsContent value="stats" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Resumen General</CardTitle>
                <CardDescription>Estadísticas de la plataforma</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Eventos</span>
                  <span className="text-2xl font-bold">{mockEvents.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Reportes</span>
                  <span className="text-2xl font-bold">{mockReports.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Usuarios Activos</span>
                  <span className="text-2xl font-bold">847</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Organizaciones</span>
                  <span className="text-2xl font-bold">23</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>Últimas 24 horas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Nuevos Reportes</span>
                  <Badge>+{pendingReports.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Eventos Creados</span>
                  <Badge>+{pendingEvents.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Nuevos Usuarios</span>
                  <Badge>+12</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Inscripciones a Eventos</span>
                  <Badge>+34</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
