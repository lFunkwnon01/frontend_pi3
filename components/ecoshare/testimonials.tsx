"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle } from "lucide-react"
import { getCurrentUser, addPoints } from "@/lib/auth"

interface Testimonial {
  id: string
  userId: string
  userName: string
  avatar?: string
  text: string
  likes: number
  created: string
}

const STORAGE_KEY = "ecoshare_testimonials"
const LIKES_KEY = "ecoshare_testimonial_likes" // map testimonialId -> userId[]

function loadTestimonials(): Testimonial[] {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
}
function saveTestimonials(list: Testimonial[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}
function loadLikes(): Record<string,string[]> {
  if (typeof window === 'undefined') return {}
  try { return JSON.parse(localStorage.getItem(LIKES_KEY) || '{}') } catch { return {} }
}
function saveLikes(map: Record<string,string[]>) {
  localStorage.setItem(LIKES_KEY, JSON.stringify(map))
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [text, setText] = useState("")
  const [user] = useState(()=>getCurrentUser())
  const [likesMap, setLikesMap] = useState<Record<string,string[]>>({})

  useEffect(() => {
    setTestimonials(loadTestimonials())
    setLikesMap(loadLikes())
  }, [])

  const submit = () => {
    if (!user || !text.trim()) return
    if (text.length > 280) return
    // one testimonial per user per day simple rule
    const today = new Date().toDateString()
    if (testimonials.some(t => t.userId === user.id && new Date(t.created).toDateString() === today)) return
    const entry: Testimonial = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      avatar: user.avatar,
      text: text.trim(),
      likes: 0,
      created: new Date().toISOString(),
    }
    const next = [entry, ...testimonials]
    setTestimonials(next)
    saveTestimonials(next)
    setText("")
    addPoints(10) // reward
  }

  const toggleLike = (id: string) => {
    if (!user) return
    const map = { ...likesMap }
    const arr = map[id] || []
    const has = arr.includes(user.id)
    map[id] = has ? arr.filter(u => u !== user.id) : [...arr, user.id]
    setLikesMap(map)
    saveLikes(map)
    setTestimonials(prev => {
      const next = prev.map((t: Testimonial) => t.id === id ? { ...t, likes: map[id].length } : t)
      saveTestimonials(next)
      return next
    })
  }

  const top3 = [...testimonials].sort((a,b)=>b.likes-a.likes).slice(0,3)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Comparte tu experiencia (+10 pts)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Textarea value={text} onChange={(e)=>setText(e.target.value)} maxLength={280} placeholder="¿Cómo te fue en la jornada? (máx 280 caracteres)" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{text.length}/280</span>
              <Button size="sm" disabled={!user || !text.trim() || text.length>280} onClick={submit}>Publicar</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {top3.length>0 && (
        <div>
          <h3 className="font-semibold mb-2">Destacados</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {top3.map(t => (
              <Card key={t.id} className="border-primary/40">
                <CardContent className="pt-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8"><AvatarImage src={t.avatar}/><AvatarFallback>{t.userName[0]}</AvatarFallback></Avatar>
                    <div className="text-sm font-medium">{t.userName}</div>
                  </div>
                  <p className="text-sm">{t.text}</p>
                  <button onClick={()=>toggleLike(t.id)} className={`flex items-center gap-1 text-xs ${likesMap[t.id]?.includes(user?.id||'')?'text-red-600':'text-muted-foreground'}`}>
                    <Heart className="h-3 w-3" /> {t.likes}
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm"><MessageCircle className="h-4 w-4"/> Todos los testimonios</h3>
        <div className="space-y-3">
          {testimonials.map(t => (
            <div key={t.id} className="flex gap-3 p-3 rounded border">
              <Avatar className="h-8 w-8 shrink-0"><AvatarImage src={t.avatar}/><AvatarFallback>{t.userName[0]}</AvatarFallback></Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">{t.userName}</span>
                  <span className="text-[10px] text-muted-foreground">{new Date(t.created).toLocaleDateString('es-ES',{ day:'numeric', month:'short'})}</span>
                </div>
                <p className="text-xs mt-1">{t.text}</p>
                <button onClick={()=>toggleLike(t.id)} className={`mt-2 flex items-center gap-1 text-[11px] ${likesMap[t.id]?.includes(user?.id||'')?'text-red-600':'text-muted-foreground'}`}>
                  <Heart className="h-3 w-3"/> {t.likes} Me gusta
                </button>
              </div>
            </div>
          ))}
          {testimonials.length===0 && <div className="text-xs text-muted-foreground">Sé el primero en dejar tu testimonio.</div>}
        </div>
      </div>
    </div>
  )
}
