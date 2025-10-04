"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReportForm } from "@/components/reports/report-form"
import { ReportsList } from "@/components/reports/reports-list"
import { getCurrentUser, type User } from "@/lib/auth"
import { Camera, List } from "lucide-react"

export default function ReportsPage() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
    </div>
  )
}
