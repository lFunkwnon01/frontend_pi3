"use client"


import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Waves, MapPin, Camera, Calendar, Award, GraduationCap, Users } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
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

  const testimonios = [
    {
      nombre: "María Torres",
      texto: "EcoPlaya me ayudó a cumplir mis horas de voluntariado universitario y a hacer nuevas amistades. ¡Una experiencia que recomiendo a todos!",
      rol: "Estudiante de Ciencias Ambientales",
      foto: "/testimonio_1.jpg",
    },
    {
      nombre: "Juan Pérez",
      texto: "EcoPlaya me permitió cumplir mis horas de voluntariado universitario y conocer personas increíbles. ¡Recomiendo la experiencia!",
      rol: "Estudiante de Ingeniería Ambiental",
      foto: "/testimonio_2.jpeg",
    },
    {
      nombre: "Carlos Ramírez",
      texto: "Gracias a EcoPlaya pude participar en eventos de limpieza cerca de mi casa y sentirme parte de una comunidad comprometida.",
      rol: "Vecino de Barranco",
      foto: "/testimonio_3.jpeg",
    },
    {
      nombre: "Lucía Fernández",
      texto: "Me encantó la facilidad para encontrar actividades de voluntariado y el reconocimiento que recibí por mi esfuerzo.",
      rol: "Voluntaria y estudiante de Biología",
      foto: "/testimonio_4.jpg",
    },
  ]

  const logos = [
    { src: "/starbucks_logo.png", alt: "Starbucks" },
    { src: "/aje_logo.png", alt: "AJE" },
    { src: "/beso frances logo.jpeg", alt: "Beso Francés" },
    { src: "/logo de tambo.png", alt: "Tambo" },
    { src: "/metro logo.jpeg", alt: "Metro" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 hero-mar-bg">
        <div className="absolute inset-0 z-0 animate-mar-bg" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Waves className="h-12 w-12 text-primary drop-shadow-lg" />
            <h1 className="text-5xl font-bold text-primary drop-shadow-lg">EcoPlaya</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance drop-shadow">
            Únete a la comunidad que protege nuestras costas. Reporta, participa y ayuda a mantener nuestras playas limpias para las futuras generaciones.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button size="lg" asChild>
              <Link href="/auth">Comenzar Ahora</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/dashboard">Ver Mapa</Link>
            </Button>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-muted-foreground">Descarga nuestra app y únete al cambio</span>
            <div className="flex gap-2 justify-center">
              <Button size="sm" variant="secondary" asChild>
                <a href="#">App Store</a>
              </Button>
              <Button size="sm" variant="secondary" asChild>
                <a href="#">Google Play</a>
              </Button>
            </div>
          </div>
        </div>
        {/* Fondo animado marino con burbujas */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="mar-bubbles" />
        </div>
      </section>

      {/* Logos Carousel */}
      <section className="bg-white py-8">
        <div className="max-w-5xl mx-auto px-4">
          <Carousel opts={{ loop: true }}>
            <CarouselContent className="flex items-center">
              {logos.map((logo, idx) => (
                <CarouselItem key={idx} className="basis-1/3 md:basis-1/6 flex justify-center items-center">
                  <img src={logo.src} alt={logo.alt} className="h-16 object-contain grayscale hover:grayscale-0 transition-all duration-300" />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-20 bg-muted">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-primary">Nuestra Misión</h2>
            <p className="text-lg text-muted-foreground mb-6">Promover el cuidado colaborativo de las costas, conectando voluntarios, estudiantes y organizaciones para lograr playas limpias y sostenibles.</p>
            <h2 className="text-3xl font-bold mb-4 text-primary">Nuestra Visión</h2>
            <p className="text-lg text-muted-foreground">Ser la plataforma líder en voluntariado ambiental costero, generando impacto positivo en comunidades y ecosistemas.</p>
          </div>
          <div className="flex flex-col gap-6">
            <Card className="bg-white/80">
              <CardHeader className="flex flex-row items-center gap-3">
                <GraduationCap className="h-8 w-8 text-primary" />
                <CardTitle>¿Eres estudiante?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Participa en actividades de voluntariado y cumple tus horas requeridas para graduarte. Obtén certificados y haz networking con organizaciones aliadas.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="bg-white/80">
              <CardHeader className="flex flex-row items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                <CardTitle>Organizaciones y Universidades</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Conecta con voluntarios motivados, organiza eventos y reporta el impacto de tus actividades ambientales de manera sencilla y transparente.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">¿Qué puedes hacer en EcoPlaya?</h2>
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

      {/* Testimonios */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">Testimonios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonios.map((t, idx) => (
              <Card key={idx} className="max-w-md w-full mx-auto text-center">
                <CardHeader className="flex flex-col items-center">
                  <img src={t.foto} alt={t.nombre} className="h-16 w-16 rounded-full mb-2 object-cover" />
                  <CardTitle>{t.nombre}</CardTitle>
                  <CardDescription>{t.rol}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg italic">"{t.texto}"</p>
                </CardContent>
              </Card>
            ))}
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
