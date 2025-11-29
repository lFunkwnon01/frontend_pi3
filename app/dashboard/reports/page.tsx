"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReportForm } from "@/components/reports/report-form"
import { ReportsList } from "@/components/reports/reports-list"
import { getCurrentUser } from "@/lib/auth"
import { Camera, List } from "lucide-react"

export default function ReportsPage() {
  const user = getCurrentUser()

  if (!user) return null

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Reportes Ciudadanos</h1>
        <p className="text-muted-foreground">
          Reporta problemas ambientales y ayuda a mantener nuestras playas limpias
        </p>
      </div>

      <Tabs defaultValue="create" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="create" className="flex items-center space-x-2">
            <Camera className="h-4 w-4" />
            <span>Crear Reporte</span>
          </TabsTrigger>
          <TabsTrigger value="list" className="flex items-center space-x-2">
            <List className="h-4 w-4" />
            <span>Mis Reportes</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <ReportForm />
        </TabsContent>

        <TabsContent value="list">
          <ReportsList />
        </TabsContent>
      </Tabs>
    </div>
  )
}
