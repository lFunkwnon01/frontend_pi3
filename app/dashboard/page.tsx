"use client"

import { MetricsGrid } from "@/components/dashboard/MetricsGrid"
import { NextEvent } from "@/components/dashboard/NextEvent"
import { QuickActions } from "@/components/dashboard/QuickActions"
import { ProgressCharts } from "@/components/dashboard/ProgressCharts"
import { ActivityList } from "@/components/dashboard/ActivityList"
import { BeachMap } from "@/components/map/beach-map"
import { Button } from "@/components/ui/button"
import { getCurrentUser } from "@/lib/auth"

export default function DashboardPage() {
  const user = getCurrentUser()

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Hola, {user?.name?.split(' ')[0] || "Voluntario"} 👋</h1>
        <p className="text-gray-500">Aquí tienes un resumen de tu impacto y próximas actividades.</p>
      </div>

      <MetricsGrid />
      <NextEvent />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Left Column (Map & Activity) */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">Mapa de Contaminación</h3>
              <Button variant="outline" size="sm">Ver pantalla completa</Button>
            </div>
            <div className="h-[400px] rounded-lg overflow-hidden border border-gray-200">
              <BeachMap />
            </div>
          </div>

          <div className="bg-gray-100/50 p-6 rounded-xl">
            <ActivityList />
          </div>
        </div>

        {/* Right Column (Quick Actions & Charts) */}
        <div className="space-y-8">
          <QuickActions />
          <ProgressCharts />
        </div>
      </div>
    </>
  )
}
