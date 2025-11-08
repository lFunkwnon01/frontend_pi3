"use client"

import React from "react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import AllyBadge from "@/components/aliados/ally-badge"

interface AllyCardProps {
  id: string
  nombre: string
  distrito: string
  logo_url?: string
  banner_url?: string
  descripcion: string
  actividades: string[]
  certificacion?: "Bronce"|"Plata"|"Oro"|"Platino"
}

export function AllyCard({ id, nombre, distrito, logo_url, banner_url, descripcion, actividades, certificacion }: AllyCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow">
      {banner_url && (
        <div className="h-32 w-full overflow-hidden rounded-t-lg">
          <img src={banner_url} alt={`${nombre} banner`} className="object-cover w-full h-full" />
        </div>
      )}
      <CardContent>
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 flex items-center justify-center rounded-md bg-muted overflow-hidden">
            {logo_url ? (
              <img src={logo_url} alt={`${nombre} logo`} className="object-contain w-full h-full" />
            ) : (
              <div className="text-sm font-semibold">{nombre.split(" ")[0]}</div>
            )}
          </div>
          <div className="flex-1">
            <CardTitle className="text-base">{nombre}</CardTitle>
            <CardDescription className="text-xs">{distrito}</CardDescription>
            <div className="mt-1"><AllyBadge level={certificacion} /></div>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{descripcion}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {actividades.slice(0, 3).map((a) => (
                <span key={a} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Link href={`/aliados/${id}`} className="inline-block">
            <Button variant="outline">Ver actividades</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default AllyCard
