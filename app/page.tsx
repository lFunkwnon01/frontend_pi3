"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, ArrowRight } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { getCurrentUser } from "@/lib/auth"
import { BeachMap } from "@/components/map/beach-map"

import { AppNavbar } from "@/components/layout/AppNavbar"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/landing/Hero"
import { Sponsors } from "@/components/landing/Sponsors"
import { VideoSection } from "@/components/landing/VideoSection"
import { Features } from "@/components/landing/Features"
import { Stats } from "@/components/landing/Stats"
import { TargetAudience } from "@/components/landing/TargetAudience"

export default function HomePage() {
  const router = useRouter()
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)

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
    return () => clearInterval(id)
  }, [carouselApi])

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

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AppNavbar />

      <main className="flex-grow">
        <Hero />
        <Sponsors />
        <VideoSection />
        <Features />
        <Stats />

        {/* Map Preview Section */}
        <section className="py-20 bg-gray-50" id="map">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Mapa Interactivo de Contaminación</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explora el estado de nuestras playas en tiempo real. Identifica zonas críticas y eventos cercanos.
              </p>
            </div>

            <div className="h-[500px] rounded-2xl overflow-hidden shadow-xl border border-gray-200 relative group">
              <BeachMap />
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <Button size="lg" className="shadow-lg pointer-events-auto" asChild>
                  <Link href="/dashboard">Explorar mapa completo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <TargetAudience />

        {/* Testimonials Section */}
        <section className="py-20 bg-white" id="testimonials">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Lo que dice nuestra comunidad</h2>
              <p className="text-lg text-gray-600">Historias reales de personas que están haciendo la diferencia</p>
            </div>

            <Carousel opts={{ loop: true }} setApi={setCarouselApi} className="max-w-5xl mx-auto">
              <CarouselContent className="-ml-4">
                {testimonios.map((t, idx) => (
                  <CarouselItem key={idx} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all">
                      <CardHeader className="flex flex-col items-center pb-2">
                        <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-4 border-primary-100">
                          <img src={t.foto} alt={t.nombre} className="w-full h-full object-cover" />
                        </div>
                        <CardTitle className="text-lg">{t.nombre}</CardTitle>
                        <CardDescription className="text-center">{t.rol}</CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className="flex justify-center gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                        <p className="text-gray-600 italic">"{t.texto}"</p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-primary-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl font-bold text-white mb-6">¿Listo para ser parte del cambio?</h2>
            <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
              No esperes más. Únete hoy a EcoPlaya y comienza a transformar tu entorno. Es gratis y toma menos de 2 minutos.
            </p>
            <Button size="lg" variant="secondary" className="text-primary-700 font-bold text-lg px-10 py-6 h-auto shadow-xl hover:scale-105 transition-transform" asChild>
              <Link href="/auth">
                Crear cuenta gratuita <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
