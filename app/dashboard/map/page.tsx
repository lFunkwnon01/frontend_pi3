"use client"

import { BeachMap } from "@/components/map/beach-map"

export default function MapPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Mapa de Playas</h1>
                    <p className="text-gray-500">Explora el estado de las playas y encuentra eventos cercanos.</p>
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 h-[calc(100vh-200px)]">
                <BeachMap />
            </div>
        </div>
    )
}
