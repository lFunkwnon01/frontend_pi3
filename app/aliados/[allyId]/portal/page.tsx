"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { mockAllies, mockServices, mockEvents, type Ally, type Service } from '@/lib/mock-data'
import AllyBadge from '@/components/aliados/ally-badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Plus, BarChart3, Users, Percent, CalendarPlus, MessageSquare } from 'lucide-react'

// Simple local storage keys
const OFFER_KEY_PREFIX = 'ally_offers_' // + allyId
const CREATED_EVENTS_PREFIX = 'ally_created_events_' // + allyId

interface AllyOffer { id:string; title:string; description:string; pct?:number; validUntil?:string }
interface AllyCreatedEvent { id:string; title:string; date:string; allyExclusive:boolean }

export default function AllyPortalPage(){
  const params = useParams() as { allyId?: string }
  const allyId = params?.allyId || ''
  const ally: Ally | undefined = mockAllies.find(a=>a.id===allyId)
  const [offers,setOffers] = useState<AllyOffer[]>([])
  const [events,setEvents] = useState<AllyCreatedEvent[]>([])

  useEffect(()=>{
    if(!allyId) return
    const off = JSON.parse(localStorage.getItem(OFFER_KEY_PREFIX+allyId)||'[]')
    const evs = JSON.parse(localStorage.getItem(CREATED_EVENTS_PREFIX+allyId)||'[]')
    setOffers(off)
    setEvents(evs)
  },[allyId])

  const addOffer = (o: Omit<AllyOffer,'id'>) => {
    const newOffer: AllyOffer = { id: Date.now().toString(), ...o }
    const next = [...offers,newOffer]
    setOffers(next)
    localStorage.setItem(OFFER_KEY_PREFIX+allyId, JSON.stringify(next))
  }
  const createEvent = (e: Omit<AllyCreatedEvent,'id'>) => {
    const newEv: AllyCreatedEvent = { id: Date.now().toString(), ...e }
    const next = [...events,newEv]
    setEvents(next)
    localStorage.setItem(CREATED_EVENTS_PREFIX+allyId, JSON.stringify(next))
  }

  if(!ally) return <div className='min-h-screen flex items-center justify-center text-muted-foreground'>Aliado no encontrado</div>

  // Basic stats (mock)
  const stats = {
    volunteers: ally.impacto?.voluntariosPorPlataforma || 0,
    sponsored: ally.impacto?.eventosPatrocinados || 0,
    redemptions: ally.impacto?.redenciones || offers.length*3,
  }

  return (
    <div className='min-h-screen bg-background'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <h1 className='text-3xl font-bold mb-2 flex items-center gap-2'>{ally.nombre} <AllyBadge level={ally.certificacion as any}/></h1>
        <p className='text-muted-foreground mb-6'>Portal de aliado: administra tu presencia, eventos, ofertas y engagement.</p>

        <Tabs defaultValue='overview' className='space-y-6'>
          <TabsList>
            <TabsTrigger value='overview'>Resumen</TabsTrigger>
            <TabsTrigger value='events'>Eventos</TabsTrigger>
            <TabsTrigger value='offers'>Ofertas</TabsTrigger>
            <TabsTrigger value='engagement'>Engagement</TabsTrigger>
            <TabsTrigger value='community'>Comunidad</TabsTrigger>
          </TabsList>

          <TabsContent value='overview'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <Card><CardContent className='pt-6 text-center'><Users className='h-8 w-8 text-primary mx-auto mb-2'/><div className='text-2xl font-bold'>{stats.volunteers}</div><div className='text-xs text-muted-foreground'>Voluntarios vía plataforma</div></CardContent></Card>
              <Card><CardContent className='pt-6 text-center'><CalendarPlus className='h-8 w-8 text-green-500 mx-auto mb-2'/><div className='text-2xl font-bold text-green-600'>{stats.sponsored}</div><div className='text-xs text-muted-foreground'>Eventos patrocinados</div></CardContent></Card>
              <Card><CardContent className='pt-6 text-center'><Percent className='h-8 w-8 text-amber-500 mx-auto mb-2'/><div className='text-2xl font-bold text-amber-600'>{stats.redemptions}</div><div className='text-xs text-muted-foreground'>Descuentos redimidos</div></CardContent></Card>
            </div>
            <Card className='mt-6'><CardHeader><CardTitle>Recomendaciones</CardTitle><CardDescription>Acciones sugeridas para aumentar tu impacto</CardDescription></CardHeader><CardContent className='text-sm space-y-2'>
              <div>• Crea un evento exclusivo para voluntarios activos esta semana.</div>
              <div>• Publica una oferta flash (24h) para generar visitas.</div>
              <div>• Comparte fotos de tu última actividad educativa.</div>
            </CardContent></Card>
          </TabsContent>

          <TabsContent value='events'>
            <Card>
              <CardHeader><CardTitle>Crear / Patrocinar Evento</CardTitle><CardDescription>Marca "Exclusivo" para eventos solo de la comunidad EcoPlaya.</CardDescription></CardHeader>
              <CardContent>
                <EventForm onCreate={createEvent} />
                <div className='mt-6'>
                  <h4 className='font-semibold mb-2 text-sm'>Tus eventos creados</h4>
                  <div className='space-y-2 text-sm'>
                    {events.map(ev => <div key={ev.id} className='flex items-center justify-between border rounded px-3 py-2'>
                      <span>{new Date(ev.date).toLocaleDateString('es-ES')} — {ev.title}</span>
                      {ev.allyExclusive && <Badge className='bg-amber-500 text-white'>Exclusivo</Badge>}
                    </div>)}
                    {events.length===0 && <div className='text-xs text-muted-foreground'>Aún no creas eventos.</div>}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='offers'>
            <Card>
              <CardHeader><CardTitle>Publicar Oferta / Descuento</CardTitle><CardDescription>Atrae voluntarios con beneficios exclusivos.</CardDescription></CardHeader>
              <CardContent>
                <OfferForm onCreate={addOffer} />
                <div className='mt-6'>
                  <h4 className='font-semibold mb-2 text-sm'>Ofertas activas</h4>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                    {offers.map(o => <div key={o.id} className='border rounded p-3 text-sm'>
                      <div className='font-semibold'>{o.title} {o.pct && <span className='text-green-600'>({o.pct}%)</span>}</div>
                      <p className='text-muted-foreground text-xs mt-1'>{o.description}</p>
                      {o.validUntil && <div className='text-[10px] mt-1'>Válido hasta: {new Date(o.validUntil).toLocaleDateString('es-ES')}</div>}
                    </div>)}
                    {offers.length===0 && <div className='text-xs text-muted-foreground'>Sin ofertas aún.</div>}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='engagement'>
            <Card>
              <CardHeader><CardTitle>Reportes de Engagement</CardTitle><CardDescription>Métricas simuladas para esta versión demo.</CardDescription></CardHeader>
              <CardContent className='space-y-3 text-sm'>
                <div className='flex justify-between'><span>Tasa de conversión oferta → visita</span><span className='font-medium'>12%</span></div>
                <div className='flex justify-between'><span>Click-through eventos</span><span className='font-medium'>36%</span></div>
                <div className='flex justify-between'><span>Participación en eventos exclusivos</span><span className='font-medium'>82%</span></div>
                <div className='flex justify-between'><span>Retención mensual voluntarios</span><span className='font-medium'>67%</span></div>
                <div className='mt-4 text-xs text-muted-foreground'>(*) Datos mock para ilustrar el panel.</div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='community'>
            <Card>
              <CardHeader><CardTitle>Comunidad</CardTitle><CardDescription>Mensajes rápidos a voluntarios (mock)</CardDescription></CardHeader>
              <CardContent>
                <CommunityMessages allyId={allyId} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function OfferForm({ onCreate }: { onCreate: (o: Omit<AllyOffer,'id'>)=>void }){
  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const [pct,setPct] = useState<number|undefined>(undefined)
  const [days,setDays] = useState(3)
  return (
    <form onSubmit={e=>{e.preventDefault(); if(!title) return; onCreate({ title, description, pct, validUntil: new Date(Date.now()+days*86400000).toISOString() }); setTitle(''); setDescription(''); setPct(undefined)}} className='space-y-3'>
      <div className='grid md:grid-cols-4 gap-3'>
        <Input value={title} onChange={e=>setTitle(e.target.value)} placeholder='Título' className='md:col-span-2'/>
        <Input type='number' value={pct||''} onChange={e=>setPct(e.target.value?parseInt(e.target.value):undefined)} placeholder='% opcional'/>
        <Input type='number' value={days} onChange={e=>setDays(parseInt(e.target.value)||1)} placeholder='Duración días'/>
      </div>
      <Textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder='Descripción breve' rows={3}/>
      <Button type='submit' size='sm'><Plus className='h-4 w-4 mr-1'/>Publicar oferta</Button>
    </form>
  )
}

function EventForm({ onCreate }: { onCreate: (e: Omit<AllyCreatedEvent,'id'>)=>void }){
  const [title,setTitle] = useState('')
  const [date,setDate] = useState('')
  const [exclusive,setExclusive] = useState(false)
  return (
    <form onSubmit={e=>{e.preventDefault(); if(!title||!date) return; onCreate({ title, date, allyExclusive: exclusive }); setTitle(''); setDate(''); setExclusive(false)}} className='space-y-3'>
      <div className='grid md:grid-cols-4 gap-3'>
        <Input value={title} onChange={e=>setTitle(e.target.value)} placeholder='Título evento' className='md:col-span-2'/>
        <Input type='date' value={date} onChange={e=>setDate(e.target.value)} />
        <label className='flex items-center gap-2 text-xs'><input type='checkbox' checked={exclusive} onChange={e=>setExclusive(e.target.checked)}/> Exclusivo EcoPlaya</label>
      </div>
      <Button type='submit' size='sm'><CalendarPlus className='h-4 w-4 mr-1'/>Crear evento</Button>
    </form>
  )
}

function CommunityMessages({ allyId }: { allyId:string }){
  const KEY = 'ally_messages_'+allyId
  const [messages,setMessages] = useState<{ id:string; text:string; date:string }[]>([])
  const [text,setText] = useState('')
  useEffect(()=>{ setMessages(JSON.parse(localStorage.getItem(KEY)||'[]')) },[allyId])
  const send = () => { if(!text) return; const m={ id:Date.now().toString(), text, date:new Date().toISOString()}; const next=[m,...messages]; setMessages(next); localStorage.setItem(KEY, JSON.stringify(next)); setText('') }
  return (
    <div>
      <div className='flex gap-2 mb-3'>
        <Input value={text} onChange={e=>setText(e.target.value)} placeholder='Mensaje a la comunidad'/>
        <Button size='sm' onClick={send}><MessageSquare className='h-4 w-4 mr-1'/>Enviar</Button>
      </div>
      <div className='space-y-2 max-h-64 overflow-y-auto pr-2'>
        {messages.map(m=> <div key={m.id} className='border rounded p-2 text-xs'><div className='font-medium'>{new Date(m.date).toLocaleString('es-ES',{ dateStyle:'short', timeStyle:'short'})}</div><p>{m.text}</p></div> )}
        {messages.length===0 && <div className='text-xs text-muted-foreground'>Sin mensajes aún.</div>}
      </div>
    </div>
  )
}
