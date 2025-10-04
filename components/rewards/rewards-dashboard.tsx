"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RewardCard } from "./reward-card"
import { Award, Gift, Star, TrendingUp, Target, History } from "lucide-react"
import { mockRewards, type Reward } from "@/lib/mock-data"
import { getCurrentUser } from "@/lib/auth"

export function RewardsDashboard() {
  const [rewards, setRewards] = useState<Reward[]>([])
  const [redeemedRewards, setRedeemedRewards] = useState<string[]>([])
  const [user, setUser] = useState(null)
  const [filter, setFilter] = useState<"all" | "available" | "redeemed">("all")

  useEffect(() => {
    setRewards(mockRewards)
    setUser(getCurrentUser())
    // Load redeemed rewards from localStorage
    const redeemed = JSON.parse(localStorage.getItem("redeemedRewards") || "[]")
    setRedeemedRewards(redeemed)
  }, [])

  const handleRedeem = (rewardId: string) => {
    const newRedeemed = [...redeemedRewards, rewardId]
    setRedeemedRewards(newRedeemed)
    localStorage.setItem("redeemedRewards", JSON.stringify(newRedeemed))
  }

  const filteredRewards = rewards.filter((reward) => {
    switch (filter) {
      case "available":
        return reward.available && !redeemedRewards.includes(reward.id) && user?.points >= reward.points
      case "redeemed":
        return redeemedRewards.includes(reward.id)
      default:
        return true
    }
  })

  const availableRewards = rewards.filter((r) => r.available && !redeemedRewards.includes(r.id))
  const canRedeemCount = availableRewards.filter((r) => user?.points >= r.points).length

  if (!user) return null

  return (
    <div className="space-y-6">
      {/* User Points Overview */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Tus Puntos EcoPlaya</CardTitle>
              <CardDescription>Gana puntos participando en eventos y reportando problemas</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-primary">{user.points}</div>
              <Badge variant="secondary" className="mt-2">
                <Award className="h-3 w-3 mr-1" />
                {user.level}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Gift className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{availableRewards.length}</div>
              <div className="text-sm text-muted-foreground">Recompensas Disponibles</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{canRedeemCount}</div>
              <div className="text-sm text-muted-foreground">Puedes Canjear</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <History className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{redeemedRewards.length}</div>
              <div className="text-sm text-muted-foreground">Ya Canjeadas</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">+23%</div>
              <div className="text-sm text-muted-foreground">Crecimiento Mensual</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rewards Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <TabsList>
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="available">Disponibles</TabsTrigger>
            <TabsTrigger value="redeemed">Canjeadas</TabsTrigger>
          </TabsList>

          {/* Filter Buttons */}
          <div className="flex items-center space-x-2">
            <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
              Todas
            </Button>
            <Button
              variant={filter === "available" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("available")}
            >
              Disponibles
            </Button>
            <Button
              variant={filter === "redeemed" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("redeemed")}
            >
              Canjeadas
            </Button>
          </div>
        </div>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRewards.map((reward) => (
              <RewardCard
                key={reward.id}
                reward={reward}
                userPoints={user.points}
                onRedeem={handleRedeem}
                isRedeemed={redeemedRewards.includes(reward.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="available">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards
              .filter((r) => r.available && !redeemedRewards.includes(r.id))
              .map((reward) => (
                <RewardCard
                  key={reward.id}
                  reward={reward}
                  userPoints={user.points}
                  onRedeem={handleRedeem}
                  isRedeemed={false}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="redeemed">
          {redeemedRewards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewards
                .filter((r) => redeemedRewards.includes(r.id))
                .map((reward) => (
                  <RewardCard
                    key={reward.id}
                    reward={reward}
                    userPoints={user.points}
                    onRedeem={handleRedeem}
                    isRedeemed={true}
                  />
                ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <Gift className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No has canjeado recompensas aún</h3>
                  <p className="text-muted-foreground mb-4">
                    Participa en eventos y reporta problemas para ganar puntos
                  </p>
                  <Button onClick={() => setFilter("available")}>Ver Recompensas Disponibles</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* How to Earn Points */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5" />
            <span>Cómo Ganar Puntos</span>
          </CardTitle>
          <CardDescription>Diferentes formas de contribuir y ganar puntos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Award className="h-8 w-8 text-primary mx-auto mb-2" />
              <h4 className="font-medium mb-1">Participar en Eventos</h4>
              <p className="text-sm text-muted-foreground mb-2">Únete a jornadas de limpieza</p>
              <Badge variant="secondary">50-75 puntos</Badge>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <Gift className="h-8 w-8 text-primary mx-auto mb-2" />
              <h4 className="font-medium mb-1">Reportar Problemas</h4>
              <p className="text-sm text-muted-foreground mb-2">Informa sobre basura o contaminación</p>
              <Badge variant="secondary">25 puntos</Badge>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <Star className="h-8 w-8 text-primary mx-auto mb-2" />
              <h4 className="font-medium mb-1">Invitar Amigos</h4>
              <p className="text-sm text-muted-foreground mb-2">Comparte la plataforma con otros</p>
              <Badge variant="secondary">100 puntos</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
