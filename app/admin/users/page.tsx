"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Building2, Shield, Search, Award, Calendar, TrendingUp } from "lucide-react"

// Mock users data
const mockUsers = [
  {
    id: "1",
    email: "juan@example.com",
    name: "Juan Pérez",
    role: "user",
    points: 1250,
    level: "Guardián del Mar",
    avatar: "/abstract-profile.png",
    joined: "2024-01-15",
    eventsAttended: 12,
    reportsSubmitted: 8,
    status: "active",
  },
  {
    id: "2",
    email: "maria@example.com",
    name: "María González",
    role: "user",
    points: 850,
    level: "Protector de Playa",
    avatar: "/abstract-profile.png",
    joined: "2024-02-20",
    eventsAttended: 7,
    reportsSubmitted: 5,
    status: "active",
  },
  {
    id: "3",
    email: "org@ecoplaya.com",
    name: "EcoPlaya Foundation",
    role: "organization",
    points: 5000,
    level: "Organización Verificada",
    avatar: "/placeholder-logo.png",
    joined: "2023-12-01",
    eventsCreated: 15,
    status: "active",
  },
  {
    id: "4",
    email: "miraflores@municipalidad.pe",
    name: "Municipalidad de Miraflores",
    role: "organization",
    points: 8500,
    level: "Organización Oficial",
    avatar: "/placeholder-logo.png",
    joined: "2023-11-15",
    eventsCreated: 23,
    status: "active",
  },
]

export default function AdminUsersPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/auth")
      return
    }
    if (currentUser.role !== "admin") {
      router.push("/dashboard")
      return
    }
    setUser(currentUser)
  }, [router])

  if (!user) {
    return null
  }

  const regularUsers = mockUsers.filter(u => u.role === "user")
  const organizations = mockUsers.filter(u => u.role === "organization")
  const allUsers = mockUsers

  const filteredUsers = allUsers.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "user":
        return <Badge variant="outline"><User className="mr-1 h-3 w-3" />Usuario</Badge>
      case "organization":
        return <Badge className="bg-blue-500"><Building2 className="mr-1 h-3 w-3" />Organización</Badge>
      case "admin":
        return <Badge variant="destructive"><Shield className="mr-1 h-3 w-3" />Admin</Badge>
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Activo</Badge>
      case "suspended":
        return <Badge variant="destructive">Suspendido</Badge>
      case "pending":
        return <Badge variant="outline">Pendiente</Badge>
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Gestión de Usuarios</h1>
        <p className="text-muted-foreground text-base">Administra usuarios y organizaciones de la plataforma</p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Usuarios Totales</CardTitle>
            <User className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{allUsers.length}</div>
            <p className="text-xs text-muted-foreground mt-1">En la plataforma</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Usuarios Regulares</CardTitle>
            <User className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{regularUsers.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Voluntarios activos</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Organizaciones</CardTitle>
            <Building2 className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{organizations.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Organizaciones verificadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todos ({allUsers.length})</TabsTrigger>
          <TabsTrigger value="users">Usuarios ({regularUsers.length})</TabsTrigger>
          <TabsTrigger value="organizations">Organizaciones ({organizations.length})</TabsTrigger>
        </TabsList>

        {/* All Users */}
        <TabsContent value="all" className="space-y-4">
          {filteredUsers.map((userItem) => (
            <Card key={userItem.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={userItem.avatar} />
                      <AvatarFallback>
                        {userItem.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-xl">{userItem.name}</CardTitle>
                        {getRoleBadge(userItem.role)}
                        {getStatusBadge(userItem.status)}
                      </div>
                      <CardDescription>{userItem.email}</CardDescription>
                      <p className="text-sm text-muted-foreground mt-1">
                        <Calendar className="inline h-3 w-3 mr-1" />
                        Unido el {new Date(userItem.joined).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Nivel</p>
                    <p className="font-medium">{userItem.level}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Puntos</p>
                    <p className="font-medium">
                      <Award className="inline h-3 w-3 mr-1 text-primary" />
                      {userItem.points}
                    </p>
                  </div>
                  {userItem.role === "user" && (
                    <>
                      <div>
                        <p className="text-muted-foreground">Eventos</p>
                        <p className="font-medium">{userItem.eventsAttended} asistidos</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Reportes</p>
                        <p className="font-medium">{userItem.reportsSubmitted} enviados</p>
                      </div>
                    </>
                  )}
                  {userItem.role === "organization" && (
                    <div>
                      <p className="text-muted-foreground">Eventos Creados</p>
                      <p className="font-medium">{userItem.eventsCreated}</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    Ver Perfil Completo
                  </Button>
                  <Button variant="outline" size="sm">
                    Ver Actividad
                  </Button>
                  {userItem.status === "active" ? (
                    <Button variant="destructive" size="sm">
                      Suspender Usuario
                    </Button>
                  ) : (
                    <Button variant="default" size="sm">
                      Activar Usuario
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Users Only */}
        <TabsContent value="users" className="space-y-4">
          {regularUsers.map((userItem) => (
            <Card key={userItem.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={userItem.avatar} />
                      <AvatarFallback>
                        {userItem.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-xl">{userItem.name}</CardTitle>
                        {getRoleBadge(userItem.role)}
                      </div>
                      <CardDescription>{userItem.email}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Puntos</p>
                    <p className="font-medium text-primary">{userItem.points}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Nivel</p>
                    <p className="font-medium">{userItem.level}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Eventos</p>
                    <p className="font-medium">{userItem.eventsAttended}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Reportes</p>
                    <p className="font-medium">{userItem.reportsSubmitted}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Organizations Only */}
        <TabsContent value="organizations" className="space-y-4">
          {organizations.map((org) => (
            <Card key={org.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={org.avatar} />
                      <AvatarFallback>
                        <Building2 className="h-8 w-8" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-xl">{org.name}</CardTitle>
                        {getRoleBadge(org.role)}
                      </div>
                      <CardDescription>{org.email}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Puntos</p>
                    <p className="font-medium text-primary">{org.points}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Estado</p>
                    <p className="font-medium">{org.level}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Eventos Creados</p>
                    <p className="font-medium">{org.eventsCreated}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    Ver Eventos
                  </Button>
                  <Button variant="outline" size="sm">
                    Historial
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
