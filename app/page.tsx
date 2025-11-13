"use client"


import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Camera, Calendar, Award, GraduationCap, Users, Star, Flag, Truck, Droplet, HeartPulse, HelpingHand, Siren } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { getCurrentUser } from "@/lib/auth"
import { BeachMap } from "@/components/map/beach-map"

export default function HomePage() {
  const router = useRouter()
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Si el usuario ya está autenticado, redirigir al dashboard
    const user = getCurrentUser()
    if (user) {
      router.push("/dashboard")
    }
  }, [router])
  
  // Autoplay carrusel testimonios
  useEffect(() => {
    if (!carouselApi) return
    const id = setInterval(() => carouselApi.scrollNext(), 4000)
    autoplayRef.current = id as unknown as NodeJS.Timeout
    return () => clearInterval(id)
  }, [carouselApi])
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

  // Winner foto del mes (guardada por concurso EcoShare) en localStorage
  let monthlyWinner: { month: string; photo: string; likes: number; author?: string } | null = null
  if (typeof window !== 'undefined') {
    try { monthlyWinner = JSON.parse(localStorage.getItem('ecoshare_monthly_winner') || 'null') } catch {}
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 hero-mar-bg">
        <div className="absolute inset-0 z-0 animate-mar-bg" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-6">
                <img src="/logo_png.png" alt="EcoPlaya" className="h-12 w-auto drop-shadow-lg" />
                <h1 className="text-5xl font-bold text-primary drop-shadow-lg">EcoPlaya</h1>
              </div>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl text-balance drop-shadow mx-auto md:mx-0">
                ¡Haz la diferencia en la costa y en tu comunidad desde hoy! Reporta, participa y ayuda a mantener nuestras playas limpias.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 md:justify-start justify-center mb-6">
                <Button size="lg" asChild className="bg-green-600 hover:bg-green-700 text-white shadow-lg">
                  <Link href="/auth">Únete ahora</Link>
                </Button>
                <Button size="default" asChild className="bg-blue-600 hover:bg-blue-700 text-white shadow">
                  <Link href="/dashboard">Ver mapa interactivo</Link>
                </Button>
              </div>
              <div className="flex flex-col md:items-start items-center gap-2">
                <span className="text-sm text-muted-foreground">Descarga nuestra app y únete al cambio</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" asChild>
                    <a href="#">App Store</a>
                  </Button>
                  <Button size="sm" variant="secondary" asChild>
                    <a href="#">Google Play</a>
                  </Button>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="rounded-2xl border shadow-lg bg-white/70 backdrop-blur p-4">
                <img src="/placeholder.svg" alt="Personas limpiando la playa" className="w-full h-[320px] object-contain" />
              </div>
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

      {/* Impacto: Datos duros y info extra */}
      <section className="bg-muted py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Datos duros de nuestras playas</h2>
            <p className="text-lg text-muted-foreground">Lo que medimos, mejoramos</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="transition hover:scale-[1.01]">
              <CardHeader className="flex flex-row items-center gap-3">
                <Flag className="h-8 w-8 text-green-600" />
                <CardTitle className="text-xl">Estado de playas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">37 / 130</div>
                <CardDescription>playas saludables monitoreadas</CardDescription>
              </CardContent>
            </Card>
            <Card className="transition hover:scale-[1.01]">
              <CardHeader className="flex flex-row items-center gap-3">
                <Truck className="h-8 w-8 text-blue-600" />
                <CardTitle className="text-xl">Residuos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8.5M t</div>
                <CardDescription>de basura llegan al mar cada año</CardDescription>
              </CardContent>
            </Card>
            <Card className="transition hover:scale-[1.01]">
              <CardHeader className="flex flex-row items-center gap-3">
                <Droplet className="h-8 w-8 text-cyan-600" />
                <CardTitle className="text-xl">Plástico en playas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">69%</div>
                <CardDescription>de residuos playeros son plástico</CardDescription>
              </CardContent>
            </Card>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>¿Por qué Lima primero?</CardTitle>
                <CardDescription>Alta densidad, impacto visible y red activa de voluntariado</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">La Costa Verde concentra playas muy concurridas y problemas de residuos. Empezamos aquí para aprender rápido, escalar buenas prácticas y luego expandir a otras regiones.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Modelo sostenible</CardTitle>
                <CardDescription>Alianzas responsables y beneficios transparentes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Los aliados financian parte de las operaciones a cambio de visibilidad y programas de voluntariado. Priorizamos iniciativas con impacto real y trazabilidad.</p>
              </CardContent>
            </Card>
          </div>
          {monthlyWinner && (
            <div className="mt-12 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold flex items-center justify-center gap-2 mb-4"><Star className="h-6 w-6 text-primary"/> Foto del Mes</h3>
              <div className="rounded-lg overflow-hidden shadow border bg-background">
                <img src={monthlyWinner.photo} alt="Foto ganadora" className="w-full max-h-[480px] object-cover" />
                <div className="p-4 flex items-center justify-between text-sm">
                  <div>
                    <div className="font-semibold">Ganadora del mes {monthlyWinner.month}</div>
                    <div className="text-muted-foreground">{monthlyWinner.likes} likes • {monthlyWinner.author || 'Autor desconocido'}</div>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <a href="/ecoshare">Ver concurso</a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Mapa Interactivo de Contaminación */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Mapa Interactivo de Contaminación</h2>
            <p className="text-muted-foreground">Explora puntos críticos, niveles y próximos eventos</p>
          </div>
          <BeachMap />
        </div>
      </section>

      {/* Bloque de acciones clave */}
      <section className="py-14 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-center mb-8">Actúa hoy</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button asChild className="h-24 rounded-xl bg-green-600 hover:bg-green-700 text-white shadow-lg">
              <Link href="/auth" className="flex flex-col items-center justify-center">
                <Users className="h-6 w-6 mb-1" />
                <span>Ser voluntario</span>
              </Link>
            </Button>
            <Button asChild className="h-24 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
              <Link href="/org/create-event" className="flex flex-col items-center justify-center">
                <Calendar className="h-6 w-6 mb-1" />
                <span>Organizar limpieza</span>
              </Link>
            </Button>
            <Button asChild className="h-24 rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow-lg">
              <Link href="/auth?ally=1" className="flex flex-col items-center justify-center">
                <Award className="h-6 w-6 mb-1" />
                <span>Inscribirme como aliado</span>
              </Link>
            </Button>
            <Button asChild className="h-24 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg">
              <Link href="/dashboard" className="flex flex-col items-center justify-center">
                <MapPin className="h-6 w-6 mb-1" />
                <span>Mapa de contaminación</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonios - carrusel */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-primary">Testimonios</h2>
          <Carousel opts={{ loop: true }} setApi={setCarouselApi}>
            <CarouselContent className="flex items-stretch">
              {testimonios.map((t, idx) => (
                <CarouselItem key={idx} className="basis-full md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full text-center hover:shadow-lg transition">
                    <CardHeader className="flex flex-col items-center">
                      <img src={t.foto} alt={t.nombre} className="h-16 w-16 rounded-full mb-2 object-cover" />
                      <CardTitle>{t.nombre}</CardTitle>
                      <CardDescription>{t.rol}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center gap-1 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < 5 ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} />
                        ))}
                      </div>
                      <p className="text-base italic">"{t.texto}"</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Crecimiento y futuro */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-center mb-10">Nuestro alcance va más allá</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center gap-3">
                <HeartPulse className="h-6 w-6 text-rose-600" />
                <CardTitle>Rescate de fauna</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Conexión con redes de rescate para actuar ante emergencias de fauna marina.</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-3">
                <HelpingHand className="h-6 w-6 text-emerald-600" />
                <CardTitle>Donaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Apoya con recursos a campañas y equipos comunitarios certificados.</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-3">
                <Siren className="h-6 w-6 text-indigo-600" />
                <CardTitle>Respuesta a emergencias</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Protocolos y alertas comunitarias para derrames u otros eventos críticos.</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">¿Listo para proteger nuestras costas?</h2>
          <p className="text-lg text-muted-foreground mb-8 text-balance">Únete a miles de voluntarios que ya están haciendo la diferencia</p>
          <Button size="lg" asChild className="bg-green-600 hover:bg-green-700 text-white shadow-lg">
            <Link href="/auth">Crear cuenta gratuita</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
