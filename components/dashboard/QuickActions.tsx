import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera, Ticket, Gift, Share2 } from "lucide-react"

export function QuickActions() {
    const actions = [
        { name: "Reportar Problema", icon: Camera, color: "bg-red-100 text-red-600", hover: "hover:bg-red-200" },
        { name: "Ver Eventos", icon: Ticket, color: "bg-blue-100 text-blue-600", hover: "hover:bg-blue-200" },
        { name: "Canjear Puntos", icon: Gift, color: "bg-amber-100 text-amber-600", hover: "hover:bg-amber-200" },
        { name: "Invitar Amigos", icon: Share2, color: "bg-green-100 text-green-600", hover: "hover:bg-green-200" },
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    {actions.map((action) => (
                        <button
                            key={action.name}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl transition-colors ${action.color} ${action.hover} bg-opacity-50`}
                        >
                            <action.icon className="h-6 w-6 mb-2" />
                            <span className="text-sm font-medium text-center">{action.name}</span>
                        </button>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
