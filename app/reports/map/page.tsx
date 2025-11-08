"use client"

import { useEffect, useState } from 'react'
import { mockReports, REPORT_TYPE_META, type Report } from '@/lib/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin } from 'lucide-react'

interface MarkerReport extends Report { }

export default function PublicReportsMapPage() {
  const [reports, setReports] = useState<MarkerReport[]>([])
  const [selected, setSelected] = useState<MarkerReport | null>(null)

  useEffect(() => {
    // Public view: show all non-resolved reports
    setReports(mockReports.filter(r => r.status !== 'resolved'))
  }, [])

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Mapa de Reportes Activos</h1>
        <p className="text-sm text-muted-foreground">Transparencia sobre problemas ambientales reportados. Colores según tipo de reporte.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {/* Map area */}
        <div className="md:col-span-2 rounded-lg border overflow-hidden">
          <div className="relative w-full h-[520px] bg-[url('/costa_verde.png')] bg-cover bg-center">
            {reports.map(r => {
              const meta = REPORT_TYPE_META[r.type]
              const left = `${50 + (r.location.lng + 77.05) * 800}%` // naive relative positions (mock)
              const top = `${50 + (r.location.lat + 12.12) * -800}%`
              return (
                <button
                  key={r.id}
                  onClick={()=>setSelected(r)}
                  style={{ left, top }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full border shadow ring-2 ring-white"
                  title={meta.label}
                >
                  <span style={{ backgroundColor: meta.color }} className="block w-full h-full rounded-full" />
                </button>
              )
            })}
            {selected && (
              <div className="absolute left-2 bottom-2 w-[calc(100%-1rem)] max-w-sm">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <MapPin className="h-4 w-4" /> {REPORT_TYPE_META[selected.type].label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-xs text-muted-foreground">{selected.description}</div>
                    <div className="flex flex-wrap gap-2 text-[10px]">
                      <Badge variant="secondary">Urgencia: {selected.urgency}</Badge>
                      <Badge variant="outline">Estado: {selected.status}</Badge>
                      {selected.communityValidations && selected.communityValidations.length>0 && (
                        <Badge variant="outline">Validaciones: {selected.communityValidations.length}</Badge>
                      )}
                    </div>
                    <img src={selected.image} alt="Reporte" className="w-full h-32 object-cover rounded" />
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
        {/* Legend / list */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm">Leyenda de Tipos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              {Object.entries(REPORT_TYPE_META).map(([key, meta]) => (
                <div key={key} className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border" style={{ backgroundColor: meta.color }}></span>
                  <span>{meta.label}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="py-3"><CardTitle className="text-sm">Lista ({reports.length})</CardTitle></CardHeader>
            <CardContent className="space-y-3 max-h-72 overflow-auto text-xs">
              {reports.map(r => (
                <button key={r.id} onClick={()=>setSelected(r)} className={`block w-full text-left p-2 rounded border hover:bg-muted ${selected?.id===r.id?'bg-muted':''}`}> 
                  <div className="flex justify-between">
                    <span className="font-medium">{REPORT_TYPE_META[r.type].label}</span>
                    <span>{r.urgency}</span>
                  </div>
                  <div className="truncate text-[11px] text-muted-foreground">{r.description}</div>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
