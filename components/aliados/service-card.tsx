"use client"

import React from "react"
import Link from "next/link"
import { type Service, type Ally } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"

interface Props {
  service: Service
  ally: Ally
}

export default function ServiceCard({ service, ally }: Props) {
  return (
    <div className="border rounded-md overflow-hidden bg-white">
      {service.imagen_url && (
        <div className="h-40 w-full overflow-hidden">
          <img src={service.imagen_url} alt={service.titulo} className="object-cover w-full h-full" />
        </div>
      )}
      <div className="p-3">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">{service.titulo}</h4>
          <div className="text-sm text-muted-foreground">{service.duracion}</div>
        </div>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{service.descripcion}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm">
            <div className="font-medium">{service.moneda} {service.precio}</div>
            <div className="text-xs text-muted-foreground">{ally.distrito}</div>
          </div>
          <Link href={`/aliados/${ally.id}/servicios/${service.id}`}>
            <Button variant="outline">Reservar</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
