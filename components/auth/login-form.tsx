"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { login, forgotPassword, socialLogin } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Loader2, Facebook, Mail, Globe } from "lucide-react"

interface LoginFormProps {
  onSuccess?: () => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [forgotOpen, setForgotOpen] = useState(false)
  const [forgotEmail, setForgotEmail] = useState("")
  const [forgotLoading, setForgotLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

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

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault()
    setForgotLoading(true)
    try {
      await forgotPassword(forgotEmail)
      toast({
        title: "Solicitud enviada",
        description: "Si el correo existe te enviaremos instrucciones para recuperar tu contraseña.",
      })
      setForgotOpen(false)
      setForgotEmail("")
    } catch {
      toast({ title: "Error", description: "No se pudo procesar la solicitud", })
    } finally {
      setForgotLoading(false)
    }
  }

  const handleSocial = async (provider: "google" | "facebook") => {
    setIsLoading(true)
    try {
      const user = await socialLogin(provider)
      if (user) {
        toast({ title: "Bienvenido", description: `Autenticado con ${provider === "google" ? "Google" : "Facebook"}` })
        router.push("/dashboard")
        router.refresh()
      }
    } catch {
      toast({ title: "Error", description: "Falló el inicio social" })
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
          <div className="space-y-2">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <span className="flex items-center justify-center gap-2"><Loader2 className="animate-spin size-4" /> Iniciando...</span> : "Iniciar Sesión"}
            </Button>
            <div className="text-right">
              <Dialog open={forgotOpen} onOpenChange={setForgotOpen}>
                <DialogTrigger asChild>
                  <Button type="button" variant="link" className="px-0 text-xs">Olvidé mi contraseña</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Recuperar contraseña</DialogTitle>
                    <DialogDescription>Ingresa tu correo y te enviaremos un enlace de recuperación.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleForgot} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="forgotEmail">Email</Label>
                      <Input id="forgotEmail" type="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} required />
                    </div>
                    <DialogFooter className="sm:justify-between">
                      <Button variant="outline" type="button" onClick={() => setForgotOpen(false)}>Cancelar</Button>
                      <Button type="submit" disabled={forgotLoading}>{forgotLoading ? <Loader2 className="animate-spin size-4" /> : "Enviar"}</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="pt-2">
            <Separator className="my-4" />
            <p className="text-xs font-medium text-center text-muted-foreground mb-3">O continúa con</p>
            <div className="grid grid-cols-2 gap-3">
              <Button type="button" variant="outline" disabled={isLoading} onClick={() => handleSocial("google")} className="flex items-center gap-2">
                <Globe className="size-4" /> Google
              </Button>
              <Button type="button" variant="outline" disabled={isLoading} onClick={() => handleSocial("facebook")} className="flex items-center gap-2">
                <Facebook className="size-4" /> Facebook
              </Button>
            </div>
          </div>
          
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
