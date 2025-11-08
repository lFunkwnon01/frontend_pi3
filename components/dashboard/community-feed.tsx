"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockCommunityActivities } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"

function formatTimeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return "ahora"
  if (minutes < 60) return `hace ${minutes}m`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `hace ${hours}h`
  const days = Math.floor(hours / 24)
  return `hace ${days}d`
}

export function CommunityFeed() {
  const activities = [...mockCommunityActivities]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5)

  const typeColor: Record<string, string> = {
    join: "bg-blue-100 text-blue-700",
    report: "bg-amber-100 text-amber-700",
    badge: "bg-emerald-100 text-emerald-700",
  }

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle>Actividad en tiempo real</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((a) => (
            <div key={a.id} className="flex items-start gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={a.userAvatar} />
                <AvatarFallback>{a.userName.slice(0,2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="text-sm">
                  <span className="font-semibold">{a.userName}</span> {a.message}
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                  <span>{formatTimeAgo(a.timestamp)}</span>
                  <span className={`px-2 py-0.5 rounded-full ${typeColor[a.type]} text-[10px]`}>{a.type}</span>
                </div>
              </div>
            </div>
          ))}
          {activities.length === 0 && (
            <div className="text-sm text-muted-foreground text-center">Sin actividades recientes</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
