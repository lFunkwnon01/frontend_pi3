"use client"

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function BeneficiosAliadosPage(){
  const [company,setCompany] = useState('')
  const [email,setEmail] = useState('')
  const [message,setMessage] = useState('')
  const submit = (e:React.FormEvent) => { e.preventDefault(); const key='ally_contact_requests'; const arr=JSON.parse(localStorage.getItem(key)||'[]'); arr.push({ id:Date.now().toString(), company, email, message, created:new Date().toISOString() }); localStorage.setItem(key, JSON.stringify(arr)); setCompany(''); setEmail(''); setMessage('') }
  return (
    <div className='min-h-screen bg-background'>
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <h1 className='text-3xl font-bold mb-2'>Beneficios de ser Aliado</h1>
        <p className='text-muted-foreground mb-6'>Llega a miles de usuarios eco-conscientes, potencia tu RSE y asocia tu marca con sostenibilidad real.</p>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Card>
            <CardHeader>
              <CardTitle>Exposición de Marca</CardTitle>
              <CardDescription>Visibilidad ante la comunidad de EcoPlaya</CardDescription>
            </CardHeader>
            <CardContent className='text-sm'>
              • Alcance mensual: ~15k usuarios activos<br/>
              • Presencia en eventos y redes sociales<br/>
              • Posicionamiento como marca sostenible
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>RSE y Certificaciones</CardTitle>
              <CardDescription>Impulsa tu responsabilidad social</CardDescription>
            </CardHeader>
            <CardContent className='text-sm'>
              • Reportes de impacto para auditorías<br/>
              • Badges Bronce/Plata/Oro/Platino según compromiso<br/>
              • Casos de éxito y storytelling con métricas
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Engagement Real</CardTitle>
              <CardDescription>Conecta con voluntarios y clientes</CardDescription>
            </CardHeader>
            <CardContent className='text-sm'>
              • Eventos co-creados con tu marca<br/>
              • Ofertas exclusivas y flash para la comunidad<br/>
              • Canal de mensajes directo con voluntarios
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Casos de Éxito</CardTitle>
              <CardDescription>Resultados medibles</CardDescription>
            </CardHeader>
            <CardContent className='text-sm'>
              • Aloha Perú: +210 voluntarios, 12 eventos, 120 redenciones<br/>
              • Surf Peru: +124 voluntarios, 6 eventos, 48 redenciones
            </CardContent>
          </Card>
        </div>

        <Card className='mt-8'>
          <CardHeader>
            <CardTitle>¿Quieres ser aliado?</CardTitle>
            <CardDescription>Deja tus datos y te contactamos</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className='grid gap-3'>
              <Input value={company} onChange={e=>setCompany(e.target.value)} placeholder='Empresa'/>
              <Input type='email' value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email'/>
              <Textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder='Cuéntanos sobre tu iniciativa' rows={4}/>
              <Button type='submit' className='w-fit'>Enviar</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
