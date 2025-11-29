"use client"

import { RewardsDashboard } from "@/components/rewards/rewards-dashboard"

export default function RewardsPage() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Recompensas y Puntos</h1>
        <p className="text-muted-foreground">Canjea tus puntos por descuentos, insignias y experiencias únicas</p>
      </div>

      <RewardsDashboard />
    </div>
  )
}
