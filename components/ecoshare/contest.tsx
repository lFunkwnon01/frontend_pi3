"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Upload, Award } from "lucide-react"
import { getCurrentUser, addPoints, grantBadge } from "@/lib/auth"

interface ContestPhoto {
  id: string
  userId?: string
  userName?: string
  src: string // data URL or public asset path
  likes: number
  created: string
}

const monthKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`
}

const STORAGE = (m: string) => `ecoshare_contest_${m}`
const WINNER_KEY = 'ecoshare_monthly_winner'

function loadPhotos(m: string): ContestPhoto[] {
  if (typeof window === 'undefined') return []
  try { return JSON.parse(localStorage.getItem(STORAGE(m)) || '[]') } catch { return [] }
}
function savePhotos(m: string, list: ContestPhoto[]) {
  localStorage.setItem(STORAGE(m), JSON.stringify(list))
}

export default function PhotoContest() {
  const m = monthKey()
  const [photos, setPhotos] = useState<ContestPhoto[]>([])
  const [user] = useState(()=>getCurrentUser())
  const inputRef = useRef<HTMLInputElement|null>(null)

  useEffect(()=>{
    // seed with some public demo images the first time
    const existing = loadPhotos(m)
    if (existing.length === 0) {
      const seed: ContestPhoto[] = [
        { id: 'seed1', src: '/beach-cleanup-volunteers.png', likes: 8, created: new Date().toISOString() },
        { id: 'seed2', src: '/dune-restoration-planting.jpg', likes: 5, created: new Date().toISOString() },
        { id: 'seed3', src: '/ocean-guardian-badge.jpg', likes: 3, created: new Date().toISOString() },
      ]
      savePhotos(m, seed)
      setPhotos(seed)
    } else setPhotos(existing)
  }, [m])

  const like = (id: string) => {
    const voter = user?.id || 'anon'
    const key = `${STORAGE(m)}_voters_${id}`
    const voters: string[] = JSON.parse(localStorage.getItem(key) || '[]')
    if (voters.includes(voter)) return // one like per user
    voters.push(voter)
    localStorage.setItem(key, JSON.stringify(voters))
    setPhotos(prev => {
      const next = prev.map(p => p.id===id? { ...p, likes: (p.likes||0)+1 } : p)
      savePhotos(m, next)
      // update winner snapshot
      const winner = next.slice().sort((a,b)=>b.likes-a.likes)[0]
      localStorage.setItem(WINNER_KEY, JSON.stringify({ month: m, photo: winner.src, likes: winner.likes, author: winner.userName }))
      return next
    })
  }

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setPhotos(prev => {
        const entry: ContestPhoto = {
          id: Date.now().toString(),
          userId: user?.id,
          userName: user?.name,
          src: reader.result as string,
          likes: 0,
          created: new Date().toISOString(),
        }
        const next = [entry, ...prev]
        savePhotos(m, next)
        return next
      })
    }
    reader.readAsDataURL(file)
  }

  // At end of month or when the user clicks determine winner, award if current user owns it
  const maybeAward = () => {
    if (!user) return
    const winner = photos.slice().sort((a,b)=>b.likes-a.likes)[0]
    if (winner && winner.userId === user.id) {
      addPoints(100)
      grantBadge('Fotógrafo Eco')
    }
  }

  const top = useMemo(()=>photos.slice().sort((a,b)=>b.likes-a.likes)[0], [photos])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Concurso: Mejor Foto del Mes</CardTitle>
        <CardDescription>Vota con likes. La foto ganadora se destacará en el home y su autor recibirá 100 pts + badge "Fotógrafo Eco".</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {top && (
          <div className="rounded border p-2">
            <div className="text-xs mb-1">Top actual</div>
            <img src={top.src} alt="top" className="w-full max-h-64 object-cover rounded" />
            <div className="text-xs text-muted-foreground mt-1">{top.likes} likes</div>
          </div>
        )}
        <div className="flex items-center justify-between gap-2">
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onUpload} />
          <Button size="sm" variant="outline" onClick={()=>inputRef.current?.click()}>
            <Upload className="h-4 w-4 mr-2"/> Subir foto
          </Button>
          <Button size="sm" onClick={maybeAward} title="Otorgar premio si eres el autor de la foto top actual">Reclamar premio si gané</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {photos.map(p => (
            <div key={p.id} className="relative group">
              <img src={p.src} alt="foto" className="w-full h-36 object-cover rounded border" />
              <button onClick={()=>like(p.id)} className="absolute bottom-1 right-1 text-xs bg-white/90 rounded px-2 py-1 flex items-center gap-1 shadow">
                <Heart className="h-3 w-3 text-red-600"/> {p.likes}
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
