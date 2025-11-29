import { Flag, Truck, Droplet } from "lucide-react"

export function Stats() {
    return (
        <section className="py-20 bg-primary-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div className="flex flex-col items-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                            <Flag className="h-8 w-8 text-green-400" />
                        </div>
                        <div className="text-5xl font-bold mb-2">37</div>
                        <div className="text-xl text-gray-300">Playas Saludables</div>
                        <div className="text-sm text-gray-400 mt-2">de 130 monitoreadas</div>
                    </div>

                    <div className="flex flex-col items-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
                            <Truck className="h-8 w-8 text-blue-400" />
                        </div>
                        <div className="text-5xl font-bold mb-2">8.5M</div>
                        <div className="text-xl text-gray-300">Toneladas de Basura</div>
                        <div className="text-sm text-gray-400 mt-2">llegan al mar cada año</div>
                    </div>

                    <div className="flex flex-col items-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors">
                        <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mb-6">
                            <Droplet className="h-8 w-8 text-cyan-400" />
                        </div>
                        <div className="text-5xl font-bold mb-2">69%</div>
                        <div className="text-xl text-gray-300">Residuos Plásticos</div>
                        <div className="text-sm text-gray-400 mt-2">en nuestras costas</div>
                    </div>
                </div>
            </div>
        </section>
    )
}
