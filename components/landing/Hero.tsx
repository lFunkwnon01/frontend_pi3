import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Apple, Play } from "lucide-react"

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image/Video */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=2070&auto=format&fit=crop"
                    alt="Playa limpia"
                    className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-900/50 to-transparent" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight animate-fade-in drop-shadow-lg">
                    Juntos por playas <br />
                    <span className="text-primary-400">más limpias</span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto animate-fade-in-up delay-100 drop-shadow-md">
                    Únete a la comunidad más grande de voluntarios y organizaciones comprometidas con el cuidado de nuestras costas.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up delay-200">
                    <Button size="lg" asChild className="text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                        <Link href="/auth">
                            Únete ahora <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 rounded-full border-white text-white hover:bg-white/10 hover:text-white backdrop-blur-sm">
                        <Link href="/dashboard">
                            Ver mapa interactivo
                        </Link>
                    </Button>
                </div>

                {/* Animated Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up delay-300">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                        <div className="text-4xl font-bold text-white mb-2">2,847</div>
                        <div className="text-blue-100">Voluntarios activos</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                        <div className="text-4xl font-bold text-white mb-2">23</div>
                        <div className="text-blue-100">Playas monitoreadas</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                        <div className="text-4xl font-bold text-white mb-2">15,420 kg</div>
                        <div className="text-blue-100">Residuos recolectados</div>
                    </div>
                </div>

                {/* App Store Buttons */}
                <div className="mt-16 flex flex-col items-center gap-4 animate-fade-in-up delay-500 opacity-0 fill-mode-forwards" style={{ animationFillMode: 'forwards' }}>
                    <span className="text-sm text-gray-300 uppercase tracking-wider">Disponible en</span>
                    <div className="flex gap-4">
                        <Button variant="secondary" className="bg-black text-white hover:bg-gray-900 border border-gray-700 h-12 px-6 rounded-xl">
                            <Apple className="mr-2 h-6 w-6" />
                            <div className="flex flex-col items-start leading-none">
                                <span className="text-[10px]">Consíguelo en el</span>
                                <span className="text-sm font-bold">App Store</span>
                            </div>
                        </Button>
                        <Button variant="secondary" className="bg-black text-white hover:bg-gray-900 border border-gray-700 h-12 px-6 rounded-xl">
                            <Play className="mr-2 h-6 w-6 fill-current" />
                            <div className="flex flex-col items-start leading-none">
                                <span className="text-[10px]">DISPONIBLE EN</span>
                                <span className="text-sm font-bold">Google Play</span>
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
