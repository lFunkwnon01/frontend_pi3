import { Play } from "lucide-react"

export function VideoSection() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Qué es EcoPlaya?</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Descubre cómo estamos transformando la limpieza de playas en Perú a través de la tecnología y la colaboración comunitaria.
                    </p>
                </div>

                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video max-w-4xl mx-auto group cursor-pointer">
                    <img
                        src="https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?q=80&w=2071&auto=format&fit=crop"
                        alt="Video thumbnail"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Play className="h-8 w-8 text-primary-600 ml-1" fill="currentColor" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
