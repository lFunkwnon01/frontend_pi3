"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Map, Calendar, Award, Settings, LogOut, User, FileText, Camera, Handshake } from "lucide-react"
import { logout } from "@/lib/auth"

export function Sidebar() {
    const pathname = usePathname()
    const router = useRouter()

    const handleLogout = () => {
        logout()
        router.push("/")
    }

    const links = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Mapa", href: "/dashboard/map", icon: Map },
        { name: "Eventos", href: "/dashboard/events", icon: Calendar },
        { name: "Reportes", href: "/dashboard/reports", icon: FileText },
        { name: "EcoShare", href: "/dashboard/ecoshare", icon: Camera },
        { name: "Recompensas", href: "/dashboard/rewards", icon: Award },
        { name: "Aliados", href: "/dashboard/aliados", icon: Handshake },
        { name: "Perfil", href: "/dashboard/profile", icon: User },
        { name: "Configuración", href: "/dashboard/settings", icon: Settings },
    ]

    return (
        <div className="flex flex-col h-full w-64 bg-white border-r border-gray-200">
            <div className="p-6">
                <Link href="/" className="flex items-center gap-2">
                    <img src="/logo_png.png" alt="EcoPlaya" className="h-8 w-auto" />
                    <span className="text-xl font-bold text-primary-700">EcoPlaya</span>
                </Link>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {links.map((link) => {
                    const Icon = link.icon
                    const isActive = pathname === link.href
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors",
                                isActive
                                    ? "bg-primary-50 text-primary-700 font-medium"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            )}
                        >
                            <Icon className={cn("h-5 w-5", isActive ? "text-primary-600" : "text-gray-400")} />
                            {link.name}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-gray-200">
                <Button
                    variant="ghost"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleLogout}
                >
                    <LogOut className="mr-2 h-5 w-5" />
                    Cerrar Sesión
                </Button>
            </div>
        </div>
    )
}
