"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export interface FAQItem { q: string; a: string }

const defaultFaq: FAQItem[] = [
  { q: '¿Qué debo llevar?', a: 'Ropa cómoda, gorra, bloqueador y agua. Nosotros proporcionamos guantes y bolsas.' },
  { q: '¿Es necesaria experiencia previa?', a: 'No. Recibirás una breve inducción de seguridad al iniciar.' },
  { q: '¿Hay estacionamiento?', a: 'Depende de la playa; te recomendamos llegar temprano. Revisa el detalle del evento.' },
  { q: '¿Qué pasa si llueve?', a: 'Si hay condiciones adversas, el organizador reprogramará el evento y te notificaremos por correo.' },
]

export function EventFAQ({ faqs }: { faqs?: FAQItem[] }) {
  const list = faqs?.length ? faqs : defaultFaq
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preguntas frecuentes</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          {list.map((f, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
