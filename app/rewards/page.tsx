"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { RewardsDashboard } from "@/components/rewards/rewards-dashboard"
import { getCurrentUser, type User } from "@/lib/auth"
import { Waves } from "lucide-react"

export default function RewardsPage() {
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
          <Waves className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Recompensas y Puntos</h1>
          <p className="text-muted-foreground">Canjea tus puntos por descuentos, insignias y experiencias únicas</p>
        </div>

        <RewardsDashboard />
      </div>
    </div>
  )
}
