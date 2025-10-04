"use client"

import { useState } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { Button } from "@/components/ui/button"
import { Waves } from "lucide-react"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and branding */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <Waves className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary">EcoPlaya</h1>
          </div>
          <p className="text-muted-foreground">Protegiendo nuestras costas juntos</p>
        </div>

        {/* Auth forms */}
        {isLogin ? <LoginForm /> : <RegisterForm />}

        {/* Toggle between login and register */}
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">{isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}</p>
          <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="text-primary">
            {isLogin ? "Crear cuenta" : "Iniciar sesión"}
          </Button>
        </div>
      </div>
    </div>
  )
}
