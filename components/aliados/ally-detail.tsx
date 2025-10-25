"use client"

import React, { useState } from "react"
import { mockAllies, mockServices, type Ally, type Service } from "@/lib/mock-data"
import { useRouter } from "next/navigation"
import Link from "next/link"
import ServiceCard from "@/components/aliados/service-card"

interface AllyDetailProps {
  allyId: string
}

export function AllyDetail({ allyId }: AllyDetailProps) {
  const router = useRouter()
  const ally = mockAllies.find((a) => a.id === allyId) as Ally | undefined
  const services = mockServices.filter((s) => s.allyId === allyId)

  const [following, setFollowing] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  if (!ally) return <div>Aliado no encontrado</div>

  return (
    <div>
      <div className="relative mb-6">
        {ally.banner_url && (
          <div className="h-56 w-full overflow-hidden rounded-md">
            <img src={ally.banner_url} alt={`${ally.nombre} banner`} className="object-cover w-full h-full" />
          </div>
        )}
        <div className="absolute -bottom-6 left-6 flex items-center space-x-4">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-white p-1 shadow-md">
            {ally.logo_url ? (
              <img src={ally.logo_url} alt={`${ally.nombre} logo`} className="object-contain w-full h-full" />
            ) : (
              <div className="flex items-center justify-center h-full">{ally.nombre.split(" ")[0]}</div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{ally.nombre}</h2>
            <div className="text-sm text-muted-foreground">{ally.distrito}</div>
          </div>
        </div>
      </div>

      <div className="mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex gap-2">
              {ally.actividades.slice(0, 3).map((t) => (
                <span key={t} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{t}</span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">{ally.descripcion}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              className={`px-4 py-2 rounded-md border ${following ? "bg-primary text-white" : "bg-white"}`}
              onClick={() => setFollowing((s) => !s)}
            >
              {following ? "Siguiendo" : "Seguir"}
            </button>
            <button className="px-4 py-2 rounded-md border bg-white" onClick={() => setContactOpen(true)}>
              Contactar
            </button>
          </div>
        </div>

        {/* Contact modal simple */}
        {contactOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-md p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-2">Contactar {ally.nombre}</h3>
              <p className="text-sm text-muted-foreground mb-4">(Datos de contacto simulados)</p>
              <div className="space-y-2">
                <div>Tel: +51 900 000 000</div>
                <div>Email: contacto@ejemplo.com</div>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="px-4 py-2 rounded-md border bg-white" onClick={() => setContactOpen(false)}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold mb-4">Actividades y Servicios</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((s: Service) => (
                <ServiceCard key={s.id} service={s} ally={ally} />
              ))}
            </div>
          </div>

          <aside className="bg-card rounded-md p-4">
            <h4 className="font-semibold">Sobre {ally.nombre}</h4>
            <p className="text-sm text-muted-foreground mt-2">{ally.descripcion}</p>
            <div className="mt-4">
              <Link href={`/aliados`}>Volver a Aliados</Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default AllyDetail
