import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react"

export function NextEvent() {
    return (
        <Card className="mb-8 overflow-hidden border-none shadow-lg bg-gradient-to-r from-primary-600 to-primary-800 text-white">
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 p-6">
                    <div className="inline-flex items-center rounded-full border border-primary-400 bg-primary-700/50 px-3 py-1 text-xs font-semibold text-primary-100 mb-4">
                        Próximo Evento
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Gran Limpieza de Playa Agua Dulce</h3>
                    <p className="text-primary-100 mb-6 max-w-lg">
                        Únete a nosotros para la limpieza mensual más grande de la temporada. Habrá música, comida y premios para los participantes.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-primary-200" />
                            <span className="font-medium">20 Ene, 2024</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-primary-200" />
                            <span className="font-medium">08:00 AM</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-primary-200" />
                            <span className="font-medium">Chorrillos, Lima</span>
                        </div>
                    </div>

                    <Button variant="secondary" className="bg-white text-primary-700 hover:bg-gray-100 border-none">
                        Confirmar Asistencia <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>

                <div className="hidden md:block relative">
                    <img
                        src="https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=2070&auto=format&fit=crop"
                        alt="Evento"
                        className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-4xl font-bold">03</div>
                            <div className="text-sm uppercase tracking-widest">Días</div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
