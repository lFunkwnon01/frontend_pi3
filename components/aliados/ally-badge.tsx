"use client"

import { Badge } from "@/components/ui/badge"

export default function AllyBadge({ level }: { level?: "Bronce"|"Plata"|"Oro"|"Platino" }) {
  if (!level) return null
  const styles: Record<string, string> = {
    Bronce: "bg-amber-700 text-white",
    Plata: "bg-zinc-400 text-black",
    Oro: "bg-yellow-400 text-black",
    Platino: "bg-sky-300 text-black",
  }
  return <Badge className={styles[level] || "bg-muted"}>Aliado {level}</Badge>
}
