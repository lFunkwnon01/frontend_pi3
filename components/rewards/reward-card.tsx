"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Gift, Star, Coffee, Award, Compass, CheckCircle } from "lucide-react"
import type { Reward } from "@/lib/mock-data"

interface RewardCardProps {
  reward: Reward
  userPoints: number
  onRedeem?: (rewardId: string) => void
  isRedeemed?: boolean
}

export function RewardCard({ reward, userPoints, onRedeem, isRedeemed = false }: RewardCardProps) {
  const [isRedeeming, setIsRedeeming] = useState(false)

  const handleRedeem = async () => {
    setIsRedeeming(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    onRedeem?.(reward.id)
    setIsRedeeming(false)
  }

  const getCategoryIcon = (category: Reward["category"]) => {
    switch (category) {
      case "discount":
        return <Gift className="h-4 w-4" />
      case "badge":
        return <Award className="h-4 w-4" />
      case "experience":
        return <Compass className="h-4 w-4" />
      default:
        return <Star className="h-4 w-4" />
    }
  }

  const getCategoryText = (category: Reward["category"]) => {
    switch (category) {
      case "discount":
        return "Descuento"
      case "badge":
        return "Insignia"
      case "experience":
        return "Experiencia"
      default:
        return "Recompensa"
    }
  }

  const getCategoryColor = (category: Reward["category"]) => {
    switch (category) {
      case "discount":
        return "bg-green-100 text-green-800"
      case "badge":
        return "bg-yellow-100 text-yellow-800"
      case "experience":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const canRedeem = userPoints >= reward.points && reward.available && !isRedeemed

  return (
    <Card className={`overflow-hidden transition-all hover:shadow-lg ${isRedeemed ? "opacity-75" : ""}`}>
      <div className="aspect-video relative">
        <img src={reward.image || "/placeholder.svg"} alt={reward.title} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4">
          <Badge className={getCategoryColor(reward.category)}>
            {getCategoryIcon(reward.category)}
            <span className="ml-1">{getCategoryText(reward.category)}</span>
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-white/90 text-foreground">
            {reward.points} pts
          </Badge>
        </div>
        {isRedeemed && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-full p-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
        )}
      </div>

      <CardHeader>
        <CardTitle className="text-lg">{reward.title}</CardTitle>
        <CardDescription>{reward.description}</CardDescription>
        {reward.title.includes("Kit de Limpieza Profesional") && (
          <div className="mt-2 text-xs text-primary font-semibold">
            Incluye: trapeador tipo escoba, balde, recogedor, esponja, desinfectante, guantes y trapo (según imagen).
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Partner Info */}
        <div className="flex items-center space-x-2">
          <Coffee className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Ofrecido por {reward.partner}</span>
        </div>

        {/* Points Status */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tus puntos</span>
            <span className={`font-medium ${userPoints >= reward.points ? "text-green-600" : "text-red-600"}`}>
              {userPoints} / {reward.points}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                userPoints >= reward.points ? "bg-green-500" : "bg-primary"
              }`}
              style={{
                width: `${Math.min((userPoints / reward.points) * 100, 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Redeem Button */}
        <div className="pt-2">
          {isRedeemed ? (
            <Button disabled className="w-full">
              <CheckCircle className="h-4 w-4 mr-2" />
              Ya canjeado
            </Button>
          ) : !reward.available ? (
            <Button disabled className="w-full">
              No disponible
            </Button>
          ) : (
            <Button
              onClick={handleRedeem}
              disabled={!canRedeem || isRedeeming}
              className="w-full"
              variant={canRedeem ? "default" : "secondary"}
            >
              {isRedeeming ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Canjeando...
                </>
              ) : !canRedeem ? (
                userPoints < reward.points ? (
                  `Necesitas ${reward.points - userPoints} puntos más`
                ) : (
                  "No disponible"
                )
              ) : (
                <>
                  <Gift className="h-4 w-4 mr-2" />
                  Canjear Recompensa
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
