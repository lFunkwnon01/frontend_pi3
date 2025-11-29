"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Users, Building2, ArrowRight } from "lucide-react"
import Link from "next/link"

export function TargetAudience() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">EcoPlaya es para todos</h2>
                    <p className="text-lg text-gray-600">Elige cómo quieres participar en el cambio</p>
                </div>

                <Tabs defaultValue="volunteers" className="w-full max-w-4xl mx-auto">
                    <TabsList className="grid w-full grid-cols-3 mb-8 h-auto p-1 bg-white rounded-full shadow-sm border">
                        <TabsTrigger value="volunteers" className="rounded-full py-3 data-[state=active]:bg-primary-500 data-[state=active]:text-white">Voluntarios</TabsTrigger>
                        <TabsTrigger value="students" className="rounded-full py-3 data-[state=active]:bg-primary-500 data-[state=active]:text-white">Estudiantes</TabsTrigger>
                        <TabsTrigger value="organizations" className="rounded-full py-3 data-[state=active]:bg-primary-500 data-[state=active]:text-white">Organizaciones</TabsTrigger>
                    </TabsList>

                    <TabsContent value="volunteers">
                        <Card className="border-none shadow-lg">
                            <div className="grid md:grid-cols-2 gap-6 items-center p-6">
                                <div className="order-2 md:order-1">
                                    <CardHeader>
                                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                                            <Users className="h-6 w-6 text-green-600" />
                                        </div>
                                        <CardTitle className="text-2xl">Únete como Voluntario</CardTitle>
                                        <CardDescription className="text-lg mt-2">
                                            Participa en limpiezas de playa, conoce gente con tus mismos intereses y gana recompensas por tu impacto positivo.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-3 mb-6">
                                            <li className="flex items-center gap-2 text-gray-600">
                                                <div className="w-2 h-2 rounded-full bg-green-500" /> Acceso a eventos exclusivos
                                            </li>
                                            <li className="flex items-center gap-2 text-gray-600">
                                                <div className="w-2 h-2 rounded-full bg-green-500" /> Descuentos en marcas aliadas
                                            </li>
                                            <li className="flex items-center gap-2 text-gray-600">
                                                <div className="w-2 h-2 rounded-full bg-green-500" /> Certificado de participación
                                            </li>
                                        </ul>
                                        <Button asChild>
                                            <Link href="/auth">Empezar ahora <ArrowRight className="ml-2 h-4 w-4" /></Link>
                                        </Button>
                                    </CardContent>
                                </div>
                                <div className="order-1 md:order-2 h-64 md:h-full rounded-xl overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2074&auto=format&fit=crop"
                                        alt="Voluntarios"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </Card>
                    </TabsContent>

                    <TabsContent value="students">
                        <Card className="border-none shadow-lg">
                            <div className="grid md:grid-cols-2 gap-6 items-center p-6">
                                <div className="order-2 md:order-1">
                                    <CardHeader>
                                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                                            <GraduationCap className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <CardTitle className="text-2xl">Para Estudiantes</CardTitle>
                                        <CardDescription className="text-lg mt-2">
                                            Valida tus horas de voluntariado universitario de forma sencilla y digital. Generamos reportes automáticos para tu universidad.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-3 mb-6">
                                            <li className="flex items-center gap-2 text-gray-600">
                                                <div className="w-2 h-2 rounded-full bg-blue-500" /> Validación automática de horas
                                            </li>
                                            <li className="flex items-center gap-2 text-gray-600">
                                                <div className="w-2 h-2 rounded-full bg-blue-500" /> Reportes descargables en PDF
                                            </li>
                                            <li className="flex items-center gap-2 text-gray-600">
                                                <div className="w-2 h-2 rounded-full bg-blue-500" /> Conexión con grupos estudiantiles
                                            </li>
                                        </ul>
                                        <Button asChild className="bg-blue-600 hover:bg-blue-700">
                                            <Link href="/auth">Registrarme como estudiante <ArrowRight className="ml-2 h-4 w-4" /></Link>
                                        </Button>
                                    </CardContent>
                                </div>
                                <div className="order-1 md:order-2 h-64 md:h-full rounded-xl overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                                        alt="Estudiantes"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </Card>
                    </TabsContent>

                    <TabsContent value="organizations">
                        <Card className="border-none shadow-lg">
                            <div className="grid md:grid-cols-2 gap-6 items-center p-6">
                                <div className="order-2 md:order-1">
                                    <CardHeader>
                                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                                            <Building2 className="h-6 w-6 text-purple-600" />
                                        </div>
                                        <CardTitle className="text-2xl">Para Organizaciones</CardTitle>
                                        <CardDescription className="text-lg mt-2">
                                            Gestiona tus eventos de RSE, conecta con voluntarios y mide el impacto de tus iniciativas ambientales.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-3 mb-6">
                                            <li className="flex items-center gap-2 text-gray-600">
                                                <div className="w-2 h-2 rounded-full bg-purple-500" /> Dashboard de impacto
                                            </li>
                                            <li className="flex items-center gap-2 text-gray-600">
                                                <div className="w-2 h-2 rounded-full bg-purple-500" /> Gestión de convocatorias
                                            </li>
                                            <li className="flex items-center gap-2 text-gray-600">
                                                <div className="w-2 h-2 rounded-full bg-purple-500" /> Visibilidad de marca
                                            </li>
                                        </ul>
                                        <Button asChild className="bg-purple-600 hover:bg-purple-700">
                                            <Link href="/auth?ally=1">Crear cuenta de organización <ArrowRight className="ml-2 h-4 w-4" /></Link>
                                        </Button>
                                    </CardContent>
                                </div>
                                <div className="order-1 md:order-2 h-64 md:h-full rounded-xl overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop"
                                        alt="Organizaciones"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    )
}
