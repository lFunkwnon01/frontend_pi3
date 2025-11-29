"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { mockServices, mockAllies, type Service } from "@/lib/mock-data"

interface Props {
  params: { allyId: string; serviceId: string }
}

export default function ServiceDetailPage({ params }: Props) {
  const { allyId, serviceId } = params
  const service = mockServices.find((s) => s.id === serviceId) as Service | undefined
  const ally = mockAllies.find((a) => a.id === allyId)
  const router = useRouter()

  const [date, setDate] = useState<string>(service?.disponibilidad?.[0] ?? "")
  const [persons, setPersons] = useState<number>(1)
  const [showPayment, setShowPayment] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  if (!service || !ally) return <div>Servicio no encontrado</div>

  const isAvailable = service.disponibilidad?.includes(date)

  const total = service.precio * persons

  const handleConfirm = () => {
    setShowPayment(true)
  }

  const handlePay = (name: string) => {
    // simulate booking
    const bookingId = `BKG-${Date.now()}`
    setConfirmed(true)
    setShowPayment(false)
    // redirect to reservation page (not implemented) with booking id
    router.push(`/reservas/${bookingId}`)
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-md overflow-hidden">
          {service.imagen_url && <img src={service.imagen_url} alt={service.titulo} className="object-cover w-full h-64" />}
          <div className="p-4">
            <h2 className="text-2xl font-bold">{service.titulo}</h2>
            <div className="text-sm text-muted-foreground">{ally.nombre} — {ally.distrito}</div>
            <p className="mt-4 text-sm text-muted-foreground">{service.descripcion}</p>
          </div>
        </div>

        <aside className="bg-card rounded-md p-4">
          <div className="text-center">
            <div className="text-lg font-semibold">{service.moneda} {service.precio}</div>
            <div className="text-xs text-muted-foreground">{service.duracion}</div>
          </div>

          <div className="mt-4">
            <label className="block text-sm text-muted-foreground">Fecha</label>
            <input
              type="date"
              className="w-full mt-1 p-2 border rounded-md"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={service.disponibilidad?.[0]}
            />
            {!isAvailable && <div className="text-xs text-red-600 mt-2">Fecha no disponible</div>}
          </div>

          <div className="mt-4">
            <label className="block text-sm text-muted-foreground">Personas</label>
            <input type="number" className="w-full mt-1 p-2 border rounded-md" min={1} max={service.capacidad} value={persons} onChange={(e) => setPersons(Number(e.target.value))} />
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <div>Precio base</div>
              <div>{service.moneda} {service.precio}</div>
            </div>
            <div className="flex justify-between text-sm">
              <div>Tasa</div>
              <div>{service.moneda} {(service.precio * 0.1).toFixed(2)}</div>
            </div>
            <div className="flex justify-between font-semibold mt-2">
              <div>Total</div>
              <div>{service.moneda} {(total + total * 0.1).toFixed(2)}</div>
            </div>
          </div>

          <div className="mt-4">
            <button className="w-full px-4 py-2 rounded-md bg-primary text-white" disabled={!isAvailable} onClick={handleConfirm}>
              Confirmar y pagar
            </button>
          </div>

          {showPayment && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-md w-full max-w-md">
                <h3 className="text-lg font-semibold mb-2">Pago simulado</h3>
                <p className="text-sm text-muted-foreground mb-4">Ingresa datos de prueba</p>
                <input className="w-full p-2 border rounded-md mb-2" placeholder="Nombre" />
                <input className="w-full p-2 border rounded-md mb-2" placeholder="Email" />
                <div className="flex justify-end gap-2">
                  <button className="px-3 py-2 rounded-md border" onClick={() => setShowPayment(false)}>Cancelar</button>
                  <button className="px-3 py-2 rounded-md bg-primary text-white" onClick={() => handlePay("Test")}>Pagar</button>
                </div>
              </div>
            </div>
          )}

        </aside>
      </div>
    </div>
  )
}
