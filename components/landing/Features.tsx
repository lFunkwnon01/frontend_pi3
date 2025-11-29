import { MapPin, Camera, Calendar, Award } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Features() {
    const features = [
        {
            icon: MapPin,
            title: "Mapa Interactivo",
            description: "Visualiza el estado de limpieza de todas las playas en tiempo real y encuentra puntos críticos.",
            color: "text-blue-500",
            bg: "bg-blue-50"
        },
        {
            icon: Camera,
            title: "Reportes Ciudadanos",
            description: "Reporta problemas ambientales con fotos y geolocalización para alertar a la comunidad.",
            color: "text-green-500",
            bg: "bg-green-50"
        },
        {
            icon: Calendar,
            title: "Eventos de Limpieza",
            description: "Únete a jornadas organizadas por la comunidad o crea tu propio evento de limpieza.",
            color: "text-purple-500",
            bg: "bg-purple-50"
        },
        {
            icon: Award,
            title: "Sistema de Recompensas",
            description: "Gana puntos por cada acción positiva y canjéalos por descuentos en comercios aliados.",
            color: "text-amber-500",
            bg: "bg-amber-50"
        },
    ]

    return (
        <section className="py-20 bg-white" id="features">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Todo lo que necesitas para actuar</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Herramientas digitales diseñadas para maximizar tu impacto ambiental.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                            <CardHeader>
                                <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mb-4 mx-auto transition-transform group-hover:rotate-6`}>
                                    <feature.icon className={`h-7 w-7 ${feature.color}`} />
                                </div>
                                <CardTitle className="text-xl text-center">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-center text-gray-600 leading-relaxed">
                                    {feature.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
