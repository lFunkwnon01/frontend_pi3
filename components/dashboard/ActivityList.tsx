import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ActivityList() {
    const activities = [
        {
            user: "Ana M.",
            action: "reportó playa sucia",
            location: "Playa Agua Dulce",
            time: "hace 2h",
            avatar: "/avatars/01.png",
            initials: "AM"
        },
        {
            user: "Carlos R.",
            action: "se unió al evento",
            location: "Limpieza Costa Verde",
            time: "hace 4h",
            avatar: "/avatars/02.png",
            initials: "CR"
        },
        {
            user: "EcoTeam",
            action: "publicó nuevo evento",
            location: "Barranco",
            time: "hace 5h",
            avatar: "/avatars/03.png",
            initials: "ET"
        },
        {
            user: "Luisa P.",
            action: "ganó una insignia",
            location: "Guardián del Mar",
            time: "hace 1d",
            avatar: "/avatars/04.png",
            initials: "LP"
        },
    ]

    return (
        <div className="space-y-6">
            <h3 className="font-semibold text-gray-900">Actividad Reciente</h3>
            <div className="space-y-4">
                {activities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all">
                        <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                            <AvatarImage src={activity.avatar} alt={activity.user} />
                            <AvatarFallback>{activity.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                {activity.user} <span className="text-gray-500 font-normal">{activity.action}</span>
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                                {activity.location} • {activity.time}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
