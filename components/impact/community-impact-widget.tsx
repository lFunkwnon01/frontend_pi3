"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockImpactStats } from "@/lib/mock-data"
import { Recycle, Users, Waves, Cloud } from "lucide-react"

export function CommunityImpactWidget() {
  const stats = mockImpactStats
  const items = [
    {
      label: "Kg recolectados (este mes)",
      value: stats.trashCollected.toLocaleString("es-PE"),
      icon: Recycle,
      color: "from-emerald-500 to-emerald-600",
      accent: "text-emerald-600",
    },
    {
      label: "Voluntarios activos",
      value: stats.totalVolunteers.toLocaleString("es-PE"),
      icon: Users,
      color: "from-blue-500 to-blue-600",
      accent: "text-blue-600",
    },
    {
      label: "Playas restauradas",
      value: stats.beachesRestored.toLocaleString("es-PE"),
      icon: Waves,
      color: "from-cyan-500 to-cyan-600",
      accent: "text-cyan-600",
    },
    {
      label: "CO₂ evitado (kg)",
      value: stats.co2Prevented.toLocaleString("es-PE"),
      icon: Cloud,
      color: "from-violet-500 to-violet-600",
      accent: "text-violet-600",
    },
  ]

  return (
    <Card className="border-muted">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
          Impacto colectivo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className="group p-3 rounded-lg border bg-gradient-to-br from-white to-white shadow-sm hover:shadow-md transition relative"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-muted group-hover:bg-primary/10 transition">
                    <Icon className={`w-5 h-5 text-${item.color.split('-')[1]}-600`} />
                  </div>
                  <div className="leading-tight">
                    <div className="text-lg font-bold text-foreground tracking-tight">{item.value}</div>
                    <div className="text-[10px] text-muted-foreground uppercase font-medium">{item.label}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
