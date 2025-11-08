"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Clock, Eye, AlertTriangle, Trash2, Droplets, CheckCircle2, XCircle, Award } from "lucide-react"
import { mockReports, type Report, REPORT_TYPE_META, URGENCY_BADGE } from "@/lib/mock-data"
import { getCurrentUser, addPoints } from "@/lib/auth"

export function ReportsList() {
  const [reports, setReports] = useState<Report[]>([])
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    // Filtrar solo los reportes del usuario actual
    const userReports = mockReports.filter(report => report.userId === currentUser?.id)
    setReports(userReports)
  }, [])

  const getTypeIcon = (type: Report["type"]) => {
    const meta = REPORT_TYPE_META[type]
    if (!meta) return <AlertTriangle className="h-4 w-4" />
    const size = "h-4 w-4"
    switch (meta.icon) {
      case "Trash2": return <Trash2 className={size} />
      case "Droplet": return <Droplets className={size} />
      case "PawPrint": return <AlertTriangle className={size} />
      case "Waves": return <AlertTriangle className={size} />
      case "Building": return <AlertTriangle className={size} />
      case "Car": return <AlertTriangle className={size} />
      default: return <AlertTriangle className={size} />
    }
  }

  const getTypeText = (type: Report["type"]) => REPORT_TYPE_META[type]?.label || "Otro"

  const getStatusVariant = (status: Report["status"]) => {
    switch (status) {
      case "verified": return "default" as const
      case "pending": return "secondary" as const
      case "rejected": return "destructive" as const
      case "community_validated": return "default" as const
      case "resolved": return "outline" as const
      default: return "outline" as const
    }
  }

  const getStatusText = (status: Report["status"]) => {
    switch (status) {
      case "verified": return "Verificado"
      case "pending": return "Pendiente"
      case "rejected": return "Rechazado"
      case "community_validated": return "Validado por comunidad"
      case "resolved": return "Resuelto"
      default: return "Sin estado"
    }
  }

  const getStatusIcon = (status: Report["status"]) => {
    switch (status) {
      case "verified": return <CheckCircle2 className="h-3 w-3" />
      case "pending": return <Clock className="h-3 w-3" />
      case "rejected": return <XCircle className="h-3 w-3" />
      case "community_validated": return <CheckCircle2 className="h-3 w-3 text-primary" />
      case "resolved": return <CheckCircle2 className="h-3 w-3 text-green-600" />
      default: return null
    }
  }

  const currentUser = getCurrentUser()

  const validateReport = (r: Report) => {
    if (!currentUser) return
    setReports(prev => prev.map(rep => {
      if (rep.id !== r.id) return rep
      const validations = rep.communityValidations || []
      if (validations.includes(currentUser.id)) return rep
      const updatedValidations = [...validations, currentUser.id]
      const thresholdReached = updatedValidations.length >= 3 && rep.status === 'pending'
      const newStatus = thresholdReached ? 'community_validated' : rep.status
      if (thresholdReached) addPoints(20) // reward validator
      return { ...rep, communityValidations: updatedValidations, status: newStatus, validatedAt: thresholdReached ? new Date().toISOString() : rep.validatedAt }
    }))
  }

  const resolveReport = (r: Report) => {
    // simulate resolution awarding points to creator if resolved quickly (<7 days)
    const created = new Date(r.timestamp).getTime()
    const now = Date.now()
    const days = (now - created) / (1000*60*60*24)
    const quick = days < 7
    setReports(prev => prev.map(rep => rep.id === r.id ? { ...rep, status: 'resolved', resolved: true, resolvedAt: new Date().toISOString(), resolvedImages: { before: rep.image, after: '/beach-cleanup-volunteers.png' }, points: rep.points + (quick ? 50 : 0) } : rep))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Reportes Recientes</CardTitle>
          <CardDescription>Problemas reportados por la comunidad</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors hover:bg-muted ${
                  selectedReport?.id === report.id ? "bg-muted border-primary" : ""
                }`}
                onClick={() => setSelectedReport(report)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt={report.userName} />
                      <AvatarFallback>
                        {report.userName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{report.userName}</div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(report.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getStatusVariant(report.status)} className="flex items-center space-x-1">
                      {getStatusIcon(report.status)}
                      <span>{getStatusText(report.status)}</span>
                    </Badge>
                    <Badge variant="outline" className="flex items-center space-x-1">
                      {getTypeIcon(report.type)}
                      <span>{getTypeText(report.type)}</span>
                    </Badge>
                    {report.points > 0 && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100">
                        <Award className="h-3 w-3 mr-1" />
                        +{report.points} pts
                      </Badge>
                    )}
                  </div>
                </div>

                <p className="text-sm mb-3">{report.description}</p>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>Playa reportada</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={()=>setSelectedReport(report)}>
                      <Eye className="h-4 w-4 mr-1" />
                      Ver detalles
                    </Button>
                    {report.status === 'pending' && (
                      <Button variant="outline" size="sm" onClick={()=>validateReport(report)}>Validar (+20)</Button>
                    )}
                    {report.status === 'community_validated' && (
                      <Badge variant="secondary" className="text-[10px]">{(report.communityValidations||[]).length} validaciones</Badge>
                    )}
                    {report.status !== 'resolved' && report.status !== 'rejected' && (
                      <Button variant="outline" size="sm" onClick={()=>resolveReport(report)}>Marcar resuelto</Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Details */}
      {selectedReport && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {getTypeIcon(selectedReport.type)}
              <span>Detalles del Reporte</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Información del Reporte</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tipo:</span>
                      <span>{getTypeText(selectedReport.type)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estado:</span>
                      <Badge variant={getStatusVariant(selectedReport.status)}>
                        {getStatusText(selectedReport.status)}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fecha:</span>
                      <span>{new Date(selectedReport.timestamp).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reportado por:</span>
                      <span>{selectedReport.userName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Puntos ganados:</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        <Award className="h-3 w-3 mr-1" />
                        {selectedReport.points} pts
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Descripción</h4>
                  <p className="text-sm text-muted-foreground">{selectedReport.description}</p>
                </div>

                {selectedReport.verifierComment && (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center text-primary">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Comentario del Verificador
                    </h4>
                    <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                      {selectedReport.verifierComment}
                    </p>
                  </div>
                )}

                <div>
                  <h4 className="font-medium mb-2">Ubicación</h4>
                  <p className="text-sm text-muted-foreground">
                    Lat: {selectedReport.location.lat.toFixed(6)}, Lng: {selectedReport.location.lng.toFixed(6)}
                  </p>
                  {selectedReport.communityValidations && selectedReport.communityValidations.length > 0 && (
                    <p className="text-xs mt-1">Validaciones: {selectedReport.communityValidations.length}/3</p>
                  )}
                  {selectedReport.resolved && selectedReport.resolvedImages && (
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <div className="font-medium mb-1">Antes</div>
                        <img src={selectedReport.resolvedImages.before} className="rounded border aspect-video object-cover" />
                      </div>
                      <div>
                        <div className="font-medium mb-1">Después</div>
                        <img src={selectedReport.resolvedImages.after} className="rounded border aspect-video object-cover" />
                      </div>
                      <div className="col-span-2 text-[11px] text-muted-foreground mt-1">Resuelto {selectedReport.resolvedAt && new Date(selectedReport.resolvedAt).toLocaleDateString('es-ES')} {selectedReport.validatedAt && `(validado previamente)`}</div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Foto del Problema</h4>
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <img
                    src={selectedReport.image || "/placeholder.svg"}
                    alt="Foto del reporte"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
