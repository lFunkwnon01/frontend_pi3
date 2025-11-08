"use client"

import { Button } from "@/components/ui/button"
import { Copy, Share2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface EventShareProps {
  id: string
  title: string
}

export function EventShare({ id, title }: EventShareProps) {
  const { toast } = useToast()
  const url = typeof window !== 'undefined' ? `${window.location.origin}/events/${id}` : ''
  const encoded = encodeURIComponent(`Únete conmigo a limpiar la playa: ${title} — ${url}`)

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encoded}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encoded}`,
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      toast({ title: 'Link copiado' })
    } catch {
      toast({ title: 'No se pudo copiar' })
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <a className="px-3 py-2 rounded bg-green-500 text-white text-sm" href={shareLinks.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
      <a className="px-3 py-2 rounded bg-blue-600 text-white text-sm" href={shareLinks.facebook} target="_blank" rel="noreferrer">Facebook</a>
      <a className="px-3 py-2 rounded bg-sky-500 text-white text-sm" href={shareLinks.twitter} target="_blank" rel="noreferrer">Twitter</a>
      <Button variant="outline" size="sm" onClick={copy} className="flex items-center gap-2"><Copy className="h-4 w-4"/> Copiar link</Button>
    </div>
  )
}
