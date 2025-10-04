"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Waves, MapPin, Camera, Calendar, Award } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Si el usuario ya está autenticado, redirigir al dashboard
    const user = getCurrentUser()
    if (user) {
      router.push("/dashboard")
    }
  }, [router])
  const features = [
    {
      icon: MapPin,
      title: "Mapa Interactivo",
      description: "Visualiza el estado de limpieza de todas las playas en tiempo real",
    },
    {
      icon: Camera,
      title: "Reportes Ciudadanos",
      description: "Reporta problemas ambientales con fotos y geolocalización",
    },
    {
      icon: Calendar,
      title: "Eventos de Limpieza",
      description: "Únete a jornadas organizadas por la comunidad",
    },
    {
      icon: Award,
      title: "Sistema de Recompensas",
      description: "Gana puntos y canjea descuentos por tu participación",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cyan-50 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Waves className="h-12 w-12 text-primary" />
            <h1 className="text-5xl font-bold text-primary">EcoPlaya</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            Únete a la comunidad que protege nuestras costas. Reporta, participa y ayuda a mantener nuestras playas
            limpias para las futuras generaciones.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth">Comenzar Ahora</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/dashboard">Ver Mapa</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Cómo funciona EcoPlaya</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Una plataforma integral para el cuidado colaborativo de nuestras costas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-balance">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-muted py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Nuestro Impacto</h2>
            <p className="text-lg text-muted-foreground">Juntos estamos haciendo la diferencia</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">2,847</div>
              <div className="text-muted-foreground">Voluntarios Activos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">15.4</div>
              <div className="text-muted-foreground">Toneladas de Basura Recolectada</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">23</div>
              <div className="text-muted-foreground">Playas Restauradas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">156</div>
              <div className="text-muted-foreground">Eventos Completados</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">
            ¿Listo para proteger nuestras costas?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 text-balance">
            Únete a miles de voluntarios que ya están haciendo la diferencia
          </p>
          <Button size="lg" asChild>
            <Link href="/auth">Crear Cuenta Gratuita</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
