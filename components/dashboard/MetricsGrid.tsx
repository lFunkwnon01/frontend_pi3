import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Calendar, MapPin } from "lucide-react"

export function MetricsGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-primary-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Tus Puntos</CardTitle>
                    <TrendingUp className="h-4 w-4 text-primary-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">1,250</div>
                    <p className="text-xs text-muted-foreground mt-1 text-green-600 font-medium">+15% este mes</p>
                </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Eventos Asistidos</CardTitle>
                    <Calendar className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">8</div>
                    <p className="text-xs text-muted-foreground mt-1">2 este mes</p>
                </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Horas Voluntariado</CardTitle>
                    <Users className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">32h</div>
                    <p className="text-xs text-muted-foreground mt-1">Meta: 50h</p>
                </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-amber-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Reportes</CardTitle>
                    <MapPin className="h-4 w-4 text-amber-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground mt-1">3 resueltos</p>
                </CardContent>
            </Card>
        </div>
    )
}
