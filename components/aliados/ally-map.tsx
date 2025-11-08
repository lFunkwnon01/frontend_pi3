"use client"

import { useState, useMemo } from 'react'
import { mockAllies, type Ally } from '@/lib/mock-data'
import Link from 'next/link'

const TYPES = [ 'Todos', 'restaurant', 'eco-shop', 'surf-school', 'ngo', 'municipality', 'other' ] as const

export default function AllyMap(){
  const [type, setType] = useState<typeof TYPES[number]>('Todos')
  const filtered = useMemo(()=> mockAllies.filter(a=> type==='Todos' || a.categoria===type), [type])
  const [active,setActive] = useState<string|null>(null)
  const activeAlly = filtered.find(a=>a.id===active)

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap gap-2 text-xs'>
        {TYPES.map(t=> <button key={t} onClick={()=>setType(t)} className={`px-3 py-1 rounded-full border ${type===t?'bg-primary text-primary-foreground':'hover:bg-accent'}`}>{t}</button>)}
      </div>
  <div className='relative h-128 w-full rounded-lg bg-linear-to-br from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-900 overflow-hidden border'>
        {/* Mock map grid */}
        <div className='absolute inset-0 opacity-20 grid grid-cols-12 grid-rows-12'>
          {Array.from({length:144}).map((_,i)=> <div key={i} className='border border-white/10'></div>)}
        </div>
        {/* Pins */}
        {filtered.map(a=>{
          const x = (a.ubicacion?.lng || -77.05)
          const y = (a.ubicacion?.lat || -12.12)
          // simple normalization for mock map
          const left = ((x + 77.2)/0.3)*100 // rough
          const top = ((-12.25 - y)/-0.3)*100
          return (
            <button key={a.id} style={{ left: `${left}%`, top: `${top}%` }} onClick={()=>setActive(a.id)} className='absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary text-white text-[10px] px-2 py-1 shadow hover:scale-105 transition'>
              {a.nombre.split(' ')[0]}
            </button>
          )
        })}
        {activeAlly && (
          <div className='absolute left-4 bottom-4 w-72 bg-background/90 backdrop-blur border rounded-lg p-4 shadow-lg'>
            <div className='flex justify-between items-start'>
              <div>
                <h3 className='font-semibold text-sm'>{activeAlly.nombre}</h3>
                {activeAlly.descuentos && activeAlly.descuentos[0] && (
                  <div className='text-xs text-green-600 mt-1'>{activeAlly.descuentos[0].titulo}</div>
                )}
              </div>
              <button className='text-xs text-muted-foreground' onClick={()=>setActive(null)}>Cerrar</button>
            </div>
            <div className='mt-3 flex gap-2'>
              <Link href={`/aliados/${activeAlly.id}`} className='text-xs underline'>Ver más</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
