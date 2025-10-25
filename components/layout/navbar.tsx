"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, X, LogOut, Award, Settings, User as UserIcon, TrendingUp, Home, Calendar, Camera, AlertTriangle, Gift, Plus } from "lucide-react"
import { getCurrentUser, logout, type User as AuthUser } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"

export function Navbar() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  useEffect(() => {
    const currentUser = getCurrentUser()
    console.log("Current user:", currentUser)
    setUser(currentUser)
  }, [pathname])

  const handleLogout = () => {
    logout()
    setUser(null)
    setIsMobileMenuOpen(false)
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente. ¡Hasta pronto!",
    })
    router.push("/")
    setTimeout(() => {
      window.location.reload()
    }, 100)
  }

  const userNavItems = [
    { href: "/dashboard", label: "Inicio", icon: Home, active: pathname === "/dashboard" },
    { href: "/events", label: "Eventos", icon: Calendar, active: pathname === "/events" },
    { href: "/ecoshare", label: "EcoShare", icon: Camera, active: pathname === "/ecoshare" },
    { href: "/reports", label: "Reportes", icon: AlertTriangle, active: pathname === "/reports" },
    { href: "/rewards", label: "Recompensas", icon: Gift, active: pathname === "/rewards" },
  ]

  const orgNavItems = [
    { href: "/dashboard", label: "Inicio", icon: Home, active: pathname === "/dashboard" },
    { href: "/org/events", label: "Mis Eventos", icon: Calendar, active: pathname.startsWith("/org/events") },
    { href: "/org/create-event", label: "Crear Evento", icon: Plus, active: pathname === "/org/create-event" },
    { href: "/reports", label: "Reportes", icon: AlertTriangle, active: pathname === "/reports" },
  ]

  const adminNavItems = [
    { href: "/admin/events", label: "Eventos", icon: Calendar, active: pathname.startsWith("/admin/events") },
    { href: "/admin/reports", label: "Reportes", icon: AlertTriangle, active: pathname.startsWith("/admin/reports") },
    { href: "/admin/users", label: "Usuarios", icon: UserIcon, active: pathname.startsWith("/admin/users") },
  ]

  const navItems = user?.role === "admin" ? adminNavItems : user?.role === "organization" ? orgNavItems : userNavItems

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo_png.png" alt="EcoPlaya" className="h-8 w-auto" />
            <span className="text-xl font-bold text-primary">EcoPlaya</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {user && navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className={`text-sm font-medium transition-colors hover:text-primary ${item.active ? "text-primary" : "text-muted-foreground"}`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/aliados" className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/aliados" ? "text-primary" : "text-muted-foreground"}`}>
              Aliados
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{user.points} pts</span>
                </div>

                <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                  <DropdownMenuTrigger asChild>
                    <button className="relative flex h-8 w-8 rounded-full bg-transparent border-0 p-0 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" sideOffset={5}>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="w-[200px] truncate text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    {user.role === "user" && (
                      <DropdownMenuItem onClick={() => { setIsDropdownOpen(false); router.push("/my-impact") }}>
                        <TrendingUp className="mr-2 h-4 w-4" />
                        <span>Mi Impacto</span>
                      </DropdownMenuItem>
                    )}
                    {user.role === "organization" && (
                      <DropdownMenuItem onClick={() => { setIsDropdownOpen(false); router.push("/org/dashboard") }}>
                        <TrendingUp className="mr-2 h-4 w-4" />
                        <span>Panel de Control</span>
                      </DropdownMenuItem>
                    )}
                    {user.role === "admin" && (
                      <DropdownMenuItem onClick={() => { setIsDropdownOpen(false); router.push("/admin/dashboard") }}>
                        <TrendingUp className="mr-2 h-4 w-4" />
                        <span>Panel de Control</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => { setIsDropdownOpen(false); router.push("/settings") }}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Configuración</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => { setIsDropdownOpen(false); handleLogout() }}><LogOut className="mr-2 h-4 w-4" /><span>Cerrar sesión</span></DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button onClick={() => router.push("/auth")}>Iniciar Sesión</Button>
            )}
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-muted-foreground hover:text-primary">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-3">
              {user ? (
                <>
                  <div className="px-2 pb-3 border-b border-border">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.points} puntos</p>
                      </div>
                    </div>
                  </div>
                  {navItems.map((item) => (
                    <Link 
                      key={item.href} 
                      href={item.href} 
                      onClick={() => setIsMobileMenuOpen(false)} 
                      className={`px-2 py-2 rounded-md text-base font-medium transition-colors ${item.active ? "text-primary" : "text-muted-foreground"}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  
                  {user.role === "user" && (
                    <Link 
                      href="/my-impact" 
                      onClick={() => setIsMobileMenuOpen(false)} 
                      className="px-2 py-2 rounded-md text-base font-medium text-muted-foreground"
                    >
                      Mi Impacto
                    </Link>
                  )}
                  
                  {user.role === "organization" && (
                    <Link 
                      href="/org/dashboard" 
                      onClick={() => setIsMobileMenuOpen(false)} 
                      className="px-2 py-2 rounded-md text-base font-medium text-muted-foreground"
                    >
                      Panel de Control
                    </Link>
                  )}
                  
                  {user.role === "admin" && (
                    <Link 
                      href="/admin/dashboard" 
                      onClick={() => setIsMobileMenuOpen(false)} 
                      className="px-2 py-2 rounded-md text-base font-medium text-muted-foreground"
                    >
                      Panel de Control
                    </Link>
                  )}
                  
                  <Link 
                    href="/settings" 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="px-2 py-2 rounded-md text-base font-medium text-muted-foreground"
                  >
                    Configuración
                  </Link>
                  
                  <button 
                    onClick={() => { setIsMobileMenuOpen(false); handleLogout() }} 
                    className="px-2 py-2 rounded-md text-base font-medium text-muted-foreground text-left"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <Button onClick={() => router.push("/auth")} className="mx-2">Iniciar Sesión</Button>
              )}
              <Link href="/aliados" onClick={() => setIsMobileMenuOpen(false)} className={`px-2 py-2 rounded-md text-base font-medium ${pathname === "/aliados" ? "text-primary" : "text-muted-foreground"}`}>
                Aliados
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
