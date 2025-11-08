"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockEventsAdvanced, type EventAdvanced } from "@/lib/event-model"
import { getCurrentUser } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { Calendar, MapPin, Award } from "lucide-react"

function scoreEvent(e: EventAdvanced, userDistrict?: string) {
  let score = 0
  if (userDistrict && e.location.distrito === userDistrict) score += 50
  // Simple activity preference based on category: if points > 100 then favor Mar
  if (e.category === "Mar") score += 20
  if (e.activities.includes("Limpieza")) score += 15
  if (e.activities.includes("Reciclaje")) score += 10
  return score
}

export function RecommendedEvents() {
  const router = useRouter()
  const user = getCurrentUser()
  const userDistrict = user?.district

  const recommended = useMemo(() => {
    return [...mockEventsAdvanced]
      .filter((e) => e.status === "upcoming")
      .map((e) => ({ event: e, score: scoreEvent(e, userDistrict) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((r) => r.event)
  }, [userDistrict])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recomendado para ti</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommended.map((e) => (
            <div key={e.id} className="p-4 rounded-lg border hover:bg-muted/50 transition">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-sm mb-1">{e.title}</h3>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center"><MapPin className="h-3 w-3 mr-1" />{e.location.playa}</span>
                    <span className="flex items-center"><Calendar className="h-3 w-3 mr-1" />{new Date(e.startDate).toLocaleDateString("es-PE")}</span>
                    <Badge variant={e.category === "Mar" ? "secondary" : "default"}>{e.category}</Badge>
                    <Badge variant="outline">{e.activities[0]}</Badge>
                    <Badge variant="outline">{e.benefits?.points ?? 0} pts</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => router.push(`/events/${e.id}`)}>Ver detalle</Button>
                  <Button size="sm" onClick={() => router.push(`/events?distrito=${encodeURIComponent(e.location.distrito)}`)}>
                    <Award className="h-3 w-3 mr-1" /> Participar
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {recommended.length === 0 && <div className="text-sm text-muted-foreground">Sin recomendaciones</div>}
        </div>
      </CardContent>
    </Card>
  )
}
