"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, MapPin, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"

export function AppNavbar() {
    const pathname = usePathname()
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Hide Navbar on dashboard routes
    if (pathname?.startsWith("/dashboard")) {
        return null
    }

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
        }
    }

    const navLinks = [
        { name: "Inicio", href: "/" }, // Special case for top
        { name: "Características", id: "features" },
        { name: "Mapa", id: "map" },
        { name: "Testimonios", id: "testimonials" },
        { name: "Contacto", id: "contact" },
    ]

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <img
                        src="/logo_png.png"
                        alt="EcoPlaya"
                        className="h-10 w-auto transition-transform duration-300 group-hover:scale-110"
                    />
                    <span className={cn(
                        "text-xl font-bold transition-colors",
                        isScrolled ? "text-primary-700" : "text-primary-800"
                    )}>
                        EcoPlaya
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => link.id ? scrollToSection(link.id) : window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className={cn(
                                "text-sm font-medium hover:text-primary-500 transition-colors",
                                isScrolled ? "text-gray-700" : "text-gray-800"
                            )}
                        >
                            {link.name}
                        </button>
                    ))}
                    <Button asChild variant={isScrolled ? "default" : "secondary"} size="sm">
                        <Link href="/auth">Únete ahora</Link>
                    </Button>
                </nav>

                {/* Mobile Navigation */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className={isScrolled ? "text-gray-900" : "text-gray-900"}>
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <div className="flex flex-col gap-6 mt-8">
                                <Link href="/" className="flex items-center gap-2 mb-4">
                                    <img src="/logo_png.png" alt="EcoPlaya" className="h-10 w-auto" />
                                    <span className="text-xl font-bold text-primary-700">EcoPlaya</span>
                                </Link>
                                <nav className="flex flex-col gap-4">
                                    {navLinks.map((link) => (
                                        <button
                                            key={link.name}
                                            onClick={() => {
                                                link.id ? scrollToSection(link.id) : window.scrollTo({ top: 0, behavior: 'smooth' })
                                                // Close sheet logic would go here if controlled
                                            }}
                                            className="text-left text-lg font-medium text-gray-700 hover:text-primary-500 transition-colors"
                                        >
                                            {link.name}
                                        </button>
                                    ))}
                                </nav>
                                <div className="flex flex-col gap-3 mt-4">
                                    <Button asChild className="w-full">
                                        <Link href="/auth">Iniciar Sesión</Link>
                                    </Button>
                                    <Button asChild variant="outline" className="w-full">
                                        <Link href="/auth?register=true">Registrarse</Link>
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
