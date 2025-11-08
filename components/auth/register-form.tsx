"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { registerExtended } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"

interface RegisterFormProps {
  onSuccess?: () => void
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [district, setDistrict] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      setIsLoading(false)
      return
    }

    if (!acceptedTerms) {
      setError("Debes aceptar los términos")
      setIsLoading(false)
      return
    }

    try {
      const user = await registerExtended(email, password, name, district || undefined, phone || undefined)
      if (user) {
        onSuccess?.()
        toast({ title: "¡Bienvenido a EcoPlaya!", description: "Tu cuenta ha sido creada correctamente." })
        router.push("/dashboard")
        router.refresh()
      } else {
        setError("Error al crear la cuenta")
      }
    } catch (err) {
      setError("Error al registrarse")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-primary">Crear Cuenta</CardTitle>
        <CardDescription>Únete a la comunidad EcoPlaya</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input id="name" type="text" placeholder="Tu nombre" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
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
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Distrito</Label>
            <Select value={district} onValueChange={(v) => setDistrict(v)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona tu distrito" />
              </SelectTrigger>
              <SelectContent>
                {['Miraflores','Barranco','Chorrillos','San Miguel','Magdalena','La Punta'].map(d => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono (opcional)</Label>
            <Input id="phone" type="tel" placeholder="999-999-999" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="flex items-start gap-2 pt-1">
            <Checkbox id="terms" checked={acceptedTerms} onCheckedChange={(v) => setAcceptedTerms(!!v)} />
            <Label htmlFor="terms" className="text-sm leading-tight">
              Acepto los <span className="underline">términos y condiciones</span> y la <span className="underline">política de privacidad</span>.
            </Label>
          </div>
          {error && <div className="text-sm text-destructive text-center">{error}</div>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <span className="flex items-center justify-center gap-2"><Loader2 className="animate-spin size-4" /> Creando...</span> : "Crear Cuenta"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
