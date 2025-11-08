"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

interface BeforeAfterEntry {
  id: string
  campaignId: string
  before?: string // data URL
  after?: string // data URL
  created: string
}

const STORAGE_KEY = "ecoshare_before_after"

function loadEntries(): BeforeAfterEntry[] {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
}
function saveEntries(list: BeforeAfterEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

export default function BeforeAfterSlider({ campaignId }: { campaignId: string }) {
  const [entries, setEntries] = useState<BeforeAfterEntry[]>([])
  const beforeInput = useRef<HTMLInputElement | null>(null)
  const afterInput = useRef<HTMLInputElement | null>(null)
  const [current, setCurrent] = useState<BeforeAfterEntry | null>(null)
  const [pos, setPos] = useState(50) // percentage slider

  useEffect(() => {
    const all = loadEntries()
    const existing = all.find(e => e.campaignId === campaignId)
    setEntries(all)
    setCurrent(existing || null)
  }, [campaignId])

  const onFile = (e: React.ChangeEvent<HTMLInputElement>, type: 'before'|'after') => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setEntries(prev => {
        const all = [...prev]
        let entry = all.find(a => a.campaignId === campaignId)
        if (!entry) {
          entry = { id: Date.now().toString(), campaignId, created: new Date().toISOString() }
          all.push(entry)
        }
        (entry as any)[type] = reader.result as string
        saveEntries(all)
        setCurrent({ ...entry })
        return all
      })
    }
    reader.readAsDataURL(file)
  }

  const hasBoth = current?.before && current?.after

  return (
    <Card>
      <CardHeader>
        <CardTitle>Antes y Después</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-3 flex-col sm:flex-row">
          <div className="flex-1 space-y-2">
            <input ref={beforeInput} type="file" accept="image/*" className="hidden" onChange={(e)=>onFile(e,'before')} />
            <Button variant="outline" className="w-full" onClick={()=>beforeInput.current?.click()} size="sm">
              <Upload className="h-4 w-4 mr-2"/> Subir Antes
            </Button>
            {current?.before && <img src={current.before} alt="Antes" className="rounded border aspect-video object-cover" />}
          </div>
          <div className="flex-1 space-y-2">
            <input ref={afterInput} type="file" accept="image/*" className="hidden" onChange={(e)=>onFile(e,'after')} />
            <Button variant="outline" className="w-full" onClick={()=>afterInput.current?.click()} size="sm">
              <Upload className="h-4 w-4 mr-2"/> Subir Después
            </Button>
            {current?.after && <img src={current.after} alt="Después" className="rounded border aspect-video object-cover" />}
          </div>
        </div>

        {hasBoth && (
          <div className="relative w-full aspect-video rounded overflow-hidden border bg-black select-none">
            <img src={current.before} className="absolute inset-0 h-full w-full object-cover" alt="Antes" />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100-pos}% 0 0)` }}
            >
              <img src={current.after} className="h-full w-full object-cover" alt="Después" />
            </div>
            <div
              className="absolute top-0 bottom-0 cursor-ew-resize w-1 bg-white/70 left-(--pos)"
              style={{ left: `${pos}%` }}
              onMouseDown={(e) => {
                const el = e.currentTarget.parentElement
                if (!el) return
                const onMove = (ev: MouseEvent) => {
                  const rect = el.getBoundingClientRect()
                  const p = ((ev.clientX - rect.left)/rect.width)*100
                  setPos(Math.min(100, Math.max(0, p)))
                }
                const onUp = () => {
                  window.removeEventListener('mousemove', onMove)
                  window.removeEventListener('mouseup', onUp)
                }
                window.addEventListener('mousemove', onMove)
                window.addEventListener('mouseup', onUp)
              }}
            >
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 bg-white text-black text-[10px] px-1 py-0.5 rounded shadow">{Math.round(pos)}%</div>
            </div>
          </div>
        )}
        {!hasBoth && <p className="text-xs text-muted-foreground">Sube imágenes del mismo punto para generar un comparador interactivo y compartirlo en redes.</p>}
      </CardContent>
    </Card>
  )
}
