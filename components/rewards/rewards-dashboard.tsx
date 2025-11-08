"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RewardCard } from "./reward-card"
import { Award, Gift, Star, TrendingUp, Target, History } from "lucide-react"
import { mockRewards, type Reward, mockMarketplace } from "@/lib/mock-data"
import { getCurrentUser, ensureReferralCode, getReferralLeaderboard, type User } from "@/lib/auth"
import { Progress } from "@/components/ui/progress"

export function RewardsDashboard() {
  const [rewards, setRewards] = useState<Reward[]>([])
  const [redeemedRewards, setRedeemedRewards] = useState<string[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [filter, setFilter] = useState<"all" | "available" | "redeemed">("all")

  useEffect(() => {
    setRewards(mockRewards)
    const u = getCurrentUser()
    if (u) ensureReferralCode()
  setUser(getCurrentUser())
    // Load redeemed rewards from localStorage
    const redeemed = JSON.parse(localStorage.getItem("redeemedRewards") || "[]")
    setRedeemedRewards(redeemed)
  }, [])
  // Level system
  const LEVELS = [
    { name: 'Novato', min: 0, max: 500 },
    { name: 'Voluntario', min: 501, max: 1000 },
    { name: 'Guardián', min: 1001, max: 2000 },
    { name: 'Protector', min: 2001, max: 5000 },
    { name: 'Héroe Eco', min: 5001, max: Infinity },
  ]
  const currentLevel = user ? (LEVELS.find(l => user.points >= l.min && user.points <= l.max) || LEVELS[0]) : LEVELS[0]
  const nextLevel = LEVELS.find(l => l.min > currentLevel.min) || currentLevel
  const progressPct = user ? (currentLevel.max === Infinity ? 100 : ((user.points - currentLevel.min) / (currentLevel.max - currentLevel.min)) * 100) : 0
  const pointsToNext = user ? (nextLevel.min > user.points ? nextLevel.min - user.points : 0) : 0

  const leaderboard = getReferralLeaderboard()
  const referralUrl = typeof window !== 'undefined' && user ? `${window.location.origin}/events?ref=${user.referralCode}` : ''


  const handleRedeem = (rewardId: string) => {
    const newRedeemed = [...redeemedRewards, rewardId]
    setRedeemedRewards(newRedeemed)
    localStorage.setItem("redeemedRewards", JSON.stringify(newRedeemed))
  }

  const filteredRewards = rewards.filter((reward) => {
    switch (filter) {
      case "available":
        return reward.available && !redeemedRewards.includes(reward.id) && (!!user && user.points >= reward.points)
      case "redeemed":
        return redeemedRewards.includes(reward.id)
      default:
        return true
    }
  })

  const availableRewards = rewards.filter((r) => r.available && !redeemedRewards.includes(r.id))
  const canRedeemCount = availableRewards.filter((r) => user && user.points >= r.points).length

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
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-xs">
              <span>Nivel actual: {currentLevel.name}</span>
              {currentLevel.max !== Infinity && <span>Próximo: {nextLevel.name} ({pointsToNext} pts)</span>}
            </div>
            <Progress value={progressPct} className="h-3" />
            {currentLevel.max === Infinity ? (
              <div className="text-xs text-green-700">Has alcanzado el máximo nivel. ¡Eres un Héroe Eco! 🌟</div>
            ) : (
              <div className="text-xs text-muted-foreground">Te faltan {pointsToNext} puntos para {nextLevel.name}</div>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Referral section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Programa de Referidos</CardTitle>
          <CardDescription>Comparte tu código y gana 200 puntos por nuevos voluntarios</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
            <div className="text-sm">Tu código: <span className="font-mono font-semibold">{user.referralCode}</span></div>
            <Button size="sm" variant="outline" onClick={()=>navigator.clipboard.writeText(referralUrl)}>Copiar link</Button>
            <Button size="sm" variant="secondary" onClick={()=>window.open(`https://wa.me/?text=${encodeURIComponent('Únete a EcoPlaya con mi código '+referralUrl)}`,'_blank')}>Compartir WhatsApp</Button>
          </div>
          <div className="text-xs text-muted-foreground">Ambos reciben 200 pts cuando el referido completa su primer evento.</div>
          {leaderboard.length>0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Top Referidores del Mes</h4>
              <div className="space-y-1 text-xs">
                {leaderboard.map((l,i)=>(
                  <div key={l.code} className="flex justify-between border rounded px-2 py-1">
                    <span className="font-mono">{l.code}</span>
                    <span className="font-semibold">{l.count}</span>
                  </div>
                ))}
                {leaderboard.length===0 && <div className="text-muted-foreground">Sin referidos aún</div>}
              </div>
            </div>
          )}
        </CardContent>
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

      {/* Marketplace Eco */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Gift className="h-5 w-5"/> Marketplace Eco</CardTitle>
          <CardDescription>Productos y servicios eco-friendly ofrecidos por aliados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockMarketplace.map(item => (
              <div key={item.id} className="border rounded-lg p-3 flex flex-col">
                <img src={item.image} alt={item.title} className="h-32 w-full object-cover rounded mb-2" />
                <div className="font-medium text-sm mb-1">{item.title}</div>
                <div className="text-xs text-muted-foreground mb-2 line-clamp-3">{item.description}</div>
                <div className="flex justify-between items-center mt-auto">
                  <Badge variant="secondary">{item.points} pts</Badge>
                  <Button size="sm" disabled={user.points < item.points}>Canjear</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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
              <Badge variant="secondary">200 puntos</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
