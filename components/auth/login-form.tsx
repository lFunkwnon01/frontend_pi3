"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { login } from "@/lib/auth"
import { useRouter } from "next/navigation"

interface LoginFormProps {
  onSuccess?: () => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const user = await login(email, password)
      if (user) {
        onSuccess?.()
        router.push("/dashboard")
        router.refresh()
      } else {
        setError("Credenciales inválidas")
      }
    } catch (err) {
      setError("Error al iniciar sesión")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-primary">Iniciar Sesión</CardTitle>
        <CardDescription>Accede a tu cuenta de EcoPlaya</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-sm text-destructive text-center">{error}</div>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>
          
          {/* Demo Credentials */}
          <div className="space-y-2 pt-2 border-t">
            <p className="text-xs font-semibold text-center text-muted-foreground">Credenciales de prueba:</p>
            <div className="space-y-1.5">
              <div className="text-xs text-center bg-muted/50 rounded p-2">
                <span className="font-medium">Usuario:</span> juan@example.com / password
              </div>
              <div className="text-xs text-center bg-muted/50 rounded p-2">
                <span className="font-medium">Organización:</span> org@ecoplaya.com / org123
              </div>
              <div className="text-xs text-center bg-muted/50 rounded p-2">
                <span className="font-medium">Admin:</span> admin@ecoplaya.com / admin123
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
