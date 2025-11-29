import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-200 pt-16 pb-8" id="contact">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <img src="/logo_png.png" alt="EcoPlaya" className="h-10 w-auto brightness-0 invert" />
                            <span className="text-2xl font-bold text-white">EcoPlaya</span>
                        </div>
                        <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                            Conectando voluntarios, estudiantes y organizaciones para proteger nuestras costas y crear un futuro más sostenible.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">Enlaces Rápidos</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/" className="hover:text-primary-400 transition-colors">Inicio</Link></li>
                            <li><Link href="/#features" className="hover:text-primary-400 transition-colors">Características</Link></li>
                            <li><Link href="/#map" className="hover:text-primary-400 transition-colors">Mapa Interactivo</Link></li>
                            <li><Link href="/auth" className="hover:text-primary-400 transition-colors">Voluntariado</Link></li>
                            <li><Link href="/auth?ally=1" className="hover:text-primary-400 transition-colors">Aliados</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">Contacto</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary-500 shrink-0" />
                                <span>Av. Larco 123, Miraflores<br />Lima, Perú</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-primary-500 shrink-0" />
                                <span>+51 999 888 777</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary-500 shrink-0" />
                                <span>contacto@ecoplaya.pe</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">Newsletter</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Recibe noticias sobre próximos eventos y tips ecológicos.
                        </p>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Tu email"
                                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-primary-500"
                            />
                            <Button size="icon" className="bg-primary-500 hover:bg-primary-600 text-white shrink-0">
                                <Mail className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} EcoPlaya. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    )
}
