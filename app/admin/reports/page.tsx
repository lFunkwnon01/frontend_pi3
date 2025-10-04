"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle2, XCircle, Clock, MapPin, Award } from "lucide-react"
import { mockReports } from "@/lib/mock-data"

export default function AdminReportsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [verifierComment, setVerifierComment] = useState("")
  const [selectedReport, setSelectedReport] = useState<any>(null)

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

  const pendingReports = mockReports.filter(r => r.status === "pending")
  const verifiedReports = mockReports.filter(r => r.status === "verified")
  const rejectedReports = mockReports.filter(r => r.status === "rejected")

  const handleVerifyReport = (report: any, comment: string) => {
    toast({
      title: "Reporte Verificado",
      description: `Se han otorgado ${report.points} puntos a ${report.userName}`,
    })
    setSelectedReport(null)
    setVerifierComment("")
  }

  const handleRejectReport = (report: any, comment: string) => {
    toast({
      title: "Reporte Rechazado",
      description: "El reporte ha sido rechazado.",
      variant: "destructive",
    })
    setSelectedReport(null)
    setVerifierComment("")
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "trash":
        return <Badge variant="destructive">Basura</Badge>
      case "pollution":
        return <Badge variant="outline" className="border-orange-500 text-orange-600">Contaminación</Badge>
      case "clean":
        return <Badge className="bg-green-500">Limpieza</Badge>
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-500"><CheckCircle2 className="mr-1 h-3 w-3" />Verificado</Badge>
      case "pending":
        return <Badge variant="outline" className="border-yellow-500 text-yellow-600"><Clock className="mr-1 h-3 w-3" />Pendiente</Badge>
      case "rejected":
        return <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3" />Rechazado</Badge>
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Gestión de Reportes</h1>
        <p className="text-muted-foreground text-base">Verifica y gestiona los reportes de la comunidad</p>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">
            Pendientes
            {pendingReports.length > 0 && (
              <Badge variant="destructive" className="ml-2">{pendingReports.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="verified">Verificados ({verifiedReports.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rechazados ({rejectedReports.length})</TabsTrigger>
        </TabsList>

        {/* Pending Reports */}
        <TabsContent value="pending" className="space-y-4">
          {pendingReports.length > 0 ? (
            pendingReports.map((report) => (
              <Card key={report.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle>Reporte de {report.type === "trash" ? "Basura" : report.type === "pollution" ? "Contaminación" : "Limpieza"}</CardTitle>
                        {getTypeBadge(report.type)}
                      </div>
                      <CardDescription>{report.description}</CardDescription>
                    </div>
                    {getStatusBadge(report.status)}
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
                      <p className="text-muted-foreground">Ubicación</p>
                      <p className="font-medium">
                        <MapPin className="inline h-3 w-3 mr-1" />
                        {report.location.lat.toFixed(4)}, {report.location.lng.toFixed(4)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Puntos</p>
                      <p className="font-medium">
                        <Award className="inline h-3 w-3 mr-1 text-primary" />
                        {report.points} pts
                      </p>
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          onClick={() => setSelectedReport(report)} 
                          className="flex-1"
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Verificar y Dar Puntos
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Verificar Reporte</DialogTitle>
                          <DialogDescription>
                            Se otorgarán {report.points} puntos a {report.userName}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="comment">Comentario del Verificador (Opcional)</Label>
                            <Textarea
                              id="comment"
                              placeholder="Agrega un comentario sobre el reporte..."
                              value={verifierComment}
                              onChange={(e) => setVerifierComment(e.target.value)}
                              rows={3}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button 
                            variant="outline" 
                            onClick={() => {
                              setSelectedReport(null)
                              setVerifierComment("")
                            }}
                          >
                            Cancelar
                          </Button>
                          <Button onClick={() => handleVerifyReport(report, verifierComment)}>
                            Verificar Reporte
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="destructive" 
                          onClick={() => setSelectedReport(report)} 
                          className="flex-1"
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Rechazar
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Rechazar Reporte</DialogTitle>
                          <DialogDescription>
                            El reporte será rechazado y no se otorgarán puntos
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="reject-comment">Motivo del Rechazo</Label>
                            <Textarea
                              id="reject-comment"
                              placeholder="Explica por qué se rechaza el reporte..."
                              value={verifierComment}
                              onChange={(e) => setVerifierComment(e.target.value)}
                              rows={3}
                              required
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button 
                            variant="outline" 
                            onClick={() => {
                              setSelectedReport(null)
                              setVerifierComment("")
                            }}
                          >
                            Cancelar
                          </Button>
                          <Button 
                            variant="destructive" 
                            onClick={() => handleRejectReport(report, verifierComment)}
                            disabled={!verifierComment.trim()}
                          >
                            Rechazar Reporte
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <CheckCircle2 className="h-16 w-16 mx-auto mb-4 text-green-500" />
                <h3 className="text-xl font-semibold mb-2">¡Todo verificado!</h3>
                <p className="text-muted-foreground">No hay reportes pendientes de verificación</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Verified Reports */}
        <TabsContent value="verified" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {verifiedReports.map((report) => (
              <Card key={report.id}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    {getTypeBadge(report.type)}
                    {getStatusBadge(report.status)}
                  </div>
                  <CardDescription className="line-clamp-2">{report.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Usuario:</span>
                    <span className="font-medium">{report.userName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Puntos:</span>
                    <span className="font-medium text-primary">{report.points} pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fecha:</span>
                    <span className="font-medium">{new Date(report.timestamp).toLocaleDateString()}</span>
                  </div>
                  {report.verifierComment && (
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground">Comentario:</p>
                      <p className="text-xs">{report.verifierComment}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Rejected Reports */}
        <TabsContent value="rejected" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rejectedReports.map((report) => (
              <Card key={report.id}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    {getTypeBadge(report.type)}
                    {getStatusBadge(report.status)}
                  </div>
                  <CardDescription className="line-clamp-2">{report.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Usuario:</span>
                    <span className="font-medium">{report.userName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fecha:</span>
                    <span className="font-medium">{new Date(report.timestamp).toLocaleDateString()}</span>
                  </div>
                  {report.verifierComment && (
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground">Motivo:</p>
                      <p className="text-xs">{report.verifierComment}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
